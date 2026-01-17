+++
title = "Introduction to Category Theory"
description = "Discover the elegant mathematical language that unifies algebra, topology, logic, and computer science."
date = 2024-01-15
weight = 1
template = "docs/page.html"

[taxonomies]
tags = ["foundations", "introduction", "category"]

[extra]
lead = "Category theory is the mathematics of structure and composition. It provides a universal language for describing patterns that appear across seemingly unrelated areas of mathematics and computer science."
math = true
toc = true
+++

## What is Category Theory?

Category theory, often called "the mathematics of mathematics," was introduced by Samuel Eilenberg and Saunders Mac Lane in 1945 whilst studying algebraic topology (Eilenberg and Mac Lane, 1945). What began as a technical tool has blossomed into a fundamental framework that reveals deep connections across all of mathematics.

<div class="key-insight" style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-left: 4px solid #0ea5e9; padding: 1.5rem; margin: 1.5rem 0; border-radius: 0 8px 8px 0;">

**The Central Philosophy:** Category theory studies mathematical structures not by examining their internal details, but by observing how they relate to other structures through mappings called *morphisms*. This external, relational perspective often reveals properties invisible from within.

</div>

## The Three Pillars

A **category** $\mathcal{C}$ consists of three fundamental components:

### 1. Objects

Objects are the "things" in our category. We denote objects with capital letters: $A$, $B$, $C$, etc.

<svg class="category-diagram" viewBox="0 0 400 120" style="max-width: 400px; margin: 1.5rem auto; display: block;">
  <defs>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <!-- Object A -->
  <g class="category-object" transform="translate(60, 60)">
    <circle r="28" fill="#fff" stroke="#6366f1" stroke-width="2.5" filter="url(#glow)"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="20">A</text>
  </g>
  <!-- Object B -->
  <g class="category-object" transform="translate(200, 60)">
    <circle r="28" fill="#fff" stroke="#6366f1" stroke-width="2.5" filter="url(#glow)"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="20">B</text>
  </g>
  <!-- Object C -->
  <g class="category-object" transform="translate(340, 60)">
    <circle r="28" fill="#fff" stroke="#6366f1" stroke-width="2.5" filter="url(#glow)"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="20">C</text>
  </g>
</svg>

<p style="text-align: center; color: #64748b; font-size: 0.9rem; margin-top: -0.5rem;">
<em>Figure 1:</em> Three objects in a category, represented as nodes.
</p>

Crucially, we make **no assumptions** about the internal structure of objects. An object could be a set, a group, a topological space, a data type, or any mathematical structure—the category axioms treat them all uniformly.

### 2. Morphisms (Arrows)

A **morphism** (or **arrow**) $f: A \to B$ represents a structure-preserving map from object $A$ to object $B$. We call $A$ the **domain** and $B$ the **codomain**.

<svg class="category-diagram" viewBox="0 0 400 120" style="max-width: 400px; margin: 1.5rem auto; display: block;">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
  </defs>
  <!-- Object A -->
  <g class="category-object" transform="translate(80, 60)">
    <circle r="28" fill="#fff" stroke="#6366f1" stroke-width="2.5"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="20">A</text>
  </g>
  <!-- Arrow f -->
  <g class="morphism-arrow">
    <path d="M 115 60 L 205 60" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
    <text x="160" y="45" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="16">f</text>
  </g>
  <!-- Object B -->
  <g class="category-object" transform="translate(240, 60)">
    <circle r="28" fill="#fff" stroke="#6366f1" stroke-width="2.5"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="20">B</text>
  </g>
</svg>

<p style="text-align: center; color: #64748b; font-size: 0.9rem; margin-top: -0.5rem;">
<em>Figure 2:</em> A morphism $f$ from object $A$ to object $B$.
</p>

For any two objects $A$ and $B$, the collection of all morphisms from $A$ to $B$ is denoted $\text{Hom}_{\mathcal{C}}(A, B)$ or simply $\mathcal{C}(A, B)$.

### 3. Composition

The defining feature of categories is **composition**: given morphisms $f: A \to B$ and $g: B \to C$, there exists a composite morphism $g \circ f: A \to C$.

