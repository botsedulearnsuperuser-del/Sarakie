<template>
  <header :class="$style.navbar">
    <div :class="$style.inner">
      <img
        :class="$style.logoIcon"
        loading="lazy"
        alt="CEDA"
        src="/ceda-logo-white-strong.webp"
      />
      <nav :class="$style.navigationLinks">
        <a :class="$style.link" href="#loans">How it works</a>
        <a :class="$style.link" href="#how-it-works">Who it's for</a>
        <router-link :class="$style.link" to="/login">Login</router-link>
      </nav>
      <button :class="$style.actionButton" type="button" @click="goToDashboard">
        <span>Submit your idea</span>
        <img alt="" src="/bitcoin-icons-arrow-right-filled.svg" />
      </button>
      <button :class="$style.menuToggle" type="button" aria-label="Open menu">
        <span />
        <span />
        <span />
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
  background-color: var(--color-maroon);
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
  width: auto;
  max-width: 100%;
  height: 56px;
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
  background-color: #97231e;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  color: #ffffff;
  transition: background-color 0.2s ease;
  font-size: var(--fs-18);
  font-weight: 600;
  font-family: var(--font-inter);
  cursor: pointer;
  flex-shrink: 0;
}
.actionButton:hover {
  background-color: #7d1b17;
}
.actionButton img {
  width: 24px;
  height: 24px;
  filter: brightness(0) invert(1);
}
.menuToggle {
  display: none;
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
@media screen and (max-width: 600px) {
  .navbar {
    padding: 16px 22px;
  }
  .inner {
    flex-wrap: nowrap;
    gap: 12px;
  }
  .navigationLinks,
  .actionButton {
    display: none;
  }
  .logoIcon {
    height: 42px;
  }
  .menuToggle {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 40px;
    height: 40px;
    margin-left: auto;
    padding: 8px;
    background: transparent;
    border: 0;
    cursor: pointer;
  }
  .menuToggle span {
    display: block;
    width: 26px;
    height: 3px;
    border-radius: 2px;
    background-color: #ffffff;
  }
}
@media screen and (max-width: 450px) {
  .logoIcon {
    height: 38px;
  }
}
</style>
