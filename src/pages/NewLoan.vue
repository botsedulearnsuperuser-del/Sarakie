<template>
  <div :class="$style.page">
    <!-- Reusable Stationary Sidebar -->
    <Main :active-page="'dashboard'" />

    <!-- Main Scrollable Content -->
    <main :class="$style.mainContent">
      <!-- Top Bar Header -->
      <header :class="$style.topBar">
        <div :class="$style.topBarLeft">
          <h2 :class="$style.pageTitle">New idea application</h2>
          <p :class="$style.pageSub">Your progress saves as you go, so you can finish later.</p>
        </div>
        <div :class="$style.topBarRight">
          <img :class="$style.iconBtn" alt="" src="/Notifications-2-new.svg" />
          <img :class="$style.iconBtn" alt="" src="/Help.svg" />
          <router-link to="/admin-profile" :class="$style.userA" style="text-decoration: none;">
            <img :class="$style.userAvatarImg" src="/innovator-man.webp" alt="Marion Lucas" />
            <div :class="$style.userName">Marion Lucas</div>
          </router-link>
        </div>
      </header>

      <!-- Step Progress Bar inside White Container -->
      <div :class="$style.stepsBar">
        <div
          v-for="(step, idx) in steps"
          :key="idx"
          :class="[
            $style.step,
            idx + 1 === currentStep ? $style.stepActive : '',
            idx + 1 < currentStep ? $style.stepDone : ''
          ]"
          @click="goToStep(idx + 1)"
        >
          <span :class="$style.stepNum">{{ idx + 1 }}</span>
          <span :class="$style.stepLabel">{{ step }}</span>
        </div>
      </div>

      <!-- Content Area -->
      <div :class="$style.contentArea">
        <!-- Left: Large White Form Card Container -->
        <section :class="$style.formSection">
          <!-- Submission Success Screen -->
          <div v-if="ideaSubmitted" :class="$style.successScreen">
            <div :class="$style.successIconBox">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path fill="#2b9c6e" d="M19.78 2.2L24 6.42L8.44 22L0 13.55l4.22-4.22l4.22 4.22zm0 2.8L8.44 16.36l-4.22-4.17l-1.41 1.36l5.63 5.62L21.19 6.42z" />
              </svg>
            </div>
            <h2 :class="$style.successTitle">Idea submitted!</h2>
            <p :class="$style.successSub">
              Idea for <b>{{ customer.firstName }} {{ customer.lastName }}</b> has been successfully submitted and routed to the innovation review queue.
            </p>
            <div :class="$style.successCard">
              <div :class="$style.successRow">
                <span>Idea reference</span>
                <b>SRK-I-10850</b>
              </div>
              <div :class="$style.successRow">
                <span>Idea name</span>
                <b>{{ selectedIdea }}</b>
              </div>
              <div :class="$style.successRow">
                <span>Funding requested</span>
                <b :class="$style.successGold">P {{ requestedAmount.toLocaleString() }}</b>
              </div>
              <div :class="$style.successRow">
                <span>Recorded by</span>
                <b>Marion Lucas (SRK-ADM-0042)</b>
              </div>
            </div>
            <div :class="$style.successActions">
              <router-link to="/dashboard-sample" :class="$style.successBtn">Return to Dashboard</router-link>
              <button :class="$style.newAppBtn" type="button" @click="resetForm">Record another idea</button>
            </div>
          </div>

          <!-- Dynamic Steps 1 through 6 -->
          <div v-else>
            <!-- ── Step 1: Idea Overview ── -->
            <div v-if="currentStep === 1">
              <div :class="$style.stepIndicator">Step 1 of 6</div>
              <h1 :class="$style.formTitle">Idea overview</h1>
              <p :class="$style.formSub">Describe your innovation and the problem it solves.</p>

              <div :class="$style.formCardInner">
                <div :class="$style.formGrid2">
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Idea name</label>
                    <input v-model="selectedIdea" :class="$style.textInput" type="text" placeholder="e.g. Solar-powered irrigation system" />
                  </div>
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Sector</label>
                    <select v-model="selectedSector" :class="$style.selectInput">
                      <option value="Agriculture">Agriculture</option>
                      <option value="Renewable energy">Renewable energy</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Technology">Technology</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div :class="$style.formGrid2">
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Funding requested (P)</label>
                    <input v-model.number="requestedAmount" :class="$style.textInput" type="text" placeholder="e.g. 50000" />
                  </div>
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Expected impact</label>
                    <input v-model="expectedImpact" :class="$style.textInput" type="text" placeholder="Brief description of expected impact" />
                  </div>
                </div>

                <div :class="$style.formGrid2">
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Innovation type</label>
                    <select v-model="innovationType" :class="$style.selectInput">
                      <option value="Product">New product</option>
                      <option value="Process">Improved process</option>
                      <option value="Service">New service</option>
                      <option value="Platform">Digital platform</option>
                    </select>
                  </div>
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Maturity level</label>
                    <select v-model="maturityLevel" :class="$style.selectInput">
                      <option value="Concept">Concept stage</option>
                      <option value="Prototype">Prototype stage</option>
                      <option value="Pilot">Pilot stage</option>
                      <option value="Deployed">Deployed</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- ── Step 2: Innovator Details ── -->
            <div v-else-if="currentStep === 2">
              <div :class="$style.stepIndicator">Step 2 of 6</div>
              <h1 :class="$style.formTitle">Innovator details</h1>
              <p :class="$style.formSub">Provide your personal and professional information.</p>

              <div :class="$style.formCardInner">
                <div :class="$style.formGrid2">
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">First name</label>
                    <input v-model="customer.firstName" :class="$style.textInput" type="text" placeholder="e.g. Tlhalefang" />
                  </div>
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Last name</label>
                    <input v-model="customer.lastName" :class="$style.textInput" type="text" placeholder="e.g. Molefe" />
                  </div>
                </div>

                <div :class="$style.formGrid2">
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Omang / National ID</label>
                    <input v-model="customer.omang" :class="$style.textInput" type="text" placeholder="e.g. 931528410" />
                  </div>
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Email address</label>
                    <input v-model="customer.email" :class="$style.textInput" type="email" placeholder="e.g. t.molefe@gmail.com" />
                  </div>
                </div>

                <div :class="$style.formGrid2">
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Phone number</label>
                    <input v-model="customer.mobile" :class="$style.textInput" type="tel" placeholder="e.g. +267 71 234 567" />
                  </div>
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Organization</label>
                    <input v-model="customer.organization" :class="$style.textInput" type="text" placeholder="e.g. Innovative Holdings (Pty) Ltd" />
                  </div>
                </div>
              </div>
            </div>

            <!-- ── Step 3: Contact & Address ── -->
            <div v-else-if="currentStep === 3">
              <div :class="$style.stepIndicator">Step 3 of 6</div>
              <h1 :class="$style.formTitle">Contact & address</h1>
              <p :class="$style.formSub">Provide physical and postal contact information.</p>

              <div :class="$style.formCardInner">
                <div :class="$style.formGrid2">
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Physical plot / Street address</label>
                    <input v-model="customer.physicalAddress" :class="$style.textInput" type="text" placeholder="e.g. Plot 4471, Mokgosi Close" />
                  </div>
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">City / Town</label>
                    <input v-model="customer.city" :class="$style.textInput" type="text" placeholder="e.g. Gaborone" />
                  </div>
                </div>

                <div :class="$style.formGrid2">
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Area / Ward / Block</label>
                    <input v-model="customer.area" :class="$style.textInput" type="text" placeholder="e.g. Block 8" />
                  </div>
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Postal address</label>
                    <input v-model="customer.postalAddress" :class="$style.textInput" type="text" placeholder="e.g. P O Box 20451, Gaborone" />
                  </div>
                </div>

                <div :class="$style.formGrid2">
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Years at current location</label>
                    <input v-model="customer.yearsAtAddress" :class="$style.textInput" type="number" placeholder="e.g. 3" />
                  </div>
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Preferred contact method</label>
                    <select v-model="preferredContact" :class="$style.selectInput">
                      <option value="Phone">Phone</option>
                      <option value="Email">Email</option>
                      <option value="In-person">In-person</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- ── Step 4: Field/Industry ── -->
            <div v-else-if="currentStep === 4">
              <div :class="$style.stepIndicator">Step 4 of 6</div>
              <h1 :class="$style.formTitle">Field / Industry details</h1>
              <p :class="$style.formSub">Describe your innovation's sector and target market.</p>

              <div :class="$style.formCardInner">
                <div :class="$style.formGrid2">
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Target market</label>
                    <input v-model="targetMarket" :class="$style.textInput" type="text" placeholder="e.g. Smallholder farmers in Botswana" />
                  </div>
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Competitive advantage</label>
                    <input v-model="competitiveAdvantage" :class="$style.textInput" type="text" placeholder="What makes your idea unique?" />
                  </div>
                </div>

                <div :class="$style.formGrid2">
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Projected reach</label>
                    <input v-model="projectedReach" :class="$style.textInput" type="text" placeholder="e.g. 5,000 beneficiaries" />
                  </div>
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Timeline to market</label>
                    <input v-model="timelineToMarket" :class="$style.textInput" type="text" placeholder="e.g. 12 months" />
                  </div>
                </div>

                <div :class="$style.formGrid2">
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Regulatory requirements</label>
                    <input v-model="regulatoryRequirements" :class="$style.textInput" type="text" placeholder="Any permits, licenses or compliance needed?" />
                  </div>
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">IP protection</label>
                    <select v-model="ipProtection" :class="$style.selectInput">
                      <option value="None">None</option>
                      <option value="Patent">Patent</option>
                      <option value="Trademark">Trademark</option>
                      <option value="Copyright">Copyright</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- ── Step 5: Supporting Documents ── -->
            <div v-else-if="currentStep === 5">
              <div :class="$style.stepIndicator">Step 5 of 6</div>
              <h1 :class="$style.formTitle">Supporting documents</h1>
              <p :class="$style.formSub">Upload documents required for this idea submission.</p>

              <div :class="$style.formCardInner">
                <!-- Empty state: nothing uploaded yet -->
                <div v-if="documents.length === 0" :class="$style.emptyDocState">
                  <div :class="$style.emptyDocIcons">
                    <svg
                      v-for="(icon, index) in docIcons"
                      :key="icon.key"
                      :class="$style.emptyDocIcon"
                      :style="{ animationDelay: `${index * 0.12}s` }"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <g fill="none">
                        <path :d="docIconBase" fill="currentColor" opacity=".2" />
                        <path :d="docIconOutline" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
                        <path :d="icon.glyph" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
                      </g>
                    </svg>
                  </div>
                  <b :class="$style.noUploadTitle">Documents have not yet been uploaded</b>
                  <span :class="$style.noUploadText">
                    Add up to 10 files — PDF, JPG, PNG or DOCX, maximum 10MB each.
                  </span>
                  <label :class="$style.docUploadBtn">
                    <input type="file" multiple :class="$style.docFileInput" accept=".pdf,.jpg,.jpeg,.png,.docx" @change="onDocumentsSelected" />
                    <span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      Choose files
                    </span>
                  </label>
                </div>

                <!-- Uploaded documents -->
                <div v-else :class="$style.docList">
                  <div v-for="(doc, index) in documents" :key="doc.id" :class="$style.docItem">
                    <div :class="$style.docInfo">
                      <div :class="$style.docIconBox">
                        <img v-if="doc.preview" :src="doc.preview" :class="$style.docPreviewImg" alt="" />
                        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f2e24" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                      </div>
                      <div :class="$style.docInfoText">
                        <b :class="$style.docName">{{ doc.name }}</b>
                        <span :class="$style.docMeta">{{ doc.meta }}</span>
                      </div>
                    </div>
                    <div :class="$style.docItemRight">
                      <span :class="$style.docBadgeUploaded">Uploaded</span>
                      <button :class="$style.docRemoveBtn" type="button" :title="`Remove ${doc.name}`" @click="removeDocument(index)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </button>
                    </div>
                  </div>

                  <div :class="$style.addMoreRow">
                    <span :class="$style.docCount">{{ documents.length }} of 10 files</span>
                    <label v-if="documents.length < 10" :class="$style.docUploadBtn">
                      <input type="file" multiple :class="$style.docFileInput" accept=".pdf,.jpg,.jpeg,.png,.docx" @change="onDocumentsSelected" />
                      <span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Add more files
                      </span>
                    </label>
                  </div>
                </div>

                <p v-if="uploadError" :class="$style.uploadError">{{ uploadError }}</p>

                <!-- Clue: what kind of documents to submit -->
                <div :class="$style.docHints">
                  <b :class="$style.docHintsTitle">What to include</b>
                  <div :class="$style.docHintPills">
                    <span v-for="hint in documentHints" :key="hint" :class="$style.docHintPill">{{ hint }}</span>
                  </div>
                  <span :class="$style.docHintsNote">
                    Combine these into one proposal document if you prefer — anything that shows the problem, your solution and the numbers behind it.
                  </span>
                </div>
              </div>
            </div>

            <!-- ── Step 6: Submission ── -->
            <div v-else-if="currentStep === 6">
              <div :class="$style.stepIndicator">Step 6 of 6</div>
              <h1 :class="$style.formTitle">Submission & authorization</h1>
              <p :class="$style.formSub">Confirm your idea submission and authorize CEDA to process your application.</p>

              <div :class="$style.formCardInner">
                <!-- Idea Authorization Checkbox -->
                <label :class="$style.checkboxRow">
                  <input v-model="ideaAuthorization" type="checkbox" :class="$style.checkboxInput" />
                  <span :class="$style.checkboxLabel">
                    <b>I confirm the information provided is accurate and complete.</b>
                  </span>
                </label>

                <!-- Admin Officer Signature Note -->
                <div :class="$style.adminAuditNote">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f2e24" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                  <span>Recorded by Branch Administrator <b>Marion Lucas</b> (Employee ID: SRK-ADM-0042)</span>
                </div>
              </div>
            </div>

            <!-- Bottom Actions -->
            <div :class="$style.formActions">
              <div :class="$style.actionsLeft">
                <button v-if="currentStep > 1" :class="$style.prevBtn" type="button" @click="prevStep">Back</button>
                <router-link to="/dashboard-sample" :class="$style.cancelLink">Cancel</router-link>
              </div>

              <!-- Next Button for Steps 1 through 5 -->
              <button v-if="currentStep < 6" :class="$style.submitBtn" type="button" @click="nextStep">
                Next
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>

              <!-- Final Submission Button only on Step 6 -->
              <button v-else :class="[$style.submitBtn, $style.recordBtn]" type="button" :disabled="documents.length === 0 || !ideaAuthorization" @click="submitIdeaRecord">
                Submit idea application
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </button>
            </div>

            <!-- Step 5: documents uploaded summary -->
            <div v-if="currentStep === 5" :class="$style.docSummaryInline">
              <div :class="$style.docSummaryHeader">
                <b :class="$style.docSummaryTitle">Documents uploaded</b>
                <span :class="$style.docSummaryCount">{{ totalUploaded }} / 10</span>
              </div>
              <div v-if="documents.length" :class="$style.docProgressList">
                <div v-for="doc in documents" :key="doc.id" :class="[$style.docProgressItem, $style.docProgressDone]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span :class="$style.docProgressName">{{ doc.name }}</span>
                </div>
              </div>
              <p v-else :class="$style.docSummaryEmpty">Documents have not yet been uploaded.</p>
              <div v-if="!documents.length" :class="$style.docSummaryHint">
                Upload at least 1 document to proceed to the final step.
              </div>
            </div>
          </div>
        </section>

        <!-- Right: Idea Summary Sidebar -->
        <aside :class="$style.summaryAside">
          <!-- Idea Summary Card with Ethnic Pattern Watermark -->
          <div :class="$style.summaryCard">
            <img src="/pattern-2.webp" :class="$style.patternWatermark" alt="" />
            <div :class="$style.summaryCardInner">
              <span :class="$style.summaryLabel">Customer idea</span>
              <div :class="$style.summaryAmount">P {{ requestedAmount || 0 }}</div>
              <div :class="$style.summaryPurpose">{{ selectedIdea }}, {{ selectedSector }}</div>
              <div :class="$style.summaryDivider"></div>
              <div :class="$style.summaryRows">
                <div :class="$style.summaryRow">
                  <span>Estimated impact</span>
                  <b :class="$style.summaryHighlight">{{ expectedImpact || 'Not specified' }}</b>
                </div>
                <div :class="$style.summaryRow">
                  <span>Innovation type</span>
                  <b :class="$style.summaryHighlight">{{ innovationType || 'Not specified' }}</b>
                </div>
                <div :class="$style.summaryRow">
                  <span>Maturity level</span>
                  <b :class="$style.summaryHighlight">{{ maturityLevel || 'Not specified' }}</b>
                </div>
                <div :class="$style.summaryRow">
                  <span>Target market</span>
                  <b :class="$style.summaryHighlight">{{ targetMarket || 'Not specified' }}</b>
                </div>
              </div>
            </div>
          </div>

          <!-- Info Card with Amber Shield Badge -->
          <div :class="$style.infoCard">
            <div :class="$style.infoIcon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
            </div>
            <div :class="$style.infoContent">
              <b :class="$style.infoTitle">Idea data is protected</b>
              <span :class="$style.infoText">Customer records are encrypted and handled in strict compliance with CEDA and innovation regulations.</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Main from "../components/Main.vue";

