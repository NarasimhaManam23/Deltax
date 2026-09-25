# DeltaX Round 1 Master Syllabus & Comprehensive Topic Database

This document contains the complete subject-wise syllabus and evidence-backed priority mapping for Round 1 (Technical MCQ Assessment) of the DeltaX Associate Product Engineer drive.

---

## 1. Master Topic Database & Priority Matrix

| Subject | Topic | Historical Evidence | Priority | Why DeltaX Tests This |
| :--- | :--- | :--- | :--- | :--- |
| **Programming** | Pre/Post Increment & Operator Precedence | DIRECTLY REPORTED (Slide 3) | **P1 (Highest)** | Differentiates compiler-level evaluation mechanics from basic coding; high-yield MCQ trap. |
| **Programming** | Loops & Nested Conditionals | DIRECTLY REPORTED (Slide 3) | **P1 (Highest)** | Tracing loops with break/continue/goto under strict 54-second per question time constraints. |
| **Programming** | Pointers, References & Pointer Arithmetic | REPEATED PATTERN | **P1 (Highest)** | Low-level memory manipulation, array pointer equivalences `*(arr + i)`, function pointers. |
| **Programming** | Recursion Stack Tracing | REPEATED PATTERN | **P1 (Highest)** | Tracing call frames, base conditions, and static/global variables within recursive bodies. |
| **Programming** | Variable Scope, Storage Classes & Memory | GENERAL CS TOPIC | **P2 (High)** | `static`, `extern`, `register`, `volatile`, Stack vs Heap memory allocation. |
| **Programming** | Strings & Character Encoding | DIRECTLY REPORTED (Slide 3) | **P1 (Highest)** | Null-termination in C/C++, immutability in Java/Python, string concatenation memory traps. |
| **DSA** | Arrays & Contiguous Subarrays | DIRECTLY REPORTED (Slide 3) | **P1 (Highest)** | Prefix sums, Kadane's algorithm, two-pointer traversals, in-place rotation. |
| **DSA** | Strings & Pattern Matching | DIRECTLY REPORTED (Slide 3) | **P1 (Highest)** | Anagrams, palindromes, sliding window substrings, character frequency hashing. |
| **DSA** | Hash Maps & Collision Resolution | REPEATED PATTERN | **P1 (Highest)** | Hash function properties, load factor, chaining vs open addressing (linear probing, quadratic, double hashing). |
| **DSA** | Binary Search & Search Spaces | REPEATED PATTERN | **P1 (Highest)** | Lower bound, upper bound, rotated sorted arrays, search on monotonic answer space. |
| **DSA** | Sorting Algorithms & Complexities | REPEATED PATTERN | **P2 (High)** | Stability, best/avg/worst time and space complexities of QuickSort, MergeSort, HeapSort, InsertionSort. |
| **DSA** | Stacks & Queues | REPEATED PATTERN | **P2 (High)** | Balanced parentheses, Next Greater Element, circular queue index math `(rear+1)%N`. |
| **DSA** | Trees & Binary Search Trees (BST) | REPEATED PATTERN | **P2 (High)** | Inorder traversal gives sorted sequence, BST insertion/deletion, height-balanced AVL criteria. |
| **DSA** | Heaps & Priority Queues | GENERAL CS TOPIC | **P2 (High)** | Min-heap/max-heap array representation (parent `(i-1)/2`, left `2i+1`), top-K elements. |
| **DSA** | Graphs (BFS, DFS, Shortest Path) | REPEATED PATTERN | **P2 (High)** | Cycle detection, Dijkstra, Topological Sort, multi-source BFS (Rotten Oranges pattern). |
| **DSA** | Dynamic Programming & Recursion | REPEATED PATTERN | **P2 (High)** | 0/1 Knapsack, Coin Change, Longest Common Subsequence, overlapping subproblems vs optimal substructure. |
| **DSA** | Bit Manipulation & XOR Properties | REPEATED PATTERN | **P2 (High)** | $x \oplus x = 0$, $x \oplus 0 = x$, checking power of two `(n & (n - 1)) == 0`, bit masks. |
| **Computer Networks** | TCP Protocol, 3-Way Handshake, Flags | DIRECTLY REPORTED (Slide 3) | **P1 (Highest)** | Connection establishment (SYN, SYN-ACK, ACK), teardown (FIN, ACK), SEQ/ACK number arithmetic. |
| **Computer Networks** | HTTP/HTTPS & REST Status Codes | DIRECTLY REPORTED (Slide 3) | **P1 (Highest)** | Status codes (200, 201, 301, 302, 400, 401, 403, 404, 500, 502, 503), idempotency, TLS handshake. |
| **Computer Networks** | OSI vs TCP/IP Models & Layer Mapping | REPEATED PATTERN | **P1 (Highest)** | Functions of 7 layers, PDU names (Bits, Frames, Packets, Segments, Data), network devices. |
| **Computer Networks** | IP Addressing & Subnetting | GENERAL CS TOPIC | **P2 (High)** | Classful vs Classless (CIDR), network ID, broadcast address, subnet mask calculations. |
| **Computer Networks** | DNS, ARP, DHCP Protocol Flows | REPEATED PATTERN | **P2 (High)** | Resolving domain names to IP, MAC address discovery via ARP broadcast, DHCP DORA sequence. |
| **Computer Networks** | Sockets & Port Numbers | DIRECTLY REPORTED (Slide 3) | **P2 (High)** | Common well-known ports (80, 443, 21, 22, 25, 53, 3306, 5432), socket tuple (IP, Port, Protocol). |
| **Cybersecurity** | Symmetric vs Asymmetric Encryption | DIRECTLY REPORTED (Slide 2) | **P1 (Highest)** | Shared secret (AES, DES) vs Public/Private keypairs (RSA, ECC), digital signatures. |
| **Cybersecurity** | Cryptographic Hashing & Salting | REPEATED PATTERN | **P1 (Highest)** | Irreversible one-way functions (SHA-256, bcrypt), collision resistance, rainbow table prevention via salt. |
| **Cybersecurity** | Web Security: SQL Injection & XSS | INFERRED PREPARATION | **P1 (Highest)** | Parameterized queries vs string concatenation; Stored vs Reflected XSS; sanitization. |
| **Cybersecurity** | Web Security: CSRF & CORS | INFERRED PREPARATION | **P2 (High)** | Same-Origin Policy, Anti-CSRF tokens, SameSite cookies, CORS headers (`Access-Control-Allow-Origin`). |
| **Cybersecurity** | Authentication vs Authorization (JWT) | REPEATED PATTERN | **P2 (High)** | 401 Unauthorized vs 403 Forbidden; JWT structure (Header.Payload.Signature), bearer tokens. |
| **Microprocessors** | 8085 / 8086 Architecture & Registers | DIRECTLY REPORTED (Slide 2) | **P1 (Highest)** | General purpose registers (B, C, D, E, H, L), Accumulator (A), Program Counter (PC), Stack Pointer (SP). |
| **Microprocessors** | Flag Register Mechanics | REPEATED PATTERN | **P1 (Highest)** | Sign (S), Zero (Z), Auxiliary Carry (AC), Parity (P), Carry (CY) updates after arithmetic/logic ops. |
| **Microprocessors** | Addressing Modes | REPEATED PATTERN | **P1 (Highest)** | Immediate (`MVI A, 05H`), Direct (`LDA 2000H`), Register (`MOV A, B`), Indirect (`MOV A, M`). |
| **Microprocessors** | Interrupts & Priority Structure | REPEATED PATTERN | **P1 (Highest)** | TRAP (non-maskable, highest priority, vectored 4.5), RST 7.5, RST 6.5, RST 5.5, INTR (non-vectored). |
| **Microprocessors** | Memory Hierarchy & Cache Mapping | GENERAL CS TOPIC | **P2 (High)** | Cache hits/misses, Direct mapped vs Set Associative, write-through vs write-back. |
| **Microprocessors** | Pipelining & Hazards | GENERAL CS TOPIC | **P2 (High)** | Structural, Data (RAW, WAR, WAW), and Control hazards; pipeline stalls and branch prediction. |
| **OOP** | Four Core Pillars | REPEATED PATTERN | **P1 (Highest)** | Encapsulation, Abstraction, Inheritance, Polymorphism (real-world enterprise models). |
| **OOP** | Polymorphism: Overloading vs Overriding | REPEATED PATTERN | **P1 (Highest)** | Compile-time (static binding) vs Runtime (dynamic dispatch, vtables, virtual functions). |
| **OOP** | Abstract Class vs Interface | REPEATED PATTERN | **P1 (Highest)** | Multiple inheritance of interface, default/static methods, state holding rules. |
| **OOP** | Constructors & Destruction Semantics | REPEATED PATTERN | **P2 (High)** | Constructor chaining, copy constructor, virtual destructors in C++, garbage collection. |
| **OOP** | Composition vs Inheritance | INFERRED PREPARATION | **P2 (High)** | "Has-A" vs "Is-A" relationships, loose coupling, favoring composition for extensibility. |
| **DBMS** | SQL Joins & Set Operations | REPEATED PATTERN | **P1 (Highest)** | Inner Join, Left/Right/Full Outer Join, Cross Join, Cartesian product row counts, Union vs Union All. |
| **DBMS** | Normalization & Functional Dependencies | REPEATED PATTERN | **P1 (Highest)** | 1NF (atomic values), 2NF (no partial dependency), 3NF (no transitive dependency), BCNF. |
| **DBMS** | ACID Properties & Concurrency Control | REPEATED PATTERN | **P1 (Highest)** | Atomicity, Consistency, Isolation (Dirty Read, Non-repeatable read, Phantom read), Durability. |
| **DBMS** | Indexing Mechanics (B-Tree vs Hash) | INFERRED PREPARATION | **P2 (High)** | Clustered (determines physical order, only 1 per table) vs Non-clustered index (secondary pointer table). |
| **Operating Systems** | Processes, Threads & Context Switching | REPEATED PATTERN | **P2 (High)** | Process control block (PCB), thread shares text/data/heap but has private stack/registers. |
| **Operating Systems** | CPU Scheduling Algorithms | REPEATED PATTERN | **P2 (High)** | FCFS, Shortest Job First (convoy effect), Round Robin (time quantum trade-offs), priority inversion. |
| **Operating Systems** | Synchronization & Deadlocks | REPEATED PATTERN | **P2 (High)** | Mutual exclusion, semaphores (counting vs binary), mutex, 4 Coffman conditions, Banker's algorithm. |
| **Operating Systems** | Virtual Memory & Page Replacement | REPEATED PATTERN | **P2 (High)** | Demand paging, Belady's anomaly (FIFO), LRU page fault calculations, thrashing. |

---

## 2. Round 1 Strategic Time Management Rules

1. **The 54-Second Rule**:
   * Total Time = 45 minutes = 2,700 seconds.
   * Total Questions = 50.
   * Average Time per question = **54 seconds**.
2. **Triaging Strategy**:
   * **Pass 1 (0 to 20 mins)**: Knock out rapid-fire declarative MCQs (Networking, Cybersecurity, Microprocessors, DBMS/OS definitions). These take 15–25 seconds each. Target: 25–30 questions answered.
   * **Pass 2 (20 to 38 mins)**: Solve moderate algorithmic and code output questions (C pointers, DSA complexities, SQL join outputs). Spend 60–80 seconds each. Target: 15–18 questions answered.
   * **Pass 3 (38 to 45 mins)**: Tackle complex recursion tracing, bitwise puzzle outputs, and review flagged questions.
3. **No Negative Marking Assumption**:
   * Unless explicitly warned by the test platform on the login screen, never leave any question unattempted. Make an educated elimination in the final 90 seconds.
