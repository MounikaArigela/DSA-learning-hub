import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";
import type { Topic } from "@/lib/topics";

export function TopicGrid({ topics }: { topics: Topic[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {topics.map((t, i) => {
        const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[t.icon] ?? Icons.Box;
        return (
          <motion.div key={t.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link to="/topic/$id" params={{ id: t.id }} className="group block h-full glass glass-hover rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl gradient-brand text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold">{t.name}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{t.short}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--brand-cyan)]">
                Learn <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
