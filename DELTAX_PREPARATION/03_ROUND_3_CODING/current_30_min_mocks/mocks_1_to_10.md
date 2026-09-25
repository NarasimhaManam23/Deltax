# DeltaX Round 3 — Current Drive 30-Minute Speed Mocks (Mocks 1 to 10)

> **Context & Drive Realities**:
> - **Official Schedule Communication**: Online Coding Test starts at 4:00 PM with an officially stated 30-minute duration.
> - **Platform Strategy**: In a 30-minute coding sprint, you will face either **one focused Medium problem** or **two fast Easy-Medium problems**.
> - **Rules**: Set a timer for strictly 30 minutes. Do NOT look at solutions before completing or timing out. Write clean, compilable code handling all edge cases.

---

## Mock 1 (Format: 2 Problems — 12 mins + 18 mins)

### Problem 1.1: Odd-Even Position Parity Reorder
- **Category**: Array / Two Pointers
- **Time Target**: 10–12 minutes
- **Statement**: Given an integer array `nums`, rearrange the array in-place such that all even integers appear before all odd integers. The relative order among even numbers and odd numbers does not need to be preserved, but the solution must operate in $O(N)$ time and $O(1)$ auxiliary space.
- **Input Format**:
  - Line 1: Integer `N` (length of array)
  - Line 2: `N` space-separated integers
- **Output Format**:
  - Print the rearranged array with space-separated integers.
- **Constraints**:
  - $1 \le N \le 10^5$
  - $-10^9 \le nums[i] \le 10^9$
- **Example 1**:
  - Input: `4` \ `3 1 2 4`
  - Output: `4 2 1 3` (or any valid permutation where evens precede odds)
- **Edge Cases**:
  - All elements are even.
  - All elements are odd.
  - Array contains negative even and negative odd integers (e.g., `-2 % 2 == 0`, `-3 % 2 != 0`).

---

### Problem 1.2: Subarray Sum Divisible by K
- **Category**: Prefix Sum + Hash Map / Modulo Arithmetic
- **Time Target**: 16–18 minutes
- **Statement**: Given an integer array `nums` and an integer `k`, return the number of non-empty continuous subarrays whose sum is divisible by `k`.
- **Input Format**:
  - Line 1: Two integers `N` and `K`
  - Line 2: `N` space-separated integers
- **Output Format**:
  - Single integer representing the count of valid subarrays.
- **Constraints**:
  - $1 \le N \le 5 \times 10^4$
  - $-10^4 \le nums[i] \le 10^4$
  - $2 \le K \le 10^4$
- **Example 1**:
  - Input: `6 5` \ `4 5 0 -2 -3 1`
  - Output: `7`
  - Explanation: Subarrays `[4, 5, 0, -2, -3]`, `[5]`, `[5, 0]`, `[5, 0, -2, -3]`, `[0]`, `[0, -2, -3]`, `[-2, -3]` have sums divisible by 5.
- **Edge Cases**:
  - Negative prefix sums (modulo in C++/Java can yield negative remainders; normalize with `(rem % k + k) % k`).
  - Single element divisible by `k`.

---

## Mock 2 (Format: 1 Focused Application Problem — 30 mins)

### Problem 2.1: AdTech Tracking Query Parameter Sanitizer
- **Category**: String Parsing / AdTech Tracking
- **Time Target**: 30 minutes
- **Statement**: In digital advertising pipelines (like DeltaX), tracking URLs carry campaign parameters. You are given a raw URL query string containing multiple key-value pairs formatted as `key=value` delimited by `&`.
  Write a sanitizer that:
  1. Parses all key-value pairs.
  2. Discards invalid pairs (missing `=` or empty key).
  3. Deduplicates duplicate keys by keeping only the **last** occurrence.
  4. Removes any parameter where key begins with `utm_ignore` or value is empty.
  5. Formats the final valid pairs sorted **lexicographically by key** and joins them with `&`.
- **Input Format**:
  - A single line string `query`.
- **Output Format**:
  - The sanitized query string. If no valid parameters remain, output `EMPTY`.
- **Constraints**:
  - $1 \le |query| \le 10^4$
  - Characters consist of alphanumeric characters, `=`, `&`, `_`, and `-`.
