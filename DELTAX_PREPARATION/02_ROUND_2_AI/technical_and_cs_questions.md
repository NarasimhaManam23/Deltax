# DeltaX Round 2 AI Telephonic Interview: Technical & CS Fundamentals Questions

---

# SECTION 1: PROGRAMMING QUESTIONS (20 QUESTIONS)

---

### Q1: "What is the difference between pass-by-value and pass-by-reference?"
* **Likely Intent**: Evaluate core memory and parameter passing comprehension.
* **Sample Answer**: "In **pass-by-value**, the function receives a copy of the actual parameter's value; modifications made to the parameter inside the function do not affect the caller's original variable. In **pass-by-reference**, the function receives the actual memory reference of the argument; modifications directly alter the caller's original variable. Java and Python are strictly pass-by-value, where object variables pass references by value."
* **Bad Answer**: "Pass-by-value is for numbers, pass-by-reference is for objects."
* **Possible Follow-up**: "What happens when you pass a list to a function in Python and modify it via `.append()`?"

---

### Q2: "What is a memory leak, and how does it happen in languages with Garbage Collection?"
* **Likely Intent**: Systems engineering and runtime memory management.
* **Sample Answer**: "A memory leak occurs when memory that is no longer needed by an application is not released back to the operating system. In garbage-collected languages like Java, memory leaks happen when unneeded objects remain reachable through lingering references—such as unclosed resources, static collections holding references indefinitely, or unremoved listeners."
* **Bad Answer**: "Memory leaks only happen in C and C++ when you forget to call free()."
* **Possible Follow-up**: "How does Java's WeakReference help mitigate memory leaks in caches?"

---

### Q3: "What is the difference between prefix increment and postfix increment?"
* **Likely Intent**: Precise procedural operation understanding.
* **Sample Answer**: "Prefix increment (`++i`) increments the variable's value first and evaluates to the new incremented value. Postfix increment (`i++`) makes a temporary copy of the current value to yield in the immediate expression, and increments the variable's value in memory afterward."
* **Bad Answer**: "They both do the same thing: add 1."
* **Possible Follow-up**: "What is the output of `int i = 5; i = i++;` in Java?"

---

### Q4: "What is a segmentation fault in C/C++?"
* **Likely Intent**: Memory safety and OS memory boundaries.
* **Sample Answer**: "A segmentation fault occurs when a program attempts to access a memory address that it does not have permission to access—such as dereferencing a NULL or dangling pointer, writing to a read-only code segment, or accessing beyond allocated stack/heap bounds."
* **Bad Answer**: "It's when the CPU stops working."
* **Possible Follow-up**: "How do tools like Valgrind detect memory violations?"

---

### Q5: "What is the difference between Stack memory and Heap memory in application execution?"
* **Likely Intent**: Execution runtime architecture.
* **Sample Answer**: "**Stack memory** is fast, contiguous memory managed automatically by the CPU for local primitive variables and function call frames. It follows strict LIFO and has a fixed size. **Heap memory** is a large pool used for dynamic runtime object allocation managed manually via pointers or automatically via a garbage collector; allocation is slower and can lead to fragmentation."
* **Bad Answer**: "Stack is for arrays, heap is for integers."
* **Possible Follow-up**: "What exception occurs when recursion runs indefinitely without hitting a base case?"

---

### Q6: "What is the purpose of the `volatile` keyword in Java?"
* **Likely Intent**: Concurrency, CPU cache coherence, and memory visibility.
* **Sample Answer**: "`volatile` ensures that reads and writes to a variable go directly to main memory rather than being cached in a thread-local CPU register. It guarantees cross-thread **visibility** of updates without requiring expensive synchronized locking, although it does not guarantee atomicity for compound operations like `count++`."
* **Bad Answer**: "It makes variables run faster."
* **Possible Follow-up**: "Why is `volatile int count; count++;` not thread-safe?"

---

