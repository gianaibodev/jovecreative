# Contributing Guidelines

## Branch Strategy

- `main`: Production-ready code only
- `feature/*`: New features (e.g., `feature/animation-hooks`)
- `refactor/*`: Code restructuring (e.g., `refactor/split-monolith`)
- `fix/*`: Bug fixes

## Commit Standards

```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`

## Code Standards

1. **File Size**: Max 300 lines per file. Split if larger.
2. **Naming**: Semantic variable names (no `temp`, `val`, `data`)
3. **Documentation**: JSDoc for all exported functions
4. **Types**: No `any` types. Strict TypeScript only.

## PR Checklist

- [ ] No logic changes (for refactoring PRs)
- [ ] Build passes (`npm run build`)
- [ ] Lint passes (`npm run lint`)
- [ ] Files < 300 lines
- [ ] JSDoc added
