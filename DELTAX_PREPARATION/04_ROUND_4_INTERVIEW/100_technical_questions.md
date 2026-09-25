# DeltaX Round 4 — 100 Deep Technical Interview Questions

> Comprehensive, categorized question bank specifically built for the **DeltaX One-to-One Technical Interview (45 minutes)**.
> Based on directly reported candidate experiences, repeated technical interview patterns, and core CS fundamentals evaluated for the Associate Product Engineer role.

---

## Section 1: Programming & Core Language Mechanics (15 Questions)

### Q1: What is the exact difference between `*p++` and `(*p)++` in C/C++?
- **Interview Definition**: `*p++` increments the pointer address itself after dereferencing the current value, whereas `(*p)++` dereferences the pointer first and increments the value stored at that memory location.
- **Deep Technical Detail**: Due to operator precedence, postfix `++` has higher precedence than prefix `*`. However, because it is postfix, `*p++` evaluates `*(p++)`: it fetches the value at `p`, then increments pointer `p` to point to `p + 1`. In `(*p)++`, the parentheses force dereferencing first, so the value at address `p` is retrieved and then incremented in place.
- **Interviewer Trap**: Interviewers will show code like `int arr[]={10,20}; int *p=arr; printf("%d ", *p++); printf("%d ", (*p)++);` and ask for the final state of `arr` (`arr` becomes `{10, 21}`).

### Q2: How does Python manage memory, and how does the Global Interpreter Lock (GIL) impact multithreading?
- **Interview Definition**: Python uses reference counting combined with a cyclic garbage collector for memory management, while the GIL ensures only one native thread executes Python bytecode at any given moment.
- **Deep Technical Detail**: Every Python object has an `ob_refcnt`. When it drops to 0, memory is immediately deallocated. To detect circular references (e.g., `A.obj = B` and `B.obj = A`), Python runs a generational garbage collector (Generations 0, 1, 2) based on thresholds. The GIL protects CPython internal data structures from race conditions; therefore, CPU-bound multithreaded tasks in Python do not run in parallel across CPU cores. To achieve true parallel CPU execution, you must use multiprocessing (`multiprocessing` module).
- **Interviewer Trap**: Claiming that `threading` in Python speeds up CPU-intensive matrix multiplication or hashing. It actually runs slower due to GIL lock contention! Multithreading only helps I/O-bound tasks.

### Q3: What is the difference between `==` and `.equals()` in Java, and why must you override `hashCode()` when overriding `equals()`?
- **Interview Definition**: `==` compares reference memory addresses (or primitive values), whereas `.equals()` compares logical object equality. If two objects are equal according to `equals()`, they must return the same integer from `hashCode()` to adhere to the Java Collections contract.
- **Deep Technical Detail**: In a `HashMap` or `HashSet`, elements are placed into buckets based on `hash(key.hashCode()) % capacity`. If two equal objects have different hash codes, the collection will store them in different buckets. When you later call `map.get(key)`, Java looks in the wrong bucket and fails to find the object, leading to subtle data duplication and lookup bugs.
- **Interviewer Trap**: Writing a class that overrides `equals()` without `hashCode()`, inserting two identical objects into a `HashSet`, and being shocked when `set.size()` returns `2`.

### Q4: Explain the memory layout of a C/C++ program.
- **Interview Definition**: A C/C++ process memory is divided into five main segments: Text/Code, Initialized Data (.data), Uninitialized Data (.bss), Heap (dynamic memory), and Stack (local variables and call frames).
- **Deep Technical Detail**:
  - **Text**: Read-only executable machine instructions.
  - **.data**: Global and static variables explicitly initialized to non-zero values.
  - **.bss**: Global and static variables uninitialized or initialized to zero (allocated at runtime).
  - **Heap**: Managed by `malloc`/`free` or `new`/`delete`; grows upward toward higher addresses.
  - **Stack**: Stores stack frames (return addresses, local variables, parameters); grows downward toward lower addresses.
- **Interviewer Trap**: "Where does a local static variable get allocated?" In the `.data` or `.bss` segment, NOT on the stack!

### Q5: How do Java's Pass-by-Value semantics apply to object references?
- **Interview Definition**: Java is strictly pass-by-value, always. When passing an object, the value being passed is the **copy of the reference address**, not the object itself.
- **Deep Technical Detail**: If you modify the internal state of the passed object (`user.setName("Alice")`), the caller sees the change because both references point to the same heap object. However, if you reassign the reference inside the method (`user = new User("Bob")`), the caller's reference remains completely unchanged.

### Q6: What is a memory leak, and can memory leaks occur in garbage-collected languages like Java or Python?
- **Interview Definition**: A memory leak occurs when memory is allocated but can no longer be reached or freed by the application. In garbage-collected languages, memory leaks occur when unused objects remain reachable through unintentionally retained references.
- **Deep Technical Detail**: In Java/Python, typical leak sources include:
  1. Unbounded static collections (e.g., a static `List` or `Map` acting as an unmanaged cache).
  2. Unclosed resources (database connections, network sockets, file streams).
  3. Registered event listeners or observers that are never unregistered.
  4. ThreadLocal variables retained when threads are returned to a thread pool.

### Q7: Explain the difference between Deep Copy and Shallow Copy.
- **Interview Definition**: A shallow copy duplicates the outer object structure while copying memory references for nested objects; a deep copy recursively duplicates all nested objects, creating an entirely independent clone.
- **Deep Technical Detail**: In Python, `copy.copy(obj)` vs `copy.deepcopy(obj)`. Modifying a mutable child (e.g., a list inside a dictionary) in a shallow copy alters the original object's child.

### Q8: What are function pointers in C, and how do they enable callbacks?
- **Interview Definition**: A function pointer holds the memory address of executable code rather than data, allowing functions to be passed as arguments to other functions.
- **Deep Technical Detail**: Declaration syntax: `void (*callback)(int)`. This is the fundamental mechanism behind asynchronous event handling, dynamic dispatch in C, and standard library routines like `qsort(void *base, size_t nitems, size_t size, int (*compar)(const void *, const void*))`.

### Q9: How does Python's `asyncio` event loop differ from traditional OS threads?
- **Interview Definition**: `asyncio` uses cooperative multitasking on a single thread via an event loop and coroutines, whereas OS threads use preemptive multitasking managed by the operating system kernel.
- **Deep Technical Detail**: In `asyncio`, tasks explicitly yield control when awaiting I/O operations (`await fetch()`). Because execution is cooperative and single-threaded, there are no race conditions on memory variables between `await` suspension points, drastically reducing context-switching overhead and memory footprint.

### Q10: What is the difference between `final`, `finally`, and `finalize` in Java?
- **Interview Definition**: `final` is a keyword restricting mutability; `finally` is a block that always executes after try/catch; `finalize` is a deprecated method on `Object` called before garbage collection.
- **Deep Technical Detail**: `final` variable = constant; `final` method = cannot be overridden; `final` class = cannot be inherited. `finally` block executes even if `return` is called inside `try` (unless `System.exit(0)` is invoked). `finalize()` is deprecated in modern Java due to unpredictable execution timing and memory leaks.

### Q11: Explain volatile keyword in Java and C/C++.
- **Interview Definition**: In Java, `volatile` guarantees memory visibility across threads (reads/writes bypass CPU L1/L2 caches directly to main memory). In C/C++, `volatile` tells the compiler not to optimize away reads/writes because the value can change outside program control (e.g., hardware registers).
- **Interviewer Trap**: In C/C++, `volatile` does NOT provide thread synchronization or atomic operations. In Java, `volatile` ensures visibility and prevents instruction reordering, but does NOT make compound operations like `count++` atomic.

### Q12: How do list comprehensions differ from generator expressions in Python?
- **Interview Definition**: List comprehensions construct the entire list in memory immediately using square brackets `[x for x in data]`, while generator expressions compute items lazily on demand using parentheses `(x for x in data)`.
- **Deep Technical Detail**: Generators implement the iterator protocol (`__iter__()` and `__next__()`) and have an $O(1)$ memory footprint, making them essential for processing multi-gigabyte log files or large database query streams.

### Q13: What happens under the hood when a string concatenation occurs inside a loop in Java?
- **Interview Definition**: Repeated string concatenation with `+` inside a loop creates multiple intermediate `StringBuilder` and `String` objects, leading to $O(N^2)$ time complexity and heap churn.
- **Deep Technical Detail**: Because Java `String` is immutable, each loop iteration creates a new `StringBuilder`, appends the string, and converts back via `.toString()`. The optimal pattern is to explicitly instantiate one `StringBuilder` outside the loop and append to it in $O(N)$ amortized time.

### Q14: Explain the difference between Stack Overflow and Out of Memory (OOM) errors.
- **Interview Definition**: StackOverflowError occurs when the thread call stack runs out of memory (typically from infinite recursion), whereas OutOfMemoryError occurs when the JVM/process heap cannot allocate memory for new objects.
- **Deep Technical Detail**: Stack frames store local variables and return addresses; JVM stack size is configured via `-Xss` (e.g., 1MB per thread). Heap size is configured via `-Xmx` (e.g., 2GB).

### Q15: What is Method Inlining, and when does a JIT compiler apply it?
- **Interview Definition**: Method inlining is an optimization where the compiler replaces a method invocation directly with the body of the called function, eliminating call frame overhead.
- **Deep Technical Detail**: HotSpot JIT inlines frequent ("hot") methods that are small (typically $< 35$ bytes of bytecode). Inlining unlocks subsequent compiler optimizations like dead-code elimination, loop vectorization, and escape analysis.

---

## Section 2: Data Structures & Algorithms (15 Questions)

### Q16: How does a Hash Table handle collisions, and what is the difference between Chaining and Open Addressing?
- **Interview Definition**: Collisions occur when two distinct keys yield the same hash bucket index. Chaining stores colliding entries in a linked list or balanced tree at the bucket, while Open Addressing probes subsequent table slots until an empty slot is found.
- **Deep Technical Detail**:
  - **Chaining**: Degradation to $O(N)$ in linked lists; modern Java 8+ converts buckets with $> 8$ items to Red-Black Trees ($O(\log K)$).
  - **Open Addressing**: Linear probing ($idx = (h + i) \pmod M$), Quadratic probing, or Double Hashing. Prone to clustering. Open addressing requires a load factor $< 0.7$, while chaining can exceed 1.0.

### Q17: Why is QuickSort preferred over MergeSort for arrays, and vice versa for linked lists?
- **Interview Definition**: QuickSort has better cache locality and operates in-place ($O(1)$ extra space) on arrays, while MergeSort is preferred for linked lists because nodes can be spliced without auxiliary memory and linked lists do not support random access.
- **Deep Technical Detail**: QuickSort traverses contiguous memory, maximizing CPU L1/L2 cache hits. MergeSort on arrays requires $O(N)$ extra buffer memory for merging. On linked lists, MergeSort runs in $O(N \log N)$ time and $O(1)$ extra memory because pointer updates do not require memory copies.

### Q18: What is the difference between a Binary Search Tree (BST) and a Heap (Priority Queue)?
- **Interview Definition**: A BST maintains total ordering between left child $\le$ parent $\le$ right child, enabling $O(\log N)$ search, insertion, and deletion; a Min/Max Heap maintains partial ordering (parent $\le$ or $\ge$ children), enabling $O(1)$ root access and $O(\log N)$ extraction.
- **Deep Technical Detail**: An in-order traversal of a BST yields elements in strictly sorted order. In a heap, finding an arbitrary element takes $O(N)$ time because siblings are unordered. Heaps are stored efficiently in flat contiguous arrays where child indices are calculated via $2i + 1$ and $2i + 2$.

### Q19: Explain the working and time complexity of Dijkstra’s Algorithm.
- **Interview Definition**: Dijkstra's algorithm finds the shortest path from a single source node to all other nodes in a weighted graph with non-negative edge weights using a greedy priority queue approach.
- **Deep Technical Detail**: Using an adjacency list and min-heap, Dijkstra runs in $O((V + E) \log V)$ time. Each vertex is extracted once ($V \log V$), and each edge relaxation updates the heap ($E \log V$). It fails on graphs with negative cycles (where Bellman-Ford must be used).

### Q20: How does the Boyer-Moore Majority Voting Algorithm find the majority element in $O(N)$ time and $O(1)$ space?
- **Interview Definition**: It maintains a candidate and a counter; equal elements increment the counter while distinct elements decrement it. If a majority element ($> N/2$) exists, its count will withstand all cancellations.
- **Deep Technical Detail**: Pairs of distinct elements cancel each other out. If a majority element exists, it appears more often than all other elements combined, ensuring it remains as the candidate when the traversal completes. A second pass is required if the existence of a majority element is not guaranteed.

### Q21: What is a Monotonic Stack, and what problem patterns does it solve?
- **Interview Definition**: A monotonic stack is a stack whose elements are maintained in strictly increasing or decreasing order.
- **Deep Technical Detail**: It is used to find the "Next Greater Element", "Previous Smaller Element", or calculate areas in histograms in linear $O(N)$ time. Every element is pushed and popped at most once.

