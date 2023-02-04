import Link from "next/link";
import { forwardRef } from "react";

interface NavLink {
  title: string;
  func: () => void;
}

interface ActionLink {
  title: string;
  href: string;
  accent: boolean;
}

interface NavbarProps {
  title?: string;
  links?: NavLink[];
  actions?: ActionLink[];
}

const Navbar = forwardRef<HTMLElement, NavbarProps>(({ title, links, actions }, ref) => {
  return (
    <nav className="p-4" ref={ref}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
        <Link href="/">
          <h1 className="text-2xl font-bold text-white hover:text-white/90">{title || "Project Title"}</h1>
        </Link>
        <ul className="flex gap-12 font-medium text-main-light">
          {links?.map((link) => (
            <button key={"nav_scroll_" + link.title} onClick={link.func} className="hover:text-white/60">
              {link.title}
            </button>
          ))}
        </ul>
        <div className="flex gap-6 font-medium">
          {actions?.map((action) => (
            <Link
              href={action.href}
              key={action.href + action.title}
              className={`${action.accent ? "bg-accent-light text-white hover:bg-accent-dark" : ""} rounded-full py-2 px-6 tracking-tight `}
            >
              {action.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
});
Navbar.displayName = "Navbar";

export default Navbar;
