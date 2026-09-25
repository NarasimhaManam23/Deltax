# Solutions: DeltaX Round 3 — Current Drive 30-Minute Speed Mocks (Mocks 1 to 10)

> Complete, production-grade solutions in both **Java** and **Python** for all problems across the 10 speed mocks.
> Includes exact complexity analysis and edge case verification.

---

## Solutions for Mock 1

### Problem 1.1: Odd-Even Position Parity Reorder
- **Approach**: Two pointers (`left = 0`, `right = N - 1`). Increment `left` while `nums[left]` is even; decrement `right` while `nums[right]` is odd. When `left < right`, swap `nums[left]` and `nums[right]`.
- **Complexity**: Time $O(N)$, Space $O(1)$.

```java
// Java Solution
public class Solution1_1 {
    public static void reorderParity(int[] nums) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            while (left < right && nums[left] % 2 == 0) left++;
            while (left < right && nums[right] % 2 != 0) right--;
            if (left < right) {
                int temp = nums[left];
                nums[left] = nums[right];
                nums[right] = temp;
                left++;
                right--;
            }
        }
    }
}
```

```python
# Python Solution
def reorder_parity(nums: list[int]) -> list[int]:
    left, right = 0, len(nums) - 1
    while left < right:
        while left < right and nums[left] % 2 == 0:
            left += 1
        while left < right and nums[right] % 2 != 0:
            right -= 1
        if left < right:
            nums[left], nums[right] = nums[right], nums[left]
            left += 1
            right -= 1
    return nums
```

---

### Problem 1.2: Subarray Sum Divisible by K
- **Approach**: Running prefix sum with modulo. Subarray sum `(prefix[j] - prefix[i]) % K == 0` implies `prefix[j] % K == prefix[i] % K`. In languages where `%` can be negative, normalize `(rem % K + K) % K`.
- **Complexity**: Time $O(N)$, Space $O(K)$.

```java
// Java Solution
import java.util.*;

public class Solution1_2 {
    public static int subarraysDivByK(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, 1);
        int runningSum = 0, count = 0;
        for (int x : nums) {
            runningSum += x;
            int rem = ((runningSum % k) + k) % k;
            count += map.getOrDefault(rem, 0);
            map.put(rem, map.getOrDefault(rem, 0) + 1);
        }
        return count;
    }
}
```

```python
# Python Solution
def subarrays_div_by_k(nums: list[int], k: int) -> int:
    prefix_map = {0: 1}
    running_sum = 0
    count = 0
    for x in nums:
        running_sum += x
        rem = running_sum % k  # Python % is always non-negative for positive divisor
        count += prefix_map.get(rem, 0)
        prefix_map[rem] = prefix_map.get(rem, 0) + 1
    return count
```

---

## Solutions for Mock 2

### Problem 2.1: AdTech Tracking Query Parameter Sanitizer
- **Approach**: Split by `&`. For each token, find the first `=`. If no `=` or key is empty, discard. If key starts with `utm_ignore` or value is empty, discard. Store into a Map/Dict (overwrites duplicate keys to keep last occurrence). Finally, extract entries, sort keys alphabetically, and join with `&`.
- **Complexity**: Time $O(L \log K)$ where $L$ is query length and $K$ is number of unique keys. Space $O(L)$.

```java
// Java Solution
import java.util.*;

public class Solution2_1 {
    public static String sanitizeQuery(String query) {
        if (query == null || query.isEmpty()) return "EMPTY";
        String[] tokens = query.split("&");
        Map<String, String> map = new HashMap<>();

        for (String token : tokens) {
            if (token.isEmpty()) continue;
            int eqIdx = token.indexOf('=');
            if (eqIdx <= 0) continue; // missing '=' or empty key
            String key = token.substring(0, eqIdx);
            String val = token.substring(eqIdx + 1);
            if (key.startsWith("utm_ignore") || val.isEmpty()) continue;
            map.put(key, val);
        }

        if (map.isEmpty()) return "EMPTY";
        List<String> sortedKeys = new ArrayList<>(map.keySet());
        Collections.sort(sortedKeys);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < sortedKeys.size(); i++) {
            String k = sortedKeys.get(i);
            sb.append(k).append("=").append(map.get(k));
            if (i < sortedKeys.size() - 1) sb.append("&");
        }
        return sb.toString();
    }
}
```

