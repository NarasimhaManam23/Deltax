# DeltaX Round 1 Full Mock Test 4

**Instructions**:
* **Duration**: 45 Minutes (54 seconds/question)
* **Total Questions**: 50 MCQs
* **Marking Scheme**: +1 for correct, 0 for incorrect/unattempted
* **Subject Breakdown**: Programming (14), DSA (12), Networks (8), Microprocessors (6), Cybersecurity (4), DBMS/OS/OOP (6).
* **Answers**: Located in `answer_keys_and_scoring.md`.

---

### SECTION 1: PROGRAMMING FUNDAMENTALS (Q1 – Q14)

**Q1**: What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int x = 2;
    printf("%d", x << 2);
    return 0;
}
```
- A) 4
- B) 8
- C) 16
- D) 2

**Q2**: What will be the output of this Python code?
```python
d = {"a": 1, "b": 2}
print(d.get("c", 3))
```
- A) None
- B) KeyError
- C) 3
- D) 0

**Q3**: What will be printed by the following C program?
```c
#include <stdio.h>
int main() {
    int arr[] = {10, 20, 30};
    int *p = arr;
    printf("%d", *p++);
    return 0;
}
```
- A) 10
- B) 20
- C) 30
- D) Address of arr[0]

**Q4**: What will be the output of this Java code?
```java
public class Loop {
    public static void main(String[] args) {
        int x = 5;
        while (x > 0) {
            x--;
            if (x == 2) continue;
            System.out.print(x + " ");
        }
    }
}
```
- A) `4 3 2 1 0 `
- B) `4 3 1 0 `
- C) `5 4 3 1 0 `
- D) `4 3 1 `

**Q5**: What is the return value of `power(2, 3)`?
```c
int power(int base, int exp) {
    if (exp == 0) return 1;
    return base * power(base, exp - 1);
}
```
- A) 6
- B) 8
- C) 9
- D) 16

**Q6**: What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int a = 1, b = 2;
    int c = (a++, b++, a + b);
    printf("%d", c);
    return 0;
}
```
- A) 3
- B) 5
- C) 4
- D) 2

**Q7**: What is printed by this C snippet?
```c
#include <stdio.h>
int main() {
    char str[] = "APE\0DeltaX";
    printf("%s", str);
    return 0;
}
```
- A) `APE`
- B) `APEDeltaX`
- C) `DeltaX`
- D) Empty string

**Q8**: What will be the output of this Python snippet?
```python
s = "DeltaX"
print(s[0:4])
```
- A) `Delt`
- B) `Delta`
- C) `elta`
- D) `el`

**Q9**: What is the value of `res` after: `int res = 10 > 5 && 5 < 2;`?
- A) 1
- B) 0
- C) true
- D) 10

**Q10**: What does `malloc()` return in C when memory allocation fails?
- A) 0
- B) NULL
- C) -1
- D) Void

**Q11**: What is the output of the following Java snippet?
```java
public class StringTest {
    public static void main(String[] args) {
        String s = "Delta";
        s = s + "X";
        System.out.println(s);
    }
}
```
- A) `Delta`
- B) `DeltaX`
- C) `X`
- D) Compilation error

**Q12**: What is the output of the following C program?
```c
#include <stdio.h>
int main() {
    int x = 0;
    if (x == 0) {
        printf("A");
    } else if (x < 5) {
        printf("B");
    }
    return 0;
}
```
- A) A
- B) B
- C) AB
- D) Prints nothing

**Q13**: What is the output of this Python code?
```python
def add(x, y=10):
    return x + y
print(add(5))
```
- A) 15
- B) 5
- C) TypeError
- D) 10

**Q14**: What is the result of `5 & 3` in Java/C?
- A) 7
- B) 1
- C) 0
- D) 8

---

### SECTION 2: DATA STRUCTURES & ALGORITHMS (Q15 – Q26)

**Q15**: What is the worst-case time complexity of Selection Sort on an array of size $N$?
- A) $O(N)$
- B) $O(N \log N)$
- C) $O(N^2)$
- D) $O(1)$

**Q16**: What is the height of a balanced Binary Search Tree containing $N$ nodes?
- A) $O(N)$
- B) $O(\log N)$
- C) $O(1)$
- D) $O(N^2)$

**Q17**: Which data structure is used to implement Depth-First Search (DFS) iteratively?
- A) Queue
- B) Stack
- C) Hash Map
- D) Min-Heap

**Q18**: What is the time complexity of pushing an element onto a Stack of size $N$?
- A) $O(1)$
- B) $O(N)$
- C) $O(\log N)$
- D) $O(N^2)$

**Q19**: What is the time complexity of finding an element in an unsorted array of size $N$?
- A) $O(1)$
- B) $O(\log N)$
- C) $O(N)$
- D) $O(N \log N)$

**Q20**: In a Min-Heap, where is the minimum element always found?
- A) At the root
- B) At a leaf node
- C) In the middle
- D) At the last position

**Q21**: What is the time complexity of inserting a node at the tail of a Singly Linked List with only a `head` pointer?
- A) $O(1)$
- B) $O(N)$
- C) $O(\log N)$
- D) $O(N^2)$

**Q22**: What is the optimal time complexity to find the maximum sum contiguous subarray using Kadane's algorithm?
- A) $O(N^2)$
- B) $O(N \log N)$
- C) $O(N)$
- D) $O(1)$

**Q23**: What is the time complexity of the Two-Pointer technique for finding pairs with a target sum in an already sorted array?
- A) $O(N)$
- B) $O(N^2)$
- C) $O(N \log N)$
- D) $O(1)$

**Q24**: How many edges does a tree with $N$ vertices contain?
- A) $N$
- B) $N - 1$
- C) $N + 1$
- D) $2N$

