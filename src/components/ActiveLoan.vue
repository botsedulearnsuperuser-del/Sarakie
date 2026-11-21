<template>
  <div :class="$style.activeLoan">
    <img
      :class="$style.b8dbc1777d73b88cd8d55f299be4pIcon"
      alt=""
      src="/pattern-3.webp"
    />
    <div :class="$style.div">
      <div :class="$style.div2">
        <div :class="$style.span">
          <div :class="$style.longTermLoans">Active Proposals</div>
        </div>
        <button
          :class="$style.span2"
          type="button"
          @click="viewDrafts"
        >
          <span :class="$style.longTermLoans">Draft Proposals</span>
        </button>
      </div>
      <div :class="$style.divmargin">
        <div :class="$style.div3">
          <div :class="$style.valueOfCurrent">
            Milestone progress on active proposals
          </div>
        </div>
      </div>
      <div :class="$style.div4">
        <h1 :class="$style.p14793">68</h1>
        <div :class="$style.div5">
          <h2 :class="$style.h2">%</h2>
        </div>
      </div>
      <div :class="$style.div6">
        <div :class="$style.valueOfCurrent">
          of milestones reported on time, reviewed every 3 months
        </div>
      </div>
      <img
        :class="$style.divmarginIcon"
        loading="lazy"
        alt=""
        src="/div-margin.webp"
      />
      <div :class="$style.div7">
        <div :class="$style.span3">
          <div :class="$style.repaymentsDueSoon">6 milestones due soon</div>
        </div>
        <div :class="$style.span3">
          <div :class="$style.repaymentsDueSoon">
            Final milestone March 2028
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.div8">
      <div :class="$style.div9">
        <div :class="$style.div3">
          <b :class="$style.valueOfCurrent">Next milestone on 25 October</b>
        </div>
        <div :class="$style.div11">
          <div :class="$style.debitOrderFrom">
            Review notes from the CEDA portal
          </div>
        </div>
      </div>
      <div :class="$style.div12">
        <div :class="$style.agold" role="button" tabindex="0" @click="reviewNow" @keyup.enter="reviewNow">
          <b :class="$style.payEarly">Update progress</b>
        </div>
        <div :class="$style.a" role="button" tabindex="0" @click="viewProposal" @keyup.enter="viewProposal">
          <div :class="$style.longTermLoans">View proposal</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function reviewNow() {
  router.push({ name: "IdeaView", query: { name: "Irrigation Kit" } });
}

function viewProposal() {
  router.push({ name: "IdeaView", query: { name: "Irrigation Kit" } });
}

