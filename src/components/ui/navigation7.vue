<template>
  <header ref="rootRef" :class="$style.navRoot">
    <div :class="$style.shell">
      <div :class="$style.anchor">
        <div :class="$style.pill">
          <div :class="$style.pillLeft">
            <button
              :class="$style.iconButton"
              type="button"
              aria-label="Toggle menu"
              aria-controls="landing-mega-menu"
              :aria-expanded="menuOpen"
              @click="menuOpen = !menuOpen"
            >
              <svg
                v-if="!menuOpen"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
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

            <router-link
              to="/"
              :class="$style.logoLink"
              aria-label="CEDA — Finance, Develop, Sustain"
              @click="closeMenu"
            >
              <img
                :class="$style.logo"
                src="/ceda-logo.webp"
                alt="CEDA — Finance, Develop, Sustain"
              />
            </router-link>
          </div>

          <div :class="$style.pillRight">
            <button
              :class="$style.iconButton"
              type="button"
              aria-label="Search"
            >
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

            <router-link
              :class="$style.navTextLink"
              to="/blog"
              @click="closeMenu"
            >
              Blog
            </router-link>
            <router-link
              :class="$style.navTextLink"
              to="/ideas"
              @click="closeMenu"
            >
              Ideas
            </router-link>
            <router-link
              :class="$style.navTextLink"
              to="/team"
              @click="closeMenu"
            >
              Team
            </router-link>
            <button
              :class="$style.resourcesButton"
              type="button"
              aria-label="Resources"
              aria-controls="landing-mega-menu"
              :aria-expanded="menuOpen"
              @click="menuOpen = !menuOpen"
            >
              Resources
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="m6 9 6 6 6-6"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <router-link
              :class="$style.login"
              to="/admin-login"
              @click="closeMenu"
            >
              Login
            </router-link>
          </div>
        </div>

        <div
          v-if="menuOpen"
          id="landing-mega-menu"
          :class="$style.menu"
        >
          <div :class="$style.menuGrid">
            <div :class="$style.columnIntro">
              <div :class="$style.columnIcon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect
                    x="5"
                    y="5"
                    width="14"
                    height="14"
                    rx="3"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
                  <path
                    d="M9 9h6v6H9z"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
                </svg>
              </div>
              <h4 :class="$style.columnTitle">Innovation Hub</h4>
              <p :class="$style.columnText">
                Turning bold ideas into impactful solutions for Botswana.
              </p>
              <div :class="$style.pillLinks">
                <router-link
                  :class="$style.pillLink"
                  to="/new-idea"
                  @click="closeMenu"
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 3 3 8l9 5 9-5-9-5Z"
                      stroke="currentColor"
                      stroke-width="1.7"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3 12l9 5 9-5M3 16l9 5 9-5"
                      stroke="currentColor"
                      stroke-width="1.7"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Submit idea
                </router-link>
                <router-link
                  :class="$style.pillLink"
                  :to="{ path: '/', hash: '#loans' }"
                  @click="closeMenu"
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="m6 3 0 18M18 3v18M6 8h12M6 16h12"
                      stroke="currentColor"
                      stroke-width="1.7"
                      stroke-linecap="round"
                    />
                  </svg>
                  Explore loans
                </router-link>
                <router-link
                  :class="$style.pillLink"
                  :to="{ path: '/', hash: '#how-it-works' }"
                  @click="closeMenu"
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      stroke-width="1.7"
                    />
                    <path
                      d="M12 7v5l3 2"
                      stroke="currentColor"
                      stroke-width="1.7"
                      stroke-linecap="round"
                    />
                  </svg>
                  How it works
                </router-link>
              </div>
            </div>

            <div :class="$style.column">
              <h4 :class="$style.columnLabel">Explore</h4>
              <router-link
                :class="$style.menuLink"
                to="/"
                @click="closeMenu"
              >
                Home
              </router-link>
              <router-link
                :class="$style.menuLink"
                to="/about"
                @click="closeMenu"
              >
                About
              </router-link>
              <router-link
                :class="$style.menuLink"
                :to="{ path: '/', hash: '#loans' }"
                @click="closeMenu"
              >
                Innovation Hub
              </router-link>
              <router-link
                :class="$style.menuLink"
                :to="{ path: '/', hash: '#how-it-works' }"
                @click="closeMenu"
              >
                How It Works
              </router-link>
              <router-link
                :class="$style.menuLink"
                :to="{ path: '/', hash: '#contact' }"
                @click="closeMenu"
              >
                Support
              </router-link>
            </div>

            <div :class="$style.column">
              <h4 :class="$style.columnLabel">Resources</h4>
              <router-link
                :class="$style.menuLink"
                to="/faq"
                @click="closeMenu"
              >
                FAQ
              </router-link>
              <router-link
                :class="$style.menuLink"
                to="/terms"
                @click="closeMenu"
              >
                Terms &amp; Conditions
              </router-link>
              <router-link
                :class="$style.menuLink"
                to="/privacy"
                @click="closeMenu"
              >
                Privacy Policy
              </router-link>
              <router-link
                :class="$style.menuLink"
                :to="{ path: '/', hash: '#contact' }"
                @click="closeMenu"
              >
                Contact us
              </router-link>
            </div>

            <div :class="$style.columnFeatured">
              <h4 :class="$style.columnLabel">Featured</h4>
              <router-link
                :class="$style.featureCard"
                to="/new-idea"
                @click="closeMenu"
              >
                <span :class="$style.featureBadge">Innovation Hub</span>
                <span :class="$style.featureTitle">
                  Ready to submit your idea?
                </span>
                <span :class="$style.featureText">
                  Start an application and track it from review to funding.
                </span>
                <span :class="$style.featureCta">
                  Start submission
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M7 17 17 7M9 7h8v8"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </router-link>
            </div>
          </div>

          <div :class="$style.mobileCta">
            <router-link
              :class="$style.mobileCtaButton"
              to="/new-idea"
              @click="closeMenu"
            >
              Get started
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref } from "vue"

  const menuOpen = ref(false)
  const rootRef = ref<HTMLElement | null>(null)

  function closeMenu() {
    menuOpen.value = false
  }

  function onDocumentPointerDown(event: PointerEvent) {
    if (!menuOpen.value) return
    const root = rootRef.value
    const target = event.target as Node | null
    if (root && target && !root.contains(target)) {
      closeMenu()
    }
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") closeMenu()
  }

  onMounted(() => {
    document.addEventListener("pointerdown", onDocumentPointerDown)
    document.addEventListener("keydown", onKeydown)
  })

  onBeforeUnmount(() => {
    document.removeEventListener("pointerdown", onDocumentPointerDown)
    document.removeEventListener("keydown", onKeydown)
  })
