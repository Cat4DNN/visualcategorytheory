+++
title = "Futumorphism"
description = "Unfolds that can generate multiple layers at once."
date = 2024-01-10T00:00:00+00:00
draft = false
weight = 20
template = "docs/page.html"

[extra]
toc = true
top = false
+++

## Definition

A **futumorphism** (from Latin futurus "future") is an unfold that can produce multiple layers of structure in a single step, looking into the "future" of generation.

$$\text{futu} : (a \to F\,(\text{Free } F\, a)) \to a \to \nu F$$

The coalgebra can return either:
- More seeds to unfold later (`Free`)
- Multiple pre-built layers

## The Free Monad

Futumorphisms use the **Free monad** to represent future computations:

```haskell
data Free f a = Pure a | Free (f (Free f a))
```

- `Pure a` - a seed requiring further unfolding
- `Free (f ...)` - pre-built structure layers

## Why We Need Futumorphisms

Consider generating a structure where multiple steps are determined at once:

```haskell
-- Exchange sort: sometimes need to swap two elements
exchangeSort :: Ord a => [a] -> [a]
```

When we encounter elements out of order, we want to produce **two** list nodes in one step (the swap), not just one.

## Implementation

```haskell
futu :: Functor f => (a -> f (Free f a)) -> a -> Fix f
futu coalg = Fix . fmap go . coalg
  where
    go (Pure a)  = futu coalg a
    go (Free fa) = Fix (fmap go fa)
```

Or using `recursion-schemes`:

```haskell
futu :: Corecursive t => (a -> Base t (Free (Base t) a)) -> a -> t
```

## Examples

### Exchange Sort

```haskell
exchangeCoalg :: Ord a => [a] -> ListF a (Free (ListF a) [a])
exchangeCoalg []  = NilF
exchangeCoalg [x] = ConsF x (Pure [])
exchangeCoalg (x:y:zs)
  | x <= y    = ConsF x (Pure (y:zs))
  | otherwise = ConsF y (Free (ConsF x (Pure zs)))  -- Two layers!

exchangeSort :: Ord a => [a] -> [a]
exchangeSort = futu exchangeCoalg
```

### Run-Length Decoding

```haskell
-- Decode (3, 'a') to ['a', 'a', 'a']
decodeCoalg :: [(Int, a)] -> ListF a (Free (ListF a) [(Int, a)])
decodeCoalg [] = NilF
decodeCoalg ((0, _):rest) = decodeCoalg rest  -- skip zeros
decodeCoalg ((1, x):rest) = ConsF x (Pure rest)
decodeCoalg ((n, x):rest) = ConsF x (Free (ConsF x (Pure ((n-2, x):rest))))

runLengthDecode :: [(Int, a)] -> [a]
runLengthDecode = futu decodeCoalg
```

### Tree Balancing

```haskell
data TreeF a r = LeafF a | NodeF r r deriving Functor

balanceCoalg :: [a] -> TreeF a (Free (TreeF a) [a])
balanceCoalg [x] = LeafF x
balanceCoalg xs  =
  let (l, r) = splitAt (length xs `div` 2) xs
  in NodeF (Pure l) (Pure r)
```

## Building Future Layers

The `Free` monad lets you build ahead:

```haskell
-- Produce one layer, continue unfolding
oneStep :: a -> Free f a
oneStep = Pure

-- Produce multiple layers at once
twoSteps :: Functor f => f a -> Free f a
twoSteps = Free . fmap Pure

threeSteps :: Functor f => f (f a) -> Free f a
threeSteps = Free . fmap (Free . fmap Pure)
```

## Duality with Histomorphism

Futumorphism is **dual** to histomorphism:

| Histomorphism | Futumorphism |
|---------------|--------------|
| Fold with history | Unfold with future |
| Cofree comonad | Free monad |
| Look at past | Generate ahead |
| $F\,(\text{Cofree } F\, a) \to a$ | $a \to F\,(\text{Free } F\, a)$ |

## When to Use Futumorphism

Use a futumorphism when:
- You need to generate multiple layers in one step
- Building structures with inherent multi-step patterns
- Implementing algorithms where decisions affect multiple elements
- Producing efficiently from run-length encoded data

## Relationship to Other Schemes

- Every anamorphism is a futumorphism that always produces exactly one layer
- Futumorphism + Histomorphism = Chronomorphism
