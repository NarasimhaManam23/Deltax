# DeltaX Coding Question Bank: Easy & Easy-Medium (40 Original Problems)

Every problem in this bank is formulated based on reported DeltaX technical interview and online assessment problem types.

---

# SECTION 1: 20 EASY CODING PROBLEMS

---

### Problem E01: Target Difference Pair
* **Statement**: Given an integer array `nums` and an integer `k`, return `true` if there exist two distinct indices `i` and `j` such that `nums[i] - nums[j] == k`.
* **Input**: `nums = [1, 5, 3, 4, 2], k = 3`
* **Output**: `true` (Pairs: (5, 2) or (4, 1))
* **Constraints**: $2 \le N \le 10^5$, $-10^9 \le nums[i] \le 10^9$, $k \ge 0$.
* **Edge Cases**: $k = 0$ (requires duplicate elements), negative numbers.
* **Optimal Approach**: Hash Set for $O(N)$ time and $O(N)$ space, or Two Pointers after sorting in $O(N \log N)$ time and $O(1)$ space.

---

### Problem E02: Monotonic Array Verification
* **Statement**: An array is monotonic if it is either entirely non-increasing or entirely non-decreasing. Given array `nums`, return `true` if monotonic, `false` otherwise.
* **Input**: `nums = [1, 2, 2, 3]` $\rightarrow$ **Output**: `true`
* **Constraints**: $1 \le N \le 10^5$.
* **Edge Cases**: Array of length 1 or 2, all identical elements.
* **Optimal Approach**: Single pass tracking `isIncreasing` and `isDecreasing` booleans in $O(N)$ time, $O(1)$ space.

---

### Problem E03: Single Pass Zero Shifter
* **Statement**: Given array `nums`, move all `0`s to the end while maintaining the relative order of non-zero elements. Must be done in-place with minimal writes.
* **Input**: `nums = [0, 1, 0, 3, 12]` $\rightarrow$ **Output**: `[1, 3, 12, 0, 0]`
* **Constraints**: $1 \le N \le 10^5$.
* **Optimal Approach**: Two pointers (read and write pointer) in $O(N)$ time, $O(1)$ space.

---

### Problem E04: First Non-Repeating Character
* **Statement**: Given a string `s` consisting of lowercase English letters, find the index of the first character that does not repeat. If none exists, return `-1`.
* **Input**: `s = "deltaxdelta"` $\rightarrow$ **Output**: `5` (character `'x'`)
* **Constraints**: $1 \le |s| \le 10^5$.
* **Optimal Approach**: Frequency array `int[26]` in two passes: $O(N)$ time, $O(1)$ auxiliary space.

---

### Problem E05: Valid Anagram Check
* **Statement**: Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.
* **Input**: `s = "anagram", t = "nagaram"` $\rightarrow$ **Output**: `true`
* **Constraints**: $1 \le |s|, |t| \le 5 \times 10^4$.
* **Optimal Approach**: Frequency array of size 26 in $O(N)$ time, $O(1)$ space.

---

### Problem E06: Roman to Integer
* **Statement**: Given a Roman numeral string `s`, convert it to an integer. Symbols: `I=1, V=5, X=10, L=50, C=100, D=500, M=1000`.
* **Input**: `s = "MCMXCIV"` $\rightarrow$ **Output**: `1994`
* **Constraints**: $1 \le |s| \le 15$.
* **Optimal Approach**: Right-to-left or left-to-right pass comparing current value with next value in $O(N)$ time, $O(1)$ space.

---

### Problem E07: Array Partition by Parity
* **Statement**: Given an integer array `nums`, move all even integers to the beginning of the array followed by all odd integers. Any valid ordering is acceptable.
* **Input**: `nums = [3, 1, 2, 4]` $\rightarrow$ **Output**: `[4, 2, 3, 1]` or `[2, 4, 3, 1]`
* **Constraints**: $1 \le N \le 10^4$.
* **Optimal Approach**: Two-pointer swap (left and right) in $O(N)$ time, $O(1)$ space.

---

### Problem E08: In-Place String Reversal
* **Statement**: Write a function that reverses a character array `s` in-place using $O(1)$ extra memory.
* **Input**: `s = ['h', 'e', 'l', 'l', 'o']` $\rightarrow$ **Output**: `['o', 'l', 'l', 'e', 'h']`
* **Constraints**: $1 \le |s| \le 10^5$.
* **Optimal Approach**: Two pointers swapping `left` and `right` inward in $O(N)$ time, $O(1)$ space.

