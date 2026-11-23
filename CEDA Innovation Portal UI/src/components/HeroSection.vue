<template>
  <section :class="$style.heroSection">
    <div :class="$style.rootedInBotswana">
      <h3 :class="$style.rootedInBotswana2">ROOTED IN BOTSWANA</h3>
    </div>
    <div :class="$style.backgroundShapeWrapper">
      <div :class="$style.backgroundShape" />
    </div>
    <div :class="$style.greatFinancingForYourFutur">
      <h1 :class="$style.greatFinancingForContainer">
        <span>
          Great Financing
          <br />
          For your
        </span>
        <span :class="$style.future">future.</span>
      </h1>
    </div>
    <div :class="$style.exploreAffordableLoan">
      Explore affordable loan options
      <br />
      for life`s everyday needs.
    </div>
    <div :class="$style.heroCtaRow">
      <div :class="$style.primaryButton">
        <div :class="$style.getALoan">Get a loan</div>
        <img
          :class="$style.bitcoinIconsarrowRightFill"
          alt=""
          src="/bitcoin-icons-arrow-right-filled.svg"
        />
      </div>
      <div :class="$style.talkToAnAgentParent">
        <div :class="$style.talkToAn">Talk to an Agent</div>
        <div :class="$style.buttonBackgroundWrapper">
          <div :class="$style.buttonBackground" />
        </div>
      </div>
    </div>
  </section>
</template>
<style module>
  .heroSection {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 74px 613px 101px 178px;
    box-sizing: border-box;
    gap: var(--gap-5);
    max-width: 100%;
    z-index: 2;
    flex-shrink: 0;
    text-align: left;
    font-size: var(--fs-21);
    color: var(--color-goldenrod);
    font-family: var(--font-inter);
  }
  .rootedInBotswana {
    align-self: stretch;
    display: flex;
    align-items: flex-start;
    padding: var(--padding-0) var(--padding-0) var(--padding-0) var(--padding-3);
    box-sizing: border-box;
    max-width: 100%;
  }
  .rootedInBotswana2 {
    margin: 0;
    flex: 1;
    position: relative;
    font-size: inherit;
    font-weight: 600;
    font-family: inherit;
    display: inline-block;
    max-width: 100%;
  }
  .backgroundShapeWrapper {
    width: 77.9px;
    height: var(--height-11);
    display: flex;
    align-items: flex-start;
    padding: var(--padding-0) var(--padding-5) var(--padding-6);
    box-sizing: border-box;
  }
  .backgroundShape {
    height: var(--height-5);
    width: 67px;
    position: relative;
    background-color: var(--color-goldenrod);
  }
  .greatFinancingForYourFutur {
    align-self: stretch;
    height: 271px;
    display: flex;
    align-items: flex-start;
    padding: var(--padding-0) var(--padding-0) 51px;
    box-sizing: border-box;
    max-width: 100%;
    font-size: 91px;
    color: var(--color-white);
  }
  .greatFinancingForContainer {
    margin: 0;
    flex: 1;
    position: relative;
    font-size: inherit;
    font-weight: 900;
    font-family: inherit;
    display: inline-block;
    max-width: 721px;
  }
  .future {
    color: var(--color-goldenrod);
  }
  .exploreAffordableLoan {
    width: 100%;
    position: relative;
    font-weight: 600;
    display: inline-block;
    max-width: 316px;
  }
  .heroCtaRow {
    align-self: stretch;
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    align-content: flex-end;
    padding: 66px var(--padding-0) var(--padding-0);
    gap: var(--gap-10) var(--gap-36);
    font-size: var(--fs-22);
    color: var(--color-darkslategray);
  }
  .primaryButton {
    height: var(--height-47);
    border-radius: var(--br-12);
    background-color: var(--color-goldenrod);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--padding-10);
    box-sizing: border-box;
    gap: var(--gap-10);
  }
  .getALoan {
    position: relative;
    font-weight: 600;
  }
  .bitcoinIconsarrowRightFill {
    height: var(--height-24);
    width: var(--width-24);
    position: relative;
  }
  .talkToAnAgentParent {
    height: 40.8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 3.9px var(--padding-0);
    box-sizing: border-box;
    gap: var(--gap-3);
    color: var(--color-white);
  }
  .talkToAn {
    align-self: stretch;
    position: relative;
  }
  .buttonBackgroundWrapper {
    width: 170px;
    height: var(--height-3);
    display: flex;
    align-items: flex-start;
    padding: var(--padding-0) var(--padding-0) var(--padding-0) var(--padding-1);
    box-sizing: border-box;
  }
  .buttonBackground {
    height: var(--height-3);
    width: var(--width-169);
    position: relative;
    background-color: var(--color-goldenrod);
  }

  @media screen and (max-width: 850px) {
    .heroSection {
      padding: var(--padding-48) 306px 66px 89px;
      box-sizing: border-box;
    }

    .greatFinancingForContainer {
      font-size: 45px;
      max-width: 100%;
    }
  }
  @media screen and (max-width: 450px) {
    .heroSection {
      padding-left: var(--padding-20);
      padding-right: var(--padding-20);
      box-sizing: border-box;
    }

    .rootedInBotswana2 {
      font-size: 17px;
    }

    .greatFinancingForContainer {
      font-size: 27px;
    }

    .exploreAffordableLoan {
      font-size: 17px;
    }

    .heroCtaRow {
      gap: var(--gap-18);
    }

    .talkToAn {
      font-size: var(--fs-18);
    }
  }
</style>
