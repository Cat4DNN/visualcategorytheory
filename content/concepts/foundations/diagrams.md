+++
title = "Commutative Diagrams"
description = "Master the visual language of category theory: diagrams that express equalities between compositions of morphisms."
date = 2024-01-17
weight = 3
template = "docs/page.html"

[taxonomies]
tags = ["diagrams", "commutative", "visual"]

[extra]
lead = "Commutative diagrams are the visual heartbeat of category theory. They transform complex equational reasoning into elegant pictures where 'all paths with the same endpoints are equal.'"
math = true
toc = true
+++

## The Power of Pictures

Category theorists are fond of saying that a good diagram is worth a thousand words. A **commutative diagram** is a directed graph where:

- **Nodes** represent objects in a category
- **Edges** represent morphisms between objects
- **Commutativity** means all directed paths between the same two objects yield equal composite morphisms

<div class="key-insight" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 1.5rem 0; border-radius: 0 8px 8px 0;">

**The Fundamental Principle:** A diagram **commutes** if, for every pair of objects $X$ and $Y$ and any two paths from $X$ to $Y$, the compositions along those paths are equal.

</div>

## The Commutative Triangle

The simplest non-trivial commutative diagram is the **triangle**, expressing that one morphism factors through another.

<svg class="commutative-diagram" viewBox="0 0 350 280" style="max-width: 350px; margin: 1.5rem auto; display: block;">
  <defs>
    <marker id="tri-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
    <marker id="tri-arrow-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6"/>
    </marker>
  </defs>
  <!-- Object A (top) -->
  <g class="category-object" transform="translate(175, 50)">
    <circle r="30" fill="#fff" stroke="#6366f1" stroke-width="2.5"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="20">A</text>
  </g>
  <!-- Object B (bottom-left) -->
  <g class="category-object" transform="translate(70, 210)">
    <circle r="30" fill="#fff" stroke="#6366f1" stroke-width="2.5"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="20">B</text>
  </g>
  <!-- Object C (bottom-right) -->
  <g class="category-object" transform="translate(280, 210)">
    <circle r="30" fill="#fff" stroke="#6366f1" stroke-width="2.5"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="20">C</text>
  </g>
  <!-- Arrow f: A → B -->
  <path d="M 150 72 L 95 185" stroke="#10b981" stroke-width="2.5" fill="none" marker-end="url(#tri-arrow)" class="morphism-arrow"/>
  <text x="105" y="115" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="16" fill="#10b981">f</text>
  <!-- Arrow g: B → C -->
  <path d="M 105 210 L 245 210" stroke="#f59e0b" stroke-width="2.5" fill="none" marker-end="url(#tri-arrow)" class="morphism-arrow"/>
  <text x="175" y="235" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="16" fill="#f59e0b">g</text>
  <!-- Arrow h: A → C (diagonal) -->
  <path d="M 200 72 L 255 185" stroke="#3b82f6" stroke-width="2.5" fill="none" marker-end="url(#tri-arrow-blue)" class="morphism-arrow"/>
  <text x="245" y="115" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="16" fill="#3b82f6">h</text>
  <!-- Commutativity annotation -->
  <text x="175" y="270" text-anchor="middle" font-size="14" fill="#64748b" font-style="italic">h = g ∘ f</text>
</svg>

<p style="text-align: center; color: #64748b; font-size: 0.9rem; margin-top: -0.5rem;">
<em>Figure 1:</em> A commutative triangle. The direct path $h$ equals the composition $g \circ f$.
</p>

This diagram asserts that $h = g \circ f$, or equivalently, that $h$ **factors through** $B$ via $f$ and $g$.

## The Commutative Square

The **square** (or **commutative square**) is perhaps the most ubiquitous diagram in category theory.

<svg class="commutative-diagram naturality-square" viewBox="0 0 350 300" style="max-width: 350px; margin: 1.5rem auto; display: block;">
  <defs>
    <marker id="sq-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
  </defs>
  <!-- Background highlight -->
  <rect x="70" y="60" width="210" height="170" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="1" stroke-dasharray="4,2"/>

  <!-- Object A (top-left) -->
  <g class="category-object" transform="translate(90, 80)">
    <circle r="28" fill="#fff" stroke="#6366f1" stroke-width="2.5"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="18">A</text>
  </g>
  <!-- Object B (top-right) -->
  <g class="category-object" transform="translate(260, 80)">
    <circle r="28" fill="#fff" stroke="#6366f1" stroke-width="2.5"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="18">B</text>
  </g>
  <!-- Object C (bottom-left) -->
  <g class="category-object" transform="translate(90, 210)">
    <circle r="28" fill="#fff" stroke="#6366f1" stroke-width="2.5"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="18">C</text>
  </g>
  <!-- Object D (bottom-right) -->
  <g class="category-object" transform="translate(260, 210)">
    <circle r="28" fill="#fff" stroke="#6366f1" stroke-width="2.5"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="18">D</text>
  </g>
  <!-- Arrow f: A → B (top) -->
  <path d="M 122 80 L 228 80" stroke="#333" stroke-width="2" fill="none" marker-end="url(#sq-arrow)" class="morphism-arrow"/>
  <text x="175" y="65" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="15">f</text>
  <!-- Arrow g: A → C (left) -->
  <path d="M 90 112 L 90 178" stroke="#333" stroke-width="2" fill="none" marker-end="url(#sq-arrow)" class="morphism-arrow"/>
  <text x="70" y="145" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="15">g</text>
  <!-- Arrow h: B → D (right) -->
  <path d="M 260 112 L 260 178" stroke="#333" stroke-width="2" fill="none" marker-end="url(#sq-arrow)" class="morphism-arrow"/>
  <text x="280" y="145" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="15">h</text>
  <!-- Arrow k: C → D (bottom) -->
  <path d="M 122 210 L 228 210" stroke="#333" stroke-width="2" fill="none" marker-end="url(#sq-arrow)" class="morphism-arrow"/>
  <text x="175" y="235" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="15">k</text>

  <!-- Commutativity annotation -->
  <text x="175" y="275" text-anchor="middle" font-size="14" fill="#166534" font-weight="500">h ∘ f = k ∘ g</text>
</svg>

<p style="text-align: center; color: #64748b; font-size: 0.9rem; margin-top: -0.5rem;">
<em>Figure 2:</em> A commutative square. Going right-then-down equals going down-then-right.
</p>

The square commutes when:
$$h \circ f = k \circ g$$

Both paths from $A$ to $D$ yield the same morphism.

## Reading Diagrams

### Path Equivalence

When we say a diagram **commutes**, we mean:

<div class="rule-box" style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">

**For any two objects $X$ and $Y$ in the diagram, if there are multiple directed paths from $X$ to $Y$, then the composite morphisms along all such paths are equal.**

</div>

### Example: The Pentagon

Consider this larger diagram:

