import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { createUser } from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-4 py-3 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:bg-[var(--color-surface)]";

const actionButtonClassName =
  "w-full rounded-xl py-3 text-[11px] tracking-[0.2em] font-text";

const blankForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNum: "",
  email: "",
  username: "",
  password: "",
  address: "",
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(blankForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!/^\d+$/.test(form.age.trim())) return "Age must be a number.";
    if (!/^\d{11}$/.test(form.contactNum.trim()))
      return "Contact number must be exactly 11 digits.";
    if (form.password.length < 8)
      return "Password must be at least 8 characters.";
    if (/\s/.test(form.username)) return "Username must not contain spaces.";
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    try {
      await createUser({
        ...form,
        email: form.email.trim().toLowerCase(),
        username: form.username.trim().toLowerCase(),
        type: "editor",
        isActive: true,
      });
      navigate("/auth/signin", {
        state: { message: "Account created. Please sign in." },
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Sign up failed. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-(--color-text) sm:text-4xl font-head">
        Sign Up
      </h1>
      <p className="mt-3 text-sm leading-6 text-(--color-muted) font-text">
        Create an account to receive order updates and save your bouquet
        preferences.
      </p>

      {error ? (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 font-text">
          {error}
        </p>
      ) : null}

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="text-sm font-medium text-(--color-text) font-text"
            >
              First Name
            </label>
            <input
              id="first-name"
              name="firstName"
              type="text"
              placeholder="First name"
              autoComplete="given-name"
              className={inputClasses}
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="text-sm font-medium text-(--color-text) font-text"
            >
              Last Name
            </label>
            <input
              id="last-name"
              name="lastName"
              type="text"
              placeholder="Last name"
              autoComplete="family-name"
              className={inputClasses}
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="age"
              className="text-sm font-medium text-(--color-text) font-text"
            >
              Age
            </label>
            <input
              id="age"
              name="age"
              type="text"
              inputMode="numeric"
              placeholder="Age"
              className={inputClasses}
              value={form.age}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="text-sm font-medium text-(--color-text) font-text"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className={inputClasses}
              value={form.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="contactNum"
            className="text-sm font-medium text-(--color-text) font-text"
          >
            Contact Number
          </label>
          <input
            id="contactNum"
            name="contactNum"
            type="tel"
            placeholder="11-digit phone number"
            className={inputClasses}
            value={form.contactNum}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="signup-email"
            className="text-sm font-medium text-(--color-text) font-text"
          >
            Email
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            placeholder="student@email.com"
            autoComplete="email"
            className={inputClasses}
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="username"
            className="text-sm font-medium text-(--color-text) font-text"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="username"
            autoComplete="username"
            className={inputClasses}
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="text-sm font-medium text-(--color-text) font-text"
          >
            Password
          </label>
          <input
            id="signup-password"
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            className={inputClasses}
            value={form.password}
            onChange={handleChange}
            required
          />
          <p className="mt-2 text-xs leading-5 text-(--color-muted) font-text">
            Use a secure password with letters, numbers, and symbols.
          </p>
        </div>

        <div>
          <label
            htmlFor="address"
            className="text-sm font-medium text-(--color-text) font-text"
          >
            Address
          </label>
          <textarea
            id="address"
            name="address"
            rows={3}
            placeholder="Address"
            className={inputClasses}
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className={actionButtonClassName}
          disabled={submitting}
        >
          {submitting ? "Creating..." : "Create Account"}
        </Button>
      </form>

      <div className="mt-8 border-t border-(--color-border) pt-6 text-sm text-(--color-muted) font-text">
        Already have an account?{" "}
        <Link
          to="/auth/signin"
          className="font-semibold text-(--color-primary) transition hover:text-(--color-primary-strong)"
        >
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;
