import { useLocation } from "@/components/utils";
import { Routes, Route } from "@/components/local";
import { General as GeneralLayout } from "@/layouts";
import PublicRoutes from "@/routes/public";
import PrivateRoutes from "@/routes/private";
import AdminRoutes from "@/routes/admin";
import LandingPage from "@/pages/landing";
import NotFoundPage from "@/pages/404";
import VerifyPage from "@/pages/user/verify";
import ForgotPage from "@/pages/user/forgot";
import ResetPage from "@/pages/user/reset";
import SigninPage from "@/pages/user/signin";
import SignupPage from "@/pages/user/signup";
import HomePage from "@/pages/user/home";
import DashboardPage from "@/pages/admin/dashboard";

function App() {
  const location = useLocation();
  return (
    <Routes location={location}>
      <Route element={<GeneralLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/forgot-password" element={<ForgotPage />} />
        <Route path="/reset-password" element={<ResetPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<PublicRoutes />}>
        <Route element={<GeneralLayout />}>
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route element={<GeneralLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>

      <Route element={<AdminRoutes />}>
        <Route element={<GeneralLayout />}>
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