- **Example 1**:
  - Input: `campaign_id=104&utm_source=google&utm_ignore_test=yes&campaign_id=999&empty_val=&ad_id=45`
  - Output: `ad_id=45&campaign_id=999&utm_source=google`
  - Explanation: `campaign_id` takes latest value `999`; `utm_ignore_test` removed; `empty_val` has empty value and is removed. Keys are sorted: `ad_id`, `campaign_id`, `utm_source`.
- **Edge Cases**:
  - Multiple consecutive delimiters `&&&`.
  - Malformed tokens like `key_only` or `=val`.
  - Trailing or leading `&`.

---

## Mock 3 (Format: 2 Problems — 12 mins + 18 mins)

### Problem 3.1: Valid Palindrome with At Most One Removal
- **Category**: Two Pointers / String
- **Time Target**: 12 minutes
- **Statement**: Given a string `s`, return `true` if `s` can be a palindrome after deleting at most one character from it, otherwise return `false`.
- **Input Format**:
  - Line 1: String `s`
- **Output Format**:
  - `true` or `false`
- **Constraints**:
  - $1 \le |s| \le 10^5$
  - `s` consists of lowercase English letters.
- **Example 1**:
  - Input: `abca` -> Output: `true` (delete `'c'` -> `aba` or delete `'b'` -> `aca`)
- **Example 2**:
  - Input: `abc` -> Output: `false`
- **Edge Cases**:
  - Already a palindrome (`aba` -> `true`, 0 deletions).
  - Deletion needed at very beginning or very end.

---

### Problem 3.2: Contiguous Subarray with Equal 0s and 1s
- **Category**: Prefix Sum / Hash Map
- **Time Target**: 18 minutes
- **Statement**: Given a binary array `nums`, find the maximum length of a contiguous subarray with an equal number of `0` and `1`.
- **Input Format**:
  - Line 1: Integer `N`
  - Line 2: `N` space-separated binary digits (`0` or `1`)
- **Output Format**:
  - Integer representing max length.
- **Constraints**:
  - $1 \le N \le 10^5$
  - $nums[i] \in \{0, 1\}$
- **Example 1**:
  - Input: `4` \ `0 1 1 0` -> Output: `4`
- **Example 2**:
  - Input: `2` \ `0 1` -> Output: `2`
- **Edge Cases**:
  - No valid subarray (all 0s or all 1s -> output `0`).
  - Odd total length array where whole array cannot be balanced.

---

## Mock 4 (Format: 1 Focused Medium Problem — 30 mins)

### Problem 4.1: Campaign Impression Overlap Resolver
- **Category**: Intervals / Sorting / Simulation
- **Time Target**: 30 minutes
- **Statement**: An ad server receives scheduled display time windows for various client campaigns on a digital billboard. Each campaign has an interval `[start, end]` (inclusive). When intervals overlap, the display multiplexer needs to merge all overlapping or touching intervals into continuous active display blocks and return the total time the billboard is actively displaying ads.
- **Input Format**:
  - Line 1: Integer `N` (number of campaign intervals)
  - Next `N` lines: Two space-separated integers `start` and `end`
- **Output Format**:
  - Line 1: Integer `M` (number of merged intervals)
  - Next `M` lines: Merged intervals sorted by start time
  - Line $M+2$: Total active display duration (sum of lengths: `end - start + 1` for each merged interval)
- **Constraints**:
  - $1 \le N \le 10^5$
  - $0 \le start \le end \le 10^9$
- **Example 1**:
  - Input:
    ```
    4
    1 3
    2 6
    8 10
    15 18
    ```
  - Output:
    ```
    3
    1 6
    8 10
    15 18
    13
    ```
    (Merged durations: `(6-1+1) + (10-8+1) + (18-15+1) = 6 + 3 + 4 = 13`)
- **Edge Cases**:
  - Touching intervals: `[1, 4]` and `[4, 7]` merge into `[1, 7]`.
  - Nested intervals: `[1, 10]` and `[2, 5]` merge into `[1, 10]`.
  - Disordered inputs.

---

## Mock 5 (Format: 2 Problems — 12 mins + 18 mins)

### Problem 5.1: Single Non-Duplicate in Sorted Array
- **Category**: Binary Search
- **Time Target**: 12 minutes
- **Statement**: You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once. Find and return this single element in $O(\log N)$ time and $O(1)$ space.
- **Input Format**:
  - Line 1: Integer `N` (guaranteed odd)
  - Line 2: `N` space-separated integers
- **Output Format**:
  - The single non-duplicate integer.
- **Constraints**:
  - $1 \le N \le 10^5$
  - $0 \le nums[i] \le 10^9$