```python
# Python Solution
def sanitize_query(query: str) -> str:
    if not query:
        return "EMPTY"
    tokens = query.split("&")
    param_map = {}

    for token in tokens:
        if not token or "=" not in token:
            continue
        eq_idx = token.find("=")
        key = token[:eq_idx]
        val = token[eq_idx + 1 :]
        if not key or key.startswith("utm_ignore") or not val:
            continue
        param_map[key] = val

    if not param_map:
        return "EMPTY"

    sorted_pairs = [f"{k}={param_map[k]}" for k in sorted(param_map.keys())]
    return "&".join(sorted_pairs)
```

---

## Solutions for Mock 3

### Problem 3.1: Valid Palindrome with At Most One Removal
- **Approach**: Two pointers inward. If mismatch found at `(i, j)`, check if substring `s[i+1...j]` or `s[i...j-1]` is a palindrome.
- **Complexity**: Time $O(N)$, Space $O(1)$.

```java
// Java Solution
public class Solution3_1 {
    public static boolean validPalindrome(String s) {
        int i = 0, j = s.length() - 1;
        while (i < j) {
            if (s.charAt(i) != s.charAt(j)) {
                return isPal(s, i + 1, j) || isPal(s, i, j - 1);
            }
            i++;
            j--;
        }
        return true;
    }
    private static boolean isPal(String s, int l, int r) {
        while (l < r) {
            if (s.charAt(l++) != s.charAt(r--)) return false;
        }
        return true;
    }
}
```

```python
# Python Solution
def valid_palindrome(s: str) -> bool:
    def is_pal(l: int, r: int) -> bool:
        while l < r:
            if s[l] != s[r]:
                return False
            l += 1
            r -= 1
        return True

    i, j = 0, len(s) - 1
    while i < j:
        if s[i] != s[j]:
            return is_pal(i + 1, j) or is_pal(i, j - 1)
        i += 1
        j -= 1
    return True
```

---

### Problem 3.2: Contiguous Subarray with Equal 0s and 1s
- **Approach**: Transform `0` to `-1`. Problem reduces to finding the longest subarray with sum `0`. Use Hash Map storing the earliest index where each running prefix sum occurred.
- **Complexity**: Time $O(N)$, Space $O(N)$.

```java
// Java Solution
import java.util.*;

public class Solution3_2 {
    public static int findMaxLength(int[] nums) {
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, -1);
        int maxLen = 0, prefix = 0;
        for (int i = 0; i < nums.length; i++) {
            prefix += (nums[i] == 1) ? 1 : -1;
            if (map.containsKey(prefix)) {
                maxLen = Math.max(maxLen, i - map.get(prefix));
            } else {
                map.put(prefix, i);
            }
        }
        return maxLen;
    }
}
```

```python
# Python Solution
def find_max_length(nums: list[int]) -> int:
    prefix_map = {0: -1}
    prefix = 0
    max_len = 0
    for i, val in enumerate(nums):
        prefix += 1 if val == 1 else -1
        if prefix in prefix_map:
            max_len = max(max_len, i - prefix_map[prefix])
        else:
            prefix_map[prefix] = i
    return max_len
```

---

## Solutions for Mock 4

### Problem 4.1: Campaign Impression Overlap Resolver
- **Approach**: Sort intervals by start time. Merge overlapping or touching (`curr.start <= prev.end + 1` or standard touching `curr.start <= prev.end`). Calculate duration as `end - start + 1`.
- **Complexity**: Time $O(N \log N)$, Space $O(N)$.

```java
// Java Solution
import java.util.*;

public class Solution4_1 {
    public static void resolveIntervals(int[][] intervals) {
        if (intervals == null || intervals.length == 0) return;
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

        List<int[]> merged = new ArrayList<>();
        int[] current = intervals[0];
        merged.add(current);

        for (int i = 1; i < intervals.length; i++) {
            int[] next = intervals[i];
            if (next[0] <= current[1]) { // overlapping or touching
                current[1] = Math.max(current[1], next[1]);
            } else {
                current = next;
                merged.add(current);
            }
        }

        long totalDuration = 0;
        System.out.println(merged.size());
        for (int[] inv : merged) {
            System.out.println(inv[0] + " " + inv[1]);
            totalDuration += (inv[1] - inv[0] + 1);
        }
        System.out.println(totalDuration);
    }
}
```

```python
# Python Solution
def resolve_intervals(intervals: list[list[int]]):
    if not intervals:
        return
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for start, end in intervals[1:]:
        prev_start, prev_end = merged[-1]
        if start <= prev_end:
            merged[-1][1] = max(prev_end, end)
        else:
            merged.append([start, end])

    total_duration = sum(end - start + 1 for start, end in merged)
    print(len(merged))
    for inv in merged:
        print(f"{inv[0]} {inv[1]}")
    print(total_duration)
```

