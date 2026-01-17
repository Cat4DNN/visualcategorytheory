+++
title = "Foundations: F-Algebras & Fixed Points"
description = "Understanding the categorical foundations that make recursion schemes possible."
date = 2024-01-15T10:00:00+00:00
draft = false
weight = 10
template = "videos/page.html"

[extra]
youtube_id = "dQw4w9WgXcQ"
duration = "50 min"
level = "Beginner"
chapter = 1
katex_thumbnail = "\\alpha : F\\,A \\to A"
resources = [
  { title = "Lecture Slides (PDF)", url = "/resources/slides/foundations.pdf", type = "PDF" },
  { title = "Haskell Code", url = "https://github.com/example/recursion-schemes/foundations.hs", type = "Code" },
  { title = "Exercise Solutions", url = "/resources/solutions/foundations.pdf", type = "PDF" }
]
+++

## Video Overview

This foundational video introduces the categorical concepts underlying all recursion schemes. We start from first principles: What is a functor? What is an algebra? How do fixed points let us represent recursive data?

## Topics Covered

### Functors and Pattern Functors
- What makes a functor a functor?
- Lifting functions with `fmap`
- Pattern functors for recursive types (ListF, TreeF)

### F-Algebras
- The type signature: $F\,A \to A$
- Carrier types and structure maps
- Examples: sum, product, evaluation

### F-Coalgebras
- The dual: $A \to F\,A$
- Unfolds and generators
- Streams and infinite structures

### Fixed Points
- Why $\text{Fix } F = F\,(\text{Fix } F)$?
- Initial and terminal objects
- Lambek's Lemma: the isomorphism

## Key Takeaways

1. **Functors capture shape** - They describe one "layer" of structure
2. **Algebras collapse** - They reduce structure to values
3. **Coalgebras expand** - They generate structure from seeds
4. **Fixed points enable recursion** - They turn finite descriptions into infinite types

## Prerequisites

Before watching this video:
- Basic Haskell syntax (data types, functions, type classes)
- The Functor type class and `fmap`
- Comfort with parametric polymorphism

## Next Steps

After completing this video:
- Read the Foundations section of the compendium
- Implement Fix, cata, and ana from scratch
- Watch the next video on Basic Schemes

