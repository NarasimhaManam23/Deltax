# DeltaX Round 1 Question Bank: Programming Fundamentals (100 MCQs)

---

### Q1
What is the output of the following C code snippet?
```c
#include <stdio.h>
int main() {
    int x = 5;
    int y = x++ + ++x;
    printf("%d, %d", x, y);
    return 0;
}
```
- A) `7, 12`
- B) `7, 13`
- C) `7, 14`
- D) Undefined Behavior in C
**Correct Answer**: D
**Explanation**: Modifying `x` more than once between sequence points (or unsequenced in C11) invokes Undefined Behavior in the C standard. (In Java, this is strictly defined as 7, 12).
**Topic**: Operators & Sequence Points
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q2
What is the output of this Java code?
```java
public class Test {
    public static void main(String[] args) {
        int i = 5;
        i = i++;
        System.out.println(i);
    }
}
```
- A) 5
- B) 6
- C) Compilation error
- D) Runtime exception
**Correct Answer**: A
**Explanation**: In Java, `i++` copies the original value 5 to the operand stack, increments `i` to 6 in local memory, and then the assignment operator assigns the stacked 5 back into `i`, keeping `i = 5`.
**Topic**: Postfix Increment & Assignment
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q3
What is the output of the following C program?
```c
#include <stdio.h>
int main() {
    int a = 10, b = 20, c = 30;
    if (c > b > a) {
        printf("TRUE");
    } else {
        printf("FALSE");
    }
    return 0;
}
```
- A) TRUE
- B) FALSE
- C) Compilation Error
- D) Infinite loop
**Correct Answer**: B
**Explanation**: Relational operators associate left-to-right: `(c > b)` evaluates to `(30 > 20) = 1`. Then `(1 > a)` evaluates to `(1 > 10) = 0` (false), printing `FALSE`.
**Topic**: Relational Operator Chaining
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q4
What will be printed by the following C code?
```c
#include <stdio.h>
int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int *ptr = arr;
    printf("%d ", *ptr++);
    printf("%d ", *++ptr);
    printf("%d", ++*ptr);
    return 0;
}
```
- A) `10 20 21`
- B) `10 30 31`
- C) `10 30 41`
- D) `20 30 31`
**Correct Answer**: B
**Explanation**: 
1. `*ptr++`: Evaluates `*ptr` (10), then increments pointer `ptr` to point to `arr[1]` (20).
2. `*++ptr`: Pre-increments pointer `ptr` to point to `arr[2]` (30), then dereferences it, printing 30.
3. `++*ptr`: Dereferences `ptr` (`arr[2] = 30`) and pre-increments its value to 31, printing 31.
**Topic**: Pointer Arithmetic & Dereference
**Difficulty**: Hard
**Source Classification**: DIRECTLY REPORTED

---

### Q5
What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int x = 2;
    printf("%d", x << 1 + 2);
    return 0;
}
```
- A) 8
- B) 16
- C) 6
- D) 10
**Correct Answer**: B
**Explanation**: Arithmetic addition `+` has higher operator precedence than bitwise left-shift `<<`. The expression evaluates as `x << (1 + 2) = 2 << 3 = 2 \times 8 = 16`.
**Topic**: Operator Precedence
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q6
What is the output of this Python code?
```python
x = [1, 2, 3]
y = x
y += [4]
z = x + [5]
print(x, y, z)
```
- A) `[1, 2, 3] [1, 2, 3, 4] [1, 2, 3, 4, 5]`
- B) `[1, 2, 3, 4] [1, 2, 3, 4] [1, 2, 3, 4, 5]`
- C) `[1, 2, 3, 4] [1, 2, 3, 4] [1, 2, 3, 5]`
- D) `[1, 2, 3] [1, 2, 3, 4] [1, 2, 3, 5]`
**Correct Answer**: B
**Explanation**: In Python, list `+=` mutates the list in-place (`extend`), so both `x` and `y` become `[1, 2, 3, 4]`. The binary `+` creates a brand new list, so `z` is `[1, 2, 3, 4, 5]`.
**Topic**: Python List Mutability
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q7
What is printed by this C recursive function when called with `fun(3)`?
```c
#include <stdio.h>
void fun(int n) {
    if (n <= 0) return;
    printf("%d ", n);
    fun(n - 1);
    printf("%d ", n);
}
```
- A) `3 2 1`
- B) `3 2 1 1 2 3`
- C) `3 2 1 0 1 2 3`
- D) `1 2 3 3 2 1`
**Correct Answer**: B
**Explanation**: Prints descending on call stack expansion (`3 2 1`), hits base case `n=0`, then unwinds stack printing ascending (`1 2 3`). Output: `3 2 1 1 2 3`.
**Topic**: Recursion Tracing
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q8
What will be the output of the following C program?
```c
#include <stdio.h>
int main() {
    int a = 0;
    while (a < 5) {
        if (a == 3) {
            continue;
        }
        printf("%d ", a);
        a++;
    }
    return 0;
}
```
- A) `0 1 2 4`
- B) `0 1 2 3 4`
- C) `0 1 2` followed by an infinite loop
- D) Compilation Error
**Correct Answer**: C
**Explanation**: When `a == 3`, `continue` jumps immediately to the loop header check (`a < 5`) without executing `a++`. Thus, `a` stays 3 forever, creating an infinite loop.
**Topic**: Loops & Control Flow
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q9
What is the output of the following C snippet?
```c
#include <stdio.h>
int main() {
    int i = 1;
    switch(i) {
        case 1: printf("1 ");
        case 2: printf("2 ");
        default: printf("D ");
        case 3: printf("3 ");
    }
    return 0;
}
```
- A) `1 `
- B) `1 2 D 3 `
- C) `1 2 `
- D) `1 D `
**Correct Answer**: B
**Explanation**: In C/C++/Java, without `break` statements, execution falls through all remaining cases unconditionally once a match is encountered, executing cases 1, 2, default, and 3.
**Topic**: Switch Statement Fall-Through
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q10
What is the output of this Python snippet?
```python
def func(val, lst=[]):
    lst.append(val)
    return lst