const steps = ["Idea overview", "Innovator details", "Contact & address", "Field / Industry", "Supporting documents", "Submission"];
const currentStep = ref(1);

const selectedIdea = ref("");
const selectedSector = ref("Agriculture");
const requestedAmount = ref(0);
const expectedImpact = ref("");
const innovationType = ref("Product");
const maturityLevel = ref("Concept");

const customer = ref({
  firstName: "Tlhalefang",
  lastName: "Molefe",
  omang: "931528410",
  dob: "1994-03-14",
  gender: "Male",
  maritalStatus: "Single",
  mobile: "+267 71 234 567",
  email: "tlhalefang.molefe@gmail.com",
  physicalAddress: "Plot 4471, Mokgosi Close",
  city: "Gaborone",
  area: "Block 8",
  postalAddress: "P O Box 20451, Gaborone",
  yearsAtAddress: 3,
  organization: "Innovative Holdings (Pty) Ltd",
});

const preferredContact = ref("Email");
const targetMarket = ref("");
const competitiveAdvantage = ref("");
const projectedReach = ref("");
const timelineToMarket = ref("");
const regulatoryRequirements = ref("");
const ipProtection = ref("None");
const ideaAuthorization = ref(false);

interface UploadedDocument {
  id: string;
  name: string;
  meta: string;
  preview: string;
}

const MAX_DOCUMENTS = 10;
const MAX_DOCUMENT_BYTES = 10 * 1024 * 1024;
const ALLOWED_DOC_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png", ".docx"];

const documents = ref<UploadedDocument[]>([]);
const uploadError = ref("");

const documentHints = [
  "Problem statement",
  "Proposed solution",
  "Financial projections",
  "Business proposal",
  "Market research",
  "Founder / team CVs",
];

const docIconBase =
  "M3.8 13.02V9.5c0-3.46 0-5.19 1.01-6.32l.32-.32c1.12-1.02 2.85-1.04 6.31-1.07c.88-.01 1.32-.02 1.6.24l.09.08c.26.28.26.72.26 1.6v.84c0 1.89 0 2.83.58 3.41c.59.59 1.53.59 3.42.59h.75c.94 0 1.41 0 1.7.3c.3.29.3.76.3 1.7v2.48z";
const docIconOutline =
  "M3.8 12.71V9.1c0-3.13 0-4.69.83-5.77a4 4 0 0 1 .75-.74c1.07-.82 2.63-.82 5.76-.82c1.35 0 2.03 0 2.66.2l.48.2c.6.3 1.07.78 2.04 1.74l.84.84l.56.55c1.2 1.16 1.79 1.74 2.1 2.49c.32.74.32 1.57.32 3.24v1.7";

