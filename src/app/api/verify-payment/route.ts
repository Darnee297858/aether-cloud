import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { reference } = body;

    if (!reference) {
      return NextResponse.json({ error: "Invalid transaction reference" }, { status: 400 });
    }

    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await paystackResponse.json();

    if (data.status && data.data.status === "success" && data.data.amount === 1500000) {
      return NextResponse.json({
        success: true,
        message: "Payment verified successfully by server.",
        customer: data.data.customer,
      });
    }

    return NextResponse.json({ success: false, message: "Payment verification failed." }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}