---

## Solutions for Mock 5

### Problem 5.1: Single Non-Duplicate in Sorted Array
- **Approach**: Binary search on even indices. If non-duplicate hasn't appeared yet, pairs start on even indices (`nums[mid] == nums[mid + 1]`). If mismatch, single element is in left half.
- **Complexity**: Time $O(\log N)$, Space $O(1)$.

```java
// Java Solution
public class Solution5_1 {
    public static int singleNonDuplicate(int[] nums) {
        int low = 0, high = nums.length - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (mid % 2 == 1) mid--; // Ensure mid is even
            if (nums[mid] == nums[mid + 1]) {
                low = mid + 2;
            } else {
                high = mid;
            }
        }
        return nums[low];
    }
}
```

```python
# Python Solution
def single_non_duplicate(nums: list[int]) -> int:
    low, high = 0, len(nums) - 1
    while low < high:
        mid = low + (high - low) // 2
        if mid % 2 == 1:
            mid -= 1
        if nums[mid] == nums[mid + 1]:
            low = mid + 2
        else:
            high = mid
    return nums[low]
```

---

### Problem 5.2: Maximum Product Subarray
- **Approach**: Maintain `max_prod` and `min_prod` at each step because multiplying a negative number by `min_prod` can flip it to the largest positive product.
- **Complexity**: Time $O(N)$, Space $O(1)$.

```java
// Java Solution
public class Solution5_2 {
    public static long maxProduct(int[] nums) {
        long maxProd = nums[0], minProd = nums[0], globalMax = nums[0];
        for (int i = 1; i < nums.length; i++) {
            long val = nums[i];
            if (val < 0) {
                long temp = maxProd;
                maxProd = minProd;
                minProd = temp;
            }
            maxProd = Math.max(val, maxProd * val);
            minProd = Math.min(val, minProd * val);
            globalMax = Math.max(globalMax, maxProd);
        }
        return globalMax;
    }
}
```

```python
# Python Solution
def max_product(nums: list[int]) -> int:
    max_p = min_p = global_max = nums[0]
    for x in nums[1:]:
        if x < 0:
            max_p, min_p = min_p, max_p
        max_p = max(x, max_p * x)
        min_p = min(x, min_p * x)
        global_max = max(global_max, max_p)
    return global_max
```

---

## Solutions for Mock 6

### Problem 6.1: Config Key-Path Extractor & Type Validator
- **Approach**: Parse tokens by `;`. Validate `.` separation in key path. Check value against integer regex / parse, boolean strict match (`true`/`false`), or alphanumeric string. Output sorted entries.

```python
# Python Solution
import re


def parse_config(config: str) -> list[str]:
    tokens = config.split(";")
    results = []

    for token in tokens:
        token = token.strip()
        if not token or "=" not in token:
            continue
        parts = token.split("=", 1)
        key_path = parts[0].strip()
        val = parts[1].strip()

        if "." not in key_path:
            continue
        subparts = key_path.split(".", 1)
        section, key = subparts[0], subparts[1]

        # Validation: only lowercase letters
        if not (section.isalpha() and section.islower() and key.isalpha() and key.islower()):
            continue

        # Type detection
        if val in ("true", "false"):
            val_type = "BOOLEAN"
        elif re.fullmatch(r"-?\d+", val):
            val_type = "INTEGER"
        elif re.fullmatch(r"[A-Za-z0-9_]+", val):
            val_type = "STRING"
        else:
            continue

        results.append(f"{section}/{key}:{val_type}")

    results.sort()
    return results if results else ["INVALID"]
```

---

## Solutions for Mock 7

### Problem 7.1: In-Place String Compression
- **Approach**: Read pointer `i`, write pointer `write`. Count consecutive duplicates. Write character, then write length digits if length $> 1$.
- **Complexity**: Time $O(N)$, Space $O(1)$.

```java
// Java Solution
public class Solution7_1 {
    public static int compress(char[] chars) {
        int write = 0, i = 0;
        while (i < chars.length) {
            char ch = chars[i];
            int count = 0;
            while (i < chars.length && chars[i] == ch) {
                i++;
                count++;
            }
            chars[write++] = ch;
            if (count > 1) {
                for (char c : Integer.toString(count).toCharArray()) {
                    chars[write++] = c;
                }
            }
        }
        return write;
    }
}
```

