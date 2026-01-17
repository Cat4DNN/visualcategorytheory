+++
title = "Hylomorphism"
description = "The fused unfold-then-fold - efficient recursive algorithms."
date = 2024-01-06T00:00:00+00:00
draft = false
weight = 30
template = "docs/page.html"

[extra]
toc = true
top = false
+++

## Definition

A **hylomorphism** (from Greek ὕλη "matter") combines an anamorphism and a catamorphism, unfolding a structure and then immediately folding it. The key insight is that the intermediate structure need never be built in memory.

$$\text{hylo} : (F\,b \to b) \to (a \to F\,a) \to a \to b$$

Or symbolically:

$$\llbracket\phi,\psi\rrbracket = \llbracket\phi\rrbracket \circ \langle\!\langle\psi\rangle\!\rangle$$

## The Fusion

The power of hylomorphisms comes from **deforestation** - the intermediate data structure is eliminated:

$$\text{hylo } \phi \; \psi = \phi \circ \text{fmap } (\text{hylo } \phi \; \psi) \circ \psi$$

No `Fix` appears in the definition!

## Implementation

```haskell
hylo :: Functor f => (f b -> b) -> (a -> f a) -> a -> b
hylo alg coalg = h where h = alg . fmap h . coalg
```

This is maximally efficient - no intermediate structure is allocated.

## Examples

### Factorial

```haskell
data NatF r = ZeroF | SuccF r deriving Functor

-- Coalgebra: unfold a number into its structure
natCoalg :: Int -> NatF Int
natCoalg 0 = ZeroF
natCoalg n = SuccF (n - 1)

-- Algebra: compute factorial at each step
factAlg :: NatF (Int, Int) -> (Int, Int)
factAlg ZeroF           = (0, 1)
factAlg (SuccF (n, acc)) = (n + 1, (n + 1) * acc)

factorial :: Int -> Int
factorial = snd . hylo factAlg natCoalg'
  where natCoalg' n = if n == 0 then ZeroF else SuccF (n - 1)
```

### Merge Sort

```haskell
data TreeF a r = LeafF a | NodeF r r deriving Functor

-- Coalgebra: split list into tree
splitCoalg :: [a] -> TreeF a [a]
splitCoalg [x] = LeafF x
splitCoalg xs  = let (l, r) = splitAt (length xs `div` 2) xs
                 in NodeF l r

-- Algebra: merge sorted sublists
mergeAlg :: Ord a => TreeF a [a] -> [a]
mergeAlg (LeafF x)   = [x]
mergeAlg (NodeF l r) = merge l r
  where
    merge [] ys = ys
    merge xs [] = xs
    merge (x:xs) (y:ys)
      | x <= y    = x : merge xs (y:ys)
      | otherwise = y : merge (x:xs) ys

mergeSort :: Ord a => [a] -> [a]
mergeSort []  = []
mergeSort [x] = [x]
mergeSort xs  = hylo mergeAlg splitCoalg xs
```

### Fibonacci via Hylomorphism

```haskell
data FibF r = BaseF Int | RecF r r deriving Functor

fibCoalg :: Int -> FibF Int
fibCoalg n
  | n <= 1    = BaseF n
  | otherwise = RecF (n - 1) (n - 2)

fibAlg :: FibF Integer -> Integer
fibAlg (BaseF n)  = toInteger n
fibAlg (RecF a b) = a + b

fib :: Int -> Integer
fib = hylo fibAlg fibCoalg
```

## The Refold Diagram

$$
\begin{CD}
A @>\psi>> F\,A @>F\,h>> F\,B @>\phi>> B
\end{CD}
$$

Where $h = \text{hylo } \phi \; \psi$.

## Chronological Order

The name "hylomorphism" comes from Aristotle's hylomorphism - the theory that beings are composed of matter (ὕλη) and form (μορφή). In recursion schemes:

- **Matter** = the intermediate virtual structure (from coalgebra)
- **Form** = the final result (from algebra)

## When to Use Hylomorphism

Use a hylomorphism when:
- You need to unfold then fold
- The intermediate structure is just scaffolding
- You want automatic fusion/deforestation
- Implementing divide-and-conquer algorithms

## Relationship to Other Schemes

- $\text{cata } \phi = \text{hylo } \phi \; \text{project}$
- $\text{ana } \psi = \text{hylo } \text{embed} \; \psi$
- Hylomorphisms generalize both catamorphisms and anamorphisms