<svg class="commutative-diagram composition-diagram" viewBox="0 0 450 180" style="max-width: 450px; margin: 1.5rem auto; display: block;">
  <defs>
    <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
    <marker id="arrowhead-composed" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1"/>
    </marker>
  </defs>
  <!-- Object A -->
  <g class="category-object" transform="translate(60, 90)">
    <circle r="28" fill="#fff" stroke="#6366f1" stroke-width="2.5"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="20">A</text>
  </g>
  <!-- Object B -->
  <g class="category-object" transform="translate(225, 90)">
    <circle r="28" fill="#fff" stroke="#6366f1" stroke-width="2.5"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="20">B</text>
  </g>
  <!-- Object C -->
  <g class="category-object" transform="translate(390, 90)">
    <circle r="28" fill="#fff" stroke="#6366f1" stroke-width="2.5"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="20">C</text>
  </g>
  <!-- Arrow f: A → B -->
  <g class="morphism-arrow arrow-f">
    <path d="M 95 90 L 190 90" stroke="#10b981" stroke-width="2.5" fill="none" marker-end="url(#arrowhead2)"/>
    <text x="142" y="75" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="16" fill="#10b981">f</text>
  </g>
  <!-- Arrow g: B → C -->
  <g class="morphism-arrow arrow-g">
    <path d="M 260 90 L 355 90" stroke="#f59e0b" stroke-width="2.5" fill="none" marker-end="url(#arrowhead2)"/>
    <text x="307" y="75" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="16" fill="#f59e0b">g</text>
  </g>
  <!-- Composed arrow g∘f: A → C (curved above) -->
  <g class="morphism-arrow arrow-composed">
    <path d="M 85 65 Q 225 10 365 65" stroke="#6366f1" stroke-width="2.5" fill="none" stroke-dasharray="6,3" marker-end="url(#arrowhead-composed)"/>
    <text x="225" y="25" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="16" fill="#6366f1">g ∘ f</text>
  </g>
</svg>

<p style="text-align: center; color: #64748b; font-size: 0.9rem; margin-top: -0.5rem;">
<em>Figure 3:</em> Composition of morphisms. The dashed arrow represents $g \circ f$.
</p>

<div class="definition-box" style="background: #fefce8; border: 1px solid #facc15; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">

**Definition (Composition):** For morphisms $f: A \to B$ and $g: B \to C$, the **composite** $g \circ f: A \to C$ is defined such that:
$$g \circ f = g(f(-))$$
Read "$g$ after $f$" — we apply $f$ first, then $g$.

</div>

## The Category Axioms

For a collection of objects and morphisms to form a valid category, two fundamental axioms must hold:

### Axiom 1: Associativity of Composition

For any morphisms $f: A \to B$, $g: B \to C$, and $h: C \to D$:

$$(h \circ g) \circ f = h \circ (g \circ f)$$

<svg class="commutative-diagram" viewBox="0 0 500 200" style="max-width: 500px; margin: 1.5rem auto; display: block;">
  <defs>
    <marker id="arrowhead3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
  </defs>
  <!-- Objects -->
  <g class="category-object" transform="translate(50, 100)">
    <circle r="25" fill="#fff" stroke="#6366f1" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="18">A</text>
  </g>
  <g class="category-object" transform="translate(175, 100)">
    <circle r="25" fill="#fff" stroke="#6366f1" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="18">B</text>
  </g>
  <g class="category-object" transform="translate(300, 100)">
    <circle r="25" fill="#fff" stroke="#6366f1" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="18">C</text>
  </g>
  <g class="category-object" transform="translate(425, 100)">
    <circle r="25" fill="#fff" stroke="#6366f1" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="18">D</text>
  </g>
  <!-- Arrows -->
  <path d="M 80 100 L 145 100" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead3)" class="morphism-arrow"/>
  <text x="112" y="85" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="14">f</text>

  <path d="M 205 100 L 270 100" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead3)" class="morphism-arrow"/>
  <text x="237" y="85" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="14">g</text>

  <path d="M 330 100 L 395 100" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead3)" class="morphism-arrow"/>
  <text x="362" y="85" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="14">h</text>

  <!-- Composed paths -->
  <path d="M 70 78 Q 175 40 280 78" stroke="#10b981" stroke-width="2" fill="none" stroke-dasharray="4,2" marker-end="url(#arrowhead3)" class="morphism-arrow"/>
  <text x="175" y="45" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="12" fill="#10b981">g ∘ f</text>

  <path d="M 195 78 Q 300 40 405 78" stroke="#f59e0b" stroke-width="2" fill="none" stroke-dasharray="4,2" marker-end="url(#arrowhead3)" class="morphism-arrow"/>
  <text x="300" y="45" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="12" fill="#f59e0b">h ∘ g</text>

  <path d="M 65 130 Q 250 190 410 130" stroke="#6366f1" stroke-width="2.5" fill="none" marker-end="url(#arrowhead3)" class="morphism-arrow"/>
  <text x="237" y="175" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="14" fill="#6366f1">h ∘ g ∘ f</text>
</svg>

<p style="text-align: center; color: #64748b; font-size: 0.9rem; margin-top: -0.5rem;">
<em>Figure 4:</em> Associativity means we can compose in any order — the result is the same.
</p>

This axiom tells us that parentheses don't matter when composing morphisms. We can write $h \circ g \circ f$ without ambiguity.

### Axiom 2: Identity Morphisms

For every object $A$, there exists an **identity morphism** $\text{id}_A: A \to A$ such that for any $f: A \to B$:

$$f \circ \text{id}_A = f = \text{id}_B \circ f$$

<svg class="category-diagram" viewBox="0 0 400 160" style="max-width: 400px; margin: 1.5rem auto; display: block;">
  <defs>
    <marker id="arrowhead4" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
    <marker id="arrowhead-id" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1"/>
    </marker>
  </defs>
  <!-- Object A -->
  <g class="category-object" transform="translate(100, 80)">
    <circle r="30" fill="#fff" stroke="#6366f1" stroke-width="2.5"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="20">A</text>
  </g>
  <!-- Identity loop on A -->
  <path d="M 85 52 C 40 20 40 140 85 108" stroke="#6366f1" stroke-width="2" fill="none" marker-end="url(#arrowhead-id)" class="morphism-arrow"/>
  <text x="30" y="80" text-anchor="middle" font-family="KaTeX_Math, serif" font-size="14" fill="#6366f1">id<tspan baseline-shift="sub" font-size="10">A</tspan></text>

  <!-- Arrow f: A → B -->
  <path d="M 135 80 L 235 80" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead4)" class="morphism-arrow"/>
  <text x="185" y="65" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="16">f</text>

  <!-- Object B -->
  <g class="category-object" transform="translate(270, 80)">
    <circle r="30" fill="#fff" stroke="#6366f1" stroke-width="2.5"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="20">B</text>
  </g>
  <!-- Identity loop on B -->
  <path d="M 285 52 C 330 20 330 140 285 108" stroke="#6366f1" stroke-width="2" fill="none" marker-end="url(#arrowhead-id)" class="morphism-arrow"/>
  <text x="340" y="80" text-anchor="middle" font-family="KaTeX_Math, serif" font-size="14" fill="#6366f1">id<tspan baseline-shift="sub" font-size="10">B</tspan></text>
</svg>

<p style="text-align: center; color: #64748b; font-size: 0.9rem; margin-top: -0.5rem;">
<em>Figure 5:</em> Identity morphisms act as "do nothing" operations — they leave other morphisms unchanged under composition.
</p>

## Examples of Categories

Category theory's power lies in its generality. Here are some fundamental examples:

### **Set** — The Category of Sets

| Component | Description |
|-----------|-------------|
| **Objects** | Sets (collections of elements) |
| **Morphisms** | Functions between sets |
| **Composition** | Function composition: $(g \circ f)(x) = g(f(x))$ |
| **Identity** | Identity function: $\text{id}_A(x) = x$ |

This is perhaps the most intuitive category, and many concepts in category theory can be understood by first considering how they work in **Set**.

