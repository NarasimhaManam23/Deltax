# DeltaX Round 2 AI Telephonic Interview: Project Questions (Simha AI, Smart Loan & Akki Assistant)

---

# PART 1: SIMHA AI MULTI-AGENT PLATFORM (10 QUESTIONS)
* **Stack**: FastAPI, React, MongoDB, Flask, voice/image/document inputs, AI agents, email composer, scheduler, URL summarization, persistent memory.

---

### Q1: "What is Simha AI, and what core problem does it solve?"
* **Likely Intent**: Pitch clarity and architectural vision.
* **Sample Answer**: "**Simha AI** is an extensible multi-agent productivity and workflow platform. It unifies multimodal inputs—voice audio, document PDFs, images, and URLs—into an autonomous agent orchestration pipeline. Instead of requiring users to switch between separate tools for transcription, web research, meeting scheduling, and draft generation, Simha AI employs specialized agents that share persistent conversational memory to execute end-to-end tasks like scraping and summarizing web links, drafting context-aware emails, and triggering scheduled calendar events."
* **Bad Answer**: "It's an all-in-one AI chatbot website."

---

### Q2: "How did you design persistent memory across multi-turn agent interactions in Simha AI using MongoDB?"
* **Likely Intent**: State management, NoSQL modeling, and context window limits.
* **Sample Answer**: "We modeled user interactions using a two-tier memory architecture in **MongoDB**: short-term conversation buffers stored as session message arrays, and long-term semantic memory extracted as entity key-value summaries. Each session document maintains conversation turns with metadata (role, timestamp, token count). To avoid exceeding LLM context windows, an automated summarizer agent compresses conversation turns older than $K$ messages into a running system context string."
* **Bad Answer**: "We just dump everything into a MongoDB collection with `insert_many`."

---

### Q3: "Why did your architecture feature BOTH FastAPI and Flask in Simha AI?"
* **Likely Intent**: Probe architectural justification for using two Python web frameworks.
* **Sample Answer**: "We used **FastAPI** as our primary, high-throughput asynchronous API gateway handling real-time WebSocket streams, agent orchestration, and frontend React communication. We used a lightweight **Flask** microservice dedicated to legacy or synchronous background workloads [VERIFY WITH USER: e.g., document parsing or specialized ML script execution], isolating heavy synchronous library dependencies from blocking FastAPI's async event loop."
* **Bad Answer**: "We didn't know which one was better, so we used both."

---

### Q4: "How does the URL Summarization agent extract and sanitize clean content from arbitrary websites?"
* **Likely Intent**: Web scraping mechanics, DOM parsing, and error handling.
* **Sample Answer**: "The URL agent accepts a link, validates the URL schema, dispatches an asynchronous HTTP GET request with realistic user-agent headers, and parses the HTML using BeautifulSoup/Readability algorithms. It strips out script tags, ads, navigation headers, and boilerplate DOM nodes, extracting the core article text before chunking and passing it to the summarization agent."
* **Bad Answer**: "It just downloads the HTML and feeds the whole website to the LLM."

---

### Q5: "How does the Voice Input pipeline process audio into actionable agent commands?"
* **Likely Intent**: Audio streaming, speech-to-text pipeline, and latency optimization.
* **Sample Answer**: "Audio is captured via the browser's MediaRecorder API on React, streamed as WebM/WAV blobs to the backend, converted via FFmpeg if necessary, and transcribed using an automated speech-to-text service (like Whisper). The resulting transcript is fed directly into the agent router, which classifies user intent and dispatches tasks to the appropriate sub-agent."
* **Bad Answer**: "The browser understands the voice and converts it."

---

### Q6: "How did you build the Automated Email Composer agent in Simha AI?"
* **Likely Intent**: Agent prompt design, structured output, and user-in-the-loop safety.
* **Sample Answer**: "The email agent takes high-level user bullet points and recipient context from persistent memory, generating a structured JSON output containing recipient, subject, body, and tone. Critically, we enforce a 'Human-in-the-Loop' pattern: the agent never sends emails autonomously; it renders an editable preview in the React UI for user verification and confirmation before dispatching via SMTP/OAuth."
* **Bad Answer**: "The AI automatically emails everyone in the contact list."