const docIcons = [
  {
    key: "pdf",
    glyph:
      "M13.19 2.27V4.7c0 1.9 0 2.84.58 3.42c.59.59 1.53.59 3.42.59h2.44M2.48 21.46v-4.93c0-.4 0-.6.15-.75s.33-.15.7-.15c1.3.01 3.64.44 3.64 3.37s-2.34 3.36-3.64 3.37c-.37 0-.55 0-.7-.15s-.15-.35-.15-.76m6.81-2.49c0-1.84 1.14-3.34 2.55-3.34s2.56 1.5 2.56 3.34s-1.15 3.34-2.56 3.34a2.3 2.3 0 0 1-1.82-1a4 4 0 0 1-.73-2.34m12.23-2.92a3.3 3.3 0 1 0 0 5.9",
  },
  {
    key: "image",
    glyph:
      "M13.19 2.27V4.7c0 1.9 0 2.84.58 3.42c.59.59 1.53.59 3.42.59h2.44m-3.23 6.98l1.98 5.58c.23.67.35 1 .56 1s.33-.33.57-1l1.97-5.58m-7.35.87a3 3 0 0 0-2.09-.87c-1 0-2.08.55-2.08 1.72c0 2.51 4.17.51 4.17 3.06c0 1.2-1.07 1.83-2.09 1.83s-1.7-.32-2.17-1.01m-2.58-5.24a3.3 3.3 0 1 0 0 5.9",
  },
  {
    key: "sheet",
    glyph:
      "M13.19 2.27V4.7c0 1.9 0 2.84.58 3.42c.59.59 1.53.59 3.42.59h2.44m-6.39 6.98l1.97 5.58c.24.67.36 1 .57 1s.33-.33.56-1l1.98-5.58m-7.88.36a3.3 3.3 0 1 0 0 5.9",
  },
  {
    key: "pages",
    glyph:
      "M13.19 2.27V4.7c0 1.9 0 2.84.58 3.42c.59.59 1.53.59 3.42.59h2.44M2.55 20.76c.04.35.3 1.64 1.72 1.64s2.15-.99 2.15-3.13V16.6c0-.48 0-.71-.15-.86c-.15-.14-.38-.14-.85-.14H3.63m17.17.47a3.34 3.34 0 1 0-.3 6.1c.33-.13.5-.19.67-.45c.17-.25.17-.5.17-1v-.44c0-.47 0-.7-.14-.85s-.38-.15-.86-.15h-.78M9.44 22.4v-5.8c0-.48 0-.71.15-.86c.15-.14.38-.14.85-.14h1.46a1.9 1.9 0 0 1 1.84 1.94a1.9 1.9 0 0 1-1.84 1.95H9.47",
  },
  {
    key: "export",
    glyph:
      "M13.19 2.27V4.7c0 1.9 0 2.84.58 3.42c.59.59 1.53.59 3.42.59h2.44M3.27 22.37v-5.74c0-.47 0-.7.14-.85s.39-.15.86-.15H5.7c1 0 1.82.87 1.82 1.93c0 1.07-.82 1.93-1.82 1.93H3.3m14.15 2.88v-5.6c0-.48 0-.71.15-.86s.38-.15.85-.15h2.65m-3.65 3.3h2.74m-9.94 2.41v-4.94c0-.4 0-.6.15-.76c.15-.14.33-.14.7-.14c1.3.01 3.62.44 3.62 3.37s-2.33 3.36-3.63 3.37c-.36 0-.54 0-.7-.15c-.14-.14-.14-.35-.14-.75",
  },
  {
    key: "print",
    glyph:
      "M13.19 2.27V4.7c0 1.9 0 2.84.58 3.42c.59.59 1.53.59 3.42.59h2.44M3.51 22.37v-5.74c0-.47 0-.7.15-.85s.38-.15.85-.15h1.43c1 0 1.82.87 1.82 1.93c0 1.07-.81 1.93-1.82 1.93h-2.4m6.86 2.88v-5.74c0-.47 0-.7.16-.85c.14-.15.38-.15.85-.15h1.43c1 0 1.82.87 1.82 1.93c0 1.07-.82 1.93-1.82 1.93h-2.4m8.59-3.69v6.57m-2.07-6.57h4.14",
  },
];

