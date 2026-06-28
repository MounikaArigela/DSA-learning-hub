import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { ArrowLeft, BookOpen, Sparkles, Activity, Globe, Gauge, Code2, Play } from "lucide-react";
import { getTopic, TOPICS } from "@/lib/topics";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CodeTabs } from "@/components/CodeTabs";
import { VisualizerFor } from "@/components/visualizers";

import type { Topic } from "@/lib/topics";

export const Route = createFileRoute("/topic/$id")({
  loader: ({ params }): { topic: Topic } => {
    const topic = getTopic(params.id);
    if (!topic) throw notFound();
    return { topic };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.topic.name} — DSA Visual Learning Hub` },
          { name: "description", content: loaderData.topic.short },
          { property: "og:title", content: `${loaderData.topic.name} — DSA Hub` },
          { property: "og:description", content: loaderData.topic.short },
        ]
      : [{ title: "Topic — DSA Hub" }],
  }),
  notFoundComponent: () => (
    <div className="glass rounded-2xl p-10 text-center">
      <h1 className="text-2xl font-bold">Topic not found</h1>
      <Link to="/" className="mt-4 inline-block text-[color:var(--brand-cyan)] underline">Back to dashboard</Link>
    </div>
  ),
  component: TopicPage,
});

function TopicPage() {
  const { topic } = Route.useLoaderData() as { topic: Topic };
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[topic.icon] ?? Icons.Box;
  const categoryLink = topic.category === "linear" ? "/linear" : "/non-linear";
  const categoryLabel = topic.category === "linear" ? "Linear" : "Non-Linear";

  return (
    <article className="space-y-12">
      <Breadcrumbs items={[{ label: "Dashboard", to: "/" }, { label: categoryLabel, to: categoryLink }, { label: topic.name }]} />

      {/* Header */}
      <motion.header initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass gradient-border rounded-3xl p-8 sm:p-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl gradient-brand text-white shadow-[var(--shadow-glow)]">
            <Icon className="h-7 w-7" />
          </div>
          <div className="min-w-0">
            <span className="text-xs uppercase tracking-widest text-[color:var(--brand-cyan)]">{categoryLabel} Structure</span>
            <h1 className="mt-1 text-4xl font-black sm:text-5xl">{topic.name}</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">{topic.short}</p>
          </div>
        </div>
      </motion.header>

      {/* Definition + Characteristics */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Section title="Definition" icon={BookOpen} className="lg:col-span-2">
          <p className="text-base leading-relaxed text-foreground/90">{topic.definition}</p>
        </Section>
        <Section title="Characteristics" icon={Sparkles}>
          <ul className="space-y-2.5">
            {topic.characteristics.map((c) => (
              <li key={c} className="flex gap-2.5 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full gradient-brand" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {/* Operations */}
      <Section title="Operations" icon={Activity}>
        <div className="flex flex-wrap gap-2">
          {topic.operations.map((op) => (
            <span key={op} className="rounded-full border border-border bg-white/5 px-3.5 py-1.5 text-sm font-medium">{op}</span>
          ))}
        </div>
      </Section>

      {/* Examples */}
      <Section title="Real-World Examples" icon={Globe}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topic.examples.map((ex) => (
            <div key={ex.title} className="glass glass-hover rounded-2xl p-5">
              <h4 className="font-bold">{ex.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{ex.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Complexity */}
      <Section title="Complexity Analysis" icon={Gauge}>
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Operation</th>
                <th className="px-4 py-3 text-left font-semibold">Time</th>
                <th className="px-4 py-3 text-left font-semibold">Space</th>
              </tr>
            </thead>
            <tbody>
              {topic.complexity.map((row, i) => (
                <tr key={row.operation} className={i % 2 ? "bg-white/[0.02]" : ""}>
                  <td className="px-4 py-3 font-medium">{row.operation}</td>
                  <td className="px-4 py-3 font-mono text-[color:var(--brand-cyan)]">{row.time}</td>
                  <td className="px-4 py-3 font-mono text-[color:var(--brand-cyan)]">{row.space}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Code */}
      <Section title="Code Implementations" icon={Code2}>
        <CodeTabs code={topic.code} />
      </Section>

      {/* Visualizer */}
      <Section title="Interactive Visualizer" icon={Play}>
        <VisualizerFor topic={topic} />
      </Section>

      {/* Continue */}
      <ContinueNav id={topic.id} />
    </article>
  );
}

function Section({ title, icon: Icon, children, className = "" }: { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode; className?: string }) {
  return (
    <section className={className}>
      <div className="mb-4 flex items-center gap-2.5">
        <div className="grid h-8 w-8 place-items-center rounded-lg gradient-brand-soft border border-border">
          <Icon className="h-4 w-4 text-[color:var(--brand-cyan)]" />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="glass rounded-2xl p-6">{children}</div>
    </section>
  );
}

function ContinueNav({ id }: { id: string }) {
  const idx = TOPICS.findIndex((t) => t.id === id);
  const prev = idx > 0 ? TOPICS[idx - 1] : null;
  const next = idx < TOPICS.length - 1 ? TOPICS[idx + 1] : null;
  return (
    <nav className="flex flex-col gap-3 sm:flex-row sm:justify-between">
      {prev ? (
        <Link to="/topic/$id" params={{ id: prev.id }} className="glass glass-hover flex flex-1 items-center gap-3 rounded-2xl p-5">
          <ArrowLeft className="h-5 w-5" />
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Previous</div>
            <div className="font-bold">{prev.name}</div>
          </div>
        </Link>
      ) : <div className="flex-1" />}
      {next ? (
        <Link to="/topic/$id" params={{ id: next.id }} className="glass glass-hover flex flex-1 items-center justify-end gap-3 rounded-2xl p-5 text-right">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Next</div>
            <div className="font-bold">{next.name}</div>
          </div>
          <ArrowLeft className="h-5 w-5 rotate-180" />
        </Link>
      ) : <div className="flex-1" />}
    </nav>
  );
}
