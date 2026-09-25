# DeltaX Coding Question Bank: Application-Based & Parsing Problems (20 Original Problems)

---

### Problem APP01: Enterprise Email Address Validator
* **Context**: AdTech customer onboarding validation.
* **Statement**: Write a function `isValidEmail(String email)` without using external regex libraries. Rules:
  1. Contains exactly one `@` character, not at the beginning or end.
  2. Username: letters, digits, '.', '_', '-'. Cannot begin or end with a dot, and cannot have consecutive dots (`..`). Max length 64.
  3. Domain: at least one dot separating labels. Labels can contain letters, digits, and hyphens (cannot start/end with hyphen).
  4. Top-level domain (TLD): must consist of at least 2 alphabetic characters.
* **Input**: `"candidate.2027@deltax.co.in"` $\rightarrow$ **Output**: `true`
* **Input**: `"bad..email@deltax.com"` $\rightarrow$ **Output**: `false`

---

### Problem APP02: URL Tracking Query Parser with Decoding
* **Context**: Parsing campaign click attribution parameters.
* **Statement**: Given a full tracking URL string, extract all query parameters into a key-value dictionary. If a key appears multiple times, collect values in a list. Decode percent-encoded entities: `%20` $\rightarrow$ space, `%26` $\rightarrow$ `&`, `%3D` $\rightarrow$ `=`. Ignore fragment identifiers (`#`).
* **Input**: `"https://engine.deltax.com/click?cid=101&tag=meta&tag=retargeting&name=Ad%20Summer"`
* **Output**: `{"cid": ["101"], "tag": ["meta", "retargeting"], "name": ["Ad Summer"]}`

---

### Problem APP03: Delimited Text to JSON Formatter
* **Context**: Converting legacy ad server log lines into structured JSON.
* **Statement**: Given a string of semicolon-delimited key-value pairs `"k1=v1;k2=v2"`, produce a valid, indented JSON string. Auto-detect integers and booleans (`true`/`false`) so they are NOT quoted in the resulting JSON output.
* **Input**: `"campaignId=884;active=true;budget=2500.50;network=Google"`
* **Output**:
```json
{
  "campaignId": 884,
  "active": true,
  "budget": 2500.50,
  "network": "Google"
}
```

---

### Problem APP04: CSV Line Tokenizer with Quoted Commas
* **Context**: Exporting ad campaign metrics from third-party CSV reports.
* **Statement**: Parse a single line from a CSV file into an array of string tokens. Handle commas enclosed within double quotes (`"text, with, commas"`) as literal characters rather than field separators. Double quotes inside quotes (`""`) represent an escaped literal quotation mark.
* **Input**: `101,"Campaign, Q3 Promo",750.00,"""High Priority"""`
* **Output**: `["101", "Campaign, Q3 Promo", "750.00", "\"High Priority\""]`

---

### Problem APP05: Semantic Version Number Comparator
* **Context**: Verifying compatibility across SDK releases.
* **Statement**: Given two version strings `version1` and `version2`, compare them. If `version1 < version2` return `-1`; if `version1 > version2` return `1`; else return `0`. Ignore leading zeros in revision segments (e.g., `1.01 == 1.1`). Missing segments are treated as `0` (e.g., `1.0 == 1.0.0`).
* **Input**: `version1 = "1.01", version2 = "1.001"` $\rightarrow$ **Output**: `0`
* **Input**: `version1 = "1.0", version2 = "1.0.4"` $\rightarrow$ **Output**: `-1`

---

### Problem APP06: Validate IPv4 and IPv6 Addresses
* **Context**: Filtering fraudulent bot IP addresses.
* **Statement**: Given a string `queryIP`, return `"IPv4"` if valid IPv4, `"IPv6"` if valid IPv6, or `"Neither"`.
  - IPv4: 4 decimal numbers between 0 and 255 separated by dots. No leading zeroes permitted (except standalone `0`).
  - IPv6: 8 groups of 4 hexadecimal characters separated by colons. Empty groups forbidden.
* **Input**: `"172.16.254.1"` $\rightarrow$ **Output**: `"IPv4"`
* **Input**: `"2001:0db8:85a3:0:0:8A2E:0370:7334"` $\rightarrow$ **Output**: `"IPv6"`

---

### Problem APP07: Ad Impression Rate Limiter (Sliding Window Log)
* **Context**: Protecting endpoints from click spam.
* **Statement**: Design a rate limiter class `RateLimiter(int maxRequests, int windowSeconds)` that implements `boolean allow(String userId, long timestamp)`. A request is allowed if the user has not exceeded `maxRequests` within the preceding `windowSeconds` interval.
* **Optimal Approach**: Hash Map mapping `userId` to a `Deque<Long>` of recent timestamps. Prune timestamps older than `timestamp - windowSeconds` in $O(1)$ amortized time.

---

### Problem APP08: Currency Denomination Dispenser
* **Context**: Cash payout / budget disbursement optimization.
* **Statement**: Given an integer `amount` and an array of available currency denominations sorted descending `[2000, 500, 200, 100, 50, 20, 10, 5, 2, 1]`, output a map of denomination to count that dispenses the total amount using the minimal number of notes.
* **Input**: `amount = 3870`
* **Output**: `{2000: 1, 500: 3, 200: 1, 100: 1, 50: 1, 20: 1}`

