<template>
  <header :class="$style.navbar">
    <div :class="$style.inner">
      <img
        :class="$style.logoIcon"
        loading="lazy"
        alt="Sarakie Cash Loan"
        src="/LOGO@2x.png"
      />
      <nav :class="$style.navigationLinks">
        <a :class="$style.link" href="#loans">Our Loans</a>
        <a :class="$style.link" href="#how-it-works">How it Works</a>
        <router-link :class="$style.link" to="/admin-login">Login to My Account</router-link>
      </nav>
      <button :class="$style.actionButton" type="button" @click="goToDashboard">
        <span>New Application</span>
        <img alt="" src="/bitcoin-icons-arrow-right-filled.svg" />
      </button>
    </div>
  </header>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const goToDashboard = () => router.push({ name: "DashboardSample" });
</script>
<style module>
.navbar {
  width: 100%;
  background-color: var(--color-darkslategray-600);
  padding: 22px clamp(40px, 5vw, 72px) 22px clamp(120px, 14vw, 200px);
  box-sizing: border-box;
}
.inner {
  width: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}
.logoIcon {
  width: 220px;
  max-width: 100%;
  height: auto;
  object-fit: contain;
}
.navigationLinks {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 28px;
  flex: 1;
  min-width: 200px;
}
.link {
  color: var(--color-white);
  font-size: var(--fs-18);
  font-family: var(--font-inter);
  text-decoration: none;
  white-space: nowrap;
}
.link:hover {
  opacity: 0.85;
}
.actionButton {
  height: 47px;
  border: none;
  border-radius: var(--br-12);
  background-color: var(--color-goldenrod-300);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  color: var(--color-darkslategray-600);
  font-size: var(--fs-18);
  font-weight: 600;
  font-family: var(--font-inter);
  cursor: pointer;
  flex-shrink: 0;
}
.actionButton img {
  width: 24px;
  height: 24px;
}
@media screen and (max-width: 900px) {
  .navbar {
    padding: 16px 20px 16px 100px;
  }
  .navigationLinks {
    order: 3;
    width: 100%;
    justify-content: flex-start;
    gap: 16px;
    flex-wrap: wrap;
  }
}
@media screen and (max-width: 450px) {
  .link:last-child {
    display: none;
  }
  .logoIcon {
    width: 160px;
  }
}
</style>
