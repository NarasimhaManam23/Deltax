# DeltaX High-Priority Study Notes: OOP, DBMS & Operating Systems

---

# MODULE 1: Object-Oriented Programming (OOP) Core & Design

### Concept
OOP organizes software design around objects (instances of classes) that encapsulate state (attributes) and behavior (methods), promoting reusability, maintainability, and clean modularity.

### Interview Definition
"The four pillars of OOP are: **Encapsulation** (hiding internal state behind public accessors), **Abstraction** (exposing only essential interfaces while concealing implementation complexity), **Inheritance** (deriving new classes from existing ones to enable code reuse), and **Polymorphism** (allowing an entity to take multiple forms at compile-time or runtime)."

### Deep Explanation
1. **Polymorphism: Compile-Time vs Runtime**:
   * **Compile-Time (Static Binding / Early Binding)**:
     - Method Overloading: Same method name, different parameter signature (number, type, or order of arguments). Return type alone CANNOT differentiate overloaded methods!
     - Operator Overloading (C++ / Python): Customizing operator semantics for user types.
   * **Runtime (Dynamic Binding / Late Binding)**:
     - Method Overriding: Subclass provides a specific implementation of a method declared in its superclass with the exact same name, return type, and parameter signature.
     - Mechanism: **vtable (Virtual Method Table)** and **vptr (Virtual Pointer)**. Each class with virtual methods has a static vtable containing pointers to virtual function implementations. Each object instance contains a hidden `vptr` pointing to its class's vtable.
2. **Abstract Class vs Interface**:
   | Feature | Abstract Class | Interface (Java 8+) |
   | :--- | :--- | :--- |
   | **Inheritance** | Single inheritance only (`extends`) | Multiple inheritance supported (`implements`) |
   | **State / Variables** | Can have instance variables with state | Only `public static final` constants |
   | **Constructors** | Can declare constructors (invoked by subclass `super()`) | Cannot have constructors |
   | **Methods** | Can have abstract, concrete, protected, private methods | Abstract methods + `default` and `static` methods |
   | **Design Purpose** | Defines identity / core nature ("Is-A") | Defines capability / behavioral contract ("Can-Do") |
3. **Composition vs Inheritance**:
   * *Rule*: "Favor Composition over Inheritance."
   * Inheritance creates tight coupling: changes in a base class can break subclasses (fragile base class problem).
   * Composition models "Has-A" relationships: an object embeds instances of other classes as components. Enables changing behavior dynamically at runtime via dependency injection.

### Trap
1. Calling overridable methods inside a constructor: In Java/C++, calling an overridden method inside a base class constructor executes before the subclass constructor has initialized its fields, leading to `NullPointerException` or uninitialized state bugs!
2. Method overriding access modifiers: A subclass cannot reduce the visibility of an inherited method (e.g., if superclass declares `public void run()`, subclass CANNOT declare `protected void run()`).

### Practice Questions (5 Qs)
1. Can two methods in the same Java class have identical names and parameter lists but different return types?
2. How does the runtime engine know which overridden method to call when a superclass reference points to a subclass object?
3. Why can an abstract class have a constructor even though it cannot be directly instantiated?
4. What happens if a class implements two interfaces that both declare identical `default` methods?
5. Why is composition preferred over inheritance when building extensible enterprise software?

### Answers & Explanations
1. **Answer**: No. This causes a compilation error. Method signatures are defined strictly by method name and parameter types. Return type is not part of the signature.
2. **Answer**: Via dynamic dispatch using the virtual method table (vtable). The object's hidden `vptr` points to the subclass vtable, which holds the memory address of the subclass's overridden method.
3. **Answer**: To initialize common base class member fields when a concrete subclass is instantiated via `super()`.
4. **Answer**: Diamond problem compile-time error. The implementing class must explicitly override the conflicting method and specify which interface's method to invoke using `InterfaceName.super.methodName()`.
5. **Answer**: Composition provides loose coupling, allows dynamic behavioral swapping at runtime, encapsulates internal details, and avoids the fragile base class problem where changes in parent classes inadvertently break child classes.

---

# MODULE 2: Database Management Systems (DBMS) & SQL

### Concept
A DBMS stores, queries, and manages structured data. Relational databases enforce schema constraints and guarantee transaction reliability through ACID properties.

### Interview Definition
"Relational databases structure data into normalized tables linked by foreign keys. ACID properties ensure that database transactions are executed reliably even in the event of crashes, network failures, or concurrent race conditions."

### Deep Explanation
1. **ACID Properties**:
   * **Atomicity**: "All or nothing". All operations within a transaction succeed together, or the entire transaction is rolled back. Maintained via write-ahead logging (WAL) / undo logs.
   * **Consistency**: The database moves from one valid state to another, satisfying all schema constraints, cascades, and business rules.
   * **Isolation**: Concurrent transactions execute without interfering with one another.
     - *Isolation Levels & Anomalies*:
       1. *Read Uncommitted*: Suffers from **Dirty Read** (reading uncommitted changes from another transaction).
       2. *Read Committed*: Prevents dirty reads; suffers from **Non-Repeatable Read** (re-reading same row returns different values).
       3. *Repeatable Read*: Prevents non-repeatable reads; suffers from **Phantom Read** (re-executing query returns new inserted rows).
       4. *Serializable*: Highest isolation; fully serial execution via range locks, no anomalies, lowest concurrency.
   * **Durability**: Once a transaction commits, its state is permanently written to non-volatile storage and survives power outages. Maintained via redo logs.
2. **SQL Joins**:
   * `INNER JOIN`: Returns rows that have matching values in both tables.
   * `LEFT JOIN`: Returns all rows from left table, plus matched rows from right table (fills `NULL` when no match).
   * `FULL OUTER JOIN`: Returns all rows when there is a match in either left or right table.
   * `CROSS JOIN`: Cartesian product ($N \times M$ rows).
3. **Database Normalization**:
   * **1NF**: Atomic values (no multi-valued attributes, no repeating groups).
   * **2NF**: In 1NF + No **Partial Dependency** (every non-prime attribute must depend on the whole candidate key, not a subset).
   * **3NF**: In 2NF + No **Transitive Dependency** (non-prime attributes must not depend on other non-prime attributes: $X \rightarrow Y$ and $Y \rightarrow Z$).
   * **BCNF (Boyce-Codd NF)**: For every non-trivial functional dependency $X \rightarrow Y$, $X$ must be a **super key**.
4. **Indexing Mechanics**:
   * **Clustered Index**: Determines physical storage order of rows in the table. Exactly **1 clustered index per table** (usually Primary Key).
   * **Non-Clustered Index**: Separate search tree structure that stores column values and pointers (Row IDs / clustered keys) back to the actual data rows. Can have multiple per table.
   * *Trade-off*: Indexes drastically speed up `SELECT` queries ($O(\log N)$ via B-Tree traversal) but add overhead to `INSERT`, `UPDATE`, and `DELETE` operations because the B-Tree must be rebalanced.

### Trap
1. `WHERE` vs `HAVING`: `WHERE` filters rows *before* aggregation; `HAVING` filters aggregated groups *after* `GROUP BY`. `WHERE` cannot contain aggregate functions like `SUM()` or `COUNT()`.
2. `NULL` comparisons: In SQL, `val = NULL` is ALWAYS false/unknown! You must write `val IS NULL`.

### Practice Questions (5 Qs)
1. Write the SQL query to find the second highest salary from an `Employee` table without using `LIMIT` or `TOP`.
2. Which transaction isolation level eliminates Dirty Reads but permits Non-Repeatable Reads?
3. If table A has 10 rows and table B has 5 rows, how many rows are returned by a `CROSS JOIN`?
4. What is the fundamental requirement for a relation to be in Boyce-Codd Normal Form (BCNF)?
5. Why can a database table have only one clustered index?

### Answers & Explanations
1. **Answer**:
   ```sql
   SELECT MAX(salary) FROM Employee 
   WHERE salary < (SELECT MAX(salary) FROM Employee);
   ```
2. **Answer**: Read Committed.
3. **Answer**: $50$ rows ($10 \times 5$).
4. **Answer**: For every non-trivial functional dependency $X \rightarrow Y$, the determinant $X$ must be a candidate key (or super key).
5. **Answer**: Because a clustered index defines the physical order of rows on disk. Physical data can only be sorted in one physical sequence at a time.

---

# MODULE 3: Operating Systems Core Principles

### Concept
An Operating System acts as an intermediary between user applications and computer hardware, managing CPU allocation, memory spaces, storage, and I/O devices.

### Interview Definition
"A **Process** is an executing program with an isolated address space (code, data, heap, stack). A **Thread** is a lightweight unit of execution within a process that shares the parent's address space, code, data, and open file descriptors while maintaining its own private Program Counter, register set, and stack."

### Deep Explanation
1. **Process vs Thread**:
   * Processes are isolated; inter-process communication (IPC) requires OS primitives (Pipes, Sockets, Shared Memory, Message Queues).
   * Threads communicate directly via shared memory in the heap, making communication fast but vulnerable to race conditions requiring synchronization.
2. **CPU Scheduling**:
   * **FCFS**: Non-preemptive, suffers from **Convoy Effect** (short jobs wait behind long CPU-bound job).
   * **SJF / SRTF**: Provably optimal average waiting time; suffers from starvation of long jobs.
   * **Round Robin (RR)**: Preemptive, time-sliced ($q$). If quantum $q \to \infty$, becomes FCFS. If $q$ is too small, context switching overhead dominates.
3. **Deadlocks & Coffman Conditions**:
   A deadlock occurs when processes are blocked waiting for resources held by each other in a cyclic dependency. All 4 **Coffman conditions** must hold simultaneously:
   1. *Mutual Exclusion*: Resources cannot be shared simultaneously.
   2. *Hold and Wait*: A process holding resources can request new ones.
   3. *No Preemption*: Resources cannot be forcibly revoked from a process.
   4. *Circular Wait*: A closed chain of processes exists where each process holds resources requested by the next.
   - *Prevention*: Violate any one of the 4 conditions (e.g., impose strict linear ordering on resource acquisition to eliminate circular wait).
4. **Virtual Memory & Page Replacement**:
   * Divides physical memory into fixed-size **Frames** and logical memory into **Pages**.
   * **Page Fault**: Occurs when a referenced page is not currently present in physical RAM, triggering an OS trap to load it from disk.
   * **Belady's Anomaly**: For certain page replacement algorithms (notably **FIFO**), increasing the number of physical page frames can paradoxically *increase* the number of page faults! (LRU and Optimal do NOT suffer from Belady's anomaly because they are stack-based algorithms).

### Practice Questions (5 Qs)
1. Which CPU scheduling algorithm produces the minimum possible average waiting time for a given set of processes?
2. Name the four Coffman conditions necessary for a deadlock to occur.
3. What is Belady's Anomaly, and which page replacement algorithm famously exhibits it?
4. What information is shared between two threads belonging to the same process, and what is kept private?
5. What is Thrashing in an operating system, and how does it affect CPU utilization?

### Answers & Explanations
1. **Answer**: Shortest Job First (SJF) / Shortest Remaining Time First (SRTF).
2. **Answer**: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, 4. Circular Wait.
3. **Answer**: Belady's Anomaly is the phenomenon where allocating more page frames to a process leads to an increase in the number of page faults. It occurs in the First-In-First-Out (FIFO) page replacement algorithm.
4. **Answer**:
   - *Shared*: Address space, Text (code) segment, Data segment, Heap memory, and OS resources (open file descriptors, signals).
   - *Private*: Program Counter (PC), CPU registers, Stack (local variables and call frames), and Thread ID.
5. **Answer**: Thrashing occurs when the system spends more time swapping pages in and out of virtual memory to disk than executing user instructions. When thrashing occurs, CPU utilization plummets toward zero because all processes are queued waiting for disk I/O.
