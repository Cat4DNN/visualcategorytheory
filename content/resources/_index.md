+++
title = "Resources"
description = "Code examples, recommended reading, and supplementary resources for learning recursion schemes."
template = "resources/section.html"
+++

<div class="row g-4 mb-5">
<div class="col-md-6">
<div class="card h-100">
<div class="card-body">
<h3 class="card-title">Code Examples</h3>
<p class="card-text">All Haskell code examples from this compendium, organized by scheme. Clone and experiment locally!</p>
<a href="https://github.com/cat4dnn" class="btn btn-primary">View on GitHub</a>
</div>
</div>
</div>
<div class="col-md-6">
<div class="card h-100">
<div class="card-body">
<h3 class="card-title">recursion-schemes Library</h3>
<p class="card-text">Edward Kmett's Haskell library implementing all the schemes covered in this compendium.</p>
<a href="https://hackage.haskell.org/package/recursion-schemes" class="btn btn-outline-primary">View on Hackage</a>
</div>
</div>
</div>
</div>

---

## Getting Started

### Haskell Setup

```bash
# Using GHCup (recommended)
curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh

# Install recursion-schemes
cabal update
cabal install --lib recursion-schemes
```

### Quick Test

```haskell
-- Test.hs
{-# LANGUAGE DeriveFunctor, TemplateHaskell #-}

import Data.Functor.Foldable
import Data.Functor.Foldable.TH

data Expr = Lit Int | Add Expr Expr deriving Show

makeBaseFunctor ''Expr

eval :: Expr -> Int
eval = cata $ \case
  LitF n   -> n
  AddF x y -> x + y

main = print $ eval (Add (Lit 1) (Add (Lit 2) (Lit 3)))  -- 6
```

```bash
runhaskell Test.hs
```

---

## Essential Reading

### Papers

| Paper | Authors | Topic |
|-------|---------|-------|
| [Functional Programming with Bananas, Lenses, Envelopes and Barbed Wire](https://maartenfokkinga.github.io/utwente/mmf91m.pdf) | Meijer et al. | The foundational paper |
| [Recursion Schemes for Higher Algebras](https://www.cs.ox.ac.uk/ralf.hinze/publications/WGP13.pdf) | Hinze et al. | Advanced extensions |
| [Recursion Schemes from Comonads](https://www.ioc.ee/~tarmo/papers/cmcs08.pdf) | Uustalu et al. | Comonadic perspective |

### Books

**Functional Programming:**
- *Thinking with Types* - Sandy Maguire
- *Parallel and Concurrent Programming in Haskell* - Simon Marlow
- *Haskell in Depth* - Vitaly Bragilevsky

**Category Theory:**
- *Category Theory for Programmers* - Bartosz Milewski (free online!)
- *Seven Sketches in Compositionality* - Fong & Spivak
- *An Invitation to Applied Category Theory* - Fong & Spivak

### Blog Posts & Tutorials

- [Introduction to Recursion Schemes](https://blog.sumtypeofway.com/posts/introduction-to-recursion-schemes.html) - Patrick Thomson
- [Practical Recursion Schemes](https://jtobin.io/practical-recursion-schemes) - Jared Tobin
- [Recursion Schemes, Part 1](https://www.schoolofhaskell.com/user/bartosz/understanding-algebras) - Bartosz Milewski

---

## Video Resources

### Conference Talks

- **"Recursion Schemes"** - Tim Williams (Lambda Conf)
- **"F-Algebras"** - Bartosz Milewski (YouTube)
- **"Practical Recursion Schemes"** - various Haskell meetups

### YouTube Channels

- [Bartosz Milewski](https://www.youtube.com/@DrBartosz) - Category theory lectures
- [Haskell at Work](https://www.youtube.com/@haborertimwerk) - Practical Haskell

---

## Libraries & Tools

### Haskell

| Library | Purpose |
|---------|---------|
| [recursion-schemes](https://hackage.haskell.org/package/recursion-schemes) | The canonical implementation |
| [compdata](https://hackage.haskell.org/package/compdata) | Compositional data types |
| [free](https://hackage.haskell.org/package/free) | Free monads |
| [comonad](https://hackage.haskell.org/package/comonad) | Comonadic structures |

### Other Languages

| Language | Library |
|----------|---------|
| Scala | [droste](https://github.com/higherkindness/droste), [matryoshka](https://github.com/precog/matryoshka) |
| PureScript | [purescript-matryoshka](https://pursuit.purescript.org/packages/purescript-matryoshka) |
| TypeScript | [fp-ts-recursion-schemes](https://github.com/gcanti/fp-ts-recursion-schemes) |

---

## Cheat Sheet

### Scheme Quick Reference

| Scheme | Type | Use Case |
|--------|------|----------|
| cata | `(F a → a) → μF → a` | Fold structure |
| ana | `(a → F a) → a → νF` | Generate structure |
| hylo | `(F b → b) → (a → F a) → a → b` | Transform via intermediate |
| para | `(F (μF, a) → a) → μF → a` | Fold with original |
| apo | `(a → F (νF + a)) → a → νF` | Generate with shortcuts |
| histo | `(F (Cofree F a) → a) → μF → a` | Fold with history |
| futu | `(a → F (Free F a)) → a → νF` | Generate multiple layers |

### Pattern Functor Naming

```haskell
-- Data type    → Pattern functor
List a          → ListF a r = NilF | ConsF a r
Tree a          → TreeF a r = LeafF a | NodeF r r
Expr            → ExprF r   = LitF Int | AddF r r
```

---

## Community

### Discussion & Help

- [Haskell Discord](https://discord.gg/haskell) - #beginners and #advanced channels
- [r/haskell](https://reddit.com/r/haskell) - Reddit community
- [Stack Overflow](https://stackoverflow.com/questions/tagged/recursion-schemes) - Q&A

### Contributing

Found an error or want to contribute? This compendium is open to improvements!

- [Report an Issue](https://github.com/cat4dnn/recursion-schemes/issues)
- [Suggest Content](https://github.com/cat4dnn/recursion-schemes/discussions)

---

<div class="text-center mt-5">
<h3>Ready to Learn?</h3>
<p>Start with the foundations and work your way up!</p>
<a href="/schemes/foundations/introduction/" class="btn btn-primary btn-lg">Begin Learning</a>
</div>

