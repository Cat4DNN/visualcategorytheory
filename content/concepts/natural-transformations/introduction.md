+++
title = "Natural Transformations: Morphisms Between Functors"
description = "Discover how natural transformations provide systematic ways to convert between functors."
date = 2024-01-19
weight = 1
template = "docs/page.html"

[taxonomies]
tags = ["natural-transformations", "functors", "naturality"]

[extra]
lead = "If functors are the morphisms between categories, what are the morphisms between functors? Natural transformations complete the picture, giving us a way to systematically transform one functor into another."
math = true
toc = true
+++

## The Need for Natural Transformations

Consider two functors $F, G: \mathcal{C} \to \mathcal{D}$ between the same categories. We might want to "transform" $F$ into $G$ — but what does that mean?

<div class="key-insight" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 1.5rem 0; border-radius: 0 8px 8px 0;">

**The Core Idea:** A natural transformation provides, for each object $A$ in $\mathcal{C}$, a morphism $\alpha_A: F(A) \to G(A)$ in $\mathcal{D}$. But these morphisms aren't arbitrary — they must be **compatible** with how $F$ and $G$ act on morphisms.

</div>

## Formal Definition

<div class="definition-box" style="background: #f0fdf4; border: 2px solid #22c55e; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">

**Definition (Natural Transformation):** Let $F, G: \mathcal{C} \to \mathcal{D}$ be functors. A **natural transformation** $\alpha: F \Rightarrow G$ consists of:

For each object $A$ in $\mathcal{C}$, a morphism $\alpha_A: F(A) \to G(A)$ in $\mathcal{D}$

called the **component** of $\alpha$ at $A$, such that for every morphism $f: A \to B$ in $\mathcal{C}$, the following diagram commutes:

$$G(f) \circ \alpha_A = \alpha_B \circ F(f)$$

This is the **naturality condition**.

</div>

## The Naturality Square

The naturality condition is beautifully expressed as a commutative square:

<svg class="commutative-diagram natural-transformation" viewBox="0 0 400 320" style="max-width: 400px; margin: 2rem auto; display: block;">
  <defs>
    <marker id="nat-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
    <marker id="nat-arrow-orange" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b"/>
    </marker>
  </defs>

  <!-- Background for naturality square -->
  <rect x="60" y="60" width="280" height="200" rx="12" fill="#fef3c7" opacity="0.3" class="naturality-square"/>

  <!-- Objects -->
  <g class="category-object nt-component" transform="translate(100, 100)">
    <circle r="32" fill="#dbeafe" stroke="#3b82f6" stroke-width="2.5"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="14">F(A)</text>
  </g>
  <g class="category-object nt-component" transform="translate(300, 100)">
    <circle r="32" fill="#dcfce7" stroke="#22c55e" stroke-width="2.5"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="14">G(A)</text>
  </g>
  <g class="category-object nt-component" transform="translate(100, 220)">
    <circle r="32" fill="#dbeafe" stroke="#3b82f6" stroke-width="2.5"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="14">F(B)</text>
  </g>
  <g class="category-object nt-component" transform="translate(300, 220)">
    <circle r="32" fill="#dcfce7" stroke="#22c55e" stroke-width="2.5"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="14">G(B)</text>
  </g>

  <!-- Horizontal arrows (natural transformation components) -->
  <path d="M 135 100 L 265 100" stroke="#f59e0b" stroke-width="3" fill="none" marker-end="url(#nat-arrow-orange)" class="morphism-arrow"/>
  <text x="200" y="82" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="16" fill="#f59e0b">α<tspan baseline-shift="sub" font-size="12">A</tspan></text>

  <path d="M 135 220 L 265 220" stroke="#f59e0b" stroke-width="3" fill="none" marker-end="url(#nat-arrow-orange)" class="morphism-arrow"/>
  <text x="200" y="245" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="16" fill="#f59e0b">α<tspan baseline-shift="sub" font-size="12">B</tspan></text>

  <!-- Vertical arrows (functor actions) -->
  <path d="M 100 135 L 100 185" stroke="#3b82f6" stroke-width="2.5" fill="none" marker-end="url(#nat-arrow)" class="morphism-arrow"/>
  <text x="70" y="160" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="14" fill="#3b82f6">F(f)</text>

  <path d="M 300 135 L 300 185" stroke="#22c55e" stroke-width="2.5" fill="none" marker-end="url(#nat-arrow)" class="morphism-arrow"/>
  <text x="330" y="160" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="14" fill="#22c55e">G(f)</text>

  <!-- Commutes label -->
  <text x="200" y="295" text-anchor="middle" font-size="14" fill="#92400e" font-weight="500">G(f) ∘ α<tspan baseline-shift="sub" font-size="10">A</tspan> = α<tspan baseline-shift="sub" font-size="10">B</tspan> ∘ F(f)</text>
</svg>

<p style="text-align: center; color: #64748b; font-size: 0.9rem; margin-top: -0.5rem;">
<em>Figure 1:</em> The naturality square. Going right-then-down equals going down-then-right.
</p>

### Reading the Diagram

- **Top arrow ($\alpha_A$):** Transform $F$'s image of $A$ to $G$'s image of $A$
- **Bottom arrow ($\alpha_B$):** Transform $F$'s image of $B$ to $G$'s image of $B$
- **Left arrow ($F(f)$):** $F$'s action on the morphism $f$
- **Right arrow ($G(f)$):** $G$'s action on the morphism $f$

The square **commuting** means: it doesn't matter whether we first transform then apply $G(f)$, or first apply $F(f)$ then transform — the result is the same.

## Visualising Natural Transformations

<svg class="functor-diagram natural-transformation" viewBox="0 0 650 350" style="max-width: 650px; margin: 2rem auto; display: block;">
  <defs>
    <marker id="nt-main-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
    <marker id="nt-double-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6"/>
    </marker>
    <linearGradient id="srcCatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#e0e7ff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#c7d2fe;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="tgtCatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#fef3c7;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#fde68a;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Source category C -->
  <rect x="20" y="100" width="150" height="180" rx="12" fill="url(#srcCatGrad)" stroke="#6366f1" stroke-width="2"/>
  <text x="95" y="125" text-anchor="middle" font-size="14" font-weight="600" fill="#4338ca">Category 𝒞</text>

  <!-- Objects in C -->
  <g class="category-object" transform="translate(70, 180)">
    <circle r="20" fill="#fff" stroke="#6366f1" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="14">A</text>
  </g>
  <g class="category-object" transform="translate(120, 240)">
    <circle r="20" fill="#fff" stroke="#6366f1" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="14">B</text>
  </g>
  <path d="M 82 195 L 108 225" stroke="#333" stroke-width="1.5" fill="none" marker-end="url(#nt-main-arrow)"/>
  <text x="82" y="220" font-family="KaTeX_Math, serif" font-style="italic" font-size="11">f</text>

  <!-- Target category D -->
  <rect x="350" y="20" width="280" height="310" rx="12" fill="url(#tgtCatGrad)" stroke="#f59e0b" stroke-width="2"/>
  <text x="490" y="50" text-anchor="middle" font-size="14" font-weight="600" fill="#92400e">Category 𝒟</text>

  <!-- F images (top row) -->
  <g class="category-object nt-component" transform="translate(420, 110)">
    <circle r="22" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="11">F(A)</text>
  </g>
  <g class="category-object nt-component" transform="translate(420, 190)">
    <circle r="22" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="11">F(B)</text>
  </g>
  <path d="M 420 135 L 420 165" stroke="#3b82f6" stroke-width="2" fill="none" marker-end="url(#nt-main-arrow)"/>
  <text x="395" y="155" font-family="KaTeX_Math, serif" font-style="italic" font-size="10" fill="#3b82f6">F(f)</text>

  <!-- G images (bottom row) -->
  <g class="category-object nt-component" transform="translate(560, 110)">
    <circle r="22" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="11">G(A)</text>
  </g>
  <g class="category-object nt-component" transform="translate(560, 190)">
    <circle r="22" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="11">G(B)</text>
  </g>
  <path d="M 560 135 L 560 165" stroke="#22c55e" stroke-width="2" fill="none" marker-end="url(#nt-main-arrow)"/>
  <text x="585" y="155" font-family="KaTeX_Math, serif" font-style="italic" font-size="10" fill="#22c55e">G(f)</text>

  <!-- Natural transformation components -->
  <path d="M 445 110 L 535 110" stroke="#f59e0b" stroke-width="2.5" fill="none" marker-end="url(#nt-main-arrow)"/>
  <text x="490" y="95" font-family="KaTeX_Math, serif" font-style="italic" font-size="12" fill="#f59e0b">α<tspan baseline-shift="sub" font-size="9">A</tspan></text>

  <path d="M 445 190 L 535 190" stroke="#f59e0b" stroke-width="2.5" fill="none" marker-end="url(#nt-main-arrow)"/>
  <text x="490" y="210" font-family="KaTeX_Math, serif" font-style="italic" font-size="12" fill="#f59e0b">α<tspan baseline-shift="sub" font-size="9">B</tspan></text>

  <!-- Functor arrows -->
  <path d="M 180 160 Q 280 80 385 100" stroke="#3b82f6" stroke-width="2.5" fill="none" marker-end="url(#nt-double-arrow)"/>
  <text x="280" y="85" font-family="KaTeX_Math, serif" font-style="italic" font-size="16" fill="#3b82f6">F</text>

  <path d="M 180 220 Q 350 300 535 120" stroke="#22c55e" stroke-width="2.5" fill="none" marker-end="url(#nt-double-arrow)"/>
  <text x="340" y="285" font-family="KaTeX_Math, serif" font-style="italic" font-size="16" fill="#22c55e">G</text>

  <!-- Labels -->
  <text x="490" y="250" text-anchor="middle" font-size="12" fill="#92400e">Natural transformation α: F ⇒ G</text>
  <text x="490" y="270" text-anchor="middle" font-size="11" fill="#64748b">(Orange arrows are the components)</text>
