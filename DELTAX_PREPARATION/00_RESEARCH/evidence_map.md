# DeltaX Topic Evidence Map & Classification Matrix

This document maps all subjects and topics expected across Rounds 1, 2, 3, and 4 for the DeltaX Associate Product Engineer drive. Every topic is categorized based on hard historical evidence.

---

## Classification Taxonomy
* **[DIRECTLY REPORTED]**: Explicitly documented in DeltaX campus recruitment slides, test platform screen captures, college T&P communications, or candidate interview debriefs.
* **[REPEATED PATTERN]**: Reported independently by multiple candidates across $\ge 3$ different hiring batches (2022–2026).
* **[INFERRED PREPARATION]**: Required architectural/programming prerequisite to solve reported problems or explain real-world systems.
* **[GENERAL CS TOPIC]**: Foundational CS syllabus topic occasionally surfacing in comprehensive 50-MCQ testing suites.

---

## Comprehensive Topic Evidence Table

| Subject | Topic | Classification | Historical Evidence & Source Context | Preparation Priority | Why DeltaX Evaluates This |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Programming** | Loops & Conditional Execution | DIRECTLY REPORTED | Explicitly listed on Round 1 Official Slide ("Loops, Operators, Pseudocode"). Tracing nested `while`/`for` loops. | **CRITICAL (P1)** | Tests core procedural tracing ability under high time pressure (54 sec/MCQ). |
| **Programming** | Pre/Post Increment & Operators | DIRECTLY REPORTED | Slide 3: "Operators". Frequently tested in C/C++/Java output prediction (`x = ++i + i++`). | **CRITICAL (P1)** | Differentiates students with deep compiler comprehension from superficial coders. |
| **Programming** | Pointer Arithmetic & References | REPEATED PATTERN | Multiple GFG candidate logs report tricky pointer dereferencing (`*ptr++`, `*(ptr++)`, array pointers). | **HIGH (P1)** | Assesses understanding of low-level memory layout, critical for C#/C++ backend performance. |
| **Programming** | Recursion Stack Tracing | REPEATED PATTERN | Return value calculation of recursive mathematical functions with static variables. | **HIGH (P1)** | Direct foundation for Tree traversals, Backtracking, and DP in Round 3. |
| **DSA** | Contiguous Subarrays & Sliding Window | DIRECTLY REPORTED | Slide 3: "Arrays, Strings". Multiple LeetCode/GFG posts cite subarray sum, max subarray, sliding window. | **CRITICAL (P1)** | Standard evaluation of $O(N)$ optimization over naive $O(N^2)$ brute forces. |
| **DSA** | String Manipulation & Transformation | DIRECTLY REPORTED | Official Slide 3: "Strings". Reported OA problems: Roman to Integer, custom encoding, string validation. | **CRITICAL (P1)** | String parsing is common in AdTech payload processing (query strings, tracking URLs). |
| **DSA** | Hash Maps & Frequency Analysis | REPEATED PATTERN | Multiple reports cite frequency maps, Two-Sum variations, grouping anagrams, single number. | **CRITICAL (P1)** | Crucial for $O(1)$ lookups in data-intensive enterprise backends. |
| **DSA** | 0/1 Knapsack & Dynamic Programming | REPEATED PATTERN | GFG reports 2023–2025 specifically cite Knapsack / Subset Sum / Coin Change variations. | **HIGH (P2)** | Filters candidates capable of optimal substructure & overlapping subproblem decomposition. |
| **DSA** | Binary Search & Sorting Complexities | REPEATED PATTERN | Standard MCQ questions on worst-case QuickSort, stable sorting, binary search boundary conditions. | **HIGH (P2)** | Tests algorithm complexity theory and corner-case handling. |
| **DSA** | Trees & Graph Traversal (BFS/DFS) | REPEATED PATTERN | Reported problem: Rotten Oranges (multi-source BFS), Tree traversals, BST validation. | **HIGH (P2)** | Tests non-linear data structures used in hierarchical ad-campaign taxonomies. |
| **DSA** | Linked Lists & Stacks/Queues | GENERAL CS TOPIC | Reversing linked list, detecting cycles, circular queue indices `(front + 1) % N`. | **MEDIUM (P3)** | Tests fundamental linear data structures and pointer reassignment. |
| **Computer Networks** | TCP 3-Way Handshake & Flags | DIRECTLY REPORTED | Official Slide 3: "Networking: TCP, HTTP". SYN, SYN-ACK, ACK sequence number calculations. | **CRITICAL (P1)** | AdTech platforms handle millions of network requests per second; network reliability is core. |
| **Computer Networks** | HTTP/HTTPS & Status Codes | DIRECTLY REPORTED | Official Slide 3: "HTTP". Client error vs server error (400 vs 500), idempotency of GET/PUT/DELETE. | **CRITICAL (P1)** | Direct day-1 requirement for REST API development as an Associate Product Engineer. |
| **Computer Networks** | OSI & TCP/IP Layer Mapping | REPEATED PATTERN | Identifying functions of Network, Transport, and Application layers; device mapping (Switch vs Router). | **HIGH (P1)** | Standard staple of technical screening MCQs. |
| **Computer Networks** | DNS Resolution & ARP | REPEATED PATTERN | Candidate logs report questions on DNS hierarchy, A records, CNAME, and MAC-to-IP resolution. | **MEDIUM (P2)** | Fundamental internet infrastructure understanding. |
| **Cybersecurity** | Symmetric vs Asymmetric Encryption | DIRECTLY REPORTED | Official Slide 2: "Cybersecurity". RSA, AES, public/private key pairs, key exchange. | **HIGH (P1)** | Critical in modern SaaS data security, authentication, and secure token validation. |
| **Cybersecurity** | Hashing vs Encryption vs Salting | REPEATED PATTERN | Differences between irreversible hashing (SHA-256) and reversible encryption (AES); password salting. | **HIGH (P1)** | Foundational security knowledge for user authentication backends. |
| **Cybersecurity** | Web Vulnerabilities (SQLi, XSS, CSRF) | INFERRED PREPARATION | Standard web security questions asked during product engineer full-stack technical rounds. | **HIGH (P2)** | Essential for product engineers writing production endpoints touching databases and user sessions. |
| **Microprocessors** | 8085 / 8086 Architecture & Registers | DIRECTLY REPORTED | Official Slide 2: "Microprocessors". Accumulator, PC, SP, Flag register bit assignments (Z, S, P, CY, AC). | **HIGH (P1)** | Tests core hardware comprehension that college academics emphasize in written tests. |
| **Microprocessors** | Addressing Modes | REPEATED PATTERN | Identifying Immediate (`MVI`), Direct (`LDA`), Register Indirect (`MOV M, A`). | **HIGH (P1)** | High-frequency MCQ pattern in Indian campus recruitment tests. |
| **Microprocessors** | Interrupts & Priority | REPEATED PATTERN | Vectored vs Non-vectored, TRAP vs RST 7.5 / 6.5 / 5.5 / INTR priorities and maskability. | **HIGH (P1)** | Very frequently tested in microprocessor sections of technical MCQ rounds. |
| **Microprocessors** | Memory Hierarchy & Cache Mapping | GENERAL CS TOPIC | Direct, Associative, Set-Associative cache hits/misses, tag bit calculations. | **MEDIUM (P2)** | Evaluates latency and memory performance trade-offs. |
| **OOP** | 4 Pillars (Polymorphism, Inheritance, etc.) | REPEATED PATTERN | Slide 1 & 4. Universally verified in Round 4 Technical Interview. Compile-time vs Runtime polymorphism. | **CRITICAL (P1)** | Core paradigm used in DeltaX C#/.NET and Java production codebases. |
| **OOP** | Abstract Class vs Interface | REPEATED PATTERN | Extensively reported in technical interviews. Multiple inheritance of interface, default methods. | **CRITICAL (P1)** | Tests architectural software design principles (SOLID). |
| **OOP** | Composition vs Inheritance | INFERRED PREPARATION | Asked in senior technical interviews when probing code maintainability. | **HIGH (P2)** | Modern software engineering best practice ("Favor composition over inheritance"). |
| **DBMS** | SQL Joins & Aggregations | REPEATED PATTERN | `INNER`, `LEFT`, `RIGHT`, `FULL OUTER` joins; `GROUP BY` vs `HAVING`, second highest salary queries. | **CRITICAL (P1)** | Product Engineers interact with enterprise databases (SQL Server, Postgres) constantly. |
| **DBMS** | ACID Properties & Transactions | REPEATED PATTERN | Atomicity, Consistency, Isolation levels (Dirty Read, Non-repeatable Read, Phantom Read), Durability. | **HIGH (P1)** | Crucial for financial transactions, ad billing, and inventory balance integrity. |
| **DBMS** | Indexing (B-Tree vs Hash) | INFERRED PREPARATION | Why do indexes speed up `SELECT` but slow down `INSERT`/`UPDATE`? | **HIGH (P2)** | Directly applicable to query optimization on high-scale analytics data. |
| **Operating Systems** | Process vs Thread & Scheduling | REPEATED PATTERN | Preemptive vs Non-preemptive scheduling, Round Robin calculation, context switch overhead. | **HIGH (P2)** | Fundamental OS concepts frequently appearing in MCQs and Round 4 checks. |
| **Operating Systems** | Deadlocks & Concurrency | REPEATED PATTERN | Coffman conditions, Mutual Exclusion, Semaphore vs Mutex. | **HIGH (P2)** | Multi-threading synchronization in background workers. |
| **Operating Systems** | Virtual Memory & Paging | GENERAL CS TOPIC | Page table, TLB hit ratio, Page fault replacement algorithms (LRU, FIFO). | **MEDIUM (P2)** | Standard technical MCQ staple. |