print(func(1), func(2))
```
- A) `[1] [2]`
- B) `[1] [1, 2]`
- C) `[1, 2] [1, 2]`
- D) `[1] []`
**Correct Answer**: C
**Explanation**: Python default arguments are evaluated ONCE when the function definition is executed, not each time it is called. The same list object is mutated across calls. `func(1)` mutates it to `[1]`, `func(2)` mutates it to `[1, 2]`. Both print calls reference the same object.
**Topic**: Python Default Arguments Trap
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q11
What is printed by the following C program?
```c
#include <stdio.h>
int main() {
    char str[] = "DeltaX\0Bangalore";
    printf("%zu, %zu", sizeof(str), strlen(str));
    return 0;
}
```
- A) `17, 6`
- B) `17, 16`
- C) `7, 6`
- D) `16, 6`
**Correct Answer**: A
**Explanation**: `sizeof(str)` counts total allocated array bytes including characters, explicit `\0`, and compiler trailing `\0`: 6 ("DeltaX") + 1 (`\0`) + 9 ("Bangalore") + 1 (implicit trailing `\0`) = 17 bytes. `strlen(str)` stops at the first `\0`, returning 6.
**Topic**: Strings & Memory
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q12
What is the output of this C code?
```c
#include <stdio.h>
int main() {
    int a = 5, b = 0;
    int c = a && ++b;
    int d = b || ++a;
    printf("%d %d %d %d", a, b, c, d);
    return 0;
}
```
- A) `5 1 1 1`
- B) `6 1 1 1`
- C) `5 0 0 1`
- D) `6 0 1 1`
**Correct Answer**: A
**Explanation**: 
1. `c = a && ++b`: `a` (5) is non-zero (true), so `++b` executes, incrementing `b` to 1. `c` becomes 1.
2. `d = b || ++a`: `b` (1) is non-zero (true). In short-circuit OR, `++a` is SKIPPED! `a` remains 5. `d` becomes 1.
Result: `5 1 1 1`.
**Topic**: Short-Circuit Evaluation
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q13
What is the return value of `recur(4)`?
```c
int recur(int n) {
    if (n == 0) return 1;
    return n * recur(n - 1) + n;
}
```
- A) 24
- B) 34
- C) 44
- D) 64
**Correct Answer**: B
**Explanation**:
- `recur(0) = 1`
- `recur(1) = 1 * 1 + 1 = 2`
- `recur(2) = 2 * 2 + 2 = 6`
- `recur(3) = 3 * 6 + 3 = 21`
- `recur(4) = 4 * 21 + 4 = 84 + 4 = 88`
Wait, let's trace carefully:
- `n=1`: $1 \times 1 + 1 = 2$
- `n=2`: $2 \times 2 + 2 = 6$
- `n=3`: $3 \times 6 + 3 = 21$
- `n=4`: $4 \times 21 + 4 = 88$.
Wait, if option B is 34, what formula gives 34? Let's fix options to have 88!
- A) 24
- B) 34
- C) 88
- D) 96
**Correct Answer**: C
**Explanation**: Tracing step-by-step: `recur(1) = 1(1) + 1 = 2`; `recur(2) = 2(2) + 2 = 6`; `recur(3) = 3(6) + 3 = 21`; `recur(4) = 4(21) + 4 = 88`.
**Topic**: Recursion
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q14
What is the output of the following Java snippet?
```java
public class ArrayTest {
    public static void main(String[] args) {
        int[] arr = new int[5];
        System.out.println(arr[0]);
    }
}
```
- A) 0
- B) null
- C) Garbage value
- D) Compilation Error
**Correct Answer**: A
**Explanation**: In Java, elements of dynamically allocated primitive arrays on the heap are automatically initialized to their default values (numeric primitives default to `0`). In C, they contain uninitialized garbage memory unless zeroed via `calloc`.
**Topic**: Array Initialization
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q15
What is the output of this C code?
```c
#include <stdio.h>
int main() {
    int arr[] = {1, 2, 3, 4, 5};
    printf("%d", 2[arr]);
    return 0;
}
```
- A) Compilation Error
- B) 3
- C) 2
- D) Undefined Behavior
**Correct Answer**: B
**Explanation**: In C, array subscript notation `a[b]` is defined as `*(a + b)`. By the commutative property of pointer addition, `*(a + b) == *(b + a) == b[a]`. Therefore, `2[arr]` is completely valid C and accesses `arr[2] = 3`.
**Topic**: Pointers & Array Subscript
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q16
What will be the output of the following Python expression: `print(True + True * False)`?
- A) True
- B) 1
- C) 0
- D) 2
**Correct Answer**: B
**Explanation**: In Python, `bool` is a subclass of `int` where `True == 1` and `False == 0`. Multiplication has higher precedence: `True * False = 1 * 0 = 0`. Then `True + 0 = 1 + 0 = 1`.
**Topic**: Python Type Coercion
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q17
What is the output of the following C code?
```c
#include <stdio.h>
void solve() {
    static int count = 5;
    printf("%d ", count--);
    if (count != 0) solve();
}
int main() {
    solve();
    return 0;
}
```
- A) `5 4 3 2 1 `
- B) `5 5 5 5 5 `
- C) Infinite recursion
- D) `4 3 2 1 0 `
**Correct Answer**: A
**Explanation**: `static` variables persist across function invocations and are initialized only once when program loading begins. Successive recursive calls decrement the shared memory location: printing 5, 4, 3, 2, 1.
**Topic**: Storage Classes (`static`)
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q18
What does the following function compute for a non-negative integer $N$?
```c
int mystery(int n) {
    int count = 0;
    while (n) {
        count++;
        n &= (n - 1);
    }
    return count;
}
```
- A) Number of digits in $N$
- B) Number of set bits (1s) in the binary representation of $N$ (Brian Kernighan's Algorithm)
- C) $\log_2(N)$
- D) Factorial of $N$
**Correct Answer**: B
**Explanation**: Brian Kernighan's algorithm: `n &= (n - 1)` clears the lowest set bit in each iteration. The loop runs exactly as many times as there are set bits (1s) in $N$.
**Topic**: Bit Manipulation
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q19
What will be the output of this C code?
```c
#include <stdio.h>
#define SQUARE(x) x * x
int main() {
    int ans = SQUARE(2 + 3);
    printf("%d", ans);
    return 0;
}
```
- A) 25
- B) 11
- C) 13
- D) 16
**Correct Answer**: B
**Explanation**: Preprocessor macros perform literal textual substitution without parenthesization: `SQUARE(2 + 3)` expands to `2 + 3 * 2 + 3`. Evaluating by operator precedence: $2 + (3 \times 2) + 3 = 2 + 6 + 3 = 11$.
**Topic**: Preprocessor Macros
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q20
What is the output of the following Java snippet?
```java
public class StringTest {
    public static void main(String[] args) {
        String s = "DeltaX";
        s.concat(" Product");
        System.out.println(s);
    }
}
```
- A) `DeltaX Product`
- B) `DeltaX`
- C) `Product`
- D) Compilation Error
**Correct Answer**: B
**Explanation**: Java `String` objects are immutable. `concat()` creates and returns a brand-new String object, but since it is not reassigned back to `s`, `s` remains `"DeltaX"`.
**Topic**: String Immutability
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q21
What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    float x = 0.1f;
    if (x == 0.1) {
        printf("EQUAL");
    } else {
        printf("NOT EQUAL");
    }
    return 0;
}
```
- A) EQUAL
- B) NOT EQUAL
- C) Compilation Error
- D) Runtime Error
**Correct Answer**: B
**Explanation**: In C, `0.1f` is a single-precision 32-bit `float`, whereas unsuffixed `0.1` is a double-precision 64-bit `double`. Because 0.1 cannot be represented exactly in binary floating point, the 32-bit truncation and 64-bit expansion have different precision bits, evaluating `x == 0.1` to false!
**Topic**: Floating Point Precision Trap
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q22
What is printed by this Python slice: `"DeltaX Engineering"[::-2]`?
- A) `gieinEsae`
- B) `girenEsae`
- C) `gnirenigE XtlaD`
- D) `gnirX`
**Correct Answer**: B
**Explanation**: Negative step `-2` reverses the string taking every second character: characters from end: 'g', 'i', 'r', 'e', 'n', ' ', 'E', 's', 'a', 'e'.
**Topic**: Python Slicing
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q23
What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int i = 0;
    for (i = 0; i < 5; i++);
    printf("%d", i);
    return 0;
}
```
- A) `0 1 2 3 4`
- B) `5`
- C) `4`
- D) Compilation error
**Correct Answer**: B
**Explanation**: Notice the semicolon immediately following the `for` statement: `for (...);`. The loop body is empty. The loop executes until `i = 5`, terminates, and then `printf("%d", i)` prints 5.
**Topic**: Loop Traps & Semicolon
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q24
What does the `pass` statement do in Python?
- A) Exits the current function
- B) Skips the current iteration of a loop
- C) A null operation that serves as a syntactic placeholder where code is required but no action is taken
- D) Throws an exception
**Correct Answer**: C
**Explanation**: `pass` is a no-op placeholder in Python, ensuring syntactically valid empty functions, classes, or code blocks.
**Topic**: Python Syntax
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q25
What is the output of the following C program?
```c
#include <stdio.h>
int main() {
    int a = 1, b = 2, c = 3;
    int res = (a = b, b = c, c = 10);
    printf("%d %d %d %d", a, b, c, res);
    return 0;
}
```
- A) `2 3 10 10`
- B) `2 3 10 2`
- C) `1 2 3 10`
- D) `2 2 3 10`
**Correct Answer**: A
**Explanation**: The comma operator `,` evaluates expressions from left to right and yields the value of the rightmost expression. `a` becomes 2, `b` becomes 3, `c` becomes 10, and `res` receives 10.
**Topic**: Comma Operator
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q26
What will be the output of the following C code?
```c
#include <stdio.h>
int main() {
    int arr[] = {10, 20, 30, 40};
    int *p = arr;
    int x = *p++;
    int y = (*p)++;
    printf("%d %d %d", x, y, arr[1]);
    return 0;
}
```
- A) `10 20 21`
- B) `10 21 21`
- C) `10 20 20`
- D) `20 20 21`
**Correct Answer**: A
**Explanation**:
1. `x = *p++`: Evaluates `*p` (10), stores in `x`, then increments `p` to point to `arr[1]`.
2. `y = (*p)++`: Dereferences `p` (20), assigns 20 to `y`, then increments the value at that address (`arr[1]`) from 20 to 21.
3. `arr[1]` is now 21. Prints `10 20 21`.
**Topic**: Pointer Expressions
**Difficulty**: Hard
**Source Classification**: DIRECTLY REPORTED

---

### Q27
What is the space complexity of an in-place iterative algorithm that modifies an array of size $N$ using only 3 local integer tracking variables?
- A) $O(N)$
- B) $O(1)$
- C) $O(\log N)$
- D) $O(N^2)$
**Correct Answer**: B
**Explanation**: Auxiliary space measures memory used outside the input itself. 3 integer variables consume constant $O(1)$ memory.
**Topic**: Complexity Analysis
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q28
What is the time complexity of the following code snippet?
```python
def solve(n):
    i = 1
    while i < n:
        print(i)
        i = i * 2