</script>

<style module>
  .navRoot {
    width: 100%;
    position: relative;
    z-index: 100;
    padding: 24px 0;
    box-sizing: border-box;
    font-family: var(--font-inter);
  }
  .shell {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
  }
  .anchor {
    position: relative;
    width: 100%;
    max-width: 896px;
  }
  .pill {
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 0 16px 0 14px;
    box-sizing: border-box;
    border-radius: 999px;
    border: 1px solid #e5e5e5;
    background-color: #ffffff;
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1);
  }
  .pillLeft,
  .pillRight {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }
  .iconButton {
    width: 36px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    border-radius: 12px;
    background: transparent;
    color: #404040;
    cursor: pointer;
    transition:
      background-color 0.18s ease,
      color 0.18s ease;
    flex-shrink: 0;
  }
  .iconButton:hover {
    background-color: #f5f5f5;
    color: #013525;
  }
  .iconButton svg {
    width: 20px;
    height: 20px;
    display: block;
  }
  .logoLink {
    display: inline-flex;
    align-items: center;
    min-width: 0;
  }
  .logo {
    height: 34px;
    width: auto;
    max-width: 150px;
    object-fit: contain;
    display: block;
  }
  .login {
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 24px;
    border-radius: 999px;
    background-color: #013525;
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    white-space: nowrap;
    transition:
      background-color 0.18s ease,
      transform 0.15s ease;
    flex-shrink: 0;
  }
  .login:hover {
    background-color: #0b4433;
  }
  .login:active {
    transform: translateY(1px);
  }

  .navTextLink {
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 14px;
    border-radius: 999px;
    color: #404040;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    white-space: nowrap;
    transition:
      background-color 0.18s ease,
      color 0.18s ease;
    flex-shrink: 0;
  }

  .navTextLink:hover {
    background-color: #f5f5f5;
    color: #013525;
  }

  .resourcesButton {
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 0 14px;
    border: none;
    border-radius: 999px;
    background: transparent;
    color: #404040;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    transition:
      background-color 0.18s ease,
      color 0.18s ease;
    flex-shrink: 0;
  }

  .resourcesButton:hover {
    background-color: #f5f5f5;
    color: #013525;
  }

  .resourcesButton svg {
    width: 16px;
    height: 16px;
    transition: transform 0.18s ease;
  }

  .resourcesButton[aria-expanded="true"] svg {
    transform: rotate(180deg);
  }

  .menu {
    position: absolute;
    top: calc(100% + 20px);
    left: 50%;
    width: min(1100px, calc(100vw - 48px));
    max-height: 82dvh;
    overflow-y: auto;
    overscroll-behavior: contain;
    border-radius: 40px;
    border: 1px solid #e5e5e5;
    background-color: #ffffff;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    z-index: 60;
    animation: menuIn 180ms ease-out both;
  }
  @keyframes menuIn {
    from {
      opacity: 0;
      transform: translate(-50%, -10px) scale(0.985);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0) scale(1);
    }
  }
  .menuGrid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    padding: 40px;
    box-sizing: border-box;
  }
  .columnIntro {
    display: flex;
    flex-direction: column;
    padding-right: 32px;
    box-sizing: border-box;
  }
  .columnIcon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background-color: #f5f5f5;
    color: #013525;
    margin-bottom: 12px;
  }
  .columnIcon svg {
    width: 20px;
    height: 20px;
  }
  .columnTitle {
    margin: 0 0 4px;
    font-size: 14px;
    font-weight: 600;
    color: #171717;
    font-family: inherit;
  }
  .columnText {
    margin: 0 0 12px;
    font-size: 14px;
    line-height: 1.4;
    color: #737373;
    font-family: inherit;
    letter-spacing: -0.01em;
  }
  .pillLinks {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .pillLink {
    height: 28px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0 12px;
    border-radius: 999px;
    border: 1px solid #e5e5e5;
    background-color: #ffffff;
    color: #404040;
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
    white-space: nowrap;
    transition:
      background-color 0.18s ease,
      border-color 0.18s ease,
      color 0.18s ease;
  }
  .pillLink svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }
  .pillLink:hover {
    border-color: #d4d4d4;
    background-color: #f5f5f5;
    color: #013525;
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0 0 0 32px;
    border-left: 1px solid #f5f5f5;
    box-sizing: border-box;
  }
  .columnLabel {
    margin: 0 0 4px;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #a3a3a3;
    font-family: inherit;
  }
  .menuLink {
    width: fit-content;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.4;
    letter-spacing: -0.01em;
    color: #737373;
    text-decoration: none;
    transition: color 0.18s ease;
  }
  .menuLink:hover {
    color: #171717;
  }

  .columnFeatured {
    display: flex;
    flex-direction: column;
    padding: 0 0 0 32px;
    border-left: 1px solid #f5f5f5;
    box-sizing: border-box;
  }
  .featureCard {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    min-height: 160px;
    padding: 24px;
    box-sizing: border-box;
    border-radius: 16px;
    border: 1px solid rgba(238, 194, 75, 0.65);
    background:
      radial-gradient(
        circle at 100% 0%,
        rgba(238, 194, 75, 0.22),
        transparent 60%
      ),
      #f9f6ef;
    text-decoration: none;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }
  .featureCard:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(1, 53, 37, 0.12);
  }
  .featureBadge {
    width: fit-content;
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    border-radius: 999px;
    border: 1px solid #eec24b;
    background-color: #ffffff;
    color: #7a5300;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.02em;
    margin-bottom: 12px;
  }
  .featureTitle {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.35;
    color: #013525;
  }
  .featureText {
    display: block;
    font-size: 13px;
    line-height: 1.45;
    color: #525252;
  }
  .featureCta {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-top: 16px;
    font-size: 13px;
    font-weight: 600;
    color: #013525;
  }
  .featureCta svg {
    width: 16px;
    height: 16px;
    transition: transform 0.18s ease;
  }
  .featureCard:hover .featureCta svg {
    transform: translate(2px, -2px);
  }
  .mobileCta {
    display: none;
  }

  @media screen and (max-width: 1023px) {
    .menuGrid {
      grid-template-columns: 1fr;
      padding: 24px;
    }
    .columnIntro {
      padding: 0 0 24px;
    }
    .column,
    .columnFeatured {
      padding: 24px 0 0;
      border-left: 0;
      border-top: 1px solid #f5f5f5;
    }
    .columnFeatured {
      padding-bottom: 0;
    }
    .mobileCta {
      display: block;
      padding: 0 24px 24px;
    }
    .mobileCtaButton {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 52px;
      border-radius: 12px;
      background-color: #013525;
      color: #ffffff;
      font-size: 15px;
      font-weight: 600;
      text-decoration: none;
      box-shadow: 0 10px 18px rgba(1, 53, 37, 0.22);
      transition: background-color 0.18s ease;
    }
    .mobileCtaButton:hover {
      background-color: #0b4433;
    }
  }

  @media screen and (max-width: 640px) {
    .navRoot {
      padding: 16px 0;
    }
    .shell {
      padding: 0 14px;
    }
    .pill {
      height: 58px;
      padding: 0 10px 0 8px;
    }
    .logo {
      height: 28px;
      max-width: 112px;
    }
    .pillLeft,
    .pillRight {
      gap: 6px;
    }
    .login {
      height: 38px;
      padding: 0 18px;
      font-size: 13px;
    }
    .navTextLink,
    .resourcesButton {
      display: none;
    }
    .iconButton {
      width: 34px;
      height: 34px;
    }
    .menu {
      width: calc(100vw - 28px);
      border-radius: 24px;
    }
    .menuGrid {
      padding: 20px;
    }
    .mobileCta {
      padding: 0 20px 20px;
    }
  }
</style>
