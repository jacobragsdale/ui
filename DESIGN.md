# Design rules

These rules apply to every app built on `@jacobragsdale/ui`. The shared ESLint config enforces the ones marked **lint**, and every lint error links here.

## Components own their look

- Import components from `@jacobragsdale/ui/components/ui/<name>` (shadcn/ui on Base UI, `base-nova` style) and `@jacobragsdale/ui/components/theme-switcher`.
- On a shared component, `className` may only place it: margin, width, flex and grid placement. `Card`, and any part whose name ends in `Content`, `Header`, or `Footer`, also accept padding and gap. **lint** (`shadcn/no-restyle`)
- Change appearance with the component's props instead: `Button` takes `variant` (`default`, `secondary`, `outline`, `ghost`, `destructive`, `link`) and `size` (`default`, `xs`, `sm`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`); `Badge` and `Alert` take `variant`.
- Pass `className` as a static string so it can be checked. **lint** (`shadcn/require-static-classes`)
- If no variant fits, add one to the component in this repository and release it. Do not restyle it in the app.

## Colour

Use only these tokens, as Tailwind utilities (`bg-card`, `text-muted-foreground`, `border-border`). Palette classes such as `bg-pink-500`, hex values, and undeclared names fail. **lint** (`shadcn/no-raw-colors`)

| Token                                | Use for                                                      |
| ------------------------------------ | ------------------------------------------------------------ |
| `background` / `foreground`          | The page and its body text.                                  |
| `card` / `card-foreground`           | Raised panels.                                               |
| `popover` / `popover-foreground`     | Menus, selects, tooltips, toasts.                            |
| `primary` / `primary-foreground`     | The one main action and selected state.                      |
| `secondary` / `secondary-foreground` | Secondary actions.                                           |
| `muted` / `muted-foreground`         | Quiet fills; secondary text such as descriptions and labels. |
| `accent` / `accent-foreground`       | Hover and focus fills in lists and menus.                    |
| `destructive`                        | Errors and irreversible actions.                             |
| `success`, `warning`                 | Status text and icons.                                       |
| `border`, `input`, `ring`            | Dividers, control outlines, focus rings.                     |
| `chart-1` … `chart-5`                | Chart series, in that order.                                 |

- Every text token clears 5.5:1 contrast on `background`, `card`, and `muted` in every theme.
- Show status with an icon and a label as well as the colour, never the colour alone.
- Assign chart colours to series in order, starting at `chart-1`, and keep each series on its colour when filters change. Fold a sixth series into "Other" instead of inventing a colour. The five colours are checked for colour-vision deficiency in each theme.

## Scales

- Use the theme's spacing, radius (`rounded-sm` … `rounded-4xl`), and type scales. Arbitrary values such as `p-[13px]` fail. **lint** (`shadcn/no-arbitrary-values`)
- Style with classes. `style={{ }}` and `<style>` fail. **lint** (`shadcn/no-inline-styles`)
- Classes must exist in Tailwind or the theme; typos such as `rounded-huge` fail. **lint** (`shadcn/no-unknown-classes`)
- Fonts: `font-sans` (Geist, the default), `font-heading`, and `font-mono` (JetBrains Mono) for code and tabular figures.

## Themes

Themes change colour tokens and radius only, so a page that follows these rules looks right in every theme. The themes are **Neon Void** (the default) and **Grok Night**, both dark, matching the terminal palettes in [jacobragsdale/theme](https://github.com/jacobragsdale/theme).
