# DeltaX Round 3 — Historical 120-Minute / 5-Question Mocks (Mocks 1 to 10)

> **Context & Historical Reality**:
> - Historically, DeltaX coding rounds consisted of **5 coding questions in 120 minutes** on platforms like HackerEarth/Mettle.
> - **The 55% Hard Threshold Rule**: Slide instructions explicitly state: *"You need to score 55%+ on EACH question to meet the stated criteria for evaluation/shortlisting."*
> - **Failure Trap**: Scoring 100% on 4 questions and 0% on the 5th can lead to immediate disqualification. You must allocate time across all 5 problems to clear test cases on every single one.
> - **Standard 5-Problem Blueprint**:
>   - **Q1 (Easy)**: Array / Math / Bitwise / Simulation
>   - **Q2 (Easy-Medium)**: Two Pointers / Sliding Window / Prefix Sum
>   - **Q3 (Medium)**: Real-World Application / String Parsing / Validation
>   - **Q4 (Medium)**: Recursion / Backtracking / Multi-Source BFS / Tree
>   - **Q5 (Medium-Hard)**: Dynamic Programming / Greedy / Monotonic Stack

---

## Mock Test 1 (120 Minutes)

### Q1.1: Single Non-Duplicate Pair Finder
- **Category**: Bit Manipulation / Math
- **Statement**: An array of size $2N + 1$ contains $N$ pairs of identical integers and exactly one lonely integer. Find the lonely integer in $O(N)$ time and $O(1)$ space using XOR properties.
- **Constraints**: $1 \le N \le 10^5$, $-10^9 \le nums[i] \le 10^9$.
- **Input**: Line 1: $M$ (length); Line 2: $M$ integers.
- **Output**: The lonely integer.

### Q1.2: Minimum Absolute Difference Pair
- **Category**: Sorting / Two Pointers
- **Statement**: Given an array of distinct integers `arr`, find all pairs of elements with the minimal absolute difference between any two elements. Return pairs in ascending order.
- **Constraints**: $2 \le N \le 10^5$, $-10^6 \le arr[i] \le 10^6$.

### Q1.3: Ad Campaign URL Param Extractor
- **Category**: String Parsing / AdTech Tracking
- **Statement**: Parse an HTTP GET request URL string. Extract all query parameters where the key starts with `dx_`. Output pairs as `key:value` sorted alphabetically by key. If none exist, output `NONE`.
- **Constraints**: $1 \le |URL| \le 5000$.

### Q1.4: Combination Sum with Deduplication (Combination Sum II)
- **Category**: Backtracking / Recursion
- **Statement**: Given a collection of candidate numbers `candidates` (which may contain duplicates) and a target number `target`, find all unique combinations where the numbers sum to `target`. Each number in `candidates` may only be used once in the combination.
- **Constraints**: $1 \le N \le 100$, $1 \le target \le 30$.

### Q1.5: 0/1 Knapsack — Ad Budget Optimizer
- **Category**: Dynamic Programming
- **Statement**: An advertiser has a total budget $W$. There are $N$ ad slots available. Each slot $i$ costs $cost[i]$ and yields expected impressions $val[i]$. Each ad slot can either be bought completely or skipped. Determine the maximum impressions achievable within budget $W$.
- **Constraints**: $1 \le N \le 1000$, $1 \le W \le 1000$, $1 \le cost[i], val[i] \le 10^4$.

---

## Mock Test 2 (120 Minutes)

### Q2.1: Array In-Place Right Rotation by K
- **Category**: Array / Two Pointers
- **Statement**: Rotate an array of $N$ elements to the right by $K$ steps in-place with $O(1)$ auxiliary memory using the 3-step reversal algorithm.
- **Constraints**: $1 \le N \le 10^5$, $0 \le K \le 10^9$.

### Q2.2: Longest Substring with At Most Two Distinct Characters
- **Category**: Sliding Window / Hash Map
- **Statement**: Given a string `s`, return the length of the longest contiguous substring that contains at most two distinct characters.
- **Constraints**: $1 \le |s| \le 10^5$.

### Q2.3: Robust Email Domain Validator
- **Category**: String Parsing / Validation
- **Statement**: Validate a list of email strings. A valid email has: `local@domain.tld`. Local part consists of alphanumeric and `.`; domain is alphanumeric; tld is alphabetic with length 2 to 6. Output valid emails sorted lexicographically.
- **Constraints**: $1 \le N \le 1000$, string length $\le 200$.

