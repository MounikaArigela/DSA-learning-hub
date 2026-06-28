export type Lang = "c" | "cpp" | "java" | "python";

export interface Complexity {
  operation: string;
  time: string;
  space: string;
}

export interface Topic {
  id: string;
  name: string;
  category: "linear" | "non-linear";
  icon: string; // lucide icon name
  short: string;
  definition: string;
  characteristics: string[];
  operations: string[];
  examples: { title: string; desc: string }[];
  complexity: Complexity[];
  code: Record<Lang, string>;
  visualizer:
    | "array"
    | "linked-list"
    | "stack"
    | "queue"
    | "deque"
    | "tree"
    | "bst"
    | "avl"
    | "heap"
    | "trie"
    | "graph";
}

const arrCode = {
  c: `#include <stdio.h>
int main() {
  int a[5] = {10, 20, 30, 40, 50};
  for (int i = 0; i < 5; i++) printf("%d ", a[i]);
  return 0;
}`,
  cpp: `#include <vector>
#include <iostream>
int main() {
  std::vector<int> a = {10,20,30,40,50};
  a.push_back(60);
  for (int x : a) std::cout << x << ' ';
}`,
  java: `public class Arr {
  public static void main(String[] args) {
    int[] a = {10,20,30,40,50};
    for (int x : a) System.out.print(x + " ");
  }
}`,
  python: `a = [10, 20, 30, 40, 50]
a.append(60)
a.insert(0, 5)
print(a)`,
};

const llCode = {
  c: `struct Node { int data; struct Node* next; };
void insert(struct Node** head, int v) {
  struct Node* n = malloc(sizeof(struct Node));
  n->data = v; n->next = *head; *head = n;
}`,
  cpp: `struct Node { int data; Node* next; Node(int v):data(v),next(nullptr){} };
void insert(Node*& head, int v) {
  Node* n = new Node(v); n->next = head; head = n;
}`,
  java: `class Node { int data; Node next; Node(int v){data=v;} }
class LL { Node head;
  void insert(int v){ Node n=new Node(v); n.next=head; head=n; } }`,
  python: `class Node:
    def __init__(self, v): self.val = v; self.next = None
class LinkedList:
    def __init__(self): self.head = None
    def insert(self, v):
        n = Node(v); n.next = self.head; self.head = n`,
};

const stackCode = {
  c: `#define MAX 100
int stack[MAX]; int top = -1;
void push(int x){ stack[++top] = x; }
int pop(){ return stack[top--]; }`,
  cpp: `#include <stack>
std::stack<int> s;
s.push(10); s.pop(); int t = s.top();`,
  java: `import java.util.Stack;
Stack<Integer> s = new Stack<>();
s.push(10); s.pop(); int t = s.peek();`,
  python: `stack = []
stack.append(10)   # push
stack.pop()        # pop
top = stack[-1]    # peek`,
};

const queueCode = {
  c: `#define MAX 100
int q[MAX], front=0, rear=0;
void enqueue(int x){ q[rear++] = x; }
int dequeue(){ return q[front++]; }`,
  cpp: `#include <queue>
std::queue<int> q;
q.push(10); q.pop(); int f = q.front();`,
  java: `import java.util.*;
Queue<Integer> q = new LinkedList<>();
q.offer(10); q.poll(); int f = q.peek();`,
  python: `from collections import deque
q = deque()
q.append(10)     # enqueue
q.popleft()      # dequeue`,
};

const dequeCode = {
  c: `// Use circular array with front/rear pointers
// pushFront, pushBack, popFront, popBack`,
  cpp: `#include <deque>
std::deque<int> d;
d.push_front(1); d.push_back(2);
d.pop_front(); d.pop_back();`,
  java: `import java.util.ArrayDeque;
ArrayDeque<Integer> d = new ArrayDeque<>();
d.addFirst(1); d.addLast(2);
d.pollFirst(); d.pollLast();`,
  python: `from collections import deque
d = deque()
d.appendleft(1); d.append(2)
d.popleft(); d.pop()`,
};

