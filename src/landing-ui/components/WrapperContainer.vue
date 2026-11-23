<template>
  <div :class="$style.wrapperContainer">
    <div :class="$style.innerContainer">
      <section :class="$style.sectionHeader">
        <div :class="$style.headerBackgroundWrapper">
          <div :class="$style.headerBackground" />
        </div>
        <h1 :class="$style.everyoneNeedsA">Everyone needs a helping hand</h1>
        <h3 :class="$style.ourFlexibleLoan" @click="onOurFlexibleLoanClick">
          Our Flexible Loan Options Designed for easy repayability and
          flexibility.
        </h3>
      </section>
      <section :class="$style.loanCardsRow">
        <div :class="$style.cardContainer">
          <img
            :class="$style.cardContainerChild"
            loading="lazy"
            alt=""
            src="/Group-2.svg"
          />
          <h2 :class="$style.shortTermLoans">Short Term Loans</h2>
          <div :class="$style.aHelpingHandForLifesImmeWrapper">
            <div :class="$style.aHelpingHand">
              A helping hand for life`s immediate
              <br />
              needs.
            </div>
          </div>
          <img
            :class="$style.untitledDesign32"
            loading="lazy"
            alt=""
            src="/Untitled-design-3-21@2x.png"
          />
          <div :class="$style.cardContainerInner">
            <div :class="$style.frameWrapper">
              <div :class="$style.talkToAnAgentParent">
                <div :class="$style.talkToAn">Talk to an Agent</div>
                <div :class="$style.actionBackground" />
              </div>
            </div>
          </div>
        </div>
        <div :class="$style.cardContainer2">
          <img :class="$style.cardContainerChild" alt="" src="/Group-2.svg" />
          <h2 :class="$style.shortTermLoans">Long Term Loans</h2>
          <div :class="$style.aHelpingHandForLifesImmeContainer">
            <div :class="$style.aHelpingHand2">
              A helping hand for life`s immediate
              <br />
              needs.
            </div>
          </div>
          <img
            :class="$style.untitledDesign32"
            alt=""
            src="/Untitled-design-3-21@2x.png"
          />
          <div :class="$style.talkToAnAgentGroup">
            <div :class="$style.talkToAn2">Talk to an Agent</div>
            <div :class="$style.headerBackground" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
  function onOurFlexibleLoanClick() {
    const anchor = document.querySelector("[data-scroll-to='untitledDesign31']")
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" })
    }
  }