<svg class="commutative-diagram" viewBox="0 0 450 350" style="max-width: 450px; margin: 1.5rem auto; display: block;">
  <defs>
    <marker id="pent-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#333"/>
    </marker>
  </defs>
  <!-- Pentagon vertices -->
  <!-- Top -->
  <g class="category-object" transform="translate(225, 40)">
    <circle r="25" fill="#fff" stroke="#6366f1" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="16">A</text>
  </g>
  <!-- Top-right -->
  <g class="category-object" transform="translate(380, 120)">
    <circle r="25" fill="#fff" stroke="#6366f1" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="16">B</text>
  </g>
  <!-- Bottom-right -->
  <g class="category-object" transform="translate(320, 280)">
    <circle r="25" fill="#fff" stroke="#6366f1" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="16">C</text>
  </g>
  <!-- Bottom-left -->
  <g class="category-object" transform="translate(130, 280)">
    <circle r="25" fill="#fff" stroke="#6366f1" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="16">D</text>
  </g>
  <!-- Top-left -->
  <g class="category-object" transform="translate(70, 120)">
    <circle r="25" fill="#fff" stroke="#6366f1" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="16">E</text>
  </g>

  <!-- Arrows -->
  <path d="M 248 52 L 355 108" stroke="#10b981" stroke-width="2" fill="none" marker-end="url(#pent-arrow)" class="morphism-arrow"/>
  <text x="310" y="68" font-family="KaTeX_Math, serif" font-style="italic" font-size="13" fill="#10b981">f</text>

  <path d="M 380 148 L 335 255" stroke="#f59e0b" stroke-width="2" fill="none" marker-end="url(#pent-arrow)" class="morphism-arrow"/>
  <text x="370" y="200" font-family="KaTeX_Math, serif" font-style="italic" font-size="13" fill="#f59e0b">g</text>

  <path d="M 293 280 L 158 280" stroke="#3b82f6" stroke-width="2" fill="none" marker-end="url(#pent-arrow)" class="morphism-arrow"/>
  <text x="225" y="300" font-family="KaTeX_Math, serif" font-style="italic" font-size="13" fill="#3b82f6">h</text>

  <path d="M 115 255 L 72 148" stroke="#8b5cf6" stroke-width="2" fill="none" marker-end="url(#pent-arrow)" class="morphism-arrow"/>
  <text x="75" y="200" font-family="KaTeX_Math, serif" font-style="italic" font-size="13" fill="#8b5cf6">k</text>

  <path d="M 95 108 L 202 52" stroke="#ec4899" stroke-width="2" fill="none" marker-end="url(#pent-arrow)" class="morphism-arrow"/>
  <text x="138" y="68" font-family="KaTeX_Math, serif" font-style="italic" font-size="13" fill="#ec4899">m</text>

  <!-- Centre label -->
  <text x="225" y="175" text-anchor="middle" font-size="12" fill="#64748b" font-style="italic">All paths commute</text>
</svg>

<p style="text-align: center; color: #64748b; font-size: 0.9rem; margin-top: -0.5rem;">
<em>Figure 3:</em> A commutative pentagon. If this diagram commutes, then $f \circ m = g \circ f = \cdots$ (appropriately composed).
</p>

## Diagram Chasing

**Diagram chasing** is the technique of proving properties by following arrows around commutative diagrams. It's a powerful method that leverages the visual structure to simplify proofs.

### Example: Proving Uniqueness

<svg class="commutative-diagram" viewBox="0 0 400 200" style="max-width: 400px; margin: 1.5rem auto; display: block;">
  <defs>
    <marker id="chase-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
    <marker id="chase-dashed" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444"/>
    </marker>
  </defs>

  <!-- Objects -->
  <g class="category-object" transform="translate(80, 100)">
    <circle r="26" fill="#fff" stroke="#6366f1" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="16">A</text>
  </g>
  <g class="category-object" transform="translate(200, 40)">
    <circle r="26" fill="#fff" stroke="#6366f1" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="16">P</text>
  </g>
  <g class="category-object" transform="translate(200, 160)">
    <circle r="26" fill="#fff" stroke="#6366f1" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="16">B</text>
  </g>
  <g class="category-object" transform="translate(320, 100)">
    <circle r="26" fill="#fff" stroke="#6366f1" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="16">C</text>
  </g>

  <!-- Solid arrows -->
  <path d="M 103 82 L 177 55" stroke="#333" stroke-width="2" fill="none" marker-end="url(#chase-arrow)"/>
  <text x="130" y="55" font-family="KaTeX_Math, serif" font-style="italic" font-size="13">p</text>

  <path d="M 103 118 L 177 145" stroke="#333" stroke-width="2" fill="none" marker-end="url(#chase-arrow)"/>
  <text x="130" y="150" font-family="KaTeX_Math, serif" font-style="italic" font-size="13">q</text>

  <path d="M 223 55 L 297 85" stroke="#333" stroke-width="2" fill="none" marker-end="url(#chase-arrow)"/>
  <text x="270" y="55" font-family="KaTeX_Math, serif" font-style="italic" font-size="13">f</text>

  <path d="M 223 145 L 297 115" stroke="#333" stroke-width="2" fill="none" marker-end="url(#chase-arrow)"/>
  <text x="270" y="150" font-family="KaTeX_Math, serif" font-style="italic" font-size="13">g</text>

  <!-- Dashed unique arrow -->
  <path d="M 108 100 L 292 100" stroke="#ef4444" stroke-width="2" stroke-dasharray="6,3" fill="none" marker-end="url(#chase-dashed)"/>
  <text x="200" y="90" font-family="KaTeX_Math, serif" font-style="italic" font-size="13" fill="#ef4444">∃! u</text>
</svg>

<p style="text-align: center; color: #64748b; font-size: 0.9rem; margin-top: -0.5rem;">
<em>Figure 4:</em> A universal property diagram. The dashed arrow indicates a unique morphism that makes everything commute.
</p>

When we write "$\exists! u$" in a diagram, we assert:
1. **Existence:** Such a morphism $u$ exists
2. **Uniqueness:** Any morphism satisfying the same property equals $u$

## Special Diagram Types

### Pullback Squares

A **pullback** (or fibre product) is a universal commutative square:

<svg class="commutative-diagram" viewBox="0 0 320 280" style="max-width: 320px; margin: 1.5rem auto; display: block;">
  <defs>
    <marker id="pb-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
  </defs>
  <!-- Pullback corner symbol -->
  <path d="M 95 105 L 95 85 L 115 85" stroke="#22c55e" stroke-width="2" fill="none"/>

  <!-- Objects -->
  <g class="category-object" transform="translate(80, 70)">
    <circle r="25" fill="#dcfce7" stroke="#22c55e" stroke-width="2.5"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="15">P</text>
  </g>
  <g class="category-object" transform="translate(240, 70)">
    <circle r="25" fill="#fff" stroke="#6366f1" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="15">B</text>
  </g>
  <g class="category-object" transform="translate(80, 200)">
    <circle r="25" fill="#fff" stroke="#6366f1" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="15">A</text>
  </g>
  <g class="category-object" transform="translate(240, 200)">
    <circle r="25" fill="#fff" stroke="#6366f1" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="15">C</text>
  </g>

  <!-- Arrows -->
  <path d="M 108 70 L 212 70" stroke="#333" stroke-width="2" fill="none" marker-end="url(#pb-arrow)"/>
  <text x="160" y="55" font-family="KaTeX_Math, serif" font-style="italic" font-size="14">p<tspan baseline-shift="sub" font-size="10">B</tspan></text>

  <path d="M 80 98 L 80 172" stroke="#333" stroke-width="2" fill="none" marker-end="url(#pb-arrow)"/>
  <text x="60" y="135" font-family="KaTeX_Math, serif" font-style="italic" font-size="14">p<tspan baseline-shift="sub" font-size="10">A</tspan></text>

  <path d="M 240 98 L 240 172" stroke="#333" stroke-width="2" fill="none" marker-end="url(#pb-arrow)"/>
  <text x="260" y="135" font-family="KaTeX_Math, serif" font-style="italic" font-size="14">g</text>

  <path d="M 108 200 L 212 200" stroke="#333" stroke-width="2" fill="none" marker-end="url(#pb-arrow)"/>
  <text x="160" y="225" font-family="KaTeX_Math, serif" font-style="italic" font-size="14">f</text>

  <text x="160" y="260" text-anchor="middle" font-size="12" fill="#22c55e" font-weight="500">Pullback of f along g</text>
</svg>

<p style="text-align: center; color: #64748b; font-size: 0.9rem; margin-top: -0.5rem;">
<em>Figure 5:</em> A pullback square. The corner symbol indicates $P = A \times_C B$ is the universal object making the square commute.
</p>

### Pushout Squares

The **pushout** (or amalgamated sum) is the dual concept:

<svg class="commutative-diagram" viewBox="0 0 320 280" style="max-width: 320px; margin: 1.5rem auto; display: block;">
  <defs>
    <marker id="po-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
  </defs>
  <!-- Pushout corner symbol (opposite corner) -->
  <path d="M 225 195 L 225 215 L 205 215" stroke="#f59e0b" stroke-width="2" fill="none"/>

  <!-- Objects -->
  <g class="category-object" transform="translate(80, 70)">
    <circle r="25" fill="#fff" stroke="#6366f1" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="15">A</text>
  </g>
  <g class="category-object" transform="translate(240, 70)">
    <circle r="25" fill="#fff" stroke="#6366f1" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="15">B</text>
  </g>
  <g class="category-object" transform="translate(80, 200)">
    <circle r="25" fill="#fff" stroke="#6366f1" stroke-width="2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="15">C</text>
  </g>
  <g class="category-object" transform="translate(240, 200)">
    <circle r="25" fill="#fef3c7" stroke="#f59e0b" stroke-width="2.5"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math, serif" font-style="italic" font-size="15">P</text>
  </g>

  <!-- Arrows -->
  <path d="M 108 70 L 212 70" stroke="#333" stroke-width="2" fill="none" marker-end="url(#po-arrow)"/>
  <text x="160" y="55" font-family="KaTeX_Math, serif" font-style="italic" font-size="14">f</text>

  <path d="M 80 98 L 80 172" stroke="#333" stroke-width="2" fill="none" marker-end="url(#po-arrow)"/>
  <text x="60" y="135" font-family="KaTeX_Math, serif" font-style="italic" font-size="14">g</text>

  <path d="M 240 98 L 240 172" stroke="#333" stroke-width="2" fill="none" marker-end="url(#po-arrow)"/>
  <text x="260" y="135" font-family="KaTeX_Math, serif" font-style="italic" font-size="14">i<tspan baseline-shift="sub" font-size="10">B</tspan></text>

  <path d="M 108 200 L 212 200" stroke="#333" stroke-width="2" fill="none" marker-end="url(#po-arrow)"/>
  <text x="160" y="225" font-family="KaTeX_Math, serif" font-style="italic" font-size="14">i<tspan baseline-shift="sub" font-size="10">C</tspan></text>

  <text x="160" y="260" text-anchor="middle" font-size="12" fill="#f59e0b" font-weight="500">Pushout of f and g</text>
</svg>

<p style="text-align: center; color: #64748b; font-size: 0.9rem; margin-top: -0.5rem;">
<em>Figure 6:</em> A pushout square. The corner symbol indicates $P = B +_A C$ is the universal object making the square commute.
</p>

## Diagram Conventions

<div class="conventions-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">

<div style="background: #f8fafc; padding: 1rem; border-radius: 8px; text-align: centre;">

**Solid arrows**
<br>Given morphisms

</div>

<div style="background: #f8fafc; padding: 1rem; border-radius: 8px; text-align: centre;">

**Dashed arrows**
<br>Morphisms to be constructed

</div>

<div style="background: #f8fafc; padding: 1rem; border-radius: 8px; text-align: centre;">

**Double arrows**
<br>Natural transformations

</div>

<div style="background: #f8fafc; padding: 1rem; border-radius: 8px; text-align: centre;">

**Corner symbols**
<br>Universal properties

</div>

</div>

---

## References

<div class="references" style="font-size: 0.9rem; line-height: 1.8; border-top: 1px solid #e2e8f0; padding-top: 1.5rem; margin-top: 2rem;">

Awodey, S. (2010) *Category Theory*. 2nd edn. Oxford: Oxford University Press.

Leinster, T. (2014) *Basic Category Theory*. Cambridge: Cambridge University Press.

Mac Lane, S. (1998) *Categories for the Working Mathematician*. 2nd edn. New York: Springer-Verlag.

Riehl, E. (2016) *Category Theory in Context*. Aurora: Dover Publications.

</div>
