import sqlite3
import time
import re
from typing import Dict, Any, List, Optional, Tuple

SAMPLE_SCHEMA = """
CREATE TABLE departments (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    budget INTEGER NOT NULL,
    location TEXT NOT NULL
);

CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    department_id INTEGER,
    salary INTEGER NOT NULL,
    hire_date TEXT NOT NULL,
    manager_id INTEGER,
    email TEXT UNIQUE NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);

CREATE TABLE customers (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    rating INTEGER NOT NULL
);

CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    order_date TEXT NOT NULL,
    amount REAL NOT NULL,
    status TEXT NOT NULL,
    employee_id INTEGER,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);
"""

SAMPLE_DATA = """
INSERT INTO departments (id, name, budget, location) VALUES
(1, 'Engineering', 2500000, 'Mumbai'),
(2, 'Product', 1200000, 'Mumbai'),
(3, 'Marketing', 800000, 'Bengaluru'),
(4, 'Sales', 1500000, 'Delhi'),
(5, 'Human Resources', 600000, 'Mumbai');

INSERT INTO employees (id, name, department_id, salary, hire_date, manager_id, email) VALUES
(101, 'Aman Gupta', 1, 95000, '2021-03-15', NULL, 'aman.gupta@firstlabs.live'),
(102, 'Priya Nair', 1, 88000, '2021-06-01', 101, 'priya.nair@firstlabs.live'),
(103, 'Rohit Verma', 1, 78000, '2022-01-10', 101, 'rohit.verma@firstlabs.live'),
(104, 'Sneha Patel', 1, 72000, '2022-08-20', 102, 'sneha.patel@firstlabs.live'),
(105, 'Aditi Sharma', 2, 92000, '2020-11-05', NULL, 'aditi.sharma@firstlabs.live'),
(106, 'Vikram Rao', 2, 81000, '2021-09-12', 105, 'vikram.rao@firstlabs.live'),
(107, 'Neha Joshi', 3, 65000, '2022-04-18', NULL, 'neha.joshi@firstlabs.live'),
(108, 'Karthik Iyer', 3, 58000, '2023-02-01', 107, 'karthik.iyer@firstlabs.live'),
(109, 'Pooja Reddy', 4, 85000, '2021-01-25', NULL, 'pooja.reddy@firstlabs.live'),
(110, 'Sandeep Kumar', 4, 76000, '2022-05-15', 109, 'sandeep.kumar@firstlabs.live'),
(111, 'Ananya Sen', 4, 71000, '2023-07-10', 109, 'ananya.sen@firstlabs.live'),
(112, 'Rahul Deshmukh', 5, 62000, '2021-10-01', NULL, 'rahul.deshmukh@firstlabs.live'),
(113, 'Kavita Pillai', 1, 68000, '2023-11-15', 102, 'kavita.pillai@firstlabs.live'),
(114, 'Arjun Mehta', NULL, 50000, '2024-01-10', NULL, 'arjun.mehta@firstlabs.live');

INSERT INTO customers (id, name, city, rating) VALUES
(201, 'Apex Tech Corp', 'Mumbai', 5),
(202, 'Zenith Innovations', 'Bengaluru', 4),
(203, 'Global Logistics Ltd', 'Delhi', 5),
(204, 'Hyperion Retail', 'Pune', 3),
(205, 'Solstice Health', 'Hyderabad', 4),
(206, 'BlueSky Media', 'Mumbai', 5),
(207, 'Trident Financial', 'Bengaluru', 4),
(208, 'Nova Analytics', 'Delhi', 2);

INSERT INTO orders (id, customer_id, order_date, amount, status, employee_id) VALUES
(301, 201, '2024-01-15', 1450.50, 'Completed', 109),
(302, 202, '2024-01-18', 3200.00, 'Completed', 110),
(303, 201, '2024-01-22', 850.00, 'Completed', 109),
(304, 203, '2024-02-01', 5400.00, 'Completed', 111),
(305, 204, '2024-02-05', 450.00, 'Cancelled', 110),
(306, 205, '2024-02-14', 2100.00, 'Completed', 109),
(307, 206, '2024-02-20', 1850.75, 'Completed', 111),
(308, 202, '2024-03-01', 950.00, 'Pending', 110),
(309, 207, '2024-03-05', 4100.00, 'Completed', 109),
(310, 203, '2024-03-12', 3300.00, 'Completed', 111),
(311, 201, '2024-03-18', 2250.00, 'Completed', 109),
(312, 208, '2024-03-25', 620.00, 'Processing', 110),
(313, 204, '2024-04-02', 1200.00, 'Completed', 111),
(314, 205, '2024-04-10', 890.00, 'Completed', 109),
(315, 206, '2024-04-15', 3150.00, 'Completed', 110);
"""

# Reference SQL query answers for automated challenge verification
REFERENCE_SOLUTIONS = {
    "sql_emp_salaries": "SELECT id, name, salary FROM employees WHERE department_id = 1 AND salary > 70000 ORDER BY salary DESC;",
    "sql_dept_avg_salary": "SELECT d.name AS department_name, COUNT(e.id) AS employee_count, ROUND(AVG(e.salary), 2) AS avg_salary FROM departments d JOIN employees e ON d.id = e.department_id GROUP BY d.id, d.name ORDER BY avg_salary DESC;",
    "sql_second_highest_salary": "SELECT MAX(salary) AS second_highest_salary FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);",
    "sql_employees_above_dept_avg": "SELECT e.name, e.salary, e.department_id FROM employees e WHERE e.salary > (SELECT AVG(e2.salary) FROM employees e2 WHERE e2.department_id = e.department_id) ORDER BY e.salary DESC;",
    "sql_detect_duplicates": "SELECT customer_id, COUNT(*) as order_count FROM orders GROUP BY customer_id HAVING COUNT(*) > 1;",
    "sql_dept_revenue": "SELECT d.name AS department_name, ROUND(SUM(o.amount), 2) AS total_revenue FROM departments d JOIN employees e ON d.id = e.department_id JOIN orders o ON e.id = o.employee_id WHERE o.status = 'Completed' GROUP BY d.id, d.name ORDER BY total_revenue DESC;",
    "sql_unassigned_departments": "SELECT d.name FROM departments d LEFT JOIN employees e ON d.id = e.department_id WHERE e.id IS NULL;",
    "sql_high_value_customers": "SELECT c.name, COUNT(o.id) AS completed_orders, ROUND(SUM(o.amount), 2) AS total_spent FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'Completed' GROUP BY c.id, c.name HAVING COUNT(o.id) >= 2 AND SUM(o.amount) > 2000 ORDER BY total_spent DESC;",
    "sql_salary_tiers_case": "SELECT name, salary, CASE WHEN salary >= 85000 THEN 'Tier 1' WHEN salary >= 70000 THEN 'Tier 2' ELSE 'Tier 3' END AS salary_band FROM employees ORDER BY salary DESC;",
    "sql_manager_self_join": "SELECT e.name AS employee_name, m.name AS manager_name FROM employees e LEFT JOIN employees m ON e.manager_id = m.id ORDER BY e.name ASC;"
}

def create_sandbox_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(":memory:")
    cursor = conn.cursor()
    cursor.executescript(SAMPLE_SCHEMA)
    cursor.executescript(SAMPLE_DATA)
    conn.commit()
    return conn

def get_schema_summary() -> Dict[str, Any]:
    return {
        "tables": [
            {
                "name": "departments",
                "columns": ["id (INTEGER, PK)", "name (TEXT)", "budget (INTEGER)", "location (TEXT)"],
                "sample_rows": [
                    {"id": 1, "name": "Engineering", "budget": 2500000, "location": "Mumbai"},
                    {"id": 2, "name": "Product", "budget": 1200000, "location": "Mumbai"},
                    {"id": 3, "name": "Marketing", "budget": 800000, "location": "Bengaluru"}
                ]
            },
            {
                "name": "employees",
                "columns": ["id (INTEGER, PK)", "name (TEXT)", "department_id (INTEGER, FK)", "salary (INTEGER)", "hire_date (TEXT)", "manager_id (INTEGER, FK)", "email (TEXT)"],
                "sample_rows": [
                    {"id": 101, "name": "Aman Gupta", "department_id": 1, "salary": 95000, "hire_date": "2021-03-15", "manager_id": None, "email": "aman.gupta@firstlabs.live"},
                    {"id": 102, "name": "Priya Nair", "department_id": 1, "salary": 88000, "hire_date": "2021-06-01", "manager_id": 101, "email": "priya.nair@firstlabs.live"},
                    {"id": 105, "name": "Aditi Sharma", "department_id": 2, "salary": 92000, "hire_date": "2020-11-05", "manager_id": None, "email": "aditi.sharma@firstlabs.live"}
                ]
            },
            {
                "name": "customers",
                "columns": ["id (INTEGER, PK)", "name (TEXT)", "city (TEXT)", "rating (INTEGER)"],
                "sample_rows": [
                    {"id": 201, "name": "Apex Tech Corp", "city": "Mumbai", "rating": 5},
                    {"id": 202, "name": "Zenith Innovations", "city": "Bengaluru", "rating": 4}
                ]
            },
            {
                "name": "orders",
                "columns": ["id (INTEGER, PK)", "customer_id (INTEGER, FK)", "order_date (TEXT)", "amount (REAL)", "status (TEXT)", "employee_id (INTEGER, FK)"],
                "sample_rows": [
                    {"id": 301, "customer_id": 201, "order_date": "2024-01-15", "amount": 1450.50, "status": "Completed", "employee_id": 109},
                    {"id": 302, "customer_id": 202, "order_date": "2024-01-18", "amount": 3200.00, "status": "Completed", "employee_id": 110}
                ]
            }
        ]
    }

FORBIDDEN_KEYWORDS = [
    r"\bINSERT\b", r"\bUPDATE\b", r"\bDELETE\b", r"\bDROP\b",
    r"\bALTER\b", r"\bCREATE\b", r"\bTRUNCATE\b", r"\bATTACH\b",
    r"\bDETACH\b", r"\bPRAGMA\b", r"\bVACUUM\b", r"\bREINDEX\b",
    r"\bGRANT\b", r"\bREVOKE\b"
]

def sanitize_and_validate_query(raw_query: str) -> Tuple[bool, Optional[str]]:
    query = raw_query.strip()
    if not query:
        return False, "Query cannot be empty."

    # Check for forbidden mutation keywords
    upper_q = query.upper()
    for pattern in FORBIDDEN_KEYWORDS:
        if re.search(pattern, upper_q):
            return False, f"Mutating/destructive operations are disallowed in this sandbox. Write read-only queries (SELECT / WITH)."

    # Must start with SELECT, WITH, or EXPLAIN
    if not (upper_q.startswith("SELECT") or upper_q.startswith("WITH") or upper_q.startswith("EXPLAIN")):
        return False, "Query must start with SELECT or WITH statement."

    return True, None

def execute_user_query(raw_query: str, problem_id: Optional[str] = None) -> Dict[str, Any]:
    is_valid, err_msg = sanitize_and_validate_query(raw_query)
    if not is_valid:
        return {
            "success": False,
            "columns": [],
            "rows": [],
            "row_count": 0,
            "execution_time_ms": 0.0,
            "error": err_msg,
            "passed_validation": False,
            "diff_message": err_msg
        }

    conn = create_sandbox_connection()
    cursor = conn.cursor()

    start_time = time.perf_counter()
    try:
        cursor.execute(raw_query)
        rows = cursor.fetchmany(101) # fetch up to 101 to check if overflow
        duration_ms = round((time.perf_counter() - start_time) * 1000, 2)
        columns = [desc[0] for desc in cursor.description] if cursor.description else []
    except Exception as e:
        conn.close()
        return {
            "success": False,
            "columns": [],
            "rows": [],
            "row_count": 0,
            "execution_time_ms": round((time.perf_counter() - start_time) * 1000, 2),
            "error": f"SQL Error: {str(e)}",
            "passed_validation": False,
            "diff_message": str(e)
        }

    # Format rows
    formatted_rows = []
    for r in rows[:100]:
        formatted_rows.append(list(r))

    passed_validation = None
    diff_message = None

    # Compare with reference solution if problem_id is provided and known
    if problem_id and problem_id in REFERENCE_SOLUTIONS:
        ref_query = REFERENCE_SOLUTIONS[problem_id]
        try:
            ref_cursor = conn.cursor()
            ref_cursor.execute(ref_query)
            ref_rows = [list(r) for r in ref_cursor.fetchall()]
            ref_cols = [desc[0].lower() for desc in ref_cursor.description]
            user_cols_lower = [c.lower() for c in columns]

            # Validation check
            if len(user_cols_lower) != len(ref_cols):
                passed_validation = False
                diff_message = f"Column count mismatch: expected {len(ref_cols)} columns ({', '.join(ref_cols)}), got {len(user_cols_lower)} ({', '.join(columns)})."
            elif len(formatted_rows) != len(ref_rows):
                passed_validation = False
                diff_message = f"Row count mismatch: expected {len(ref_rows)} rows, returned {len(formatted_rows)} rows."
            else:
                # Compare sets or lists
                if formatted_rows == ref_rows:
                    passed_validation = True
                    diff_message = "All test cases passed! Result matches expected query output perfectly."
                else:
                    # Check if matching unordered
                    def sortable_row(row):
                        return tuple(str(x) for x in row)

                    if sorted(formatted_rows, key=sortable_row) == sorted(ref_rows, key=sortable_row):
                        passed_validation = True
                        diff_message = "Result matches expected output! Note: Ensure proper ORDER BY as specified in the problem statement."
                    else:
                        passed_validation = False
                        diff_message = f"Query executed successfully, but data values differ from reference output. First differing row: returned {formatted_rows[0] if formatted_rows else 'empty'}, expected {ref_rows[0] if ref_rows else 'empty'}."
        except Exception as ref_err:
            diff_message = f"Reference execution error: {str(ref_err)}"
            passed_validation = None

    conn.close()

    return {
        "success": True,
        "columns": columns,
        "rows": formatted_rows,
        "row_count": len(formatted_rows),
        "execution_time_ms": duration_ms,
        "error": None,
        "passed_validation": passed_validation,
        "diff_message": diff_message
    }
