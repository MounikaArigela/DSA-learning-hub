import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Search, RotateCcw } from "lucide-react";
import { VizShell, VizControls, VizBtn, VizInput, ResultBar } from "./shared";

export function ArrayVisualizer() {
  const [arr, setArr] = useState<{ id: number; v: number }[]>(
    [10, 25, 30, 45, 60].map((v, i) => ({ id: i, v })),
  );
  const [val, setVal] = useState("");
  const [highlight, setHighlight] = useState<number | null>(null);
  const [msg, setMsg] = useState("Insert, delete, search or reverse the array below.");
  const [nextId, setNextId] = useState(100);

  const insert = () => {
    const n = parseInt(val); if (Number.isNaN(n)) return setMsg("Enter a number first.");
    const id = nextId; setNextId(nextId + 1);
    setArr((a) => [...a, { id, v: n }]); setHighlight(id);
    setMsg(`Inserted ${n} at index ${arr.length}.`);
    setTimeout(() => setHighlight(null), 900);
  };
  const del = () => {
    const n = parseInt(val); if (Number.isNaN(n)) return setMsg("Enter a number to delete.");
    const idx = arr.findIndex((x) => x.v === n);
    if (idx < 0) return setMsg(`${n} not found.`);
    setHighlight(arr[idx].id);
    setTimeout(() => { setArr((a) => a.filter((_, i) => i !== idx)); setHighlight(null); setMsg(`Deleted ${n} from index ${idx}.`); }, 500);
  };
  const search = () => {
    const n = parseInt(val); if (Number.isNaN(n)) return setMsg("Enter a number to search.");
    const idx = arr.findIndex((x) => x.v === n);
    if (idx < 0) { setMsg(`${n} not found.`); setHighlight(null); return; }
    setHighlight(arr[idx].id); setMsg(`Found ${n} at index ${idx}.`);
  };
  const reverse = () => { setArr((a) => [...a].reverse()); setMsg("Array reversed."); };
  const reset = () => { setArr([10,25,30,45,60].map((v,i)=>({id:i,v}))); setMsg("Reset."); setHighlight(null); };

  return (
    <VizShell>
      <VizControls>
        <VizInput value={val} onChange={setVal} placeholder="value" />
        <VizBtn onClick={insert} icon={Plus}>Insert</VizBtn>
        <VizBtn onClick={del} icon={Trash2}>Delete</VizBtn>
        <VizBtn onClick={search} icon={Search}>Search</VizBtn>
        <VizBtn onClick={reverse} icon={RotateCcw}>Reverse</VizBtn>
        <VizBtn onClick={reset} variant="ghost">Reset</VizBtn>
      </VizControls>
      <div className="flex min-h-[180px] flex-wrap items-end gap-2 p-6">
        <AnimatePresence mode="popLayout">
          {arr.map((el, i) => (
            <motion.div
              key={el.id} layout
              initial={{ opacity: 0, scale: 0.6, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className={`flex flex-col items-center`}
            >
              <div className={`grid h-16 w-16 place-items-center rounded-xl border text-lg font-bold transition-all ${
                highlight === el.id ? "border-[color:var(--brand-cyan)] bg-[color:var(--brand-cyan)]/20 shadow-[var(--shadow-glow)]" : "border-border bg-white/5"
              }`}>{el.v}</div>
              <div className="mt-1.5 text-xs text-muted-foreground">[{i}]</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ResultBar>{msg}</ResultBar>
    </VizShell>
  );
}
