<template>
  <section :class="$style.accountSummary">
    <div :class="$style.div">
      <div :class="$style.div2">
        <div :class="$style.repaidSoFar">Submitted so far</div>
      </div>
      <div :class="$style.div3">
        <h2 :class="$style.p1789192">P 17,891.92</h2>
      </div>
      <div :class="$style.div4">
        <div :class="$style.repaidSoFar">18 proposals submitted so far</div>
      </div>
    </div>
    <div :class="$style.div5">
      <div :class="$style.div2">
        <div :class="$style.totalRepaymentsDue">Applications in review</div>
      </div>
      <div :class="$style.div7">
        <h2 :class="$style.p1789192">18 of 18</h2>
      </div>
      <div :class="$style.div8">
        <div :class="$style.span" />
        <div :class="$style.span" />
        <div :class="$style.span" />
        <div :class="$style.span" />
        <div :class="$style.span" />
        <div :class="$style.span" />
        <div :class="$style.span" />
        <div :class="$style.span" />
        <div :class="$style.span" />
        <div :class="$style.span" />
        <div :class="$style.span" />
        <div :class="$style.span" />
        <div :class="$style.span" />
        <div :class="$style.span" />
        <div :class="$style.span" />
        <div :class="$style.span" />
        <div :class="$style.span" />
        <div :class="$style.span" />
      </div>
    </div>
    <div :class="$style.div9">
      <div :class="$style.div2">
        <div :class="$style.repaidSoFar">Approved to date</div>
      </div>
      <div :class="$style.div11">
        <h2 :class="$style.h2">10</h2>
      </div>
      <div :class="$style.div4">
        <div :class="$style.repaidSoFar">Awarded, submitted 2 October</div>
      </div>
    </div>
  </section>
</template>
<style module>
  .accountSummary {
    width: 100%;
    border-radius: var(--br-22);
    background-color: var(--color-white);
    border: var(--border-2);
    box-sizing: border-box;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    max-width: none;
    row-gap: var(--gap-20);
    text-align: left;
    font-size: var(--fs-14);
    color: var(--color-darkslategray-100);
    font-family: var(--font-inter);
  }
  .div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--padding-20) var(--padding-24);
    box-sizing: border-box;
    gap: var(--gap-4);
    min-width: var(--min-w-286);
    max-width: 100%;
  }
  .div2 {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .repaidSoFar {
    align-self: stretch;
    position: relative;
  }
  .div3 {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--padding-2) var(--padding-0) var(--padding-0);
    font-size: 26.7px;
    color: var(--color-darkslategray-500);
  }
  .p1789192 {
    margin: 0;
    align-self: stretch;
    position: relative;
    font-size: inherit;
    font-weight: 800;
    font-family: inherit;
  }
  .div4 {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: var(--fs-13);
  }
  .div5 {
    flex: 1;
    border-left: var(--border-2);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--padding-20) var(--padding-24) 21px;
    gap: var(--gap-6);
    min-width: var(--min-w-286);
    max-width: 100%;
  }
  .totalRepaymentsDue {
    align-self: stretch;
    position: relative;
    white-space: pre-wrap;
  }
  .div7 {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 25.7px;
    color: var(--color-darkslategray-500);
  }
  .div8 {
    align-self: stretch;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;
    padding: var(--padding-4) var(--padding-0) var(--padding-0);
    gap: var(--gap-3);
  }
  .span {
    height: var(--height-9);
    width: var(--width-9);
    position: relative;
    border-radius: var(--br-3);
    background-color: var(--color-seagreen);
  }
  .div9 {
    flex: 1;
    border-left: var(--border-2);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--padding-20) var(--padding-24);
    gap: var(--gap-4);
    min-width: var(--min-w-286);
    max-width: 100%;
  }
  .div11 {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--padding-2) var(--padding-0) var(--padding-0);
    font-size: 27.2px;
    color: var(--color-darkslategray-500);
  }
  .h2 {
    margin: 0;
    align-self: stretch;
    position: relative;
    font-size: inherit;
    font-weight: 800;
    font-family: inherit;
  }

  @media screen and (max-width: 1200px) {
    .accountSummary {
      max-width: 100%;
    }
  }
  @media screen and (max-width: 1050px) {
    .accountSummary {
      flex-wrap: wrap;
    }
  }
  @media screen and (max-width: 750px) {
    .accountSummary {
      flex-direction: column;
      flex-wrap: nowrap;
      row-gap: 0;
      border-radius: 20px;
    }

    .div,
    .div5,
    .div9 {
      width: 100%;
      min-width: 0;
      padding: 14px 16px;
    }

    .div5,
    .div9 {
      border-left: none;
      border-top: var(--border-2);
    }
  }
  @media screen and (max-width: 450px) {
    .p1789192 {
      font-size: var(--fs-21);
    }

    .h2 {
      font-size: var(--fs-22);
    }
  }
</style>
