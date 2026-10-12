"use client";

import React from "react";
import { Cpu, Github, Twitter, Linkedin } from "lucide-react";

interface HeaderProps {
  devName: string;
  devTitle: string;
  githubUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
}

export default function Header({
  devName,
  devTitle,
  githubUrl,
  twitterUrl,
  linkedinUrl,
}: HeaderProps) {
  return (
    <header className="p-6 border-b border-emerald-500/20 flex justify-between items-center z-10 backdrop-blur-md bg-black/40 relative">
      <div>
        <h1 className="text-xl font-black tracking-wider text-white flex items-center gap-2">
          <Cpu className="text-emerald-400" /> AETHER_CLOUD
        </h1>
        <p className="text-xs text-emerald-400/80 font-mono">
          {devName} | <span className="text-gray-300">{devTitle}</span>
        </p>
      </div>

      <div className="flex gap-4 text-emerald-400">
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noreferrer" className="hover:text-white transition">
            <Github size={20} />
          </a>
        )}
        {twitterUrl && (
          <a href={twitterUrl} target="_blank" rel="noreferrer" className="hover:text-white transition">
            <Twitter size={20} />
          </a>
        )}
        {linkedinUrl && (
          <a href={linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-white transition">
            <Linkedin size={20} />
          </a>
        )}
      </div>
    </header>
  );
}