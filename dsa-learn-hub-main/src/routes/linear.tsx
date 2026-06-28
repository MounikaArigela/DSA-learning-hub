import { createFileRoute } from "@tanstack/react-router";
import { Layers3 } from "lucide-react";
import { linearTopics } from "@/lib/topics";
import { TopicGrid } from "@/components/TopicGrid";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const Route = createFileRoute("/linear")({
  head: () => ({
    meta: [
      { title: "Linear Data Structures — DSA Hub" },
      { name: "description", content: "Explore arrays, linked lists, stacks, queues and deques with interactive visualizers." },
    ],
  }),
  component: LinearPage,
});

function LinearPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Dashboard", to: "/" }, { label: "Linear" }]} />
      <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl gradient-brand text-white shadow-[var(--shadow-glow)]">
            <Layers3 className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-3xl font-black sm:text-4xl">Linear Data Structures</h1>
            <p className="mt-1 text-sm text-muted-foreground">Sequential structures where elements line up one after the other.</p>
          </div>
        </div>
      </header>
      <TopicGrid topics={linearTopics()} />
    </div>
  );
}
