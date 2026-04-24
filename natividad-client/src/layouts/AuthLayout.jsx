import { Outlet, useLocation } from "react-router-dom";
import signinImage from "../assets/images/kraftine_logo.png";
import signupImage from "../assets/images/kraftine_logo.png";

const AuthLayout = () => {
  const location = useLocation();

  const image = location.pathname.includes("/auth/signup")
    ? signupImage
    : signinImage;
  return (
    <section className="min-h-screen bg-(--color-bg) text-(--color-text)">
      <div className="min-h-screen w-full grid lg:grid-cols-[1fr_0.95fr]">
        <img
          src={image}
          alt="Auth"
          className="min-h-screen w-full bg-(--color-surface-alt) object-contain p-8"
        />

        <main className="flex items-center bg-(--color-surface) px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;
