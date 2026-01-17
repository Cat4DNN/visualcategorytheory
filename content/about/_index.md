+++
title = "About This Compendium"
description = "Learn about The Recursion Schemes Compendium: its goals, structure, and what you'll master."
template = "about/section.html"
+++

## Taming Recursion with Mathematics

**The Recursion Schemes Compendium** is your comprehensive guide to understanding, implementing, and mastering recursion schemes in functional programming. By factoring out recursion patterns into reusable abstractions, we transform ad-hoc recursive code into composable, provably correct programs.

---

## What Are Recursion Schemes?

Recursion schemes are **structured patterns for traversing and transforming recursive data structures**. Instead of writing explicit recursion, you:

1. **Describe what you want** at each layer of the structure (the algebra/coalgebra)
2. **Let the scheme handle** how to recursively apply it

This separation yields code that is:
- **More composable**: Algebras combine like Lego blocks
- **Easier to reason about**: Each piece is independently testable
- **Often more efficient**: Schemes enable fusion optimizations
- **Categorically principled**: Backed by solid mathematical foundations

---

## What Makes This Compendium Different

### From Theory to Practice

Many resources on recursion schemes are either too theoretical (category theory papers) or too shallow (blog post introductions). This compendium bridges both worlds:

- **Rigorous definitions** with categorical foundations
- **Intuitive explanations** with diagrams and examples
- **Practical code** using the `recursion-schemes` library
- **Real-world applications** in compilers, interpreters, and data processing

### Comprehensive Coverage

We cover the full spectrum of schemes:

| Foundation | Core | Extended | History-Aware | Advanced |
|------------|------|----------|---------------|----------|
| F-Algebras | Catamorphism | Paramorphism | Histomorphism | Zygomorphism |
| Fixed Points | Anamorphism | Apomorphism | Futumorphism | Mutumorphism |
| Mu/Nu | Hylomorphism | | Chronomorphism | Dynamorphism |

Plus exotic schemes: Elgot algebras, Mendler-style, prepromorphisms, and more.

### Code That Works

All code examples are tested Haskell using Edward Kmett's `recursion-schemes` library. You can copy-paste and run immediately.

---

## Who This Is For

### Functional Programmers

If you write Haskell, Scala, PureScript, or other FP languages, recursion schemes will level up your code. You'll see patterns you've written a hundred times crystallize into named, reusable abstractions.

### Compiler Writers

Recursion schemes are the natural language of AST manipulation. Constant folding? Catamorphism. Type inference? Paramorphism. Code generation? Hylomorphism. This compendium shows you how.

### Computer Science Students

For students studying programming languages, type theory, or category theory, recursion schemes provide concrete applications of abstract concepts. See functors, coalgebras, and fixed points in action.

### Curious Developers

Even if you don't write Haskell daily, understanding recursion schemes improves how you think about any recursive problem. The patterns translate to any language.

---

## Learning Outcomes

By working through this compendium, you will:

1. **Understand** the categorical foundations: functors, (co)algebras, fixed points
2. **Recognize** recursion patterns in existing code
3. **Apply** the right scheme for each problem
4. **Implement** schemes from scratch and with the library
5. **Compose** multiple schemes for complex transformations
6. **Optimize** using fusion laws and advanced techniques
7. **Design** your own algebras for domain-specific problems

---

## Compendium Structure

### Foundations
F-algebras, F-coalgebras, fixed points (Fix, Mu, Nu), and Lambek's lemma.

### Basic Schemes
Catamorphism (fold), anamorphism (unfold), and hylomorphism (refold).

### Extended Schemes
Paramorphism (fold with structure), apomorphism (unfold with early termination).

### History-Aware Schemes
Histomorphism (fold with history), futumorphism (unfold multiple layers), chronomorphism (both).

### Advanced Schemes
Zygomorphism, mutumorphism, dynamorphism, prepromorphism, and the scheme zoo.

### Practical Guide
Using the library, patterns, and real-world applications.

---

## Technical Prerequisites

To get the most from this compendium:

- **Haskell basics**: Pattern matching, algebraic data types, type classes
- **Functor familiarity**: Understanding `fmap` and the Functor laws
- **Recursive thinking**: Comfort with recursive data structures like lists and trees

Category theory knowledge is **helpful but not required**—we build up the necessary concepts as we go.

---

<div class="text-center mt-5">
  <a href="/schemes/foundations/introduction/" class="btn btn-primary btn-lg">Start Learning</a>
  <a href="/schemes/" class="btn btn-outline-primary btn-lg ms-3">Browse Schemes</a>
</div>