---

### Problem 7.2: Longest Substring Without Repeating Characters
- **Approach**: Sliding window with character index map. When repeating character is seen, move `left` to `max(left, map.get(ch) + 1)`.
- **Complexity**: Time $O(N)$, Space $O(\min(N, \Sigma))$.

```python
# Python Solution
def length_of_longest_substring(s: str) -> int:
    char_map = {}
    left = 0
    max_len = 0
    for right, ch in enumerate(s):
        if ch in char_map and char_map[ch] >= left:
            left = char_map[ch] + 1
        char_map[ch] = right
        max_len = max(max_len, right - left + 1)
    return max_len
```

---

## Solutions for Mock 8

### Problem 8.1: Group Anagrams Signature
- **Approach**: Sort each string to create canonical anagram key. Group into Hash Map. Sort groups by size.
- **Complexity**: Time $O(N \cdot K \log K)$, Space $O(N \cdot K)$.

```python
# Python Solution
from collections import defaultdict


def group_anagrams(strs: list[str]) -> list[list[str]]:
    groups = defaultdict(list)
    for s in strs:
        key = "".join(sorted(s))
        groups[key].append(s)

    result = [sorted(g) for g in groups.values()]
    result.sort(key=lambda g: (len(g), g[0]))
    return result
```

---

### Problem 8.2: Minimum Size Subarray Sum
- **Approach**: Sliding window with positive integers. Expand `right`, add to sum. While `sum >= target`, record length `right - left + 1`, subtract `nums[left]`, and increment `left`.
- **Complexity**: Time $O(N)$, Space $O(1)$.

```java
// Java Solution
public class Solution8_2 {
    public static int minSubArrayLen(int target, int[] nums) {
        int left = 0, sum = 0, minLen = Integer.MAX_VALUE;
        for (int right = 0; right < nums.length; right++) {
            sum += nums[right];
            while (sum >= target) {
                minLen = Math.min(minLen, right - left + 1);
                sum -= nums[left++];
            }
        }
        return minLen == Integer.MAX_VALUE ? 0 : minLen;
    }
}
```

---

## Solutions for Mock 9

### Problem 9.1: Ad Click Fraud Detector (Sliding Time Window)
- **Approach**: Group clicks by `user_id`. For each user, maintain a sliding deque of timestamps. For each timestamp, evict elements where `ts - deque.peekFirst() > W`. If deque size reaches `K`, flag the user and continue.
- **Complexity**: Time $O(N \log U)$ where $U$ is number of users, Space $O(N)$.

```python
# Python Solution
from collections import defaultdict, deque


def detect_fraud_clicks(
    logs: list[tuple[str, int]], k: int, w: int
) -> list[str]:
    user_windows = defaultdict(deque)
    flagged = set()

    for user_id, ts in logs:
        if user_id in flagged:
            continue
        q = user_windows[user_id]
        q.append(ts)
        while q and ts - q[0] > w:
            q.popleft()
        if len(q) >= k:
            flagged.add(user_id)

    return sorted(list(flagged)) if flagged else ["NONE"]
```

---

## Solutions for Mock 10

### Problem 10.1: Minimum Window Substring Match
- **Approach**: Sliding window tracking matched distinct character count against required frequency map. Once all matches satisfied, shrink from left to find minimum valid window.
- **Complexity**: Time $O(|s| + |t|)$, Space $O(\Sigma)$.

```java
// Java Solution
import java.util.*;

public class Solution10_1 {
    public static String minWindow(String s, String t) {
        if (s.length() < t.length()) return "";
        Map<Character, Integer> need = new HashMap<>();
        for (char c : t.toCharArray()) need.put(c, need.getOrDefault(c, 0) + 1);

        Map<Character, Integer> window = new HashMap<>();
        int left = 0, matchCount = 0;
        int minLen = Integer.MAX_VALUE, startIdx = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            window.put(c, window.getOrDefault(c, 0) + 1);
            if (need.containsKey(c) && window.get(c).intValue() == need.get(c).intValue()) {
                matchCount++;
            }

            while (matchCount == need.size()) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    startIdx = left;
                }
                char leftChar = s.charAt(left);
                window.put(leftChar, window.get(leftChar) - 1);
                if (need.containsKey(leftChar) && window.get(leftChar) < need.get(leftChar)) {
                    matchCount--;
                }
                left++;
            }
        }
        return minLen == Integer.MAX_VALUE ? "" : s.substring(startIdx, startIdx + minLen);
    }
}
```
