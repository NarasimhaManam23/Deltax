# DeltaX Coding Question Bank: Medium & Medium-Hard (40 Original Problems)

---

# SECTION 1: 20 MEDIUM CODING PROBLEMS

---

### Problem M01: Combination Sum II (Unique Combinations with Duplicates)
* **Reported DeltaX Theme**: High-frequency OA problem.
* **Statement**: Given a collection of candidate numbers `candidates` (which may contain duplicate integers) and a target number `target`, find all unique combinations in `candidates` where the candidate numbers sum to `target`. Each number in `candidates` may only be used **once** in the combination. The solution set must not contain duplicate combinations.
* **Input**: `candidates = [10, 1, 2, 7, 6, 1, 5], target = 8`
* **Output**: `[[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]`
* **Constraints**: $1 \le |candidates| \le 100$, $1 \le target \le 30$.
* **Edge Cases**: Target smaller than all elements, all elements identical.
* **Optimal Approach**: Sort candidates + Backtracking with `if (i > start && candidates[i] == candidates[i - 1]) continue;` to prune duplicate branches without using sets. Time: $O(2^N)$, Space: $O(N)$ stack.

---

### Problem M02: Rotten Oranges (Grid Multi-Source BFS)
* **Reported DeltaX Theme**: Confirmed technical interview & OA question.
* **Statement**: You are given an $M \times N$ grid where each cell has one of three values: `0` (empty), `1` (fresh orange), or `2` (rotten orange). Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If impossible, return `-1`.
* **Input**: `grid = [[2,1,1],[1,1,0],[0,1,1]]` $\rightarrow$ **Output**: `4`
* **Constraints**: $1 \le M, N \le 10$.
* **Edge Cases**: Zero fresh oranges initially (return `0`), isolated fresh orange surrounded by 0s (return `-1`).
* **Optimal Approach**: Multi-source BFS: enqueue all initial `2`s simultaneously, track remaining fresh count, decrement fresh count level-by-level. Time: $O(M \times N)$, Space: $O(M \times N)$.

---

### Problem M03: 0/1 Knapsack Resource Allocation
* **Reported DeltaX Theme**: Budget & Campaign resource allocation.
* **Statement**: You are given $N$ marketing campaigns. Campaign $i$ requires cost `wt[i]` and yields expected revenue `val[i]`. Given a maximum budget `W`, find the maximum revenue you can achieve without exceeding budget `W`. Each campaign can be selected at most once.
* **Input**: `W = 50, wt = [10, 20, 30], val = [60, 100, 120], n = 3` $\rightarrow$ **Output**: `220` (Campaigns 2 and 3: cost $20 + 30 = 50$, value $100 + 120 = 220$).
* **Constraints**: $1 \le N \le 1000, 1 \le W \le 1000$.
* **Optimal Approach**: 1D Space-Optimized Dynamic Programming traversing weights backwards: `dp[w] = max(dp[w], val[i] + dp[w - wt[i]])`. Time: $O(N \times W)$, Space: $O(W)$.

---

### Problem M04: Coin Change (Minimum Coins)
* **Statement**: You are given an integer array `coins` representing coins of different denominations and an integer `amount`. Return the fewest number of coins that you need to make up that amount. If impossible, return `-1`. You may use an infinite number of each coin.
* **Input**: `coins = [1, 2, 5], amount = 11` $\rightarrow$ **Output**: `3` ($5 + 5 + 1$)
* **Constraints**: $1 \le |coins| \le 12, 0 \le amount \le 10^4$.
* **Optimal Approach**: Bottom-up 1D DP: `dp[a] = min(dp[a], dp[a - c] + 1)` in $O(\text{amount} \times |coins|)$ time, $O(\text{amount})$ space.

---

### Problem M05: Longest Increasing Subsequence (Patience Sorting)
* **Statement**: Given an integer array `nums`, return the length of the longest strictly increasing subsequence. Must solve in $O(N \log N)$ time.
* **Input**: `nums = [10, 9, 2, 5, 3, 7, 101, 18]` $\rightarrow$ **Output**: `4` (`[2, 3, 7, 101]`)
* **Constraints**: $1 \le N \le 2500$.
* **Optimal Approach**: Patience Sorting with Binary Search maintaining the `tails` array in $O(N \log N)$ time, $O(N)$ space.

