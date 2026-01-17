+++
title = "Real-World Applications"
description = "Practical applications of recursion schemes in compilers, interpreters, and data processing."
date = 2024-01-18T00:00:00+00:00
draft = false
weight = 20
template = "docs/page.html"

[extra]
toc = true
top = false
+++

## Compiler Construction

### Abstract Syntax Trees

Compilers are the canonical use case for recursion schemes:

```haskell
{-# LANGUAGE TemplateHaskell, DeriveFunctor #-}

data Expr
  = Var String
  | Lit Int
  | App Expr Expr
  | Lam String Expr
  | Let String Expr Expr
  | If Expr Expr Expr

makeBaseFunctor ''Expr
```

### Constant Folding

```haskell
constantFold :: Expr -> Expr
constantFold = cata $ \case
  -- Fold arithmetic
  AppF (AppF (VarF "+") (LitF a)) (LitF b) -> Lit (a + b)
  AppF (AppF (VarF "*") (LitF a)) (LitF b) -> Lit (a * b)

  -- Fold conditionals
  IfF (LitF 0) _ e -> e        -- if false
  IfF (LitF _) t _ -> t        -- if true (non-zero)

  -- Preserve rest
  e -> embed e
```

### Dead Code Elimination

Using paramorphism to access the original structure:

```haskell
type Used = Set String

deadCodeElim :: Expr -> Expr
deadCodeElim expr = fst (para alg expr)
  where
    alg :: ExprF (Expr, (Expr, Used)) -> (Expr, Used)
    alg (VarF x) = (Var x, Set.singleton x)
    alg (LetF x (defExpr, (_, defUsed)) (bodyExpr, (_, bodyUsed)))
      | x `Set.member` bodyUsed =
          (Let x defExpr bodyExpr, Set.delete x bodyUsed <> defUsed)
      | otherwise =
          (bodyExpr, bodyUsed)  -- Drop unused binding!
    alg other = -- reconstruct with union of used vars
```

### Type Inference

Constraint generation as a catamorphism:

```haskell
type Constraints = [(Type, Type)]
type Infer = StateT Int (Writer Constraints)

infer :: Expr -> Infer Type
infer = cata $ \case
  LitF _ -> pure TInt
  VarF x -> lookupVar x
  AppF mf mx -> do
    tf <- mf
    tx <- mx
    tr <- freshVar
    tell [(tf, TArr tx tr)]
    pure tr
  LamF x body -> do
    tx <- freshVar
    withVar x tx $ do
      tb <- body
      pure (TArr tx tb)
```

## Interpreters

### Tree-Walking Interpreter

```haskell
type Env = Map String Value

eval :: Env -> Expr -> Value
eval env = cata (evalAlg env)

evalAlg :: Env -> ExprF Value -> Value
evalAlg env = \case
  LitF n        -> VInt n
  VarF x        -> env ! x
  LamF x body   -> VClosure x body env
  AppF (VClosure x body env') arg ->
    eval (Map.insert x arg env') body
```

### Bytecode Compilation

Generating stack-based instructions:

```haskell
data Instr = Push Int | Load String | Add | Call | Ret

compile :: Expr -> [Instr]
compile = cata $ \case
  LitF n   -> [Push n]
  VarF x   -> [Load x]
  AppF f x -> x ++ f ++ [Call]
  AddF a b -> a ++ b ++ [Add]
```

## Data Processing

### JSON Transformation

```haskell
data JSON
  = JNull | JBool Bool | JNum Double
  | JStr String | JArr [JSON] | JObj [(String, JSON)]

makeBaseFunctor ''JSON

-- Remove nulls from objects
stripNulls :: JSON -> JSON
stripNulls = cata $ \case
  JObjF pairs -> JObj [(k, v) | (k, v) <- pairs, v /= JNull]
  other -> embed other

-- Transform all strings
mapStrings :: (String -> String) -> JSON -> JSON
mapStrings f = cata $ \case
  JStrF s -> JStr (f s)
  other -> embed other
```

### XML Processing

```haskell
data XML = Text String | Element String [(String, String)] [XML]

makeBaseFunctor ''XML

-- Extract all text content
extractText :: XML -> String
extractText = cata $ \case
  TextF s -> s
  ElementF _ _ children -> concat children

-- Find elements by tag
findByTag :: String -> XML -> [XML]
findByTag tag = para $ \case
  TextF _ -> []
  ElementF t _ children
    | t == tag  -> [embed (ElementF t [] (map fst children))]
    | otherwise -> concatMap snd children
```

## Domain-Specific Languages

### Calculator DSL

```haskell
data CalcF r
  = NumF Double
  | AddF r r | SubF r r | MulF r r | DivF r r
  | SinF r | CosF r | ExpF r | LogF r
  deriving Functor

type Calc = Fix CalcF

-- Evaluate
evaluate :: Calc -> Double
evaluate = cata $ \case
  NumF n   -> n
  AddF a b -> a + b
  SubF a b -> a - b
  MulF a b -> a * b
  DivF a b -> a / b
  SinF x   -> sin x
  CosF x   -> cos x
  ExpF x   -> exp x
  LogF x   -> log x

-- Symbolic differentiation
differentiate :: String -> Calc -> Calc
differentiate var = cata $ \case
  NumF _ -> num 0
  VarF v | v == var  -> num 1
         | otherwise -> num 0
  AddF da db -> add da db
  MulF a b   -> add (mul da b) (mul a db)  -- Product rule
  -- etc.
```

### Query DSL

```haskell
data QueryF r
  = TableF String
  | SelectF [String] r
  | WhereF Predicate r
  | JoinF r r JoinCond
  | UnionF r r
  deriving Functor

-- Optimize queries
optimize :: Fix QueryF -> Fix QueryF
optimize = cata $ \case
  -- Push selections down
  SelectF cols (Fix (WhereF p q)) ->
    Fix (WhereF p (Fix (SelectF cols q)))

  -- Merge adjacent selections
  SelectF cols1 (Fix (SelectF cols2 q)) ->
    Fix (SelectF (cols1 `intersect` cols2) q)

  other -> Fix other

-- Generate SQL
toSQL :: Fix QueryF -> String
toSQL = cata $ \case
  TableF t -> t
  SelectF cols q -> "SELECT " ++ intercalate ", " cols ++ " FROM (" ++ q ++ ")"
  WhereF p q -> q ++ " WHERE " ++ predToSQL p
  JoinF a b cond -> "(" ++ a ++ ") JOIN (" ++ b ++ ") ON " ++ condToSQL cond
```

## File System Operations

### Directory Trees

```haskell
data FSEntry = File String Int | Dir String [FSEntry]

makeBaseFunctor ''FSEntry

-- Total size
totalSize :: FSEntry -> Int
totalSize = cata $ \case
  FileF _ size -> size
  DirF _ children -> sum children

-- Find large files
findLarge :: Int -> FSEntry -> [String]
findLarge threshold = para $ \case
  FileF name size
    | size > threshold -> [name]
    | otherwise        -> []
  DirF name children -> concatMap snd children

-- Generate from disk (anamorphism)
readFS :: FilePath -> IO FSEntry
readFS = ana coalg
  where
    coalg path = do
      isDir <- doesDirectoryExist path
      if isDir
        then DirF (takeFileName path) <$> listDirectory path
        else FileF (takeFileName path) <$> getFileSize path
```

## Game Development

### Scene Graphs

```haskell
data SceneF r = NodeF Transform [r] | LeafF Mesh
  deriving Functor

type Scene = Fix SceneF

-- Compute world transforms
worldTransforms :: Scene -> Cofree SceneF Transform
worldTransforms = histo $ \case
  LeafF mesh -> identity :< LeafF mesh
  NodeF local children ->
    let worldT = -- combine with parent
    in worldT :< NodeF local (map (applyTransform worldT) children)

-- Frustum culling with early termination
cull :: Frustum -> Scene -> Scene
cull frustum = apo $ \scene ->
  if not (intersects frustum (boundingBox scene))
    then Right (Fix (LeafF emptyMesh))  -- Cull entire subtree
    else Left (project scene)           -- Continue descent
```

## When NOT to Use Recursion Schemes

Despite their power, sometimes simpler approaches work better:

1. **Simple single-pass folds** - Direct pattern matching may be clearer
2. **Mutable algorithms** - Use ST monad or mutable structures
3. **Performance-critical inner loops** - Benchmark both approaches
4. **Non-recursive data** - Schemes add unnecessary overhead
5. **Team unfamiliarity** - Readability trumps elegance

## Key Takeaways

1. **Compilers are the sweet spot** - AST manipulation is what schemes were made for
2. **Think in layers** - Separate "what to compute" from "how to recurse"
3. **Compose small algebras** - Build complex transformations from simple parts
4. **Use the right scheme** - Match the recursion pattern to your problem
5. **Profile when in doubt** - Fusion usually helps, but measure

