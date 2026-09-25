# DeltaX Coding Patterns 05: Stack, Queue & Linked Lists

---

# PATTERN 9 & 10: STACKS & QUEUES (MONOTONIC STRUCTURES & BFS)

### 1. Recognition Clues
* "Find the Next Greater / Smaller Element for each position in an array."
* "Evaluate Reverse Polish / Postfix arithmetic expressions."
* "Find the largest rectangular area in a histogram."
* "Simulate bread-first multi-source spreading (e.g., Rotten Oranges, 01 Matrix)."
* "Sliding window maximum of size $K$ in $O(N)$."

### 2. Strategy: Monotonic Stack & Multi-Source BFS
* **Monotonic Stack**: Maintain an array or stack of indices where values are kept strictly increasing or decreasing. When a new element violates monotonicity, pop elements from the stack and compute boundaries.
* **Multi-Source BFS**: In problems where multiple infection/rotten points spread simultaneously across a grid, enqueue **all initial source coordinates into the queue before the BFS loop begins**, maintaining a `visited` or `dist` matrix.

### 3. Implementation Code

#### Java Implementation (Rotten Oranges - Multi-Source BFS, Reported DeltaX Theme)
```java
import java.util.LinkedList;
import java.util.Queue;

public class RottenOranges {
    public static int orangesRotting(int[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        
        int rows = grid.length;
        int cols = grid[0].length;
        Queue<int[]> queue = new LinkedList<>();
        int freshCount = 0;
        
        // Step 1: Enqueue all initially rotten oranges and count fresh oranges
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 2) {
                    queue.offer(new int[]{r, c});
                } else if (grid[r][c] == 1) {
                    freshCount++;
                }
            }
        }
        
        if (freshCount == 0) return 0; // No fresh oranges initially
        
        int minutes = 0;
        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        
        // Step 2: Multi-source BFS
        while (!queue.isEmpty() && freshCount > 0) {
            int size = queue.size();
            minutes++;
            
            for (int i = 0; i < size; i++) {
                int[] current = queue.poll();
                int r = current[0];
                int c = current[1];
                
                for (int[] dir : directions) {
                    int nr = r + dir[0];
                    int nc = c + dir[1];
                    
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2; // Infect to rotten
                        freshCount--;
                        queue.offer(new int[]{nr, nc});
                    }
                }
            }
        }
        
        return freshCount == 0 ? minutes : -1;
    }
}
```

#### Python Implementation (Next Greater Element using Monotonic Stack)
```python
def next_greater_elements(nums: list[int]) -> list[int]:
    """
    Finds the next greater element for each index in array.
    Time: O(N), Space: O(N)
    """
    n = len(nums)
    res = [-1] * n
    stack = []  # stores indices
    
    for i in range(n):
        while stack and nums[stack[-1]] < nums[i]:
            popped_idx = stack.pop()
            res[popped_idx] = nums[i]
        stack.append(i)
        
    return res
```

### 4. Five Practice Exercises
1. Next Greater Element I & II (Circular array).
2. Rotten Oranges (Multi-source BFS).
3. Largest Rectangle in Histogram (Monotonic Stack).
4. Daily Temperatures.
5. Sliding Window Maximum using Monotonic Deque.

---

# PATTERN 11: LINKED LISTS

### 1. Recognition Clues
* "Reverse a singly linked list in $O(1)$ space."
* "Reverse nodes in $K$-group."
* "Detect cycle and find the starting node of the loop."
* "Merge two sorted linked lists."
* "Remove $N^{\text{th}}$ node from the end of a list in one pass."

### 2. Strategy: Dummy Head & Three Pointers
* **Dummy Head**: Always initialize `ListNode dummy = new ListNode(0); dummy.next = head;` when deleting head nodes or merging lists. This eliminates special-case branching for head modifications.
* **Three Pointers for In-Place Reversal**: `prev = null; curr = head; next = null;` inside `while (curr != null)`.

### 3. Implementation Code

#### Java Implementation (Reverse Nodes in K-Group)
```java
public class ReverseKGroup {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    
    public static ListNode reverseKGroup(ListNode head, int k) {
        if (head == null || k <= 1) return head;
        
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode groupPrev = dummy;
        
        while (true) {
            // Find k-th node
            ListNode kth = getKth(groupPrev, k);
            if (kth == null) break;
            
            ListNode groupNext = kth.next;
            
            // Reverse group
            ListNode prev = groupNext;
            ListNode curr = groupPrev.next;
            while (curr != groupNext) {
                ListNode tmp = curr.next;
                curr.next = prev;
                prev = curr;
                curr = tmp;
            }
            
            // Connect previous part to new head of reversed group
            ListNode tmp = groupPrev.next;
            groupPrev.next = kth;
            groupPrev = tmp;
        }
        return dummy.next;
    }
    
    private static ListNode getKth(ListNode curr, int k) {
        while (curr != null && k > 0) {
            curr = curr.next;
            k--;
        }
        return curr;
    }
}
```

### 4. Five Practice Exercises
1. Reverse Linked List (Iterative & Recursive).
2. Merge Two Sorted Linked Lists.
3. Linked List Cycle II (Find entry point of cycle).
4. Remove N-th Node From End of List.
5. Palindrome Linked List ($O(1)$ space).
