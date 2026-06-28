import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { Lang } from "@/lib/topics";

const LANGS: { id: Lang; label: string }[] = [
  { id: "c", label: "C" },
  { id: "cpp", label: "C++" },
  { id: "java", label: "Java" },
  { id: "python", label: "Python" },
];

export function CodeTabs({ code }: { code: Record<Lang, string> }) {
  const [active, setActive] = useState<Lang>("python");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try { await navigator.clipboard.writeText(code[active]); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  };

  return (
    <div className="glass overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-border/60 bg-white/[0.02] px-2 py-2">
        <div className="flex gap-1">
          {LANGS.map((l) => (
            <button key={l.id} onClick={() => setActive(l.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                active === l.id ? "gradient-brand text-white" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              }`}>{l.label}</button>
          ))}
        </div>
        <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white/5 px-3 py-1.5 text-xs font-medium hover:bg-white/10">
          {copied ? <><Check className="h-3.5 w-3.5" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
        </button>
      </div>
      <pre className="scrollbar-thin overflow-x-auto p-5 text-sm leading-relaxed">
        <code className="text-foreground/90">{code[active]}</code>
      </pre>
    </div>
  );
}
