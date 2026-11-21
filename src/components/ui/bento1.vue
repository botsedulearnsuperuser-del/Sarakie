<template>
  <section :class="$style.bentoSection">
    <div :class="$style.grid">
      <article :class="[$style.card, $style.cardWorkflow]">
        <div :class="$style.workflowArea">
          <div :class="$style.workflowPanel">
            <div :class="$style.node">
              <div :class="[$style.nodeIcon, $style.nodeIconBlue]">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div :class="$style.nodeCopy">
                <span :class="$style.nodeLabel">Trigger</span>
                <span :class="$style.nodeText">When issue is created</span>
              </div>
            </div>

            <div :class="$style.connector">
              <div :class="[$style.connectorFill, $style.connectorBlue]" />
            </div>

            <div :class="[$style.node, $style.nodeSecond]">
              <div :class="[$style.nodeIcon, $style.nodeIconPurple]">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    stroke-width="1.8"
                  />
                  <path
                    d="M4 21v-1a7 7 0 0 1 14 0v1"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
              <div :class="$style.nodeCopy">
                <span :class="$style.nodeLabel">Action</span>
                <span :class="$style.nodeText">Assign to team member</span>
              </div>
            </div>

            <div :class="$style.connector">
              <div :class="[$style.connectorFill, $style.connectorPurple]" />
            </div>

            <div :class="[$style.node, $style.nodeThird]">
              <div :class="[$style.nodeIcon, $style.nodeIconEmerald]">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div :class="$style.nodeCopy">
                <span :class="$style.nodeLabel">Action</span>
                <span :class="$style.nodeText">Notify in Slack</span>
              </div>
            </div>

            <div :class="$style.bonusPanel">
              <div :class="$style.bonusRow">
                <div :class="$style.bonusStatus">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="m5 13 4 4L19 7"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span>Workflow Active</span>
                </div>
                <span :class="$style.bonusBadge">0ms LATENCY</span>
              </div>
            </div>
          </div>
        </div>

        <div :class="$style.cardCopy">
          <h3 :class="$style.cardTitle">
            Automated workflows
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 3v12a6 6 0 0 0 6 6h6M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                stroke="#6366f1"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </h3>
          <p :class="$style.cardText">
            Build powerful automations and connect your tools without writing a
            single line of code.
          </p>
        </div>
      </article>

      <article :class="[$style.card, $style.cardSecurity]">
        <div :class="$style.cardCopy">
          <h3 :class="$style.cardTitle">Enterprise security</h3>
          <p :class="$style.cardTextSmall">
            Bank-grade encryption and SOC2 Type II compliance to keep your data
            secure.
          </p>
        </div>

        <div :class="$style.securityVisual">
          <div :class="$style.gridPattern" aria-hidden="true" />
          <div :class="$style.crossLineH" aria-hidden="true" />
          <div :class="$style.crossLineV" aria-hidden="true" />

          <div :class="$style.beamH" aria-hidden="true">
            <div :class="[$style.beam, $style.beamRight]" />
            <div :class="[$style.beam, $style.beamLeft]" />
          </div>
          <div :class="$style.beamV" aria-hidden="true">
            <div :class="[$style.beamVertical, $style.beamDown]" />
            <div :class="[$style.beamVertical, $style.beamUp]" />
          </div>

          <div :class="$style.shieldWrap">
            <svg :class="$style.shield" viewBox="0 0 86 108" fill="none" aria-hidden="true">
              <defs>
                <linearGradient
                  id="bentoShieldGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stop-color="#2e7d5b" />
                  <stop offset="100%" stop-color="#013525" />
                </linearGradient>
              </defs>
              <path
                d="M43 2 82 12v38c0 26-16 45-39 54C20 95 4 76 4 50V12L43 2Z"
                fill="url(#bentoShieldGradient)"
              />
              <path
                d="M43 2 82 12v38c0 26-16 45-39 54C20 95 4 76 4 50V12L43 2Z"
                stroke="rgba(255, 255, 255, 0.35)"
                stroke-width="1.5"
              />
            </svg>

            <div :class="$style.lock">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="5" y="10" width="14" height="10" rx="2.5" fill="currentColor" />
                <path
                  d="M8 10V7a4 4 0 0 1 8 0v3"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </article>

      <article :class="[$style.card, $style.cardCollab]">
        <div :class="$style.collabCopy">
          <h3 :class="$style.cardTitle">
            Real-time collaboration
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                stroke="#3b82f6"
                fill="rgba(59, 130, 246, 0.2)"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </h3>
          <p :class="$style.cardText">
            Work together with your team in real-time. See cursors, leave
            comments, and ship faster.
          </p>
          <button :class="$style.inviteButton" type="button">Invite team</button>
        </div>

        <div :class="$style.collabVisual">
          <div :class="$style.collabInner">
            <div :class="$style.avatarStack">
              <img
                v-for="avatar in avatars"
                :key="avatar.name"
                :class="$style.avatar"
                :src="avatar.src"
                :alt="avatar.name"
              />
              <div :class="$style.avatarMore">10+</div>
            </div>

            <div :class="$style.mockDoc">
              <div :class="[$style.docBar, $style.docBarOne]" />
              <div :class="[$style.docBar, $style.docBarTwo]" />
              <div :class="[$style.docBar, $style.docBarThree]" />

              <div :class="[$style.cursor, $style.cursorSarah]">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4 3l7.07 17 2.51-7.39L21 10.07 4 3Z" />
                </svg>
                <span>Sarah</span>
              </div>

              <div :class="[$style.docBar, $style.docBarFour]" />

              <div :class="[$style.cursor, $style.cursorAlex]">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4 3l7.07 17 2.51-7.39L21 10.07 4 3Z" />
                </svg>
                <span>Alex</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
  const avatars = [
    { src: "/innovator-man.webp", name: "Kago" },
    { src: "/hero-woman.webp", name: "Naledi" },
    { src: "/hero-client.webp", name: "Kagiso" },
  ]
