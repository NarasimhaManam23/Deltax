# DeltaX Round 1 Question Bank: Microprocessors & Architecture (50 MCQs)

---

### Q1
How many address lines and data lines are present on the Intel 8085 microprocessor?
- A) 8 address lines, 8 data lines
- B) 16 address lines, 8 data lines
- C) 16 address lines, 16 data lines
- D) 20 address lines, 16 data lines
**Correct Answer**: B
**Explanation**: The 8085 is an 8-bit microprocessor with 8 data lines ($D_7-D_0$, multiplexed as $AD_7-AD_0$) and 16 address lines ($A_{15}-A_0$), allowing it to address up to $2^{16} = 64\text{ KB}$ of memory.
**Topic**: 8085 Architecture
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q2
Which 16-bit register in the Intel 8085 microprocessor stores the memory address of the next instruction to be fetched and executed?
- A) Accumulator
- B) Stack Pointer (SP)
- C) Program Counter (PC)
- D) Memory Address Register (MAR)
**Correct Answer**: C
**Explanation**: The Program Counter (PC) is a 16-bit register that tracks program sequence by holding the address of the next instruction byte to fetch from memory.
**Topic**: 8085 Registers
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q3
What happens to the 8085 Stack Pointer (SP) during execution of a 2-byte `PUSH` instruction (e.g., `PUSH B`)?
- A) Incremented by 2
- B) Decremented by 2
- C) Incremented by 1
- D) Remains unchanged
**Correct Answer**: B
**Explanation**: The 8085 stack grows downwards in memory. When a 16-bit register pair is pushed, SP is decremented twice ($SP \leftarrow SP - 1$ for higher-order byte, then $SP \leftarrow SP - 1$ for lower-order byte).
**Topic**: Stack Pointer & Stack Operations
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q4
Which bit in the 8085 Flag Register is set to 1 when an arithmetic operation results in a carry from bit position $D_3$ to bit position $D_4$?
- A) Carry Flag (CY)
- B) Sign Flag (S)
- C) Auxiliary Carry Flag (AC)
- D) Parity Flag (P)
**Correct Answer**: C
**Explanation**: The Auxiliary Carry (AC) flag records intermediate carries between nibbles (from bit 3 to bit 4), used exclusively for BCD arithmetic by the `DAA` instruction.
**Topic**: Flag Register
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q5
What is the restart vector address of the non-maskable hardware interrupt `TRAP` in the 8085 microprocessor?
- A) `0024H`
- B) `003CH`
- C) `0034H`
- D) `002CH`
**Correct Answer**: A
**Explanation**: TRAP corresponds to restart vector 4.5. The vector address is calculated as $4.5 \times 8 = 36_{10}$. In hexadecimal, $36 = 2 \times 16 + 4 = 0024H$.
**Topic**: 8085 Interrupts
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q6
Which of the following 8085 interrupts holds the highest execution priority?
- A) RST 7.5
- B) RST 6.5
- C) TRAP
- D) INTR
**Correct Answer**: C
**Explanation**: Priority order in 8085 from highest to lowest is: TRAP > RST 7.5 > RST 6.5 > RST 5.5 > INTR.
**Topic**: 8085 Interrupts
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q7
Identify the addressing mode of the 8085 instruction: `MVI A, 35H`.
- A) Direct Addressing
- B) Register Addressing
- C) Immediate Addressing
- D) Register Indirect Addressing
**Correct Answer**: C
**Explanation**: The operand `35H` is provided immediately within the second byte of the instruction itself (indicated by the 'I' in `MVI`).
**Topic**: Addressing Modes
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q8
Identify the addressing mode of the 8085 instruction: `MOV A, M`.
- A) Direct Addressing
- B) Immediate Addressing
- C) Register Indirect Addressing
- D) Implicit Addressing
**Correct Answer**: C
**Explanation**: `M` refers to a memory location whose address is held indirectly in the 16-bit `HL` register pair.
**Topic**: Addressing Modes
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q9
Identify the addressing mode of the instruction: `CMA` (Complement Accumulator).
- A) Register Addressing
- B) Implicit / Implied Addressing
- C) Direct Addressing
- D) Immediate Addressing
**Correct Answer**: B
**Explanation**: In `CMA`, the operand (Accumulator) is implied directly by the opcode; no operand field is required.
**Topic**: Addressing Modes
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q10
How many bytes of memory does the instruction `LDA 2050H` occupy in an 8085 system?
- A) 1 byte
- B) 2 bytes
- C) 3 bytes
- D) 4 bytes
**Correct Answer**: C
**Explanation**: Byte 1 is opcode (`3AH`), Byte 2 is lower-order address byte (`50H`), and Byte 3 is higher-order address byte (`20H`). Total = 3 bytes.
**Topic**: Instruction Formats
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q11
If the Accumulator contains `FFH` and the instruction `INR A` is executed in the 8085, what will be the state of the Carry flag ($CY$)?
- A) Set to 1
- B) Reset to 0
- C) Unaffected (retains its previous value)
- D) Undefined
**Correct Answer**: C
**Explanation**: In 8085, `INR` and `DCR` instructions affect the $S, Z, P, AC$ flags, but **DO NOT affect the Carry flag ($CY$)**! Only addition/subtraction instructions like `ADD` or `SUB` modify $CY$.
**Topic**: Flag Register
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q12
What is the restart vector address of software interrupt `RST 7`?
- A) `0038H`
- B) `003CH`
- C) `0028H`
- D) `0070H`
**Correct Answer**: A
**Explanation**: Vector Address $= N \times 8 = 7 \times 8 = 56_{10}$. Converting to hexadecimal: $56 = 3 \times 16 + 8 = 0038H$.
**Topic**: Interrupt Vectors
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q13
Which 8085 instruction is used to adjust the 8-bit result of an addition operation into two Binary Coded Decimal (BCD) digits?
- A) CMC
- B) DAA
- C) XCHG
- D) DCR
**Correct Answer**: B
**Explanation**: `DAA` (Decimal Adjust Accumulator) inspects the lower and upper nibbles and adds 6 to either nibble if it exceeds 9 or if the auxiliary/carry flags are set.
**Topic**: 8085 Instruction Set
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q14
What is the function of the `ALE` (Address Latch Enable) pin on the 8085 microprocessor?
- A) To reset the processor clock
- B) To demultiplex the lower-order address/data bus ($AD_7-AD_0$) by latching address bits during the first clock state ($T_1$)
- C) To signal a memory write cycle
- D) To request a DMA transfer
**Correct Answer**: B
**Explanation**: Pins $AD_7-AD_0$ carry address lines $A_7-A_0$ during $T_1$ and data lines $D_7-D_0$ during subsequent states. A high pulse on `ALE` signals external latches (e.g., 74LS373) to capture the lower address byte.
**Topic**: 8085 Hardware Architecture
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q15
Which 8085 interrupt is edge-sensitive (triggered on rising edge) and non-maskable?
- A) RST 7.5
- B) INTR
- C) TRAP
- D) RST 5.5
**Correct Answer**: C
**Explanation**: TRAP is non-maskable and requires both an edge transition and a sustained high level to trigger, ensuring noise immunity.
**Topic**: 8085 Interrupts
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q16
What instruction is executed to enable all maskable interrupts after they have been globally disabled?
- A) SIM
- B) EI
- C) DI
- D) RIM
**Correct Answer**: B
**Explanation**: `EI` (Enable Interrupts) sets the internal Interrupt Enable flip-flop, allowing maskable interrupts to be recognized.
**Topic**: 8085 Interrupts
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q17
Which register pair contents are swapped with the `DE` register pair when the `XCHG` instruction is executed in the 8085?
- A) BC
- B) HL
- C) SP
- D) PC
**Correct Answer**: B
**Explanation**: `XCHG` specifically exchanges the 16-bit contents of the `H` register with `D`, and `L` register with `E`.
**Topic**: 8085 Instruction Set
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q18
In an 8086 microprocessor, how many address lines are present, and what is the maximum physical memory address space?
- A) 16 address lines $\implies 64\text{ KB}$
- B) 20 address lines $\implies 1\text{ MB}$
- C) 24 address lines $\implies 16\text{ MB}$
- D) 32 address lines $\implies 4\text{ GB}$
**Correct Answer**: B
**Explanation**: The 8086 has a 20-bit physical address bus, enabling it to access $2^{20} = 1,048,576\text{ bytes} = 1\text{ MB}$ of memory.
**Topic**: 8086 Architecture
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q19
In the 8086 segmented memory model, how is a 20-bit physical memory address computed from Segment Register and Offset values?
- A) $\text{Physical} = \text{Segment} + \text{Offset}$
- B) $\text{Physical} = (\text{Segment} \times 16) + \text{Offset}$
- C) $\text{Physical} = (\text{Offset} \times 16) + \text{Segment}$
- D) $\text{Physical} = \text{Segment} \times \text{Offset}$
**Correct Answer**: B
**Explanation**: The segment register is shifted left by 4 bits (multiplied by $16_{10}$ or $10_{16}$) and added to the 16-bit offset: $\text{Physical Address} = (\text{Segment} \ll 4) + \text{Offset}$.
**Topic**: 8086 Memory Segmentation
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q20
If the 8086 Data Segment register ($DS$) contains `3000H` and the source index ($SI$) contains `0050H`, what is the resulting 20-bit physical address?
- A) `30050H`
- B) `30500H`
- C) `35000H`
- D) `03050H`
**Correct Answer**: A
**Explanation**: $\text{Physical Address} = (3000H \times 10H) + 0050H = 30000H + 0050H = 30050H$.
**Topic**: 8086 Memory Segmentation
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q21
What type of cache mapping maps each main memory block to exactly one specific line in the cache?
- A) Direct Mapping
- B) Fully Associative Mapping
- C) 2-Way Set Associative Mapping
- D) Skewed Associative Mapping
**Correct Answer**: A
**Explanation**: Direct mapped cache calculates line index as: $\text{Cache Line} = \text{Memory Block} \bmod \text{Total Cache Lines}$.
**Topic**: Cache Memory
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q22
Which of the following cache mapping architectures completely eliminates Conflict (Collision) misses?
- A) Direct Mapping
- B) Fully Associative Mapping
- C) 2-Way Set Associative Mapping
- D) 4-Way Set Associative Mapping
**Correct Answer**: B
**Explanation**: In Fully Associative cache, any memory block can reside in any cache line. Thus, no conflict misses occur until the entire cache capacity is exhausted.
**Topic**: Cache Memory
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q23
What type of pipeline hazard occurs when two instructions compete for the same physical hardware component simultaneously?
- A) Data Hazard
- B) Control Hazard
- C) Structural Hazard
- D) Branch Hazard
**Correct Answer**: C
**Explanation**: Structural hazards occur when hardware resources (e.g., a single unified memory port for instruction fetch and data read) cannot support all concurrent pipeline stages.
**Topic**: Pipelining & Hazards
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q24
Which data dependency represents a True Data Dependency in pipelined execution where an instruction needs data produced by an earlier uncompleted instruction?
- A) RAW (Read After Write)
- B) WAR (Write After Read)
- C) WAW (Write After Write)
- D) RAR (Read After Read)
**Correct Answer**: A
**Explanation**: RAW is a true data hazard: instruction $j$ attempts to read a source register before instruction $i$ has committed its write to that register.
**Topic**: Pipelining & Hazards
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q25
How does Operand Forwarding (Bypassing) resolve RAW hazards in a pipelined CPU?
- A) By freezing the CPU clock for 5 cycles
- B) By routing the output of the ALU stage directly to the input of an ALU stage in the subsequent cycle, eliminating pipeline bubbles
- C) By swapping instruction execution order in RAM
- D) By discarding instructions
**Correct Answer**: B
**Explanation**: Forwarding connects internal pipeline register buses directly back to ALU inputs, allowing the dependent instruction to receive calculated values without waiting for writeback to the register file.
**Topic**: Pipelining & Hazards
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q26
What type of hazard is introduced into a processor pipeline by conditional branch instructions (`JNZ`, `BEQ`)?
- A) Structural Hazard
- B) Control (Branch) Hazard
- C) Memory Hazard
- D) Data Hazard
**Correct Answer**: B
**Explanation**: Control hazards arise from branch instructions where the next target address is unknown until the branch condition is evaluated in later pipeline stages.
**Topic**: Pipelining & Hazards
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q27
What is the difference between RISC and CISC architectures?
- A) RISC has variable instruction lengths; CISC has fixed lengths
- B) RISC focuses on simple, fixed-length instructions executed in a single cycle using load/store architecture; CISC features complex, variable-length instructions with hardware microcode
- C) CISC does not support pipelining
- D) RISC cannot perform floating point math
**Correct Answer**: B
**Explanation**: RISC (Reduced Instruction Set Computer) optimizes single-cycle execution of simple instructions with register-to-register operations. CISC (Complex Instruction Set Computer) supports complex memory-to-memory instructions.
**Topic**: Computer Architecture
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q28
What is the function of the Program Status Word (PSW) in the 8085 microprocessor?
- A) The combined 16-bit pair of the Accumulator and Flag Register
- B) The Instruction Register
- C) The memory buffer register
- D) The clock frequency controller
**Correct Answer**: A
**Explanation**: In 8085, `PUSH PSW` pushes the 16-bit combination of the 8-bit Accumulator and the 8-bit Flag register onto the stack.
**Topic**: 8085 Registers
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q29
Which of the following 8085 instructions performs an exclusive-OR operation between the Accumulator and register B?
- A) ORA B
- B) ANA B
- C) XRA B
- D) CMP B
**Correct Answer**: C
**Explanation**: `XRA B` executes $A \leftarrow A \oplus B$, clearing the Carry and Auxiliary Carry flags.
**Topic**: 8085 Instruction Set
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q30
What is the fastest memory component in the computer memory hierarchy?
- A) L1 Cache
- B) Main Memory (DRAM)
- C) CPU Registers
- D) Solid State Drive (SSD)
**Correct Answer**: C
**Explanation**: CPU internal registers reside directly on the processor core and operate within a fraction of a CPU clock cycle (sub-nanosecond latency).
**Topic**: Memory Hierarchy
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q31
In cache write policies, what is the key difference between Write-Through and Write-Back?
- A) Write-through writes only to SSD; Write-back writes to RAM
- B) Write-through updates both cache and main memory simultaneously; Write-back updates only the cache block and writes to main memory only when the dirty block is evicted
- C) Write-back cannot be cached
- D) Write-through does not use tags
**Correct Answer**: B
**Explanation**: Write-Through maintains consistency by immediately updating main memory on every write. Write-Back minimizes bus traffic by writing to memory only upon block eviction (tracked via a "dirty bit").
**Topic**: Cache Memory
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q32
Which 8085 instruction clears the Accumulator to zero and clears both the Carry and Auxiliary Carry flags?
- A) `MVI A, 00H`
- B) `XRA A`
- C) `SUB A`
- D) Both B and C
**Correct Answer**: D
**Explanation**: Both `XRA A` ($A \oplus A = 0$) and `SUB A` ($A - A = 0$) clear the Accumulator to 0 and reset the Carry flag. `XRA A` is commonly preferred by programmers because it is a 1-byte instruction executing in 4 T-states.
**Topic**: 8085 Instruction Set
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q33
What is the purpose of the `HLDA` (Hold Acknowledge) pin on the 8085?
- A) Acknowledges an incoming hardware interrupt
- B) Signals that the CPU has received a `HOLD` request and surrendered control of the address and data buses to an external DMA controller
- C) Halts the clock generator
- D) Restarts execution after a trap
**Correct Answer**: B
**Explanation**: When a DMA controller needs direct memory access, it asserts `HOLD`. The CPU finishes the current machine cycle and responds with `HLDA`, placing buses in high-impedance state.
**Topic**: 8085 Hardware Architecture
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q34
What is the difference between vectored and non-vectored interrupts?
- A) Vectored interrupts cannot be masked; non-vectored can be masked
- B) Vectored interrupts branch to an internally fixed ISR address; non-vectored interrupts require the interrupting device to place an instruction or address on the bus
- C) Non-vectored interrupts are faster
- D) Vectored interrupts only exist in 64-bit processors
**Correct Answer**: B
**Explanation**: In vectored interrupts, the CPU jumps directly to hardcoded memory vectors. In non-vectored interrupts (like 8085 INTR), external hardware supplies the vector or instruction.
**Topic**: Interrupts
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q35
If an 8-bit register contains binary value `1100 1010`, what will be the state of the Parity Flag ($P$) in the 8085?
- A) $P = 1$ (Even Parity)
- B) $P = 0$ (Odd Parity)
- C) $P = 1$ (Odd Parity)
- D) Flag is undefined
**Correct Answer**: A
**Explanation**: Count the number of 1s in `1100 1010`: there are four 1s. Since 4 is an even number, the 8085 sets $P = 1$ (indicating even parity).
**Topic**: Flag Register
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q36
In 8085 microprocessor instruction cycle terminology, what is a "T-state"?
- A) The time required to execute an entire program
- B) One subdivision of an operation performed in one clock period of the external clock
- C) A wait state introduced by slow ROM
- D) The time to fetch an opcode
**Correct Answer**: B
**Explanation**: A T-state is the portion of an operation executed in one system clock period. Machine cycles consist of several T-states (typically 3 to 6 T-states per cycle).
**Topic**: Instruction Timing
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q37
What machine cycle is always the FIRST machine cycle executed for every instruction in the 8085?
- A) Memory Read
- B) Opcode Fetch
- C) I/O Read
- D) Memory Write
**Correct Answer**: B
**Explanation**: The processor must first fetch the opcode from memory into the Instruction Register. The Opcode Fetch machine cycle typically requires 4 T-states (or 6 T-states).
**Topic**: Instruction Timing
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q38
Which 8085 instruction transfers execution to address `3000H` only if the Zero flag is set to 1?
- A) `JNZ 3000H`
- B) `JZ 3000H`
- C) `JC 3000H`
- D) `JPE 3000H`
**Correct Answer**: B
**Explanation**: `JZ` stands for "Jump if Zero". It evaluates the Zero flag ($Z = 1$) and updates the Program Counter to `3000H` if true.
**Topic**: 8085 Instruction Set
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q39
What is the role of the Instruction Register (IR) inside a CPU?
- A) Storing memory addresses of branch targets
- B) Holding the fetched instruction opcode while it is being decoded by the instruction decoder
- C) Counting loop iterations
- D) Buffering data for arithmetic calculations
**Correct Answer**: B
**Explanation**: The IR holds the fetched opcode from memory during instruction decode and execution phases.
**Topic**: CPU Architecture
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q40
In a 4-stage pipeline (Fetch, Decode, Execute, Writeback) executing 100 independent instructions without hazards, how many clock cycles are required?
- A) 400 cycles
- B) 103 cycles
- C) 100 cycles
- D) 25 cycles
**Correct Answer**: B
**Explanation**: Formula for non-hazard pipelining: $\text{Cycles} = K + (N - 1)$, where $K$ is pipeline stages (4) and $N$ is instructions (100). $\text{Cycles} = 4 + 99 = 103$.
**Topic**: Pipelining
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q41
Which instruction in the 8085 is a 1-byte instruction that performs no operation except consuming 4 T-states of time?
- A) `HLT`
- B) `NOP`
- C) `RIM`
- D) `DI`
**Correct Answer**: B
**Explanation**: `NOP` (No Operation) simply increments the Program Counter and uses 4 clock cycles, frequently used for precise timing delay loops.
**Topic**: 8085 Instruction Set
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q42
What is the function of the `IO/M` status line in the 8085 microprocessor?
- A) To control interrupt priorities
- B) To distinguish whether a read/write operation is targeted at an I/O device (High = 1) or Memory (Low = 0)
- C) To toggle clock frequency
- D) To control serial data transfers
**Correct Answer**: B
**Explanation**: `IO/M` output specifies whether the address bus contains an I/O address (when High) or a memory address (when Low).
**Topic**: 8085 Control Signals
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q43
What happens when the `RESET IN` pin of the 8085 is held low?
- A) Accumulator is set to `FFH`
- B) Program Counter is reset to `0000H`, buses are tristated, and execution restarts from memory origin
- C) TRAP interrupt is triggered
- D) RAM contents are erased
**Correct Answer**: B
**Explanation**: Asserting `RESET IN` clears the Program Counter to `0000H`, resets interrupt flip-flops, and prepares the CPU to fetch from location zero.
**Topic**: 8085 Hardware Architecture
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q44
In a 2-way set-associative cache with 128 total cache lines, how many sets are in the cache?
- A) 256
- B) 128
- C) 64
- D) 32
**Correct Answer**: C
**Explanation**: $\text{Sets} = \frac{\text{Total Lines}}{\text{Associativity}} = \frac{128}{2} = 64\text{ sets}$.
**Topic**: Cache Memory
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q45
Which type of cache miss occurs upon the very first access to a block of memory and cannot be avoided by increasing cache size?
- A) Conflict Miss
- B) Capacity Miss
- C) Compulsory (Cold) Miss
- D) Coherence Miss
**Correct Answer**: C
**Explanation**: Compulsory (or Cold) misses occur the first time an address block is referenced into cache.
**Topic**: Cache Memory
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q46
What is the function of the `READY` pin on the Intel 8085 microprocessor?
- A) To synchronize the CPU with slow memory or peripheral devices by inserting Wait states ($T_w$)
- B) To power up the chip
- C) To acknowledge serial communication
- D) To indicate ALU overflow
**Correct Answer**: A
**Explanation**: If `READY` is low during $T_2$, the 8085 enters a Wait state until the slow peripheral asserts `READY` high, ensuring reliable data transfer.
**Topic**: 8085 Hardware Architecture
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q47
Which 8085 instruction loads the 16-bit register pair `HL` directly with the contents of memory locations specified in the instruction?
- A) `SHLD`
- B) `LHLD`
- C) `LXI H`
- D) `MOV H, M`
**Correct Answer**: B
**Explanation**: `LHLD <16-bit address>` loads register L from `<address>` and register H from `<address + 1>`. (3-byte direct instruction).
**Topic**: 8085 Instruction Set
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q48
In Computer Architecture, what is the "Von Neumann Bottleneck"?
- A) High latency in cooling CPU heat sinks
- B) The throughput limitation caused by sharing a single physical bus between CPU and memory for both instruction fetch and data transfer
- C) Incompatibility between 32-bit and 64-bit software
- D) Slow hard disk spindle speeds
**Correct Answer**: B
**Explanation**: The Von Neumann architecture shares a single memory bus for data and code, constraining CPU processing speed to the bandwidth of that single memory bus. Harvard architecture mitigates this with separate data/instruction buses.
**Topic**: Computer Architecture
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q49
What is the difference between Microprocessor and Microcontroller?
- A) Microprocessors are slower than microcontrollers
- B) A Microprocessor contains only the CPU core on-chip; a Microcontroller integrates CPU, RAM, ROM/Flash, Timers, and I/O ports onto a single monolithic IC
- C) Microcontrollers cannot run C code
- D) Microprocessors only operate in analog domains
**Correct Answer**: B
**Explanation**: Microprocessors (e.g., 8085, Core i7) require external RAM, ROM, and I/O chips. Microcontrollers (e.g., 8051, PIC, Arduino ATmega328) integrate these peripherals on-chip.
**Topic**: Microprocessors vs Microcontrollers
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q50
What addressing mode is used in the instruction: `ADD B` in 8085?
- A) Immediate Addressing
- B) Direct Addressing
- C) Register Addressing
- D) Indirect Addressing
**Correct Answer**: C
**Explanation**: Both operands reside in registers (Register B explicitly and Accumulator implicitly). No memory bus access is required.
**Topic**: Addressing Modes
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED
