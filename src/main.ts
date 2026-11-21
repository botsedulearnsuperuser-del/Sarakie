import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

import LandingPage from "./pages/LandingPage.vue";
import AboutPage from "./pages/AboutPage.vue";
import DashboardSample from "./pages/DashboardSample.vue";
import EvaluatorDashboard from "./pages/EvaluatorDashboard.vue";
import AiAgent from "./pages/AiAgent.vue";
import AdminLogin from "./pages/AdminLogin.vue";
import AdminSignUp from "./pages/AdminSignUp.vue";
import ForgotPassword from "./pages/ForgotPassword.vue";
import LoansSheet from "./pages/LoansSheet.vue";
import ReviewQueue from "./pages/ReviewQueue.vue";
import Customers from "./pages/Customers.vue";
import AdminProfile from "./pages/AdminProfile.vue";
import TeamView from "./pages/TeamView.vue";
import IdeasView from "./pages/IdeasView.vue";
import LoginPage from "./pages/LoginPage.vue";
import AdminDashboard from "./pages/AdminDashboard.vue";
import BlogPage from "./pages/BlogPage.vue";
import ArticlePage from "./pages/ArticlePage.vue";
import DeadlinesView from "./pages/DeadlinesView.vue";
import NewLoan from "./pages/NewLoan.vue";
import LoanView from "./pages/LoanView.vue";
import IdeaView from "./pages/IdeaView.vue";
import CloudShaderHero from "./pages/CloudShaderHero.vue";
import FaqPage from "./pages/FaqPage.vue";
import ParallaxLayersDemo from "./pages/ParallaxLayersDemo.vue";
import FolderRevealDemo from "./pages/FolderRevealDemo.vue";
import LegalPage from "./pages/LegalPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";
import "./global.css";

interface Route {
  path: string;
  name: string;
  component: any;
  meta?: Record<string, unknown>;
}

const routes: Route[] = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
  },
  {
    path: "/about",
    name: "AboutPage",
    component: AboutPage,
    meta: { title: "About CEDA — CEDA Innovation Portal" },
  },
  {
    path: "/dashboard-sample",
    name: "DashboardSample",
    component: DashboardSample,
  },
  {
    path: "/evaluator-dashboard",
    name: "EvaluatorDashboard",
    component: EvaluatorDashboard,
  },
  {
    path: "/ai-agent",
    name: "AiAgent",
    component: AiAgent,
  },
  {
    path: "/loans-sheet",
    name: "LoansSheet",
    component: LoansSheet,
  },
  {
    path: "/review-queue",
    name: "ReviewQueue",
    component: ReviewQueue,
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
    path: "/team",
    name: "TeamView",
    component: TeamView,
  },
  {
    path: "/ideas",
    name: "IdeasView",
    component: IdeasView,
  },
  {
    path: "/signin",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/admin-dashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
  },
  {
    path: "/blog",
    name: "BlogPage",
    component: BlogPage,
  },
  {
    path: "/blog/:slug",
    name: "ArticlePage",
    component: ArticlePage,
  },
  {
    path: "/deadlines",
    name: "DeadlinesView",
    component: DeadlinesView,
  },
  {
    path: "/cloud-shader",
    name: "CloudShaderHero",
    component: CloudShaderHero,
  },
  {
    path: "/parallax-layers",
    name: "ParallaxLayersDemo",
    component: ParallaxLayersDemo,
  },
  {
    path: "/folder-reveal",
    name: "FolderRevealDemo",
    component: FolderRevealDemo,
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
  {
    path: "/faq",
    name: "FaqPage",
    component: FaqPage,
  },
  {
    path: "/privacy",
    name: "PrivacyPolicy",
    component: LegalPage,
    meta: { legal: "privacy" },
  },
  {
    path: "/terms",
    name: "TermsConditions",
    component: LegalPage,
    meta: { legal: "terms" },
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFoundPage,
    meta: { title: "Page not found — CEDA Innovation Portal" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFoundCatchAll",
    component: NotFoundPage,
    meta: { title: "Page not found — CEDA Innovation Portal" },
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
