<template>
  <footer id="contact" :class="$style.footer">
    <div :class="$style.inner">
      <div :class="$style.brandPanel">
        <div>
          <div :class="$style.brandRow">
            <img
              :class="$style.brandLogo"
              src="/ceda-logo-white.webp"
              alt=""
              aria-hidden="true"
            />
            <span :class="$style.brandName">CEDA</span>
          </div>

          <h2 :class="$style.tagline">
            Turning bold ideas into impactful solutions for Botswana.
          </h2>
        </div>

        <div :class="$style.socialRow">
          <span :class="$style.socialText">Connect with us</span>
          <div :class="$style.socialLinks">
            <a
              :class="$style.socialLink"
              href="#"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  d="M14 8.5h2.8V5.2c-.5-.1-1.6-.2-2.8-.2-2.8 0-4.7 1.7-4.7 4.8v2.7H6.5v3.7h2.8V23h4.1v-6.8h2.8l.4-3.7h-3.2V10c0-1 .3-1.5 1.6-1.5Z"
                />
              </svg>
            </a>
            <a :class="$style.socialLink" href="#" aria-label="X (Twitter)">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  d="M4 3h4.6l4.1 5.6L17.8 3H21l-6.5 7.5L21.5 21h-4.6l-4.6-6.2L6.9 21H3.7l7-8.1L4 3Zm3.4 1.7L17.5 19h1.8L8.9 4.7H7.4Z"
                />
              </svg>
            </a>
            <a :class="$style.socialLink" href="#" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  d="M6.5 8.7H3.2V21h3.3V8.7ZM4.9 3a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM21 14.1c0-3.4-1.8-5-4.3-5-2 0-2.9 1.1-3.4 1.9V8.7H10V21h3.3v-6.1c0-1.6.8-2.6 2.1-2.6 1.2 0 1.9.8 1.9 2.6V21H21v-6.9Z"
                />
              </svg>
            </a>
            <a :class="$style.socialLink" href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect
                  x="3.5"
                  y="3.5"
                  width="17"
                  height="17"
                  rx="5"
                  stroke="currentColor"
                  stroke-width="1.9"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  stroke-width="1.9"
                />
                <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div :class="$style.infoPanel">
        <img
          :class="$style.floatingIcon"
          src="/ceda-logo.webp"
          alt=""
          aria-hidden="true"
        />

        <div :class="$style.linkGroups">
          <div :class="$style.linkGroup">
            <h3 :class="$style.groupTitle">Explore</h3>
            <ul :class="$style.linkList">
              <li>
                <router-link :class="$style.footerLink" to="/">Home</router-link>
              </li>
              <li>
                <router-link :class="$style.footerLink" to="/about">
                  About
                </router-link>
              </li>
              <li>
                <router-link
                  :class="$style.footerLink"
                  :to="{ path: '/', hash: '#loans' }"
                >
                  Innovation Hub
                </router-link>
              </li>
              <li>
                <router-link
                  :class="$style.footerLink"
                  :to="{ path: '/', hash: '#how-it-works' }"
                >
                  How It Works
                </router-link>
              </li>
              <li>
                <router-link
                  :class="$style.footerLink"
                  :to="{ path: '/', hash: '#contact' }"
                >
                  Support
                </router-link>
              </li>
            </ul>
          </div>

          <div :class="$style.linkGroup">
            <h3 :class="$style.groupTitle">Organisation</h3>
            <ul :class="$style.linkList">
              <li>
                <router-link :class="$style.footerLink" to="/about">
                  About CEDA
                </router-link>
              </li>
              <li>
                <router-link
                  :class="$style.footerLink"
                  :to="{ path: '/', hash: '#contact' }"
                >
                  Careers
                </router-link>
              </li>
            </ul>
          </div>

          <div :class="$style.linkGroup">
            <h3 :class="$style.groupTitle">Legal</h3>
            <ul :class="$style.linkList">
              <li>
                <router-link :class="$style.footerLink" to="/terms">
                  Legal
                </router-link>
              </li>
              <li>
                <router-link :class="$style.footerLink" to="/privacy">
                  Privacy Policy
                </router-link>
              </li>
              <li>
                <router-link :class="$style.footerLink" to="/terms">
                  Terms &amp; Conditions
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <div :class="$style.bottomRow">
          <div :class="$style.copyright">
            © 2026 CEDA. All rights reserved.
          </div>

          <div :class="$style.newsletter">
            <div :class="$style.newsletterCopy">
              <p :class="$style.newsletterSubtitle">Stay in the loop.</p>
              <h3 :class="$style.newsletterTitle">
                Join the CEDA innovation community.
              </h3>
            </div>

            <form
              v-if="!subscribed"
              :class="$style.newsletterForm"
              @submit.prevent="handleSubscribe"
            >
              <input
                v-model="email"
                :class="$style.newsletterInput"
                type="email"
                required
                placeholder="Enter email address"
                aria-label="Enter email address"
              />
              <button :class="$style.newsletterButton" type="submit">
                Subscribe
              </button>
            </form>
            <p v-else :class="$style.newsletterSuccess" role="status">
              Thanks — you’re subscribed.
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import { ref } from "vue"

  const email = ref("")
  const subscribed = ref(false)

  function handleSubscribe() {
    if (!email.value.trim()) return
    subscribed.value = true
  }
