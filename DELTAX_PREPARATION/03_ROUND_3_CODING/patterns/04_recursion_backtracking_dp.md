# DeltaX Coding Patterns 04: Recursion, Backtracking & Dynamic Programming

---

# PATTERN 12 & 13: RECURSION & BACKTRACKING (COMBINATIONS & PERMUTATIONS)

### 1. Recognition Clues
* "Find all unique combinations of numbers that sum to a target (Combination Sum II)."
* "Generate all valid subsets or permutations without duplicates."
* "Word Search in a 2D grid."
* "Palindrome Partitioning."
* "Generate all valid parentheses combinations of size $N$."

### 2. The General Backtracking Template
```
void backtrack(state, choices, result) {
    if (is_solution(state)) {
        result.add(copy(state));
        return;
    }
    for (choice in choices) {
        if (!is_valid(choice)) continue;
        
        make_choice(state, choice);
        backtrack(state, remaining_choices, result);
        undo_choice(state, choice); // BACKTRACK!
    }
}
```

### 3. Handling Duplicates Without Sets
To generate unique combinations when the input array contains duplicates:
1. Sort the input array: `Arrays.sort(candidates)`.
2. In the loop at the same recursion depth, skip identical adjacent elements:
   `if (i > start && candidates[i] == candidates[i - 1]) continue;`

### 4. Implementation Code

#### Java Implementation (Combination Sum II - Unique Combinations with Duplicates)
```java
import java.util.*;

public class CombinationSum2 {
    public static List<List<Integer>> combinationSum2(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(candidates); // Essential for duplicate handling
        backtrack(candidates, target, 0, new ArrayList<>(), result);
        return result;
    }
    
    private static void backtrack(int[] candidates, int remain, int start, 
                                   List<Integer> current, List<List<Integer>> result) {
        if (remain == 0) {
            result.add(new ArrayList<>(current)); // Deep copy solution
            return;
        }
        
        for (int i = start; i < candidates.length; i++) {
            // Prune branch if element exceeds remaining target
            if (candidates[i] > remain) break;
            
            // Skip duplicate elements at the same tree depth
            if (i > start && candidates[i] == candidates[i - 1]) continue;
            
            current.add(candidates[i]);
            // i + 1 ensures each element is used at most once per combination
            backtrack(candidates, remain - candidates[i], i + 1, current, result);
            current.remove(current.size() - 1); // Undo choice (backtrack)
        }
    }
}
```

#### Python Implementation (Generate Parentheses)
```python
def generate_parentheses(n: int) -> list[str]:
    """
    Generates all combinations of well-formed parentheses of length 2N.
    Time: O(4^N / sqrt(N)) [Catalan Number], Space: O(N) stack
    """
    res = []
    
    def backtrack(current_str: str, open_count: int, close_count: int):
        if len(current_str) == 2 * n:
            res.append(current_str)
            return
            
        if open_count < n:
            backtrack(current_str + "(", open_count + 1, close_count)
            
        if close_count < open_count:
            backtrack(current_str + ")", open_count, close_count + 1)
            
    backtrack("", 0, 0)
    return res
```

### 5. Common Pitfalls
* Forgetting to make a deep copy (`new ArrayList<>(current)`) when adding to the result list in Java; without this, all entries in the final list will be empty!
* Forgetting to undo the choice (`current.remove(...)`) after returning from the recursive call.

### 6. Five Practice Exercises
1. Combination Sum I and II (Reported DeltaX pattern).
2. Subsets II (Handling duplicate input elements).
3. Permutations I and II.
4. Word Search on a 2D Board.
5. Generate Parentheses.

---

# PATTERN 15: DYNAMIC PROGRAMMING (0/1 KNAPSACK & 1D/2D STATE TRANSITIONS)

### 1. Recognition Clues
* "Find the maximum profit given a weight capacity limit (0/1 Knapsack)."
* "Minimum coins to make change (Coin Change I & II)."
* "Longest Common Subsequence / Edit Distance."
* "Unique Paths in a grid with obstacles."
* "House Robber (Cannot choose adjacent elements)."

### 2. Strategy: 1D Space Optimization
* In 0/1 Knapsack, standard 2D DP table `dp[i][w]` can be compressed to a **1D array** `dp[w]` by iterating the weight loop **BACKWARDS** (from capacity down to item weight):
  `for (int w = W; w >= wt[i]; w--) dp[w] = max(dp[w], val[i] + dp[w - wt[i]]);`
  Iterating backwards ensures each item is used at most once (avoiding unbounded reuse).
* In Unbounded Knapsack (like Coin Change), iterate the inner loop **FORWARDS**.

### 3. Implementation Code

#### Java Implementation (0/1 Knapsack - Space Optimized $O(W)$)
```java
public class KnapsackZeroOne {
    public static int knapSack(int W, int[] wt, int[] val, int n) {
        // dp[w] stores max value achievable with capacity w
        int[] dp = new int[W + 1];
        
        for (int i = 0; i < n; i++) {
            // Traverse BACKWARDS so we don't use the same item multiple times
            for (int w = W; w >= wt[i]; w--) {
                dp[w] = Math.max(dp[w], val[i] + dp[w - wt[i]]);
            }
        }
        return dp[W];
    }
}
```

#### Python Implementation (Coin Change I - Minimum Coins)
```python
def coin_change(coins: list[int], amount: int) -> int:
    """
    Computes fewest coins needed to make up that amount.
    Time: O(amount * len(coins)), Space: O(amount)
    """
    dp = [float("inf")] * (amount + 1)
    dp[0] = 0  # Base case: 0 coins for 0 amount
    
    for c in coins:
        for a in range(c, amount + 1):
            dp[a] = min(dp[a], dp[a - c] + 1)
            
    return dp[amount] if dp[amount] != float("inf") else -1
```

#### Java Implementation (Longest Increasing Subsequence - $O(N \log N)$ Patience Sort)
```java
import java.util.Arrays;

public class LongestIncreasingSubsequence {
    public static int lengthOfLIS(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        // tails[i] stores the smallest tail of all increasing subsequences of length i+1
        int[] tails = new int[nums.length];
        int size = 0;
        
        for (int x : nums) {
            // Binary search for x in tails array
            int i = 0, j = size;
            while (i < j) {
                int mid = i + (j - i) / 2;
                if (tails[mid] < x) {
                    i = mid + 1;
                } else {
                    j = mid;
                }
            }
            tails[i] = x;
            if (i == size) size++;
        }
        return size;
    }
}
```

### 4. Common Pitfalls
* In 0/1 Knapsack, iterating forwards causes the item to be reused multiple times (turning it into an unbounded knapsack problem).
* Initializing minimum arrays with `Integer.MAX_VALUE` without checking for overflow when adding 1 (`MAX_VALUE + 1` overflows to negative!).

### 5. Five Practice Exercises
1. 0/1 Knapsack Problem (Standard & Partition Equal Subset Sum).
2. Coin Change I (Min coins) & Coin Change II (Total combinations).
3. Longest Increasing Subsequence (LIS) in $O(N \log N)$.
4. Longest Common Subsequence (LCS) & Edit Distance.
5. House Robber I & II (Circular houses).
