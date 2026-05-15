import { useEffect, useState } from "react";
import { X, ArrowRight } from "lucide-react";

/**
 * Nova exit-intent demonstration overlay.
 * In production, Stay22's Nova script handles trigger + render — this is the
 * branded visual fallback / preview that matches Viaive's voice.
 */
export function NovaExitIntent() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !dismissed) setOpen(true);
    };
    const timer = window.setTimeout(() => document.addEventListener("mouseleave", onLeave), 8000);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [dismissed]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Before you go"
    >
      <button
        aria-label="Close"
        onClick={() => { setOpen(false); setDismissed(true); }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div
        className="relative w-full max-w-[560px] bg-[#F9F7F2] border-2 border-[#1a1a1a] shadow-[12px_12px_0_0_#1a1a1a] p-8 lg:p-10"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <button
          onClick={() => { setOpen(false); setDismissed(true); }}
          aria-label="Close"
          className="absolute top-4 right-4 p-1 hover:bg-black/5 transition"
        >
          <X size={18} />
        </button>

        <div className="text-[11px] tracking-[0.32em] uppercase text-[#4A4A4A] mb-4">
          Before you close the tab —
        </div>

        <h3
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: "32px",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#1a1a1a",
            fontWeight: 400,
          }}
        >
          The Bangkok placement
          <br />
          <em style={{ fontWeight: 300 }}>we'd actually make.</em>
        </h3>

        <p className="mt-4 text-[15px] text-[#1a1a1a]/75 leading-relaxed">
          Tell us your dates. We'll write back with a single property recommendation from the
          audited list — not a search. No newsletter. No sales call.
        </p>

        <form
          onSubmit={(e) => { e.preventDefault(); setOpen(false); setDismissed(true); }}
          className="mt-6 space-y-3"
        >
          <input
            type="email"
            required
            placeholder="your@email.com"
            aria-label="Email"
            className="w-full bg-white border-2 border-[#1a1a1a] px-4 py-3.5 text-[15px] outline-none focus:shadow-[4px_4px_0_0_#c8a96a] transition-shadow"
          />
          <button
            type="submit"
            data-analytics-id="nova:exit-intent:submit"
            className="group w-full inline-flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-6 py-4 text-[12px] tracking-[0.22em] uppercase border-2 border-[#1a1a1a] shadow-[4px_4px_0_0_#c8a96a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[0_0_0_0_#c8a96a] transition-all duration-200"
          >
            Send me the placement <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
          </button>
          <button
            type="button"
            onClick={() => { setOpen(false); setDismissed(true); }}
            className="w-full text-[12px] tracking-[0.2em] uppercase text-[#4A4A4A] hover:text-[#1a1a1a] py-2 transition"
          >
            Maybe later
          </button>
        </form>

        <div className="mt-5 pt-5 border-t border-[#1a1a1a]/10 text-[11px] text-[#4A4A4A]">
          One letter per inquiry. Read by a senior advisor at the Asia Intelligence Desk.
        </div>
      </div>
    </div>
  );
}
