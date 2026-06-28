import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { VizShell, VizControls, VizBtn, VizInput, ResultBar } from "./shared";

export function QueueVisualizer({ deque = false }: { deque?: boolean }) {
  const [q, setQ] = useState<{ id: number; v: number }[]>(
    [5, 15, 25, 35].map((v, i) => ({ id: i, v })),
  );
  const [val, setVal] = useState("");
  const [highlight, setHighlight] = useState<number | null>(null);
  const [msg, setMsg] = useState(deque ? "Deque — insert/remove at both ends." : "FIFO — enqueue at rear, dequeue at front.");
  const [nextId, setNextId] = useState(100);
  const newId = () => { const id = nextId; setNextId(nextId + 1); return id; };

  const enqueue = () => {
    const n = parseInt(val); if (Number.isNaN(n)) return setMsg("Enter a value.");
    const id = newId(); setQ((a) => [...a, { id, v: n }]); setHighlight(id);
    setMsg(`Enqueued ${n} at rear.`); setTimeout(() => setHighlight(null), 800);
  };
  const dequeue = () => {
    if (!q.length) return setMsg("Queue is empty.");
    const f = q[0]; setHighlight(f.id);
    setTimeout(() => { setQ((a) => a.slice(1)); setHighlight(null); setMsg(`Dequeued ${f.v} from front.`); }, 450);
  };
  const pushFront = () => {
    const n = parseInt(val); if (Number.isNaN(n)) return setMsg("Enter a value.");
    const id = newId(); setQ((a) => [{ id, v: n }, ...a]); setHighlight(id);
    setMsg(`Inserted ${n} at front.`); setTimeout(() => setHighlight(null), 800);
  };
  const popBack = () => {
    if (!q.length) return setMsg("Empty.");
    const b = q[q.length - 1]; setHighlight(b.id);
    setTimeout(() => { setQ((a) => a.slice(0, -1)); setHighlight(null); setMsg(`Removed ${b.v} from back.`); }, 450);
  };

  return (
    <VizShell>
      <VizControls>
        <VizInput value={val} onChange={setVal} placeholder="value" />
        {deque ? (
          <>
            <VizBtn onClick={pushFront} icon={Plus}>Push Front</VizBtn>
            <VizBtn onClick={enqueue} icon={Plus}>Push Back</VizBtn>
            <VizBtn onClick={dequeue} icon={Trash2}>Pop Front</VizBtn>
            <VizBtn onClick={popBack} icon={Trash2}>Pop Back</VizBtn>
          </>
        ) : (
          <>
            <VizBtn onClick={enqueue} icon={Plus}>Enqueue</VizBtn>
            <VizBtn onClick={dequeue} icon={Trash2}>Dequeue</VizBtn>
          </>
        )}
      </VizControls>
      <div className="scrollbar-thin flex min-h-[200px] flex-col items-center justify-center gap-3 overflow-x-auto p-6">
        <div className="flex w-full justify-between max-w-md text-xs font-medium text-[color:var(--brand-cyan)]">
          <span>↓ FRONT</span><span>REAR ↓</span>
        </div>
        <div className="flex items-center gap-2">
          <AnimatePresence mode="popLayout">
            {q.map((el) => (
              <motion.div key={el.id} layout
                initial={{ opacity: 0, x: 40, scale: 0.7 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -40, scale: 0.7 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl border font-bold ${
                  highlight === el.id ? "border-[color:var(--brand-cyan)] bg-[color:var(--brand-cyan)]/20 shadow-[var(--shadow-glow)]" : "border-border bg-white/5"
                }`}>{el.v}</motion.div>
            ))}
          </AnimatePresence>
          {q.length === 0 && <div className="text-sm text-muted-foreground">empty</div>}
        </div>
      </div>
      <ResultBar>{msg}</ResultBar>
    </VizShell>
  );
}