---

### Q7: "How did the Scheduler agent handle date and time parsing across timezones?"
* **Likely Intent**: Handling tricky datetime parsing and asynchronous event scheduling.
* **Sample Answer**: "Natural language scheduling (e.g., 'remind me next Tuesday at 3 PM') is parsed into structured ISO-8601 timestamps using tools like Python's `dateparser` anchored to the user's localized browser timezone offset. Scheduled jobs are stored in MongoDB and managed via a task scheduler (like APScheduler or Celery Beat) that triggers notifications or email reminders upon deadline maturity."
* **Bad Answer**: "We just used Python's `time.sleep()`."

---

### Q8: "What was the most difficult scaling challenge in Simha AI, and how did you resolve it?"
* **Likely Intent**: Systems engineering under concurrent loads.
* **Sample Answer**: "When multiple agents were invoked in parallel (e.g., transcribing audio while simultaneously summarizing an uploaded PDF and searching the web), server memory spiked due to concurrent document loading. We mitigated this by streaming file processing into memory-bounded chunks and implementing an asynchronous task queue to throttle concurrent background agent jobs."
* **Bad Answer**: "The database ran out of storage."

---

### Q9: "Why did you choose MongoDB over a relational database for Simha AI?"
* **Likely Intent**: Relational vs NoSQL database selection trade-offs.
* **Sample Answer**: "Simha AI processes unstructured, highly polymorphic agent payloads—such as varied document metadata, dynamic agent tool call parameters, audio transcript fragments, and evolving conversational schemas. MongoDB's flexible BSON document model allowed us to iterate on agent data structures without running complex relational table migrations on every feature addition."
* **Bad Answer**: "Because MongoDB is easier than writing SQL."

---

### Q10: "How did you measure the accuracy and user satisfaction of the agents in Simha AI?"
* **Likely Intent**: Product metrics and qualitative evaluation.
* **Sample Answer**: "We tracked quantitative metrics: task completion latency, token consumption per task, and API error rates. For qualitative evaluation, we integrated a simple thumbs-up/thumbs-down feedback widget in the React UI, storing ratings alongside agent prompt versions in MongoDB to identify low-performing prompt templates."
* **Bad Answer**: "Our friends told us they liked it."

---

# PART 2: SMART LOAN APPROVAL SYSTEM (8 QUESTIONS)
* **Stack**: MERN (MongoDB, Express, React, Node.js), Machine Learning, Streamlit.

---

### Q11: "Walk me through the architecture of your Smart Loan Approval System."
* **Likely Intent**: Multi-tier architecture comprehension (MERN application + ML service).
* **Sample Answer**: "The **Smart Loan Approval System** consists of a full-stack MERN application paired with an intelligent Machine Learning prediction engine. The React frontend allows applicants to enter financial, credit, and employment details, communicating with a Node.js/Express REST API that handles authentication, application state management, and persists applicant records in MongoDB. The Express backend communicates with a specialized Machine Learning microservice (or Streamlit administrative dashboard) running an ensemble classification model that evaluates creditworthiness and outputs approval probabilities with risk bands."
* **Bad Answer**: "It's a website built with MERN stack that approves loans."

---

### Q12: "Which Machine Learning algorithms did you evaluate for loan approval, and which one performed best?"
* **Likely Intent**: ML algorithm selection, comparative evaluation, and metrics.
* **Sample Answer**: "We evaluated Logistic Regression, Random Forest, and Gradient Boosting (XGBoost/LightGBM). While Logistic Regression provided basic interpretability, **Random Forest / XGBoost** performed best, achieving higher ROC-AUC and F1-scores by effectively capturing non-linear interactions between applicant income, loan amount term, debt-to-income ratio, and credit history."
* **Bad Answer**: "We used a Deep Neural Network with 50 layers for everything."

---

