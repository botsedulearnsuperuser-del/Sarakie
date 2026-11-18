<template>
  <div :class="$style.dashboardSample">
    <Main />
    <main :class="$style.mainContent">
      <header :class="$style.div">
        <div :class="$style.div2">
          <div :class="$style.h2actH">
            <h2 :class="$style.dumelaMarion">Dumela, Innovator</h2>
          </div>
          <div :class="$style.p">
            <div :class="$style.sunday4October">
              Sunday 4 October 2026. Here's your innovation overview.
            </div>
          </div>
        </div>
        <div :class="$style.div3">
          <img
            :class="$style.notifications2New"
            alt=""
            src="/Notifications-2-new.svg"
          />
          <img :class="$style.notifications2New" alt="" src="/Help.svg" />
          <router-link to="/admin-profile" :class="$style.a" style="text-decoration: none;">
            <img :class="$style.userAvatarImg" src="/7 2.png" alt="Kago Molefe" />
            <div :class="$style.span3">
              <div :class="$style.marionLucas">Kago Molefe</div>
            </div>
          </router-link>
        </div>
      </header>
      <section :class="$style.loanCardsRow">
        <ActiveLoan />
        <div :class="$style.topUpOffer">
          <div :class="$style.frame">
            <div :class="$style.photoArea">
              <img
                :class="$style.topUpPattern"
                alt=""
                src="/Untitled-design-3-21@2x.png"
              />
              <img :class="$style.topUpPhoto" alt="" src="/hero-woman.png" />
            </div>
            <div :class="$style.div4">
              <div :class="$style.div5">
                <div :class="$style.h2actH">
                  <div :class="$style.youQualifyFor">
                    Start a new submission
                  </div>
                </div>
                <div :class="$style.div7">
                  <div :class="$style.borrowUpTo">
                    Record a new innovation proposal from idea to funding.
                  </div>
                </div>
              </div>
              <router-link to="/new-loan" :class="$style.agold" style="text-decoration:none;">
                <b :class="$style.ml">Start submission</b>
                <img :class="$style.frameIcon3" alt="" src="/Frame7.svg" />
              </router-link>
            </div>
          </div>
        </div>
      </section>
      <AccountSummary />
      <section :class="$style.divgCalc">
        <Section />
        <div :class="$style.section">
          <div :class="$style.h2actH">
            <h3 :class="$style.recentApplications">Ideas submitted by the innovator</h3>
          </div>
          <div :class="$style.h2actH">
            <Li
              v-for="(item, index) in liItems"
              :key="index"
              :p="item.p"
              :thatoLekgoba="item.thatoLekgoba"
              :september="item.september"
              :p90000="item.p90000"
              :p90000MinWidth="item.p90000MinWidth"
              :p90000Display="item.p90000Display"
            @view="handleViewIdea"
            />
          </div>
        </div>
      </section>
      <section :class="$style.divgCalc2">
        <section :class="$style.section2">
          <div :class="$style.div8">
            <div :class="$style.div9">
              <div :class="$style.h2actH">
                <div :class="$style.loanCalculator">Funding calculator</div>
              </div>
              <div :class="$style.p2">
                <div :class="$style.seeWhatA">
                  Estimate funding and costs before submitting your innovation proposal.
                </div>
              </div>
            </div>
            <div :class="$style.div10">
              <div :class="$style.div11">
                <div :class="$style.marionLucas">Amount</div>
                <h3 :class="$style.p10000">P 10,000</h3>
              </div>
              <div :class="$style.inputcalcAmt">
                <div :class="$style.div12">
                  <div :class="$style.divtrack" />
                </div>
              </div>
              <div :class="$style.div13">
                <div :class="$style.span4">
                  <div :class="$style.ml">P 500</div>
                </div>
                <div :class="$style.span4">
                  <div :class="$style.ml">P 50,000</div>
                </div>
              </div>
            </div>
            <div :class="$style.div14">
              <div :class="$style.div15">
                <div :class="$style.repayOver">Repay over</div>
                <h3 :class="$style.months">12 months</h3>
              </div>
              <div :class="$style.inputcalcAmt">
                <div :class="$style.div12">
                  <div :class="$style.divtrack2" />
                </div>
              </div>
              <div :class="$style.div13">
                <div :class="$style.span4">
                  <div :class="$style.ml">1 month</div>
                </div>
                <div :class="$style.span4">
                  <div :class="$style.ml">60 months</div>
                </div>
              </div>
            </div>
            <div :class="$style.div18">
              <div :class="$style.h2actH">
                <div :class="$style.interestRatePer">
                  Interest rate (per year)
                </div>
              </div>
              <div :class="$style.div19">
                <div :class="$style.button">
                  <div :class="$style.spanscInterp">
                    <b :class="$style.termButtonList">20%</b>
                  </div>
                </div>
                <div :class="$style.button2">
                  <div :class="$style.spanscInterp2">
                    <b :class="$style.b">25%</b>
                  </div>
                </div>
                <div :class="$style.button">
                  <div :class="$style.spanscInterp">
                    <b :class="$style.termButtonList">30%</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div :class="$style.div20">
            <img
              :class="$style.b8dbc1777d73b88cd8d55f299be4pIcon"
              alt=""
              src="/8917b8dbc1777d73b88cd8d55f299be4-png1@2x.png"
            />
            <div :class="$style.div21">
              <div :class="$style.ml">Monthly repayment</div>
            </div>
            <div :class="$style.div22">
              <h2 :class="$style.p95044">P 950.44</h2>
            </div>
            <div :class="$style.div23">
              <div :class="$style.for12Months">for 12 months at 25% a year</div>
            </div>
            <img
              :class="$style.divmarginIcon"
              alt=""
              src="/div-margin1@2x.png"
            />
            <div :class="$style.repaymentBreakdownGroup">
              <div :class="$style.div26">
                <div :class="$style.span8">
                  <div :class="$style.span9" />
                  <div :class="$style.amountBorrowed">Amount borrowed</div>
                </div>
                <div :class="$style.span8">
                  <div :class="$style.span11" />
                  <div :class="$style.ml">Interest</div>
                </div>
              </div>
              <div :class="$style.div27">
                <div :class="$style.div28">
                  <div :class="$style.h2actH">
                    <div :class="$style.totalToRepay">Total to repay</div>
                  </div>
                  <div :class="$style.div30">
                    <b :class="$style.p1140530">P 11,405.30</b>
                  </div>
                </div>
                <div :class="$style.div28">
                  <div :class="$style.h2actH">
                    <div :class="$style.totalToRepay">Total interest</div>
                  </div>
                  <div :class="$style.div30">
                    <b :class="$style.p1140530">P 1,405.30</b>
                  </div>
                </div>
              </div>
            </div>
            <router-link to="/new-loan" :class="$style.agold2" style="text-decoration: none;">
              <b :class="$style.applyFor">Record loan for</b>
              <div :class="$style.spanscInterp4">
                <b :class="$style.p100002">P 10,000</b>
              </div>
              <img :class="$style.frameIcon4" alt="" src="/Frame7.svg" />
            </router-link>
            <div :class="$style.p3">
              <div :class="$style.indicativeOnlyInterest">
                Indicative calculation only. Interest is calculated on the reducing balance;
                <br />
                customer approval depends on affordability assessment and branch limits.
              </div>
            </div>
          </div>
        </section>
        <section :class="$style.section3">
          <div :class="$style.div34">
            <div :class="$style.div35">
              <div :class="$style.h2trackH">
                <h3 :class="$style.applicationsTracker">
                  Application pipeline
                </h3>
              </div>
              <div :class="$style.p4">
                <div :class="$style.ml">
                  SRK-IN-2026-0481. Idea stage, under review
                </div>
              </div>
            </div>
            <div :class="$style.span12">
              <b :class="$style.ml">Under Review</b>
            </div>
          </div>
          <div :class="$style.ol">
            <div :class="$style.li">
              <div :class="$style.div36">
                <div :class="$style.span13">
                  <div :class="$style.spanshadow" />
                  <b :class="$style.stepEmptyList">1</b>
                </div>
                <div :class="$style.span14" />
              </div>
              <div :class="$style.div37">
                <div :class="$style.div38">
                  <b :class="$style.ml">Under Review</b>
                </div>
                <div :class="$style.div39">
                  <div :class="$style.ml">90</div>
                </div>
              </div>
            </div>
            <div :class="$style.li2">
              <div :class="$style.div36">
                <div :class="$style.span15">
                  <b :class="$style.ml">2</b>
                </div>
                <div :class="$style.span14" />
              </div>
              <div :class="$style.div41">
                <div :class="$style.div42">
                  <b :class="$style.ml">Approved</b>
                </div>
                <div :class="$style.div43">
                  <div :class="$style.ml">10</div>
                </div>
              </div>
            </div>
            <div :class="$style.li2">
              <div :class="$style.div36">
                <div :class="$style.span17">
                  <b :class="$style.ml">3</b>
                </div>
                <div :class="$style.span14" />
              </div>
              <div :class="$style.div41">
                <div :class="$style.div47">
                  <b :class="$style.ml">Feedback Required</b>
                </div>
                <div :class="$style.div48">
                  <div :class="$style.ml">3</div>
                </div>
              </div>
            </div>
            <div :class="$style.li2">
              <div :class="$style.div36">
                <div :class="$style.span19">
                  <b :class="$style.ml">4</b>
                </div>
                <div :class="$style.span20" />
              </div>
              <div :class="$style.div41">
                <div :class="$style.div52">
                  <b :class="$style.ml">Awarded</b>
                </div>
                <div :class="$style.div53">
                  <div :class="$style.ml">1</div>
                </div>
              </div>
            </div>
            <div :class="$style.feedbackCallout">
              <div :class="$style.feedbackCalloutTitle">
                Demo feedback on “Feedback Required”
              </div>
              <div :class="$style.feedbackCalloutText">
                “Clarify revenue model &amp; add CIPA reg. number”
              </div>
              <button :class="$style.actionButton" type="button">
                Respond to feedback
              </button>
            </div>
          </div>
        </section>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
  import { ref } from "vue"
  import Main from "../components/Main.vue"
  import ActiveLoan from "../components/ActiveLoan.vue"
  import AccountSummary from "../components/AccountSummary.vue"
  import Section from "../components/Section.vue"
  import Li from "../components/Li.vue"

  const liItems = ref([
    {
      p: "I",
      thatoLekgoba: "Irrigation Kit",
      september: "25 September",
      p90000: " P 900.00",
      p90000MinWidth: "67px",
      p90000Display: "inline-block",
    },
    {
      p: "S",
      thatoLekgoba: "Solar Dryer",
      september: "25 September",
      p90000: " P 1000.00",
      p90000MinWidth: "74px",
      p90000Display: "inline-block",
    },
    {
      p: "E",
      thatoLekgoba: "Edu App",
      september: "2 October",
      p90000: "P 3,000.00",
      p90000MinWidth: "unset",
      p90000Display: "unset",
    },
    {
      p: "A",
      thatoLekgoba: "Agri Drone",
      september: "2 October",
      p90000: "P 6,000.00",
      p90000MinWidth: "unset",
      p90000Display: "unset",
    },
  ])

  const handleViewIdea = (name: string) => {
    window.alert(`Viewing idea: ${name}`)
  }
</script>
<style module>
  .dashboardSample {
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    position: relative;
    background-color: var(--color-floralwhite);
    overflow: hidden;
    display: grid;
    grid-template-columns: 232px minmax(0, 1fr);
    align-items: stretch;
    gap: 0;
    line-height: normal;
    letter-spacing: normal;
  }
  .mainContent {
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    min-width: 0;
    max-width: none;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 28px 36px 40px;
    box-sizing: border-box;
    gap: 20px;
  }
  .div {
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    align-content: center;
    padding: var(--padding-0) 7px;
    box-sizing: border-box;
    gap: var(--gap-0);
    max-width: 100%;
    row-gap: var(--gap-20);
    text-align: left;
    font-size: 40.5px;
    color: var(--color-darkslategray-500);
    font-family: var(--font-inter);
  }
  .div2 {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--gap-6);
    min-width: 0;
    max-width: 100%;
  }
  .dumelaMarion {
    margin: 0;
    position: relative;
    font-size: 36px;
    letter-spacing: -0.84px;
    font-weight: 800;
    font-family: inherit;
  }
  .p {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 100%;
    font-size: var(--fs-16);
    color: var(--color-darkslategray-200);
  }
  .sunday4October {
    position: relative;
    white-space: pre-wrap;
    display: inline-block;
    flex-shrink: 0;
    max-width: 100%;
    box-sizing: border-box;
    padding-right: var(--padding-20);
  }
  .div3 {
    height: var(--height-48);
    display: flex;
    align-items: center;
    gap: var(--gap-10);
    font-size: var(--fs-14);
    color: var(--color-goldenrod-200);
  }
  .notifications2New {
    height: 46px;
    width: 46px;
    position: relative;
    border-radius: 23px;
  }
  .frameIcon {
    position: absolute;
    top: 13.1px;
    left: 13px;
    width: var(--width-20);
    height: var(--height-20);
  }
  .span {
    position: absolute;
    top: 10.1px;
    right: 11px;
    border-radius: 4.5px;
    background-color: var(--color-chocolate);
    border: 2px solid var(--color-white);
    box-sizing: border-box;
    width: var(--width-9);
    height: var(--height-9);
  }
  .a {
    height: var(--height-48);
    border-radius: var(--br-999);
    background-color: var(--color-white);
    border: 1px solid var(--color-lightgray-100);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: var(--padding-5) var(--padding-14) var(--padding-5)
      var(--padding-5);
    gap: 9px;
    min-height: var(--min-h-46);
    cursor: pointer;
    text-decoration: none;
  }
  .userAvatarImg {
    width: 36px;
    height: 36px;
    min-width: 36px;
    border-radius: 50%;
    object-fit: cover;
  }
  .span2 {
    height: 36px;
    width: 36px;
    border-radius: var(--br-18);
    background-color: var(--color-darkslategray-500);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .ml {
    position: relative;
  }
  .span3 {
    height: var(--height-17);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: var(--color-darkslategray-500);
  }
  .marionLucas {
    position: relative;
    font-weight: 600;
  }
  .loanCardsRow {
    align-self: stretch;
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
    align-items: stretch;
    padding: 0;
    box-sizing: border-box;
    gap: 16px;
    max-width: 100%;
    text-align: left;
    font-size: 18.9px;
    color: var(--color-white);
    font-family: var(--font-inter);
  }
  .topUpOffer {
    min-width: 0;
    max-width: none;
    border-radius: var(--br-26);
    background-color: var(--color-white);
    border: var(--border-2);
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    height: 100%;
  }
  .frame {
    align-self: stretch;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    background-color: var(--color-white);
    max-width: 100%;
    height: 100%;
  }
  .photoArea {
    flex: 1;
    width: 100%;
    position: relative;
    overflow: hidden;
    min-height: 220px;
    background-color: var(--color-white);
  }
  .topUpPattern {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 140%;
    height: 140%;
    object-fit: cover;
    opacity: 0.38;
    z-index: 1;
    pointer-events: none;
  }
  .topUpPhoto {
    position: absolute;
    top: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 440px;
    max-width: none;
    height: 400px;
    object-fit: cover;
    object-position: center top;
    z-index: 2;
    pointer-events: none;
  }
  .div4 {
    flex: 0 0 auto;
    position: relative;
    z-index: 3;
    background-color: var(--color-darkslategray-600);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    padding: 16px 24px;
    box-sizing: border-box;
    gap: 16px;
    max-width: 100%;
    border-radius: 0 0 24px 24px;
  }
  .div5 {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--gap-2);
    min-width: 137px;
    max-width: 100%;
  }
  .youQualifyFor {
    position: relative;
    font-weight: 800;
  }
  .div7 {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 100%;
    font-size: var(--fs-14);
    color: var(--color-gainsboro);
  }
  .borrowUpTo {
    position: relative;
    display: inline-block;
    max-width: 100%;
  }
  .agold {
    height: 44px;
    flex-shrink: 0;
    border-radius: var(--br-12);
    background-color: var(--color-goldenrod-200);
    display: flex;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
    gap: var(--gap-8);
    min-height: 44px;
    font-size: var(--fs-14);
    color: var(--color-darkslategray-500);
    cursor: pointer;
    white-space: nowrap;
  }
  .frameIcon3 {
    height: var(--height-16);
    width: var(--width-16);
    position: relative;
  }
  .divgCalc {
    align-self: stretch;
    height: auto;
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.95fr);
    gap: 16px;
    max-width: 100%;
    text-align: left;
    font-size: 20.6px;
    color: var(--color-darkslategray-500);
    font-family: var(--font-inter);
  }
  .divgCalc > :first-child {
    order: 2;
  }
  .divgCalc > :last-child {
    order: 1;
  }
  .section {
    position: relative;
    width: auto;
    inset: auto;
    border-radius: var(--br-26);
    background-color: var(--color-white);
    border: var(--border-2);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 24px 28px;
    gap: var(--gap-16);
    max-width: 100%;
    min-width: 0;
  }
  .h2actH {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .recentApplications {
    margin: 0;
    align-self: stretch;
    position: relative;
    font-size: inherit;
    font-weight: 800;
    font-family: inherit;
  }
  .divgCalc2 {
    align-self: stretch;
    height: auto;
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.95fr);
    gap: 16px;
    max-width: 100%;
  }
  .divgCalc2 > .section2 {
    order: 2;
  }
  .divgCalc2 > .section3 {
    order: 1;
  }
  .section2 {
    position: relative;
    width: auto;
    inset: auto;
    border-radius: var(--br-26);
    background-color: var(--color-white);
    border: var(--border-2);
    box-sizing: border-box;
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.95fr);
    align-items: stretch;
    justify-content: stretch;
    flex-wrap: nowrap;
    padding: 20px 20px;
    gap: 20px;
    max-width: 100%;
    min-width: 0;
    text-align: left;
    font-size: var(--fs-15);
    color: var(--color-darkslategray-700);
    font-family: var(--font-inter);
  }
  .div8 {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }
  .div9 {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 7.1px var(--padding-0);
    gap: var(--gap-6);
    font-size: 24.6px;
    color: var(--color-darkslategray-500);
  }
  .loanCalculator {
    align-self: stretch;
    height: auto;
    position: relative;
    letter-spacing: -0.06px;
    font-weight: 800;
    display: flex;
    align-items: center;
  }
  .p2 {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: var(--fs-15);
    color: var(--color-darkslategray-100);
  }
  .seeWhatA {
    align-self: stretch;
    position: relative;
  }
  .div10 {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--gap-3);
  }
  .div11 {
    align-self: stretch;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding: var(--padding-0) var(--padding-1) var(--padding-0) var(--padding-0);
    gap: var(--gap-0);
    row-gap: var(--gap-20);
  }
  .p10000 {
    margin: 0;
    position: relative;
    font-size: 23.4px;
    font-weight: 800;
    font-family: inherit;
    color: var(--color-darkslategray-500);
  }
  .inputcalcAmt {
    align-self: stretch;
    background-color: var(--color-white);
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  .div12 {
    height: var(--height-28);
    flex: 1;
    position: relative;
  }
  .divtrack {
    position: absolute;
    width: calc(100% - 4px);
    top: 50%;
    right: 0;
    left: 2px;
    height: 8px;
    transform: translateY(-50%);
    border-radius: 999px;
    background: linear-gradient(to right, #013525 0 18%, #e3dccb 18% 100%);
    flex-shrink: 0;
  }
  .divtrack::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 18%;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #013525;
    transform: translate(-50%, -50%);
  }
  .div13 {
    align-self: stretch;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: var(--padding-1) var(--padding-1) var(--padding-1) var(--padding-0);
    gap: var(--gap-0);
    row-gap: var(--gap-20);
    font-size: var(--fs-12);
    color: var(--color-darkslategray-100);
  }
  .span4 {
    height: var(--height-15);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .div14 {
    align-self: stretch;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: var(--gap-3);
  }
  .div15 {
    align-self: stretch;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--gap-0);
    row-gap: var(--gap-20);
  }
  .repayOver {
    position: relative;
    font-weight: 600;
    display: inline-block;
    min-width: 82px;
    flex-shrink: 0;
  }
  .months {
    margin: 0;
    position: relative;
    font-size: 22.9px;
    font-weight: 800;
    font-family: inherit;
    color: var(--color-darkslategray-500);
    display: inline-block;
    min-width: 118px;
    flex-shrink: 0;
  }
  .divtrack2 {
    position: absolute;
    width: calc(100% - 4px);
    top: 50%;
    right: 0;
    left: 2px;
    height: 8px;
    transform: translateY(-50%);
    border-radius: 999px;
    background: linear-gradient(to right, #013525 0 20%, #e3dccb 20% 100%);
    flex-shrink: 0;
  }
  .divtrack2::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 20%;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #013525;
    transform: translate(-50%, -50%);
  }
  .div18 {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--gap-10);
  }
  .interestRatePer {
    align-self: stretch;
    position: relative;
    font-weight: 600;
  }
  .div19 {
    align-self: stretch;
    display: flex;
    align-items: flex-start;
    gap: var(--gap-8);
    font-size: var(--fs-17);
    color: var(--color-darkslategray-500);
  }
  .button {
    height: 44px;
    flex: 1;
    border-radius: var(--br-12);
    background-color: var(--color-white);
    border: 1px solid var(--color-silver-100);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    cursor: pointer;
  }
  .spanscInterp {
    width: var(--width-40);
    height: 21px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  .termButtonList {
    position: relative;
    display: inline-block;
    min-width: var(--min-w-40);
  }
  .button2 {
    height: 44px;
    flex: 1;
    border-radius: var(--br-12);
    background-color: var(--color-darkslategray-500);
    border: 1px solid var(--color-darkslategray-500);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    cursor: pointer;
    color: var(--color-white);
  }
  .spanscInterp2 {
    width: 39px;
    height: 21px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  .b {
    position: relative;
    display: inline-block;
    min-width: 39px;
  }
  .div20 {
    height: auto;
    min-height: 100%;
    flex: 1;
    border-radius: 20px;
    background-color: var(--color-darkslategray-500);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    padding: 18px 16px 16px;
    box-sizing: border-box;
    position: relative;
    isolation: isolate;
    gap: 10px;
    min-width: 0;
    font-size: var(--fs-14);
    color: var(--color-gainsboro);
  }
  .b8dbc1777d73b88cd8d55f299be4pIcon {
    width: 88px;
    height: 100%;
    position: absolute;
    margin: 0 !important;
    top: 0;
    right: -22px;
    object-fit: cover;
    object-position: center top;
    opacity: 0.85;
    mix-blend-mode: screen;
    z-index: 0;
    pointer-events: none;
    flex-shrink: 0;
  }
  .div21 {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: none;
    z-index: 3;
    flex-shrink: 0;
  }
  .div22 {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: none;
    z-index: 4;
    flex-shrink: 0;
    font-size: 36px;
    color: var(--color-goldenrod-200);
  }
  .p95044 {
    margin: 0;
    position: relative;
    font-size: inherit;
    line-height: 1.1;
    font-weight: 800;
    font-family: inherit;
    display: inline-block;
    min-width: 0;
    flex-shrink: 0;
  }
  .div23 {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: none;
    z-index: 5;
    flex-shrink: 0;
    font-size: var(--fs-13);
  }
  .for12Months {
    position: relative;
    display: inline-block;
    min-width: 172px;
    flex-shrink: 0;
  }
  .divmarginIcon {
    width: 100%;
    max-width: 100%;
    height: 10px;
    position: relative;
    margin: 8px 0 0;
    object-fit: cover;
    z-index: 2;
    flex-shrink: 0;
    border-radius: 999px;
  }
  .div24 {
    position: absolute;
    width: 100%;
    top: 7.99px;
    right: 0px;
    left: 0px;
    border-radius: var(--br-999);
    background-color: var(--color-goldenrod-200);
    height: var(--height-10);
    overflow: hidden;
  }
  .div25 {
    position: absolute;
    height: 100%;
    width: 87.74%;
    top: 0px;
    right: 12.26%;
    bottom: 0px;
    left: 0%;
    background-color: var(--color-white);
  }
  .repaymentBreakdownGroup {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 12px 0 0;
    box-sizing: border-box;
    gap: 10px;
    max-width: none;
    z-index: 5;
    flex-shrink: 0;
    font-size: var(--fs-12);
  }
  .div26 {
    align-self: stretch;
    display: flex;
    align-items: flex-start;
    gap: var(--gap-16);
  }
  .span8 {
    height: var(--height-15);
    display: flex;
    align-items: center;
    gap: var(--gap-6);
    flex-shrink: 0;
  }
  .span9 {
    height: var(--height-10);
    width: var(--width-10);
    position: relative;
    border-radius: var(--br-3);
    background-color: var(--color-white);
  }
  .amountBorrowed {
    position: relative;
    display: inline-block;
    min-width: 102px;
  }
  .span11 {
    height: var(--height-10);
    width: var(--width-10);
    position: relative;
    border-radius: var(--br-3);
    background-color: var(--color-goldenrod-200);
  }
  .div27 {
    align-self: stretch;
    border-top: 1px solid var(--color-gray-300);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: var(--padding-14) var(--padding-0) var(--padding-0);
    gap: var(--gap-12);
  }
  .div28 {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--gap-2);
  }
  .totalToRepay {
    width: 100%;
    position: relative;
    display: inline-block;
    max-width: none;
  }
  .div30 {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: var(--fs-16);
    color: var(--color-white);
  }
  .p1140530 {
    width: 100%;
    height: auto;
    position: relative;
    display: flex;
    align-items: center;
    max-width: none;
    white-space: nowrap;
  }
  .agold2 {
    width: 100%;
    height: 48px;
    margin: 8px 0 0;
    position: relative;
    bottom: auto;
    left: auto;
    border-radius: var(--br-12);
    background-color: var(--color-goldenrod-200);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    box-sizing: border-box;
    gap: 8px;
    min-height: 48px;
    z-index: 6;
    flex-shrink: 0;
    font-size: var(--fs-15);
    color: var(--color-darkslategray-500);
    cursor: pointer;
    white-space: nowrap;
  }
  .applyFor {
    position: relative;
    display: inline-block;
    min-width: 73px;
    flex-shrink: 0;
  }
  .spanscInterp4 {
    height: 19px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-shrink: 0;
  }
  .p100002 {
    position: relative;
    display: inline-block;
    min-width: 70px;
  }
  .frameIcon4 {
    height: var(--height-18);
    width: var(--width-18);
    position: relative;
    flex-shrink: 0;
  }
  .p3 {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: none;
    z-index: 7;
    flex-shrink: 0;
    font-size: 11px;
    color: var(--color-silver-200);
  }
  .indicativeOnlyInterest {
    position: relative;
    line-height: 16px;
    display: inline-block;
    min-width: 0;
    max-width: 100%;
    flex-shrink: 0;
  }
  .section3 {
    position: relative;
    width: auto;
    inset: auto;
    border-radius: var(--br-26);
    background-color: var(--color-white);
    border: var(--border-2);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 24px 28px 28px;
    gap: 22px;
    max-width: 100%;
    min-width: 0;
    text-align: left;
    font-size: 20.8px;
    color: var(--color-darkslategray-500);
    font-family: var(--font-inter);
  }
  .div34 {
    align-self: stretch;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: var(--gap-0);
    row-gap: var(--gap-20);
  }
  .div35 {
    height: 46px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--gap-4);
  }
  .h2trackH {
    width: 211px;
    height: 25px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .applicationsTracker {
    margin: 0;
    position: relative;
    font-size: inherit;
    font-weight: 800;
    font-family: inherit;
  }
  .p4 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: var(--fs-14);
    color: var(--color-darkslategray-100);
  }
  .span12 {
    height: 25px;
    border-radius: var(--br-999);
    background-color: var(--color-blanchedalmond);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--padding-5) var(--padding-12);
    box-sizing: border-box;
    font-size: var(--fs-12);
    color: var(--color-saddlebrown);
  }
  .ol {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: var(--fs-13);
    color: var(--color-white);
  }
  .li {
    align-self: stretch;
    display: flex;
    align-items: flex-start;
    gap: var(--gap-14);
    color: var(--color-darkslategray-500);
  }
  .div36 {
    height: var(--height-52);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .span13 {
    width: var(--width-28);
    border-radius: var(--br-14);
    background-color: var(--color-goldenrod-200);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--padding-6) var(--padding-0);
    box-sizing: border-box;
    position: relative;
    isolation: isolate;
  }
  .spanshadow {
    width: 100%;
    height: 100%;
    position: absolute;
    margin: 0 !important;
    top: 0.1px;
    right: 0px;
    bottom: -0.1px;
    left: 0px;
    box-shadow: 0px 0px 0px 4px var(--color-blanchedalmond);
    border-radius: var(--br-14);
    background-color: var(--color-gray-200);
    z-index: 0;
    flex-shrink: 0;
  }
  .stepEmptyList {
    position: relative;
    z-index: 1;
    flex-shrink: 0;
  }
  .span14 {
    width: 2px;
    height: var(--height-24);
    position: relative;
    background-color: var(--color-antiquewhite-200);
    min-height: var(--min-h-18);
  }
  .div37 {
    height: var(--height-52);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--padding-0) var(--padding-0) var(--padding-16);
    box-sizing: border-box;
    gap: var(--gap-2);
    font-size: var(--fs-15);
  }
  .div38 {
    width: auto;
    min-width: 71px;
    height: var(--height-18);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .div39 {
    width: 71px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: var(--fs-13);
    color: var(--color-darkslategray-100);
  }
  .li2 {
    align-self: stretch;
    display: flex;
    align-items: flex-start;
    gap: var(--gap-14);
  }
  .span15 {
    width: var(--width-28);
    border-radius: var(--br-14);
    background-color: var(--color-limegreen);
    border: 1px solid var(--color-lightgray-200);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--padding-5) var(--padding-0);
  }
  .div41 {
    height: var(--height-52);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--padding-0) var(--padding-0) var(--padding-16);
    box-sizing: border-box;
    gap: var(--gap-2);
    font-size: var(--fs-15);
    color: var(--color-gray-100);
  }
  .div42 {
    width: var(--width-72);
    height: var(--height-18);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .div43 {
    width: var(--width-72);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: var(--fs-13);
    color: var(--color-darkslategray-100);
  }
  .span17 {
    width: var(--width-28);
    border-radius: var(--br-14);
    background-color: var(--color-chocolate);
    border: 1px solid var(--color-lightgray-200);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--padding-5) var(--padding-0);
  }
  .div47 {
    width: auto;
    min-width: 65px;
    height: var(--height-18);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .div48 {
    width: 65px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: var(--fs-13);
    color: var(--color-darkslategray-100);
  }
  .feedbackCallout {
    align-self: stretch;
    margin-top: 12px;
    padding: 12px 14px;
    border-radius: 12px;
    background-color: var(--color-blanchedalmond);
    border: 1px solid var(--color-goldenrod-200);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
  .feedbackCalloutTitle {
    font-size: var(--fs-13);
    font-weight: 700;
    color: var(--color-saddlebrown);
  }
  .feedbackCalloutText {
    font-size: var(--fs-13);
    color: var(--color-darkslategray-500);
    font-style: italic;
    line-height: 1.4;
  }
  .actionButton {
    margin-top: 4px;
    height: 36px;
    border-radius: 10px;
    background-color: var(--color-darkslategray-500);
    color: var(--color-white);
    border: none;
    padding: 0 14px;
    font-size: var(--fs-13);
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.15s;
  }
  .actionButton:hover {
    background-color: var(--color-darkslategray-600);
  }
  .actionButton:active {
    transform: translateY(1px);
  }
  .span19 {
    width: var(--width-28);
    border-radius: var(--br-14);
    background-color: var(--color-blueviolet);
    border: 1px solid var(--color-lightgray-200);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--padding-5) var(--padding-0);
  }
  .span20 {
    height: var(--height-24);
    position: relative;
    min-height: var(--min-h-18);
  }
  .div52 {
    width: auto;
    min-width: 74px;
    height: var(--height-18);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .div53 {
    width: 74px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: var(--fs-13);
    color: var(--color-darkslategray-100);
  }

  @media screen and (max-width: 1200px) {
    .mainContent {
      padding: 24px 20px 32px;
      box-sizing: border-box;
      max-width: 100%;
    }
    .section2 {
      grid-template-columns: 1fr;
    }
  }
  @media screen and (max-width: 1100px) {
    .dashboardSample {
      grid-template-columns: 1fr;
    }
    .loanCardsRow,
    .divgCalc,
    .divgCalc2 {
      grid-template-columns: 1fr;
    }
  }
  @media screen and (max-width: 1050px) {
    .mainContent {
      padding-top: var(--padding-20);
      padding-bottom: var(--padding-20);
      box-sizing: border-box;
    }

    .p95044 {
      font-size: 32px;
      line-height: 1.1;
    }
  }
  @media screen and (max-width: 750px) {
    .dashboardSample {
      gap: 0;
    }

    .topUpOffer {
      max-width: 100%;
    }
    .div4 {
      flex-wrap: wrap;
    }
  }
  @media screen and (max-width: 450px) {
    .frame {
      padding-top: 196px;
      box-sizing: border-box;
    }

    .recentApplications {
      font-size: var(--fs-16);
    }

    .loanCalculator {
      font-size: 20px;
    }

    .p10000 {
      font-size: var(--fs-19);
    }

    .months {
      font-size: var(--fs-18);
    }

    .div20 {
      flex: 1;
    }

    .p95044 {
      font-size: 27px;
      line-height: var(--lh-28);
    }

    .applicationsTracker {
      font-size: var(--fs-17);
    }
  }
</style>