function viewDrafts() {
  router.push({ name: "IdeaView", query: { name: "Irrigation Kit Draft" } });
}
</script>
<style module>
  .activeLoan {
    flex: 1;
    border-radius: var(--br-26);
    background-color: var(--color-darkslategray-500);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 24px 28px;
    box-sizing: border-box;
    position: relative;
    isolation: isolate;
    gap: var(--gap-20);
    min-width: 0;
    min-height: 320px;
    max-width: 100%;
    text-align: left;
    font-size: var(--fs-13);
    color: var(--color-gainsboro);
    font-family: var(--font-inter);
  }
  .b8dbc1777d73b88cd8d55f299be4pIcon {
    width: 110px;
    height: 120%;
    position: absolute;
    margin: 0 !important;
    top: -24px;
    right: -28px;
    object-fit: cover;
    object-position: center top;
    opacity: 0.9;
    mix-blend-mode: screen;
    z-index: 0;
    pointer-events: none;
    flex-shrink: 0;
  }
  .div {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2px 88px 2px 0;
    gap: var(--gap-6);
    z-index: 1;
    flex-shrink: 0;
  }
  .div2 {
    align-self: stretch;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    align-content: center;
    gap: var(--gap-10);
    color: var(--color-goldenrod-200);
  }
  .span {
    height: var(--height-26);
    border-radius: var(--br-999);
    border: 1px solid var(--color-goldenrod-200);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--padding-4) var(--padding-10) var(--padding-4)
      var(--padding-11);
  }
  .longTermLoans {
    position: relative;
    font-weight: 600;
  }
  .span2 {
    height: var(--height-26);
    border-radius: var(--br-999);
    border: 1px solid var(--color-goldenrod-200);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: var(--padding-4) var(--padding-12);
    background-color: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
  }
  .span2:hover,
  .span2:focus-visible {
    background-color: var(--color-goldenrod-200);
    color: var(--color-darkslategray-500);
    outline: none;
  }
  .span2:focus-visible {
    box-shadow: 0 0 0 3px rgba(238, 194, 75, 0.45);
  }
  .divmargin {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--padding-14) var(--padding-0) var(--padding-0);
    font-size: var(--fs-15);
  }
  .div3 {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .valueOfCurrent {
    align-self: stretch;
    position: relative;
  }
  .div4 {
    align-self: stretch;
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    align-content: flex-end;
    font-size: 62px;
    color: var(--color-white);
  }
  .p14793 {
    margin: 0;
    position: relative;
    font-size: inherit;
    letter-spacing: -1.28px;
    line-height: var(--lh-64);
    font-weight: 800;
    font-family: inherit;
    z-index: 1;
  }
  .div5 {
    flex: 1;
    display: flex;
    align-items: flex-start;
    padding: var(--padding-0) var(--padding-0) 3.4px;
    box-sizing: border-box;
    min-width: 57px;
    z-index: 2;
    margin-left: 2px;
    position: relative;
    font-size: 35.2px;
    color: var(--color-goldenrod-200);
  }
  .h2 {
    margin: 0;
    flex: 1;
    position: relative;
    font-size: inherit;
    letter-spacing: -1.28px;
    line-height: 35.2px;
    font-weight: 800;
    font-family: inherit;
  }
  .div6 {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: var(--fs-15);
  }
  .divmarginIcon {
    align-self: stretch;
    height: var(--height-30);
    position: relative;
    max-width: 100%;
    overflow: hidden;
    flex-shrink: 0;
    object-fit: cover;
  }
  .div7 {
    align-self: stretch;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--gap-0);
    row-gap: var(--gap-20);
  }
  .span3 {
    height: var(--height-16);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .repaymentsDueSoon {
    position: relative;
  }
  .div8 {
    align-self: stretch;
    border-radius: var(--br-18);
    background-color: var(--color-darkslategray-400);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    align-content: center;
    padding: var(--padding-16) var(--padding-18);
    gap: var(--gap-16);
    z-index: 2;
    flex-shrink: 0;
    font-size: var(--fs-17);
    color: var(--color-white);
  }
  .spanIcon {
    height: var(--height-44);
    width: 44px;
    position: relative;
    border-radius: var(--br-12);
  }
  .div9 {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--gap-2);
    min-width: 86px;
  }
  .div11 {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: var(--fs-13);
    color: var(--color-gainsboro);
  }
  .debitOrderFrom {
    width: 100%;
    position: relative;
    display: inline-block;
    max-width: 215px;
  }
  .div12 {
    height: auto;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    gap: var(--gap-10);
    font-size: var(--fs-14);
    color: var(--color-darkslategray-500);
  }
  .agold {
    height: 40px;
    border-radius: var(--br-12);
    background-color: var(--color-goldenrod-200);
    display: flex;
    align-items: center;
    padding: 0 14px;
    box-sizing: border-box;
    min-height: 40px;
    cursor: pointer;
    white-space: nowrap;
  }
  .payEarly {
    position: relative;
    display: inline-block;
    min-width: var(--min-w-64);
  }
  .a {
    height: 40px;
    border-radius: var(--br-12);
    border: 1px solid var(--color-gray-400);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0 14px;
    min-height: 40px;
    color: var(--color-white);
    cursor: pointer;
    white-space: nowrap;
  }

  @media screen and (max-width: 1050px) {
    .p14793 {
      font-size: 50px;
      line-height: 51px;
    }

    .h2 {
      font-size: var(--fs-28);
      line-height: var(--lh-28);
    }
  }
  @media screen and (max-width: 750px) {
    .activeLoan {
      flex: 1;
      padding: 18px 16px;
      border-radius: 20px;
      min-height: 0;
    }

    .div {
      padding-right: 76px;
      box-sizing: border-box;
    }
  }
  @media screen and (max-width: 450px) {
    .div {
      padding-right: 60px;
      box-sizing: border-box;
    }

    .p14793 {
      font-size: var(--fs-37);
      line-height: 38px;
    }

    .h2 {
      font-size: var(--fs-21);
      line-height: 21px;
    }

    .div7 {
      flex-wrap: wrap;
    }
  }
</style>
