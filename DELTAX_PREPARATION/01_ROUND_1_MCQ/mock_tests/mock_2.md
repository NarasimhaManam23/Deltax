# DeltaX Round 1 Full Mock Test 2

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
    int i = 5;
    printf("%d %d", i, ++i);
    return 0;
}
```
- A) `5 6`
- B) `6 6`
- C) Unspecified / Undefined Behavior in C standard
- D) `5 5`

**Q2**: What is the output of this Java code?
```java
public class Test {
    public static void main(String[] args) {
        int x = 10;
        int y = x > 5 ? (x < 15 ? 1 : 2) : 3;
        System.out.println(y);
    }
}
```
- A) 1
- B) 2
- C) 3
- D) Compilation Error

**Q3**: What will be the output of the following C code?
```c
#include <stdio.h>
int main() {
    int a[] = {1, 2, 3, 4};
    printf("%d", *(a + 2));
    return 0;
}
```
- A) 1
- B) 2
- C) 3
- D) 4

**Q4**: What will be printed by this C program?
```c
#include <stdio.h>
int main() {
    int x = 10, y = 20;
    if (x = 5 && y == 20) {
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
- D) Undefined

**Q5**: What is the return value of `foo(3, 2)`?
```c
int foo(int a, int b) {
    if (b == 0) return 0;
    return a + foo(a, b - 1);
}
```
- A) 5
- B) 6
- C) 9
- D) 1

**Q6**: What is the output of the following Python snippet?
```python
x = [1, 2, 3]
print(x * 2)
```
- A) `[2, 4, 6]`
- B) `[1, 2, 3, 1, 2, 3]`
- C) `[[1, 2, 3], [1, 2, 3]]`
- D) TypeError

**Q7**: What is printed by this C snippet?
```c
#include <stdio.h>
int main() {
    int a = 0;
    for (; a < 3; a++);
    printf("%d", a);
    return 0;
}
```
- A) 2
- B) 3
- C) 0
- D) Compilation error

**Q8**: What will be the output of the following C program?
```c
#include <stdio.h>
int main() {
    char *p = "DeltaX";
    printf("%c", *p + 1);
    return 0;
}
```
- A) `e`
- B) `E`
- C) `D`
- D) `eltaX`

**Q9**: What is the output of the Python expression: `print(bool(0), bool(-1), bool(""))`?
- A) `False True False`
- B) `False False False`
- C) `False True True`
- D) `True True False`

**Q10**: What does `sizeof(char)` evaluate to in C?
- A) 1
- B) 2
- C) 4
- D) Platform-dependent

