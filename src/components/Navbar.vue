<template>
  <header :class="$style.navbar">
    <div :class="$style.inner">
      <router-link to="/" :class="$style.logoLink">
        <img
          :class="$style.logo"
          src="/ceda-logo.webp"
          alt="CEDA — Finance, Develop, Sustain"
        />
      </router-link>

      <nav :class="$style.links">
        <router-link
          :class="$style.link"
          :exact-active-class="$style.activeLink"
          to="/"
        >
          Home
        </router-link>
        <a :class="$style.link" href="#about">About</a>
        <a :class="$style.link" href="#innovation">Innovation Hub</a>
        <a :class="$style.link" href="#how-it-works">How It Works</a>
        <router-link
          :class="$style.link"
          :exact-active-class="$style.activeLink"
          to="/blog"
        >
          Blog
        </router-link>
        <a :class="$style.link" href="#support">Support</a>
      </nav>

      <div :class="$style.actions">
        <button :class="$style.search" type="button" aria-label="Search">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="currentColor"
              stroke-width="1.8"
            />
            <path
              d="M16.5 16.5 21 21"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>
        </button>

        <span :class="$style.divider" aria-hidden="true" />

        <router-link :class="$style.login" to="/login">Login</router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style module>
.navbar {
  width: 100%;
  background-color: #fff;
  padding: 18px clamp(24px, 4vw, 56px);
  box-sizing: border-box;
  font-family: var(--font-inter);
}

.inner {
  width: 100%;
  display: flex;
  align-items: center;
  gap: clamp(16px, 2vw, 32px);
}

.logoLink {
  display: inline-flex;
  flex-shrink: 0;
}

.logo {
  width: clamp(112px, 9vw, 148px);
  height: auto;
  object-fit: contain;
  display: block;
}

.links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(18px, 2.4vw, 42px);
  flex: 1;
  min-width: 0;
}

.link {
  color: #1d1d1d;
  font-size: clamp(14px, 1.05vw, 17px);
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 0.2s;
}

.link:hover {
  opacity: 0.65;
}

.activeLink {
  background-color: #941d11;
  color: #fff;
  border-radius: 999px;
  padding: 11px clamp(20px, 1.8vw, 30px);
  box-shadow: 0 8px 16px rgba(148, 29, 17, 0.3);
}

.activeLink:hover {
  opacity: 1;
}

.actions {
  display: flex;
  align-items: center;
  gap: clamp(12px, 1.4vw, 22px);
  flex-shrink: 0;
}

.search {
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  color: #1d1d1d;
  cursor: pointer;
}

.search svg {
  width: 22px;
  height: 22px;
}

.divider {
  width: 1px;
  height: 30px;
  background-color: #d5d5d5;
}

.login {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: clamp(42px, 3.2vw, 50px);
  padding: 0 clamp(24px, 2vw, 34px);
  border-radius: 999px;
  background-color: #1d1d1d;
  color: #fff;
  font-size: clamp(14px, 1.05vw, 17px);
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color 0.2s;
}

.login:hover {
  background-color: #000;
}

@media screen and (max-width: 1080px) {
  .links {
    gap: 18px;
  }
}

@media screen and (max-width: 900px) {
  .inner {
    flex-wrap: wrap;
    row-gap: 14px;
  }
  .links {
    order: 3;
    width: 100%;
    flex: 0 0 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 14px;
  }
}

@media screen and (max-width: 520px) {
  .link:nth-child(4),
  .link:nth-child(5) {
    display: none;
  }
  .divider {
    display: none;
  }
}
</style>
