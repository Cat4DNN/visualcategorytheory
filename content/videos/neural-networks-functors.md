+++
title = "Neural Networks as Parameterized Functors"
description = "Understanding deep learning through the lens of category theory."
date = 2024-02-01T10:00:00+00:00
draft = false
weight = 20
template = "videos/page.html"

[extra]
youtube_id = "dQw4w9WgXcQ"
duration = "55 min"
level = "Intermediate"
chapter = 8
thumbnail = "/images/videos/neural-functors-thumb.jpg"
resources = [
  { title = "Lecture Slides (PDF)", url = "/resources/slides/neural-functors.pdf", type = "PDF" },
  { title = "PyTorch Notebook", url = "https://github.com/example/notebooks/neural-functors.ipynb", type = "Code" }
]
+++

## Video Overview

This video explores the categorical interpretation of neural networks. We'll see how layers are morphisms, networks are compositions, and training is optimization in a structured space.

## Topics Covered

### Neural Layers as Morphisms
- Linear layers as linear maps
- Activation functions as natural transformations
- The category **Para** of parameterized morphisms

### Backpropagation Categorically
- Automatic differentiation as a functor
- The reverse derivative category
- Efficient gradient computation

### Trading Strategy Networks
- Designing neural architectures for finance
- Feature engineering as preprocessing functors
- End-to-end learning pipelines

## Code Walkthrough

We'll implement a complete neural trading strategy:

```python
import torch
import torch.nn as nn

class TradingNetwork(nn.Module):
    """A neural trading strategy as a parameterized functor."""

    def __init__(self, feature_dim: int, hidden_dim: int = 128):
        super().__init__()
        self.encoder = nn.Sequential(
            nn.Linear(feature_dim, hidden_dim),
            nn.LayerNorm(hidden_dim),
            nn.ReLU(),
        )
        self.position_head = nn.Sequential(
            nn.Linear(hidden_dim, 3),
            nn.Softmax(dim=-1)
        )

    def forward(self, features: torch.Tensor) -> torch.Tensor:
        encoded = self.encoder(features)
        return self.position_head(encoded)
```

## Mathematical Details

The composition of neural layers follows the functor laws:

$$F(g \circ f) = F(g) \circ F(f)$$

This ensures that gradient computation is correct and efficient.

## Prerequisites

- Familiarity with neural networks and PyTorch
- Understanding of basic category theory (from Video 1)
- Chapter 8 of the handbook
