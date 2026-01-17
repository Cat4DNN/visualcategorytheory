+++
title = "Recursion Schemes"
description = "A comprehensive guide to all major recursion schemes in functional programming."
template = "docs/section.html"
sort_by = "weight"
weight = 1
draft = false
+++

Welcome to the complete guide to recursion schemes. This compendium covers every major recursion scheme from the foundational catamorphism to the advanced chronomorphism.

## What Are Recursion Schemes?

Recursion schemes are abstractions that capture common patterns of recursion over data structures. Instead of writing explicit recursive functions, we separate the recursion pattern from the specific computation, leading to more modular, reusable, and provably correct code.

## The Zoo of Schemes

| Scheme | Type | Description |
|--------|------|-------------|
| **Catamorphism** | Fold | Consume a structure bottom-up |
| **Anamorphism** | Unfold | Produce a structure top-down |
| **Hylomorphism** | Refold | Unfold then fold (fused) |
| **Paramorphism** | Fold+ | Fold with access to original substructure |
| **Apomorphism** | Unfold+ | Unfold with early termination |
| **Histomorphism** | Fold++ | Fold with access to computation history |
| **Futumorphism** | Unfold++ | Unfold producing multiple layers |
| **Chronomorphism** | Refold++ | Histomorphism + Futumorphism |
| **Zygomorphism** | Fold | Two mutually dependent folds |
| **Mutumorphism** | Fold | Mutual recursion generalization |
| **Dynamorphism** | Refold | Hylomorphism with memoization |

## How to Read This Guide

We recommend starting with the **Foundations** section to understand F-algebras and fixed points. Then progress through the basic schemes before tackling the advanced material.
