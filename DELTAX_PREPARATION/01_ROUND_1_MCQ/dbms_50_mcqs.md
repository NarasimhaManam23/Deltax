# DeltaX Round 1 Question Bank: Database Management Systems (50 MCQs)

---

### Q1
Which SQL clause is used to filter aggregated groups of rows produced by a `GROUP BY` statement?
- A) `WHERE`
- B) `HAVING`
- C) `ORDER BY`
- D) `LIMIT`
**Correct Answer**: B
**Explanation**: `WHERE` filters individual rows before aggregation; `HAVING` filters aggregated grouped results (e.g., `HAVING COUNT(*) > 5`).
**Topic**: SQL Clauses
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q2
What does the "Atomicity" property of ACID transactions guarantee?
- A) All database transactions execute simultaneously
- B) All operations within a transaction succeed completely, or the entire transaction is rolled back with no partial effects preserved
- C) Transactions never read stale data
- D) Committed transactions survive power crashes
**Correct Answer**: B
**Explanation**: Atomicity enforces an "all or nothing" model: any failure triggers a rollback to the pre-transaction state.
**Topic**: ACID Properties
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q3
Which normal form requires that a relation is in 1NF and contains NO Partial Functional Dependencies on any candidate key?
- A) 1NF
- B) 2NF
- C) 3NF
- D) BCNF
**Correct Answer**: B
**Explanation**: 2NF requires that all non-prime attributes are fully functionally dependent on the entire composite candidate key, with no partial dependencies.
**Topic**: Normalization
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q4
What is a Transitive Dependency, and which normal form eliminates it?
- A) Dependency on foreign keys; eliminated in 1NF
- B) A functional dependency between two non-prime attributes ($X \rightarrow Y$ and $Y \rightarrow Z$ where neither is a candidate key); eliminated in 3NF
- C) Multi-valued dependency; eliminated in 4NF
- D) Dependency on primary keys; eliminated in 2NF
**Correct Answer**: B
**Explanation**: 3NF eliminates transitive dependencies by requiring that non-prime attributes depend only on superkeys, never on intermediate non-prime attributes.
**Topic**: Normalization
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q5
What is the difference between a Primary Key and a Unique Key in relational databases?
- A) Primary keys accept NULL values; Unique keys do not
- B) A table can have only one Primary Key, which forbids NULL values; a table can have multiple Unique Keys, which typically allow at least one NULL value
- C) Unique keys cannot be referenced by foreign keys
- D) Primary keys must always be integers
**Correct Answer**: B
**Explanation**: Primary key uniquely identifies a row and strictly forbids NULLs. Unique constraints allow distinct values and permit NULLs (exact count depends on RDBMS: SQL Server allows one NULL, Postgres/Oracle allow multiple).
**Topic**: Database Keys
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q6
What type of index alters the physical on-disk storage order of table rows to match the indexed column values?
- A) Non-Clustered Index
- B) Clustered Index
- C) Bitmap Index
- D) Full-Text Index
**Correct Answer**: B
**Explanation**: A clustered index determines the physical sort order of data rows on disk. Consequently, a table can possess only ONE clustered index.
**Topic**: Indexing
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q7
Which transaction isolation level prevents Dirty Reads and Non-Repeatable Reads, but still permits Phantom Reads?
- A) Read Uncommitted
- B) Read Committed
- C) Repeatable Read
- D) Serializable
**Correct Answer**: C
**Explanation**: Repeatable Read locks accessed rows to prevent modifications (preventing non-repeatable reads), but does not place range locks, allowing other transactions to insert new rows (phantom reads).
**Topic**: Transaction Isolation
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q8
What anomaly occurs when Transaction A reads uncommitted data written by Transaction B, and Transaction B subsequently rolls back?
- A) Non-Repeatable Read
- B) Dirty Read
- C) Phantom Read
- D) Lost Update
**Correct Answer**: B
**Explanation**: A Dirty Read occurs when a transaction reads uncommitted, unpersisted changes from another transaction that is later rolled back.
**Topic**: Concurrency Anomalies
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q9
What is the result of the SQL expression: `SELECT 1 WHERE NULL = NULL;`?
- A) Returns 1
- B) Returns NULL
- C) Returns an empty set (0 rows)
- D) Throws a syntax error
**Correct Answer**: C
**Explanation**: In SQL three-valued logic, comparing `NULL = NULL` evaluates to `UNKNOWN` (falsy), so the `WHERE` condition fails and returns 0 rows. Correct check is `IS NULL`.
**Topic**: SQL Logic & NULLs
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q10
How many rows are returned by an `INNER JOIN` between Table A with 5 rows and Table B with 4 rows if all rows share the exact same foreign key match value?
- A) 5
- B) 4
- C) 9
- D) 20
**Correct Answer**: D
**Explanation**: When all keys match, the join produces a full Cartesian product across matching rows: $5 \times 4 = 20$ rows.
**Topic**: SQL Joins
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q11
Which normal form requires that for EVERY non-trivial functional dependency $X \rightarrow Y$, the determinant $X$ must be a Superkey?
- A) 2NF
- B) 3NF
- C) Boyce-Codd Normal Form (BCNF)
- D) 4NF
**Correct Answer**: C
**Explanation**: BCNF is a stricter version of 3NF that eliminates cases where a non-prime attribute determines a prime attribute; $X$ must strictly be a superkey.
**Topic**: Normalization
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q12
What is the difference between `DELETE`, `TRUNCATE`, and `DROP` in SQL?
- A) `DELETE` is DDL; `TRUNCATE` is DML
- B) `DELETE` is a logged DML operation that can be rolled back and supports `WHERE`; `TRUNCATE` is a faster DDL operation that resets high-water marks and empties the table without row-by-row logging; `DROP` removes the entire table structure
- C) `TRUNCATE` deletes specific rows
- D) `DROP` keeps table structure intact
**Correct Answer**: B
**Explanation**: `DELETE` removes specified rows and writes transaction logs per row. `TRUNCATE` deallocates table data pages quickly (DDL). `DROP` completely removes the table definition and schema.
**Topic**: SQL Commands
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q13
What is the effect of using `UNION ALL` instead of `UNION` when combining two query result sets?
- A) `UNION ALL` sorts the final output; `UNION` does not
- B) `UNION ALL` retains all duplicate rows and executes faster; `UNION` performs an expensive duplicate elimination pass
- C) `UNION ALL` requires identical table names
- D) `UNION ALL` only works on numbers
**Correct Answer**: B
**Explanation**: `UNION` incurs the overhead of sorting/hashing to remove duplicates. `UNION ALL` simply concatenates result sets, preserving duplicates and executing significantly faster.
**Topic**: SQL Set Operations
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q14
What is a Foreign Key constraint?
- A) A key imported from an external database engine
- B) A column or set of columns in one table that references the Primary Key or Unique Key of another table, enforcing referential integrity
- C) A key that encrypts data rows
- D) An index that speeds up aggregation
**Correct Answer**: B
**Explanation**: Foreign keys enforce referential integrity by ensuring child rows cannot reference nonexistent parent records.
**Topic**: Database Constraints
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q15
What happens if you attempt to delete a row from a parent table that is referenced by rows in a child table when `ON DELETE CASCADE` is configured?
- A) The database throws a foreign key constraint violation error
- B) The parent row is deleted, and all corresponding matching child rows are automatically deleted
- C) The child rows have their foreign keys set to NULL
- D) The database locks permanently
**Correct Answer**: B
**Explanation**: `CASCADE` propagates deletions: removing the parent record automatically cascades to remove all associated child records.
**Topic**: Referential Integrity
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q16
Which SQL query correctly finds the 3rd highest distinct salary from an `Employee` table?
- A) `SELECT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 2;`
- B) `SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 2;`
- C) `SELECT salary FROM Employee WHERE salary < 3;`
- D) `SELECT MAX(salary) FROM Employee GROUP BY salary HAVING COUNT(*) = 3;`
**Correct Answer**: B
**Explanation**: `DISTINCT` eliminates duplicate salary values, `ORDER BY salary DESC` sorts descending, `OFFSET 2` skips the top 2 highest salaries, and `LIMIT 1` fetches the 3rd.
**Topic**: SQL Queries
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q17
What is the underlying data structure predominantly used by relational database systems (like PostgreSQL, MySQL InnoDB, SQL Server) for clustered and non-clustered indexing?
- A) AVL Tree
- B) B+ Tree
- C) Hash Table
- D) Binary Heap
**Correct Answer**: B
**Explanation**: B+ Trees keep all actual data pointers in linked leaf nodes, providing low tree height (fanout of hundreds), optimal disk I/O, and efficient range scans via leaf sibling pointers.
**Topic**: Indexing Internals
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q18
What is the difference between a Correlated Subquery and an Uncorrelated (Independent) Subquery?
- A) Correlated subqueries execute only once for the entire query
- B) An uncorrelated subquery executes once independently; a correlated subquery depends on column values from the outer query and must be evaluated repeatedly for every candidate row of the outer query
- C) Correlated subqueries can only appear in the `FROM` clause
- D) Uncorrelated subqueries cannot return integers
**Correct Answer**: B
**Explanation**: Correlated subqueries reference outer query values, executing repeatedly per outer row ($O(N \times M)$) unless rewritten with joins or window functions.
**Topic**: Subqueries
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q19
What is a "Deadlock" in database transaction processing?
- A) When a transaction exceeds memory capacity
- B) A situation where two or more transactions hold locks on resources that the others require, creating a circular wait where neither can proceed
- C) When a disk runs out of storage space
- D) When the database network port crashes
**Correct Answer**: B
**Explanation**: Deadlocks arise from circular locking dependencies. Databases detect deadlocks using wait-for graphs and abort/rollback one transaction (the "victim").
**Topic**: Transactions & Concurrency
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q20
Which SQL aggregate function ignores `NULL` values when performing its calculation?
- A) `COUNT(*)`
- B) `AVG(column_name)`
- C) `SUM(column_name)`
- D) Both B and C
**Correct Answer**: D
**Explanation**: `SUM()`, `AVG()`, `MIN()`, and `MAX()` ignore `NULL` values. Only `COUNT(*)` counts all rows including those with NULLs.
**Topic**: Aggregations
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q21
What is the purpose of the Two-Phase Locking (2PL) protocol in database concurrency control?
- A) To encrypt transactions in two rounds
- B) To guarantee serializability of concurrent transactions
- C) To speed up disk writes
- D) To prevent table drops
**Correct Answer**: B
**Explanation**: 2PL has a growing phase (acquiring locks) and a shrinking phase (releasing locks). Obeying 2PL guarantees serializable conflict-free schedules.
**Topic**: Concurrency Control
**Difficulty**: Hard
**Source Classification**: GENERAL CS TOPIC

---

### Q22
What is the function of the Write-Ahead Logging (WAL) protocol in DBMS engines?
- A) To log user login sessions
- B) To ensure that changes are written and flushed to non-volatile disk logs before corresponding dirty pages in RAM are written to the main database file
- C) To index foreign keys
- D) To check table syntax
**Correct Answer**: B
**Explanation**: WAL guarantees durability and atomicity: in case of a sudden crash, uncommitted memory changes can be rolled back using undo logs, and committed changes can be restored via redo logs.
**Topic**: Database Storage & WAL
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q23
Which SQL join returns all rows from the left table and all rows from the right table, matching them where possible and substituting NULL where no match exists?
- A) `LEFT OUTER JOIN`
- B) `RIGHT OUTER JOIN`
- C) `FULL OUTER JOIN`
- D) `CROSS JOIN`
**Correct Answer**: C
**Explanation**: A Full Outer Join combines results of both Left and Right joins, filling missing columns on either side with NULLs.
**Topic**: SQL Joins
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q24
What is the difference between a Database View and a Materialized View?
- A) Standard views store physical data; Materialized views do not
- B) A standard view is a saved SQL query executed dynamically on each access; a materialized view persists query results physically on disk and must be refreshed periodically
- C) Materialized views cannot have indexes
- D) Standard views can only reference one table
**Correct Answer**: B
**Explanation**: Views are virtual tables computed on the fly. Materialized views cache physical result sets on disk, speeding up complex analytical queries at the expense of disk space and refresh lag.
**Topic**: Database Views
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q25
What is the cardinality of a relationship where one Employee belongs to one Department, and a Department contains many Employees?
- A) One-to-One
- B) One-to-Many
- C) Many-to-Many
- D) Self-Referencing
**Correct Answer**: B
**Explanation**: From Department to Employee is One-to-Many ($1:N$). Modeled with a Foreign Key in the Employee table referencing Department ID.
**Topic**: Entity Relationship Modeling
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q26
What is the purpose of the `COALESCE(val1, val2, ...)` SQL function?
- A) To join strings together
- B) To return the first non-NULL expression from the argument list
- C) To calculate standard deviations
- D) To compress JSON columns
**Correct Answer**: B
**Explanation**: `COALESCE()` scans arguments left to right and evaluates to the first argument that is not NULL.
**Topic**: SQL Functions
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q27
What is an "Injection" risk when building SQL queries in application backends?
- A) Connecting to too many databases
- B) Directly embedding untrusted user input into query strings without parameterization, enabling attackers to alter query logic
- C) Writing overly complex subqueries
- D) Using too many foreign keys
**Correct Answer**: B
**Explanation**: SQL injection occurs when user input modifies the syntax tree of dynamic SQL queries. Prevented using prepared statements.
**Topic**: Security & DBMS
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q28
What is the purpose of an SQL `TRIGGER`?
- A) To start the database service on reboot
- B) A procedural set of statements executed automatically by the DBMS in response to specified database events (such as `INSERT`, `UPDATE`, or `DELETE`)
- C) To decrypt user passwords
- D) To create table backups
**Correct Answer**: B
**Explanation**: Triggers automate validation, audit logging, and cascading calculations in response to table modifications.
**Topic**: Triggers & Stored Procedures
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q29
What does a `NULL` value represent in relational databases?
- A) Zero (0)
- B) An empty string (`""`)
- C) Missing, unknown, or inapplicable information
- D) A negative integer
**Correct Answer**: C
**Explanation**: In relational theory, `NULL` signifies missing or unknown information and behaves according to three-valued logic.
**Topic**: SQL Concepts
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q30
What is the purpose of a Database Transaction Savepoint?
- A) To save memory on the server
- B) A marker within a transaction allowing selective partial rollback of statements without rolling back the entire transaction
- C) To commit transactions to disk
- D) To create database clones
**Correct Answer**: B
**Explanation**: `SAVEPOINT savepoint_name` enables `ROLLBACK TO savepoint_name`, reverting intermediate operations while keeping earlier operations intact.
**Topic**: Transactions
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q31
Which normal form addresses Multi-Valued Dependencies (MVD)?
- A) 2NF
- B) 3NF
- C) 4NF
- D) 5NF
**Correct Answer**: C
**Explanation**: Fourth Normal Form (4NF) eliminates non-trivial multi-valued dependencies ($X \twoheadrightarrow Y$) that lead to data redundancy across orthogonal multi-valued attributes.
**Topic**: Normalization
**Difficulty**: Hard
**Source Classification**: GENERAL CS TOPIC

---

### Q32
Why should columns with low cardinality (e.g., a `Gender` column containing only 'M', 'F', 'Other') generally NOT use standard B-Tree indexing?
- A) B-Trees cannot store characters
- B) Low cardinality provides low selectivity; the query planner chooses a full table sequential scan because traversing the B-Tree offers no speedup
- C) It causes table corruption
- D) The database will refuse to create the index
**Correct Answer**: B
**Explanation**: Indexes excel when filtering to small fractions of table rows. When each distinct value matches 33–50% of the table, sequential scans are faster than random index disk seeks.
**Topic**: Indexing Optimization
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q33
In SQL, what is the default sorting order of the `ORDER BY` clause if unspecified?
- A) Random
- B) Descending (`DESC`)
- C) Ascending (`ASC`)
- D) Insertion order
**Correct Answer**: C
**Explanation**: Standard SQL defaults to Ascending (`ASC`) sort order.
**Topic**: SQL Clauses
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q34
What is the difference between a Candidate Key and a Superkey?
- A) Candidate keys accept NULLs; Superkeys do not
- B) A Superkey is any set of attributes that uniquely identifies a tuple; a Candidate Key is a minimal Superkey containing no extraneous attributes
- C) Superkeys cannot be indexed
- D) There is no distinction
**Correct Answer**: B
**Explanation**: All candidate keys are superkeys, but a candidate key is irreducible: removing any attribute destroys its unique identification property.
**Topic**: Relational Keys
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q35
What does the `EXPLAIN` or `EXPLAIN ANALYZE` command do in relational databases?
- A) Displays table creation DDL
- B) Shows the query execution plan generated by the cost-based query optimizer (e.g., Index Scan, Seq Scan, Hash Join, estimated cost)
- C) Checks SQL syntax without executing
- D) Generates database documentation
**Correct Answer**: B
**Explanation**: `EXPLAIN` reveals the query plan (join algorithms, index scans, cost estimates) chosen by the database engine to execute the query.
**Topic**: Query Optimization
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q36
Which SQL constraint guarantees that all values in a column are distinct and not null?
- A) `UNIQUE`
- B) `PRIMARY KEY`
- C) `CHECK`
- D) `DEFAULT`
**Correct Answer**: B
**Explanation**: A `PRIMARY KEY` combines `UNIQUE` and `NOT NULL` constraints.
**Topic**: Database Constraints
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q37
What happens to child table records if `ON DELETE SET NULL` is configured on a foreign key relationship and the parent row is deleted?
- A) All child rows are deleted
- B) The foreign key column in all associated child rows is updated to `NULL`
- C) The deletion is aborted
- D) Child rows become parent records
**Correct Answer**: B
**Explanation**: `SET NULL` preserves child rows while severing the reference to the deleted parent by setting foreign key columns to NULL.
**Topic**: Referential Integrity
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q38
What is the purpose of the `ROW_NUMBER()` window function in modern SQL?
- A) Counts total rows in a table
- B) Assigns a unique sequential integer to each row within a partition ordered by a specified column
- C) Generates random numbers
- D) Deletes duplicate rows
**Correct Answer**: B
**Explanation**: `ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)` numbers rows consecutively from 1 within each partition group.
**Topic**: Window Functions
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q39
What is a "Composite Key" in a relational database?
- A) A primary key composed of two or more columns that together uniquely identify a row
- B) An encrypted foreign key
- C) A key that references multiple external databases
- D) An auto-incrementing integer key
**Correct Answer**: A
**Explanation**: Composite keys use a combination of multiple columns (e.g., `StudentID` and `CourseID`) to enforce unique row identification.
**Topic**: Relational Keys
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q40
Which of the following database engines is an example of a NoSQL Document Store?
- A) PostgreSQL
- B) MongoDB
- C) Oracle
- D) SQLite
**Correct Answer**: B
**Explanation**: MongoDB stores flexible, JSON-like BSON documents without rigid schema constraints. Postgres, Oracle, and SQLite are relational SQL databases.
**Topic**: Database Types
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q41
In transactional replication, what is the role of the Database Write-Ahead Log in Change Data Capture (CDC)?
- A) Storing user passwords
- B) Reading committed transaction deltas directly from the log file to stream database mutations asynchronously to downstream analytics systems without placing query load on the database engine
- C) Encrypting database backups
- D) Generating primary keys
**Correct Answer**: B
**Explanation**: Log-based CDC parsers (e.g., Debezium) tail the transaction log (WAL / binlog) to capture row mutations in near-real-time without querying production tables.
**Topic**: Replication & Scaling
**Difficulty**: Hard
**Source Classification**: GENERAL CS TOPIC

---

### Q42
What is the result of applying the `AVG()` function to a column containing values `[10, 20, NULL, 30]`?
- A) 15
- B) 20
- C) NULL
- D) Error
**Correct Answer**: B
**Explanation**: `AVG()` calculates $(10 + 20 + 30) / 3 = 60 / 3 = 20$. The NULL row is ignored; the denominator is 3, not 4.
**Topic**: SQL Functions
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q43
What is the purpose of Database Connection Pooling?
- A) Reusing a cache of pre-established database connections to avoid the expensive TCP and authentication overhead of opening and closing physical connections for every incoming request
- B) Merging multiple tables into one
- C) Replicating data across servers
- D) Running automated database tests
**Correct Answer**: A
**Explanation**: Establishing a new database connection involves TCP handshakes, TLS setup, and process allocation. Connection pools maintain reusable warm connections.
**Topic**: Database Architecture
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q44
What is the difference between `RANK()` and `DENSE_RANK()` in SQL window functions?
- A) `RANK()` only works on dates
- B) When ties occur, `RANK()` skips subsequent ranks (e.g., 1, 2, 2, 4), whereas `DENSE_RANK()` does not leave gaps (e.g., 1, 2, 2, 3)
- C) `DENSE_RANK()` cannot handle negative numbers
- D) They are aliases for the same function
**Correct Answer**: B
**Explanation**: `RANK()` leaves gaps after identical tied values; `DENSE_RANK()` produces continuous rank numbers without skipping values.
**Topic**: Window Functions
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q45
Which SQL command is used to revoke previously granted database permissions from a user?
- A) `DELETE`
- B) `REVOKE`
- C) `DENY`
- D) `DROP`
**Correct Answer**: B
**Explanation**: Syntax: `REVOKE <privilege> ON <object> FROM <user>;`.
**Topic**: DCL Commands
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q46
What does "Lossless Join Decomposition" guarantee in database normalization?
- A) Data rows are encrypted
- B) Recombining decomposed tables via natural join guarantees the exact original relation without introducing spurious/phantom tuples
- C) Foreign keys are not needed
- D) Storage footprint is halved
**Correct Answer**: B
**Explanation**: Lossless decomposition ensures that decomposing relation $R$ into $R_1$ and $R_2$ preserves the exact data state ($R_1 \bowtie R_2 = R$) with zero false records.
**Topic**: Normalization
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q47
What is an "ACID Consistency" violation example?
- A) A transaction that transfers money between accounts where the debit succeeds but the credit fails, violating the total balance invariant
- B) A database crash during query execution
- C) A slow index scan
- D) Storing strings in an integer column
**Correct Answer**: A
**Explanation**: Consistency ensures all business rules and invariants (e.g., Total System Balance remains constant) are preserved before and after execution.
**Topic**: ACID Properties
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q48
What does the `CASCADE` keyword do in an SQL `DROP TABLE table_name CASCADE` statement?
- A) Drops the database entirely
- B) Automatically drops all dependent database objects (such as foreign key constraints and views) referencing the dropped table
- C) Backs up the table before dropping
- D) Encrypts disk pages
**Correct Answer**: B
**Explanation**: Dropping with `CASCADE` removes the table along with all foreign key constraints, dependent views, and triggers referencing it.
**Topic**: DDL Commands
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q49
In database query optimization, why is `SELECT *` discouraged in production APIs?
- A) The database cannot execute `SELECT *`
- B) It forces unnecessary disk I/O, increases network serialization bandwidth, and prevents the query engine from utilizing covering indexes
- C) It causes table locks
- D) It violates ACID isolation
**Correct Answer**: B
**Explanation**: Explicit column selection (`SELECT id, name`) allows the database to read fewer disk pages and satisfy queries directly from index structures without touching heap table blocks.
**Topic**: Query Optimization
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q50
What is Sharding in modern database systems?
- A) Replicating data across three backup drives
- B) Horizontally partitioning a database across multiple independent physical servers based on a shard key (e.g., Customer ID) to scale write throughput and storage
- C) Compressing index tables
- D) Running automated daily backups
**Correct Answer**: B
**Explanation**: Sharding distributes distinct subsets of database rows across multiple machines, scaling read/write capacity beyond the limits of a single node.
**Topic**: Distributed Systems & DBMS
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN
