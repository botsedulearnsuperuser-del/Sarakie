<template>
  <section :class="$style.ctaTextGroupParent">
    <div :class="$style.ctaTextGroup">
      <h2 :class="$style.yourNextStep">
        Your Next Step Starts
        <br />
        With a Conversation
      </h2>
      <div :class="$style.consultationBackgroundWrapper">
        <div :class="$style.consultationBackground" />
      </div>
    </div>
    <div :class="$style.untitledDesign31">
      <img
        :class="$style.untitledDesign312"
        alt=""
        src="/African-Pattern-Line@2x.png"
      />
    </div>
    <div :class="$style.consultationAction">
      <div :class="$style.contactUsFor">Contact us for a free consultation</div>
      <img
        :class="$style.bitcoinIconsarrowRightFill"
        alt=""
        src="/bitcoin-icons-arrow-right-filled.svg"
      />
    </div>
  </section>
</template>
<style module>
  .ctaTextGroupParent {
    width: 100%;
    height: 334px;
    background-color: var(--color-gold);
    overflow-x: auto;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    padding: var(--padding-0) 65px;
    box-sizing: border-box;
    position: relative;
    isolation: isolate;
    gap: 14.3px;
    max-width: 1507px;
    max-height: 334px;
    z-index: 7;
    text-align: left;
    font-size: 43px;
    color: var(--color-darkslategray);
    font-family: var(--font-inter);
  }
  .ctaTextGroup {
    width: 462px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--padding-20) var(--padding-0);
    box-sizing: border-box;
    gap: 27px;
    max-width: 100%;
    z-index: 0;
  }
  .yourNextStep {
    margin: 0;
    width: 100%;
    position: relative;
    font-size: inherit;
    font-weight: 900;
    font-family: inherit;
    display: inline-block;
    max-width: 462px;
  }
  .consultationBackgroundWrapper {
    width: 205.9px;
    height: var(--height-3);
    display: flex;
    align-items: flex-start;
    padding: var(--padding-0) var(--padding-18);
    box-sizing: border-box;
  }
  .consultationBackground {
    height: var(--height-3);
    width: var(--width-169);
    position: relative;
    background-color: var(--color-darkslategray);
  }
  .untitledDesign31 {
    height: 476px;
    display: flex;
    align-items: flex-start;
    padding: 45.4px var(--padding-0) var(--padding-0);
    box-sizing: border-box;
    max-width: 147%;
    flex-shrink: 0;
    z-index: 1;
  }
  .untitledDesign312 {
    height: 430.6px;
    width: 2015.9px;
    position: relative;
    object-fit: contain;
    max-width: 100%;
  }
  .consultationAction {
    margin: 0 !important;
    position: absolute;
    top: calc(50% - 30px);
    right: 124px;
    border-radius: var(--br-12);
    background-color: var(--color-darkslategray);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--padding-10);
    gap: var(--gap-10);
    white-space: nowrap;
    z-index: 2;
    flex-shrink: 0;
    font-size: var(--fs-22);
    color: var(--color-white);
  }
  .contactUsFor {
    position: relative;
    font-weight: 600;
  }
  .bitcoinIconsarrowRightFill {
    height: var(--height-24);
    width: var(--width-24);
    position: relative;
  }

  @media screen and (max-width: 1482px) {
    .ctaTextGroupParent {
      max-width: 100%;
    }
  }
  @media screen and (max-width: 1225px) {
    .ctaTextGroupParent {
      max-width: 100%;
    }
  }
  @media screen and (max-width: 850px) {
    .ctaTextGroupParent {
      padding-left: var(--padding-32);
      padding-right: var(--padding-32);
      box-sizing: border-box;
      max-width: 100%;
    }

    .yourNextStep {
      font-size: 34px;
    }

    .untitledDesign31 {
      padding-top: var(--padding-30);
      box-sizing: border-box;
    }
  }
  @media screen and (max-width: 450px) {
    .ctaTextGroupParent {
      max-width: 100%;
    }

    .yourNextStep {
      font-size: var(--fs-26);
      max-width: 100%;
    }
  }
</style>
