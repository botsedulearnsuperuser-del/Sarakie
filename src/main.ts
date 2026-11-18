import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

import LandingPage from "./pages/LandingPage.vue";
import DashboardSample from "./pages/DashboardSample.vue";
import AdminLogin from "./pages/AdminLogin.vue";
import AdminSignUp from "./pages/AdminSignUp.vue";
import ForgotPassword from "./pages/ForgotPassword.vue";
import LoansSheet from "./pages/LoansSheet.vue";
import Customers from "./pages/Customers.vue";
import AdminProfile from "./pages/AdminProfile.vue";
import NewLoan from "./pages/NewLoan.vue";
import LoanView from "./pages/LoanView.vue";
import IdeaView from "./pages/IdeaView.vue";
import "./global.css";

interface Route {
  path: string;
  name: string;
  component: any;
}

const routes: Route[] = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
  },
  {
    path: "/dashboard-sample",
    name: "DashboardSample",
    component: DashboardSample,
  },
  {
    path: "/loans-sheet",
    name: "LoansSheet",
    component: LoansSheet,
  },
  {
    path: "/loans",
    name: "Loans",
    component: LoansSheet,
  },
  {
    path: "/customers",
    name: "Customers",
    component: Customers,
  },
  {
    path: "/loan-view",
    name: "LoanView",
    component: LoanView,
  },
  {
    path: "/loan-view/:id",
    name: "LoanViewWithId",
    component: LoanView,
  },
  {
    path: "/idea-view",
    name: "IdeaView",
    component: IdeaView,
  },
  {
    path: "/idea-view/:id",
    name: "IdeaViewWithId",
    component: IdeaView,
  },
  {
    path: "/admin-profile",
    name: "AdminProfile",
    component: AdminProfile,
  },
  {
    path: "/new-loan",
    name: "NewLoan",
    component: NewLoan,
  },
  {
    path: "/admin-login",
    name: "AdminLogin",
    component: AdminLogin,
  },
  {
    path: "/login",
    name: "Login",
    component: AdminLogin,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: AdminSignUp,
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((toRoute, _, next) => {
  const metaTitle = toRoute?.meta?.title as string;
  const metaDesc = toRoute?.meta?.description as string;

  window.document.title = metaTitle || "CEDA Innovation Portal";
  if (metaDesc) {
    addMetaTag(metaDesc);
  }
  next();
});

const addMetaTag = (value: string) => {
  const element = document.querySelector(`meta[name='description']`);
  if (element) {
    element.setAttribute("content", value);
  }
};

createApp(App).use(router).mount("#app");

export default router;
