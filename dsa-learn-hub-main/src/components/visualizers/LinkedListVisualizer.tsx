import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Search, RotateCcw, ArrowRight } from "lucide-react";
import { VizShell, VizControls, VizBtn, VizInput, ResultBar } from "./shared";

interface Node { id: number; v: number }

export function LinkedListVisualizer() {
  const [list, setList] = useState<Node[]>([10, 20, 30].map((v, i) => ({ id: i, v })));
  const [val, setVal] = useState("");
  const [highlight, setHighlight] = useState<number | null>(null);
  const [msg, setMsg] = useState("Insert nodes, delete, search or reverse.");
  const [nextId, setNextId] = useState(100);

  const newId = () => { const id = nextId; setNextId(nextId + 1); return id; };

  const insertHead = () => {
    const n = parseInt(val); if (Number.isNaN(n)) return setMsg("Enter a value.");
    const id = newId(); setList((l) => [{ id, v: n }, ...l]); setHighlight(id);
    setMsg(`Inserted ${n} at the head.`);
    setTimeout(() => setHighlight(null), 900);
  };
  const insertTail = () => {
    const n = parseInt(val); if (Number.isNaN(n)) return setMsg("Enter a value.");
    const id = newId(); setList((l) => [...l, { id, v: n }]); setHighlight(id);
    setMsg(`Inserted ${n} at the tail.`);
    setTimeout(() => setHighlight(null), 900);
  };
  const del = () => {
    const n = parseInt(val); if (Number.isNaN(n)) return setMsg("Enter a value.");
    const idx = list.findIndex((x) => x.v === n);
    if (idx < 0) return setMsg(`${n} not found.`);
    setHighlight(list[idx].id);
    setTimeout(() => { setList((l) => l.filter((_, i) => i !== idx)); setHighlight(null); setMsg(`Deleted node ${n}.`); }, 500);
  };
  const search = () => {
    const n = parseInt(val); if (Number.isNaN(n)) return setMsg("Enter a value.");
    const node = list.find((x) => x.v === n);
    if (!node) { setHighlight(null); return setMsg(`${n} not found.`); }
    setHighlight(node.id); setMsg(`Found ${n}.`);
  };
  const reverse = () => { setList((l) => [...l].reverse()); setMsg("List reversed."); };
  const reset = () => { setList([10,20,30].map((v,i)=>({id:i,v}))); setMsg("Reset."); setHighlight(null); };

  return (
    <VizShell>
      <VizControls>
        <VizInput value={val} onChange={setVal} placeholder="value" />
        <VizBtn onClick={insertHead} icon={Plus}>Insert Head</VizBtn>
        <VizBtn onClick={insertTail} icon={Plus}>Insert Tail</VizBtn>
        <VizBtn onClick={del} icon={Trash2}>Delete</VizBtn>
        <VizBtn onClick={search} icon={Search}>Search</VizBtn>
        <VizBtn onClick={reverse} icon={RotateCcw}>Reverse</VizBtn>
        <VizBtn onClick={reset} variant="ghost">Reset</VizBtn>
      </VizControls>
      <div className="scrollbar-thin flex min-h-[180px] items-center gap-2 overflow-x-auto p-6">
        <AnimatePresence mode="popLayout">
          {list.map((n) => (
            <motion.div key={n.id} layout initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="flex shrink-0 items-center gap-2">
              <div className={`grid h-14 w-20 place-items-center rounded-xl border font-bold ${
                highlight === n.id ? "border-[color:var(--brand-cyan)] bg-[color:var(--brand-cyan)]/20 shadow-[var(--shadow-glow)]" : "border-border bg-white/5"
              }`}>{n.v}</div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="rounded-xl border border-dashed border-border px-4 py-3 text-xs text-muted-foreground">NULL</div>
      </div>
      <ResultBar>{msg}</ResultBar>
    </VizShell>
  );
}