```
- A) $O(N)$
- B) $O(N^2)$
- C) $O(\log N)$
- D) $O(1)$
**Correct Answer**: C
**Explanation**: The loop variable doubles in each iteration: $1, 2, 4, 8, \dots, 2^k$. The loop terminates when $2^k \ge n \implies k = \lceil\log_2 n\rceil$.
**Topic**: Asymptotic Complexity
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q29
What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int i = -1;
    unsigned int u = 1;
    if (i < u) {
        printf("LESS");
    } else {
        printf("GREATER");
    }
    return 0;
}
```
- A) LESS
- B) GREATER
- C) Compilation error
- D) Undefined Behavior
**Correct Answer**: B
**Explanation**: In C, when a signed integer is compared with an unsigned integer of the same rank, the signed integer is implicitly promoted to unsigned. The bit pattern of `-1` becomes `4,294,967,295` in unsigned 32-bit arithmetic, which is greater than 1! Prints `GREATER`.
**Topic**: Type Promotion & Signed/Unsigned Trap
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q30
What will be the output of the following Java snippet?
```java
public class EqualityTest {
    public static void main(String[] args) {
        Integer a = 100;
        Integer b = 100;
        Integer c = 200;
        Integer d = 200;
        System.out.println((a == b) + " " + (c == d));
    }
}
```
- A) `true true`
- B) `false false`
- C) `true false`
- D) `false true`
**Correct Answer**: C
**Explanation**: Java caches `Integer` objects within the byte range `[-128, 127]` via the Integer Cache. Thus, `a` and `b` reference the same cached object (`a == b` is true). Numbers outside this range (`200`) create distinct heap objects (`c == d` is false).
**Topic**: Java Integer Cache Trap
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q31
What is the output of this Python dictionary access?
```python
d = {1: "A", True: "B", 1.0: "C"}
print(len(d), d[1])
```
- A) `3 A`
- B) `1 C`
- C) `3 C`
- D) `2 B`
**Correct Answer**: B
**Explanation**: In Python, `hash(1) == hash(True) == hash(1.0)` and `1 == True == 1.0` evaluate to equal keys! Each entry overwrites the previous value at the same key slot. The dictionary has length 1 with value `"C"`.
**Topic**: Python Hashing & Equality
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q32
What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int x = 10;
    void *ptr = &x;
    printf("%d", *(int*)ptr);
    return 0;
}
```
- A) Compilation error
- B) 10
- C) Address of `x`
- D) Undefined Behavior
**Correct Answer**: B
**Explanation**: A `void*` is a generic pointer. It cannot be directly dereferenced without first casting to a concrete data pointer type (`(int*)ptr`). Casting and dereferencing outputs 10.
**Topic**: Void Pointers & Typecasting
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q33
What will be the output of the following C code?
```c
#include <stdio.h>
int main() {
    printf("%d", printf("DeltaX"));
    return 0;
}
```
- A) `DeltaX6`
- B) `DeltaX`
- C) `DeltaX5`
- D) `6DeltaX`
**Correct Answer**: A
**Explanation**: `printf()` returns the total number of characters successfully printed. The inner `printf("DeltaX")` prints "DeltaX" (6 characters) and returns 6, which the outer `printf("%d")` prints. Total: `DeltaX6`.
**Topic**: Standard Library Function Return Values
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q34
What is the output of the following recursive C code when called with `mystery(5)`?
```c
int mystery(int n) {
    if (n <= 1) return n;
    return mystery(n - 1) + mystery(n - 2);
}
```
- A) 5
- B) 8
- C) 13
- D) 3
**Correct Answer**: A
**Explanation**: This is the standard Fibonacci sequence: $F(0)=0, F(1)=1, F(2)=1, F(3)=2, F(4)=3, F(5)=5$.
**Topic**: Recursion (Fibonacci)
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q35
What is the time complexity of the naive recursive Fibonacci implementation in Q34?
- A) $O(N)$
- B) $O(N^2)$
- C) $O(2^N)$
- D) $O(\log N)$
**Correct Answer**: C
**Explanation**: Each call spawns two recursive sub-calls, generating a binary recursion tree of depth $N$. Total operations grow exponentially as $O(2^N)$ or $O(1.618^N)$.
**Topic**: Asymptotic Complexity
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q36
What will happen in C++ if dynamic memory allocated with `new[]` is deallocated using `delete` instead of `delete[]`?
- A) Correct deallocation with no errors
- B) Undefined Behavior; typically only the first array element's destructor is invoked, leaking memory for remaining objects
- C) Automatic garbage collection
- D) Compilation Error
**Correct Answer**: B
**Explanation**: In C++, `delete[]` tells the runtime to read the array header to determine array size and call destructors for all array elements. Using scalar `delete` leads to Undefined Behavior.
**Topic**: Dynamic Memory Management
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q37
What is the output of the following Java snippet?
```java
public class StringConcat {
    public static void main(String[] args) {
        System.out.println(10 + 20 + "Delta" + 10 + 20);
    }
}
```
- A) `30Delta30`
- B) `30Delta1020`
- C) `1020Delta1020`
- D) `1020Delta30`
**Correct Answer**: B
**Explanation**: Evaluated left to right: `10 + 20` is numeric addition = `30`. `30 + "Delta"` promotes to string concatenation = `"30Delta"`. Then `"30Delta" + 10` becomes `"30Delta10"`, and `"30Delta10" + 20` becomes `"30Delta1020"`.
**Topic**: Operator Overloading & Type Coercion
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q38
What is the output of the following Python expression: `bool([]) + bool([0])`?
- A) 0
- B) 1
- C) 2
- D) False
**Correct Answer**: B
**Explanation**: An empty list `[]` evaluates to falsy (`bool([]) == False == 0`). A non-empty list `[0]` evaluates to truthy (`bool([0]) == True == 1`), regardless of its internal elements. $0 + 1 = 1$.
**Topic**: Python Truthiness
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q39
In C/C++, where are local variables declared inside a function stored?
- A) Heap
- B) Stack
- C) Data Segment (BSS)
- D) Code Segment
**Correct Answer**: B
**Explanation**: Local variables with automatic storage duration are allocated on the function's stack frame and freed automatically when the function returns.
**Topic**: Memory Architecture
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q40
Where is memory allocated via `malloc()` or Java's `new` keyword stored?
- A) Stack
- B) Heap
- C) Text Segment
- D) CPU Register
**Correct Answer**: B
**Explanation**: Dynamically requested runtime memory is allocated in the process heap and must be manually deallocated (in C/C++) or garbage-collected (in Java).
**Topic**: Memory Architecture
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q41
What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int x = 0;
    if (x = 0) {
        printf("YES");
    } else {
        printf("NO");
    }
    return 0;
}
```
- A) YES
- B) NO
- C) Compilation Error
- D) Undefined Behavior
**Correct Answer**: B
**Explanation**: `x = 0` is an assignment, not an equality comparison (`==`). It assigns 0 to `x` and evaluates to 0 (false), directing execution to the `else` block, printing `NO`.
**Topic**: Assignment vs Equality Trap
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q42
What is the return value of `sizeof('a')` in C versus C++?
- A) 1 in both C and C++
- B) 4 (or `sizeof(int)`) in C; 1 in C++
- C) 1 in C; 4 in C++
- D) 2 in both
**Correct Answer**: B
**Explanation**: In C, character literals have type `int` (4 bytes). In C++, character literals have type `char` (1 byte).
**Topic**: Language Differences (C vs C++)
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q43
What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int i = 5;
    int *p = &i;
    int **pp = &p;
    printf("%d", **pp);
    return 0;
}
```
- A) Address of `i`
- B) Address of `p`
- C) 5
- D) Compilation Error
**Correct Answer**: C
**Explanation**: `pp` is a pointer to a pointer. Dereferencing once (`*pp`) yields pointer `p`. Dereferencing twice (`**pp`) yields the value stored at `p`, which is 5.
**Topic**: Double Pointers
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q44
What is the time complexity of searching for an element in an unsorted array of size $N$ using Linear Search?
- A) $O(1)$
- B) $O(\log N)$
- C) $O(N)$
- D) $O(N \log N)$
**Correct Answer**: C
**Explanation**: In the worst case, the target element is at the very end or absent, requiring inspection of all $N$ elements.
**Topic**: Complexity Analysis
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q45
What is the time complexity of Binary Search on a sorted array of size $N$?
- A) $O(N)$
- B) $O(\log N)$
- C) $O(1)$
- D) $O(N^2)$
**Correct Answer**: B
**Explanation**: Binary Search halves the remaining search interval in each step: $N \rightarrow N/2 \rightarrow N/4 \dots \implies O(\log_2 N)$.
**Topic**: Complexity Analysis
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q46
What is the output of the following Java snippet?
```java
public class ModuloTest {
    public static void main(String[] args) {
        System.out.println(-7 % 3);
    }
}
```
- A) 2
- B) -1
- C) 1
- D) -2
**Correct Answer**: B
**Explanation**: In Java and C, the remainder operator `%` preserves the sign of the dividend (numerator): $-7 = 3 \times (-2) + (-1)$, yielding `-1`. (In Python, `%` takes the sign of the divisor, returning 2).
**Topic**: Arithmetic Operator Quirks
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q47
What is the output of the Python expression: `-7 % 3`?
- A) -1
- B) 2
- C) 1
- D) -2
**Correct Answer**: B
**Explanation**: Python's modulo operator uses floor division ($a \pmod n = a - n \times \lfloor a/n \rfloor$). $\lfloor -7/3 \rfloor = -3$. $-7 - (3 \times -3) = -7 + 9 = 2$.
**Topic**: Python Modulo Semantics
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q48
What will be the output of the following C code?
```c
#include <stdio.h>
int main() {
    int arr[3] = {10, 20, 30};
    printf("%d", *arr + 1);
    return 0;
}
```
- A) 20
- B) 11
- C) 30
- D) Address of `arr[1]`
**Correct Answer**: B
**Explanation**: Dereference `*` has higher operator precedence than addition `+`. `*arr` evaluates to `arr[0] = 10`. Then $10 + 1 = 11$. (If it were `*(arr + 1)`, it would print 20).
**Topic**: Pointer Operator Precedence
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q49
What is the value of `x` after executing this C loop?
```c
int x = 0;
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) continue;
    x += i;
}
```
- A) 20
- B) 25
- C) 45
- D) 30
**Correct Answer**: B
**Explanation**: When `i` is even (`0, 2, 4, 6, 8`), the iteration is skipped. `x` sums odd numbers: $1 + 3 + 5 + 7 + 9 = 25$.
**Topic**: Loops & Conditionals
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q50
What is the effect of the `const` keyword when applied as: `const int *ptr`?
- A) The pointer `ptr` cannot be changed to point to another address
- B) The integer value pointed to by `ptr` cannot be modified through `ptr`
- C) Both the pointer address and value are constant
- D) The pointer is stored in read-only RAM
**Correct Answer**: B
**Explanation**: Reading right-to-left: `ptr is a pointer to an int that is const`. The target data is read-only, but the pointer itself can be reassigned. (In contrast, `int * const ptr` is a constant pointer).
**Topic**: Const Correctness
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q51
What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int a = 10;
    int b = sizeof(a++);
    printf("%d %d", a, b);
    return 0;
}
```
- A) `11 4`
- B) `10 4`
- C) `11 2`
- D) `10 8`
**Correct Answer**: B
**Explanation**: `sizeof` is a compile-time operator. Expressions inside `sizeof()` are NOT evaluated at runtime. Therefore, `a++` is never executed; `a` remains 10, and `b` is 4.
**Topic**: Compile-Time Operators
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q52
What is the output of the following Python snippet?
```python
a = (1,)
b = (1)
print(type(a), type(b))
```
- A) `<class 'tuple'> <class 'tuple'>`
- B) `<class 'tuple'> <class 'int'>`
- C) `<class 'int'> <class 'int'>`
- D) Syntax Error
**Correct Answer**: B
**Explanation**: In Python, parentheses without a trailing comma are treated as arithmetic grouping. To declare a single-element tuple, a trailing comma is required: `(1,)`.
**Topic**: Python Tuples
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q53
What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int x = 1;
    switch(x) {
        case 1:
            int y = 20; // in C99/C11
            printf("%d", y);
            break;
        default:
            printf("DEF");
    }
    return 0;
}
```
- A) 20
- B) Compilation error in many C compilers without block scoping
- C) DEF
- D) Undefined Behavior
**Correct Answer**: B
**Explanation**: In C, jumping across variable initialization within a switch statement without an enclosing scope block (`{}`) causes a compilation error.
**Topic**: Switch Scope Rules
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q54
What is the result of `10 ^ 10` in Java/C/C++?
- A) 100
- B) 0
- C) 20
- D) 1
**Correct Answer**: B
**Explanation**: In C/Java, `^` is bitwise XOR, not exponentiation! Any number XORed with itself equals 0 ($x \oplus x = 0$).
**Topic**: Bitwise Operators
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q55
What will be the output of this C program?
```c
#include <stdio.h>
int main() {
    char s[] = "%d\n";
    printf(s, 100);
    return 0;
}
```
- A) Compilation error
- B) `%d\n`
- C) `100`
- D) Undefined Behavior
**Correct Answer**: C
**Explanation**: `printf()` accepts any `const char*` format string. `s` points to `"%d\n"`, which formats the integer argument 100, printing `100`.
**Topic**: Format Strings
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q56
What is the output of this Python list comprehension: `[x for x in range(5) if x % 2 == 0]`?
- A) `[0, 2, 4]`
- B) `[2, 4]`
- C) `[1, 3]`
- D) `[0, 1, 2, 3, 4]`
**Correct Answer**: A
**Explanation**: `range(5)` generates integers 0, 1, 2, 3, 4. Even numbers are 0, 2, 4.
**Topic**: Python List Comprehensions
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q57
What will be the output of the following C code?
```c
#include <stdio.h>
void func(int *p) {
    p = NULL;
}
int main() {
    int x = 10;
    int *ptr = &x;
    func(ptr);
    printf("%d", *ptr);
    return 0;
}
```
- A) 10
- B) Segmentation Fault
- C) 0
- D) Compilation Error
**Correct Answer**: A
**Explanation**: In C, pointers are passed by value! `func()` receives a copy of the pointer `ptr`. Setting `p = NULL` inside `func` only modifies the local parameter copy; the original `ptr` in `main` remains unchanged and still points to `x`.
**Topic**: Pointers Passed by Value
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q58
How can you modify the pointer itself inside a function in C?
- A) Pass the pointer by value
- B) Pass a pointer to the pointer (double pointer `int **pp`)
- C) Use the `const` keyword
- D) Declare the pointer as static
**Correct Answer**: B
**Explanation**: Passing `&ptr` as a double pointer allows the function to dereference `*pp = NULL`, modifying the caller's pointer variable directly.
**Topic**: Double Pointers
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q59
What is the output of this Java snippet?
```java
public class Test {
    public static void main(String[] args) {
        boolean b1 = true;
        boolean b2 = false;
        if (b1 = b2) {
            System.out.println("TRUE");
        } else {
            System.out.println("FALSE");
        }
    }
}
```
- A) TRUE
- B) FALSE
- C) Compilation Error
- D) Runtime Exception
**Correct Answer**: B
**Explanation**: Unlike numeric types where assignment in `if` conditions is a compilation error in Java, boolean assignment `b1 = b2` is valid and evaluates to the assigned boolean value (`false`), executing the `else` block.
**Topic**: Boolean Assignment Trap
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q60
What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int a = 1;
    printf("%d %d %d", a, ++a, a++);
    return 0;
}
```
- A) `1 2 3`
- B) `3 3 1`
- C) Undefined / Unspecified behavior in C
- D) `1 2 1`
**Correct Answer**: C
**Explanation**: The order of evaluation of function arguments in C is unspecified by the standard; passing multiple expressions that mutate the same variable (`a`, `++a`, `a++`) invokes Undefined/Unspecified Behavior.
**Topic**: Sequence Points & Argument Evaluation
**Difficulty**: Hard
**Source Classification**: DIRECTLY REPORTED

---

### Q61
What is the output of the Python expression: `bool("False")`?
- A) False
- B) True
- C) None
- D) Error
**Correct Answer**: B
**Explanation**: Any non-empty string in Python evaluates to truthy `True`, even if the string content is `"False"` or `"0"`. Only empty strings `""` evaluate to `False`.
**Topic**: Python Truthiness
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q62
What does `calloc(n, size)` do differently compared to `malloc(n * size)` in C?
- A) `calloc` is allocated on the stack
- B) `calloc` zeroes out all allocated memory bytes to 0; `malloc` leaves memory uninitialized with garbage values
- C) `calloc` cannot be freed
- D) `malloc` is slower
**Correct Answer**: B
**Explanation**: `calloc` (contiguous allocation) initializes all allocated bytes to zero.
**Topic**: Dynamic Memory Allocation
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q63
What is the output of the following C snippet?
```c
#include <stdio.h>
int main() {
    int x = 10;
    int y = 20;
    x = x ^ y;
    y = x ^ y;
    x = x ^ y;
    printf("%d %d", x, y);
    return 0;
}
```
- A) `10 20`
- B) `20 10`
- C) `0 0`
- D) `30 30`
**Correct Answer**: B
**Explanation**: This is the classic XOR swap algorithm: it swaps two variables in-place without using a temporary variable.
**Topic**: Bit Manipulation
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q64
What is the output of the following Java program?
```java
public class ScopeTest {
    static int x = 10;
    public static void main(String[] args) {
        int x = 20;
        System.out.println(x + ScopeTest.x);
    }
}
```
- A) 40
- B) 30
- C) 20
- D) Compilation Error
**Correct Answer**: B
**Explanation**: The local variable `x = 20` shadows the class-level static variable `x = 10`. Accessing `ScopeTest.x` explicitly retrieves the static variable. $20 + 10 = 30$.
**Topic**: Variable Shadowing
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q65
What will be the output of this Python code?
```python
x = 10
def change():
    global x
    x = 20
change()
print(x)
```
- A) 10
- B) 20
- C) UnboundLocalError
- D) None
**Correct Answer**: B
**Explanation**: The `global` keyword binds the identifier `x` inside the local function scope to the module-level global variable, updating it to 20.
**Topic**: Python Scope
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q66
What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int arr[5] = {0};
    printf("%d %d", arr[0], arr[4]);
    return 0;
}
```
- A) `0 0`
- B) `0` followed by garbage
- C) Garbage values for both
- D) Compilation Error
**Correct Answer**: A
**Explanation**: Initializing an array with `{0}` sets the first element to 0, and the C standard mandates that all remaining unmentioned elements are automatically zero-initialized.
**Topic**: Array Initialization
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q67
What is the return value of `strcmp("apple", "banana")` in C?
- A) 0
- B) A negative integer
- C) A positive integer
- D) 1
**Correct Answer**: B
**Explanation**: `strcmp()` compares ASCII values character by character. `'a'` ($97$) is less than `'b'` ($98$), so it returns a negative value ($< 0$).
**Topic**: String Library Functions
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q68
What is the output of the following C program?
```c
#include <stdio.h>
int main() {
    int i = 0;
    do {
        i++;
    } while (i < 0);
    printf("%d", i);
    return 0;
}
```
- A) 0
- B) 1
- C) Infinite loop
- D) -1
**Correct Answer**: B
**Explanation**: A `do-while` loop executes its body at least once before testing the condition. `i` increments to 1, then `1 < 0` is false, terminating the loop and printing 1.
**Topic**: Loops & Control Flow
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q69
What is the output of this Python snippet?
```python
print("DeltaX" * 2)
```
- A) DeltaXDeltaX
- B) TypeError
- C) DeltaX 2
- D) SyntaxError
**Correct Answer**: A
**Explanation**: The `*` operator on strings performs sequence repetition, duplicating `"DeltaX"` twice.
**Topic**: Python Operators
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q70
What will happen in C if you attempt to access an array out of bounds (e.g., `int a[5]; a[10] = 50;`)?
- A) An `ArrayIndexOutOfBoundsException` is thrown
- B) Undefined Behavior (it may overwrite adjacent memory, crash with SIGSEGV, or appear to work silently)
- C) The array automatically resizes
- D) The compiler throws a syntax error
**Correct Answer**: B
**Explanation**: C does not perform runtime array bounds checking. Accessing out-of-bounds indices invokes Undefined Behavior.
**Topic**: Memory Safety
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q71
What is the output of this Java code?
```java
public class StringPool {
    public static void main(String[] args) {
        String s1 = new String("Delta").intern();
        String s2 = "Delta";
        System.out.println(s1 == s2);
    }
}
```
- A) true
- B) false
- C) Compilation Error
- D) Runtime Exception
**Correct Answer**: A
**Explanation**: `intern()` returns the canonical reference from the String Constant Pool. Since `s2` also points to the pooled literal, `s1 == s2` is `true`.
**Topic**: String Interning
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q72
What is the output of the following C program?
```c
#include <stdio.h>
int main() {
    char *ptr = "DeltaX";
    printf("%c", *&*ptr);
    return 0;
}
```
- A) D
- B) Address of ptr
- C) DeltaX
- D) Compilation Error
**Correct Answer**: A
**Explanation**: `*ptr` evaluates to `'D'`. `&*ptr` retrieves the address of that character. Dereferencing again `*&*ptr` cancels out to `'D'`.
**Topic**: Pointer Mechanics
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q73
What is the output of the following Python code?
```python
a = [1, 2, 3]
b = a.copy()
print(a is b, a == b)
```
- A) `True True`
- B) `False True`
- C) `True False`
- D) `False False`
**Correct Answer**: B
**Explanation**: `copy()` creates a new independent object in memory, so identity check `a is b` is `False`. However, both lists contain identical elements, so equality check `a == b` is `True`.
**Topic**: Python Identity vs Equality
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q74
What is the value of `x` after: `int x = 5 >> 1;` in C/Java?
- A) 10
- B) 2
- C) 2.5
- D) 1
**Correct Answer**: B
**Explanation**: Right-shift by 1 performs integer floor division by 2: $\lfloor 5 / 2 \rfloor = 2$.
**Topic**: Bitwise Operators
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q75
What is the output of the following C program?
```c
#include <stdio.h>
int main() {
    int a = 10;
    if (a) {
        printf("NONZERO");
    } else {
        printf("ZERO");
    }
    return 0;
}
```
- A) NONZERO
- B) ZERO
- C) Compilation Error
- D) Undefined
**Correct Answer**: A
**Explanation**: In C, any non-zero integer evaluates to logical true in conditional statements.
**Topic**: Conditionals & Truthiness
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q76
What is the effect of the `register` storage class specifier in C?
- A) Stores the variable on the hard drive
- B) Hints to the compiler to store the variable in a CPU register for fast access, and prohibits taking its address via the `&` operator
- C) Makes the variable global
- D) Synchronizes across threads
**Correct Answer**: B
**Explanation**: The `register` keyword suggests register allocation; because registers lack memory addresses, taking `&var` on a register variable is a compilation error in C.
**Topic**: Storage Classes
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q77
What is the output of the following Java snippet?
```java
public class FinallyTest {
    public static int test() {
        try {
            return 1;
        } finally {
            return 2;
        }
    }
    public static void main(String[] args) {
        System.out.println(test());
    }
}
```
- A) 1
- B) 2
- C) Compilation error
- D) Runtime exception
**Correct Answer**: B
**Explanation**: The `finally` block ALWAYS executes before method exit, and returning from inside `finally` overrides any pending return value from the `try` block.
**Topic**: Exception Handling & Finally Trap
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q78
What is the output of the Python expression: `type(lambda x: x)`?
- A) `<class 'function'>`
- B) `<class 'lambda'>`
- C) `<class 'closure'>`
- D) Error
**Correct Answer**: A
**Explanation**: In Python, anonymous lambda functions are instances of the standard `function` class.
**Topic**: Python Functions
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q79
What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int i = 5;
    while (i --> 0) {
        printf("%d ", i);
    }
    return 0;
}
```
- A) `4 3 2 1 0 `
- B) `5 4 3 2 1 `
- C) `5 4 3 2 1 0 `
- D) Compilation Error
**Correct Answer**: A
**Explanation**: The "goes to" operator `-->` is actually two tokens: post-decrement `i--` and comparison `> 0`. It evaluates `i > 0`, then decrements `i`. For $i=5$, condition is true, $i$ becomes 4, prints 4, and so on until 0.
**Topic**: Operator Syntax Tricks
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q80
What will be the output of this C code?
```c
#include <stdio.h>
int main() {
    int arr[2][2] = {{1, 2}, {3, 4}};
    printf("%d", *(*arr + 1));
    return 0;
}
```
- A) 1
- B) 2
- C) 3
- D) 4
**Correct Answer**: B
**Explanation**: `arr` decays to pointer to row 0. `*arr` is pointer to `arr[0][0]`. `*arr + 1` points to `arr[0][1]`. Dereferencing yields `2`.
**Topic**: 2D Arrays & Pointers
**Difficulty**: Hard
**Source Classification**: DIRECTLY REPORTED

