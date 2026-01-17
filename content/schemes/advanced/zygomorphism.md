+++
title = "Zygomorphism"
description = "Two mutually dependent folds running simultaneously."
date = 2024-01-12T00:00:00+00:00
draft = false
weight = 10
template = "docs/page.html"

[extra]
toc = true
top = false
+++

## Definition

A **zygomorphism** (from Greek ζυγόν "yoke, pair") computes two mutually dependent values in a single traversal. One fold (the "helper") assists the main fold.

$$\text{zygo} : (F\,b \to b) \to (F\,(b, a) \to a) \to \mu F \to a$$

The helper algebra $F\,b \to b$ computes auxiliary values that the main algebra can use.

## Why We Need Zygomorphisms

Consider checking if a list is a palindrome:

```haskell
isPalindrome :: Eq a => [a] -> Bool
isPalindrome xs = xs == reverse xs
```

This traverses the list twice. With a zygomorphism, we can compute both `xs` (reconstruction) and the palindrome check in one pass.

## Implementation

```haskell
zygo :: Functor f => (f b -> b) -> (f (b, a) -> a) -> Fix f -> a
zygo helper alg = snd . cata (\x -> (helper (fmap fst x), alg x))
```

Or using `recursion-schemes`:

```haskell
zygo :: Recursive t => (Base t b -> b) -> (Base t (b, a) -> a) -> t -> a
```

## Examples

### Is Palindrome

```haskell
-- Helper: reconstruct the list
reconstructAlg :: ListF a [a] -> [a]
reconstructAlg NilF         = []
reconstructAlg (ConsF x xs) = x : xs

-- Main: check palindrome using reconstructed tail
palindromeAlg :: Eq a => ListF a ([a], Bool) -> Bool
palindromeAlg NilF = True
palindromeAlg (ConsF x (xs, isPalin)) = isPalin && checkEnds x xs

isPalindrome :: Eq a => [a] -> Bool
isPalindrome = zygo reconstructAlg palindromeAlg
```

### Perfect Binary Tree Check

```haskell
data TreeF a r = LeafF a | NodeF r r deriving Functor

-- Helper: compute depth
depthAlg :: TreeF a Int -> Int
depthAlg (LeafF _)   = 0
depthAlg (NodeF l r) = 1 + max l r

-- Main: check perfect (all leaves at same depth)
perfectAlg :: TreeF a (Int, Bool) -> Bool
perfectAlg (LeafF _) = True
perfectAlg (NodeF (dl, pl) (dr, pr)) = pl && pr && dl == dr

isPerfect :: Fix (TreeF a) -> Bool
isPerfect = zygo depthAlg perfectAlg
```

### Even/Odd Length

```haskell
-- Helper: compute length
lengthAlg :: ListF a Int -> Int
lengthAlg NilF         = 0
lengthAlg (ConsF _ n)  = n + 1

-- Main: check if even
isEvenAlg :: ListF a (Int, Bool) -> Bool
isEvenAlg NilF           = True
isEvenAlg (ConsF _ (_, b)) = not b

isEvenLength :: [a] -> Bool
isEvenLength = zygo lengthAlg isEvenAlg
```

## The Diagram

$$
\begin{CD}
\mu F @>\text{out}>> F\,(\mu F) @>F\,\langle\text{zygo}, \text{helper}\rangle>> F\,(A \times B) @>\phi>> A
\end{CD}
$$

## Generalization: Mutumorphism

Zygomorphism is a special case of **mutumorphism** where one fold doesn't depend on the other (it's "one-way" dependency).

## When to Use Zygomorphism

Use a zygomorphism when:
- You need auxiliary information during a fold
- The auxiliary computation is a simple catamorphism
- You want to avoid multiple traversals
- One result helps compute another

## Relationship to Other Schemes

- Zygomorphism ⊂ Mutumorphism (one-way dependency)
- Zygomorphism = Catamorphism with helper value
- Can often be replaced by paramorphism (trading space for generality)
