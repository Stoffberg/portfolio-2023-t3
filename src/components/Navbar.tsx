import Link from "next/link";
import { type NextRouter, withRouter } from "next/router";

interface NavLink {
  title: string;
  href: string;
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
  router: NextRouter;
}

const Navbar = ({ title, links, actions }: NavbarProps) => {
  return (
    <nav className="p-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
        <Link href="/">
          <h1 className="text-2xl font-bold text-white">{title || "Project Title"}</h1>
        </Link>
        <ul className="flex gap-12 font-medium text-main-light">
          {links?.map((link) => (
            <Link href={link.href} key={link.href + link.title}>
              {link.title}
            </Link>
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
};

export default withRouter(Navbar);
