"use client";

import React from "react";
import { Shield, CreditCard, Activity } from "lucide-react";

interface InfoPanelProps {
  paystackKey: string;
  userEmail: string;
}

export default function InfoPanel({ paystackKey, userEmail }: InfoPanelProps) {
  const handlePayment = () => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      if (!window.PaystackPop) {
        alert("Paystack SDK not loaded. Please check your internet connection.");
        return;
      }

      // @ts-ignore
      const handler = window.PaystackPop.setup({
        key: paystackKey,
        email: userEmail,
        amount: 1500000,
        currency: "NGN",
        ref: "AETHER-" + Math.floor(Math.random() * 1000000000 + 1),
        callback: function (response: { reference: string }) {
          alert("Payment Successful! Reference ID: " + response.reference);
        },
        onClose: function () {
          alert("Transaction Window Closed.");
        },
      });

      handler.openIframe();
    }
  };

  return (
    <div className="pointer-events-auto bg-black/60 border border-emerald-500/30 p-6 rounded-xl backdrop-blur-md flex flex-col justify-between max-w-sm">
      <div className="space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Shield className="text-emerald-400" size={18} /> Architecture Engine
        </h2>
        <p className="text-xs text-gray-400 leading-relaxed">
          Real-time interactive cloud topology simulator. Designed to render distributed node clusters, serverless event loops, and cloud routing paths in a high-performance WebGL viewport.
        </p>

        <div className="flex items-center gap-2 text-[11px] text-emerald-400/80 bg-emerald-950/40 p-2 rounded border border-emerald-500/20">
          <Activity size={14} /> Node Routing Status: <span className="text-white">OPTIMAL (99.9%)</span>
        </div>
      </div>

      <button
        onClick={handlePayment}
        className="w-full mt-6 bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition duration-200 shadow-lg shadow-emerald-500/20"
      >
        <CreditCard size={18} /> Get Cloud Architecture Spec
      </button>
    </div>
  );
}