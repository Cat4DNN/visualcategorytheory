+++
title = "Chapter 2: Mathematical Preliminaries"
description = "Essential mathematical foundations including category theory basics, sigma algebras, and measure theory."
date = 2024-01-02T08:00:00+00:00
updated = 2024-01-02T08:00:00+00:00
draft = false
weight = 20
sort_by = "weight"
template = "chapters/page.html"

[extra]
lead = "This chapter covers the mathematical prerequisites: category theory fundamentals, measure theory, and the probabilistic foundations necessary for rigorous financial modeling."
toc = true
top = false
+++

## Category Theory Fundamentals

### Definition: Category

A **category** $\mathcal{C}$ consists of:

1. A collection of **objects** $\text{Ob}(\mathcal{C})$
2. For each pair of objects $A, B$, a collection of **morphisms** $\text{Hom}(A, B)$
3. For each object $A$, an **identity morphism** $\text{id}_A: A \to A$
4. A **composition operation** $\circ$ that is associative

### Example: The Category of Measurable Spaces

Let $\mathbf{Meas}$ be the category where:

- Objects are measurable spaces $(X, \Sigma_X)$
- Morphisms are measurable functions

This category is fundamental for probability theory and, by extension, financial modeling.

```haskell
-- Category type class in Haskell
class Category cat where
    id  :: cat a a
    (.) :: cat b c -> cat a b -> cat a c

-- The category of functions
instance Category (->) where
    id    = \x -> x
    g . f = \x -> g (f x)
```

## Functors and Natural Transformations

### Definition: Functor

A **functor** $F: \mathcal{C} \to \mathcal{D}$ maps:
- Objects: $A \mapsto F(A)$
- Morphisms: $(f: A \to B) \mapsto (F(f): F(A) \to F(B))$

Preserving:
- Identity: $F(\text{id}_A) = \text{id}_{F(A)}$
- Composition: $F(g \circ f) = F(g) \circ F(f)$

### Financial Example: The Price Functor

Consider the functor $\text{Price}: \mathbf{Asset} \to \mathbf{TimeSeries}$ that maps:
- Each asset to its price time series
- Each asset transformation (e.g., stock split) to the corresponding time series transformation

## Measure Theory Essentials

### Sigma-Algebras and Filtrations

A **$\sigma$-algebra** $\mathcal{F}$ on a set $\Omega$ is a collection of subsets satisfying:

1. $\Omega \in \mathcal{F}$
2. If $A \in \mathcal{F}$, then $A^c \in \mathcal{F}$
3. If $\{A_n\}_{n=1}^{\infty} \subseteq \mathcal{F}$, then $\bigcup_{n=1}^{\infty} A_n \in \mathcal{F}$

A **filtration** $\{\mathcal{F}_t\}_{t \geq 0}$ represents the information available at time $t$.

### The Radon-Nikodym Derivative

The change of measure between $\mathbb{P}$ and $\mathbb{Q}$ is given by:

$$\frac{d\mathbb{Q}}{d\mathbb{P}} = \mathcal{E}_T$$

where $\mathcal{E}_T$ is the Radon-Nikodym derivative (exponential martingale).

## Probability Spaces as Categories

We can view probability theory categorically:

| Probabilistic Concept | Categorical View |
|-----------------------|------------------|
| Random variable $X: \Omega \to \mathbb{R}$ | Morphism in $\mathbf{Meas}$ |
| Expectation $\mathbb{E}$ | Functor to vector spaces |
| Conditional expectation | Pullback construction |
| Independence | Product structure |

```python
import numpy as np
from typing import Callable, Generic, TypeVar

T = TypeVar('T')

class RandomVariable(Generic[T]):
    """A random variable as a measurable function."""

    def __init__(self, sample: Callable[[], T]):
        self._sample = sample

    def __call__(self) -> T:
        return self._sample()

    def map(self, f: Callable[[T], 'S']) -> 'RandomVariable[S]':
        """Functor map: lift a function to random variables."""
        return RandomVariable(lambda: f(self._sample()))

    def expectation(self, n_samples: int = 10000) -> float:
        """Monte Carlo expectation estimation."""
        samples = [self._sample() for _ in range(n_samples)]
        return np.mean(samples)
```

## Stochastic Calculus Preview

### Brownian Motion

A **Brownian motion** $(W_t)_{t \geq 0}$ is a stochastic process satisfying:

1. $W_0 = 0$ a.s.
2. Independent increments
3. $W_t - W_s \sim \mathcal{N}(0, t-s)$ for $s < t$
4. Continuous sample paths

### Itô's Lemma

For a semimartingale $X$ and $f \in C^2$:

$$df(X_t) = f'(X_t) dX_t + \frac{1}{2} f''(X_t) d\langle X \rangle_t$$

This fundamental result will be explored in depth in Chapter 4.

## Exercises

1. **Category Construction**: Define the category $\mathbf{Port}$ of portfolios where objects are portfolios and morphisms are rebalancing operations. Show this is indeed a category.

2. **Functor Verification**: Prove that the price functor $\text{Price}: \mathbf{Asset} \to \mathbf{TimeSeries}$ preserves composition.

3. **Measure Theory**: Let $(\Omega, \mathcal{F}, \mathbb{P})$ be a probability space. Show that $\mathcal{F}_t = \sigma(W_s : s \leq t)$ is a filtration.

---

*[← Chapter 1: Introduction](../introduction/) | [Chapter 3: Category Theory for Derivatives →](../../part-2/trading-strategies/)*
