"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
export default function ToggleTheme() {
  const [htmlElement, setHtmlElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = document.getElementsByTagName("html")[0];
    setHtmlElement(element as any);
  }, []);

  const handleToggle = () => {
    if (!htmlElement) return; // Ensure htmlElement is not null

    if (htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark");
      htmlElement.classList.add("light");
      toast("Theme changed to light mode");
    } else {
      htmlElement.classList.remove("light");
      htmlElement.classList.add("dark");
      toast("Theme changed to dark mode");
    }
  };

  return (
    <Button size="icon" onClick={handleToggle}>
      {htmlElement?.classList.contains("dark") ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