const treeCode = {
  c: `struct Node { int data; struct Node *left, *right; };
void inorder(struct Node* r){
  if(!r) return;
  inorder(r->left); printf("%d ", r->data); inorder(r->right);
}`,
  cpp: `struct Node { int v; Node *l=0,*r=0; Node(int x):v(x){} };
void inorder(Node* n){ if(!n)return; inorder(n->l); cout<<n->v<<' '; inorder(n->r); }`,
  java: `class Node { int v; Node l, r; Node(int x){v=x;} }
void inorder(Node n){ if(n==null)return; inorder(n.l); System.out.print(n.v); inorder(n.r); }`,
  python: `class Node:
    def __init__(self, v): self.v=v; self.l=self.r=None
def inorder(n):
    if not n: return
    inorder(n.l); print(n.v); inorder(n.r)`,
};

const bstCode = {
  c: `struct Node* insert(struct Node* r, int v){
  if(!r){ r=malloc(sizeof(*r)); r->data=v; r->left=r->right=NULL; return r; }
  if(v<r->data) r->left=insert(r->left,v); else r->right=insert(r->right,v);
  return r;
}`,
  cpp: `Node* insert(Node* r, int v){
  if(!r) return new Node(v);
  if(v<r->v) r->l=insert(r->l,v); else r->r=insert(r->r,v);
  return r;
}`,
  java: `Node insert(Node r, int v){
  if(r==null) return new Node(v);
  if(v<r.v) r.l=insert(r.l,v); else r.r=insert(r.r,v);
  return r;
}`,
  python: `def insert(r, v):
    if not r: return Node(v)
    if v < r.v: r.l = insert(r.l, v)
    else: r.r = insert(r.r, v)
    return r`,
};

const avlCode = {
  c: `// AVL = self-balancing BST. After insert/delete:
// if |balance| > 1 → rotate (LL, RR, LR, RL).
int height(Node* n){ return n?n->h:0; }
int balance(Node* n){ return height(n->l)-height(n->r); }`,
  cpp: `int height(Node* n){ return n?n->h:0; }
Node* rotateRight(Node* y){ Node* x=y->l; y->l=x->r; x->r=y; return x; }
Node* rotateLeft(Node* x){ Node* y=x->r; x->r=y->l; y->l=x; return y; }`,
  java: `int height(Node n){ return n==null?0:n.h; }
int bf(Node n){ return height(n.l)-height(n.r); }
// rotateLeft / rotateRight then re-compute heights`,
  python: `def height(n): return n.h if n else 0
def balance(n): return height(n.l) - height(n.r)
# rotate_left / rotate_right after each insert/delete`,
};

const heapCode = {
  c: `void heapify(int a[], int n, int i){
  int largest=i, l=2*i+1, r=2*i+2;
  if(l<n && a[l]>a[largest]) largest=l;
  if(r<n && a[r]>a[largest]) largest=r;
  if(largest!=i){ int t=a[i]; a[i]=a[largest]; a[largest]=t; heapify(a,n,largest); }
}`,
  cpp: `#include <queue>
std::priority_queue<int> maxHeap;
maxHeap.push(5); maxHeap.pop(); int top = maxHeap.top();`,
  java: `import java.util.PriorityQueue;
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(5); pq.poll(); int t = pq.peek();`,
  python: `import heapq
h = []
heapq.heappush(h, 5)
heapq.heappop(h)`,
};

const trieCode = {
  c: `struct Trie { struct Trie* c[26]; int end; };
void insert(struct Trie* r, char* w){
  for(; *w; w++){ int i=*w-'a'; if(!r->c[i]) r->c[i]=calloc(1,sizeof(*r)); r=r->c[i]; }
  r->end=1;
}`,
  cpp: `struct Trie { Trie* c[26]={}; bool end=false; };
void insert(Trie* r, string w){
  for(char ch: w){ int i=ch-'a'; if(!r->c[i]) r->c[i]=new Trie(); r=r->c[i]; }
  r->end=true;
}`,
  java: `class Trie { Trie[] c = new Trie[26]; boolean end; }
void insert(Trie r, String w){
  for(char ch: w.toCharArray()){ int i=ch-'a'; if(r.c[i]==null) r.c[i]=new Trie(); r=r.c[i]; }
  r.end=true;
}`,
  python: `class Trie:
    def __init__(self): self.c={}; self.end=False
def insert(r, w):
    for ch in w:
        if ch not in r.c: r.c[ch] = Trie()
        r = r.c[ch]
    r.end = True`,
};

