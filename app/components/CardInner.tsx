"use client";

import { CardData } from "./types";

export function CardInner({ data }: { data: CardData }) {
  const { template, primaryColor, accentColor, businessName, ownerName, role, phone, email, website, tagline, logoText } = data;
  const initials = logoText || businessName.charAt(0).toUpperCase() || "B";

  if (template === "modern") {
    return (
      <div className="w-full h-full flex flex-col relative overflow-hidden" style={{ background: primaryColor }}>
        <div className="h-3 w-full" style={{ background: accentColor }} />
        <div
          className="absolute top-10 right-10 w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black"
          style={{ background: accentColor, color: primaryColor }}
        >
          {initials}
        </div>
        <div className="flex-1 flex flex-col justify-between p-12 pt-14">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-2 opacity-60" style={{ color: accentColor }}>{tagline}</p>
            <h1 className="text-5xl font-black leading-tight text-white">{businessName || "Your Business"}</h1>
          </div>
          <div>
            <div className="h-px w-16 mb-6" style={{ background: accentColor }} />
            <p className="text-2xl font-bold text-white">{ownerName || "Your Name"}</p>
            <p className="text-sm font-medium tracking-wider uppercase opacity-70 text-white mb-6">{role || "Position"}</p>
            <div className="space-y-1">
              {phone && <p className="text-sm text-white opacity-80">📞 {phone}</p>}
              {email && <p className="text-sm text-white opacity-80">✉️ {email}</p>}
              {website && <p className="text-sm text-white opacity-80">🌐 {website}</p>}
            </div>
          </div>
        </div>
        <div className="h-2 w-2/3" style={{ background: accentColor }} />
      </div>
    );
  }

  if (template === "bold") {
    return (
      <div className="w-full h-full flex flex-col" style={{ background: "#0f0f0f" }}>
        <div className="h-1/2 flex items-center justify-center relative" style={{ background: primaryColor }}>
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl font-black mb-3"
              style={{ background: "rgba(0,0,0,0.3)", color: "white" }}
            >
              {initials}
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight px-8 text-center">{businessName || "Your Business"}</h1>
            {tagline && <p className="text-xs tracking-[0.25em] uppercase text-white/70 mt-2">{tagline}</p>}
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-8"
            style={{ background: "#0f0f0f", clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
          />
        </div>
        <div className="flex-1 flex flex-col justify-center px-12 py-6">
          <p className="text-xl font-bold text-white">{ownerName || "Your Name"}</p>
          <p className="text-xs tracking-widest uppercase mb-6" style={{ color: accentColor }}>{role || "Position"}</p>
          <div className="space-y-2">
            {phone && <p className="text-sm text-gray-400"><span style={{ color: accentColor }}>TEL</span>{"  "}{phone}</p>}
            {email && <p className="text-sm text-gray-400"><span style={{ color: accentColor }}>EMAIL</span>{"  "}{email}</p>}
            {website && <p className="text-sm text-gray-400"><span style={{ color: accentColor }}>WEB</span>{"  "}{website}</p>}
          </div>
        </div>
      </div>
    );
  }

  if (template === "minimal") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32" style={{ background: primaryColor, clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
        <div className="absolute bottom-0 right-0 w-32 h-32" style={{ background: accentColor, clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />
        <div className="text-center z-10 px-12">
          <div className="text-5xl font-black mb-1 leading-none tracking-tight" style={{ color: primaryColor }}>
            {businessName || "Business"}
          </div>
          {tagline && <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-8">{tagline}</p>}
          <div className="w-12 h-0.5 mx-auto mb-6" style={{ background: accentColor }} />
          <p className="text-lg font-bold text-gray-800">{ownerName || "Your Name"}</p>
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-6">{role || "Position"}</p>
          <div className="space-y-1 text-xs text-gray-500">
            {phone && <p>{phone}</p>}
            {email && <p>{email}</p>}
            {website && <p>{website}</p>}
          </div>
        </div>
      </div>
    );
  }

  if (template === "gradient") {
    return (
      <div
        className="w-full h-full flex flex-col relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)` }}
      >
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-20 bg-white" />
        <div className="absolute -bottom-24 -left-12 w-72 h-72 rounded-full opacity-10 bg-white" />
        <div className="flex-1 flex flex-col justify-between p-12 relative z-10">
          <div>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black mb-6 bg-white/20 text-white">
              {initials}
            </div>
            <h1 className="text-5xl font-black text-white leading-tight">{businessName || "Your Business"}</h1>
            {tagline && <p className="text-sm text-white/70 tracking-wider mt-2">{tagline}</p>}
          </div>
          <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
            <p className="text-xl font-bold text-white">{ownerName || "Your Name"}</p>
            <p className="text-xs text-white/60 tracking-widest uppercase mb-4">{role || "Position"}</p>
            <div className="space-y-1 text-sm text-white/80">
              {phone && <p>📞 {phone}</p>}
              {email && <p>✉️ {email}</p>}
              {website && <p>🌐 {website}</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // dark
  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden bg-gray-950">
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: primaryColor, boxShadow: `0 0 20px ${primaryColor}` }} />
      <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: accentColor, boxShadow: `0 0 20px ${accentColor}` }} />
      <div className="flex-1 flex flex-col justify-between p-12">
        <div>
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full" style={{ background: primaryColor, boxShadow: `0 0 8px ${primaryColor}` }} />
            <span className="text-xs tracking-[0.3em] uppercase" style={{ color: primaryColor }}>{tagline || "Professional"}</span>
          </div>
          <h1 className="text-5xl font-black text-white leading-tight">{businessName || "Your Business"}</h1>
        </div>
        <div>
          <div className="h-px mb-6" style={{ background: `linear-gradient(to right, ${primaryColor}, transparent)` }} />
          <p className="text-2xl font-bold text-white">{ownerName || "Your Name"}</p>
          <p className="text-xs tracking-widest uppercase mb-6" style={{ color: accentColor }}>{role || "Position"}</p>
          <div className="space-y-1">
            {phone && <p className="text-sm text-gray-400"><span className="font-mono" style={{ color: primaryColor }}>+</span> {phone}</p>}
            {email && <p className="text-sm text-gray-400"><span className="font-mono" style={{ color: primaryColor }}>@</span> {email}</p>}
            {website && <p className="text-sm text-gray-400"><span className="font-mono" style={{ color: primaryColor }}>/</span> {website}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
