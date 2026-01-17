+++
title = "The recursion-schemes Library"
description = "Practical guide to using Edward Kmett's recursion-schemes library."
date = 2024-01-17T00:00:00+00:00
draft = false
weight = 10
template = "docs/page.html"

[extra]
toc = true
top = false
+++

## Installation

Add to your `.cabal` file:

```cabal
build-depends: base, recursion-schemes
```

Or with Stack:

```yaml
dependencies:
  - recursion-schemes
```

## Core Type Classes

### Recursive (for folds)

```haskell
class Functor (Base t) => Recursive t where
  type Base t :: * -> *
  project :: t -> Base t t
  -- Derived: cata, para, histo, zygo, etc.
```

`Base t` is the "base functor" of your recursive type.

### Corecursive (for unfolds)

```haskell
class Functor (Base t) => Corecursive t where
  embed :: Base t t -> t
  -- Derived: ana, apo, futu, etc.
```

## Defining Your Types

### Option 1: makeBaseFunctor (Recommended)

```haskell
{-# LANGUAGE DeriveFunctor, DeriveTraversable, TemplateHaskell #-}

import Data.Functor.Foldable
import Data.Functor.Foldable.TH

data Expr = Lit Int | Add Expr Expr | Mul Expr Expr

makeBaseFunctor ''Expr
-- Generates: ExprF, Recursive Expr, Corecursive Expr
```

Generated functor:

```haskell
data ExprF r = LitF Int | AddF r r | MulF r r
  deriving (Functor, Foldable, Traversable)
```

### Option 2: Manual Definition

```haskell
data Expr = Lit Int | Add Expr Expr | Mul Expr Expr

data ExprF r = LitF Int | AddF r r | MulF r r
  deriving (Functor, Foldable, Traversable)

type instance Base Expr = ExprF

instance Recursive Expr where
  project (Lit n)   = LitF n
  project (Add l r) = AddF l r
  project (Mul l r) = MulF l r

instance Corecursive Expr where
  embed (LitF n)   = Lit n
  embed (AddF l r) = Add l r
  embed (MulF l r) = Mul l r
```

### Built-in Instances

The library provides instances for common types:

```haskell
type instance Base [a] = ListF a
type instance Base (NonEmpty a) = NonEmptyF a
type instance Base Natural = Maybe
type instance Base (Fix f) = f
type instance Base (Cofree f a) = CofreeF f a
type instance Base (Free f a) = FreeF f a
```

## Using the Schemes

### Catamorphism (cata)

```haskell
eval :: Expr -> Int
eval = cata $ \case
  LitF n   -> n
  AddF l r -> l + r
  MulF l r -> l * r

-- For lists (built-in)
sum :: [Int] -> Int
sum = cata $ \case
  Nil       -> 0
  Cons x xs -> x + xs
```

### Anamorphism (ana)

```haskell
replicate :: Int -> a -> [a]
replicate = curry . ana $ \case
  (0, _) -> Nil
  (n, x) -> Cons x (n-1, x)
```

### Hylomorphism (hylo)

```haskell
factorial :: Int -> Int
factorial = hylo alg coalg
  where
    coalg 0 = Nil
    coalg n = Cons n (n-1)
    alg Nil = 1
    alg (Cons n acc) = n * acc
```

### Paramorphism (para)

```haskell
tails :: [a] -> [[a]]
tails = para $ \case
  Nil             -> [[]]
  Cons x (xs, ts) -> (x:xs) : ts
```

### Histomorphism (histo)

```haskell
fib :: Natural -> Natural
fib = histo $ \case
  Nothing                          -> 0
  Just (_ :< Nothing)              -> 1
  Just (f1 :< Just (f2 :< _))      -> f1 + f2
```

### Apomorphism (apo)

```haskell
insertSorted :: Ord a => a -> [a] -> [a]
insertSorted x = apo $ \case
  []                 -> Cons x (Left [])
  (y:ys) | x <= y    -> Cons x (Left (y:ys))
         | otherwise -> Cons y (Right ys)
```

## Helpful Combinators

### refix

Convert between different fixed-point representations:

```haskell
refix :: (Recursive s, Corecursive t, Base s ~ Base t) => s -> t
```

### hoistCofree / hoistFree

Transform the functor inside Cofree/Free:

```haskell
hoistCofree :: Functor g => (forall x. f x -> g x) -> Cofree f a -> Cofree g a
```

### gcata / gana

Generalized versions with comonads/monads:

```haskell
gcata :: (Recursive t, Comonad w)
      => (forall b. Base t (w b) -> w (Base t b))
      -> (Base t (w a) -> a)
      -> t -> a
```

## Working with Cofree

For histomorphism and related schemes:

```haskell
import Control.Comonad.Cofree

-- Access current value
extract :: Cofree f a -> a

-- Access substructure
unwrap :: Cofree f a -> f (Cofree f a)

-- Pattern: a :< f (Cofree f a)
fibAlg :: Maybe (Cofree Maybe Natural) -> Natural
fibAlg Nothing = 0
fibAlg (Just (prev :< Nothing)) = 1
fibAlg (Just (prev :< Just inner)) = prev + extract inner
```

## Working with Free

For futumorphism:

```haskell
import Control.Monad.Free

-- Delay computation
Pure :: a -> Free f a

-- Produce structure now
Free :: f (Free f a) -> Free f a
```

## Common Patterns

### Annotate Then Process

```haskell
-- First pass: annotate with positions
annotate :: Expr -> Cofree ExprF Int
annotate = zygo sizeAlg annotateAlg

-- Second pass: use annotations
process :: Cofree ExprF Int -> Result
process = cata processAlg
```

### Unfold-Transform-Fold

```haskell
pipeline :: Seed -> Result
pipeline = cata foldAlg . transform . ana unfoldCoalg
```

### Error Handling

```haskell
evalSafe :: Expr -> Either Error Int
evalSafe = cataA $ \case
  LitF n   -> pure n
  AddF l r -> (+) <$> l <*> r
  DivF l r -> do
    l' <- l
    r' <- r
    if r' == 0 then Left DivByZero else pure (l' `div` r')
```

## Performance Tips

1. **Use `hylo` directly** when possible—it fuses without intermediate structure
2. **Prefer `cata` over manual recursion**—GHC optimizes it well
3. **Use `INLINE` pragmas** for your algebras in performance-critical code
4. **Consider `Plated`** for lens-based traversals if you need selective updates

## Debugging

### Pretty-printing structure

```haskell
showStructure :: (Recursive t, Show1 (Base t)) => t -> String
showStructure = cata (showsPrec1 0)
```

### Tracing evaluation

```haskell
traceEval :: Expr -> IO Int
traceEval = cataA $ \case
  LitF n -> do
    putStrLn $ "Lit: " ++ show n
    pure n
  AddF l r -> do
    l' <- l
    r' <- r
    putStrLn $ "Add: " ++ show l' ++ " + " ++ show r'
    pure (l' + r')
```

