# DeltaX Round 1 Question Bank: Computer Networks (50 MCQs)

---

### Q1
Which layer of the OSI model is responsible for end-to-end process-to-process communication, error detection, flow control, and port addressing?
- A) Network Layer
- B) Transport Layer
- C) Data Link Layer
- D) Session Layer
**Correct Answer**: B
**Explanation**: The Transport Layer (Layer 4) provides process-to-process delivery using port numbers, end-to-end flow control, and error recovery. The Network layer only delivers packets host-to-host.
**Topic**: OSI Model
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q2
During the standard TCP 3-way handshake, what is the exact sequence of flag combinations exchanged between the client and server?
- A) SYN $\rightarrow$ ACK $\rightarrow$ SYN-ACK
- B) SYN $\rightarrow$ SYN-ACK $\rightarrow$ ACK
- C) ACK $\rightarrow$ SYN $\rightarrow$ ACK
- D) SYN $\rightarrow$ PSH $\rightarrow$ ACK
**Correct Answer**: B
**Explanation**: Client sends `SYN`, Server replies with `SYN-ACK`, and Client completes connection with `ACK`.
**Topic**: TCP Protocol
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q3
If a client initiates a TCP connection with an Initial Sequence Number of 5000, what will be the acknowledgment number sent by the server in its SYN-ACK packet?
- A) 5000
- B) 5001
- C) 5002
- D) 0
**Correct Answer**: B
**Explanation**: A `SYN` segment consumes exactly 1 sequence number. Therefore, the server acknowledges by sending $5000 + 1 = 5001$.
**Topic**: TCP Protocol
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q4
Which HTTP status code is returned by a web server when a client requests a resource without providing required authentication credentials?
- A) 400 Bad Request
- B) 401 Unauthorized
- C) 403 Forbidden
- D) 404 Not Found
**Correct Answer**: B
**Explanation**: `401 Unauthorized` specifically indicates that the request lacks valid authentication credentials. `403 Forbidden` indicates the client identity is known but access is refused.
**Topic**: HTTP Protocol
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q5
What is the default well-known port used by HTTPS for secure web traffic?
- A) 80
- B) 8080
- C) 443
- D) 22
**Correct Answer**: C
**Explanation**: Port 443 is assigned by IANA for HTTPS (HTTP over TLS). Port 80 is unencrypted HTTP, 8080 is an alternative HTTP proxy port, and 22 is SSH.
**Topic**: Ports & Protocols
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q6
What is the minimum header size of a standard TCP segment without options?
- A) 16 bytes
- B) 20 bytes
- C) 32 bytes
- D) 64 bytes
**Correct Answer**: B
**Explanation**: A TCP header has a base length of 20 bytes (5 rows of 32-bit words). With options, it can expand up to 60 bytes.
**Topic**: TCP Protocol
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q7
What is the fixed header size of a User Datagram Protocol (UDP) segment?
- A) 8 bytes
- B) 12 bytes
- C) 16 bytes
- D) 20 bytes
**Correct Answer**: A
**Explanation**: UDP headers are simple and contain exactly 4 fields of 2 bytes each: Source Port (2B), Destination Port (2B), Length (2B), and Checksum (2B) = 8 bytes.
**Topic**: UDP Protocol
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q8
Which protocol maps an IP address to a physical MAC address on a local area network?
- A) DHCP
- B) DNS
- C) ARP
- D) ICMP
**Correct Answer**: C
**Explanation**: Address Resolution Protocol (ARP) broadcasts a query on the local subnet to resolve a known 32-bit IPv4 address into its corresponding 48-bit physical MAC address.
**Topic**: Network Protocols
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q9
What is the 4-step message exchange sequence performed by DHCP to dynamically allocate an IP address to a client?
- A) Request, Offer, Discover, Acknowledge
- B) Discover, Offer, Request, Acknowledge
- C) Discover, Request, Offer, Confirm
- D) Solicit, Advertise, Request, Reply
**Correct Answer**: B
**Explanation**: The DORA process: DHCP Discover (broadcast), DHCP Offer (unicast/broadcast), DHCP Request (broadcast), DHCP Acknowledge (unicast/broadcast).
**Topic**: DHCP Protocol
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q10
Which of the following HTTP request methods is NOT idempotent according to RFC 7231?
- A) GET
- B) PUT
- C) DELETE
- D) POST
**Correct Answer**: D
**Explanation**: An idempotent method produces the same server state regardless of whether it is executed 1 time or $N$ times. `POST` creates a new resource on each execution, so it is not idempotent.
**Topic**: HTTP Protocol
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q11
What is the purpose of the `TIME_WAIT` state on the active close side of a TCP connection?
- A) To wait for user input before terminating
- B) To ensure the remote peer received the final ACK and to allow lingering duplicate packets to expire in the network
- C) To calculate the round-trip time for the next connection
- D) To renegotiate the maximum window size
**Correct Answer**: B
**Explanation**: The active closing endpoint waits for $2 \times \text{MSL}$ (Maximum Segment Lifetime) to guarantee that any delayed segments from the connection dissipate, and to retransmit ACK if the remote peer's FIN was retransmitted.
**Topic**: TCP Protocol
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q12
In IPv4 classful addressing, which address class dedicates the first 3 bits to `110` and uses an 8-bit host ID?
- A) Class A
- B) Class B
- C) Class C
- D) Class D
**Correct Answer**: C
**Explanation**: Class C begins with `110`, spans 192.0.0.0 to 223.255.255.255, has a 24-bit network prefix, and provides an 8-bit host field (up to 254 usable hosts).
**Topic**: IP Addressing
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q13
Which field in the IPv4 header prevents a packet from circulating indefinitely in a routing loop?
- A) Checksum
- B) Time To Live (TTL)
- C) Identification
- D) Total Length
**Correct Answer**: B
**Explanation**: The TTL field is an 8-bit counter decremented by 1 at every router hop. When TTL reaches 0, the router drops the packet and sends an ICMP Time Exceeded message to the sender.
**Topic**: IP Protocol
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q14
What is the function of the TCP Window Size field in the TCP header?
- A) Congestion control on the sender side
- B) Flow control by advertising the receiver's available buffer space
- C) Specifying total segment length
- D) Indicating the maximum segment size (MSS)
**Correct Answer**: B
**Explanation**: The 16-bit Window field implements flow control by informing the sender how many bytes the receiver's buffer can currently accept without overflowing.
**Topic**: TCP Protocol
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q15
Which layer of the OSI model manages data encryption, compression, and character code translation (e.g., ASCII to EBCDIC)?
- A) Application Layer
- B) Presentation Layer
- C) Session Layer
- D) Transport Layer
**Correct Answer**: B
**Explanation**: Layer 6 (Presentation Layer) formats, serializes, compresses, and encrypts data for application presentation.
**Topic**: OSI Model
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q16
What happens when an HTTP response returns status code `304 Not Modified`?
- A) The requested page was moved permanently
- B) The requested resource has not changed since the timestamp provided in the client's `If-Modified-Since` header, so the client should use its cached copy
- C) The server encountered an internal database error
- D) The client submitted an unparseable body
**Correct Answer**: B
**Explanation**: `304 Not Modified` enables conditional caching: no payload body is transmitted, saving bandwidth by instructing the browser to render the local cached version.
**Topic**: HTTP Protocol
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q17
Which of the following transport protocols is connectionless and does NOT guarantee packet delivery or order?
- A) TCP
- B) SCTP
- C) UDP
- D) BGP
**Correct Answer**: C
**Explanation**: UDP sends standalone datagrams with no handshake, no acknowledgments, and no sequence ordering, yielding minimal transmission latency.
**Topic**: UDP Protocol
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q18
What DNS record type is used to map an alias domain name to its canonical (true) domain name?
- A) A Record
- B) AAAA Record
- C) CNAME Record
- D) MX Record
**Correct Answer**: C
**Explanation**: CNAME (Canonical Name) points an alias to another domain name. `A` points to IPv4, `AAAA` points to IPv6, and `MX` specifies mail exchange servers.
**Topic**: DNS Protocol
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q19
What is the maximum data payload capacity of a standard Ethernet frame (Maximum Transmission Unit - MTU)?
- A) 512 bytes
- B) 1024 bytes
- C) 1500 bytes
- D) 65535 bytes
**Correct Answer**: C
**Explanation**: Standard Ethernet MTU is 1500 bytes for the IP packet payload (excluding the 14-byte Ethernet header and 4-byte CRC footer).
**Topic**: Data Link Layer
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q20
If a subnet mask is `/26` in CIDR notation, how many usable host IP addresses are available on that subnet?
- A) 64
- B) 62
- C) 32
- D) 30
**Correct Answer**: B
**Explanation**: $/26$ leaves $32 - 26 = 6$ host bits. Total addresses $= 2^6 = 64$. Subtracting 2 for the Network ID and Broadcast address yields $64 - 2 = 62$ usable hosts.
**Topic**: IP Subnetting
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q21
Which protocol is utilized by the `ping` utility to test network connectivity between hosts?
- A) ARP
- B) ICMP
- C) IGMP
- D) SNMP
**Correct Answer**: B
**Explanation**: `ping` transmits ICMP Echo Request packets (Type 8) and listens for ICMP Echo Reply packets (Type 0).
**Topic**: ICMP Protocol
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q22
What is the primary difference between a Network Hub and a Network Switch?
- A) A hub operates at Layer 3; a switch operates at Layer 1
- B) A hub broadcasts incoming packets to all connected ports, while a switch inspects MAC addresses and forwards frames only to the designated port
- C) A hub filters by IP address, while a switch does not
- D) A switch only works with fiber optic cabling
**Correct Answer**: B
**Explanation**: Hubs are Layer 1 broadcast repeaters causing single collision domains. Switches are Layer 2 devices with MAC address tables that partition collision domains.
**Topic**: Network Devices
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q23
Which TCP congestion control state is initiated when 3 duplicate ACKs are received by the sender?
- A) Slow Start
- B) Fast Retransmit & Fast Recovery
- C) Connection Reset
- D) Exponential Backoff
**Correct Answer**: B
**Explanation**: 3 duplicate ACKs signal that a single packet was lost while subsequent packets arrived safely, triggering Fast Retransmit without waiting for the retransmission timer to expire.
**Topic**: TCP Congestion Control
**Difficulty**: Hard
**Source Classification**: GENERAL CS TOPIC

