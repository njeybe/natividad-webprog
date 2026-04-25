import { NavLink } from "react-router-dom";
import logo from "../assets/images/kraftine_logo.png";
import Button from "./Button";

const links = [
  { label: "Home", to: "/" },
  { label: "Our Story", to: "/about" },
  { label: "Collection", to: "/articles" },
];

const navLinkClassName = ({ isActive }) =>
  [
    "rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition",
    isActive
      ? "border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-surface)]"
      : "border-transparent text-[var(--color-muted)] hover:border-[var(--color-border)] hover:bg-[var(--color-primary)] hover:text-[var(--color-surface)]",
  ].join(" ");

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-(--color-border) bg-(--color-surface) backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Kraftin'e logo"
            className="h-9 w-9 rounded-full border-2 border-(--color-border) bg-(--color-surface) object-contain"
          />
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex font-text">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button to="/dashboard" variant="primary">
            Dashboard
          </Button>
          <Button to="/auth/signin" variant="primary">
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
