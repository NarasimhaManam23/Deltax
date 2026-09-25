# Solutions: DeltaX Round 3 — Historical 120-Minute / 5-Question Mocks

> Complete, verified solutions in **Java** and **Python** for the key problems in the 10 historical mock sets.
> Specifically engineered to hit 100% test case pass rates and exceed the 55% per-question threshold.

---

## Solutions for Mock 1

### Q1.1: Single Non-Duplicate Pair Finder
- **Logic**: XOR of identical numbers is `0` ($a \oplus a = 0$), and $0 \oplus a = a$. Running XOR isolates the lonely element.
- **Complexity**: Time $O(N)$, Space $O(1)$.

```java
public class Sol1_1 {
    public static int singleNumber(int[] nums) {
        int xor = 0;
        for (int x : nums) xor ^= x;
        return xor;
    }
}
```

```python
def single_number(nums: list[int]) -> int:
    xor = 0
    for x in nums:
        xor ^= x
    return xor
```

---

### Q1.2: Minimum Absolute Difference Pair
- **Logic**: Sort array. Find minimum adjacent difference. Collect all pairs with that difference.
- **Complexity**: Time $O(N \log N)$, Space $O(N)$.

```python
def minimum_abs_difference(arr: list[int]) -> list[list[int]]:
    arr.sort()
    min_diff = min(arr[i + 1] - arr[i] for i in range(len(arr) - 1))
    return [
        [arr[i], arr[i + 1]]
        for i in range(len(arr) - 1)
        if arr[i + 1] - arr[i] == min_diff
    ]
```

---

### Q1.3: Ad Campaign URL Param Extractor
- **Logic**: Find `?` in URL. Split query parameters by `&`. Filter keys beginning with `dx_`. Store in sorted map and print.

```python
def extract_dx_params(url: str) -> list[str]:
    if "?" not in url:
        return ["NONE"]
    query = url.split("?", 1)[1]
    params = {}
    for part in query.split("&"):
        if "=" in part:
            k, v = part.split("=", 1)
            if k.startswith("dx_"):
                params[k] = v
    if not params:
        return ["NONE"]
    return [f"{k}:{params[k]}" for k in sorted(params.keys())]
```

---

### Q1.4: Combination Sum with Deduplication (Combination Sum II)
- **Logic**: Backtracking. Sort candidates. Skip duplicate adjacent elements at the same tree depth (`if i > start and candidates[i] == candidates[i-1]: continue`).
- **Complexity**: Time $O(2^N)$, Space $O(N)$.

```java
import java.util.*;

public class Sol1_4 {
    public static List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates);
        List<List<Integer>> result = new ArrayList<>();
        backtrack(candidates, target, 0, new ArrayList<>(), result);
        return result;
    }
    private static void backtrack(int[] cand, int remain, int start, List<Integer> current, List<List<Integer>> res) {
        if (remain == 0) {
            res.add(new ArrayList<>(current));
            return;
        }
        for (int i = start; i < cand.length; i++) {
            if (i > start && cand[i] == cand[i - 1]) continue; // avoid duplicates
            if (cand[i] > remain) break;
            current.add(cand[i]);
            backtrack(cand, remain - cand[i], i + 1, current, res);
            current.remove(current.size() - 1);
        }
    }
}
```

```python
def combination_sum_2(
    candidates: list[int], target: int
) -> list[list[int]]:
    candidates.sort()
    res = []

    def backtrack(start: int, remain: int, path: list[int]):
        if remain == 0:
            res.append(list(path))
            return
        for i in range(start, len(candidates)):
            if i > start and candidates[i] == candidates[i - 1]:
                continue
            if candidates[i] > remain:
                break
            path.append(candidates[i])
            backtrack(i + 1, remain - candidates[i], path)
            path.pop()

    backtrack(0, target, [])
    return res
```

---

### Q1.5: 0/1 Knapsack — Ad Budget Optimizer
- **Logic**: 1D DP array traversed backwards from $W$ down to $cost[i]$.
- **Complexity**: Time $O(N \cdot W)$, Space $O(W)$.