const ideaSubmitted = ref(false);

const totalUploaded = computed(() => documents.value.length);

function formatDocumentSize(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function onDocumentsSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  const files = Array.from(input.files ?? []);
  input.value = "";
  uploadError.value = "";
  if (files.length === 0) return;

  const slots = MAX_DOCUMENTS - documents.value.length;
  if (slots <= 0) {
    uploadError.value = `You can upload up to ${MAX_DOCUMENTS} files. Remove a file to add another.`;
    return;
  }

  const accepted: File[] = [];
  let oversized = false;
  let unsupported = false;

  for (const file of files) {
    const ext = "." + (file.name.split(".").pop() ?? "").toLowerCase();
    if (!ALLOWED_DOC_EXTENSIONS.includes(ext)) {
      unsupported = true;
      continue;
    }
    if (file.size > MAX_DOCUMENT_BYTES) {
      oversized = true;
      continue;
    }
    if (accepted.length >= slots) break;
    accepted.push(file);
  }

  for (const file of accepted) {
    const ext = (file.name.split(".").pop() ?? "").toUpperCase();
    const doc: UploadedDocument = {
      id: `${file.name}-${file.size}-${documents.value.length}-${Date.now()}`,
      name: file.name,
      meta: `${ext} · ${formatDocumentSize(file.size)}`,
      preview: "",
    };
    documents.value.push(doc);

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        doc.preview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  if (files.length > accepted.length) {
    if (accepted.length === 0 && (oversized || unsupported)) {
      uploadError.value = "Only PDF, JPG, PNG or DOCX files up to 10MB can be uploaded.";
    } else if (accepted.length + documents.value.length >= MAX_DOCUMENTS) {
      uploadError.value = `Only ${accepted.length} file(s) added — you can upload up to ${MAX_DOCUMENTS} files.`;
    } else {
      uploadError.value = "Some files were skipped — only PDF, JPG, PNG or DOCX files up to 10MB are accepted.";
    }
  }
}

function removeDocument(index: number) {
  documents.value.splice(index, 1);
  uploadError.value = "";
}

function nextStep() {
  if (currentStep.value < 6) {
    currentStep.value++;
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
}

function goToStep(step: number) {
  currentStep.value = step;
}

function submitIdeaRecord() {
  ideaSubmitted.value = true;
}

function resetForm() {
  currentStep.value = 1;
  ideaSubmitted.value = false;
  documents.value = [];
  uploadError.value = "";
  selectedIdea.value = "";
  requestedAmount.value = 0;
  expectedImpact.value = "";
  innovationType.value = "Product";
  maturityLevel.value = "Concept";
  customer.value = {
    firstName: "Tlhalefang",
    lastName: "Molefe",
    omang: "931528410",
    dob: "1994-03-14",
    gender: "Male",
    maritalStatus: "Single",
    mobile: "+267 71 234 567",
    email: "tlhalefang.molefe@gmail.com",
    physicalAddress: "Plot 4471, Mokgosi Close",
    city: "Gaborone",
    area: "Block 8",
    postalAddress: "P O Box 20451, Gaborone",
    yearsAtAddress: 3,
    organization: "Innovative Holdings (Pty) Ltd",
  };
  preferredContact.value = "Email";
  targetMarket.value = "";
  competitiveAdvantage.value = "";
  projectedReach.value = "";
  timelineToMarket.value = "";
  regulatoryRequirements.value = "";
  ipProtection.value = "None";
  ideaAuthorization.value = false;
}
</script>

<style module>
.page {
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #faf7f2;
  font-family: var(--font-inter);
  overflow: hidden;
}

.mainContent {
  flex: 1;
  height: 100vh;
  overflow-y: auto;
  padding: 24px 36px 48px;
  box-sizing: border-box;
}

.topBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
  flex-wrap: wrap;
  gap: 16px;
}

.topBarLeft {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.pageTitle {
  margin: 0;
  font-size: 32px;
  letter-spacing: -0.7px;
  font-weight: 800;
  color: #0f2e24;
}

.pageSub {
  margin: 0;
  font-size: 14.5px;
  color: #6b7280;
}

.topBarRight {
  display: flex;
  align-items: center;
  gap: 10px;
}

.iconBtn {
  height: 44px;
  width: 44px;
  border-radius: 22px;
  cursor: pointer;
}

.userA {
  height: 46px;
  border-radius: 9999px;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  padding: 4px 14px 4px 5px;
  gap: 9px;
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

.userAvatar {
  height: 36px;
  width: 36px;
  border-radius: 18px;
  background-color: #0f2e24;
  display: flex;
  align-items: center;
  justify-content: center;
}

.userInitials {
  color: #f7d58a;
  font-size: 13px;
  font-weight: 700;
}

.userName {
  font-weight: 600;
  font-size: 14.5px;
  color: #0f2e24;
}

/* ── Steps Bar (White Container Pill) ── */
.stepsBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 9999px;
  padding: 6px 14px;
  margin-bottom: 24px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);
  overflow-x: auto;
}

.step {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 9999px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.stepNum {
  width: 22px;
  height: 22px;
  min-width: 22px;
  border-radius: 50%;
  border: 1.5px solid #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #9ca3af;
  transition: all 0.2s ease;
}

.stepLabel {
  font-size: 13.5px;
  font-weight: 600;
  color: #6b7280;
  transition: all 0.2s ease;
}

.stepActive {
  background-color: #fef3c7;
}

.stepActive .stepNum {
  background-color: #d97706;
  border-color: #d97706;
  color: #ffffff;
}

.stepActive .stepLabel {
  color: #111827;
  font-weight: 700;
}

.stepDone .stepNum {
  border-color: #2b9c6e;
  background-color: #2b9c6e;
  color: #ffffff;
}

.stepDone .stepLabel {
  color: #374151;
}

/* ── Content Area ── */
.contentArea {
  display: flex;
  gap: 28px;
  align-items: flex-start;
}

/* ── Large White Form Card Container ── */
.formSection {
  flex: 1;
  min-width: 0;
  background-color: #ffffff;
  border-radius: 24px;
  padding: 36px 42px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.03);
}

.stepIndicator {
  font-size: 13px;
  font-weight: 700;
  color: #d97706;
  margin-bottom: 6px;
}

.formTitle {
  margin: 0 0 8px;
  font-size: 30px;
  font-weight: 900;
  color: #0f2e24;
  letter-spacing: -0.5px;
  line-height: 1.2;
}

.formSub {
  margin: 0 0 24px;
  font-size: 14.5px;
  color: #6b7280;
}

/* ── Inner Warm Container for Form Fields (Matching Step 1 Style) ── */
.amountCard,
.formCardInner {
  background-color: #faf6f0;
  border-radius: 18px;
  padding: 24px 28px;
  margin-bottom: 28px;
}

.amountLabel {
  font-size: 13.5px;
  font-weight: 700;
  color: #374151;
  display: block;
  margin-bottom: 6px;
}

.amountInputRow {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.currencySign {
  font-size: 36px;
  font-weight: 900;
  color: #0f2e24;
}

.amountInput {
  font-size: 44px;
  font-weight: 900;
  color: #0f2e24;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font-inter);
  width: 100%;
  padding: 0;
}

.amountDivider {
  width: 100%;
  height: 2.5px;
  background-color: #2e7d5b;
  border-radius: 2px;
  margin: 8px 0 22px;
}

.sliderRow {
  margin-bottom: 22px;
}

.sliderEdges {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12.5px;
  color: #9ca3af;
  font-weight: 600;
}

.quickAmounts {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.quickBtn {
  padding: 9px 20px;
  border-radius: 9999px;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
  color: #1f2937;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-inter);
  transition: all 0.15s ease;
}

.quickBtn:hover {
  border-color: #0f2e24;
  color: #0f2e24;
}

.quickBtnActive {
  background-color: #0f2e24;
  border-color: #0f2e24;
  color: #ffffff;
}

/* ── Form Inputs for Steps 2-5 ── */
.formGrid2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.formGrid2:last-child {
  margin-bottom: 0;
}

.fieldGroup {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.fieldLabel {
  font-size: 13px;
  font-weight: 700;
  color: #374151;
}

.textInput,
.selectInput {
  padding: 11px 14px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  font-family: var(--font-inter);
  outline: none;
  background-color: #ffffff;
  color: #111827;
  box-sizing: border-box;
  width: 100%;
  transition: all 0.15s ease;
}

.textInput:focus,
.selectInput:focus {
  border-color: #0f2e24;
  box-shadow: 0 0 0 3px rgba(15, 46, 36, 0.1);
}

/* ── Documents List (Step 5) ── */
.docItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  margin-bottom: 12px;
}

.docItem:last-child {
  margin-bottom: 0;
}

/* ── Step 5 empty state & multi-file uploads ── */
.emptyDocState {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  padding: 22px 8px 10px;
}

.emptyDocIcons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 4px;
}

.emptyDocIcon {
  width: 38px;
  height: 38px;
  color: #0f2e24;
  flex-shrink: 0;
  opacity: 0;
  animation: docIconIn 0.45s ease forwards, docIconFloat 3.4s ease-in-out infinite;
}

@keyframes docIconIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes docIconFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.noUploadTitle {
  font-size: 15px;
  font-weight: 800;
  color: #0f2e24;
}

.noUploadText {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
  max-width: 330px;
}

.docFileInput {
  display: none;
}

.docUploadBtn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding: 11px 22px;
  border-radius: 9999px;
  border: none;
  background-color: #0f2e24;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  font-family: var(--font-inter);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.docUploadBtn:hover {
  background-color: #081d16;
}

.docList {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.docList .docItem {
  margin-bottom: 0;
}

.docInfoText {
  min-width: 0;
}

.docItemRight {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.docPreviewImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.docBadgeUploaded {
  font-size: 11.5px;
  font-weight: 700;
  color: #2b9c6e;
  background-color: #e7f4ee;
  border: 1px solid #c7e7d8;
  padding: 3px 10px;
  border-radius: 9999px;
  white-space: nowrap;
}

.docRemoveBtn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
}

.docRemoveBtn:hover {
  color: #b42318;
  border-color: #fca5a5;
}

.addMoreRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 2px;
}

.addMoreRow .docUploadBtn {
  margin-top: 0;
  padding: 9px 18px;
  font-size: 13px;
}

.docCount {
  font-size: 12.5px;
  font-weight: 700;
  color: #6b7280;
}

.uploadError {
  margin: 12px 0 0;
  font-size: 12.5px;
  font-weight: 600;
  color: #b42318;
}

.docProgressName {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ── Step 5 hints & inline upload summary ── */
.docHints {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #ece5d9;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.docHintsTitle {
  font-size: 13px;
  font-weight: 800;
  color: #0f2e24;
}

.docHintPills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.docHintPill {
  padding: 6px 14px;
  border-radius: 9999px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  font-size: 12.5px;
  font-weight: 600;
  color: #374151;
}

.docHintsNote {
  font-size: 12px;
  line-height: 1.5;
  color: #9ca3af;
}

.docSummaryInline {
  margin-top: 20px;
  padding: 16px 20px;
  background-color: #faf6f0;
  border: 1px solid rgba(0, 0, 0, 0.03);
  border-radius: 14px;
}

.docSummaryHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.docSummaryTitle {
  font-size: 13px;
  font-weight: 700;
  color: #0f2e24;
}

.docSummaryCount {
  font-size: 14px;
  font-weight: 700;
  color: #d97706;
}

.docSummaryEmpty {
  margin: 0;
  font-size: 12.5px;
  color: #9ca3af;
}

.docSummaryHint {
  margin-top: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #d97706;
}

.docProgressEmpty {
  margin: 0;
  font-size: 12.5px;
  color: #9ca3af;
}

.docInfo {
  display: flex;
  align-items: center;
  gap: 14px;
}

.docIconBox {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.docName {
  display: block;
  font-size: 14px;
  color: #111827;
  font-weight: 700;
  margin-bottom: 2px;
}

.docMeta {
  display: block;
  font-size: 12px;
  color: #6b7280;
}

.docBadgeVerified {
  background-color: #ecfdf5;
  color: #059669;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 9999px;
  border: 1px solid #a7f3d0;
}

/* ── Success Screen ── */
.successScreen {
  text-align: center;
}

.successIconBox {
  width: 48px;
  height: 48px;
  margin: 0 auto 20px;
  background-color: #d1e8e2;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}

.successTitle {
  margin: 0 0 12px;
  font-size: 28px;
  font-weight: 900;
  color: #0f2e24;
}

.successSub {
  margin: 0 0 24px;
  font-size: 15px;
  color: #6b7280;
}

.successCard {
  max-width: 400px;
  margin: 0 auto 32px;
  text-align: left;
}

.successRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f3f4f6;
}

.successRow:last-child {
  border-bottom: none;
}

.successActions {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.newAppBtn {
  padding: 10px 24px;
  border-radius: 10px;
  background-color: #0f2e24;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border: none;
}

/* ── Sidebar Styles ── */

.summaryAside {
  width: 280px;
  flex-shrink: 0;
}

.summaryCard {
  background-color: #ffffff;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
}

.summaryCardInner {
  position: relative;
  z-index: 1;
}

.summaryLabel {
  font-size: 12px;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
  display: block;
}

.summaryAmount {
  font-size: 36px;
  font-weight: 900;
  color: #0f2e24;
  margin-bottom: 8px;
}

.summaryPurpose {
  font-size: 15px;
  color: #6b7280;
  margin-bottom: 20px;
}

.summaryDivider {
  width: 100%;
  height: 1px;
  background-color: #e5e7eb;
  margin: 16px 0;
}

.summaryRows {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.summaryRow {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #111827;
}

.summaryRow span {
  color: #6b7280;
}

.summaryRow b {
  color: #0f2e24;
  font-weight: 700;
}

.infoCard {
  background-color: #ffffff;
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 24px;
}

.infoIcon {
  width: 24px;
  height: 24px;
  margin-bottom: 12px;
}

.infoTitle {
  font-size: 14px;
  font-weight: 700;
  color: #d97706;
  margin-bottom: 4px;
}

.infoText {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.4;
}

/* ── Document Upload Progress Card ── */
.docProgressCard {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
  margin-top: 24px;
}

.docProgressHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.docProgressTitle {
  font-size: 13px;
  font-weight: 700;
  color: #0f2e24;
}

.docProgressCount {
  font-size: 14px;
  color: #d97706;
  font-weight: 700;
}

.docProgressList {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.docProgressItem {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #374151;
}

.docProgressDone svg {
  color: #2b9c6e;
}

.docProgressBullet {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #d1d5db;
  flex-shrink: 0;
}

.docProgressHint {
  margin-top: 8px;
  font-size: 12px;
  color: #d97706;
  text-align: center;
}

.patternWatermark {
  display: block;
  width: calc(100% + 48px);
  height: 96px;
  object-fit: cover;
  object-position: center;
  margin: -24px -24px 20px;
}

/* ── Form Actions ── */
.formActions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
}

.actionsLeft {
  display: flex;
  align-items: center;
  gap: 18px;
}

.prevBtn {
  padding: 10px 22px;
  border-radius: 9999px;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  color: #374151;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-inter);
  transition: all 0.15s ease;
}

.prevBtn:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

.cancelLink {
  font-size: 14.5px;
  font-weight: 700;
  color: #1f2937;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}

.submitBtn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 32px;
  border-radius: 9999px;
  border: none;
  background-color: #0f2e24;
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-inter);
  transition: background-color 0.2s ease;
}

.submitBtn:hover:not(:disabled) {
  background-color: #081d16;
}

.submitBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.recordBtn {
  background-color: #0f2e24;
  box-shadow: 0 4px 14px rgba(15, 46, 36, 0.25);
}

</style>