+++
title = "The Scheme Zoo"
description = "Exotic and specialized recursion schemes for advanced patterns."
date = 2024-01-16T00:00:00+00:00
draft = false
weight = 50
template = "docs/page.html"

[extra]
toc = true
top = false
+++

## Overview

Beyond the common recursion schemes lies a zoo of specialized patterns. This page catalogs exotic schemes you might encounter or need.

## Elgot Algebras

An **Elgot algebra** is a fold that can short-circuit:

$$\text{elgot} : (F\,b \to b) \to (a \to b + F\,a) \to a \to b$$

```haskell
elgot :: Functor f => (f b -> b) -> (a -> Either b (f a)) -> a -> b
elgot alg coalg = go
  where
    go a = case coalg a of
      Left b   -> b           -- Short-circuit!
      Right fa -> alg (fmap go fa)
```

### Example: Search with Early Exit

```haskell
searchCoalg :: (a -> Bool) -> Tree a -> Either a (TreeF a (Tree a))
searchCoalg pred t@(Leaf x)
  | pred x    = Left x      -- Found! Stop early
  | otherwise = Right (project t)
searchCoalg pred t = Right (project t)

findFirst :: (a -> Bool) -> Tree a -> Maybe a
findFirst pred = elgot treeAlg (searchCoalg pred)
```

## Coelgot (Dual)

The dual **coelgot** is an unfold that can inject completed structure:

$$\text{coelgot} : (a \to F\,a) \to ((a, F\,b) \to b) \to a \to b$$

```haskell
coelgot :: Functor f => (a -> f a) -> ((a, f b) -> b) -> a -> b
coelgot coalg alg = go
  where
    go a = alg (a, fmap go (coalg a))
```

## Metamorphism

A **metamorphism** (streaming fold-unfold) processes elements as they flow:

```haskell
-- Process list element by element
meta :: (acc -> Maybe (b, acc))  -- extract from accumulator
     -> (a -> acc -> acc)         -- insert into accumulator
     -> acc                       -- initial accumulator
     -> [a] -> [b]
```

### Example: Run-Length Encoding

```haskell
rle :: Eq a => [a] -> [(Int, a)]
rle = meta extract insert Nothing
  where
    insert x Nothing = Just (1, x)
    insert x (Just (n, y))
      | x == y    = Just (n+1, y)
      | otherwise = Just (1, x)  -- emit previous, start new

    extract Nothing = Nothing
    extract (Just pair) = Just (pair, Nothing)
```

## Recursion Scheme Algebra Algebra

**RSA²** - schemes over schemes:

```haskell
-- A scheme that produces schemes
schemeAlg :: SchemeF (Fix SchemeF -> a) -> (Fix SchemeF -> a)
```

This meta-level enables scheme composition and transformation.

## Zygohistomorphic Prepromorphism

The legendary combination (mostly a joke, but valid!):

```haskell
zygoHistoPrepro
  :: (Functor f, Corecursive t, Recursive t, Base t ~ f)
  => (forall b. f b -> f b)      -- Natural transformation
  -> (f b -> b)                  -- Helper algebra
  -> (f (EnvT b (Cofree f) a) -> a)  -- Main algebra with helper + history
  -> t -> a
```

## Adjoint Folds

**Adjoint folds** generalize recursion schemes using adjunctions:

$$\text{adjFold} : (F\,a \to a) \to \mu F \to a$$

where the fold passes through an adjunction $L \dashv R$:

```haskell
adjFold :: (Adjunction l r, Functor f)
        => (f (r a) -> a) -> Fix f -> r a
```

## Mendler-Style Schemes

**Mendler-style** folds avoid the Functor constraint:

```haskell
mcata :: (forall r. (r -> a) -> f r -> a) -> Fix f -> a
mcata alg (Fix fa) = alg (mcata alg) fa
```

### Benefit: Works with non-functors

```haskell
-- GADT that isn't a proper Functor
data ExprF a where
  Lit :: Int -> ExprF Int
  Add :: ExprF Int -> ExprF Int -> ExprF Int

-- Mendler-style works anyway!
meval :: Fix ExprF -> Int
meval = mcata $ \rec e -> case e of
  Lit n   -> n
  Add x y -> rec x + rec y
```

## Generalized Schemes

Using **distributive laws**, we can parameterize over the "shape" of history:

```haskell
-- g-fold: fold with any comonad w
gfold :: (Functor f, Comonad w)
      => (forall b. f (w b) -> w (f b))  -- Distributive law
      -> (f (w a) -> a)
      -> Fix f -> a
```

Different comonads yield different schemes:
- `Identity` → catamorphism
- `(,) e` → paramorphism
- `Cofree f` → histomorphism

## Scheme Composition Table

| Composed | = | First | + | Second |
|----------|---|-------|---|--------|
| Hylomorphism | = | Anamorphism | ; | Catamorphism |
| Chronomorphism | = | Futumorphism | ; | Histomorphism |
| Dynamorphism | = | Anamorphism | ; | Histomorphism |
| Postpromorphism | = | Anamorphism | ; | Natural Transform |
| Prepromorphism | = | Natural Transform | ; | Catamorphism |

## When to Reach for Exotic Schemes

✅ **Do use** when:
- Standard schemes don't capture your pattern
- Performance requires specialized structure
- You're building a scheme DSL or compiler

❌ **Avoid** when:
- A simple fold/unfold suffices
- Clarity is more important than abstraction
- Your team isn't familiar with the concepts

## Further Reading

- "Functional Programming with Bananas, Lenses, Envelopes and Barbed Wire" (Meijer et al.)
- "Recursion Schemes for Higher Algebras" (Hinze et al.)
- "Adjoint Folds and Unfolds" (Hinze)
- The `recursion-schemes` library Haddocks

