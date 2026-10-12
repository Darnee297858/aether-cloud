"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

interface TerminalBootProps {
  onComplete: () => void;
}

export default function TerminalBoot({ onComplete }: TerminalBootProps) {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const bootSequence = [
      "INITIALIZING AETHER_CLOUD_KERNEL v4.0.2...",
      "VERIFYING NODE ACCESS PERMISSIONS...",
      "ALLOCATING DISTRIBUTED MESH MEMORY...",
      "LOADING THREE.JS 3D GRAPHICS PIPELINE...",
      "PAYSTACK TRANSACTION ENGINE ONLINE...",
      "SYSTEM OPERATIONAL. WELCOME, ENGINEER."
    ];

    bootSequence.forEach((line, index) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, line]);
        if (index === bootSequence.length - 1) {
          setTimeout(onComplete, 800);
        }
      }, index * 350);
    });
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-50 bg-black flex flex-col justify-center items-start p-8 md:p-16 border-2 border-emerald-500/30"
      >
        <div className="flex items-center gap-2 text-emerald-400 mb-6 border-b border-emerald-500/20 pb-2 w-full">
          <Terminal className="animate-pulse" />
          <span className="font-bold tracking-widest text-sm md:text-base">[AETHER_SYSTEM_BOOT]</span>
        </div>
        <div className="space-y-2">
          {logs.map((log, i) => (
            <p key={i} className="text-xs md:text-sm text-emerald-400/90 tracking-wide">
              {`> ${log}`}
            </p>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}