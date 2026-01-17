+++
title = "Formula Gallery"
description = "Mathematical definitions and type signatures for recursion schemes."
template = "gallery/section.html"

[extra]
categories = ["Foundations", "Basic Schemes", "Extended Schemes", "History-Aware", "Advanced"]

[[extra.gallery_items]]
title = "F-Algebra"
description = "An algebra for functor F with carrier A"
katex = "\\alpha : F\\,A \\to A"
category = "Foundations"

[[extra.gallery_items]]
title = "F-Coalgebra"
description = "A coalgebra for functor F with carrier A"
katex = "\\psi : A \\to F\\,A"
category = "Foundations"

[[extra.gallery_items]]
title = "Fixed Point (Fix)"
description = "The recursive fixed point type"
katex = "\\text{Fix } F = F\\,(\\text{Fix } F)"
category = "Foundations"

[[extra.gallery_items]]
title = "Initial Algebra (μF)"
description = "The least fixed point of functor F"
katex = "\\mu F \\cong F\\,(\\mu F)"
category = "Foundations"

[[extra.gallery_items]]
title = "Terminal Coalgebra (νF)"
description = "The greatest fixed point of functor F"
katex = "\\nu F \\cong F\\,(\\nu F)"
category = "Foundations"

[[extra.gallery_items]]
title = "Catamorphism"
description = "The unique fold from initial algebra"
katex = "\\llbracket \\phi \\rrbracket : \\mu F \\to A"
category = "Basic Schemes"

[[extra.gallery_items]]
title = "Cata Definition"
description = "Catamorphism unfolds its definition"
katex = "\\text{cata} \\; \\phi = \\phi \\circ F\\,(\\text{cata} \\; \\phi) \\circ \\text{out}"
category = "Basic Schemes"

[[extra.gallery_items]]
title = "Anamorphism"
description = "The unique unfold to terminal coalgebra"
katex = "[(\\psi)] : A \\to \\nu F"
category = "Basic Schemes"

[[extra.gallery_items]]
title = "Ana Definition"
description = "Anamorphism unfolds its definition"
katex = "\\text{ana} \\; \\psi = \\text{in} \\circ F\\,(\\text{ana} \\; \\psi) \\circ \\psi"
category = "Basic Schemes"

[[extra.gallery_items]]
title = "Hylomorphism"
description = "Fusion of unfold followed by fold"
katex = "\\text{hylo} : (F\\,b \\to b) \\to (a \\to F\\,a) \\to a \\to b"
category = "Basic Schemes"

[[extra.gallery_items]]
title = "Hylo Fusion"
description = "Hylomorphism fuses ana and cata"
katex = "\\text{hylo} \\; \\phi \\; \\psi = \\text{cata} \\; \\phi \\circ \\text{ana} \\; \\psi"
category = "Basic Schemes"

[[extra.gallery_items]]
title = "Paramorphism"
description = "Fold with access to original substructure"
katex = "\\text{para} : (F\\,(\\mu F, a) \\to a) \\to \\mu F \\to a"
category = "Extended Schemes"

[[extra.gallery_items]]
title = "Para Definition"
description = "Paramorphism passes both result and structure"
katex = "\\text{para} \\; \\phi = \\phi \\circ F\\,\\langle id, \\text{para} \\; \\phi \\rangle \\circ \\text{out}"
category = "Extended Schemes"

[[extra.gallery_items]]
title = "Apomorphism"
description = "Unfold with early termination"
katex = "\\text{apo} : (a \\to F\\,(\\nu F + a)) \\to a \\to \\nu F"
category = "Extended Schemes"

[[extra.gallery_items]]
title = "Histomorphism"
description = "Fold with access to computation history"
katex = "\\text{histo} : (F\\,(\\text{Cofree } F\\, a) \\to a) \\to \\mu F \\to a"
category = "History-Aware"

[[extra.gallery_items]]
title = "Cofree Comonad"
description = "The carrier of histomorphism's history"
katex = "\\text{Cofree } F\\, A = A \\times F\\,(\\text{Cofree } F\\, A)"
category = "History-Aware"

[[extra.gallery_items]]
title = "Futumorphism"
description = "Unfold generating multiple layers"
katex = "\\text{futu} : (a \\to F\\,(\\text{Free } F\\, a)) \\to a \\to \\nu F"
category = "History-Aware"

[[extra.gallery_items]]
title = "Free Monad"
description = "The carrier of futumorphism's future"
katex = "\\text{Free } F\\, A = A + F\\,(\\text{Free } F\\, A)"
category = "History-Aware"

[[extra.gallery_items]]
title = "Chronomorphism"
description = "History + future: the time-traveling scheme"
katex = "\\text{chrono} : (F\\,(\\text{Cofree } F\\, b) \\to b) \\to (a \\to F\\,(\\text{Free } F\\, a)) \\to a \\to b"
category = "History-Aware"

[[extra.gallery_items]]
title = "Zygomorphism"
description = "Two mutually dependent folds"
katex = "\\text{zygo} : (F\\,b \\to b) \\to (F\\,(b, a) \\to a) \\to \\mu F \\to a"
category = "Advanced"

[[extra.gallery_items]]
title = "Mutumorphism"
description = "Full mutual recursion between two folds"
katex = "\\text{mutu} : (F\\,(a, b) \\to a) \\to (F\\,(a, b) \\to b) \\to \\mu F \\to (a, b)"
category = "Advanced"

[[extra.gallery_items]]
title = "Dynamorphism"
description = "Hylomorphism with memoization"
katex = "\\text{dyna} : (F\\,(\\text{Cofree } F\\, b) \\to b) \\to (a \\to F\\,a) \\to a \\to b"
category = "Advanced"

[[extra.gallery_items]]
title = "Prepromorphism"
description = "Catamorphism with preprocessing"
katex = "\\text{prepro} : (\\forall b.\\, F\\,b \\to F\\,b) \\to (F\\,a \\to a) \\to \\mu F \\to a"
category = "Advanced"

+++

Explore the mathematical type signatures and definitions that underpin recursion schemes. Each formula captures a unique recursion pattern.

<div class="alert alert-info mt-4">
<strong>Notation Guide:</strong> $\mu F$ = initial algebra (finite structures), $\nu F$ = terminal coalgebra (potentially infinite). Brackets $\llbracket - \rrbracket$ denote catamorphisms ("banana brackets"), $[(-)]}$ denote anamorphisms ("lens brackets").
</div>

