import Link from "next/link";
import { forwardRef } from "react";

interface NavLink {
  title: string;
  func: () => void;
}

interface NavbarProps {
  title?: string;
  links?: NavLink[];
}

const Navbar = forwardRef<HTMLElement, NavbarProps>(({ title, links }, ref) => {
  return (
    <nav className="p-4" ref={ref}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
        <Link href="/">
          <h1 className="text-2xl font-bold text-white hover:text-white/90">{title || "Project Title"}</h1>
        </Link>
        <ul className="hidden gap-12 font-medium text-main-light sm:flex">
          {links?.map((link) => (
            <li key={"nav_scroll_" + link.title} onClick={link.func} className="cursor-pointer hover:text-white/60">
              {link.title}
            </li>
          ))}
        </ul>
        <a
          href="mailto:dirk@stoffberg.dev"
          className="hidden whitespace-nowrap rounded-full bg-accent-light px-6 py-2 tracking-tight text-white hover:bg-accent-dark sm:block"
        >
          Contact Me
        </a>
      </div>
    </nav>
  );
});
Navbar.displayName = "Navbar";

export default Navbar;
