"""
FirstLabs Prep — FED-2026 Interview, Study Notes, Cheatsheets & Plan Generator
Generates:
1. interview_questions.json (Technical & JavaScript Interview questions aligned with JD)
2. study_notes.json (In-depth notes on JS, DOM, Web Standards, SQL, React)
3. cheatsheets.json (Quick revision cards)
4. plan_tasks.json (Structured 7-day preparation tasks)
"""

import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
CONTENT_DIRS = [
    BASE_DIR / "content",
    BASE_DIR / "backend" / "app" / "content",
    BASE_DIR / "frontend" / "src" / "data",
]

def save_json(filename: str, data):
    for d in CONTENT_DIRS:
        target = d / filename
        with open(target, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Saved {filename} to all targets.")

# =============================================================
# 1. TECHNICAL INTERVIEW QUESTIONS (interview_questions.json)
# =============================================================
interview_questions = [
    {
        "id": "tech_int_01",
        "round": 2,
        "category": "JavaScript & Asynchronous",
        "question": "How does the JavaScript Event Loop coordinate execution between the Call Stack, Microtask Queue, and Macrotask (Task) Queue? What is the impact on UI rendering?",
        "intent": "Tests deep understanding of V8 runtime internals, non-blocking asynchronous execution, and how long-running microtasks can starve the browser render pipeline.",
        "framework": "Define Call Stack -> Explain Macrotask Queue (setTimeout, I/O) -> Explain Microtask Queue (Promises, queueMicrotask, MutationObserver) -> Explain the Event Loop Tick & Render Pipeline.",
        "sample_answer": "JavaScript is single-threaded with a non-blocking concurrency model. When synchronous script executes on the Call Stack, any asynchronous callbacks are registered with Web APIs.\n\nWhen a Promise settles, its `.then()` or `.catch()` callback is enqueued into the **Microtask Queue**. Timers like `setTimeout` enqueue into the **Macrotask Queue**.\n\nOn each Event Loop tick:\n1. The engine executes one task from the Call Stack until empty.\n2. It drains the **entire Microtask Queue to completion**, including any newly enqueued microtasks scheduled while processing the queue.\n3. The browser checks if a **rendering frame (style recalculation, layout, paint)** is required (typically at 60Hz/120Hz).\n4. The engine picks **one** macrotask from the Task queue and runs it.\n\n**Impact on UI Rendering**: If a microtask loop continuously schedules more microtasks, the engine never reaches the rendering phase, completely freezing the UI and causing severe Interaction to Next Paint (INP) degradation.",
        "bad_answer": "The event loop just runs tasks in order of when they finish using multithreading.",
        "follow_up": "What happens if you run an infinite recursive `Promise.resolve().then(recurse)` versus `setTimeout(recurse, 0)`?",
        "definition": "The Event Loop continuously monitors the Call Stack and Task Queues, dispatching callbacks when execution frames clear.",
        "deep_detail": "Microtasks have higher priority than UI rendering; macrotasks yield control back to the browser between iterations.",
        "trap": "Do not confuse `requestAnimationFrame` with microtasks; rAF runs immediately before the browser calculates layout and paint, not immediately after the call stack clears.",
        "body_markdown": "### Event Loop Coordination & UI Render Pipeline\n\n```mermaid\ngraph TD\n    A[Call Stack: Synchronous Code] --> B{Call Stack Empty?}\n    B -- No --> A\n    B -- Yes --> C[Drain All Microtasks: Promises, queueMicrotask]\n    C --> D{Render Frame Due?}\n    D -- Yes --> E[Execute rAF -> Layout Reflow -> Paint -> Composite]\n    D -- No --> F[Pick 1 Macrotask: setTimeout, I/O]\n    E --> F\n    F --> A\n```"
    },
    {
        "id": "tech_int_02",
        "round": 2,
        "category": "React & Components",
        "question": "How does React 18's Fiber architecture perform reconciliation, and what problem does Concurrent React solve compared to legacy synchronous rendering?",
        "intent": "Assesses modern React architectural depth, Fiber nodes, work-in-progress trees, interruptible rendering, and time slicing.",
        "framework": "Legacy stack reconciler limitations -> What a Fiber node represents -> Render phase vs Commit phase -> Concurrent scheduling (useTransition, Suspense).",
        "sample_answer": "In React 15 (Stack Reconciler), updates were processed recursively and synchronously down the component tree. For complex UIs, this would monopolize the main thread for >16ms, dropping frames and causing sluggish inputs.\n\nReact 18's **Fiber architecture** models the component tree as a linked list of virtual stack frames (Fiber nodes), enabling **incremental and interruptible rendering**.\n\nReconciliation is split into two phases:\n1. **Render / Reconciliation Phase (Interruptible)**: React computes diffs and marks side-effects on a Work-in-Progress Fiber tree. If a high-priority user interaction occurs (like typing in a search bar), React pauses low-priority rendering, handles the user event, and resumes or discards work.\n2. **Commit Phase (Synchronous)**: React commits the calculated DOM mutations in one fast synchronous step to prevent visual tearing.\n\nConcurrent features like `useTransition` allow marking state updates as non-urgent transitions, keeping the user interface fluid and responsive.",
        "bad_answer": "React 18 is faster because of virtual DOM diffing algorithms.",
        "follow_up": "How does `startTransition` differ from `debounce` when optimizing heavy search filter components?",
        "definition": "Fiber is a data structure representing a unit of component work that can be paused, prioritized, and resumed.",
        "deep_detail": "Fiber nodes contain pointers: `child`, `sibling`, and `return` (parent), allowing traversal without call stack recursion.",
        "trap": "The Render phase can be invoked multiple times before commit; side-effects must never be executed in the component render body, only inside `useEffect`.",
        "body_markdown": "### Fiber Tree Linked-List Architecture\n\nEach Fiber node maintains three pointers:\n- `child`: First direct child\n- `sibling`: Next sibling at the same level\n- `return`: Parent node for bubbling back up"
    },
    {
        "id": "tech_int_03",
        "round": 3,
        "category": "Frontend Architecture",
        "question": "How would you design a high-performance debounced live search component in React that fetches real-time job openings from an API without race conditions or memory leaks?",
        "intent": "Evaluates practical coding architecture, hook usage, cleanup functions, cancellation via AbortController, and debouncing.",
        "framework": "Requirement analysis -> Custom debounced hook -> AbortController cancellation -> Loading, error, and empty states -> Accessibility.",
        "sample_answer": "A resilient live search requires three engineering layers:\n\n1. **Debouncing Input**: Avoid flooding the server on every keystroke. Use a custom `useDebounce` hook that delays query changes by 300ms.\n2. **Race Condition Prevention with `AbortController`**: When a new debounced query fires before the previous HTTP response arrives, the previous request must be aborted using `controller.abort()`. Otherwise, an earlier slow response could overwrite a later fast response (stale data bug).\n3. **Component Cleanup**: Cancel pending timers and active fetch requests when the component unmounts.\n\n```jsx\nuseEffect(() => {\n  if (!debouncedQuery.trim()) {\n    setResults([]);\n    return;\n  }\n  \n  const controller = new AbortController();\n  setIsLoading(true);\n  \n  fetchJobs(debouncedQuery, { signal: controller.signal })\n    .then(data => setResults(data))\n    .catch(err => {\n      if (err.name !== 'AbortError') setError(err);\n    })\n    .finally(() => setIsLoading(false));\n    \n  return () => controller.abort(); // Cleanup & cancel\n}, [debouncedQuery]);\n```",
        "bad_answer": "Just put a setTimeout inside onChange and set state directly.",
        "follow_up": "How would you handle keyboard navigation (Arrow Down, Enter) and screen reader announcements for the search dropdown?",
        "definition": "Race conditions occur when asynchronous network response ordering does not match request trigger ordering.",
        "deep_detail": "Always check `err.name === 'AbortError'` to avoid treating intentional aborts as runtime errors.",
        "trap": "Forgetting the cleanup return function in `useEffect` leaves dangling network promises and potential state updates on unmounted components.",
        "body_markdown": "### Live Search Architecture Pattern\n- Keystroke -> `useDebounce` (300ms) -> `AbortController` -> Fetch API -> Clean Render."
    },
    {
        "id": "tech_int_04",
        "round": 3,
        "category": "Core Web Vitals",
        "question": "Explain Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS). How do you diagnose and optimize each metric on a modern web application?",
        "intent": "Demonstrates practical production performance engineering, Web Vitals mastery, and user-centric optimization.",
        "framework": "Define each vital with target thresholds -> Root causes -> Concrete architectural optimizations.",
        "sample_answer": "Core Web Vitals quantify real user experience:\n\n1. **Largest Contentful Paint (LCP)** (Target: < 2.5s):\n   - Measures perceptual loading speed: the time when the largest visible content block (hero image, heading) is rendered.\n   - **Fixes**: Preload hero images via `<link rel=\"preload\">`, optimize server response time (TTFB), employ CDN edge caching, and avoid client-rendered heroes without SSR/SSG.\n\n2. **Interaction to Next Paint (INP)** (Target: < 200ms):\n   - Measures responsiveness: latency from any user interaction (click, tap, keydown) until the browser renders the next visual frame.\n   - **Fixes**: Break long tasks (> 50ms) using `scheduler.yield()` or `setTimeout`, wrap non-critical state updates in `startTransition`, and avoid expensive synchronous calculations during event handlers.\n\n3. **Cumulative Layout Shift (CLS)** (Target: < 0.1):\n   - Measures visual stability: unexpected shifts of visible elements causing layout jumps.\n   - **Fixes**: Always specify explicit `width` and `height` (or aspect-ratio) on `<img>` and video tags, reserve skeleton containers for dynamic ad/content banners, and use `font-display: swap` with size-adjusted fallback fonts.",
        "bad_answer": "LCP is page load time, INP is input time, and CLS is CSS layout.",
        "follow_up": "How does `content-visibility: auto` improve page rendering speed for long scrollable pages?",
        "definition": "Core Web Vitals are Google's standardized metrics for user experience quality in loading, interactivity, and visual stability.",
        "deep_detail": "INP evaluates the 98th percentile of all interactions throughout the full lifespan of the page.",
        "trap": "Do not cite First Input Delay (FID) as the responsiveness metric; it was deprecated and replaced by INP in March 2024.",
        "body_markdown": "### Core Web Vitals Diagnostic Matrix\n| Vital | Target | Root Cause | Architectural Mitigation |\n|---|---|---|---|\n| **LCP** | < 2.5s | Slow server, render-blocking resources | Preload hero assets, edge CDN caching |\n| **INP** | < 200ms | Long tasks > 50ms blocking main thread | `startTransition`, task chunking via `yield()` |\n| **CLS** | < 0.1 | Images/banners without dimensions | Explicit `aspect-ratio`, skeleton placeholders |"
    },
    {
        "id": "tech_int_05",
        "round": 3,
        "category": "Frontend Architecture",
        "question": "What is the difference between client-side state management approaches (Local state, Context API, Redux/Zustand, and Server Cache like TanStack Query)? When should each be used?",
        "intent": "Tests architectural judgment, data modeling, preventing unnecessary re-renders, and avoiding monolithic state anti-patterns.",
        "framework": "Categorize state: UI state vs Server Cache -> Evaluate Context API limitations -> Evaluate external stores (Zustand/Redux) -> Server cache (TanStack Query).",
        "sample_answer": "Modern frontend architecture separates state into two distinct categories: **Client UI State** and **Server State Cache**.\n\n1. **Local State (`useState` / `useReducer`)**: Best for isolated component concerns like open/closed modal toggles, dropdown active states, or transient form inputs.\n2. **Context API**: Best for low-velocity global values that rarely change (theme, authenticated user profile, language/locale). It is an anti-pattern for rapid state (like frequent typing or streaming values) because any context change triggers a re-render in all consuming children unless carefully split.\n3. **Zustand / Redux Toolkit**: Ideal for complex, high-velocity client state shared across disconnected component subtrees (e.g. multi-step application wizards, audio players, interactive canvas states).\n4. **Server State Libraries (TanStack Query / SWR)**: Dedicated to asynchronous remote data. They handle caching, background deduplication, polling, mutation rollbacks, and automatic garbage collection far more reliably than manual `useEffect` + Redux combinations.",
        "bad_answer": "Just put everything in Redux or Context so any component can access it.",
        "follow_up": "Why does updating a Context value cause child components to re-render even if they only read a different property of the context object?",
        "definition": "Server state is remote, asynchronous, and owned by an external source; client state is synchronous and owned by the browser UI.",
        "deep_detail": "TanStack Query eliminates 80% of boilerplate global Redux code by treating HTTP data as a synchronized server cache.",
        "trap": "Using Context API as a global state management library for high-frequency updates causes massive cascading re-render bottlenecks.",
        "body_markdown": "### State Segregation Pyramid\n- **Base**: Local State (`useState`) for isolated UI elements\n- **Middle**: Server Cache (`TanStack Query`) for all API data\n- **Apex**: Global Store (`Zustand`) for multi-step interactive workflows"
    }
]

# =============================================================
# 2. STUDY NOTES (study_notes.json)
# =============================================================
study_notes = [
    {
        "slug": "js-scope-hoisting-tdz",
        "title": "JavaScript Scope, Hoisting & Temporal Dead Zone",
        "category": "JavaScript",
        "reading_time_min": 8,
        "explanation": "Scope determines the accessibility of variables, functions, and objects in code. JavaScript features Global, Function, and Block scopes (introduced in ES6 with `let` and `const`). Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope during the compile phase before code execution.",
        "why_it_matters": "Frequently tested in Round 1 screening MCQs through tricky output-prediction questions involving `var` vs `let` in asynchronous loops and uninitialized variable accesses.",
        "syntax_examples": "```javascript\n// TDZ Example\nconsole.log(hoistedVar); // undefined\nconsole.log(tdzLet);     // ReferenceError: Cannot access 'tdzLet' before initialization\nvar hoistedVar = 'I am var';\nlet tdzLet = 'I am let';\n```",
        "common_traps": "1. Believing `let` and `const` are not hoisted. They ARE hoisted, but they reside in the Temporal Dead Zone until their definition line.\n2. Function declarations are hoisted completely with their implementation; function expressions assigned to `var` only have the variable name hoisted as `undefined`.",
        "revision_summary": "- `var`: Function-scoped, hoisted as `undefined`, re-declarable.\n- `let` / `const`: Block-scoped, hoisted into TDZ, throws `ReferenceError` if accessed before initialization.\n- Use `const` by default, `let` when reassignment is required, never `var` in modern frontend applications."
    },
    {
        "slug": "js-event-loop-microtasks",
        "title": "The Browser Event Loop, Microtasks & Timers",
        "category": "JavaScript",
        "reading_time_min": 10,
        "explanation": "The Event Loop is the orchestrator that enables JavaScript's non-blocking, asynchronous execution. While synchronous code executes sequentially on the single Call Stack, asynchronous callbacks are dispatched via the Microtask Queue and the Macrotask (Task) Queue.",
        "why_it_matters": "A core topic in both Round 1 online assessments and Round 3 technical interviews. Candidates are routinely asked to trace multi-step asynchronous console outputs.",
        "syntax_examples": "```javascript\nconsole.log('Sync 1');\nsetTimeout(() => console.log('Macro 1'), 0);\nPromise.resolve().then(() => console.log('Micro 1'));\nqueueMicrotask(() => console.log('Micro 2'));\nconsole.log('Sync 2');\n// Output: Sync 1 -> Sync 2 -> Micro 1 -> Micro 2 -> Macro 1\n```",
        "common_traps": "1. Assuming `setTimeout(fn, 0)` runs immediately after synchronous code. Microtasks ALWAYS run before macrotasks.\n2. A recursive microtask queue loop will starve the browser of rendering frames, crashing tab responsiveness.",
        "revision_summary": "- Priority order: Call Stack (Sync) -> Microtask Queue (All drained) -> Render Phase (if due) -> Next 1 Macrotask.\n- Microtasks: Promises (`.then`, `.catch`, `.finally`), `queueMicrotask`, `MutationObserver`.\n- Macrotasks: `setTimeout`, `setInterval`, `setImmediate`, I/O, UI event handlers."
    },
    {
        "slug": "dom-event-propagation-delegation",
        "title": "DOM Event Propagation, Bubbling & Delegation",
        "category": "DOM Concepts",
        "reading_time_min": 8,
        "explanation": "DOM events do not occur in isolation. When an element is clicked, the event traverses three distinct phases: Capturing (from Document root down to the target), Target phase (at the clicked node), and Bubbling (propagating upwards back to the root). Event Delegation harnesses bubbling by listening to events on an ancestor rather than individual children.",
        "why_it_matters": "Directly tested in frontend assessments to assess DOM understanding and optimization of high-density UI lists and tables.",
        "syntax_examples": "```javascript\n// Event Delegation on a list\nconst list = document.querySelector('#job-listings');\nlist.addEventListener('click', (e) => {\n  const card = e.target.closest('.job-card');\n  if (card && list.contains(card)) {\n    handleJobClick(card.dataset.jobId);\n  }\n});\n```",
        "common_traps": "1. Confusing `e.target` (the innermost element clicked) with `e.currentTarget` (the element owning the event listener).\n2. Calling `e.stopPropagation()` unnecessarily, which prevents parent components or telemetry tools from observing interactions.",
        "revision_summary": "- Event flow: Capture (Root -> Target) -> Target -> Bubble (Target -> Root).\n- `e.preventDefault()` halts default browser action; `e.stopPropagation()` halts tree bubbling.\n- `target.closest(selector)` safely locates delegated parent containers even when inner text/icons are clicked."
    },
    {
        "slug": "sql-joins-subqueries-aggregations",
        "title": "SQL Fundamentals: Relational Joins & Subqueries",
        "category": "SQL & Databases",
        "reading_time_min": 10,
        "explanation": "Structured Query Language (SQL) enables querying and transforming relational data. Key operations include inner and outer joins, grouping sets with aggregate functions (`COUNT`, `AVG`, `SUM`, `MAX`), filtering grouped data with `HAVING`, and correlated subqueries.",
        "why_it_matters": "Confirmed in the candidate recruitment invitation email as a required topic for Round 2 technical evaluation.",
        "syntax_examples": "```sql\n-- Second Highest Salary\nSELECT MAX(salary) AS second_highest_salary\nFROM employees\nWHERE salary < (SELECT MAX(salary) FROM employees);\n\n-- Department aggregation with HAVING\nSELECT d.name, COUNT(e.id) AS emp_count, ROUND(AVG(e.salary), 2) AS avg_sal\nFROM departments d\nJOIN employees e ON d.id = e.department_id\nGROUP BY d.id, d.name\nHAVING COUNT(e.id) >= 2\nORDER BY avg_sal DESC;\n```",
        "common_traps": "1. Using `WHERE` to filter aggregate values instead of `HAVING`.\n2. Relying on `LIMIT 1 OFFSET 1` for second-highest salary without handling tied maximum values.\n3. Omitting non-aggregated columns from the `GROUP BY` clause.",
        "revision_summary": "- SQL execution order: `FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT`.\n- `INNER JOIN` matches intersecting records; `LEFT JOIN` retains all left-hand records with `NULL` fills.\n- Use correlated subqueries when comparing an individual row's value to its group's aggregate."
    },
    {
        "slug": "web-standards-security-accessibility",
        "title": "Web Standards, Security (CORS/XSS/CSP) & WCAG Accessibility",
        "category": "Web Standards",
        "reading_time_min": 9,
        "explanation": "Modern web developers must adhere to open web standards, defense-in-depth client security, and inclusive accessibility. Core concepts include Cross-Origin Resource Sharing (CORS), Cross-Site Scripting (XSS) defenses, Content Security Policy (CSP), and WCAG 2.1 AA keyboard/screen reader compliance.",
        "why_it_matters": "Emphasized in the official Associate Frontend Developer JD under 'Accessibility & Standards' and 'DOM, CSS & Browser Internals'.",
        "syntax_examples": "```html\n<!-- Accessible, Secure Button Component -->\n<button \n  type=\"button\"\n  aria-expanded=\"false\"\n  aria-controls=\"filter-menu\"\n  class=\"btn-action\"\n>\n  Filter Positions\n</button>\n```",
        "common_traps": "1. Thinking CORS is a server-security barrier; CORS is enforced by the client browser to protect users, not the server.\n2. Storing sensitive authentication tokens in `localStorage` where any XSS vulnerability can extract them.",
        "revision_summary": "- Use `HttpOnly, Secure, SameSite=Strict` cookies for sensitive tokens.\n- Implement Content Security Policy (`CSP`) to restrict unauthorized script sources.\n- Always link form `<label for=\"input-id\">` with `<input id=\"input-id\">` for accessibility."
    }
]

# =============================================================
# 3. CHEAT SHEETS (cheatsheets.json)
# =============================================================
cheatsheets = [
    {
        "id": "cs_js_array_methods",
        "title": "JavaScript Array Methods Quick Reference",
        "category": "JavaScript",
        "summary": "Mutating vs non-mutating methods, return types, and time complexities.",
        "key_points": [
            "Non-Mutating (Pure): map(), filter(), reduce(), slice(), concat(), flat(), toSorted(), toReversed()",
            "Mutating (In-place): push(), pop(), shift(), unshift(), splice(), sort(), reverse()",
            "Search: find() returns first match or undefined; findIndex() returns index or -1; includes() returns boolean",
            "Quantifiers: some() returns true if any element passes; every() returns true if all pass"
        ]
    },
    {
        "id": "cs_event_loop_order",
        "title": "Event Loop & Task Priority Cheatsheet",
        "category": "JavaScript",
        "summary": "Execution order of synchronous code, microtasks, and macrotasks.",
        "key_points": [
            "1. Synchronous JavaScript: Call Stack runs to completion",
            "2. Microtasks: Promise .then/.catch, queueMicrotask, MutationObserver (ALL drained)",
            "3. Render Phase: requestAnimationFrame -> Style calculation -> Layout Reflow -> Paint",
            "4. Macrotask: setTimeout, setInterval, I/O (ONE task executed per tick)"
        ]
    },
    {
        "id": "cs_css_specificity",
        "title": "CSS Specificity Calculation Cheatsheet",
        "category": "Web Standards",
        "summary": "Rules for calculating rule precedence in CSS cascades.",
        "key_points": [
            "Inline styles: (1, 0, 0, 0) — highest normal priority",
            "ID selectors: (0, 1, 0, 0)",
            "Class, attribute, and pseudo-class selectors: (0, 0, 1, 0) — e.g. .btn, [type=\"text\"], :hover",
            "Element and pseudo-element selectors: (0, 0, 0, 1) — e.g. div, p, ::before",
            "!important overrides everything except higher-specificity !important"
        ]
    },
    {
        "id": "cs_sql_join_types",
        "title": "SQL Joins & Execution Order Cheatsheet",
        "category": "SQL & Databases",
        "summary": "Join behaviors and ANSI SQL query execution pipeline.",
        "key_points": [
            "INNER JOIN: Retains only matching rows from both tables",
            "LEFT JOIN: Retains all rows from left table, fills missing right matches with NULL",
            "RIGHT JOIN: Retains all rows from right table",
            "FULL OUTER JOIN: Retains all rows from both tables",
            "Execution Order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT"
        ]
    },
    {
        "id": "cs_core_web_vitals",
        "title": "Core Web Vitals Thresholds & Diagnostics",
        "category": "Performance",
        "summary": "Target thresholds and optimization levers for LCP, INP, and CLS.",
        "key_points": [
            "Largest Contentful Paint (LCP): Good < 2.5s | Preload hero images, CDN edge caching",
            "Interaction to Next Paint (INP): Good < 200ms | Break long tasks > 50ms, startTransition",
            "Cumulative Layout Shift (CLS): Good < 0.1 | Explicit aspect-ratio, reserve placeholder boxes"
        ]
    }
]

# =============================================================
# 4. PREPARATION PLAN (plan_tasks.json)
# =============================================================
plan_tasks = [
    {
        "id": "plan_day_1",
        "day": "Day 1",
        "title": "JavaScript Fundamentals & Scope Mechanics",
        "duration_hours": 3.0,
        "priority": "Crucial",
        "tasks": [
            "Study: Scope, Hoisting, and Temporal Dead Zone",
            "Practice: 25 JS Fundamentals MCQs (Closures, this, type coercion)",
            "Solve: Reverse a String & Valid Palindrome in the Code Editor"
        ],
        "category": "Round 1 Screening"
    },
    {
        "id": "plan_day_2",
        "day": "Day 2",
        "title": "Event Loop, Async Patterns & Output Prediction",
        "duration_hours": 3.0,
        "priority": "Crucial",
        "tasks": [
            "Study: Event Loop execution order (Microtasks vs Macrotasks)",
            "Practice: 20 Asynchronous output prediction questions",
            "Solve: Implement a Debounce Function with leading/trailing edge options"
        ],
        "category": "Round 1 Screening"
    },
    {
        "id": "plan_day_3",
        "day": "Day 3",
        "title": "DOM Mechanics & Event Delegation",
        "duration_hours": 2.5,
        "priority": "High",
        "tasks": [
            "Study: DOM tree nodes, event bubbling vs capturing, preventDefault vs stopPropagation",
            "Practice: 20 DOM Concepts & Forms MCQs",
            "Solve: Two Sum & Character Frequency Counter challenges"
        ],
        "category": "Round 1 Screening"
    },
    {
        "id": "plan_day_4",
        "day": "Day 4",
        "title": "SQL Relational Joins & Aggregate Queries",
        "duration_hours": 3.5,
        "priority": "Crucial (Email Requirement)",
        "tasks": [
            "Study: SQL query execution order, INNER/LEFT joins, and GROUP BY / HAVING",
            "Execute: 5 interactive query challenges in the SQL Sandbox (Employees, Depts, Orders)",
            "Master: Second-highest salary and department average correlated subqueries"
        ],
        "category": "Round 2 Coding + SQL"
    },
    {
        "id": "plan_day_5",
        "day": "Day 5",
        "title": "Web Standards, Security & Timed Mocks",
        "duration_hours": 3.0,
        "priority": "High",
        "tasks": [
            "Study: CSS Specificity rules, Box Model, CORS preflight, and WCAG Accessibility",
            "Take: Mock Test 1 (Round 1 Full Screening Diagnostic — 45 mins)",
            "Review: Mistake Notebook to remediate all incorrect answers"
        ],
        "category": "Mock Testing"
    },
    {
        "id": "plan_day_6",
        "day": "Day 6",
        "title": "Technical Interview & React Architecture",
        "duration_hours": 3.0,
        "priority": "High",
        "tasks": [
            "Study: React 18 Fiber reconciliation, Concurrent features, and custom hooks",
            "Prepare: Model answers for Core Web Vitals (LCP, INP, CLS) and state architecture",
            "Walkthrough: FirstHire semantic search system design trade-offs"
        ],
        "category": "Technical Interview"
    },
    {
        "id": "plan_day_7",
        "day": "Day 7",
        "title": "Final Mixed Mock Simulation & Review",
        "duration_hours": 2.5,
        "priority": "Crucial",
        "tasks": [
            "Take: Mock Test 5 (FED-2026 Comprehensive Pre-Drive Simulation — 60 mins)",
            "Review: High-frequency cheatsheets and saved bookmarks",
            "Final verification: Ensure streak is maintained and readiness analytics >= 85%"
        ],
        "category": "Final Simulation"
    }
]

save_json("interview_questions.json", interview_questions)
save_json("study_notes.json", study_notes)
save_json("cheatsheets.json", cheatsheets)
save_json("plan_tasks.json", plan_tasks)
print("All interview questions, study notes, cheatsheets, and plan tasks successfully generated.")
