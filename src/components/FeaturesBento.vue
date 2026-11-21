<template>
  <section id="features" :class="$style.section">
    <div :class="$style.inner">
      <div :class="$style.head">
        <span :class="$style.eyebrow">One workspace</span>
        <h2 :class="$style.title">Everything your pipeline needs, in one place</h2>
        <p :class="$style.subtitle">
          From the first submission to the funding decision, every founder, evaluator and
          consultant works from the same source of truth.
        </p>
      </div>

      <div :class="$style.grid">
        <article :class="[$style.card, $style.workflowCard]">
          <span :class="$style.icon">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M13 2 4.5 13.5H11L10 22l9-12h-6.5L13 2Z"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>

          <h3 :class="$style.cardTitle">Automated workflows</h3>
          <p :class="$style.cardText">
            Build powerful automations and connect your tools without writing a single line of
            code.
          </p>

          <ul :class="$style.steps">
            <li v-for="step in steps" :key="step.text" :class="$style.step">
              <span :class="[$style.stepBadge, step.kind === 'Trigger' && $style.trigger]">
                {{ step.kind }}
              </span>
              <span :class="$style.stepText">{{ step.text }}</span>
              <svg :class="$style.stepArrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </li>
          </ul>
        </article>

        <article :class="[$style.card, $style.inviteCard]">
          <span :class="$style.icon">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle cx="10" cy="8" r="3.2" stroke="currentColor" stroke-width="1.7" />
              <path
                d="M17 11h4M19 9v4"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>
          </span>

          <h3 :class="$style.cardTitle">Invite team</h3>
          <p :class="$style.cardText">
            Bring evaluators, consultants and founders into the same workspace.
          </p>

          <div :class="$style.inviteRow">
            <div :class="$style.avatarStack">
              <img
                v-for="person in avatars"
                :key="person.name"
                :class="$style.avatar"
                :src="person.src"
                :alt="person.name"
                loading="lazy"
              />
              <span :class="$style.moreAvatars">10+</span>
            </div>
            <span :class="$style.inviteName">Sarah</span>
          </div>

          <p :class="$style.inviteMeta">
            Kago, Naledi, Kagiso, Sarah and 10 others are already in this workspace.
          </p>
        </article>

        <article :class="[$style.card, $style.featureCard]">
          <span :class="$style.icon">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 3 5 5.8v5.4c0 4.3 2.9 8.2 7 9.3 4.1-1.1 7-5 7-9.3V5.8L12 3Z"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />
              <path
                d="m9.2 11.8 2 2 3.7-3.8"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>

          <div>
            <h3 :class="$style.cardTitle">Enterprise security</h3>
            <p :class="$style.cardText">
              Bank-grade encryption and SOC2 Type II compliance to keep your data secure.
            </p>
          </div>
        </article>

        <article :class="[$style.card, $style.featureCard]">
          <span :class="$style.icon">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4.5 5.5 10 12l-5.5 6.5M13 5.5 18.5 12 13 18.5"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>

          <div>
            <h3 :class="$style.cardTitle">Real-time collaboration</h3>
            <p :class="$style.cardText">
              Work together with your team in real-time. See cursors, leave comments, and ship
              faster.
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const steps = [
    { kind: "Trigger", text: "When issue is created" },
    { kind: "Action", text: "Assign to team member" },
    { kind: "Action", text: "Notify in Slack" },
  ];

  const avatars = [
    { name: "Kago", src: "/avatars/ana.jpg" },
    { name: "Naledi", src: "/avatars/mariana.jpg" },
    { name: "Kagiso", src: "/avatars/afshin.jpg" },
    { name: "Sarah", src: "/avatars/natko.jpg" },
  ];
</script>

<style module>
  .section {
    width: 100%;
    background-color: var(--color-seashell);
    padding: 72px 40px 80px;
    box-sizing: border-box;
    font-family: var(--font-inter);
  }

  .inner {
    width: 100%;
    max-width: 1180px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .head {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 620px;
  }

  .eyebrow {
    align-self: flex-start;
    padding: 5px 12px;
    border: 1px solid rgba(1, 53, 37, 0.14);
    border-radius: 999px;
    color: #0b5641;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .title {
    margin: 0;
    color: var(--color-darkslategray-600);
    font-family: var(--font-inter);
    font-size: 48px;
    line-height: 1.1;
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  .subtitle {
    margin: 0;
    max-width: 560px;
    color: #6b7f77;
    font-size: 15px;
    line-height: 1.6;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 16px;
  }

  .card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 26px;
    border: 1px solid #ece4d6;
    border-radius: 28px;
    background-color: #ffffff;
    box-sizing: border-box;
  }

  .workflowCard {
    grid-column: span 7;
  }

  .inviteCard {
    grid-column: span 5;
  }

  .featureCard {
    grid-column: span 6;
    flex-direction: row;
    align-items: flex-start;
    gap: 16px;
  }

  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    flex-shrink: 0;
    border-radius: 999px;
    background-color: rgba(1, 53, 37, 0.07);
    color: #0b5641;
  }

  .icon svg {
    width: 19px;
    height: 19px;
  }

  .cardTitle {
    margin: 0;
    color: var(--color-darkslategray-600);
    font-size: 18px;
    line-height: 1.3;
    font-weight: 600;
  }

  .cardText {
    margin: 0;
    color: #6b7f77;
    font-size: 14px;
    line-height: 1.6;
  }

  .steps {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 8px 0 0;
    padding: 0;
  }

  .step {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    border: 1px solid #f1ebdf;
    border-radius: 16px;
    background-color: #fbf8f2;
  }

  .stepBadge {
    flex-shrink: 0;
    padding: 3px 9px;
    border-radius: 999px;
    background-color: #eef2ef;
    color: #0b5641;
    font-size: 11px;
    font-weight: 600;
  }

  .trigger {
    background-color: #fcd049;
    color: #4a3a06;
  }

  .stepText {
    flex: 1;
    min-width: 0;
    color: #23342e;
    font-size: 14px;
    font-weight: 500;
  }

  .stepArrow {
    width: 15px;
    height: 15px;
    flex-shrink: 0;
    color: #a8b4ae;
  }

  .inviteRow {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 6px;
  }

  .avatarStack {
    display: flex;
    align-items: center;
  }

  .avatar {
    width: 38px;
    height: 38px;
    border: 2px solid #ffffff;
    border-radius: 999px;
    object-fit: cover;
    margin-left: -10px;
  }

  .avatar:first-child {
    margin-left: 0;
  }

  .moreAvatars {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    margin-left: -10px;
    border: 2px solid #ffffff;
    border-radius: 999px;
    background-color: #013525;
    color: #ffffff;
    font-size: 11px;
    font-weight: 600;
  }

  .inviteName {
    color: var(--color-darkslategray-600);
    font-size: 14px;
    font-weight: 600;
  }

  .inviteMeta {
    margin: 0;
    color: #8a9993;
    font-size: 12.5px;
    line-height: 1.6;
  }

  @media screen and (max-width: 1000px) {
    .workflowCard,
    .inviteCard,
    .featureCard {
      grid-column: span 12;
    }
  }

  @media screen and (max-width: 850px) {
    .section {
      padding: 48px 20px 56px;
    }
    .title {
      font-size: 36px;
      letter-spacing: -0.02em;
    }
    .card {
      padding: 20px;
      border-radius: 22px;
    }
    .featureCard {
      flex-direction: column;
      gap: 12px;
    }
  }
</style>
