import type { ComponentType, ReactNode } from "react";

export function VizShell({ children }: { children: ReactNode }) {
  return <div className="glass rounded-2xl overflow-hidden">{children}</div>;
}

export function VizControls({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-2 border-b border-border/60 bg-white/[0.02] p-4">{children}</div>;
}

export function VizInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-24 rounded-lg border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-[color:var(--brand-purple)]"
    />
  );
}

export function VizBtn({ onClick, children, icon: Icon, variant = "solid", disabled }: {
  onClick: () => void; children: ReactNode; icon?: ComponentType<{ className?: string }>; variant?: "solid" | "ghost"; disabled?: boolean;
}) {
  const base = "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";
  const cls = variant === "solid"
    ? `${base} gradient-brand text-white hover:opacity-90`
    : `${base} border border-border bg-white/5 hover:bg-white/10`;
  return (
    <button onClick={onClick} disabled={disabled} className={cls}>
      {Icon && <Icon className="h-4 w-4" />}{children}
    </button>
  );
}

export function ResultBar({ children }: { children: ReactNode }) {
  return (
    <div className="border-t border-border/60 bg-white/[0.02] px-5 py-3 text-sm">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">Result · </span>
      <span className="text-foreground">{children}</span>
    </div>
  );
}
