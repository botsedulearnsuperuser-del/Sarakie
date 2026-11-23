<template>
  <router-link :class="$style.messagesBtn" to="/chat" aria-label="Messages">
    <span :class="$style.icon">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
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
