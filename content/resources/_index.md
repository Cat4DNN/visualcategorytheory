+++
title = "Resources"
description = "Downloadable materials, code repositories, and supplementary resources for the Handbook of Computational Finance."
template = "resources/section.html"
+++

<div class="row g-4 mb-5">
<div class="col-md-6">
<div class="card h-100">
<div class="card-body">
<h3 class="card-title">Code Repository</h3>
<p class="card-text">All code examples from the book, organized by chapter. Includes Jupyter notebooks, Python modules, and Haskell implementations.</p>
<a href="https://github.com/sergeyoumbi/compfinance-book-code" class="btn btn-primary">View on GitHub</a>
</div>
</div>
</div>
<div class="col-md-6">
<div class="card h-100">
<div class="card-body">
<h3 class="card-title">Exercise Solutions</h3>
<p class="card-text">Detailed solutions to all exercises. Available to verified instructors and students upon request.</p>
<a href="#solutions" class="btn btn-outline-primary">Request Access</a>
</div>
</div>
</div>
</div>

---

## Downloadable Materials

### Lecture Slides

Presentation slides suitable for classroom use:

| Chapter | Topic | Format | Download |
|---------|-------|--------|----------|
| 1-2 | Mathematical Foundations | PDF | [Download](#) |
| 3-4 | Category Theory for Finance | PDF | [Download](#) |
| 5-6 | Stochastic Calculus | PDF | [Download](#) |
| 7-8 | Trading Strategies | PDF | [Download](#) |
| 9-10 | Machine Learning | PDF | [Download](#) |
| 11-12 | Risk Management | PDF | [Download](#) |

### Data Sets

Sample datasets for practicing the techniques in the book:

<div class="table-responsive">

| Dataset | Description | Size | Format |
|---------|-------------|------|--------|
| S&P 500 Historical | Daily OHLCV data 2000-2023 | 45 MB | CSV/Parquet |
| Options Chain | Sample options data with Greeks | 120 MB | Parquet |
| Order Book | L2 market data sample | 500 MB | HDF5 |
| Synthetic Series | Generated test cases | 10 MB | CSV |

</div>

<div class="alert alert-warning">
<strong>Data Usage:</strong> These datasets are for educational purposes only. Do not use for live trading decisions.
</div>

---

## Software Requirements

### Python Environment

```bash
# Create conda environment
conda create -n compfinance python=3.11
conda activate compfinance

# Install core dependencies
pip install numpy pandas scipy matplotlib
pip install torch pytorch-lightning
pip install statsmodels arch
pip install jupyter jupyterlab

# Install book-specific package
pip install compfinance-book
```

### Haskell Setup

```bash
# Using GHCup (recommended)
curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh

# Install dependencies
cabal update
cabal install --lib mtl transformers containers
```

### Docker Option

For a fully configured environment:

```bash
docker pull sergeyoumbi/compfinance-book:latest
docker run -p 8888:8888 sergeyoumbi/compfinance-book
```

---

## External Resources

### Recommended Reading

**Category Theory:**
- *Category Theory for Programmers* - Bartosz Milewski
- *Seven Sketches in Compositionality* - Brendan Fong & David Spivak

**Mathematical Finance:**
- *Stochastic Calculus for Finance II* - Steven Shreve
- *Options, Futures, and Other Derivatives* - John Hull

**Machine Learning:**
- *Deep Learning* - Goodfellow, Bengio, Courville
- *Reinforcement Learning: An Introduction* - Sutton & Barto

### Online Courses

- [MIT 18.S096: Topics in Mathematics with Applications in Finance](https://ocw.mit.edu)
- [Stanford CS229: Machine Learning](https://cs229.stanford.edu)
- [Category Theory for Scientists (MIT)](https://ocw.mit.edu)

### Research Papers

Key papers referenced in the book:

1. **"Deep Hedging"** - Buehler et al. (2019)
2. **"Categorical Probability Theory"** - Fritz (2020)
3. **"Neural SDEs"** - Tzen & Raginsky (2019)
4. **"Coherent Risk Measures"** - Artzner et al. (1999)

---

## Community

### Discussion Forum

Join the community discussion:

- **Discord**: [Join Server](#)
- **GitHub Discussions**: [View Discussions](https://github.com/sergeyoumbi/compfinance-book-code/discussions)

### Errata

Found an error in the book? Report it here:

- [Submit Errata](https://github.com/sergeyoumbi/compfinance-book-code/issues/new?labels=errata)

Current errata: [View List](https://github.com/sergeyoumbi/compfinance-book-code/wiki/Errata)

---

<div class="text-center mt-5">
<h3>Stay Updated</h3>
<p>Subscribe to receive updates about new chapters, code releases, and errata.</p>
<form class="row g-3 justify-content-center">
<div class="col-auto">
<input type="email" class="form-control" placeholder="your@email.com">
</div>
<div class="col-auto">
<button type="submit" class="btn btn-primary">Subscribe</button>
</div>
</form>
</div>