---

### Problem E09: Missing Number in Progression
* **Statement**: An array of size $N$ contains distinct numbers in the range $[0, N]$. Find the one number missing from the range.
* **Input**: `nums = [3, 0, 1]` $\rightarrow$ **Output**: `2`
* **Constraints**: $1 \le N \le 10^5$.
* **Optimal Approach**: Bitwise XOR: `res = N ^ (nums[0] ^ 0) ^ (nums[1] ^ 1)...` in $O(N)$ time, $O(1)$ space.

---

### Problem E10: Palindrome Number
* **Statement**: Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise. Do not convert the integer to a string.
* **Input**: `x = 121` $\rightarrow$ **Output**: `true`; `x = -121` $\rightarrow$ **Output**: `false`
* **Constraints**: $-2^{31} \le x \le 2^{31} - 1$.
* **Optimal Approach**: Reverse half the integer mathematically using modulo 10 and division in $O(\log_{10} x)$ time, $O(1)$ space.

---

### Problem E11: Majority Element (More than N/2)
* **Statement**: Given an array `nums` of size $N$, find the element that appears more than $\lfloor N/2 \rfloor$ times. Assume the majority element always exists.
* **Input**: `nums = [2, 2, 1, 1, 1, 2, 2]` $\rightarrow$ **Output**: `2`
* **Constraints**: $1 \le N \le 10^5$.
* **Optimal Approach**: Boyer-Moore Voting Algorithm in $O(N)$ time and $O(1)$ space.

---

### Problem E12: Intersection of Two Arrays
* **Statement**: Given two integer arrays `nums1` and `nums2`, return an array of their intersection. Each element in the result must be unique.
* **Input**: `nums1 = [1, 2, 2, 1], nums2 = [2, 2]` $\rightarrow$ **Output**: `[2]`
* **Constraints**: $1 \le N, M \le 1000$.
* **Optimal Approach**: Hash Set insertion and membership check in $O(N + M)$ time.

---

### Problem E13: Power of Two Check
* **Statement**: Given an integer `n`, return `true` if it is a power of two, `false` otherwise.
* **Input**: `n = 16` $\rightarrow$ **Output**: `true`; `n = 0` $\rightarrow$ **Output**: `false`
* **Constraints**: $-2^{31} \le n \le 2^{31} - 1$.
* **Optimal Approach**: `n > 0 && (n & (n - 1)) == 0` in $O(1)$ time, $O(1)$ space.

---

### Problem E14: Merge Sorted Arrays
* **Statement**: Given two sorted integer arrays `nums1` and `nums2`, merge `nums2` into `nums1` as one sorted array in-place. `nums1` has size $M + N$ with trailing zeroes.
* **Input**: `nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3` $\rightarrow$ **Output**: `[1,2,2,3,5,6]`
* **Constraints**: $0 \le m, n \le 1000$.
* **Optimal Approach**: Three pointers moving backwards from the end ($m + n - 1$) in $O(M + N)$ time, $O(1)$ space.

---

### Problem E15: Valid Parentheses String
* **Statement**: Given a string `s` containing only characters `'('`, `')'`, `'{'`, `'}'`, `'['`, `']'`, determine if the input string is valid.
* **Input**: `s = "()[]{}"` $\rightarrow$ **Output**: `true`
* **Constraints**: $1 \le |s| \le 10^4$.
* **Optimal Approach**: Stack with hash map of matching bracket pairs in $O(N)$ time, $O(N)$ space.

---

### Problem E16: Find Pivot Index
* **Statement**: Given an array `nums`, calculate the pivot index where the sum of numbers strictly to the left equals the sum of numbers strictly to the right. Return leftmost index, or `-1`.
* **Input**: `nums = [1, 7, 3, 6, 5, 6]` $\rightarrow$ **Output**: `3` ($1+7+3 = 11$ and $5+6 = 11$)
* **Constraints**: $1 \le N \le 10^5$.
* **Optimal Approach**: Total sum minus left sum prefix check in $O(N)$ time, $O(1)$ space.

---

