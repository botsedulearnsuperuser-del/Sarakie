<template>
  <section :class="$style.loanCard">
    <img :class="$style.loanCardChild" alt="" src="/Group-2.svg" />
    <h2 :class="$style.loanConsolidation">Loan Consolidation</h2>
    <div :class="$style.loanCardInner">
      <div :class="$style.frameWrapper">
        <div :class="$style.talkToAnAgentParent">
          <div :class="$style.talkToAn">Talk to an Agent</div>
          <div :class="$style.actionShape" />
        </div>
      </div>
    </div>
    <div :class="$style.aHelpingHandForLifesImmeWrapper">
      <div :class="$style.aHelpingHand">
        A helping hand for life`s immediate
        <br />
        needs.
      </div>
    </div>
    <img
      :class="$style.untitledDesign32"
      alt=""
      src="/untitled-3-21.webp"
    />
  </section>
</template>
<style module>
.loanCard {
  width: 427px;
  margin: 0 !important;
  position: absolute;
  top: calc(50% - 142.5px);
  right: 63px;
  border-radius: var(--br-44);
  background-color: var(--color-snow);
  border: var(--border-1);
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: var(--padding-38) 138px var(--padding-38) var(--padding-31);
  isolation: isolate;
  gap: var(--gap-21);
  max-width: 100%;
  z-index: 2;
  flex-shrink: 0;
  text-align: left;
  font-size: var(--fs-22);
  color: var(--color-darkslategray-600);
  font-family: var(--font-inter);
}
.loanCardChild {
  width: var(--width-85);
  height: var(--height-84);
  position: relative;
  z-index: 3;
  flex-shrink: 0;
}
.loanConsolidation {
  margin: 0;
  align-self: stretch;
  position: relative;
  font-size: var(--fs-26);
  font-weight: 900;
  font-family: inherit;
  z-index: 4;
  flex-shrink: 0;
}
.loanCardInner {
  width: 251.8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 107px var(--padding-0) 21px;
  box-sizing: border-box;
  z-index: 5;
  flex-shrink: 0;
}
.frameWrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 251.8px;
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
.actionShape {
  align-self: stretch;
  height: var(--height-3);
  position: relative;
  background-color: var(--color-goldenrod-300);
  z-index: 1;
}
.aHelpingHandForLifesImmeWrapper {
  width: 276.9px;
  margin: 0 !important;
  position: absolute;
  top: calc(50% - 3px);
  left: 31px;
  display: flex;
  align-items: flex-start;
  z-index: 1;
  flex-shrink: 0;
}
.aHelpingHand {
  position: relative;
  display: inline-block;
  max-width: 119%;
  flex-shrink: 0;
}
.untitledDesign32 {
  width: var(--width-209_4);
  position: absolute;
  margin: 0 !important;
  right: -90.3px;
  bottom: -47.7px;
  max-height: 100%;
  object-fit: contain;
  z-index: 2;
  flex-shrink: 0;
}

@media screen and (max-width: 450px) {
  .loanConsolidation {
    font-size: var(--fs-21);
  }

  .talkToAn {
    font-size: var(--fs-18);
  }

  .aHelpingHand {
    font-size: var(--fs-18);
  }
}
</style>