**Q11**: What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int x = 7;
    int count = 0;
    while (x) {
        count += (x & 1);
        x >>= 1;
    }
    printf("%d", count);
    return 0;
}
```
- A) 1
- B) 2
- C) 3
- D) 7

**Q12**: What is the output of the following Java snippet?
```java
String s1 = "APE";
String s2 = "APE";
System.out.println(s1 == s2);
```
- A) true
- B) false
- C) Compilation Error
- D) Runtime Exception

**Q13**: What is the value of `x` after: `int x = 16 >> 2;`?
- A) 64
- B) 4
- C) 8
- D) 2

**Q14**: What is the output of the following C program?
```c
#include <stdio.h>
void func() {
    static int x = 0;
    x++;
    printf("%d ", x);
}
int main() {
    func();
    func();
    return 0;
}
```
- A) `1 1 `
- B) `1 2 `
- C) `0 1 `
- D) `2 2 `

---

### SECTION 2: DATA STRUCTURES & ALGORITHMS (Q15 – Q26)

**Q15**: What is the worst-case time complexity of QuickSort when the pivot is always chosen as the first element and the array is already sorted?
- A) $O(N \log N)$
- B) $O(N)$
- C) $O(N^2)$
- D) $O(\log N)$

**Q16**: In a max-heap of size $N$, where is the minimum element located?
- A) At the root node (index 0)
- B) At one of the leaf nodes ($\lfloor N/2 \rfloor$ to $N - 1$)
- C) At index 1
- D) At index $N - 1$ exclusively

**Q17**: Which data structure represents the optimal choice for implementing a LIFO mechanism?
- A) Queue
- B) Stack
- C) Priority Queue
- D) Doubly Linked List

**Q18**: What is the maximum number of nodes on level $k$ of a binary tree (where the root is at level 0)?
- A) $2^k$
- B) $2^{k-1}$
- C) $2k$
- D) $2^{k+1}$

**Q19**: What is the time complexity to reverse an array of size $N$ in-place using two pointers?
- A) $O(N^2)$ Time, $O(1)$ Space
- B) $O(N)$ Time, $O(1)$ Space
- C) $O(N)$ Time, $O(N)$ Space
- D) $O(\log N)$ Time, $O(1)$ Space

**Q20**: In a circular queue of size $N$, how is the `rear` pointer updated upon enqueuing an item?
- A) `rear = rear + 1`
- B) `rear = (rear + 1) % N`
- C) `rear = (rear - 1) % N`
- D) `rear = rear % N`

**Q21**: What is the time complexity of Breadth-First Search on a graph with $V$ vertices and $E$ edges represented via an Adjacency Matrix?
- A) $O(V + E)$
- B) $O(V^2)$
- C) $O(E \log V)$
- D) $O(V \times E)$

**Q22**: What is the number of leaves in a full binary tree with $I$ internal nodes?
- A) $I$
- B) $I + 1$
- C) $2I$
- D) $I - 1$

**Q23**: Which technique solves the 0/1 Knapsack problem optimally?
- A) Greedy Algorithm
- B) Dynamic Programming
- C) Linear Search
- D) Two-Pointer Technique

**Q24**: What does the Floyd-Warshall algorithm compute?
- A) Single-source shortest path
- B) Minimum spanning tree
- C) All-pairs shortest paths
- D) Topological order

**Q25**: What is the time complexity of searching in a Hash Map with linear probing when the table is full?
- A) $O(1)$
- B) $O(N)$
- C) $O(\log N)$
- D) Undefined

**Q26**: Given array `[2, 3, -8, 7, -1, 2, 3]`, what is the maximum subarray sum?
- A) 11
- B) 12
- C) 7
- D) 15

---

### SECTION 3: COMPUTER NETWORKS (Q27 – Q34)

**Q27**: Which layer of the OSI model handles logical IP routing and packet forwarding?
- A) Data Link Layer
- B) Network Layer
- C) Transport Layer
- D) Physical Layer

**Q28**: What is the role of the `FIN` flag in TCP?
- A) Initiates connection establishment
- B) Initiates graceful connection termination
- C) Resets the connection immediately
- D) Synchronizes sequence numbers

**Q29**: What HTTP status code is returned when a client submits a payload that violates schema constraints or is syntactically invalid?
- A) 400 Bad Request
- B) 401 Unauthorized
- C) 403 Forbidden
- D) 500 Internal Server Error

**Q30**: What is the standard port for Secure Shell (SSH)?
- A) 20
- B) 21
- C) 22
- D) 23

**Q31**: Which protocol resolves an IP address to a hardware MAC address on a local area network?
- A) DNS
- B) DHCP
- C) ARP
- D) RARP

**Q32**: What is the size of the UDP header?
- A) 8 bytes
- B) 20 bytes
- C) 16 bytes
- D) Variable

**Q33**: Which HTTP method is designed to replace an entire resource representation?
- A) POST
- B) PUT
- C) PATCH
- D) GET

**Q34**: What does TTL (Time to Live) in an IPv4 packet header signify?
- A) The time in seconds a packet can remain in RAM
- B) The maximum number of router hops remaining before the packet is discarded
- C) The download speed of the connection
- D) The transmission frequency

---

### SECTION 4: MICROPROCESSORS & ARCHITECTURE (Q35 – Q40)

**Q35**: How many address bits does the Intel 8085 microprocessor have?
- A) 8
- B) 16
- C) 20
- D) 32

**Q36**: Which 8085 interrupt has the restart vector address `003CH`?
- A) RST 5.5
- B) RST 6.5
- C) RST 7.5
- D) TRAP

**Q37**: Identify the addressing mode of `MOV A, B` in 8085.
- A) Direct Addressing
- B) Register Addressing
- C) Immediate Addressing
- D) Register Indirect Addressing

**Q38**: In a computer memory hierarchy, which memory tier is the fastest and closest to the ALU?
- A) L1 Cache
- B) Registers
- C) L2 Cache
- D) DRAM

**Q39**: What type of pipeline hazard is caused by true data dependencies (RAW)?
- A) Structural Hazard
- B) Data Hazard
- C) Control Hazard
- D) Interrupt Hazard

**Q40**: What is the restart vector address for TRAP in 8085?
- A) `0024H`
- B) `003CH`
- C) `0034H`
- D) `002CH`

---

### SECTION 5: CYBERSECURITY (Q41 – Q44)

**Q41**: What is the main security purpose of HTTPS over HTTP?
- A) Compressing web traffic
- B) Providing encryption, confidentiality, and authentication of data in transit using TLS
- C) Bypassing ISP data limits
- D) Enhancing SEO rankings only

**Q42**: Which attack tricks an authenticated user's browser into executing state-changing requests on a web application?
- A) SQL Injection
- B) Cross-Site Scripting (XSS)
- C) Cross-Site Request Forgery (CSRF)
- D) DDoS

**Q43**: What is SHA-256?
- A) An asymmetric encryption algorithm
- B) A cryptographic one-way hashing algorithm
- C) A symmetric block cipher
- D) A network tunneling protocol

**Q44**: In a JSON Web Token (JWT), which part contains the claims like user ID and expiration time?
- A) Header
- B) Payload
- C) Signature
- D) Secret

---

### SECTION 6: DBMS, OS & OOP (Q45 – Q50)

**Q45**: What does the 'D' in ACID properties of database transactions stand for?
- A) Dependency
- B) Durability
- C) Distribution
- D) Decomposition

**Q46**: Which SQL join returns only the rows that have matching values in both tables?
- A) LEFT JOIN
- B) RIGHT JOIN
- C) INNER JOIN
- D) FULL OUTER JOIN

**Q47**: In an operating system, what is the primary component stored inside a Process Control Block (PCB)?
- A) Network bandwidth
- B) Program Counter, CPU registers, and Process State
- C) Disk sector numbers
- D) Motherboard clock speed

**Q48**: What is the difference between Preemptive and Non-Preemptive scheduling?
- A) Preemptive scheduling cannot cause starvation
- B) Preemptive scheduling allows the OS to interrupt a running process to run another; Non-preemptive allows a process to retain CPU until voluntary termination/yield
- C) Non-preemptive scheduling is faster
- D) Preemptive scheduling does not use clocks

**Q49**: What is Method Overriding in Object-Oriented Programming?
- A) Declaring multiple methods with the same name and different parameters in the same class
- B) Subclass providing a specific implementation of a method already declared in its superclass
- C) Hiding variables with the same name
- D) Writing methods inside interfaces

**Q50**: What is the relationship modeled by Inheritance in OOP?
- A) "Has-A" relationship
- B) "Is-A" relationship
- C) "Uses-A" relationship
- D) "Creates-A" relationship
