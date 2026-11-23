<template>
  <footer :class="$style.landingPageInner">
    <div :class="$style.untitledDesign23Parent">
      <div :class="$style.untitledDesign23">
        <img
          :class="$style.untitledDesign232"
          loading="lazy"
          alt=""
          src="/Untitled-design-2-3@2x.png"
        />
      </div>
      <div :class="$style.locationInfoParent">
        <div :class="$style.locationInfo">
          <h3 :class="$style.location">LOCATION</h3>
          <div :class="$style.plot17973Gwest">
            Plot 17973 Gwest Old Industrial
            <br />
            Office 5
            <br />
            Gaborone
          </div>
        </div>
        <div :class="$style.contactInfo">
          <h3 :class="$style.location">CONTACT US</h3>
          <div :class="$style.kmatakataserakiecom267776">
            Kmatakata@serakie.com
            <br />
            +267 77663331
          </div>
        </div>
        <div :class="$style.hoursInfo">
          <h3 :class="$style.location">OPERATING HOURS</h3>
          <h3 :class="$style.am1700pm">08:00 AM - 17:00PM</h3>
        </div>
      </div>
    </div>
  </footer>
</template>
<style module>
  .landingPageInner {
    align-self: stretch;
    height: 182px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 43px var(--padding-30) var(--padding-0);
    box-sizing: border-box;
    max-width: 100%;
    z-index: 8;
    flex-shrink: 0;
    text-align: left;
    font-size: var(--fs-22);
    color: var(--color-white);
    font-family: var(--font-inter);
  }
  .untitledDesign23Parent {
    flex: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    align-content: center;
    gap: var(--gap-30) 99px;
    max-width: 1411.8px;
  }
  .untitledDesign23 {
    height: 102.9px;
    display: flex;
    align-items: flex-start;
    padding: var(--padding-0) var(--padding-0) 16.9px;
    box-sizing: border-box;
  }
  .untitledDesign232 {
    width: 272px;
    position: relative;
    max-height: 100%;
    object-fit: cover;
  }
  .locationInfoParent {
    flex: 1;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: var(--gap-30) 62px;
    min-width: var(--min-w-310);
    max-width: 938px;
  }
  .locationInfo {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: var(--gap-31);
    min-width: var(--min-w-310);
    max-width: 100%;
  }
  .location {
    margin: 0;
    position: relative;
    font-size: inherit;
    font-weight: 700;
    font-family: inherit;
  }
  .plot17973Gwest {
    align-self: stretch;
    position: relative;
    white-space: pre-wrap;
  }
  .contactInfo {
    height: 112px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: var(--gap-31);
  }
  .kmatakataserakiecom267776 {
    position: relative;
  }
  .hoursInfo {
    height: var(--height-85);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: var(--padding-0) var(--padding-0) var(--padding-0) 13px;
    box-sizing: border-box;
    gap: var(--gap-31);
  }
  .am1700pm {
    margin: 0;
    position: relative;
    font-size: inherit;
    font-weight: 400;
    font-family: inherit;
  }

  @media screen and (max-width: 1482px) {
    .untitledDesign23Parent {
      max-width: 100%;
    }
  }
  @media screen and (max-width: 1225px) {
    .locationInfoParent {
      gap: var(--gap-31);
      max-width: 100%;
    }
  }
  @media screen and (max-width: 850px) {
    .untitledDesign23Parent {
      gap: 49px;
    }

    .locationInfoParent {
      gap: var(--gap-15);
    }
  }
  @media screen and (max-width: 450px) {
    .untitledDesign23Parent {
      gap: 25px;
    }

    .locationInfo {
      gap: var(--gap-15);
    }

    .location {
      font-size: var(--fs-18);
    }

    .plot17973Gwest {
      font-size: var(--fs-18);
    }

    .contactInfo {
      gap: var(--gap-15);
    }

    .kmatakataserakiecom267776 {
      font-size: var(--fs-18);
    }

    .am1700pm {
      font-size: var(--fs-18);
    }
  }
</style>
