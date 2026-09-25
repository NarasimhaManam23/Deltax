# DeltaX Coding Patterns 02: Hashing, Bit Manipulation (XOR), and Mathematical Logic

---

# PATTERN 3: HASH MAPS & FREQUENCY ANALYSIS

### 1. Recognition Clues
* "Find the first non-repeating element / character in a stream or array."
* "Group elements sharing common invariants (e.g., Group Anagrams)."
* "Find two elements satisfying relationship $A + B = Target$ in unsorted data."
* "Find the longest consecutive sequence in an unsorted array in $O(N)$."

### 2. Brute Force vs. Optimized Strategy
* **Brute Force**: Nested loops $O(N^2)$ to count frequencies or search for complementary values.
* **Optimized**: 
  - Use a Hash Map for $O(1)$ amortized insertion and lookup.
  - For small bounded alphabets (like lowercase English letters), use a static integer array `int[26]` to eliminate heap hashing overhead and achieve lower constant factors.

### 3. Complexity
* **Time**: $O(N)$ average.
* **Space**: $O(N)$ or $O(\Sigma)$ where $\Sigma$ is distinct key cardinality.

### 4. Implementation Code

#### Java Implementation (Group Anagrams)
```java
import java.util.*;

public class GroupAnagrams {
    public static List<List<String>> groupAnagrams(String[] strs) {
        if (strs == null || strs.length == 0) return new ArrayList<>();
        
        Map<String, List<String>> map = new HashMap<>();
        
        for (String s : strs) {
            // Build frequency signature string (e.g., "#1#0#2...") to avoid sorting
            char[] count = new char[26];
            for (char c : s.toCharArray()) count[c - 'a']++;
            String key = String.valueOf(count);
            
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(map.values());
    }
}
```

#### Python Implementation (Longest Consecutive Sequence in $O(N)$)
```python
def longest_consecutive(nums: list[int]) -> int:
    """
    Finds the length of the longest consecutive elements sequence in unsorted array.
    Time: O(N), Space: O(N)
    """
    num_set = set(nums)
    longest_streak = 0
    
    for num in num_set:
        # Check if num is the start of a streak (num - 1 is not in set)
        if num - 1 not in num_set:
            current_num = num
            current_streak = 1
            
            while current_num + 1 in num_set:
                current_num += 1
                current_streak += 1
                
            longest_streak = max(longest_streak, current_streak)
            
    return longest_streak
```

### 5. Common Pitfalls
* In `longest_consecutive`, failing to check `if num - 1 not in num_set` causes the inner `while` loop to run for every element, degrading performance from $O(N)$ back to $O(N^2)$!
* Forgetting that Java `HashMap` key lookups rely on both `equals()` and `hashCode()`.

### 6. Five Practice Exercises
1. Two Sum (Unsorted array in $O(N)$ time).
2. Group Anagrams.
3. Longest Consecutive Sequence in an Unsorted Array.
4. First Unique Character in a String.
5. Isomorphic Strings.

---

# PATTERN 16: BIT MANIPULATION & XOR PROPERTIES

### 1. Recognition Clues
* "Every number appears twice except one (or two)."
* "Find the missing number from 0 to $N$."
* "Calculate sum without using `+` or `-`."
* "Check if a number is a power of 2, 4, or calculate parity of bits."
* "XOR sum of all subarrays or subsets."

### 2. Essential Bitwise Identifiers & Axioms
* $x \oplus 0 = x$
* $x \oplus x = 0$ (Self-inverse property)
* Commutative & Associative: $a \oplus b \oplus a = (a \oplus a) \oplus b = 0 \oplus b = b$.
* Clear lowest set bit: `n & (n - 1)`.
* Extract lowest set bit: `n & (-n)`.
* Set $k^{\text{th}}$ bit: `n | (1 << k)`.
* Check $k^{\text{th}}$ bit: `(n & (1 << k)) != 0`.
* Toggle $k^{\text{th}}$ bit: `n ^ (1 << k)`.

