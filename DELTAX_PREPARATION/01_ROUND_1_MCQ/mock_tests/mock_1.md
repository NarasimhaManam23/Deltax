# DeltaX Round 1 Full Mock Test 1

**Instructions**:
* **Duration**: 45 Minutes (Strict timer: 54 seconds per question)
* **Total Questions**: 50 MCQs
* **Marking Scheme**: +1 for correct, 0 for unattempted (do not leave blanks unless specified)
* **Subjects**: Programming (14), DSA (12), Networks (8), Microprocessors (6), Cybersecurity (4), DBMS/OS/OOP (6).
* **Note**: Answers are withheld in this test paper. Refer to `answer_keys_and_scoring.md` after completion.

---

### SECTION 1: PROGRAMMING FUNDAMENTALS (Q1 – Q14)

**Q1**: What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int a = 10, b = 5;
    int c = a > b ? a++ : b++;
    printf("%d %d %d", a, b, c);
    return 0;
}
```
- A) `11 5 10`
- B) `10 5 10`
- C) `11 6 10`
- D) `11 5 11`

**Q2**: What will be the output of this Java snippet?
```java
int x = 2;
int y = x++ + x++ * --x;
System.out.println(y);
```
- A) 11
- B) 8
- C) 9
- D) 10

**Q3**: What will be printed by the following C program?
```c
#include <stdio.h>
int main() {
    int arr[] = {100, 200, 300};
    int *p = arr;
    printf("%d", *(p++) + *(++p));
    return 0;
}
```
- A) 400
- B) Undefined Behavior in C
- C) 300
- D) 500

**Q4**: What is the output of this Python code?
```python
def f(a, b=[]):
    b.append(a)
    return len(b)
print(f(10) + f(20))
```
- A) 2
- B) 3
- C) 4
- D) 1

**Q5**: What is printed by this recursive C function when executed with `f(4)`?
```c
int f(int n) {
    if (n <= 1) return 1;
    return f(n - 1) + f(n - 2);
}
```
- A) 3
- B) 5
- C) 8
- D) 4

**Q6**: What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int i = 0;
    while (++i < 3) {
        printf("%d ", i);
    }
    return 0;
}
```
- A) `1 2 `
- B) `0 1 2 `
- C) `1 2 3 `
- D) `0 1 `

**Q7**: What is printed by the following C snippet?
```c
#include <stdio.h>
int main() {
    char s[] = "DeltaX";
    printf("%s", s + 2);
    return 0;
}
```
- A) `ltaX`
- B) `DeltaX`
- C) `taX`
- D) `el`

**Q8**: What will be the output of the following C code?
```c
#include <stdio.h>
int main() {
    int x = 1;
    if (x == 2);
    {
        printf("Hello");
    }
    return 0;
}
```
- A) Prints nothing
- B) Prints "Hello"
- C) Compilation error
- D) Runtime exception

**Q9**: What is the result of `~0` in standard two's complement 32-bit integer arithmetic?
- A) 0
- B) -1
- C) 1
- D) $2^{32} - 1$

**Q10**: What is the value of `b` after executing: `int a = 0; int b = (a++ != 0) && (++a > 0);`?
- A) 1
- B) 0
- C) -1
- D) 2

**Q11**: What is the output of the following Python slice: `"ProductEngine"[2:8:2]`?
- A) `odc`
- B) `ouc`
- C) `ode`
- D) `puc`

**Q12**: What does `sizeof(void)` return in GNU C?
- A) 0
- B) 1
- C) 4
- D) Compilation error in standard ISO C

**Q13**: What is the output of this Java statement: `System.out.println(1 + 2 + "3" + 4 + 5);`?
- A) `3345`
- B) `339`
- C) `12345`
- D) `15`

**Q14**: What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int a = 5;
    printf("%d", a << 2 >> 1);
    return 0;
}
```
- A) 5
- B) 10
- C) 20
- D) 2

---

### SECTION 2: DATA STRUCTURES & ALGORITHMS (Q15 – Q26)

**Q15**: What is the worst-case time complexity of MergeSort?
- A) $O(N)$
- B) $O(N \log N)$
- C) $O(N^2)$
- D) $O(\log N)$

**Q16**: What is the time complexity of finding the maximum element in a Min-Heap with $N$ elements?
- A) $O(1)$
- B) $O(\log N)$
- C) $O(N)$
- D) $O(N \log N)$

**Q17**: In a singly linked list, which pointer operation checks if a node `p` is the last node?
- A) `p == NULL`
- B) `p->next == NULL`
- C) `p->next == head`
- D) `p->prev == NULL`

**Q18**: Which data structure is utilized to evaluate an arithmetic expression written in postfix notation?
- A) Queue
- B) Stack
- C) Deque
- D) Binary Tree

**Q19**: What is the height of an AVL tree containing 7 nodes?
- A) 2
- B) 3
- C) 4
- D) 5

**Q20**: What is the maximum number of edges in a connected undirected graph with $V$ vertices that does NOT contain any cycle?
- A) $V$
- B) $V - 1$
- C) $V(V - 1) / 2$
- D) $2V - 1$

**Q21**: What is the best-case time complexity of Insertion Sort on an array of size $N$ that is already sorted?
- A) $O(N^2)$
- B) $O(N \log N)$
- C) $O(N)$
- D) $O(1)$

**Q22**: What is the result of applying Kadane's algorithm to array `[-5, -2, -8, -1, -4]`?
- A) 0
- B) -1
- C) -2
- D) -20

**Q23**: What is the time complexity of searching for a key in a hash table of size $M$ containing $N$ keys under the assumption of Simple Uniform Hashing?
- A) $O(N)$
- B) $O(1 + N/M)$
- C) $O(\log N)$
- D) $O(M)$

**Q24**: How many null pointer fields exist in a non-empty Binary Tree with $N$ total nodes?
- A) $N - 1$
- B) $N$
- C) $N + 1$
- D) $2N$

**Q25**: What is the time complexity of finding the shortest path between two nodes in an unweighted graph with $V$ vertices and $E$ edges?
- A) $O(V \times E)$
- B) $O(V + E)$ using BFS
- C) $O(V \log V)$ using Dijkstra
- D) $O(V^3)$ using Floyd-Warshall

**Q26**: What is the length of the Longest Increasing Subsequence of `[10, 9, 2, 5, 3, 7, 101, 18]`?
- A) 3
- B) 4
- C) 5
- D) 6

---

### SECTION 3: COMPUTER NETWORKS (Q27 – Q34)

**Q27**: Which OSI layer does a Layer 2 Network Switch operate on?
- A) Physical Layer
- B) Data Link Layer
- C) Network Layer
- D) Transport Layer

**Q28**: What is the acknowledgment number in a TCP segment?
- A) The sequence number of the segment just received
- B) The next sequence number the receiver expects to receive
- C) The count of lost packets
- D) The receiver's advertised window size

**Q29**: Which HTTP response status code signifies that a resource has permanently moved to a new URI?
- A) 301 Moved Permanently
- B) 302 Found
- C) 304 Not Modified
- D) 307 Temporary Redirect

**Q30**: What is the default port used by the Simple Mail Transfer Protocol (SMTP)?
- A) 21
- B) 22
- C) 25
- D) 110

**Q31**: What protocol uses port 53 and translates human-readable hostnames to IP addresses?
- A) ARP
- B) DNS
- C) DHCP
- D) ICMP

**Q32**: In TCP flow control, who advertises the receive window size?
- A) The sender
- B) The receiver
- C) The intermediate gateway router
- D) The DNS server

**Q33**: What is the size of an IPv4 address in bits?
- A) 16 bits
- B) 32 bits
- C) 64 bits
- D) 128 bits

**Q34**: What is the primary difference between TCP and UDP?
- A) TCP is connectionless; UDP is connection-oriented
- B) TCP provides reliable, ordered byte streams; UDP provides lightweight, connectionless datagram delivery without retransmission guarantees
- C) UDP has larger headers than TCP
- D) TCP does not support flow control

---

### SECTION 4: MICROPROCESSORS & ARCHITECTURE (Q35 – Q40)

**Q35**: How many general-purpose 8-bit registers (excluding Accumulator and Flags) does the Intel 8085 contain?
- A) 4
- B) 6 (B, C, D, E, H, L)
- C) 8
- D) 16

**Q36**: What is the restart vector address of 8085 hardware interrupt `RST 5.5`?
- A) `002CH`
- B) `0034H`
- C) `003CH`
- D) `0024H`

**Q37**: Which 8085 flag is NOT affected by executing `INR B`?
- A) Sign Flag
- B) Zero Flag
- C) Carry Flag
- D) Parity Flag

**Q38**: Identify the addressing mode of `LDA 2000H` in 8085.
- A) Immediate Addressing
- B) Direct Addressing
- C) Register Indirect Addressing
- D) Implicit Addressing

**Q39**: In a direct-mapped cache with 32 lines, which cache line does memory block 69 map to?
- A) Line 3
- B) Line 5
- C) Line 7
- D) Line 1

**Q40**: What type of pipeline hazard is caused by conditional branch instructions?
- A) Structural Hazard
- B) Data Hazard
- C) Control / Branch Hazard
- D) Memory Hazard

---

### SECTION 5: CYBERSECURITY (Q41 – Q44)

**Q41**: What is the primary defense against SQL Injection in web applications?
- A) Storing passwords in cookies
- B) Using Parameterized Queries (Prepared Statements)
- C) Disabling HTTPS
- D) Using client-side JavaScript validation only

**Q42**: Which cryptographic algorithm is an asymmetric public-key cryptosystem?
- A) AES
- B) DES
- C) RSA
- D) ChaCha20

**Q43**: What is the purpose of adding a salt to passwords before hashing?
- A) Making hashing reversible
- B) Preventing precomputed Rainbow Table lookup attacks
- C) Increasing network throughput
- D) Encrypting database backups

**Q44**: What cookie attribute prevents JavaScript from reading session cookies via `document.cookie`?
- A) `Secure`
- B) `HttpOnly`
- C) `SameSite`
- D) `Domain`

---

### SECTION 6: DBMS, OS & OOP (Q45 – Q50)

**Q45**: What does the 'I' in ACID properties of database transactions represent?
- A) Integrity
- B) Isolation
- C) Idempotency
- D) Indexing

**Q46**: Which SQL clause is used to filter rows BEFORE grouping?
- A) `HAVING`
- B) `WHERE`
- C) `ORDER BY`
- D) `GROUP BY`

**Q47**: What is a Deadlock in an operating system?
- A) A crash caused by a power surge
- B) A permanent stall where two or more processes are unable to proceed because each holds resources needed by another in a circular wait
- C) Running out of virtual memory
- D) A disk write error

**Q48**: Which page replacement algorithm can suffer from Belady's Anomaly?
- A) LRU
- B) FIFO
- C) Optimal
- D) LFU

**Q49**: What OOP principle is exemplified by declaring fields `private` and exposing public getters and setters?
- A) Abstraction
- B) Encapsulation
- C) Polymorphism
- D) Multiple Inheritance

**Q50**: Can a static method be overridden in Java?
- A) Yes, always
- B) No, static methods are hidden (method hiding), not overridden via dynamic dispatch
- C) Only if the parent class is abstract
- D) Only if declared public
