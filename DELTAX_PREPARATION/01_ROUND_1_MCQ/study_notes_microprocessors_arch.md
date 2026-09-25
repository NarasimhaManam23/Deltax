# DeltaX High-Priority Study Notes: Microprocessors & Computer Architecture

---

# MODULE 1: 8085 / 8086 Architecture & Register Organization

### Concept
A microprocessor is the central processing unit of a computer fabricated on a single integrated circuit chip. The Intel 8085 is an 8-bit NMOS processor (16-bit address bus $\implies 64\text{ KB}$ memory space), while the 8086 is a 16-bit processor (20-bit address bus $\implies 1\text{ MB}$ memory space).

### Interview Definition
"The 8085 operates on 8-bit data with a 16-bit address bus. Its internal register set includes the Accumulator (A), 6 general-purpose registers (B, C, D, E, H, L combinable as 16-bit pairs BC, DE, HL), the Program Counter (PC), Stack Pointer (SP), and an 8-bit Flag register."

### Deep Explanation
1. **8085 Register Structure**:
   * **Accumulator (A - 8 bits)**: Primary register for arithmetic, logical, and I/O operations; stores one operand and receives the result of ALU operations.
   * **General Purpose Registers (B, C, D, E, H, L - 8 bits each)**: Can be used individually or combined into 16-bit register pairs:
     - `BC`, `DE`, `HL`.
     - The `HL` pair is the default 16-bit memory pointer register: whenever an instruction references `M` (memory), it points to the memory address stored in `HL`!
   * **Program Counter (PC - 16 bits)**: Points to the memory address of the **next instruction to be fetched and executed**. Automatically incremented by the CPU after each fetch cycle.
   * **Stack Pointer (SP - 16 bits)**: Points to the top of the stack in RAM (follows LIFO). The 8085 stack grows downward in memory (decrements when pushing, increments when popping).
2. **8085 Flag Register (8 bits, 5 active flags)**:
   Format: `[ S | Z | X | AC | X | P | X | CY ]` (where X = undefined/don't care)
   * **S (Sign Flag - Bit 7)**: Set to 1 if Most Significant Bit ($D_7$) of result is 1 (negative number in signed two's complement); 0 if positive.
   * **Z (Zero Flag - Bit 6)**: Set to 1 if ALU result is **exactly zero**; 0 otherwise.
   * **AC (Auxiliary Carry Flag - Bit 4)**: Set to 1 if there is a carry out of bit $D_3$ to bit $D_4$ during arithmetic. Essential for BCD (Binary Coded Decimal) addition (`DAA` instruction). *Note: AC is internal and cannot be tested directly by jump instructions!*
   * **P (Parity Flag - Bit 2)**: Set to 1 if result has **even parity** (even number of 1s in accumulator); 0 if odd parity.
   * **CY (Carry Flag - Bit 0)**: Set to 1 if an arithmetic operation generates a carry out of bit $D_7$ (overflow for unsigned arithmetic).

### Trap
1. `HL` register as memory pointer: In instruction `MOV A, M`, `M` is NOT an internal register; it is the byte in memory whose address is currently held in the `H-L` register pair!
2. `DAA` (Decimal Adjust Accumulator): Works ONLY after an addition instruction (`ADD`, `ADI`, `ADC`). It adjusts the 8-bit accumulator result to two 4-bit BCD digits by adding `06H` if lower nibble $> 9$ or $AC=1$, and adding `60H` if higher nibble $> 9$ or $CY=1$.

### Practice Questions (5 Qs)
1. How many address lines and data lines are present in the Intel 8085 microprocessor?
2. If the accumulator contains `FFH` and instruction `INR A` is executed, what will be the value of Accumulator, Zero flag, and Carry flag?
3. Which 16-bit register pair in the 8085 acts as the default pointer to memory operand `M`?
4. What is the value of the Parity flag if the result of an operation in the Accumulator is `0000 1101`?
5. Why can the Auxiliary Carry (AC) flag not be used directly in conditional branching instructions?

### Answers & Explanations
1. **Answer**: 16 address lines ($A_{15}-A_0$) and 8 data lines ($D_7-D_0$, multiplexed as $AD_7-AD_0$ with address lines $A_7-A_0$).
2. **Answer**: Accumulator = `00H`, Zero Flag ($Z$) = `1`, Carry Flag ($CY$) = Unchanged (retains its previous value).
   *Explanation (CRITICAL TRAP)*: In 8085, `INR` (Increment Register) and `DCR` (Decrement Register) modify all flags ($S, Z, P, AC$) **EXCEPT the Carry flag ($CY$)**! Only `ADD` or `ADI` modify the Carry flag.
3. **Answer**: The `HL` register pair.
4. **Answer**: `P = 0` (Odd Parity).
   *Explanation*: The byte `0000 1101` contains three 1s. Since 3 is an odd number, parity is odd, so `P = 0`.
5. **Answer**: Because the 8085 instruction set provides no conditional jump instructions based on AC (e.g., there is `JZ`, `JNZ`, `JC`, `JNC`, `JP`, `JM`, `JPE`, `JPO`, but no `JAC` or `JNAC`). It is used strictly internally by the `DAA` instruction.

---

# MODULE 2: Addressing Modes & Instruction Types

### Concept
Addressing modes specify the mechanism by which an instruction locates its operands (whether in a register, embedded directly in instruction bytes, or located at an external memory address).

### Interview Definition
"An addressing mode defines how the effective memory address of an operand is calculated. The 8085 supports 5 modes: Immediate (data in opcode), Register (in internal registers), Direct (16-bit address in opcode), Register Indirect (address held in register pair), and Implicit (implied operand)."

### Deep Explanation
1. **The 5 Addressing Modes in 8085**:
   * **Immediate Addressing**: The 8-bit or 16-bit operand is specified immediately within the instruction itself.
     - Examples: `MVI A, 32H` (Move Immediate 32H to Accumulator), `LXI H, 2050H` (Load Register Pair Immediate).
     - Recognition cue: Look for the letter **'I'** in the mnemonic (`MVI`, `LXI`, `ADI`, `CPI`).
   * **Register Addressing**: Operands are contained within CPU registers. No memory access is required.
     - Examples: `MOV A, B`, `ADD C`, `ANA D`, `XRA E`.
     - Very fast (single machine cycle for opcode fetch/execute).
   * **Direct Addressing**: The 16-bit memory address where the operand resides is explicitly provided within the instruction (occupies 3 bytes: 1 byte opcode + 2 bytes address).
     - Examples: `LDA 4000H` (Load Accumulator Direct from 4000H), `STA 5000H` (Store Accumulator Direct), `LHLD 2500H`, `SHLD 2500H`.
   * **Register Indirect Addressing**: The memory address of the operand is held in a 16-bit register pair (typically `HL`, or `BC`/`DE`).
     - Examples: `MOV A, M` (Move byte from memory address pointed to by HL into A), `STAX B` (Store Accumulator Indirect to address in BC), `LDAX D`.
   * **Implicit / Implied Addressing**: The operand is implied by the opcode itself; no operand field is required.
     - Examples: `CMA` (Complement Accumulator), `STC` (Set Carry Flag), `CMC` (Complement Carry Flag), `RAL` (Rotate Accumulator Left through Carry), `NOP`.

### Trap
* `MOV A, M` vs `LDA 2000H`:
  - `MOV A, M` is **Register Indirect** because the address is indirect via `HL`.
  - `LDA 2000H` is **Direct** because the 16-bit address is hardcoded in the instruction bytes.
* `LXI H, 2000H` vs `LHLD 2000H`:
  - `LXI H, 2000H` is **Immediate** (loads literal number `2000H` into `HL`).
  - `LHLD 2000H` is **Direct** (goes to RAM at addresses `2000H` and `2001H` and loads the bytes stored there into `L` and `H`).

### Practice Questions (5 Qs)
1. Identify the addressing mode of `CPI 45H`.
2. Identify the addressing mode of `STAX D`.
3. How many bytes does the instruction `STA 3000H` occupy in memory?
4. What addressing mode is used by the instruction `RAL`?
5. If register pair `HL = 2050H` and the memory location `2050H` contains byte `8FH`, what is in the accumulator after executing `MOV A, M`?

### Answers & Explanations
1. **Answer**: Immediate Addressing (Compares Accumulator immediately with immediate data `45H`).
2. **Answer**: Register Indirect Addressing (Stores Accumulator contents at memory address held in `DE` pair).
3. **Answer**: 3 bytes (Byte 1: Opcode `32H`; Byte 2: Lower-order address byte `00H`; Byte 3: Higher-order address byte `30H`).
4. **Answer**: Implicit / Implied Addressing (The Accumulator operand is implied by the instruction).
5. **Answer**: `8FH`.

---

# MODULE 3: Interrupts, Vector Locations & Priorities

### Concept
An interrupt is a hardware or software signal that temporarily suspends the CPU's current execution thread, forcing it to service an asynchronous high-priority event via an Interrupt Service Routine (ISR).

### Interview Definition
"The 8085 has 5 hardware interrupts. TRAP is non-maskable and holds the highest priority with a restart vector at $0024H$. The remaining four (RST 7.5, RST 6.5, RST 5.5, INTR) are maskable. Vector addresses for RST $N$ are calculated as $N \times 8$ in hexadecimal."

### Deep Explanation
1. **8085 Hardware Interrupt Hierarchy**:
   | Interrupt | Priority | Maskable? | Trigger Type | Vector Address | Vector Calculation ($N \times 8$) |
   | :--- | :--- | :--- | :--- | :--- | :--- |
   | **TRAP** | 1 (Highest) | **Non-Maskable** | Level & Edge sensitive | **0024H** | $4.5 \times 8 = 36 = 24H$ |
   | **RST 7.5** | 2 | Maskable | Edge sensitive only (rising) | **003CH** | $7.5 \times 8 = 60 = 3CH$ |
   | **RST 6.5** | 3 | Maskable | Level sensitive only | **0034H** | $6.5 \times 8 = 52 = 34H$ |
   | **RST 5.5** | 4 | Maskable | Level sensitive only | **002CH** | $5.5 \times 8 = 44 = 2CH$ |
   | **INTR** | 5 (Lowest) | Maskable | Level sensitive only | **Non-Vectored** | ISR supplied by external device |

2. **Vectored vs Non-Vectored**:
   * *Vectored*: The processor has a hardcoded, predetermined ISR memory location. When the interrupt triggers, the CPU automatically jumps to that fixed vector address.
   * *Non-Vectored*: The processor does not know where the ISR is. The external interrupting hardware must supply an instruction (typically `RST n` or `CALL <address>`) on the data bus during the Interrupt Acknowledge (`INTA`) machine cycle.
3. **Masking & Unmasking Instructions**:
   * `EI` (Enable Interrupts): Sets the internal Interrupt Enable flip-flop.
   * `DI` (Disable Interrupts): Resets flip-flop, disabling RST 7.5, 6.5, 5.5, and INTR. Does NOT affect TRAP.
   * `SIM` (Set Interrupt Mask): Programs masks for RST 7.5, 6.5, 5.5 and controls serial data output (`SOD`).
   * `RIM` (Read Interrupt Mask): Reads interrupt status, mask bits, and serial data input (`SID`).

### Trap
1. TRAP triggering: TRAP is triggered by BOTH an edge (rising transition) and a high level. This dual check prevents false triggers from noise while ensuring the signal remains active long enough to be sampled.
2. Vector calculation formula: Vector Address $= \text{Decimal}(N \times 8) \rightarrow$ converted to Hex! Example: RST 6.5 $\rightarrow 6.5 \times 8 = 52_{10} = 0034_{16}$.

### Practice Questions (5 Qs)
1. Which 8085 interrupt cannot be disabled by executing the `DI` instruction?
2. What is the restart vector address of software interrupt `RST 5`?
3. Which hardware interrupt in the 8085 is non-vectored?
4. Arrange RST 6.5, INTR, TRAP, and RST 7.5 in descending order of priority.
5. What are the roles of the `SIM` and `RIM` instructions in 8085 interrupt management?

### Answers & Explanations
1. **Answer**: TRAP. Because TRAP is a Non-Maskable Interrupt (NMI), it ignores both `DI` and internal software masks.
2. **Answer**: `0028H`.
   *Explanation*: Formula is $N \times 8$. For RST 5: $5 \times 8 = 40_{10}$. Convert 40 to hexadecimal: $40 = 2 \times 16 + 8 = 0028H$.
3. **Answer**: `INTR`.
4. **Answer**: TRAP > RST 7.5 > RST 6.5 > INTR.
5. **Answer**: `SIM` (Set Interrupt Mask) is used to selectively mask or unmask the RST 7.5, 6.5, and 5.5 interrupts using the accumulator bit patterns. `RIM` (Read Interrupt Mask) is used to inspect pending interrupts and current mask status.

---

# MODULE 4: Memory Hierarchy, Cache Mapping & Pipelining

### Concept
The memory hierarchy bridges the gap between ultra-fast CPU clock cycles and relatively slow main memory. Cache memory provides low-latency access to frequently used instructions and data based on the principles of **Temporal Locality** (recently accessed items will be accessed again soon) and **Spatial Locality** (items near recently accessed items will be accessed soon).

### Interview Definition
"Caches store memory blocks indexed by Tag, Set/Line, and Word Offset. Direct mapping assigns each memory block to exactly one cache line ($Block \bmod Lines$). Fully associative allows a block to reside in any line. Set-associative divides cache into sets, balancing hit speed with lower conflict misses."

### Deep Explanation
1. **Cache Miss Categories (The 3 Cs)**:
   * **Compulsory (Cold) Miss**: First access to a memory block. Unavoidable unless prefetching is used.
   * **Capacity Miss**: Cache cannot contain all blocks needed during program execution.
   * **Conflict (Collision) Miss**: Multiple memory blocks compete for the same cache line in Direct or Set-Associative mappings. (Eliminated in Fully Associative caches).
2. **Pipelining Hazards**:
   * Pipelining overlaps instruction execution phases (Fetch, Decode, Execute, Memory, Writeback).
   * **Structural Hazard**: Hardware resource conflict (e.g., single memory bus accessed simultaneously by instruction fetch and data read).
   * **Data Hazard**: Instruction depends on result of a previous instruction still in the pipeline.
     - *RAW (Read After Write)*: True data dependency (Hazardous in simple in-order pipelines). Resolved via **Forwarding / Bypassing** or stalls.
     - *WAR (Write After Read)*: Anti-dependency (occurs in out-of-order execution).
     - *WAW (Write After Write)*: Output dependency (occurs in out-of-order execution).
   * **Control (Branch) Hazard**: Pipelined decision delay on conditional branches (`JMP`, `BEQ`). Resolved via branch prediction or delayed branch slots.

### Practice Questions (5 Qs)
1. Which principle of locality justifies loading an entire cache block rather than just the single requested word?
2. In a direct-mapped cache with 64 lines, which cache line does memory block 195 map to?
3. What is the average memory access time (AMAT) if Cache Hit Time is 2 ns, Miss Rate is 5%, and Miss Penalty is 40 ns?
4. What type of data hazard occurs when an instruction attempts to read a register before a previous instruction writes to it?
5. How does operand forwarding resolve RAW data hazards without inserting pipeline bubbles?

### Answers & Explanations
1. **Answer**: Spatial Locality (the likelihood that adjacent memory locations will be referenced soon).
2. **Answer**: Line `3`.
   *Explanation*: In direct-mapped cache, $\text{Line} = \text{Block Number} \bmod \text{Total Lines} = 195 \bmod 64$. Since $64 \times 3 = 192$, $195 - 192 = 3$.
3. **Answer**: `4.0 ns`.
   *Explanation*: $\text{AMAT} = \text{Hit Time} + (\text{Miss Rate} \times \text{Miss Penalty}) = 2 + (0.05 \times 40) = 2 + 2 = 4.0\text{ ns}$.
4. **Answer**: RAW (Read After Write), also known as a True Data Dependency.
5. **Answer**: Forwarding routes the output of the ALU directly from the pipeline register (e.g., EX/MEM) back to the ALU input of the dependent instruction in the next cycle, bypassing the delay of waiting for the writeback (WB) phase to write to the register file.