</svg>

<p style="text-align: center; color: #64748b; font-size: 0.9rem; margin-top: -0.5rem;">
<em>Figure 2:</em> A natural transformation $\alpha: F \Rightarrow G$ assigns to each object in $\mathcal{C}$ a morphism between its $F$-image and $G$-image.
</p>

## Examples of Natural Transformations

### The `head` Function as a Natural Transformation

In Haskell, `head :: [a] -> Maybe a` is a natural transformation from the list functor `[]` to `Maybe`:

```haskell
safeHead :: [a] -> Maybe a
safeHead []     = Nothing
safeHead (x:_)  = Just x
```

<div class="naturality-proof" style="background: #f0f9ff; border: 1px solid #0ea5e9; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">

**Naturality Check:** For any function `f :: a -> b`:

```haskell
-- Going right-then-down:
fmap f . safeHead  ≡  fmap f (safeHead xs)

-- Going down-then-right:
safeHead . fmap f  ≡  safeHead (fmap f xs)
```

Both paths give the same result for any list `xs`. This is naturality!

</div>

### The `return`/`pure` Function

The `return` (or `pure`) function is a natural transformation $\eta: \text{Id} \Rightarrow M$ from the identity functor to any monad $M$:

```haskell
return :: a -> m a  -- For any monad m

-- Examples:
return :: a -> [a]       -- ≡ \x -> [x]
return :: a -> Maybe a   -- ≡ Just
return :: a -> IO a      -- wraps in IO
```

### Flattening: `join` as Natural Transformation

The `join` function is a natural transformation $\mu: M \circ M \Rightarrow M$:

```haskell
join :: Monad m => m (m a) -> m a

join [[1,2], [3,4]]  -- Result: [1,2,3,4]
join (Just (Just 5)) -- Result: Just 5
join (Just Nothing)  -- Result: Nothing
```

## Composition of Natural Transformations

### Vertical Composition

Given $\alpha: F \Rightarrow G$ and $\beta: G \Rightarrow H$, we can compose them "vertically":

$$(\beta \cdot \alpha)_A = \beta_A \circ \alpha_A$$

