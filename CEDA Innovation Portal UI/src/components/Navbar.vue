<template>
  <header :class="$style.navbar">
    <div :class="$style.navbar2">
      <img :class="$style.logoIcon" loading="lazy" alt="" src="/LOGO@2x.png" />
      <div :class="$style.menuContainer">
        <h3 :class="$style.ourLoans">Our Loans</h3>
        <h3 :class="$style.howItWorks">How it Works</h3>
        <h3 :class="$style.loginToMy" @click="onLoginToMyClick">
          Login to My Account
        </h3>
      </div>
      <div :class="$style.actionContainer">
        <div :class="$style.newApplication">New Application</div>
        <img
          :class="$style.bitcoinIconsarrowRightFill"
          alt=""
          src="/bitcoin-icons-arrow-right-filled.svg"
        />
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
  function onLoginToMyClick() {
    // Please sync "Sign In " to the project
  }
</script>
<style module>
  .navbar {
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--padding-0) var(--padding-30);
    box-sizing: border-box;
    max-width: 100%;
    z-index: 1;
    flex-shrink: 0;
    text-align: left;
    font-size: var(--fs-22);
    color: var(--color-white);
    font-family: var(--font-inter);
  }
  .navbar2 {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    align-content: center;
    gap: var(--gap-10) 83.9px;
    max-width: 1385.8px;
  }
  .logoIcon {
    width: 272px;
    position: relative;
    max-height: 100%;
    object-fit: cover;
  }
  .menuContainer {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 29.5px;
    min-width: var(--min-w-310);
    max-width: 615px;
  }
  .ourLoans {
    margin: 0;
    position: relative;
    font-size: inherit;
    font-weight: 400;
    font-family: inherit;
    display: inline-block;
    min-width: 108px;
  }
  .howItWorks {
    margin: 0;
    position: relative;
    font-size: inherit;
    font-weight: 400;
    font-family: inherit;
  }
  .loginToMy {
    margin: 0;
    position: relative;
    font-size: inherit;
    font-weight: 400;
    font-family: inherit;
    cursor: pointer;
  }
  .actionContainer {
    height: var(--height-47);
    border-radius: var(--br-12);
    background-color: var(--color-goldenrod);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--padding-10);
    box-sizing: border-box;
    gap: var(--gap-10);
    color: var(--color-darkslategray);
  }
  .newApplication {
    position: relative;
    font-weight: 600;
  }
  .bitcoinIconsarrowRightFill {
    height: var(--height-24);
    width: var(--width-24);
    position: relative;
  }

  @media screen and (max-width: 1482px) {
    .navbar2 {
      max-width: 100%;
    }
  }
  @media screen and (max-width: 850px) {
    .navbar2 {
      gap: 42px;
    }

    .menuContainer {
      max-width: 100%;
    }
  }
  @media screen and (max-width: 450px) {
    .navbar2 {
      gap: var(--gap-21);
    }

    .loginToMy {
      display: none;
    }
  }
</style>
