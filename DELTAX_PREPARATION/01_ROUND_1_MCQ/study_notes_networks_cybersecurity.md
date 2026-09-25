# DeltaX High-Priority Study Notes: Computer Networks & Cybersecurity

---

# MODULE 1: Transmission Control Protocol (TCP) & Connection Handshakes

### Concept
TCP is a connection-oriented, reliable, byte-stream Transport Layer protocol providing ordered delivery, error detection, flow control (sliding window), and congestion control.

### Interview Definition
"TCP guarantees reliable, ordered packet delivery over an unreliable network using sequence numbers, cumulative acknowledgments, and a full-duplex 3-way handshake (`SYN` $\rightarrow$ `SYN-ACK` $\rightarrow$ `ACK`) for connection establishment and a 4-way handshake for termination."

### Deep Explanation
1. **The 3-Way Handshake**:
   - **Step 1 (Client $\rightarrow$ Server)**: Client chooses an Initial Sequence Number ($ISN_c = X$) and sends a segment with `SYN = 1`, `Seq = X`. (State: Client enters `SYN-SENT`).
   - **Step 2 (Server $\rightarrow$ Client)**: Server acknowledges client's SYN, selects its own $ISN_s = Y$, and sends `SYN = 1, ACK = 1`, `Seq = Y`, `Ack = X + 1`. (State: Server enters `SYN-RECEIVED`).
   - **Step 3 (Client $\rightarrow$ Server)**: Client acknowledges server's SYN by sending `ACK = 1`, `Seq = X + 1`, `Ack = Y + 1`. Client may also bundle initial payload data here. (State: Both enter `ESTABLISHED`).
2. **TCP Header Breakdown (Minimum 20 bytes, maximum 60 bytes)**:
   - Source Port (16 bits), Destination Port (16 bits).
   - Sequence Number (32 bits), Acknowledgment Number (32 bits).
   - Data Offset / Header Length (4 bits, in 32-bit 4-byte words).
   - Control Flags (9 bits / 6 standard): `URG`, `ACK`, `PSH`, `RST`, `SYN`, `FIN`.
   - Window Size (16 bits): Used for receiver-advertised flow control.
   - Checksum (16 bits), Urgent Pointer (16 bits), Options (0–40 bytes).
3. **Connection Termination (4-Way Handshake)**:
   - Client sends `FIN` $\rightarrow$ Server sends `ACK` (Client enters `FIN-WAIT-2`, Server is `CLOSE-WAIT`).
   - Server sends `FIN` $\rightarrow$ Client sends `ACK` (Client enters `TIME-WAIT` for $2 \times MSL$ [Maximum Segment Lifetime, typically 60–120s] before closing to ensure final ACK was received and prevent old packets from contaminating new connections).

### Example & Flow
```
Client                                Server
  |                SYN (Seq=100)        |
  | ----------------------------------> | (Listens on port 80/443)
  |                                     |
  |        SYN-ACK (Seq=300, Ack=101)   |
  | <---------------------------------- |
  |                                     |
  |            ACK (Seq=101, Ack=301)   |
  | ----------------------------------> |
[ESTABLISHED]                         [ESTABLISHED]
```

### Trap
1. Sequence number consumption: `SYN` and `FIN` consume exactly 1 sequence number each, even if they carry 0 bytes of user data! An `ACK` carrying no data consumes 0 sequence numbers.
2. `RST` flag: Resets a connection immediately without standard termination handshakes when an unexpected packet arrives or a port is closed.

### Complexity
TCP Handshake latency: 1 RTT (Round Trip Time) before any application data can flow in standard TCP.

### Practice Questions (5 Qs)
1. If Client sends `SYN` with `Seq = 5000`, what are the `Seq` and `Ack` numbers sent by Server in `SYN-ACK` if Server's $ISN$ is `8000`?
2. What is the minimum and maximum size of a TCP header in bytes?
3. Why does the client wait in `TIME_WAIT` state for $2 \times MSL$ before closing a TCP connection?
4. Which TCP flag is used to immediately abort a connection due to an error or an attempt to connect to an unopened port?
5. During data transfer, if Client sends 500 bytes of data starting at `Seq = 1001`, what `Ack` number does Server return upon successful receipt?

### Answers & Explanations
1. **Answer**: `Seq = 8000, Ack = 5001`.
   *Explanation*: Server sets its own sequence number to $ISN_s = 8000$. Since the client's `SYN` consumes 1 sequence number, Server acknowledges `5000 + 1 = 5001`.
2. **Answer**: Minimum: 20 bytes; Maximum: 60 bytes.
   *Explanation*: Base header is 20 bytes (without options). The Data Offset field is 4 bits (maximum value $15$). $15 \times 4$ bytes = 60 bytes maximum (allowing up to 40 bytes of options).
3. **Answer**: To ensure the server receives the client's final `ACK` (if lost, server retransmits `FIN`, which client can re-ACK), and to allow all lingering duplicates of the connection's packets in the network to die out.
4. **Answer**: `RST` (Reset).
5. **Answer**: `1501`.
   *Explanation*: The 500 bytes occupy sequence numbers `1001` through `1500`. The acknowledgment number in TCP indicates the *next expected sequence number*, which is $1500 + 1 = 1501$.

---

# MODULE 2: HTTP, HTTPS, TLS & REST Status Codes

### Concept
HTTP (Hypertext Transfer Protocol) is an Application Layer stateless request-response protocol. HTTPS encrypts HTTP traffic via TLS (Transport Layer Security) over port 443.

### Interview Definition
"HTTP transfers resources across the web using standard verbs (`GET`, `POST`, `PUT`, `DELETE`). HTTPS wraps HTTP inside a TLS session using asymmetric cryptography for authentication and symmetric cryptography for fast payload encryption."

### Deep Explanation
1. **HTTP Status Code Taxonomy**:
   * **1xx (Informational)**: `100 Continue`, `101 Switching Protocols` (WebSockets).
   * **2xx (Success)**: `200 OK`, `201 Created` (POST succeeded, resource created), `204 No Content` (success, empty body e.g., DELETE).
   * **3xx (Redirection)**: `301 Moved Permanently` (browser caches new URL), `302 Found` (temporary redirect), `304 Not Modified` (browser conditional caching).
   * **4xx (Client Errors)**:
     - `400 Bad Request`: Malformed JSON or invalid schema.
     - `401 Unauthorized`: Lacks valid authentication credentials (e.g., missing JWT).
     - `403 Forbidden`: Authenticated, but server refuses authorization (insufficient permissions).
     - `404 Not Found`: Resource does not exist.
     - `405 Method Not Allowed`: E.g., sending `POST` to a read-only `GET` endpoint.
     - `429 Too Many Requests`: Rate limiting triggered.
   * **5xx (Server Errors)**:
     - `500 Internal Server Error`: Unhandled server exception.
     - `502 Bad Gateway`: Reverse proxy (Nginx) received an invalid response from upstream server (e.g., FastAPI/Node down).
     - `503 Service Unavailable`: Server overloaded or undergoing maintenance.
     - `504 Gateway Timeout`: Upstream service failed to respond in time to proxy.
2. **HTTP Methods & Idempotency**:
   * An operation is **idempotent** if making multiple identical requests has the same outcome on server state as making a single request.
   * `GET`: Safe & Idempotent.
   * `PUT`: Idempotent (replaces entire resource).
   * `DELETE`: Idempotent (deleting once or ten times leaves resource absent).
   * `POST`: NOT idempotent (calling multiple times creates multiple duplicate resources).
   * `PATCH`: Usually NOT idempotent (e.g., "increment balance by $10").
