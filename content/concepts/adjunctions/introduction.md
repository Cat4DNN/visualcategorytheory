+++
title = "Introduction to Adjunctions"
description = "Discovering the deep relationship between functors that underlies much of mathematics and computer science."
weight = 1
template = "docs/page.html"

[extra]
lead = "An adjunction is a pair of functors standing in a special relationship—one that balances 'freedom' against 'forgetfulness', construction against destruction. This elegant concept unifies an astonishing variety of mathematical phenomena."
toc = true
math = true
+++

## What is an Adjunction?

An **adjunction** between categories $\mathcal{C}$ and $\mathcal{D}$ consists of:

- A **left adjoint** functor $F : \mathcal{C} \to \mathcal{D}$
- A **right adjoint** functor $G : \mathcal{D} \to \mathcal{C}$

written $F \dashv G$ (read "$F$ is left adjoint to $G$").

The key property is a **natural isomorphism** of hom-sets:

$$\text{Hom}_{\mathcal{D}}(F(A), B) \cong \text{Hom}_{\mathcal{C}}(A, G(B))$$

for all objects $A$ in $\mathcal{C}$ and $B$ in $\mathcal{D}$.

<div class="svg-diagram" style="margin: 2.5rem 0;">
<svg viewBox="0 0 700 280" style="width: 100%; max-width: 700px; display: block; margin: 0 auto; font-family: 'Latin Modern Roman', 'Times New Roman', serif;">
  <defs>
    <marker id="adj-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#374151"/>
    </marker>
    <marker id="adj-arrow-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563eb"/>
    </marker>
    <marker id="adj-arrow-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#dc2626"/>
    </marker>
    <linearGradient id="cat-c-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#dbeafe;stop-opacity:0.4"/>
      <stop offset="100%" style="stop-color:#bfdbfe;stop-opacity:0.4"/>
    </linearGradient>
    <linearGradient id="cat-d-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#fce7f3;stop-opacity:0.4"/>
      <stop offset="100%" style="stop-color:#fbcfe8;stop-opacity:0.4"/>
    </linearGradient>
  </defs>

  <!-- Title -->
  <text x="350" y="25" text-anchor="middle" font-size="17" font-weight="600" fill="#1e293b">The Adjunction F ⊣ G</text>

  <!-- Category C box -->
  <rect x="40" y="50" width="250" height="200" rx="12" fill="url(#cat-c-grad)" stroke="#3b82f6" stroke-width="2"/>
  <text x="165" y="75" text-anchor="middle" font-size="15" font-weight="600" fill="#1e40af">Category 𝒞</text>

  <!-- Category D box -->
  <rect x="410" y="50" width="250" height="200" rx="12" fill="url(#cat-d-grad)" stroke="#ec4899" stroke-width="2"/>
  <text x="535" y="75" text-anchor="middle" font-size="15" font-weight="600" fill="#9d174d">Category 𝒟</text>

  <!-- Objects in C -->
  <circle cx="120" cy="150" r="26" fill="#fff" stroke="#2563eb" stroke-width="2"/>
  <text x="120" y="155" text-anchor="middle" font-size="16" font-style="italic" fill="#1e293b">A</text>

  <circle cx="220" cy="150" r="26" fill="#fff" stroke="#2563eb" stroke-width="2"/>
  <text x="220" y="155" text-anchor="middle" font-size="14" fill="#1e293b">G(B)</text>

  <!-- Objects in D -->
  <circle cx="480" cy="150" r="26" fill="#fff" stroke="#ec4899" stroke-width="2"/>
  <text x="480" y="155" text-anchor="middle" font-size="14" fill="#1e293b">F(A)</text>

  <circle cx="580" cy="150" r="26" fill="#fff" stroke="#ec4899" stroke-width="2"/>
  <text x="580" y="155" text-anchor="middle" font-size="16" font-style="italic" fill="#1e293b">B</text>

  <!-- Functor F (top, going right) -->
  <path d="M 300 100 Q 350 60 400 100" fill="none" stroke="#dc2626" stroke-width="2.5" marker-end="url(#adj-arrow-red)"/>
  <text x="350" y="55" text-anchor="middle" font-size="15" font-weight="600" fill="#dc2626">F</text>
  <text x="350" y="75" text-anchor="middle" font-size="11" fill="#991b1b">left adjoint</text>

  <!-- Functor G (bottom, going left) -->
  <path d="M 400 200 Q 350 240 300 200" fill="none" stroke="#2563eb" stroke-width="2.5" marker-end="url(#adj-arrow-blue)"/>
  <text x="350" y="245" text-anchor="middle" font-size="15" font-weight="600" fill="#2563eb">G</text>
  <text x="350" y="262" text-anchor="middle" font-size="11" fill="#1e40af">right adjoint</text>

  <!-- Morphism in C: A -> G(B) -->
  <path d="M 148 150 L 191 150" fill="none" stroke="#374151" stroke-width="2" marker-end="url(#adj-arrow)"/>

  <!-- Morphism in D: F(A) -> B -->
  <path d="M 508 150 L 551 150" fill="none" stroke="#374151" stroke-width="2" marker-end="url(#adj-arrow)"/>

  <!-- Bijection arrow -->
  <text x="350" y="155" text-anchor="middle" font-size="20" fill="#059669">⟷</text>
  <text x="350" y="175" text-anchor="middle" font-size="12" fill="#059669">natural bijection</text>
</svg>
</div>

This says: **morphisms from the "free" object $F(A)$ into $B$ correspond bijectively to morphisms from $A$ into the "underlying" object $G(B)$**.

`★ Insight ─────────────────────────────────────`

- The left adjoint $F$ is often a "free" construction (adding structure)
- The right adjoint $G$ is often a "forgetful" functor (discarding structure)
- The bijection says: to map *out* of a free object, it suffices to map *from* its generators

`─────────────────────────────────────────────────`

## Unit and Counit

An adjunction can equivalently be specified by two natural transformations:

- **Unit**: $\eta : \text{Id}_{\mathcal{C}} \Rightarrow G \circ F$
- **Counit**: $\varepsilon : F \circ G \Rightarrow \text{Id}_{\mathcal{D}}$

<div class="svg-diagram" style="margin: 2.5rem 0;">
<svg viewBox="0 0 700 320" style="width: 100%; max-width: 700px; display: block; margin: 0 auto; font-family: 'Latin Modern Roman', 'Times New Roman', serif;">
  <defs>
    <marker id="unit-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#059669"/>
    </marker>
    <marker id="counit-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#d97706"/>
    </marker>
  </defs>

  <!-- Title -->
  <text x="350" y="25" text-anchor="middle" font-size="16" font-weight="600" fill="#1e293b">Unit and Counit</text>

  <!-- Unit section -->
  <rect x="40" y="50" width="290" height="120" rx="10" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
  <text x="185" y="75" text-anchor="middle" font-size="14" font-weight="600" fill="#065f46">Unit η : Id → G∘F</text>

  <!-- A -> GF(A) -->
  <circle cx="100" cy="120" r="22" fill="#fff" stroke="#059669" stroke-width="2"/>
  <text x="100" y="125" text-anchor="middle" font-size="14" font-style="italic" fill="#1e293b">A</text>

  <circle cx="260" cy="120" r="26" fill="#fff" stroke="#059669" stroke-width="2"/>
  <text x="260" y="115" text-anchor="middle" font-size="12" fill="#1e293b">G(F(A))</text>
  <text x="260" y="132" text-anchor="middle" font-size="10" fill="#059669">= GF(A)</text>

  <path d="M 125 120 L 231 120" fill="none" stroke="#059669" stroke-width="2.5" marker-end="url(#unit-arrow)"/>
  <text x="178" y="108" text-anchor="middle" font-size="14" fill="#059669">η<tspan baseline-shift="sub" font-size="10">A</tspan></text>

  <!-- Counit section -->
  <rect x="370" y="50" width="290" height="120" rx="10" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="515" y="75" text-anchor="middle" font-size="14" font-weight="600" fill="#92400e">Counit ε : F∘G → Id</text>

  <!-- FG(B) -> B -->
  <circle cx="430" cy="120" r="26" fill="#fff" stroke="#d97706" stroke-width="2"/>
  <text x="430" y="115" text-anchor="middle" font-size="12" fill="#1e293b">F(G(B))</text>
  <text x="430" y="132" text-anchor="middle" font-size="10" fill="#d97706">= FG(B)</text>

  <circle cx="600" cy="120" r="22" fill="#fff" stroke="#d97706" stroke-width="2"/>
  <text x="600" y="125" text-anchor="middle" font-size="14" font-style="italic" fill="#1e293b">B</text>

  <path d="M 459 120 L 575 120" fill="none" stroke="#d97706" stroke-width="2.5" marker-end="url(#counit-arrow)"/>
  <text x="517" y="108" text-anchor="middle" font-size="14" fill="#d97706">ε<tspan baseline-shift="sub" font-size="10">B</tspan></text>

  <!-- Intuition boxes -->
  <rect x="40" y="190" width="290" height="110" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
  <text x="185" y="215" text-anchor="middle" font-size="13" font-weight="600" fill="#166534">Intuition for η</text>
  <text x="185" y="240" text-anchor="middle" font-size="12" fill="#374151">"Insert A into the free structure,</text>
  <text x="185" y="258" text-anchor="middle" font-size="12" fill="#374151">then view the result in 𝒞"</text>
  <text x="185" y="285" text-anchor="middle" font-size="11" font-style="italic" fill="#64748b">The universal "embedding"</text>

  <rect x="370" y="190" width="290" height="110" rx="8" fill="#fefce8" stroke="#fde047" stroke-width="1.5"/>
  <text x="515" y="215" text-anchor="middle" font-size="13" font-weight="600" fill="#854d0e">Intuition for ε</text>
  <text x="515" y="240" text-anchor="middle" font-size="12" fill="#374151">"Apply the free construction to</text>
  <text x="515" y="258" text-anchor="middle" font-size="12" fill="#374151">an underlying structure, then collapse"</text>
  <text x="515" y="285" text-anchor="middle" font-size="11" font-style="italic" fill="#64748b">The universal "evaluation"</text>
</svg>
</div>

### The Correspondence

The unit and counit relate to the hom-set bijection:

- Given $f : A \to G(B)$ in $\mathcal{C}$, the corresponding morphism $\bar{f} : F(A) \to B$ is:
$$\bar{f} = \varepsilon_B \circ F(f)$$

- Given $g : F(A) \to B$ in $\mathcal{D}$, the corresponding morphism $\tilde{g} : A \to G(B)$ is:
$$\tilde{g} = G(g) \circ \eta_A$$

<div class="svg-diagram" style="margin: 2rem 0;">
<svg viewBox="0 0 700 200" style="width: 100%; max-width: 700px; display: block; margin: 0 auto; font-family: 'Latin Modern Roman', 'Times New Roman', serif;">
  <!-- Left: f ↦ f̄ -->
  <rect x="30" y="30" width="300" height="150" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="2"/>
  <text x="180" y="55" text-anchor="middle" font-size="13" font-weight="600" fill="#15803d">Transpose f ↦ f̄</text>

  <text x="80" y="90" font-size="12" fill="#374151">Given: f : A → G(B)</text>
  <text x="80" y="115" font-size="12" fill="#374151">Apply F: F(f) : F(A) → FG(B)</text>
  <text x="80" y="140" font-size="12" fill="#374151">Compose with ε:</text>
  <text x="100" y="160" font-size="13" font-weight="600" fill="#059669">f̄ = ε<tspan baseline-shift="sub" font-size="10">B</tspan> ∘ F(f) : F(A) → B</text>

  <!-- Right: g ↦ g̃ -->
  <rect x="370" y="30" width="300" height="150" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="520" y="55" text-anchor="middle" font-size="13" font-weight="600" fill="#b45309">Transpose g ↦ g̃</text>

  <text x="400" y="90" font-size="12" fill="#374151">Given: g : F(A) → B</text>
  <text x="400" y="115" font-size="12" fill="#374151">Apply G: G(g) : GF(A) → G(B)</text>
  <text x="400" y="140" font-size="12" fill="#374151">Compose with η:</text>
  <text x="420" y="160" font-size="13" font-weight="600" fill="#d97706">g̃ = G(g) ∘ η<tspan baseline-shift="sub" font-size="10">A</tspan> : A → G(B)</text>
</svg>
</div>

## The Triangle Identities

For unit and counit to define an adjunction, they must satisfy two **triangle identities**:

$$(\varepsilon F) \circ (F \eta) = \text{id}_F$$
$$(G \varepsilon) \circ (\eta G) = \text{id}_G$$

<div class="svg-diagram" style="margin: 2.5rem 0;">
<svg viewBox="0 0 700 280" style="width: 100%; max-width: 700px; display: block; margin: 0 auto; font-family: 'Latin Modern Roman', 'Times New Roman', serif;">
  <defs>
    <marker id="tri-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#374151"/>
    </marker>
  </defs>

  <!-- Title -->
  <text x="350" y="25" text-anchor="middle" font-size="16" font-weight="600" fill="#1e293b">Triangle Identities</text>

  <!-- Left triangle -->
  <text x="175" y="55" text-anchor="middle" font-size="14" font-weight="600" fill="#dc2626">First Triangle: (εF) ∘ (Fη) = id<tspan baseline-shift="sub" font-size="10">F</tspan></text>

  <circle cx="100" cy="120" r="26" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
  <text x="100" y="125" text-anchor="middle" font-size="13" fill="#1e293b">F(A)</text>

  <circle cx="250" cy="120" r="30" fill="#f3e8ff" stroke="#7c3aed" stroke-width="2"/>
  <text x="250" y="115" text-anchor="middle" font-size="11" fill="#1e293b">FGF(A)</text>
  <text x="250" y="132" text-anchor="middle" font-size="10" fill="#7c3aed">= F(GF(A))</text>

  <circle cx="175" cy="220" r="26" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
  <text x="175" y="225" text-anchor="middle" font-size="13" fill="#1e293b">F(A)</text>

  <!-- Arrows for left triangle -->
  <path d="M 128 115 L 217 115" fill="none" stroke="#374151" stroke-width="2" marker-end="url(#tri-arrow)"/>
  <text x="172" y="100" text-anchor="middle" font-size="12" fill="#374151">F(η<tspan baseline-shift="sub" font-size="9">A</tspan>)</text>

  <path d="M 232 148 L 192 202" fill="none" stroke="#374151" stroke-width="2" marker-end="url(#tri-arrow)"/>
  <text x="225" y="185" text-anchor="middle" font-size="12" fill="#374151">ε<tspan baseline-shift="sub" font-size="9">F(A)</tspan></text>

  <path d="M 100 150 L 157 202" fill="none" stroke="#059669" stroke-width="2.5" stroke-dasharray="6,3" marker-end="url(#tri-arrow)"/>
  <text x="108" y="185" text-anchor="middle" font-size="12" fill="#059669">id<tspan baseline-shift="sub" font-size="9">F(A)</tspan></text>

  <!-- Right triangle -->
  <text x="525" y="55" text-anchor="middle" font-size="14" font-weight="600" fill="#2563eb">Second Triangle: (Gε) ∘ (ηG) = id<tspan baseline-shift="sub" font-size="10">G</tspan></text>

  <circle cx="450" cy="120" r="26" fill="#fce7f3" stroke="#ec4899" stroke-width="2"/>
  <text x="450" y="125" text-anchor="middle" font-size="13" fill="#1e293b">G(B)</text>

  <circle cx="600" cy="120" r="30" fill="#f3e8ff" stroke="#7c3aed" stroke-width="2"/>
  <text x="600" y="115" text-anchor="middle" font-size="11" fill="#1e293b">GFG(B)</text>
  <text x="600" y="132" text-anchor="middle" font-size="10" fill="#7c3aed">= G(FG(B))</text>

  <circle cx="525" cy="220" r="26" fill="#fce7f3" stroke="#ec4899" stroke-width="2"/>
  <text x="525" y="225" text-anchor="middle" font-size="13" fill="#1e293b">G(B)</text>

  <!-- Arrows for right triangle -->
  <path d="M 478 115 L 567 115" fill="none" stroke="#374151" stroke-width="2" marker-end="url(#tri-arrow)"/>
  <text x="522" y="100" text-anchor="middle" font-size="12" fill="#374151">η<tspan baseline-shift="sub" font-size="9">G(B)</tspan></text>

  <path d="M 582 148 L 542 202" fill="none" stroke="#374151" stroke-width="2" marker-end="url(#tri-arrow)"/>
  <text x="575" y="185" text-anchor="middle" font-size="12" fill="#374151">G(ε<tspan baseline-shift="sub" font-size="9">B</tspan>)</text>

  <path d="M 450 150 L 507 202" fill="none" stroke="#059669" stroke-width="2.5" stroke-dasharray="6,3" marker-end="url(#tri-arrow)"/>
  <text x="458" y="185" text-anchor="middle" font-size="12" fill="#059669">id<tspan baseline-shift="sub" font-size="9">G(B)</tspan></text>

  <!-- Commutes labels -->
  <text x="175" y="260" text-anchor="middle" font-size="11" fill="#7c3aed">commutes</text>
  <text x="525" y="260" text-anchor="middle" font-size="11" fill="#7c3aed">commutes</text>
</svg>
</div>

These identities ensure that the unit and counit are "inverses" in a suitable sense.

## Classical Examples

### Free-Forgetful Adjunctions

The archetypal adjunction: **free constructions** are left adjoint to **forgetful functors**.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin: 2rem 0;">

<div style="background: #f0fdf4; padding: 1.25rem; border-radius: 8px; border: 1px solid #86efac;">
<strong style="color: #15803d; font-size: 1.1rem;">Free Monoid ⊣ Forgetful</strong><br/><br/>
$F : \textbf{Set} \to \textbf{Mon}$<br/>
$U : \textbf{Mon} \to \textbf{Set}$<br/><br/>
$F(X) = X^*$ (free monoid on $X$)<br/>
$U(M) =$ underlying set of $M$<br/><br/>
<em style="color: #64748b;">Hom-set bijection:</em><br/>
Monoid homs from $X^*$ ↔ Functions from $X$
</div>

<div style="background: #eff6ff; padding: 1.25rem; border-radius: 8px; border: 1px solid #93c5fd;">
<strong style="color: #1d4ed8; font-size: 1.1rem;">Free Group ⊣ Forgetful</strong><br/><br/>
$F : \textbf{Set} \to \textbf{Grp}$<br/>
$U : \textbf{Grp} \to \textbf{Set}$<br/><br/>
$F(X) =$ free group on generators $X$<br/>
$U(G) =$ underlying set of $G$<br/><br/>
<em style="color: #64748b;">Group homs from $F(X)$ are determined by where generators go</em>
</div>

<div style="background: #fef3c7; padding: 1.25rem; border-radius: 8px; border: 1px solid #fcd34d;">
<strong style="color: #b45309; font-size: 1.1rem;">Free Vector Space ⊣ Forgetful</strong><br/><br/>
$F : \textbf{Set} \to \textbf{Vect}_k$<br/>
$U : \textbf{Vect}_k \to \textbf{Set}$<br/><br/>
$F(X) = k^{(X)}$ (vector space with basis $X$)<br/>
$U(V) =$ underlying set of $V$<br/><br/>
<em style="color: #64748b;">Linear maps from $k^{(X)}$ ↔ functions on basis $X$</em>
</div>

<div style="background: #fce7f3; padding: 1.25rem; border-radius: 8px; border: 1px solid #f9a8d4;">
<strong style="color: #be185d; font-size: 1.1rem;">Discrete ⊣ Forgetful ⊣ Indiscrete</strong><br/><br/>
$\textbf{Set} \rightleftarrows \textbf{Top}$<br/><br/>
<em>Discrete topology:</em> all subsets are open<br/>
<em>Indiscrete topology:</em> only $\emptyset$ and $X$ are open<br/><br/>
<em style="color: #64748b;">This is a rare "adjoint triple"!</em>
</div>

</div>

<div class="svg-diagram" style="margin: 2rem 0;">
<svg viewBox="0 0 600 200" style="width: 100%; max-width: 600px; display: block; margin: 0 auto; font-family: 'Latin Modern Roman', 'Times New Roman', serif;">
  <!-- Set category -->
  <rect x="40" y="50" width="150" height="100" rx="10" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
  <text x="115" y="80" text-anchor="middle" font-size="14" font-weight="600" fill="#1e40af">Set</text>

  <circle cx="115" cy="115" r="18" fill="#fff" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="115" y="120" text-anchor="middle" font-size="12" fill="#1e293b">{a,b,c}</text>

  <!-- Mon category -->
  <rect x="410" y="50" width="150" height="100" rx="10" fill="#d1fae5" stroke="#059669" stroke-width="2"/>
  <text x="485" y="80" text-anchor="middle" font-size="14" font-weight="600" fill="#065f46">Mon</text>

  <circle cx="485" cy="115" r="22" fill="#fff" stroke="#10b981" stroke-width="1.5"/>
  <text x="485" y="112" text-anchor="middle" font-size="10" fill="#1e293b">{a,b,c}*</text>
  <text x="485" y="126" text-anchor="middle" font-size="9" fill="#64748b">free monoid</text>

  <!-- Free functor (top arrow) -->
  <path d="M 195 80 Q 300 40 405 80" fill="none" stroke="#dc2626" stroke-width="2.5" marker-end="url(#tri-arrow)"/>
  <text x="300" y="45" text-anchor="middle" font-size="14" font-weight="600" fill="#dc2626">F (free)</text>

  <!-- Forgetful functor (bottom arrow) -->
  <path d="M 405 130 Q 300 170 195 130" fill="none" stroke="#2563eb" stroke-width="2.5" marker-end="url(#tri-arrow)"/>
  <text x="300" y="175" text-anchor="middle" font-size="14" font-weight="600" fill="#2563eb">U (forget)</text>

  <!-- Adjunction symbol -->
  <text x="300" y="110" text-anchor="middle" font-size="18" fill="#374151">⊣</text>
</svg>
</div>

### Product-Exponential Adjunction

In a **cartesian closed category**, the product functor has a right adjoint: the **exponential** (internal hom).

$$- \times A \dashv (-)^A$$

This means:
$$\text{Hom}(B \times A, C) \cong \text{Hom}(B, C^A)$$

<div class="svg-diagram" style="margin: 2rem 0;">
<svg viewBox="0 0 650 180" style="width: 100%; max-width: 650px; display: block; margin: 0 auto; font-family: 'Latin Modern Roman', 'Times New Roman', serif;">
  <defs>
    <marker id="curry-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#374151"/>
    </marker>
  </defs>

  <!-- Left side: B × A → C -->
  <rect x="30" y="40" width="260" height="100" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="160" y="70" text-anchor="middle" font-size="14" font-weight="600" fill="#b45309">Uncurried form</text>

  <circle cx="80" cy="105" r="22" fill="#fff" stroke="#d97706" stroke-width="1.5"/>
  <text x="80" y="102" text-anchor="middle" font-size="11" fill="#1e293b">B × A</text>

  <circle cx="240" cy="105" r="20" fill="#fff" stroke="#d97706" stroke-width="1.5"/>
  <text x="240" y="110" text-anchor="middle" font-size="14" font-style="italic" fill="#1e293b">C</text>

  <path d="M 105 105 L 217 105" fill="none" stroke="#374151" stroke-width="2" marker-end="url(#curry-arrow)"/>
  <text x="161" y="95" text-anchor="middle" font-size="13" fill="#374151">f</text>

  <!-- Bijection arrow -->
  <text x="325" y="95" text-anchor="middle" font-size="28" fill="#059669">⟷</text>
  <text x="325" y="120" text-anchor="middle" font-size="11" fill="#059669">curry</text>

  <!-- Right side: B → C^A -->
  <rect x="360" y="40" width="260" height="100" rx="8" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
  <text x="490" y="70" text-anchor="middle" font-size="14" font-weight="600" fill="#1e40af">Curried form</text>

  <circle cx="410" cy="105" r="20" fill="#fff" stroke="#2563eb" stroke-width="1.5"/>
  <text x="410" y="110" text-anchor="middle" font-size="14" font-style="italic" fill="#1e293b">B</text>

  <circle cx="570" cy="105" r="22" fill="#fff" stroke="#2563eb" stroke-width="1.5"/>
  <text x="570" y="102" text-anchor="middle" font-size="12" fill="#1e293b">C<tspan baseline-shift="super" font-size="10">A</tspan></text>

  <path d="M 433 105 L 545 105" fill="none" stroke="#374151" stroke-width="2" marker-end="url(#curry-arrow)"/>
  <text x="489" y="95" text-anchor="middle" font-size="13" fill="#374151">curry(f)</text>
</svg>
</div>

In **Haskell**, this is the `curry`/`uncurry` isomorphism:

```haskell
curry   :: ((b, a) -> c) -> (b -> a -> c)
uncurry :: (b -> a -> c) -> ((b, a) -> c)
```

`★ Insight ─────────────────────────────────────`

- **Currying** is an adjunction! The universality of currying follows from the adjunction $- \times A \dashv (-)^A$
- In functional programming, this adjunction is why multi-argument functions work so naturally
- The exponential $C^A$ represents "the space of functions from $A$ to $C$"

`─────────────────────────────────────────────────`

### Galois Connections

When both categories are **posets** (viewed as categories), adjunctions become **Galois connections**.

Given posets $(P, \leq)$ and $(Q, \leq)$, an adjunction $F \dashv G$ means:

$$F(p) \leq q \iff p \leq G(q)$$