---

### Problem M06: Subarray Product Less Than K
* **Statement**: Given an array of positive integers `nums` and an integer `k`, return the number of contiguous subarrays where the product of all elements is strictly less than `k`.
* **Input**: `nums = [10, 5, 2, 6], k = 100` $\rightarrow$ **Output**: `8`
* **Constraints**: $1 \le N \le 3 \times 10^4, 0 \le k \le 10^6$.
* **Edge Cases**: $k \le 1$ (return 0 immediately since elements are positive).
* **Optimal Approach**: Sliding window with two pointers: at each step `right`, product expands; while `prod >= k`, divide by `nums[left++]`. Add `right - left + 1` to total. Time: $O(N)$, Space: $O(1)$.

---

### Problem M07: Subarrays with Bounded Maximum
* **Statement**: Given an integer array `nums` and two integers `left` and `right`, return the number of contiguous non-empty subarrays such that the value of the maximum array element in that subarray is in the range `[left, right]`.
* **Input**: `nums = [2, 1, 4, 3], left = 2, right = 3` $\rightarrow$ **Output**: `3` (`[2]`, `[2, 1]`, `[3]`)
* **Constraints**: $1 \le N \le 10^5$.
* **Optimal Approach**: Count subarrays with `max <= right` minus subarrays with `max < left` using two pointers in $O(N)$ time, $O(1)$ space.

---

### Problem M08: Subarray with Given XOR Target
* **Statement**: Given an array of integers `A` and an integer `B`, find the total number of contiguous subarrays having bitwise XOR of all elements equal to `B`.
* **Input**: `A = [4, 2, 2, 6, 4], B = 6` $\rightarrow$ **Output**: `4`
* **Constraints**: $1 \le N \le 10^5, 0 \le B \le 10^9$.
* **Optimal Approach**: Prefix XOR with Hash Map: $PrefixXOR[j] \oplus PrefixXOR[i - 1] = B \implies PrefixXOR[i - 1] = PrefixXOR[j] \oplus B$. Time: $O(N)$, Space: $O(N)$.

---

### Problem M09: Capacity To Ship Packages Within D Days
* **Statement**: A conveyor belt has packages that must be shipped within `days` days. Package weights are given in array `weights`. Packages must be loaded in the order given. Find the least weight capacity of the ship.
* **Input**: `weights = [1,2,3,4,5,6,7,8,9,10], days = 5` $\rightarrow$ **Output**: `15`
* **Constraints**: $1 \le days \le N \le 5 \times 10^4$.
* **Optimal Approach**: Binary Search on Answer Space in range `[max(weights), sum(weights)]` with greedy verification in $O(N \log(\sum W))$ time.

---

### Problem M10: Koko Eating Bananas
* **Statement**: Koko can eat at speed $K$ bananas per hour from piles `piles`. She has $H$ hours. Find minimum integer $K$ to eat all bananas within $H$ hours.
* **Input**: `piles = [3, 6, 7, 11], h = 8` $\rightarrow$ **Output**: `4`
* **Constraints**: $1 \le |piles| \le 10^4, |piles| \le h \le 10^9$.
* **Optimal Approach**: Binary search on speed in range `[1, max(piles)]` in $O(N \log(\max P))$ time, $O(1)$ space.

---

### Problem M11: Search a 2D Matrix II
* **Statement**: Write an efficient algorithm that searches for a target value in an $M \times N$ integer matrix where integers in each row are sorted ascending from left to right, and integers in each column are sorted ascending from top to bottom.
* **Input**: `matrix = [[1,4,7],[2,5,8],[3,6,9]], target = 5` $\rightarrow$ **Output**: `true`
* **Constraints**: $1 \le M, N \le 300$.
* **Optimal Approach**: Start at top-right corner $(0, N-1)$: if `val > target`, move left; if `val < target`, move down. Time: $O(M + N)$, Space: $O(1)$.

---

### Problem M12: Word Break (Dictionary Matching)
* **Statement**: Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.
* **Input**: `s = "applepenapple", wordDict = ["apple", "pen"]` $\rightarrow$ **Output**: `true`
* **Constraints**: $1 \le |s| \le 300, 1 \le |wordDict| \le 1000$.
* **Optimal Approach**: 1D DP: `dp[i]` is true if `dp[j] && s.substring(j, i)` is in dictionary set. Time: $O(N^2)$, Space: $O(N)$.

---

### Problem M13: Partition Equal Subset Sum
* **Statement**: Given an integer array `nums`, return `true` if you can partition the array into two subsets such that the sum of elements in both subsets is equal.
* **Input**: `nums = [1, 5, 11, 5]` $\rightarrow$ **Output**: `true` (Subsets: `[1, 5, 5]` and `[11]`)
* **Constraints**: $1 \le N \le 200, 1 \le nums[i] \le 100$.
* **Optimal Approach**: Total sum must be even. Reduced to 0/1 Knapsack subset sum for target `sum / 2` in $O(N \times \text{Target})$ time, $O(\text{Target})$ space.

---

### Problem M14: Course Schedule (Prerequisite Cycle Detection)
* **Statement**: There are $N$ courses labelled $0$ to $N-1$. Given prerequisites pairs `[a, b]` meaning you must take course $b$ before course $a$, return `true` if you can finish all courses.
* **Input**: `numCourses = 2, prerequisites = [[1, 0]]` $\rightarrow$ **Output**: `true`
* **Constraints**: $1 \le numCourses \le 2000$.
* **Optimal Approach**: Topological sort via Kahn's algorithm (indegree tracking with BFS queue) or DFS 3-color cycle detection in $O(V + E)$ time.

---

### Problem M15: Number of Islands
* **Statement**: Given an $M \times N$ 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.
* **Input**: `grid = [["1","1","0"],["1","1","0"],["0","0","1"]]` $\rightarrow$ **Output**: `2`
* **Constraints**: $1 \le M, N \le 300$.
* **Optimal Approach**: DFS or BFS sinking visited land (`grid[r][c] = '0'`) in $O(M \times N)$ time, $O(M \times N)$ space.

---

### Problem M16: Find All Anagrams in a String
* **Statement**: Given two strings `s` and `p`, return an array of all the start indices of `p`'s anagrams in `s`.
* **Input**: `s = "cbaebabacd", p = "abc"` $\rightarrow$ **Output**: `[0, 6]`
* **Constraints**: $1 \le |s|, |p| \le 3 \times 10^4$.
* **Optimal Approach**: Fixed sliding window of size $|p|$ with frequency difference counter in $O(N)$ time, $O(1)$ space.

---

### Problem M17: Target Sum with + and - Signs
* **Statement**: You are given an integer array `nums` and an integer `target`. You build an expression by adding `+` or `-` before each integer. Return the number of different expressions that evaluate to `target`.
* **Input**: `nums = [1, 1, 1, 1, 1], target = 3` $\rightarrow$ **Output**: `5`
* **Constraints**: $1 \le N \le 20$.
* **Optimal Approach**: Subset sum transformation: $P - N = Target \implies 2P = Target + TotalSum \implies P = (Target + TotalSum) / 2$. 1D DP in $O(N \times P)$ time.

---

### Problem M18: Decode Ways
* **Statement**: A message containing letters from A-Z is encoded to numbers using `'A' -> "1" ... 'Z' -> "26"`. Given a string `s` containing only digits, return the number of ways to decode it.
* **Input**: `s = "226"` $\rightarrow$ **Output**: `3` (`"BZ"`, `"VF"`, `"BBF"`)
* **Constraints**: $1 \le |s| \le 100$.
* **Edge Cases**: Leading `'0'` is invalid (`"06"` cannot be decoded).
* **Optimal Approach**: Dynamic programming with two state variables: check 1-digit valid (`1..9`) and 2-digit valid (`10..26`) in $O(N)$ time, $O(1)$ space.

