import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { nonLinearTopics } from "@/lib/topics";
import { TopicGrid } from "@/components/TopicGrid";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const Route = createFileRoute("/non-linear")({
  head: () => ({
    meta: [
      { title: "Non-Linear Data Structures — DSA Hub" },
      { name: "description", content: "Explore trees, BSTs, AVLs, heaps, tries and graphs with animated visualizers." },
    ],
  }),
  component: NonLinearPage,
});

function NonLinearPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Dashboard", to: "/" }, { label: "Non-Linear" }]} />
      <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl gradient-brand text-white shadow-[var(--shadow-glow)]">
            <Network className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-3xl font-black sm:text-4xl">Non-Linear Data Structures</h1>
            <p className="mt-1 text-sm text-muted-foreground">Hierarchies and networks of connected nodes.</p>
          </div>
        </div>
      </header>
      <TopicGrid topics={nonLinearTopics()} />
    </div>
  );
}