### Problem E17: Maximum 69 Number
* **Statement**: You are given a positive integer `num` consisting only of digits 6 and 9. Return the maximum number you can get by changing at most one digit (6 to 9 or 9 to 6).
* **Input**: `num = 9669` $\rightarrow$ **Output**: `9969`
* **Constraints**: $1 \le num \le 10^4$.
* **Optimal Approach**: Convert to character array and replace the FIRST occurrence of `'6'` with `'9'`, in $O(\log_{10} num)$ time.

---

### Problem E18: Counting Bits
* **Statement**: Given an integer `n`, return an array `ans` of length $n + 1$ such that `ans[i]` is the number of 1's in the binary representation of `i`.
* **Input**: `n = 5` $\rightarrow$ **Output**: `[0, 1, 1, 2, 1, 2]`
* **Constraints**: $0 \le n \le 10^5$.
* **Optimal Approach**: Dynamic programming with bit shift: `ans[i] = ans[i >> 1] + (i & 1)` in $O(N)$ time, $O(1)$ extra space.

---

### Problem E19: Longest Common Prefix
* **Statement**: Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return `""`.
* **Input**: `strs = ["flower", "flow", "flight"]` $\rightarrow$ **Output**: `"fl"`
* **Constraints**: $1 \le N \le 200$.
* **Optimal Approach**: Horizontal scanning or vertical character comparison in $O(S)$ where $S$ is sum of all characters.

---

### Problem E20: Climbing Stairs (Fibonacci DP)
* **Statement**: You are climbing a staircase with $N$ steps. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?
* **Input**: `n = 3` $\rightarrow$ **Output**: `3` (Ways: `1+1+1`, `1+2`, `2+1`)
* **Constraints**: $1 \le n \le 45$.
* **Optimal Approach**: Iterative Fibonacci with two variables in $O(N)$ time, $O(1)$ space.

---

# SECTION 2: 20 EASY-MEDIUM CODING PROBLEMS

---

### Problem EM01: Contiguous Maximum Subarray (Kadane)
* **Statement**: Given an integer array `nums`, find the subarray with the largest sum, and return its sum. Must handle negative numbers.
* **Input**: `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]` $\rightarrow$ **Output**: `6` (`[4, -1, 2, 1]`)
* **Constraints**: $1 \le N \le 10^5$, $-10^4 \le nums[i] \le 10^4$.
* **Optimal Approach**: Kadane's algorithm: `curr = max(num, curr + num); max_so_far = max(max_so_far, curr)` in $O(N)$ time, $O(1)$ space.

---

### Problem EM02: Subarray Sum Equals Target K
* **Statement**: Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals `k`. Array can contain negative numbers!
* **Input**: `nums = [1, 1, 1], k = 2` $\rightarrow$ **Output**: `2`
* **Constraints**: $1 \le N \le 10^5$, $-1000 \le nums[i] \le 1000$.
* **Optimal Approach**: Prefix sum with Hash Map tracking frequencies in $O(N)$ time, $O(N)$ space.

---

### Problem EM03: Longest Substring Without Repeating Characters
* **Statement**: Given a string `s`, find the length of the longest substring without repeating characters.
* **Input**: `s = "abcabcbb"` $\rightarrow$ **Output**: `3` (`"abc"`)
* **Constraints**: $0 \le |s| \le 5 \times 10^4$.
* **Optimal Approach**: Sliding window with hash map tracking last seen character index in $O(N)$ time, $O(\min(N, \Sigma))$ space.

---

### Problem EM04: Container With Most Water
* **Statement**: Given an integer array `height` of length $N$, find two lines that together with the x-axis form a container that stores the most water. Return maximum water volume.
* **Input**: `height = [1, 8, 6, 2, 5, 4, 8, 3, 7]` $\rightarrow$ **Output**: `49`
* **Constraints**: $2 \le N \le 10^5$.
* **Optimal Approach**: Two pointers from ends inward, moving the pointer with the smaller height in $O(N)$ time, $O(1)$ space.

---

