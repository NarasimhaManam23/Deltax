# DeltaX Round 1 Question Bank: Data Structures & Algorithms (100 MCQs)

---

### Q1
What is the worst-case time complexity of QuickSort, and when does it occur?
- A) $O(N \log N)$, when elements are randomly shuffled
- B) $O(N^2)$, when the chosen pivot is consistently the minimum or maximum element (e.g., already sorted array with first/last element chosen as pivot)
- C) $O(N)$, when all elements are identical
- D) $O(N \log N)$, when median-of-three pivot is used
**Correct Answer**: B
**Explanation**: Standard QuickSort partition degrades to an unbalanced partition ($1$ and $N-1$ elements) when the pivot is extremal, resulting in $N + (N-1) + \dots + 1 = O(N^2)$ comparisons.
**Topic**: Sorting Algorithms
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q2
Which of the following sorting algorithms is inherently STABLE and has a worst-case time complexity of $O(N \log N)$?
- A) QuickSort
- B) HeapSort
- C) MergeSort
- D) SelectionSort
**Correct Answer**: C
**Explanation**: MergeSort guarantees $O(N \log N)$ across all cases (best, average, worst) and preserves the relative order of equal elements (stable). HeapSort and QuickSort are not stable in their standard implementations.
**Topic**: Sorting Algorithms
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q3
What is the minimum number of comparisons required to find BOTH the maximum and minimum elements in an unsorted array of size $N$?
- A) $2N - 2$
- B) $\lceil \frac{3N}{2} \rceil - 2$
- C) $N$
- D) $N \log N$
**Correct Answer**: B
**Explanation**: By comparing elements in pairs ($N/2$ comparisons) and then comparing the smaller with the running min and the larger with the running max ($2 \times (N/2)$ comparisons), total comparisons is $\approx 1.5N - 2$.
**Topic**: Array Algorithms
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q4
What is the time complexity of searching for an element in a balanced Binary Search Tree (such as an AVL Tree or Red-Black Tree) containing $N$ nodes?
- A) $O(1)$
- B) $O(\log N)$
- C) $O(N)$
- D) $O(N \log N)$
**Correct Answer**: B
**Explanation**: Balanced BSTs enforce height $h = O(\log N)$. Searching traverses from root to leaf, taking at most $h$ steps.
**Topic**: Binary Search Trees
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q5
What type of tree traversal on a valid Binary Search Tree (BST) produces elements in strictly ascending sorted order?
- A) Preorder Traversal
- B) Inorder Traversal
- C) Postorder Traversal
- D) Level-Order Traversal
**Correct Answer**: B
**Explanation**: Inorder traversal visits `Left Subtree` $\rightarrow$ `Current Node` $\rightarrow$ `Right Subtree`. Since all left values $< \text{node} <$ right values, this yields a monotonically non-decreasing sorted sequence.
**Topic**: Tree Traversals
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q6
In an array representation of a 0-indexed complete binary heap, what is the index of the parent of a node located at index $i$?
- A) $2i + 1$
- B) $2i + 2$
- C) $(i - 1) / 2$
- D) $i / 2$
**Correct Answer**: C
**Explanation**: In a 0-indexed binary heap, the left child is at $2i + 1$, right child is at $2i + 2$, and the parent is at $\lfloor (i - 1) / 2 \rfloor$.
**Topic**: Binary Heaps
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q7
What is the time complexity of building a binary heap of $N$ elements from an arbitrary unsorted array using the bottom-up `buildHeap` (heapify) algorithm?
- A) $O(N \log N)$
- B) $O(N)$
- C) $O(N^2)$
- D) $O(\log N)$
**Correct Answer**: B
**Explanation**: Bottom-up heap construction sums node heights: $\sum_{h=0}^{\log N} \frac{N}{2^{h+1}} \times O(h) = O(N)$.
**Topic**: Binary Heaps
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q8
Which algorithm is used to detect cycles in a singly linked list in $O(N)$ time and $O(1)$ auxiliary space?
- A) Dijkstra's Algorithm
- B) Floyd's Cycle-Finding Algorithm (Tortoise and Hare)
- C) Kadane's Algorithm
- D) Tarjan's Algorithm
**Correct Answer**: B
**Explanation**: Uses two pointers moving at different speeds (slow moves 1 step, fast moves 2 steps). If a cycle exists, they are guaranteed to meet inside the loop in $O(N)$ time.
**Topic**: Linked Lists
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q9
What is the auxiliary space complexity of Kadane's algorithm for finding the maximum contiguous subarray sum?
- A) $O(N)$
- B) $O(1)$
- C) $O(\log N)$
- D) $O(N^2)$
**Correct Answer**: B
**Explanation**: Kadane's algorithm tracks only two running scalar variables (`current_max` and `global_max`), operating in $O(1)$ auxiliary memory.
**Topic**: Arrays & Kadane's Algorithm
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q10
Given an array containing $N$ integers where every element appears exactly twice except for ONE element that appears once, how can you find the single element in $O(N)$ time and $O(1)$ space?
- A) Sorting the array
- B) Using a Hash Set
- C) Computing the cumulative bitwise XOR of all array elements
- D) Binary search
**Correct Answer**: C
**Explanation**: Bitwise XOR properties: $x \oplus x = 0$ and $x \oplus 0 = x$. All duplicated numbers cancel out to zero, leaving only the unique element.
**Topic**: Bit Manipulation
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q11
What data structure is optimal for implementing Breadth-First Search (BFS) on a graph or matrix?
- A) Stack
- B) Queue (FIFO)
- C) Priority Queue
- D) Hash Map
**Correct Answer**: B
**Explanation**: BFS visits nodes level by level in order of distance from the source, which is strictly governed by First-In-First-Out (FIFO) queue semantics.
**Topic**: Graph Algorithms
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q12
What is the time complexity of Dijkstra's Single-Source Shortest Path algorithm implemented with a Min-Heap (Priority Queue) on a graph with $V$ vertices and $E$ edges?
- A) $O(V^2)$
- B) $O((V + E) \log V)$
- C) $O(V \times E)$
- D) $O(V + E)$
**Correct Answer**: B
**Explanation**: Each vertex is extracted once ($O(V \log V)$) and each edge can trigger a heap decrease-key/insertion ($O(E \log V)$), totaling $O((V + E) \log V)$.
**Topic**: Graph Algorithms
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q13
What is the space complexity of an in-order recursive traversal of a degenerate (skewed) Binary Search Tree with $N$ nodes?
- A) $O(1)$
- B) $O(\log N)$
- C) $O(N)$
- D) $O(N \log N)$
**Correct Answer**: C
**Explanation**: In a skewed tree (essentially a linked list), the recursion call stack expands to depth $N$, requiring $O(N)$ auxiliary memory.
**Topic**: Trees & Recursion
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q14
What condition signifies an "Empty" state in a circular queue implemented via an array of size $N$ with pointers `front` and `rear` initialized to `-1`?
- A) `(rear + 1) % N == front`
- B) `front == -1`
- C) `front == rear`
- D) `rear == N - 1`
**Correct Answer**: B
**Explanation**: When both `front == -1` and `rear == -1`, the circular queue contains zero elements. Condition A represents a full queue.
**Topic**: Stacks & Queues
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q15
What is the postfix (Reverse Polish) expression for the infix expression: `A + B * C`?
- A) `A B C * +`
- B) `A B + C *`
- C) `+ A * B C`
- D) `A B C + *`
**Correct Answer**: A
**Explanation**: Multiplication has higher precedence: `B * C` becomes `B C *`. Then addition combines `A` and `B C *`, yielding `A B C * +`.
**Topic**: Stacks & Expression Parsing
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q16
What is the value of the postfix expression: `5 3 + 2 * 4 /`?
- A) 4
- B) 8
- C) 16
- D) 2
**Correct Answer**: A
**Explanation**:
1. `5 3 +` $\rightarrow 5 + 3 = 8$.
2. `8 2 *` $\rightarrow 8 \times 2 = 16$.
3. `16 4 /` $\rightarrow 16 / 4 = 4$.
**Topic**: Stacks & Expression Evaluation
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q17
Which of the following data structures is used by compilers to check for balanced parentheses and brackets in source code?
- A) Queue
- B) Stack (LIFO)
- C) Hash Table
- D) Binary Tree
**Correct Answer**: B
**Explanation**: Stacks match opening brackets with the most recently encountered unclosed bracket (Last-In-First-Out).
**Topic**: Stacks
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q18
What is the time complexity to find the Next Greater Element for all elements in an array of size $N$ using a Monotonic Stack?
- A) $O(N^2)$
- B) $O(N \log N)$
- C) $O(N)$
- D) $O(\log N)$
**Correct Answer**: C
**Explanation**: Each array element is pushed onto the stack exactly once and popped at most once. Total push/pop operations across the whole array is bounded by $2N \implies O(N)$ amortized.
**Topic**: Monotonic Stack
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q19
What is the maximum number of nodes in a binary tree of height $h$ (where height of a single root node is defined as 1)?
- A) $2^h$
- B) $2^h - 1$
- C) $2^{h-1}$
- D) $2^{h+1} - 1$
**Correct Answer**: B
**Explanation**: A complete full binary tree has $\sum_{i=0}^{h-1} 2^i = 2^h - 1$ nodes.
**Topic**: Binary Trees
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q20
In an AVL tree, what is the maximum permissible difference between the heights of the left and right subtrees of any node (Balance Factor)?
- A) 0
- B) 1
- C) 2
- D) Any integer
**Correct Answer**: B
**Explanation**: AVL trees enforce $|Height(Left) - Height(Right)| \le 1$. If balance factor becomes $+2$ or $-2$, rotations (LL, RR, LR, RL) rebalance the tree.
**Topic**: AVL Trees
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q21
What rotation is performed in an AVL tree to fix an imbalance caused by inserting into the right subtree of the left child (LR imbalance)?
- A) Single Left Rotation
- B) Single Right Rotation
- C) Left Rotation on Left Child followed by Right Rotation on Root (LR Rotation)
- D) Double Right Rotation
**Correct Answer**: C
**Explanation**: An LR imbalance requires a double rotation: first a left rotation on the left child, followed by a right rotation on the pivot root node.
**Topic**: AVL Trees
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q22
What is the optimal time complexity to solve the 0/1 Knapsack Problem with $N$ items and knapsack capacity $W$ using Dynamic Programming?
- A) $O(N \log N)$
- B) $O(N \times W)$ (Pseudo-polynomial)
- C) $O(2^N)$
- D) $O(W \log N)$
**Correct Answer**: B
**Explanation**: Standard 2D or 1D DP table fills $N \times W$ states, taking $O(NW)$ time and $O(W)$ space.
**Topic**: Dynamic Programming
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q23
Why is the Fractional Knapsack Problem solvable via a Greedy approach while the 0/1 Knapsack Problem requires Dynamic Programming?
- A) Fractional knapsack has fewer items
- B) Fractional knapsack exhibits the greedy-choice property (we can always greedily take fractions of the item with highest value-to-weight ratio), whereas 0/1 knapsack requires evaluating combinatorial combinations because items cannot be split
- C) Dynamic programming is always faster
- D) 0/1 knapsack has no capacity limit
**Correct Answer**: B
**Explanation**: Being able to take fractions guarantees that greedy sorting by value/weight achieves the optimal solution. In 0/1, taking the highest ratio item might leave unusable space that could have held two items with higher combined value.
**Topic**: Greedy vs Dynamic Programming
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q24
What is the minimum number of edges in a connected undirected graph with $V$ vertices?
- A) $V$
- B) $V - 1$
- C) $V(V - 1) / 2$
- D) $2V$
**Correct Answer**: B
**Explanation**: A minimally connected graph is a Spanning Tree, which has exactly $V - 1$ edges.
**Topic**: Graph Theory
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q25
Which algorithm finds the Minimum Spanning Tree (MST) of a connected, undirected graph by greedily adding the smallest weight edge that does not form a cycle?
- A) Prim's Algorithm
- B) Kruskal's Algorithm
- C) Bellman-Ford Algorithm
- D) Floyd-Warshall Algorithm
**Correct Answer**: B
**Explanation**: Kruskal's algorithm sorts all edges by weight and uses a Disjoint Set Union (DSU) data structure to detect and prevent cycles. Prim's algorithm grows a tree from a vertex.
**Topic**: Graph Algorithms & MST
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q26
What is the time complexity of checking whether two elements belong to the same set in a Disjoint Set Union (DSU) data structure with Path Compression and Union by Rank?
- A) $O(N)$
- B) $O(\log N)$
- C) $O(\alpha(N))$ (nearly constant time, where $\alpha$ is the Inverse Ackermann function)
- D) $O(1)$ strictly
**Correct Answer**: C
**Explanation**: Path compression combined with union by rank guarantees an amortized time of $O(\alpha(N)) < 5$ for all practical universe sizes.
**Topic**: Disjoint Set Union
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q27
What is the length of the Longest Common Subsequence (LCS) between strings `"ABCDE"` and `"ACE"`?
- A) 2
- B) 3
- C) 4
- D) 5
**Correct Answer**: B
**Explanation**: The common subsequence of maximal length is `"ACE"`, which has length 3.
**Topic**: Dynamic Programming
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q28
What is the recurrence relation for the classic 0/1 Knapsack DP state $dp[i][w]$?
- A) $dp[i][w] = dp[i-1][w] + dp[i-1][w - wt[i]]$
- B) $dp[i][w] = \max(dp[i-1][w], val[i] + dp[i-1][w - wt[i]])$ (if $wt[i] \le w$)
- C) $dp[i][w] = dp[i][w-1] + val[i]$
- D) $dp[i][w] = \min(dp[i-1][w], val[i])$
**Correct Answer**: B
**Explanation**: At item $i$, we choose the maximum of either excluding item $i$ (`dp[i-1][w]`) or including item $i$ (`val[i] + dp[i-1][w - wt[i]]`).
**Topic**: Dynamic Programming
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q29
What is the time complexity of Topological Sorting on a Directed Acyclic Graph (DAG) with $V$ vertices and $E$ edges?
- A) $O(V^2)$
- B) $O(V + E)$
- C) $O(V \log V)$
- D) $O(E \log V)$
**Correct Answer**: B
**Explanation**: Topological sort is computed in linear time using Kahn's algorithm (indegree BFS) or DFS postorder reversal in $O(V + E)$.
**Topic**: Graph Algorithms
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q30
What graph property guarantees that a Topological Sort exists?
- A) The graph must be undirected
- B) The graph must be a Directed Acyclic Graph (DAG)
- C) The graph must be complete
- D) The graph must have no negative edge weights
**Correct Answer**: B
**Explanation**: Topological sorting orders vertices linearly such that for every directed edge $u \to v$, $u$ appears before $v$. Cycles make this impossible.
**Topic**: Graph Algorithms
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q31
What algorithm can detect negative weight cycles in a directed graph and compute single-source shortest paths?
- A) Dijkstra's Algorithm
- B) Bellman-Ford Algorithm
- C) Floyd-Warshall Algorithm
- D) Prim's Algorithm
**Correct Answer**: B
**Explanation**: Bellman-Ford relaxes all edges $V - 1$ times. A subsequent $(V)^{\text{th}}$ relaxation step that still reduces distance indicates the presence of a negative cycle.
**Topic**: Graph Algorithms
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q32
What is the time complexity of the Floyd-Warshall All-Pairs Shortest Path algorithm on a graph with $V$ vertices?
- A) $O(V^2)$
- B) $O(V^3)$
- C) $O(V \times E)$
- D) $O(V \log V)$
**Correct Answer**: B
**Explanation**: Floyd-Warshall uses three nested loops over all vertices $k, i, j$ to check whether path $i \to k \to j$ is shorter, executing in $\Theta(V^3)$.
**Topic**: Graph Algorithms
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q33
What is the average and worst-case time complexity of searching in a Hash Table with good hash distribution?
- A) Average: $O(1)$; Worst: $O(N)$
- B) Average: $O(\log N)$; Worst: $O(N)$
- C) Average: $O(1)$; Worst: $O(1)$
- D) Average: $O(N)$; Worst: $O(N^2)$
**Correct Answer**: A
**Explanation**: Average case has uniform distribution yielding $O(1)$ bucket access. Worst case occurs when all keys collide into a single bucket, degrading search to $O(N)$.
**Topic**: Hash Tables
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q34
What is the time complexity of finding the diameter of a binary tree in $O(N)$ time?
- A) By computing height at each node in $O(N^2)$
- B) By calculating height and diameter simultaneously in a single bottom-up post-order DFS traversal
- C) Using BFS level order traversal
- D) Using Morris traversal
**Correct Answer**: B
**Explanation**: A post-order DFS returns subtree height while updating global diameter (`max(diameter, left_height + right_height)`) in a single pass of $O(N)$.
**Topic**: Binary Trees
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q35
What is the minimum number of queues needed to implement a Stack?
- A) 1
- B) 2
- C) 3
- D) Cannot be implemented with queues
**Correct Answer**: B
**Explanation**: Standard implementation uses 2 queues (or 1 queue by rotating elements of size $N-1$ to the back upon every push).
**Topic**: Stacks & Queues
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q36
What is the time complexity of deleting a node from a Doubly Linked List given a direct pointer to that node?
- A) $O(N)$
- B) $O(1)$
- C) $O(\log N)$
- D) $O(N^2)$
**Correct Answer**: B
**Explanation**: Because a doubly linked list node has pointers to both `prev` and `next`, deleting it simply requires updating `node->prev->next = node->next` and `node->next->prev = node->prev` in $O(1)$ time.
**Topic**: Linked Lists
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q37
What algorithm is optimal for finding the strongly connected components (SCCs) of a directed graph in linear $O(V + E)$ time?
- A) Tarjan's or Kosaraju's Algorithm
- B) Dijkstra's Algorithm
- C) Kruskal's Algorithm
- D) Kadane's Algorithm
**Correct Answer**: A
**Explanation**: Both Kosaraju's (two DFS passes with graph transpose) and Tarjan's (single DFS pass with discovery and low-link values) identify SCCs in $O(V + E)$.
**Topic**: Graph Algorithms
**Difficulty**: Hard
**Source Classification**: GENERAL CS TOPIC

---

### Q38
What is the time complexity of searching for an element in an unsorted 2D matrix of size $M \times N$?
- A) $O(M + N)$
- B) $O(M \times N)$
- C) $O(\log(M \times N))$
- D) $O(M \log N)$
**Correct Answer**: B
**Explanation**: Without sorting properties, every cell must potentially be checked, taking $O(M \times N)$ operations.
**Topic**: Matrix Algorithms
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q39
In a 2D matrix of size $M \times N$ where every row and column is sorted in ascending order, what is the optimal time complexity to search for a target value?
- A) $O(M \times N)$
- B) $O(M + N)$
- C) $O(\log M + \log N)$
- D) $O(1)$
**Correct Answer**: B
**Explanation**: Starting from the top-right corner $(0, N-1)$: if target is smaller, move left; if larger, move down. Each step eliminates a row or column, yielding $O(M + N)$.
**Topic**: Matrix Algorithms & Search
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q40
What is the number of Binary Search Trees that can be formed with $N$ distinct keys?
- A) $N!$
- B) $2^N$
- C) The $N^{\text{th}}$ Catalan Number: $C_n = \frac{1}{n+1} \binom{2n}{n}$
- D) $N^2$
**Correct Answer**: C
**Explanation**: The number of structurally unique BSTs formed by $N$ keys corresponds directly to the Catalan number series: $C_0=1, C_1=1, C_2=2, C_3=5, C_4=14 \dots$.
**Topic**: Binary Search Trees & Combinatorics
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q41
What is the worst-case time complexity of inserting an element into a Max-Heap containing $N$ elements?
- A) $O(1)$
- B) $O(\log N)$
- C) $O(N)$
- D) $O(N \log N)$
**Correct Answer**: B
**Explanation**: The element is appended at the end of the heap array and sifted up along the height of the tree, taking at most $O(\log_2 N)$ swaps.
**Topic**: Binary Heaps
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q42
What is the time complexity of extracting the minimum element from a Min-Heap of size $N$?
- A) $O(1)$
- B) $O(\log N)$
- C) $O(N)$
- D) $O(N \log N)$
**Correct Answer**: B
**Explanation**: The root element (min) is removed, the last element is moved to the root, and `heapifyDown` restores the heap property in $O(\log N)$ time. (Peek is $O(1)$).
**Topic**: Binary Heaps
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q43
What is the time complexity to find the $K^{\text{th}}$ largest element in an array of size $N$ using a Min-Heap of size $K$?
- A) $O(N \log N)$
- B) $O(N \log K)$
- C) $O(K \log N)$
- D) $O(N^2)$
**Correct Answer**: B
**Explanation**: Maintain a Min-Heap of size $K$. For each of the $N$ elements, pushing and popping takes $O(\log K)$. Total time is $O(N \log K)$ with $O(K)$ space.
**Topic**: Heaps & Top-K Patterns
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q44
What is the time complexity of the KMP (Knuth-Morris-Pratt) pattern matching algorithm to find a pattern of length $M$ inside a text of length $N$?
- A) $O(N \times M)$
- B) $O(N + M)$
- C) $O(N \log M)$
- D) $O(M^2)$
**Correct Answer**: B
**Explanation**: KMP precomputes the Longest Prefix Suffix (LPS) array in $O(M)$ time and searches the text without backtracking in $O(N)$ time, achieving $O(N + M)$ overall.
**Topic**: String Algorithms
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q45
What is the maximum number of edges in a simple undirected graph with $V$ vertices?
- A) $V^2$
- B) $V(V - 1) / 2$
- C) $V(V + 1) / 2$
- D) $2V$
**Correct Answer**: B
**Explanation**: Each vertex can connect to all other $V - 1$ vertices. Dividing by 2 for undirected edges yields $\binom{V}{2} = \frac{V(V - 1)}{2}$.
**Topic**: Graph Theory
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q46
What data structure allows $O(1)$ average time insertion, deletion, and retrieval of a random element?
- A) Array
- B) Hash Map combined with a Dynamic Array (ArrayList)
- C) Linked List
- D) Balanced BST
**Correct Answer**: B
**Explanation**: The ArrayList stores values allowing $O(1)$ random indexing via `rand()`. The Hash Map stores value-to-index mappings. Deletion swaps the target element with the last array element, achieving $O(1)$ deletion.
**Topic**: Design Data Structures
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q47
What is the time complexity to reverse a singly linked list iteratively?
- A) $O(N^2)$ Time, $O(1)$ Space
- B) $O(N)$ Time, $O(1)$ Space
- C) $O(N)$ Time, $O(N)$ Space
- D) $O(\log N)$ Time, $O(1)$ Space
**Correct Answer**: B
**Explanation**: Using three pointers (`prev`, `curr`, `next`), each node's pointer is reversed in a single pass of $O(N)$ time using $O(1)$ auxiliary space.
**Topic**: Linked Lists
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q48
What is the time complexity of checking whether a number $N$ is prime using the trial division algorithm up to $\sqrt{N}$?
- A) $O(N)$
- B) $O(\sqrt{N})$
- C) $O(\log N)$
- D) $O(1)$
**Correct Answer**: B
**Explanation**: Divisors appear in reciprocal pairs $(d, N/d)$. If no divisor divides $N$ up to $\lfloor\sqrt{N}\rfloor$, no divisor exists above $\sqrt{N}$.
**Topic**: Number Theory
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q49
What is the time complexity of generating all prime numbers up to $N$ using the Sieve of Eratosthenes?
- A) $O(N \log N)$
- B) $O(N \log(\log N))$
- C) $O(N \sqrt{N})$
- D) $O(N^2)$
**Correct Answer**: B
**Explanation**: The sum of reciprocal primes $\sum_{p \le N} \frac{N}{p} = N \sum \frac{1}{p} = O(N \log \log N)$.
**Topic**: Number Theory
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q50
What is the time complexity of the Two-Pointer technique to find a pair with target sum $T$ in an ALREADY SORTED array of size $N$?
- A) $O(N^2)$
- B) $O(N)$
- C) $O(N \log N)$
- D) $O(\log N)$
**Correct Answer**: B
**Explanation**: Pointers start at $L=0$ and $R=N-1$. If $arr[L] + arr[R] < T$, increment $L$; if $> T$, decrement $R$. Each step moves one pointer inward, taking at most $N$ operations.
**Topic**: Two Pointers
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q51
What is the time complexity of finding the intersection of two sorted arrays of sizes $M$ and $N$ using two pointers?
- A) $O(M \times N)$
- B) $O(M + N)$
- C) $O(\log M + \log N)$
- D) $O(M \log N)$
**Correct Answer**: B
**Explanation**: Advance the pointer with the smaller value in a single simultaneous scan, processing both arrays in $O(M + N)$ linear time.
**Topic**: Two Pointers
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q52
What is the time complexity of checking if two strings of length $N$ are Anagrams using a frequency array of size 26?
- A) $O(N \log N)$
- B) $O(N)$ Time, $O(1)$ Space
- C) $O(N^2)$ Time, $O(1)$ Space
- D) $O(1)$ Time, $O(N)$ Space
**Correct Answer**: B
**Explanation**: Count character occurrences for string 1 and decrement for string 2 in a 26-element array ($O(N)$ time). Verifying all counts are zero takes $O(26) = O(1)$ space.
**Topic**: Strings & Hashing
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q53
What is the worst-case time complexity of searching for an element in an unbalanced/skewed Binary Search Tree?
- A) $O(1)$
- B) $O(\log N)$
- C) $O(N)$
- D) $O(N \log N)$
**Correct Answer**: C
**Explanation**: When elements are inserted in sorted order, the BST degenerates into a singly linked list of height $N$, making search take $O(N)$ comparisons.
**Topic**: Binary Search Trees
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q54
What is the time complexity of inserting an element at the beginning of an array of size $N$?
- A) $O(1)$
- B) $O(N)$
- C) $O(\log N)$
- D) $O(N^2)$
**Correct Answer**: B
**Explanation**: All existing $N$ elements must be shifted one position to the right to make space for the new element at index 0.
**Topic**: Arrays
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q55
What is the time complexity of inserting an element at the head of a Singly Linked List given a pointer to the head?
- A) $O(1)$
- B) $O(N)$
- C) $O(\log N)$
- D) $O(N^2)$
**Correct Answer**: A
**Explanation**: Create new node, set `newNode->next = head`, and update `head = newNode`. Takes constant $O(1)$ operations with no shifting.
**Topic**: Linked Lists
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q56
In a complete binary tree with $N$ nodes, what is the maximum height of the tree?
- A) $N$
- B) $\lfloor\log_2 N\rfloor$
- C) $N / 2$
- D) $\sqrt{N}$
**Correct Answer**: B
**Explanation**: Complete binary trees fill all levels completely except possibly the last level, guaranteeing height $\lfloor\log_2 N\rfloor$.
**Topic**: Binary Trees
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q57
What is the minimum number of stacks required to implement a Queue?
- A) 1
- B) 2
- C) 3
- D) Cannot be implemented
**Correct Answer**: B
**Explanation**: One stack serves as the input stack (`pushStack`) and the other as the output stack (`popStack`). When `popStack` is empty, elements are popped from `pushStack` and pushed to `popStack`, reversing order to FIFO.
**Topic**: Stacks & Queues
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q58
What is the time complexity of the Morris Inorder Traversal algorithm for a binary tree?
- A) $O(N \log N)$ Time, $O(N)$ Space
- B) $O(N)$ Time, $O(1)$ Auxiliary Space
- C) $O(N^2)$ Time, $O(1)$ Space
- D) $O(N)$ Time, $O(\log N)$ Space
**Correct Answer**: B
**Explanation**: Morris traversal uses threaded binary trees (creating temporary links from rightmost nodes in left subtrees back to current node), achieving $O(N)$ traversal with $O(1)$ auxiliary stack space.
**Topic**: Tree Traversals
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q59
What is the maximum number of edges in a bipartite graph with $N$ total vertices?
- A) $N(N - 1) / 2$
- B) $\lfloor N/2 \rfloor \times \lceil N/2 \rceil$ (approx $N^2 / 4$)
- C) $N - 1$
- D) $2N$
**Correct Answer**: B
**Explanation**: Dividing the $N$ vertices into two equal partitions of sizes $N/2$ creates complete bipartite graph $K_{N/2, N/2}$ with $(N/2) \times (N/2) = N^2 / 4$ edges.
**Topic**: Graph Theory
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q60
What is the result of evaluating the Bitwise AND expression `(x & (x - 1)) == 0` for any integer $x > 0$?
- A) Checks if $x$ is an odd number
- B) Checks if $x$ is a power of 2
- C) Clears all bits of $x$
- D) Checks if $x$ is a prime number
**Correct Answer**: B
**Explanation**: A power of 2 has exactly one binary bit set (e.g., $8 = 1000_2$). $x - 1$ has all lower bits set ($7 = 0111_2$). Their bitwise AND is 0.
**Topic**: Bit Manipulation
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q61
What is the space complexity of an iterative BFS traversal on a full binary tree with $N$ nodes?
- A) $O(1)$
- B) $O(\log N)$
- C) $O(N)$ (specifically $N/2$ nodes at the leaf level in the queue)
- D) $O(N \log N)$
**Correct Answer**: C
**Explanation**: At the deepest leaf level, a full binary tree contains $\lceil N/2 \rceil$ nodes, all of which reside in the BFS queue simultaneously, requiring $O(N)$ space.
**Topic**: Tree Traversals
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q62
Which data structure is best suited for implementing an LRU (Least Recently Used) Cache with $O(1)$ `get()` and $O(1)$ `put()` operations?
- A) Binary Search Tree
- B) Hash Map combined with a Doubly Linked List
- C) Min-Heap
- D) Circular Queue
**Correct Answer**: B
**Explanation**: The Hash Map provides $O(1)$ key lookup to list nodes. The Doubly Linked List allows $O(1)$ node removal and re-insertion at the head (most recently used).
**Topic**: Design Data Structures
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q63
What is the time complexity of finding the median of an unsorted array of size $N$ using QuickSelect (Hoare's Selection Algorithm)?
- A) $O(N)$ on average; $O(N^2)$ worst case
- B) $O(N \log N)$ strictly
- C) $O(1)$
- D) $O(N^2)$ on average
**Correct Answer**: A
**Explanation**: QuickSelect recurses into only one partition half: $N + N/2 + N/4 + \dots = 2N = O(N)$ average time.
**Topic**: Selection Algorithms
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q64
What is the time complexity of calculating the sum of elements in a range $[L, R]$ of an array of size $N$ using a Segment Tree?
- A) $O(1)$
- B) $O(\log N)$
- C) $O(N)$
- D) $O(\sqrt{N})$
**Correct Answer**: B
**Explanation**: Segment trees decompose range queries into at most $O(\log N)$ canonical node intervals.
**Topic**: Advanced Data Structures
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q65
What is the time complexity of updating a single element at index $i$ in a Binary Indexed Tree (Fenwick Tree) of size $N$?
- A) $O(1)$
- B) $O(\log N)$
- C) $O(N)$
- D) $O(\sqrt{N})$
**Correct Answer**: B
**Explanation**: Updating cascades through ancestors by adding lowest set bit (`i += (i & -i)`), taking $O(\log N)$ operations.
**Topic**: Advanced Data Structures
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q66
What is the total number of non-empty substrings in a string of length $N$ with all unique characters?
- A) $N^2$
- B) $N(N + 1) / 2$
- C) $2^N$
- D) $N!$
**Correct Answer**: B
**Explanation**: Substrings of length 1: $N$; length 2: $N-1$; $\dots$ length $N$: 1. Sum $= N(N+1)/2$.
**Topic**: Strings & Combinatorics
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q67
What is the total number of non-empty subsequences of a string of length $N$?
- A) $N(N + 1) / 2$
- B) $2^N - 1$
- C) $N!$
- D) $2^{N-1}$
**Correct Answer**: B
**Explanation**: For each character, there are 2 choices: include or exclude ($2^N$). Subtracting 1 for the empty subsequence yields $2^N - 1$.
**Topic**: Strings & Combinatorics
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q68
What is the difference between a Substring and a Subsequence?
- A) They are identical
- B) A Substring must consist of contiguous characters from the original string; a Subsequence preserves relative order but characters do not need to be contiguous
- C) A subsequence must be sorted
- D) Substrings can be empty, subsequences cannot
**Correct Answer**: B
**Explanation**: `"ACE"` is a subsequence of `"ABCDE"`, but NOT a substring. `"BCD"` is both a substring and a subsequence.
**Topic**: String Terminology
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q69
What is the time complexity of finding the Longest Palindromic Substring using dynamic programming?
- A) $O(N)$ Time, $O(1)$ Space
- B) $O(N^2)$ Time, $O(N^2)$ Space
- C) $O(N^3)$ Time, $O(1)$ Space
- D) $O(N \log N)$ Time, $O(N)$ Space
**Correct Answer**: B
**Explanation**: DP table `isPalindrome[i][j]` checks if `s[i] == s[j]` and `isPalindrome[i+1][j-1]` is true, filling an $N \times N$ matrix in $O(N^2)$ time.
**Topic**: Dynamic Programming
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q70
What is the time complexity of Manacher's Algorithm to find the longest palindromic substring?
- A) $O(N^2)$
- B) $O(N)$
- C) $O(N \log N)$
- D) $O(N^3)$
**Correct Answer**: B
**Explanation**: Manacher's algorithm reuses previously computed palindrome radii around a center, finding the longest palindromic substring in linear $O(N)$ time.
**Topic**: Advanced String Algorithms
**Difficulty**: Hard
**Source Classification**: GENERAL CS TOPIC