- **Example 1**:
  - Input: `7` \ `1 1 2 3 3 4 4` -> Output: `2`
- **Edge Cases**:
  - Unique element is at index `0`.
  - Unique element is at index `N-1`.
  - $N=1$.

---

### Problem 5.2: Maximum Product of Contiguous Subarray
- **Category**: Dynamic Programming / Kadane's Variant
- **Time Target**: 18 minutes
- **Statement**: Given an integer array `nums`, find a contiguous non-empty subarray that has the largest product, and return the product.
- **Input Format**:
  - Line 1: Integer `N`
  - Line 2: `N` space-separated integers
- **Output Format**:
  - Single integer representing max product.
- **Constraints**:
  - $1 \le N \le 2 \times 10^4$
  - $-10 \le nums[i] \le 10$
  - The product of any prefix or suffix of `nums` is guaranteed to fit in a 64-bit integer.
- **Example 1**:
  - Input: `4` \ `2 3 -2 4` -> Output: `6` (subarray `[2, 3]`)
- **Example 2**:
  - Input: `3` \ `-2 0 -1` -> Output: `0`
- **Edge Cases**:
  - Array with odd number of negative elements.
  - Array containing zeroes (resets the running product).
  - All negative numbers.

---

## Mock 6 (Format: 1 Focused Application Problem — 30 mins)

### Problem 6.1: Config Key-Path Extractor & Type Validator
- **Category**: String Parsing / State Machine
- **Time Target**: 30 minutes
- **Statement**: In product engineering, flat configuration strings must be validated before ingestion. You are given a single line configuration string in format `section.key=value;section.key=value;...`.
  Rules:
  1. Each token ends with `;`.
  2. Each token must contain exactly one `=`.
  3. `section` and `key` must consist only of lowercase alphabetic characters and not be empty.
  4. `value` can be:
     - `INTEGER`: non-empty sequence of digits, optional leading `-`.
     - `BOOLEAN`: strictly `true` or `false`.
     - `STRING`: alphanumeric characters and underscores.
  Output all valid keys formatted as `section/key:TYPE` sorted lexicographically by `section/key`. Discard any malformed token.
- **Input Format**:
  - A single string `config`.
- **Output Format**:
  - Sorted valid entries, one per line. If none valid, output `INVALID`.
- **Constraints**:
  - $1 \le |config| \le 5000$
- **Example 1**:
  - Input: `db.port=5432;app.debug=true;app.name=Simha_AI;badtoken;invalid.=123;`
  - Output:
    ```
    app/debug:BOOLEAN
    app/name:STRING
    db/port:INTEGER
    ```
- **Edge Cases**:
  - Trailing tokens without `;`.
  - Negative integers like `-42` (classified as `INTEGER`).

---

## Mock 7 (Format: 2 Problems — 12 mins + 18 mins)

### Problem 7.1: In-Place String Compression
- **Category**: Two Pointers / String Mutation
- **Time Target**: 12 minutes
- **Statement**: Given an array of characters `chars`, compress it using the following algorithm: For each group of consecutive repeating characters, if group length is 1, append the character. If group length $> 1$, append the character followed by the group's length. Modify the input array in-place and return the new length.
- **Input Format**:
  - Line 1: Integer `N`
  - Line 2: String containing `N` characters without spaces
- **Output Format**:
  - Line 1: New length `L`
  - Line 2: Compressed string prefix of length `L`
- **Constraints**:
  - $1 \le N \le 2000$
- **Example 1**:
  - Input: `7` \ `aabbccc` -> Output: `6` \ `a2b2c3`
- **Example 2**:
  - Input: `4` \ `abbb` -> Output: `3` \ `ab3`
- **Edge Cases**:
  - Group length $\ge 10$ (requires multiple digits, e.g. `12` -> `'1'`, `'2'`).
  - All single characters `abcd` -> length 4, `abcd`.

---

### Problem 7.2: Longest Substring Without Repeating Characters
- **Category**: Sliding Window / Hash Map
- **Time Target**: 18 minutes
- **Statement**: Given a string `s`, find the length of the longest substring without repeating characters.
- **Input Format**:
  - A single line containing string `s`.
- **Output Format**:
  - Integer representing length.
- **Constraints**:
  - $0 \le |s| \le 5 \times 10^4$
  - `s` consists of English letters, digits, symbols, and spaces.
- **Example 1**:
  - Input: `abcabcbb` -> Output: `3` (`abc`)
- **Example 2**:
  - Input: `bbbbb` -> Output: `1` (`b`)
- **Edge Cases**:
  - Empty string (length 0).
  - String with spaces and symbols.

---

## Mock 8 (Format: 2 Problems — 12 mins + 18 mins)

### Problem 8.1: Group Anagrams Signature
- **Category**: Hash Map / Sorting
- **Time Target**: 14 minutes
- **Statement**: Given an array of strings `strs`, group the anagrams together. Return the groups sorted in ascending order by group size. Ties in group size can be broken by lexicographical order of the first element in the group.
- **Input Format**:
  - Line 1: Integer `N`
  - Next `N` lines: One string per line
- **Output Format**:
  - Each group on a new line with space-separated strings (each group sorted internally).
- **Constraints**:
  - $1 \le N \le 10^4$
  - $0 \le |strs[i]| \le 100$
- **Example 1**:
  - Input:
    ```
    6
    eat
    tea
    tan
    ate
    nat
    bat
    ```
  - Output:
    ```
    bat
    nat tan
    ate eat tea
    ```

---

### Problem 8.2: Minimum Size Subarray Sum
- **Category**: Sliding Window / Two Pointers
- **Time Target**: 16 minutes
- **Statement**: Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a contiguous subarray whose sum is greater than or equal to `target`. If there is no such subarray, return `0`.
- **Input Format**:
  - Line 1: Two integers `target` and `N`
  - Line 2: `N` space-separated positive integers
- **Output Format**:
  - Single integer representing minimal length.
- **Constraints**:
  - $1 \le target \le 10^9$
  - $1 \le N \le 10^5$
  - $1 \le nums[i] \le 10^4$
- **Example 1**:
  - Input: `7 6` \ `2 3 1 2 4 3` -> Output: `2` (subarray `[4, 3]`)

---

## Mock 9 (Format: 1 Focused Medium Problem — 30 mins)

### Problem 9.1: Ad Click Fraud Detector (Sliding Time Window)
- **Category**: Queue / Hash Map / Sliding Window
- **Time Target**: 30 minutes
- **Statement**: DeltaX monitors digital ad click streams to flag suspicious click bursts from botnets. Each click log is represented by a pair `(user_id, timestamp_seconds)`.
  A user is flagged for **Fraud Review** if they register $\ge K$ clicks within any sliding window of $W$ seconds (i.e. `timestamp_latest - timestamp_earliest <= W` for $K$ clicks).
  Given a sequence of chronological click logs, output all distinct `user_id`s that violated the rule, sorted lexicographically.
- **Input Format**:
  - Line 1: Three integers `N` (number of logs), `K` (click threshold), `W` (window seconds)
  - Next `N` lines: `user_id timestamp` (logs are given in non-decreasing order of timestamp)
- **Output Format**:
  - Space-separated flagged `user_id`s. If none, output `NONE`.
- **Constraints**:
  - $1 \le N \le 10^5$
  - $2 \le K \le 100$
  - $1 \le W \le 3600$
  - `user_id` is an alphanumeric string of length 1 to 20.
  - $0 \le timestamp \le 10^9$
- **Example 1**:
  - Input:
    ```
    7 3 10
    user_A 100
    user_B 102
    user_A 105
    user_B 108
    user_A 109
    user_B 115
    user_A 120
    ```
  - Output: `user_A`
  - Explanation: `user_A` clicks at 100, 105, 109 (3 clicks within $109 - 100 = 9 \le 10$ seconds). `user_B` clicks at 102, 108, 115 ($115 - 102 = 13 > 10$, never 3 clicks within 10s).

---

## Mock 10 (Format: 1 Intense String Problem — 30 mins)

### Problem 10.1: Minimum Window Substring Match
- **Category**: Sliding Window / Frequency Map
- **Time Target**: 30 minutes
- **Statement**: Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return an empty string `""`. If there are multiple, return the one that appears earliest.
- **Input Format**:
  - Line 1: String `s`
  - Line 2: String `t`
- **Output Format**:
  - The minimum window substring.
- **Constraints**:
  - $1 \le |s|, |t| \le 10^5$
  - `s` and `t` consist of uppercase and lowercase English letters.
- **Example 1**:
  - Input:
    ```
    ADOBECODEBANC
    ABC
    ```
  - Output: `BANC`
- **Edge Cases**:
  - $|t| > |s|$ -> immediate `""`.
  - Exact match of length 1.