const graphCode = {
  c: `// Adjacency list. BFS uses a queue, DFS uses recursion/stack.
void bfs(int start){ /* enqueue start, pop, visit neighbours */ }`,
  cpp: `#include <vector>
#include <queue>
std::vector<int> adj[100];
void bfs(int s){ std::queue<int> q; q.push(s); /* visit */ }`,
  java: `import java.util.*;
List<List<Integer>> adj = new ArrayList<>();
void bfs(int s){ Queue<Integer> q=new LinkedList<>(); q.offer(s); /* visit */ }`,
  python: `from collections import deque, defaultdict
adj = defaultdict(list)
def bfs(s):
    q = deque([s]); seen = {s}
    while q:
        u = q.popleft()
        for v in adj[u]:
            if v not in seen: seen.add(v); q.append(v)`,
};

export const TOPICS: Topic[] = [
  {
    id: "arrays", name: "Arrays", category: "linear", icon: "Rows3",
    short: "Contiguous, index-based collection of elements.",
    definition: "An array is a contiguous block of memory storing elements of the same type, accessible by zero-based index in O(1) time.",
    characteristics: ["Fixed or dynamic size", "Index-based O(1) access", "Same data type", "Cache-friendly memory layout"],
    operations: ["Insert", "Delete", "Search", "Update", "Traverse"],
    examples: [
      { title: "Student Records", desc: "Storing roll numbers and marks for fast index lookup." },
      { title: "Product Lists", desc: "E-commerce catalog rendered as paginated arrays." },
      { title: "Image Pixels", desc: "2D arrays of RGB values form every digital image." },
    ],
    complexity: [
      { operation: "Access", time: "O(1)", space: "O(1)" },
      { operation: "Search", time: "O(n)", space: "O(1)" },
      { operation: "Insert", time: "O(n)", space: "O(1)" },
      { operation: "Delete", time: "O(n)", space: "O(1)" },
    ],
    code: arrCode, visualizer: "array",
  },
  {
    id: "linked-lists", name: "Linked Lists", category: "linear", icon: "Link2",
    short: "Nodes connected by pointers — dynamic size, no contiguity.",
    definition: "A linked list is a linear collection where each node stores data and a pointer to the next node, allowing dynamic growth without shifting.",
    characteristics: ["Dynamic size", "Non-contiguous memory", "Sequential access", "Cheap insert/delete at known position"],
    operations: ["Insert At Beginning", "Insert At End", "Delete Node", "Search Node", "Reverse"],
    examples: [
      { title: "Music Playlists", desc: "Each track points to the next, easy to insert/remove." },
      { title: "Browser Tabs (history chain)", desc: "Doubly linked nodes for forward/back." },
      { title: "Image Viewer", desc: "Navigate next/previous photos via pointers." },
    ],
    complexity: [
      { operation: "Access", time: "O(n)", space: "O(1)" },
      { operation: "Insert (head)", time: "O(1)", space: "O(1)" },
      { operation: "Delete (head)", time: "O(1)", space: "O(1)" },
      { operation: "Search", time: "O(n)", space: "O(1)" },
    ],
    code: llCode, visualizer: "linked-list",
  },
  {
    id: "stacks", name: "Stacks", category: "linear", icon: "Layers",
    short: "LIFO — last in, first out.",
    definition: "A stack is a linear structure following Last-In-First-Out order. Elements are pushed/popped at the top.",
    characteristics: ["LIFO order", "Single access point (top)", "O(1) push/pop", "Used in recursion call frames"],
    operations: ["Push", "Pop", "Peek"],
    examples: [
      { title: "Browser History", desc: "Back button pops the most recent page." },
      { title: "Undo Function", desc: "Editors push every action onto an undo stack." },
      { title: "Function Calls", desc: "The runtime call stack tracks active frames." },
    ],
    complexity: [
      { operation: "Push", time: "O(1)", space: "O(1)" },
      { operation: "Pop", time: "O(1)", space: "O(1)" },
      { operation: "Peek", time: "O(1)", space: "O(1)" },
      { operation: "Search", time: "O(n)", space: "O(1)" },
    ],
    code: stackCode, visualizer: "stack",
  },
  {
    id: "queues", name: "Queues", category: "linear", icon: "ArrowRightLeft",
    short: "FIFO — first in, first out.",
    definition: "A queue is a linear structure where insertions happen at the rear and removals from the front (First-In-First-Out).",
    characteristics: ["FIFO order", "Two access points (front/rear)", "O(1) enqueue/dequeue", "Basis for BFS"],
    operations: ["Enqueue", "Dequeue", "Peek"],
    examples: [
      { title: "Ticket Booking", desc: "First user served first." },
      { title: "Printer Queue", desc: "Jobs are processed in arrival order." },
      { title: "CPU Scheduling", desc: "Ready processes wait in a queue." },
    ],
    complexity: [
      { operation: "Enqueue", time: "O(1)", space: "O(1)" },
      { operation: "Dequeue", time: "O(1)", space: "O(1)" },
      { operation: "Peek", time: "O(1)", space: "O(1)" },
      { operation: "Search", time: "O(n)", space: "O(1)" },
    ],
    code: queueCode, visualizer: "queue",
  },
  {
    id: "deques", name: "Deques", category: "linear", icon: "MoveHorizontal",
    short: "Double-ended queue — insert/remove at both ends.",
    definition: "A deque (double-ended queue) supports O(1) insertion and removal from both front and back.",
    characteristics: ["Insert/remove at both ends", "O(1) at endpoints", "Generalises stack and queue", "Used in sliding-window algorithms"],
    operations: ["Push Front", "Push Back", "Pop Front", "Pop Back"],
    examples: [
      { title: "Sliding Window Max", desc: "Classic monotonic-deque algorithm." },
      { title: "Undo + Redo", desc: "Two-ended history of actions." },
      { title: "Task Scheduling", desc: "Priority tasks added to front." },
    ],
    complexity: [
      { operation: "Push Front", time: "O(1)", space: "O(1)" },
      { operation: "Push Back", time: "O(1)", space: "O(1)" },
      { operation: "Pop Front", time: "O(1)", space: "O(1)" },
      { operation: "Pop Back", time: "O(1)", space: "O(1)" },
    ],
    code: dequeCode, visualizer: "deque",
  },
  {
    id: "trees", name: "Trees", category: "non-linear", icon: "Network",
    short: "Hierarchical structure of nodes with parent-child links.",
    definition: "A tree is a hierarchical data structure with a root node and zero or more child subtrees, with no cycles.",
    characteristics: ["Hierarchical", "One root", "No cycles", "N nodes have N-1 edges"],
    operations: ["Insert", "Delete", "Search", "Inorder", "Preorder", "Postorder", "Level Order"],
    examples: [
      { title: "File System", desc: "Folders and files form a tree." },
      { title: "DOM", desc: "Every HTML document is a tree of nodes." },
      { title: "Org Charts", desc: "Companies are hierarchical trees." },
    ],
    complexity: [
      { operation: "Search (balanced)", time: "O(log n)", space: "O(h)" },
      { operation: "Insert", time: "O(log n)", space: "O(h)" },
      { operation: "Traverse", time: "O(n)", space: "O(h)" },
    ],
    code: treeCode, visualizer: "tree",
  },
  {
    id: "bst", name: "Binary Search Trees", category: "non-linear", icon: "GitFork",
    short: "Ordered binary tree: left < root < right.",
    definition: "A BST is a binary tree in which every node's left subtree contains smaller keys and right subtree contains larger keys, enabling logarithmic search on average.",
    characteristics: ["Ordered keys", "Avg O(log n) operations", "Inorder traversal yields sorted order", "Degrades to O(n) when skewed"],
    operations: ["Insert", "Delete", "Search", "Inorder Traverse"],
    examples: [
      { title: "Database Indexes", desc: "B-Trees (a generalisation) power most DB indexes." },
      { title: "Auto-complete (dictionaries)", desc: "Sorted lookups via BST." },
      { title: "Symbol Tables", desc: "Compilers store identifiers in BSTs." },
    ],
    complexity: [
      { operation: "Search (avg)", time: "O(log n)", space: "O(h)" },
      { operation: "Insert (avg)", time: "O(log n)", space: "O(h)" },
      { operation: "Delete (avg)", time: "O(log n)", space: "O(h)" },
      { operation: "Worst case", time: "O(n)", space: "O(n)" },
    ],
    code: bstCode, visualizer: "bst",
  },
  {
    id: "avl", name: "AVL Trees", category: "non-linear", icon: "Scale",
    short: "Self-balancing BST — height difference ≤ 1.",
    definition: "AVL trees are self-balancing binary search trees where the heights of the two child subtrees of any node differ by at most one, guaranteeing O(log n) operations.",
    characteristics: ["Balance factor ∈ {-1,0,1}", "Rotations rebalance after mutation", "Guaranteed O(log n)", "More rotations than Red-Black trees"],
    operations: ["Insert", "Delete", "Search", "Rotations (LL, RR, LR, RL)"],
    examples: [
      { title: "In-memory databases", desc: "Where guaranteed lookup time matters." },
      { title: "Routing tables", desc: "Sorted, balanced lookup structures." },
      { title: "Spell checkers", desc: "Balanced dictionary trees." },
    ],
    complexity: [
      { operation: "Search", time: "O(log n)", space: "O(log n)" },
      { operation: "Insert", time: "O(log n)", space: "O(log n)" },
      { operation: "Delete", time: "O(log n)", space: "O(log n)" },
    ],
    code: avlCode, visualizer: "bst",
  },
  {
    id: "heaps", name: "Heaps", category: "non-linear", icon: "Mountain",
    short: "Complete binary tree with heap order (min or max).",
    definition: "A heap is a complete binary tree where each parent satisfies the heap property: ≥ (max-heap) or ≤ (min-heap) all its children. Backed by an array for O(1) parent/child math.",
    characteristics: ["Complete tree", "Array-backed", "Heap order (min/max)", "Root is extremum"],
    operations: ["Insert", "Extract Min/Max", "Heapify", "Peek"],
    examples: [
      { title: "Priority Queues", desc: "Heaps are the standard implementation." },
      { title: "Dijkstra's Algorithm", desc: "Pick next nearest node via min-heap." },
      { title: "OS Job Scheduling", desc: "Highest-priority task served next." },
    ],
    complexity: [
      { operation: "Insert", time: "O(log n)", space: "O(1)" },
      { operation: "Extract", time: "O(log n)", space: "O(1)" },
      { operation: "Peek", time: "O(1)", space: "O(1)" },
      { operation: "Build Heap", time: "O(n)", space: "O(1)" },
    ],
    code: heapCode, visualizer: "heap",
  },
  {
    id: "tries", name: "Tries", category: "non-linear", icon: "TextSearch",
    short: "Prefix tree for fast string lookup.",
    definition: "A trie is a tree where each edge represents a character and paths from the root form prefixes of stored strings, giving O(L) search by string length.",
    characteristics: ["Edge per character", "Shared prefixes save space", "O(L) lookup", "Supports prefix queries"],
    operations: ["Insert", "Search", "StartsWith", "Delete"],
    examples: [
      { title: "Autocomplete", desc: "Search engines suggest from a trie." },
      { title: "Spell Check", desc: "Validate words against a trie dictionary." },
      { title: "IP Routing", desc: "Longest-prefix match via tries." },
    ],
    complexity: [
      { operation: "Insert", time: "O(L)", space: "O(L·Σ)" },
      { operation: "Search", time: "O(L)", space: "O(1)" },
      { operation: "Prefix", time: "O(L)", space: "O(1)" },
    ],
    code: trieCode, visualizer: "trie",
  },
  {
    id: "graphs", name: "Graphs", category: "non-linear", icon: "Share2",
    short: "Set of nodes connected by edges — directed or undirected.",
    definition: "A graph G = (V, E) is a collection of vertices V and edges E connecting pairs of vertices. Edges may be directed, weighted, or unweighted.",
    characteristics: ["Vertices + edges", "Directed or undirected", "May contain cycles", "Represented by adjacency list/matrix"],
    operations: ["Add Node", "Remove Node", "Add Edge", "Remove Edge", "BFS", "DFS"],
    examples: [
      { title: "Social Networks", desc: "Users = nodes, friendships = edges." },
      { title: "Google Maps", desc: "Intersections + roads form a weighted graph." },
      { title: "Web Crawling", desc: "Pages link to pages — a giant directed graph." },
    ],
    complexity: [
      { operation: "BFS / DFS", time: "O(V + E)", space: "O(V)" },
      { operation: "Add Edge (list)", time: "O(1)", space: "O(1)" },
      { operation: "Has Edge (matrix)", time: "O(1)", space: "O(V²)" },
    ],
    code: graphCode, visualizer: "graph",
  },
];

export const getTopic = (id: string) => TOPICS.find((t) => t.id === id);
export const linearTopics = () => TOPICS.filter((t) => t.category === "linear");
export const nonLinearTopics = () => TOPICS.filter((t) => t.category === "non-linear");