### Q2.4: Multi-Source Infected Node Spread (Rotten Oranges)
- **Category**: Breadth-First Search (BFS)
- **Statement**: In a grid of size $R \times C$, `0` is empty, `1` is fresh ad node, and `2` is corrupted node. Every minute, any fresh node 4-directionally adjacent to a corrupted node becomes corrupted. Return the minimum minutes until no fresh nodes remain, or `-1` if impossible.
- **Constraints**: $1 \le R, C \le 100$.

### Q2.5: Longest Increasing Subsequence (LIS)
- **Category**: Dynamic Programming / Binary Search
- **Statement**: Given an integer array `nums`, return the length of the longest strictly increasing subsequence in $O(N \log N)$ time.
- **Constraints**: $1 \le N \le 10^5$, $-10^4 \le nums[i] \le 10^4$.

---

## Mock Test 3 (120 Minutes)

### Q3.1: Move Zeroes to End While Maintaining Order
- **Category**: Two Pointers / In-Place
- **Statement**: Move all zeroes in `nums` to the end while maintaining the relative order of the non-zero elements in $O(N)$ time and $O(1)$ extra space.
- **Constraints**: $1 \le N \le 10^5$.

### Q3.2: Contiguous Subarray with Sum Equal to K
- **Category**: Prefix Sum / Hash Map
- **Statement**: Given an integer array `nums` (which may contain negative numbers) and an integer `k`, return the total number of continuous subarrays whose sum equals `k`.
- **Constraints**: $1 \le N \le 5 \times 10^4$, $-1000 \le nums[i] \le 1000$, $-10^7 \le k \le 10^7$.

### Q3.3: Flatten Nested Key-Value Log Entries
- **Category**: String Parsing / Stack
- **Statement**: Given a bracketed log string like `server[cpu=40,mem[used=8,free=2]]`, parse and flatten into dot-notation paths: `server.cpu:40`, `server.mem.used:8`, `server.mem.free:2`.
- **Constraints**: String length $\le 2000$.

### Q3.4: Target Sum with + and - Signs
- **Category**: Recursion / Subset Sum DP
- **Statement**: Given an integer array `nums` and integer `target`, assign either `+` or `-` to each integer such that the total sum equals `target`. Return the number of different ways to assign symbols.
- **Constraints**: $1 \le N \le 20$, $0 \le nums[i] \le 1000$, $\sum nums[i] \le 1000$.

### Q3.5: Minimum Jumps to Reach Last Index
- **Category**: Greedy
- **Statement**: You are given an array of non-negative integers `nums` where each element represents your maximum jump length from that position. Return the minimum number of jumps to reach the last index.
- **Constraints**: $1 \le N \le 10^5$, $0 \le nums[i] \le 10^5$. Guaranteed reachable.

---

## Mock Test 4 (120 Minutes)

### Q4.1: Check if Array is Sorted and Rotated
- **Category**: Array / Simulation
- **Statement**: Given an array `nums`, return `true` if the array was originally sorted in non-decreasing order and then rotated some number of positions (including zero).
- **Constraints**: $1 \le N \le 1000$.

### Q4.2: Maximum Sum of Subarray of Size K
- **Category**: Sliding Window
- **Statement**: Given an array of integers and a number $K$, find the maximum sum of any contiguous subarray of size $K$.
- **Constraints**: $1 \le K \le N \le 10^5$.

### Q4.3: Valid IPv4 and IPv6 Address Validator
- **Category**: Parsing / String Validation
- **Statement**: Given a string `queryIP`, return `"IPv4"` if IP is a valid IPv4 address, `"IPv6"` if it is a valid IPv6 address, or `"Neither"` if it is not valid.
- **Constraints**: String length $\le 100$.

### Q4.4: Generate All Balanced Parentheses
- **Category**: Backtracking
- **Statement**: Given integer $N$, generate all combinations of well-formed parentheses containing $N$ pairs.
- **Constraints**: $1 \le N \le 8$.

### Q4.5: Coin Change — Minimum Coins
- **Category**: Dynamic Programming
- **Statement**: Given integer array `coins` and integer `amount`, return the fewest number of coins that you need to make up that amount. If impossible, return `-1`.
- **Constraints**: $1 \le coins.length \le 12$, $1 \le amount \le 10^4$.

---

## Mock Test 5 (120 Minutes)

