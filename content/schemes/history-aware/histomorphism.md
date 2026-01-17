+++
title = "Histomorphism"
description = "Folds with access to the entire computation history."
date = 2024-01-09T00:00:00+00:00
draft = false
weight = 10
template = "docs/page.html"

[extra]
toc = true
top = false
+++

## Definition

A **histomorphism** (from Greek ἱστός "loom, web") is a fold that provides access to the entire history of previously computed values, not just the immediate result.

$$\text{histo} : (F\,(\text{Cofree } F\, a) \to a) \to \mu F \to a$$

The algebra receives a structure decorated with all previously computed values.

## The Cofree Comonad

Histomorphisms use the **Cofree comonad** to carry history:

```haskell
data Cofree f a = a :< f (Cofree f a)
```

Each node carries:
- The computed value at that point (`a`)
- The decorated substructures (`f (Cofree f a)`)

## Why We Need Histomorphisms

Consider computing Fibonacci numbers:

$$F_n = F_{n-1} + F_{n-2}$$

We need access to **two** previous values, not just one. A catamorphism only gives us the immediate predecessor's result.

## Implementation

```haskell
histo :: Functor f => (f (Cofree f a) -> a) -> Fix f -> a
histo alg = extract . cata (\x -> alg x :< x)
  where extract (a :< _) = a
```

Or using `recursion-schemes`:

```haskell
histo :: Recursive t => (Base t (Cofree (Base t) a) -> a) -> t -> a
```

## Examples

### Fibonacci Numbers

```haskell
data NatF r = ZeroF | SuccF r deriving Functor

fibAlg :: NatF (Cofree NatF Integer) -> Integer
fibAlg ZeroF                          = 0
fibAlg (SuccF (n :< ZeroF))           = 1
fibAlg (SuccF (n :< SuccF (m :< _)))  = n + m

fib :: Int -> Integer
fib = histo fibAlg . intToNat
```

### Dynamic Programming: Coin Change

```haskell
coinChangeAlg :: [Int] -> NatF (Cofree NatF Int) -> Int
coinChangeAlg coins ZeroF = 0
coinChangeAlg coins (SuccF history) = minimum $
  [ 1 + lookback c history | c <- coins, c <= current ]
  where
    current = cofreeDepth history + 1
    lookback 0 h = extract h
    lookback n (_ :< SuccF h) = lookback (n-1) h
```

### Longest Increasing Subsequence

```haskell
lisAlg :: Ord a => ListF a (Cofree (ListF a) Int) -> Int
lisAlg NilF = 0
lisAlg (ConsF x history) = 1 + maximum (0 : validPredecessors)
  where
    validPredecessors = findLargerPreds x history
```

## Accessing History

The `Cofree` structure allows looking back:

```haskell
-- Get the value at current node
extract :: Cofree f a -> a
extract (a :< _) = a

-- Get the decorated substructure
unwrap :: Cofree f a -> f (Cofree f a)
unwrap (_ :< fas) = fas

-- Look back n steps (for linear structures)
lookback :: Int -> Cofree (ListF a) b -> Maybe b
lookback 0 (b :< _)                = Just b
lookback n (_ :< ConsF _ history)  = lookback (n-1) history
lookback _ (_ :< NilF)             = Nothing
```

## The CV-Algebra

The algebra for a histomorphism is called a **CV-algebra** (course-of-values algebra):

$$\phi : F\,(\text{Cofree } F\, A) \to A$$

It receives the structure annotated with all previously computed values.

## When to Use Histomorphism

Use a histomorphism when:
- Your computation depends on results from multiple previous steps
- Implementing dynamic programming algorithms
- Computing recurrences like Fibonacci
- You need "memory" of past computations

## Relationship to Other Schemes

- Every catamorphism is a histomorphism that ignores history
- Histomorphism + Futumorphism = Chronomorphism
- Histomorphism is to paramorphism as computed history is to original structure
