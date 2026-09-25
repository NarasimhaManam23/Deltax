# DeltaX Round 1 Question Bank: Cybersecurity (50 MCQs)

---

### Q1
What is the fundamental difference between Symmetric and Asymmetric encryption?
- A) Symmetric encryption uses two keys; Asymmetric uses one key
- B) Symmetric encryption uses a single shared key for both encryption and decryption; Asymmetric uses a mathematically linked public-private key pair
- C) Symmetric encryption is irreversible; Asymmetric is reversible
- D) Symmetric encryption can only encrypt text; Asymmetric can encrypt files
**Correct Answer**: B
**Explanation**: Symmetric algorithms (e.g., AES) use the same secret key for both operations. Asymmetric algorithms (e.g., RSA) use a public key for encryption and a private key for decryption.
**Topic**: Cryptography
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q2
Which of the following algorithms is an example of an Asymmetric encryption standard?
- A) AES (Advanced Encryption Standard)
- B) DES (Data Encryption Standard)
- C) RSA (Rivest-Shamir-Adleman)
- D) Blowfish
**Correct Answer**: C
**Explanation**: RSA is an asymmetric public-key cryptosystem based on the factoring of large prime numbers. AES, DES, and Blowfish are symmetric ciphers.
**Topic**: Cryptography
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q3
What is the primary vulnerability in an application where user input is directly concatenated into an SQL query string?
- A) Cross-Site Scripting (XSS)
- B) SQL Injection (SQLi)
- C) Cross-Site Request Forgery (CSRF)
- D) Buffer Overflow
**Correct Answer**: B
**Explanation**: String concatenation allows an attacker to manipulate query logic (e.g., passing `' OR '1'='1`), bypassing authentication and exposing database contents.
**Topic**: Web Security
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q4
How do Prepared Statements (Parameterized Queries) neutralize SQL Injection vulnerabilities?
- A) By encrypting the entire database table
- B) By compiling the SQL query template first and treating user input strictly as literal data parameters, never executable syntax
- C) By converting all SQL queries into NoSQL queries
- D) By escaping special characters on the client side only
**Correct Answer**: B
**Explanation**: In prepared statements, the database engine compiles the execution tree beforehand. User inputs are bound strictly as parameters, preventing inputs from altering the query structure.
**Topic**: Web Security
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q5
What is the role of adding a cryptographic "Salt" to passwords prior to hashing?
- A) To make the resulting hash reversible for administrative password recovery
- B) To ensure that identical passwords generate completely different hash outputs, defeating precomputed Rainbow Table attacks
- C) To compress the password length
- D) To encrypt the password using the user's private key
**Correct Answer**: B
**Explanation**: A salt is a unique random string added to the password. Even if two users choose the same password, their salted hashes differ completely, rendering precomputed rainbow tables useless.
**Topic**: Password Security
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q6
Which of the following is an irreversible cryptographic one-way hashing function rather than an encryption cipher?
- A) AES-256
- B) RSA-2048
- C) SHA-256
- D) Triple DES
**Correct Answer**: C
**Explanation**: SHA-256 (Secure Hash Algorithm) produces a deterministic 256-bit fixed-length digest from arbitrary input. It is one-way and cannot be decrypted back into plaintext.
**Topic**: Cryptography
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q7
What type of attack involves an attacker injecting malicious JavaScript into a web page that is later rendered and executed in the browser of another user?
- A) Cross-Site Request Forgery (CSRF)
- B) Cross-Site Scripting (XSS)
- C) Clickjacking
- D) Server-Side Request Forgery (SSRF)
**Correct Answer**: B
**Explanation**: XSS occurs when unvalidated or unescaped user input is included in web pages, executing malicious scripts within the victim's session context.
**Topic**: Web Security
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q8
Which cookie attribute instructs the browser to restrict client-side scripts (like JavaScript's `document.cookie`) from accessing the cookie?
- A) `Secure`
- B) `HttpOnly`
- C) `SameSite`
- D) `Domain`
**Correct Answer**: B
**Explanation**: The `HttpOnly` flag protects session cookies by blocking access via client-side JavaScript, mitigating session token theft during XSS attacks.
**Topic**: Web Security
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q9
What does the `SameSite=Strict` attribute on a cookie ensure?
- A) The cookie can only be sent over HTTPS
- B) The cookie is never sent in cross-site requests (e.g., following external links), providing robust protection against CSRF
- C) The cookie cannot be deleted by the user
- D) The cookie is encrypted using AES
**Correct Answer**: B
**Explanation**: `SameSite=Strict` ensures the cookie is withheld on all cross-site requests, completely preventing CSRF exploits that rely on ambient cookie transmission from third-party sites.
**Topic**: Web Security
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q10
What are the three dot-separated components of a JSON Web Token (JWT)?
- A) Payload.Key.Hash
- B) Header.Payload.Signature
- C) Token.User.Certificate
- D) Algorithm.Claims.Secret
**Correct Answer**: B
**Explanation**: A standard JWT consists of three Base64URL-encoded parts separated by periods: `Header.Payload.Signature`.
**Topic**: Authentication & JWT
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q11
In a JSON Web Token (JWT), what ensures that the token has not been altered by an attacker?
- A) The Payload is encrypted with AES
- B) The Signature is computed over the Header and Payload using a secret key or private key known only to the issuer
- C) The Header contains an unalterable timestamp
- D) JWTs are stored in read-only cookies
**Correct Answer**: B
**Explanation**: Any modification to claims in the payload will invalidate the cryptographic signature unless the attacker possesses the issuer's private key or secret.
**Topic**: Authentication & JWT
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q12
What is the difference between Authentication and Authorization?
- A) Authentication determines user permissions; Authorization verifies identity
- B) Authentication verifies *who you are*; Authorization determines *what you are permitted to do*
- C) Authentication occurs after Authorization
- D) Authentication uses symmetric keys; Authorization uses asymmetric keys
**Correct Answer**: B
**Explanation**: Authentication (AuthN) proves user identity (e.g., username/password, biometric). Authorization (AuthZ) checks access rights to specific resources or operations.
**Topic**: Security Principles
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q13
Which HTTP status codes correspond to Authentication failure and Authorization failure respectively?
- A) 400 and 404
- B) 401 Unauthorized and 403 Forbidden
- C) 403 Forbidden and 401 Unauthorized
- D) 500 and 502
**Correct Answer**: B
**Explanation**: `401 Unauthorized` means missing or invalid authentication credentials. `403 Forbidden` means credentials are authenticated, but the user lacks permissions for that resource.
**Topic**: Web Security
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q14
What is the primary purpose of a Digital Certificate in the TLS handshake?
- A) To compress web assets
- B) To authenticate the server's identity and bind its public key to its domain name, validated by a trusted Certificate Authority (CA)
- C) To store user session tokens
- D) To bypass firewall inspection
**Correct Answer**: B
**Explanation**: A digital certificate contains the server's public key and domain information, cryptographically signed by a reputable Certificate Authority to prevent Man-in-the-Middle spoofing.
**Topic**: Cryptography & TLS
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q15
What type of attack involves an attacker sending fraudulent emails masquerading as a legitimate entity to trick users into revealing sensitive credentials?
- A) Distributed Denial of Service (DDoS)
- B) Phishing
- C) Man-in-the-Middle (MitM)
- D) ARP Poisoning
**Correct Answer**: B
**Explanation**: Phishing uses social engineering techniques, often mimicking reputable brand communications, to deceive victims into handing over passwords or confidential data.
**Topic**: Threat Vectors
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q16
What happens in a Cross-Site Request Forgery (CSRF) attack?
- A) The attacker injects malicious JavaScript into the target server's database
- B) The attacker tricks an authenticated victim's browser into submitting an unwanted request to a vulnerable web application where the user is currently logged in
- C) The attacker cracks the server's TLS private key
- D) The attacker performs port scanning on the victim's router
**Correct Answer**: B
**Explanation**: CSRF exploits the browser's automatic inclusion of credentials (such as cookies) in cross-site requests to perform unauthorized actions on behalf of the victim.
**Topic**: Web Security
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q17
Which of the following defenses is the standard and most effective mechanism to prevent CSRF attacks in stateful web applications?
- A) Storing passwords in plain text
- B) Implementing Anti-CSRF Synchronizer Tokens (unique, unpredictable, cryptographically random tokens validated on state-changing requests)
- C) Increasing the length of session IDs
- D) Disabling HTTPS
**Correct Answer**: B
**Explanation**: Anti-CSRF tokens must be submitted with forms/headers. Third-party sites cannot read or forge these tokens due to the Same-Origin Policy, neutralizing forged requests.
**Topic**: Web Security
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q18
Which password hashing function is specifically designed to be slow and computationally expensive (memory-hard or CPU-intensive) to resist GPU/ASIC hardware brute-force attacks?
- A) MD5
- B) SHA-1
- C) bcrypt
- D) CRC32
**Correct Answer**: C
**Explanation**: bcrypt (along with Argon2 and PBKDF2) includes an adjustable work factor (cost) and built-in salting, making massive parallel brute-force attacks on GPUs prohibitively slow.
**Topic**: Password Security
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q19
What is a "Rainbow Table" in the context of cyber attacks?
- A) A routing table used to direct traffic through VPN proxies
- B) A precomputed lookup table of cryptographic hash values for millions of common plaintext passwords
- C) A visualization of firewall ingress rules
- D) A table of SSL cipher suites
**Correct Answer**: B
**Explanation**: Rainbow tables trade memory space for speed by precomputing hash chains, allowing attackers to rapidly reverse unsalted password hashes by simple lookup.
**Topic**: Password Security
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q20
What does the term "Principle of Least Privilege" (PoLP) dictate in system architecture?
- A) Users should be granted only the minimum access rights and permissions necessary to perform their legitimate job functions
- B) All users should share a common root account to reduce administrative overhead
- C) Data encryption keys must be kept short to optimize performance
- D) Firewalls should permit all outbound traffic by default
**Correct Answer**: A
**Explanation**: PoLP limits user and process privileges to only those strictly required, drastically minimizing damage if an account or service is compromised.
**Topic**: Access Control
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q21
What type of attack occurs when an attacker positions themselves between two communicating endpoints to secretly intercept, decrypt, or alter data in transit?
- A) Brute Force attack
- B) Man-in-the-Middle (MitM) attack
- C) Dictionary attack
- D) Smurf attack
**Correct Answer**: B
**Explanation**: In a MitM attack, the attacker eavesdrops or tampers with communication channels (often facilitated by ARP spoofing, rogue Wi-Fi, or DNS poisoning).
**Topic**: Threat Vectors
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q22
What is the purpose of the HTTP `Content-Security-Policy` (CSP) response header?
- A) To specify database connection pools
- B) To restrict the sources (domains) from which scripts, styles, images, and other resources can be loaded and executed by the browser, mitigating XSS
- C) To define user roles for authorization
- D) To control browser cache expiration
**Correct Answer**: B
**Explanation**: CSP allows site operators to restrict valid sources of executable scripts (e.g., disallowing `unsafe-inline`), preventing injected malicious scripts from running.
**Topic**: Web Security & Headers
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q23
In Role-Based Access Control (RBAC), how are permissions assigned to individual users?
- A) Directly to each user's username
- B) Permissions are assigned to specific roles (e.g., Admin, Editor, Viewer), and users are assigned to those roles
- C) Based on the user's geographic IP address
- D) Randomly by the operating system
**Correct Answer**: B
**Explanation**: RBAC simplifies security administration by grouping permissions into roles and mapping users to those roles rather than managing individual user ACLs.
**Topic**: Access Control
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q24
Which cryptographic concept guarantees that the sender of a message cannot later deny having sent it?
- A) Confidentiality
- B) Non-Repudiation
- C) High Availability
- D) Steganography
**Correct Answer**: B
**Explanation**: Non-repudiation is achieved using Digital Signatures generated with the sender's private key, proving conclusively that the message originated from that specific keyholder.
**Topic**: Cryptography
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q25
What is the key difference between Stored (Persistent) XSS and Reflected XSS?
- A) Stored XSS executes on the server; Reflected XSS executes on the client
- B) Stored XSS saves malicious script permanently in the target database or file system, while Reflected XSS reflects the script off the immediate request URL parameter
- C) Reflected XSS uses SQL syntax; Stored XSS uses Python
- D) Stored XSS is impossible to defend against
**Correct Answer**: B
**Explanation**: Stored XSS persists in backend storage (affecting anyone who views the stored data). Reflected XSS requires the victim to click a specially crafted URL containing the payload.
**Topic**: Web Security
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q26
What security mechanism does modern Multi-Factor Authentication (MFA) enforce?
- A) Requiring users to enter two different passwords
- B) Requiring two or more independent factors across: something you know (password), something you have (phone/token), and something you are (biometrics)
- C) Authenticating from two distinct browser tabs
- D) Changing passwords every 7 days
**Correct Answer**: B
**Explanation**: True MFA requires credentials from at least two distinct authentication categories (knowledge, possession, inherence).
**Topic**: Authentication
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q27
Which of the following symmetric encryption ciphers is considered the gold standard for enterprise data encryption across banks and cloud providers?
- A) DES
- B) RC4
- C) AES (Advanced Encryption Standard)
- D) MD5
**Correct Answer**: C
**Explanation**: AES (using 128, 192, or 256-bit keys) was established by NIST in 2001 and remains secure against cryptographic attacks. DES and RC4 are obsolete.
**Topic**: Cryptography
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q28
What is the vulnerability in an application where sensitive operations rely entirely on client-side JavaScript validation without backend checks?
- A) Broken Object Level Authorization
- B) Client-Side Bypass / Insufficient Server-Side Validation
- C) Buffer Overflow
- D) Denial of Service
**Correct Answer**: B
**Explanation**: Attackers can easily bypass browser-side scripts using tools like Postman, curl, or browser developer tools. All inputs and permissions must be re-validated on the server.
**Topic**: Web Security
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q29
What does the HTTP header `Strict-Transport-Security` (HSTS) enforce?
- A) Browser must transmit all cookies in cleartext
- B) Browser must only interact with the domain using secure HTTPS connections, automatically converting all `http://` links to `https://`
- C) Server must disable CORS headers
- D) Web application must log all SQL queries
**Correct Answer**: B
**Explanation**: HSTS protects against SSL-stripping attacks by forcing browsers to communicate strictly over encrypted HTTPS channels for a specified duration.
**Topic**: Web Security & Headers
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q30
What is a Zero-Day vulnerability?
- A) A flaw that takes zero days to patch
- B) A software security vulnerability that is known to attackers or researchers but has no available patch or fix from the vendor
- C) An attack that occurs on the first day of every month
- D) A bug caused by date formatting errors
**Correct Answer**: B
**Explanation**: A Zero-Day vulnerability refers to a security defect that is disclosed before developers have had zero days to issue a protective patch.
**Topic**: Cybersecurity Terminology
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q31
What is the difference between Hashing and Encryption?
- A) Hashing is reversible with a key; Encryption is irreversible
- B) Hashing is an irreversible one-way transformation producing a fixed-size digest; Encryption is a reversible two-way transformation using a key
- C) Hashing requires two keys; Encryption requires none
- D) They are identical concepts
**Correct Answer**: B
**Explanation**: Hashing converts data into an irreversible fingerprint (digest). Encryption scrambles data into ciphertext that can be decrypted back to plaintext with the appropriate key.
**Topic**: Cryptography
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q32
What type of attack involves overwhelming a network, service, or server with an excessive flood of traffic from multiple distributed compromised systems (botnets)?
- A) SQLi
- B) DDoS (Distributed Denial of Service)
- C) Phishing
- D) Path Traversal
**Correct Answer**: B
**Explanation**: DDoS uses coordinated botnets to flood target resources (bandwidth, CPU, memory), making legitimate services unavailable to users.
**Topic**: Threat Vectors
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q33
In public-key cryptography, if Alice wants to send Bob a confidential message that only Bob can read, which key does Alice use to encrypt the message?
- A) Alice's Private Key
- B) Alice's Public Key
- C) Bob's Public Key
- D) Bob's Private Key
**Correct Answer**: C
**Explanation**: Alice encrypts the message using Bob's publicly available key. Only Bob's corresponding Private Key (which only Bob possesses) can decrypt the ciphertext.
**Topic**: Cryptography
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q34
If Alice wants to send Bob a document with a Digital Signature proving it was genuinely created by Alice and hasn't been altered, which key does Alice use to sign the document hash?
- A) Alice's Private Key
- B) Alice's Public Key
- C) Bob's Public Key
- D) Bob's Private Key
**Correct Answer**: A
**Explanation**: Alice signs using her own Private Key. Bob (and anyone else) can then verify the signature using Alice's Public Key.
**Topic**: Cryptography & Signatures
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q35
What is the security risk of storing sensitive information (such as passwords, credit card numbers, or API keys) inside a standard JWT payload?
- A) The JWT will fail to compile
- B) JWT payloads are only Base64URL encoded, NOT encrypted, meaning anyone who inspects the token can easily decode and read the plain text
- C) The JWT signature will become too large for HTTP headers
- D) It violates JSON RFC schema rules
**Correct Answer**: B
**Explanation**: Base64 encoding is not encryption; it is simply a data representation. Any user or proxy intercepting the token can decode the claims immediately.
**Topic**: Authentication & JWT
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q36
Which of the following constitutes a Cross-Site Scripting (XSS) prevention best practice?
- A) Storing user passwords in plaintext
- B) Context-aware output encoding (escaping HTML, JavaScript, CSS characters) before rendering user-controlled data in the DOM
- C) Allowing all origins in CORS headers
- D) Relying entirely on GET requests
**Correct Answer**: B
**Explanation**: Output encoding converts characters like `<`, `>`, `&`, `"`, and `'` into their harmless HTML entity equivalents (e.g., `&lt;`), preventing browsers from interpreting them as tags.
**Topic**: Web Security
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q37
What attack occurs when an attacker manipulates file paths (e.g., supplying `../../etc/passwd`) to access files outside the intended web root directory?
- A) Directory / Path Traversal
- B) Cross-Site Scripting
- C) SQL Injection
- D) Denial of Service
**Correct Answer**: A
**Explanation**: Path traversal (dot-dot-slash attack) exploits insufficient path sanitization to access restricted directories and sensitive operating system files.
**Topic**: Web Security
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q38
What is the purpose of the CORS (Cross-Origin Resource Sharing) protocol?
- A) To encrypt cross-origin HTTP cookies
- B) To allow servers to specify who (which foreign origins) can access their resources via browser-based XMLHttpRequest or Fetch requests
- C) To disable the Same-Origin Policy entirely across the web
- D) To prevent DNS rebinding
**Correct Answer**: B
**Explanation**: By default, browsers enforce the Same-Origin Policy. CORS uses headers (like `Access-Control-Allow-Origin`) to selectively relax this policy for trusted origins.
**Topic**: Web Security & CORS
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q39
What is an HTTP Preflight Request in CORS?
- A) A `POST` request sent to authenticate the client
- B) An `OPTIONS` request sent automatically by the browser to verify permissions before issuing a complex cross-origin request
- C) A DNS lookup performed before establishing TCP
- D) An SSL handshake negotiation
**Correct Answer**: B
**Explanation**: For cross-origin requests with custom headers or non-standard methods (PUT, DELETE), browsers automatically dispatch an `OPTIONS` preflight request to check server consent.
**Topic**: Web Security & CORS
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q40
What is a Replay Attack, and how is it typically mitigated in secure protocols?
- A) An attacker steals source code from a repository; mitigated by licensing
- B) An attacker intercepts valid network transmissions and retransmits them later; mitigated using timestamps, nonces (numbers used once), and sequence counters
- C) A database race condition; mitigated by ACID transactions
- D) A denial of service attack; mitigated by rate limiting
**Correct Answer**: B
**Explanation**: Replay attacks duplicate valid authenticated packets. Nonces and short-lived timestamps ensure that a replayed packet is rejected as stale or duplicate.
**Topic**: Threat Vectors & Mitigation
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q41
Which hashing algorithm is widely considered insecure and deprecated for password storage and digital certificates due to practical collision vulnerabilities?
- A) SHA-256
- B) SHA-3
- C) MD5
- D) Argon2
**Correct Answer**: C
**Explanation**: MD5 is cryptographically broken; collision attacks can generate two distinct files with identical MD5 checksums within seconds.
**Topic**: Cryptography
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q42
What does the "CIA Triad" stand for in information security?
- A) Central Intelligence Agency
- B) Confidentiality, Integrity, Availability
- C) Cryptography, Identification, Authentication
- D) Control, Inspection, Authorization
**Correct Answer**: B
**Explanation**: Confidentiality (preventing unauthorized reading), Integrity (preventing unauthorized modification), and Availability (ensuring accessible service) form the foundational triad.
**Topic**: Security Principles
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q43
What type of malware encrypts a victim's files and demands payment in exchange for the decryption key?
- A) Spyware
- B) Ransomware
- C) Rootkit
- D) Adware
**Correct Answer**: B
**Explanation**: Ransomware holds user data hostage through strong cryptographic locking until a ransom (often in cryptocurrency) is paid.
**Topic**: Malware
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q44
In OAuth 2.0 terminology, what is the role of the "Authorization Server"?
- A) Hosting the protected user data (e.g., photo albums)
- B) Authenticating the resource owner and issuing access tokens to the client application after obtaining user consent
- C) Rendering the client application UI
- D) Managing the DNS routing infrastructure
**Correct Answer**: B
**Explanation**: The Authorization Server evaluates client requests, authenticates the resource owner, and issues cryptographically verifiable Access Tokens (and Refresh Tokens).
**Topic**: Authentication & OAuth
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q45
What is the purpose of the `Secure` flag on an HTTP cookie?
- A) It prevents the cookie from expiring
- B) It instructs the browser to transmit the cookie exclusively over encrypted HTTPS connections
- C) It hashes the cookie value using bcrypt
- D) It blocks other browser tabs from reading the cookie
**Correct Answer**: B
**Explanation**: The `Secure` flag ensures the cookie is never transmitted over unencrypted HTTP channels, protecting session tokens from sniffing on unencrypted Wi-Fi networks.
**Topic**: Web Security
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q46
What is a "Timing Attack" in cryptographic implementations?
- A) Attacking a server during peak usage hours
- B) An attack where the adversary analyzes the exact elapsed time required to execute cryptographic operations (like string comparisons) to deduce secret keys or passwords
- C) Altering the system clock of the server
- D) Slowing down network packets to induce timeouts
**Correct Answer**: B
**Explanation**: Standard string comparisons (`str1 == str2`) return immediately upon the first mismatched character. Attackers measure microsecond differences to determine correct characters one by one. Mitigated via constant-time comparison algorithms.
**Topic**: Cryptography
**Difficulty**: Hard
**Source Classification**: GENERAL CS TOPIC

---

### Q47
What is the function of a Web Application Firewall (WAF)?
- A) Routing network packets at Layer 3
- B) Inspecting and filtering application-layer (Layer 7) HTTP traffic to block known attacks like SQLi, XSS, and malicious request patterns
- C) Generating SSL certificates automatically
- D) Replacing the backend database engine
**Correct Answer**: B
**Explanation**: A WAF sits in front of web applications, analyzing HTTP/HTTPS requests against security rule sets to block malicious payloads before they hit application code.
**Topic**: Web Security
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q48
Which access control model restricts access to resources based on security clearances assigned to subjects and classification labels attached to objects (e.g., Top Secret, Secret, Confidential)?
- A) Discretionary Access Control (DAC)
- B) Mandatory Access Control (MAC)
- C) Role-Based Access Control (RBAC)
- D) Attribute-Based Access Control (ABAC)
**Correct Answer**: B
**Explanation**: Mandatory Access Control (MAC) is an OS/military security model where central authorities assign security clearances and users cannot alter object permissions at their own discretion.
**Topic**: Access Control
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q49
What is "Credential Stuffing"?
- A) Exploiting SQL syntax errors in forms
- B) An automated attack where lists of compromised username/password pairs stolen from one breach are tested against numerous other websites
- C) Generating fake SSL certificates
- D) Jamming wireless communication channels
**Correct Answer**: B
**Explanation**: Credential stuffing relies on password reuse across multiple services: attackers use automated tools to try breached credential dumps against other sites.
**Topic**: Threat Vectors
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q50
What security benefit does Diffie-Hellman Key Exchange (specifically Ephemeral Diffie-Hellman - DHE/ECDHE) provide in modern TLS configurations?
- A) Automatic data compression
- B) Forward Secrecy (Perfect Forward Secrecy - PFS), ensuring that compromise of the server's long-term private key in the future cannot decrypt past recorded sessions
- C) Faster DNS resolution
- D) Eliminating the need for public keys
**Correct Answer**: B
**Explanation**: Ephemeral Diffie-Hellman generates temporary, disposable session keys for every connection. Even if the server's master private key is stolen years later, previously recorded traffic cannot be decrypted.
**Topic**: Cryptography & TLS
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN
