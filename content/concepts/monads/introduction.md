+++
title = "Introduction to Monads"
description = "Understanding monads as monoids in the category of endofunctors, with practical examples and visual intuition."
weight = 1
template = "docs/page.html"

[extra]
lead = "A monad is a monoid in the category of endofunctors. Whilst this definition is mathematically precise, we shall build intuition through diagrams, examples, and the practical lens of computation."
toc = true
math = true
+++

## What is a Monad?

A **monad** on a category $\mathcal{C}$ consists of three components working in harmony:

1. An **endofunctor** $T : \mathcal{C} \to \mathcal{C}$
2. A **unit** natural transformation $\eta : \text{Id}_{\mathcal{C}} \Rightarrow T$
3. A **multiplication** natural transformation $\mu : T \circ T \Rightarrow T$

These must satisfy specific coherence laws that ensure computations compose sensibly.

<div class="svg-diagram" style="margin: 2.5rem 0;">
<svg viewBox="0 0 700 320" style="width: 100%; max-width: 700px; display: block; margin: 0 auto; font-family: 'Latin Modern Roman', 'Times New Roman', serif;">
  <defs>
    <marker id="monad-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563eb"/>
    </marker>
    <marker id="monad-arrow-purple" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#7c3aed"/>
    </marker>
    <marker id="monad-arrow-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#059669"/>
    </marker>
    <linearGradient id="monad-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.15"/>
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.15"/>
    </linearGradient>
  </defs>

  <!-- Title -->
  <text x="350" y="30" text-anchor="middle" font-size="18" font-weight="600" fill="#1e293b">The Monad Structure</text>

  <!-- Category C box -->
  <rect x="50" y="60" width="600" height="230" rx="12" fill="url(#monad-grad)" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="8,4"/>
  <text x="80" y="85" font-size="14" font-style="italic" fill="#64748b">Category 𝒞</text>

  <!-- Objects -->
  <circle cx="150" cy="180" r="28" fill="#fff" stroke="#2563eb" stroke-width="2.5" class="monad-object"/>
  <text x="150" y="185" text-anchor="middle" font-size="16" font-style="italic" fill="#1e293b">A</text>

  <circle cx="350" cy="180" r="28" fill="#fff" stroke="#7c3aed" stroke-width="2.5" class="monad-object"/>
  <text x="350" y="185" text-anchor="middle" font-size="16" font-style="italic" fill="#1e293b">T(A)</text>

  <circle cx="550" cy="180" r="28" fill="#fff" stroke="#059669" stroke-width="2.5" class="monad-object"/>
  <text x="550" y="185" text-anchor="middle" font-size="16" font-style="italic" fill="#1e293b">T²(A)</text>

  <!-- Unit arrow: A -> T(A) -->
  <path d="M 182 180 Q 250 130 318 180" fill="none" stroke="#2563eb" stroke-width="2.5" marker-end="url(#monad-arrow)" class="monad-morphism"/>
  <text x="250" y="125" text-anchor="middle" font-size="15" fill="#2563eb">η<tspan baseline-shift="sub" font-size="11">A</tspan></text>
  <text x="250" y="145" text-anchor="middle" font-size="12" fill="#64748b">(unit)</text>

  <!-- T applied: T(A) -> T²(A) -->
  <path d="M 382 165 L 518 165" fill="none" stroke="#7c3aed" stroke-width="2.5" marker-end="url(#monad-arrow-purple)" class="monad-morphism"/>
  <text x="450" y="155" text-anchor="middle" font-size="15" fill="#7c3aed">T(η<tspan baseline-shift="sub" font-size="11">A</tspan>)</text>

  <!-- Multiplication arrow: T²(A) -> T(A) (curved back) -->
  <path d="M 550 212 Q 550 270 450 270 Q 350 270 350 212" fill="none" stroke="#059669" stroke-width="2.5" marker-end="url(#monad-arrow-green)" class="monad-morphism"/>
  <text x="450" y="262" text-anchor="middle" font-size="15" fill="#059669">μ<tspan baseline-shift="sub" font-size="11">A</tspan></text>
  <text x="450" y="282" text-anchor="middle" font-size="12" fill="#64748b">(multiplication)</text>
</svg>
</div>

`★ Insight ─────────────────────────────────────`

- **Unit (η)** wraps a pure value into the monadic context—think `return` or `pure` in Haskell
- **Multiplication (μ)** flattens nested contexts—this is the `join` operation
- The familiar **bind** operation `(>>=)` is derived: $a \gg= f = \mu(T(f)(a))$

`─────────────────────────────────────────────────`

## The Monad Laws

For a monad to behave coherently, it must satisfy three laws. These ensure that sequencing computations produces predictable, well-defined results.

### Left Unit Law

The left unit law states that wrapping a value and immediately flattening yields the original wrapped value:

$$\mu_A \circ \eta_{T(A)} = \text{id}_{T(A)}$$

<div class="svg-diagram" style="margin: 2rem 0;">
<svg viewBox="0 0 500 200" style="width: 100%; max-width: 500px; display: block; margin: 0 auto; font-family: 'Latin Modern Roman', 'Times New Roman', serif;">
  <defs>
    <marker id="law-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#374151"/>
    </marker>
  </defs>

  <!-- Objects -->
  <circle cx="100" cy="100" r="26" fill="#dbeafe" stroke="#2563eb" stroke-width="2" class="monad-object"/>
  <text x="100" y="105" text-anchor="middle" font-size="14" font-style="italic" fill="#1e293b">T(A)</text>

  <circle cx="250" cy="100" r="26" fill="#f3e8ff" stroke="#7c3aed" stroke-width="2" class="monad-object"/>
  <text x="250" y="105" text-anchor="middle" font-size="13" font-style="italic" fill="#1e293b">T²(A)</text>

  <circle cx="400" cy="100" r="26" fill="#dbeafe" stroke="#2563eb" stroke-width="2" class="monad-object"/>
  <text x="400" y="105" text-anchor="middle" font-size="14" font-style="italic" fill="#1e293b">T(A)</text>

  <!-- Arrows -->
  <path d="M 130 100 L 220 100" fill="none" stroke="#374151" stroke-width="2" marker-end="url(#law-arrow)"/>
  <text x="175" y="88" text-anchor="middle" font-size="13" fill="#374151">η<tspan baseline-shift="sub" font-size="10">T(A)</tspan></text>

  <path d="M 280 100 L 370 100" fill="none" stroke="#374151" stroke-width="2" marker-end="url(#law-arrow)"/>
  <text x="325" y="88" text-anchor="middle" font-size="13" fill="#374151">μ<tspan baseline-shift="sub" font-size="10">A</tspan></text>

  <!-- Direct identity path -->
  <path d="M 100 130 Q 250 180 400 130" fill="none" stroke="#059669" stroke-width="2" stroke-dasharray="6,3" marker-end="url(#law-arrow)"/>
  <text x="250" y="175" text-anchor="middle" font-size="13" fill="#059669">id<tspan baseline-shift="sub" font-size="10">T(A)</tspan></text>

  <!-- Equals sign -->
  <text x="250" y="145" text-anchor="middle" font-size="18" fill="#059669">=</text>
</svg>
</div>

### Right Unit Law

The right unit law is symmetric—applying the functor to unit and then flattening also yields identity:

$$\mu_A \circ T(\eta_A) = \text{id}_{T(A)}$$

<div class="svg-diagram" style="margin: 2rem 0;">
<svg viewBox="0 0 500 200" style="width: 100%; max-width: 500px; display: block; margin: 0 auto; font-family: 'Latin Modern Roman', 'Times New Roman', serif;">
  <!-- Objects -->
  <circle cx="100" cy="100" r="26" fill="#dbeafe" stroke="#2563eb" stroke-width="2" class="monad-object"/>
  <text x="100" y="105" text-anchor="middle" font-size="14" font-style="italic" fill="#1e293b">T(A)</text>

  <circle cx="250" cy="100" r="26" fill="#f3e8ff" stroke="#7c3aed" stroke-width="2" class="monad-object"/>
  <text x="250" y="105" text-anchor="middle" font-size="13" font-style="italic" fill="#1e293b">T²(A)</text>

  <circle cx="400" cy="100" r="26" fill="#dbeafe" stroke="#2563eb" stroke-width="2" class="monad-object"/>
  <text x="400" y="105" text-anchor="middle" font-size="14" font-style="italic" fill="#1e293b">T(A)</text>

  <!-- Arrows -->
  <path d="M 130 100 L 220 100" fill="none" stroke="#374151" stroke-width="2" marker-end="url(#law-arrow)"/>
  <text x="175" y="88" text-anchor="middle" font-size="13" fill="#374151">T(η<tspan baseline-shift="sub" font-size="10">A</tspan>)</text>

  <path d="M 280 100 L 370 100" fill="none" stroke="#374151" stroke-width="2" marker-end="url(#law-arrow)"/>
  <text x="325" y="88" text-anchor="middle" font-size="13" fill="#374151">μ<tspan baseline-shift="sub" font-size="10">A</tspan></text>

  <!-- Direct identity path -->
  <path d="M 100 130 Q 250 180 400 130" fill="none" stroke="#059669" stroke-width="2" stroke-dasharray="6,3" marker-end="url(#law-arrow)"/>
  <text x="250" y="175" text-anchor="middle" font-size="13" fill="#059669">id<tspan baseline-shift="sub" font-size="10">T(A)</tspan></text>

  <text x="250" y="145" text-anchor="middle" font-size="18" fill="#059669">=</text>
</svg>
</div>

### Associativity Law

The associativity law ensures that flattening nested monads is independent of the order:

$$\mu_A \circ \mu_{T(A)} = \mu_A \circ T(\mu_A)$$

This is best visualised as a commutative diagram:

<div class="svg-diagram" style="margin: 2.5rem 0;">
<svg viewBox="0 0 500 280" style="width: 100%; max-width: 500px; display: block; margin: 0 auto; font-family: 'Latin Modern Roman', 'Times New Roman', serif;">
  <defs>
    <marker id="assoc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#374151"/>
    </marker>
  </defs>

  <!-- Title -->
  <text x="250" y="25" text-anchor="middle" font-size="15" font-weight="600" fill="#1e293b">Associativity Square</text>

  <!-- Objects at corners -->
  <circle cx="100" cy="80" r="28" fill="#fef3c7" stroke="#d97706" stroke-width="2" class="monad-object"/>
  <text x="100" y="85" text-anchor="middle" font-size="13" font-style="italic" fill="#1e293b">T³(A)</text>

  <circle cx="400" cy="80" r="28" fill="#f3e8ff" stroke="#7c3aed" stroke-width="2" class="monad-object"/>
  <text x="400" y="85" text-anchor="middle" font-size="13" font-style="italic" fill="#1e293b">T²(A)</text>

  <circle cx="100" cy="220" r="28" fill="#f3e8ff" stroke="#7c3aed" stroke-width="2" class="monad-object"/>
  <text x="100" y="225" text-anchor="middle" font-size="13" font-style="italic" fill="#1e293b">T²(A)</text>

  <circle cx="400" cy="220" r="28" fill="#dbeafe" stroke="#2563eb" stroke-width="2" class="monad-object"/>
  <text x="400" y="225" text-anchor="middle" font-size="14" font-style="italic" fill="#1e293b">T(A)</text>

  <!-- Top arrow: T³(A) -> T²(A) -->
  <path d="M 132 80 L 368 80" fill="none" stroke="#374151" stroke-width="2" marker-end="url(#assoc-arrow)"/>
  <text x="250" y="68" text-anchor="middle" font-size="13" fill="#374151">T(μ<tspan baseline-shift="sub" font-size="10">A</tspan>)</text>

  <!-- Left arrow: T³(A) -> T²(A) -->
  <path d="M 100 112 L 100 188" fill="none" stroke="#374151" stroke-width="2" marker-end="url(#assoc-arrow)"/>
  <text x="75" y="155" text-anchor="middle" font-size="13" fill="#374151">μ<tspan baseline-shift="sub" font-size="10">T(A)</tspan></text>

  <!-- Right arrow: T²(A) -> T(A) -->
  <path d="M 400 112 L 400 188" fill="none" stroke="#374151" stroke-width="2" marker-end="url(#assoc-arrow)"/>
  <text x="430" y="155" text-anchor="middle" font-size="13" fill="#374151">μ<tspan baseline-shift="sub" font-size="10">A</tspan></text>

  <!-- Bottom arrow: T²(A) -> T(A) -->
  <path d="M 132 220 L 368 220" fill="none" stroke="#374151" stroke-width="2" marker-end="url(#assoc-arrow)"/>
  <text x="250" y="242" text-anchor="middle" font-size="13" fill="#374151">μ<tspan baseline-shift="sub" font-size="10">A</tspan></text>

  <!-- Commutes indicator -->
  <text x="250" y="155" text-anchor="middle" font-size="16" fill="#059669">✓ commutes</text>
</svg>
</div>

## Monads as Monoids

The famous aphorism states: **"A monad is just a monoid in the category of endofunctors."**

Let us unpack this. In the category $[\mathcal{C}, \mathcal{C}]$ of endofunctors on $\mathcal{C}$:

- The **objects** are endofunctors $T : \mathcal{C} \to \mathcal{C}$
- The **morphisms** are natural transformations between them
- **Composition** is functor composition $\circ$
- The **identity** is the identity functor $\text{Id}_{\mathcal{C}}$

A monoid in this category has:
- A **unit** $\eta : \text{Id} \to T$ (the monoid identity)
- A **multiplication** $\mu : T \circ T \to T$ (the monoid operation)

The monad laws are precisely the monoid laws!

<div class="svg-diagram" style="margin: 2.5rem 0;">
<svg viewBox="0 0 700 200" style="width: 100%; max-width: 700px; display: block; margin: 0 auto; font-family: 'Latin Modern Roman', 'Times New Roman', serif;">
  <defs>
    <linearGradient id="monoid-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#fef3c7"/>
      <stop offset="100%" style="stop-color:#fce7f3"/>
    </linearGradient>
  </defs>

  <!-- Monoid box -->
  <rect x="50" y="30" width="280" height="140" rx="10" fill="url(#monoid-grad)" stroke="#d97706" stroke-width="2"/>
  <text x="190" y="55" text-anchor="middle" font-size="14" font-weight="600" fill="#92400e">Monoid (M, ·, e)</text>

  <text x="80" y="85" font-size="13" fill="#374151">• Identity: e · m = m · e = m</text>
  <text x="80" y="110" font-size="13" fill="#374151">• Associativity: (a · b) · c = a · (b · c)</text>
  <text x="80" y="140" font-size="13" fill="#374151">• Closed under operation</text>

  <!-- Arrow -->
  <path d="M 350 100 L 380 100" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#assoc-arrow)"/>
  <text x="365" y="90" text-anchor="middle" font-size="24" fill="#64748b">↔</text>

  <!-- Monad box -->
  <rect x="400" y="30" width="280" height="140" rx="10" fill="#ede9fe" stroke="#7c3aed" stroke-width="2"/>
  <text x="540" y="55" text-anchor="middle" font-size="14" font-weight="600" fill="#5b21b6">Monad (T, μ, η)</text>

  <text x="420" y="85" font-size="13" fill="#374151">• Unit: μ ∘ η<tspan baseline-shift="sub" font-size="10">T</tspan> = μ ∘ Tη = id<tspan baseline-shift="sub" font-size="10">T</tspan></text>
  <text x="420" y="110" font-size="13" fill="#374151">• Associativity: μ ∘ μ<tspan baseline-shift="sub" font-size="10">T</tspan> = μ ∘ Tμ</text>
  <text x="420" y="140" font-size="13" fill="#374151">• Endofunctor composition</text>
</svg>
</div>

## The Kleisli Category

Every monad $T$ on $\mathcal{C}$ gives rise to a **Kleisli category** $\mathcal{C}_T$, which provides an alternative perspective on monadic computation.

**Objects:** Same as $\mathcal{C}$

**Morphisms:** A Kleisli morphism $A \to_T B$ is a morphism $A \to T(B)$ in $\mathcal{C}$

**Composition:** For $f : A \to_T B$ and $g : B \to_T C$, their Kleisli composition is:

$$g \circ_T f = \mu_C \circ T(g) \circ f$$

<div class="svg-diagram" style="margin: 2.5rem 0;">
<svg viewBox="0 0 650 280" style="width: 100%; max-width: 650px; display: block; margin: 0 auto; font-family: 'Latin Modern Roman', 'Times New Roman', serif;">
  <defs>
    <marker id="kleisli-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#dc2626"/>
    </marker>
    <marker id="kleisli-arrow-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563eb"/>
    </marker>
  </defs>

  <!-- Title -->
  <text x="325" y="25" text-anchor="middle" font-size="16" font-weight="600" fill="#1e293b">Kleisli Composition</text>

  <!-- Top row: underlying morphisms in C -->
  <rect x="30" y="50" width="590" height="90" rx="8" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="55" y="72" font-size="12" fill="#991b1b">In category 𝒞</text>

  <circle cx="100" cy="105" r="22" fill="#fff" stroke="#dc2626" stroke-width="2"/>
  <text x="100" y="110" text-anchor="middle" font-size="14" font-style="italic" fill="#1e293b">A</text>

  <circle cx="270" cy="105" r="22" fill="#fff" stroke="#dc2626" stroke-width="2"/>
  <text x="270" y="110" text-anchor="middle" font-size="13" font-style="italic" fill="#1e293b">T(B)</text>

  <circle cx="440" cy="105" r="26" fill="#fff" stroke="#dc2626" stroke-width="2"/>
  <text x="440" y="110" text-anchor="middle" font-size="12" font-style="italic" fill="#1e293b">T(T(C))</text>

  <circle cx="570" cy="105" r="22" fill="#fff" stroke="#dc2626" stroke-width="2"/>
  <text x="570" y="110" text-anchor="middle" font-size="13" font-style="italic" fill="#1e293b">T(C)</text>

  <path d="M 125 105 L 245 105" fill="none" stroke="#dc2626" stroke-width="2" marker-end="url(#kleisli-arrow)"/>
  <text x="185" y="95" text-anchor="middle" font-size="13" fill="#dc2626">f</text>

  <path d="M 295 105 L 410 105" fill="none" stroke="#dc2626" stroke-width="2" marker-end="url(#kleisli-arrow)"/>
  <text x="352" y="95" text-anchor="middle" font-size="13" fill="#dc2626">T(g)</text>

  <path d="M 470 105 L 545 105" fill="none" stroke="#dc2626" stroke-width="2" marker-end="url(#kleisli-arrow)"/>
  <text x="507" y="95" text-anchor="middle" font-size="13" fill="#dc2626">μ<tspan baseline-shift="sub" font-size="10">C</tspan></text>

  <!-- Bottom row: Kleisli view -->
  <rect x="30" y="160" width="590" height="90" rx="8" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="55" y="182" font-size="12" fill="#1e40af">In Kleisli category 𝒞<tspan baseline-shift="sub" font-size="9">T</tspan></text>

  <circle cx="100" cy="215" r="22" fill="#fff" stroke="#2563eb" stroke-width="2"/>
  <text x="100" y="220" text-anchor="middle" font-size="14" font-style="italic" fill="#1e293b">A</text>

  <circle cx="325" cy="215" r="22" fill="#fff" stroke="#2563eb" stroke-width="2"/>
  <text x="325" y="220" text-anchor="middle" font-size="14" font-style="italic" fill="#1e293b">B</text>

  <circle cx="550" cy="215" r="22" fill="#fff" stroke="#2563eb" stroke-width="2"/>
  <text x="550" y="220" text-anchor="middle" font-size="14" font-style="italic" fill="#1e293b">C</text>

  <path d="M 125 215 L 300 215" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#kleisli-arrow-blue)"/>
  <text x="212" y="205" text-anchor="middle" font-size="13" fill="#2563eb">f : A →<tspan baseline-shift="sub" font-size="10">T</tspan> B</text>

  <path d="M 350 215 L 525 215" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#kleisli-arrow-blue)"/>
  <text x="437" y="205" text-anchor="middle" font-size="13" fill="#2563eb">g : B →<tspan baseline-shift="sub" font-size="10">T</tspan> C</text>
</svg>
</div>

In Haskell, Kleisli composition is written as `(>=>)` (fish operator):

```haskell
(>=>) :: Monad m => (a -> m b) -> (b -> m c) -> (a -> m c)
f >=> g = \x -> f x >>= g
```

## Practical Examples

### The Maybe Monad

The **Maybe** monad models computations that may fail. It wraps a value or represents absence.

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
<div>

**In Haskell:**
```haskell
data Maybe a = Nothing | Just a

instance Monad Maybe where
    return = Just                    -- η
    Nothing >>= f = Nothing
    Just x  >>= f = f x              -- derived from μ
```

</div>
<div>

**Category-theoretic view:**
- $T(A) = A + 1$ (coproduct with terminal)
- $\eta_A : A \to A + 1$ is the left injection
- $\mu_A : (A + 1) + 1 \to A + 1$ collapses nested optionality

</div>
</div>

<div class="svg-diagram" style="margin: 2rem 0;">
<svg viewBox="0 0 600 180" style="width: 100%; max-width: 600px; display: block; margin: 0 auto; font-family: 'Latin Modern Roman', 'Times New Roman', serif;">
  <defs>
    <marker id="maybe-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#374151"/>
    </marker>
  </defs>

  <!-- Just path -->
  <rect x="40" y="40" width="60" height="35" rx="6" fill="#d1fae5" stroke="#059669" stroke-width="2"/>
  <text x="70" y="62" text-anchor="middle" font-size="13" fill="#065f46">42</text>

  <path d="M 110 57 L 160 57" fill="none" stroke="#374151" stroke-width="2" marker-end="url(#maybe-arrow)"/>
  <text x="135" y="47" text-anchor="middle" font-size="11" fill="#64748b">return</text>

  <rect x="170" y="30" width="90" height="55" rx="6" fill="#d1fae5" stroke="#059669" stroke-width="2"/>
  <text x="215" y="52" text-anchor="middle" font-size="12" font-weight="600" fill="#065f46">Just</text>
  <text x="215" y="72" text-anchor="middle" font-size="13" fill="#065f46">42</text>

  <path d="M 270 57 L 320 57" fill="none" stroke="#374151" stroke-width="2" marker-end="url(#maybe-arrow)"/>
  <text x="295" y="47" text-anchor="middle" font-size="11" fill="#64748b">>>=</text>

  <rect x="330" y="30" width="90" height="55" rx="6" fill="#d1fae5" stroke="#059669" stroke-width="2"/>
  <text x="375" y="52" text-anchor="middle" font-size="12" font-weight="600" fill="#065f46">Just</text>
  <text x="375" y="72" text-anchor="middle" font-size="13" fill="#065f46">84</text>

  <!-- Nothing path -->
  <rect x="40" y="110" width="60" height="35" rx="6" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
  <text x="70" y="132" text-anchor="middle" font-size="13" fill="#991b1b">∅</text>

  <path d="M 110 127 L 160 127" fill="none" stroke="#374151" stroke-width="2" marker-end="url(#maybe-arrow)"/>

  <rect x="170" y="100" width="90" height="55" rx="6" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
  <text x="215" y="132" text-anchor="middle" font-size="12" font-weight="600" fill="#991b1b">Nothing</text>

  <path d="M 270 127 L 320 127" fill="none" stroke="#374151" stroke-width="2" marker-end="url(#maybe-arrow)"/>
  <text x="295" y="117" text-anchor="middle" font-size="11" fill="#64748b">>>=</text>

  <rect x="330" y="100" width="90" height="55" rx="6" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
  <text x="375" y="132" text-anchor="middle" font-size="12" font-weight="600" fill="#991b1b">Nothing</text>

  <!-- Labels -->
  <text x="500" y="62" text-anchor="start" font-size="12" fill="#059669">Success propagates</text>
  <text x="500" y="132" text-anchor="start" font-size="12" fill="#dc2626">Failure short-circuits</text>
</svg>
</div>

### The List Monad

The **List** monad models non-deterministic computations—multiple possible results.

```haskell
instance Monad [] where
    return x = [x]                    -- η: singleton list
    xs >>= f = concat (map f xs)      -- derived from μ: flatten
```

<div class="svg-diagram" style="margin: 2rem 0;">
<svg viewBox="0 0 650 160" style="width: 100%; max-width: 650px; display: block; margin: 0 auto; font-family: 'Latin Modern Roman', 'Times New Roman', serif;">
  <!-- Initial list -->
  <rect x="30" y="50" width="100" height="60" rx="6" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
  <text x="80" y="75" text-anchor="middle" font-size="13" fill="#1e40af">[1, 2, 3]</text>
  <text x="80" y="95" text-anchor="middle" font-size="10" fill="#64748b">T(A)</text>

  <path d="M 140 80 L 170 80" fill="none" stroke="#374151" stroke-width="2" marker-end="url(#maybe-arrow)"/>
  <text x="155" y="70" text-anchor="middle" font-size="10" fill="#64748b">>>=</text>
  <text x="155" y="100" text-anchor="middle" font-size="10" fill="#64748b">λx.[x,x]</text>

  <!-- Mapped result (nested) -->
  <rect x="180" y="30" width="180" height="100" rx="6" fill="#f3e8ff" stroke="#7c3aed" stroke-width="2"/>
  <text x="270" y="55" text-anchor="middle" font-size="12" fill="#5b21b6">[[1,1], [2,2], [3,3]]</text>
  <text x="270" y="75" text-anchor="middle" font-size="10" fill="#64748b">T(T(A)) after map</text>

  <rect x="200" y="85" width="50" height="30" rx="4" fill="#dbeafe" stroke="#93c5fd" stroke-width="1"/>
  <text x="225" y="105" text-anchor="middle" font-size="11" fill="#1e40af">[1,1]</text>

  <rect x="255" y="85" width="50" height="30" rx="4" fill="#dbeafe" stroke="#93c5fd" stroke-width="1"/>
  <text x="280" y="105" text-anchor="middle" font-size="11" fill="#1e40af">[2,2]</text>

  <rect x="310" y="85" width="50" height="30" rx="4" fill="#dbeafe" stroke="#93c5fd" stroke-width="1"/>
  <text x="335" y="105" text-anchor="middle" font-size="11" fill="#1e40af">[3,3]</text>

  <path d="M 370 80 L 400 80" fill="none" stroke="#374151" stroke-width="2" marker-end="url(#maybe-arrow)"/>
  <text x="385" y="70" text-anchor="middle" font-size="10" fill="#64748b">μ</text>
  <text x="385" y="100" text-anchor="middle" font-size="10" fill="#64748b">(concat)</text>

  <!-- Flattened result -->
  <rect x="410" y="50" width="200" height="60" rx="6" fill="#d1fae5" stroke="#059669" stroke-width="2"/>
  <text x="510" y="75" text-anchor="middle" font-size="13" fill="#065f46">[1, 1, 2, 2, 3, 3]</text>
  <text x="510" y="95" text-anchor="middle" font-size="10" fill="#64748b">T(A) after flatten</text>
</svg>
</div>

### The State Monad

The **State** monad threads state through a computation, modelling stateful computations purely.

$$T(A) = S \to (A \times S)$$

where $S$ is the state type.

```haskell
newtype State s a = State { runState :: s -> (a, s) }

instance Monad (State s) where
    return a = State $ \s -> (a, s)           -- η: pass state through
    m >>= f  = State $ \s ->
        let (a, s') = runState m s
        in runState (f a) s'                   -- thread state
```

<div class="svg-diagram" style="margin: 2rem 0;">
<svg viewBox="0 0 600 220" style="width: 100%; max-width: 600px; display: block; margin: 0 auto; font-family: 'Latin Modern Roman', 'Times New Roman', serif;">
  <defs>
    <marker id="state-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#0891b2"/>
    </marker>
    <marker id="state-arrow-orange" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ea580c"/>
    </marker>
  </defs>

  <!-- Title -->
  <text x="300" y="25" text-anchor="middle" font-size="15" font-weight="600" fill="#1e293b">State Threading</text>

  <!-- State flow -->
  <circle cx="80" cy="100" r="25" fill="#cffafe" stroke="#0891b2" stroke-width="2"/>
  <text x="80" y="95" text-anchor="middle" font-size="12" fill="#0e7490">s₀</text>
  <text x="80" y="110" text-anchor="middle" font-size="10" fill="#64748b">initial</text>

  <!-- First computation box -->
  <rect x="140" y="70" width="100" height="60" rx="8" fill="#fff7ed" stroke="#ea580c" stroke-width="2"/>
  <text x="190" y="95" text-anchor="middle" font-size="12" fill="#c2410c">comp₁</text>
  <text x="190" y="112" text-anchor="middle" font-size="10" fill="#ea580c">s → (a, s')</text>

  <path d="M 108 100 L 137 100" fill="none" stroke="#0891b2" stroke-width="2" marker-end="url(#state-arrow)"/>

  <!-- Intermediate state -->
  <circle cx="300" cy="100" r="25" fill="#cffafe" stroke="#0891b2" stroke-width="2"/>
  <text x="300" y="95" text-anchor="middle" font-size="12" fill="#0e7490">s₁</text>
  <text x="300" y="110" text-anchor="middle" font-size="10" fill="#64748b">+ a₁</text>

  <path d="M 243 100 L 272 100" fill="none" stroke="#ea580c" stroke-width="2" marker-end="url(#state-arrow-orange)"/>

  <!-- Second computation box -->
  <rect x="360" y="70" width="100" height="60" rx="8" fill="#fff7ed" stroke="#ea580c" stroke-width="2"/>
  <text x="410" y="95" text-anchor="middle" font-size="12" fill="#c2410c">comp₂</text>
  <text x="410" y="112" text-anchor="middle" font-size="10" fill="#ea580c">s → (b, s')</text>

  <path d="M 328 100 L 357 100" fill="none" stroke="#0891b2" stroke-width="2" marker-end="url(#state-arrow)"/>

  <!-- Final state -->
  <circle cx="520" cy="100" r="25" fill="#cffafe" stroke="#0891b2" stroke-width="2"/>
  <text x="520" y="95" text-anchor="middle" font-size="12" fill="#0e7490">s₂</text>
  <text x="520" y="110" text-anchor="middle" font-size="10" fill="#64748b">+ b₁</text>

  <path d="M 463 100 L 492 100" fill="none" stroke="#ea580c" stroke-width="2" marker-end="url(#state-arrow-orange)"/>

  <!-- Value extraction arrows -->
  <path d="M 190 133 L 190 170 L 300 170" fill="none" stroke="#059669" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="245" y="185" text-anchor="middle" font-size="11" fill="#059669">a₁ feeds into comp₂</text>

  <!-- Legend -->
  <rect x="40" y="195" width="15" height="15" rx="2" fill="#cffafe" stroke="#0891b2" stroke-width="1"/>
  <text x="60" y="207" font-size="11" fill="#374151">State</text>

  <rect x="120" y="195" width="15" height="15" rx="2" fill="#fff7ed" stroke="#ea580c" stroke-width="1"/>
  <text x="140" y="207" font-size="11" fill="#374151">Computation</text>
</svg>
</div>

`★ Insight ─────────────────────────────────────`

- The **State monad** is foundational for understanding how pure functional languages handle mutable state
- In finance, it elegantly models portfolio state evolution through a sequence of trades
- The pattern generalises to **Reader** (read-only environment) and **Writer** (append-only log)

`─────────────────────────────────────────────────`

## Monads in Programming vs Category Theory

The relationship between programming monads and category-theoretic monads is precise:

| Programming Concept | Category Theory |
|---------------------|-----------------|
| `return` / `pure` | Unit $\eta$ |
| `join` | Multiplication $\mu$ |
| `>>=` (bind) | Derived: $a \gg= f = \mu(T(f)(a))$ |
| `>=>` (Kleisli composition) | Kleisli category composition |
| Monad laws | Monoid laws in $[\mathcal{C}, \mathcal{C}]$ |

The programming formulation using `>>=` is equivalent to the categorical formulation using $\mu$, as demonstrated by the equivalence:

$$a \gg= f = \text{join}(\text{fmap}\; f\; a) = \mu_B \circ T(f) \circ a$$

## The IO Monad: Taming Side Effects

In Haskell, the **IO monad** encapsulates all input/output operations, maintaining referential transparency whilst permitting interaction with the outside world.

```haskell
-- IO actions are opaque, but compose monadically
main :: IO ()
main = do
    putStrLn "What is your name?"      -- IO ()
    name <- getLine                     -- IO String
    putStrLn ("Hello, " ++ name)        -- IO ()
```

<div class="svg-diagram" style="margin: 2rem 0;">
<svg viewBox="0 0 600 200" style="width: 100%; max-width: 600px; display: block; margin: 0 auto; font-family: 'Latin Modern Roman', 'Times New Roman', serif;">
  <defs>
    <linearGradient id="io-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e293b;stop-opacity:0.9"/>
      <stop offset="100%" style="stop-color:#475569;stop-opacity:0.9"/>
    </linearGradient>
  </defs>

  <!-- Pure world -->
  <rect x="30" y="30" width="250" height="140" rx="10" fill="#f0fdf4" stroke="#22c55e" stroke-width="2"/>
  <text x="155" y="55" text-anchor="middle" font-size="14" font-weight="600" fill="#15803d">Pure World</text>
  <text x="155" y="80" text-anchor="middle" font-size="12" fill="#166534">Referentially transparent</text>
  <text x="155" y="100" text-anchor="middle" font-size="12" fill="#166534">Mathematically tractable</text>
  <text x="155" y="120" text-anchor="middle" font-size="12" fill="#166534">Equational reasoning</text>

  <!-- IO boundary -->
  <rect x="290" y="70" width="80" height="60" rx="8" fill="url(#io-grad)" stroke="#64748b" stroke-width="2"/>
  <text x="330" y="95" text-anchor="middle" font-size="13" font-weight="600" fill="#fff">IO</text>
  <text x="330" y="112" text-anchor="middle" font-size="10" fill="#cbd5e1">boundary</text>

  <!-- Real world -->
  <rect x="380" y="30" width="190" height="140" rx="10" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
  <text x="475" y="55" text-anchor="middle" font-size="14" font-weight="600" fill="#dc2626">Real World</text>
  <text x="475" y="80" text-anchor="middle" font-size="12" fill="#991b1b">Side effects</text>
  <text x="475" y="100" text-anchor="middle" font-size="12" fill="#991b1b">Non-determinism</text>
  <text x="475" y="120" text-anchor="middle" font-size="12" fill="#991b1b">External state</text>

  <!-- Arrows -->
  <path d="M 155 145 L 155 175 L 330 175 L 330 133" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#maybe-arrow)"/>
  <text x="242" y="192" text-anchor="middle" font-size="11" fill="#64748b">IO actions describe effects</text>
</svg>
</div>

The IO monad does not eliminate side effects—it *quarantines* them, keeping the core language pure whilst providing a disciplined interface to the impure world.

## Summary

Monads provide a powerful abstraction that unifies seemingly disparate computational patterns:

- **Maybe**: Partiality and failure
- **List**: Non-determinism and multiple results
- **State**: Stateful computation
- **Reader**: Environment/configuration access
- **Writer**: Logging and accumulation
- **IO**: Interaction with the external world

The categorical perspective reveals that these are all instances of the same structure—a monoid in the category of endofunctors—equipped with natural transformations that satisfy coherence laws.

<div style="background: linear-gradient(135deg, #ede9fe 0%, #dbeafe 100%); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">

**Key Takeaways:**

1. A monad is a triple $(T, \eta, \mu)$ satisfying unit and associativity laws
2. The monad laws ensure predictable composition of effectful computations
3. Kleisli categories provide an alternative view where morphisms are "effectful functions"
4. Programming monads (using `>>=`) are equivalent to categorical monads (using $\mu$)
5. Monads enable pure functional programming with controlled side effects

</div>

---

## References

<div style="font-size: 0.9rem; line-height: 1.8;">

Mac Lane, S. (1998) *Categories for the Working Mathematician*. 2nd edn. New York: Springer-Verlag.

Moggi, E. (1991) 'Notions of computation and monads', *Information and Computation*, 93(1), pp. 55–92.

Wadler, P. (1992) 'Monads for functional programming', in Broy, M. (ed.) *Program Design Calculi*. Berlin: Springer, pp. 233–264.

Awodey, S. (2010) *Category Theory*. 2nd edn. Oxford: Oxford University Press.

Milewski, B. (2019) *Category Theory for Programmers*. Available at: https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/ (Accessed: 17 January 2026).

Riehl, E. (2016) *Category Theory in Context*. Cambridge: Cambridge University Press.

Lipovača, M. (2011) *Learn You a Haskell for Great Good!*. San Francisco: No Starch Press.

</div>
