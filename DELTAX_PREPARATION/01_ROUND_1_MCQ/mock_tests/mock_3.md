# DeltaX Round 1 Full Mock Test 3

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
    int x = 5;
    printf("%d", !x);
    return 0;
}
```
- A) 1
- B) 0
- C) -5
- D) Compilation error

**Q2**: What is the output of the following C program?
```c
#include <stdio.h>
int main() {
    int a = 10, b = 20;
    if (a < b)
        if (b < 15) printf("P");
        else printf("Q");
    return 0;
}
```
- A) P
- B) Q
- C) Prints nothing
- D) PQ

**Q3**: What will be the output of this Python snippet?
```python
a = [1, 2, 3]
b = a
b.append(4)
print(len(a))
```
- A) 3
- B) 4
- C) TypeError
- D) None

**Q4**: What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    int *p = arr + 1;
    printf("%d", p[2]);
    return 0;
}
```
- A) 2
- B) 3
- C) 4
- D) 5

**Q5**: What is the return value of `recur(3)`?
```c
int recur(int n) {
    if (n == 1) return 1;
    return n * recur(n - 1);
}
```
- A) 3
- B) 6
- C) 9
- D) 1

**Q6**: What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int a = 2, b = 3;
    printf("%d", a ^ b ^ a);
    return 0;
}
```
- A) 2
- B) 3
- C) 0
- D) 1

**Q7**: What is printed by this Java code?
```java
public class Test {
    public static void main(String[] args) {
        int i = 0;
        for (i = 0; i < 5; i++) {
            if (i == 2) break;
        }
        System.out.println(i);
    }
}
```
- A) 2
- B) 3
- C) 5
- D) 1

**Q8**: What will be the output of the following C code?
```c
#include <stdio.h>
int main() {
    char s[] = "Delta";
    printf("%zu", sizeof(s));
    return 0;
}
```
- A) 5
- B) 6
- C) 4
- D) 8

**Q9**: What is the output of this Python code?
```python
x = "Hello"
print(x[1:4])
```
- A) `ell`
- B) `ello`
- C) `Hel`
- D) `el`

**Q10**: What is the output of the following C code?
```c
#include <stdio.h>
int main() {
    int a = 1;
    int b = a++ + ++a;
    printf("%d", b);
    return 0;
}
```
- A) 4 in Java; Undefined Behavior in C
- B) 3
- C) 2
- D) 5

**Q11**: What is the result of `10 % -3` in C/Java?
- A) 1
- B) -1
- C) 2
- D) -2

**Q12**: What does the `static` keyword mean when applied to a local function variable in C?
- A) Variable is destroyed when function returns
- B) Variable retains its value between successive calls to the function
- C) Variable cannot be modified
- D) Variable is shared across network nodes

**Q13**: What is the output of the following Python expression: `3 * 1 ** 3`?
- A) 27
- B) 3
- C) 1
- D) 9

**Q14**: What is the value of `x` after: `int x = ~0;` in a 32-bit signed integer?
- A) 0
- B) -1
- C) 1
- D) $2^{31} - 1$

---

### SECTION 2: DATA STRUCTURES & ALGORITHMS (Q15 – Q26)

**Q15**: What is the average time complexity of searching in a Hash Table?
- A) $O(1)$
- B) $O(N)$
- C) $O(\log N)$
- D) $O(N \log N)$

**Q16**: In a max-heap of size $N$, what is the time complexity of deleting the maximum element?
- A) $O(1)$
- B) $O(\log N)$
- C) $O(N)$
- D) $O(N \log N)$

**Q17**: Which traversal of a Binary Search Tree (BST) visits keys in non-decreasing order?
- A) Preorder
- B) Inorder
- C) Postorder
- D) Level-order

**Q18**: What is the time complexity of Binary Search on a sorted array of $N$ elements?
- A) $O(N)$
- B) $O(\log N)$
- C) $O(1)$
- D) $O(N^2)$

**Q19**: How many stacks are required to implement a FIFO Queue?
- A) 1
- B) 2
- C) 3
- D) 4

**Q20**: What is the time complexity of finding an element in a singly linked list of length $N$?
- A) $O(1)$
- B) $O(\log N)$
- C) $O(N)$
- D) $O(N^2)$

**Q21**: What is the worst-case time complexity of Bubble Sort?
- A) $O(N)$
- B) $O(N \log N)$
- C) $O(N^2)$
- D) $O(1)$

**Q22**: What problem does Dijkstra's algorithm solve?
- A) Minimum Spanning Tree
- B) Single-Source Shortest Paths on graphs with non-negative edge weights
- C) Strongly Connected Components
- D) Topological Sort

**Q23**: What is the maximum number of children a node can have in a Binary Tree?
- A) 1
- B) 2
- C) 3
- D) Unlimited

**Q24**: What is the height of a complete binary tree with $N$ nodes?
- A) $\lfloor\log_2 N\rfloor$
- B) $N$
- C) $N / 2$
- D) $\sqrt{N}$

**Q25**: Which algorithmic design technique is utilized in the classic MergeSort algorithm?
- A) Greedy Approach
- B) Dynamic Programming
- C) Divide and Conquer
- D) Backtracking

**Q26**: Given an array `[4, -1, 2, 1]`, what is the maximum contiguous subarray sum?
- A) 4
- B) 6
- C) 5
- D) 7

---

### SECTION 3: COMPUTER NETWORKS (Q27 – Q34)

**Q27**: Which layer of the OSI model handles end-to-end flow control and reliability?
- A) Network Layer
- B) Transport Layer
- C) Session Layer
- D) Data Link Layer

**Q28**: What is the port number for HTTPS?
- A) 80
- B) 8080
- C) 443
- D) 21

**Q29**: What flag is set in the very first packet of a TCP connection handshake?
- A) ACK
- B) SYN
- C) FIN
- D) RST

**Q30**: What HTTP status code means "Not Found"?
- A) 401
- B) 403
- C) 404
- D) 500

**Q31**: Which protocol translates domain names into IP addresses?
- A) ARP
- B) DNS
- C) DHCP
- D) ICMP

**Q32**: What is the size of an IPv4 header without options?
- A) 20 bytes
- B) 40 bytes
- C) 60 bytes
- D) 8 bytes

**Q33**: Which device operates at Layer 3 of the OSI model and forwards packets between distinct networks?
- A) Hub
- B) Switch
- C) Router
- D) Repeater

**Q34**: What is the broadcast IP address on a local IPv4 network with subnet `192.168.1.0/24`?
- A) 192.168.1.0
- B) 192.168.1.1
- C) 192.168.1.255
- D) 255.255.255.0

---

### SECTION 4: MICROPROCESSORS & ARCHITECTURE (Q35 – Q40)

**Q35**: What is the size of the data bus on the Intel 8085 microprocessor?
- A) 8 bits
- B) 16 bits
- C) 20 bits
- D) 32 bits

**Q36**: Which register in the 8085 holds the top of the stack memory address?
- A) Program Counter (PC)
- B) Stack Pointer (SP)
- C) Accumulator
- D) Memory Address Register

**Q37**: Identify the addressing mode of `MVI B, 05H`.
- A) Direct Addressing
- B) Immediate Addressing
- C) Register Addressing
- D) Implicit Addressing

**Q38**: Which 8085 interrupt has the lowest priority?
- A) TRAP
- B) RST 7.5
- C) RST 6.5
- D) INTR

**Q39**: In a pipelined CPU, what hazard occurs when hardware cannot support all simultaneous operations?
- A) Structural Hazard
- B) Data Hazard
- C) Control Hazard
- D) Branch Hazard

**Q40**: What is the restart vector address of `RST 6.5` in 8085?
- A) `0034H`
- B) `003CH`
- C) `002CH`
- D) `0024H`

---

### SECTION 5: CYBERSECURITY (Q41 – Q44)

**Q41**: What is the primary vulnerability where user input executes arbitrary JavaScript in a victim's browser?
- A) SQL Injection
- B) Cross-Site Scripting (XSS)
- C) CSRF
- D) Buffer Overflow

**Q42**: What is AES?
- A) Symmetric Block Cipher
- B) Asymmetric Key System
- C) Hashing Function
- D) Network Tunnel

**Q43**: What is the difference between Authentication and Authorization?
- A) Authentication verifies *who you are*; Authorization verifies *what you are permitted to do*
- B) Authorization comes before Authentication
- C) They are identical terms
- D) Authentication only applies to databases

**Q44**: What cookie attribute ensures cookies are only transmitted across encrypted TLS connections?
- A) `HttpOnly`
- B) `Secure`
- C) `SameSite`
- D) `Path`

---

### SECTION 6: DBMS, OS & OOP (Q45 – Q50)

**Q45**: What does the 'A' in ACID transaction properties stand for?
- A) Availability
- B) Atomicity
- C) Authorization
- D) Asynchrony

**Q46**: Which normal form requires that all non-key attributes depend on the primary key with no transitive dependency?
- A) 1NF
- B) 2NF
- C) 3NF
- D) BCNF

**Q47**: What is a Thread?
- A) An isolated physical computer
- B) A lightweight unit of CPU execution within a process that shares the address space with other threads
- C) A database transaction
- D) A network packet

**Q48**: What scheduling algorithm allocates the CPU in fixed time slices?
- A) First-Come, First-Served
- B) Round Robin
- C) Shortest Job First
- D) Priority Scheduling

**Q49**: What is Polymorphism in OOP?
- A) Encapsulating fields in private scope
- B) The ability of an object or method to take many forms
- C) Creating multiple child classes
- D) Freeing heap memory

**Q50**: What is an Abstract Class?
- A) A class that can be directly instantiated with `new`
- B) A class that cannot be instantiated directly and serves as a base blueprint for derived subclasses
- C) An interface with only static methods
- D) A class without constructors