**Q25**: What is the time complexity of Prim's algorithm for Minimum Spanning Tree using an adjacency list and binary min-heap?
- A) $O(V^2)$
- B) $O(E \log V)$
- C) $O(V \times E)$
- D) $O(V)$

**Q26**: What is the maximum number of nodes in a binary tree of height $h$ (where root height = 1)?
- A) $2^h$
- B) $2^h - 1$
- C) $2^{h-1}$
- D) $h^2$

---

### SECTION 3: COMPUTER NETWORKS (Q27 – Q34)

**Q27**: Which OSI layer is responsible for translating data between network formats and application formats (e.g., encryption, serialization)?
- A) Application Layer
- B) Presentation Layer
- C) Session Layer
- D) Transport Layer

**Q28**: What is the TCP 3-way handshake sequence?
- A) SYN $\rightarrow$ SYN-ACK $\rightarrow$ ACK
- B) ACK $\rightarrow$ SYN $\rightarrow$ ACK
- C) SYN $\rightarrow$ ACK $\rightarrow$ SYN
- D) FIN $\rightarrow$ ACK $\rightarrow$ FIN-ACK

**Q29**: What HTTP response status code indicates "Unauthorized" (missing credentials)?
- A) 400
- B) 401
- C) 403
- D) 404

**Q30**: What is the well-known port for unencrypted HTTP web traffic?
- A) 21
- B) 25
- C) 80
- D) 443

**Q31**: Which protocol dynamically assigns IP addresses to devices joining a network?
- A) DNS
- B) DHCP
- C) ARP
- D) ICMP

**Q32**: What is the size of a standard TCP header without options?
- A) 16 bytes
- B) 20 bytes
- C) 32 bytes
- D) 64 bytes

**Q33**: What does the Ping command use to test network connectivity?
- A) TCP SYN packets
- B) ICMP Echo Request and Echo Reply
- C) UDP datagrams
- D) ARP broadcasts

**Q34**: What is the local loopback IPv4 address?
- A) 0.0.0.0
- B) 127.0.0.1
- C) 192.168.1.1
- D) 255.255.255.255

---

### SECTION 4: MICROPROCESSORS & ARCHITECTURE (Q35 – Q40)

**Q35**: How many address lines are present on the Intel 8085 microprocessor?
- A) 8
- B) 16
- C) 20
- D) 32

**Q36**: Which 8085 interrupt is non-maskable?
- A) RST 7.5
- B) RST 6.5
- C) TRAP
- D) INTR

**Q37**: What is the restart vector address of `RST 7.5` in 8085?
- A) `003CH`
- B) `0034H`
- C) `002CH`
- D) `0024H`

**Q38**: Identify the addressing mode of `CMA` (Complement Accumulator) in 8085.
- A) Register Addressing
- B) Implicit / Implied Addressing
- C) Immediate Addressing
- D) Direct Addressing

**Q39**: In cache memory design, what type of miss occurs upon the first access to a block?
- A) Capacity Miss
- B) Conflict Miss
- C) Compulsory (Cold) Miss
- D) Coherence Miss

**Q40**: What is the function of the Accumulator in the 8085?
- A) Tracking instruction addresses
- B) Storing operands and receiving results of arithmetic and logical operations
- C) Counting clock cycles
- D) Managing the stack

---

### SECTION 5: CYBERSECURITY (Q41 – Q44)

**Q41**: What is the primary purpose of a Digital Signature?
- A) To compress data
- B) To provide authentication, non-repudiation, and integrity verification
- C) To hide IP addresses
- D) To speed up TLS connections

**Q42**: Which attack injects malicious SQL statements into web entry forms?
- A) Cross-Site Scripting
- B) SQL Injection
- C) Man-in-the-Middle
- D) Phishing

**Q43**: What is the primary difference between Hashing and Encryption?
- A) Hashing is one-way and irreversible; Encryption is two-way and reversible with a key
- B) Encryption is one-way
- C) Hashing requires a public key
- D) There is no difference

**Q44**: What does the `SameSite=Strict` cookie attribute protect against?
- A) SQL Injection
- B) Cross-Site Request Forgery (CSRF)
- C) Buffer Overflow
- D) Denial of Service

---

### SECTION 6: DBMS, OS & OOP (Q45 – Q50)

**Q45**: What is a Primary Key in a relational database table?
- A) A key that can contain duplicate values
- B) A column or set of columns that uniquely identifies each row and cannot be NULL
- C) A key that references another table
- D) A temporary table index

**Q46**: What does the SQL `GROUP BY` clause do?
- A) Sorts results in descending order
- B) Groups rows sharing common values into summary rows for aggregate functions
- C) Joins two tables on foreign keys
- D) Deletes duplicate rows

**Q47**: What is Context Switching in an operating system?
- A) Switching between browser windows
- B) Saving the CPU state of a running process and loading the saved state of another process to execute
- C) Moving a file to trash
- D) Recompiling a C program

**Q48**: What is Virtual Memory?
- A) RAM installed on a graphics card
- B) A memory management capability that provides an idealized abstraction of storage resources, allowing execution of processes larger than physical RAM
- C) Cloud storage
- D) Flash memory

**Q49**: What is Encapsulation in Object-Oriented Programming?
- A) Deriving child classes from a base class
- B) Bundling data and the methods that operate on that data into a single unit, restricting direct external access
- C) Overriding methods at runtime
- D) Calling constructors recursively

**Q50**: What is an Interface in OOP?
- A) A class that holds database connections
- B) A contract that defines method signatures without implementation that implementing classes must fulfill
- C) A graphical user interface (GUI)
- D) A private constructor