---

### Q24
In the TCP header, what does setting the `PSH` (Push) flag instruct the receiving protocol stack to do?
- A) Discard the segment immediately
- B) Push data immediately to the application without waiting for buffers to fill
- C) Reset the connection
- D) Prioritize urgent out-of-band data
**Correct Answer**: B
**Explanation**: The `PSH` flag tells the receiver's TCP implementation to deliver buffered data to the receiving application immediately.
**Topic**: TCP Protocol
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q25
Which port is commonly used for Domain Name System (DNS) queries?
- A) 21
- B) 25
- C) 53
- D) 110
**Correct Answer**: C
**Explanation**: DNS operates over port 53 (using UDP for standard queries and TCP for large responses or zone transfers).
**Topic**: Ports & Protocols
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q26
What type of HTTP header prevents browser-side clickjacking attacks by controlling whether a site can be framed inside an `<iframe>`?
- A) `Access-Control-Allow-Origin`
- B) `X-Frame-Options`
- C) `Content-Type`
- D) `Strict-Transport-Security`
**Correct Answer**: B
**Explanation**: `X-Frame-Options: DENY` or `SAMEORIGIN` prevents clickjacking by barring malicious outer pages from loading the site in an iframe.
**Topic**: Web Security & Headers
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q27
What is the function of the Network Address Translation (NAT) protocol?
- A) Converting hostnames to IP addresses
- B) Translating private, non-routable IP addresses into public IP addresses to conserve IPv4 space
- C) Converting analog signals to digital packets
- D) Authenticating VPN tunnels
**Correct Answer**: B
**Explanation**: NAT allows multiple private LAN addresses (e.g., 192.168.x.x) to share a single routable public IP on the internet via port mapping (PAT).
**Topic**: Network Protocols
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q28
What is the size of an IPv6 address?
- A) 32 bits
- B) 64 bits
- C) 128 bits
- D) 256 bits
**Correct Answer**: C
**Explanation**: IPv6 addresses are 128 bits long (16 octets), written as eight groups of four hexadecimal digits separated by colons.
**Topic**: IP Addressing
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q29
Which routing protocol uses Dijkstra's Shortest Path First algorithm and converges rapidly inside an autonomous system?
- A) RIP
- B) BGP
- C) OSPF
- D) EGP
**Correct Answer**: C
**Explanation**: Open Shortest Path First (OSPF) is a link-state interior gateway protocol that builds a network topology graph and runs Dijkstra's algorithm. RIP uses Bellman-Ford.
**Topic**: Routing Protocols
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q30
What does the `SYN Cookie` technique defend against in web servers?
- A) Cross-site scripting
- B) TCP SYN Flood Denial-of-Service attacks
- C) Man-in-the-middle attacks
- D) SQL injection
**Correct Answer**: B
**Explanation**: SYN Cookies encode state parameters into the initial sequence number of the SYN-ACK, allowing the server to avoid allocating memory buffers until the final ACK arrives, resisting SYN floods.
**Topic**: TCP Security
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q31
Which protocol is used for securely transmitting files over an encrypted SSH connection?
- A) TFTP
- B) SFTP
- C) FTP
- D) Telnet
**Correct Answer**: B
**Explanation**: SFTP (SSH File Transfer Protocol) runs over an encrypted SSH tunnel (port 22). FTP and TFTP transmit data in plain cleartext.
**Topic**: Protocols
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q32
What is the primary role of the `Host` request header in HTTP/1.1?
- A) Identifying the operating system of the client
- B) Specifying the domain name of the server, allowing multiple virtual hosts to be served from a single IP address
- C) Defining the connection timeout
- D) Specifying acceptable language encodings
**Correct Answer**: B
**Explanation**: The `Host` header allows a single web server with one public IP to route requests to distinct websites based on hostname (Virtual Hosting).
**Topic**: HTTP Protocol
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q33
What is the maximum window size in standard TCP without the Window Scale option?
- A) 32,767 bytes
- B) 65,535 bytes
- C) 1,048,576 bytes
- D) 4,294,967,295 bytes
**Correct Answer**: B
**Explanation**: The TCP Window Size field is 16 bits. $2^{16} - 1 = 65,535$ bytes. RFC 1323 introduced the Window Scale option to allow scaling up to 1 GB.
**Topic**: TCP Protocol
**Difficulty**: Hard
**Source Classification**: GENERAL CS TOPIC

