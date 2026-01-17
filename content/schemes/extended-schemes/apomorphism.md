+++
title = "Apomorphism"
description = "Unfolds with early termination capability."
date = 2024-01-08T00:00:00+00:00
draft = false
weight = 20
template = "docs/page.html"

[extra]
toc = true
top = false
+++

## Definition

An **apomorphism** (from Greek ἀπό "away from") is an extension of anamorphism that allows early termination by directly providing a completed substructure instead of continuing to unfold.

$$\text{apo} : (a \to F\,(\nu F + a)) \to a \to \nu F$$

The coalgebra returns either:
- `Left` - a completed substructure (early termination)
- `Right` - a seed to continue unfolding

## Why We Need Apomorphisms

Consider inserting into a sorted list:

```haskell
insert :: Ord a => a -> [a] -> [a]
insert x [] = [x]
insert x (y:ys)
  | x <= y    = x : y : ys  -- Stop here! Keep the tail as-is
  | otherwise = y : insert x ys
```

Once we find the insertion point, we want to return the **original tail** without traversing it.

## Implementation

```haskell
apo :: Functor f => (a -> f (Either (Fix f) a)) -> a -> Fix f
apo coalg = Fix . fmap (either id (apo coalg)) . coalg
```

Or using `recursion-schemes`:

```haskell
apo :: Corecursive t => (a -> Base t (Either t a)) -> a -> t
```

## Examples

### Insert into Sorted List

```haskell
insertCoalg :: Ord a => (a, [a]) -> ListF a (Either [a] (a, [a]))
insertCoalg (x, [])   = ConsF x (Left [])
insertCoalg (x, y:ys)
  | x <= y    = ConsF x (Left (y:ys))   -- Early termination!
  | otherwise = ConsF y (Right (x, ys)) -- Continue unfolding

insert :: Ord a => a -> [a] -> [a]
insert x xs = apo insertCoalg (x, xs)
```

### Take While with Remainder

```haskell
takeWhileCoalg :: (a -> Bool) -> [a] -> ListF a (Either [a] [a])
takeWhileCoalg _ []     = NilF
takeWhileCoalg p (x:xs)
  | p x       = ConsF x (Right xs)
  | otherwise = NilF  -- Could also return the rest via Left

takeWhile' :: (a -> Bool) -> [a] -> [a]
takeWhile' p = apo (takeWhileCoalg p)
```

### Zip with Default

```haskell
zipDefaultCoalg :: a -> ([a], [b]) -> ListF (a, b) (Either [(a, b)] ([a], [b]))
zipDefaultCoalg _ ([], [])     = NilF
zipDefaultCoalg d ([], y:ys)   = ConsF (d, y) (Right ([], ys))
zipDefaultCoalg d (x:xs, [])   = ConsF (x, undefined) (Left [])  -- terminate
zipDefaultCoalg d (x:xs, y:ys) = ConsF (x, y) (Right (xs, ys))
```

## The Diagram

$$
\begin{CD}
A @>\psi>> F\,(A + \nu F) @>F\,[\text{apo } \psi, \text{id}]>> F\,(\nu F) @>\text{in}>> \nu F
\end{CD}
$$

## Duality with Paramorphism

Apomorphism is **dual** to paramorphism:

| Paramorphism | Apomorphism |
|--------------|-------------|
| Fold with original structure | Unfold with early termination |
| $F\,(\mu F \times A) \to A$ | $A \to F\,(\nu F + A)$ |
| Product ($\times$) | Sum ($+$) |
| Access past | Shortcut future |

## When to Use Apomorphism

Use an apomorphism when:
- Building a structure with possible shortcuts
- Inserting/splicing into existing structures
- You have a "default" tail to attach
- Generating structures where parts are already known

## Relationship to Anamorphism

Every anamorphism can be expressed as an apomorphism that never terminates early:

```haskell
ana coalg = apo (fmap Right . coalg)
```
