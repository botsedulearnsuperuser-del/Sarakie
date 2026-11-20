<template>
  <div :class="$style.page">
    <header :class="$style.topbar">
      <router-link to="/" :class="$style.brand">
        <img :class="$style.logo" src="/ceda-logo.webp" alt="CEDA" />
      </router-link>
      <nav :class="$style.nav">
        <router-link
          to="/privacy"
          :class="[$style.navLink, kind === 'privacy' ? $style.navLinkActive : '']"
        >
          Privacy Policy
        </router-link>
        <router-link
          to="/terms"
          :class="[$style.navLink, kind === 'terms' ? $style.navLinkActive : '']"
        >
          Terms &amp; Conditions
        </router-link>
        <router-link to="/login" :class="$style.backBtn">Back to sign in</router-link>
      </nav>
    </header>

    <main :class="$style.wrap">
      <article :class="$style.card">
        <div :class="$style.banner">
          <img :class="$style.pattern" src="/pattern-2.webp" alt="" />
          <div :class="$style.bannerContent">
            <span :class="$style.badge">{{ content.badge }}</span>
            <h1 :class="$style.title">{{ content.title }}</h1>
            <p :class="$style.meta">Last updated 19 November 2026 &middot; CEDA Innovation Portal</p>
          </div>
        </div>

        <div :class="$style.body">
          <p :class="$style.intro">{{ content.intro }}</p>

          <section v-for="section in content.sections" :key="section.heading" :class="$style.section">
            <h2 :class="$style.heading">{{ section.heading }}</h2>
            <p v-for="paragraph in section.paragraphs ?? []" :key="paragraph" :class="$style.paragraph">
              {{ paragraph }}
            </p>
            <ul v-if="section.bullets" :class="$style.list">
              <li v-for="bullet in section.bullets" :key="bullet" :class="$style.listItem">
                {{ bullet }}
              </li>
            </ul>
          </section>

          <div :class="$style.legalNote">
            By continuing to access this system, you confirm that you agree to our
            <router-link :class="$style.legalLink" to="/privacy">Privacy Policy</router-link>
            and
            <router-link :class="$style.legalLink" to="/terms">Terms &amp; Conditions</router-link>.
          </div>

          <div :class="$style.actions">
            <router-link :class="$style.primaryBtn" to="/sign-up">Create an account</router-link>
            <router-link :class="$style.linkBtn" to="/faq">Read the FAQ</router-link>
          </div>
        </div>
      </article>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { useRoute } from "vue-router";

interface Section {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

interface LegalContent {
  badge: string;
  title: string;
  intro: string;
  sections: Section[];
}

const privacy: LegalContent = {
  badge: "Data protection",
  title: "Privacy Policy",
  intro:
    "CEDA collects and processes the information you give us so that your innovation submission can be received, evaluated and, where it qualifies, funded. We process that information lawfully and only for the purposes described below, in line with the Botswana Data Protection Act, 2024 and the Innovation Portal's own rules.",
  sections: [
    {
      heading: "Who is responsible for your information",
      paragraphs: [
        "The Citizen Entrepreneurial Development Agency (CEDA) is the data controller for the Innovation Portal. Enquiries about this policy, or requests about your own information, can be sent to the agency at +267 77 663 331 or through your assigned analyst.",
      ],
    },
    {
      heading: "Information we collect",
      bullets: [
        "Account details: name, email address, phone number, password (stored only as a secure hash) and two-factor settings.",
        "Company details: trading name, registration number, shareholding and confirmation of youth ownership where relevant.",
        "Submission content: the idea, problem statement, proposed solution, financial projections, supporting documents, CVs and any photographs or diagrams you attach.",
        "Activity records: submissions, resubmissions, replies to evaluator comments, sign-ins, downloads and the dates and times these took place.",
        "Technical information required to run the service securely, such as browser type, device type and IP address.",
      ],
    },
    {
      heading: "Why we use it",
      bullets: [
        "To create and secure your account and verify your email address or phone number.",
        "To receive, store and route your submission to the relevant evaluation panel.",
        "To let evaluators and adjudicators score and comment on submissions, and to return that feedback to you.",
        "To send you notifications when the status of an application changes, where you have asked for those alerts.",
        "To produce participation, evaluation and timeline reports for CEDA management.",
        "To meet legal, audit and record-keeping obligations, and to investigate misuse of the platform.",
      ],
    },
    {
      heading: "Lawful basis",
      paragraphs: [
        "We rely on your consent when you register and accept this policy, on the performance of the service you have asked for when we process your submission, and on CEDA's legitimate interest in administering its innovation programme and protecting the platform against fraud and misuse.",
      ],
    },
    {
      heading: "Your ideas and intellectual property",
      paragraphs: [
        "Your idea and the documents you attach are confidential. They are visible only to you and to the CEDA reviewers, evaluators and adjudicators assigned to your application, and they are never published or offered to third parties.",
        "Nothing in this policy transfers ownership of your intellectual property. Any assignment of rights that applies to prize-winning work is dealt with separately in the hackathon rules, and you will be told before anything is assigned.",
      ],
    },
    {
      heading: "Sharing",
      paragraphs: [
        "We do not sell your information. We share it only with CEDA staff and committee members who need it to assess your submission, with service providers who host and secure the platform under contract, and with authorities where the law requires it.",
      ],
    },
    {
      heading: "Retention",
      paragraphs: [
        "Account and submission records are kept for as long as your account is active and afterwards for the period CEDA needs to evidence the evaluation of the submission and meet audit requirements. When that period ends the records are deleted or anonymised.",
      ],
    },
    {
      heading: "Security",
      bullets: [
        "Traffic to the portal is encrypted in transit, and passwords are stored as irreversible hashes.",
        "Access is role-based: submitters, evaluators, adjudicators and administrators each see only what their role requires.",
        "Two-factor authentication is available on every account and recommended for all applicants.",
        "Activity is logged so that unusual access can be detected and investigated.",
      ],
    },
    {
      heading: "Your rights",
      bullets: [
        "Ask for a copy of the personal information we hold about you.",
        "Ask us to correct information that is inaccurate or incomplete.",
        "Ask for information to be deleted where we no longer have a lawful reason to keep it.",
        "Withdraw consent for optional alerts at any time from your notification settings.",
        "Object to processing, or complain to the Information and Data Protection Commissioner if you believe your information has been handled unlawfully.",
      ],
    },
    {
      heading: "Cookies and local storage",
      paragraphs: [
        "The portal uses only the storage needed to keep you signed in and to remember the appearance you chose for your dashboard. No advertising or cross-site tracking cookies are used.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "If this policy changes in a way that affects how your information is used, the updated version is published on this page with a new date and, where appropriate, you will be notified when you next sign in.",
      ],
    },
  ],
};

const terms: LegalContent = {
  badge: "Using the portal",
  title: "Terms & Conditions",
  intro:
    "These terms govern your use of the CEDA Innovation Portal. By creating an account, signing in or submitting an idea you accept them in full. If you do not agree with any part of them, do not use the portal.",
  sections: [
    {
      heading: "1. Eligibility",
      bullets: [
        "The portal is for innovators and citizen youth-owned companies registered with CEDA.",
        "Where a submission is made on behalf of a company, the person submitting must be authorised to act for that company.",
        "You must be at least 18 years old and able to enter into a binding agreement.",
      ],
    },
    {
      heading: "2. Your account",
      bullets: [
        "Give accurate, current information when you register and keep it up to date.",
        "Keep your password and authenticator device private; you are responsible for activity carried out under your account.",
        "Tell CEDA immediately if you believe someone else has accessed your account.",
        "One person should not maintain more than one account for the same company without CEDA's agreement.",
      ],
    },
    {
      heading: "3. Submissions",
      bullets: [
        "Only submit work you own or are authorised to submit, and make sure it does not infringe anyone else's rights.",
        "Attach the documents the application asks for; incomplete submissions may not be evaluated.",
        "You may keep a draft and edit it until you press Submit; after that the version received is the version assessed.",
        "Do not submit unlawful, misleading or harmful content, or content that belongs to someone else without their permission.",
      ],
    },
    {
      heading: "4. Evaluation and feedback",
      paragraphs: [
        "Every submission is assessed by the CEDA evaluation panel against published criteria. Evaluators may ask for clarification or further documents, and may record comments for you in the Feedback Centre.",
        "Scores and adjudication decisions are final. CEDA is not obliged to fund any submission, and submitting an idea does not create an entitlement to funding, to a meeting or to a particular outcome.",
      ],
    },
    {
      heading: "5. Confidentiality and intellectual property",
      paragraphs: [
        "Your submission is treated as confidential and is shared only with the people assessing it. Ownership of your intellectual property stays with you unless a separate written assignment is agreed.",
        "You grant CEDA permission to store, copy and share your submission internally for the purpose of evaluating it and reporting on the programme.",
      ],
    },
    {
      heading: "6. Acceptable use",
      bullets: [
        "Do not attempt to access another applicant's account, documents or data.",
        "Do not probe, scan or test the security of the portal, or interfere with its availability.",
        "Do not upload malicious files, or use the portal to send unsolicited commercial messages.",
        "Do not scrape, copy or republish content that belongs to CEDA or to another applicant.",
      ],
    },
    {
      heading: "7. Availability",
      paragraphs: [
        "The portal is offered on a best-effort basis and may be unavailable during maintenance or because of circumstances outside CEDA's control. Keep your own copy of every document you upload, and do not leave submission to the last hour of a deadline.",
      ],
    },
    {
      heading: "8. Data protection",
      paragraphs: [
        "Your personal information is handled as described in the Privacy Policy, in line with the Botswana Data Protection Act, 2024.",
      ],
    },
    {
      heading: "9. Suspension and closure",
      paragraphs: [
        "CEDA may suspend or close an account, or set aside a submission, where these terms are breached, where information supplied is false or incomplete, or where the integrity of the evaluation process is at risk. You will be told the reason where it is lawful to do so.",
      ],
    },
    {
      heading: "10. Liability",
      paragraphs: [
        "CEDA is not liable for indirect or consequential loss arising from use of the portal, from a submission not reaching the platform in time, or from loss of data that you have not kept a copy of. Nothing in these terms limits liability that cannot be limited by law.",
      ],
    },
    {
      heading: "11. Changes and governing law",
      paragraphs: [
        "CEDA may update these terms; the current version is always published on this page with the date of the last change. Continued use of the portal after a change means you accept the updated terms.",
        "These terms are governed by the laws of the Republic of Botswana.",
      ],
    },
  ],
};

const route = useRoute();
const kind = computed<"privacy" | "terms">(() =>
  route.meta.legal === "terms" ? "terms" : "privacy",
);
const content = computed<LegalContent>(() => (kind.value === "terms" ? terms : privacy));

watchEffect(() => {
  document.title =
    kind.value === "terms" ? "Terms & Conditions · CEDA" : "Privacy Policy · CEDA";
});
</script>

<style module>
.page {
  min-height: 100vh;
  background-color: #faf7f2;
  font-family: var(--font-inter);
  padding-bottom: 64px;
  box-sizing: border-box;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  max-width: 1020px;
  margin: 0 auto;
  padding: 22px 24px 18px;
}

.brand {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.logo {
  height: 56px;
  width: auto;
  display: block;
}

.nav {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}

.navLink {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-darkslategray-200);
  text-decoration: none;
  padding-bottom: 4px;
  border-bottom: 2px solid transparent;
}

.navLink:hover {
  color: var(--color-darkslategray-500);
}

.navLinkActive {
  color: var(--color-darkslategray-500);
  border-bottom-color: var(--color-goldenrod-300);
}

.backBtn {
  display: inline-flex;
  align-items: center;
  height: 40px;
  padding: 0 20px;
  border-radius: 9999px;
  background-color: var(--color-darkslategray-600);
  color: #ffffff;
  font-size: 13.5px;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 0.15s ease;
}

.backBtn:hover {
  background-color: var(--color-darkslategray-500);
}

.wrap {
  max-width: 1020px;
  margin: 0 auto;
  padding: 0 24px;
  box-sizing: border-box;
}

.card {
  background-color: #ffffff;
  border: 1px solid #ede9e1;
  border-radius: 22px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.banner {
  position: relative;
  background-color: var(--color-darkslategray-600);
  padding: 34px 40px 38px;
  overflow: hidden;
  box-sizing: border-box;
}

.pattern {
  position: absolute;
  top: 0;
  right: -20px;
  height: 100%;
  width: 240px;
  object-fit: cover;
  object-position: center top;
  opacity: 0.9;
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 0;
}

.bannerContent {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 640px;
}

.badge {
  border: 1.5px solid var(--color-goldenrod-200);
  color: var(--color-goldenrod-200);
  border-radius: 9999px;
  padding: 6px 16px;
  font-size: 12.5px;
  font-weight: 700;
  margin-bottom: 16px;
}

.title {
  margin: 0 0 8px;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 900;
  letter-spacing: -0.8px;
  color: #ffffff;
}

.meta {
  margin: 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

.body {
  padding: 34px 40px 38px;
}

.intro {
  margin: 0 0 28px;
  font-size: 15px;
  line-height: 1.7;
  color: #374151;
  padding-left: 16px;
  border-left: 3px solid var(--color-goldenrod-300);
}

.section {
  margin-bottom: 26px;
}

.heading {
  margin: 0 0 10px;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -0.2px;
  color: var(--color-darkslategray-500);
}

.paragraph {
  margin: 0 0 12px;
  font-size: 14px;
  line-height: 1.75;
  color: #4b5563;
}

.list {
  margin: 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.listItem {
  font-size: 14px;
  line-height: 1.7;
  color: #4b5563;
}

.legalNote {
  margin-top: 32px;
  padding: 16px 20px;
  background-color: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 14px;
  font-size: 13px;
  line-height: 1.6;
  color: #9a3412;
}

.legalLink {
  color: #7c2d12;
  font-weight: 700;
  text-underline-offset: 2px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 24px;
}

.primaryBtn {
  display: inline-flex;
  align-items: center;
  height: 44px;
  padding: 0 22px;
  border-radius: 9999px;
  background-color: var(--color-goldenrod-300);
  color: var(--color-darkslategray-600);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 0.15s ease;
}

.primaryBtn:hover {
  background-color: var(--color-goldenrod-200);
}

.linkBtn {
  color: var(--color-darkslategray-500);
  font-size: 14px;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media screen and (max-width: 620px) {
  .topbar {
    padding: 16px 16px 12px;
  }

  .logo {
    height: 44px;
  }

  .wrap {
    padding: 0 12px;
  }

  .banner {
    padding: 24px 20px 26px;
  }

  .pattern {
    width: 140px;
    opacity: 0.7;
  }

  .body {
    padding: 22px 20px 26px;
  }
}
</style>
