// import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import ModeToggle from "./mode-toggle";
import { Badge } from "./ui/badge";

const Navbar = () => {
  return (
    <nav className="h-16 border-b bg-background sticky z-50 top-0 left-0 w-full">
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-12">
          <p className="text-xl font-bold tracking-tight flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              S
            </span>
            SmartWealth Assistant
          </p>

          {/* Desktop Menu */}
          {/* <NavMenu className="hidden md:block" /> */}
        </div>

        <div className="flex items-center gap-3">
          <Badge variant={"outline"}>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Secure Server-Side API Connect
          </Badge>
          <ModeToggle />

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
