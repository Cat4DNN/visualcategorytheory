+++
title = "F-Algebras and F-Coalgebras"
description = "The categorical structures that power recursion schemes."
date = 2024-01-02T00:00:00+00:00
draft = false
weight = 20
template = "docs/page.html"

[extra]
toc = true
top = false
+++

## What is an F-Algebra?

An **F-algebra** is a pair $(A, \alpha)$ where:
- $A$ is a carrier type (the result type)
- $\alpha : F\,A \to A$ is a structure map (the algebra)

$$\text{F-Algebra} = (A, \alpha : F\,A \to A)$$

Here, $F$ is a functor that describes the "shape" of one layer of your recursive structure.

## The List Example

For lists, the base functor is:

```haskell
data ListF a r = NilF | ConsF a r
  deriving Functor
```

An F-algebra for summing integers would be:

```haskell
sumAlg :: ListF Int Int -> Int
sumAlg NilF         = 0
sumAlg (ConsF x xs) = x + xs
```

Notice: the `r` in `ListF` represents the **already-computed result** of the recursive call, not the tail of the list.

## F-Coalgebras: The Dual

An **F-coalgebra** is a pair $(A, \alpha)$ where:
- $A$ is a seed type
- $\alpha : A \to F\,A$ is a structure map (the coalgebra)

$$\text{F-Coalgebra} = (A, \alpha : A \to F\,A)$$

Coalgebras are used for **producing** structures (unfolds).

## Example Coalgebra

A coalgebra for generating a countdown list:

```haskell
countdownCoalg :: Int -> ListF Int Int
countdownCoalg 0 = NilF
countdownCoalg n = ConsF n (n - 1)
```

## The Category of F-Algebras

F-algebras form a category where:
- Objects are F-algebras $(A, \alpha)$
- Morphisms are functions $h : A \to B$ such that the following commutes:

$$
\begin{CD}
F\,A @>\alpha>> A \\
@VF\,hVV @VVhV \\
F\,B @>>\beta> B
\end{CD}
$$

## Initial and Terminal Objects

The **initial F-algebra** is special:
- It has a unique morphism (homomorphism) to every other F-algebra
- Its carrier is the fixed point $\mu F$
- The unique morphism is the **catamorphism**

The **terminal F-coalgebra** is dual:
- It has a unique morphism from every other F-coalgebra
- Its carrier is the greatest fixed point $\nu F$
- The unique morphism is the **anamorphism**

## In Haskell

```haskell
-- The fixed point of a functor
newtype Fix f = Fix { unFix :: f (Fix f) }

-- F-algebra type alias
type Algebra f a = f a -> a

-- F-coalgebra type alias
type Coalgebra f a = a -> f a
```

## Key Insight

The power of recursion schemes comes from these category-theoretic structures:

$$\text{cata} : \text{Algebra } F\, A \to (\mu F \to A)$$

$$\text{ana} : \text{Coalgebra } F\, A \to (A \to \nu F)$$

The scheme handles the recursion; you provide only the algebra/coalgebra.
