import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Eye } from "lucide-react";
import { VizShell, VizControls, VizBtn, VizInput, ResultBar } from "./shared";

export function StackVisualizer() {
  const [stack, setStack] = useState<{ id: number; v: number }[]>([
    { id: 0, v: 10 }, { id: 1, v: 20 }, { id: 2, v: 30 },
  ]);
  const [val, setVal] = useState("");
  const [highlight, setHighlight] = useState<number | null>(null);
  const [msg, setMsg] = useState("LIFO — push/pop happens at the top.");
  const [nextId, setNextId] = useState(100);

  const push = () => {
    const n = parseInt(val); if (Number.isNaN(n)) return setMsg("Enter a value.");
    const id = nextId; setNextId(nextId + 1);
    setStack((s) => [...s, { id, v: n }]); setHighlight(id);
    setMsg(`Pushed ${n} onto the stack.`);
    setTimeout(() => setHighlight(null), 900);
  };
  const pop = () => {
    if (!stack.length) return setMsg("Stack underflow — it's empty.");
    const top = stack[stack.length - 1]; setHighlight(top.id);
    setTimeout(() => { setStack((s) => s.slice(0, -1)); setHighlight(null); setMsg(`Popped ${top.v}.`); }, 450);
  };
  const peek = () => {
    if (!stack.length) return setMsg("Stack is empty.");
    const top = stack[stack.length - 1]; setHighlight(top.id);
    setMsg(`Top of stack is ${top.v}.`);
  };

  return (
    <VizShell>
      <VizControls>
        <VizInput value={val} onChange={setVal} placeholder="value" />
        <VizBtn onClick={push} icon={Plus}>Push</VizBtn>
        <VizBtn onClick={pop} icon={Trash2}>Pop</VizBtn>
        <VizBtn onClick={peek} icon={Eye}>Peek</VizBtn>
      </VizControls>
      <div className="flex min-h-[280px] items-end justify-center p-6">
        <div className="flex w-40 flex-col-reverse items-stretch gap-1.5">
          <AnimatePresence mode="popLayout">
            {stack.map((el, i) => (
              <motion.div
                key={el.id} layout
                initial={{ opacity: 0, y: -40, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.7 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                className={`relative flex h-12 items-center justify-center rounded-lg border text-base font-bold ${
                  highlight === el.id ? "border-[color:var(--brand-cyan)] bg-[color:var(--brand-cyan)]/20" : "border-border bg-white/5"
                }`}
              >
                {el.v}
                {i === stack.length - 1 && (
                  <span className="absolute -right-16 text-xs font-medium text-[color:var(--brand-cyan)]">← top</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="h-1 rounded-b-lg gradient-brand" />
        </div>
      </div>
      <ResultBar>{msg}</ResultBar>
    </VizShell>
  );
}
