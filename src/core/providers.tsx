import { TooltipProvider } from "@/components/ui/tooltip";
import { type ReactNode } from "react";
import { Toaster } from "sonner";
import ToggleTheme from "@/components/theme/ToggleTheme";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      {children}
      <div className="fixed bottom-6 right-6 z-50">
        <ToggleTheme />
      </div>
      <Toaster invert position="top-right" />
    </TooltipProvider>
  );
}
