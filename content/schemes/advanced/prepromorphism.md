+++
title = "Prepromorphism"
description = "Catamorphism with natural transformation preprocessing."
date = 2024-01-15T00:00:00+00:00
draft = false
weight = 40
template = "docs/page.html"

[extra]
toc = true
top = false
+++

## Definition

A **prepromorphism** applies a natural transformation to transform the structure *before* each step of a fold.

$$\text{prepro} : \text{Distributive } t \Rightarrow (F\,a \to a) \to (\forall b.\, F\,b \to F\,b) \to \mu F \to a$$

The natural transformation $\forall b.\, F\,b \to F\,b$ modifies the shape at each level.

## Intuition

Think of a catamorphism that can "massage" the input structure before processing each layer:

```
         prepro
    μF ──────────→ a
     │
     ↓ transform shape
    F(μF) ───────→ F a ───→ a
              fmap    algebra
```

## Implementation

```haskell
prepro :: Functor f
       => (forall b. f b -> f b)  -- Natural transformation
       -> (f a -> a)               -- Algebra
       -> Fix f -> a
prepro nat alg = alg . fmap (prepro nat alg . cata (Fix . nat)) . unFix
```

Using `recursion-schemes`:

```haskell
prepro :: (Recursive t, Corecursive t)
       => (forall b. Base t b -> Base t b)
       -> (Base t a -> a)
       -> t -> a
```

## Examples

### Processing with Normalization

```haskell
data ExprF r = LitF Int | AddF r r | NegF r deriving Functor

-- Natural transformation: push negation inward
pushNeg :: ExprF a -> ExprF a
pushNeg (NegF (NegF x)) = x  -- double negation elimination
pushNeg x = x

-- Algebra: evaluate
evalAlg :: ExprF Int -> Int
evalAlg (LitF n)   = n
evalAlg (AddF x y) = x + y
evalAlg (NegF x)   = negate x

-- Evaluate with normalization at each step
evalNorm :: Fix ExprF -> Int
evalNorm = prepro pushNeg evalAlg
```

### List Processing with Deduplication

```haskell
-- Natural transformation: remove consecutive duplicates
dedup :: Eq a => ListF a b -> ListF a b
dedup (ConsF x (ConsF y rest)) | x == y = ConsF x rest
dedup x = x

-- Sum with deduplication
sumDedup :: Eq a => Num a => [a] -> a
sumDedup = prepro dedup sumAlg
```

### Tree Balancing During Traversal

```haskell
data TreeF a r = LeafF a | NodeF r r deriving Functor

-- Rotate left-heavy trees
rotateRight :: TreeF a r -> TreeF a r
rotateRight (NodeF (NodeF a b) c) = NodeF a (NodeF b c)
rotateRight x = x

-- Process with continuous rebalancing
processBalanced :: (a -> b -> b) -> b -> Fix (TreeF a) -> b
processBalanced f z = prepro rotateRight (treeAlg f z)
```

## The Natural Transformation Requirement

The transformation must be a *natural transformation*:

```haskell
-- For all f: a → b
fmap f . nat = nat . fmap f
```

This ensures the transformation only changes structure, not content.

## Prepromorphism vs Catamorphism

| Catamorphism | Prepromorphism |
|--------------|----------------|
| Direct fold | Transform-then-fold |
| $F\,a \to a$ | $(\forall b.\, F\,b \to F\,b) \to F\,a \to a$ |
| Structure preserved | Structure modified at each step |

## When to Use Prepromorphism

Use a prepromorphism when:
- You need to normalize structure during folding
- Simplification rules should apply at each level
- The structure needs continuous transformation
- Implementing optimizing compilers or simplifiers

## Dual: Postpromorphism

The dual **postpromorphism** applies the transformation *after* each step of an unfold:

$$\text{postpro} : (a \to F\,a) \to (\forall b.\, F\,b \to F\,b) \to a \to \nu F$$

```haskell
postpro :: Functor f
        => (forall b. f b -> f b)
        -> (a -> f a)
        -> a -> Fix f
postpro nat coalg = Fix . fmap (ana (nat . coalg) . postpro nat coalg) . coalg
```

## Combining Pre and Post

You can combine preprocessing and postprocessing in a hylomorphism variant:

```haskell
prepostHylo :: Functor f
            => (forall b. f b -> f b)  -- Pre: during fold
            -> (forall b. f b -> f b)  -- Post: during unfold
            -> (f b -> b)
            -> (a -> f a)
            -> a -> b
```