### Q5.1: Missing Number in Range [0, N]
- **Category**: Bit Manipulation / Math
- **Statement**: Given an array `nums` containing $N$ distinct numbers in the range $[0, N]$, return the only number in the range that is missing. Solve in $O(N)$ time and $O(1)$ extra space using XOR.
- **Constraints**: $1 \le N \le 10^5$.

### Q5.2: Container With Most Water
- **Category**: Two Pointers
- **Statement**: Given $N$ non-negative integers $a_1, a_2, \dots, a_N$, where each represents a point at coordinate $(i, a_i)$. Find two lines that together with the x-axis form a container, such that the container contains the most water.
- **Constraints**: $2 \le N \le 10^5$.

### Q5.3: JSON Key-Value Tokenizer
- **Category**: Parsing / String
- **Statement**: Parse a simple single-level JSON object string like `{"name": "DeltaX", "status": 200, "active": true}` and print all key-value pairs formatted as `key -> value`, sorted alphabetically by key.
- **Constraints**: String length $\le 1000$.

### Q5.4: Subsets Generation with Duplicates (Subsets II)
- **Category**: Backtracking
- **Statement**: Given an integer array `nums` that may contain duplicates, return all possible subsets (the power set). The solution set must not contain duplicate subsets.
- **Constraints**: $1 \le N \le 10$, $-10 \le nums[i] \le 10$.

### Q5.5: House Robber / Ad Slot Non-Adjacent Maximum
- **Category**: Dynamic Programming
- **Statement**: You cannot display ads on two consecutive web page slots. Given array `nums` representing the revenue of each slot, find the maximum revenue you can rob/earn without choosing adjacent slots.
- **Constraints**: $1 \le N \le 10^5$, $0 \le nums[i] \le 10^4$.

---

## Mock Test 6 (120 Minutes)

### Q6.1: Majority Element (> N/2)
- **Category**: Boyer-Moore Voting Algorithm
- **Statement**: Given an array `nums` of size $N$, return the majority element that appears more than $\lfloor N / 2 \rfloor$ times. Must run in $O(N)$ time and $O(1)$ space.
- **Constraints**: $1 \le N \le 5 \times 10^4$.

### Q6.2: Longest Palindromic Substring
- **Category**: String / Expand Around Center
- **Statement**: Given a string `s`, return the longest palindromic substring in $s$.
- **Constraints**: $1 \le |s| \le 1000$.

### Q6.3: Rate Limiting Event Window Counter
- **Category**: Sliding Window / Queue
- **Statement**: Design a rate limiter that receives timestamped request IDs and returns the count of requests within the last 60 seconds of that request.
- **Constraints**: $1 \le N \le 10^5$, non-decreasing timestamps.

### Q6.4: Word Search in 2D Character Board
- **Category**: Backtracking / DFS
- **Statement**: Given an $M \times N$ grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.
- **Constraints**: $1 \le M, N \le 6$, $1 \le |word| \le 15$.

### Q6.5: Next Greater Element I & II (Circular)
- **Category**: Monotonic Stack
- **Statement**: Given a circular integer array `nums`, return the next greater number for every element. The next greater number of a number $x$ is the first greater number to its traversing-cycle-wise. If none exists, output `-1`.
- **Constraints**: $1 \le N \le 10^4$.

---

## Mock Test 7 (120 Minutes)

### Q7.1: Squares of a Sorted Array
- **Category**: Two Pointers
- **Statement**: Given an integer array `nums` sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order in $O(N)$ time.
- **Constraints**: $1 \le N \le 10^4$, $-10^4 \le nums[i] \le 10^4$.

### Q7.2: Longest Consecutive Sequence
- **Category**: Hash Set
- **Statement**: Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence in $O(N)$ time.
- **Constraints**: $0 \le N \le 10^5$.

### Q7.3: Metric Tag Parser & Counter
- **Category**: String Parsing / Hash Map
- **Statement**: Parse a log string of metrics like `cpu:host1=80;cpu:host2=75;mem:host1=60`. Calculate and output the average value for each metric category (`cpu`, `mem`), sorted alphabetically.
- **Constraints**: String length $\le 5000$.

### Q7.4: Letter Combinations of a Phone Number
- **Category**: Backtracking
- **Statement**: Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent according to classic telephone buttons.
- **Constraints**: $0 \le digits.length \le 4$.