### Q7: "What is the difference between `==` and `.equals()` in Java?"
* **Likely Intent**: Object identity versus semantic equivalence.
* **Sample Answer**: "`==` is a reference equality operator that checks whether two object variables point to the exact same physical memory address. `.equals()` is a method designed to compare semantic content or state equality between two objects, which can be overridden in custom classes."
* **Bad Answer**: "They are interchangeable for strings."
* **Possible Follow-up**: "Why does `"A" == "A"` return true in Java?"

---

### Q8: "How does Python handle memory management and garbage collection?"
* **Likely Intent**: Python runtime internals.
* **Sample Answer**: "Python uses **Reference Counting** as its primary mechanism: every object tracks how many references point to it, deallocating immediately when count drops to zero. To handle cyclic references (Object A points to B, and B points to A), Python employs a generational cyclic garbage collector with three generations (0, 1, 2)."
* **Bad Answer**: "Python doesn't have garbage collection."
* **Possible Follow-up**: "What is the purpose of Python's `gc` module?"

---

### Q9: "What is the difference between a process and a thread in software execution?"
* **Likely Intent**: Core operating system abstraction.
* **Sample Answer**: "A **Process** is an executing instance of a program with its own private virtual memory space (code, data, heap, stack). A **Thread** is a lightweight path of execution within a process; multiple threads share the parent process's address space, code, and heap, but maintain private stacks and register sets."
* **Bad Answer**: "Threads are just faster processes."
* **Possible Follow-up**: "What is the overhead difference between a process context switch and a thread context switch?"

---

### Q10: "Explain the Global Interpreter Lock (GIL) in Python and its impact on multi-threading."
* **Likely Intent**: Python concurrency reality.
* **Sample Answer**: "The GIL is a mutex in CPython that allows only one native thread to execute Python bytecode at any given time, protecting internal reference counting from race conditions. Consequently, multi-threading in Python does not speed up CPU-bound tasks across multiple cores, although it provides concurrent speedups for I/O-bound tasks."
* **Bad Answer**: "The GIL stops Python from using the internet."
* **Possible Follow-up**: "How do you achieve true parallel multi-core execution in Python for CPU-heavy tasks?"

---

### Q11: "What are decorators in Python, and how do they work?"
* **Likely Intent**: Higher-order functional programming patterns.
* **Sample Answer**: "A decorator is a design pattern in Python that allows dynamically adding behavior to an existing function without modifying its source code. It is a higher-order function that accepts a function as an argument, wraps it with additional pre/post logic, and returns the wrapped function."
* **Bad Answer**: "It's an annotation that changes font colors."
* **Possible Follow-up**: "Have you ever written a custom decorator, for instance for execution timing or authentication?"

---

### Q12: "What is an abstract class versus an interface in Java?"
* **Likely Intent**: Object-oriented design contracts.
* **Sample Answer**: "An **Abstract Class** defines an identity hierarchy ('Is-A'), can hold mutable instance state, and can have constructors. An **Interface** defines a behavioral contract ('Can-Do'), supports multiple inheritance, and cannot hold instance fields or constructors."
* **Bad Answer**: "Interfaces have no methods; abstract classes have all methods."
* **Possible Follow-up**: "Can an interface have concrete methods in modern Java?"

---

### Q13: "What is the difference between Deep Copy and Shallow Copy?"
* **Likely Intent**: Reference mutation pitfalls.
* **Sample Answer**: "A **Shallow Copy** duplicates the top-level collection or object, but copies references to nested objects, meaning mutations to nested elements affect both copies. A **Deep Copy** recursively duplicates all nested objects, creating completely independent memory allocations."
* **Bad Answer**: "Deep copy is for large files; shallow copy is for small files."
* **Possible Follow-up**: "How do you create a deep copy in Python?"

---

### Q14: "What is method overloading versus method overriding?"
* **Likely Intent**: Compile-time vs runtime polymorphism.
* **Sample Answer**: "**Method Overloading** occurs within the same class where methods share the same name but have different parameter signatures, resolved at compile-time. **Method Overriding** occurs when a subclass redefines a method inherited from a superclass with the exact same signature, resolved dynamically at runtime via vtables."
* **Bad Answer**: "Overriding is for private methods; overloading is for public methods."
* **Possible Follow-up**: "Can we overload methods by changing only the return type in Java?"

---

### Q15: "What is the purpose of the `final` keyword in Java?"
* **Likely Intent**: Immutability and inheritance control.
* **Sample Answer**: "Applied to a variable, it makes the reference constant (cannot be reassigned). Applied to a method, it prevents subclasses from overriding it. Applied to a class, it prohibits inheritance entirely."
* **Bad Answer**: "It calls the garbage collector."
* **Possible Follow-up**: "If an ArrayList is declared `final`, can you add elements to it?"

---

### Q16: "What is the difference between synchronous and asynchronous execution?"
* **Likely Intent**: Concurrent programming principles.
* **Sample Answer**: "In **synchronous** execution, operations occur sequentially; a task blocks execution until it completes. In **asynchronous** execution, a task initiates and yields control, allowing other operations to execute concurrently while awaiting completion notifications via callbacks, promises, or async/await."
* **Bad Answer**: "Async is just multithreading."
* **Possible Follow-up**: "How does an Event Loop manage asynchronous tasks?"

---

### Q17: "What is a closure in programming?"
* **Likely Intent**: Functional programming scope preservation.
* **Sample Answer**: "A closure is a function that retains access to its lexical scope (enclosing variables) even when the function is executed outside its original defining scope."
* **Bad Answer**: "A function that has no return statement."
* **Possible Follow-up**: "Can you give an example of using a closure in JavaScript or Python?"

---

### Q18: "What are static methods and variables in Object-Oriented Programming?"
* **Likely Intent**: Class-level versus instance-level memory allocation.
* **Sample Answer**: "Static members belong to the class itself rather than to individual object instances. They are loaded once when the class is initialized in memory and shared across all instances without requiring object instantiation."
* **Bad Answer**: "Static variables cannot be changed."
* **Possible Follow-up**: "Why can static methods not access instance variables directly?"

---

### Q19: "What is the purpose of exception handling and how does `try-catch-finally` work?"
* **Likely Intent**: Fault tolerance and resource cleanup.
* **Sample Answer**: "`try` encloses code that may throw an exception; `catch` catches and handles specific exception types; `finally` executes guaranteed cleanup code (such as closing database connections or files) regardless of whether an exception occurred or was handled."
* **Bad Answer**: "It hides errors from the user."
* **Possible Follow-up**: "Will the `finally` block execute if there is a `return` statement inside `try`?"

---

### Q20: "What is the difference between String, StringBuilder, and StringBuffer in Java?"
* **Likely Intent**: String mutability, thread safety, and performance.
* **Sample Answer**: "`String` is immutable; every modification creates a new object in the heap. `StringBuilder` is mutable and fast for string concatenations, but is not thread-safe. `StringBuffer` is mutable and thread-safe because its methods are synchronized, incurring minor locking overhead."
* **Bad Answer**: "They are all interchangeable."
* **Possible Follow-up**: "Which one should you use inside a single-threaded loop doing 10,000 concatenations?"

---

# SECTION 2: DATA STRUCTURES & ALGORITHMS (20 QUESTIONS)

---

### Q21: "What is Big-O notation, and why is it important?"
* **Likely Intent**: Theoretical complexity analysis.
* **Sample Answer**: "Big-O notation describes the upper bound of an algorithm's asymptotic time or space complexity as input size $N$ grows toward infinity, allowing engineers to compare algorithm efficiency independently of specific hardware or compilers."
* **Bad Answer**: "It tells the exact seconds a program takes to run."

---

### Q22: "Explain the difference between an Array and a Linked List."
* **Likely Intent**: Linear data structure trade-offs.
* **Sample Answer**: "Arrays store elements in contiguous memory, offering $O(1)$ random access by index, but have fixed size and $O(N)$ insertion/deletion costs. Linked lists store elements in non-contiguous nodes linked by pointers, offering $O(1)$ insertions/deletions at known nodes, but requiring $O(N)$ sequential traversal with extra pointer memory overhead."
* **Bad Answer**: "Linked lists are always better than arrays."

---

### Q23: "What is a Hash Collision, and how is it resolved in practice?"
* **Likely Intent**: Hash table mechanics.
* **Sample Answer**: "A collision occurs when two distinct keys produce the same hash index. Resolved via **Separate Chaining** (storing colliding elements in a linked list or red-black tree at that bucket) or **Open Addressing** (probing alternative empty slots via linear, quadratic, or double hashing)."
* **Bad Answer**: "A collision happens when the computer runs out of memory."

---

### Q24: "What is the difference between BFS and DFS in graph traversal?"
* **Likely Intent**: Graph search strategies.
* **Sample Answer**: "**BFS** explores neighbor nodes level by level using a Queue, optimal for finding shortest paths in unweighted graphs. **DFS** explores paths as deeply as possible along each branch before backtracking using a Stack (or recursion), useful for topological sorting, cycle detection, and maze solving."
* **Bad Answer**: "BFS is for trees; DFS is for graphs."

---

### Q25: "How does Binary Search work, and what is its precondition?"
* **Likely Intent**: Algorithmic searching.
* **Sample Answer**: "Binary Search repeatedly divides a sorted search interval in half by comparing the middle element with the target. Precondition: the collection or search space MUST be monotonically ordered. Complexity: $O(\log N)$."
* **Bad Answer**: "It searches an array twice as fast."

---

### Q26: "What is a Binary Search Tree (BST)?"
* **Likely Intent**: Tree data structure invariants.
* **Sample Answer**: "A binary tree where every node satisfies the invariant: all keys in its left subtree are strictly less than the node's key, and all keys in its right subtree are strictly greater."
* **Bad Answer**: "A tree that has two roots."

---

### Q27: "What is the worst-case time complexity of searching in an unbalanced BST, and how do balanced trees solve this?"
* **Likely Intent**: Degenerate tree structures and self-balancing trees.
* **Sample Answer**: "In an unbalanced BST, keys inserted in sorted order form a degenerate linked list of height $N$, making search $O(N)$. Balanced trees (like AVL or Red-Black trees) use rotations during insertions and deletions to guarantee height $O(\log N)$."
* **Bad Answer**: "It's always $O(\log N)$."

---

### Q28: "What is a Min-Heap, and what are its primary operations?"
* **Likely Intent**: Priority queues.
* **Sample Answer**: "A complete binary tree where the key at every node is $\le$ the keys of its children. Root holds the minimum element ($O(1)$ peek). Insertion and extract-min both take $O(\log N)$ via heapify."
* **Bad Answer**: "It's a pile of unsorted numbers."

---

### Q29: "Explain the two conditions required to apply Dynamic Programming."
* **Likely Intent**: DP foundational theory.
* **Sample Answer**: "1. **Optimal Substructure**: The optimal solution to a problem contains optimal solutions to its subproblems. 2. **Overlapping Subproblems**: The recursive space contains repeated identical subproblems that can be cached (memoized) to avoid redundant recalculation."
* **Bad Answer**: "It needs an array and loops."

---

### Q30: "What is the difference between a Stack and a Queue?"
* **Likely Intent**: Basic linear data structure principles.
* **Sample Answer**: "A Stack follows LIFO (Last-In-First-Out); elements are inserted and removed from the same end (top). A Queue follows FIFO (First-In-First-Out); elements are inserted at the rear and removed from the front."
* **Bad Answer**: "They are both lists."

---

### Q31: "How do you detect a cycle in a singly linked list in $O(1)$ space?"
* **Likely Intent**: Floyd's cycle detection.
* **Sample Answer**: "Using Floyd's Tortoise and Hare algorithm: a slow pointer moves 1 step while a fast pointer moves 2 steps. If a cycle exists, the fast pointer will eventually overlap with the slow pointer inside the cycle."
* **Bad Answer**: "Store visited addresses in an array."

---

### Q32: "What is the difference between MergeSort and QuickSort?"
* **Likely Intent**: Sorting trade-offs.
* **Sample Answer**: "MergeSort divides into two halves, sorts recursively, and merges; it is stable and guarantees $O(N \log N)$ worst-case, but requires $O(N)$ extra memory. QuickSort partitions around a pivot in-place ($O(1)$ auxiliary space), but has an $O(N^2)$ worst case on poor pivot choices."
* **Bad Answer**: "MergeSort is for numbers; QuickSort is for strings."

---

### Q33: "What is a Monotonic Stack, and when would you use it?"
* **Likely Intent**: Algorithmic pattern recognition.
* **Sample Answer**: "A stack whose elements are strictly monotonically increasing or decreasing. Used to solve range query problems like 'Next Greater Element' or 'Largest Rectangle in Histogram' in linear $O(N)$ time."
* **Bad Answer**: "A stack that only holds one data type."

---

### Q34: "What is the Sliding Window technique?"
* **Likely Intent**: Array optimization patterns.
* **Sample Answer**: "An algorithmic approach that maintains a subset of contiguous elements between two pointers ($L$ and $R$). By expanding or contracting the window boundaries, it transforms nested $O(N^2)$ subarray evaluations into a single $O(N)$ pass."
* **Bad Answer**: "It's a GUI window animation."

---

### Q35: "What is a Trie (Prefix Tree), and why is it preferred for autocomplete?"
* **Likely Intent**: String data structures.
* **Sample Answer**: "A tree-like search structure where nodes represent characters along word paths. It allows searching for words or checking prefixes in $O(L)$ time, where $L$ is word length, completely independent of the total dictionary size $N$."
* **Bad Answer**: "A binary tree for integers."

---

### Q36: "What is Kadane's algorithm used for?"
* **Likely Intent**: Maximum subarray problem.
* **Sample Answer**: "It finds the maximum contiguous subarray sum in a 1D numeric array in $O(N)$ time and $O(1)$ space by iteratively deciding whether to extend the previous subarray or start fresh at the current element."
* **Bad Answer**: "Sorting an array."

---

### Q37: "What is the time complexity of building a heap from an unsorted array of size $N$?"
* **Likely Intent**: Classic algorithmic trap.
* **Sample Answer**: "$O(N)$ linear time using the bottom-up heapify algorithm, because the sum of heights of all nodes converges linearly: $\sum \frac{N}{2^{h+1}} O(h) = O(N)$."
* **Bad Answer**: "$O(N \log N)$."

---

### Q38: "What is Dijkstra's algorithm, and why does it fail on negative edge weights?"
* **Likely Intent**: Shortest path algorithms and greedy limitations.
* **Sample Answer**: "A greedy algorithm that finds the shortest path from a source vertex to all other vertices. It fails on negative weights because once a vertex is marked visited and its distance finalized, Dijkstra assumes no shorter path to that vertex can exist, which negative edges violate."
* **Bad Answer**: "It works on all graphs."

---

### Q39: "What is the difference between combinations and permutations?"
* **Likely Intent**: Combinatorial logic.
* **Sample Answer**: "**Permutations** consider order ($AB \neq BA$). **Combinations** disregard order ($AB == BA$). Total permutations of $N$ items is $N!$; combinations is $\binom{N}{K}$."
* **Bad Answer**: "They are synonyms."

---

### Q40: "How can you check if an integer $N$ is a power of 2 using bit manipulation?"
* **Likely Intent**: Bitwise optimization.
* **Sample Answer**: "Check `(n > 0) && ((n & (n - 1)) == 0)`. A power of 2 has exactly one binary 1, and $n - 1$ flips that bit to 0 and all lower bits to 1, producing bitwise AND of 0."
* **Bad Answer**: "Divide by 2 in a while loop."

---

# SECTION 3: CS FUNDAMENTALS (DBMS, OS, NETWORKS) (20 QUESTIONS)

---

### Q41: "What are the ACID properties in database systems?"
* **Likely Intent**: Transaction reliability fundamentals.
* **Sample Answer**: "**Atomicity** (all operations succeed or entire transaction rolls back), **Consistency** (state transitions preserve constraints and invariants), **Isolation** (concurrent transactions execute without interfering), and **Durability** (committed transactions survive crashes via logs)."
* **Bad Answer**: "It's a way to clean database tables."

---

### Q42: "What is the difference between a Clustered and a Non-Clustered index?"
* **Likely Intent**: Database physical storage mechanics.
* **Sample Answer**: "A **Clustered Index** physically alters the order in which rows are stored on disk; therefore, a table can have only one clustered index (usually the primary key). A **Non-Clustered Index** is a separate search structure that contains index keys and row pointers back to the physical data rows."
* **Bad Answer**: "Clustered indexes are faster than normal indexes."

---

### Q43: "Explain Database Normalization and the difference between 2NF and 3NF."
* **Likely Intent**: Schema design and redundancy elimination.
* **Sample Answer**: "Normalization organizes database relations to reduce data redundancy and update anomalies. **2NF** requires 1NF and eliminates Partial Dependencies (non-key attributes depending on a subset of composite keys). **3NF** requires 2NF and eliminates Transitive Dependencies (non-key attributes depending on other non-key attributes)."
* **Bad Answer**: "Normalization means making data normal."

---

### Q44: "What is a SQL Injection attack, and how is it prevented?"
* **Likely Intent**: Application security fundamentals.
* **Sample Answer**: "An attack where malicious SQL statements are injected into entry fields to manipulate query execution. Prevented by using Parameterized Queries (Prepared Statements) or ORMs, which separate SQL syntax from untrusted data parameters."
* **Bad Answer**: "By hiding the database password."

---

### Q45: "What is the difference between `WHERE` and `HAVING` in SQL?"
* **Likely Intent**: Query execution pipeline.
* **Sample Answer**: "`WHERE` filters individual rows before aggregation occurs and cannot use aggregate functions like `SUM()`. `HAVING` filters grouped result sets after `GROUP BY` aggregation."
* **Bad Answer**: "They do the exact same thing."

---

### Q46: "What is a Deadlock, and what are the 4 conditions required for it to occur?"
* **Likely Intent**: Concurrency and OS resource management.
* **Sample Answer**: "A condition where two or more processes are blocked waiting for resources held by each other in a cyclic dependency. The four Coffman conditions are: **Mutual Exclusion**, **Hold and Wait**, **No Preemption**, and **Circular Wait**."
* **Bad Answer**: "When the computer freezes."

---

### Q47: "What is Virtual Memory and Paging?"
* **Likely Intent**: Memory virtualization principles.
* **Sample Answer**: "**Virtual Memory** abstracts physical RAM by mapping logical process addresses to physical frames. **Paging** divides logical memory into fixed-size Pages and physical memory into Frames, loaded on-demand via page tables to eliminate external fragmentation."
* **Bad Answer**: "RAM stored in the cloud."

---

### Q48: "What is Belady's Anomaly?"
* **Likely Intent**: OS paging algorithms.
* **Sample Answer**: "The phenomenon where allocating more physical page frames to a process paradoxically increases the number of page faults. It occurs in the First-In-First-Out (FIFO) page replacement algorithm."
* **Bad Answer**: "A software virus."

---

### Q49: "What is Context Switching in an operating system?"
* **Likely Intent**: CPU scheduling and kernel overhead.
* **Sample Answer**: "The kernel procedure of saving the execution state (registers, Program Counter) of the currently running process or thread into its PCB, and restoring the state of the next scheduled process to execute on the CPU."
* **Bad Answer**: "Switching between applications by pressing Alt+Tab."

---

### Q50: "What is the difference between CPU Scheduling algorithms FCFS and Round Robin?"
* **Likely Intent**: Scheduling policies.
* **Sample Answer**: "**FCFS** is non-preemptive; processes run to completion in arrival order, suffering from the Convoy Effect. **Round Robin** is preemptive; each process receives a fixed time slice (quantum) in cyclic order, providing fairness for interactive systems."
* **Bad Answer**: "FCFS is fast; Round Robin is round."

---

### Q51: "Explain the TCP 3-Way Handshake."
* **Likely Intent**: Network transport protocols.
* **Sample Answer**: "1. Client sends `SYN` (with Initial Sequence Number $X$). 2. Server replies with `SYN-ACK` (with its own Sequence Number $Y$, and Acknowledgement $X+1$). 3. Client sends `ACK` (with Sequence Number $X+1$ and Acknowledgement $Y+1$), establishing the connection."
* **Bad Answer**: "Client says hello, server says hello, connection starts."

---

### Q52: "What is the difference between TCP and UDP?"
* **Likely Intent**: Transport layer trade-offs.
* **Sample Answer**: "TCP is connection-oriented, reliable, guarantees ordered delivery, and has flow/congestion control, but incurs higher overhead. UDP is connectionless, lightweight, has no retransmissions or ordering, offering low latency ideal for gaming, DNS, and video streaming."
* **Bad Answer**: "TCP is good, UDP is bad."

---

### Q53: "What happens when you type `https://www.google.com` in a browser and press Enter?"
* **Likely Intent**: Comprehensive full-stack networking lifecycle.
* **Sample Answer**: "1. Browser checks cache, then queries DNS to resolve the domain to an IP. 2. Client initiates TCP 3-way handshake over port 443. 3. TLS handshake negotiates encryption and authenticates server certificates. 4. Browser sends an HTTP GET request. 5. Server processes request and returns HTML/assets. 6. Browser parses HTML, builds DOM and CSSOM, and renders the webpage."
* **Bad Answer**: "Google opens immediately."

---

### Q54: "What is the difference between HTTP and HTTPS?"
* **Likely Intent**: Web security and encryption.
* **Sample Answer**: "HTTP transmits data in unencrypted plaintext over port 80. HTTPS wraps HTTP inside an encrypted TLS/SSL session over port 443, ensuring confidentiality, data integrity, and server authentication."
* **Bad Answer**: "HTTPS has a padlock icon."

---

### Q55: "What is the difference between HTTP status codes 401 and 403?"
* **Likely Intent**: API error handling conventions.
* **Sample Answer**: "**401 Unauthorized** means authentication credentials are missing or invalid ('Who are you?'). **403 Forbidden** means the user is authenticated, but does not possess the permissions required to access the resource ('You are not allowed here')."
* **Bad Answer**: "They both mean the page is not found."

---

### Q56: "What is DNS and which transport protocol does it use?"
* **Likely Intent**: Internet application protocols.
* **Sample Answer**: "Domain Name System resolves human-readable hostnames to IP addresses. It uses **UDP port 53** for standard rapid queries, and switches to **TCP port 53** for responses exceeding 512 bytes or for DNS zone transfers."
* **Bad Answer**: "DNS is an internet provider."

---

### Q57: "What is ARP (Address Resolution Protocol)?"
* **Likely Intent**: Network link layer resolution.
* **Sample Answer**: "ARP translates a known 32-bit IPv4 address into a 48-bit physical MAC address on a local area network by broadcasting an ARP Request and receiving a unicast ARP Reply."
* **Bad Answer**: "It's an audio format."

---

### Q58: "What is a Cross-Site Request Forgery (CSRF) attack?"
* **Likely Intent**: Web security mechanisms.
* **Sample Answer**: "An attack where an attacker tricks an authenticated user's browser into executing unauthorized state-changing requests against a vulnerable web application using the victim's stored cookies. Prevented via Anti-CSRF tokens and `SameSite` cookies."
* **Bad Answer**: "Hacking a server password."

---

### Q59: "What is the difference between Symmetric and Asymmetric encryption?"
* **Likely Intent**: Cryptographic primitives.
* **Sample Answer**: "Symmetric encryption (e.g., AES) uses a single shared secret key for both encryption and decryption, offering high speed. Asymmetric encryption (e.g., RSA) uses a public-private keypair, where data encrypted with the public key can only be decrypted by the private key."
* **Bad Answer**: "Symmetric is old, asymmetric is new."

---

### Q60: "What is an architectural RESTful API, and what makes an operation idempotent?"
* **Likely Intent**: API design standards for Associate Product Engineers.
* **Sample Answer**: "A REST API uses HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) to manipulate stateless resource representations. An operation is **idempotent** if making multiple identical requests leaves the server in the exact same state as making a single request (e.g., `GET`, `PUT`, `DELETE` are idempotent; `POST` is not)."
* **Bad Answer**: "REST is when you don't use databases."