---

### Q34
What error status code does a reverse proxy return when an upstream microservice fails to respond before the proxy's timeout window expires?
- A) 500 Internal Server Error
- B) 502 Bad Gateway
- C) 504 Gateway Timeout
- D) 408 Request Timeout
**Correct Answer**: C
**Explanation**: `504 Gateway Timeout` indicates that an intermediary gateway/proxy did not receive a timely response from an upstream backend server.
**Topic**: HTTP Status Codes
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q35
Which layer of the TCP/IP stack corresponds directly to the combination of the Physical and Data Link layers of the OSI model?
- A) Internet Layer
- B) Network Access / Network Interface Layer
- C) Transport Layer
- D) Application Layer
**Correct Answer**: B
**Explanation**: The TCP/IP Link (or Network Interface) layer encompasses both physical framing/signaling and data link MAC addressing.
**Topic**: OSI Model
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q36
What does the term "Socket" refer to in network programming?
- A) A physical connector on a network interface card
- B) An endpoint for communication defined by the combination of an IP address, a port number, and a transport protocol
- C) A routing entry in a gateway table
- D) A cached DNS resolution entry
**Correct Answer**: B
**Explanation**: A network socket is an abstraction for an operating system communication endpoint uniquely identified by `(IP, Port, Protocol)`.
**Topic**: Sockets
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q37
What mechanism is used by CSMA/CD in legacy Ethernet networks to resolve simultaneous packet transmissions?
- A) Token passing
- B) Exponential backoff algorithm after collision detection
- C) Priority reservation
- D) Frequency multiplexing
**Correct Answer**: B
**Explanation**: When a collision is detected, transmitting nodes emit a jam signal and wait for a random backoff interval generated by the Binary Exponential Backoff algorithm before retrying.
**Topic**: Data Link Layer
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q38
What is the function of the `Accept-Encoding` header sent by an HTTP client?
- A) It specifies acceptable character sets
- B) It informs the server which compression algorithms (e.g., gzip, br, deflate) the client can decompress
- C) It negotiates TLS cipher suites
- D) It requests specific media MIME types
**Correct Answer**: B
**Explanation**: `Accept-Encoding: gzip, deflate, br` informs the server that the client supports compressed payloads, reducing network transfer sizes.
**Topic**: HTTP Protocol
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q39
In Go-Back-N ARQ, if the sender window size is $N = 4$ and frame 2 is lost while frames 0, 1, 3, 4 are transmitted, what does the receiver do?
- A) Buffers frames 3 and 4 and requests only frame 2
- B) Discards frames 3 and 4 and re-requests frame 2
- C) Acknowledges frame 4 directly
- D) Terminates the connection
**Correct Answer**: B
**Explanation**: Go-Back-N does not buffer out-of-order packets. The receiver drops out-of-order packets (3 and 4) and continuously re-ACKs the last valid in-order packet (1), forcing the sender to retransmit all frames from 2 onward.
**Topic**: Flow Control
**Difficulty**: Hard
**Source Classification**: GENERAL CS TOPIC

