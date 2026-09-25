# DeltaX Coding Patterns 06: Application Parsing, Validation, JSON Formatting & URL Processing

---

# PATTERN 18 & 19: PARSING & VALIDATION ENGINE (EMAIL & IP VALIDATION)

### 1. Recognition Clues (Heavily Reported DeltaX Pattern)
* "Validate an email address under custom rules without using standard regex libraries."
* "Validate whether a string is a valid IPv4 or IPv6 address."
* "State machine character-by-character parsing."
* "Application-specific format verification (e.g., date formats, coupon codes, phone formats)."

### 2. Strategy: Deterministic Finite Automaton (DFA) / State Traversal
* Rather than unreadable, brittle regular expressions that fail corner cases, write explicit tokenizers checking:
  1. Splitting on delimiter (`@` for emails, `.` for IPv4, `:` for IPv6).
  2. Length boundaries (e.g., username not empty, domain contains at least one dot, no leading/trailing dots).
  3. Character whitelists (alphanumeric, allowable symbols).
  4. Leading zeroes validation in IPv4 numbers (e.g., `"192.168.01.1"` is INVALID).

### 3. Implementation Code

#### Java Implementation (Strict Email Validator Without Libraries)
```java
public class EmailValidator {
    public static boolean isValidEmail(String email) {
        if (email == null || email.length() < 3 || email.length() > 254) return false;
        
        int atIndex = email.indexOf('@');
        int lastAtIndex = email.lastIndexOf('@');
        
        // Rule 1: Exactly one '@' character, not at the start or end
        if (atIndex == -1 || atIndex != lastAtIndex || atIndex == 0 || atIndex == email.length() - 1) {
            return false;
        }
        
        String username = email.substring(0, atIndex);
        String domain = email.substring(atIndex + 1);
        
        // Validate Username
        if (!isValidUsername(username)) return false;
        
        // Validate Domain
        if (!isValidDomain(domain)) return false;
        
        return true;
    }
    
    private static boolean isValidUsername(String user) {
        if (user.length() == 0 || user.length() > 64) return false;
        // Cannot start or end with dot
        if (user.startsWith(".") || user.endsWith(".")) return false;
        
        char prev = ' ';
        for (int i = 0; i < user.length(); i++) {
            char c = user.charAt(i);
            // Consecutive dots forbidden
            if (c == '.' && prev == '.') return false;
            // Allowed characters: a-z, A-Z, 0-9, '.', '_', '-'
            if (!Character.isLetterOrDigit(c) && c != '.' && c != '_' && c != '-') {
                return false;
            }
            prev = c;
        }
        return true;
    }
    
    private static boolean isValidDomain(String domain) {
        if (domain.length() == 0 || domain.length() > 253) return false;
        if (domain.startsWith(".") || domain.endsWith(".")) return false;
        
        String[] parts = domain.split("\\.");
        // Domain must have at least two labels (e.g., "deltax.com")
        if (parts.length < 2) return false;
        
        for (String part : parts) {
            if (part.length() == 0 || part.length() > 63) return false;
            if (part.startsWith("-") || part.endsWith("-")) return false;
            for (char c : part.toCharArray()) {
                if (!Character.isLetterOrDigit(c) && c != '-') return false;
            }
        }
        // Top-Level Domain (TLD) must be at least 2 alphabetic characters
        String tld = parts[parts.length - 1];
        if (tld.length() < 2) return false;
        for (char c : tld.toCharArray()) {
            if (!Character.isLetter(c)) return false;
        }
        return true;
    }
}
```

#### Python Implementation (Validate IP Address - IPv4 vs IPv6 vs Neither)
```python
def valid_ip_address(query_ip: str) -> str:
    """
    Validates IPv4 vs IPv6 vs Neither.
    Time: O(N), Space: O(1)
    """
    def is_ipv4(s: str) -> bool:
        parts = s.split(".")
        if len(parts) != 4:
            return False
        for part in parts:
            if not part or len(part) > 3 or not part.isdigit():
                return False
            # Check leading zeros: "01" is invalid, but "0" is valid
            if len(part) > 1 and part[0] == "0":
                return False
            if not (0 <= int(part) <= 255):
                return False
        return True

    def is_ipv6(s: str) -> bool:
        parts = s.split(":")
        if len(parts) != 8:
            return False
        hexdigits = "0123456789abcdefABCDEF"
        for part in parts:
            if not part or len(part) > 4:
                return False
            if not all(c in hexdigits for c in part):
                return False
        return True

    if is_ipv4(query_ip):
        return "IPv4"
    elif is_ipv6(query_ip):
        return "IPv6"
    return "Neither"
```

---

# PATTERN 20: JSON-LIKE SERIALIZATION & FORMATTING

### 1. Recognition Clues (Reported DeltaX Theme)
* "Convert a flat key-value query string or delimited string into a nested JSON-like structure."
* "Parse a simple JSON string into key-value pairs without using Jackson, Gson, or json libraries."
* "Pretty-print or indent a mini-JSON string."

### 2. Implementation Code

#### Java Implementation (Key-Value String to Clean JSON Formatter)
```java
import java.util.*;

public class MiniJsonFormatter {
    public static String formatToJson(String input) {
        // Example input: "name=DeltaX;role=APE;ctc=7;active=true"
        if (input == null || input.trim().isEmpty()) return "{}";
        
        StringBuilder sb = new StringBuilder();
        sb.append("{\n");
        
        String[] pairs = input.split(";");
        for (int i = 0; i < pairs.length; i++) {
            String pair = pairs[i].trim();
            if (pair.isEmpty()) continue;
            
            int eqIdx = pair.indexOf('=');
            if (eqIdx == -1) continue; // Malformed pair
            
            String key = pair.substring(0, eqIdx).trim();
            String value = pair.substring(eqIdx + 1).trim();
            
            sb.append("  \"").append(key).append("\": ");
            
            // Format value: if boolean or integer, don't quote; else quote
            if (value.equalsIgnoreCase("true") || value.equalsIgnoreCase("false") || isNumeric(value)) {
                sb.append(value);
            } else {
                sb.append("\"").append(value).append("\"");
            }
            
            if (i < pairs.length - 1) {
                sb.append(",");
            }
            sb.append("\n");
        }
        sb.append("}");
        return sb.toString();
    }
    
    private static boolean isNumeric(String str) {
        if (str == null || str.isEmpty()) return false;
        try {
            Double.parseDouble(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
```

---

# PATTERN 21: URL & QUERY STRING PARSING (ADTECH TRACKING PAYLOADS)

### 1. Recognition Clues (Reported DeltaX Theme)
* "Extract query parameters from an ad tracking URL."
* "Handle URL-encoded characters (e.g., `%20` $\rightarrow$ space, `%26` $\rightarrow$ `&`)."
* "Group parameters where keys can have multiple values (e.g., `tag=tech&tag=hiring`)."

### 2. Implementation Code

#### Python Implementation (URL Query String Parser with Multi-Values)
```python
def parse_query_string(url: str) -> dict[str, list[str]]:
    """
    Parses tracking URL query parameters into a dictionary mapping keys to lists of values.
    Handles URL percent-decoding for %20, %26, %3D.
    e.g. "https://track.deltax.com/click?campaign=2026&source=meta&source=google&q=ad%20tech"
    """
    if "?" not in url:
        return {}
        
    query_part = url.split("?", 1)[1]
    # Strip any URL fragment identifier (#)
    if "#" in query_part:
        query_part = query_part.split("#", 1)[0]
        
    params = {}
    
    def decode_url_component(s: str) -> str:
        s = s.replace("%20", " ").replace("%26", "&").replace("%3D", "=").replace("+", " ")
        return s

    for pair in query_part.split("&"):
        if not pair:
            continue
        if "=" in pair:
            key, val = pair.split("=", 1)
        else:
            key, val = pair, ""
            
        clean_key = decode_url_component(key)
        clean_val = decode_url_component(val)
        
        if clean_key not in params:
            params[clean_key] = []
        params[clean_key].append(clean_val)
        
    return params
```

### 3. Five Practice Exercises
1. Validate IPv4 and IPv6 Address (LeetCode 468).
2. URL Query String Parser with URL Decoded Entities.
3. Roman to Integer & Integer to Roman.
4. Basic Calculator II (Evaluate arithmetic expression string with `+`, `-`, `*`, `/`).
5. Custom Delimited Key-Value Parser to Hierarchical Structure.