<svg class="commutative-diagram" viewBox="0 0 400 220" style="max-width: 400px; margin: 1.5rem auto; display: block;">
  <defs>
    <marker id="vert-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
  </defs>

  <!-- Objects -->
  <g class="category-object" transform="translate(200, 50)">
    <circle r="28" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="13">F(A)</text>
  </g>
  <g class="category-object" transform="translate(200, 130)">
    <circle r="28" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="13">G(A)</text>
  </g>
  <g class="category-object" transform="translate(200, 200)">
    <circle r="28" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="13">H(A)</text>
  </g>

  <!-- Arrows -->
  <path d="M 200 80 L 200 100" stroke="#8b5cf6" stroke-width="2.5" fill="none" marker-end="url(#vert-arrow)"/>
  <text x="225" y="92" font-family="KaTeX_Math, serif" font-style="italic" font-size="13" fill="#8b5cf6">α<tspan baseline-shift="sub" font-size="10">A</tspan></text>

  <path d="M 200 160 L 200 175" stroke="#ec4899" stroke-width="2.5" fill="none" marker-end="url(#vert-arrow)"/>
  <text x="225" y="170" font-family="KaTeX_Math, serif" font-style="italic" font-size="13" fill="#ec4899">β<tspan baseline-shift="sub" font-size="10">A</tspan></text>

  <!-- Composite arrow -->
  <path d="M 165 60 Q 90 130 165 190" stroke="#333" stroke-width="2" stroke-dasharray="4,2" fill="none" marker-end="url(#vert-arrow)"/>
  <text x="70" y="130" font-family="KaTeX_Math, serif" font-style="italic" font-size="12">(β·α)<tspan baseline-shift="sub" font-size="9">A</tspan></text>
</svg>

### Horizontal Composition (Whiskering)

We can also compose natural transformations "horizontally" with functors:

- **Right whiskering:** $\alpha H: F \circ H \Rightarrow G \circ H$ for $H: \mathcal{B} \to \mathcal{C}$
- **Left whiskering:** $K\alpha: K \circ F \Rightarrow K \circ G$ for $K: \mathcal{D} \to \mathcal{E}$

## The Functor Category

<div class="key-insight" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 1.5rem 0; border-radius: 0 8px 8px 0;">

**Deep Insight:** Functors and natural transformations form a category!

The **functor category** $[\mathcal{C}, \mathcal{D}]$ (or $\mathcal{D}^{\mathcal{C}}$) has:
- **Objects:** Functors $F: \mathcal{C} \to \mathcal{D}$
- **Morphisms:** Natural transformations between functors
- **Composition:** Vertical composition of natural transformations
- **Identity:** The identity natural transformation $\text{id}_F: F \Rightarrow F$

</div>

## Natural Isomorphisms

<div class="definition-box" style="background: #eff6ff; border: 2px solid #3b82f6; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">

**Definition (Natural Isomorphism):** A natural transformation $\alpha: F \Rightarrow G$ is a **natural isomorphism** if each component $\alpha_A$ is an isomorphism in $\mathcal{D}$.

We write $F \cong G$ and say "$F$ and $G$ are naturally isomorphic."

</div>

Natural isomorphisms tell us that two functors are "essentially the same" — not just object-by-object, but in a coherent, systematic way.

### Example: Currying

The currying isomorphism is natural:

$$\text{Hom}(A \times B, C) \cong \text{Hom}(A, \text{Hom}(B, C))$$

In Haskell:
```haskell
curry   :: ((a, b) -> c) -> a -> b -> c
uncurry :: (a -> b -> c) -> (a, b) -> c
```

These form a natural isomorphism!

---

## References

<div class="references" style="font-size: 0.9rem; line-height: 1.8; border-top: 1px solid #e2e8f0; padding-top: 1.5rem; margin-top: 2rem;">

Awodey, S. (2010) *Category Theory*. 2nd edn. Oxford: Oxford University Press.

Eilenberg, S. and Mac Lane, S. (1945) 'General theory of natural equivalences', *Transactions of the American Mathematical Society*, 58(2), pp. 231–294.

Mac Lane, S. (1998) *Categories for the Working Mathematician*. 2nd edn. New York: Springer-Verlag.

Milewski, B. (2019) *Category Theory for Programmers*. Available at: https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/.

Riehl, E. (2016) *Category Theory in Context*. Aurora: Dover Publications.

</div>