---

### Q71
What is the time complexity to check whether a singly linked list is a Palindrome using $O(1)$ auxiliary space?
- A) $O(N^2)$
- B) $O(N)$
- C) $O(N \log N)$
- D) $O(1)$
**Correct Answer**: B
**Explanation**: Find middle via slow/fast pointers ($O(N)$), reverse the second half in-place ($O(N)$), compare halves ($O(N)$), and restore list ($O(N)$). Auxiliary space is $O(1)$.
**Topic**: Linked Lists
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q72
What is the time complexity of the Floyd-Warshall algorithm when applied to a dense graph with $V$ vertices?
- A) $O(V^2)$
- B) $O(V^3)$
- C) $O(V \times E \log V)$
- D) $O(E^2)$
**Correct Answer**: B
**Explanation**: Triply nested loops over all vertices result in $\Theta(V^3)$ operations regardless of edge density.
**Topic**: Graph Algorithms
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q73
Which sorting algorithm is typically chosen by Java's `Arrays.sort()` for sorting primitive types (e.g., `int[]`)?
- A) MergeSort
- B) Dual-Pivot QuickSort
- C) HeapSort
- D) BubbleSort
**Correct Answer**: B
**Explanation**: Java uses Vladimir Yaroslavskiy's Dual-Pivot QuickSort for primitives (offering $O(N \log N)$ performance without object allocation overhead) and Timsort for object arrays.
**Topic**: Sorting Internals
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q74
Which sorting algorithm is used by Python's `list.sort()` and Java's `Arrays.sort(Object[])`?
- A) QuickSort
- B) Timsort (Hybrid of MergeSort and InsertionSort)
- C) HeapSort
- D) SelectionSort
**Correct Answer**: B
**Explanation**: Timsort is a stable, adaptive sorting algorithm optimized for real-world data runs with $O(N)$ best case and $O(N \log N)$ worst case.
**Topic**: Sorting Internals
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q75
What is the worst-case number of comparisons performed by Selection Sort on an array of size $N$?
- A) $N \log N$
- B) $N(N - 1) / 2$
- C) $N$
- D) $2N$
**Correct Answer**: B
**Explanation**: Selection sort always scans the entire remaining unsorted prefix: $(N-1) + (N-2) + \dots + 1 = \frac{N(N-1)}{2}$ comparisons in all cases.
**Topic**: Sorting Algorithms
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q76
What is the maximum number of swaps performed by Selection Sort on an array of size $N$?
- A) $N^2$
- B) $N - 1$
- C) $N \log N$
- D) $N / 2$
**Correct Answer**: B
**Explanation**: Selection sort performs at most one swap per outer loop iteration, totaling at most $N - 1$ swaps (useful when memory write operations are extremely expensive).
**Topic**: Sorting Algorithms
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q77
What is the best-case time complexity of Bubble Sort when optimized with a swapped flag?
- A) $O(N^2)$
- B) $O(N)$
- C) $O(N \log N)$
- D) $O(1)$
**Correct Answer**: B
**Explanation**: If the array is already sorted, the first pass completes without setting the `swapped` flag, terminating early after $N - 1$ comparisons in $O(N)$ time.
**Topic**: Sorting Algorithms
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q78
What is the worst-case time complexity of searching in a Skip List containing $N$ elements?
- A) $O(1)$
- B) $O(\log N)$ average, $O(N)$ worst case
- C) $O(N \log N)$
- D) $O(\sqrt{N})$
**Correct Answer**: B
**Explanation**: Probabilistic tower heights yield $O(\log N)$ expected search time. In the pathological worst case where coin flips produce no express levels, it degrades to a linear list ($O(N)$).
**Topic**: Advanced Data Structures
**Difficulty**: Hard
**Source Classification**: GENERAL CS TOPIC

