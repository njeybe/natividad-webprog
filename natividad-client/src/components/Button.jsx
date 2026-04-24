import { Link } from "react-router-dom";

const variantClasses = {
  primary:
    "bg-[var(--color-primary)] text-[var(--color-surface)] hover:bg-[var(--color-primary-strong)]",
  secondary:
    "bg-[var(--color-surface)] text-[var(--color-primary)] hover:bg-[var(--color-surface-alt)]",
};

const Button = ({
  children,
  to,
  type = "button",
  variant = "secondary",
  className = "",
}) => {
  const classes = [
    "inline-flex items-center justify-center rounded-full border-2 border-[var(--color-border)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition",
    variantClasses[variant] ?? variantClasses.secondary,
    className,
  ]
    .join(" ")
    .trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
};

export default Button;
