import { ArrayVisualizer } from "./ArrayVisualizer";
import { LinkedListVisualizer } from "./LinkedListVisualizer";
import { StackVisualizer } from "./StackVisualizer";
import { QueueVisualizer } from "./QueueVisualizer";
import { TreeVisualizer } from "./TreeVisualizer";
import { GraphVisualizer } from "./GraphVisualizer";
import type { Topic } from "@/lib/topics";

export function VisualizerFor({ topic }: { topic: Topic }) {
  switch (topic.visualizer) {
    case "array": return <ArrayVisualizer />;
    case "linked-list": return <LinkedListVisualizer />;
    case "stack": return <StackVisualizer />;
    case "queue": return <QueueVisualizer />;
    case "deque": return <QueueVisualizer deque />;
    case "tree":
    case "bst":
    case "avl":
    case "heap":
    case "trie":
      return <TreeVisualizer />;
    case "graph": return <GraphVisualizer />;
    default: return <ArrayVisualizer />;
  }
}
