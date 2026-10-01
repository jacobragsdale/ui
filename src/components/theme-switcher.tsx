import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "#components/ui/select";
import { isThemeId, setTheme, themeIds, themes, useTheme } from "#lib/theme";

import type { ReactElement } from "react";

const items = themeIds.map((id) => ({ value: id, label: themes[id].label }));
const groups = [
  { label: "Dark", ids: themeIds.filter((id) => themes[id].appearance === "dark") },
  { label: "Light", ids: themeIds.filter((id) => themes[id].appearance === "light") }
];

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
        {groups.map((group) => (
          <SelectGroup key={group.label}>
            <SelectLabel>{group.label}</SelectLabel>
            {group.ids.map((id) => (
              <SelectItem key={id} value={id}>
                {themes[id].label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
