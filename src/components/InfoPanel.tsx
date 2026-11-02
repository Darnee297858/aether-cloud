"use client";

import React, { useState } from "react";
import { Shield, CreditCard, Activity, CheckCircle2 } from "lucide-react";

interface InfoPanelProps {
  paystackKey: string;
  userEmail: string;
}

export default function InfoPanel({ paystackKey, userEmail }: InfoPanelProps) {
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handlePayment = () => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      if (!window.PaystackPop) {
        alert("Paystack SDK not loaded yet. Please refresh the page.");
        return;
      }

      setLoading(true);

      // @ts-ignore
      const handler = window.PaystackPop.setup({
        key: paystackKey,
        email: userEmail,
        amount: 1500000, // ₦15,000 (in kobo)
        currency: "NGN",
        ref: "AETHER-" + Math.floor(Math.random() * 1000000000 + 1),
        callback: function (response: { reference: string }) {
          // Trigger backend verification route
          fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reference: response.reference, email: userEmail }),
          })
            .then((res) => res.json())
            .then((data) => {
              setLoading(false);
              if (data.success) {
                setIsVerified(true);
                alert("Payment Verified & Logged to Supabase DB!");
              } else {
                alert("Payment verification failed on the server.");
              }
            })
            .catch((err) => {
              setLoading(false);
              console.error(err);
              alert("Network error during payment verification.");
            });
        },
        onClose: function () {
          setLoading(false);
        },
      });

      handler.openIframe();
    }
  };

  return (
    <div className="pointer-events-auto bg-slate-900/80 border border-emerald-500/30 p-6 rounded-xl backdrop-blur-md flex flex-col justify-between max-w-sm text-white shadow-2xl">
      <div className="space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Shield className="text-emerald-400" size={18} /> Architecture Engine
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Real-time interactive cloud topology simulator powered by server-side Paystack payment verification and persistent Supabase database audit logging.
        </p>

        <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-950/40 p-2 rounded border border-emerald-500/20">
          <Activity size={14} /> Node Routing Status: <span className="text-white font-semibold">OPTIMAL (99.9%)</span>
        </div>
      </div>

      {isVerified ? (
        <div className="w-full mt-6 bg-emerald-950/80 border border-emerald-500 text-emerald-300 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-xs shadow-lg shadow-emerald-500/20">
          <CheckCircle2 size={16} /> License Active & Verified
        </div>
      ) : (
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full mt-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition duration-200 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
        >
          <CreditCard size={18} /> {loading ? "Processing..." : "Get Cloud Architecture Spec (₦15,000)"}
        </button>
      )}
    </div>
  );
}