### **Grp** — The Category of Groups

| Component | Description |
|-----------|-------------|
| **Objects** | Groups (sets with associative binary operation, identity, inverses) |
| **Morphisms** | Group homomorphisms (structure-preserving maps) |
| **Composition** | Composition of homomorphisms |
| **Identity** | Identity homomorphism |

### **Vect**$_K$ — The Category of Vector Spaces

| Component | Description |
|-----------|-------------|
| **Objects** | Vector spaces over field $K$ |
| **Morphisms** | Linear transformations |
| **Composition** | Composition of linear maps |
| **Identity** | Identity transformation |

### **Hask** — The Category of Haskell Types

| Component | Description |
|-----------|-------------|
| **Objects** | Haskell types (`Int`, `String`, `[a]`, etc.) |
| **Morphisms** | Pure functions `a -> b` |
| **Composition** | Function composition: `(g . f) x = g (f x)` |
| **Identity** | `id :: a -> a` where `id x = x` |

<div class="code-example" style="margin: 1.5rem 0;">

```haskell
-- Composition in Haskell mirrors categorical composition
(.) :: (b -> c) -> (a -> b) -> (a -> c)
(g . f) x = g (f x)

-- Identity function
id :: a -> a
id x = x

-- The category laws hold:
-- f . id  ≡  f
-- id . f  ≡  f
-- (h . g) . f  ≡  h . (g . f)
```

</div>

## Why Category Theory Matters

<div class="benefits-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 2rem 0;">

<div class="benefit-card" style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 1.5rem; border-radius: 12px; border-left: 4px solid #22c55e;">

**Unification**

Category theory reveals that seemingly different mathematical structures often share the same underlying patterns. A theorem proved categorically applies to all instances simultaneously.

</div>

<div class="benefit-card" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 1.5rem; border-radius: 12px; border-left: 4px solid #f59e0b;">

**Abstraction**

By working at the level of morphisms rather than elements, we capture the essential structure whilst ignoring irrelevant details. This leads to cleaner, more reusable mathematical arguments.

</div>

<div class="benefit-card" style="background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%); padding: 1.5rem; border-radius: 12px; border-left: 4px solid #8b5cf6;">

**Composition**

The emphasis on composition as the fundamental operation aligns perfectly with modular design in software engineering. Complex systems are built by composing simple parts.

</div>

<div class="benefit-card" style="background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); padding: 1.5rem; border-radius: 12px; border-left: 4px solid #ec4899;">

**Language**

Category theory provides a precise vocabulary for discussing abstract concepts. Terms like "functor," "natural transformation," and "adjunction" have exact meanings that facilitate clear communication.

</div>

</div>

## What's Next?

In the following sections, we shall explore:

1. **[Morphisms in Depth](/concepts/foundations/morphisms/)** — Special types of morphisms: isomorphisms, monomorphisms, and epimorphisms
2. **[Commutative Diagrams](/concepts/foundations/diagrams/)** — The visual language of category theory
3. **[Functors](/concepts/functors/)** — Structure-preserving maps between categories

---

## References

<div class="references" style="font-size: 0.9rem; line-height: 1.8; border-top: 1px solid #e2e8f0; padding-top: 1.5rem; margin-top: 2rem;">

Awodey, S. (2010) *Category Theory*. 2nd edn. Oxford: Oxford University Press.

Eilenberg, S. and Mac Lane, S. (1945) 'General theory of natural equivalences', *Transactions of the American Mathematical Society*, 58(2), pp. 231–294. doi: 10.2307/1990284.

Leinster, T. (2014) *Basic Category Theory*. Cambridge: Cambridge University Press. Available at: https://arxiv.org/abs/1612.09375.

Mac Lane, S. (1998) *Categories for the Working Mathematician*. 2nd edn. New York: Springer-Verlag.

Milewski, B. (2019) *Category Theory for Programmers*. Available at: https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/.

Riehl, E. (2016) *Category Theory in Context*. Aurora: Dover Publications. Available at: https://math.jhu.edu/~eriehl/context.pdf.

</div>
