<template>
  <footer :class="$style.footer" id="contact">
    <div :class="$style.inner">
      <img
        :class="$style.logo"
        loading="lazy"
        alt="CEDA"
        src="/ceda-logo-white-strong.webp"
      />
      <div :class="$style.cols">
        <div :class="$style.col">
          <h3 :class="$style.heading">ABOUT CEDA</h3>
          <p :class="$style.body">
            Citizen Entrepreneurial Development Agency<br />
            Supporting innovators across Botswana
          </p>
        </div>
        <div :class="$style.col">
          <h3 :class="$style.heading">CONTACT US</h3>
          <p :class="$style.body">
            info@ceda.co.bw<br />
            www.ceda.co.bw
          </p>
        </div>
        <div :class="$style.col">
          <h3 :class="$style.heading">OPERATING HOURS</h3>
          <p :class="$style.body">08:00 AM - 17:00PM</p>
        </div>
      </div>
    </div>
  </footer>
</template>
<style module>
.footer {
  width: 100%;
  background-color: var(--color-darkslategray-600);
  padding: 48px 40px 56px;
  box-sizing: border-box;
}
.inner {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  gap: 48px 80px;
  flex-wrap: wrap;
}
.logo {
  width: auto;
  max-width: 100%;
  height: 84px;
  object-fit: contain;
}
.cols {
  flex: 1;
  min-width: 280px;
  display: grid;
  grid-template-columns: repeat(3, minmax(160px, 1fr));
  gap: 28px 40px;
}
.col {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.heading {
  margin: 0;
  color: var(--color-white);
  font-size: var(--fs-18);
  font-weight: 700;
  font-family: var(--font-inter);
}
.body {
  margin: 0;
  color: var(--color-white);
  font-size: var(--fs-18);
  font-weight: 400;
  font-family: var(--font-inter);
  line-height: 1.45;
}
@media screen and (max-width: 850px) {
  .footer {
    padding: 36px 20px 44px;
  }
  .cols {
    grid-template-columns: 1fr;
  }
}
</style>