---

### Q79
What is the space complexity of Depth-First Search (DFS) on a general graph with $V$ vertices?
- A) $O(1)$
- B) $O(V)$
- C) $O(E)$
- D) $O(V \times E)$
**Correct Answer**: B
**Explanation**: DFS requires a `visited` boolean array ($O(V)$) and a recursion stack that can reach depth $V$ in the worst case (linear path graph).
**Topic**: Graph Algorithms
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q80
What algorithm computes the convex hull of a set of $2D$ points in $O(N \log N)$ time?
- A) Graham Scan or Monotone Chain
- B) Kadane's Algorithm
- C) Tarjan's Algorithm
- D) Dijkstra's Algorithm
**Correct Answer**: A
**Explanation**: Graham Scan sorts points by polar angle and uses a stack to build the convex hull in $O(N \log N)$ time.
**Topic**: Computational Geometry
**Difficulty**: Hard
**Source Classification**: GENERAL CS TOPIC

---

### Q81
What is the time complexity of inserting a key of length $L$ into a Trie (Prefix Tree)?
- A) $O(N)$
- B) $O(L)$
- C) $O(\log L)$
- D) $O(26^L)$
**Correct Answer**: B
**Explanation**: Each character of the key is traversed once down the Trie tree, taking exactly $L$ steps where $L$ is the word length, independent of total words $N$ in the Trie.
**Topic**: Tries
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q82
What is the space complexity of a Trie containing $N$ words of average length $L$ over an alphabet of size $\Sigma = 26$?
- A) $O(N \times L \times \Sigma)$ in the worst case
- B) $O(N + L)$
- C) $O(1)$
- D) $O(L^\Sigma)$
**Correct Answer**: A
**Explanation**: Each trie node contains an array of size $\Sigma = 26$ pointers. In the worst case with no common prefixes, there are $O(N \times L)$ nodes, each consuming $26$ pointer slots.
**Topic**: Tries
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q83
What is the time complexity of the Two-Sum problem using a Hash Map?
- A) $O(N^2)$ Time, $O(1)$ Space
- B) $O(N)$ Time, $O(N)$ Space
- C) $O(N \log N)$ Time, $O(1)$ Space
- D) $O(1)$ Time, $O(N)$ Space
**Correct Answer**: B
**Explanation**: In a single pass, check if `target - arr[i]` exists in the hash map ($O(1)$ lookup) and insert `arr[i]` into the map ($O(1)$ insert), totaling $O(N)$ time and $O(N)$ space.
**Topic**: Hashing
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q84
What is the time complexity of solving the 3-Sum problem using Sorting and Two Pointers?
- A) $O(N^3)$
- B) $O(N^2)$
- C) $O(N \log N)$
- D) $O(N)$
**Correct Answer**: B
**Explanation**: Sorting takes $O(N \log N)$. An outer loop fixes the first element ($O(N)$), and an inner two-pointer search finds matching pairs ($O(N)$), yielding $O(N^2)$ overall.
**Topic**: Two Pointers
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q85
What is the time complexity to rotate an array of size $N$ by $K$ steps in-place using the Reversal Algorithm?
- A) $O(N)$ Time, $O(1)$ Space
- B) $O(N)$ Time, $O(K)$ Space
- C) $O(N \times K)$ Time, $O(1)$ Space
- D) $O(N^2)$ Time, $O(1)$ Space
**Correct Answer**: A
**Explanation**: Reversing the entire array ($O(N)$), reversing the first $K$ elements ($O(K)$), and reversing the remaining $N-K$ elements ($O(N-K)$) takes $O(2N) = O(N)$ time with zero extra memory.
**Topic**: Arrays
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q86
What is the time complexity of finding the single non-repeating element in an array where every other element appears THREE times?
- A) $O(N)$ Time, $O(1)$ Space using bit count modulo 3
- B) $O(N \log N)$ Time, $O(1)$ Space
- C) $O(N)$ Time, $O(N)$ Space
- D) Both A and C are possible
**Correct Answer**: D
**Explanation**: We can use a hash map ($O(N)$ space) or count the set bits at each of the 32 bit positions across all numbers modulo 3 in $O(32N) = O(N)$ time and $O(1)$ space.
**Topic**: Bit Manipulation
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q87
What is the time complexity of calculating $X^N$ using Binary Exponentiation (Fast Power)?
- A) $O(N)$
- B) $O(\log N)$
- C) $O(1)$
- D) $O(N^2)$
**Correct Answer**: B
**Explanation**: If $N$ is even, $X^N = (X^2)^{N/2}$; if odd, $X^N = X \times X^{N-1}$. The exponent halves in each step, executing in $O(\log_2 N)$.
**Topic**: Mathematical Algorithms
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q88
What data structure is used to solve the "Sliding Window Maximum" problem in $O(N)$ time?
- A) Max-Heap
- B) Monotonic Decreasing Deque (Double-Ended Queue)
- C) Stack
- D) AVL Tree
**Correct Answer**: B
**Explanation**: A monotonic deque maintains candidate maximum indices in descending order of value. Elements out of the current window are popped from the front; smaller elements are popped from the back in $O(1)$ amortized time.
**Topic**: Deque & Sliding Window
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q89
What is the time complexity to find the Lowest Common Ancestor (LCA) of two nodes in a balanced Binary Search Tree?
- A) $O(N)$
- B) $O(\log N)$
- C) $O(1)$
- D) $O(N^2)$
**Correct Answer**: B
**Explanation**: In a BST, start at root: if both values are smaller, move left; if both are larger, move right. The split point where values diverge is the LCA, found in $O(h) = O(\log N)$.
**Topic**: Binary Search Trees
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q90
What is the time complexity to find the Lowest Common Ancestor (LCA) in a general, unsorted Binary Tree with $N$ nodes?
- A) $O(\log N)$
- B) $O(N)$
- C) $O(N^2)$
- D) $O(1)$
**Correct Answer**: B
**Explanation**: Requires a postorder traversal searching both subtrees, visiting at most all $N$ nodes in $O(N)$ time.
**Topic**: Binary Trees
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q91
What is the time complexity of the Rabin-Karp string matching algorithm in the average and worst cases?
- A) Average: $O(N + M)$; Worst: $O(N \times M)$
- B) Average: $O(N \times M)$; Worst: $O(N + M)$
- C) Average: $O(N)$; Worst: $O(N)$
- D) Average: $O(\log N)$; Worst: $O(N)$
**Correct Answer**: A
**Explanation**: Rabin-Karp computes rolling hash values in $O(1)$ per shift ($O(N+M)$ average). In the worst case where all hashes collide (spurious hits), it compares strings character-by-character, degrading to $O(NM)$.
**Topic**: String Algorithms
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q92
What is the time complexity of finding the maximum product subarray in an array of size $N$?
- A) $O(N^2)$
- B) $O(N)$ Time, $O(1)$ Space
- C) $O(N \log N)$
- D) $O(N^3)$
**Correct Answer**: B
**Explanation**: Modified Kadane's algorithm: track both `max_so_far` and `min_so_far` (since multiplying a negative number by a negative minimum can produce the new maximum) in a single linear pass of $O(N)$ time.
**Topic**: Dynamic Programming & Arrays
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q93
What is the auxiliary space complexity of MergeSort on an array of size $N$?
- A) $O(1)$
- B) $O(N)$
- C) $O(\log N)$
- D) $O(N^2)$
**Correct Answer**: B
**Explanation**: Standard MergeSort requires a temporary buffer array of size $N$ to merge two sorted halves.
**Topic**: Sorting Algorithms
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q94
What is the auxiliary space complexity of HeapSort on an array of size $N$?
- A) $O(N)$
- B) $O(1)$
- C) $O(\log N)$
- D) $O(N \log N)$
**Correct Answer**: B
**Explanation**: HeapSort builds the heap in-place within the original array and swaps the root with the end of the array, executing in strictly $O(1)$ auxiliary space.
**Topic**: Sorting Algorithms
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q95
What is the time complexity of counting the number of connected components in an undirected graph with $V$ vertices and $E$ edges?
- A) $O(V^2)$
- B) $O(V + E)$
- C) $O(V \log V)$
- D) $O(E \log V)$
**Correct Answer**: B
**Explanation**: Running BFS or DFS starting from every unvisited vertex visits every vertex and edge exactly once, completing in $O(V + E)$ time.
**Topic**: Graph Algorithms
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q96
What is the time complexity of the "Rotten Oranges" multi-source BFS problem on a grid of size $R \times C$?
- A) $O(R \times C)$
- B) $O((R \times C)^2)$
- C) $O(R + C)$
- D) $O(R \log C)$
**Correct Answer**: A
**Explanation**: All initial rotten oranges are enqueued simultaneously. Every cell is enqueued and processed at most once, taking $O(R \times C)$ time.
**Topic**: Multi-Source BFS
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q97
What is the time complexity of checking whether a graph is Bipartite using Breadth-First Search?
- A) $O(V^2)$
- B) $O(V + E)$
- C) $O(V \log V)$
- D) $O(E \log V)$
**Correct Answer**: B
**Explanation**: BFS 2-colors the graph: if a neighbor is encountered with the same color as the current node, the graph is not bipartite. Takes $O(V + E)$ linear time.
**Topic**: Graph Algorithms
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q98
What is the recurrence relation for the Tower of Hanoi problem with $N$ disks?
- A) $T(N) = 2T(N - 1) + 1$
- B) $T(N) = T(N - 1) + 1$
- C) $T(N) = 2T(N / 2) + N$
- D) $T(N) = T(N - 2) + 2$
**Correct Answer**: A
**Explanation**: Move $N - 1$ disks from source to auxiliary ($T(N-1)$), move the largest disk to destination ($1$ move), then move $N - 1$ disks from auxiliary to destination ($T(N-1)$). Total moves $= 2^N - 1$.
**Topic**: Recursion
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q99
What is the time complexity of solving the $N$-Queens problem using Backtracking?
- A) $O(N)$
- B) $O(N!)$
- C) $O(N^2)$
- D) $O(2^N)$
**Correct Answer**: B
**Explanation**: The first queen has $N$ choices, the second has at most $N-2$, the third has at most $N-4$, bounding the state space exploration by $O(N!)$.
**Topic**: Backtracking
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q100
What is the time complexity of finding the Longest Increasing Subsequence (LIS) of an array of size $N$ using Patience Sorting (Binary Search on tails array)?
- A) $O(N^2)$
- B) $O(N \log N)$
- C) $O(N)$
- D) $O(2^N)$
**Correct Answer**: B
**Explanation**: For each of the $N$ numbers, perform binary search (`lower_bound`) on the monotonically increasing `tails` array in $O(\log N)$ time, yielding $O(N \log N)$ overall.
**Topic**: Dynamic Programming & Binary Search
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED
