+++
title = "Anamorphism"
description = "The generalized unfold - producing recursive structures top-down."
date = 2024-01-05T00:00:00+00:00
draft = false
weight = 20
template = "docs/page.html"

[extra]
toc = true
top = false
+++

## Definition

An **anamorphism** (from Greek ἀνά "upward") is the unique homomorphism from any F-coalgebra to the terminal F-coalgebra. It generalizes the concept of "unfolding" to produce a data structure.

$$\text{ana} : (a \to F\,a) \to a \to \nu F$$

Or in categorical notation (lens brackets):

$$\langle\!\langle \psi \rangle\!\rangle : A \to \nu F$$

## The Universal Property

For any F-coalgebra $\psi : A \to F\,A$, there exists a **unique** function such that:

$$\langle\!\langle\psi\rangle\!\rangle = \text{in} \circ F\langle\!\langle\psi\rangle\!\rangle \circ \psi$$

This diagram commutes:

$$
\begin{CD}
A @>\psi>> F\,A \\
@V\langle\!\langle\psi\rangle\!\rangle VV @VVF\langle\!\langle\psi\rangle\!\rangle V \\
\nu F @>>\text{out}> F\,(\nu F)
\end{CD}
$$

## Implementation

```haskell
ana :: Functor f => (a -> f a) -> a -> Fix f
ana coalg = Fix . fmap (ana coalg) . coalg
```

Or using `recursion-schemes`:

```haskell
ana :: Corecursive t => (a -> Base t a) -> a -> t
ana coalg = a where a = embed . fmap a . coalg
```

## Examples

### Countdown List

```haskell
countdownCoalg :: Int -> ListF Int Int
countdownCoalg 0 = NilF
countdownCoalg n = ConsF n (n - 1)

countdown :: Int -> Fix (ListF Int)
countdown = ana countdownCoalg

-- countdown 5 produces: [5, 4, 3, 2, 1]
```

### Iterate Function

```haskell
iterateCoalg :: (a -> a) -> a -> ListF a a
iterateCoalg f x = ConsF x (f x)

iterate' :: (a -> a) -> a -> [a]
iterate' f = ana (iterateCoalg f)

-- iterate' (+1) 0 produces: [0, 1, 2, 3, ...]
```

### Binary Tree from Range

```haskell
data TreeF a r = LeafF a | NodeF r r deriving Functor

rangeTreeCoalg :: (Int, Int) -> TreeF Int (Int, Int)
rangeTreeCoalg (lo, hi)
  | lo == hi  = LeafF lo
  | otherwise = let mid = (lo + hi) `div` 2
                in NodeF (lo, mid) (mid + 1, hi)

rangeTree :: (Int, Int) -> Fix (TreeF Int)
rangeTree = ana rangeTreeCoalg
```

### Stream Generation

```haskell
data StreamF a r = StreamF a r deriving Functor

fibs :: Fix (StreamF Integer)
fibs = ana coalg (0, 1)
  where
    coalg (a, b) = StreamF a (b, a + b)
```

## Fusion Laws

### Ana-Fusion
$$\langle\!\langle\psi\rangle\!\rangle \circ h = \langle\!\langle\phi\rangle\!\rangle \iff \psi \circ h = F\,h \circ \phi$$

### Ana-Reflection
$$\langle\!\langle\text{out}\rangle\!\rangle = \text{id}$$

## The Duality

Anamorphisms are **dual** to catamorphisms:

| Catamorphism | Anamorphism |
|--------------|-------------|
| Consumes structure | Produces structure |
| Uses F-algebra | Uses F-coalgebra |
| $\mu F \to A$ | $A \to \nu F$ |
| Bottom-up | Top-down |
| Banana brackets $\llbracket-\rrbracket$ | Lens brackets $\langle\!\langle-\rangle\!\rangle$ |

## When to Use Anamorphism

Use an anamorphism when you need to:
- Generate a recursive data structure from a seed
- Produce potentially infinite structures (streams)
- Build structures "top-down" (root to leaves)

## Limitations

Anamorphisms cannot:
- Produce multiple layers at once (use **futumorphism**)
- Terminate early while inserting a known suffix (use **apomorphism**)
