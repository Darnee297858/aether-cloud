"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import TerminalBoot from "@/components/TerminalBoot";
import Header from "@/components/Header";
import InfoPanel from "@/components/InfoPanel";
import ContactPanel from "@/components/ContactPanel";

const CloudScene = dynamic(() => import("@/components/CloudScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />,
});

const PROFILE = {
  name: "Olusodo Daniel Ifeoluwa",
  title: "Lead Full Stack & Cloud Engineer",
  email: "danielolusodo74@gmail.com",
  phone: "07063 422998",
  socials: {
    github: "https://github.com/YourGithubUsername",
    twitter: "https://x.com/TobsyDriol",
    linkedin: "https://linkedin.com/in/YourLinkedinUsername",
  },
  paystackKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY || "pk_test_YOUR_PAYSTACK_PUBLIC_KEY",
};

export default function Home() {
  const [isBooting, setIsBooting] = useState(true);

  return (
    <div className="relative min-h-screen bg-black text-emerald-400 font-mono overflow-hidden">
      {isBooting ? (
        <TerminalBoot onComplete={() => setIsBooting(false)} />
      ) : (
        <main className="relative w-full h-screen flex flex-col justify-between">
          <Header
            devName={PROFILE.name}
            devTitle={PROFILE.title}
            githubUrl={PROFILE.socials.github}
            twitterUrl={PROFILE.socials.twitter}
            linkedinUrl={PROFILE.socials.linkedin}
          />

          <CloudScene />

          <div className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 pointer-events-none items-end mb-6">
            <InfoPanel
              paystackKey={PROFILE.paystackKey}
              userEmail={PROFILE.email}
            />
            <div className="flex justify-start md:justify-end">
              <ContactPanel
                name={PROFILE.name}
                email={PROFILE.email}
                phone={PROFILE.phone}
              />
            </div>
          </div>
        </main>
      )}
    </div>
  );
}