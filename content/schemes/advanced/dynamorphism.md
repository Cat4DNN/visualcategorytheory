+++
title = "Dynamorphism"
description = "Hylomorphism with memoization for dynamic programming."
date = 2024-01-14T00:00:00+00:00
draft = false
weight = 30
template = "docs/page.html"

[extra]
toc = true
top = false
+++

## Definition

A **dynamorphism** (from Greek δύναμις "power") combines the generation of a hylomorphism with the memoization of a histomorphism. It's specifically designed for **dynamic programming** algorithms.

$$\text{dyna} : (F\,(\text{Cofree } F\, b) \to b) \to (a \to F\,a) \to a \to b$$

The coalgebra generates structure, while the algebra has access to all previously computed values.

## Why Dynamorphisms?

Dynamic programming algorithms have two characteristics:
1. **Optimal substructure**: Build solutions from sub-solutions
2. **Overlapping subproblems**: Same subproblems recur

A dynamorphism captures this pattern: unfold the problem structure, then fold with memoized access to all subresults.

## Implementation

```haskell
dyna :: Functor f => (f (Cofree f b) -> b) -> (a -> f a) -> a -> b
dyna alg coalg = extract . hylo alg' coalg
  where
    alg' fc = alg fc :< fc
```

This is essentially a hylomorphism where the algebra receives a `Cofree` structure containing all historical computations.

## The Key Insight

```
        coalg           alg (with history)
    a ────────→ F a ────────────→ b
                 ↓
            F (Cofree F b)
                 ↓
              Cofree F b
                 │
                 └─→ Full history available!
```

## Examples

### Fibonacci (Classic DP)

```haskell
data NatF r = ZeroF | SuccF r deriving Functor

-- Coalgebra: count down from n
fibCoalg :: Int -> NatF Int
fibCoalg 0 = ZeroF
fibCoalg n = SuccF (n - 1)

-- Algebra: access previous two values via Cofree
fibAlg :: NatF (Cofree NatF Int) -> Int
fibAlg ZeroF = 0
fibAlg (SuccF cofree) =
  case unwrap cofree of
    ZeroF        -> 1  -- fib(1) = 1
    SuccF inner  -> extract cofree + extract inner  -- fib(n) = fib(n-1) + fib(n-2)

fib :: Int -> Int
fib = dyna fibAlg fibCoalg
```

### Longest Common Subsequence

```haskell
data LCSF r = Done | StepL r | StepR r | Match r deriving Functor

-- Problem state
type LCSState = (String, String)

lcsCoalg :: LCSState -> LCSF LCSState
lcsCoalg ([], _)     = Done
lcsCoalg (_, [])     = Done
lcsCoalg (x:xs, y:ys)
  | x == y    = Match (xs, ys)
  | otherwise = -- branch both ways in practice

lcsAlg :: LCSF (Cofree LCSF Int) -> Int
lcsAlg Done = 0
lcsAlg (Match history) = 1 + extract history
lcsAlg (StepL history) = extract history
lcsAlg (StepR history) = extract history
```

### Edit Distance (Levenshtein)

```haskell
data EditF r =
    Base Int           -- Base case: length of remaining string
  | Edit r r r         -- Three choices: insert, delete, substitute
  deriving Functor

editCoalg :: (String, String) -> EditF (String, String)
editCoalg ([], ys) = Base (length ys)
editCoalg (xs, []) = Base (length xs)
editCoalg (x:xs, y:ys) = Edit (xs, y:ys) (x:xs, ys) (xs, ys)

editAlg :: (Char, Char) -> EditF (Cofree EditF Int) -> Int
editAlg _ (Base n) = n
editAlg (x, y) (Edit del ins sub) =
  minimum [ 1 + extract del    -- deletion
          , 1 + extract ins    -- insertion
          , cost + extract sub -- substitution
          ]
  where cost = if x == y then 0 else 1
```

### Knapsack Problem

```haskell
data KnapF r = NoItems | Consider r r deriving Functor

-- State: (remaining capacity, remaining items)
type KnapState = (Int, [(Int, Int)])  -- (capacity, [(weight, value)])

knapCoalg :: KnapState -> KnapF KnapState
knapCoalg (_, []) = NoItems
knapCoalg (cap, (w,v):items)
  | w > cap   = Consider (cap, items) (cap, items)  -- can't take
  | otherwise = Consider (cap, items) (cap - w, items)  -- take or skip

knapAlg :: (Int, Int) -> KnapF (Cofree KnapF Int) -> Int
knapAlg _ NoItems = 0
knapAlg (_, v) (Consider skip take) =
  max (extract skip) (v + extract take)
```

## Dynamorphism vs Other Schemes

| Scheme | Structure | Memoization |
|--------|-----------|-------------|
| Catamorphism | Existing | None |
| Histomorphism | Existing | Yes (Cofree) |
| Hylomorphism | Generated | None |
| **Dynamorphism** | Generated | Yes (Cofree) |

## The DP Connection

Classical dynamic programming:
1. Define subproblem structure (table dimensions)
2. Define recurrence relation
3. Fill table bottom-up or top-down with memoization

Dynamorphism equivalent:
1. **Coalgebra**: Defines subproblem structure
2. **Algebra with Cofree**: Defines recurrence with access to memoized values
3. **Automatic**: Table management handled by the scheme

## When to Use Dynamorphism

Use a dynamorphism when:
- Implementing dynamic programming algorithms
- You need to generate structure AND access history
- Problems have optimal substructure and overlapping subproblems
- Converting recursive solutions to efficient DP

## Practical Considerations

```haskell
-- Helper to look back n steps in history
lookBack :: Int -> Cofree f a -> Maybe a
lookBack 0 (a :< _)  = Just a
lookBack n (_ :< fa) = -- traverse n steps back
```

The Cofree structure provides O(depth) access to any previous result, making dynamorphism suitable for algorithms needing bounded lookback.

## Relationship to Other Schemes

```
Hylomorphism + Memoization = Dynamorphism
Histomorphism + Generation = Dynamorphism

Catamorphism : Dynamorphism ::
   Fold      : Dynamic Programming
```

