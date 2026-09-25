# DeltaX Cheat Sheets — Core Computer Science Fundamentals

> Rapid-revision cheat sheets covering:
> 12. Object-Oriented Programming (OOP)
> 13. Database Management Systems (DBMS & SQL)
> 14. Operating Systems (OS)
> 15. Computer Networks (CN)
> 16. Cybersecurity
> 17. Microprocessors & 8085 Architecture

---

## 12. Object-Oriented Programming (OOP) Cheat Sheet

### 4 Pillars & Mechanisms
- **Encapsulation**: Private fields + public getters/setters. Maintains data invariants.
- **Abstraction**: Abstract classes and interfaces hide concrete implementation details.
- **Inheritance**: Code reuse ("is-a" relationship). Avoid deep hierarchies (prefer composition).
- **Polymorphism**:
  - *Compile-Time (Static)*: Method Overloading (same method name, different parameter types/count). Return type alone is *not* sufficient.
  - *Runtime (Dynamic)*: Method Overriding (subclass overrides parent method with identical signature). Dispatched via `vtable` pointer (`vptr`).

### SOLID Principles Reference Card
- **S**RP: One class, one responsibility / reason to change.
- **O**CP: Open for extension, closed for modification (interfaces/plugins).
- **L**SP: Subclasses must be substitutable for base classes without breaking program correctness.
- **I**SP: Many small, client-specific interfaces rather than one fat, bloated interface.
- **D**IP: High-level modules should depend on abstractions (interfaces), not concrete classes.

### OOP Traps
- `static` methods cannot be overridden; they are hidden via static binding.
- If you declare *any* constructor, the compiler removes the default no-argument constructor.
- Abstract classes can have state and constructors; interfaces cannot have instance state.

---

## 13. Database Management Systems (DBMS & SQL) Cheat Sheet

### ACID Properties
- **A**tomicity: All-or-nothing (enforced by Undo Log / WAL).
- **C**onsistency: Data satisfies all integrity constraints (primary keys, foreign keys).
- **I**solation: Concurrency control (enforced by Locks & MVCC).
- **D**urability: Committed data is permanently saved on disk (enforced by Redo Log).

### Normalization Ladder
- **1NF**: Atomic values, no repeating groups.
- **2NF**: In 1NF + no partial dependencies (non-prime attributes depend on full candidate key).
- **3NF**: In 2NF + no transitive dependencies ($X \to Y \to Z$).
- **BCNF**: For every functional dependency $X \to Y$, $X$ must be a Super Key.

### SQL Join Logic
- `INNER JOIN`: Returns rows when there is a match in both tables.
- `LEFT JOIN`: Returns all rows from left table, with NULLs for unmatched right table rows.
- `RIGHT JOIN`: Returns all rows from right table, with NULLs for unmatched left table rows.
- `FULL OUTER JOIN`: Returns all rows when there is a match in either table.
- `CROSS JOIN`: Cartesian product ($M \times N$ rows).

### Indexing: B+ Tree vs Hash
- **B+ Tree**: High fan-out, low height (3–4 levels), range scans via linked leaves ($O(\log N)$ point lookups, $O(K)$ range scans).
- **Hash Index**: $O(1)$ exact match only; fails completely on range queries (`>`, `<`, `BETWEEN`) and `ORDER BY`.

---

## 14. Operating Systems (OS) Cheat Sheet

### Process vs Thread
- **Process**: Independent virtual memory space, high context switch overhead, communicates via IPC.
- **Thread**: Shares code, data, and heap within a process; private stack and registers; low context switch overhead.

### 4 Coffman Deadlock Conditions
1. **Mutual Exclusion**: Resource held in non-shareable mode.
2. **Hold and Wait**: Process holding resource requests additional resources.
3. **No Preemption**: Resource cannot be forcibly taken.
4. **Circular Wait**: Closed chain of processes waiting on each other.
*(Break ANY one condition to prevent deadlock!)*

### Memory & Paging Mechanics
- **Virtual Memory**: Divides address space into fixed pages (typically 4KB). Physical RAM divided into frames.
- **TLB (Translation Lookaside Buffer)**: Hardware cache for page table translations.
- **Page Fault**: Hardware trap when page is not present in RAM (valid bit = 0); OS reads from swap disk.
- **Thrashing**: OS spends more time swapping pages than executing instructions (working set > physical RAM).
- **Belady’s Anomaly**: Increasing physical page frames increases page faults in FIFO (does NOT occur in LRU).

---

## 15. Computer Networks (CN) Cheat Sheet

### OSI 7-Layer Model & Protocols
7. **Application**: HTTP, HTTPS, DNS, FTP, SMTP, SSH
6. **Presentation**: TLS, SSL, JPEG, ASCII
5. **Session**: NetBIOS, RPC, Sockets
4. **Transport**: TCP (reliable, streams, port), UDP (unreliable, datagrams)
3. **Network**: IP, ICMP (ping), ARP, Routers
2. **Data Link**: Ethernet, MAC addresses, Switches
1. **Physical**: Cables, Bits, Hubs, Radio waves

### TCP vs UDP
| Feature | TCP | UDP |
| :--- | :--- | :--- |
| Connection | Connection-oriented (3-way handshake) | Connectionless |
| Reliability | Guaranteed delivery (Retransmission) | Best-effort (packets can drop) |
| Ordering | Strict packet ordering via Seq numbers | Out-of-order delivery possible |
| Header Size | 20 – 60 bytes | Strictly 8 bytes |
| Flow / Congestion | Windowing, Slow Start, Congestion Avoidance | None |
| Typical Use | Web (HTTP/HTTPS), File transfer (FTP), Email | Video streaming (RTP), DNS, VoIP, Gaming |

### Key Port Numbers
- HTTP: 80 | HTTPS: 443 | DNS: 53 | SSH: 22 | FTP: 20/21 | SMTP: 25 | MySQL: 3306 | PostgreSQL: 5432 | MongoDB: 27017

---

## 16. Cybersecurity Cheat Sheet

### Core Attacks & Defenses
- **SQL Injection (SQLi)**: Attacker injects SQL syntax into query. **Defense**: Parameterized Queries / Prepared Statements, ORMs.
- **Cross-Site Scripting (XSS)**: Malicious script runs in victim's browser. **Defense**: Context-aware output encoding, CSP headers, `HttpOnly` cookie flags.
- **Cross-Site Request Forgery (CSRF)**: Forges unauthorized state-changing requests using user's cookies. **Defense**: Anti-CSRF tokens, `SameSite=Strict` cookies.
- **Brute Force & Rainbow Tables**: Precomputed hash lookups. **Defense**: Slow salted cryptographic hashes (bcrypt, Argon2, PBKDF2), rate limiting, MFA.

### Symmetric vs Asymmetric Cryptography
- **Symmetric**: One shared secret key for encryption and decryption (AES, DES). Fast; used for bulk data encryption.
- **Asymmetric**: Public key (encrypts) + Private key (decrypts). (RSA, ECC). Computationally heavy; used for key exchange and digital signatures.

---

## 17. Microprocessors & 8085 Architecture Cheat Sheet

### 8085 Architecture Specifications
- **Data Bus**: 8-bit bidirectional ($D_0 - D_7$)
- **Address Bus**: 16-bit unidirectional ($A_0 - A_{15}$), addressing $2^{16} = 64\text{ KB}$ memory.
- **Multiplexed Bus**: $AD_0 - AD_7$ carries lower 8-bit address and data, demultiplexed using the **ALE (Address Latch Enable)** signal.

### Flag Register Bitmask (8-bit)
```
Bit:   7   6   5   4   3   2   1   0
Flag:  S   Z   X  AC   X   P   X  CY
```
- **S (Sign)**: 1 if MSB ($D_7$) is 1 (negative).
- **Z (Zero)**: 1 if arithmetic/logic result is strictly 0.
- **AC (Auxiliary Carry)**: 1 if carry from bit $D_3$ to $D_4$ (used for BCD).
- **P (Parity)**: 1 if result has **EVEN** number of 1s (Even Parity!).
- **CY (Carry)**: 1 if carry/borrow out of MSB ($D_7$).
- **CRITICAL TRAP**: `INR` and `DCR` instructions affect `S`, `Z`, `AC`, `P`, but **DO NOT AFFECT CARRY (CY)**!

### Interrupt Vector Addresses & Priorities
| Interrupt | Priority | Trigger Type | Vector Address | Maskable? |
| :--- | :---: | :--- | :---: | :---: |
| **TRAP (RST 4.5)**| **1 (Highest)** | Level & Edge | $4.5 \times 8 = 36 = \mathbf{0024H}$ | **Non-Maskable** |
| **RST 7.5** | 2 | Rising Edge | $7.5 \times 8 = 60 = \mathbf{003CH}$ | Maskable |
| **RST 6.5** | 3 | Level | $6.5 \times 8 = 52 = \mathbf{0034H}$ | Maskable |
| **RST 5.5** | 4 | Level | $5.5 \times 8 = 44 = \mathbf{002CH}$ | Maskable |
| **INTR** | 5 (Lowest) | Level | Non-vectored (external hardware supplies opcode) | Maskable |
