"use client";

import React from "react";
import { Mail, Phone, UserCheck } from "lucide-react";

interface ContactPanelProps {
  name: string;
  email: string;
  phone: string;
}

export default function ContactPanel({ name, email, phone }: ContactPanelProps) {
  return (
    <div className="pointer-events-auto bg-black/60 border border-emerald-500/30 p-6 rounded-xl backdrop-blur-md flex flex-col justify-between max-w-sm">
      <div>
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <UserCheck className="text-emerald-400" size={18} /> Engineer Profile
        </h3>

        <div className="space-y-3 text-xs">
          <div>
            <span className="text-gray-500 uppercase text-[10px]">Developer Name</span>
            <p className="text-gray-200 font-bold">{name}</p>
          </div>

          <div className="flex items-center gap-2 text-gray-300 pt-2 border-t border-emerald-500/10">
            <Mail size={14} className="text-emerald-400" />
            <span>{email}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-300">
            <Phone size={14} className="text-emerald-400" />
            <span>{phone}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-emerald-500/20">
        <p className="text-[10px] text-gray-500">
          © {new Date().getFullYear()} {name}. Built for GitHub & Portfolio Showcase.
        </p>
      </div>
    </div>
  );
}