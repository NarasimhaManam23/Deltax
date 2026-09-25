# DeltaX Cheat Sheets — Projects & Interview Execution

> Rapid-revision cheat sheets covering:
> 18. Project Interview Cheat Sheet (ADAM-1, Simha AI, Smart Loan, Akki Assistant)
> 19. Round 2 AI Telephonic Screening Cheat Sheet
> 20. Round 4 Technical Interview & Live Coding Cheat Sheet

---

## 18. Project Interview Cheat Sheet

### Project 1: ADAM-1 Enhanced (Alzheimer’s & Microbiome AI)
- **One-Liner**: AI-powered clinical decision-support platform analyzing the gut microbiome-to-brain axis for early Alzheimer’s disease detection.
- **Tech Stack**: FastAPI, React/Vite, PostgreSQL with `pgvector`, Groq Llama-3-70B, XGBoost, TreeSHAP, Multi-Agent RAG.
- **Key Metric / Latency**: Sub-800ms end-to-end inference and SHAP generation; 300+ tokens/sec RAG synthesis via Groq LPUs.
- **Hardest Bug**: Slow similarity queries (2.8s) resolved by adding an `HNSW` index (`vector_cosine_ops`) and switching to async database pool (`asyncpg`).
- **Core Math / Algorithm**: Centered Log-Ratio (CLR) transformation for compositional genomic data; TreeSHAP polynomial-time Shapley values.

### Project 2: Simha AI (Multi-Agent Multimodal AI Platform)
- **One-Liner**: Autonomous multimodal productivity agent executing voice, document, and web tasks using specialized sub-agents and persistent memory.
- **Tech Stack**: FastAPI, Flask, React, MongoDB, OpenAI Whisper, Multi-Agent Architecture, Persistent Memory.
- **Core Architecture**: Supervisor Agent decomposes intent via JSON function-calling schema and delegates to Email, Scheduler, and URL Summarizer agents.
- **Memory Subsystem**: Sliding window short-term buffer + long-term episodic facts stored in MongoDB compound-indexed on `{ user_id: 1, timestamp: -1 }`.
- **Hardest Bug**: Infinite agent delegation loops resolved by enforcing `max_iterations = 5` and a visited state cycle-detector.

### Project 3: Smart Loan Approval System (FinTech MERN + ML)
- **One-Liner**: Full-stack automated loan underwriting platform evaluating creditworthiness and debt risk in real-time.
- **Tech Stack**: MERN (MongoDB, Express, React, Node.js), Scikit-Learn (Logistic Regression & Random Forest), Streamlit.
- **ML Strategy**: Addressed class imbalance using SMOTE; tuned decision threshold on the Precision-Recall curve to minimize costly False Positives (defaults).
- **Security**: JWT authentication, `bcrypt` password hashing (10 rounds), field-level encryption for applicant financials.

### Project 4: Akki AI Assistant (Telegram + n8n + Workspace Automation)
- **One-Liner**: Autonomous 24/7 personal operations assistant accessible via Telegram, automating calendar, emails, and expense logging.
- **Tech Stack**: Telegram Bot API, n8n, OpenAI GPT-4 / Whisper, Google Calendar/Gmail/Sheets APIs, PostgreSQL, Docker.
- **Key Architecture**: Event-driven HTTPS webhooks triggering self-hosted n8n workflows; automated OAuth2 token refresh in encrypted credential vaults.
- **Reliability**: Exponential backoff retries and idempotent message deduplication using Telegram's unique `update_id`.

---

## 19. Round 2 AI Telephonic Screening Cheat Sheet

### Voice & Acoustic Calibration
- **Pacing**: Speak at a steady 130–150 words per minute.
- **Enunciation**: Pronounce technical keywords crisply (*FastAPI, pgvector, HNSW, XGBoost, Docker, Idempotency*).
- **Zero Filler Policy**: Replace "um", "uh", "like", and "you know" with a deliberate 1-second pause. Pauses convey authority; filler words trigger uncertainty flags in speech recognition models.

