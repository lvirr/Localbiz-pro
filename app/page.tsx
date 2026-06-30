"use client";

import { useRef, useState, useCallback } from "react";
import CardPreview from "./components/CardPreview";
import { CardInner } from "./components/CardInner";
import { CardData, Template } from "./components/types";

const DEFAULT_DATA: CardData = {
  businessName: "LocalBiz Pro",
  ownerName: "Alex Johnson",
  role: "Founder & CEO",
  phone: "+1 (555) 000-0000",
  email: "alex@localbizpro.com",
  website: "www.localbizpro.com",
  tagline: "Build. Grow. Succeed.",
  template: "gradient",
  primaryColor: "#7C3AED",
  accentColor: "#F59E0B",
  logoText: "",
};

const TEMPLATES: { id: Template; label: string; emoji: string }[] = [
  { id: "gradient", label: "Gradient", emoji: "🎨" },
  { id: "modern", label: "Modern", emoji: "✨" },
  { id: "bold", label: "Bold Split", emoji: "⚡" },
  { id: "minimal", label: "Minimal", emoji: "◻️" },
  { id: "dark", label: "Dark Neon", emoji: "🌙" },
];

const PALETTE_PRESETS = [
  { primary: "#7C3AED", accent: "#F59E0B", name: "Purple Gold" },
  { primary: "#0EA5E9", accent: "#F43F5E", name: "Sky Rose" },
  { primary: "#10B981", accent: "#F59E0B", name: "Emerald Amber" },
  { primary: "#EF4444", accent: "#1F2937", name: "Red Dark" },
  { primary: "#1D4ED8", accent: "#60A5FA", name: "Ocean Blue" },
  { primary: "#EC4899", accent: "#8B5CF6", name: "Pink Violet" },
  { primary: "#0F172A", accent: "#E2E8F0", name: "Midnight" },
  { primary: "#F97316", accent: "#1E293B", name: "Sunset" },
];

export default function Home() {
  const [data, setData] = useState<CardData>(DEFAULT_DATA);
  const [downloading, setDownloading] = useState(false);
  const [exportUrl, setExportUrl] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  const update = useCallback(<K extends keyof CardData>(key: K, value: CardData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const downloadCard = useCallback(async () => {
    if (!cardRef.current || !cardWrapperRef.current) return;
    setDownloading(true);
    try {
      const wrapper = cardWrapperRef.current;
      // Move the wrapper (not the inner el) into viewport so html2canvas can compute styles
      wrapper.style.left = "0px";
      wrapper.style.top = "0px";
      await new Promise((r) => setTimeout(r, 100));
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(cardRef.current, {
        width: 1080,
        height: 1080,
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      });
      wrapper.style.left = "-9999px";
      wrapper.style.top = "-9999px";
      // Show in overlay so the user clicks a real <a> — avoids Firefox async gesture block
      setExportUrl(canvas.toDataURL("image/png"));
    } catch (e) {
      console.error(e);
    } finally {
      setDownloading(false);
    }
  }, []);

  return (
    <>
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-sm font-black text-white">L</div>
          <span className="font-bold text-lg text-white">LocalBiz Pro</span>
          <span className="text-xs text-gray-500 border border-gray-700 rounded px-2 py-0.5">Instagram Cards</span>
        </div>
        <button
          onClick={downloadCard}
          disabled={downloading}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
        >
          {downloading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
              Exporting...
            </>
          ) : "↓ Download PNG"}
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel — controls */}
        <div className="w-96 border-r border-gray-800 overflow-y-auto flex-shrink-0">
          <div className="p-6 space-y-7">

            {/* Template picker */}
            <section>
              <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">Template</h2>
              <div className="grid grid-cols-5 gap-2">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => update("template", t.id)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg border text-xs font-medium transition-all ${
                      data.template === t.id
                        ? "border-violet-500 bg-violet-500/10 text-violet-400"
                        : "border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-600"
                    }`}
                  >
                    <span className="text-lg">{t.emoji}</span>
                    <span className="text-[10px] text-center leading-tight">{t.label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Color Presets */}
            <section>
              <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">Color Palette</h2>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {PALETTE_PRESETS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => {
                      update("primaryColor", p.primary);
                      update("accentColor", p.accent);
                    }}
                    title={p.name}
                    className={`h-10 rounded-lg border-2 transition-all flex overflow-hidden ${
                      data.primaryColor === p.primary && data.accentColor === p.accent
                        ? "border-white scale-105"
                        : "border-transparent hover:border-gray-600"
                    }`}
                  >
                    <span className="flex-1" style={{ background: p.primary }} />
                    <span className="flex-1" style={{ background: p.accent }} />
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <label className="flex-1">
                  <span className="text-xs text-gray-500 block mb-1">Primary</span>
                  <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-lg px-3 py-1.5">
                    <input
                      type="color"
                      value={data.primaryColor}
                      onChange={(e) => update("primaryColor", e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                    />
                    <span className="text-xs text-gray-400 font-mono">{data.primaryColor}</span>
                  </div>
                </label>
                <label className="flex-1">
                  <span className="text-xs text-gray-500 block mb-1">Accent</span>
                  <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-lg px-3 py-1.5">
                    <input
                      type="color"
                      value={data.accentColor}
                      onChange={(e) => update("accentColor", e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                    />
                    <span className="text-xs text-gray-400 font-mono">{data.accentColor}</span>
                  </div>
                </label>
              </div>
            </section>

            {/* Business Info */}
            <section>
              <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">Business Info</h2>
              <div className="space-y-3">
                <Field label="Business Name" value={data.businessName} onChange={(v) => update("businessName", v)} placeholder="Your Business Name" />
                <Field label="Tagline" value={data.tagline} onChange={(v) => update("tagline", v)} placeholder="Your tagline here..." />
                <Field label="Logo Letter" value={data.logoText} onChange={(v) => update("logoText", v)} placeholder="Auto (first letter)" maxLength={2} />
              </div>
            </section>

            {/* Contact Info */}
            <section>
              <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">Contact Info</h2>
              <div className="space-y-3">
                <Field label="Full Name" value={data.ownerName} onChange={(v) => update("ownerName", v)} placeholder="Your Name" />
                <Field label="Title / Role" value={data.role} onChange={(v) => update("role", v)} placeholder="e.g. Founder & CEO" />
                <Field label="Phone" value={data.phone} onChange={(v) => update("phone", v)} placeholder="+1 (555) 000-0000" />
                <Field label="Email" value={data.email} onChange={(v) => update("email", v)} placeholder="you@example.com" />
                <Field label="Website" value={data.website} onChange={(v) => update("website", v)} placeholder="www.yoursite.com" />
              </div>
            </section>

            <button
              onClick={() => setData(DEFAULT_DATA)}
              className="w-full py-2 text-xs text-gray-500 hover:text-gray-300 border border-gray-800 hover:border-gray-700 rounded-lg transition-colors"
            >
              Reset to defaults
            </button>
          </div>
        </div>

        {/* Right panel — preview */}
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-900/50 p-8">
          <p className="text-xs text-gray-500 mb-6 tracking-widest uppercase">Preview — 1080×1080 Instagram Square</p>

          {/* Visible preview at 400×400 */}
          <div className="relative shadow-2xl rounded-2xl overflow-hidden" style={{ width: 400, height: 400 }}>
            <div style={{ width: 1080, height: 1080, transform: `scale(${400 / 1080})`, transformOrigin: "top left" }}>
              <CardInner data={data} />
            </div>
          </div>

          {/* Hidden full-size card for export */}
          <div ref={cardWrapperRef} style={{ position: "fixed", left: -9999, top: -9999, width: 1080, height: 1080 }}>
            <CardPreview ref={cardRef} data={data} />
          </div>

          <div className="mt-6 flex items-center gap-6 text-xs text-gray-500">
            <span>✓ 1080×1080px</span>
            <span>✓ PNG export</span>
            <span>✓ Instagram ready</span>
          </div>

          <button
            onClick={downloadCard}
            disabled={downloading}
            className="mt-6 flex items-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold px-8 py-3 rounded-xl text-sm transition-colors shadow-lg"
          >
            {downloading ? "Exporting..." : "↓ Download for Instagram"}
          </button>
        </div>
      </div>
    </div>

    {/* Export overlay — real <a> click avoids Firefox async-gesture block */}
    {exportUrl && (
      <div
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        onClick={() => setExportUrl(null)}
      >
        <div className="flex flex-col items-center gap-5" onClick={(e) => e.stopPropagation()}>
          <img src={exportUrl} alt="Card preview" style={{ width: 360, height: 360, borderRadius: 16 }} />
          <a
            href={exportUrl}
            download={`${data.businessName.replace(/\s+/g, "-").toLowerCase()}-card.png`}
            className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-8 py-3 rounded-xl text-sm transition-colors"
            onClick={() => setTimeout(() => setExportUrl(null), 500)}
          >
            ↓ Save PNG to device
          </a>
          <p className="text-gray-400 text-xs">Click outside to cancel</p>
        </div>
      </div>
    )}
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label className="text-xs text-gray-500 block mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
      />
    </div>
  );
}
