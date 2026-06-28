import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Search, Play } from "lucide-react";
import { VizShell, VizControls, VizBtn, VizInput, ResultBar } from "./shared";

interface TreeNode { v: number; l: TreeNode | null; r: TreeNode | null }

function insertBST(root: TreeNode | null, v: number): TreeNode {
  if (!root) return { v, l: null, r: null };
  if (v < root.v) root.l = insertBST(root.l, v);
  else if (v > root.v) root.r = insertBST(root.r, v);
  return root;
}
function deleteBST(root: TreeNode | null, v: number): TreeNode | null {
  if (!root) return null;
  if (v < root.v) root.l = deleteBST(root.l, v);
  else if (v > root.v) root.r = deleteBST(root.r, v);
  else {
    if (!root.l) return root.r;
    if (!root.r) return root.l;
    let succ = root.r;
    while (succ.l) succ = succ.l;
    root.v = succ.v;
    root.r = deleteBST(root.r, succ.v);
  }
  return root;
}
function clone(n: TreeNode | null): TreeNode | null { return n ? { v: n.v, l: clone(n.l), r: clone(n.r) } : null; }

function layout(root: TreeNode | null) {
  const positions: { v: number; x: number; y: number }[] = [];
  const edges: { x1: number; y1: number; x2: number; y2: number }[] = [];
  if (!root) return { positions, edges, width: 0, height: 0 };
  // assign x via inorder counter
  let counter = 0;
  const dfs = (n: TreeNode | null, depth: number): { x: number; y: number } | null => {
    if (!n) return null;
    const lp = dfs(n.l, depth + 1);
    const x = counter++; const y = depth;
    const pos = { v: n.v, x, y };
    positions.push(pos);
    const rp = dfs(n.r, depth + 1);
    if (lp) edges.push({ x1: x, y1: y, x2: lp.x, y2: lp.y });
    if (rp) edges.push({ x1: x, y1: y, x2: rp.x, y2: rp.y });
    return { x, y };
  };
  dfs(root, 0);
  const width = Math.max(...positions.map((p) => p.x)) + 1;
  const height = Math.max(...positions.map((p) => p.y)) + 1;
  return { positions, edges, width, height };
}

export function TreeVisualizer() {
  const [root, setRoot] = useState<TreeNode | null>(() => {
    let r: TreeNode | null = null;
    for (const v of [50, 30, 70, 20, 40, 60, 80]) r = insertBST(r, v);
    return r;
  });
  const [val, setVal] = useState("");
  const [highlight, setHighlight] = useState<number[]>([]);
  const [msg, setMsg] = useState("Insert or traverse the BST.");

  const { positions, edges, width, height } = useMemo(() => layout(root), [root]);
  const CELL_X = 70, CELL_Y = 80, PAD = 40;
  const svgW = Math.max(width * CELL_X + PAD * 2, 400);
  const svgH = Math.max(height * CELL_Y + PAD * 2, 200);

  const insert = () => {
    const n = parseInt(val); if (Number.isNaN(n)) return setMsg("Enter a value.");
    setRoot((r) => insertBST(clone(r), n));
    setHighlight([n]); setMsg(`Inserted ${n}.`);
    setTimeout(() => setHighlight([]), 900);
  };
  const del = () => {
    const n = parseInt(val); if (Number.isNaN(n)) return setMsg("Enter a value.");
    setRoot((r) => deleteBST(clone(r), n)); setMsg(`Deleted ${n} (if present).`);
  };
  const search = () => {
    const n = parseInt(val); if (Number.isNaN(n)) return setMsg("Enter a value.");
    let cur = root; const path: number[] = [];
    while (cur) { path.push(cur.v); if (n === cur.v) break; cur = n < cur.v ? cur.l : cur.r; }
    animatePath(path, cur ? `Found ${n}.` : `${n} not found.`);
  };
  const animatePath = (order: number[], finalMsg: string) => {
    setHighlight([]); setMsg("Traversing…");
    order.forEach((v, i) => {
      setTimeout(() => {
        setHighlight((h) => [...h, v]);
        if (i === order.length - 1) setTimeout(() => { setMsg(`${finalMsg}  Order: ${order.join(" → ")}`); }, 300);
      }, i * 450);
    });
    setTimeout(() => setHighlight([]), order.length * 450 + 1500);
  };
  const traverse = (kind: "in" | "pre" | "post" | "level") => {
    const order: number[] = [];
    const inorder = (n: TreeNode | null) => { if (!n) return; inorder(n.l); order.push(n.v); inorder(n.r); };
    const preorder = (n: TreeNode | null) => { if (!n) return; order.push(n.v); preorder(n.l); preorder(n.r); };
    const postorder = (n: TreeNode | null) => { if (!n) return; postorder(n.l); postorder(n.r); order.push(n.v); };
    const level = (n: TreeNode | null) => { const q: TreeNode[] = n ? [n] : []; while (q.length) { const x = q.shift()!; order.push(x.v); if (x.l) q.push(x.l); if (x.r) q.push(x.r); } };
    ({ in: inorder, pre: preorder, post: postorder, level }[kind])(root);
    animatePath(order, `${kind === "in" ? "Inorder" : kind === "pre" ? "Preorder" : kind === "post" ? "Postorder" : "Level Order"} complete.`);
  };

  return (
    <VizShell>
      <VizControls>
        <VizInput value={val} onChange={setVal} placeholder="value" />
        <VizBtn onClick={insert} icon={Plus}>Insert</VizBtn>
        <VizBtn onClick={del} icon={Trash2}>Delete</VizBtn>
        <VizBtn onClick={search} icon={Search}>Search</VizBtn>
        <VizBtn onClick={() => traverse("in")} icon={Play} variant="ghost">Inorder</VizBtn>
        <VizBtn onClick={() => traverse("pre")} variant="ghost">Preorder</VizBtn>
        <VizBtn onClick={() => traverse("post")} variant="ghost">Postorder</VizBtn>
        <VizBtn onClick={() => traverse("level")} variant="ghost">Level</VizBtn>
      </VizControls>
      <div className="scrollbar-thin overflow-x-auto p-4">
        <svg width={svgW} height={svgH} className="mx-auto">
          {edges.map((e, i) => (
            <line key={i}
              x1={PAD + e.x1 * CELL_X + 22} y1={PAD + e.y1 * CELL_Y + 22}
              x2={PAD + e.x2 * CELL_X + 22} y2={PAD + e.y2 * CELL_Y + 22}
              stroke="oklch(1 0 0 / 0.2)" strokeWidth={2} />
          ))}
          {positions.map((p) => {
            const isHi = highlight.includes(p.v);
            return (
              <motion.g key={p.v} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transform={`translate(${PAD + p.x * CELL_X},${PAD + p.y * CELL_Y})`}>
                <circle cx={22} cy={22} r={22}
                  fill={isHi ? "oklch(0.72 0.18 210 / 0.3)" : "oklch(0.22 0.05 270 / 0.8)"}
                  stroke={isHi ? "oklch(0.78 0.15 210)" : "oklch(1 0 0 / 0.2)"} strokeWidth={2} />
                <text x={22} y={27} textAnchor="middle" fill="white" fontWeight={700} fontSize={13}>{p.v}</text>
              </motion.g>
            );
          })}
        </svg>
      </div>
      <ResultBar>{msg}</ResultBar>
    </VizShell>
  );
}
