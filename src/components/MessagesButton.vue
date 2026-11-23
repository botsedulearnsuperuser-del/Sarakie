<template>
  <router-link :class="$style.messagesBtn" to="/chat" aria-label="Messages">
    <span :class="$style.icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        aria-hidden="true"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
          <path stroke-linejoin="round" d="M14 19c3.771 0 5.657 0 6.828-1.172S22 14.771 22 11s0-5.657-1.172-6.828S17.771 3 14 3h-4C6.229 3 4.343 3 3.172 4.172S2 7.229 2 11s0 5.657 1.172 6.828c.653.654 1.528.943 2.828 1.07" />
          <path d="M12 11v.01M8 11v.01m8-.01v.01M14 19c-1.236 0-2.598.5-3.841 1.145c-1.998 1.037-2.997 1.556-3.489 1.225s-.399-1.355-.212-3.404L6.5 17.5" />
        </g>
      </svg>
    </span>
    <span :class="$style.label">Messages</span>
    <span :class="$style.dot" aria-hidden="true" />
  </router-link>
</template>

<style module>
.messagesBtn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  height: 44px;
  padding: 0 17px;
  border-radius: 999px;
  border: 1px solid #e7e1d5;
  background-color: #fffdf8;
  color: #97231e;
  text-decoration: none;
  font-family: var(--font-inter);
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 1px 2px rgba(43, 27, 0, 0.06);
  transition: background-color 0.18s ease, border-color 0.18s ease, transform 0.15s ease;
}

.messagesBtn:hover {
  background-color: #ffffff;
  border-color: #d8cdbc;
}

.messagesBtn:active {
  transform: translateY(1px);
}

.icon {
  display: inline-flex;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.icon svg {
  width: 100%;
  height: 100%;
}

.label {
  color: #2b1b00;
}

.dot {
  position: absolute;
  top: 9px;
  right: 11px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #0ea5e9;
  animation: msgBounce 1.4s ease-in-out infinite;
}

@keyframes msgBounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

@media (max-width: 640px) {
  .messagesBtn {
    width: 44px;
    padding: 0;
    justify-content: center;
  }
  .label {
    display: none;
  }
}
</style>
