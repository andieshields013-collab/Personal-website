"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <button
        aria-label="Toggle color theme"
        className="rounded-full border bg-background p-2 text-muted-foreground"
        disabled
      >
        <Sun className="h-4 w-4" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label="Toggle color theme"
      className="rounded-full border bg-background p-2 text-foreground transition-colors hover:bg-muted"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title="Toggle color theme"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
