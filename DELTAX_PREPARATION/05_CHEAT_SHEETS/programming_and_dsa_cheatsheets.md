# DeltaX Cheat Sheets — Programming, DSA & Algorithms

> High-density, rapid-revision cheat sheets covering:
> 1. Programming Fundamentals
> 2. Data Structures Core
> 3. Big-O Complexity Master Matrix
> 4. Java Coding Patterns
> 5. Python Coding Patterns
> 6. Arrays Cheat Sheet
> 7. Strings Cheat Sheet
> 8. Hashing Cheat Sheet
> 9. Binary Search Cheat Sheet
> 10. Recursion & Backtracking Cheat Sheet
> 11. Dynamic Programming Cheat Sheet

---

## 1. Programming Fundamentals Cheat Sheet

### C/C++ Pointer Mechanics
- `int *p = &x;` $\to$ `p` holds address of `x`, `*p` is value of `x`.
- `*p++`: Evaluates value at `p`, then increments address `p` to point to next element.
- `(*p)++`: Dereferences address `p`, then increments the value at that address in-place.
- `*(++p)`: Increments address `p` first, then dereferences the value at the new address.
- `int (*arr)[10]`: Pointer to an array of 10 integers.
- `int *arr[10]`: Array of 10 integer pointers.
- `void (*fn)(int)`: Function pointer accepting `int` and returning `void`.

### Operator Precedence Gotchas (High to Low)
1. Postfix: `()`, `[]`, `->`, `.`, `++`, `--`
2. Unary: `+`, `-`, `!`, `~`, `++`, `--`, `*` (dereference), `&` (address of), `sizeof`
3. Multiplicative: `*`, `/`, `%`
4. Additive: `+`, `-`
5. Shift: `<<`, `>>` *(CRITICAL: `1 << 2 + 1` evaluates as `1 << (2 + 1) = 8`, NOT `(1 << 2) + 1 = 5`!)*
6. Relational: `<`, `<=`, `>`, `>=`
7. Equality: `==`, `!=`
8. Bitwise AND: `&`
9. Bitwise XOR: `^`
10. Bitwise OR: `|`
11. Logical AND: `&&`
12. Logical OR: `||`
13. Ternary: `?:`
14. Assignment: `=`, `+=`, `-=`, etc.

---

## 2. Data Structures Core Cheat Sheet

| Data Structure | Access | Search | Insertion | Deletion | Space | Key Traps / Notes |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Array** | $O(1)$ | $O(N)$ | $O(N)$ | $O(N)$ | $O(N)$ | Contiguous memory, cache-friendly. |
| **Singly Linked List** | $O(N)$ | $O(N)$ | $O(1)^*$ | $O(1)^*$ | $O(N)$ | Non-contiguous; $O(1)$ insert/delete only if node pointer is known. |
| **Doubly Linked List**| $O(N)$ | $O(N)$ | $O(1)$ | $O(1)$ | $O(N)$ | Requires $2 \times$ pointer overhead; used in LRU caches. |
| **Stack / Queue** | $O(N)$ | $O(N)$ | $O(1)$ | $O(1)$ | $O(N)$ | LIFO (Stack) vs FIFO (Queue). |
| **Binary Search Tree** | $O(\log N)$ | $O(\log N)$ | $O(\log N)$ | $O(\log N)$ | $O(N)$ | Degrades to $O(N)$ if unbalanced (skewed tree). |
| **AVL / Red-Black Tree**| $O(\log N)$ | $O(\log N)$ | $O(\log N)$ | $O(\log N)$ | $O(N)$ | Strictly balanced; self-balancing via tree rotations. |
| **Binary Heap** | $O(1)$ (peek) | $O(N)$ | $O(\log N)$ | $O(\log N)$ | $O(N)$ | Array-backed; parent at $\lfloor(i-1)/2\rfloor$, children at $2i+1, 2i+2$. |
| **Hash Table** | N/A | $O(1)$ avg | $O(1)$ avg | $O(1)$ avg | $O(N)$ | Degrades to $O(N)$ under hash collisions. |
| **Trie (Prefix Tree)** | $O(L)$ | $O(L)$ | $O(L)$ | $O(L)$ | $O(N \cdot \Sigma)$ | $L$ = word length, $\Sigma$ = alphabet size. |

---

## 3. Big-O Complexity Master Matrix

### Common Recurrences
- $T(N) = T(N/2) + O(1) \implies O(\log N)$ (Binary Search)
- $T(N) = 2T(N/2) + O(1) \implies O(N)$ (Tree Traversal)
- $T(N) = 2T(N/2) + O(N) \implies O(N \log N)$ (MergeSort)
- $T(N) = T(N-1) + O(1) \implies O(N)$ (Linear Scan / Factorial)
- $T(N) = T(N-1) + O(N) \implies O(N^2)$ (Selection Sort)
- $T(N) = 2T(N-1) + O(1) \implies O(2^N)$ (Recursive Fibonacci)

### Complexity Limits (1-Second CPU Threshold $\approx 10^8$ operations)
- $N \le 10 \implies O(N!)$ or $O(N^6)$ (Permutations)
- $N \le 20 \implies O(2^N)$ (Subsets, Backtracking)
- $N \le 500 \implies O(N^3)$ (Floyd-Warshall, Matrix Multiplications)
- $N \le 5000 \implies O(N^2)$ (Nested loops, 2D DP)
- $N \le 10^5 \implies O(N \log N)$ or $O(N)$ (Sorting, Segment Trees, Heaps)
- $N \le 10^7 \implies O(N)$ (Linear scan, Prefix sum, Hash map)
- $N \le 10^9 \implies O(\log N)$ or $O(1)$ (Binary search, Math formulas)