### Universal Answer Framework (The "Direct + 3 Points + Impact" Rule)
1. **Direct Thesis (10s)**: Answer the question directly in the very first sentence.
2. **Body Points (40s)**: Provide exactly 2 or 3 structured points ("First... Second... Finally...").
3. **Outcome / Impact (15s)**: End with the tangible technical or business result.

### 5 Rapid Responses to Standard AI Screening Questions
- **"Tell me about yourself"**:
  > *"I am a final-year Computer Science engineer specializing in full-stack product development and applied AI systems. I build production-grade architectures using Python, Java, FastAPI, and PostgreSQL, as demonstrated in my projects ADAM-1 and Simha AI. I am excited by DeltaX’s high-throughput AdTech scale and the Associate Product Engineer role."*
- **"Why DeltaX?"**:
  > *"DeltaX operates at the intersection of massive-scale real-time advertising, data pipelines, and machine learning bidding engines where milliseconds impact ROI. As an Associate Product Engineer, I want to build high-concurrency systems handling millions of events daily alongside DeltaX’s engineering team."*
- **"What is your greatest technical strength?"**:
  > *"My ability to take complex backend architectures from research to production with clean API design, robust database indexing, and defensive error handling."*
- **"Tell me about a technical challenge you overcame."**:
  > *"In ADAM-1, our vector literature search slowed to 2.8 seconds as the dataset scaled. I identified that the query was performing sequential table scans, implemented an HNSW index on the pgvector embedding column, and migrated to async connection pooling, reducing latency to 18 milliseconds."*
- **"Where do you see yourself in 3 years?"**:
  > *"Growing into a core Product Engineer who owns high-impact distributed subsystems end-to-end, mentoring junior engineers, and contributing directly to platform reliability and feature velocity."*

---

## 20. Round 4 Technical Interview & Live Coding Cheat Sheet

### The "PADRE" Defense Framework for Coding Solutions
1. **P - Problem & Invariant**: State the fundamental property you exploited (e.g., prefix sum difference $S_j - S_i = K$).
2. **A - Approach Justification**: Explain why this approach was selected over brute force ($O(N)$ with HashMap vs $O(N^2)$).
3. **D - Dry Run**: Walk through a concrete 3-element test case step-by-step.
4. **R - Rigorous Complexity**: State both Time and Space complexities, and explicitly justify both.
5. **E - Edge Cases**: Volunteer boundary checks (empty input, negatives, extreme duplicates, integer overflow).

### Notepad Live-Coding Rules
1. **Always declare types**: Write clean, fully typed Java/Python code (`public static int`, `def solve(arr: list[int]) -> int:`).
2. **Guard Clauses First**: Start every function by handling edge cases (`if (nums == null || nums.length == 0) return 0;`).
3. **Indent 4 Spaces**: Keep indentation clean and consistent.
4. **Talk Out Loud While Typing**: Verbalize your decisions to keep the interviewer engaged.

### Standard Live Coding Problem Templates
- **Sliding Window Template (Java)**:
  ```java
  int left = 0, ans = 0;
  for (int right = 0; right < n; right++) {
      // 1. Add nums[right] to window state
      while (/* window condition invalid */) {
          // 2. Remove nums[left] from window state
          left++;
      }
      ans = Math.max(ans, right - left + 1);
  }
  ```
- **Two Pointers In-Place Swap (Python)**:
  ```python
  left, right = 0, len(nums) - 1
  while left < right:
      if condition(nums[left]):
          left += 1
      elif condition(nums[right]):
          right -= 1
      else:
          nums[left], nums[right] = nums[right], nums[left]
          left += 1
          right -= 1
```

### Questions to Ask the Technical Interviewer at the End
1. *"How does DeltaX handle cache invalidation across distributed edge nodes during real-time ad budget pacing updates?"*
2. *"What does the typical day-to-day engineering ownership look like for an Associate Product Engineer during their first six months?"*