### Q7.5: Edit Distance (Levenshtein Distance)
- **Category**: Dynamic Programming
- **Statement**: Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2` (insert, delete, replace).
- **Constraints**: $0 \le |word1|, |word2| \le 500$.

---

## Mock Test 8 (120 Minutes)

### Q8.1: Find Pivot Index / Equilibrium Index
- **Category**: Prefix Sum / Array
- **Statement**: Given an array of integers `nums`, calculate the pivot index of this array where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index's right.
- **Constraints**: $1 \le N \le 10^4$.

### Q8.2: 3Sum — Unique Triplets Summing to Zero
- **Category**: Two Pointers / Sorting
- **Statement**: Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that $i \ne j, i \ne k, j \ne k$, and $nums[i] + nums[j] + nums[k] == 0$. Solution must not contain duplicate triplets.
- **Constraints**: $3 \le N \le 3000$.

### Q8.3: Sanitized File Path Normalizer
- **Category**: Stack / String Parsing
- **Statement**: Given an absolute path for a Unix-style file system, simplify it by converting `.` and `..` canonical paths. (e.g. `/a/./b/../../c/` -> `/c`).
- **Constraints**: $1 \le path.length \le 3000$.

### Q8.4: Path Sum in Binary Tree
- **Category**: Tree / DFS
- **Statement**: Given the root of a binary tree and an integer `targetSum`, return `true` if the tree has a root-to-leaf path such that adding up all the values along the path equals `targetSum`.
- **Constraints**: Tree nodes $\le 5000$.

### Q8.5: Maximum Subarray Sum with One Deletion
- **Category**: Dynamic Programming
- **Statement**: Given an array of integers, return the maximum sum for a non-empty subarray with at most one element deletion.
- **Constraints**: $1 \le N \le 10^5$, $-10^4 \le nums[i] \le 10^4$.

---

## Mock Test 9 (120 Minutes)

### Q9.1: Two Sum with $O(N)$ Time and $O(N)$ Space
- **Category**: Hash Map
- **Statement**: Return indices of the two numbers in `nums` such that they add up to `target`.
- **Constraints**: $2 \le N \le 10^4$.

### Q9.2: Trapping Rain Water
- **Category**: Two Pointers
- **Statement**: Given $N$ non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.
- **Constraints**: $1 \le N \le 2 \times 10^4$, $0 \le height[i] \le 10^5$.

### Q9.3: Cookie Header String Parser
- **Category**: String Parsing / Hash Map
- **Statement**: Parse an HTTP `Cookie` header string (e.g., `theme=dark; session_token=xyz123; tracking=on; session_token=abc456`). If keys repeat, keep the latest. Output valid cookies as `key:value` sorted alphabetically.
- **Constraints**: String length $\le 2000$.

### Q9.4: Permutations of Unique Integers
- **Category**: Backtracking
- **Statement**: Given an array `nums` of distinct integers, return all the possible permutations.
- **Constraints**: $1 \le N \le 6$.

### Q9.5: Partition Equal Subset Sum
- **Category**: Dynamic Programming
- **Statement**: Given an integer array `nums`, return `true` if you can partition the array into two subsets such that the sum of the elements in both subsets is equal.
- **Constraints**: $1 \le N \le 200$, $1 \le nums[i] \le 100$.

---

## Mock Test 10 (120 Minutes)

### Q10.1: Reverse Words in a String
- **Category**: String / Two Pointers
- **Statement**: Given an input string `s`, reverse the order of the words. Return a string of the words in reverse order concatenated by a single space, removing leading, trailing, and multiple spaces.
- **Constraints**: $1 \le |s| \le 10^4$.

### Q10.2: Find All Anagrams in a String
- **Category**: Sliding Window / Frequency Map
- **Statement**: Given two strings `s` and `p`, return an array of all the start indices of `p`'s anagrams in `s`.
- **Constraints**: $1 \le |s|, |p| \le 3 \times 10^4$.

### Q10.3: CSV Row Parser with Quoted Fields
- **Category**: Parsing / State Machine
- **Statement**: Parse a line of CSV data containing commas inside double-quoted strings (e.g., `101,"DeltaX, Inc.",Active,"Bangalore, KA"`). Output each column on a new line without outer quotes.
- **Constraints**: String length $\le 1000$.

### Q10.4: Number of Islands
- **Category**: BFS / DFS / Matrix
- **Statement**: Given an $M \times N$ 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.
- **Constraints**: $1 \le M, N \le 300$.

### Q10.5: Largest Rectangle in Histogram
- **Category**: Monotonic Stack
- **Statement**: Given an array of integers `heights` representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram in $O(N)$ time.
- **Constraints**: $1 \le N \le 10^5$, $0 \le heights[i] \le 10^4$.