### 3. Implementation Code

#### Java Implementation (Single Number III - Two Unique Numbers)
```java
public class SingleNumberTwoUnique {
    public static int[] singleNumber(int[] nums) {
        // Step 1: XOR all elements. Duplicate numbers cancel out.
        // Result is (A ^ B) where A and B are the two distinct unique numbers.
        int xor = 0;
        for (int num : nums) {
            xor ^= num;
        }
        
        // Step 2: Extract any differentiating set bit between A and B
        // (x & -x) isolates the lowest set bit
        int diffBit = xor & (-xor);
        
        // Step 3: Partition the array into two groups based on diffBit
        int num1 = 0;
        int num2 = 0;
        for (int num : nums) {
            if ((num & diffBit) == 0) {
                num1 ^= num;
            } else {
                num2 ^= num;
            }
        }
        return new int[]{num1, num2};
    }
}
```

#### Python Implementation (Reverse Bits of 32-bit Integer)
```python
def reverse_bits(n: int) -> int:
    """
    Reverses the 32 bits of an unsigned integer.
    Time: O(1) [32 iterations], Space: O(1)
    """
    res = 0
    for i in range(32):
        bit = (n >> i) & 1
        res |= (bit << (31 - i))
    return res
```

### 4. Common Pitfalls
* Operator precedence: Relational operators have higher precedence than bitwise operators! `if (x & 1 == 0)` evaluates as `x & (1 == 0) = x & 0 = 0` (Always false!). Must write: `if ((x & 1) == 0)`.
* Shifting signed integers: Using `>>` in Java sign-extends with 1s for negative numbers. Use `>>>` for logical zero-fill right shift.

### 5. Five Practice Exercises
1. Single Number I (Every element appears twice except one).
2. Single Number III (Two elements appear once).
3. Number of 1 Bits / Hamming Weight (Brian Kernighan's method).
4. Counting Bits from 0 to $N$ using DP with bit shifts (`dp[i] = dp[i >> 1] + (i & 1)`).
5. Missing Number from array containing $0$ to $N$.

---

# PATTERN 17: MATHEMATICAL LOGIC & NUMBER THEORY

### 1. Recognition Clues
* "Find the Greatest Common Divisor (GCD) or LCM of an array."
* "Check primality or generate prime numbers up to $N$."
* "Digit removal or divisibility puzzle (e.g., is number divisible by 3, 7, 11 after digit transformations)."
* "Count trailing zeroes in $N!$ (Factorial)."

### 2. Strategy
* **Euclidean Algorithm for GCD**:
  $\gcd(a, b) = \gcd(b, a \bmod b)$ until $b = 0$. Time: $O(\log(\min(a, b)))$.
* **Trailing Zeroes in $N!$**:
  Count factor 5 contributions: $\lfloor N/5 \rfloor + \lfloor N/25 \rfloor + \lfloor N/125 \rfloor + \dots$ in $O(\log_5 N)$.
* **Digit Divisibility Rules**:
  - Divisible by 3: Sum of digits is divisible by 3.
  - Divisible by 9: Sum of digits is divisible by 9.
  - Divisible by 11: Alternating sum of digits is divisible by 11.

### 3. Implementation Code

#### Java Implementation (Trailing Zeroes in Factorial & GCD)
```java
public class MathAlgorithms {
    public static int trailingZeroes(int n) {
        int count = 0;
        while (n >= 5) {
            count += n / 5;
            n /= 5;
        }
        return count;
    }
    
    public static int gcd(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}
```

### 4. Five Practice Exercises
1. Factorial Trailing Zeroes.
2. Greatest Common Divisor of Strings.
3. Count Primes up to $N$ (Sieve of Eratosthenes).
4. Power of Three without loops or recursion (`n > 0 && 1162261467 % n == 0`).
5. Happy Number (Detecting cycles in digit square sums via fast/slow pointers).
