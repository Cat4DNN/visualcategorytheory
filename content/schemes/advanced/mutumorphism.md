+++
title = "Mutumorphism"
description = "Mutual recursion expressed as a recursion scheme."
date = 2024-01-13T00:00:00+00:00
draft = false
weight = 20
template = "docs/page.html"

[extra]
toc = true
top = false
+++

## Definition

A **mutumorphism** generalizes zygomorphism to handle full mutual recursion where **both** folds depend on each other.

$$\text{mutu} : (F\,(a, b) \to a) \to (F\,(a, b) \to b) \to \mu F \to (a, b)$$

Both algebras receive results from both computations.

## Classic Example: Even/Odd

The classic mutual recursion:

```haskell
even :: Nat -> Bool
even Zero     = True
even (Succ n) = odd n

odd :: Nat -> Bool
odd Zero     = False
odd (Succ n) = even n
```

These are mutually recursive - each calls the other.

## Implementation

```haskell
mutu :: Functor f => (f (a, b) -> a) -> (f (a, b) -> b) -> Fix f -> (a, b)
mutu alg1 alg2 = cata (\x -> (alg1 x, alg2 x))
```

Simple! Just compute both simultaneously.

## Examples

### Even and Odd

```haskell
data NatF r = ZeroF | SuccF r deriving Functor

evenAlg :: NatF (Bool, Bool) -> Bool
evenAlg ZeroF          = True
evenAlg (SuccF (_, o)) = o  -- even n = odd (n-1)

oddAlg :: NatF (Bool, Bool) -> Bool
oddAlg ZeroF          = False
oddAlg (SuccF (e, _)) = e   -- odd n = even (n-1)

evenOdd :: Fix NatF -> (Bool, Bool)
evenOdd = mutu evenAlg oddAlg

isEven, isOdd :: Fix NatF -> Bool
isEven = fst . evenOdd
isOdd  = snd . evenOdd
```

### Expression Evaluation with Type Checking

```haskell
data ExprF r = LitF Int | AddF r r | IsZeroF r | IfF r r r
  deriving Functor

-- Compute both value and type simultaneously
data Type = TInt | TBool deriving Eq

evalAlg :: ExprF ((Maybe Int, Maybe Bool), Type) -> (Maybe Int, Maybe Bool)
evalAlg (LitF n) = (Just n, Nothing)
evalAlg (AddF ((Just x, _), _) ((Just y, _), _)) = (Just (x + y), Nothing)
evalAlg (IsZeroF ((Just n, _), _)) = (Nothing, Just (n == 0))
evalAlg (IfF ((_, Just c), _) t e) = if c then fst t else fst e
evalAlg _ = (Nothing, Nothing)

typeAlg :: ExprF ((Maybe Int, Maybe Bool), Type) -> Type
typeAlg (LitF _) = TInt
typeAlg (AddF _ _) = TInt
typeAlg (IsZeroF _) = TBool
typeAlg (IfF _ (_, tt) (_, te)) = if tt == te then tt else TInt -- simplified
```

### Tree Processing: Size and Depth

```haskell
data TreeF a r = LeafF a | NodeF r r deriving Functor

sizeAlg :: TreeF a (Int, Int) -> Int
sizeAlg (LeafF _)       = 1
sizeAlg (NodeF (s1, _) (s2, _)) = s1 + s2

depthAlg :: TreeF a (Int, Int) -> Int
depthAlg (LeafF _)       = 0
depthAlg (NodeF (_, d1) (_, d2)) = 1 + max d1 d2

sizeAndDepth :: Fix (TreeF a) -> (Int, Int)
sizeAndDepth = mutu sizeAlg depthAlg
```

## Mutumorphism vs Zygomorphism

| Zygomorphism | Mutumorphism |
|--------------|--------------|
| One-way dependency | Two-way dependency |
| Helper + Main | Both are "main" |
| `(F b → b, F (b,a) → a)` | `(F (a,b) → a, F (a,b) → b)` |

Zygomorphism is a special case where one algebra ignores the other's result.

## When to Use Mutumorphism

Use a mutumorphism when:
- You have genuine mutual recursion
- Two computations are intertwined
- Neither can be computed independently
- You want to compute multiple related values efficiently

## Generalization: N-ary Mutual Recursion

For more than two mutually recursive functions, use tuples or records:

```haskell
mutu3 :: Functor f
      => (f (a, b, c) -> a)
      -> (f (a, b, c) -> b)
      -> (f (a, b, c) -> c)
      -> Fix f -> (a, b, c)
mutu3 f g h = cata (\x -> (f x, g x, h x))
```
