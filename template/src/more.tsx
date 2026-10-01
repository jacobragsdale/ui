import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@jacobragsdale/ui/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@jacobragsdale/ui/components/ui/avatar";
import { Button } from "@jacobragsdale/ui/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@jacobragsdale/ui/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@jacobragsdale/ui/components/ui/command";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@jacobragsdale/ui/components/ui/drawer";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@jacobragsdale/ui/components/ui/empty";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@jacobragsdale/ui/components/ui/input-group";
import { Kbd } from "@jacobragsdale/ui/components/ui/kbd";
import { Popover, PopoverContent, PopoverTrigger } from "@jacobragsdale/ui/components/ui/popover";
import { Progress } from "@jacobragsdale/ui/components/ui/progress";
import { ScrollArea } from "@jacobragsdale/ui/components/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@jacobragsdale/ui/components/ui/sheet";
import { Slider } from "@jacobragsdale/ui/components/ui/slider";
import { Spinner } from "@jacobragsdale/ui/components/ui/spinner";
import { Toggle } from "@jacobragsdale/ui/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@jacobragsdale/ui/components/ui/toggle-group";
import { PowerIcon, SearchIcon } from "lucide-react";
import { useState } from "react";

import type { ReactElement } from "react";

const categories = ["Groceries", "Dining", "Rent", "Travel"] as const;
const logLines = Array.from({ length: 24 }, (_, index) => `2026-09-30T08:${String(index).padStart(2, "0")}:00 money sync finished in ${String(40 + index)} ms`);

export function ControlsCard(): ReactElement {
  const [level, setLevel] = useState(60);
  const [isOn, setIsOn] = useState(true);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Controls</CardTitle>
        <CardDescription>Sliders, toggles, progress, and data-driven widths.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Toggle aria-label="Power" pressed={isOn} onPressedChange={setIsOn}>
            <PowerIcon />
          </Toggle>
          <Slider
            aria-label="Brightness"
            value={level}
            onValueChange={(value) => {
              setLevel(typeof value === "number" ? value : (value[0] ?? level));
            }}
          />
          <span className="w-10 text-right text-sm tabular-nums">{level}%</span>
        </div>
        <ToggleGroup defaultValue={["month"]} aria-label="Period">
          <ToggleGroupItem value="week">Week</ToggleGroupItem>
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
          <ToggleGroupItem value="year">Year</ToggleGroupItem>
        </ToggleGroup>
        <Progress value={level} aria-label="Sync progress" />
        <div className="flex flex-col gap-1">
          <div className="h-2 rounded-full bg-muted">
            {/* A width that comes from data: set a CSS variable, read it with a class. */}
            <div className="h-2 w-(--fill) rounded-full bg-chart-1" style={{ "--fill": `${String(level)}%` }} />
          </div>
          <p className="text-2xs text-muted-foreground">Budget used, drawn with w-(--fill)</p>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Avatar>
            <AvatarFallback>MO</AvatarFallback>
          </Avatar>
          <Spinner />
          Syncing accounts
        </div>
      </CardContent>
    </Card>
  );
}

export function OverlaysCard(): ReactElement {
  const [category, setCategory] = useState<string>(categories[0]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Search and overlays</CardTitle>
        <CardDescription>
          Press <Kbd>/</Kbd> in an app to search.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search sites" aria-label="Search sites" />
        </InputGroup>
        <div className="flex flex-wrap gap-2">
          <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>{category}</PopoverTrigger>
            <PopoverContent>
              <Command>
                <CommandInput placeholder="Category" />
                <CommandList>
                  <CommandEmpty>No category.</CommandEmpty>
                  <CommandGroup>
                    {categories.map((name) => (
                      <CommandItem
                        key={name}
                        onSelect={() => {
                          setCategory(name);
                        }}
                      >
                        {name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Sheet>
            <SheetTrigger render={<Button variant="outline" />}>Sheet</SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>money-db</SheetTitle>
                <SheetDescription>Container details open in a sheet.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Drawer>
            <DrawerTrigger render={<Button variant="outline" />}>Drawer</DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Edit transaction</DrawerTitle>
                <DrawerDescription>Phones get a drawer from the bottom.</DrawerDescription>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="destructive" />}>Reboot</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reboot the server?</AlertDialogTitle>
                <AlertDialogDescription>Every site is down for about a minute.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive">Reboot</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="rounded-lg border">
          <ScrollArea className="h-32">
            <div className="p-3 font-mono text-2xs">
              {logLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </ScrollArea>
        </div>
        <Empty>
          <EmptyHeader>
            <EmptyTitle>No transactions</EmptyTitle>
            <EmptyDescription>Nothing matches this filter.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </CardContent>
    </Card>
  );
}
