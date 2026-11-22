<template>
  <div :class="[$style.dashboardSample, isGaborone ? $style.isGaborone : '']" :style="dashboardBackground">
    <Main :active-page="'dashboard'" role="innovator" />
    <main :class="$style.mainContent">
      <MaintenanceAnnouncement />
      <header :class="$style.div">
        <div :class="$style.div2">
          <div :class="$style.h2actH">
            <h2 :class="$style.dumelaMarion">
              Dumela,
              <PointerHighlight>
                <span :class="$style.highlightWord">{{ firstName }}</span>
              </PointerHighlight>
            </h2>
          </div>
          <div :class="$style.p">
            <div :class="$style.sunday4October">
              {{ todayLine }}
            </div>
          </div>
        </div>
        <div :class="$style.div3">
          <div :class="$style.iconWrap">
            <button
              :class="$style.iconBtn"
              type="button"
              aria-label="Notifications"
              @click="showNotifications = !showNotifications"
            >
              <img
                :class="$style.notifications2New"
                alt=""
                src="/Notifications-2-new.svg"
              />
            </button>
            <NotificationsPanel
              :open="showNotifications"
              @close="showNotifications = false"
            />
          </div>
          <div :class="$style.iconWrap">
            <button
              :class="$style.iconBtn"
              type="button"
              aria-label="Help and frequently asked questions"
              @click="openFaq"
            >
              <img :class="$style.notifications2New" alt="" src="/Help.svg" />
            </button>
          </div>
          <router-link to="/profile" :class="$style.a" style="text-decoration: none;">
            <img :class="$style.userAvatarImg" src="/innovator-man.webp" :alt="displayName" />
            <div :class="$style.span3">
              <div :class="$style.marionLucas">{{ displayName }}</div>
            </div>
          </router-link>
        </div>
      </header>
      <section :class="$style.loanCardsRow">
        <ActiveLoan
          :progress-label="progressLabel"
          :progress-percent="documentsPercent"
          :progress-caption="progressCaption"
          :due-text="dueText"
          :final-text="finalText"
          :next-text="nextText"
          :proposal-id="latestApplication?.id ?? ''"
        />
        <div :class="$style.topUpOffer">
          <div :class="$style.frame">
            <div :class="$style.photoArea">
              <img
                :class="$style.topUpPattern"
                alt=""
                src="/untitled-3-21.webp"
              />
              <img :class="$style.topUpPhoto" alt="" src="/hero-woman.webp" />
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
              <router-link to="/new-idea" :class="$style.agold" style="text-decoration:none;">
                <b :class="$style.ml">Start submission</b>
                <img :class="$style.frameIcon3" alt="" src="/Frame7.svg" />
              </router-link>
            </div>
          </div>
        </div>
      </section>
      <AccountSummary :proposals="summaryProposals" />
      <section :class="$style.divgCalc">
        <Section :months="months" />
        <div :class="$style.section">
          <div :class="$style.h2actH">
            <h3 :class="$style.recentApplications">Ideas submitted by the innovator</h3>
          </div>
          <div :class="$style.h2actH">
                          <Li
                v-for="item in liItems"
                :key="item.id"
                :p="item.p"
                :thatoLekgoba="item.thatoLekgoba"
                :september="item.september"
                :status="item.status"
                @view="handleViewIdea(item.id)"
              />
              <p v-if="liItems.length === 0" :class="$style.emptyIdeas">
                No submissions yet. Your first idea will appear here.
              </p>
          </div>
        </div>
      </section>
      <section :class="$style.divgCalc2">
        <section :class="$style.section2">
          <div :class="$style.div8">
            <div :class="$style.div9">
              <div :class="$style.h2actH">
                <div :class="$style.loanCalculator">How proposals are scored</div>
              </div>
              <div :class="$style.p2">
                <div :class="$style.seeWhatA">
                  Five weighted criteria.
                </div>
              </div>
            </div>
            <div :class="$style.criteriaList">
              <div
                v-for="criterion in criteria"
                :key="criterion.name"
                :class="$style.criterionRow"
              >
                <div :class="$style.criterionHead">
                  <span :class="$style.criterionName">{{ criterion.name }}</span>
                  <span :class="$style.criterionWeight">{{ criterion.weight }}%</span>
                </div>
                <div :class="$style.criterionTrack">
                  <div
                    :class="$style.criterionFill"
                    :style="{ width: criterion.weight + '%' }"
                  />
                </div>
                <div :class="$style.criterionText">{{ criterion.hint }}</div>
              </div>
            </div>
            <router-link
              to="/faq#scoring-rubric"
              :class="$style.criteriaLink"
              style="text-decoration: none"
            >
              Full rubric
            </router-link>
          </div>
          <div :class="$style.div20">
            <img
              :class="$style.b8dbc1777d73b88cd8d55f299be4pIcon"
              alt=""
              src="/pattern-1.webp"
            />
            <div :class="$style.div21">
              <div :class="$style.ml">Typical review window</div>
            </div>
            <div :class="$style.div22">
              <h2 :class="$style.p95044">10 days</h2>
            </div>
            <div :class="$style.div23">
              <div :class="$style.for12Months">submission to decision</div>
            </div>
            <img
              :class="$style.divmarginIcon"
              alt=""
              src="/div-margin1.webp"
            />
            <div :class="$style.reviewSteps">
              <div
                v-for="step in reviewSteps"
                :key="step"
                :class="$style.reviewStep"
              >
                <span :class="$style.reviewDot" />
                <span>{{ step }}</span>
              </div>
            </div>
            <router-link
              to="/new-idea"
              :class="$style.agold2"
              style="text-decoration: none"
            >
              <b :class="$style.applyFor">Start submission</b>
              <img :class="$style.frameIcon4" alt="" src="/Frame7.svg" />
            </router-link>
            <div :class="$style.p3">
              <div :class="$style.indicativeOnlyInterest">
                Indicative only. Missing documents can extend this.
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
                  {{ pipelineSubtitle }}
                </div>
              </div>
            </div>
            <div :class="$style.span12">
              <b :class="$style.ml">{{ pipelineBadge }}</b>
            </div>
          </div>
          <div :class="$style.ol">
            <div
              v-for="(step, index) in pipelineSteps"
              :key="step.name"
              :class="$style.pipelineStep"
            >
              <div :class="$style.stepRail">
                <div
                  :class="[
                    $style.stepCircle,
                    step.state === 'current' ? $style.stepCircleCurrent : '',
                  ]"
                >
                  {{ index + 1 }}
                </div>
                <div
                  v-if="index < pipelineSteps.length - 1"
                  :class="$style.stepConnector"
                />
              </div>
              <div :class="$style.stepBody">
                <div
                  :class="[
                    $style.stepName,
                    step.state === 'current' ? $style.stepNameCurrent : '',
                  ]"
                >
                  {{ step.name }}
                </div>
                <div :class="$style.stepNote">{{ step.note }}</div>
                <div
                  :class="[
                    $style.stepState,
                    step.state === 'current' ? $style.stepStateCurrent : '',
                  ]"
                >
                  {{ step.state === "current" ? "Application is here" : "Pending" }}
                </div>
              </div>
            </div>

            <div v-if="openCorrection" :class="$style.feedbackCallout">
              <div :class="$style.feedbackCalloutMascot">
                <GhostBuddy :step="2" :show-bubble="false" />
              </div>
              <div :class="$style.feedbackCalloutBody">
                <div :class="$style.feedbackCalloutTitle">
                  Feedback on “{{ correctionIdeaTitle }}”
                </div>
                <div :class="$style.feedbackCalloutText">
                  “{{ correctionExcerpt }}”
                </div>
                <button :class="$style.actionButton" type="button" @click="handleRespondToFeedback">
                  Respond to feedback
                </button>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
    <ChatWithAgent />
  </div>
</template>
<script setup lang="ts">
  import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue"
  import { useRouter } from "vue-router"
  import Main from "../components/Main.vue"
  import MaintenanceAnnouncement from "../components/ui/maintenance-announcement.vue"
  import ChatWithAgent from "../components/ChatWithAgent.vue"
  import ActiveLoan from "../components/ActiveLoan.vue"
  import AccountSummary from "../components/AccountSummary.vue"
  import GhostBuddy from "../components/GhostBuddy.vue"
  import Section from "../components/Section.vue"
  import Li from "../components/Li.vue"
  import PointerHighlight from "../components/ui/pointer-highlight.vue"
  import NotificationsPanel from "../components/NotificationsPanel.vue"
  import {
    CUSTOM_IMAGE_STORAGE_KEY,
    CUSTOM_THEME_ID,
    dashboardThemes,
    isGaboroneTheme,
    THEME_EVENT,
    THEME_STORAGE_KEY,
  } from "../components/themes"
  import type { DashboardTheme } from "../components/themes"
  import { authReady, displayName, session } from "../lib/auth"
  import {
    countDocumentsByApplication,
    formatShortDate,
    loadCorrections,
    loadInnovatorApplications,
    monthlySubmissions,
    statusLabel,
    statusShortLabel,
    todaySentence,
    type ApplicationRow,
    type CorrectionRow,
  } from "../lib/portal-data"

  const activeTheme = ref<DashboardTheme | null>(null)
  const showNotifications = ref(false)
  const isGaborone = ref(isGaboroneTheme())

  function syncGaborone() {
    isGaborone.value = isGaboroneTheme()
  }
  onMounted(() => {
    syncGaborone()
    window.addEventListener(THEME_EVENT, syncGaborone)
  })
  onBeforeUnmount(() => {
    window.removeEventListener(THEME_EVENT, syncGaborone)
  })

  function loadTheme() {
    const themeId = localStorage.getItem(THEME_STORAGE_KEY)

    if (themeId === CUSTOM_THEME_ID) {
      const customImage = localStorage.getItem(CUSTOM_IMAGE_STORAGE_KEY)
      activeTheme.value = customImage
        ? { id: CUSTOM_THEME_ID, name: "Your image", image: customImage }
        : null
      return
    }

    activeTheme.value = dashboardThemes.find((theme) => theme.id === themeId) ?? null
  }

  function onThemeChange(event: Event) {
    const detail = (event as CustomEvent<{ id: string; image: string }>).detail

    if (detail?.image) {
      const preset = dashboardThemes.find((theme) => theme.id === detail.id)
      activeTheme.value = {
        id: detail.id,
        name: preset?.name ?? "Your image",
        image: detail.image,
      }
      return
    }

    loadTheme()
  }

  onMounted(() => {
    loadTheme()
    window.addEventListener(THEME_EVENT, onThemeChange)
  })

  onBeforeUnmount(() => {
    window.removeEventListener(THEME_EVENT, onThemeChange)
  })

  const dashboardBackground = computed(() =>
    activeTheme.value
      ? {
          backgroundImage: `url(${activeTheme.value.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }
      : undefined,
  )

  const criteria = [
    {
      name: "Problem and market need",
      weight: 25,
      hint: "Real, sizeable problem.",
    },
    {
      name: "Solution and feasibility",
      weight: 25,
      hint: "Works and is buildable.",
    },
    {
      name: "Team and capability",
      weight: 20,
      hint: "Who delivers it.",
    },
    {
      name: "Sustainability and growth",
      weight: 20,
      hint: "Runs and scales.",
    },
    {
      name: "Impact and youth ownership",
      weight: 10,
      hint: "Jobs and youth ownership.",
    },
  ]

  const reviewSteps = [
    "Submitted",
    "Documents checked",
    "Scored",
    "Decision",
  ]

  /* ── Live data from Supabase ── */
  const applications = ref<ApplicationRow[]>([])
  const corrections = ref<CorrectionRow[]>([])
  const documents = ref<Record<string, number>>({})

  async function loadDashboard() {
    if (!session.value) return
    const [apps, fixes, docs] = await Promise.all([
      loadInnovatorApplications(),
      loadCorrections(),
      countDocumentsByApplication(),
    ])
    applications.value = apps
    corrections.value = fixes
    documents.value = docs
  }

  onMounted(loadDashboard)
  watch([session, authReady], () => void loadDashboard())

  const firstName = computed(
    () => displayName.value?.trim().split(/\s+/)[0] || "Innovator",
  )
  const todayLine = todaySentence()
  const months = computed(() => monthlySubmissions(applications.value))
  const latestApplication = computed(() => applications.value[0] ?? null)

  type SummaryStatus =
    | "Draft"
    | "Under Review"
    | "Approved"
    | "Feedback Required"
    | "Awarded"
    | "Not Successful"

  const summaryStatus = (status: ApplicationRow["status"]): SummaryStatus => {
    if (status === "draft") return "Draft"
    if (status === "approved") return "Approved"
    if (status === "rejected") return "Not Successful"
    if (status === "returned") return "Feedback Required"
    return "Under Review"
  }

  const summaryProposals = computed(() =>
    applications.value.map((app) => ({
      title: app.title,
      status: summaryStatus(app.status),
      submitted: formatShortDate(app.submitted_at),
    })),
  )

  const withDocuments = computed(
    () => applications.value.filter((app) => (documents.value[app.id] ?? 0) > 0).length,
  )
  const documentsPercent = computed(() =>
    applications.value.length
      ? Math.round((withDocuments.value / applications.value.length) * 100)
      : 0,
  )
  const progressLabel = "Submission progress on active proposals"
  const progressCaption = computed(
    () =>
      `${withDocuments.value} of ${applications.value.length} proposals have supporting documents attached`,
  )

  const openCorrection = computed(
    () => corrections.value.find((row) => !row.resolved_at) ?? null,
  )
  const correctionIdeaTitle = computed(
    () =>
      openCorrection.value?.application?.title ??
      latestApplication.value?.title ??
      "your proposal",
  )
  const correctionExcerpt = computed(() => {
    const body = openCorrection.value?.body?.trim() ?? ""
    return body.length > 110 ? `${body.slice(0, 110).trimEnd()}…` : body
  })

  const dueText = computed(() => {
    if (!applications.value.length) return "Nothing submitted yet"
    const needing = applications.value.filter((app) => app.status === "returned").length
    return needing
      ? `${needing} proposal${needing === 1 ? "" : "s"} need your feedback`
      : "No feedback outstanding"
  })
  const finalText = computed(() =>
    latestApplication.value
      ? `Latest update ${formatShortDate(latestApplication.value.updated_at)}`
      : "Start a submission to begin",
  )
  const nextText = computed(() =>
    openCorrection.value
      ? `Feedback received ${formatShortDate(openCorrection.value.created_at)}`
      : "No review notes yet",
  )

  const pipelineSteps = computed(() => {
    const status = latestApplication.value?.status ?? "submitted"
    const current =
      status === "returned" ? 2 : status === "approved" ? 1 : status === "due_diligence" ? 1 : 0
    const reference = latestApplication.value?.reference
    const steps = [
      {
        name: "Under Review",
        note: reference
          ? `${reference} is with the CEDA review team.`
          : "Submit an idea to start the review.",
      },
      { name: "Approved", note: "Reached if the review is successful." },
      { name: "Feedback Required", note: "Only if evaluators ask for changes." },
      { name: "Awarded", note: "Funding released to the innovator." },
    ]
    return steps.map((step, index) => ({
      ...step,
      state: index === current ? "current" : "pending",
    }))
  })

  const pipelineBadge = computed(() =>
    latestApplication.value
      ? statusLabel(latestApplication.value.status)
      : "No application",
  )
  const pipelineSubtitle = computed(() =>
    latestApplication.value
      ? `${latestApplication.value.reference}. ${statusLabel(latestApplication.value.status)}`
      : "No application submitted yet",
  )

  const liItems = computed(() =>
    applications.value.slice(0, 4).map((app) => ({
      id: app.id,
      p: app.title.slice(0, 1).toUpperCase(),
      thatoLekgoba: app.title,
      september: formatShortDate(app.submitted_at),
      status: statusShortLabel(app.status),
    })),
  )

  const router = useRouter()

  function openFaq() {
    router.push("/faq")
  }

  const handleViewIdea = (id: string) => {
    if (!id) return
    router.push({ name: "ApplicationView", query: { id } })
  }

  const handleRespondToFeedback = () => {
    if (!openCorrection.value) return
    router.push({
      name: "ApplicationView",
      query: { id: openCorrection.value.application_id },
      hash: "#corrections",
    })
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
  .highlightWord {
    display: inline-block;
  }

  .dumelaMarion {
    margin: 0;
    /* Room for the pointer highlight's arrow so it never sits on the subtitle */
    padding-bottom: 22px;
    position: relative;
    /* Set only for a user-uploaded background; presets keep their own colours. */
    color: var(--theme-hero-text, inherit);
    text-shadow: var(--theme-hero-shadow, none);
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
    color: var(--theme-hero-muted, var(--color-darkslategray-200));
    text-shadow: var(--theme-hero-shadow, none);
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
  .iconWrap {
    position: relative;
    display: flex;
  }
  .iconBtn {
    display: flex;
    padding: 0;
    border: none;
    background: none;
    border-radius: 50%;
    cursor: pointer;
  }
  .iconBtn:hover {
    opacity: 0.85;
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
    transition: transform 0.22s ease, box-shadow 0.22s ease, background-color 0.22s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
  .agold:hover {
    transform: translateY(-2px);
    background-color: var(--color-goldenrod-300, #f0c84a);
    box-shadow: 0 8px 18px rgba(238, 194, 75, 0.45);
  }
  .agold:active {
    transform: translateY(0) scale(0.97);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  }
  .agold .frameIcon3 {
    transition: transform 0.22s ease;
  }
  .agold:hover .frameIcon3 {
    transform: translateX(4px);
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
    margin: auto 0 10px;
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
    transition: transform 0.22s ease, box-shadow 0.22s ease, background-color 0.22s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
  }
  .agold2:hover {
    transform: translateY(-2px);
    background-color: var(--color-goldenrod-300, #f0c84a);
    box-shadow: 0 10px 22px rgba(238, 194, 75, 0.5);
  }
  .agold2:active {
    transform: translateY(0) scale(0.97);
  }
  .agold2 .frameIcon4 {
    transition: transform 0.22s ease;
  }
  .agold2:hover .frameIcon4 {
    transform: translateX(4px);
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
  .pipelineStep {
    align-self: stretch;
    display: flex;
    align-items: stretch;
    gap: 14px;
  }
  .stepRail {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
  }
  .stepCircle {
    width: 28px;
    height: 28px;
    border-radius: 14px;
    border: 1px solid var(--color-antiquewhite-200);
    background-color: var(--color-white);
    color: var(--color-darkslategray-100);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--fs-13);
    font-weight: 700;
    flex-shrink: 0;
  }
  .stepCircleCurrent {
    background-color: var(--color-goldenrod-200);
    border-color: var(--color-goldenrod-200);
    color: var(--color-darkslategray-500);
    animation: stepPulse 2s ease-in-out infinite;
  }
  .stepConnector {
    width: 2px;
    flex: 1;
    min-height: 20px;
    margin: 4px 0;
    background-color: var(--color-antiquewhite-200);
  }
  .stepBody {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    padding-bottom: 16px;
    min-width: 0;
  }
  .stepName {
    font-size: var(--fs-15);
    font-weight: 700;
    color: var(--color-darkslategray-500);
  }
  .stepNameCurrent {
    color: var(--color-saddlebrown);
    animation: pulseFeedback 2s ease-in-out infinite;
  }
  .stepNote {
    font-size: var(--fs-13);
    line-height: 1.4;
    color: var(--color-darkslategray-100);
  }
  .stepState {
    margin-top: 2px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: var(--color-darkslategray-100);
  }
  .stepStateCurrent {
    color: var(--color-saddlebrown);
  }
  @keyframes stepPulse {
    0%,
    100% {
      box-shadow: 0 0 0 4px rgba(238, 194, 75, 0.35);
    }
    50% {
      box-shadow: 0 0 0 8px rgba(238, 194, 75, 0.12);
    }
  }

  .feedbackCallout {
    align-self: stretch;
    margin-top: 12px;
    padding: 12px 14px;
    border-radius: 12px;
    background-color: var(--color-blanchedalmond);
    border: 1px solid var(--color-goldenrod-200);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
  }
  .feedbackCalloutMascot {
    flex-shrink: 0;
    width: 60px;
    height: 42px;
    overflow: visible;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(0.6);
    transform-origin: left center;
  }
  .feedbackCalloutBody {
    flex: 1;
    min-width: 0;
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
  .liFeedback {
    animation: pulseFeedback 2s ease-in-out infinite;
  }
  .liFeedback .span17 {
    background-color: var(--color-saddlebrown);
    border: 2px solid var(--color-saddlebrown);
  }
  .liFeedback .div47 b {
    color: var(--color-saddlebrown);
  }
  .liFeedback .div48 div {
    color: var(--color-saddlebrown);
  }
  @keyframes pulseFeedback {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
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

  .criteriaList {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .criterionRow {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
  }
  .criterionHead {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
  }
  .criterionName {
    font-size: var(--fs-14);
    font-weight: 700;
    color: var(--color-darkslategray-500);
  }
  .criterionWeight {
    font-size: var(--fs-13);
    font-weight: 800;
    color: var(--color-darkslategray-500);
  }
  .criterionTrack {
    height: 8px;
    border-radius: 999px;
    background-color: #e3dccb;
    overflow: hidden;
  }
  .criterionFill {
    height: 100%;
    border-radius: 999px;
    background-color: var(--color-darkslategray-500);
  }
  .criterionText {
    font-size: var(--fs-12);
    line-height: 1.45;
    color: var(--color-darkslategray-100);
  }
  .criteriaLink {
    margin-top: auto;
    padding-top: 10px;
    font-size: var(--fs-14);
    font-weight: 700;
    color: var(--color-darkslategray-500);
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-color: var(--color-goldenrod-300);
    cursor: pointer;
  }
  .reviewSteps {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 6px;
    z-index: 5;
    flex-shrink: 0;
  }
  .reviewStep {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: var(--fs-13);
    color: var(--color-gainsboro);
  }
  .reviewDot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--color-goldenrod-200);
    flex-shrink: 0;
  }

  @keyframes submitGlow {
    0%,
    100% {
      box-shadow: 0 2px 8px rgba(238, 194, 75, 0.25);
    }
    50% {
      box-shadow: 0 6px 16px rgba(238, 194, 75, 0.55);
    }
  }
  .agold,
  .agold2 {
    animation: submitGlow 2.4s ease-in-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .agold,
    .agold2 {
      animation: none;
    }
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
      padding-top: 62px;
      padding-left: 14px;
      padding-right: 14px;
      padding-bottom: 20px;
      box-sizing: border-box;
    }
    .dumelaMarion {
      font-size: 24px;
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

    /* header: icons row on top, greeting and date underneath at full width */
    .mainContent {
      padding-left: 12px;
      padding-right: 12px;
      padding-bottom: 96px;
      gap: 14px;
    }
    .div {
      flex-direction: column-reverse;
      align-items: stretch;
      row-gap: 12px;
      padding: 0;
    }
    .div2 {
      gap: 5px;
    }
    .dumelaMarion {
      font-size: 28px;
      letter-spacing: -0.3px;
    }
    .sunday4October {
      padding-right: 0;
      font-size: var(--fs-14);
      line-height: 1.45;
    }
    .div3 {
      height: auto;
      justify-content: flex-end;
      gap: 8px;
    }
    .notifications2New {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
    .a {
      height: 40px;
      min-height: 40px;
      padding: 4px 12px 4px 4px;
    }
    .userAvatarImg {
      width: 30px;
      height: 30px;
      min-width: 30px;
    }
    .span3 {
      height: auto;
    }
    .marionLucas {
      font-size: var(--fs-13);
    }

    /* cards: wider on small screens */
    .section,
    .section2,
    .section3 {
      padding: 18px 16px;
      border-radius: 20px;
    }
    .topUpOffer {
      max-width: 100%;
    }
    .photoArea {
      flex: 0 0 auto;
      height: 190px;
      min-height: 190px;
    }
    .topUpPhoto {
      width: 100%;
      height: 230px;
    }
    .div4 {
      flex-direction: column;
      align-items: stretch;
      padding: 16px;
      gap: 12px;
      border-radius: 0 0 20px 20px;
    }
    .div5 {
      min-width: 0;
    }
    .agold {
      justify-content: center;
    }
  }
  @media screen and (max-width: 450px) {
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

  /* Gaborone theme: white header text only on this preset. */
  .isGaborone .dumelaMarion {
    color: #ffffff;
  }
  .isGaborone .p {
    color: rgba(255, 255, 255, 0.9);
  }
  .isGaborone .sunday4October {
    color: #ffffff;
  }
  .isGaborone .marionLucas {
    color: var(--color-darkslategray-500);
  }
  .emptyIdeas {
    margin: 8px 0 0;
    font-size: var(--fs-14);
    color: var(--color-darkslategray-100);
  }
</style>
