# Agent notes

This app is built on [@jacobragsdale/ui](https://github.com/jacobragsdale/ui): its theme, shadcn/ui components, and lint rules.

- Follow the design rules in `node_modules/@jacobragsdale/ui/DESIGN.md`. Lint errors link to the same file.
- Import components from `@jacobragsdale/ui/components/ui/<name>`. If a component or variant is missing, add it to the ui repository; do not copy shadcn code into this app or restyle a component with `className`.
- After every change, run `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, and `pnpm build`, and fix every error. Do not disable a rule to pass.
