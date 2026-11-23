<template>
  <div :class="[$style.page, isGaborone ? $style.isGaborone : '']" :style="pageBackground">
    <!-- Reusable Stationary Sidebar -->
    <Main
      :active-page="isEvaluator ? 'my-applications' : 'dashboard'"
      :role="isAdjudicator ? 'adjudicator' : isEvaluator ? 'evaluator' : undefined"
    />

    <!-- Main Scrollable Content -->
    <main :class="$style.mainContent">
      <div v-if="!applicationReady" :class="$style.viewState">Loading application…</div>
      <div v-else-if="notFound" :class="$style.viewState">
        <p>This application could not be found, or you do not have access to it.</p>
        <router-link
          :to="isEvaluator ? '/review-queue' : isAdjudicator ? '/admin-dashboard' : '/my-applications'"
          :class="$style.emptyLink"
        >
          {{ isEvaluator ? "Back to Review Queue" : isAdjudicator ? "Back to Adjudicator overview" : "Back to My Applications" }}
        </router-link>
      </div>
      <template v-else>
      <!-- Top Bar Header matching InnovatorDashboard & LoanView -->
      <header :class="$style.div">
        <div :class="$style.div2">
          <div :class="$style.h2actH">
            <div :class="$style.titleRow">
              <h2 :class="$style.dumelaMarion">{{ currentIdea.title }}</h2>
              <span :class="getStatusClass(currentIdea.status)">
                {{ currentIdea.status }}
              </span>
            </div>
          </div>
          <div :class="$style.pWrap">
            <div :class="$style.sunday4October">
              Idea Reference: <b>{{ currentIdea.ideaId }}</b> &bull; Submitted by <b>{{ currentIdea.innovator }}</b> on {{ currentIdea.submittedDate }}
            </div>
          </div>
        </div>

        <div :class="$style.div3">
          <img :class="$style.notifications2New" alt="" src="/Notifications-2-new.svg" />
          <img :class="$style.notifications2New" alt="" src="/Help.svg" />
          <router-link to="/profile" :class="$style.userA" style="text-decoration: none;">
            <img :class="$style.userAvatarImg" src="/innovator-man.webp" :alt="displayName" />
            <div :class="$style.span3">
              <div :class="$style.marionLucas">{{ displayName }}</div>
            </div>
          </router-link>
        </div>
      </header>

      <!-- Action & Navigation Bar -->
      <div :class="$style.actionBar">
        <div :class="$style.navRow">
          <router-link
            :to="isEvaluator ? '/review-queue' : isAdjudicator ? '/admin-dashboard' : '/innovator-dashboard'"
            :class="$style.backLink"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>{{ isEvaluator ? 'Back to Review Queue' : isAdjudicator ? 'Back to Adjudicator overview' : 'Back to Dashboard' }}</span>
          </router-link>
          <span :class="$style.navDivider">/</span>
          <span :class="$style.navCurrent">{{ currentIdea.ideaId }}</span>
        </div>

        <div :class="$style.actionBtns">
          <button :class="$style.actionOutlineBtn" type="button" @click="triggerPrint">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            Print
          </button>

          <button :class="$style.actionSolidBtn" type="button" @click="downloadSummary">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download Summary
          </button>

          <button :class="$style.actionOutlineBtn" type="button" @click="openChat">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Open chat
          </button>
        </div>
      </div>

      <!-- Main White Card Container -->
      <section :class="$style.cardContainer">
        <!-- Top Dark Green Hero Banner -->
        <div :class="$style.balanceBanner">
          <img :class="$style.bannerPattern" src="/pattern-2.webp" alt="" />

          <div :class="$style.bannerContent">
            <div :class="$style.bannerTags">
              <span :class="$style.termBadge">INNOVATION IDEA &bull; {{ currentIdea.ideaId }}</span>
              <span :class="$style.disbursedTag">Submitted on {{ currentIdea.submittedDate }}</span>
            </div>

            <div :class="$style.balanceAmount">
              <span>{{ completeness }}</span>
              <span :class="$style.currencyPrefix">%</span>
            </div>

            <div :class="$style.borrowedInfo">proposal complete</div>

            <div :class="$style.borrowedInfo">
              {{ currentIdea.category }} &bull; {{ currentIdea.innovator }} &bull; {{ currentIdea.stage }}
            </div>

            <div :class="$style.metricsStrip">
              <div :class="$style.metricItem">
                <span :class="$style.metricTitle">Funding required</span>
                <span :class="$style.metricValGold">P {{ currentIdea.fundingAmount }}</span>
              </div>
              <div :class="$style.metricItem">
                <span :class="$style.metricTitle">Proposal complete</span>
                <span :class="$style.metricValGold">{{ completeness }}%</span>
              </div>
              <div :class="$style.metricDivider"></div>
              <div :class="$style.metricItem">
                <span :class="$style.metricTitle">Category</span>
                <span :class="$style.metricVal">{{ currentIdea.category }}</span>
              </div>
              <div :class="$style.metricDivider"></div>
              <div :class="$style.metricItem">
                <span :class="$style.metricTitle">Documents</span>
                <span :class="$style.metricVal">{{ currentIdea.documents.length }} attached</span>
              </div>
              <div :class="$style.metricDivider"></div>
              <div :class="$style.metricItem">
                <span :class="$style.metricTitle">Corrections</span>
                <span :class="$style.metricVal"><b>{{ currentIdea.corrections.length }}</b> required</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Evaluator report: scores + final summary for adjudication -->
        <section v-if="isEvaluator" :class="$style.reviewCard">
          <div :class="$style.reviewHead">
            <div>
              <h2 :class="$style.tableHeading">Evaluation report</h2>
              <p :class="$style.tableSub">
                Score the five published criteria, then submit your final summary. The adjudicator
                receives this report together with the complete application and documents.
              </p>
            </div>
            <span v-if="existingEvaluation?.submitted_at" :class="$style.reviewStatus">
              Submitted
            </span>
          </div>

          <div :class="$style.rubricGrid">
            <div v-for="criterion in rubricCriteria" :key="criterion.key" :class="$style.rubricItem">
              <div :class="$style.rubricLabelRow">
                <span :class="$style.rubricName">{{ criterion.name }}</span>
                <span :class="$style.rubricWeight">{{ criterion.weight }}%</span>
              </div>
              <p :class="$style.rubricHint">{{ criterion.hint }}</p>
              <div :class="$style.scoreRow">
                <input
                  v-model.number="scores[criterion.key]"
                  :class="$style.scoreRange"
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  :disabled="reviewSaving"
                />
                <span :class="$style.scoreValue">{{ scores[criterion.key] ?? 0 }} / 5</span>
              </div>
            </div>
          </div>

          <div :class="$style.reviewSummaryRow">
            <div :class="$style.reviewScoreBox">
              <span>Weighted score</span>
              <b>{{ weightedScore }} / 100</b>
            </div>
            <label :class="$style.reviewField">
              <span>Recommendation</span>
              <select v-model="recommendation" :class="$style.reviewSelect" :disabled="reviewSaving">
                <option value="fund">Recommend funding</option>
                <option value="revise">Revise and resubmit</option>
                <option value="decline">Do not recommend</option>
              </select>
            </label>
          </div>

          <label :class="$style.reviewField">
            <span>Final summary for the adjudicator</span>
            <textarea
              v-model="reviewComments"
              :class="$style.reviewTextarea"
              rows="4"
              placeholder="Summarise the strengths, risks and your recommendation."
            />
          </label>

          <p v-if="reviewError" :class="$style.reviewError" role="alert">{{ reviewError }}</p>
          <p v-if="reviewNotice" :class="$style.reviewNotice" role="status">{{ reviewNotice }}</p>

          <div :class="$style.reviewActions">
            <button
              :class="$style.actionSolidBtn"
              type="button"
              :disabled="reviewSaving"
              @click="saveEvaluation"
            >
              {{ reviewSaving ? "Submitting…" : existingEvaluation?.submitted_at ? "Update report" : "Submit final report" }}
            </button>
            <span :class="$style.reviewActionsHint">
              Your scores, summary and the full submission are shared with the adjudicator.
            </span>
          </div>
        </section>

        <!-- Adjudicator decision: reports, complete application, feedback -->
        <section v-if="isAdjudicator" :class="$style.reviewCard">
          <div :class="$style.reviewHead">
            <div>
              <h2 :class="$style.tableHeading">Adjudication</h2>
              <p :class="$style.tableSub">
                Review every evaluator report, the complete application and its documents, then
                record a decision and leave feedback for the innovator.
              </p>
            </div>
          </div>

          <div v-if="applicationEvaluations.length === 0" :class="$style.reviewEmpty">
            No evaluator report has been submitted for this application yet.
          </div>
          <div v-else :class="$style.reportList">
            <div v-for="report in applicationEvaluations" :key="report.id" :class="$style.reportCard">
              <div :class="$style.reportTop">
                <div :class="$style.reportWho">
                  <b>{{ report.evaluator_name || "Evaluator" }}</b>
                  <span>{{ report.submitted_at ? "Submitted " + formatReportDate(report.submitted_at) : "Submitted" }}</span>
                </div>
                <div :class="$style.reportScoreBig">
                  {{ report.weighted_score ?? "—" }}<small>/100</small>
                </div>
              </div>
              <div :class="$style.reportRecommendation">
                {{ recommendationLabel(report.recommendation) }}
              </div>
              <p v-if="report.comments" :class="$style.reportComment">{{ report.comments }}</p>
              <div :class="$style.reportScores">
                <span v-for="criterion in rubricCriteria" :key="criterion.key">
                  {{ criterion.name }}: <b>{{ report.scores[criterion.key] ?? "—" }}/5</b>
                </span>
              </div>
            </div>
          </div>

          <label :class="$style.reviewField">
            <span>Feedback to the innovator</span>
            <textarea
              v-model="decisionFeedback"
              :class="$style.reviewTextarea"
              rows="4"
              placeholder="Explain the decision. This is sent to the innovator and saved on the application."
            />
          </label>

          <p v-if="decisionError" :class="$style.reviewError" role="alert">{{ decisionError }}</p>
          <p v-if="decisionNotice" :class="$style.reviewNotice" role="status">{{ decisionNotice }}</p>

          <div :class="$style.reviewActions">
            <button
              :class="$style.decisionApprove"
              type="button"
              :disabled="decisionSaving"
              @click="makeDecision('approved')"
            >
              Approve application
            </button>
            <button
              :class="$style.decisionDecline"
              type="button"
              :disabled="decisionSaving"
              @click="makeDecision('rejected')"
            >
              Decline application
            </button>
            <span :class="$style.reviewActionsHint">
              The innovator is notified with this feedback as soon as the decision is recorded.
            </span>
          </div>
        </section>

        <!-- Editable draft panel -->
        <div v-if="canEdit && (isDraft || editingCorrections)" id="edit-panel" :class="$style.editSection">
          <div :class="$style.editHead">
            <div>
              <h2 :class="$style.tableHeading">
                {{ isDraft ? "Edit draft proposal" : "Address corrections" }}
              </h2>
              <p :class="$style.tableSub">
                {{
                  isDraft
                    ? "This proposal has not been submitted yet. Edit the fields below, then save it as a draft or submit it for review."
                    : "Update the fields the review team flagged, attach the missing documents, then resubmit for review."
                }}
              </p>
            </div>
            <div :class="$style.editActions">
              <button
                v-if="isDraft"
                :class="$style.actionOutlineBtn"
                type="button"
                @click="saveDraft"
              >
                Save draft
              </button>
              <button
                v-else
                :class="$style.actionOutlineBtn"
                type="button"
                @click="cancelCorrectionEdit"
              >
                Cancel
              </button>
              <button
                :class="$style.actionSolidBtn"
                type="button"
                @click="isDraft ? submitDraft() : submitCorrections()"
              >
                {{ isDraft ? "Submit proposal" : "Resubmit proposal" }}
              </button>
            </div>
          </div>

          <p v-if="savedNotice" :class="$style.savedNotice">{{ savedNotice }}</p>

          <div :class="$style.uploadRow">
            <label :class="$style.uploadBtn">
              <input
                :class="$style.uploadInput"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg"
                @change="handleFiles"
              />
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Upload files
            </label>
            <span :class="$style.uploadHint">
              {{ currentIdea.documents.length }} attached &middot; PDF, Word, Excel, PowerPoint or images
            </span>
          </div>

          <div ref="editPanel" :class="$style.editGrid">
            <label :class="$style.editField">
              <span :class="$style.editLabel">Idea title</span>
              <input v-model="currentIdea.title" :class="$style.editInput" type="text" />
            </label>
            <label :class="$style.editField">
              <span :class="$style.editLabel">Category</span>
              <input v-model="currentIdea.category" :class="$style.editInput" type="text" />
            </label>
            <label :class="$style.editField">
              <span :class="$style.editLabel">Stage</span>
              <input v-model="currentIdea.stage" :class="$style.editInput" type="text" />
            </label>
            <label :class="$style.editFieldFull">
              <span :class="$style.editLabel">Idea description</span>
              <textarea v-model="currentIdea.description" :class="$style.editTextarea" rows="2" @input="autoGrow"></textarea>
            </label>
            <label :class="$style.editFieldFull">
              <span :class="$style.editLabel">Problem statement</span>
              <textarea v-model="currentIdea.problem" :class="$style.editTextarea" rows="2" @input="autoGrow"></textarea>
            </label>
            <label :class="$style.editFieldFull">
              <span :class="$style.editLabel">Proposed solution</span>
              <textarea v-model="currentIdea.solution" :class="$style.editTextarea" rows="2" @input="autoGrow"></textarea>
            </label>
            <label :class="$style.editFieldFull">
              <span :class="$style.editLabel">Target beneficiaries</span>
              <textarea v-model="currentIdea.beneficiaries" :class="$style.editTextarea" rows="2" @input="autoGrow"></textarea>
            </label>
            <label :class="$style.editFieldFull">
              <span :class="$style.editLabel">Expected impact</span>
              <textarea v-model="currentIdea.impact" :class="$style.editTextarea" rows="2" @input="autoGrow"></textarea>
            </label>
          </div>
        </div>

        <!-- Application details grid -->
        <div :class="$style.unifiedInfoCardWrapper">
          <div :class="$style.unifiedInfoContainer">
            <div :class="$style.unifiedCol">
              <div :class="$style.cardHead">
                <div>
                  <h3 :class="$style.cardTitle">Idea Details</h3>
                  <p :class="$style.cardSubtitle">Title &amp; submission info</p>
                </div>
              </div>
              <div :class="$style.cardDetails">
                <div :class="$style.dataRow">
                  <span :class="$style.dataLabel">Idea Title</span>
                  <span :class="$style.dataValue">{{ currentIdea.title }}</span>
                </div>
                <div :class="$style.dataRow">
                  <span :class="$style.dataLabel">Idea Reference</span>
                  <span :class="$style.dataValue">{{ currentIdea.ideaId }}</span>
                </div>
                <div :class="$style.dataRow">
                  <span :class="$style.dataLabel">Submitted On</span>
                  <span :class="$style.dataValue">{{ currentIdea.submittedDate }}</span>
                </div>
                <div :class="$style.dataRow">
                  <span :class="$style.dataLabel">Status</span>
                  <span :class="$style.dataValue">{{ currentIdea.status }}</span>
                </div>
              </div>
            </div>

            <div :class="$style.unifiedColDivider"></div>

            <div :class="$style.unifiedCol">
              <div :class="$style.cardHead">
                <div>
                  <h3 :class="$style.cardTitle">Innovator Profile</h3>
                  <p :class="$style.cardSubtitle">Contact &amp; identity</p>
                </div>
              </div>
              <div :class="$style.cardDetails">
                <div :class="$style.dataRow">
                  <span :class="$style.dataLabel">Innovator</span>
                  <span :class="$style.dataValue">{{ currentIdea.innovator }}</span>
                </div>
                <div :class="$style.dataRow">
                  <span :class="$style.dataLabel">Email</span>
                  <span :class="$style.dataValue">
                    {{ currentIdea.identityHidden ? "Hidden during review" : currentIdea.email || "—" }}
                  </span>
                </div>
                <div :class="$style.dataRow">
                  <span :class="$style.dataLabel">Phone</span>
                  <span :class="$style.dataValue">
                    {{ currentIdea.identityHidden ? "Hidden during review" : currentIdea.phone || "—" }}
                  </span>
                </div>
                <div :class="$style.dataRow">
                  <span :class="$style.dataLabel">Location</span>
                  <span :class="$style.dataValue">
                    {{ currentIdea.identityHidden ? "Hidden during review" : currentIdea.location || "—" }}
                  </span>
                </div>
              </div>
              <p v-if="currentIdea.identityHidden" :class="$style.blindNote">
                Innovator contact details stay hidden until adjudication, as required by the review
                policy.
              </p>
            </div>

            <div :class="$style.unifiedColDivider"></div>

            <div :class="$style.unifiedCol">
              <div :class="$style.cardHead">
                <div>
                  <h3 :class="$style.cardTitle">Proposal details</h3>
                  <p :class="$style.cardSubtitle">Readiness &amp; category</p>
                </div>
              </div>
              <div :class="$style.cardDetails">
                <div :class="$style.dataRow">
                  <span :class="$style.dataLabel">Funding required</span>
                  <span :class="$style.dataValue">P {{ currentIdea.fundingAmount }}</span>
                </div>
                <div :class="$style.dataRow">
                  <span :class="$style.dataLabel">Proposal complete</span>
                  <span :class="$style.dataValue">{{ completeness }}%</span>
                </div>
                <div :class="$style.dataRow">
                  <span :class="$style.dataLabel">Category</span>
                  <span :class="$style.dataValue">{{ currentIdea.category }}</span>
                </div>
                <div :class="$style.dataRow">
                  <span :class="$style.dataLabel">Stage</span>
                  <span :class="$style.dataValue">{{ currentIdea.stage }}</span>
                </div>
                <div :class="$style.dataRow">
                  <span :class="$style.dataLabel">Reviewing Officer</span>
                  <span :class="$style.dataValue">{{ currentIdea.officer }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Description block -->
        <div :class="$style.tableSection">
          <h2 :class="$style.tableHeading">Idea Description</h2>
          <p :class="$style.tableSub">{{ currentIdea.description }}</p>
        </div>

        <!-- Filter Tab Pills -->
        <div :class="$style.tabsRow">
          <button
            :class="[$style.filterPill, activeTab === 'application' ? $style.filterPillActive : '']"
            type="button"
            @click="activeTab = 'application'"
          >
            <span>Application</span>
          </button>
          <button
            :class="[$style.filterPill, activeTab === 'documents' ? $style.filterPillActive : '']"
            type="button"
            @click="activeTab = 'documents'"
          >
            <span>Uploaded Documents</span>
            <span :class="$style.filterCount">{{ currentIdea.documents.length }}</span>
          </button>
          <button
            :class="[$style.filterPill, activeTab === 'corrections' ? $style.filterPillActive : '']"
            type="button"
            @click="activeTab = 'corrections'"
          >
            <span>Corrections Required</span>
            <span :class="$style.filterCount">{{ currentIdea.corrections.length }}</span>
          </button>
        </div>

        <!-- Tab: Application -->
        <div v-if="activeTab === 'application'" :class="$style.tableSection">
          <div :class="$style.detailCardsGrid">
            <div :class="$style.subCard">
              <h4 :class="$style.subCardTitle">Problem Statement</h4>
              <p :class="$style.subCardText">{{ currentIdea.problem }}</p>
            </div>
            <div :class="$style.subCard">
              <h4 :class="$style.subCardTitle">Proposed Solution</h4>
              <p :class="$style.subCardText">{{ currentIdea.solution }}</p>
            </div>
            <div :class="$style.subCard">
              <h4 :class="$style.subCardTitle">Target Beneficiaries</h4>
              <p :class="$style.subCardText">{{ currentIdea.beneficiaries }}</p>
            </div>
            <div :class="$style.subCard">
              <h4 :class="$style.subCardTitle">Expected Impact</h4>
              <p :class="$style.subCardText">{{ currentIdea.impact }}</p>
            </div>
          </div>
        </div>

        <!-- Tab: Uploaded Documents -->
        <div v-else-if="activeTab === 'documents'" :class="$style.tableSection">
          <h2 :class="$style.tableHeading">Uploaded Documents</h2>
          <p :class="$style.tableSub">Files submitted as part of the innovation application.</p>

          <div :class="$style.docsList">
            <div v-for="(doc, i) in currentIdea.documents" :key="i" :class="$style.docItem">
              <div :class="$style.docLeft">
                <div :class="$style.docIconBox">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2e7d5b" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
                <div>
                  <span :class="$style.docTitle">{{ doc.name }}</span>
                  <span :class="$style.docMeta">{{ doc.type }} &bull; {{ doc.size }} &bull; Uploaded {{ doc.uploaded }}</span>
                </div>
              </div>
              <button :class="$style.docBtn" type="button" @click="mockPreviewDoc(doc.name)">
                View Document
              </button>
            </div>
            <div v-if="currentIdea.documents.length === 0" :class="$style.noResults">
              No documents uploaded for this idea yet.
            </div>
          </div>
        </div>

        <!-- Tab: Corrections Required -->
        <div v-else-if="activeTab === 'corrections'" :class="$style.tableSection" id="corrections-target">
          <h2 :class="$style.tableHeading">Corrections Required</h2>
          <p :class="$style.tableSub">Items flagged by the review team that need to be addressed before approval.</p>

          <div v-if="currentIdea.corrections.length === 0" :class="$style.noCorrections">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>No corrections required. This idea is ready for review.</span>
          </div>

          <div v-else :class="$style.correctionsList">
            <div v-for="(c, i) in currentIdea.corrections" :key="i" :class="$style.correctionItem">
              <div :class="$style.correctionLeft">
                <div :class="$style.correctionIcon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c2410c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <div>
                  <span :class="$style.correctionField">{{ c.field }}</span>
                  <span :class="$style.correctionIssue">{{ c.issue }}</span>
                </div>
              </div>
              <span :class="$style.correctionBadge">{{ c.severity }}</span>
            </div>
          </div>

          <div v-if="canEdit && currentIdea.corrections.length > 0" :class="$style.correctionsActions">
            <button :class="$style.resubmitBtn" type="button" @click="startCorrectionEdit">
              Resubmit
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <span :class="$style.correctionsHint">
              Opens the proposal in editable mode so you can fix each item and attach files.
            </span>
          </div>
        </div>
      </section>
      </template>
    </main>

    <!-- Print-only compiled application document -->
    <section v-if="applicationReady && !notFound" :class="$style.printDoc">
      <header :class="$style.printHead">
        <div :class="$style.printHeadMain">
          <img
            :class="$style.printLogo"
            src="/ceda-logo.webp"
            alt="CEDA — Citizen Entrepreneurial Development Agency"
          />
          <div :class="$style.printBrand">CEDA Innovation Portal</div>
          <h1 :class="$style.printTitle">{{ currentIdea.title }}</h1>
          <div :class="$style.printRef">
            {{ currentIdea.ideaId }} &middot; {{ currentIdea.category }} &middot; {{ currentIdea.stage }} stage
          </div>
        </div>
        <div :class="$style.printStatus">
          <span :class="$style.printStatusLabel">Status</span>
          <span :class="$style.printStatusValue">{{ currentIdea.status }}</span>
        </div>
      </header>

      <section :class="$style.printSection">
        <h2 :class="$style.printSectionTitle">Application details</h2>
        <table :class="$style.printTable">
          <tbody>
            <tr>
              <th>Innovator</th>
              <td>{{ currentIdea.innovator }}</td>
              <th>Submitted</th>
              <td>{{ currentIdea.submittedDate }}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{{ currentIdea.email }}</td>
              <th>Phone</th>
              <td>{{ currentIdea.phone }}</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>{{ currentIdea.location }}</td>
              <th>Category</th>
              <td>{{ currentIdea.category }}</td>
            </tr>
            <tr>
              <th>Stage</th>
              <td>{{ currentIdea.stage }}</td>
              <th>Review officer</th>
              <td>{{ currentIdea.officer }}</td>
            </tr>
            <tr>
              <th>Funding required</th>
              <td>P {{ currentIdea.fundingAmount }}</td>
              <th>Proposal complete</th>
              <td>{{ completeness }}%</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section :class="$style.printSection">
        <h2 :class="$style.printSectionTitle">Idea summary</h2>
        <p :class="$style.printText">{{ currentIdea.description }}</p>
      </section>

      <section :class="$style.printSection">
        <h2 :class="$style.printSectionTitle">Problem statement</h2>
        <p :class="$style.printText">{{ currentIdea.problem }}</p>
      </section>

      <section :class="$style.printSection">
        <h2 :class="$style.printSectionTitle">Proposed solution</h2>
        <p :class="$style.printText">{{ currentIdea.solution }}</p>
      </section>

      <section :class="$style.printSection">
        <h2 :class="$style.printSectionTitle">Target beneficiaries</h2>
        <p :class="$style.printText">{{ currentIdea.beneficiaries }}</p>
      </section>

      <section :class="$style.printSection">
        <h2 :class="$style.printSectionTitle">Expected impact</h2>
        <p :class="$style.printText">{{ currentIdea.impact }}</p>
      </section>

      <section v-if="currentIdea.corrections.length > 0" :class="$style.printSection">
        <h2 :class="$style.printSectionTitle">Corrections required</h2>
        <table :class="$style.printTable">
          <thead>
            <tr>
              <th>Field</th>
              <th>What is required</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(correction, index) in currentIdea.corrections" :key="index">
              <td>{{ correction.field }}</td>
              <td>{{ correction.issue }}</td>
              <td>{{ correction.severity }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section :class="$style.printSection">
        <h2 :class="$style.printSectionTitle">Supporting documents</h2>
        <p :class="$style.printText">
          {{ currentIdea.documents.length }} supporting
          {{ currentIdea.documents.length === 1 ? "document is" : "documents are" }}
          attached to this application. Documents are not included in this printout — they
          can be downloaded and shared separately from the CEDA Innovation Portal.
        </p>
      </section>

      <footer :class="$style.printFooter">
        <span>CEDA Innovation Portal &middot; {{ currentIdea.ideaId }}</span>
        <span>Printed {{ printedOn }}</span>
      </footer>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { usePageTheme } from "../composables/usePageTheme";

  const pageBackground = usePageTheme();
  const isGaborone = ref(isGaboroneTheme());
  onMounted(() => {
    window.addEventListener(THEME_EVENT, () => (isGaborone.value = isGaboroneTheme()));
  });

import { onMounted, reactive, ref, computed, watch, nextTick } from "vue";
import { THEME_EVENT, isGaboroneTheme } from "../components/themes";
import { useRoute, useRouter } from "vue-router";
import { useCssModule } from "vue";
import Main from "../components/Main.vue";
import { supabase } from "../lib/supabase";
import { authReady, currentRole, displayName, session } from "../lib/auth";
import {
  decideApplication,
  loadApplicationEvaluations,
  loadRubricCriteria,
  submitEvaluation,
  type ApplicationEvaluationRow,
  type RubricCriterion,
} from "../lib/portal-data";

const route = useRoute();
const router = useRouter();
const style = useCssModule();
const activeTab = ref<"application" | "documents" | "corrections">("application");

interface IdeaDoc {
  name: string;
  type: string;
  size: string;
  uploaded: string;
}

interface IdeaCorrection {
  field: string;
  issue: string;
  severity: string;
}

interface IdeaDetail {
  ideaId: string;
  ownerId: string;
  identityHidden: boolean;
  title: string;
  innovator: string;
  email: string;
  phone: string;
  location: string;
  submittedDate: string;
  fundingAmount: string;
  category: string;
  stage: string;
  status:
    | "Draft"
    | "Under Review"
    | "Approved"
    | "Feedback Required"
    | "Awarded"
    | "Declined";
  officer: string;
  description: string;
  problem: string;
  solution: string;
  beneficiaries: string;
  impact: string;
  documents: IdeaDoc[];
  corrections: IdeaCorrection[];
}

/** Empty shell used while the database row loads. */
function emptyIdea(): IdeaDetail {
  return {
    ideaId: "",
    ownerId: "",
    identityHidden: false,
    title: "Application",
    innovator: "",
    email: "",
    phone: "",
    location: "",
    submittedDate: "",
    fundingAmount: "0.00",
    category: "",
    stage: "",
    status: "Draft",
    officer: "",
    description: "",
    problem: "",
    solution: "",
    beneficiaries: "",
    impact: "",
    documents: [],
    corrections: [],
  };
}

const currentIdea = ref<IdeaDetail>(emptyIdea());
const applicationReady = ref(false);
const notFound = ref(false);
const savedNotice = ref("");
/** Supabase row id: this page only ever renders a stored application. */
const dbId = ref<string | null>(null);

function mapApplicationStatus(status: string): IdeaDetail["status"] {
  switch (status) {
    case "draft":
      return "Draft";
    case "approved":
      return "Approved";
    case "rejected":
      return "Declined";
    case "returned":
      return "Feedback Required";
    default:
      return "Under Review";
  }
}

function formatSubmitted(value: string | null): string {
  if (!value) return "Not submitted yet";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function mapApplication(row: Record<string, any>): IdeaDetail {
  const innovator = Array.isArray(row.innovator) ? row.innovator[0] : row.innovator;
  // Blind review: evaluators never receive innovator contact details. The
  // profiles join returns null under RLS, so show a stable reference code.
  const hidden = currentRole.value === "evaluator";
  const code = `IN-${String(row.id).slice(-4).toUpperCase()}`;
  return {
    ideaId: row.reference ?? row.id,
    ownerId: row.innovator_id ?? "",
    identityHidden: hidden,
    title: row.title ?? "Untitled submission",
    innovator: hidden ? code : (innovator?.full_name ?? "Unknown innovator"),
    email: hidden ? "" : (innovator?.email ?? ""),
    phone: hidden ? "" : (innovator?.phone ?? ""),
    location: hidden ? "" : (innovator?.city ?? ""),
    submittedDate: formatSubmitted(row.submitted_at),
    fundingAmount: Number(row.funding_requested ?? 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    category: row.sector ?? "Uncategorised",
    stage: row.innovation_type ?? "Idea",
    status: mapApplicationStatus(String(row.status)),
    officer: currentRole.value === "evaluator" ? displayName.value : "Unassigned",
    description: row.summary ?? "",
    problem: row.problem_statement ?? "",
    solution: row.proposed_solution ?? "",
    beneficiaries: row.target_beneficiaries ?? "",
    impact: row.expected_impact ?? "",
    documents: [],
    corrections: [],
  };
}

async function hydrateFromRoute() {
  savedNotice.value = "";
  applicationReady.value = false;
  notFound.value = false;
  dbId.value = null;

  const queryId = typeof route.query.id === "string" ? route.query.id : "";
  const paramId = typeof route.params.id === "string" ? route.params.id : "";
  const id = queryId || paramId;

  if (!id || !supabase || !session.value) {
    notFound.value = true;
    applicationReady.value = true;
    return;
  }

  const { data, error } = await supabase
    .from("applications")
    .select("*, innovator:profiles(full_name, email, phone, city)")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    notFound.value = true;
    applicationReady.value = true;
    return;
  }

  dbId.value = data.id;
  currentIdea.value = mapApplication(data);

  const [{ data: docs }, { data: fixes }] = await Promise.all([
    supabase
      .from("application_documents")
      .select("file_name, mime_type, size_bytes, created_at")
      .eq("application_id", data.id),
    supabase
      .from("application_corrections")
      .select("body, created_at")
      .eq("application_id", data.id)
      .is("resolved_at", null),
  ]);

  currentIdea.value.documents = (docs ?? []).map((doc: Record<string, any>) => ({
    name: doc.file_name,
    type: (doc.mime_type?.split("/").pop() ?? "FILE").toUpperCase(),
    size: formatFileSize(Number(doc.size_bytes ?? 0)),
    uploaded: formatSubmitted(doc.created_at),
  }));

  currentIdea.value.corrections = (fixes ?? []).map((fix: Record<string, any>) => ({
    field: "Reviewer note",
    issue: fix.body,
    severity: "Required",
  }));

  activeTab.value = route.hash === "#corrections" ? "corrections" : "application";
  applicationReady.value = true;
  void loadReviewData();
}

/** Column values for the row behind this page. */
function applicationPatch(): Record<string, unknown> {
  const idea = currentIdea.value;
  return {
    title: idea.title,
    sector: idea.category,
    innovation_type: idea.stage,
    summary: idea.description,
    problem_statement: idea.problem,
    proposed_solution: idea.solution,
    target_beneficiaries: idea.beneficiaries,
    expected_impact: idea.impact,
    funding_requested:
      Number(idea.fundingAmount.replace(/[^0-9.]/g, "")) || null,
  };
}

async function persistApplication(patch: Record<string, unknown>): Promise<boolean> {
  if (!supabase || !dbId.value) return false;
  const { error } = await supabase
    .from("applications")
    .update(patch)
    .eq("id", dbId.value);
  if (error) {
    savedNotice.value = `Could not save: ${error.message}`;
    return false;
  }
  return true;
}

const isEvaluator = computed(() => currentRole.value === "evaluator");
const isDraft = computed(() => currentIdea.value.status === "Draft");
const canEdit = computed(
  () =>
    currentRole.value === "innovator" &&
    Boolean(session.value?.user.id) &&
    currentIdea.value.ownerId === session.value?.user.id,
);

// ── Evaluator report + adjudicator decision ──
const isAdjudicator = computed(
  () => currentRole.value === "adjudicator" || currentRole.value === "admin",
);

const fallbackRubric: RubricCriterion[] = [
  { key: "problem_market", name: "Problem and market need", weight: 25, hint: "A real, sizeable problem.", position: 1 },
  { key: "solution_feasible", name: "Solution and feasibility", weight: 25, hint: "It works and can be built.", position: 2 },
  { key: "team_capability", name: "Team and capability", weight: 20, hint: "Who will deliver it.", position: 3 },
  { key: "financial", name: "Financial projections", weight: 20, hint: "The numbers add up.", position: 4 },
  { key: "impact_youth", name: "Impact and youth ownership", weight: 10, hint: "Who benefits and who owns it.", position: 5 },
];

const rubricCriteria = ref<RubricCriterion[]>(fallbackRubric);
const scores = reactive<Record<string, number>>({});
const recommendation = ref<"fund" | "revise" | "decline">("fund");
const reviewComments = ref("");
const reviewSaving = ref(false);
const reviewError = ref("");
const reviewNotice = ref("");
const applicationEvaluations = ref<ApplicationEvaluationRow[]>([]);
const existingEvaluation = computed(() => applicationEvaluations.value[0] ?? null);

const weightedScore = computed(() => {
  const total = rubricCriteria.value.reduce(
    (sum, criterion) => sum + ((scores[criterion.key] ?? 0) / 5) * criterion.weight,
    0,
  );
  return Math.round(total);
});

const decisionFeedback = ref("");
const decisionSaving = ref(false);
const decisionError = ref("");
const decisionNotice = ref("");

function ensureScores() {
  for (const criterion of rubricCriteria.value) {
    if (scores[criterion.key] == null) scores[criterion.key] = 0;
  }
}

async function loadReviewData() {
  if (!dbId.value || (!isEvaluator.value && !isAdjudicator.value)) return;
  const [criteria, reports] = await Promise.all([
    loadRubricCriteria(),
    loadApplicationEvaluations(dbId.value),
  ]);
  if (criteria.length) rubricCriteria.value = criteria;
  ensureScores();
  applicationEvaluations.value = reports;

  if (isEvaluator.value) {
    const own =
      reports.find((report) => report.evaluator_id === session.value?.user.id) ?? reports[0];
    if (own) {
      for (const criterion of rubricCriteria.value) {
        scores[criterion.key] = Number(own.scores[criterion.key] ?? 0);
      }
      recommendation.value = own.recommendation ?? "fund";
      reviewComments.value = own.comments ?? "";
    }
  }
}

async function saveEvaluation() {
  if (!isEvaluator.value || !dbId.value) return;
  reviewError.value = "";
  reviewNotice.value = "";
  if (!reviewComments.value.trim()) {
    reviewError.value = "Add a final summary before submitting your report.";
    return;
  }
  reviewSaving.value = true;
  const result = await submitEvaluation({
    applicationId: dbId.value,
    scores: { ...scores },
    weightedScore: weightedScore.value,
    recommendation: recommendation.value,
    comments: reviewComments.value,
  });
  reviewSaving.value = false;
  if (!result.ok) {
    reviewError.value = result.error ?? "Could not submit the report.";
    return;
  }
  reviewNotice.value = "Report submitted. The adjudicator can now review it.";
  await loadReviewData();
}

async function makeDecision(decision: "approved" | "rejected") {
  if (!isAdjudicator.value || !dbId.value) return;
  decisionError.value = "";
  decisionNotice.value = "";
  if (!decisionFeedback.value.trim()) {
    decisionError.value = "Add feedback for the innovator before recording a decision.";
    return;
  }
  decisionSaving.value = true;
  const result = await decideApplication({
    applicationId: dbId.value,
    decision,
    feedback: decisionFeedback.value,
    authorRole: currentRole.value === "admin" ? "admin" : "adjudicator",
  });
  decisionSaving.value = false;
  if (!result.ok) {
    decisionError.value = result.error ?? "Could not record the decision.";
    return;
  }
  currentIdea.value.status = decision === "approved" ? "Approved" : "Declined";
  decisionNotice.value =
    decision === "approved"
      ? "Application approved. The innovator has been notified."
      : "Application declined. The innovator has been notified.";
}

function recommendationLabel(value: string | null) {
  if (value === "fund") return "Recommend funding";
  if (value === "revise") return "Revise and resubmit";
  if (value === "decline") return "Do not recommend";
  return "No recommendation";
}

function formatReportDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const printedOn = new Date().toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
const editingCorrections = ref(false);

// How much of the proposal is filled in, so the page shows progress instead of a budget.
const completeness = computed(() => {
  const fields = [
    currentIdea.value.title,
    currentIdea.value.category,
    currentIdea.value.description,
    currentIdea.value.problem,
    currentIdea.value.solution,
    currentIdea.value.beneficiaries,
    currentIdea.value.impact,
  ];
  const filled = fields.filter((value) => (value ?? "").trim().length > 0).length;
  const documents = currentIdea.value.documents.length > 0 ? 1 : 0;
  return Math.round(((filled + documents) / (fields.length + 1)) * 100);
});

// Grow each draft textarea to fit its content so long text is never cut off.
const editPanel = ref<HTMLElement | null>(null);

function autoGrow(event: Event) {
  const el = event.target as HTMLTextAreaElement | null;
  if (!el) return;
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
}

function resizeDraftTextareas() {
  editPanel.value
    ?.querySelectorAll<HTMLTextAreaElement>("textarea")
    .forEach((el) => {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    });
}

onMounted(() => nextTick(resizeDraftTextareas));
watch(currentIdea, () => nextTick(resizeDraftTextareas));

watch(
  () => [
    route.query.id,
    route.query.name,
    route.params.id,
    route.hash,
    session.value?.user.id,
    authReady.value,
  ],
  () => {
    if (!authReady.value) return;
    void hydrateFromRoute();
  },
  { immediate: true }
);

watch(
  activeTab,
  (tab) => {
    if (tab === "corrections") {
      nextTick(scrollToCorrections);
    }
  }
);

function scrollToCorrections() {
  nextTick(() => {
    const el = document.querySelector("#corrections-target") as HTMLElement | null;
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

async function saveDraft() {
  const saved = await persistApplication({
    ...applicationPatch(),
    ...(currentIdea.value.status === "Draft" ? { status: "draft" } : {}),
  });
  savedNotice.value = saved
    ? `Draft saved — ${currentIdea.value.title}`
    : savedNotice.value || `Draft saved — ${currentIdea.value.title}`;
}

function startCorrectionEdit() {
  editingCorrections.value = true;
  nextTick(() => {
    const el = document.getElementById("edit-panel");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    el?.querySelector("input")?.focus();
  });
}

function cancelCorrectionEdit() {
  editingCorrections.value = false;
  savedNotice.value = "";
}

async function submitCorrections() {
  const now = new Date();
  currentIdea.value.status = "Under Review";
  currentIdea.value.submittedDate = formatSubmitted(now.toISOString());

  const saved = await persistApplication({
    ...applicationPatch(),
    status: "submitted",
    submitted_at: now.toISOString(),
  });

  if (saved && supabase && dbId.value) {
    await supabase
      .from("application_corrections")
      .update({ resolved_at: now.toISOString() })
      .eq("application_id", dbId.value)
      .is("resolved_at", null);
  }

  currentIdea.value.corrections = [];
  editingCorrections.value = false;
  savedNotice.value = saved
    ? "Corrections submitted. The proposal is back under review."
    : savedNotice.value;
}

function formatFileSize(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function handleFiles(event: Event) {
  const input = event.target as HTMLInputElement | null;
  if (!input?.files) return;
  const uploaded = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  Array.from(input.files).forEach((file) => {
    const extension = file.name.split(".").pop()?.toUpperCase() ?? "FILE";
    currentIdea.value.documents.push({
      name: file.name,
      type: extension,
      size: formatFileSize(file.size),
      uploaded,
    });
  });

  savedNotice.value = `${input.files.length} file${input.files.length === 1 ? "" : "s"} attached.`;
  input.value = "";
  nextTick(resizeDraftTextareas);
}

async function submitDraft() {
  const now = new Date();
  currentIdea.value.status = "Under Review";
  currentIdea.value.submittedDate = formatSubmitted(now.toISOString());

  const saved = await persistApplication({
    ...applicationPatch(),
    status: "submitted",
    submitted_at: now.toISOString(),
    decided_at: null,
    decision_note: null,
  });

  savedNotice.value = saved
    ? "Proposal submitted for review."
    : savedNotice.value || "Proposal submitted for review.";
}

function getStatusClass(status: string) {
  switch (status) {
    case "Approved":
    case "Awarded":
      return style.statusActive;
    case "Under Review":
      return style.statusReview;
    case "Feedback Required":
    case "Declined":
      return style.statusReturn;
    case "Draft":
      return style.statusDraft;
    default:
      return style.statusActive;
  }
}

function triggerPrint() {
  window.print();
}

function downloadSummary() {
  alert(`Generating innovation summary for ${currentIdea.value.title} (${currentIdea.value.ideaId}). PDF download will begin shortly.`);
}

function mockPreviewDoc(docName: string) {
  alert(`Viewing document: ${docName} for ${currentIdea.value.title}`);
}

function openChat() {
  if (!dbId.value) return;
  router.push({ name: "ChatPage", query: { id: dbId.value } });
}
</script>

<style module>
.page {
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #faf7f2;
  font-family: var(--font-inter, 'Inter', sans-serif);
  overflow: hidden;
}

.mainContent {
  flex: 1;
  height: 100vh;
  overflow-y: auto;
  padding: 24px 36px 48px;
  box-sizing: border-box;
}

.div {
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  box-sizing: border-box;
  gap: var(--gap-0);
  max-width: 100%;
  row-gap: var(--gap-20);
  text-align: left;
  font-family: var(--font-inter);
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.div2 {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  min-width: 0;
  max-width: 100%;
}

.h2actH {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.titleRow {
  display: flex;
  align-items: center;
  gap: 14px;
}

.dumelaMarion {
  margin: 0;
  position: relative;
  font-size: 36px;
  letter-spacing: -0.84px;
  font-weight: 800;
  font-family: inherit;
  color: var(--color-darkslategray-500);
}

.pWrap {
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
  color: #6b7280;
  font-size: 14.5px;
}

.sunday4October b {
  color: #0f2e24;
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
  cursor: pointer;
}

.userA {
  height: var(--height-48);
  border-radius: var(--br-999);
  background-color: var(--color-white);
  border: 1px solid var(--color-lightgray-100);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: var(--padding-5) var(--padding-14) var(--padding-5) var(--padding-5);
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
  font-size: var(--fs-15);
}

.actionBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 16px;
}

.navRow {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
}

.backLink {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #2e7d5b;
  font-weight: 700;
  text-decoration: none;
  transition: opacity 0.15s ease;
}

.backLink:hover {
  text-decoration: underline;
}

.navDivider {
  color: #9ca3af;
}

.navCurrent {
  color: #6b7280;
  font-weight: 600;
}

.actionBtns {
  display: flex;
  align-items: center;
  gap: 10px;
}

.actionOutlineBtn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 18px;
  border-radius: 9999px;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  color: #374151;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-inter);
  transition: all 0.15s ease;
}

.actionOutlineBtn:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

.actionSolidBtn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 20px;
  border-radius: 9999px;
  border: none;
  background-color: #0f2e24;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-inter);
  box-shadow: 0 4px 12px rgba(15, 46, 36, 0.2);
  transition: background-color 0.15s ease;
}

.actionSolidBtn:hover {
  background-color: #081d16;
}

.cardContainer {
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  border: 1px solid #ede9e1;
  padding-bottom: 28px;
}

.balanceBanner {
  position: relative;
  background-color: var(--color-darkslategray-600, #013525);
  border-radius: 20px 20px 0 0;
  padding: 28px 32px 30px;
  overflow: hidden;
  box-sizing: border-box;
}

.bannerPattern {
  position: absolute;
  top: 0;
  right: -10px;
  height: 100%;
  width: 150px;
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
}

.bannerTags {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.termBadge {
  border: 1.5px solid var(--color-goldenrod-200, #eec24b);
  color: var(--color-goldenrod-200, #eec24b);
  border-radius: 9999px;
  padding: 5px 16px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.6px;
}

.disbursedTag {
  color: rgba(255, 255, 255, 0.75);
  font-size: 13px;
  font-weight: 500;
}

.balanceAmount {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: clamp(36px, 4vw, 50px);
  font-weight: 900;
  color: #ffffff;
  line-height: 1.1;
  margin-bottom: 6px;
  letter-spacing: -0.5px;
}

.currencyPrefix {
  color: var(--color-goldenrod-200, #eec24b);
}

.borrowedInfo {
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 22px;
}

.metricsStrip {
  display: flex;
  align-items: center;
  gap: 24px;
  background-color: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  padding: 12px 24px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  flex-wrap: wrap;
}

.metricItem {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.metricTitle {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.65);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.metricVal {
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
}

.metricValGold {
  font-size: 16px;
  font-weight: 800;
  color: var(--color-goldenrod-200, #eec24b);
}

.metricDivider {
  width: 1px;
  height: 28px;
  background-color: rgba(255, 255, 255, 0.15);
}

.unifiedInfoCardWrapper {
  padding: 24px 28px;
  box-sizing: border-box;
}

.unifiedInfoContainer {
  background-color: #faf7f2;
  border-radius: 16px;
  border: 1px solid #ede4d6;
  padding: 22px 26px;
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  align-items: stretch;
  gap: 22px;
}

.unifiedCol {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}

.unifiedColDivider {
  width: 1px;
  background-color: #e5dcd0;
  align-self: stretch;
}

.cardHead {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.cardTitle {
  margin: 0;
  font-size: 14.5px;
  font-weight: 800;
  color: #0f2e24;
}

.cardSubtitle {
  margin: 0;
  font-size: 11.5px;
  color: #6b7280;
}

.cardDetails {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dataRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.dataLabel {
  color: #6b7280;
  font-weight: 500;
}

.dataValue {
  color: #111827;
  font-weight: 700;
  text-align: right;
  max-width: 60%;
}

.tabsRow {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 28px 18px;
  border-bottom: 1px solid #f1f5f9;
  flex-wrap: wrap;
}

.filterPill {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 9999px;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
  color: #374151;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-inter);
  transition: all 0.15s ease;
}

.filterPill:hover {
  border-color: #d1d5db;
}

.filterPillActive {
  background-color: var(--color-darkslategray-600, #013525);
  color: #ffffff;
  border-color: var(--color-darkslategray-600, #013525);
}

.filterCount {
  font-size: 12px;
  opacity: 0.9;
}

.tableSection {
  padding: 20px 28px 0;
}

.tableHeading {
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 800;
  color: #1a202c;
}

.tableSub {
  margin: 0;
  font-size: 13px;
  color: #718096;
  line-height: 1.5;
  max-width: 720px;
}

.detailCardsGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;
}

.subCard {
  background-color: #faf7f2;
  border: 1px solid #ede4d6;
  border-radius: 14px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.subCardTitle {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 800;
  color: #0f2e24;
}

.subCardText {
  margin: 0;
  font-size: 13.5px;
  color: #4b5563;
  line-height: 1.55;
}

.docsList {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}

.docItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  background-color: #fafbfb;
  transition: all 0.15s ease;
}

.docItem:hover {
  background-color: #f3f4f6;
  border-color: #d1d5db;
}

.docLeft {
  display: flex;
  align-items: center;
  gap: 14px;
}

.docIconBox {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: #ecfdf5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.docTitle {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: #111827;
}

.docMeta {
  display: block;
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
}

.docBtn {
  padding: 8px 18px;
  border-radius: 9999px;
  border: 1px solid #2e7d5b;
  background-color: #ffffff;
  color: #2e7d5b;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-inter);
  transition: all 0.15s ease;
}

.docBtn:hover {
  background-color: #2e7d5b;
  color: #ffffff;
}

.noResults {
  text-align: center;
  padding: 30px;
  color: #6b7280;
  font-size: 14px;
}

.noCorrections {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  padding: 16px 20px;
  border-radius: 14px;
  background-color: #ecfdf5;
  border: 1px solid #a7f3d0;
  color: #059669;
  font-size: 14px;
  font-weight: 600;
}

.correctionsList {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}

.correctionItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-radius: 14px;
  border: 1px solid #fed7aa;
  background-color: #fff7ed;
  transition: all 0.15s ease;
}

.correctionLeft {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.correctionIcon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background-color: #ffedd5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.correctionField {
  display: block;
  font-size: 14px;
  font-weight: 800;
  color: #7c2d12;
  margin-bottom: 2px;
}

.correctionIssue {
  display: block;
  font-size: 13px;
  color: #9a3412;
  line-height: 1.45;
  max-width: 560px;
}

.correctionBadge {
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.4px;
  background-color: #fde68a;
  color: #78350f;
  white-space: nowrap;
}

/* Status badges */
.statusActive {
  display: inline-block;
  background-color: #00b67a;
  color: #ffffff;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
  padding: 4px 14px;
  border-radius: 6px;
  text-transform: uppercase;
}

.statusReview {
  display: inline-block;
  background-color: #d99b26;
  color: #ffffff;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
  padding: 4px 14px;
  border-radius: 6px;
  text-transform: uppercase;
}

.statusReturn {
  display: inline-block;
  background-color: #e65100;
  color: #ffffff;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
  padding: 4px 14px;
  border-radius: 6px;
  text-transform: uppercase;
}

.statusDraft {
  display: inline-block;
  background-color: transparent;
  border: 1px dashed #c9a04a;
  color: #8a6410;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
  padding: 3px 13px;
  border-radius: 6px;
  text-transform: uppercase;
}

.editSection {
  padding: 20px 28px 0;
}

.editHead {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.editActions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

  .correctionsActions {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
    margin-top: 18px;
    padding-top: 18px;
    border-top: 1px solid #f1ede5;
  }
  .resubmitBtn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 42px;
    padding: 0 20px;
    border: none;
    border-radius: 12px;
    background-color: var(--color-darkslategray-500);
    color: #ffffff;
    font-family: inherit;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  .resubmitBtn:hover {
    background-color: var(--color-darkslategray-600);
  }
  .correctionsHint {
    font-size: 13px;
    color: var(--color-darkslategray-100);
  }
  .uploadRow {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
    margin: 4px 0 14px;
  }
  .uploadBtn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding: 0 16px;
    border-radius: 12px;
    border: 1px dashed var(--color-lightgray-200);
    background-color: var(--color-white);
    color: var(--color-darkslategray-500);
    font-size: 13.5px;
    font-weight: 700;
    cursor: pointer;
    transition: border-color 0.2s ease, background-color 0.2s ease;
  }
  .uploadBtn:hover {
    border-color: var(--color-darkslategray-500);
    background-color: var(--color-floralwhite);
  }
  .uploadInput {
    display: none;
  }
  .uploadHint {
    font-size: 12.5px;
    color: var(--color-darkslategray-100);
  }

.viewState {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding: 48px 12px;
  font-family: var(--font-inter);
  color: var(--color-darkslategray-500);
}

.emptyLink {
  color: #0f6b4f;
  font-weight: 600;
  text-decoration: none;
}

.emptyLink:hover {
  text-decoration: underline;
}

.savedNotice {
  margin: 14px 0 0;
  padding: 9px 14px;
  border-radius: 10px;
  background-color: #e8f5ee;
  border: 1px solid #b7e2c9;
  color: #14532d;
  font-size: 12.5px;
  font-weight: 600;
}

.editGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px 16px;
  margin-top: 16px;
}

.editField,
.editFieldFull {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.editFieldFull {
  grid-column: 1 / -1;
}

.editLabel {
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: #718096;
}

.editInput,
.editTextarea {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #d9d3c7;
  background-color: #fdfbf7;
  color: #1a202c;
  font-family: var(--font-inter);
  font-size: 13.5px;
  line-height: 1.5;
}

.editTextarea {
  resize: none;
  overflow-y: hidden;
  min-height: 62px;
}

.editInput:focus,
.editTextarea:focus {
  outline: none;
  border-color: #d99b26;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(217, 155, 38, 0.18);
}

@media screen and (max-width: 750px) {
  .editSection {
    padding: 16px 18px 0;
  }

  .editGrid {
    grid-template-columns: 1fr;
  }
}

.statusRejected {
  display: inline-block;
  background-color: #d32f2f;
  color: #ffffff;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
  padding: 4px 14px;
  border-radius: 6px;
  text-transform: uppercase;
}

@media screen and (max-width: 1100px) {
  .unifiedInfoContainer {
    grid-template-columns: 1fr;
  }
  .unifiedColDivider {
    display: none;
  }
  .detailCardsGrid {
    grid-template-columns: 1fr;
  }
}

/* ── Evaluator report & adjudication card ── */
.reviewCard {
  margin: 0 24px 24px;
  padding: 24px 26px;
  border-radius: 20px;
  background-color: #fbf9f4;
  border: 1px solid #ece5d8;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
}
.reviewHead {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.reviewStatus {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  background-color: #e4f2e0;
  color: #2c6b32;
  font-size: 12px;
  font-weight: 700;
}
.rubricGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
.rubricItem {
  padding: 14px 16px;
  border-radius: 14px;
  background-color: #ffffff;
  border: 1px solid #eee6d8;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.rubricLabelRow {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
}
.rubricName {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--color-darkslategray-500);
}
.rubricWeight {
  font-size: 12px;
  font-weight: 700;
  color: #9a7a2f;
}
.rubricHint {
  margin: 0;
  font-size: 12px;
  color: #7d7466;
}
.scoreRow {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 6px;
}
.scoreRange {
  flex: 1;
  accent-color: #b98314;
}
.scoreValue {
  min-width: 46px;
  text-align: right;
  font-size: 12.5px;
  font-weight: 700;
  color: #013525;
}
.reviewSummaryRow {
  display: grid;
  grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.3fr);
  gap: 12px;
  align-items: stretch;
}
.reviewScoreBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  padding: 12px 16px;
  border-radius: 14px;
  background-color: #013525;
  color: #d8e6dd;
  font-size: 12px;
}
.reviewScoreBox b {
  font-size: 22px;
  color: #f2c94c;
}
.reviewField {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 600;
  color: #4c473f;
}
.reviewSelect,
.reviewTextarea {
  width: 100%;
  border-radius: 12px;
  border: 1px solid #ddd3c2;
  background-color: #ffffff;
  padding: 10px 12px;
  font-family: inherit;
  font-size: 13.5px;
  color: #1f1b16;
  box-sizing: border-box;
}
.reviewTextarea {
  resize: vertical;
  line-height: 1.5;
}
.reviewSelect:focus,
.reviewTextarea:focus {
  outline: none;
  border-color: #b98314;
  box-shadow: 0 0 0 3px rgba(185, 131, 20, 0.15);
}
.reviewActions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.reviewActionsHint {
  font-size: 12px;
  color: #827868;
  max-width: 440px;
}
.reviewError {
  margin: 0;
  padding: 10px 14px;
  border-radius: 10px;
  background-color: #fdf0ed;
  color: #b42318;
  font-size: 13px;
}
.reviewNotice {
  margin: 0;
  padding: 10px 14px;
  border-radius: 10px;
  background-color: #e8f5e4;
  color: #226235;
  font-size: 13px;
  font-weight: 600;
}
.reviewEmpty {
  padding: 14px 4px;
  font-size: 13px;
  color: #827868;
}
.reportList {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.reportCard {
  padding: 16px 18px;
  border-radius: 14px;
  background-color: #ffffff;
  border: 1px solid #eee6d8;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.reportTop {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}
.reportWho {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 13px;
  color: #827868;
}
.reportWho b {
  font-size: 14px;
  color: #1f1b16;
}
.reportScoreBig {
  font-size: 24px;
  font-weight: 800;
  color: #013525;
  white-space: nowrap;
}
.reportScoreBig small {
  font-size: 11px;
  color: #827868;
  font-weight: 600;
}
.reportRecommendation {
  align-self: flex-start;
  padding: 4px 10px;
  border-radius: 999px;
  background-color: #f3efe7;
  color: #6b5a2a;
  font-size: 11.5px;
  font-weight: 700;
}
.reportComment {
  margin: 0;
  font-size: 13px;
  line-height: 1.55;
  color: #4c473f;
  white-space: pre-wrap;
}
.reportScores {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 14px;
  padding-top: 8px;
  border-top: 1px dashed #eee6d8;
  font-size: 11.5px;
  color: #827868;
}
.reportScores b {
  color: #1f1b16;
}
.decisionApprove,
.decisionDecline {
  height: 44px;
  padding: 0 18px;
  border: none;
  border-radius: 10px;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
}
.decisionApprove {
  background-color: #14603f;
  color: #ffffff;
}
.decisionDecline {
  background-color: #9b2c21;
  color: #ffffff;
}
.decisionApprove:disabled,
.decisionDecline:disabled {
  opacity: 0.6;
  cursor: wait;
}

@media screen and (max-width: 750px) {
  .mainContent {
    padding: 20px 16px 32px;
  }
  .reviewCard {
    margin: 0 12px 18px;
    padding: 18px 16px;
  }
  .rubricGrid,
  .reviewSummaryRow {
    grid-template-columns: 1fr;
  }
  .reviewActions {
    flex-direction: column;
    align-items: stretch;
  }
}

@media screen and (max-width: 1050px) {
  .mainContent {
    padding-top: 64px;
  }
}
/* ── Print-only compiled application document ── */
.printDoc {
  display: none;
}

@media print {
  .page {
    display: block;
    width: auto;
    height: auto;
    overflow: visible;
    background: #ffffff;
  }

  .page > * {
    display: none !important;
  }

  .page > .printDoc {
    display: block !important;
    color: #111827;
    background: #ffffff;
    font-family: var(--font-inter, "Inter", sans-serif);
    font-size: 11pt;
    line-height: 1.5;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .printHead {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    padding-bottom: 14px;
    border-bottom: 2px solid #013626;
  }

  .printHeadMain {
    min-width: 0;
  }

  .printLogo {
    display: block;
    width: 150px;
    height: auto;
    max-width: 60%;
    object-fit: contain;
    margin-bottom: 10px;
  }

  .printBrand {
    font-size: 9pt;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: #6b7280;
  }

  .printTitle {
    margin: 4px 0 4px;
    font-size: 22pt;
    line-height: 1.15;
    font-weight: 800;
    color: #013626;
  }

  .printRef {
    font-size: 9.5pt;
    color: #4b5563;
  }

  .printStatus {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    text-align: right;
    white-space: nowrap;
  }

  .printStatusLabel {
    font-size: 8pt;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #6b7280;
  }

  .printStatusValue {
    font-size: 11pt;
    font-weight: 700;
    color: #013626;
  }

  .printSection {
    margin-top: 18px;
    break-inside: avoid;
  }

  .printSectionTitle {
    margin: 0 0 6px;
    padding-bottom: 3px;
    border-bottom: 1px solid #d1d5db;
    font-size: 11pt;
    font-weight: 800;
    letter-spacing: 0.2px;
    text-transform: uppercase;
    color: #013626;
  }

  .printText {
    margin: 0;
    font-size: 10.5pt;
    line-height: 1.55;
    color: #1f2937;
  }

  .printTable {
    width: 100%;
    border-collapse: collapse;
    font-size: 9.5pt;
  }

  .printTable th,
  .printTable td {
    border: 1px solid #d1d5db;
    padding: 6px 8px;
    text-align: left;
    vertical-align: top;
  }

  .printTable th {
    width: 22%;
    background-color: #f3f4f6;
    font-weight: 700;
    color: #111827;
  }

  .printTable thead th {
    width: auto;
    background-color: #013626;
    color: #ffffff;
    font-size: 9pt;
    letter-spacing: 0.4px;
    text-transform: uppercase;
  }

  .printFooter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-top: 26px;
    padding-top: 10px;
    border-top: 1px solid #d1d5db;
    font-size: 8.5pt;
    color: #6b7280;
  }
}

@media print {
  @page {
    margin: 16mm 15mm;
  }
}

/* ── Mobile ── */
@media screen and (max-width: 760px) {
  .page {
    display: block;
    width: 100%;
    height: auto;
    min-height: 100vh;
    overflow: visible;
  }

  .mainContent {
    height: auto;
    min-height: 100vh;
    overflow: visible;
    padding: 68px 14px 40px;
    box-sizing: border-box;
  }

  .div {
    flex-direction: column-reverse;
    align-items: stretch;
    row-gap: 12px;
    margin-bottom: 16px;
  }

  .div2 {
    width: 100%;
  }

  .div3 {
    width: 100%;
    height: auto;
    justify-content: flex-end;
    gap: 8px;
  }

  .dumelaMarion {
    font-size: 26px;
    line-height: 1.15;
    letter-spacing: -0.4px;
  }

  .sunday4October {
    font-size: 14px;
    line-height: 1.45;
  }

  .balanceBanner {
    padding: 20px 16px 22px;
    border-radius: 16px 16px 0 0;
  }

  .cardContainer {
    border-radius: 16px;
  }


  .filterPill {
    padding: 8px 12px;
    font-size: 12.5px;
  }



  .actionBtns {
    width: 100%;
    flex-wrap: wrap;
  }

  .actionSolidBtn,
  .actionOutlineBtn {
    flex: 1;
    justify-content: center;
  }

  .bannerTags {
    flex-wrap: wrap;
    gap: 8px;
  }

  .metricsStrip {
    gap: 14px 20px;
    padding: 12px 16px;
    width: 100%;
    box-sizing: border-box;
  }
}

@media screen and (max-width: 760px) {
  .actionBar {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .navRow {
    flex-wrap: wrap;
    row-gap: 2px;
  }

  .navCurrent {
    white-space: nowrap;
  }

  .sunday4October {
    white-space: normal;
    overflow-wrap: break-word;
  }

  .tabsRow,
  .tabBar {
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dataRow {
    gap: 12px;
  }

  .dataValue {
    max-width: 58%;
    overflow-wrap: anywhere;
  }

  .blindNote {
    margin: 10px 0 0;
    padding: 9px 11px;
    border-radius: 8px;
    background: #f4f1ea;
    color: #6a635c;
    font-size: 12px;
    line-height: 1.45;
  }

  /* Gaborone theme: white header text only on this preset. */
  .isGaborone .dumelaMarion {
    color: #ffffff;
  }
  .isGaborone .sunday4October {
    color: #ffffff;
  }
  .isGaborone .sunday4October b {
    color: #ffffff;
  }
  .isGaborone .backLink {
    color: #ffffff;
  }
  .isGaborone .navCurrent {
    color: #ffffff;
  }
  .isGaborone .navDivider {
    color: rgba(255, 255, 255, 0.6);
  }
}
</style>
