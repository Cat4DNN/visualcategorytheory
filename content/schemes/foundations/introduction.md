+++
title = "Introduction to Recursion Schemes"
description = "What are recursion schemes and why do they matter?"
date = 2024-01-01T00:00:00+00:00
draft = false
weight = 10
template = "docs/page.html"

[extra]
toc = true
top = false
+++

## The Problem with Explicit Recursion

Consider a simple recursive function to sum a list:

```haskell
sumList :: [Int] -> Int
sumList []     = 0
sumList (x:xs) = x + sumList xs
```

Now consider finding the product:

```haskell
productList :: [Int] -> Int
productList []     = 1
productList (x:xs) = x * productList xs
```

These functions share the same recursive structure - they differ only in the base case and the combining operation. **Recursion schemes** abstract this pattern.

## The Core Insight

Every recursion scheme separates two concerns:

1. **The recursive traversal** - handled by the scheme itself
2. **The computation at each step** - provided by an algebra or coalgebra

$$\text{Recursive Function} = \text{Traversal Pattern} \circ \text{Step Computation}$$

## A Taste of Catamorphism

Using the `recursion-schemes` library, both functions become:

```haskell
import Data.Functor.Foldable

sumList :: [Int] -> Int
sumList = cata alg
  where
    alg Nil         = 0
    alg (Cons x xs) = x + xs

productList :: [Int] -> Int
productList = cata alg
  where
    alg Nil         = 1
    alg (Cons x xs) = x * xs
```

The `cata` function handles all the recursion. We only specify what to do at each step through an **F-algebra**.

## Benefits of Recursion Schemes

### 1. **Modularity**
Separate the "what" from the "how" of recursion.

### 2. **Correctness**
Schemes are proven correct - if your algebra is correct, so is the result.

### 3. **Fusion**
Compilers can fuse multiple traversals into one, improving performance.

### 4. **Expressiveness**
Complex recursive patterns become simple compositions.

## The Journey Ahead

In the following sections, we'll explore:

- **F-Algebras & F-Coalgebras**: The mathematical building blocks
- **Fixed Points**: How recursive types are defined
- **Catamorphisms**: Generalized folds
- **Anamorphisms**: Generalized unfolds
- And many more advanced schemes...

Let's begin with the categorical foundations.
