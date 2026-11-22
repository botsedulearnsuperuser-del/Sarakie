<template>
  <section :class="$style.newsletter4">
    <div :class="$style.card">
      <div :class="$style.copy">
        <div :class="$style.copyInner">
          <h2 :class="$style.headline">Get the CEDA edit</h2>
          <p :class="$style.description">
            Join our newsletter for funding opportunities, innovation stories,
            and early access to new programmes.
          </p>

          <form v-if="!submitted" :class="$style.form" @submit.prevent="handleSubmit">
            <div :class="$style.field">
              <svg
                :class="$style.mailIcon"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="3"
                  stroke="currentColor"
                  stroke-width="1.8"
                />
                <path
                  d="m4 7 8 6 8-6"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <input
                v-model="email"
                :class="$style.input"
                name="email"
                type="email"
                required
                placeholder="Email address"
                aria-label="Email address"
              />
            </div>

            <button :class="$style.button" type="submit">
              Subscribe
            </button>
          </form>

          <p v-else :class="$style.success" role="status">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                stroke-width="1.8"
              />
              <path
                d="m8 12 3 3 5-6"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Thanks — you’re on the list.
          </p>

          <p :class="$style.consent">
            By joining, you agree to receive updates from CEDA. Read our
            <router-link to="/privacy">Privacy Policy</router-link>
            and
            <router-link to="/terms">Terms &amp; Conditions</router-link>.
          </p>
        </div>
      </div>

      <div :class="$style.visual">
        <img
          :class="$style.image"
          src="/themes/gaborone.jpg"
          alt="Gaborone cityscape"
        />
        <div :class="$style.overlay" />
        <div :class="$style.visualLabel">
          <h3 :class="$style.visualTitle">Innovation Notes</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref } from "vue"

  const email = ref("")
  const submitted = ref(false)

  function handleSubmit() {
    if (!email.value.trim()) return
    submitted.value = true
  }
</script>

<style module>
  .newsletter4 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 0 0;
    box-sizing: border-box;
  }
  .card {
    width: 100%;
    max-width: 1024px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    overflow: hidden;
    border-radius: 32px;
    border: 1px solid #e5e5e5;
    background-color: #ffffff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  .copy {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 384px;
    padding: 48px 56px;
    box-sizing: border-box;
  }
  .copyInner {
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .headline {
    margin: 0 0 12px;
    color: var(--color-darkslategray-600);
    font-family: var(--font-inter);
    font-size: 44px;
    line-height: 1.05;
    font-weight: 800;
    letter-spacing: -0.02em;
  }
  .description {
    margin: 0;
    color: #525252;
    font-family: var(--font-inter);
    font-size: 17px;
    line-height: 1.6;
  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .field {
    position: relative;
  }
  .mailIcon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    color: #737373;
    pointer-events: none;
  }
  .input {
    width: 100%;
    height: 48px;
    box-sizing: border-box;
    padding: 0 16px 0 44px;
    border-radius: 12px;
    border: 1px solid #e5e5e5;
    background-color: #f5f5f5;
    color: #171717;
    font-family: var(--font-inter);
    font-size: 16px;
    outline: none;
    box-shadow:
      inset 0 2px 4px 0 rgba(255, 255, 255, 0.2),
      inset 0 -2px 4px 0 rgba(0, 0, 0, 0.08);
    transition:
      border-color 0.18s ease,
      box-shadow 0.18s ease;
  }
  .input::placeholder {
    color: #8a8a8a;
  }
  .input:focus-visible {
    border-color: rgba(1, 53, 37, 0.5);
    box-shadow:
      0 0 0 3px rgba(1, 53, 37, 0.12),
      inset 0 2px 4px 0 rgba(255, 255, 255, 0.2),
      inset 0 -2px 4px 0 rgba(0, 0, 0, 0.08);
  }
  .button {
    width: 100%;
    height: 48px;
    border: none;
    border-radius: 12px;
    background-color: var(--color-darkslategray-600);
    color: #ffffff;
    font-family: var(--font-inter);
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    box-shadow:
      inset 0 2px 4px 0 rgba(255, 255, 255, 0.15),
      inset 0 -2px 4px 0 rgba(0, 0, 0, 0.2);
    transition:
      background-color 0.18s ease,
      transform 0.15s ease;
  }
  .button:hover {
    background-color: #0b4433;
  }
  .button:active {
    transform: translateY(1px);
  }
  .success {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0;
    padding: 14px 16px;
    border-radius: 12px;
    border: 1px solid var(--color-gainsboro);
    background-color: #f0f7f3;
    color: var(--color-darkslategray-600);
    font-family: var(--font-inter);
    font-size: 14px;
    font-weight: 500;
  }
  .success svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
  .consent {
    margin: 0;
    color: #737373;
    font-family: var(--font-inter);
    font-size: 12px;
    line-height: 1.6;
  }
  .consent a {
    color: inherit;
    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 0.18s ease;
  }
  .consent a:hover {
    color: #171717;
  }
  .visual {
    position: relative;
    min-height: 240px;
    overflow: hidden;
    background-color: #f5f5f5;
  }
  .image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(1, 53, 37, 0.2);
  }
  .visualLabel {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 32px 40px;
  }
  .visualTitle {
    margin: 0;
    max-width: 280px;
    color: #ffffff;
    font-family: var(--font-inter);
    font-size: 44px;
    line-height: 1;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  @media screen and (max-width: 900px) {
    .headline {
      font-size: 38px;
    }
    .copy {
      padding: 40px 36px;
    }
    .visualTitle {
      font-size: 38px;
    }
  }
  @media screen and (max-width: 768px) {
    .card {
      grid-template-columns: 1fr;
      border-radius: 24px;
    }
    .copy {
      min-height: 0;
      padding: 36px 24px;
    }
    .copyInner {
      max-width: none;
      gap: 18px;
    }
    .headline {
      font-size: 34px;
    }
    .description {
      font-size: 16px;
    }
    .visual {
      min-height: 280px;
    }
    .visualLabel {
      padding: 24px;
    }
    .visualTitle {
      font-size: 34px;
    }
  }
</style>
