import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import ArticlePage from "./pages/LandingPages/ArticlePage";
import HomePage from "./pages/LandingPages/HomePage";
import AboutPage from "./pages/LandingPages/AboutPage";
import ArticleListPage from "./pages/LandingPages/ArticleListPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/AuthPages/SignUpPage";
import SignInPage from "./pages/AuthPages/SignInPage";
import AuthLayout from "./layouts/AuthLayout";
import DashLayout from "./layouts/DashLayout";
import DashboardPage from "./pages/DashboardPages/DashboardPage";
import ReportsPage from "./pages/DashboardPages/ReportsPage";
import UsersPage from "./pages/DashboardPages/UsersPage";
import DashArticleListPage from "./pages/DashboardPages/DashArticleListPage";
import ProtectedRoute from "./components/ProtectedRoute";

const routes = [
  {
    path: "/",
    element: <Navigate to="/auth/signin" replace />,
  },
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "about", element: <AboutPage /> },
      { path: "articles", element: <ArticleListPage /> },
      { path: "articles/:name", element: <ArticlePage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "signin", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
    ],
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute allowedTypes={["admin", "editor"]} />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <DashLayout />,
        children: [
          { path: "", element: <DashboardPage /> },
          { path: "reports", element: <ReportsPage /> },
          { path: "articles", element: <DashArticleListPage /> },
          {
            path: "users",
            element: <ProtectedRoute allowedTypes={["admin"]} />,
            children: [{ path: "", element: <UsersPage /> }],
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default App;
