+++
title = "Catamorphism"
description = "The generalized fold - consuming recursive structures bottom-up."
date = 2024-01-04T00:00:00+00:00
draft = false
weight = 10
template = "docs/page.html"

[extra]
toc = true
top = false
+++

## Definition

A **catamorphism** (from Greek κατά "downward") is the unique homomorphism from an initial F-algebra to any other F-algebra. It generalizes the concept of "folding" a data structure.

$$\text{cata} : (\forall a.\, F\,a \to a) \to \mu F \to a$$

Or in categorical notation (banana brackets):

$$\llbracket \phi \rrbracket : \mu F \to A$$

## The Universal Property

For any F-algebra $\phi : F\,A \to A$, there exists a **unique** function $\llbracket\phi\rrbracket : \mu F \to A$ such that:

$$\llbracket\phi\rrbracket = \phi \circ F\llbracket\phi\rrbracket \circ \text{out}$$

This diagram commutes:

$$
\begin{CD}
\mu F @>\text{out}>> F\,(\mu F) \\
@V\llbracket\phi\rrbracket VV @VVF\llbracket\phi\rrbracket V \\
A @<<\phi< F\,A
\end{CD}
$$

## Implementation

```haskell
cata :: Functor f => (f a -> a) -> Fix f -> a
cata alg = alg . fmap (cata alg) . unFix
```

Or using `recursion-schemes`:

```haskell
cata :: Recursive t => (Base t a -> a) -> t -> a
cata alg = c where c = alg . fmap c . project
```

## Examples

### Sum of a List

```haskell
data ListF a r = NilF | ConsF a r deriving Functor

sumAlg :: Num a => ListF a a -> a
sumAlg NilF         = 0
sumAlg (ConsF x xs) = x + xs

sumList :: Num a => Fix (ListF a) -> a
sumList = cata sumAlg
```

### Evaluating an Expression Tree

```haskell
data ExprF r = LitF Int | AddF r r | MulF r r
  deriving Functor

evalAlg :: ExprF Int -> Int
evalAlg (LitF n)   = n
evalAlg (AddF x y) = x + y
evalAlg (MulF x y) = x * y

eval :: Fix ExprF -> Int
eval = cata evalAlg
```

### Tree Height

```haskell
data TreeF a r = LeafF a | NodeF r r deriving Functor

heightAlg :: TreeF a Int -> Int
heightAlg (LeafF _)   = 0
heightAlg (NodeF l r) = 1 + max l r

height :: Fix (TreeF a) -> Int
height = cata heightAlg
```

## Fusion Laws

Catamorphisms satisfy important fusion laws:

### Cata-Fusion
$$h \circ \llbracket\phi\rrbracket = \llbracket\psi\rrbracket \iff h \circ \phi = \psi \circ F\,h$$

### Cata-Reflection
$$\llbracket\text{in}\rrbracket = \text{id}$$

## When to Use Catamorphism

Use a catamorphism when you need to:
- Consume a recursive data structure
- Compute a single result from a structure
- Process data "bottom-up" (leaves to root)

## Limitations

Catamorphisms cannot:
- Access the original substructure (use **paramorphism**)
- Terminate early (use **apomorphism** combined with hylomorphism)
- Access previously computed values (use **histomorphism**)
