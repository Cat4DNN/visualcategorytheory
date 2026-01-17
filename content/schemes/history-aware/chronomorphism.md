+++
title = "Chronomorphism"
description = "The time-traveling scheme combining history and future."
date = 2024-01-11T00:00:00+00:00
draft = false
weight = 30
template = "docs/page.html"

[extra]
toc = true
top = false
+++

## Definition

A **chronomorphism** (from Greek χρόνος "time") combines the power of histomorphism and futumorphism - it can look at past computed values while generating multiple future layers.

$$\text{chrono} : (F\,(\text{Cofree } F\, b) \to b) \to (a \to F\,(\text{Free } F\, a)) \to a \to b$$

This is the ultimate "time-traveling" recursion scheme.

## Components

A chronomorphism uses:
- **CV-Algebra** (histomorphism): $\phi : F\,(\text{Cofree } F\, b) \to b$
- **CV-Coalgebra** (futumorphism): $\psi : a \to F\,(\text{Free } F\, a)$

## Implementation

```haskell
chrono :: Functor f
       => (f (Cofree f b) -> b)
       -> (a -> f (Free f a))
       -> a -> b
chrono alg coalg = extract . hylo alg' coalg'
  where
    alg' f = alg f :< fmap (fmap extract) f
    coalg' = fmap (fmap Pure) . coalg
```

## Why Chronomorphisms?

Some algorithms naturally combine:
1. **Lookahead**: Generating multiple elements at once
2. **Lookbehind**: Using previously computed results

Example: Optimal paragraph formatting (Knuth-Plass algorithm) needs both.

## Examples

### Optimal Line Breaking

```haskell
-- Simplified Knuth-Plass-style algorithm
data DocF r = EndF | WordF String r deriving Functor

-- Coalgebra: words can sometimes be grouped
wordCoalg :: [String] -> DocF (Free DocF [String])
wordCoalg []     = EndF
wordCoalg (w:ws) = WordF w (Pure ws)

-- Algebra: compute optimal breaks using history
breakAlg :: DocF (Cofree DocF Cost) -> Cost
breakAlg EndF = 0
breakAlg (WordF w history) = minimumCost w history
```

### String Matching with Automata

```haskell
-- KMP-style matching can benefit from chronomorphism
-- - Future: precompute failure function
-- - History: access previous match states
```

## The Time-Travel Diagram

```
    Past (Cofree)          Future (Free)
         ↓                      ↓
   ┌─────┴─────┐          ┌─────┴─────┐
   │ b₃ :< ... │          │ Free ...  │
   │ b₂ :< ... │   →→→    │ Free ...  │
   │ b₁ :< ... │          │ Pure a    │
   └───────────┘          └───────────┘
        ↓                      ↓
        └──────── b ←──────────┘
```

## Relationship to Dynamorphism

Both chronomorphism and dynamorphism are "hyper-schemes":

| Chronomorphism | Dynamorphism |
|----------------|--------------|
| Histo + Futu | Hylo with memoization |
| Free/Cofree based | Uses explicit caching |
| Time-based view | Space-based view |

## When to Use Chronomorphism

Use a chronomorphism when:
- You need BOTH lookahead AND lookbehind
- Implementing advanced dynamic programming
- Algorithms with complex recurrence relations
- Parsing with backtracking and prediction

## Practical Considerations

Chronomorphisms are powerful but complex:
- Consider if a simpler scheme suffices
- The Cofree/Free overhead may impact performance
- Often clearer to decompose into separate passes
