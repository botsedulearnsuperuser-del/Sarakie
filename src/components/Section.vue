<template>
  <div :class="$style.section">
    <div :class="$style.h2balH">
      <h3 :class="$style.totalLoansEach">Total submissions each month</h3>
    </div>
    <div :class="$style.p">
      <div :class="$style.longTermLoan">
        Innovation submission counts after each review, 2026
      </div>
    </div>
    <div :class="$style.div">
      <div :class="$style.div2">
        <div :class="$style.span">
          <div :class="$style.graphGridValues">80</div>
        </div>
        <div :class="$style.div3" />
      </div>
      <div :class="$style.div4">
        <div :class="$style.span2">
          <div :class="$style.graphGridValues">70</div>
        </div>
        <div :class="$style.div6" />
      </div>
      <div :class="$style.div7">
        <div :class="$style.span">
          <div :class="$style.graphGridValues">60</div>
        </div>
        <div :class="$style.div9" />
      </div>
      <div :class="$style.div10">
        <div :class="$style.span">
          <div :class="$style.graphGridValues">50</div>
        </div>
        <div :class="$style.div12" />
      </div>
      <div :class="$style.div13">
        <div :class="$style.span">
          <div :class="$style.graphGridValues">40</div>
        </div>
        <div :class="$style.div15" />
      </div>
      <div :class="$style.div16">
        <div :class="$style.span">
          <div :class="$style.graphGridValues">38</div>
        </div>
        <div :class="$style.div18" />
      </div>
    </div>
    <div :class="$style.div19">
      <div :class="$style.span7">
        <div :class="$style.apr">Apr</div>
      </div>
      <div :class="$style.span7">
        <div :class="$style.apr">May</div>
      </div>
      <div :class="$style.span7">
        <div :class="$style.apr">Jun</div>
      </div>
      <div :class="$style.span7">
        <div :class="$style.apr">Jul</div>
      </div>
      <div :class="$style.span7">
        <div :class="$style.apr">Aug</div>
      </div>
      <div :class="$style.span7">
        <div :class="$style.apr">Sep</div>
      </div>
    </div>
  </div>
</template>
<style module>
  .section {
    position: relative;
    width: auto;
    inset: auto;
    height: 100%;
    border-radius: var(--br-26);
    background-color: var(--color-white);
    border: var(--border-2);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 24px 24px 20px;
    gap: var(--gap-4);
    max-width: 100%;
    min-width: 0;
    text-align: left;
    font-size: 20.8px;
    color: var(--color-darkslategray-100);
    font-family: var(--font-inter);
  }
  .h2balH {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: var(--color-darkslategray-500);
  }
  .totalLoansEach {
    margin: 0;
    align-self: stretch;
    position: relative;
    font-size: inherit;
    font-weight: 800;
    font-family: inherit;
  }
  .p {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: var(--fs-14);
  }
  .longTermLoan {
    align-self: stretch;
    position: relative;
  }
  .div {
    align-self: stretch;
    border-bottom: var(--border-2);
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: var(--padding-18) var(--padding-0) var(--padding-0);
    gap: var(--gap-20);
    font-size: var(--fs-12);
    color: var(--color-darkslategray-300);
  }
  .div2 {
    align-self: stretch;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--gap-6);
    max-width: none;
  }
  .span {
    width: var(--width-16);
    height: var(--height-15);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-shrink: 0;
  }
  .graphGridValues {
    position: relative;
    font-weight: 600;
  }
  .div3 {
    width: 100%;
    height: 188px;
    position: relative;
    border-radius: var(--br-10) var(--br-10) var(--br-0) var(--br-0);
    background-color: var(--color-darkslategray-500);
    max-width: none;
    flex-shrink: 0;
  }
  .div4 {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 6.2px var(--padding-0) var(--padding-0);
    box-sizing: border-box;
    gap: var(--gap-6);
    max-width: none;
  }
  .span2 {
    width: var(--width-15);
    height: var(--height-15);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-shrink: 0;
  }
  .div6 {
    width: 100%;
    height: 181.8px;
    position: relative;
    border-radius: var(--br-10) var(--br-10) var(--br-0) var(--br-0);
    background-color: var(--color-darkslategray-500);
    max-width: none;
    flex-shrink: 0;
  }
  .div7 {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12.4px var(--padding-0) var(--padding-0);
    box-sizing: border-box;
    gap: var(--gap-6);
    max-width: none;
  }
  .div9 {
    width: 100%;
    height: 175.6px;
    position: relative;
    border-radius: var(--br-10) var(--br-10) var(--br-0) var(--br-0);
    background-color: var(--color-darkslategray-500);
    max-width: none;
    flex-shrink: 0;
  }
  .div10 {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 18.7px var(--padding-0) var(--padding-0);
    box-sizing: border-box;
    gap: var(--gap-6);
    max-width: none;
  }
  .div12 {
    width: 100%;
    height: 169.3px;
    position: relative;
    border-radius: var(--br-10) var(--br-10) var(--br-0) var(--br-0);
    background-color: var(--color-darkslategray-500);
    max-width: none;
    flex-shrink: 0;
  }
  .div13 {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 27.1px var(--padding-0) var(--padding-0);
    box-sizing: border-box;
    gap: var(--gap-6);
    max-width: none;
  }
  .div15 {
    width: 100%;
    height: 160.9px;
    position: relative;
    border-radius: var(--br-10) var(--br-10) var(--br-0) var(--br-0);
    background-color: var(--color-darkslategray-500);
    max-width: none;
    flex-shrink: 0;
  }
  .div16 {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 33.3px var(--padding-0) var(--padding-0);
    box-sizing: border-box;
    gap: var(--gap-6);
    max-width: none;
  }
  .div18 {
    width: 100%;
    height: 154.7px;
    position: relative;
    border-radius: var(--br-10) var(--br-10) var(--br-0) var(--br-0);
    background-color: var(--color-goldenrod-200);
    max-width: none;
    flex-shrink: 0;
  }
  .div19 {
    align-self: stretch;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: var(--padding-4) var(--padding-0) var(--padding-0);
    gap: var(--gap-20);
    font-size: var(--fs-13);
  }
  .span7 {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: none;
  }
  .apr {
    position: relative;
  }

  @media screen and (max-width: 450px) {
    .totalLoansEach {
      font-size: var(--fs-17);
    }

    .div {
      flex-wrap: wrap;
    }

    .div19 {
      flex-wrap: wrap;
    }
  }
</style>
