+++
title = "Paramorphism"
description = "Folds with access to the original substructure."
date = 2024-01-07T00:00:00+00:00
draft = false
weight = 10
template = "docs/page.html"

[extra]
toc = true
top = false
+++

## Definition

A **paramorphism** (from Greek παρά "beside") is an extension of catamorphism that provides access to both the recursive result **and** the original substructure at each step.

$$\text{para} : (F\,(\mu F, a) \to a) \to \mu F \to a$$

The algebra receives a pair: the original subtree and the result of recursing into it.

## Why We Need Paramorphisms

Consider implementing `tails` for lists:

```haskell
tails :: [a] -> [[a]]
tails []     = [[]]
tails (x:xs) = (x:xs) : tails xs  -- Need access to xs!
```

A catamorphism can't express this because we need the **original tail** `xs`, not just the recursive result.

## Implementation

```haskell
para :: Functor f => (f (Fix f, a) -> a) -> Fix f -> a
para alg = alg . fmap (\x -> (x, para alg x)) . unFix
```

Or using `recursion-schemes`:

```haskell
para :: Recursive t => (Base t (t, a) -> a) -> t -> a
```

## Examples

### Tails

```haskell
tailsAlg :: ListF a ([a], [[a]]) -> [[a]]
tailsAlg NilF                = [[]]
tailsAlg (ConsF x (xs, xss)) = (x : xs) : xss

tails :: [a] -> [[a]]
tails = para tailsAlg
```

### Factorial (with original value)

```haskell
factAlg :: NatF (Fix NatF, Int) -> Int
factAlg ZeroF             = 1
factAlg (SuccF (n, fact)) = (natToInt n + 1) * fact

factorial :: Fix NatF -> Int
factorial = para factAlg
```

### Safe Predecessor

```haskell
predAlg :: NatF (Fix NatF, Maybe (Fix NatF)) -> Maybe (Fix NatF)
predAlg ZeroF         = Nothing
predAlg (SuccF (n, _)) = Just n

safePred :: Fix NatF -> Maybe (Fix NatF)
safePred = para predAlg
```

### Sliding Window

```haskell
windowAlg :: Int -> ListF a ([a], [[a]]) -> [[a]]
windowAlg n NilF = []
windowAlg n (ConsF x (xs, windows))
  | length xs >= n - 1 = take n (x : xs) : windows
  | otherwise          = windows

slidingWindow :: Int -> [a] -> [[a]]
slidingWindow n = para (windowAlg n)
```

## The Diagram

$$
\begin{CD}
\mu F @>\text{out}>> F\,(\mu F) @>F\,\langle\text{id}, \text{para } \phi\rangle>> F\,(\mu F, A) @>\phi>> A
\end{CD}
$$

## Relationship to Catamorphism

Every catamorphism can be expressed as a paramorphism that ignores the original structure:

```haskell
cata alg = para (alg . fmap snd)
```

Conversely, a paramorphism cannot always be expressed as a catamorphism (it's strictly more powerful).

## When to Use Paramorphism

Use a paramorphism when:
- You need access to the original substructure during folding
- Computing results that depend on "context" in the original tree
- Implementing functions like `tails`, `inits`, or sliding windows

## Performance Note

Paramorphisms can be less efficient than catamorphisms because they preserve the original structure. Consider whether you truly need the original substructure, or if a histomorphism (which provides computed history) would suffice.
