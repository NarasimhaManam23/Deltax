# DeltaX High-Priority Study Notes: Programming & Data Structures

---

# MODULE 1: Operators, Expressions & Increment Mechanics

### Concept
Operators are tokens that trigger computation. Increment (`++`) and decrement (`--`) operators modify variables either before (prefix: evaluate then yield new value) or after (postfix: yield current value then evaluate) their appearance in an expression.

### Interview Definition
"Prefix increment (`++i`) immediately updates the stored variable and evaluates to the updated value. Postfix increment (`i++`) makes a temporary copy of the current value for expression evaluation, then modifies the variable in memory."

### Deep Explanation
In C and C++, modifying a scalar object more than once between two sequence points (or in unsequenced evaluations in C11/C++11) causes **Undefined Behavior** (e.g., `i = i++ + ++i`). However, in Java and C#, expression evaluation is strictly left-to-right with fully sequenced side-effects. In Java:
```java
int i = 5;
i = i++; 
// In Java: 1. Evaluate RHS: copies 5. 2. Post-increment: i becomes 6. 3. Assignment completes: assigns stored 5 back to i. Result: i remains 5!
```
In bitwise operators, operator precedence is a major MCQ trap: relational (`<`, `>`) and equality (`==`, `!=`) operators have higher precedence than bitwise operators (`&`, `^`, `|`).
Thus, `if (x & 1 == 0)` evaluates as `if (x & (1 == 0))` $\rightarrow$ `if (x & 0)`, which is always false!

### Example
Checking parity of integer `x`:
```c
// Correct:
if ((x & 1) == 0) { /* Even */ }
// Buggy trap:
if (x & 1 == 0)   { /* Evaluates to x & 0 -> false always! */ }
```

### Trap
1. Operator precedence: Bitwise `&`, `^`, `|` are lower precedence than comparison `==`, `!=`.
2. Short-circuit evaluation in logical operators:
   In `if (a || ++b)`, if `a` is true, `++b` is NEVER evaluated!
   In `if (a && ++b)`, if `a` is false, `++b` is NEVER evaluated!

### Code
```java
public class OperatorDemo {
    public static void main(String[] args) {
        int a = 0;
        int b = 10;
        if (a != 0 && ++b > 10) {
            System.out.println("Condition Met");
        }
        System.out.println("b = " + b); // Prints b = 10 because ++b was skipped!
    }
}
```

### Complexity
Arithmetic & bitwise operations: $O(1)$ Time, $O(1)$ Space.

### Practice Questions (5 Qs)
1. What is the output of `int a = 5; int b = a++ * 2 + ++a * 2;` in Java?
2. What will `printf("%d", 1 << 2 + 1);` output in C?
3. What is the value of `x` after: `int a = 2, b = 0; int x = (b != 0 && ++a > 2) ? 100 : a;`?
4. What does `(n & (n - 1))` calculate for any non-zero positive integer `n`?
5. What is the result of `~(-5)` in two's complement integer arithmetic?

### Answers & Explanations
1. **Answer**: `24`.
   *Explanation*: In Java (strict left-to-right evaluation):
   `a++ * 2`: evaluates `a` (5), multiplies by 2 (10), then `a` becomes 6.
   `++a * 2`: increments `a` from 6 to 7, evaluates as 7, multiplies by 2 (14).
   $10 + 14 = 24$. Final `a` is 7.
2. **Answer**: `8`.
   *Explanation*: Addition `+` has higher precedence than left-shift `<<`. So `1 << 2 + 1` evaluates as `1 << (2 + 1)` = `1 << 3` = `8`. (NOT `(1 << 2) + 1 = 5`).
3. **Answer**: `2`.
   *Explanation*: Because `b != 0` evaluates to false, short-circuit evaluation prevents `++a` from executing. Thus, `x` receives `a`, which remains `2`.
4. **Answer**: It clears (turns to 0) the lowest set bit (rightmost 1) of `n`.
   *Explanation*: If `n = 12` (`1100`), `n - 1 = 11` (`1011`). `n & (n - 1) = 1100 & 1011 = 1000` (8). If `(n & (n - 1)) == 0`, `n` is a power of 2.
5. **Answer**: `4`.
   *Explanation*: Bitwise NOT `~x` in two's complement equals `-(x + 1)`. Thus, `~(-5) = -(-5 + 1) = -(-4) = 4`.

---

# MODULE 2: Pointers, Array Decay & Memory Addressing

### Concept
A pointer is a variable that stores the memory address of another object. Arrays in C/C++ automatically decay into a pointer to their first element when passed into functions or used in most expressions.

### Interview Definition
"A pointer holds a memory location. In C/C++, array names act as constant pointers to their base element, but unlike pointer variables, array names cannot be reassigned or incremented (`arr++` is a compilation error, whereas `ptr++` shifts address by `sizeof(*ptr)` bytes)."

### Deep Explanation
Pointer arithmetic is scaled by the size of the underlying type:
If `int *ptr = 1000;`, `ptr + 1` points to `1000 + sizeof(int) = 1004` on 32/64-bit systems.
* Difference between `*ptr++`, `(*ptr)++`, and `*++ptr`:
  - `*ptr++`: Post-increments the pointer itself; evaluates to the value of `*ptr` before pointer increment.
  - `(*ptr)++`: Dereferences `ptr` and post-increments the value stored at that location.
  - `*++ptr`: Pre-increments pointer, then dereferences the new location.
  - `++*ptr`: Pre-increments the value stored at the address pointed to by `ptr`.
* Arrays: `arr[i]` is syntactically translated to `*(arr + i)` by the compiler! Because addition is commutative, `*(arr + i) == *(i + arr) == i[arr]`. Yes, `3[arr]` is completely valid C code!

### Example
```c
#include <stdio.h>
int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int *p = arr;
    printf("%d\n", *p++);   // Prints 10; p now points to arr[1] (20)
    printf("%d\n", (*p)++); // Prints 20; arr[1] is now incremented to 21
    printf("%d\n", *p);     // Prints 21
    printf("%d\n", 2[arr]); // Prints arr[2] = 30
    return 0;
}
```

### Trap
1. Confusing `sizeof(arr)` inside the declaring scope (which returns total array bytes) with `sizeof(arr)` when `arr` is passed as a function parameter (which decays to a pointer, returning 4 or 8 bytes).
2. Dangling pointer: Accessing memory after `free()` or pointing to a local stack variable that went out of scope.

### Code
```c
void testArray(int arr[]) {
    // TRAP: arr is a pointer here, NOT the array!
    printf("Param sizeof: %zu\n", sizeof(arr)); // 8 bytes on 64-bit OS
}
int main() {
    int arr[10];
    printf("Main sizeof: %zu\n", sizeof(arr));  // 40 bytes (10 * 4)
    testArray(arr);
    return 0;
}
```

### Complexity
Pointer operations & address arithmetic: $O(1)$ Time, $O(1)$ Space.

### Practice Questions (5 Qs)
1. Given `int arr[5] = {1, 2, 3, 4, 5}; int *p = (int*)(&arr + 1);`, what is `*(p - 1)`?
2. If `char str[] = "DeltaX"; char *p = str;`, what does `printf("%s", p + 3);` output?
3. What is the output of `char *s = "Hello"; s[0] = 'M';` in C?
4. What is the value of `sizeof` a pointer to a struct containing 10 integers and 2 double arrays on a 64-bit architecture?
5. If `int a[3][3] = {{1,2,3},{4,5,6},{7,8,9}};`, what is the value of `*(*(a + 1) + 2)`?

### Answers & Explanations
1. **Answer**: `5`.
   *Explanation*: `&arr` is a pointer to the entire array of 5 integers (`int (*)[5]`). Adding 1 increments the pointer by the size of the whole array (`5 * 4 = 20` bytes), pointing just past the end of the array. Casting to `int*` and subtracting 1 steps back by 1 integer (4 bytes), pointing directly to `arr[4]`, which is `5`.
2. **Answer**: `taX`.
   *Explanation*: `p + 3` shifts the pointer 3 characters forward: `s[0]='D'`, `s[1]='e'`, `s[2]='l'`, `s[3]='t'`. `printf("%s")` prints from `p + 3` until the null terminator `\0`, resulting in `"taX"`.
3. **Answer**: Segmentation Fault / Undefined Behavior.
   *Explanation*: String literals like `"Hello"` are stored in read-only data segment (RODATA). Modifying a string literal via pointer causes a memory write fault.
4. **Answer**: `8 bytes`.
   *Explanation*: All pointers on a 64-bit machine occupy 8 bytes (64 bits), regardless of the size or complexity of the data structure they point to.
5. **Answer**: `6`.
   *Explanation*: `a` is a 2D array. `a + 1` points to row 1 `{4, 5, 6}`. Dereferencing `*(a + 1)` yields the pointer to the first element of row 1 (`&a[1][0]`). Adding 2 points to `&a[1][2]`. Dereferencing again gives `a[1][2] = 6`.

---

# MODULE 3: Contiguous Subarrays, Prefix Sum & Sliding Window

