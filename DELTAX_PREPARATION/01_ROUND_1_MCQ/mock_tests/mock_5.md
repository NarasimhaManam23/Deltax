# DeltaX Round 1 Full Mock Test 5

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
    int x = 10;
    int *p = &x;
    *p = 20;
    printf("%d", x);
    return 0;
}
```
- A) 10
- B) 20
- C) Address of x
- D) Garbage

**Q2**: What will be the output of this Python expression: `print(bool([]), bool([False]))`?
- A) `False False`
- B) `False True`
- C) `True True`
- D) `True False`

**Q3**: What will be printed by the following C program?
```c
#include <stdio.h>
int main() {
    int i = 1;
    do {
        printf("%d ", i++);
    } while (i <= 2);
    return 0;
}
```
- A) `1 2 `
- B) `1 2 3 `
- C) `1 `
- D) `2 3 `

**Q4**: What will be the output of this Java code?
```java
public class StringTest {
    public static void main(String[] args) {
        String a = "Test";
        String b = new String("Test");
        System.out.println(a.equals(b) + " " + (a == b));
    }
}
```
- A) `true true`
- B) `true false`
- C) `false true`
- D) `false false`

**Q5**: What is the return value of `mystery(4)`?
```c
int mystery(int n) {
    if (n <= 0) return 0;
    return n + mystery(n - 1);
}
```
- A) 4
- B) 10
- C) 6
- D) 0

**Q6**: What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int x = 5;
    printf("%d", x ^ x);
    return 0;
}
```
- A) 5
- B) 0
- C) 10
- D) 1

**Q7**: What is printed by this C snippet?
```c
#include <stdio.h>
int main() {
    int arr[3] = {10, 20, 30};
    printf("%d", 1[arr]);
    return 0;
}
```
- A) 10
- B) 20
- C) 30
- D) Compilation Error

**Q8**: What will be the output of this Python slice: `print("Engineer"[::-1])`?
- A) `reenignE`
- B) `Engineer`
- C) `reen`
- D) `E`

**Q9**: What is the value of `x` after: `int a = 5; int x = a > 2 ? 100 : 200;`?
- A) 100
- B) 200
- C) 5
- D) 2

**Q10**: What does `free(ptr)` do in C?
- A) Sets pointer `ptr` to NULL
- B) Deallocates the memory block on the heap previously allocated by `malloc`/`calloc`
- C) Deletes the variable from the stack
- D) Erases the hard disk sector

**Q11**: What is the output of the following Java snippet?
```java
int a = 10;
int b = 20;
System.out.println("Result: " + a + b);
```
- A) `Result: 30`
- B) `Result: 1020`
- C) `Result: 200`
- D) Compilation error

**Q12**: What is the output of the following C program?
```c
#include <stdio.h>
int main() {
    int x = 1;
    if (x--) {
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

**Q13**: What is the output of this Python code?
```python
x = {1, 2, 3}
x.add(2)
print(len(x))
```
- A) 4
- B) 3
- C) 2
- D) 1

**Q14**: What is the result of `1 << 3` in Java/C?
- A) 3
- B) 6
- C) 8
- D) 16

---

### SECTION 2: DATA STRUCTURES & ALGORITHMS (Q15 – Q26)

**Q15**: What is the worst-case time complexity of searching in a sorted array of size $N$ using Linear Search?
- A) $O(1)$
- B) $O(\log N)$
- C) $O(N)$
- D) $O(N \log N)$

**Q16**: What is the time complexity of finding the minimum element in an unsorted array of size $N$?
- A) $O(1)$
- B) $O(\log N)$
- C) $O(N)$
- D) $O(N^2)$

**Q17**: Which traversal order of a Binary Search Tree produces values in strictly ascending order?
- A) Preorder
- B) Inorder
- C) Postorder
- D) Level-Order

**Q18**: What is the time complexity of inserting an element into a Min-Heap of size $N$?
- A) $O(1)$
- B) $O(\log N)$
- C) $O(N)$
- D) $O(N \log N)$

**Q19**: How many pointers does a node in a Doubly Linked List maintain?
- A) 1
- B) 2 (`prev` and `next`)
- C) 3
- D) 0

**Q20**: What is the time complexity of deleting an element from a Stack of size $N$?
- A) $O(1)$
- B) $O(N)$
- C) $O(\log N)$
- D) $O(N^2)$

**Q21**: What is the average time complexity of QuickSort on an array of size $N$?
- A) $O(N)$
- B) $O(N \log N)$
- C) $O(N^2)$
- D) $O(\log N)$

**Q22**: In graph theory, what is a cycle?
- A) A path with no edges
- B) A path that starts and ends at the same vertex with no other repeated vertices
- C) A tree
- D) A disconnected component

**Q23**: What is the time complexity of Breadth-First Search (BFS) on a graph with $V$ vertices and $E$ edges using an Adjacency List?
- A) $O(V^2)$
- B) $O(V + E)$
- C) $O(E \log V)$
- D) $O(V \times E)$

**Q24**: What is the number of nodes in a full binary tree with height $h$ (where root height is 1)?
- A) $2^h - 1$
- B) $2^h$
- C) $2^{h-1}$
- D) $h^2$

**Q25**: Which algorithmic technique is used in Kadane's algorithm?
- A) Divide and Conquer
- B) Dynamic Programming / Greedy Sliding State
- C) Backtracking
- D) Binary Search

**Q26**: Given array `[1, 2, 3, 4]`, how many total contiguous subarrays exist?
- A) 4
- B) 10
- C) 16
- D) 8

---

### SECTION 3: COMPUTER NETWORKS (Q27 – Q34)

**Q27**: Which OSI layer does a Network Router operate on?
- A) Data Link Layer
- B) Network Layer (Layer 3)
- C) Transport Layer
- D) Physical Layer

**Q28**: What is the final packet sent by the client to complete the TCP 3-way handshake?
- A) SYN
- B) ACK
- C) FIN
- D) RST

**Q29**: Which HTTP status code signifies "Forbidden" (client authenticated, but unauthorized for the requested resource)?
- A) 400
- B) 401
- C) 403
- D) 404

**Q30**: What is the default port for Domain Name System (DNS) queries?
- A) 21
- B) 25
- C) 53
- D) 80

**Q31**: Which protocol maps a local MAC address to an IP address (inverse of ARP)?
- A) DNS
- B) RARP
- C) ICMP
- D) NAT

**Q32**: What is the header size of standard UDP?
- A) 8 bytes
- B) 20 bytes
- C) 32 bytes
- D) 64 bytes

**Q33**: What is the primary function of NAT (Network Address Translation)?
- A) Encrypting web traffic
- B) Translating private local IP addresses to public routable IP addresses
- C) Speeding up disk reads
- D) Resolving domain names

**Q34**: Which transport protocol is connectionless and does NOT perform retransmission?
- A) TCP
- B) UDP
- C) SCTP
- D) FTP

---

### SECTION 4: MICROPROCESSORS & ARCHITECTURE (Q35 – Q40)

**Q35**: How many address lines does the Intel 8086 microprocessor have?
- A) 16
- B) 20 (allowing 1 MB address space)
- C) 24
- D) 32

**Q36**: Which 8085 interrupt has the highest priority?
- A) RST 7.5
- B) RST 6.5
- C) TRAP
- D) INTR

**Q37**: What is the restart vector address of `RST 5` in 8085?
- A) `0028H`
- B) `0030H`
- C) `0038H`
- D) `0020H`

**Q38**: Identify the addressing mode of `MOV A, M` in 8085.
- A) Direct Addressing
- B) Register Indirect Addressing
- C) Immediate Addressing
- D) Implicit Addressing

**Q39**: In a pipelined CPU, what hazard occurs when two instructions attempt to access the same physical hardware resource simultaneously?
- A) Structural Hazard
- B) Data Hazard
- C) Control Hazard
- D) Branch Hazard

**Q40**: What is the purpose of the Program Counter (PC) in 8085?
- A) Counting loop iterations
- B) Storing the address of the next instruction to fetch from memory
- C) Holding ALU arithmetic results
- D) Managing the stack pointer

---

### SECTION 5: CYBERSECURITY (Q41 – Q44)

**Q41**: What is the primary purpose of a Web Application Firewall (WAF)?
- A) Routing network packets at Layer 3
- B) Filtering and monitoring HTTP/HTTPS traffic to protect web applications from attacks like SQLi and XSS
- C) Managing server cooling
- D) Encrypting database hard disks

**Q42**: What type of encryption algorithm is AES-256?
- A) Asymmetric Public-Key
- B) Symmetric Block Cipher
- C) Hashing Algorithm
- D) Key Exchange Protocol

**Q43**: What does adding a Salt to hashed passwords prevent?
- A) Database crashes
- B) Rainbow Table precomputed hash lookup attacks
- C) Man-in-the-Middle attacks
- D) XSS attacks

**Q44**: In a JSON Web Token (JWT), which section validates that the token was not tampered with?
- A) Header
- B) Payload
- C) Signature
- D) Claims

---

### SECTION 6: DBMS, OS & OOP (Q45 – Q50)

**Q45**: What does the 'C' in ACID database transaction properties stand for?
- A) Concurrency
- B) Consistency
- C) Commit
- D) Cardinality

**Q46**: What is the difference between `DELETE` and `TRUNCATE` in SQL?
- A) `DELETE` is DDL; `TRUNCATE` is DML
- B) `DELETE` is a logged DML operation that supports `WHERE`; `TRUNCATE` is a faster DDL operation that deallocates data pages without logging individual rows
- C) `TRUNCATE` cannot empty a table
- D) There is no difference

**Q47**: What are the four Coffman conditions for a Deadlock in an operating system?
- A) Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait
- B) Starvation, Aging, Thrashing, Paging
- C) Threads, Processes, Semaphores, Mutex
- D) Scheduling, Dispatching, Preemption, Context Switch

**Q48**: What is Thrashing in an operating system?
- A) CPU overheating
- B) A condition where the OS spends more time swapping virtual pages to/from disk than executing instructions, collapsing CPU utilization
- C) A hard drive mechanical failure
- D) Deleting temporary files

**Q49**: What is the primary benefit of Method Overloading in OOP?
- A) Enabling multiple inheritance
- B) Providing multiple methods with the same name but different signatures, improving code readability and reusability
- C) Making variables private
- D) Allocating heap memory

**Q50**: What does the `super` keyword do inside a subclass constructor in Java?
- A) Calls the parent class constructor
- B) Creates a new thread
- C) Calls the Garbage Collector
- D) Makes the class abstract
