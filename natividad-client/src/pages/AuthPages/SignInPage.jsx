import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { loginUser } from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-4 py-3 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:bg-[var(--color-surface)]";

const actionButtonClassName =
  "w-full rounded-xl py-3 text-[11px] tracking-[0.2em] font-text";

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const { data } = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("type", data.type);
      localStorage.setItem("firstName", data.firstName);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Sign in failed. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-(--color-text) sm:text-4xl font-head">
        Sign In
      </h1>
      <p className="mt-3 text-sm leading-6 text-(--color-muted) font-text">
        Welcome back to Kraftin'e. Enter your credentials to manage your bouquet
        requests.
      </p>

      {error ? (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 font-text">
          {error}
        </p>
      ) : null}

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="signin-email"
            className="text-sm font-medium text-(--color-text) font-text"
          >
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="student@email.com"
            autoComplete="email"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="signin-password"
            className="text-sm font-medium text-(--color-text) font-text"
          >
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            className={inputClasses}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="mt-2 text-xs leading-5 text-(--color-muted) font-text">
            It must be a combination of minimum 8 letters, numbers, and symbols.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm font-text">
          <label className="flex items-center gap-2 text-(--color-muted)">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-(--color-border) accent-(--color-primary)"
            />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            className="font-medium text-(--color-muted) transition hover:text-(--color-primary)"
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          className={actionButtonClassName}
          disabled={submitting}
        >
          {submitting ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-8 border-t border-(--color-border) pt-6 text-sm text-(--color-muted) font-text">
        Don&apos;t have an account?{" "}
        <Link
          to="/auth/signup"
          className="font-semibold text-(--color-primary) transition hover:text-(--color-primary-strong)"
        >
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignInPage;