---

### Q40
Which field in the TCP header specifies the length of the TCP header itself?
- A) Urgent Pointer
- B) Data Offset
- C) Window Size
- D) Checksum
**Correct Answer**: B
**Explanation**: The 4-bit Data Offset field expresses the number of 32-bit (4-byte) words contained in the header, pointing to where application data begins.
**Topic**: TCP Protocol
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q41
Which of the following IP address ranges is reserved for Private Networks under RFC 1918?
- A) 10.0.0.0 to 10.255.255.255
- B) 172.16.0.0 to 172.31.255.255
- C) 192.168.0.0 to 192.168.255.255
- D) All of the above
**Correct Answer**: D
**Explanation**: All three ranges are non-routable private address spaces defined in RFC 1918.
**Topic**: IP Addressing
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q42
What is the loopback IP address in IPv4 and IPv6 respectively?
- A) `127.0.0.1` and `::1`
- B) `0.0.0.0` and `::`
- C) `192.168.1.1` and `fe80::1`
- D) `255.255.255.255` and `ff02::1`
**Correct Answer**: A
**Explanation**: `127.0.0.1` is the IPv4 local loopback address. In IPv6, the loopback address is abbreviated as `::1`.
**Topic**: IP Addressing
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q43
What happens if the client sends an HTTP `POST` request and the server responds with status code `201 Created`?
- A) The request was rejected due to duplication
- B) The request succeeded and led to the creation of a new resource, typically referenced in the `Location` header
- C) The server cached the content
- D) The client must redirect to another page
**Correct Answer**: B
**Explanation**: `201 Created` confirms that a new resource has been successfully provisioned. The server usually provides the URI of the newly created resource in the `Location` header.
**Topic**: HTTP Protocol
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q44
Which transport layer protocol does Simple Network Management Protocol (SNMP) use by default?
- A) TCP
- B) UDP
- C) ICMP
- D) SCTP
**Correct Answer**: B
**Explanation**: SNMP uses UDP (port 161 for requests/responses, port 162 for traps) due to its lightweight overhead for device monitoring.
**Topic**: Network Protocols
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q45
What is the purpose of the Checksum field in an IP or TCP header?
- A) To encrypt the header contents
- B) To detect bit errors introduced during transmission across physical media
- C) To calculate packet delivery latency
- D) To determine optimal routing paths
**Correct Answer**: B
**Explanation**: The checksum is calculated using the one's complement sum of the header fields to detect corruption in transit.
**Topic**: Error Detection
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q46
Which HTTP method is specifically intended to apply partial modifications to a resource rather than replacing it entirely?
- A) PUT
- B) PATCH
- C) POST
- D) OPTIONS
**Correct Answer**: B
**Explanation**: `PATCH` updates specific fields of an existing resource, whereas `PUT` replaces the entire resource representation.
**Topic**: HTTP Protocol
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q47
What is the effect of setting TCP option `TCP_NODELAY` on a network socket?
- A) It enables large window scaling
- B) It disables Nagle's algorithm, forcing segments to be transmitted immediately without waiting to accumulate a full MSS
- C) It prioritizes the packet over others
- D) It enforces encryption
**Correct Answer**: B
**Explanation**: Nagle's algorithm buffers small outgoing packets to minimize header overhead. `TCP_NODELAY` disables this buffering, providing lower latency for interactive apps (e.g., gaming, high-frequency trading, real-time telemetry).
**Topic**: Sockets & TCP
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q48
In an Ethernet frame, what is the role of the Preamble?
- A) Carrying the destination MAC address
- B) Synchronizing the receiver's clock with the incoming bit stream
- C) Checking frame integrity via CRC
- D) Defining VLAN tags
**Correct Answer**: B
**Explanation**: The 7-byte alternating pattern of 1s and 0s (`10101010`) in the preamble allows the physical receiver to synchronize its clock with the transmitter's bit timings.
**Topic**: Data Link Layer
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q49
Which protocol resolves an IP address from a known hardware MAC address (the inverse of ARP)?
- A) RARP (Reverse ARP)
- B) DNS
- C) NAT
- D) RIP
**Correct Answer**: A
**Explanation**: RARP allows a diskless workstation to query a server to learn its assigned IP address based on its physical MAC address. (Modern networks have replaced RARP with DHCP).
**Topic**: Network Protocols
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q50
What security protocol is negotiated between a browser and a server when establishing an HTTPS connection?
- A) SSH
- B) TLS (Transport Layer Security)
- C) IPsec
- D) PGP
**Correct Answer**: B
**Explanation**: Modern HTTPS uses TLS (TLS 1.2 or TLS 1.3, superseding legacy SSL) to authenticate endpoints and encrypt web communications.
**Topic**: Web Security & Protocols
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED
