# DeltaX Round 1 Question Bank: Object-Oriented Programming (50 MCQs)

---

### Q1
Which OOP principle is implemented by binding data members and the functions that manipulate them into a single coherent unit while restricting direct external access?
- A) Abstraction
- B) Encapsulation
- C) Polymorphism
- D) Dynamic Binding
**Correct Answer**: B
**Explanation**: Encapsulation bundles data and methods while restricting direct access to internal components (via private fields and public getters/setters), safeguarding internal state.
**Topic**: OOP Pillars
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q2
What mechanism allows the same method name to exhibit different behaviors at runtime based on the actual object instance invoking it?
- A) Method Overloading
- B) Method Overriding (Runtime Polymorphism)
- C) Encapsulation
- D) Data Hiding
**Correct Answer**: B
**Explanation**: Runtime Polymorphism (dynamic method dispatch) executes the subclass's overridden method rather than the base class method when invoked via a superclass reference.
**Topic**: Polymorphism
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q3
Which of the following method declarations in the same Java class constitutes valid Method Overloading for `public int calculate(int x, double y)`?
- A) `public double calculate(int x, double y)`
- B) `public int calculate(double y, int x)`
- C) `private int calculate(int a, double b)`
- D) `public void calculate(int x, double y)`
**Correct Answer**: B
**Explanation**: Method overloading requires a different parameter signature (type, number, or order of parameters). Changing only the return type (A, D) or access modifier/parameter names (C) results in a compile-time error.
**Topic**: Polymorphism & Overloading
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q4
What data structure is utilized under the hood in C++ to achieve runtime dynamic dispatch for virtual functions?
- A) Hash Table
- B) Virtual Method Table (vtable) and Virtual Pointer (vptr)
- C) Priority Queue
- D) Red-Black Tree
**Correct Answer**: B
**Explanation**: The compiler generates a static vtable containing function pointers to virtual methods for each class, and injects a hidden `vptr` inside each object instance pointing to its class's vtable.
**Topic**: OOP Internals
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q5
What is the primary difference between an Abstract Class and an Interface in Java (prior to Java 8)?
- A) Abstract classes can have instance variables and constructors; interfaces could only declare public static final constants and abstract method signatures
- B) An abstract class can be instantiated; an interface cannot
- C) Interfaces support single inheritance; abstract classes support multiple inheritance
- D) Abstract classes cannot contain concrete methods
**Correct Answer**: A
**Explanation**: Abstract classes can maintain mutable instance state and define constructors for subclass initialization. Classic interfaces cannot store state or declare constructors.
**Topic**: Abstract Classes vs Interfaces
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q6
Why should base class destructors always be declared `virtual` in C++ when polymorphism is used?
- A) To increase execution speed
- B) To ensure that when an object of a derived class is deleted through a base class pointer, the derived class destructor is invoked, preventing memory leaks
- C) To make derived classes abstract
- D) To prevent inheritance
**Correct Answer**: B
**Explanation**: Without a virtual destructor, `delete basePtr` only calls the base destructor, leaking memory and resources allocated in the derived object.
**Topic**: C++ OOP
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q7
What is the "Diamond Problem" in object-oriented programming?
- A) An algorithm for garbage collection
- B) Ambiguity that arises in multiple inheritance when a class inherits from two parent classes that both derive from a common ancestor
- C) A cryptographic encryption design pattern
- D) A method of indexing balanced trees
**Correct Answer**: B
**Explanation**: When class D inherits from B and C, which both inherit from A, D receives two duplicate copies of A's members, leading to compiler ambiguity. C++ resolves this via `virtual inheritance`.
**Topic**: Inheritance
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q8
Which software design principle states: "Software entities (classes, modules, functions) should be open for extension, but closed for modification"?
- A) Single Responsibility Principle
- B) Open/Closed Principle (OCP)
- C) Liskov Substitution Principle
- D) Interface Segregation Principle
**Correct Answer**: B
**Explanation**: The Open/Closed Principle (the 'O' in SOLID) encourages building systems where new functionality is added by creating new subclasses or implementing interfaces, without modifying tested existing code.
**Topic**: SOLID Principles
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q9
What relationship between classes is modeled by Object Composition?
- A) "Is-A" relationship
- B) "Has-A" relationship
- C) "Inherits-From" relationship
- D) "Implements-Contract" relationship
**Correct Answer**: B
**Explanation**: Composition models "Has-A" (e.g., A Car *has a* Engine). Inheritance models "Is-A" (e.g., A Car *is a* Vehicle).
**Topic**: Composition vs Inheritance
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q10
Can a constructor be declared `final`, `static`, or `abstract` in Java?
- A) Yes, all three are permitted
- B) Only `final` is permitted
- C) No, constructors cannot be final, static, or abstract
- D) Only `static` is permitted
**Correct Answer**: C
**Explanation**: Constructors cannot be inherited (so `final` is meaningless), belong to instances during object creation (so cannot be `static`), and must construct actual memory (so cannot be `abstract`).
**Topic**: Constructors
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q11
What will happen in the following Java snippet?
```java
class Parent {
    public void print() { System.out.print("P"); }
}
class Child extends Parent {
    public void print() { System.out.print("C"); }
}
public class Test {
    public static void main(String[] args) {
        Parent obj = new Child();
        obj.print();
    }
}
```
- A) Prints "P"
- B) Prints "C"
- C) Compilation Error
- D) Runtime Exception
**Correct Answer**: B
**Explanation**: In Java, all non-static methods are virtual by default. Dynamic method dispatch resolves `obj.print()` to the actual runtime object type (`Child`), outputting "C".
**Topic**: Polymorphism
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q12
What is the output of the following Java code?
```java
class A {
    static void display() { System.out.print("A"); }
}
class B extends A {
    static void display() { System.out.print("B"); }
}
public class Test {
    public static void main(String[] args) {
        A obj = new B();
        obj.display();
    }
}
```
- A) Prints "A"
- B) Prints "B"
- C) Compilation Error
- D) Prints "AB"
**Correct Answer**: A
**Explanation**: Static methods cannot be overridden; they are **hidden** (Method Hiding). Resolution is resolved at compile time based on the declared reference type (`A`), printing "A".
**Topic**: Static Methods & Hiding
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q13
What is the purpose of the `super()` keyword inside a subclass constructor in Java?
- A) Calls the Garbage Collector
- B) Explicitly invokes the constructor of the immediate superclass to initialize inherited fields
- C) Overrides parent class methods
- D) Prevents memory leaks
**Correct Answer**: B
**Explanation**: `super()` invokes the parent class constructor and must be the very first statement inside the subclass constructor.
**Topic**: Constructors
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q14
What is the Liskov Substitution Principle (LSP)?
- A) A class should have only one reason to change
- B) Subtypes must be substitutable for their base types without altering the correctness or intended behavior of the program
- C) Interfaces should be small and cohesive
- D) High-level modules should not depend on low-level modules
**Correct Answer**: B
**Explanation**: LSP (the 'L' in SOLID) requires that derived classes uphold all contracts, preconditions, and postconditions established by the base class.
**Topic**: SOLID Principles
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q15
What happens if you do not provide any constructor in a newly defined Java class?
- A) The class cannot be instantiated
- B) The Java compiler automatically inserts a default no-argument constructor with an empty body
- C) Compilation error occurs
- D) Memory allocation fails
**Correct Answer**: B
**Explanation**: If no explicit constructor is defined, the compiler injects a default parameterless constructor. If you define ANY custom constructor, the default constructor is suppressed.
**Topic**: Constructors
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q16
What happens if a concrete class implements an interface but fails to implement one of the interface's abstract methods?
- A) The program runs and returns null for that method
- B) The class fails to compile unless the class itself is declared `abstract`
- C) The method is automatically generated by the runtime
- D) A runtime `NoSuchMethodError` occurs
**Correct Answer**: B
**Explanation**: Any concrete class implementing an interface must provide implementations for all abstract methods; otherwise, the compiler enforces that the class be declared `abstract`.
**Topic**: Abstract Classes & Interfaces
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q17
Which access modifier provides the widest visibility in Java?
- A) `private`
- B) Default (package-private)
- C) `protected`
- D) `public`
**Correct Answer**: D
**Explanation**: `public` members are accessible from anywhere. `protected` is accessible within the package and subclasses. Default is package-only. `private` is within the declaring class only.
**Topic**: Access Modifiers
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q18
What is the output of the following Java snippet?
```java
class Base {
    Base() { System.out.print("B"); }
}
class Derived extends Base {
    Derived() { System.out.print("D"); }
}
public class Test {
    public static void main(String[] args) {
        new Derived();
    }
}
```
- A) Prints "D"
- B) Prints "BD"
- C) Prints "DB"
- D) Compilation Error
**Correct Answer**: B
**Explanation**: Subclass constructors implicitly call `super()` as their first statement. Therefore, the `Base` constructor executes first ("B"), followed by the `Derived` constructor body ("D"), outputting "BD".
**Topic**: Constructor Chaining
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q19
In Java, which method of the `Object` class must be overridden alongside `equals(Object o)` to ensure correct behavior in hash-based collections like `HashSet` and `HashMap`?
- A) `toString()`
- B) `hashCode()`
- C) `clone()`
- D) `finalize()`
**Correct Answer**: B
**Explanation**: The `equals-hashCode` contract specifies: if two objects are equal according to `equals()`, their `hashCode()` must return identical integer values.
**Topic**: Object Class Contracts
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q20
What is the effect of declaring a class `final` in Java?
- A) The class cannot be instantiated
- B) The class cannot be subclassed (inherited from)
- C) All methods of the class automatically become private
- D) The class is garbage collected immediately after creation
**Correct Answer**: B
**Explanation**: A `final` class cannot be extended. Examples in the standard Java library include `java.lang.String` and primitive wrappers (`Integer`, `Double`).
**Topic**: Keywords
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q21
Which design pattern ensures that a class has only one instance and provides a global access point to it?
- A) Factory Pattern
- B) Singleton Pattern
- C) Observer Pattern
- D) Adapter Pattern
**Correct Answer**: B
**Explanation**: The Singleton pattern restricts class instantiation to a single object, typically implemented using a private constructor, private static instance, and public static accessor method.
**Topic**: Design Patterns
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q22
In C++, what type of inheritance prevents multiple duplicate base class instances in a diamond inheritance hierarchy?
- A) Private Inheritance
- B) Virtual Inheritance
- C) Multiple Inheritance
- D) Protected Inheritance
**Correct Answer**: B
**Explanation**: `class B : virtual public A` ensures that only one shared instance of the common ancestor `A` is incorporated into the derived class `D`.
**Topic**: C++ Inheritance
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q23
What is "Data Hiding" in OOP?
- A) Storing files in hidden operating system folders
- B) Restricting internal variable access through `private` access modifiers to prevent unauthorized external state corruption
- C) Encrypting databases
- D) Deleting unused variables
**Correct Answer**: B
**Explanation**: Data hiding is the practice of concealing internal object representation, forcing external code to interact strictly through validated interface methods.
**Topic**: Encapsulation
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q24
What is the difference between Aggregation and Composition?
- A) Aggregation is an "Is-A" relationship; Composition is a "Has-A" relationship
- B) Composition represents strong ownership where child objects cannot exist independently of the parent; Aggregation represents weak ownership where child objects can exist independently
- C) Aggregation requires interfaces; Composition requires abstract classes
- D) There is no difference
**Correct Answer**: B
**Explanation**: In Composition (e.g., Building and Rooms), destroying the parent destroys the child. In Aggregation (e.g., Department and Teachers), teachers continue to exist even if the department dissolves.
**Topic**: OOP Relationships
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q25
Which OOP principle is demonstrated when an audio player interface provides a single `play()` method that works for MP3, WAV, and FLAC file implementations without caller modification?
- A) Polymorphism
- B) Multiple Inheritance
- C) Serialization
- D) Reflection
**Correct Answer**: A
**Explanation**: Polymorphism allows callers to invoke the uniform method `play()` on any conforming audio object without needing to know or branch on the underlying concrete audio format.
**Topic**: Polymorphism
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q26
What will happen if a subclass attempts to override a `final` method defined in its superclass?
- A) The method is successfully overridden
- B) Compile-time error occurs
- C) A warning is generated and the parent method is hidden
- D) Runtime exception occurs
**Correct Answer**: B
**Explanation**: The `final` keyword explicitly prohibits method overriding; attempting to override a final method generates a compilation error.
**Topic**: Keywords
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q27
What is an "Immutable Object" in object-oriented programming?
- A) An object that cannot be instantiated
- B) An object whose internal state cannot be modified after it is constructed
- C) An object without any member methods
- D) An object that persists in memory indefinitely
**Correct Answer**: B
**Explanation**: Immutable objects (such as `java.lang.String` or record classes) have read-only fields and return new objects upon modification, making them inherently thread-safe.
**Topic**: Immutability
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q28
What is the effect of declaring a method `protected` in a Java class?
- A) Accessible only within the declaring class
- B) Accessible within the same package and by subclasses even if they reside in different packages
- C) Accessible universally from any package
- D) Inaccessible to any other class
**Correct Answer**: B
**Explanation**: `protected` grants package-private access plus access to child classes in foreign packages via inheritance.
**Topic**: Access Modifiers
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q29
What is the purpose of the Copy Constructor in C++?
- A) To create an exact duplicate object by copying member fields from an existing object of the same class
- B) To copy files on disk
- C) To instantiate arrays
- D) To clean up heap memory
**Correct Answer**: A
**Explanation**: A copy constructor (`ClassName(const ClassName &obj)`) initializes a new object using an existing object's state, preventing shallow copy double-free bugs for heap pointers.
**Topic**: C++ Constructors
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q30
What is the difference between Shallow Copy and Deep Copy?
- A) Shallow copy copies primitive values; Deep copy does not
- B) Shallow copy duplicates object references, meaning nested objects are shared; Deep copy recursively duplicates the referenced objects, creating fully independent copies
- C) Deep copy is faster than shallow copy
- D) Shallow copy uses serialization
**Correct Answer**: B
**Explanation**: Shallow copy replicates top-level pointer references (modifying nested fields affects both copies). Deep copy allocates independent heap copies of all referenced sub-objects.
**Topic**: Object Cloning
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q31
Can you instantiate an abstract class directly using the `new` keyword?
- A) Yes, always
- B) No, an abstract class cannot be instantiated directly; it must be extended by a concrete subclass
- C) Yes, if it has a constructor
- D) Only in C++
**Correct Answer**: B
**Explanation**: Abstract classes are incomplete blueprints and cannot be instantiated directly with `new AbstractClass()`.
**Topic**: Abstract Classes
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q32
What is the purpose of the Java keyword `instanceof`?
- A) Instantiating a new class
- B) Testing whether an object reference is an instance of a specific class, subclass, or interface at runtime
- C) Calculating memory footprint
- D) Generating a hash code
**Correct Answer**: B
**Explanation**: `instanceof` evaluates to boolean `true` if the referenced object matches the specified target type in its inheritance hierarchy.
**Topic**: Type Checking
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q33
What is the output of the following Java snippet?
```java
String s1 = "DeltaX";
String s2 = "DeltaX";
String s3 = new String("DeltaX");
System.out.print((s1 == s2) + " " + (s1 == s3) + " " + s1.equals(s3));
```
- A) `true true true`
- B) `true false true`
- C) `false false true`
- D) `false true true`
**Correct Answer**: B
**Explanation**: `s1` and `s2` refer to the exact same pooled literal in the String Constant Pool (`s1 == s2` is true). `s3` creates a distinct object in heap memory (`s1 == s3` is false). `equals()` compares character content (`true`).
**Topic**: String Internals & Memory
**Difficulty**: Medium
**Source Classification**: DIRECTLY REPORTED

---

### Q34
What is the difference between Compile-Time Polymorphism and Runtime Polymorphism?
- A) Compile-time uses interfaces; Runtime uses abstract classes
- B) Compile-time (Method Overloading) is resolved by the compiler based on method signatures; Runtime (Method Overriding) is resolved dynamically during program execution based on the actual object instance
- C) Compile-time is slower than runtime
- D) Runtime polymorphism cannot be debugged
**Correct Answer**: B
**Explanation**: Compile-time polymorphism relies on static binding by the compiler; runtime polymorphism relies on dynamic dispatch via object vtables at execution time.
**Topic**: Polymorphism
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q35
Can an interface in Java 8+ contain implemented concrete methods?
- A) No, interfaces can only contain abstract signatures
- B) Yes, via `default` methods and `static` methods
- C) Yes, but only private methods
- D) Only if the interface extends an abstract class
**Correct Answer**: B
**Explanation**: Java 8 introduced `default` methods (to enable interface evolution with backward compatibility) and `static` utility methods within interface definitions.
**Topic**: Interfaces
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q36
What happens if a class implements two interfaces that both declare identical `default` methods with the same signature?
- A) The compiler picks the first interface alphabetically
- B) A compilation error occurs (Diamond Conflict) unless the implementing class explicitly overrides the conflicting method
- C) The runtime throws an exception
- D) Both methods execute sequentially
**Correct Answer**: B
**Explanation**: The compiler refuses to pick an arbitrary default implementation and enforces an explicit override in the implementing class using `InterfaceName.super.methodName()`.
**Topic**: Interfaces
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q37
What does the `this` keyword refer to inside an instance method in Java/C++?
- A) The parent class
- B) The current object instance executing the method
- C) The static class definition
- D) The global namespace
**Correct Answer**: B
**Explanation**: `this` is an implicit reference (or pointer in C++) pointing to the current invoking instance, used to resolve shadowing between instance fields and local parameters.
**Topic**: Keywords
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q38
What is the purpose of an Interface in Object-Oriented Design?
- A) To define database schemas
- B) To establish a formal behavioral contract specifying what methods a class must implement, decoupling callers from concrete implementations
- C) To speed up execution time
- D) To compress bytecode
**Correct Answer**: B
**Explanation**: Interfaces provide pure abstraction, decoupling callers from concrete dependencies and enabling modular, interchangeable software components.
**Topic**: Interfaces
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q39
In C++, what is a "Pure Virtual Function"?
- A) A virtual function that has no parameters
- B) A virtual function declared with `= 0` that has no implementation in the base class, making the base class abstract
- C) A function that cannot be overridden
- D) A function that executes only in constructor bodies
**Correct Answer**: B
**Explanation**: Syntax `virtual void draw() = 0;` designates a pure virtual function. Any class containing at least one pure virtual function cannot be instantiated.
**Topic**: C++ OOP
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q40
What is Constructor Chaining?
- A) Calling constructors from multiple threads
- B) The process of calling one constructor from another constructor within the same class (using `this()`) or from the parent class (using `super()`)
- C) Creating an array of constructors
- D) Encrypting constructor parameters
**Correct Answer**: B
**Explanation**: Constructor chaining allows constructors to delegate common initialization code to other overloaded constructors, reducing code duplication.
**Topic**: Constructors
**Difficulty**: Easy
**Source Classification**: REPEATED PATTERN

---

### Q41
What is the Dependency Inversion Principle (DIP)?
- A) Derived classes must inherit all parent methods
- B) High-level modules should not depend on low-level modules; both should depend on abstractions (interfaces)
- C) Constructors must never accept arguments
- D) Avoid using third-party libraries
**Correct Answer**: B
**Explanation**: DIP (the 'D' in SOLID) decouples high-level business policies from low-level implementation details through shared abstract interfaces.
**Topic**: SOLID Principles
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q42
Which access modifier should be used for member variables to achieve strict Encapsulation?
- A) `public`
- B) `private`
- C) `protected`
- D) package-private
**Correct Answer**: B
**Explanation**: Strict encapsulation dictates that internal data fields be declared `private`, accessible only via controlled public accessors/mutators.
**Topic**: Encapsulation
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q43
What is the purpose of the `volatile` keyword in Java?
- A) To prevent an object from being modified
- B) To ensure that changes to a variable are always flushed to and read directly from main memory rather than cached in thread-local registers
- C) To make a method synchronized
- D) To serialize objects
**Correct Answer**: B
**Explanation**: `volatile` guarantees memory visibility across multiple threads, preventing thread caches from reading stale variables without incurring monitor lock overhead.
**Topic**: Concurrency & OOP
**Difficulty**: Hard
**Source Classification**: REPEATED PATTERN

---

### Q44
What is the difference between an Abstract Class and a Concrete Class?
- A) An abstract class can be instantiated; a concrete class cannot
- B) An abstract class can declare unimplemented abstract methods and cannot be instantiated directly; a concrete class provides implementations for all methods and can be instantiated
- C) Concrete classes cannot inherit from other classes
- D) Abstract classes cannot have member variables
**Correct Answer**: B
**Explanation**: Abstract classes can contain abstract method declarations and cannot be instantiated with `new`. Concrete classes provide complete implementations for all methods.
**Topic**: Abstract Classes
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q45
Why does Java NOT support Multiple Inheritance through classes?
- A) Because the JVM cannot allocate enough memory
- B) To prevent complexity and the ambiguity of the Diamond Problem
- C) Because classes can only have one constructor
- D) Because static methods cannot be inherited
**Correct Answer**: B
**Explanation**: Java disallowed multiple class inheritance to eliminate the diamond ambiguity problem where two parent classes define colliding implementations.
**Topic**: Inheritance
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q46
What is the output of the following Java snippet?
```java
class Test {
    int x = 10;
    public static void main(String[] args) {
        System.out.println(x);
    }
}
```
- A) Prints 10
- B) Prints 0
- C) Compilation error: non-static variable `x` cannot be referenced from a static context
- D) Runtime Exception
**Correct Answer**: C
**Explanation**: Static methods (like `main`) belong to the class and execute without an active instance, so they cannot directly access instance variables like `x` without instantiating an object first.
**Topic**: Static Context
**Difficulty**: Easy
**Source Classification**: DIRECTLY REPORTED

---

### Q47
What design pattern allows adding new functionality to an existing object dynamically at runtime without altering its structure or using subclassing?
- A) Singleton Pattern
- B) Decorator Pattern
- C) Factory Method Pattern
- D) Prototype Pattern
**Correct Answer**: B
**Explanation**: The Decorator pattern wraps an existing object with decorator classes, adding behaviors dynamically while conforming to the original interface (e.g., `BufferedReader(new FileReader())`).
**Topic**: Design Patterns
**Difficulty**: Medium
**Source Classification**: GENERAL CS TOPIC

---

### Q48
In C++, what is an "Inline Function"?
- A) A function defined inside a struct
- B) A function where the compiler substitutes the function code directly at the call site, eliminating function call overhead
- C) A function that cannot return a value
- D) A recursive function
**Correct Answer**: B
**Explanation**: The `inline` keyword suggests the compiler replace calls with inline machine instructions, eliminating stack frame setup costs for small, frequent functions.
**Topic**: C++ Functions
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC

---

### Q49
What is the Interface Segregation Principle (ISP)?
- A) All interfaces must have at least 10 methods
- B) Clients should not be forced to depend on interfaces they do not use; large monolithic interfaces should be broken into smaller, specific ones
- C) Interfaces must not be implemented by abstract classes
- D) Interfaces should only contain public static constants
**Correct Answer**: B
**Explanation**: ISP (the 'I' in SOLID) mandates focused, granular interfaces so implementing classes aren't burdened with dummy implementations of irrelevant methods.
**Topic**: SOLID Principles
**Difficulty**: Medium
**Source Classification**: REPEATED PATTERN

---

### Q50
What happens during Garbage Collection in Java?
- A) The OS reboots the system
- B) The JVM automatically identifies and reclaims heap memory occupied by objects that are no longer reachable from any root reference
- C) Stack memory is cleared
- D) All static variables are deleted
**Correct Answer**: B
**Explanation**: Java's automatic Garbage Collector traces reference graphs from GC roots (threads, static variables, local stack pointers) and frees unreferenced heap memory.
**Topic**: Memory & Garbage Collection
**Difficulty**: Easy
**Source Classification**: GENERAL CS TOPIC