### Q22: When would you use a Trie (Prefix Tree) over a Hash Map?
- **Interview Definition**: A Trie is optimal for prefix-matching queries (e.g., autocomplete, spell-checking, IP routing prefixes) and searching words with shared prefixes with $O(L)$ search time where $L$ is word length, independent of the number of words $N$.
- **Deep Technical Detail**: A Hash Map requires computing the hash of the entire string ($O(L)$) and cannot perform prefix searches (`words starting with "app"`) without scanning all keys ($O(N \cdot L)$). A Trie answers prefix queries in $O(L)$ time.

### Q23: Explain the difference between BFS and DFS. When is BFS guaranteed to find the shortest path?
- **Interview Definition**: BFS explores neighbor by neighbor using a FIFO queue; DFS explores as deep as possible along a branch before backtracking using a LIFO stack.
- **Deep Technical Detail**: BFS is guaranteed to find the shortest path in an **unweighted graph** (or a graph where all edge weights are identical) because it visits vertices in order of increasing distance from the source. DFS does not guarantee shortest paths.

### Q24: What is the Two Pointers technique, and what preconditions are required to use it?
- **Interview Definition**: The two-pointer technique uses two integer indices traversing a sequence simultaneously to find a solution in $O(N)$ time without nested loops.
- **Deep Technical Detail**: For problems like 2Sum or Container With Most Water, the array must typically be **sorted** or exhibit monotonicity, ensuring that incrementing the left pointer strictly increases the sum/property while decrementing the right pointer strictly decreases it.

### Q25: How does the Sliding Window pattern reduce $O(N^2)$ brute force to $O(N)$?
- **Interview Definition**: By maintaining a window over a continuous subarray and incrementally updating window state (sum, character counts) when expanding the right edge or contracting the left edge, avoiding redundant recomputations.
- **Deep Technical Detail**: Each element enters the window once and leaves the window at most once, resulting in $2N$ operations, which is $O(N)$ amortized time.

### Q26: What is Topological Sort, and can it be applied to cyclic graphs?
- **Interview Definition**: Topological sort is a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge $u \to v$, vertex $u$ comes before $v$.
- **Deep Technical Detail**: It can be implemented using Kahn’s Algorithm (indegree counting + BFS queue) or DFS with post-order reversal. It **cannot** be applied to graphs with cycles. In fact, if Kahn's algorithm processes fewer than $V$ vertices, a cycle exists.

### Q27: Explain the Union-Find (Disjoint Set Union - DSU) data structure and its optimizations.
- **Interview Definition**: DSU tracks elements partitioned into disjoint subsets, supporting two operations: `find(x)` (identifies subset representative) and `union(x, y)` (merges two subsets).
- **Deep Technical Detail**: Optimized using **Path Compression** (flattening tree during `find`) and **Union by Rank/Size** (attaching smaller tree under root of deeper tree). Combined, operations achieve an amortized time complexity of $O(\alpha(N))$, where $\alpha$ is the inverse Ackermann function (effectively constant $\le 4$ for any practical input).

### Q28: How does Kadane’s Algorithm find the maximum subarray sum in $O(N)$ time?
- **Interview Definition**: Kadane's algorithm maintains a running current sum; at each position, it decides whether to extend the current subarray or start a new subarray with the current element (`curr = max(x, curr + x)`).
- **Deep Technical Detail**: At index $i$, the maximum subarray ending at $i$ is either $nums[i]$ alone or $nums[i]$ appended to the max subarray ending at $i-1$. If the running sum becomes negative, it resets, as adding a negative prefix will only diminish future subarray sums.

### Q29: What is the Master Theorem, and what are its limitations?
- **Interview Definition**: The Master Theorem provides closed-form asymptotic solutions for divide-and-conquer recurrences of the form $T(N) = aT(N/b) + f(N)$.
- **Deep Technical Detail**: Compares $f(N)$ with $N^{\log_b a}$. Case 1 ($f(N)$ is polynomially smaller) $\implies \Theta(N^{\log_b a})$. Case 2 ($f(N) = \Theta(N^{\log_b a} \log^k N)$) $\implies \Theta(N^{\log_b a} \log^{k+1} N)$. Case 3 ($f(N)$ is polynomially larger) $\implies \Theta(f(N))$. It does not apply if $a < 1$, $b \le 1$, or $f(N)$ is not polynomial (e.g., $f(N) = 2^N$).

### Q30: Explain the difference between Dynamic Programming (DP) and Memoization.
- **Interview Definition**: Memoization is a top-down approach that caches results of recursive calls, while Tabulation (DP) is a bottom-up approach that fills an iterative table in topological order of subproblems.
- **Deep Technical Detail**: Memoization only solves necessary subproblems but incurs call stack overhead (risk of StackOverflow). Tabulation avoids recursion stack overhead and often allows space optimization (reducing 2D DP tables to 1D or rolling variables).

---

## Section 3: Object-Oriented Programming (15 Questions)

### Q31: What are the Four Pillars of OOP, and how do they interact in real software?
- **Interview Definition**: Encapsulation (bundling data and methods while restricting direct access), Abstraction (hiding complex implementation behind simple interfaces), Inheritance (code reuse across hierarchical classes), and Polymorphism (executing type-specific behavior through a unified interface).
- **Deep Technical Detail**: Encapsulation prevents unauthorized state mutations via private variables and accessors. Abstraction allows clients to program against contracts (e.g., `PaymentService`) rather than concrete classes (`StripePaymentService`). Polymorphism dynamically invokes the correct implementation at runtime.

### Q32: What is the Virtual Method Table (vtable), and how does dynamic dispatch work in C++ and Java?
- **Interview Definition**: A vtable is a compiler-generated lookup table containing function pointers to virtual methods; dynamic dispatch resolves which overridden method to call at runtime using this table.
- **Deep Technical Detail**: Each class with virtual methods has a static vtable. Every instance of that class contains a hidden pointer (`vptr`) pointing to that class's vtable. When `basePtr->virtualMethod()` is invoked, the machine dereferences `vptr`, looks up the function offset in the vtable, and jumps to the address. This incurs a slight pointer dereference overhead compared to static dispatch.

### Q33: What is the "Diamond Problem" in multiple inheritance, and how do C++ and Java resolve it?
- **Interview Definition**: The Diamond Problem arises when a class inherits from two parent classes that both derive from a common ancestor, causing ambiguity over which inherited ancestor method or field to use.
- **Deep Technical Detail**: C++ resolves this via **virtual inheritance** (`class B : virtual public A`), ensuring only one shared instance of class A exists in the hierarchy. Java prohibits multiple inheritance of state/classes altogether, allowing multiple inheritance only through interfaces with explicit default method conflict resolution rules (`InterfaceA.super.method()`).

### Q34: Explain the difference between Method Overloading (Static Polymorphism) and Method Overriding (Dynamic Polymorphism).
- **Interview Definition**: Overloading occurs in the same class with identical method names but different parameter signatures (resolved at compile-time); overriding occurs in subclasses with identical method names and identical signatures (resolved at runtime).
- **Interviewer Trap**: "Can you overload a method by changing only the return type?" No! Return type is not part of the method signature in Java/C++; the compiler will produce a compilation error.

### Q35: What is the difference between an Abstract Class and an Interface? When would you choose one over the other?
- **Interview Definition**: An abstract class represents an "is-a" relationship and can maintain state (instance fields) and constructors, whereas an interface represents a "can-do" contract defining capabilities across unrelated classes.
- **Deep Technical Detail**: A class can inherit from only one abstract class (single inheritance), but can implement multiple interfaces. Choose an abstract class when you need shared mutable state or default base implementations. Choose an interface when defining polymorphic contracts across disparate hierarchies (e.g., `Comparable`, `Serializable`).

### Q36: Explain the SOLID principles with concrete examples.
- **Interview Definition**:
  - **S**ingle Responsibility Principle: A class should have only one reason to change.
  - **O**pen/Closed Principle: Software entities should be open for extension, closed for modification.
  - **L**iskov Substitution Principle: Subclasses must be substitutable for their base classes without altering program correctness.
  - **I**nterface Segregation Principle: Clients should not be forced to depend on interfaces they do not use.
  - **D**ependency Inversion Principle: High-level modules should depend on abstractions, not concrete details.
- **Practical AdTech Example**: For Open/Closed, an `AdBidder` engine should evaluate bids via a generic `BiddingStrategy` interface rather than modifying an `if/else` block whenever a new ad exchange (Google, Meta) is onboarded.

### Q37: What is Composition over Inheritance, and why is it preferred?
- **Interview Definition**: "Composition over inheritance" is the design principle that classes should achieve polymorphic behavior and code reuse by containing instances of other classes ("has-a") rather than inheriting from a base class ("is-a").
- **Deep Technical Detail**: Inheritance creates tight coupling (fragile base class problem where changes in parent break children) and violates encapsulation. Composition allows dynamically swapping behaviors at runtime (e.g., Strategy Pattern) and promotes cleaner unit testing with mocks.

### Q38: What is the purpose of constructors, and what happens if you don't define one?
- **Interview Definition**: A constructor initializes newly created object state in memory. If no constructor is defined, the compiler provides a default no-argument constructor that initializes fields to their default zero/null values.
- **Interviewer Trap**: If you define *any* parameterized constructor, the compiler **removes** the automatic default constructor. Calling `new MyClass()` without explicitly declaring a no-arg constructor will then result in a compilation error.

### Q39: Can you override a `static` or `private` method in Java?
- **Interview Definition**: No. Neither `static` nor `private` methods can be overridden.
- **Deep Technical Detail**: `private` methods are not visible to subclasses, so defining a method with the same name in a subclass is merely declaring a new independent method. `static` methods belong to the class, not instances, and are resolved at compile-time via static binding (called **Method Hiding**, not overriding).

### Q40: What are Design Patterns, and what is the difference between Singleton and Factory patterns?
- **Interview Definition**: Design patterns are reusable architectural solutions to common software engineering problems. A Singleton ensures a class has only one instance and provides a global access point; a Factory encapsulates object creation logic without exposing instantiation details to the client.
- **Deep Technical Detail**: Thread-safe Singleton implementation in Java requires double-checked locking with a `volatile` instance variable to prevent instruction reordering during initialization.

### Q41: Explain the difference between Shallow Immutability and Deep Immutability.
- **Interview Definition**: Shallow immutability means the object's direct fields cannot be reassigned; deep immutability means all nested referenced objects are also recursively immutable.
- **Deep Technical Detail**: In Java, declaring `final List<String> list = new ArrayList<>()` is shallow immutability (the reference `list` cannot change, but elements can still be added via `list.add("item")`). Deep immutability requires `Collections.unmodifiableList()` or `List.of()`.

### Q42: What is the Liskov Substitution Principle (LSP), and how does the classic "Square inherits from Rectangle" violate it?
- **Interview Definition**: LSP states that functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it or breaking invariants.
- **Deep Technical Detail**: If `Square` extends `Rectangle`, setting width (`setWidth(5)`) independently of height breaks the fundamental invariant of a square (width == height). If a client expects setting width to leave height unchanged, passing a `Square` causes unexpected side effects and violates LSP.

### Q43: How does Exception Handling interact with Object-Oriented principles?
- **Interview Definition**: Exceptions represent exceptional states that disrupt normal control flow. In Java, exceptions form an object hierarchy under `Throwable` (`Error` vs `Exception` $\to$ `Checked` vs `Unchecked/RuntimeException`).
- **Deep Technical Detail**: Checked exceptions must be declared in method signatures (`throws IOException`), enforcing contracts across API boundaries. Unchecked exceptions (`NullPointerException`, `IllegalArgumentException`) represent programmer errors or unexpected runtime states.

### Q44: What is Object Slicing in C++?
- **Interview Definition**: Object slicing occurs when a derived class object is assigned by value to a base class object, causing derived-specific member variables and vtable pointers to be stripped ("sliced") away.
- **Deep Technical Detail**: To prevent slicing, derived objects must be passed by reference (`Base&`) or pointer (`Base*`), preserving the complete derived instance and enabling dynamic polymorphism.

### Q45: Explain the difference between Cohesion and Coupling.
- **Interview Definition**: Cohesion measures how closely related and focused the responsibilities within a single module are; coupling measures the degree of interdependence between different modules. High cohesion and low coupling are ideal.

---

## Section 4: Database Management Systems (15 Questions)

### Q46: What are ACID properties, and how does a relational database enforce them?
- **Interview Definition**:
  - **Atomicity**: All operations succeed or all roll back (enforced via Write-Ahead Logging / Undo Logs).
  - **Consistency**: Data moves from one valid state to another satisfying all schema constraints (enforced via constraints and triggers).
  - **Isolation**: Concurrent transactions execute without cross-interference (enforced via Locks and MVCC).
  - **Durability**: Committed data survives system crashes (enforced via Redo Logs / Write-Ahead Logs flushed to disk).

### Q47: What is the difference between Clustered and Non-Clustered Indexes?
- **Interview Definition**: A clustered index determines the actual physical order of data rows on disk (only 1 per table); a non-clustered index stores index keys and pointers (row IDs or clustered keys) pointing to data rows (multiple allowed per table).
- **Deep Technical Detail**: In MySQL InnoDB, the primary key is always the clustered index. Non-clustered (secondary) index leaf nodes store the primary key value. Searching via a secondary index requires a secondary index traversal followed by a "bookmark lookup" to the clustered index, unless covered by a covering index.

### Q48: Why do relational databases use B+ Trees instead of Binary Search Trees or Hash Tables for indexing?
- **Interview Definition**: B+ Trees have a high branching factor (fan-out), keeping tree height low ($3-4$ levels for millions of rows) to minimize disk I/O, and link leaf nodes sequentially to enable fast range scans ($O(K)$).
- **Deep Technical Detail**: Binary Search Trees have poor cache locality, can unbalance, and require too many disk seeks ($O(\log_2 N)$). Hash indexes only support exact match lookups ($O(1)$) and fail completely on range queries (`WHERE age BETWEEN 20 AND 30` or `ORDER BY`). B+ tree internal nodes only store routing keys, allowing thousands of keys per disk page.

### Q49: Explain Database Normalization from 1NF to BCNF with violations.
- **Interview Definition**: Normalization organizes database schemas to reduce data redundancy and eliminate update/insert/delete anomalies.
  - **1NF**: Atomic values, no repeating groups.
  - **2NF**: In 1NF and no partial dependencies (every non-key attribute depends on the *entire* candidate key).
  - **3NF**: In 2NF and no transitive dependencies (non-key attributes depend *only* on candidate keys, not on other non-key attributes).
  - **BCNF**: Stricter 3NF where for every functional dependency $X \to Y$, $X$ must be a super key.

### Q50: What are the four SQL Transaction Isolation Levels and their associated read phenomena?
- **Interview Definition**:
  | Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read |
  | :--- | :---: | :---: | :---: |
  | **Read Uncommitted** | Yes | Yes | Yes |
  | **Read Committed** | No | Yes | Yes |
  | **Repeatable Read** | No | No | Yes (Avoided in InnoDB via MVCC) |
  | **Serializable** | No | No | No |
- **Phenomena**:
  - *Dirty Read*: Reading uncommitted changes from another transaction.
  - *Non-Repeatable Read*: Reading different values for the same row in two queries within the same transaction.
  - *Phantom Read*: A query re-executing a range filter returns new rows inserted by another committed transaction.

### Q51: How does Multi-Version Concurrency Control (MVCC) eliminate read locks?
- **Interview Definition**: MVCC allows readers and writers to operate concurrently without blocking each other by maintaining multiple snapshot versions of each data row.
- **Deep Technical Detail**: Each row contains hidden metadata columns (e.g., `xmin` creation transaction ID and `xmax` deletion transaction ID in PostgreSQL). When a query executes, it reads only row versions committed before the query's snapshot timestamp. Readers never block writers, and writers never block readers.

### Q52: What is the difference between `INNER JOIN`, `LEFT JOIN`, `FULL OUTER JOIN`, and `CROSS JOIN`?
- **Interview Definition**:
  - `INNER JOIN`: Returns rows with matching values in both tables.
  - `LEFT JOIN`: Returns all rows from the left table and matched rows from the right table (filling unmatched with NULL).
  - `FULL OUTER JOIN`: Returns all rows when there is a match in either table.
  - `CROSS JOIN`: Returns the Cartesian product of both tables ($M \times N$ rows).

### Q53: Explain the difference between `WHERE` and `HAVING` clauses in SQL.
- **Interview Definition**: `WHERE` filters individual rows *before* aggregation (`GROUP BY`); `HAVING` filters aggregated groups *after* aggregation.
- **Interviewer Trap**: "Can you use aggregate functions like `COUNT()` or `SUM()` inside a `WHERE` clause?" No, because aggregation has not yet occurred when `WHERE` executes.

### Q54: What is a SQL Injection (SQLi) attack, and how do Prepared Statements prevent it?
- **Interview Definition**: SQL injection occurs when malicious user input is concatenated directly into SQL queries, altering query logic. Prepared Statements prevent it by pre-compiling query structure and treating user inputs strictly as typed data parameters.
- **Deep Technical Detail**: When using parameterized queries (`SELECT * FROM users WHERE username = ?`), the database engine parses the SQL syntax tree *before* binding the parameters. Even if input contains `' OR 1=1 --`, it is treated as a literal string value and cannot modify the AST structure.

### Q55: How do Window Functions differ from `GROUP BY`?
- **Interview Definition**: `GROUP BY` collapses multiple rows into a single aggregated summary row, whereas Window Functions (`ROW_NUMBER()`, `RANK()`, `LEAD()`, `LAG()`) compute aggregations over a partition of rows while retaining individual row identities.
- **Example**: `SELECT user_id, amount, RANK() OVER (PARTITION BY user_id ORDER BY amount DESC) FROM transactions;`.

### Q56: What is Database Sharding, and what challenges does it introduce?
- **Interview Definition**: Sharding is horizontal partitioning of a database across multiple physical database servers based on a shard key.
- **Deep Technical Detail**: Challenges include:
  1. Cross-shard joins are extremely slow and complex.
  2. Distributed transactions require two-phase commit (2PC), reducing throughput.
  3. Re-sharding and handling hotspots if the shard key distribution is skewed.

### Q57: What is the Write-Ahead Log (WAL)?
- **Interview Definition**: WAL is an append-only log file on disk where database state changes must be durably recorded *before* the changes are written to the actual database table pages.
- **Deep Technical Detail**: Sequential disk writes to WAL are fast. If power fails before modified dirty buffer pages are flushed from RAM to disk, the database replays the WAL on restart (Redo) to restore committed transactions and rolls back uncommitted ones (Undo).

### Q58: What is the difference between Optimistic and Pessimistic Locking?
- **Interview Definition**: Pessimistic locking locks the record at the start of a transaction assuming conflicts will happen (`SELECT ... FOR UPDATE`); Optimistic locking does not lock rows during reading, but validates a version column before committing (`UPDATE ... WHERE version = 1`).
- **Deep Technical Detail**: Optimistic locking is superior for high-read, low-contention web applications (avoids lock overhead). Pessimistic locking is required in high-contention financial transactions where rollbacks and retries are expensive.

### Q59: Explain the difference between SQL (Relational) and NoSQL (e.g., MongoDB) databases.
- **Interview Definition**: SQL databases use fixed schemas, structured tables, and enforce ACID transactions with relational joins; NoSQL databases use dynamic schemas (document, key-value, graph), horizontal scaling, and prioritize eventual consistency.
- **DeltaX Context**: Relational databases (PostgreSQL) are used for ad billing and transactional campaign records; NoSQL/In-memory databases (Redis/MongoDB) are used for real-time bid caching and click session logs.

### Q60: What causes a Database Deadlock, and how does the engine resolve it?
- **Interview Definition**: A deadlock occurs when two or more transactions hold locks on resources the other transactions need, creating a circular wait condition.
- **Deep Technical Detail**: Relational databases run a background deadlock detection algorithm that periodically inspects the "wait-for" graph for directed cycles. When a cycle is detected, the database engine picks a "victim" transaction (usually the one with fewer updates), rolls it back, and throws a deadlock exception to allow the other transaction to finish.

---

## Section 5: Operating Systems (15 Questions)

### Q61: What is the fundamental difference between a Process and a Thread?
- **Interview Definition**: A process is an independent executing program with its own dedicated virtual address space and resources; a thread is the smallest unit of CPU execution within a process, sharing the process's memory space (code, data, heap) with other threads.
- **Deep Technical Detail**: Processes require Inter-Process Communication (IPC: pipes, sockets, shared memory) to exchange data. Threads communicate directly via shared memory, but require synchronization (mutexes, semaphores) to avoid race conditions. Creating a thread has significantly lower overhead than creating a process.

### Q62: What is Context Switching, and why is it expensive?
- **Interview Definition**: Context switching is the process of storing the CPU state (registers, program counter) of a running process/thread and restoring the state of another process/thread so execution can resume.
- **Deep Technical Detail**: Context switching consumes CPU cycles for kernel mode transitions. More importantly, process context switches flush CPU translation lookaside buffers (TLB) and invalidate L1/L2 CPU caches, leading to significant cache misses when the new process executes.

### Q63: What are the Four Necessary Conditions for Deadlock (Coffman Conditions)?
- **Interview Definition**:
  1. **Mutual Exclusion**: At least one resource is held in a non-shareable mode.
  2. **Hold and Wait**: A process holds resources while waiting for additional resources.
  3. **No Preemption**: Resources cannot be forcibly taken from a process holding them.
  4. **Circular Wait**: A circular chain of processes exists where each process waits for a resource held by the next.

### Q64: What is the difference between a Mutex and a Counting Semaphore?
- **Interview Definition**: A mutex is a locking mechanism owned by a single thread with binary states (locked/unlocked); a semaphore is a signaling mechanism with an integer counter permitting up to $N$ concurrent accesses.
- **Interviewer Trap**: "Can a thread unlock a mutex that was locked by another thread?" No! Mutex has ownership semantics. A semaphore can be signaled/incremented by any thread.

### Q65: How does Virtual Memory work, and what is Paging?
- **Interview Definition**: Virtual memory gives each process the illusion of a large, contiguous private address space by mapping virtual addresses to physical RAM frames through a Page Table.
- **Deep Technical Detail**: Memory is divided into fixed-size chunks called **pages** (typically 4KB). The CPU Memory Management Unit (MMU) translates virtual page numbers to physical frame numbers using page tables, cached by the Translation Lookaside Buffer (TLB).

### Q66: What is a Page Fault, and what steps does the OS take when it occurs?
- **Interview Definition**: A page fault occurs when a program attempts to access a virtual memory page that is not currently mapped into physical RAM.
- **Deep Technical Detail**:
  1. MMU detects the valid bit in the page table is 0 and triggers a hardware trap to the OS kernel.
  2. OS pauses process execution and saves CPU state.
  3. OS checks if the virtual address is valid. If invalid $\implies$ Segmentation Fault (`SIGSEGV`).
  4. If valid, OS locates an empty physical frame in RAM (or evicts an existing page using LRU).
  5. OS issues disk I/O to read the requested page from swap space into the frame.
  6. OS updates page table with the new frame and sets the valid bit to 1.
  7. Process execution is resumed from the instruction that caused the trap.

### Q67: What is Thrashing in an Operating System, and how is it resolved?
- **Interview Definition**: Thrashing occurs when a computer spends more time swapping pages between RAM and disk than executing user instructions due to insufficient physical memory.
- **Deep Technical Detail**: Occurs when the sum of working sets across all active processes exceeds available physical RAM. The OS is constantly servicing page faults. Resolution: Reduce the degree of multiprogramming (suspend low-priority processes) or add more physical RAM.

### Q68: What is Belady’s Anomaly?
- **Interview Definition**: Belady’s Anomaly is the phenomenon where increasing the number of page frames results in an *increase* in the number of page faults for certain page replacement algorithms like FIFO (First-In, First-Out).
- **Interviewer Trap**: Can Belady's Anomaly occur in LRU (Least Recently Used) or Optimal replacement? **No**. LRU belongs to the class of "Stack Algorithms" where the set of pages in memory for $N$ frames is always a subset of pages for $N+1$ frames.

### Q69: Explain the difference between User Mode and Kernel Mode.
- **Interview Definition**: Kernel mode (Ring 0) grants full, unrestricted access to the CPU and underlying hardware instructions; User mode (Ring 3) restricts execution to prevent user applications from directly damaging hardware or other processes.
- **Deep Technical Detail**: Transitions from user mode to kernel mode occur strictly through **System Calls** (e.g., `read()`, `write()`, `fork()`), software interrupts, or hardware exceptions.

### Q70: What is the difference between Preemptive and Non-Preemptive CPU Scheduling?
- **Interview Definition**: In preemptive scheduling, the OS can interrupt a currently running process and switch CPU to another process (e.g., Round Robin, Shortest Remaining Time First); in non-preemptive scheduling, a process retains the CPU until it voluntarily terminates or blocks for I/O (e.g., FCFS).

### Q71: What is a Zombie Process, and how does it differ from an Orphan Process?
- **Interview Definition**: A zombie process has finished execution but remains in the process table because its parent has not yet read its exit status via `wait()`; an orphan process is a running process whose parent has terminated, causing it to be adopted by `init` / `systemd` (PID 1).
- **Interviewer Trap**: "How do you kill a zombie process with `kill -9`?" You cannot kill a zombie process because it is already dead! You must kill the parent process or signal the parent to call `wait()`.

### Q72: Explain the Producer-Consumer problem and how semaphores solve it.
- **Interview Definition**: The producer-consumer problem coordinates two concurrent processes sharing a fixed-size buffer so the producer does not add data when the buffer is full and the consumer does not remove data when the buffer is empty.
- **Deep Technical Detail**: Solved using three semaphores:
  1. `mutex = 1` (mutual exclusion for buffer access).
  2. `empty = Buffer_Size` (tracks available empty slots).
  3. `full = 0` (tracks filled slots available to consume).

### Q73: What is Inode in a Unix File System?
- **Interview Definition**: An inode (index node) is a filesystem data structure that stores all metadata about a file (file size, permissions, owner, timestamps, direct/indirect disk block pointers) except its file name and actual data contents.
- **Deep Technical Detail**: Directory entries map human-readable file names to inode numbers. A hard link simply creates another directory entry pointing to the same inode number.

### Q74: What is Inter-Process Communication (IPC), and what are the fastest mechanisms?
- **Interview Definition**: IPC allows distinct processes with isolated virtual address spaces to exchange data. Mechanisms include Pipes, Named Pipes (FIFOs), Message Queues, Sockets, and Shared Memory.
- **Deep Technical Detail**: **Shared Memory** is the fastest IPC mechanism because data does not need to be copied between user space and kernel space buffers; processes read and write directly to shared physical memory frames.

### Q75: How does Round-Robin scheduling handle the Time Quantum trade-off?
- **Interview Definition**: If time quantum is too small, excessive context switching consumes CPU overhead; if time quantum is too large, Round-Robin degrades into First-Come-First-Served (FCFS), leading to poor interactive response times. Optimal quantum is typically 10–50 milliseconds.

---

## Section 6: Computer Networks & Protocols (10 Questions)

### Q76: Detail the TCP 3-Way Handshake and 4-Way Termination process.
- **Interview Definition**:
  - **Connection (3-Way)**: Client sends `SYN (seq=x)`; Server responds `SYN-ACK (seq=y, ack=x+1)`; Client responds `ACK (ack=y+1)`.
  - **Termination (4-Way)**: Client sends `FIN (seq=u)`; Server sends `ACK (ack=u+1)` (half-closed); Server sends its own `FIN (seq=v)`; Client responds `ACK (ack=v+1)` and enters `TIME_WAIT`.

### Q77: Why does TCP enter the `TIME_WAIT` state for 2MSL (Maximum Segment Lifetime)?
- **Interview Definition**: To ensure the final `ACK` is reliably delivered to the remote server (resending if the server re-transmits `FIN`) and to allow all old duplicate packets from previous connections to expire in the network before port reuse.
- **Interviewer Trap**: If a server frequently opens and closes short-lived TCP connections, sockets get stuck in `TIME_WAIT`, exhausting ephemeral ports.

### Q78: Compare TCP and UDP across reliability, header size, speed, and use cases.
- **Interview Definition**: TCP is connection-oriented, reliable (guaranteed delivery via sequence numbers and retransmissions), flow/congestion-controlled, has a 20–60 byte header, and is slower; UDP is connectionless, unreliable, has an 8-byte header, has minimal latency, and is used for video streaming, DNS, and online gaming.

### Q79: What happens when you type `https://www.deltax.com` into your browser? (Full Stack Network Flow)
- **Interview Definition**:
  1. Browser checks local DNS cache $\to$ OS cache $\to$ recursive DNS query to resolve domain to IP.
  2. Browser initiates TCP 3-way handshake on port 443.
  3. TLS Handshake: ClientHello $\to$ ServerHello + Certificate $\to$ Key exchange $\to$ Session keys generated.
  4. Browser sends encrypted HTTP `GET /` request.
  5. DeltaX load balancer / reverse proxy routes request to application backend.
  6. Backend processes request, queries database, returns HTTP 200 response with HTML/JSON.
  7. Browser renders DOM and fetches external assets (CSS, JS, images).

### Q80: What is the difference between HTTP/1.1, HTTP/2, and HTTP/3?
- **Interview Definition**:
  - **HTTP/1.1**: Head-of-line blocking at application level (1 request per TCP connection at a time; uses pipelining or domain sharding).
  - **HTTP/2**: Binary framing, multiplexing multiple streams over a single TCP connection, header compression (HPACK).
  - **HTTP/3**: Replaces TCP with **QUIC** (over UDP) to eliminate transport-layer head-of-line blocking caused by TCP packet loss.

### Q81: Explain the difference between HTTP Status Codes 401 Unauthorized and 403 Forbidden.
- **Interview Definition**: 401 indicates that the request lacks valid authentication credentials (user identity is unknown); 403 indicates that the user is authenticated, but does not have permission/authorization to access the requested resource.

### Q82: What is the Address Resolution Protocol (ARP), and how does it map IP to MAC?
- **Interview Definition**: ARP resolves a known Network Layer IP address to a physical Data Link Layer MAC address on the local local area network (LAN).
- **Deep Technical Detail**: The sender broadcasts an ARP Request packet (`Who has IP 192.168.1.1? Tell MAC AA:BB:CC...`). The machine holding that IP responds with a unicast ARP Reply containing its MAC address.

### Q83: How does DNS work, and what is the difference between A, CNAME, and MX records?
- **Interview Definition**: DNS translates human-readable hostnames to IP addresses.
  - **A Record**: Maps hostname directly to IPv4 address.
  - **AAAA Record**: Maps hostname to IPv6 address.
  - **CNAME Record**: Maps alias hostname to canonical domain name.
  - **MX Record**: Specifies mail exchange servers for email routing.

### Q84: What is the difference between Symmetric and Asymmetric Encryption?
- **Interview Definition**: Symmetric encryption uses the same single secret key for both encryption and decryption (AES, fast); Asymmetric encryption uses a mathematically linked public-private key pair (RSA, ECC, slow, used for digital signatures and key exchange).

### Q85: How does TCP Congestion Control work (Slow Start vs Congestion Avoidance)?
- **Interview Definition**: TCP regulates data transmission rate to prevent network saturation. Starts in **Slow Start** (congestion window `cwnd` doubles exponentially each RTT until `ssthresh`). Once threshold is reached, it switches to **Congestion Avoidance** (linear additive increase: `cwnd += 1` per RTT). Upon packet loss, it cuts window size (multiplicative decrease).

---

## Section 7: Cybersecurity (5 Questions)

### Q86: What is Cross-Site Scripting (XSS), and how do you prevent it?
- **Interview Definition**: XSS occurs when an attacker injects malicious client-side JavaScript into a trusted web application, which executes in a victim's browser.
- **Deep Technical Detail**: Types: Stored, Reflected, DOM-based. Prevention: Context-aware output encoding/escaping, Content Security Policy (CSP) headers, and storing authentication tokens in `HttpOnly` cookies (preventing JS access via `document.cookie`).

### Q87: What is Cross-Site Request Forgery (CSRF), and how do Anti-CSRF Tokens protect against it?
- **Interview Definition**: CSRF tricks an authenticated user's browser into sending unauthorized HTTP requests to a vulnerable application that trusts the user's session cookies.
- **Deep Technical Detail**: Prevented using unique, cryptographically random **Anti-CSRF tokens** validated on state-changing requests (`POST`, `PUT`, `DELETE`), or utilizing `SameSite=Strict` cookie attributes.

### Q88: Why should passwords never be stored using standard hashing algorithms like SHA-256?
- **Interview Definition**: SHA-256 is designed to be extremely fast in hardware (allowing attackers to test billions of hashes per second using GPUs or rainbow tables). Passwords must be hashed using slow, salted, computationally expensive key-derivation functions like **bcrypt**, **Argon2**, or **PBKDF2**.

### Q89: What is the difference between Authentication and Authorization?
- **Interview Definition**: Authentication verifies **who you are** (identity verification via password, MFA, biometrics); Authorization verifies **what you are permitted to do** (permissions and access control via RBAC, ABAC).

### Q90: How does a JSON Web Token (JWT) work, and what are common security vulnerabilities?
- **Interview Definition**: A JWT is an open standard (RFC 7519) compact token containing Header, Payload, and Signature, signed with a secret or private key.
- **Vulnerabilities**: Algorithm confusion attacks (setting `alg: "none"`), weak secret keys brute-forced offline, storing sensitive PII in unencrypted payloads, and inability to invalidate tokens before expiration without a server-side denylist.

---

## Section 8: AdTech Architecture & System Design (10 Questions)

### Q91: What is Real-Time Bidding (RTB) in AdTech, and what are its latency constraints?
- **Interview Definition**: RTB is an automated auction process where digital ad impressions are bought and sold in the time it takes a webpage to load, strictly requiring end-to-end response within **100 milliseconds**.
- **Deep Technical Detail**: Publisher ad tag $\to$ Supply-Side Platform (SSP) sends bid request $\to$ Demand-Side Platform (DSP like DeltaX) runs targeting engine, budget checks, and machine learning click-through rate (CTR) prediction $\to$ submits bid $\to$ SSP runs second-price or first-price auction $\to$ winning ad creative rendered.

### Q92: How would you design an Ad Click Deduplication and Fraud Detection Pipeline?
- **Interview Definition**: A real-time stream processing pipeline that ingests click events, validates session integrity, and filters duplicate or bot-generated clicks within a sliding time window.
- **Components**: Ingestion layer (Kafka/PubSub) $\to$ In-memory sliding window cache (Redis sorted sets by timestamp) $\to$ Event deduplication key (`user_ip + ad_id + user_agent`) $\to$ Threshold alerting for rate-limited IPs.

### Q93: How do you design a high-throughput Campaign Budget Pacing System?
- **Interview Definition**: A pacing system ensures an advertiser's budget is distributed evenly across a 24-hour campaign window rather than exhausting within the first hour of morning traffic.
- **Deep Technical Detail**: Uses probabilistic throttling (e.g., Token Bucket algorithm or PID controllers). If spend rate exceeds target trajectory, the system dynamically drops a percentage of eligible bid requests.

### Q94: What is the difference between Vertical Scaling and Horizontal Scaling?
- **Interview Definition**: Vertical scaling (scaling up) adds more CPU, RAM, or disk to a single server; Horizontal scaling (scaling out) adds more server instances behind a load balancer. Horizontal scaling provides higher fault tolerance and linear elastic capacity.

### Q95: Explain the CAP Theorem and its application in distributed systems.
- **Interview Definition**: The CAP theorem states that a distributed data store can simultaneously provide at most two out of three guarantees: **C**onsistency (all nodes see same data simultaneously), **A**vailability (every non-failing node returns a response), and **P**artition Tolerance (system continues functioning despite network splits).
- **Deep Technical Detail**: Network partitions are inevitable in real-world networks; therefore, systems must choose between CP (e.g., MongoDB, Spanner) or AP (e.g., Cassandra, DynamoDB).

### Q96: How does a Content Delivery Network (CDN) accelerate web assets?
- **Interview Definition**: CDNs deploy geographically distributed edge servers (Points of Presence - PoPs) that cache static and media content close to the end user, minimizing network latency and offloading traffic from origin servers.

### Q97: What is Rate Limiting, and how does the Token Bucket algorithm work?
- **Interview Definition**: Rate limiting protects backend services from abuse by restricting the number of requests a client can make within a specified timeframe.
- **Deep Technical Detail**: The Token Bucket algorithm maintains a bucket with capacity $B$ refilled with tokens at a constant rate $R$ per second. Each incoming request consumes 1 token. If the bucket is empty, requests are rejected with HTTP 429 Too Many Requests. It permits bursts of traffic up to capacity $B$ while enforcing an average rate $R$.

### Q98: How do you prevent Cache Stampede (Thundering Herd Problem)?
- **Interview Definition**: Cache stampede occurs when a high-traffic cache key expires, causing thousands of concurrent requests to hit the database simultaneously, potentially crashing it.
- **Solutions**:
  1. **Mutex / Distributed Lock**: Only the first worker acquires a lock to recompute the cache while others wait.
  2. **Probabilistic Early Expiration (XFetch)**: Recompute the cache in the background before it officially expires.
  3. **Stale-While-Revalidate**: Serve slightly stale data while an async thread refreshes the cache.

### Q99: What is the difference between Load Balancer Layer 4 (L4) and Layer 7 (L7)?
- **Interview Definition**: L4 load balancing routes traffic based on transport layer information (IP address and TCP/UDP port) without inspecting packet contents; L7 load balancing inspects application layer data (HTTP headers, URLs, cookies) to perform intelligent routing.

### Q100: How do you design an idempotent payment or billing API in an ad platform?
- **Interview Definition**: An idempotent API guarantees that making multiple identical requests has the exact same side-effect as making a single request.
- **Implementation**: The client generates a unique UUID `Idempotency-Key` sent in the HTTP request header. The server records this key in a transactional database table. If a duplicate key is received, the server skips processing and returns the cached result of the original transaction, preventing double billing.
