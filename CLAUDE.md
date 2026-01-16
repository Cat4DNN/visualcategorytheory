# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AdiDoks is a Zola theme for building modern documentation websites. It's a port of the Hugo theme Doks for Zola.

## Commands

```bash
# Development server (live reload at http://127.0.0.1:1111/)
zola serve

# Build for production
zola build

# Check for errors without building
zola check
```

**Requirement:** Zola ≥ 0.15.0 must be installed

## Architecture

### Template Hierarchy

All templates extend `templates/base.html`, which imports macros for modular components:

```
base.html
├── index.html (homepage)
├── page.html → docs/page.html, blog/page.html
├── section.html → docs/section.html, blog/section.html
└── authors/list.html, authors/single.html
```

**Macros** (`templates/macros/`) provide reusable components:
- `head.html` - SEO, meta tags, Open Graph, JSON-LD
- `header.html` - Navigation with active section highlighting
- `docs-sidebar.html`, `docs-toc.html`, `docs-navigation.html` - Documentation layout
- `math.html` - KaTeX/MathJax integration

### Content Structure

Content uses TOML frontmatter (`+++` delimited) with `extra` for custom fields:

- `content/_index.md` - Homepage with `[[extra.menu.main]]` and `[[extra.list]]` items
- `content/docs/` - Documentation (nested sections with `_index.md` per folder)
- `content/blog/` - Blog posts with author taxonomy
- `content/authors/` - Author profiles

### Styling

Sass files compile automatically from `sass/`:

```
main.scss
├── bootstrap/scss/ (Bootstrap framework)
├── common/ (variables, fonts, global, dark mode)
├── components/ (code, alerts, buttons, search, etc.)
├── layouts/ (header, footer, pages, posts, sidebar)
└── _custom.scss (user customizations - empty by default)
```

**Dark mode:** Toggle handled via `sass/common/_dark.scss`

### JavaScript

- `static/index.js` - Search functionality using FlexSearch library
- Search index built automatically when `build_search_index = true` in config

## Configuration

`config.toml` key settings:
- `build_search_index` - Enable/disable search
- `compile_sass` - Auto-compile Sass files
- `[extra]` section - Theme customization (SEO, math, menus, footer)
- `[languages.fi]` - Multi-language support example

## Conventions

- Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages
- Follow [GitHub flow](https://guides.github.com/introduction/flow/) for contributions