---

### Problem M19: Longest Consecutive Sequence in $O(N)$
* **Statement**: Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence. Must run in $O(N)$ time.
* **Input**: `nums = [100, 4, 200, 1, 3, 2]` $\rightarrow$ **Output**: `4` (`[1, 2, 3, 4]`)
* **Constraints**: $0 \le N \le 10^5$.
* **Optimal Approach**: Hash Set: check if `num - 1` exists; only count forward when `num - 1` is absent (start of sequence) in $O(N)$ time, $O(N)$ space.

---

### Problem M20: Letter Combinations of a Phone Number
* **Statement**: Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent according to telephone keypad mapping.
* **Input**: `digits = "23"` $\rightarrow$ **Output**: `["ad","ae","af","bd","be","bf","cd","ce","cf"]`
* **Constraints**: $0 \le |digits| \le 4$.
* **Optimal Approach**: Backtracking exploring $3^N$ to $4^N$ combinations in $O(4^N)$ time.

---

# SECTION 2: 20 MEDIUM-HARD CODING PROBLEMS

---

### Problem MH01: Trapping Rain Water
* **Statement**: Given $N$ non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.
* **Input**: `height = [0,1,0,2,1,0,1,3,2,1,2,1]` $\rightarrow$ **Output**: `6`
* **Constraints**: $1 \le N \le 2 \times 10^4$.
* **Optimal Approach**: Two Pointers (`left` and `right`) tracking `left_max` and `right_max` in $O(N)$ time and $O(1)$ space.

---

### Problem MH02: Minimum Window Substring
* **Statement**: Given two strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If no such substring exists, return `""`.
* **Input**: `s = "ADOBECODEBANC", t = "ABC"` $\rightarrow$ **Output**: `"BANC"`
* **Constraints**: $1 \le |s|, |t| \le 10^5$.
* **Optimal Approach**: Variable sliding window with frequency match counter in $O(N + M)$ time, $O(\Sigma)$ space.

---

### Problem MH03: Sliding Window Maximum
* **Statement**: You are given an array of integers `nums`, and a sliding window of size $k$ moving from left to right. Return the max sliding window. Must run in $O(N)$ time.
* **Input**: `nums = [1,3,-1,-3,5,3,6,7], k = 3` $\rightarrow$ **Output**: `[3,3,5,5,6,7]`
* **Constraints**: $1 \le N \le 10^5, 1 \le k \le N$.
* **Optimal Approach**: Monotonic Decreasing Deque storing indices: pop out-of-window indices from front, pop smaller elements from back in $O(N)$ time, $O(K)$ space.

---

### Problem MH04: Largest Rectangle in Histogram
* **Statement**: Given an array of integers `heights` representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.
* **Input**: `heights = [2, 1, 5, 6, 2, 3]` $\rightarrow$ **Output**: `10` (Heights 5 and 6 form $5 \times 2 = 10$)
* **Constraints**: $1 \le N \le 10^5$.
* **Optimal Approach**: Monotonic increasing stack calculating width between previous and next smaller bar in $O(N)$ time, $O(N)$ space.

---

### Problem MH05: Median of Two Sorted Arrays
* **Statement**: Given two sorted arrays `nums1` and `nums2` of size $M$ and $N$ respectively, return the median of the two sorted arrays. Must run in $O(\log(M + N))$ time!
* **Input**: `nums1 = [1, 3], nums2 = [2]` $\rightarrow$ **Output**: `2.0`
* **Constraints**: $0 \le M, N \le 1000$.
* **Optimal Approach**: Binary search on the partition index of the smaller array in $O(\log(\min(M, N)))$ time, $O(1)$ space.

---

