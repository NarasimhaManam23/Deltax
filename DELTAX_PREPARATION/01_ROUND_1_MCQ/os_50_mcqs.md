# DeltaX Round 1 Question Bank: Operating Systems (50 MCQs)

---

### Q1
What is the fundamental difference between a Process and a Thread?
- A) A process runs on the CPU; a thread runs on the GPU
- B) A process has its own isolated address space (code, data, heap, stack); threads within the same process share the text, data, and heap segments but have private stacks and registers
- C) Threads can only run on single-core processors
- D) A process cannot contain multiple threads
**Correct Answer**: B
**Explanation**: Processes represent independent execution units with separate virtual memory address spaces. Threads are lightweight execution units within a process sharing memory and file descriptors.
**Topic**: Processes vs Threads
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q2
Which of the following is NOT shared among threads belonging to the same parent process?
- A) Heap memory
- B) Global variables (Data segment)
- C) Stack memory and CPU registers
- D) Open file descriptors
**Correct Answer**: C
**Explanation**: Each thread must maintain its own independent function call stack (local variables, return addresses) and register state (including Program Counter) to execute independently.
**Topic**: Threads
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q3
Which CPU scheduling algorithm provides the theoretical minimum average waiting time for a given set of stationary processes?
- A) First-Come, First-Served (FCFS)
- B) Round Robin (RR)
- C) Shortest Job First (SJF) / Shortest Remaining Time First (SRTF)
- D) Priority Scheduling
**Correct Answer**: C
**Explanation**: SJF is provably optimal because scheduling shorter jobs first minimizes the waiting time experienced by all subsequent waiting jobs.
**Topic**: CPU Scheduling
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q4
What is the "Convoy Effect" in CPU scheduling?
- A) When multiple threads access the same variable simultaneously
- B) When short, I/O-bound processes are forced to wait behind a long, CPU-heavy process in non-preemptive scheduling like FCFS
- C) When a system runs out of physical memory
- D) When priority inversion locks a mutex
**Correct Answer**: B
**Explanation**: Under FCFS, if a long CPU-bound process captures the CPU, all small interactive processes stall behind it, drastically degrading overall responsiveness.
**Topic**: CPU Scheduling
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q5
What are the four Coffman conditions that MUST hold simultaneously for a Deadlock to occur?
- A) Mutual Exclusion, Hold and Wait, Preemption, Starvation
- B) Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait
- C) Shared Memory, Paging, Virtual Memory, Swapping
- D) Threading, Context Switch, Interrupt, Polling
**Correct Answer**: B
**Explanation**: All four conditions must be present for a deadlock: Mutual Exclusion (exclusive resource use), Hold & Wait (holding while waiting), No Preemption (cannot forcibly revoke resources), and Circular Wait (cyclic dependency).
**Topic**: Deadlocks
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q6
Which algorithm is used by operating systems for Deadlock Avoidance by determining whether granting a resource request leaves the system in a "Safe State"?
- A) Round Robin Algorithm
- B) Banker's Algorithm
- C) Dijkstra's Algorithm
- D) LRU Algorithm
**Correct Answer**: B
**Explanation**: Dijkstra's Banker's Algorithm tests for safety by simulating the allocation of predetermined maximum resources to ensure at least one process completion sequence exists.
**Topic**: Deadlocks
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q7
What is "Belady's Anomaly"?
- A) A phenomenon where adding more CPU cores slows down execution
- B) A phenomenon in certain page replacement algorithms (such as FIFO) where allocating more physical page frames increases the number of page faults
- C) A deadlock detection error
- D) An infinite loop in recursive thread functions
**Correct Answer**: B
**Explanation**: First-In-First-Out (FIFO) page replacement exhibits Belady's Anomaly because it is not a stack-based algorithm; adding frames can cause frequently needed pages to be evicted earlier.
**Topic**: Virtual Memory & Paging
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q8
Which page replacement algorithm is immune to Belady's Anomaly?
- A) First-In-First-Out (FIFO)
- B) Least Recently Used (LRU)
- C) Second-Chance Algorithm
- D) Random Replacement
**Correct Answer**: B
**Explanation**: LRU and Optimal algorithms belong to the class of "Stack Algorithms" where the set of pages in an $N$-frame memory is always a subset of pages in an $(N+1)$-frame memory, precluding Belady's Anomaly.
**Topic**: Virtual Memory & Paging
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q9
What is "Thrashing" in an operating system?
- A) Overheating of the CPU
- B) A critical condition where the OS spends more time swapping pages in and out of secondary storage than executing user instructions, causing CPU utilization to collapse
- C) Deleting corrupt disk sectors
- D) Rapid context switching between two threads
**Correct Answer**: B
**Explanation**: Thrashing occurs when the sum of active processes' working sets exceeds physical RAM, triggering continuous cascading page faults that monopolize disk I/O.
**Topic**: Virtual Memory
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q10
What is the function of the Translation Lookaside Buffer (TLB)?
- A) Buffering network packets
- B) A fast hardware associative cache that stores recent virtual-to-physical page table translations, speeding up virtual address resolution
- C) Scheduling thread execution
- D) Managing disk swap files
**Correct Answer**: B
**Explanation**: The TLB eliminates the latency of accessing main memory page tables on every instruction by caching virtual-to-physical address mappings directly on the MMU.
**Topic**: Virtual Memory & TLB
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q11
What is a "Race Condition"?
- A) A benchmark test comparing two CPUs
- B) A flaw where multiple threads or processes access and manipulate shared data concurrently, and the final outcome depends on the nondeterministic order of execution
- C) When a network connection times out
- D) High-speed execution of assembly instructions
**Correct Answer**: B
**Explanation**: Race conditions occur in concurrent software when shared mutable state is accessed without proper synchronization primitives, leading to data corruption.
**Topic**: Concurrency & Synchronization
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q12
What is the difference between a Binary Semaphore and a Mutex?
- A) A binary semaphore is faster than a mutex
- B) A Mutex has the concept of ownership (only the thread that locked it can unlock it); a Semaphore can be signaled by any thread
- C) A mutex can have values greater than 1
- D) Semaphores only work on Linux
**Correct Answer**: B
**Explanation**: A Mutex is a locking mechanism with strict ownership semantics. A Semaphore is a signaling mechanism where one thread can signal (`V`) a semaphore to wake up another thread waiting (`P`).
**Topic**: Synchronization
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q13
What is the "Critical Section" in multi-threaded programming?
- A) The boot sequence of the operating system
- B) A section of code that accesses shared resources (like shared memory or files) that must not be executed concurrently by more than one thread
- C) The code responsible for handling kernel panics
- D) Memory allocated on the hardware stack
**Correct Answer**: B
**Explanation**: The critical section requires mutual exclusion: at most one thread may execute within it at any instant to ensure data consistency.
**Topic**: Synchronization
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q14
What is the purpose of the Process Control Block (PCB)?
- A) Compiling assembly code
- B) A kernel data structure that stores all information needed to manage a process (Process ID, State, Program Counter, CPU registers, Memory limits, Open files)
- C) Managing the motherboard bus
- D) Displaying UI windows
**Correct Answer**: B
**Explanation**: The PCB is the operating system's representation of a process, preserved and restored during context switches.
**Topic**: Process Management
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q15
What happens during a "Context Switch"?
- A) The CPU switches from 32-bit to 64-bit mode
- B) The OS saves the current state (registers, PC) of the running process/thread to its PCB and loads the saved state of another process to resume execution
- C) A file is moved from RAM to disk
- D) The user switches browser tabs
**Correct Answer**: B
**Explanation**: Context switching is the kernel procedure of saving a running process's hardware register state and restoring the state of the next scheduled process.
**Topic**: CPU Scheduling & Context Switch
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q16
What is the effect of setting a very small time quantum in Round Robin scheduling?
- A) System performance improves linearly
- B) Turnaround time drops to zero
- C) Context-switching overhead dominates CPU utilization, degrading overall system throughput
- D) The algorithm turns into First-Come, First-Served
**Correct Answer**: C
**Explanation**: Frequent time-slicing causes the CPU to spend a disproportionate percentage of clock cycles executing context-switch code and reloading caches rather than useful work.
**Topic**: CPU Scheduling
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q17
What does a Round Robin scheduler degenerate into if the time quantum is made larger than the burst time of the longest process in the system?
- A) Shortest Remaining Time First (SRTF)
- B) First-Come, First-Served (FCFS)
- C) Priority Scheduling
- D) Multilevel Feedback Queue
**Correct Answer**: B
**Explanation**: If the quantum exceeds the maximum process burst, every process runs to completion on its first turn, behaving identically to FCFS.
**Topic**: CPU Scheduling
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q18
What is the difference between Preemptive and Non-Preemptive scheduling?
- A) Preemptive is slower than non-preemptive
- B) In preemptive scheduling, the OS can interrupt a running process to allocate CPU to a higher-priority process; in non-preemptive scheduling, a process retains the CPU until it voluntarily yields or terminates
- C) Non-preemptive scheduling only works on dual-core CPUs
- D) Preemptive scheduling cannot cause race conditions
**Correct Answer**: B
**Explanation**: Preemption allows timer interrupts and priority events to forcibly swap processes off the CPU.
**Topic**: CPU Scheduling
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q19
What is "Internal Fragmentation" in memory management?
- A) Memory wasted because total free memory is sufficient but fragmented into non-contiguous chunks
- B) Memory wasted within an allocated partition/page when the process requires less space than the fixed partition size provided by the OS
- C) Memory corruption from malware
- D) Hard drive sector failure
**Correct Answer**: B
**Explanation**: Internal fragmentation occurs when memory is allocated in fixed-size blocks (e.g., 4 KB pages) and an application requests only a fraction (e.g., 100 bytes), leaving the remainder of the block unused.
**Topic**: Memory Management
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q20
What is "External Fragmentation", and how can it be eliminated?
- A) Memory wasted within fixed blocks; eliminated by increasing page size
- B) Memory wasted because free memory is broken into scattered small fragments that cannot satisfy a contiguous allocation request; eliminated via Paging or Compaction
- C) Disk space fragmentation; eliminated by reformatting
- D) CPU cache misses
**Correct Answer**: B
**Explanation**: External fragmentation occurs in variable-partition systems. Paging eliminates external fragmentation entirely by decoupling logical contiguous addresses from physical non-contiguous frames.
**Topic**: Memory Management
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q21
What is a "Page Fault"?
- A) A hardware fault indicating a burned RAM module
- B) An interrupt/trap generated by the Memory Management Unit (MMU) when a program accesses a virtual memory page that is not currently mapped into physical RAM
- C) A syntax error in assembly code
- D) A buffer overflow attack
**Correct Answer**: B
**Explanation**: When the valid/invalid bit in a page table entry indicates the page is on disk (swap space), the MMU raises a page fault trap, prompting the OS to read the page into a free physical frame.
**Topic**: Virtual Memory & Paging
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q22
What is a "Zombie Process" in Unix/Linux operating systems?
- A) A malicious background crypto miner
- B) A process that has completed execution but still has an entry in the process table because its parent process has not yet read its exit status via `wait()`
- C) A process running with infinite CPU time
- D) An unresponsive GUI window
**Correct Answer**: B
**Explanation**: A zombie process has released its memory and open files, but retains an entry in the process table to report its exit status to its parent.
**Topic**: Process Lifecycle
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q23
What is an "Orphan Process", and what happens to it in Linux?
- A) A process that is immediately killed by the kernel
- B) A process whose parent process terminated before it; it is adopted by the root system process (`init` or `systemd`, PID 1)
- C) A process without thread support
- D) A background daemon without network access
**Correct Answer**: B
**Explanation**: When a parent process dies before its child, the child becomes an orphan and is adopted by PID 1, which periodically calls `wait()` to clean up terminated zombies.
**Topic**: Process Lifecycle
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q24
What is the purpose of the `fork()` system call in Unix/Linux?
- A) To execute a new compiled binary file
- B) To create a new child process that is an exact duplicate clone of the calling parent process
- C) To divide CPU frequency by 2
- D) To create a new thread
**Correct Answer**: B
**Explanation**: `fork()` duplicates the parent process, returning 0 to the newly created child process and the child's PID to the parent process.
**Topic**: System Calls
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q25
What is the function of the `exec()` family of system calls?
- A) Terminating a process
- B) Replacing the current process image (code, data, heap, stack) with a completely new executable program binary from disk
- C) Pausing process execution
- D) Scheduling a thread
**Correct Answer**: B
**Explanation**: `exec()` overwrites the current process address space with a new program, retaining the original process ID (PID).
**Topic**: System Calls
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q26
What is "Starvation" in CPU scheduling, and which mechanism resolves it?
- A) Lack of memory; resolved by swapping
- B) Indefinite postponement of low-priority processes by continuous arrival of higher-priority processes; resolved via **Aging** (gradually increasing waiting processes' priorities over time)
- C) Cache thrashing; resolved by flushing
- D) Deadlock; resolved by aborting
**Correct Answer**: B
**Explanation**: Aging prevents starvation by incrementally boosting the priority of processes that spend extended periods waiting in the ready queue.
**Topic**: CPU Scheduling
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q27
What is "Inverted Page Table" architecture?
- A) A page table stored on disk
- B) A global page table with one entry per physical frame of RAM rather than per virtual page of each process, reducing memory overhead
- C) A page table that maps physical addresses to cache lines
- D) A reverse DNS lookup table
**Correct Answer**: B
**Explanation**: Inverted page tables index by physical frame number, drastically reducing page table memory footprints in large 64-bit address spaces.
**Topic**: Virtual Memory
**Difficulty**: Hard
**Source Classification**: GENERAL CS TOPIC

---

### Q28
What is the difference between User Mode and Kernel (Privileged) Mode in modern CPUs?
- A) User mode has direct access to hardware I/O; Kernel mode does not
- B) Kernel mode has unrestricted access to all CPU instructions and physical hardware; User mode executes with restricted privileges, requiring system calls to request kernel services
- C) User mode is only for desktop applications
- D) There is no difference
**Correct Answer**: B
**Explanation**: Dual-mode operation prevents faulty or malicious user applications from corrupting hardware or the OS kernel. Transitions occur via hardware interrupts or software traps (system calls).
**Topic**: OS Architecture & Dual Mode
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q29
What happens when a "Deadlock Detection" algorithm discovers a cycle in a single-instance Resource Allocation Graph (RAG)?
- A) The system continues normally
- B) A deadlock conclusively exists
- C) A deadlock might exist only if resources are shared
- D) The CPU reboots
**Correct Answer**: B
**Explanation**: For single-instance resource systems, a cycle in the Resource Allocation Graph is both a necessary and sufficient condition for a deadlock.
**Topic**: Deadlocks
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q30
What is the "Producer-Consumer Problem", and what synchronization primitives solve it?
- A) A client-server network protocol solved by sockets
- B) A classic concurrency synchronization problem where producer threads add items to a bounded buffer and consumer threads remove items; solved using Semaphores and Mutexes
- C) An e-commerce database problem solved by transactions
- D) An operating system installation problem
**Correct Answer**: B
**Explanation**: The problem tests buffer bound synchronization: producers must sleep when the buffer is full; consumers must sleep when the buffer is empty. Solved using counting semaphores (`empty`, `full`) and a mutex.
**Topic**: Synchronization
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q31
What is "Copy-On-Write" (COW) optimization in process management?
- A) Writing data twice to disk
- B) An optimization where `fork()` allows parent and child processes to share the same physical pages initially, duplicating a page only when either process attempts to write to it
- C) A RAID storage technique
- D) An automatic backup system
**Correct Answer**: B
**Explanation**: COW saves substantial memory and CPU cycles during `fork()`, especially since child processes frequently invoke `exec()` immediately afterward.
**Topic**: Virtual Memory
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q32
What is the "Dining Philosophers Problem" designed to illustrate?
- A) Database indexing algorithms
- B) Challenges of concurrent resource allocation, deadlock, and starvation when multiple processes require multiple shared resources simultaneously
- C) Network packet loss
- D) Cache coherence protocols
**Correct Answer**: B
**Explanation**: Devised by Edsger Dijkstra, it models resource sharing: if every philosopher picks up their left fork simultaneously, circular wait deadlocks the system.
**Topic**: Synchronization & Deadlocks
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q33
What is the purpose of Spooling (Simultaneous Peripheral Operations On-Line)?
- A) Printing without ink
- B) Buffering data for slow peripheral devices (like printers) onto disk so CPU execution is not blocked by peripheral I/O speeds
- C) Cooling CPU hardware
- D) Dividing processes into threads
**Correct Answer**: B
**Explanation**: Spooling intercepts output jobs, storing them on intermediate disk buffers so applications continue processing at full CPU speed while the device drains the queue.
**Topic**: I/O Management
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q34
What is the role of the Dispatcher in the operating system?
- A) Selecting which process to run next from the ready queue
- B) Giving control of the CPU to the process selected by the short-term scheduler (loading registers, switching to user mode, jumping to process restart location)
- C) Compiling code
- D) Managing disk swap
**Correct Answer**: B
**Explanation**: The Scheduler selects *which* process executes; the Dispatcher performs the low-level physical context-switch handover to *actually run* that process on the CPU.
**Topic**: CPU Scheduling
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q35
What is "Priority Inversion"?
- A) Lowering thread priorities to save battery
- B) A scenario where a high-priority thread is indirectly preempted or blocked by a low-priority thread holding a shared resource; solved via **Priority Inheritance**
- C) Inverting binary semaphore flags
- D) A bug in sorting algorithms
**Correct Answer**: B
**Explanation**: If a low-priority thread holds a mutex needed by a high-priority thread, and a medium-priority thread preempts the low-priority thread, the high-priority thread is stalled. Priority Inheritance temporarily elevates the low-priority thread's priority to resolve the block.
**Topic**: Concurrency & Synchronization
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q36
Which of the following disk scheduling algorithms services I/O requests by moving the disk arm in one direction until it hits the end, then reverses direction (like an elevator)?
- A) FCFS
- B) SSTF (Shortest Seek Time First)
- C) SCAN (Elevator Algorithm)
- D) C-SCAN
**Correct Answer**: C
**Explanation**: The SCAN algorithm sweeps across disk tracks back and forth, servicing requests in its path and preventing starvation seen in SSTF.
**Topic**: Disk Scheduling
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q37
What is the purpose of the Working Set Model in operating systems?
- A) Scheduling worker threads in a thread pool
- B) Tracking the set of pages actively referenced by a process during a recent time window $\Delta$ to ensure sufficient RAM is allocated to prevent thrashing
- C) Calculating employee shift hours
- D) Managing git repositories
**Correct Answer**: B
**Explanation**: Developed by Peter Denning, the Working Set Model dynamically approximates process locality to prevent thrashing.
**Topic**: Virtual Memory
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q38
What is the purpose of a System Call in an operating system?
- A) Calling external web APIs
- B) A programmatic interface that allows user-space programs to request privileged services directly from the operating system kernel (e.g., file I/O, process creation)
- C) Communicating between two mobile phones
- D) Invoking garbage collection
**Correct Answer**: B
**Explanation**: System calls switch CPU execution from unprivileged user mode to privileged kernel mode via software interrupts/traps.
**Topic**: System Calls
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q39
What is a "Spinlock"?
- A) A lock that constantly spins the hard drive
- B) A lock where a waiting thread repeatedly loops ("spins") checking the lock condition in a tight CPU loop rather than yielding the processor to sleep
- C) A deadlock resolution tool
- D) An encryption algorithm
**Correct Answer**: B
**Explanation**: Spinlocks avoid the expensive latency of context switching and thread sleep/wakeup cycles, making them ideal on multi-core systems when locks are held for very short durations.
**Topic**: Synchronization
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q40
What causes a "Segmentation Fault" (SIGSEGV) in C/C++ applications?
- A) A syntax error in loops
- B) An attempt by a program to access a memory address that it does not have permission to access (e.g., dereferencing a null/dangling pointer, or writing to read-only code segments)
- C) Running out of disk space
- D) A network socket timeout
**Correct Answer**: B
**Explanation**: When a virtual memory address falls outside the process's allocated segments or violates segment permissions (write to read-only), the MMU raises a hardware fault that the kernel delivers as `SIGSEGV`.
**Topic**: Memory Management
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q41
In multi-threaded architectures, what is a "Thread Pool"?
- A) A block of shared RAM
- B) A collection of pre-instantiated, idle worker threads waiting to be assigned incoming tasks, eliminating the overhead of repeated thread creation and destruction
- C) A synchronization barrier
- D) An array of thread IDs
**Correct Answer**: B
**Explanation**: Thread pools maintain a fixed set of reusable worker threads, preventing thread explosion and managing concurrent request execution smoothly.
**Topic**: Thread Management
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q42
Which page replacement algorithm looks forward in time and replaces the page that will not be used for the longest period in the future?
- A) FIFO
- B) LRU
- C) Optimal Page Replacement (OPT / Belady's Min)
- D) LFU (Least Frequently Used)
**Correct Answer**: C
**Explanation**: OPT is the theoretical benchmark algorithm with the lowest possible page fault rate, though it cannot be implemented in general-purpose OSs because future reference strings are unknown.
**Topic**: Virtual Memory & Paging
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q43
What is the difference between Monolithic Kernel and Microkernel architectures?
- A) Monolithic kernels are only used on mobile phones
- B) A Monolithic kernel executes all core OS services (file system, drivers, networking, memory) in a single privileged kernel space; a Microkernel keeps only minimal primitives in kernel space, running services in user space
- C) Microkernels are faster than monolithic kernels
- D) Monolithic kernels do not support virtual memory
**Correct Answer**: B
**Explanation**: Monolithic kernels (Linux) offer high performance via direct function calls. Microkernels (Mach, QNX) offer modularity and crash resilience at the expense of message-passing IPC latency.
**Topic**: OS Architecture
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q44
What is the function of the `kill` command/system call in Unix systems?
- A) Physically powers down the server
- B) Sends a specified signal (such as `SIGTERM`, `SIGKILL`, or `SIGHUP`) to a target process or process group
- C) Deletes a file permanently
- D) Closes network sockets
**Correct Answer**: B
**Explanation**: Despite its name, `kill` is a generic IPC signaling mechanism; while `SIGKILL` terminates a process, it can also send non-destructive signals like `SIGCONT` or `SIGUSR1`.
**Topic**: Process Management
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q45
What is the state transition when a process in the "Running" state issues an I/O request (e.g., reading a block from disk)?
- A) Running $\rightarrow$ Ready
- B) Running $\rightarrow$ Waiting / Blocked
- C) Running $\rightarrow$ Terminated
- D) Waiting $\rightarrow$ Ready
**Correct Answer**: B
**Explanation**: A process waiting for an external asynchronous event (like disk I/O) enters the Blocked/Waiting state until the hardware interrupt signals that data is ready.
**Topic**: Process States
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q46
What is the difference between Swapping and Paging?
- A) Paging moves entire processes; Swapping moves individual pages
- B) Swapping historically moves an entire process between physical memory and backing store (swap disk); Paging operates at the granularity of individual fixed-size pages
- C) Swapping does not require disk storage
- D) Paging only works on 16-bit CPUs
**Correct Answer**: B
**Explanation**: Traditional swapping swaps out entire process address spaces. Modern demand-paging systems swap individual pages on an as-needed basis.
**Topic**: Memory Management
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q47
What is the purpose of Mutex Lock "Double-Checked Locking" pattern?
- A) Encrypting locks twice
- B) Reducing locking overhead by first checking whether initialization is needed without acquiring a lock, acquiring the lock only if true, and re-checking the condition inside the lock
- C) Creating two concurrent threads
- D) Preventing stack overflows
**Correct Answer**: B
**Explanation**: Used in lazy Singleton initialization: avoids acquiring a synchronized lock on every single read access after the instance is constructed.
**Topic**: Synchronization Patterns
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q48
Which condition in the Coffman deadlock set is violated when an operating system enforces that all resources must be requested in a strict, globally numbered linear sequence?
- A) Mutual Exclusion
- B) Hold and Wait
- C) No Preemption
- D) Circular Wait
**Correct Answer**: D
**Explanation**: Forcing resources to be acquired in ascending numerical order ($R_1 < R_2 < R_3$) mathematically prevents the formation of cycles, neutralizing Circular Wait.
**Topic**: Deadlocks
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q49
What is a "Trap" in operating system terminology?
- A) An unhandled bug that crashes the kernel
- B) A software-generated interrupt caused by an exceptional condition (such as divide by zero, page fault) or by an explicit system call instruction
- C) A network firewall rule
- D) An infinite loop in user code
**Correct Answer**: B
**Explanation**: Traps (or exceptions) are synchronous software interrupts generated internally by the CPU in response to instruction execution.
**Topic**: Interrupts & System Architecture
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q50
What happens during "Paging Thrashing" when the OS attempts to resolve low CPU utilization by admitting more processes into the system?
- A) The system recovers instantly
- B) The situation worsens drastically because new processes demand more memory frames, exacerbating page faults and driving useful CPU throughput to near zero
- C) Virtual memory is converted to swap
- D) Disk queues clear up
**Correct Answer**: B
**Explanation**: Classical thrashing spiral: the scheduler sees low CPU utilization and wrongly assumes the system is underloaded, admitting more jobs, which demand more memory, increasing page faults and further locking the disk queue.
**Topic**: Virtual Memory
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED
