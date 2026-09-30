import { ThemeSwitcher } from "@jacobragsdale/ui/components/theme-switcher";
import { Alert, AlertDescription, AlertTitle } from "@jacobragsdale/ui/components/ui/alert";
import { Badge } from "@jacobragsdale/ui/components/ui/badge";
import { Button } from "@jacobragsdale/ui/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@jacobragsdale/ui/components/ui/card";
import { Checkbox } from "@jacobragsdale/ui/components/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@jacobragsdale/ui/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@jacobragsdale/ui/components/ui/dropdown-menu";
import { Input } from "@jacobragsdale/ui/components/ui/input";
import { Label } from "@jacobragsdale/ui/components/ui/label";
import { Separator } from "@jacobragsdale/ui/components/ui/separator";
import { Skeleton } from "@jacobragsdale/ui/components/ui/skeleton";
import { Toaster } from "@jacobragsdale/ui/components/ui/sonner";
import { Switch } from "@jacobragsdale/ui/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@jacobragsdale/ui/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@jacobragsdale/ui/components/ui/tabs";
import { Textarea } from "@jacobragsdale/ui/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@jacobragsdale/ui/components/ui/tooltip";
import { toast } from "@jacobragsdale/ui/lib/toast";

import type { ReactElement } from "react";

const services = [
  { name: "money", status: "healthy", latency: "42 ms" },
  { name: "assistant", status: "degraded", latency: "310 ms" },
  { name: "lights", status: "down", latency: "timeout" }
] as const;

const statusVariant = { healthy: "secondary", degraded: "outline", down: "destructive" } as const;

const swatches = [
  { name: "primary", className: "bg-primary" },
  { name: "secondary", className: "bg-secondary" },
  { name: "muted", className: "bg-muted" },
  { name: "destructive", className: "bg-destructive" },
  { name: "success", className: "bg-success" },
  { name: "warning", className: "bg-warning" },
  { name: "chart-1", className: "bg-chart-1" },
  { name: "chart-2", className: "bg-chart-2" },
  { name: "chart-3", className: "bg-chart-3" },
  { name: "chart-4", className: "bg-chart-4" },
  { name: "chart-5", className: "bg-chart-5" }
] as const;

function ButtonsCard(): ReactElement {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions</CardTitle>
        <CardDescription>Buttons and badges come in variants, not custom classes.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
        <Separator />
        <div className="flex flex-wrap gap-2">
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>Open dialog</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete snapshot?</DialogTitle>
                <DialogDescription>This removes the snapshot from every device.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
                <DialogClose render={<Button variant="destructive" />}>Delete</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>Menu</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Tooltip>
            <TooltipTrigger render={<Button variant="ghost" />}>Hover me</TooltipTrigger>
            <TooltipContent>Tooltips sit on the popover tokens.</TooltipContent>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
}

function FormCard(): ReactElement {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Form</CardTitle>
        <CardDescription>Controls share one height, border, and focus ring.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Ada Lovelace" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" placeholder="Anything else?" />
        </div>
        <Label>
          <Checkbox defaultChecked />
          Email me updates
        </Label>
        <Label>
          <Switch />
          Compact mode
        </Label>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            toast.success("Saved");
          }}
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}

function StatusCard(): ReactElement {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Services</CardTitle>
        <CardDescription>Tables, badges, and a loading row.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Latency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.name}>
                <TableCell>{service.name}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[service.status]}>{service.status}</Badge>
                </TableCell>
                <TableCell>{service.latency}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-12" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function TokensCard(): ReactElement {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tokens</CardTitle>
        <CardDescription>The colours a page may use. Anything else fails lint.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="swatches">
          <TabsList>
            <TabsTrigger value="swatches">Swatches</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>
          <TabsContent value="swatches" className="grid grid-cols-3 gap-3 pt-2">
            {swatches.map((swatch) => (
              <div key={swatch.name} className="flex items-center gap-2 text-sm">
                <span className={`size-5 rounded-md ${swatch.className}`} />
                {swatch.name}
              </div>
            ))}
          </TabsContent>
          <TabsContent value="alerts" className="flex flex-col gap-3 pt-2">
            <Alert>
              <AlertTitle>Backup finished</AlertTitle>
              <AlertDescription>All 14 volumes were copied.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>Backup failed</AlertTitle>
              <AlertDescription>The NAS did not respond.</AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export function App(): ReactElement {
  return (
    <TooltipProvider>
      <main className="mx-auto flex max-w-5xl flex-col gap-6 p-6">
        <header className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="font-heading text-2xl font-semibold">Template</h1>
            <p className="text-sm text-muted-foreground">Every shared component and token, in the current theme.</p>
          </div>
          <ThemeSwitcher />
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          <ButtonsCard />
          <FormCard />
          <StatusCard />
          <TokensCard />
        </div>
      </main>
      <Toaster />
    </TooltipProvider>
  );
}
