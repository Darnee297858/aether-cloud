import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { reference, email } = body;

    if (!reference) {
      return NextResponse.json({ error: "Invalid payment reference" }, { status: 400 });
    }

    // 1. Verify Payment with Paystack REST API
    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await paystackRes.json();

    if (data.status && data.data.status === "success") {
      const amountPaid = data.data.amount / 100; // Convert kobo to NGN
      const customerEmail = email || data.data.customer.email;

      // 2. Persist Verified Transaction to Supabase DB
      const { error: dbError } = await supabase.from("Payment").insert([
        {
          reference: reference,
          email: customerEmail,
          amount: amountPaid,
          currency: data.data.currency || "NGN",
          status: "success",
        },
      ]);

      if (dbError) {
        console.error("Supabase Insertion Error:", dbError);
      }

      return NextResponse.json({
        success: true,
        message: "Payment successfully verified and logged to database.",
        customer: data.data.customer,
      });
    }

    return NextResponse.json(
      { success: false, message: "Paystack payment verification failed." },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Server Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}