---

### Problem APP09: Basic Calculator with Operator Precedence
* **Context**: Evaluating mathematical bid formulas from config files.
* **Statement**: Given a string `s` representing an arithmetic expression containing non-negative integers, `+`, `-`, `*`, `/`, and whitespace, evaluate and return its integer value. Integer division truncates toward zero. Do not use `eval()`.
* **Input**: `s = " 3 + 5 / 2 "` $\rightarrow$ **Output**: `5` ($3 + 2$)
* **Optimal Approach**: Stack tracking intermediate numbers with pending sign operations in $O(N)$ time, $O(N)$ space.

---

### Problem APP10: Nested Dictionary Flattener
* **Context**: Normalizing complex nested JSON tracking events into flat relational columns.
* **Statement**: Given a nested dictionary/map, return a flattened map where keys are concatenated using dot notation (`parent.child`).
* **Input**: `{"user": {"name": "Alex", "geo": {"country": "IN", "city": "BLR"}}, "bid": 4.5}`
* **Output**: `{"user.name": "Alex", "user.geo.country": "IN", "user.geo.city": "BLR", "bid": 4.5}`

---

### Problem APP11: Log Timestamp Sorter and Deduplicator
* **Context**: Merging asynchronous ad-server telemetry logs.
* **Statement**: You receive a stream of log records: `"[2026-09-29T10:14:05Z] EVENT_CLICK id=994"`. Parse the timestamps, eliminate exact duplicate events, and output the log entries strictly sorted in ascending chronological order.

---

### Problem APP12: Text Justification (Word Wrap)
* **Context**: Generating aligned ad banners and email snippets.
* **Statement**: Given an array of strings `words` and a width `maxWidth`, format the text such that each line has exactly `maxWidth` characters and is fully justified. Pad spaces as evenly as possible. The last line must be left-justified without extra spaces between words.

---

### Problem APP13: Subnet Mask IP Range Containment
* **Context**: Whitelisting enterprise ad agencies by CIDR subnet.
* **Statement**: Given an IP address (e.g., `"192.168.1.45"`) and a CIDR network block (e.g., `"192.168.1.0/24"`), write a function `boolean isIpInSubnet(String ip, String cidr)` that converts IPs to 32-bit integers, applies the subnet bitmask, and returns whether the IP belongs to that network.

---

### Problem APP14: Integer to English Words
* **Context**: Invoicing & financial check printing for ad payouts.
* **Statement**: Convert a non-negative integer `num` into its English words representation.
* **Input**: `num = 1234567` $\rightarrow$ **Output**: `"One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"`
* **Constraints**: $0 \le num \le 2^{31} - 1$.

---

### Problem APP15: In-Place Matrix Banner Transpose & Rotation
* **Context**: Creative ad asset image manipulation.
* **Statement**: You are given an $N \times N$ 2D matrix representing an image banner. Rotate the image by 90 degrees clockwise in-place without allocating a second matrix.
* **Optimal Approach**: Transpose the matrix (`swap(matrix[i][j], matrix[j][i])`), then reverse each individual row. Time: $O(N^2)$, Space: $O(1)$.

---

### Problem APP16: Key-Value Store with Time-to-Live (TTL) Eviction
* **Context**: Caching real-time bid pricing.
* **Statement**: Implement a class `TimedCache<K, V>` with methods:
  - `set(K key, V val, long ttlMillis, long currentTime)`
  - `get(K key, long currentTime)`: returns value if not expired, else `-1`.
  - `countUnexpired(long currentTime)`: returns count of valid active keys in $O(1)$ or $O(\log N)$.
* **Optimal Approach**: Hash Map + Min-Heap ordered by expiration timestamp.

---

### Problem APP17: Cron Tab Expression Next Trigger Calculator
* **Context**: Campaign recurring budget reset schedule.
* **Statement**: Given a standard 5-part cron expression (minute, hour, day-of-month, month, day-of-week) and a current timestamp, calculate the next timestamp when the cron trigger will fire.

---

### Problem APP18: Markdown Bold and Link Formatter
* **Context**: Rendering rich text in ad copy.
* **Statement**: Parse a string containing Markdown bold syntax `**bold text**` and link syntax `[anchor](url)`, converting them cleanly into HTML tags `<b>bold text</b>` and `<a href="url">anchor</a>` without using external parsing libraries.

---

### Problem APP19: Phone Number Standardizer & Country Code Parser
* **Context**: Normalizing lead generation contact records.
* **Statement**: Given diverse phone number inputs (e.g., `"+91 (800) 555-0199"`, `"08005550199"`, `"918005550199"`), strip all non-digit characters (preserving leading `+`), identify the ISO country dial code, and output a standardized E.164 formatted string: `"+918005550199"`.

---

### Problem APP20: Ad Campaign Budget Pacing Smoother
* **Context**: Preventing total budget burn in the first hour of a daily campaign.
* **Statement**: Given daily budget $B$, remaining hours in day $H$, and historical hourly traffic weights $W = [w_1, w_2, \dots, w_H]$, allocate spending limits for each remaining hour proportional to weights, ensuring that $\sum \text{allocated} = B$ with no fractional rounding cents lost.
