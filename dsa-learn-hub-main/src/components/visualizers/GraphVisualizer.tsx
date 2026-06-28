import { useEffect, useRef, useState } from "react";
import { Plus, Trash2, Play } from "lucide-react";
import { VizShell, VizControls, VizBtn, VizInput, ResultBar } from "./shared";

interface GNode { id: number; x: number; y: number; label: string }
interface GEdge { a: number; b: number }

export function GraphVisualizer() {
  const [nodes, setNodes] = useState<GNode[]>([
    { id: 1, x: 120, y: 80, label: "A" },
    { id: 2, x: 260, y: 60, label: "B" },
    { id: 3, x: 400, y: 120, label: "C" },
    { id: 4, x: 160, y: 220, label: "D" },
    { id: 5, x: 340, y: 240, label: "E" },
  ]);
  const [edges, setEdges] = useState<GEdge[]>([
    { a: 1, b: 2 }, { a: 2, b: 3 }, { a: 1, b: 4 }, { a: 4, b: 5 }, { a: 3, b: 5 },
  ]);
  const [from, setFrom] = useState(""); const [to, setTo] = useState("");
  const [highlight, setHighlight] = useState<Set<number>>(new Set());
  const [msg, setMsg] = useState("Drag nodes, add/remove edges, or run BFS/DFS.");
  const [nextId, setNextId] = useState(6);
  const dragRef = useRef<{ id: number; dx: number; dy: number } | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const addNode = () => {
    const id = nextId; setNextId(id + 1);
    const label = String.fromCharCode(64 + id);
    setNodes((ns) => [...ns, { id, x: 80 + Math.random() * 380, y: 60 + Math.random() * 200, label }]);
    setMsg(`Added node ${label}.`);
  };
  const removeNode = () => {
    if (!nodes.length) return;
    const last = nodes[nodes.length - 1];
    setNodes((ns) => ns.slice(0, -1));
    setEdges((es) => es.filter((e) => e.a !== last.id && e.b !== last.id));
    setMsg(`Removed node ${last.label}.`);
  };
  const addEdge = () => {
    const a = nodes.find((n) => n.label.toLowerCase() === from.toLowerCase());
    const b = nodes.find((n) => n.label.toLowerCase() === to.toLowerCase());
    if (!a || !b || a.id === b.id) return setMsg("Enter two existing node labels (e.g. A and B).");
    if (edges.some((e) => (e.a === a.id && e.b === b.id) || (e.a === b.id && e.b === a.id))) return setMsg("Edge exists.");
    setEdges((es) => [...es, { a: a.id, b: b.id }]); setMsg(`Added edge ${a.label}-${b.label}.`);
  };
  const removeEdge = () => {
    const a = nodes.find((n) => n.label.toLowerCase() === from.toLowerCase());
    const b = nodes.find((n) => n.label.toLowerCase() === to.toLowerCase());
    if (!a || !b) return setMsg("Enter two labels.");
    setEdges((es) => es.filter((e) => !((e.a === a.id && e.b === b.id) || (e.a === b.id && e.b === a.id))));
    setMsg(`Removed edge ${a.label}-${b.label}.`);
  };

  const traverse = (mode: "bfs" | "dfs") => {
    const start = nodes.find((n) => n.label.toLowerCase() === from.toLowerCase()) ?? nodes[0];
    if (!start) return;
    const adj = new Map<number, number[]>();
    nodes.forEach((n) => adj.set(n.id, []));
    edges.forEach((e) => { adj.get(e.a)!.push(e.b); adj.get(e.b)!.push(e.a); });
    const order: number[] = [], seen = new Set<number>([start.id]);
    if (mode === "bfs") {
      const q = [start.id];
      while (q.length) { const u = q.shift()!; order.push(u); for (const v of adj.get(u)!) if (!seen.has(v)) { seen.add(v); q.push(v); } }
    } else {
      const stk = [start.id]; const visited = new Set<number>();
      while (stk.length) { const u = stk.pop()!; if (visited.has(u)) continue; visited.add(u); order.push(u);
        for (const v of [...adj.get(u)!].reverse()) if (!visited.has(v)) stk.push(v); }
    }
    setHighlight(new Set());
    order.forEach((id, i) => setTimeout(() => setHighlight((h) => new Set(h).add(id)), i * 500));
    const labels = order.map((id) => nodes.find((n) => n.id === id)?.label).join(" → ");
    setTimeout(() => setMsg(`${mode.toUpperCase()} from ${start.label}: ${labels}`), order.length * 500);
    setTimeout(() => setHighlight(new Set()), order.length * 500 + 1800);
  };

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!dragRef.current || !svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - dragRef.current.dx;
      const y = e.clientY - rect.top - dragRef.current.dy;
      setNodes((ns) => ns.map((n) => n.id === dragRef.current!.id ? { ...n, x, y } : n));
    };
    const up = () => { dragRef.current = null; };
    window.addEventListener("mousemove", move); window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
  }, []);

  return (
    <VizShell>
      <VizControls>
        <VizBtn onClick={addNode} icon={Plus}>Add Node</VizBtn>
        <VizBtn onClick={removeNode} icon={Trash2}>Remove Node</VizBtn>
        <VizInput value={from} onChange={setFrom} placeholder="A" />
        <VizInput value={to} onChange={setTo} placeholder="B" />
        <VizBtn onClick={addEdge} icon={Plus}>Add Edge</VizBtn>
        <VizBtn onClick={removeEdge} icon={Trash2}>Remove Edge</VizBtn>
        <VizBtn onClick={() => traverse("bfs")} icon={Play} variant="ghost">BFS</VizBtn>
        <VizBtn onClick={() => traverse("dfs")} variant="ghost">DFS</VizBtn>
      </VizControls>
      <div className="overflow-hidden">
        <svg ref={svgRef} viewBox="0 0 500 320" className="block h-[320px] w-full select-none">
          {edges.map((e, i) => {
            const a = nodes.find((n) => n.id === e.a); const b = nodes.find((n) => n.id === e.b);
            if (!a || !b) return null;
            return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="oklch(1 0 0 / 0.25)" strokeWidth={2} />;
          })}
          {nodes.map((n) => {
            const isHi = highlight.has(n.id);
            return (
              <g key={n.id}
                onMouseDown={(e) => {
                  if (!svgRef.current) return;
                  const rect = svgRef.current.getBoundingClientRect();
                  dragRef.current = { id: n.id, dx: e.clientX - rect.left - n.x, dy: e.clientY - rect.top - n.y };
                }}
                style={{ cursor: "grab" }}
              >
                <circle cx={n.x} cy={n.y} r={22}
                  fill={isHi ? "oklch(0.72 0.18 210 / 0.4)" : "oklch(0.28 0.08 290 / 0.85)"}
                  stroke={isHi ? "oklch(0.78 0.15 210)" : "oklch(0.65 0.22 280)"} strokeWidth={2} />
                <text x={n.x} y={n.y + 5} textAnchor="middle" fill="white" fontWeight={700} fontSize={14}>{n.label}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <ResultBar>{msg}</ResultBar>
    </VizShell>
  );
}