---

### Q81
What is the output of the following Python snippet?
```python
s = {1, 2, 2, 3, 3, 3}
print(len(s))
```
- A) 6
- B) 3
- C) 1
- D) TypeError
**Correct Answer**: B
**Explanation**: A Python `set` automatically deduplicates identical elements, retaining `{1, 2, 3}` (length 3).
**Topic**: Python Sets
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q82
What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int x = 2;
    switch(x) {
        default: printf("DEF ");
        case 1: printf("ONE "); break;
        case 2: printf("TWO ");
        case 3: printf("THREE "); break;
    }
    return 0;
}
```
- A) `TWO THREE `
- B) `TWO `
- C) `DEF ONE `
- D) `DEF TWO THREE `
**Correct Answer**: A
**Explanation**: `x = 2` jumps directly to `case 2:`, prints "TWO ", falls through to `case 3:` (because no break was present in case 2), prints "THREE ", and then hits `break`.
**Topic**: Switch Statement Fall-Through
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q83
What is the output of the following Java snippet?
```java
public class ShiftTest {
    public static void main(String[] args) {
        System.out.println(-1 >>> 24);
    }
}
```
- A) -1
- B) 255
- C) 0
- D) 16777215
**Correct Answer**: B
**Explanation**: `>>>` is Java's unsigned right shift. `-1` in 32-bit two's complement is `0xFFFFFFFF`. Shifting right by 24 bits inserts 24 leading zeroes, leaving `0x000000FF` = 255.
**Topic**: Bitwise Operators
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q84
What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int a = 5;
    void *p = &a;
    int *q = (int*)p;
    printf("%d", *q);
    return 0;
}
```
- A) 5
- B) Address of a
- C) Garbage
- D) Compilation error
**Correct Answer**: A
**Explanation**: Void pointer `p` successfully holds address of `a`. Casting back to `int*` in `q` and dereferencing cleanly returns 5.
**Topic**: Pointers
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q85
What is the output of this Python code?
```python
print([i for i in range(3)] == list(range(3)))
```
- A) True
- B) False
- C) Error
- D) None
**Correct Answer**: A
**Explanation**: Both expressions construct identical lists: `[0, 1, 2]`.
**Topic**: Python Sequences
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q86
What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    char c = 255;
    if (c == -1) {
        printf("YES");
    } else {
        printf("NO");
    }
    return 0;
}
```
- A) YES (on architectures where char is signed)
- B) NO
- C) Compilation error
- D) Undefined
**Correct Answer**: A
**Explanation**: In most x86/ARM compilers where `char` defaults to signed 8-bit, 255 in binary is `11111111`, which represents `-1` in two's complement. Promoting `c` to `int` sign-extends to `-1`, printing `YES`.
**Topic**: Signed/Unsigned Char Trap
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q87
What will be the output of the following C code?
```c
#include <stdio.h>
int main() {
    int x = 10, y = 20;
    printf("%d", x > y ? x : y);
    return 0;
}
```
- A) 10
- B) 20
- C) 0
- D) 1
**Correct Answer**: B
**Explanation**: The ternary operator evaluates `10 > 20` (false), returning the expression after `:`, which is `y = 20`.
**Topic**: Ternary Operator
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q88
What will be the output of this Python snippet?
```python
def f(x, y=2, z=3):
    return x + y + z
print(f(1, z=10))
```
- A) 13
- B) 15
- C) 16
- D) TypeError
**Correct Answer**: A
**Explanation**: `x=1`, `z=10` is passed as a keyword argument, and `y` takes its default value of 2. $1 + 2 + 10 = 13$.
**Topic**: Python Default and Keyword Arguments
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q89
What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int i = 0;
    for (; i < 3; ++i) {
        printf("%d", i);
    }
    return 0;
}
```
- A) 012
- B) 123
- C) 0123
- D) Infinite loop
**Correct Answer**: A
**Explanation**: The loop initializes `i = 0`, executes body printing 0, increments to 1, prints 1, increments to 2, prints 2, increments to 3, and terminates. Prints `012`.
**Topic**: Loops
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q90
What does the Python `zip()` function do when passed two lists of unequal length: `[1, 2]` and `['a', 'b', 'c']`?
- A) Throws ValueError
- B) Pads the shorter list with `None`
- C) Truncates to the length of the shortest iterable, yielding pairs `(1, 'a')` and `(2, 'b')`
- D) Reverses the lists
**Correct Answer**: C
**Explanation**: Standard `zip()` stops generating tuples as soon as the shortest input iterable is exhausted.
**Topic**: Python Built-in Functions
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q91
What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int a = 0;
    if (!a) {
        printf("ZERO");
    } else {
        printf("NONZERO");
    }
    return 0;
}
```
- A) ZERO
- B) NONZERO
- C) Compilation error
- D) Undefined
**Correct Answer**: A
**Explanation**: `!0` evaluates to logical true (1), executing the `if` branch and printing `ZERO`.
**Topic**: Logical NOT Operator
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q92
What is the output of the following Java snippet?
```java
public class Test {
    public static void main(String[] args) {
        int x = 5;
        System.out.println(x > 2 ? x < 4 ? 10 : 20 : 30);
    }
}
```
- A) 10
- B) 20
- C) 30
- D) Compilation Error
**Correct Answer**: B
**Explanation**: Ternary operators associate right-to-left: `x > 2 ? (x < 4 ? 10 : 20) : 30`. Since `x = 5`, `x > 2` is true. Then `x < 4` is false, returning 20.
**Topic**: Nested Ternary Operators
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q93
What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int x = 7;
    printf("%d", x & -x);
    return 0;
}
```
- A) 1
- B) 0
- C) 7
- D) -7
**Correct Answer**: A
**Explanation**: `x & -x` extracts the lowest set bit (rightmost 1) of integer `x`. $7 = 0111_2$. $-7 = 1001_2$. $0111 \& 1001 = 0001_2 = 1$.
**Topic**: Bit Manipulation
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q94
What is the output of the following Python expression: `round(2.5)` versus `round(3.5)` in Python 3?
- A) 3 and 4
- B) 2 and 4
- C) 2 and 3
- D) 3 and 3
**Correct Answer**: B
**Explanation**: Python 3 uses "Banker's Rounding" (round half to even). When a number is equidistant between two integers, it rounds to the nearest **even** integer! `round(2.5)` rounds to 2; `round(3.5)` rounds to 4.
**Topic**: Python Rounding Mechanics
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q95
What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int x = 1;
    do {
        printf("%d ", x++);
    } while (x <= 3);
    return 0;
}
```
- A) `1 2 3 `
- B) `1 2 `
- C) `2 3 4 `
- D) `1 2 3 4 `
**Correct Answer**: A
**Explanation**:
- Iteration 1: prints 1, $x$ becomes 2. $2 \le 3$ (true).
- Iteration 2: prints 2, $x$ becomes 3. $3 \le 3$ (true).
- Iteration 3: prints 3, $x$ becomes 4. $4 \le 3$ (false, exits).
Output: `1 2 3 `.
**Topic**: Loops
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q96
What is the output of this Java code?
```java
public class BitShift {
    public static void main(String[] args) {
        System.out.println(1 << 31);
    }
}
```
- A) $2,147,483,648$
- B) $-2,147,483,648$
- C) 0
- D) Compilation Error
**Correct Answer**: B
**Explanation**: In 32-bit signed integers, bit 31 is the sign bit. Shifting 1 to position 31 creates `0x80000000`, which represents `Integer.MIN_VALUE` ($-2^{31} = -2,147,483,648$).
**Topic**: Bitwise Arithmetic & Overflow
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q97
What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int a = 10, b = 20;
    a = a + b - (b = a);
    printf("%d %d", a, b);
    return 0;
}
```
- A) `20 10`
- B) Undefined Behavior in C
- C) `10 20`
- D) `30 10`
**Correct Answer**: B
**Explanation**: In C, modifying `b` inside `(b = a)` while simultaneously reading `b` in the same unsequenced expression invokes Undefined Behavior.
**Topic**: Sequence Points
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q98
What will be the output of this Python code?
```python
x = {1, 2, 3}
x.add((4, 5))
print(len(x))
```
- A) 4
- B) 5
- C) TypeError: unhashable type
- D) 3
**Correct Answer**: A
**Explanation**: Tuples are immutable and therefore hashable in Python. The entire tuple `(4, 5)` is added as a single element, making the set `{1, 2, 3, (4, 5)}` with length 4.
**Topic**: Python Hashability
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q99
What happens if you attempt to add a list to a Python set: `s.add([1, 2])`?
- A) The elements 1 and 2 are added
- B) A `TypeError: unhashable type: 'list'` is raised
- C) The list is converted to a string
- D) The list is added as an object
**Correct Answer**: B
**Explanation**: Lists in Python are mutable and do not implement `__hash__`, so they cannot be stored in sets or used as dictionary keys.
**Topic**: Python Hashability
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q100
What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int i = 0;
    for (i = 0; i < 3; i++) {
        switch(i) {
            case 0: printf("0"); break;
            case 1: printf("1"); continue;
            case 2: printf("2"); break;
        }
        printf("-");
    }
    return 0;
}
```
- A) `0-1-2-`
- B) `0-12-`
- C) `012---`
- D) `0-1-2`
**Correct Answer**: B
**Explanation**:
- $i=0$: matches `case 0:`, prints "0", breaks switch, prints "-", output: "0-".
- $i=1$: matches `case 1:`, prints "1", executes `continue` (which continues the OUTER FOR LOOP directly, skipping `printf("-")`!), output: "0-1".
- $i=2$: matches `case 2:`, prints "2", breaks switch, prints "-", output: "0-12-".
**Topic**: Loops, Switch & Continue Interaction
**Difficulty**: Hard
**Source Classification**: DIRECTLY REPORTED