</script>

<style module>
  .bentoSection {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--font-inter);
  }
  .grid {
    width: 100%;
    max-width: 896px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    border-radius: 12px;
    background-color: #f2ede3;
    padding: 24px;
    box-sizing: border-box;
    box-shadow:
      inset 0 0 2px 2px rgba(255, 255, 255, 1),
      inset 0 0 0 1px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(0, 0, 0, 0.08),
      0 1px 2px -1px rgba(0, 0, 0, 0.08),
      0 2px 4px rgba(0, 0, 0, 0.06);
  }
  .cardWorkflow {
    grid-column: span 2;
    min-height: 320px;
  }
  .cardSecurity {
    grid-column: span 1;
    min-height: 320px;
    padding: 24px 24px 0;
  }
  .cardCollab {
    grid-column: span 3;
    min-height: 280px;
    flex-direction: row;
    padding: 0;
  }
  .cardCopy {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .cardTitle {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--color-darkslategray-600);
    font-size: 24px;
    line-height: 1.2;
    font-weight: 600;
    letter-spacing: -0.01em;
  }
  .cardTitle svg {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }
  .cardText {
    margin: 0;
    max-width: 512px;
    color: #525252;
    font-size: 16px;
    line-height: 1.5;
    text-wrap: balance;
  }
  .cardTextSmall {
    margin: 4px 0 0;
    color: #525252;
    font-size: 14px;
    line-height: 1.5;
    font-weight: 500;
  }

  .workflowArea {
    position: relative;
    flex: 1;
    min-height: 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-bottom: 32px;
    overflow: visible;
  }
  .workflowPanel {
    position: relative;
    z-index: 20;
    width: 100%;
    max-width: 384px;
    display: flex;
    flex-direction: column;
    padding: 16px;
    border-radius: 0 0 16px 16px;
    border: 1px solid #e3dccb;
    border-top: 0;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    transform: translateY(-6px);
  }
  .node {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid #e3dccb;
    background-color: #ffffff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  .nodeSecond,
  .nodeThird {
    opacity: 0.5;
    transform: scale(0.98);
    transition:
      opacity 0.4s ease,
      transform 0.4s ease;
  }
  .cardWorkflow:hover .nodeSecond {
    opacity: 1;
    transform: scale(1);
    transition-delay: 0.4s;
  }
  .cardWorkflow:hover .nodeThird {
    opacity: 1;
    transform: scale(1);
    transition-delay: 1s;
  }
  .nodeIcon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    flex-shrink: 0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  .nodeIcon svg {
    width: 16px;
    height: 16px;
  }
  .nodeIconBlue {
    background-color: #dbeafe;
    color: #2563eb;
  }
  .nodeIconPurple {
    background-color: #f3e8ff;
    color: #9333ea;
  }
  .nodeIconEmerald {
    background-color: #d1fae5;
    color: #059669;
  }
  .nodeCopy {
    display: flex;
    flex-direction: column;
  }
  .nodeLabel {
    color: #171717;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.3;
  }
  .nodeText {
    color: #737373;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.3;
  }
  .connector {
    position: relative;
    width: 1px;
    height: 24px;
    margin: 0 auto;
    z-index: 0;
    background-color: #e3dccb;
  }
  .connectorFill {
    position: absolute;
    top: 0;
    width: 100%;
    height: 0;
    transition: height 0.3s linear;
  }
  .connectorBlue {
    background-color: #3b82f6;
  }
  .connectorPurple {
    background-color: #a855f7;
  }
  .cardWorkflow:hover .connectorFill {
    height: 100%;
  }
  .cardWorkflow:hover .connectorBlue {
    transition-delay: 0.1s;
  }
  .cardWorkflow:hover .connectorPurple {
    transition-delay: 0.7s;
  }
  .bonusPanel {
    height: 0;
    overflow: hidden;
    opacity: 0;
    margin-top: 0;
    border-radius: 8px;
    background-color: rgba(16, 185, 129, 0.05);
    box-shadow: 0 0 0 1px rgba(16, 185, 129, 0.2);
    transition:
      height 0.4s ease,
      opacity 0.4s ease,
      margin-top 0.4s ease;
  }
  .cardWorkflow:hover .bonusPanel {
    height: 36px;
    opacity: 1;
    margin-top: 8px;
    transition-delay: 1.3s;
  }
  .bonusRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 0 12px;
    box-sizing: border-box;
  }
  .bonusStatus {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #047857;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0;
    transform: translateX(-10px);
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }
  .bonusStatus svg {
    width: 14px;
    height: 14px;
    color: #10b981;
  }
  .cardWorkflow:hover .bonusStatus {
    opacity: 1;
    transform: translateX(0);
    transition-delay: 1.6s;
  }
  .bonusBadge {
    padding: 2px 8px;
    border-radius: 4px;
    border: 1px solid rgba(16, 185, 129, 0.2);
    background-color: rgba(16, 185, 129, 0.1);
    color: #047857;
    font-size: 9px;
    font-weight: 700;
    opacity: 0;
    transform: scale(0.8);
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }
  .cardWorkflow:hover .bonusBadge {
    opacity: 1;
    transform: scale(1);
    transition-delay: 1.8s;
  }

  .securityVisual {
    position: relative;
    flex: 1;
    width: 100%;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .gridPattern {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(to right, #e5e5e5 1px, transparent 1px),
      linear-gradient(to bottom, #e5e5e5 1px, transparent 1px);
    background-size: 24px 24px;
    mask-image: radial-gradient(
      ellipse 60% 60% at center,
      #000 30%,
      transparent 100%
    );
    -webkit-mask-image: radial-gradient(
      ellipse 60% 60% at center,
      #000 30%,
      transparent 100%
    );
  }
  .crossLineH,
  .crossLineV {
    position: absolute;
    background-color: rgba(1, 53, 37, 0.2);
  }
  .crossLineH {
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    transform: translateY(-50%);
    mask-image: linear-gradient(
      to right,
      transparent,
      #000 50%,
      transparent
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent,
      #000 50%,
      transparent
    );
  }
  .crossLineV {
    top: 0;
    bottom: 0;
    left: 50%;
    width: 1px;
    transform: translateX(-50%);
    mask-image: linear-gradient(
      to bottom,
      transparent,
      #000 50%,
      transparent
    );
    -webkit-mask-image: linear-gradient(
      to bottom,
      transparent,
      #000 50%,
      transparent
    );
  }
  .beamH,
  .beamV {
    position: absolute;
    overflow: hidden;
  }
  .beamH {
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    transform: translateY(-50%);
    mask-image: linear-gradient(
      to right,
      transparent,
      #000 50%,
      transparent
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent,
      #000 50%,
      transparent
    );
  }
  .beamV {
    top: 0;
    bottom: 0;
    left: 50%;
    width: 1px;
    transform: translateX(-50%);
    mask-image: linear-gradient(
      to bottom,
      transparent,
      #000 50%,
      transparent
    );
    -webkit-mask-image: linear-gradient(
      to bottom,
      transparent,
      #000 50%,
      transparent
    );
  }
  .beam {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
    background-image: linear-gradient(
      to right,
      transparent,
      var(--color-darkslategray-600),
      transparent
    );
  }
  .beamRight {
    left: -50%;
  }
  .beamLeft {
    right: -50%;
    background-image: linear-gradient(
      to left,
      transparent,
      var(--color-darkslategray-600),
      transparent
    );
  }
  .beamVertical {
    position: absolute;
    left: 0;
    right: 0;
    height: 50%;
    background-image: linear-gradient(
      to bottom,
      transparent,
      var(--color-darkslategray-600),
      transparent
    );
  }
  .beamDown {
    top: -50%;
  }
  .beamUp {
    bottom: -50%;
    background-image: linear-gradient(
      to top,
      transparent,
      var(--color-darkslategray-600),
      transparent
    );
  }
  .cardSecurity:hover .beamRight {
    animation: beamRight 2s linear infinite;
  }
  .cardSecurity:hover .beamLeft {
    animation: beamLeft 2.5s linear infinite 0.5s;
  }
  .cardSecurity:hover .beamDown {
    animation: beamDown 2.2s linear infinite 0.2s;
  }
  .cardSecurity:hover .beamUp {
    animation: beamUp 1.8s linear infinite 0.8s;
  }
  @keyframes beamRight {
    from {
      left: -50%;
    }
    to {
      left: 100%;
    }
  }
  @keyframes beamLeft {
    from {
      right: -50%;
    }
    to {
      right: 100%;
    }
  }
  @keyframes beamDown {
    from {
      top: -50%;
    }
    to {
      top: 100%;
    }
  }
  @keyframes beamUp {
    from {
      bottom: -50%;
    }
    to {
      bottom: 100%;
    }
  }
  .shieldWrap {
    position: relative;
    z-index: 10;
    width: 180px;
    height: 226px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(0.8);
    transition: transform 0.5s ease;
  }
  .cardSecurity:hover .shieldWrap {
    transform: scale(0.86);
  }
  .shield {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 12px 24px rgba(1, 53, 37, 0.25));
  }
  .lock {
    position: absolute;
    top: 47%;
    transform: translateY(-50%);
    width: 52px;
    height: 52px;
    color: #ffffff;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25));
  }
  .lock svg {
    width: 100%;
    height: 100%;
  }

  .collabCopy {
    position: relative;
    z-index: 10;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 12px;
    padding: 32px;
  }
  .inviteButton {
    margin-top: 16px;
    padding: 10px 24px;
    border: none;
    border-radius: 8px;
    background-color: var(--color-darkslategray-600);
    color: #ffffff;
    font-family: var(--font-inter);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    box-shadow:
      inset 0 0 0 2px rgba(255, 255, 255, 1),
      0 0 0 1px rgba(0, 0, 0, 0.08),
      0 1px 2px -1px rgba(0, 0, 0, 0.08),
      0 2px 4px rgba(0, 0, 0, 0.06);
    transition:
      transform 0.15s ease,
      opacity 0.18s ease;
  }
  .inviteButton:hover {
    opacity: 0.9;
  }
  .inviteButton:active {
    transform: scale(0.96);
  }
  .collabVisual {
    position: relative;
    flex: 1;
    min-height: 260px;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    overflow: visible;
    padding-top: 16px;
    box-sizing: border-box;
  }
  .collabInner {
    width: 110%;
    display: flex;
    flex-direction: column;
  }
  .avatarStack {
    position: relative;
    z-index: 20;
    display: flex;
    margin-bottom: 16px;
    margin-left: 12px;
  }
  .avatar {
    width: 40px;
    height: 40px;
    margin-left: -12px;
    border-radius: 50%;
    border: 2px solid #f2ede3;
    object-fit: cover;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease;
  }
  .avatar:first-child {
    margin-left: 0;
  }
  .avatar:hover {
    transform: scale(1.1);
  }
  .avatarMore {
    width: 40px;
    height: 40px;
    margin-left: -12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid #f2ede3;
    background-color: #e9e3d8;
    color: #737373;
    font-size: 12px;
    font-weight: 600;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  }
  .mockDoc {
    position: relative;
    min-height: 220px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 32px 16px 16px;
    box-sizing: border-box;
    border: 1px solid #e3dccb;
    border-top-left-radius: 16px;
    background-color: #ffffff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }
  .docBar {
    height: 12px;
    border-radius: 6px;
    background-color: #f2ede3;
    transition: width 0.7s ease-out;
  }
  .docBarOne {
    height: 20px;
    width: 75%;
    background-color: #f2ede3;
    transition-delay: 0s;
  }
  .docBarTwo {
    width: 100%;
    background-color: rgba(242, 237, 227, 0.5);
    transition-delay: 0.075s;
  }
  .docBarThree {
    width: 83.3333%;
    background-color: rgba(242, 237, 227, 0.5);
    transition-delay: 0.1s;
  }
  .docBarFour {
    width: 91.6667%;
    background-color: rgba(242, 237, 227, 0.5);
    transition-delay: 0.2s;
  }
  .cardCollab:hover .docBarOne {
    width: 80%;
  }
  .cardCollab:hover .docBarTwo {
    width: 95%;
  }
  .cardCollab:hover .docBarThree {
    width: 85%;
  }
  .cardCollab:hover .docBarFour {
    width: 90%;
  }
  .cursor {
    position: absolute;
    z-index: 20;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
    transition: transform 0.7s ease-out;
  }
  .cursor svg {
    width: 16px;
    height: 16px;
    transform: rotate(-12deg);
  }
  .cursor span {
    margin-top: 4px;
    margin-left: 8px;
    padding: 2px 6px;
    border-radius: 6px 6px 6px 0;
    color: #ffffff;
    font-size: 10px;
    font-weight: 700;
  }
  .cursorSarah {
    top: 56px;
    left: 20%;
    color: #f43f5e;
  }
  .cursorSarah span {
    background-color: #f43f5e;
  }
  .cursorAlex {
    right: 25%;
    bottom: 40px;
    color: #3b82f6;
  }
  .cursorAlex span {
    background-color: #3b82f6;
  }
  .cardCollab:hover .cursorSarah {
    transform: translate(32px, 12px);
  }
  .cardCollab:hover .cursorAlex {
    transform: translate(-24px, -16px);
  }

  @media screen and (max-width: 767px) {
    .grid {
      grid-template-columns: 1fr;
      max-width: 520px;
    }
    .cardWorkflow,
    .cardSecurity,
    .cardCollab {
      grid-column: span 1;
    }
    .cardCollab {
      flex-direction: column;
    }
    .collabCopy {
      padding: 24px;
    }
    .collabVisual {
      min-height: 280px;
      padding: 0 16px 16px;
    }
    .collabInner {
      width: 100%;
    }
  }
  @media screen and (max-width: 480px) {
    .cardTitle {
      font-size: 21px;
    }
    .cardText {
      font-size: 15px;
    }
    .workflowPanel {
      padding: 12px;
    }
  }
</style>