3. **HTTPS & TLS Handshake**:
   * Client sends `ClientHello` (supported TLS versions, cipher suites, client random).
   * Server sends `ServerHello` (selected cipher, server random) + Digital Certificate (containing Server's Public Key signed by a CA).
   * Client verifies CA signature on certificate.
   * Key Exchange: Using Diffie-Hellman (ECDHE) or RSA pre-master secret, both sides derive a **shared symmetric session key**.
   * Symmetric encryption (AES-GCM) encrypts all subsequent application traffic.

### Trap
1. Difference between `401` and `403`: `401` means "Who are you? (Authenticate)"; `403` means "I know who you are, but you cannot access this (Authorize)."
2. `PUT` vs `PATCH`: `PUT` replaces the complete resource representation (missing fields are set to null/default); `PATCH` applies partial modifications to specific fields.

### Practice Questions (5 Qs)
1. Which HTTP methods are guaranteed to be idempotent by the HTTP/1.1 specification?
2. If an API request lacks an Authorization header, which HTTP status code should the server return?
3. During an HTTPS connection, is application data encrypted using symmetric or asymmetric encryption, and why?
4. What is the difference between HTTP redirect codes 301 and 302?
5. What HTTP error code is returned when an Nginx reverse proxy fails to get a response from a crashed backend application server?

### Answers & Explanations
1. **Answer**: `GET`, `HEAD`, `PUT`, `DELETE`, `OPTIONS`, `TRACE`. (`POST` and `PATCH` are not guaranteed to be idempotent).
2. **Answer**: `401 Unauthorized`.
3. **Answer**: Symmetric encryption (such as AES-GCM).
   *Explanation*: Asymmetric cryptography (RSA/ECC) is computationally expensive and slow for large data streams. It is used only during the TLS handshake to authenticate the server and securely negotiate a shared session key. High-speed symmetric encryption encrypts the actual payload.
4. **Answer**: `301` is Permanent Redirect (browsers and search engines cache the redirect and route subsequent requests directly to the new URL); `302` is Temporary Redirect (clients always check the original URL first).
5. **Answer**: `502 Bad Gateway`.

---

# MODULE 3: Cryptography, Hashing & Web Security

### Concept
Security protects data confidentiality (encryption), integrity (cryptographic hashing), and authenticity (digital signatures and tokens).

### Interview Definition
"Encryption is a reversible process transforming plaintext to ciphertext using a key (symmetric uses 1 shared key; asymmetric uses a public-private keypair). Hashing is a one-way mathematical function transforming arbitrary data into a fixed-size digest that cannot be reversed."

### Deep Explanation
1. **Symmetric vs Asymmetric Encryption**:
   * *Symmetric (AES, DES, 3DES, ChaCha20)*: Single key for both encryption and decryption. Extremely fast, ideal for encrypting databases, files, and active network connections. Key distribution is the primary challenge.
   * *Asymmetric (RSA, ECC, Diffie-Hellman)*: Two mathematically linked keys: Public Key (encrypts data or verifies signatures) and Private Key (decrypts data or creates signatures). Much slower; used for key exchange and identity authentication.
2. **Hashing & Salting**:
   * Properties: Deterministic, fast to compute, pre-image resistant (irreversible), collision resistant ($H(x) \neq H(y)$ for $x \neq y$).
   * Password hashing: MD5 and SHA-1 are cryptographically broken. SHA-256 is too fast (vulnerable to GPU brute force). Production standard: **bcrypt**, **Argon2**, or **PBKDF2** with high work factors.
   * **Salt**: Random bytes appended to a password before hashing. Defeats **Rainbow Table attacks** and ensures two users with identical passwords have completely different stored hashes.
3. **Web Vulnerabilities**:
   * **SQL Injection (SQLi)**: Attacker injects malicious SQL input that alters query execution. *Remediation*: Parameterized queries (Prepared Statements), ORMs with parameter binding, input validation.
   * **Cross-Site Scripting (XSS)**: Attacker executes malicious JavaScript in a victim's browser session.
     - *Stored XSS*: Injected script stored in database (e.g., comments) and served to all users.
     - *Reflected XSS*: Injected script reflected immediately off a URL query parameter.
     - *Remediation*: Contextual HTML output encoding, `Content-Security-Policy` (CSP) headers, `HttpOnly` cookies (prevents `document.cookie` theft).
   * **Cross-Site Request Forgery (CSRF)**: Attacker tricks an authenticated user's browser into sending unauthorized commands to a web application.
     - *Remediation*: Anti-CSRF Synchronizer Tokens, `SameSite=Strict` or `SameSite=Lax` cookie attributes.
4. **JWT (JSON Web Token)**:
   * Structure: `Header.Payload.Signature` (Base64URL encoded).
   * Header: Algorithm (`HS256`, `RS256`) and token type (`JWT`).
   * Payload: Claims (e.g., `sub`, `userId`, `exp`, `roles`).
   * Signature: `HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)`.
   * *Trap*: Payload is only encoded, NOT encrypted! Never store passwords, API secrets, or credit card numbers in a JWT payload.

### Practice Questions (5 Qs)
1. Why is adding a cryptographic salt effective against rainbow table attacks on password databases?
2. How do Prepared Statements prevent SQL Injection attacks?
3. What is the fundamental difference between XSS and CSRF?
4. In a JSON Web Token, which section prevents a malicious user from tampering with their user role or user ID?
5. What does setting the `HttpOnly` flag on a session cookie accomplish?

### Answers & Explanations
1. **Answer**: Rainbow tables are precomputed lookup tables of hashes for millions of common passwords. Adding a unique random salt to each password means precomputed tables become completely useless, as the attacker would have to generate a custom rainbow table for every individual user's salt.
2. **Answer**: Prepared statements separate SQL query code from user-supplied data parameters. The SQL engine compiles the query structure first. User input is treated strictly as literal data values and is never interpreted as executable SQL syntax, completely neutralizing injection.
3. **Answer**: XSS exploits the user's trust in a website by executing malicious scripts in the user's browser on that domain. CSRF exploits a website's trust in the user's browser by tricking the browser into sending authenticated requests (via cookies) to the target site without the user's knowledge.
4. **Answer**: The Signature. If a user modifies their role in the Base64-decoded Payload, the server recalculates the signature using its private secret key upon receipt. Because the user does not possess the secret key, their modified payload produces a mismatched signature, and the server rejects the token.
5. **Answer**: It prevents client-side JavaScript (`document.cookie`) from reading or accessing the cookie, thereby protecting session identifiers from being stolen during Cross-Site Scripting (XSS) attacks.
