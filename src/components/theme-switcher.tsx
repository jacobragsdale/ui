import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#components/ui/select";
import { isThemeId, setTheme, themeIds, themes, useTheme } from "#lib/theme";

import type { ReactElement } from "react";

const items = themeIds.map((id) => ({ value: id, label: themes[id].label }));

export function ThemeSwitcher(): ReactElement {
  const theme = useTheme();
  return (
    <Select
      items={items}
      value={theme}
      onValueChange={(value) => {
        if (isThemeId(value)) {
          setTheme(value);
        }
      }}
    >
      <SelectTrigger aria-label="Theme">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
