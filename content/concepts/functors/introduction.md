+++
title = "Functors: Structure-Preserving Maps"
description = "Discover how functors translate between categories whilst preserving their essential structure."
date = 2024-01-18
weight = 1
template = "docs/page.html"

[taxonomies]
tags = ["functors", "structure", "mapping"]

[extra]
lead = "Just as functions map elements between sets, functors map entire categories to other categories. They are the 'homomorphisms' between categories, preserving the crucial relationships that make categories tick."
math = true
toc = true
+++

## The Essence of Functors

A **functor** is a mapping between categories that preserves structure. If categories are worlds of objects and morphisms, then functors are the translators that ensure meaning is preserved across the translation.

<div class="key-insight" style="background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%); border-left: 4px solid #8b5cf6; padding: 1.5rem; margin: 1.5rem 0; border-radius: 0 8px 8px 0;">

**Core Intuition:** A functor $F: \mathcal{C} \to \mathcal{D}$ is a systematic way of viewing $\mathcal{C}$ inside $\mathcal{D}$. Every object in $\mathcal{C}$ has an image in $\mathcal{D}$, every morphism has an image, and the relationships (composition, identity) are respected.

</div>

## Formal Definition

<div class="definition-box" style="background: #f0fdf4; border: 2px solid #22c55e; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">

**Definition (Functor):** A **functor** $F: \mathcal{C} \to \mathcal{D}$ between categories $\mathcal{C}$ and $\mathcal{D}$ consists of:

1. **Object mapping:** For each object $A$ in $\mathcal{C}$, an object $F(A)$ in $\mathcal{D}$

2. **Morphism mapping:** For each morphism $f: A \to B$ in $\mathcal{C}$, a morphism $F(f): F(A) \to F(B)$ in $\mathcal{D}$

Subject to the **functor laws:**

$$F(\text{id}_A) = \text{id}_{F(A)} \quad \text{(preserves identity)}$$

$$F(g \circ f) = F(g) \circ F(f) \quad \text{(preserves composition)}$$

</div>

## Visualising Functors

<svg class="functor-diagram" viewBox="0 0 600 320" style="max-width: 600px; margin: 2rem auto; display: block;">
  <defs>
    <marker id="func-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
    <marker id="func-arrow-purple" markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto">
      <polygon points="0 0, 12 4, 0 8" fill="#8b5cf6"/>
    </marker>
    <linearGradient id="catGradientC" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#dbeafe;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#bfdbfe;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="catGradientD" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#fef3c7;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#fde68a;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Category C (source) -->
  <g class="source-category">
    <rect x="30" y="40" width="200" height="240" rx="15" fill="url(#catGradientC)" stroke="#3b82f6" stroke-width="2"/>
    <text x="130" y="70" text-anchor="middle" font-size="16" font-weight="600" fill="#1e40af">Category 𝒞</text>

    <!-- Objects in C -->
    <g class="category-object" transform="translate(80, 130)">
      <circle r="22" fill="#fff" stroke="#3b82f6" stroke-width="2"/>
      <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="16">A</text>
    </g>
    <g class="category-object" transform="translate(180, 130)">
      <circle r="22" fill="#fff" stroke="#3b82f6" stroke-width="2"/>
      <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="16">B</text>
    </g>
    <g class="category-object" transform="translate(130, 230)">
      <circle r="22" fill="#fff" stroke="#3b82f6" stroke-width="2"/>
      <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="16">C</text>
    </g>

    <!-- Morphisms in C -->
    <path d="M 105 130 L 155 130" stroke="#333" stroke-width="2" fill="none" marker-end="url(#func-arrow)" class="morphism-arrow"/>
    <text x="130" y="118" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="12">f</text>

    <path d="M 180 155 L 145 205" stroke="#333" stroke-width="2" fill="none" marker-end="url(#func-arrow)" class="morphism-arrow"/>
    <text x="175" y="185" font-family="KaTeX_Math, serif" font-style="italic" font-size="12">g</text>

    <path d="M 95 150 L 115 205" stroke="#333" stroke-width="1.5" stroke-dasharray="4,2" fill="none" marker-end="url(#func-arrow)" class="morphism-arrow"/>
    <text x="85" y="185" font-family="KaTeX_Math, serif" font-style="italic" font-size="11" fill="#64748b">g∘f</text>
  </g>

  <!-- Functor F arrow -->
  <g class="functor-arrow">
    <path d="M 250 160 L 350 160" stroke="#8b5cf6" stroke-width="4" fill="none" marker-end="url(#func-arrow-purple)"/>
    <text x="300" y="145" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="20" fill="#8b5cf6">F</text>
  </g>

  <!-- Category D (target) -->
  <g class="target-category">
    <rect x="370" y="40" width="200" height="240" rx="15" fill="url(#catGradientD)" stroke="#f59e0b" stroke-width="2"/>
    <text x="470" y="70" text-anchor="middle" font-size="16" font-weight="600" fill="#92400e">Category 𝒟</text>

    <!-- Objects in D (images) -->
    <g class="category-object" transform="translate(420, 130)">
      <circle r="22" fill="#fff" stroke="#f59e0b" stroke-width="2"/>
      <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="13">F(A)</text>
    </g>
    <g class="category-object" transform="translate(520, 130)">
      <circle r="22" fill="#fff" stroke="#f59e0b" stroke-width="2"/>
      <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="13">F(B)</text>
    </g>
    <g class="category-object" transform="translate(470, 230)">
      <circle r="22" fill="#fff" stroke="#f59e0b" stroke-width="2"/>
      <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="13">F(C)</text>
    </g>

    <!-- Morphisms in D (images) -->
    <path d="M 445 130 L 495 130" stroke="#333" stroke-width="2" fill="none" marker-end="url(#func-arrow)" class="morphism-arrow"/>
    <text x="470" y="118" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="11">F(f)</text>

    <path d="M 520 155 L 485 205" stroke="#333" stroke-width="2" fill="none" marker-end="url(#func-arrow)" class="morphism-arrow"/>
    <text x="515" y="185" font-family="KaTeX_Math, serif" font-style="italic" font-size="11">F(g)</text>

    <path d="M 435 150 L 455 205" stroke="#333" stroke-width="1.5" stroke-dasharray="4,2" fill="none" marker-end="url(#func-arrow)" class="morphism-arrow"/>
    <text x="420" y="185" font-family="KaTeX_Math, serif" font-style="italic" font-size="10" fill="#64748b">F(g∘f)</text>
  </g>
</svg>

<p style="text-align: center; color: #64748b; font-size: 0.9rem; margin-top: -0.5rem;">
<em>Figure 1:</em> A functor $F$ maps the structure of category $\mathcal{C}$ into category $\mathcal{D}$, preserving composition.
</p>

## The Functor Laws Visualised

### Law 1: Preserving Identity

The functor must map identity morphisms to identity morphisms:

<svg class="commutative-diagram" viewBox="0 0 450 140" style="max-width: 450px; margin: 1.5rem auto; display: block;">
  <defs>
    <marker id="id-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e"/>
    </marker>
  </defs>

  <!-- In C -->
  <g transform="translate(0,0)">
    <text x="100" y="25" text-anchor="middle" font-size="13" fill="#1e40af">In 𝒞</text>
    <g class="category-object" transform="translate(100, 80)">
      <circle r="28" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
      <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="18">A</text>
    </g>
    <path d="M 70 55 C 40 30 40 130 70 105" stroke="#22c55e" stroke-width="2" fill="none" marker-end="url(#id-arrow)" class="morphism-arrow"/>
    <text x="30" y="80" text-anchor="middle" font-family="KaTeX_Math, serif" font-size="12" fill="#22c55e">id<tspan baseline-shift="sub" font-size="9">A</tspan></text>
  </g>

  <!-- Arrow -->
  <path d="M 150 80 L 250 80" stroke="#8b5cf6" stroke-width="3" fill="none" marker-end="url(#func-arrow-purple)"/>
  <text x="200" y="65" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="16" fill="#8b5cf6">F</text>

  <!-- In D -->
  <g transform="translate(250,0)">
    <text x="100" y="25" text-anchor="middle" font-size="13" fill="#92400e">In 𝒟</text>
    <g class="category-object" transform="translate(100, 80)">
      <circle r="28" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
      <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="14">F(A)</text>
    </g>
    <path d="M 70 55 C 40 30 40 130 70 105" stroke="#22c55e" stroke-width="2" fill="none" marker-end="url(#id-arrow)" class="morphism-arrow"/>
    <text x="20" y="80" text-anchor="middle" font-family="KaTeX_Math, serif" font-size="11" fill="#22c55e">id<tspan baseline-shift="sub" font-size="8">F(A)</tspan></text>
  </g>
</svg>

$$F(\text{id}_A) = \text{id}_{F(A)}$$

### Law 2: Preserving Composition

The functor must respect how morphisms compose:

<svg class="commutative-diagram" viewBox="0 0 600 180" style="max-width: 600px; margin: 1.5rem auto; display: block;">
  <defs>
    <marker id="comp-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
  </defs>

  <!-- In C -->
  <g transform="translate(0,20)">
    <text x="130" y="0" text-anchor="middle" font-size="12" fill="#1e40af">In 𝒞</text>
    <g class="category-object" transform="translate(50, 70)">
      <circle r="20" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
      <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="14">A</text>
    </g>
    <g class="category-object" transform="translate(130, 70)">
      <circle r="20" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
      <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="14">B</text>
    </g>
    <g class="category-object" transform="translate(210, 70)">
      <circle r="20" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
      <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="14">C</text>
    </g>
    <path d="M 73 70 L 107 70" stroke="#333" stroke-width="2" fill="none" marker-end="url(#comp-arrow)"/>
    <text x="90" y="58" font-family="KaTeX_Math, serif" font-style="italic" font-size="12">f</text>
    <path d="M 153 70 L 187 70" stroke="#333" stroke-width="2" fill="none" marker-end="url(#comp-arrow)"/>
    <text x="170" y="58" font-family="KaTeX_Math, serif" font-style="italic" font-size="12">g</text>
    <path d="M 65 52 Q 130 15 195 52" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="4,2" fill="none" marker-end="url(#comp-arrow)"/>
    <text x="130" y="25" font-family="KaTeX_Math, serif" font-style="italic" font-size="11" fill="#6366f1">g∘f</text>
  </g>

  <!-- Arrow -->
  <path d="M 250 90 L 330 90" stroke="#8b5cf6" stroke-width="3" fill="none" marker-end="url(#func-arrow-purple)"/>
  <text x="290" y="75" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="16" fill="#8b5cf6">F</text>

  <!-- In D -->
  <g transform="translate(340,20)">
    <text x="130" y="0" text-anchor="middle" font-size="12" fill="#92400e">In 𝒟</text>
    <g class="category-object" transform="translate(50, 70)">
      <circle r="20" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
      <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="11">F(A)</text>
    </g>
    <g class="category-object" transform="translate(130, 70)">
      <circle r="20" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
      <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="11">F(B)</text>
    </g>
    <g class="category-object" transform="translate(210, 70)">
      <circle r="20" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
      <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="11">F(C)</text>
    </g>
    <path d="M 73 70 L 107 70" stroke="#333" stroke-width="2" fill="none" marker-end="url(#comp-arrow)"/>
    <text x="90" y="58" font-family="KaTeX_Math, serif" font-style="italic" font-size="10">F(f)</text>
    <path d="M 153 70 L 187 70" stroke="#333" stroke-width="2" fill="none" marker-end="url(#comp-arrow)"/>
    <text x="170" y="58" font-family="KaTeX_Math, serif" font-style="italic" font-size="10">F(g)</text>
    <path d="M 65 52 Q 130 15 195 52" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="4,2" fill="none" marker-end="url(#comp-arrow)"/>
    <text x="130" y="25" font-family="KaTeX_Math, serif" font-style="italic" font-size="10" fill="#6366f1">F(g)∘F(f)</text>
  </g>

  <!-- Equation -->
  <text x="300" y="165" text-anchor="middle" font-size="14" fill="#333">F(g ∘ f) = F(g) ∘ F(f)</text>
</svg>

<p style="text-align: center; color: #64748b; font-size: 0.9rem; margin-top: -0.5rem;">
<em>Figure 2:</em> The composition law ensures that composing then mapping equals mapping then composing.
</p>

## Fundamental Examples

### The Forgetful Functor

The **forgetful functor** $U: \textbf{Grp} \to \textbf{Set}$ "forgets" the group structure:

| In **Grp** | Under $U$ | In **Set** |
|------------|-----------|------------|
| Group $(G, \cdot, e)$ | $\mapsto$ | Underlying set $G$ |
| Homomorphism $\phi$ | $\mapsto$ | Function $\phi$ |

<div class="example-box" style="background: #f0f9ff; border: 1px solid #0ea5e9; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">

**Example:** The group $(\mathbb{Z}, +, 0)$ is mapped to the set $\mathbb{Z}$. The group structure (addition, identity, inverses) is "forgotten."

</div>

### The Free Functor

The **free functor** $F: \textbf{Set} \to \textbf{Grp}$ constructs the free group on a set:

| In **Set** | Under $F$ | In **Grp** |
|------------|-----------|------------|
| Set $S$ | $\mapsto$ | Free group $F(S)$ |
| Function $f$ | $\mapsto$ | Induced homomorphism |

The free group $F(S)$ consists of all "words" in symbols from $S$ and their formal inverses.

### The List Functor (Haskell)

In **Hask**, the list type constructor `[]` is a functor:

```haskell
-- Object mapping: a type 'a' maps to '[a]'
-- Morphism mapping: 'fmap' lifts functions

instance Functor [] where
    fmap :: (a -> b) -> [a] -> [b]
    fmap _ []     = []
    fmap f (x:xs) = f x : fmap f xs

-- Example usage
fmap (+1) [1, 2, 3]  -- Result: [2, 3, 4]
fmap show [1, 2, 3]  -- Result: ["1", "2", "3"]
```

<div class="functor-laws-haskell" style="background: #1e293b; color: #e2e8f0; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px; font-family: monospace;">

```haskell
-- Functor laws in Haskell:

-- Identity law:
fmap id xs  ≡  xs

-- Composition law:
fmap (g . f) xs  ≡  fmap g (fmap f xs)
```

</div>

### The Maybe Functor

```haskell
instance Functor Maybe where
    fmap :: (a -> b) -> Maybe a -> Maybe b
    fmap _ Nothing  = Nothing
    fmap f (Just x) = Just (f x)

-- Example
fmap (*2) (Just 5)   -- Result: Just 10
fmap (*2) Nothing    -- Result: Nothing
```

## Types of Functors

### Covariant vs Contravariant

So far we've discussed **covariant** functors. A **contravariant** functor reverses the direction of morphisms:

<div class="definition-box" style="background: #fef3c7; border: 2px solid #f59e0b; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">

**Definition (Contravariant Functor):** A **contravariant functor** $F: \mathcal{C} \to \mathcal{D}$ maps:
- Objects: $A \mapsto F(A)$
- Morphisms: $f: A \to B$ maps to $F(f): F(B) \to F(A)$ (reversed!)

With laws:
$$F(\text{id}_A) = \text{id}_{F(A)}$$
$$F(g \circ f) = F(f) \circ F(g) \quad \text{(order reversed)}$$

</div>

<svg class="functor-diagram" viewBox="0 0 500 180" style="max-width: 500px; margin: 1.5rem auto; display: block;">
  <defs>
    <marker id="contra-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444"/>
    </marker>
  </defs>

  <!-- Covariant -->
  <g transform="translate(0,0)">
    <text x="120" y="20" text-anchor="middle" font-size="13" font-weight="600">Covariant</text>
    <g class="category-object" transform="translate(60, 90)">
      <circle r="22" fill="#fff" stroke="#3b82f6" stroke-width="2"/>
      <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="14">A</text>
    </g>
    <g class="category-object" transform="translate(180, 90)">
      <circle r="22" fill="#fff" stroke="#3b82f6" stroke-width="2"/>
      <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="14">B</text>
    </g>
    <path d="M 85 80 L 155 80" stroke="#333" stroke-width="2" fill="none" marker-end="url(#comp-arrow)"/>
    <text x="120" y="70" font-family="KaTeX_Math, serif" font-style="italic" font-size="13">f</text>
    <path d="M 85 100 L 155 100" stroke="#22c55e" stroke-width="2" fill="none" marker-end="url(#comp-arrow)"/>
    <text x="120" y="125" font-family="KaTeX_Math, serif" font-style="italic" font-size="12" fill="#22c55e">F(f)</text>
    <text x="120" y="160" text-anchor="middle" font-size="11" fill="#64748b">Same direction</text>
  </g>

  <!-- Contravariant -->
  <g transform="translate(260,0)">
    <text x="120" y="20" text-anchor="middle" font-size="13" font-weight="600">Contravariant</text>
    <g class="category-object" transform="translate(60, 90)">
      <circle r="22" fill="#fff" stroke="#3b82f6" stroke-width="2"/>
      <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="14">A</text>
    </g>
    <g class="category-object" transform="translate(180, 90)">
      <circle r="22" fill="#fff" stroke="#3b82f6" stroke-width="2"/>
      <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="14">B</text>
    </g>
    <path d="M 85 80 L 155 80" stroke="#333" stroke-width="2" fill="none" marker-end="url(#comp-arrow)"/>
    <text x="120" y="70" font-family="KaTeX_Math, serif" font-style="italic" font-size="13">f</text>
    <path d="M 155 100 L 85 100" stroke="#ef4444" stroke-width="2" fill="none" marker-end="url(#contra-arrow)"/>
    <text x="120" y="125" font-family="KaTeX_Math, serif" font-style="italic" font-size="12" fill="#ef4444">F(f)</text>
    <text x="120" y="160" text-anchor="middle" font-size="11" fill="#64748b">Reversed direction</text>
  </g>
</svg>

