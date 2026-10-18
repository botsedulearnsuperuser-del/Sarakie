<template>
  <footer :class="$style.footer" id="contact">
    <div :class="$style.inner">
      <img
        :class="$style.logo"
        loading="lazy"
        alt="Sarakie Cash Loan"
        src="/Untitled-design-2-3@2x.png"
      />
      <div :class="$style.cols">
        <div :class="$style.col">
          <h3 :class="$style.heading">LOCATION</h3>
          <p :class="$style.body">
            Plot 17973 Gwest Old Industrial<br />
            Office 5<br />
            Gaborone
          </p>
        </div>
        <div :class="$style.col">
          <h3 :class="$style.heading">CONTACT US</h3>
          <p :class="$style.body">
            Kmatakata@sarakie.com<br />
            +267 77663331
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
  width: 220px;
  max-width: 100%;
  height: auto;
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
