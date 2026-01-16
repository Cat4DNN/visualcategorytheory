+++
title = "Chapter 5: Algorithmic Trading Strategies"
description = "A categorical approach to algorithmic trading including momentum, mean reversion, and statistical arbitrage strategies."
date = 2024-01-05T08:00:00+00:00
updated = 2024-01-05T08:00:00+00:00
draft = false
weight = 10
sort_by = "weight"
template = "chapters/page.html"

[extra]
lead = "This chapter develops a categorical framework for algorithmic trading strategies, viewing them as functors that transform market data into trading signals."
toc = true
top = false
+++

## Trading Strategies as Functors

A trading strategy can be understood as a **functor**:

$$\text{Strategy}: \mathbf{MarketData} \to \mathbf{Signal}$$

This functor maps:
- Market observations to trading signals
- Market transitions to signal updates (preserving temporal structure)

### The Signal Category

Objects in $\mathbf{Signal}$ are elements of $\{-1, 0, +1\}^n$ representing:
- $+1$: Long position
- $0$: No position
- $-1$: Short position

## Momentum Strategies

### Categorical Formulation

Let $\text{Mom}_k: \mathbf{Price} \to \mathbf{Signal}$ be the $k$-period momentum functor:

$$\text{Mom}_k(P) = \text{sign}(P_t - P_{t-k})$$

```python
import numpy as np
import pandas as pd
from typing import Callable

class MomentumStrategy:
    """Momentum strategy as a functor from prices to signals."""

    def __init__(self, lookback: int):
        self.lookback = lookback

    def __call__(self, prices: pd.Series) -> pd.Series:
        """Apply the momentum functor."""
        returns = prices.pct_change(self.lookback)
        return np.sign(returns)

    def compose(self, other: 'Strategy') -> 'ComposedStrategy':
        """Functor composition."""
        return ComposedStrategy(self, other)


# Example usage
prices = pd.Series([100, 102, 101, 105, 103, 108, 110])
mom = MomentumStrategy(lookback=2)
signals = mom(prices)
# Result: [NaN, NaN, +1, +1, +1, +1, +1]
```

### Cross-Sectional Momentum

For a universe of assets, we define relative momentum:

$$\text{XsMom}(\mathbf{P})_i = \text{rank}\left(\frac{P_{i,t} - P_{i,t-k}}{P_{i,t-k}}\right)$$

## Mean Reversion Strategies

### The Mean Reversion Functor

$$\text{MeanRev}_k: \mathbf{Price} \to \mathbf{Signal}$$

$$\text{MeanRev}_k(P) = -\text{sign}(P_t - \bar{P}_{t,k})$$

where $\bar{P}_{t,k}$ is the $k$-period moving average.

```python
class MeanReversionStrategy:
    """Mean reversion as the dual of momentum."""

    def __init__(self, window: int, zscore_threshold: float = 2.0):
        self.window = window
        self.threshold = zscore_threshold

    def __call__(self, prices: pd.Series) -> pd.Series:
        """Apply mean reversion functor."""
        rolling_mean = prices.rolling(self.window).mean()
        rolling_std = prices.rolling(self.window).std()
        zscore = (prices - rolling_mean) / rolling_std

        signals = pd.Series(0, index=prices.index)
        signals[zscore > self.threshold] = -1   # Overbought: short
        signals[zscore < -self.threshold] = +1  # Oversold: long
        return signals
```

## Statistical Arbitrage

### Cointegration as a Categorical Structure

Two price series $(P^A, P^B)$ are **cointegrated** if there exists $\beta$ such that:

$$P^A_t - \beta P^B_t = \epsilon_t$$

where $\epsilon_t$ is stationary.

This defines a **pullback** in the category of time series:

```
    Spread
   /      \
  P^A -----> Stationary
  |           |
  v           v
  P^B -----> Price
```

### Pairs Trading Implementation

```python
from statsmodels.tsa.stattools import coint
from dataclasses import dataclass

@dataclass
class PairsTrade:
    """A cointegrated pair with hedge ratio."""
    asset_a: str
    asset_b: str
    hedge_ratio: float
    zscore_entry: float = 2.0
    zscore_exit: float = 0.5

    def spread(self, prices_a: pd.Series, prices_b: pd.Series) -> pd.Series:
        """Compute the cointegration spread."""
        return prices_a - self.hedge_ratio * prices_b

    def signals(self, prices_a: pd.Series, prices_b: pd.Series) -> pd.Series:
        """Generate trading signals from spread."""
        spread = self.spread(prices_a, prices_b)
        zscore = (spread - spread.mean()) / spread.std()

        position = pd.Series(0, index=spread.index)

        for i in range(1, len(zscore)):
            if position.iloc[i-1] == 0:
                if zscore.iloc[i] > self.zscore_entry:
                    position.iloc[i] = -1  # Short spread
                elif zscore.iloc[i] < -self.zscore_entry:
                    position.iloc[i] = +1  # Long spread
            else:
                if abs(zscore.iloc[i]) < self.zscore_exit:
                    position.iloc[i] = 0  # Exit
                else:
                    position.iloc[i] = position.iloc[i-1]

        return position
```

## Machine Learning Strategies

### Neural Networks as Parameterized Functors

A neural network strategy is a **parameterized functor** $F_\theta$:

$$F_\theta: \mathbf{Features} \to \mathbf{Signal}$$

The training process finds $\theta^*$ that optimizes expected returns.

```python
import torch
import torch.nn as nn

class NeuralStrategy(nn.Module):
    """Neural network trading strategy."""

    def __init__(self, input_dim: int, hidden_dim: int = 64):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(hidden_dim, hidden_dim),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(hidden_dim, 3),  # Long, flat, short
            nn.Softmax(dim=-1)
        )

    def forward(self, features: torch.Tensor) -> torch.Tensor:
        """Map features to position probabilities."""
        return self.network(features)

    def get_signal(self, features: torch.Tensor) -> int:
        """Get discrete signal from network output."""
        probs = self.forward(features)
        return torch.argmax(probs).item() - 1  # Map {0,1,2} -> {-1,0,+1}
```

## Performance Metrics

### Sharpe Ratio as a Natural Transformation

The Sharpe ratio can be viewed as a natural transformation:

$$\text{Sharpe}: \text{Returns} \Rightarrow \text{RiskAdjusted}$$

$$\text{Sharpe}(R) = \frac{\mathbb{E}[R] - r_f}{\sigma(R)}$$

| Metric | Formula | Interpretation |
|--------|---------|----------------|
| Sharpe Ratio | $\frac{\mu - r_f}{\sigma}$ | Risk-adjusted return |
| Sortino Ratio | $\frac{\mu - r_f}{\sigma_{\text{down}}}$ | Downside risk-adjusted |
| Information Ratio | $\frac{\alpha}{\sigma_{\text{tracking}}}$ | Active management skill |
| Max Drawdown | $\max_t\left(\max_{s \leq t} P_s - P_t\right)$ | Worst peak-to-trough |

## Exercises

1. **Functor Composition**: Show that the composition of momentum and mean reversion functors can produce a mean-reversion-on-momentum strategy.

2. **Natural Transformation**: Define a natural transformation from the momentum functor to the mean reversion functor.

3. **Implementation**: Implement a market-neutral long-short strategy that maintains zero beta exposure.

---

*[← Chapter 4: Stochastic Calculus](../../part-1/mathematical-preliminaries/) | [Chapter 6: Market Microstructure →](../market-microstructure/)*