### Problem EM05: 3-Sum (Unique Zero Triplets)
* **Statement**: Given an integer array `nums`, return all unique triplets `[nums[i], nums[j], nums[k]]` such that `i != j != k` and `nums[i] + nums[j] + nums[k] == 0`. No duplicate triplets in output!
* **Input**: `nums = [-1, 0, 1, 2, -1, -4]` $\rightarrow$ **Output**: `[[-1, -1, 2], [-1, 0, 1]]`
* **Constraints**: $3 \le N \le 3000$.
* **Optimal Approach**: Sort array + fixed outer element + two pointers with duplicate skipping in $O(N^2)$ time, $O(1)$ extra space.

---

### Problem EM06: Single Number II (Elements Appear Thrice)
* **Statement**: Given an integer array `nums` where every element appears three times except for one which appears exactly once. Find that single element in $O(N)$ time and $O(1)$ space.
* **Input**: `nums = [2, 2, 3, 2]` $\rightarrow$ **Output**: `3`
* **Constraints**: $1 \le N \le 3 \times 10^4$.
* **Optimal Approach**: Bit manipulation counting set bits at each of 32 bit positions modulo 3 in $O(32N) = O(N)$ time, $O(1)$ space.

---

### Problem EM07: String Compression (Run-Length Encoding In-Place)
* **Statement**: Given an array of characters `chars`, compress it in-place using the following rule: for each group of consecutive repeating characters, write character followed by count if $> 1$. Return new length.
* **Input**: `chars = ["a","a","b","b","c","c","c"]` $\rightarrow$ **Output**: Length `6` (`["a","2","b","2","c","3"]`)
* **Constraints**: $1 \le |chars| \le 2000$.
* **Optimal Approach**: Read pointer and write pointer in a single pass of $O(N)$ time, $O(1)$ auxiliary space.

---

### Problem EM08: Find Minimum in Rotated Sorted Array
* **Statement**: Suppose an array of length $N$ sorted in ascending order is rotated between 1 and $N$ times. Find the minimum element in $O(\log N)$ time.
* **Input**: `nums = [3, 4, 5, 1, 2]` $\rightarrow$ **Output**: `1`
* **Constraints**: $1 \le N \le 5000$, all elements unique.
* **Optimal Approach**: Modified binary search comparing `nums[mid]` with `nums[high]` in $O(\log N)$ time, $O(1)$ space.

---

### Problem EM09: Search in Rotated Sorted Array
* **Statement**: Given a rotated sorted array `nums` of unique elements and a target, return index of target, or `-1` if absent. Must run in $O(\log N)$ time.
* **Input**: `nums = [4, 5, 6, 7, 0, 1, 2], target = 0` $\rightarrow$ **Output**: `4`
* **Constraints**: $1 \le N \le 5000$.
* **Optimal Approach**: Binary search identifying which half is normally sorted in $O(\log N)$ time, $O(1)$ space.

---

### Problem EM10: Product of Array Except Self
* **Statement**: Given array `nums`, return an array `res` where `res[i]` is the product of all elements of `nums` except `nums[i]`. Must run in $O(N)$ time WITHOUT using the division operator!
* **Input**: `nums = [1, 2, 3, 4]` $\rightarrow$ **Output**: `[24, 12, 8, 6]`
* **Constraints**: $2 \le N \le 10^5$.
* **Optimal Approach**: Two passes: prefix products pass left-to-right, then running suffix product pass right-to-left in $O(N)$ time, $O(1)$ extra space.

---

### Problem EM11: Maximum Product Subarray
* **Statement**: Given an integer array `nums`, find a contiguous non-empty subarray that has the largest product, and return that product.
* **Input**: `nums = [2, 3, -2, 4]` $\rightarrow$ **Output**: `6`
* **Constraints**: $1 \le N \le 2 \times 10^4$.
* **Optimal Approach**: Track both `max_so_far` and `min_so_far` (swapping them when encountering negative numbers) in $O(N)$ time, $O(1)$ space.

---

### Problem EM12: Longest Palindromic Substring
* **Statement**: Given a string `s`, return the longest palindromic substring in `s`.
* **Input**: `s = "babad"` $\rightarrow$ **Output**: `"bab"` or `"aba"`
* **Constraints**: $1 \le |s| \le 1000$.
* **Optimal Approach**: Expand around center for each of the $2N - 1$ centers in $O(N^2)$ time, $O(1)$ space.

---