<p style="text-align: center; color: #64748b; font-size: 0.9rem; margin-top: -0.5rem;">
<em>Figure 3:</em> Covariant functors preserve arrow direction; contravariant functors reverse it.
</p>

### Endofunctors

An **endofunctor** is a functor from a category to itself: $F: \mathcal{C} \to \mathcal{C}$.

In programming, most functors we encounter are endofunctors on **Hask** (or similar categories of types).

### The Identity Functor

For any category $\mathcal{C}$, the **identity functor** $\text{Id}_{\mathcal{C}}: \mathcal{C} \to \mathcal{C}$ maps every object and morphism to itself:
$$\text{Id}_{\mathcal{C}}(A) = A, \quad \text{Id}_{\mathcal{C}}(f) = f$$

## Functor Composition

Functors can be composed! If $F: \mathcal{C} \to \mathcal{D}$ and $G: \mathcal{D} \to \mathcal{E}$, then $G \circ F: \mathcal{C} \to \mathcal{E}$.

<svg class="commutative-diagram" viewBox="0 0 550 140" style="max-width: 550px; margin: 1.5rem auto; display: block;">
  <!-- Categories -->
  <g class="category-object" transform="translate(80, 70)">
    <circle r="35" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-size="18" font-weight="500" fill="#1e40af">𝒞</text>
  </g>
  <g class="category-object" transform="translate(275, 70)">
    <circle r="35" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-size="18" font-weight="500" fill="#92400e">𝒟</text>
  </g>
  <g class="category-object" transform="translate(470, 70)">
    <circle r="35" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-size="18" font-weight="500" fill="#166534">ℰ</text>
  </g>

  <!-- Functor arrows -->
  <path d="M 120 70 L 235 70" stroke="#8b5cf6" stroke-width="3" fill="none" marker-end="url(#func-arrow-purple)"/>
  <text x="177" y="55" font-family="KaTeX_Math, serif" font-style="italic" font-size="18" fill="#8b5cf6">F</text>

  <path d="M 315 70 L 430 70" stroke="#8b5cf6" stroke-width="3" fill="none" marker-end="url(#func-arrow-purple)"/>
  <text x="372" y="55" font-family="KaTeX_Math, serif" font-style="italic" font-size="18" fill="#8b5cf6">G</text>

  <!-- Composite functor (curved) -->
  <path d="M 110 40 Q 275 -20 440 40" stroke="#ec4899" stroke-width="2.5" stroke-dasharray="6,3" fill="none" marker-end="url(#func-arrow-purple)"/>
  <text x="275" y="8" font-family="KaTeX_Math, serif" font-style="italic" font-size="16" fill="#ec4899">G ∘ F</text>
</svg>

<p style="text-align: center; color: #64748b; font-size: 0.9rem; margin-top: -0.5rem;">
<em>Figure 4:</em> Functors compose: $G \circ F$ first applies $F$, then $G$.
</p>

This composition is:
- **Associative:** $(H \circ G) \circ F = H \circ (G \circ F)$
- **Unital:** $\text{Id}_{\mathcal{D}} \circ F = F = F \circ \text{Id}_{\mathcal{C}}$

Thus, categories and functors themselves form a category: **Cat**!

## Programming Perspective

<div class="programming-insight" style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); color: #e0e7ff; padding: 1.5rem; margin: 1.5rem 0; border-radius: 12px;">

**Key Insight for Programmers:**

A functor in programming is a **container type** that supports `map`/`fmap`:

```haskell
class Functor f where
    fmap :: (a -> b) -> f a -> f b
```

This says: "Give me a function `a -> b`, and I'll apply it inside my container, transforming `f a` into `f b`."

Common functors:
- `[]` (List) — map over elements
- `Maybe` — map if present
- `Either e` — map the Right value
- `IO` — map over computed values
- `(->)` r — map over function results

</div>

---

## References

<div class="references" style="font-size: 0.9rem; line-height: 1.8; border-top: 1px solid #e2e8f0; padding-top: 1.5rem; margin-top: 2rem;">

Awodey, S. (2010) *Category Theory*. 2nd edn. Oxford: Oxford University Press.

Mac Lane, S. (1998) *Categories for the Working Mathematician*. 2nd edn. New York: Springer-Verlag.

Milewski, B. (2019) *Category Theory for Programmers*. Available at: https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/.

Riehl, E. (2016) *Category Theory in Context*. Aurora: Dover Publications.

Wadler, P. (1992) 'The essence of functional programming', in *Proceedings of the 19th ACM SIGPLAN-SIGACT symposium on Principles of programming languages*. ACM, pp. 1–14.

</div>
