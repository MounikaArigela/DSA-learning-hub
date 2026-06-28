import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowRight, Search, Sparkles, Layers3, Network, Zap, BookOpen, Code2 } from "lucide-react";
import { TOPICS, linearTopics, nonLinearTopics } from "@/lib/topics";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DSA Visual Learning Hub — Dashboard" },
      { name: "description", content: "Interactive dashboard to learn linear and non-linear data structures through animations and code." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [q, setQ] = useState("");
  const matches = useMemo(
    () => (q.trim() ? TOPICS.filter((t) => t.name.toLowerCase().includes(q.toLowerCase()) || t.short.toLowerCase().includes(q.toLowerCase())) : []),
    [q],
  );
  const linear = linearTopics();
  const nonLinear = nonLinearTopics();

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl glass gradient-border px-6 py-14 sm:px-12 sm:py-20">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-[color:var(--brand-cyan)]" /> Visual · Interactive · Multi-language
          </span>
          <h1 className="mt-5 text-4xl font-black leading-[1.05] sm:text-6xl">
            Master <span className="gradient-text">Data Structures</span> by watching them think.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Animated visualizers, real-world examples, complexity tables, and code in C, C++, Java and Python — for every structure you need to know.
          </p>

          {/* Search */}
          <div className="relative mt-8 max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search topics: arrays, graphs, AVL…"
              className="w-full rounded-xl border border-border bg-background/60 py-3.5 pl-11 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-[color:var(--brand-purple)]"
            />
            {q && matches.length > 0 && (
              <div className="absolute z-10 mt-2 w-full rounded-xl glass p-1.5">
                {matches.slice(0, 6).map((t) => (
                  <Link key={t.id} to="/topic/$id" params={{ id: t.id }} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-white/5">
                    <span>{t.name}</span><span className="text-xs text-muted-foreground">{t.category}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/linear" className="inline-flex items-center gap-2 rounded-xl gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-glow)]">
              Start Learning <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/about" className="inline-flex items-center gap-2 rounded-xl border border-border bg-white/5 px-5 py-3 text-sm font-semibold">
              About
            </Link>
          </div>
        </motion.div>

        {/* Stats / progress */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Topics", value: TOPICS.length, icon: BookOpen },
            { label: "Visualizers", value: 6, icon: Zap },
            { label: "Languages", value: 4, icon: Code2 },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5">
              <s.icon className="h-5 w-5 text-[color:var(--brand-cyan)]" />
              <div className="mt-3 text-3xl font-black gradient-text">{s.value}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Choose a Learning Path</h2>
            <p className="mt-2 text-sm text-muted-foreground">Pick a category to explore its topics.</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <PathCard
            to="/linear" title="Linear Data Structures"
            description="Elements arranged sequentially — arrays, lists, stacks, queues, deques."
            icon={<Layers3 className="h-7 w-7" />}
            count={linear.length}
            topics={linear.map((t) => t.name)}
          />
          <PathCard
            to="/non-linear" title="Non-Linear Data Structures"
            description="Hierarchies and networks — trees, BSTs, AVLs, heaps, tries, graphs."
            icon={<Network className="h-7 w-7" />}
            count={nonLinear.length}
            topics={nonLinear.map((t) => t.name)}
          />
        </div>
      </section>

      {/* Progress tracker */}
      <section className="glass rounded-3xl p-8">
        <h3 className="text-2xl font-bold">Your Learning Journey</h3>
        <p className="mt-1 text-sm text-muted-foreground">Tracks the topics available in this curriculum.</p>
        <div className="mt-6 space-y-4">
          {[
            { label: "Linear Structures", value: linear.length, total: linear.length },
            { label: "Non-Linear Structures", value: nonLinear.length, total: nonLinear.length },
          ].map((p) => (
            <div key={p.label}>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium">{p.label}</span>
                <span className="text-muted-foreground">{p.value} / {p.total} topics</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
                <motion.div initial={{ width: 0 }} animate={{ width: `${(p.value / p.total) * 100}%` }} transition={{ duration: 1, ease: "easeOut" }} className="h-full gradient-brand" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function PathCard({ to, title, description, icon, count, topics }: { to: string; title: string; description: string; icon: React.ReactNode; count: number; topics: string[] }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
      <Link to={to} className="group block glass glass-hover rounded-3xl p-8">
        <div className="flex items-start justify-between">
          <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-brand text-white shadow-[var(--shadow-glow)]">
            {icon}
          </div>
          <span className="rounded-full border border-border bg-white/5 px-3 py-1 text-xs font-semibold text-muted-foreground">{count} topics</span>
        </div>
        <h3 className="mt-6 text-2xl font-bold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {topics.map((t) => (
            <span key={t} className="rounded-md border border-border bg-white/5 px-2.5 py-1 text-xs">{t}</span>
          ))}
        </div>
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--brand-cyan)]">
          Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  );
}
