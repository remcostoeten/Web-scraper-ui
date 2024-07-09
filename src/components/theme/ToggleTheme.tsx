"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
export default function ToggleTheme() {
  const [htmlElement, setHtmlElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = document.getElementsByTagName("html")[0];
    setHtmlElement(element as any);
  }, []);

  const handleToggle = () => {
    if (!htmlElement) return; // Ensure htmlElement is not null

    const isDarkMode = htmlElement.classList.contains("dark");
    const newMode = isDarkMode ? "light" : "dark";

    htmlElement.classList.remove(isDarkMode ? "dark" : "light");
    htmlElement.classList.add(newMode, "transition-all");

    const message = `Theme changed to ${newMode} mode`;
    toast(message);
  };
  return (
    <Button size="icon" onClick={handleToggle}>
      {htmlElement?.classList.contains("dark") ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