<div class="svg-diagram" style="margin: 2rem 0;">
<svg viewBox="0 0 550 200" style="width: 100%; max-width: 550px; display: block; margin: 0 auto; font-family: 'Latin Modern Roman', 'Times New Roman', serif;">
  <!-- P poset -->
  <rect x="40" y="40" width="180" height="140" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="2"/>
  <text x="130" y="65" text-anchor="middle" font-size="14" font-weight="600" fill="#15803d">Poset P</text>

  <!-- Elements in P -->
  <circle cx="80" cy="150" r="12" fill="#fff" stroke="#22c55e" stroke-width="1.5"/>
  <circle cx="130" cy="110" r="12" fill="#d1fae5" stroke="#22c55e" stroke-width="2"/>
  <text x="130" y="114" text-anchor="middle" font-size="11" fill="#065f46">p</text>
  <circle cx="180" cy="150" r="12" fill="#fff" stroke="#22c55e" stroke-width="1.5"/>

  <line x1="80" y1="140" x2="118" y2="118" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="142" y1="118" x2="180" y2="140" stroke="#22c55e" stroke-width="1.5"/>

  <!-- Q poset -->
  <rect x="330" y="40" width="180" height="140" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="420" y="65" text-anchor="middle" font-size="14" font-weight="600" fill="#b45309">Poset Q</text>

  <!-- Elements in Q -->
  <circle cx="370" cy="150" r="12" fill="#fff" stroke="#f59e0b" stroke-width="1.5"/>
  <circle cx="420" cy="110" r="12" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="420" y="114" text-anchor="middle" font-size="11" fill="#92400e">q</text>
  <circle cx="470" cy="150" r="12" fill="#fff" stroke="#f59e0b" stroke-width="1.5"/>

  <line x1="370" y1="140" x2="408" y2="118" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="432" y1="118" x2="470" y2="140" stroke="#f59e0b" stroke-width="1.5"/>

  <!-- F and G functors -->
  <path d="M 225 90 Q 275 60 325 90" fill="none" stroke="#dc2626" stroke-width="2" marker-end="url(#curry-arrow)"/>
  <text x="275" y="55" text-anchor="middle" font-size="12" fill="#dc2626">F</text>

  <path d="M 325 130 Q 275 160 225 130" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#curry-arrow)"/>
  <text x="275" y="165" text-anchor="middle" font-size="12" fill="#2563eb">G</text>
</svg>
</div>

**Example:** The adjunction between subsets and subgroups:
- $F : \mathcal{P}(G) \to \text{Sub}(G)$ sends a subset to the subgroup it generates
- $G : \text{Sub}(G) \to \mathcal{P}(G)$ is the inclusion

## Monads from Adjunctions

Every adjunction $F \dashv G$ gives rise to a **monad** $T = G \circ F$ on the domain of $F$!

$$T = G \circ F : \mathcal{C} \to \mathcal{C}$$

With:
- Unit: $\eta : \text{Id} \Rightarrow GF$ (the unit of the adjunction)
- Multiplication: $\mu = G \varepsilon F : GFGF \Rightarrow GF$

<div class="svg-diagram" style="margin: 2.5rem 0;">
<svg viewBox="0 0 600 250" style="width: 100%; max-width: 600px; display: block; margin: 0 auto; font-family: 'Latin Modern Roman', 'Times New Roman', serif;">
  <defs>
    <marker id="monad-adj-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#7c3aed"/>
    </marker>
  </defs>

  <!-- Title -->
  <text x="300" y="25" text-anchor="middle" font-size="16" font-weight="600" fill="#1e293b">Monad T = G∘F from Adjunction F ⊣ G</text>

  <!-- Category C -->
  <ellipse cx="150" cy="140" rx="100" ry="80" fill="#ede9fe" stroke="#7c3aed" stroke-width="2"/>
  <text x="150" y="80" text-anchor="middle" font-size="14" font-weight="600" fill="#5b21b6">𝒞</text>

  <!-- Category D -->
  <ellipse cx="450" cy="140" rx="100" ry="80" fill="#fce7f3" stroke="#ec4899" stroke-width="2"/>
  <text x="450" y="80" text-anchor="middle" font-size="14" font-weight="600" fill="#9d174d">𝒟</text>

  <!-- Object A in C -->
  <circle cx="150" cy="140" r="20" fill="#fff" stroke="#7c3aed" stroke-width="2"/>
  <text x="150" y="145" text-anchor="middle" font-size="14" font-style="italic" fill="#1e293b">A</text>

  <!-- F(A) in D -->
  <circle cx="450" cy="140" r="20" fill="#fff" stroke="#ec4899" stroke-width="2"/>
  <text x="450" y="145" text-anchor="middle" font-size="12" fill="#1e293b">F(A)</text>

  <!-- F arrow -->
  <path d="M 255 110 Q 300 70 345 110" fill="none" stroke="#dc2626" stroke-width="2" marker-end="url(#curry-arrow)"/>
  <text x="300" y="65" text-anchor="middle" font-size="13" fill="#dc2626">F</text>

  <!-- G arrow -->
  <path d="M 345 170 Q 300 210 255 170" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#curry-arrow)"/>
  <text x="300" y="220" text-anchor="middle" font-size="13" fill="#2563eb">G</text>

  <!-- Curved T = GF arrow around the top -->
  <path d="M 135 62 Q 50 30 50 140 Q 50 250 135 218" fill="none" stroke="#7c3aed" stroke-width="3" marker-end="url(#monad-adj-arrow)"/>
  <text x="25" y="145" text-anchor="middle" font-size="15" font-weight="600" fill="#7c3aed">T</text>
  <text x="25" y="165" text-anchor="middle" font-size="11" fill="#5b21b6">= G∘F</text>

  <!-- Result in C: GF(A) -->
  <circle cx="150" cy="200" r="20" fill="#f3e8ff" stroke="#7c3aed" stroke-width="2"/>
  <text x="150" y="195" text-anchor="middle" font-size="10" fill="#1e293b">GF(A)</text>
  <text x="150" y="208" text-anchor="middle" font-size="9" fill="#7c3aed">= T(A)</text>
</svg>
</div>

**Example:** The **list monad** arises from the free-forgetful adjunction between **Set** and **Mon**:
- $F : \textbf{Set} \to \textbf{Mon}$ is the free monoid functor (lists)
- $G : \textbf{Mon} \to \textbf{Set}$ forgets the monoid structure
- $T = GF$ sends a set $X$ to the set of lists $X^*$

<div style="background: #f0fdf4; padding: 1.5rem; border-radius: 8px; margin: 2rem 0; border-left: 4px solid #22c55e;">

**Theorem (Beck's Monadicity):** Under suitable conditions, adjunctions and monads are essentially equivalent. Every monad arises from an adjunction, and the Eilenberg-Moore category provides the canonical such adjunction.

</div>

## Adjunctions Preserve Limits and Colimits

A fundamental property:

- **Right adjoints preserve limits** (RAPL)
- **Left adjoints preserve colimits** (LAPC)

This follows from the hom-set characterisation of limits and colimits combined with the adjunction isomorphism.

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 2rem 0;">
<div style="background: #dbeafe; padding: 1.25rem; border-radius: 8px;">
<strong style="color: #1e40af;">Right Adjoint G preserves limits:</strong><br/>
$G(\lim D) \cong \lim (G \circ D)$<br/><br/>
<em style="color: #64748b;">Products, equalisers, pullbacks, terminal objects...</em>
</div>

<div style="background: #fee2e2; padding: 1.25rem; border-radius: 8px;">
<strong style="color: #991b1b;">Left Adjoint F preserves colimits:</strong><br/>
$F(\text{colim } D) \cong \text{colim } (F \circ D)$<br/><br/>
<em style="color: #64748b;">Coproducts, coequalisers, pushouts, initial objects...</em>
</div>
</div>

## Summary

Adjunctions encode a deep relationship between functors that pervades mathematics:

| Concept | Role |
|---------|------|
| Left adjoint $F$ | "Free" construction, adds structure |
| Right adjoint $G$ | "Forgetful", preserves structure |
| Unit $\eta$ | Universal embedding |
| Counit $\varepsilon$ | Universal evaluation |
| Triangle identities | Coherence conditions |

<div style="background: linear-gradient(135deg, #ede9fe 0%, #dbeafe 100%); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">

**Key Takeaways:**

1. An adjunction $F \dashv G$ is a natural isomorphism $\text{Hom}(F(-), -) \cong \text{Hom}(-, G(-))$
2. Unit and counit provide an equivalent characterisation via triangle identities
3. Every adjunction generates a monad $T = G \circ F$
4. Free-forgetful pairs are the archetypal adjunctions
5. Right adjoints preserve limits; left adjoints preserve colimits
6. Currying is an adjunction: $- \times A \dashv (-)^A$

</div>

---

## References

<div style="font-size: 0.9rem; line-height: 1.8;">

Mac Lane, S. (1998) *Categories for the Working Mathematician*. 2nd edn. New York: Springer-Verlag.

Awodey, S. (2010) *Category Theory*. 2nd edn. Oxford: Oxford University Press.

Riehl, E. (2016) *Category Theory in Context*. Cambridge: Cambridge University Press.

Leinster, T. (2014) *Basic Category Theory*. Cambridge: Cambridge University Press.

Barr, M. and Wells, C. (1990) *Category Theory for Computing Science*. New York: Prentice Hall.

Milewski, B. (2019) *Category Theory for Programmers*. Available at: https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/ (Accessed: 17 January 2026).

Pierce, B.C. (1991) *Basic Category Theory for Computer Scientists*. Cambridge, MA: MIT Press.

</div>
