import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Eye, Code2, Cpu } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — DSA Visual Learning Hub" },
      { name: "description", content: "The mission and philosophy behind DSA Visual Learning Hub." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Breadcrumbs items={[{ label: "Dashboard", to: "/" }, { label: "About" }]} />
      <h1 className="text-4xl font-black sm:text-5xl">About <span className="gradient-text">DSA Hub</span></h1>
      <p className="mt-5 text-lg text-muted-foreground">
        DSA Visual Learning Hub is a focused, interactive playground for understanding data structures the way they actually work — by watching them in motion. Every topic ships with theory, real-world examples, complexity analysis, multi-language code, and a hands-on visualizer.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {[
          { icon: Eye, title: "Visual First", desc: "Animation reveals the mechanics behind every operation." },
          { icon: Code2, title: "Multi-Language Code", desc: "C, C++, Java and Python implementations side-by-side." },
          { icon: Cpu, title: "Complexity-Aware", desc: "Time/space complexity tables for every operation." },
          { icon: Sparkles, title: "Real-World Examples", desc: "See where each structure shows up in real systems." },
        ].map((f) => (
          <div key={f.title} className="glass rounded-2xl p-6">
            <div className="grid h-10 w-10 place-items-center rounded-xl gradient-brand text-white"><f.icon className="h-5 w-5" /></div>
            <h3 className="mt-4 font-bold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