### Q13: "How did you handle the class imbalance problem typically present in loan default datasets?"
* **Likely Intent**: Real-world data preprocessing techniques.
* **Sample Answer**: "In credit datasets, approved/repaid loans vastly outnumber defaults. Training on raw data produces high accuracy by simply predicting 'approved' for everyone. We addressed this using **SMOTE (Synthetic Minority Over-sampling Technique)** on the training set to synthetically balance minority default samples, combined with tuning the classification decision threshold to optimize for False Negative reduction (preventing bad loans)."
* **Bad Answer**: "We just deleted half of the approved loans."

---

### Q14: "Why did you use Streamlit in this project alongside a React frontend?"
* **Likely Intent**: Clarify architectural boundaries between applicant UI and internal tooling.
* **Sample Answer**: "We maintained a separation of concerns: The **React frontend** was built for public customer-facing loan applications with customized brand styling and step-by-step form validation. **Streamlit** was deployed as an internal administrative and data science dashboard, allowing loan underwriters to rapidly upload batch CSVs, visualize model feature importances, simulate financial stress tests, and inspect approval threshold curves without needing to build custom React dashboards."
* **Bad Answer**: "We couldn't get React to work for everything."

---

### Q15: "How did your Express.js backend communicate with the Machine Learning model?"
* **Likely Intent**: Inter-service communication patterns (REST, child processes, microservices).
* **Sample Answer**: "We decoupled the architecture: The Python ML model was containerized and exposed as a lightweight HTTP microservice (using Flask/FastAPI). When a loan application was submitted on Express, Node's `axios` client dispatched an asynchronous internal POST request containing the sanitized applicant payload, received the risk probability score, and stored the decision in MongoDB."
* **Bad Answer**: "Express directly imported Python code using `require()`."

---

### Q16: "What feature engineering techniques were most impactful in predicting loan approvals?"
* **Likely Intent**: Feature engineering depth and financial domain logic.
* **Sample Answer**: "The most impactful derived features were the **Debt-to-Income (DTI) ratio**, the **Loan-to-Income ratio** (Loan Amount divided by Total Applicant + Co-applicant Income), and an indicator flag for **Clean Credit History**. Credit history alone was the strongest single predictor, but combining it with income-to-loan ratios dramatically sharpened the model's precision."
* **Bad Answer**: "We used applicant age and name."

---

### Q17: "How did you secure sensitive financial data stored in MongoDB?"
* **Likely Intent**: Data security and privacy awareness.
* **Sample Answer**: "We sanitized all inputs using Express validators, hashed user authentication passwords with bcrypt, masked sensitive identification numbers in API responses, enforced field-level authorization checks so users could only view their own loan applications, and used environmental variables for database connection strings and JWT signing secrets."
* **Bad Answer**: "MongoDB is naturally secure so we didn't need anything."

---

### Q18: "What was a major bug you resolved during the development of the Smart Loan system?"
* **Likely Intent**: Debugging story and data consistency.
* **Sample Answer**: "A subtle bug occurred where applicants with zero co-applicant income caused division-by-zero errors in our backend feature engineering script when calculating income ratios. This resulted in `NaN` values that caused the model to return 500 errors. I patched this by implementing Pydantic/Joi input sanitization, adding epsilon smoothing, and defaulting missing co-applicant fields cleanly before vectorization."
* **Bad Answer**: "I forgot to start the MongoDB server."

---

# PART 3: AKKI AI ASSISTANT (7 QUESTIONS)
* **Stack**: Telegram, n8n, OpenAI/GPT, Whisper, Gmail, Calendar, Google Sheets, PostgreSQL, automation workflows.

---

### Q19: "Can you describe what the Akki AI Assistant does and its underlying architecture?"
* **Likely Intent**: Workflow automation, event-driven architecture, and multi-service orchestration.
* **Sample Answer**: "**Akki AI Assistant** is an intelligent personal automation agent accessible via **Telegram**. It bridges conversational AI with real-world productivity ecosystems using **n8n workflow automation** as the event-driven orchestrator. A user can send voice notes or text commands in Telegram. The audio is transcribed via **Whisper**, processed by **GPT** for intent extraction and entity slot-filling, and routed by n8n to execute concrete actions: scheduling meetings in **Google Calendar**, drafting or sending emails via **Gmail**, logging financial transactions in **Google Sheets**, and persisting long-term interaction logs in **PostgreSQL**."
* **Bad Answer**: "It's a simple Telegram bot that chats with people."

---

### Q20: "Why did you choose n8n as the orchestration backbone instead of writing custom Python scripts for every integration?"
* **Likely Intent**: Engineering pragmatism, visual workflow trade-offs, and webhook scalability.
* **Sample Answer**: "**n8n** provided a self-hosted, scalable, low-code workflow engine with production-ready error handling, automatic retries, and native OAuth credential management for Google APIs. Building and maintaining custom OAuth token refresh cycles and webhook listeners for Gmail, Calendar, and Telegram in raw Python would have incurred massive boilerplate overhead. n8n allowed us to focus our custom code on prompt engineering, parsing logic, and PostgreSQL database modeling while leveraging n8n's robust node execution engine."
* **Bad Answer**: "Because writing Python code for all those APIs was too hard."

---

### Q21: "How does the Voice transcription pipeline in Akki Assistant work from Telegram to execution?"
* **Likely Intent**: Audio formats, Telegram Bot API, and Whisper integration.
* **Sample Answer**: "Telegram records voice notes in the OGG Opus audio container format. When a voice note arrives, the Telegram webhook triggers an n8n node that downloads the file via the Telegram Bot API. n8n sends the binary audio buffer directly to the OpenAI Whisper API for speech-to-text transcription. The resulting text string is then passed downstream to the GPT intent classification node."
* **Bad Answer**: "Telegram automatically transcribes the audio before sending it to n8n."

---

### Q22: "How does the system ensure that an ambiguous command like 'Schedule a sync with Rahul tomorrow' creates the correct Google Calendar event?"
* **Likely Intent**: Slot-filling, temporal resolution, and conversational confirmation.
* **Sample Answer**: "We use structured Function Calling / Tool Calling with GPT. The system prompt injects the current date, time, and timezone. The LLM extracts required parameters: `event_title`, `start_time`, `end_time`, and `attendee`. If an essential slot (like meeting time) is missing, the workflow intercepts the missing parameter and prompts the user on Telegram: 'What time tomorrow would you like to schedule the sync with Rahul?' before executing the calendar API call."
* **Bad Answer**: "GPT guesses the time and creates the event."

---

### Q23: "How is PostgreSQL used in the Akki AI Assistant ecosystem?"
* **Likely Intent**: Relational logging, user state, and audit trails.
* **Sample Answer**: "We use **PostgreSQL** as the persistent system of record: storing Telegram user IDs, permission flags, historical command logs, execution statuses (Success/Failure), and parsed task metrics. This enables auditability, allows the assistant to recall previous context across days, and supports structured analytics on common automated actions."
* **Bad Answer**: "PostgreSQL stores the Telegram bot tokens."

---

### Q24: "How did you handle security and prevent unauthorized Telegram users from triggering actions on your personal Gmail or Calendar?"
* **Likely Intent**: Authorization, authentication, and bot security.
* **Sample Answer**: "We implemented strict authentication at the webhook entry point: Every incoming Telegram update contains the sender's unique numeric Telegram `User_ID`. The very first node in our n8n workflow executes an authorization filter: if the sender's ID does not match our preconfigured master admin whitelist stored in environment variables, the workflow immediately drops the request with an unauthorized warning, completely blocking unauthorized access to Google APIs."
* **Bad Answer**: "We didn't share the Telegram bot link with anyone."

---

### Q25: "What was the most rewarding aspect of deploying the Akki AI Assistant?"
* **Likely Intent**: Personal utility, end-to-end impact, and pragmatic automation.
* **Sample Answer**: "The most rewarding aspect was that Akki wasn't just a classroom project—it became a real, daily tool I actively rely on. Being able to speak a 5-second voice note while walking and having it accurately parse an expense, log it in Google Sheets, and update my PostgreSQL audit table demonstrated the tangible power of combining LLMs with event-driven automation."
* **Bad Answer**: "Getting a good grade from our professor."
