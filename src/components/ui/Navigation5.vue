<template>
  <div :class="$style.wrapper">
    <div :class="$style.container">
      <div :class="$style.pill">
        <div :class="$style.left">
          <button
            :class="$style.iconButton"
            type="button"
            aria-label="Toggle menu"
            :aria-expanded="menuOpen"
            @click="menuOpen = !menuOpen"
          >
            <svg v-if="!menuOpen" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="m6 6 12 12M18 6 6 18"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>
          </button>

          <router-link to="/" :class="$style.logoLink" aria-label="CEDA" @click="closeMenu">
            <img :class="$style.logo" src="/ceda-logo.webp" alt="CEDA" />
            <span :class="$style.logoText">CEDA</span>
          </router-link>
        </div>

        <nav :class="$style.center">
          <router-link
            v-for="link in links"
            :key="link.label"
            :to="link.to"
            :class="$style.navLink"
            @click="closeMenu"
          >
            {{ link.label }}
          </router-link>
        </nav>

        <div :class="$style.right">
          <button :class="$style.iconButton" type="button" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8" />
              <path
                d="M16.5 16.5 21 21"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>
          </button>

          <button :class="$style.iconButton" type="button" aria-label="Account">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8" />
              <path
                d="M4.5 20c1-3.5 4-5.5 7.5-5.5s6.5 2 7.5 5.5"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>
          </button>

          <router-link :class="$style.cta" to="/signin" @click="closeMenu">
            Get started
          </router-link>
        </div>
      </div>

      <div v-if="menuOpen" :class="$style.mobileMenu">
        <router-link
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          :class="$style.mobileLink"
          @click="closeMenu"
        >
          {{ link.label }}
        </router-link>
        <router-link :class="$style.mobileCta" to="/signin" @click="closeMenu">
          Get started
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const menuOpen = ref(false);
  const closeMenu = () => (menuOpen.value = false);

  const links = [
    { label: "Home", to: "/" },
    { label: "About", to: "#about" },
    { label: "Innovation Hub", to: "#innovation" },
    { label: "How It Works", to: "#how-it-works" },
    { label: "Blog", to: "/blog" },
    { label: "Support", to: "#support" },
  ];
</script>

<style module>
  .wrapper {
    position: relative;
    width: 100%;
    padding: 40px 0;
    font-family: var(--font-inter);
  }

  .container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
    box-sizing: border-box;
  }

  .pill {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    height: 64px;
    width: 100%;
    padding: 0 12px 0 16px;
    border: 1px solid #e8e2d8;
    border-radius: 999px;
    background-color: #ffffff;
    box-shadow: 0 4px 18px rgba(1, 53, 37, 0.06);
    box-sizing: border-box;
  }

  .left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .iconButton {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: #6b7f77;
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease;
  }

  .iconButton:hover {
    background-color: #f3efe6;
    color: var(--color-darkslategray-600);
  }

  .iconButton svg {
    width: 20px;
    height: 20px;
  }

  .logoLink {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: var(--color-darkslategray-600);
  }

  .logo {
    height: 30px;
    width: auto;
    object-fit: contain;
  }

  .logoText {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.4px;
  }

  .center {
    display: none;
    align-items: center;
    gap: 4px;
  }

  .navLink {
    padding: 8px 16px;
    border-radius: 999px;
    color: #6b7f77;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.15s ease, background-color 0.15s ease;
  }

  .navLink:hover {
    color: var(--color-darkslategray-600);
    background-color: #f3efe6;
  }

  .right {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .cta {
    display: none;
    align-items: center;
    justify-content: center;
    margin-left: 4px;
    padding: 10px 20px;
    border-radius: 999px;
    background-color: var(--color-darkslategray-600);
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition: background-color 0.15s ease;
  }

  .cta:hover {
    background-color: #0b5641;
  }

  .mobileMenu {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 12px;
    padding: 12px;
    border: 1px solid #e8e2d8;
    border-radius: 24px;
    background-color: #ffffff;
    box-shadow: 0 12px 30px rgba(1, 53, 37, 0.08);
  }

  .mobileLink {
    padding: 12px 16px;
    border-radius: 16px;
    color: var(--color-darkslategray-600);
    font-size: 15px;
    font-weight: 500;
    text-decoration: none;
  }

  .mobileLink:hover {
    background-color: #f3efe6;
  }

  .mobileCta {
    margin-top: 8px;
    padding: 12px 16px;
    border-radius: 16px;
    background-color: var(--color-darkslategray-600);
    color: #ffffff;
    font-size: 15px;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
  }

  @media screen and (min-width: 1024px) {
    .iconButton:first-child {
      display: none;
    }
    .center {
      display: flex;
    }
    .cta {
      display: inline-flex;
    }
    .mobileMenu {
      display: none;
    }
  }
</style>