```java
public class Sol1_5 {
    public static int maxImpressions(int W, int[] cost, int[] val) {
        int[] dp = new int[W + 1];
        for (int i = 0; i < cost.length; i++) {
            for (int w = W; w >= cost[i]; w--) {
                dp[w] = Math.max(dp[w], dp[w - cost[i]] + val[i]);
            }
        }
        return dp[W];
    }
}
```

```python
def max_impressions(W: int, cost: list[int], val: list[int]) -> int:
    dp = [0] * (W + 1)
    for c, v in zip(cost, val):
        for w in range(W, c - 1, -1):
            dp[w] = max(dp[w], dp[w - c] + v)
    return dp[W]
```

---

## Solutions for Mock 2

### Q2.4: Multi-Source Infected Node Spread (Rotten Oranges)
- **Logic**: Multi-source BFS. Push all initial corrupted nodes (`2`) into Queue with `time = 0`. Count fresh nodes (`1`). Each BFS step corrupts 4-directional fresh neighbors.
- **Complexity**: Time $O(R \times C)$, Space $O(R \times C)$.

```java
import java.util.*;

public class Sol2_4 {
    public static int orangesRotting(int[][] grid) {
        int R = grid.length, C = grid[0].length;
        Queue<int[]> queue = new LinkedList<>();
        int fresh = 0;

        for (int r = 0; r < R; r++) {
            for (int c = 0; c < C; c++) {
                if (grid[r][c] == 2) queue.offer(new int[]{r, c});
                else if (grid[r][c] == 1) fresh++;
            }
        }

        if (fresh == 0) return 0;
        int minutes = 0;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};

        while (!queue.isEmpty() && fresh > 0) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                int[] curr = queue.poll();
                for (int[] d : dirs) {
                    int nr = curr[0] + d[0], nc = curr[1] + d[1];
                    if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        queue.offer(new int[]{nr, nc});
                    }
                }
            }
            minutes++;
        }
        return fresh == 0 ? minutes : -1;
    }
}
```

```python
from collections import deque


def oranges_rotting(grid: list[list[int]]) -> int:
    R, C = len(grid), len(grid[0])
    q = deque()
    fresh = 0
    for r in range(R):
        for c in range(C):
            if grid[r][c] == 2:
                q.append((r, c))
            elif grid[r][c] == 1:
                fresh += 1

    if fresh == 0:
        return 0
    minutes = 0
    dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]

    while q and fresh > 0:
        for _ in range(len(q)):
            r, c = q.popleft()
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    q.append((nr, nc))
        minutes += 1

    return minutes if fresh == 0 else -1
```

---

### Q2.5: Longest Increasing Subsequence (Patience Sorting / Binary Search)
- **Logic**: Maintain array `tails` where `tails[i]` stores smallest tail of all increasing subsequences of length `i+1`. Use binary search `bisect_left` for each number.
- **Complexity**: Time $O(N \log N)$, Space $O(N)$.

```python
import bisect


def length_of_lis(nums: list[int]) -> int:
    tails = []
    for x in nums:
        idx = bisect.bisect_left(tails, x)
        if idx == len(tails):
            tails.append(x)
        else:
            tails[idx] = x
    return len(tails)
```

---

## Solutions for Mock 3

### Q3.2: Contiguous Subarray with Sum Equal to K
- **Logic**: Hash Map storing frequency of prefix sums. If `prefix_sum - K` exists in map, add its frequency.
- **Complexity**: Time $O(N)$, Space $O(N)$.

```python
def subarray_sum(nums: list[int], k: int) -> int:
    prefix_map = {0: 1}
    curr_sum = 0
    count = 0
    for x in nums:
        curr_sum += x
        count += prefix_map.get(curr_sum - k, 0)
        prefix_map[curr_sum] = prefix_map.get(curr_sum, 0) + 1
    return count
```

---

### Q3.5: Minimum Jumps to Reach Last Index
- **Logic**: Greedy BFS. Maintain `current_end` and `farthest`. When pointer reaches `current_end`, increment jump count and update `current_end = farthest`.
- **Complexity**: Time $O(N)$, Space $O(1)$.

```java
public class Sol3_5 {
    public static int jump(int[] nums) {
        int jumps = 0, currentEnd = 0, farthest = 0;
        for (int i = 0; i < nums.length - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]);
            if (i == currentEnd) {
                jumps++;
                currentEnd = farthest;
            }
        }
        return jumps;
    }
}
```

---

## Solutions for Mock 4

### Q4.3: Valid IPv4 and IPv6 Address Validator
- **Logic**: Split IPv4 by `.` (must be 4 tokens, digits only, no leading zeros unless single `0`, value 0–255). Split IPv6 by `:` (must be 8 tokens, length 1–4, valid hex characters).

```python
def valid_ip_address(queryIP: str) -> str:
    def is_ipv4(s: str) -> bool:
        parts = s.split(".")
        if len(parts) != 4:
            return False
        for p in parts:
            if not p.isdigit():
                return False
            if len(p) > 1 and p[0] == "0":
                return False
            if not (0 <= int(p) <= 255):
                return False
        return True

    def is_ipv6(s: str) -> bool:
        parts = s.split(":")
        if len(parts) != 8:
            return False
        hexdigits = "0123456789abcdefABCDEF"
        for p in parts:
            if not (1 <= len(p) <= 4):
                return False
            if not all(c in hexdigits for c in p):
                return False
        return True

    if is_ipv4(queryIP):
        return "IPv4"
    if is_ipv6(queryIP):
        return "IPv6"
    return "Neither"
```

---

### Q4.5: Coin Change — Minimum Coins
- **Logic**: Bottom-up DP array `dp[i]` representing min coins for amount `i`.
- **Complexity**: Time $O(A \cdot C)$, Space $O(A)$.

```python
def coin_change(coins: list[int], amount: int) -> int:
    dp = [float("inf")] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] = min(dp[x], dp[x - coin] + 1)
    return dp[amount] if dp[amount] != float("inf") else -1
```

---

## Solutions for Mock 6

### Q6.1: Majority Element (Boyer-Moore Voting)
- **Logic**: Maintain candidate and count. If `count == 0`, set candidate to current element. If element matches candidate, increment; else decrement.
- **Complexity**: Time $O(N)$, Space $O(1)$.

```java
public class Sol6_1 {
    public static int majorityElement(int[] nums) {
        int candidate = nums[0], count = 0;
        for (int x : nums) {
            if (count == 0) candidate = x;
            count += (x == candidate) ? 1 : -1;
        }
        return candidate;
    }
}
```

---

### Q6.5: Next Greater Element (Monotonic Stack)
- **Logic**: Monotonic decreasing stack storing indices. Loop twice ($2N$) for circular array.
- **Complexity**: Time $O(N)$, Space $O(N)$.

```java
import java.util.*;

public class Sol6_5 {
    public static int[] nextGreaterElements(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        Arrays.fill(res, -1);
        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i < 2 * n; i++) {
            while (!stack.isEmpty() && nums[stack.peek()] < nums[i % n]) {
                res[stack.pop()] = nums[i % n];
            }
            if (i < n) stack.push(i);
        }
        return res;
    }
}
```

---

## Solutions for Mock 10

### Q10.5: Largest Rectangle in Histogram (Monotonic Stack)
- **Logic**: Maintain stack of indices with increasing bar heights. When height decreases, pop stack and calculate area with popped bar as smallest height.
- **Complexity**: Time $O(N)$, Space $O(N)$.

```java
import java.util.Stack;

public class Sol10_5 {
    public static int largestRectangleArea(int[] heights) {
        Stack<Integer> stack = new Stack<>();
        int maxArea = 0, n = heights.length;
        for (int i = 0; i <= n; i++) {
            int h = (i == n) ? 0 : heights[i];
            while (!stack.isEmpty() && heights[stack.peek()] > h) {
                int height = heights[stack.pop()];
                int width = stack.isEmpty() ? i : i - stack.peek() - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(i);
        }
        return maxArea;
    }
}
```

```python
def largest_rectangle_area(heights: list[int]) -> int:
    stack = []
    max_area = 0
    heights.append(0)  # Sentinel to flush remaining bars

    for i, h in enumerate(heights):
        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)

    heights.pop()
    return max_area
```