### Problem MH06: Edit Distance (Levenshtein Distance)
* **Statement**: Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`. Operations: Insert, Delete, Replace.
* **Input**: `word1 = "horse", word2 = "ros"` $\rightarrow$ **Output**: `3`
* **Constraints**: $0 \le |word1|, |word2| \le 500$.
* **Optimal Approach**: 2D DP matrix with 1D row optimization: `dp[i][j] = 1 + min(insert, delete, replace)` in $O(M \times N)$ time, $O(\min(M, N))$ space.

---

### Problem MH07: Maximal Rectangle of 1s in Binary Matrix
* **Statement**: Given a `rows x cols` binary matrix filled with `'0'`s and `'1'`s, find the largest rectangle containing only `'1'`s and return its area.
* **Input**: `matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]` $\rightarrow$ **Output**: `6`
* **Constraints**: $1 \le rows, cols \le 200$.
* **Optimal Approach**: Convert each row into a cumulative histogram height and apply the Largest Rectangle in Histogram algorithm in $O(R \times C)$ time.

---

### Problem MH08: Word Ladder I (Shortest Transformation Sequence)
* **Statement**: Given two words `beginWord` and `endWord`, and a dictionary `wordList`, return the number of words in the shortest transformation sequence from `beginWord` to `endWord` changing only one letter at a time. Return 0 if impossible.
* **Input**: `beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]` $\rightarrow$ **Output**: `5` (`"hit" -> "hot" -> "dot" -> "dog" -> "cog"`)
* **Constraints**: $1 \le |beginWord| \le 10, 1 \le |wordList| \le 5000$.
* **Optimal Approach**: Bidirectional BFS on character substitution states in $O(N \times L \times 26)$ time.

---

### Problem MH09: Alien Dictionary (Topological Character Order)
* **Statement**: There is a new alien language that uses the English alphabet. Given a list of strings `words` sorted lexicographically by alien rules, derive the alien alphabet order. If invalid or cyclic, return `""`.
* **Input**: `words = ["wrt","wrf","er","ett","rftt"]` $\rightarrow$ **Output**: `"wertf"`
* **Constraints**: $1 \le |words| \le 100$.
* **Optimal Approach**: Build directed graph between adjacent words at the first mismatched character + Kahn's algorithm for topological sorting in $O(C)$ time where $C$ is total characters.

---

### Problem MH10: Minimum Cost to Cut a Stick (Matrix Chain DP)
* **Statement**: Given a wooden stick of length $N$ and an array `cuts` where `cuts[i]` represents cut positions. Cost of a cut is the current stick length. Find minimum total cost to make all cuts.
* **Input**: `n = 7, cuts = [1, 3, 4, 5]` $\rightarrow$ **Output**: `16`
* **Constraints**: $2 \le n \le 10^6, 1 \le |cuts| \le 100$.
* **Optimal Approach**: Interval DP (similar to Matrix Chain Multiplication): `dp[i][j] = min over k (cuts[j] - cuts[i] + dp[i][k] + dp[k][j])` in $O(M^3)$ time where $M = |cuts|$.

---

### Problem MH11: N-Queens Problem
* **Statement**: Place $N$ queens on an $N \times N$ chessboard such that no two queens attack each other. Return all distinct board configurations.
* **Input**: `n = 4` $\rightarrow$ **Output**: `2` distinct solutions (`[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]`)
* **Constraints**: $1 \le n \le 9$.
* **Optimal Approach**: Backtracking using bitmasks or hash sets for columns, positive diagonals ($r + c$), and negative diagonals ($r - c$) in $O(N!)$ time.

---

### Problem MH12: Serialize and Deserialize Binary Tree
* **Statement**: Design an algorithm to serialize a binary tree to a single string and deserialize that string back to the original tree structure.
* **Optimal Approach**: Preorder DFS with comma delimiter and `"null"` markers in $O(N)$ time and $O(N)$ space.

---

### Problem MH13: Find Median from Data Stream
* **Statement**: Design a data structure that supports adding integer numbers from a data stream and finding the median of all elements seen so far in $O(1)$ time.
* **Constraints**: Up to $5 \times 10^4$ function calls.
* **Optimal Approach**: Two balanced heaps: Max-Heap for lower half, Min-Heap for upper half. Add num: $O(\log N)$; Find median: $O(1)$.

---

### Problem MH14: Course Schedule II (Output Full Valid Order)
* **Statement**: Given $N$ courses and prerequisite pairs, return a valid topological order of courses to finish all. If impossible, return an empty array.
* **Constraints**: $1 \le numCourses \le 2000$.
* **Optimal Approach**: Kahn's algorithm tracking queue pop order: if popped count equals $N$, return order; else return empty array in $O(V + E)$ time.

---

### Problem MH15: Burst Balloons
* **Statement**: You are given $N$ balloons with numbers. If you burst balloon $i$, you get `nums[i - 1] * nums[i] * nums[i + 1]` coins. Find maximum coins collected by bursting all balloons wisely.
* **Input**: `nums = [3, 1, 5, 8]` $\rightarrow$ **Output**: `167`
* **Constraints**: $1 \le N \le 300$.
* **Optimal Approach**: Interval DP thinking in reverse (which balloon is burst LAST in range `(i, j)`) in $O(N^3)$ time, $O(N^2)$ space.

---

### Problem MH16: Distinct Subsequences
* **Statement**: Given two strings `s` and `t`, return the number of distinct subsequences of `s` which equals `t`.
* **Input**: `s = "rabbbit", t = "rabbit"` $\rightarrow$ **Output**: `3`
* **Constraints**: $1 \le |s|, |t| \le 1000$.
* **Optimal Approach**: 2D DP table with 1D space optimization: if `s[i] == t[j]`, `dp[j] = dp[j] + dp[j - 1]` in $O(|s| \times |t|)$ time, $O(|t|)$ space.

---

### Problem MH17: Regular Expression Matching with '.' and '*'
* **Statement**: Given input string `s` and pattern `p`, implement regular expression matching with support for `'.'` (matches any single character) and `'*'` (matches zero or more of preceding element).
* **Input**: `s = "aab", p = "c*a*b"` $\rightarrow$ **Output**: `true`
* **Constraints**: $1 \le |s|, |p| \le 20$.
* **Optimal Approach**: 2D DP matrix handling zero-match branch `dp[i][j - 2]` and repeat-match branch `dp[i - 1][j]` in $O(|s| \times |p|)$ time.

---

### Problem MH18: Longest Valid Parentheses Substring
* **Statement**: Given a string containing just `'('` and `')'`, find the length of the longest valid (well-formed) parentheses substring.
* **Input**: `s = ")()())"` $\rightarrow$ **Output**: `4` (`"()()"`)
* **Constraints**: $0 \le |s| \le 3 \times 10^4$.
* **Optimal Approach**: Stack initialized with `-1` as base index, or two-pass left-to-right and right-to-left counter in $O(N)$ time, $O(1)$ space.

---

### Problem MH19: Shortest Path in a Grid with Obstacles Elimination
* **Statement**: Given an $M \times N$ grid where `0` is empty and `1` is an obstacle, return the minimum steps to walk from $(0, 0)$ to $(M-1, N-1)$ if you can eliminate at most $K$ obstacles. Return `-1` if impossible.
* **Input**: `grid = [[0,0,0],[1,1,0],[0,0,0]], k = 1` $\rightarrow$ **Output**: `4`
* **Constraints**: $1 \le M, N \le 40, 1 \le k \le M \times N$.
* **Optimal Approach**: 3D BFS tracking state `(row, col, remaining_k)` in $O(M \times N \times K)$ time.

---

### Problem MH20: Maximum XOR of Two Numbers in an Array
* **Statement**: Given an integer array `nums`, return the maximum result of `nums[i] XOR nums[j]`. Must run in $O(N)$ time.
* **Input**: `nums = [3, 10, 5, 25, 2, 8]` $\rightarrow$ **Output**: `28` ($5 \oplus 25 = 28$)
* **Constraints**: $1 \le N \le 2 \times 10^5$.
* **Optimal Approach**: Bitwise Trie of 31 levels (inserting binary numbers bit-by-bit and greedily querying opposite bits at each level) in $O(32N) = O(N)$ time.
