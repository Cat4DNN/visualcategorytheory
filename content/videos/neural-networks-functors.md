+++
title = "The Big Three: Cata, Ana, Hylo"
description = "Master the fundamental trio: catamorphism, anamorphism, and hylomorphism."
date = 2024-02-01T10:00:00+00:00
draft = false
weight = 20
template = "videos/page.html"

[extra]
youtube_id = "dQw4w9WgXcQ"
duration = "65 min"
level = "Intermediate"
chapter = 2
katex_thumbnail = "\\llbracket \\phi \\rrbracket : \\mu F \\to A"
resources = [
  { title = "Lecture Slides (PDF)", url = "/resources/slides/basic-schemes.pdf", type = "PDF" },
  { title = "Live Coding Session", url = "https://github.com/example/recursion-schemes/basic.hs", type = "Code" },
  { title = "Cheat Sheet", url = "/resources/cheatsheet.pdf", type = "PDF" }
]
+++

## Video Overview

In this video, we implement and deeply understand the three most fundamental recursion schemes: catamorphism (fold), anamorphism (unfold), and their fusion into hylomorphism (refold).

## Topics Covered

### Catamorphism: The Universal Fold
- The banana bracket notation $\llbracket \phi \rrbracket$
- Why it's called "downward transformation" (from Greek κατά)
- Implementing `cata` from scratch
- Examples: sum, length, eval, pretty-print

### Anamorphism: The Universal Unfold
- The lens bracket notation $[(\psi)]$
- Why it's "upward generation" (from Greek ἀνά)
- Implementing `ana` from scratch
- Examples: replicate, iterate, unfold trees

### Hylomorphism: Fused Computation
- The assembly line pattern
- Why intermediate structure can be eliminated
- Fusion law: $\text{hylo} = \text{cata} \circ \text{ana}$
- Examples: factorial, merge sort, Fibonacci

## Live Coding Demo

Watch as we build each scheme step by step:

```haskell
-- Starting from types...
newtype Fix f = Fix { unFix :: f (Fix f) }

-- To implementations...
cata :: Functor f => (f a -> a) -> Fix f -> a
cata alg = alg . fmap (cata alg) . unFix

ana :: Functor f => (a -> f a) -> a -> Fix f
ana coalg = Fix . fmap (ana coalg) . coalg

hylo :: Functor f => (f b -> b) -> (a -> f a) -> a -> b
hylo alg coalg = alg . fmap (hylo alg coalg) . coalg
```

## Mathematical Essence

The key insight: catamorphisms are **unique** homomorphisms from the initial algebra:

$$\text{cata} \; \phi = \phi \circ F\,(\text{cata} \; \phi) \circ \text{out}$$

This universality means there's only one way to fold that respects the algebra structure.

## Key Takeaways

1. **Cata is for consumption** - When you have structure, fold it
2. **Ana is for production** - When you need structure, generate it
3. **Hylo is for transformation** - When structure is intermediate, fuse
4. **Types guide implementation** - The signatures almost write themselves

## Prerequisites

- Completed the Foundations video
- Comfortable with pattern functors (ListF, TreeF)
- Basic understanding of F-algebras

## Next Steps

After this video:
- Implement your own schemes for custom data types
- Explore paramorphism and apomorphism
- Read the Basic Schemes section

