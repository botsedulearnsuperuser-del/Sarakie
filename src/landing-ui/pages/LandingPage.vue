<template>
  <div class="page">
    <!-- HERO -->
    <section class="hero">
      <img class="hero-pattern" src="/African-Pattern-Line@2x.png" alt="" />
      <div class="hero-inner">
        <header class="nav">
          <a class="brand" href="/landing-ui">
            <img src="/LOGO@2x.png" alt="Sarakie Cash Loan" />
          </a>
          <nav class="nav-links">
            <a href="#loans">Our Loans</a>
            <a href="#how">How it Works</a>
            <a href="#login">Login to My Account</a>
          </nav>
          <router-link class="nav-cta" to="/sign-up">
            New Application
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </router-link>
        </header>

        <div class="hero-body">
          <div class="hero-copy">
            <div class="eyebrow">
              <span>ROOTED IN BOTSWANA</span>
              <i></i>
            </div>
            <h1>Great Financing<br />For your <em>future.</em></h1>
            <p>Explore affordable loan options<br />for life`s everyday needs.</p>
            <div class="hero-actions">
              <router-link class="btn-gold" to="/sign-up">
                Get a loan
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </router-link>
              <a class="link-underline" href="#contact">Talk to an Agent</a>
            </div>
          </div>
        </div>

        <img class="hero-woman" src="/Divider-Shape@2x.png" alt="Woman using a smartphone" />
        <img class="hero-tear" src="/Content-Container@2x.png" alt="" />
      </div>
    </section>

    <!-- LOANS -->
    <section id="loans" class="loans">
      <img class="loans-pattern" src="/Untitled-design-3-21@2x.png" alt="" />
      <div class="section-head">
        <span class="rule"></span>
        <h2>Everyone needs a<br class="sm-only" /> helping hand</h2>
        <p>Our Flexible Loan Options Designed for easy repayability and flexibility.</p>
      </div>

      <div class="cards">
        <article v-for="loan in loans" :key="loan.title" class="card">
          <span class="card-icon">
            <img src="/Group-2.svg" alt="" />
          </span>
          <h3>{{ loan.title }}</h3>
          <p>A helping hand for life`s immediate<br />needs.</p>
          <a class="card-link" href="#contact">Talk to an Agent</a>
          <img class="card-pattern" src="/Untitled-design-3-21@2x.png" alt="" />
        </article>
      </div>
    </section>

    <!-- ONLINE APPLICATION -->
    <section id="how" class="online">
      <div class="online-inner">
        <h2>Online Loan Application</h2>
        <p>Loan applications available online, use our mobile friendly website to apply</p>
        <router-link class="btn-gold" to="/sign-up">
          Apply Online
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </router-link>
        <img class="mockups" src="/group-3.webp" alt="Sarakie website on desktop and mobile" />
      </div>
    </section>

    <!-- CTA -->
    <section id="contact" class="cta">
      <div class="cta-copy">
        <h2>Your Next Step Starts<br />With a Conversation</h2>
        <span class="cta-rule"></span>
      </div>
      <a class="cta-btn" href="mailto:Kmatakata@serakie.com">
        Contact us for a free consultation
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </a>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <img class="footer-logo" src="/LOGO@2x.png" alt="Sarakie Cash Loan" />
      <div class="footer-cols">
        <div class="footer-col">
          <h4>LOCATION</h4>
          <p>Plot 17973 Gwest Old Industrial<br />Office 5<br />Gaborone</p>
        </div>
        <div class="footer-col">
          <h4>CONTACT US</h4>
          <p>Kmatakata@serakie.com<br />+267 77663331</p>
        </div>
        <div class="footer-col">
          <h4>OPERATING HOURS</h4>
          <p>08:00 AM - 17:00PM</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const loans = [
  { title: "Short Term Loans" },
  { title: "Long Term Loans" },
  { title: "Loan Consolidation" },
];
</script>

<style scoped>
.page {
  --green: #013525;
  --gold: #f7c613;
  --gold-soft: #edbf4d;
  --cream: #faf5ee;
  --ink: #013525;
  font-family: Inter, Arial, sans-serif;
  color: var(--ink);
  background: var(--cream);
  overflow-x: hidden;
}

