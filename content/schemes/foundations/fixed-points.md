+++
title = "Fixed Points of Functors"
description = "Understanding Fix, Mu, Nu, and recursive types."
date = 2024-01-03T00:00:00+00:00
draft = false
weight = 30
template = "docs/page.html"

[extra]
toc = true
top = false
+++

## The Fixed Point Construction

A **fixed point** of a functor $F$ is a type $T$ such that:

$$T \cong F\,T$$

This isomorphism is exactly what gives recursive types their recursive nature.

## In Haskell

```haskell
newtype Fix f = Fix { unFix :: f (Fix f) }
```

The `Fix` constructor witnesses $F\,(\text{Fix } F) \to \text{Fix } F$, while `unFix` witnesses the inverse.

## Example: Natural Numbers

Define the base functor:

```haskell
data NatF r = ZeroF | SuccF r
  deriving Functor
```

Then natural numbers are:

```haskell
type Nat = Fix NatF

zero :: Nat
zero = Fix ZeroF

succ :: Nat -> Nat
succ n = Fix (SuccF n)

-- three = succ (succ (succ zero))
three :: Nat
three = Fix (SuccF (Fix (SuccF (Fix (SuccF (Fix ZeroF))))))
```

## Least vs Greatest Fixed Points

### Least Fixed Point (μF)

- Represents **finite** structures
- Initial object in the category of F-algebras
- Supports **catamorphisms** (folds)

### Greatest Fixed Point (νF)

- Represents **potentially infinite** structures
- Terminal object in the category of F-coalgebras
- Supports **anamorphisms** (unfolds)

In Haskell (with laziness), these often coincide, but the distinction matters for totality.

## The Lambek Lemma

A fundamental result: the structure map of an initial algebra is an **isomorphism**.

For the initial F-algebra $(\mu F, \text{in})$:

$$\text{in} : F\,(\mu F) \xrightarrow{\cong} \mu F$$

This means $\mu F \cong F\,(\mu F)$, justifying our "fixed point" terminology.

## Project and Embed

The `recursion-schemes` library provides:

```haskell
class Functor (Base t) => Recursive t where
  project :: t -> Base t t

class Functor (Base t) => Corecursive t where
  embed :: Base t t -> t
```

- `project` breaks down one layer (like `unFix`)
- `embed` builds up one layer (like `Fix`)

## Type Families for Base Functors

```haskell
type family Base t :: * -> *

type instance Base [a] = ListF a
type instance Base (Tree a) = TreeF a
type instance Base Natural = Maybe
```

This allows using recursion schemes on existing types without wrapping in `Fix`.

## Summary

| Concept | Symbol | Haskell |
|---------|--------|---------|
| Least fixed point | $\mu F$ | `Fix f` or `Recursive t` |
| Greatest fixed point | $\nu F$ | `Fix f` or `Corecursive t` |
| Fold one layer | $\text{out}$ | `project` |
| Build one layer | $\text{in}$ | `embed` |
