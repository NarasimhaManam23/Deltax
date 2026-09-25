# DeltaX Coding Patterns 03: Binary Search, Sorting & Greedy Algorithms

---

# PATTERN 8: BINARY SEARCH (STANDARD & SEARCH ON ANSWER SPACE)

### 1. Recognition Clues
* "Find element in rotated sorted array."
* "Find first and last position of element in sorted array."
* "Find peak element."
* **Search on Answer Space**: "Find the minimum capacity to ship packages within $D$ days", "Koko eating bananas", "Maximize the minimum distance between points". Clue: The problem asks for the minimum or maximum feasible value across a monotonic answer range!

### 2. Strategy & Template
* **Avoid Integer Overflow**: Use `mid = low + (high - low) / 2;` rather than `(low + high) / 2`.
* **Binary Search on Answer Range**:
  1. Define search boundary: `low = min_feasible`, `high = max_feasible`.
  2. Write a helper function `boolean isValid(mid)` that tests whether a proposed answer `mid` satisfies problem constraints in $O(N)$ time.
  3. If `isValid(mid)` is true, record answer and shrink search space (`high = mid - 1` for minimization); otherwise, increase search space (`low = mid + 1`).

### 3. Complexity
* **Time**: $O(N \log(\text{Range}))$ for search on answer; $O(\log N)$ for standard binary search.
* **Space**: $O(1)$ auxiliary memory.

### 4. Implementation Code

#### Java Implementation (Search in Rotated Sorted Array)
```java
public class RotatedSortedArray {
    public static int search(int[] nums, int target) {
        if (nums == null || nums.length == 0) return -1;
        
        int low = 0, high = nums.length - 1;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            
            if (nums[mid] == target) return mid;
            
            // Check if left half is normally sorted
            if (nums[low] <= nums[mid]) {
                if (target >= nums[low] && target < nums[mid]) {
                    high = mid - 1; // Target lies in sorted left half
                } else {
                    low = mid + 1;
                }
            } 
            // Right half must be normally sorted
            else {
                if (target > nums[mid] && target <= nums[high]) {
                    low = mid + 1; // Target lies in sorted right half
                } else {
                    high = mid - 1;
                }
            }
        }
        return -1;
    }
}
```

#### Python Implementation (Binary Search on Answer: Capacity To Ship Packages Within D Days)
```python
def ship_within_days(weights: list[int], days: int) -> int:
    """
    Finds the minimum ship capacity to convey all packages within D days.
    Time: O(N * log(sum(weights) - max(weights))), Space: O(1)
    """
    def can_ship(capacity: int) -> bool:
        required_days = 1
        current_load = 0
        for w in weights:
            if current_load + w > capacity:
                required_days += 1
                current_load = 0
            current_load += w
        return required_days <= days

    low = max(weights)        # Ship must be at least as large as the heaviest package
    high = sum(weights)       # At most, ship all packages in 1 day
    ans = high
    
    while low <= high:
        mid = low + (high - low) // 2
        if can_ship(mid):
            ans = mid
            high = mid - 1    # Try to find a smaller feasible capacity
        else:
            low = mid + 1     # Capacity too small, increase capacity
            
    return ans
```

### 5. Common Pitfalls
* Using `(low + high) / 2` causing integer overflow in Java/C++ when $low + high > 2^{31} - 1$.
* Infinite loops from incorrect pointer adjustment: always use `mid - 1` and `mid + 1` rather than assigning `low = mid` without proper exit conditions.

### 6. Five Practice Exercises
1. Binary Search (Find first and last position).
2. Search in Rotated Sorted Array.
3. Find Peak Element.
4. Capacity to Ship Packages Within D Days.
5. Aggressive Cows / Book Allocation Problem.

---

# PATTERN 7: CUSTOM SORTING & COMPARATORS

### 1. Recognition Clues
* "Rearrange array to form the largest possible number."
* "Merge overlapping intervals."
* "Sort by multiple keys (e.g., sort by score descending, then by name ascending)."

### 2. Implementation Code

#### Java Implementation (Merge Intervals)
```java
import java.util.*;

public class MergeIntervals {
    public static int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) return intervals;
        
        // Sort intervals by start time
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        
        List<int[]> merged = new ArrayList<>();
        int[] current = intervals[0];
        merged.add(current);
        
        for (int i = 1; i < intervals.length; i++) {
            int[] next = intervals[i];
            if (current[1] >= next[0]) {
                // Overlapping: extend end time
                current[1] = Math.max(current[1], next[1]);
            } else {
                // Non-overlapping: push new interval
                current = next;
                merged.add(current);
            }
        }
        return merged.toArray(new int[merged.size()][]);
    }
}
```

#### Python Implementation (Largest Number)
```python
from functools import cmp_to_key

def largest_number(nums: list[int]) -> str:
    """
    Arranges integers to form the largest possible concatenated number.
    e.g. [3, 30, 34, 5, 9] -> "9534330"
    """
    str_nums = [str(x) for x in nums]
    
    # Custom comparator: compare (a + b) vs (b + a)
    def compare(a, b):
        if a + b > b + a:
            return -1
        elif a + b < b + a:
            return 1
        return 0
        
    str_nums.sort(key=cmp_to_key(compare))
    
    result = "".join(str_nums)
    # Edge case: if input is [0, 0], return "0" instead of "00"
    return "0" if result[0] == "0" else result
```

### 3. Five Practice Exercises
1. Merge Overlapping Intervals.
2. Largest Number formed from Array.
3. Non-overlapping Intervals (Minimum removals).
4. Custom Sorting String based on predefined order.
5. Meeting Rooms II (Minimum conference rooms required).

---

# PATTERN 14: GREEDY ALGORITHMS

### 1. Recognition Clues
* "Find the minimum number of platforms/rooms required."
* "Can you reach the last index of the array (Jump Game)?"
* "Maximize total profit with interval deadlines."
* "Fractional items allowed for value optimization."

### 2. Strategy
* Make the locally optimal choice at each step with the mathematical guarantee that it leads to a globally optimal solution (Greedy Choice Property + Optimal Substructure).

### 3. Implementation Code

#### Java Implementation (Jump Game I)
```java
public class JumpGame {
    public static boolean canJump(int[] nums) {
        int maxReach = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > maxReach) {
                return false; // Cannot reach this index
            }
            maxReach = Math.max(maxReach, i + nums[i]);
            if (maxReach >= nums.length - 1) {
                return true;
            }
        }
        return true;
    }
}
```

### 4. Five Practice Exercises
1. Jump Game I and II.
2. Gas Station / Circular Tour.
3. Minimum Number of Platforms Required for Trains.
4. Task Scheduler with cooling intervals.
5. Assign Cookies to Children.
