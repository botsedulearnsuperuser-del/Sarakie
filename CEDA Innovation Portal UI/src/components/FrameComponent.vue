<template>
  <main :class="$style.layerBlurWrapper">
    <div :class="$style.layerBlur">
      <h2 :class="$style.onlineLoanApplication">Online Loan Application</h2>
      <div :class="$style.loanApplicationsAvailableOnWrapper">
        <h3
          :class="$style.loanApplicationsAvailable"
          @click="onLoanApplicationsAvailableClick"
        >
          Loan applications available online, use our mobile friendly website to
          apply
        </h3>
      </div>
      <div :class="$style.bannerAction">
        <div :class="$style.bannerButton">
          <div :class="$style.applyOnline">Apply Online</div>
          <img
            :class="$style.bitcoinIconsarrowRightFill"
            alt=""
            src="/bitcoin-icons-arrow-right-filled.svg"
          />
        </div>
      </div>
      <img
        :class="$style.layerBlurChild"
        loading="lazy"
        alt=""
        src="/Group-3@2x.png"
      />
    </div>
  </main>
</template>
<script setup lang="ts">
  function onLoanApplicationsAvailableClick() {
    const anchor = document.querySelector("[data-scroll-to='untitledDesign31']")
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" })
    }
  }
</script>
<style module>
  .layerBlurWrapper {
    align-self: stretch;
    filter: blur(4px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top;
    max-width: 100%;
    z-index: 6;
    flex-shrink: 0;
    text-align: right;
    font-size: 61px;
    color: var(--color-white);
    font-family: var(--font-inter);
  }
  .layerBlur {
    align-self: stretch;
    background-color: var(--color-gray);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 85px var(--padding-30) var(--padding-26);
    box-sizing: border-box;
    gap: var(--gap-20);
    max-width: 100%;
  }
  .onlineLoanApplication {
    margin: 0;
    width: 100%;
    position: relative;
    font-size: inherit;
    font-weight: 900;
    font-family: inherit;
    white-space: pre-wrap;
    display: inline-block;
    max-width: 805.4px;
  }
  .loanApplicationsAvailableOnWrapper {
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--padding-0) var(--padding-6) var(--padding-8) var(--padding-0);
    box-sizing: border-box;
    max-width: 100%;
    text-align: center;
    font-size: var(--fs-24);
  }
  .loanApplicationsAvailable {
    margin: 0;
    flex: 1;
    position: relative;
    font-size: inherit;
    font-weight: 600;
    font-family: inherit;
    display: inline-block;
    width: 1445.4px;
    flex-shrink: 0;
    max-width: 100%;
    cursor: pointer;
  }
  .bannerAction {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    padding: var(--padding-0) var(--padding-0) var(--padding-31);
    box-sizing: border-box;
    max-width: 250.2px;
    text-align: left;
    font-size: var(--fs-22);
    color: var(--color-darkslategray);
  }
  .bannerButton {
    height: var(--height-47);
    border-radius: var(--br-12);
    background-color: var(--color-goldenrod);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--padding-10);
    box-sizing: border-box;
    gap: 9px;
  }
  .applyOnline {
    position: relative;
    font-weight: 600;
  }
  .bitcoinIconsarrowRightFill {
    height: var(--height-24);
    width: var(--width-24);
    position: relative;
  }
  .layerBlurChild {
    width: 100%;
    height: 518px;
    position: relative;
    max-width: 932.4px;
    overflow: hidden;
    flex-shrink: 0;
    object-fit: cover;
  }

  @media screen and (max-width: 1225px) {
    .layerBlur {
      padding-top: 55px;
      padding-bottom: var(--padding-20);
      box-sizing: border-box;
    }

    .layerBlurChild {
      max-width: 100%;
    }
  }
  @media screen and (max-width: 850px) {
    .onlineLoanApplication {
      font-size: 49px;
      max-width: 100%;
    }
  }
  @media screen and (max-width: 450px) {
    .layerBlur {
      padding-top: var(--padding-36);
      box-sizing: border-box;
    }

    .onlineLoanApplication {
      font-size: 37px;
    }

    .loanApplicationsAvailable {
      font-size: var(--fs-19);
    }
  }
</style>