---

## 4. Java Coding Patterns Cheat Sheet

### Fast I/O & Boilerplate
```java
import java.io.*;
import java.util.*;

public class Main {
    static class FastReader {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;
        String next() {
            while (st == null || !st.hasMoreTokens()) {
                try { st = new StringTokenizer(br.readLine()); }
                catch (IOException e) { e.printStackTrace(); }
            }
            return st.nextToken();
        }
        int nextInt() { return Integer.parseInt(next()); }
    }
}
```

### Essential Java Collections Idioms
```java
// Frequency Map
Map<Integer, Integer> map = new HashMap<>();
map.put(key, map.getOrDefault(key, 0) + 1);

// Custom Priority Queue (Max Heap)
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
PriorityQueue<int[]> pairHeap = new PriorityQueue<>((a, b) -> Integer.compare(b[0], a[0]));

// Array Sorting with Custom Comparator
Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
```

---

## 5. Python Coding Patterns Cheat Sheet

### Idiomatic One-Liners & Performance
```python
from collections import Counter, defaultdict, deque
import heapq, bisect

# Frequency Map
counts = Counter(nums)

# Graph Adjacency List
graph = defaultdict(list)

# Max Heap (negate values)
heap = []
heapq.heappush(heap, -val)
largest = -heapq.heappop(heap)

# Binary Search Left/Right
idx_left = bisect.bisect_left(arr, target)
idx_right = bisect.bisect_right(arr, target)

# Double-Ended Queue (O(1) pops)
q = deque([root])
curr = q.popleft()
```

---

## 6. Arrays Cheat Sheet

### Core Invariants & Patterns
1. **Kadane’s Maximum Subarray**:
   ```python
   curr_sum = max_sum = nums[0]
   for x in nums[1:]:
       curr_sum = max(x, curr_sum + x)
       max_sum = max(max_sum, curr_sum)
```
2. **In-Place Array Reversal (Reverse range `[l, r]`)**:
   ```python
   while l < r:
       nums[l], nums[r] = nums[r], nums[l]
       l += 1
       r -= 1
```
3. **Boyer-Moore Voting**:
   - `count == 0` $\implies$ `candidate = x`.
   - `count += 1 if x == candidate else -1`.

---

## 7. Strings Cheat Sheet

### Core Invariants & Traps
1. **Character Array Frequency Bucket**:
   ```java
   int[] count = new int[26];
   count[ch - 'a']++;
```
2. **String Immutability Trap**: Repeated string concatenation in Java (`s += ch`) creates $O(N^2)$ memory churn. Always use `StringBuilder`.
3. **Palindromic Verification (Expand Around Center)**:
   - Odd length center: `(i, i)`.
   - Even length center: `(i, i+1)`.

---

## 8. Hashing Cheat Sheet

### Core Invariants & Traps
1. **Prefix Sum + Hash Map for Target Sum $K$**:
   - Condition: `prefix_sum - K` exists in map.
   - Always initialize `map[0] = 1` for subarrays starting from index 0.
2. **Equal 0s and 1s Subarray**:
   - Replace `0` with `-1`. Find longest subarray with sum `0`.
   - Store earliest occurrence of each prefix sum: `map.putIfAbsent(prefix, i)`.

---

## 9. Binary Search Cheat Sheet

### The Flawless Template
```python
def binary_search(nums: list[int], target: int) -> int:
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = low + (high - low) // 2  # Prevents integer overflow
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
```

### Binary Search on Answer (Predicate Template)
```python
low, high = min_possible, max_possible
ans = -1
while low <= high:
    mid = low + (high - low) // 2
    if is_feasible(mid):
        ans = mid
        high = mid - 1  # Minimize or maximize
    else:
        low = mid + 1
```

---

## 10. Recursion & Backtracking Cheat Sheet

### Universal Backtracking Framework
```python
def backtrack(start_index, current_path, remaining_state):
    if base_case_satisfied(remaining_state):
        result.append(list(current_path))
        return

    for i in range(start_index, len(candidates)):
        # 1. Prune duplicates (Combination Sum II)
        if i > start_index and candidates[i] == candidates[i - 1]:
            continue
        if candidates[i] > remaining_state:
            break

        # 2. Make choice
        current_path.append(candidates[i])
        # 3. Explore
        backtrack(i + 1, current_path, remaining_state - candidates[i])
        # 4. Undo choice
        current_path.pop()
```

---

## 11. Dynamic Programming Cheat Sheet

### Top 4 DP State Transitions
1. **0/1 Knapsack (1D Space Optimized)**:
   - `dp[w] = max(dp[w], dp[w - cost[i]] + val[i])` (traverse $w$ from $W$ down to $cost[i]$).
2. **Coin Change (Unbounded Knapsack)**:
   - `dp[w] = min(dp[w], dp[w - coin] + 1)` (traverse $w$ from $coin$ up to $W$).
3. **Longest Common Subsequence (LCS)**:
   - If `s1[i] == s2[j]`: `dp[i][j] = dp[i-1][j-1] + 1`
   - Else: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`
4. **House Robber / Non-Adjacent Sum**:
   - `curr = max(prev1, prev2 + nums[i])`
