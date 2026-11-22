import { createApp } from "vue";
import { createRouter, createWebHistory, type RouteLocation, type RouteRecordRaw } from "vue-router";
import App from "./App.vue";

import LandingPage from "./pages/LandingPage.vue";
import AboutPage from "./pages/AboutPage.vue";
import InnovatorDashboard from "./pages/InnovatorDashboard.vue";
import EvaluatorDashboard from "./pages/EvaluatorDashboard.vue";
import AiAgent from "./pages/AiAgent.vue";
import AdminLogin from "./pages/AdminLogin.vue";
import AdminSignUp from "./pages/AdminSignUp.vue";
import ForgotPassword from "./pages/ForgotPassword.vue";
import ResetPassword from "./pages/ResetPassword.vue";
import MyApplications from "./pages/MyApplications.vue";
import ReviewQueue from "./pages/ReviewQueue.vue";
import FeedbackCenter from "./pages/FeedbackCenter.vue";
import ProfileView from "./pages/ProfileView.vue";
import TeamView from "./pages/TeamView.vue";
import IdeasView from "./pages/IdeasView.vue";
import LoginPage from "./pages/LoginPage.vue";
import AdminDashboard from "./pages/AdminDashboard.vue";
import AdminEvaluators from "./pages/AdminEvaluators.vue";
import BlogPage from "./pages/BlogPage.vue";
import ArticlePage from "./pages/ArticlePage.vue";
import DeadlinesView from "./pages/DeadlinesView.vue";
import NewIdea from "./pages/NewIdea.vue";
import ApplicationView from "./pages/ApplicationView.vue";
import CloudShaderHero from "./pages/CloudShaderHero.vue";
import FaqPage from "./pages/FaqPage.vue";
import ParallaxLayersDemo from "./pages/ParallaxLayersDemo.vue";
import FolderRevealDemo from "./pages/FolderRevealDemo.vue";
import LegalPage from "./pages/LegalPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";
import "./global.css";
import { initAuth } from "./lib/auth";

const routes: RouteRecordRaw[] = [
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
    path: "/innovator-dashboard",
    name: "InnovatorDashboard",
    component: InnovatorDashboard,
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
    path: "/my-applications",
    name: "MyApplications",
    component: MyApplications,
  },
  {
    path: "/review-queue",
    name: "ReviewQueue",
    component: ReviewQueue,
  },
  {
    path: "/all-applications",
    name: "AllApplications",
    component: MyApplications,
  },
  {
    path: "/feedback-center",
    name: "FeedbackCenter",
    component: FeedbackCenter,
  },
  {
    path: "/application",
    name: "ApplicationView",
    component: ApplicationView,
  },
  {
    path: "/application/:id",
    name: "ApplicationViewWithId",
    component: ApplicationView,
  },
  {
    path: "/profile",
    name: "ProfileView",
    component: ProfileView,
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
    path: "/admin/evaluators",
    name: "AdminEvaluators",
    component: AdminEvaluators,
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
    path: "/new-idea",
    name: "NewIdea",
    component: NewIdea,
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
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPassword,
    meta: { title: "Choose a new password — CEDA Innovation Portal" },
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
  // Older URLs kept working for bookmarks and shared links.
  { path: "/dashboard-sample", redirect: "/innovator-dashboard" },
  { path: "/admin-profile", redirect: "/profile" },
  { path: "/idea-view", redirect: "/application" },
  { path: "/idea-view/:id", redirect: (to: RouteLocation) => `/application/${to.params.id}` },
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
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: "smooth", top: 80 };
    return { top: 0 };
  },
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

// Restore any saved Supabase session so pages can load real data on first paint.
void initAuth();

export default router;