### Problem EM13: Merge Overlapping Intervals
* **Statement**: Given an array of `intervals` where `intervals[i] = [start, end]`, merge all overlapping intervals and return an array of the non-overlapping intervals.
* **Input**: `intervals = [[1,3],[2,6],[8,10],[15,18]]` $\rightarrow$ **Output**: `[[1,6],[8,10],[15,18]]`
* **Constraints**: $1 \le N \le 10^4$.
* **Optimal Approach**: Sort by start time, then merge in single pass in $O(N \log N)$ time, $O(N)$ output space.

---

### Problem EM14: Group Anagrams
* **Statement**: Given an array of strings `strs`, group the anagrams together in any order.
* **Input**: `strs = ["eat","tea","tan","ate","nat","bat"]` $\rightarrow$ **Output**: `[["bat"],["nat","tan"],["ate","eat","tea"]]`
* **Constraints**: $1 \le N \le 10^4$, $0 \le |strs[i]| \le 100$.
* **Optimal Approach**: Hash Map keyed by character frequency counts `char[26]` in $O(N \times L)$ time.

---

### Problem EM15: K-th Largest Element in an Array
* **Statement**: Given an integer array `nums` and an integer `k`, return the $k^{\text{th}}$ largest element in the array. Must solve without sorting the full array in $O(N \log N)$.
* **Input**: `nums = [3, 2, 1, 5, 6, 4], k = 2` $\rightarrow$ **Output**: `5`
* **Constraints**: $1 \le k \le N \le 10^5$.
* **Optimal Approach**: Min-Heap of size $K$ in $O(N \log K)$ time, or QuickSelect in $O(N)$ average time.

---

### Problem EM16: Reverse Linked List in Sub-Groups of K
* **Statement**: Given the head of a linked list, reverse the nodes of the list $k$ at a time, and return the modified list. If number of nodes is not a multiple of $k$, leave trailing nodes unchanged.
* **Input**: `head = [1,2,3,4,5], k = 2` $\rightarrow$ **Output**: `[2,1,4,3,5]`
* **Constraints**: $1 \le k \le N \le 5000$.
* **Optimal Approach**: Iterative three-pointer reversal of groups of size $K$ using dummy head in $O(N)$ time, $O(1)$ space.

---

### Problem EM17: Next Greater Element I
* **Statement**: Find the next greater element for each item in array `nums`. If no greater element exists to the right, output `-1`.
* **Input**: `nums = [4, 5, 2, 25]` $\rightarrow$ **Output**: `[5, 25, 25, -1]`
* **Constraints**: $1 \le N \le 10^5$.
* **Optimal Approach**: Monotonic decreasing stack in $O(N)$ time, $O(N)$ space.

---

### Problem EM18: Daily Temperatures
* **Statement**: Given an array of integers `temperatures` representing daily temperatures, return an array `ans` where `ans[i]` is the number of days you have to wait after day $i$ to get a warmer temperature. If no warmer day exists, `ans[i] = 0`.
* **Input**: `temperatures = [73, 74, 75, 71, 69, 72, 76, 73]` $\rightarrow$ **Output**: `[1, 1, 4, 2, 1, 1, 0, 0]`
* **Constraints**: $1 \le N \le 10^5$.
* **Optimal Approach**: Monotonic stack of indices in $O(N)$ time, $O(N)$ space.

---

### Problem EM19: Combination Sum I (Unbounded Element Reuse)
* **Statement**: Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of candidates where the chosen numbers sum to `target`. Same candidate may be chosen unlimited times.
* **Input**: `candidates = [2, 3, 6, 7], target = 7` $\rightarrow$ **Output**: `[[2, 2, 3], [7]]`
* **Constraints**: $1 \le |candidates| \le 30, 2 \le target \le 40$.
* **Optimal Approach**: Backtracking without incrementing start index upon branch recursion in $O(2^T)$.

---

### Problem EM20: Unique Paths in a Grid
* **Statement**: A robot is located at the top-left corner of an $M \times N$ grid. It can only move down or right at any point. How many possible unique paths can it take to reach the bottom-right corner?
* **Input**: `m = 3, n = 7` $\rightarrow$ **Output**: `28`
* **Constraints**: $1 \le m, n \le 100$.
* **Optimal Approach**: Dynamic programming with 1D array space optimization: `dp[j] = dp[j] + dp[j - 1]` in $O(M \times N)$ time, $O(N)$ space.
