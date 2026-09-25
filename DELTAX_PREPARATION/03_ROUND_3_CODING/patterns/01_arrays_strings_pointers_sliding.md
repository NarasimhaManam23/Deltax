# DeltaX Coding Patterns 01: Arrays, Strings, Two Pointers, Sliding Window & Prefix Sum

---

# PATTERN 1 & 2: ARRAYS & STRINGS (MANIPULATION & IN-PLACE TRANSFORMATIONS)

### 1. Recognition Clues
* "Rotate an array by $K$ positions in-place."
* "Reverse words in a given string without extra memory."
* "Remove duplicates in-place from sorted array."
* "Transform string according to character rules (e.g., Run-Length Encoding, String Compression)."

### 2. Brute Force vs. Optimized Strategy
* **Brute Force**: Creating auxiliary arrays or repeated string concatenations. Repeated string concatenation in loops (`s += char`) creates a new string object every iteration, yielding $O(N^2)$ time!
* **Optimized**: 
  - Array Reversals for Rotation: Reverse $(0, N-1)$, reverse $(0, K-1)$, reverse $(K, N-1)$ in $O(N)$ time and $O(1)$ space.
  - Mutable buffers: Use `StringBuilder` in Java or list of characters in Python (`"".join(list)`), executing in $O(N)$ time.

### 3. Complexity
* **Time**: $O(N)$ single or double pass.
* **Space**: $O(1)$ auxiliary space.

### 4. Implementation Code

#### Java Implementation (Array Rotation by K)
```java
public class ArrayRotation {
    public static void rotate(int[] nums, int k) {
        if (nums == null || nums.length == 0) return;
        k = k % nums.length;
        if (k < 0) k += nums.length;
        
        reverse(nums, 0, nums.length - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, nums.length - 1);
    }
    
    private static void reverse(int[] nums, int start, int end) {
        while (start < end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
        }
    }
}
```

#### Python Implementation (String Compression)
```python
def compress_string(chars: list[str]) -> int:
    """
    Compresses characters in-place: ["a","a","b","b","c","c","c"] -> ["a","2","b","2","c","3"]
    Returns new length. Time: O(N), Space: O(1)
    """
    write = 0
    read = 0
    n = len(chars)
    
    while read < n:
        current_char = chars[read]
        count = 0
        while read < n and chars[read] == current_char:
            read += 1
            count += 1
            
        chars[write] = current_char
        write += 1
        
        if count > 1:
            for digit in str(count):
                chars[write] = digit
                write += 1
                
    return write
```

### 5. Common Pitfalls
* Forgetting `k = k % N` when $K \ge N$.
* Modifying strings immutably inside loops in Python/Java.
* Off-by-one errors when writing multi-digit counts during string compression.

### 6. Five Practice Exercises
1. Rotate array right by $K$ steps with $O(1)$ extra space.
2. String Compression in-place (LeetCode 443 style).
3. Reverse Words in a String without extra whitespace.
4. Move all Zeroes to the end of the array maintaining relative order.
5. In-place matrix 90-degree clockwise rotation without extra memory.

---

# PATTERN 4: TWO POINTERS

### 1. Recognition Clues
* Searching for pairs or triplets in a **sorted array** with a target sum.
* Palindrome verification (`left` moving right, `right` moving left).
* Partitioning elements (Dutch National Flag, Segregating 0s, 1s, and 2s).
* Merging two sorted sequences.

### 2. Brute Force vs. Optimized Strategy
* **Brute Force**: Nested loops checking all pairs $(i, j)$ in $O(N^2)$.
* **Optimized**: 
  - Place `left = 0`, `right = N - 1`.
  - Calculate `sum = arr[left] + arr[right]`.
  - If `sum == target`: found!
  - If `sum < target`: increment `left` to increase sum.
  - If `sum > target`: decrement `right` to reduce sum.
  - Each step eliminates an entire row or column of potential pairs, achieving $O(N)$ time.

### 3. Complexity
* **Time**: $O(N)$ (or $O(N \log N)$ if initial sorting is required).
* **Space**: $O(1)$ auxiliary space.

### 4. Implementation Code

#### Java Implementation (3-Sum Unique Triplets)
```java
import java.util.*;

public class ThreeSum {
    public static List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        if (nums == null || nums.length < 3) return result;
        
        Arrays.sort(nums); // O(N log N)
        
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue; // Skip duplicates for i
            
            int left = i + 1;
            int right = nums.length - 1;
            int target = -nums[i];
            
            while (left < right) {
                int sum = nums[left] + nums[right];
                if (sum == target) {
                    result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    while (left < right && nums[left] == nums[left + 1]) left++; // Skip dups
                    while (left < right && nums[right] == nums[right - 1]) right--; // Skip dups
                    left++;
                    right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return result;
    }
}
```

#### Python Implementation (Container With Most Water)
```python
def max_area(height: list[int]) -> int:
    """
    Finds two lines that together with x-axis forms a container containing most water.
    Time: O(N), Space: O(1)
    """
    left = 0
    right = len(height) - 1
    max_water = 0
    
    while left < right:
        width = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, width * h)
        
        # Move the pointer pointing to the shorter vertical bar
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
            
    return max_water
```

### 5. Common Pitfalls
* Forgetting to skip duplicate elements, resulting in duplicate triplet sets in the output.
* Advancing both pointers simultaneously when only one condition was met.
* Applying two pointers to an *unsorted* array expecting monotonicity.

### 6. Five Practice Exercises
1. Two Sum II (Input array is sorted).
2. 3-Sum (Unique combinations summing to 0).
3. Container With Most Water.
4. Sort Colors / Dutch National Flag (0s, 1s, 2s).
5. Remove Duplicates from Sorted Array II (at most 2 duplicates allowed).

---

# PATTERN 5: SLIDING WINDOW (FIXED & VARIABLE)

### 1. Recognition Clues
* "Find the longest/shortest contiguous substring satisfying condition $C$."
* "Maximum sum of any contiguous subarray of size $K$."
* "Smallest subarray with sum $\ge S$."
* Input consists of positive numbers or string characters where window properties expand and contract predictably.

### 2. Brute Force vs. Optimized Strategy
* **Brute Force**: Checking all subarrays $(i, j)$ in $O(N^2)$ or $O(N^3)$.
* **Optimized**: 
  - **Fixed Window**: Precompute first window of size $K$. Slide window by adding `arr[i]` and subtracting `arr[i - K]`. $O(1)$ per step $\implies O(N)$ total.
  - **Variable Window**: Expand `right` pointer to include elements until condition is violated (or met). Contract `left` pointer to restore validity while updating running answer.

### 3. Complexity
* **Time**: $O(N)$ (Each element is visited by `left` and `right` at most twice).
* **Space**: $O(1)$ or $O(\Sigma)$ where $\Sigma$ is character alphabet size (e.g., 26 or 128).

### 4. Implementation Code

#### Java Implementation (Longest Substring Without Repeating Characters)
```java
import java.util.HashMap;

public class LongestUniqueSubstring {
    public static int lengthOfLongestSubstring(String s) {
        if (s == null || s.length() == 0) return 0;
        
        // Map stores character -> last seen index
        HashMap<Character, Integer> lastSeen = new HashMap<>();
        int maxLength = 0;
        int left = 0;
        
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (lastSeen.containsKey(c)) {
                // Shift left pointer past the last duplicate, ensure left only moves forward
                left = Math.max(left, lastSeen.get(c) + 1);
            }
            lastSeen.put(c, right);
            maxLength = Math.max(maxLength, right - left + 1);
        }
        return maxLength;
    }
}
```

#### Python Implementation (Minimum Window Substring)
```python
from collections import Counter

def min_window(s: str, t: str) -> str:
    """
    Finds minimum window in s containing all characters of t.
    Time: O(N + M), Space: O(distinct chars in t)
    """
    if not s or not t:
        return ""
        
    t_counts = Counter(t)
    required = len(t_counts)
    
    window_counts = {}
    formed = 0
    
    left = 0
    ans = float("inf"), None, None  # length, left, right
    
    for right in range(len(s)):
        char = s[right]
        window_counts[char] = window_counts.get(char, 0) + 1
        
        if char in t_counts and window_counts[char] == t_counts[char]:
            formed += 1
            
        while left <= right and formed == required:
            # Update best answer
            if (right - left + 1) < ans[0]:
                ans = (right - left + 1, left, right)
                
            left_char = s[left]
            window_counts[left_char] -= 1
            if left_char in t_counts and window_counts[left_char] < t_counts[left_char]:
                formed -= 1
            left += 1
            
    return "" if ans[0] == float("inf") else s[ans[1]:ans[2] + 1]
```

### 5. Common Pitfalls
* Forgetting `left = Math.max(left, lastSeen.get(c) + 1)`, which causes the left pointer to move backward if a duplicate appeared before current window start!
* Attempting to use sliding window on arrays with negative numbers where window monotonicity is broken.

### 6. Five Practice Exercises
1. Maximum Sum Subarray of Size $K$.
2. Longest Substring Without Repeating Characters.
3. Minimum Size Subarray Sum $\ge S$.
4. Longest Repeating Character Replacement.
5. Permutation in String (Anagram substring match).

---

# PATTERN 6: PREFIX SUM

### 1. Recognition Clues
* "Answer multiple range sum queries on an array in $O(1)$ time."
* "Count total subarrays with exact sum equal to $K$ (where negative numbers exist)."
* "Find the longest subarray with equal numbers of 0s and 1s."

### 2. Strategy
* Precompute: `prefix[i] = prefix[i - 1] + arr[i]`.
* Range query: `Sum(L, R) = prefix[R] - (L > 0 ? prefix[L - 1] : 0)`.
* Target matching with negatives: $Prefix[j] - Prefix[i - 1] = K \implies Prefix[i - 1] = Prefix[j] - K$.
  Store counts of running prefix sums in a Hash Map initialized with `map.put(0, 1)`.

### 3. Implementation Code

#### Java Implementation (Subarray Sum Equals K)
```java
import java.util.HashMap;

public class SubarraySumEqualsK {
    public static int subarraySum(int[] nums, int k) {
        HashMap<Integer, Integer> prefixMap = new HashMap<>();
        prefixMap.put(0, 1); // Empty prefix before index 0 has sum 0
        
        int prefixSum = 0;
        int totalSubarrays = 0;
        
        for (int num : nums) {
            prefixSum += num;
            if (prefixMap.containsKey(prefixSum - k)) {
                totalSubarrays += prefixMap.get(prefixSum - k);
            }
            prefixMap.put(prefixSum, prefixMap.getOrDefault(prefixSum, 0) + 1);
        }
        return totalSubarrays;
    }
}
```

### 4. Five Practice Exercises
1. Range Sum Query - Immutable (LeetCode 303).
2. Subarray Sum Equals K (Negative numbers supported).
3. Contiguous Array with Equal 0s and 1s.
4. Subarray Sums Divisible by K (`(prefix % K + K) % K`).
5. Product of Array Except Self without division.