/* HERO */
.hero {
  position: relative;
  background: var(--green);
  overflow: hidden;
}
.hero-inner {
  position: relative;
  max-width: 1180px;
  margin: 0 auto;
  padding: 26px 40px 0;
  min-height: 520px;
  display: flex;
  flex-direction: column;
}
.hero-pattern {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 120px;
  object-fit: cover;
  opacity: 0.9;
  pointer-events: none;
}
.hero::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 46px;
  background: var(--gold);
}
.nav {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 24px;
  padding-left: 60px;
}
.brand img {
  width: 150px;
  display: block;
}
.nav-links {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 26px;
}
.nav-links a {
  color: #fff;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
}
.nav-links a:hover {
  color: var(--gold);
}
.nav-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--gold-soft);
  color: var(--green);
  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
  border-radius: 10px;
  padding: 11px 16px;
  white-space: nowrap;
}
.nav-cta svg,
.btn-gold svg,
.cta-btn svg {
  width: 18px;
  height: 18px;
}
.hero-body {
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  align-items: center;
  padding: 40px 0 120px 60px;
}
.hero-copy {
  max-width: 520px;
}
.eyebrow {
  color: var(--gold-soft);
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.02em;
  margin-bottom: 18px;
}
.eyebrow i {
  display: block;
  width: 64px;
  height: 4px;
  background: var(--gold-soft);
  margin-top: 9px;
}
.hero h1 {
  margin: 0;
  color: #fff;
  font-size: clamp(38px, 6.4vw, 68px);
  line-height: 1.02;
  font-weight: 900;
  letter-spacing: -0.02em;
}
.hero h1 em {
  color: var(--gold-soft);
  font-style: normal;
}
.hero-copy p {
  margin: 26px 0 0;
  color: var(--gold-soft);
  font-size: 17px;
  font-weight: 600;
  line-height: 1.45;
}
.hero-actions {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-top: 40px;
}
.btn-gold {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--gold-soft);
  color: var(--green);
  text-decoration: none;
  font-weight: 700;
  font-size: 15px;
  border-radius: 10px;
  padding: 12px 18px;
  border: none;
  cursor: pointer;
}
.link-underline {
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  border-bottom: 2px solid var(--gold-soft);
  padding-bottom: 3px;
}
.hero-woman {
  position: absolute;
  z-index: 2;
  right: 0;
  bottom: 0;
  height: 92%;
  max-height: 560px;
  width: auto;
  object-fit: contain;
  object-position: bottom right;
  pointer-events: none;
}
.hero-tear {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  width: 100%;
  height: 16px;
  object-fit: fill;
  z-index: 4;
  pointer-events: none;
}

/* LOANS */
.loans {
  position: relative;
  background: var(--cream);
  padding: 62px 40px 70px;
  overflow: hidden;
}
.loans-pattern {
  position: absolute;
  right: -40px;
  top: 120px;
  width: 340px;
  opacity: 0.5;
  pointer-events: none;
}
.section-head {
  position: relative;
  z-index: 2;
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}
.rule {
  display: inline-block;
  width: 92px;
  height: 3px;
  background: var(--gold);
  margin-bottom: 20px;
}
.section-head h2 {
  margin: 0 0 14px;
  font-size: clamp(30px, 4.6vw, 46px);
  font-weight: 900;
  letter-spacing: -0.02em;
  color: var(--green);
}
.section-head p {
  margin: 0;
  font-size: 16px;
  color: #1b3a2f;
}
.sm-only {
  display: none;
}
.cards {
  position: relative;
  z-index: 2;
  max-width: 1120px;
  margin: 42px auto 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}
.card {
  position: relative;
  overflow: hidden;
  background: #fff;
  border: 3px solid var(--gold-soft);
  border-radius: 40px;
  padding: 34px 30px 32px;
  display: flex;
  flex-direction: column;
  min-height: 270px;
}
.card-icon {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: #f7edd6;
  display: grid;
  place-items: center;
  margin-bottom: 22px;
}
.card-icon img {
  width: 30px;
  height: 30px;
}
.card h3 {
  margin: 0 0 14px;
  font-size: 21px;
  font-weight: 900;
  color: var(--green);
}
.card p {
  margin: 0 0 26px;
  font-size: 15px;
  line-height: 1.5;
  color: #1b3a2f;
}
.card-link {
  margin-top: auto;
  align-self: flex-start;
  color: var(--green);
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  border-bottom: 3px solid var(--gold);
  padding-bottom: 2px;
}
.card-pattern {
  position: absolute;
  right: -30px;
  bottom: -20px;
  width: 150px;
  opacity: 0.45;
  pointer-events: none;
}