</script>
<style module>
  .wrapperContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--padding-0) 33px var(--padding-0) var(--padding-0);
    box-sizing: border-box;
    max-width: 1375px;
    z-index: 3;
    flex-shrink: 0;
  }
  .innerContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1341.8px;
  }
  .sectionHeader {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--gap-16);
    max-width: 948px;
    text-align: left;
    font-size: 61px;
    color: var(--color-darkslategray);
    font-family: var(--font-inter);
  }
  .headerBackgroundWrapper {
    width: 173.9px;
    height: var(--height-8);
    display: flex;
    align-items: flex-start;
    padding: var(--padding-0) var(--padding-2) var(--padding-5);
    box-sizing: border-box;
  }
  .headerBackground {
    height: var(--height-3);
    width: var(--width-169);
    position: relative;
    background-color: var(--color-goldenrod);
  }
  .everyoneNeedsA {
    margin: 0;
    align-self: stretch;
    position: relative;
    font-size: inherit;
    font-weight: 900;
    font-family: inherit;
  }
  .ourFlexibleLoan {
    margin: 0;
    width: 859.5px;
    position: relative;
    font-size: var(--fs-22);
    font-weight: 400;
    font-family: inherit;
    text-align: right;
    display: inline-block;
    max-width: 859.5px;
    cursor: pointer;
  }
  .loanCardsRow {
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;
    padding: 49px 440px 49px var(--padding-0);
    box-sizing: border-box;
    gap: 47px;
    max-width: 1341.8px;
    text-align: left;
    font-size: var(--fs-22);
    color: var(--color-darkslategray);
    font-family: var(--font-inter);
  }
  .cardContainer {
    flex: 1.0358;
    border-radius: var(--br-44);
    background-color: var(--color-white);
    border: var(--border-1);
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--padding-38) 159px 58px var(--padding-31);
    position: relative;
    isolation: isolate;
    gap: var(--gap-21);
    min-width: var(--min-w-310);
    max-width: 100%;
  }
  .cardContainerChild {
    width: var(--width-85);
    height: var(--height-84);
    position: relative;
    z-index: 2;
    flex-shrink: 0;
  }
  .shortTermLoans {
    margin: 0;
    align-self: stretch;
    position: relative;
    font-size: var(--fs-26);
    font-weight: 900;
    font-family: inherit;
    z-index: 3;
    flex-shrink: 0;
  }
  .aHelpingHandForLifesImmeWrapper {
    width: 229px;
    height: var(--height-85);
    display: flex;
    align-items: flex-start;
    padding: var(--padding-2) var(--padding-0);
    box-sizing: border-box;
    z-index: 4;
    flex-shrink: 0;
  }
  .aHelpingHand {
    width: 327px;
    position: relative;
    display: inline-block;
    flex-shrink: 0;
    max-width: 143%;
  }
  .untitledDesign32 {
    width: var(--width-209_4);
    position: absolute;
    margin: 0 !important;
    right: -90.3px;
    bottom: -47.7px;
    max-height: 100%;
    object-fit: contain;
    z-index: 1;
    flex-shrink: 0;
  }
  .cardContainerInner {
    width: 229px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--padding-1) var(--padding-0);
    box-sizing: border-box;
    z-index: 4;
    flex-shrink: 0;
  }
  .frameWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 229px;
  }
  .talkToAnAgentParent {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--gap-3);
    max-width: 174.9px;
  }
  .talkToAn {
    align-self: stretch;
    position: relative;
    font-weight: 600;
    z-index: 2;
  }
  .actionBackground {
    align-self: stretch;
    height: var(--height-3);
    position: relative;
    background-color: var(--color-goldenrod);
    z-index: 1;
  }
  .cardContainer2 {
    flex: 1;
    border-radius: var(--br-44);
    background-color: var(--color-white);
    border: var(--border-1);
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--padding-38) 167px 58px var(--padding-31);
    position: relative;
    isolation: isolate;
    gap: var(--gap-21);
    min-width: var(--min-w-310);
    max-width: 100%;
  }
  .aHelpingHandForLifesImmeContainer {
    width: 221.1px;
    height: var(--height-85);
    display: flex;
    align-items: flex-start;
    padding: var(--padding-2) var(--padding-0);
    box-sizing: border-box;
    z-index: 4;
    flex-shrink: 0;
  }
  .aHelpingHand2 {
    width: 327px;
    position: relative;
    display: inline-block;
    flex-shrink: 0;
    max-width: 148%;
  }
  .talkToAnAgentGroup {
    width: 221.1px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--padding-1) 46px var(--padding-1) var(--padding-0);
    box-sizing: border-box;
    gap: var(--gap-3);
    z-index: 4;
    flex-shrink: 0;
  }
  .talkToAn2 {
    align-self: stretch;
    position: relative;
    font-weight: 600;
  }

  @media screen and (max-width: 1482px) {
    .wrapperContainer {
      max-width: 100%;
    }

    .innerContainer {
      max-width: 100%;
    }

    .loanCardsRow {
      max-width: 100%;
    }
  }
  @media screen and (max-width: 1225px) {
    .sectionHeader {
      max-width: 100%;
    }

    .ourFlexibleLoan {
      max-width: 100%;
    }

    .loanCardsRow {
      padding-right: 220px;
      box-sizing: border-box;
    }
  }
  @media screen and (max-width: 850px) {
    .everyoneNeedsA {
      font-size: 49px;
    }

    .loanCardsRow {
      gap: 23px;
      padding-top: var(--padding-32);
      padding-right: 110px;
      padding-bottom: var(--padding-32);
      box-sizing: border-box;
    }

    .cardContainer2 {
      flex: 1;
    }
  }
  @media screen and (max-width: 450px) {
    .everyoneNeedsA {
      font-size: 37px;
    }

    .ourFlexibleLoan {
      font-size: var(--fs-18);
    }

    .loanCardsRow {
      padding-right: var(--padding-20);
      box-sizing: border-box;
    }

    .cardContainer {
      padding-top: 25px;
      padding-right: var(--padding-20);
      padding-bottom: var(--padding-38);
      box-sizing: border-box;
    }

    .shortTermLoans {
      font-size: var(--fs-21);
    }

    .aHelpingHand {
      font-size: var(--fs-18);
    }

    .talkToAn {
      font-size: var(--fs-18);
    }

    .cardContainer2 {
      padding-top: 25px;
      padding-right: var(--padding-20);
      padding-bottom: var(--padding-38);
      box-sizing: border-box;
    }

    .aHelpingHand2 {
      font-size: var(--fs-18);
    }

    .talkToAn2 {
      font-size: var(--fs-18);
    }
  }
</style>