</script>

<style module>
  .footer {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    background: linear-gradient(to bottom, transparent 0%, #f7c613 45%);
    font-family: var(--font-inter);
  }
  .inner {
    width: 100%;
    max-width: 920px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    gap: 16px;
  }
  .brandPanel {
    width: 340px;
    flex-shrink: 0;
    min-height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px 24px 14px;
    box-sizing: border-box;
    border-radius: 40px;
    background-color: #f2ede3;
    color: var(--color-darkslategray-600);
  }
  .brandRow {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .brandLogo {
    height: 34px;
    width: auto;
    display: block;
  }
  .brandName {
    font-family: var(--font-inter);
    font-size: 18px;
    font-weight: 800;
    letter-spacing: 0.02em;
  }
  .tagline {
    margin: 12px 0 0;
    max-width: 320px;
    font-family: var(--font-inter);
    font-size: 20px;
    line-height: 1.25;
    font-weight: 500;
    letter-spacing: -0.01em;
  }
  .socialRow {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 12px;
    flex-wrap: wrap;
  }
  .socialText {
    font-size: 13px;
    opacity: 0.9;
  }
  .socialLinks {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .socialLink {
    width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background-color: #ffffff;
    color: var(--color-darkslategray-600);
    text-decoration: none;
    transition:
      transform 0.18s ease,
      background-color 0.18s ease;
  }
  .socialLink:hover {
    transform: translateY(-2px);
    background-color: var(--color-goldenrod-200);
  }
  .socialLink svg {
    width: 14px;
    height: 14px;
    display: block;
  }

  .infoPanel {
    position: relative;
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
        min-height: 180px;
    padding: 20px 24px;
    box-sizing: border-box;
    border-radius: 40px;
    background-color: #f2ede3;
  }

  .floatingIcon {
    position: absolute;
    top: -48px;
    right: -48px;
    width: 256px;
    height: 256px;
    object-fit: contain;
    opacity: 0.06;
    transform: rotate(12deg);
    pointer-events: none;
    user-select: none;
  }
  .linkGroups {
    position: relative;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 32px 48px;
  }
  .linkGroup {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .groupTitle {
    margin: 0;
    color: #737373;
    font-family: var(--font-inter);
    font-size: 14px;
    font-weight: 500;
  }
  .linkList {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .footerLink {
    width: fit-content;
    color: #404040;
    font-family: var(--font-inter);
    font-size: 12px;
    font-weight: 500;
    line-height: 1.3;
    text-decoration: none;
    transition: color 0.18s ease;
  }
  .footerLink:hover {
    color: var(--color-darkslategray-600);
  }
  .bottomRow {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    margin-top: 14px;
  }
  .copyright {
    order: 1;
    color: #737373;
    font-family: var(--font-inter);
    font-size: 11px;
    line-height: 1.4;
    flex-shrink: 0;
  }
  .newsletter {
    order: 2;
    width: 100%;
    max-width: 384px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .newsletterCopy {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .newsletterSubtitle {
    margin: 0;
    color: #737373;
    font-family: var(--font-inter);
    font-size: 12px;
    font-weight: 500;
  }
  .newsletterTitle {
    margin: 0;
    color: var(--color-darkslategray-600);
    font-family: var(--font-inter);
    font-size: 13px;
    font-weight: 600;
  }
  .newsletterForm {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
  }
  .newsletterInput {
    width: 100%;
    height: 36px;
    box-sizing: border-box;
    padding: 0 128px 0 24px;
    border-radius: 999px;
    border: 1px solid transparent;
    outline: none;
    background-color: #e9e3d8;
    color: #171717;
    font-family: var(--font-inter);
    font-size: 14px;
    box-shadow:
      0 0 0 0.5px rgba(0, 0, 0, 0.03),
      0 2px 4px rgba(0, 0, 0, 0.05),
      inset 0 2px 0 rgba(255, 255, 255, 0.5);
    transition:
      border-color 0.18s ease,
      box-shadow 0.18s ease;
  }
  .newsletterInput::placeholder {
    color: #8a8a8a;
  }
  .newsletterInput:focus-visible {
    border-color: var(--color-darkslategray-600);
    box-shadow:
      0 0 0 3px rgba(1, 53, 37, 0.12),
      0 2px 4px rgba(0, 0, 0, 0.05);
  }
  .newsletterButton {
    position: absolute;
    right: 6px;
    height: 30px;
    padding: 0 20px;
    border: none;
    border-radius: 999px;
    background-color: var(--color-darkslategray-600);
    color: #ffffff;
    font-family: var(--font-inter);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    box-shadow:
      0 0 0 0.5px rgba(0, 0, 0, 0.03),
      0 2px 4px rgba(0, 0, 0, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transition: background-color 0.18s ease;
  }
  .newsletterButton:hover {
    background-color: #0b4433;
  }
  .newsletterSuccess {
    margin: 0;
    padding: 12px 16px;
    border-radius: 999px;
    background-color: #e4efe9;
    border: 1px solid #cfe0d8;
    color: var(--color-darkslategray-600);
    font-size: 13px;
    font-weight: 500;
  }

  @media screen and (max-width: 1100px) {
    .brandPanel {
      width: 340px;
      padding: 36px;
    }
    .tagline {
      font-size: 24px;
      margin-top: 72px;
    }
    .infoPanel {
      padding: 36px;
    }
    .linkGroups {
      gap: 48px 64px;
    }
    .bottomRow {
      flex-direction: column;
      align-items: flex-start;
      margin-top: 64px;
    }
    .copyright {
      order: 2;
    }
    .newsletter {
      order: 1;
      max-width: 100%;
    }
  }

  @media screen and (max-width: 900px) {
    .footer {
      padding: 20px;
    }
    .inner {
      flex-direction: column;
    }
    .brandPanel {
      width: 100%;
      min-height: 200px;
      padding: 20px;
      border-radius: 24px;
    }
    .tagline {
      margin-top: 12px;
      font-size: 18px;
    }
    .socialRow {
      margin-top: 16px;
    }
    .infoPanel {
      min-height: 0;
      padding: 32px;
      border-radius: 28px;
    }
    .linkGroups {
      gap: 40px 64px;
    }
    .bottomRow {
      margin-top: 56px;
    }
  }

  @media screen and (max-width: 560px) {
    .footer {
      padding: 14px;
    }
    .brandPanel {
      padding: 26px;
      border-radius: 24px;
    }
    .tagline {
      font-size: 22px;
    }
    .infoPanel {
      padding: 26px;
      border-radius: 24px;
    }
    .linkGroups {
      gap: 32px 40px;
    }
    .newsletterInput {
      padding-right: 118px;
      padding-left: 20px;
    }
    .newsletterButton {
      padding: 0 16px;
    }
  }
</style>