/* ONLINE */
.online {
  background-image: linear-gradient(rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0.28)), url("/online-bg.jpg");
  background-size: cover;
  background-position: center;
  padding: 70px 40px 60px;
  text-align: center;
  color: #fff;
}
.online-inner {
  max-width: 780px;
  margin: 0 auto;
}
.online h2 {
  margin: 0 0 14px;
  font-size: clamp(30px, 4.6vw, 46px);
  font-weight: 900;
  letter-spacing: -0.01em;
}
.online p {
  margin: 0 auto 26px;
  font-size: 16px;
  font-weight: 500;
  max-width: 560px;
}
.mockups {
  display: block;
  width: min(100%, 640px);
  margin: 44px auto 0;
  border-radius: 18px;
  box-shadow: 0 30px 60px -24px rgba(0, 0, 0, 0.55);
}

/* CTA */
.cta {
  background: var(--gold);
  padding: 46px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
}
.cta-copy h2 {
  margin: 0;
  font-size: clamp(26px, 3.8vw, 36px);
  font-weight: 900;
  line-height: 1.15;
  color: var(--green);
}
.cta-rule {
  display: block;
  width: 96px;
  height: 3px;
  background: var(--green);
  margin-top: 20px;
}
.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--green);
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  border-radius: 12px;
  padding: 14px 20px;
  white-space: nowrap;
}

/* FOOTER */
.footer {
  background: var(--green);
  color: #fff;
  padding: 46px 60px 54px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 48px;
  flex-wrap: wrap;
}
.footer-logo {
  width: 200px;
  flex-shrink: 0;
}
.footer-cols {
  display: flex;
  gap: 60px;
  flex-wrap: wrap;
}
.footer-col h4 {
  margin: 0 0 16px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.02em;
}
.footer-col p {
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: #eef3ef;
}

/* RESPONSIVE */
@media (max-width: 980px) {
  .nav {
    padding-left: 40px;
    gap: 16px;
  }
  .nav-links {
    gap: 16px;
  }
  .nav-links a {
    font-size: 13px;
  }
  .hero-body {
    padding-left: 40px;
  }
  .hero-woman {
    height: 82%;
    opacity: 0.9;
  }
  .hero-copy {
    max-width: 440px;
  }
}
@media (max-width: 760px) {
  .hero-inner {
    padding: 20px 22px 0;
    min-height: 0;
  }
  .hero-pattern {
    width: 74px;
  }
  .nav {
    padding-left: 0;
    flex-wrap: wrap;
    row-gap: 14px;
  }
  .nav-links {
    order: 3;
    width: 100%;
    margin-left: 0;
    justify-content: flex-start;
    gap: 18px;
  }
  .nav-cta {
    margin-left: auto;
  }
  .brand img {
    width: 124px;
  }
  .hero-body {
    padding: 36px 0 300px;
  }
  .hero-copy {
    max-width: 100%;
  }
  .hero-woman {
    height: 300px;
    opacity: 1;
  }
  .hero h1 {
    font-size: clamp(34px, 9vw, 52px);
  }
  .hero::after {
    height: 34px;
  }
  .cards {
    grid-template-columns: 1fr;
    max-width: 460px;
  }
  .sm-only {
    display: block;
  }
  .cta {
    flex-direction: column;
    align-items: flex-start;
    padding: 40px 26px;
  }
  .footer {
    padding: 40px 26px;
    gap: 30px;
  }
  .footer-cols {
    gap: 32px;
  }
  .loans {
    padding: 50px 22px 60px;
  }
  .online {
    padding: 54px 22px 48px;
  }
}
@media (max-width: 480px) {
  .nav-links {
    gap: 14px;
    flex-wrap: wrap;
  }
  .nav-links a {
    font-size: 12.5px;
  }
  .nav-cta {
    font-size: 12.5px;
    padding: 9px 12px;
  }
  .hero-actions {
    gap: 20px;
    flex-wrap: wrap;
  }
  .hero-body {
    padding-bottom: 250px;
  }
  .hero-woman {
    height: 250px;
  }
  .footer-logo {
    width: 160px;
  }
  .footer-cols {
    flex-direction: column;
    gap: 26px;
  }
}
</style>