### Concept
A subarray is a contiguous slice of an array. Naive examination of all subarrays takes $O(N^2)$ to $O(N^3)$. Prefix sum and sliding window techniques optimize range query and window constraint evaluations down to $O(N)$.

### Interview Definition
"Prefix sum precomputes cumulative sums enabling $O(1)$ range sum retrieval via `sum(L, R) = prefix[R] - prefix[L - 1]`. Sliding window maintains a dynamic valid window between two pointers $(L, R)$ in a single pass over $O(N)$."

### Deep Explanation
1. **Kadane's Algorithm (Max Subarray Sum)**:
   At each index $i$, decide: Do I extend the previous subarray sum (`current_sum + arr[i]`), or start a fresh subarray at `arr[i]`?
   `current_sum = max(arr[i], current_sum + arr[i])`
   `max_so_far = max(max_so_far, current_sum)`
   *Trap*: If all numbers are negative, initializing `max_so_far = 0` is incorrect! You must initialize with `arr[0]` or $-\infty$.
2. **Subarray Sum Equals K (Negative Numbers Allowed)**:
   Sliding window FAILS when array contains negative numbers because window sum is non-monotonic!
   *Solution*: Prefix Sum + Hash Map.
   $Sum(i, j) = Prefix[j] - Prefix[i - 1] = K \implies Prefix[i - 1] = Prefix[j] - K$.
   Store frequencies of prefix sums in a hash map. At each step $j$, check if `(current_prefix - K)` exists in map.

### Example: Sliding Window vs Prefix Sum
* Use **Sliding Window** when: All numbers are positive / non-negative (sum grows monotonically as right pointer advances, shrinks as left pointer advances).
* Use **Prefix Sum + HashMap** when: Numbers can be negative, or when exact target match $K$ is required across arbitrary integers.

### Code: Subarray Sum Equals K ($O(N)$)
```java
import java.util.HashMap;

public class SubarraySumK {
    public static int subarraySum(int[] nums, int k) {
        HashMap<Integer, Integer> map = new HashMap<>();
        map.put(0, 1); // Base condition: prefix sum of 0 occurs once before array starts
        int prefixSum = 0;
        int count = 0;
        
        for (int num : nums) {
            prefixSum += num;
            if (map.containsKey(prefixSum - k)) {
                count += map.get(prefixSum - k);
            }
            map.put(prefixSum, map.getOrDefault(prefixSum, 0) + 1);
        }
        return count;
    }
}
```

### Complexity
- Kadane's: $O(N)$ Time, $O(1)$ Space.
- Prefix Sum + Hash Map: $O(N)$ Time, $O(N)$ Space.
- Fixed/Variable Sliding Window: $O(N)$ Time, $O(1)$ to $O(K)$ Space.

### Practice Questions (5 Qs)
1. Given array `[-2, -3, 4, -1, -2, 1, 5, -3]`, what is the maximum subarray sum using Kadane's algorithm?
2. What is the total number of subarrays in an array of size $N$?
3. Why does the two-pointer sliding window technique fail to find a subarray with sum $K$ if the array contains negative numbers?
4. What is the maximum sum subarray of size $K = 3$ in `[2, 1, 5, 1, 3, 2]`?
5. How can you find the longest subarray with equal numbers of 0s and 1s in $O(N)$?

### Answers & Explanations
1. **Answer**: `7`.
   *Explanation*: The contiguous subarray is `[4, -1, -2, 1, 5]`. Sum = $4 - 1 - 2 + 1 + 5 = 7$.
2. **Answer**: $\frac{N(N + 1)}{2}$.
   *Explanation*: A subarray is defined by selecting a start index $i$ and end index $j \ge i$. Total pairs = $\sum_{i=1}^N i = \frac{N(N + 1)}{2}$. For example, $N = 3 \implies 6$ subarrays.
3. **Answer**: Because monotonicity is violated.
   *Explanation*: In sliding window, expanding the right pointer must monotonically increase (or maintain) the window sum, and advancing the left pointer must monotonically decrease it. Negative numbers break this contract, so you cannot determine whether to contract or expand.
4. **Answer**: `9`.
   *Explanation*: The windows of size 3 are: `[2,1,5]=8`, `[1,5,1]=7`, `[5,1,3]=9`, `[1,3,2]=6`. Maximum is 9 (`[5, 1, 3]`).
5. **Answer**: Replace all `0`s with `-1`s, then find the longest contiguous subarray with sum equal to `0` using Prefix Sum + Hash Map.
   *Explanation*: If `0` becomes `-1`, an equal count of `0`s and `1`s cancels out to a net sum of `0`. Store the first occurrence index of each prefix sum in a hash map.

---

# MODULE 4: Hashing & Hash Table Collision Strategies

### Concept
Hashing maps arbitrary keys to a fixed-size integer index using a hash function. Collisions occur when two distinct keys map to the same hash index.

### Interview Definition
"A hash table provides average-case $O(1)$ insertions, lookups, and deletions. Collisions are handled primarily via Separate Chaining (linked lists or balanced trees at each bucket) or Open Addressing (probing empty slots via linear, quadratic, or double hashing)."

### Deep Explanation
1. **Load Factor ($\alpha$)**:
   $\alpha = \frac{N}{M}$, where $N$ is number of elements inserted, $M$ is table size.
   In Java `HashMap`, default load factor is $0.75$. When $N > 0.75 \times M$, the table rehashes (doubles bucket size to $2M$) to preserve $O(1)$ amortized operations.
2. **Collision Resolution Techniques**:
   * *Separate Chaining*: Each bucket contains a linked list. In Java 8+, if a bucket's chain exceeds 8 elements (and total table capacity $\ge 64$), the bucket converts from a LinkedList to a Red-Black Tree (`TreeNode`), changing worst-case lookup from $O(N)$ to $O(\log N)$!
   * *Open Addressing*:
     - Linear Probing: $h(k, i) = (h'(k) + i) \bmod M$. Suffers from **Primary Clustering** (long contiguous blocks of occupied cells form, drastically degrading performance).
     - Quadratic Probing: $h(k, i) = (h'(k) + c_1 i + c_2 i^2) \bmod M$. Eliminates primary clustering but suffers from **Secondary Clustering**.
     - Double Hashing: $h(k, i) = (h_1(k) + i \cdot h_2(k)) \bmod M$. Best open addressing method; $h_2(k)$ must be relatively prime to $M$.

### Complexity Comparison
| Operation | Average Case | Worst Case (Standard Chaining) | Worst Case (Java 8 Treeified) |
| :--- | :--- | :--- | :--- |
| **Search** | $O(1)$ | $O(N)$ | $O(\log N)$ |
| **Insert** | $O(1)$ | $O(N)$ (or $O(1)$ at head) | $O(\log N)$ |
| **Delete** | $O(1)$ | $O(N)$ | $O(\log N)$ |

### Trap
1. Forgetting to override `hashCode()` when overriding `equals()` in Java. Two objects might be `equals() == true`, but if their `hashCode()` returns different values, `hashMap.get()` will fail to find the stored object!
2. Deletion in Open Addressing: Simply setting a deleted slot to `null` breaks search chains for subsequent elements. Must use a `TOMBSTONE` / `DELETED` sentinel flag.

### Practice Questions (5 Qs)
1. What is the worst-case time complexity of searching in a hash table of size $M$ with $N$ keys using separate chaining with linked lists?
2. In open addressing with linear probing, what phenomenon describes the buildup of contiguous occupied slots?
3. In Java 8, when does a `HashMap` bucket transform from a linked list into a red-black tree?
4. If a hash table has size 10 and uses hash function $h(k) = k \bmod 10$ with linear probing, at what index will key 33 be inserted after inserting keys 13, 23?
5. Why must the step hash function $h_2(k)$ in double hashing never evaluate to 0?

### Answers & Explanations
1. **Answer**: $O(N)$.
   *Explanation*: If all $N$ keys hash to the exact same bucket (worst-case pathological hash collision), search degrades to traversing a linked list of length $N$.
2. **Answer**: Primary Clustering.
   *Explanation*: Long consecutive runs of filled slots cause any key hashing to any slot within or just before the run to step all the way to the end, making the cluster even longer.
3. **Answer**: When the number of elements in a single bucket reaches or exceeds 8 (`TREEIFY_THRESHOLD = 8`) and total capacity is at least 64 (`MIN_TREEIFY_CAPACITY = 64`).
4. **Answer**: Index `5`.
   *Explanation*:
   - $13 \bmod 10 = 3 \rightarrow$ placed at index 3.
   - $23 \bmod 10 = 3 \rightarrow$ collision at 3, probes $3 + 1 = 4$ (empty) $\rightarrow$ placed at index 4.
   - $33 \bmod 10 = 3 \rightarrow$ collision at 3, collision at 4, probes $3 + 2 = 5$ (empty) $\rightarrow$ placed at index 5.
5. **Answer**: Because $i \cdot h_2(k) = i \cdot 0 = 0$, meaning the probe sequence would never advance and get trapped in an infinite loop at the initial collision slot.
