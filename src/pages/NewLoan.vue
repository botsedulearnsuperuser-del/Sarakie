<template>
  <div :class="$style.page">
    <!-- Reusable Stationary Sidebar -->
    <Main :active-page="'dashboard'" />

    <!-- Main Scrollable Content -->
    <main :class="$style.mainContent">
      <!-- Top Bar Header -->
      <header :class="$style.topBar">
        <div :class="$style.topBarLeft">
          <h2 :class="$style.pageTitle">New loan application</h2>
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
          <div v-if="loanSubmitted" :class="$style.successScreen">
            <div :class="$style.successIconBox">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path fill="#2b9c6e" d="M19.78 2.2L24 6.42L8.44 22L0 13.55l4.22-4.22l4.22 4.22zm0 2.8L8.44 16.36l-4.22-4.17l-1.41 1.36l5.63 5.62L21.19 6.42z" />
              </svg>
            </div>
            <h2 :class="$style.successTitle">Loan application recorded!</h2>
            <p :class="$style.successSub">
              Application for <b>{{ customer.firstName }} {{ customer.lastName }}</b> has been successfully recorded and routed to the branch review queue.
            </p>
            <div :class="$style.successCard">
              <div :class="$style.successRow">
                <span>Application reference</span>
                <b>SRK-L-10850</b>
              </div>
              <div :class="$style.successRow">
                <span>Requested amount</span>
                <b>P {{ amount.toLocaleString() }}</b>
              </div>
              <div :class="$style.successRow">
                <span>Monthly repayment</span>
                <b :class="$style.successGold">P {{ monthlyPayment }}</b>
              </div>
              <div :class="$style.successRow">
                <span>Recorded by</span>
                <b>Marion Lucas (SRK-ADM-0042)</b>
              </div>
            </div>
            <div :class="$style.successActions">
              <router-link to="/dashboard-sample" :class="$style.successBtn">
                Return to Dashboard
              </router-link>
              <button :class="$style.newAppBtn" type="button" @click="resetForm">
                Record another loan
              </button>
            </div>
          </div>

          <!-- Dynamic Steps 1 through 8 -->
          <div v-else>
            <!-- ── Step 1: Amount ── -->
            <div v-if="currentStep === 1">
              <div :class="$style.stepIndicator">Step 1 of 8</div>
              <h1 :class="$style.formTitle">How much is this customer borrowing?</h1>
              <p :class="$style.formSub">They can borrow from P 500 to P 50,000. We'll ask for their details next.</p>

              <!-- Amount Card (Warm Cream Container) -->
              <div :class="$style.amountCard">
                <label :class="$style.amountLabel">Amount</label>
                <div :class="$style.amountInputRow">
                  <span :class="$style.currencySign">P</span>
                  <input
                    v-model="displayAmount"
                    :class="$style.amountInput"
                    type="text"
                    inputmode="numeric"
                    @input="onAmountInput"
                    @blur="onAmountBlur"
                    @keyup.enter="onAmountBlur"
                  />
                </div>
                <div :class="$style.amountDivider"></div>

                <!-- Range Slider for Amount with live fill -->
                <div :class="$style.sliderRow">
                  <input
                    v-model.number="amount"
                    :class="$style.rangeSlider"
                    type="range"
                    min="500"
                    max="50000"
                    step="100"
                    :style="{
                      background: `linear-gradient(to right, #2e7d5b ${((amount - 500) / (50000 - 500)) * 100}%, #e5e7eb ${((amount - 500) / (50000 - 500)) * 100}%)`
                    }"
                  />
                  <div :class="$style.sliderEdges">
                    <span>P 500</span>
                    <span>P 50,000</span>
                  </div>
                </div>

                <!-- Quick Amounts Pills -->
                <div :class="$style.quickAmounts">
                  <button
                    v-for="q in quickAmounts"
                    :key="q"
                    :class="[
                      $style.quickBtn,
                      amount === q ? $style.quickBtnActive : ''
                    ]"
                    type="button"
                    @click="setQuickAmount(q)"
                  >
                    P {{ q.toLocaleString() }}
                  </button>
                </div>
              </div>

              <!-- Repay Over -->
              <div :class="$style.repaySection">
                <h3 :class="$style.repayTitle">Repay over <b>{{ months }} months</b></h3>
                <div :class="$style.repaySliderRow">
                  <span :class="$style.repayEdge">1 month</span>
                  <input
                    v-model.number="months"
                    :class="$style.rangeSlider"
                    type="range"
                    min="1"
                    max="60"
                    step="1"
                    :style="{
                      background: `linear-gradient(to right, #2e7d5b ${((months - 1) / (60 - 1)) * 100}%, #e5e7eb ${((months - 1) / (60 - 1)) * 100}%)`
                    }"
                  />
                  <span :class="$style.repayEdge">60 months</span>
                </div>
              </div>

              <!-- Purpose -->
              <div :class="$style.purposeSection">
                <h3 :class="$style.purposeTitle">What is the loan for?</h3>
                <div :class="$style.purposePills">
                  <button
                    v-for="p in purposes"
                    :key="p"
                    :class="[
                      $style.purposeBtn,
                      selectedPurpose === p ? $style.purposeBtnActive : ''
                    ]"
                    type="button"
                    @click="selectedPurpose = p"
                  >
                    {{ p }}
                  </button>
                </div>
              </div>
            </div>

            <!-- ── Step 2: Personal Details ── -->
            <div v-else-if="currentStep === 2">
              <div :class="$style.stepIndicator">Step 2 of 8</div>
              <h1 :class="$style.formTitle">Customer personal details</h1>
              <p :class="$style.formSub">Enter the customer's legal identification and basic personal details.</p>

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
                    <label :class="$style.fieldLabel">Date of birth</label>
                    <input v-model="customer.dob" :class="$style.textInput" type="date" />
                  </div>
                </div>

                <div :class="$style.formGrid2">
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Gender</label>
                    <select v-model="customer.gender" :class="$style.selectInput">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Marital status</label>
                    <select v-model="customer.maritalStatus" :class="$style.selectInput">
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                </div>

                <div :class="$style.formGrid2">
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Mobile phone number</label>
                    <input v-model="customer.mobile" :class="$style.textInput" type="tel" placeholder="e.g. +267 71 234 567" />
                  </div>
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Email address</label>
                    <input v-model="customer.email" :class="$style.textInput" type="email" placeholder="e.g. t.molefe@gmail.com" />
                  </div>
                </div>
              </div>
            </div>

            <!-- ── Step 3: Address ── -->
            <div v-else-if="currentStep === 3">
              <div :class="$style.stepIndicator">Step 3 of 8</div>
              <h1 :class="$style.formTitle">Residential address</h1>
              <p :class="$style.formSub">Provide physical and postal address information for this customer.</p>

              <div :class="$style.formCardInner">
                <div :class="$style.fieldGroup">
                  <label :class="$style.fieldLabel">Physical plot / Street address</label>
                  <input v-model="customer.physicalAddress" :class="$style.textInput" type="text" placeholder="e.g. Plot 4471, Mokgosi Close" />
                </div>

                <div :class="$style.formGrid2">
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">City / Town</label>
                    <input v-model="customer.city" :class="$style.textInput" type="text" placeholder="e.g. Gaborone" />
                  </div>
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Area / Ward / Block</label>
                    <input v-model="customer.area" :class="$style.textInput" type="text" placeholder="e.g. Block 8" />
                  </div>
                </div>

                <div :class="$style.formGrid2">
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Postal address</label>
                    <input v-model="customer.postalAddress" :class="$style.textInput" type="text" placeholder="e.g. P O Box 20451, Gaborone" />
                  </div>
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Years at address</label>
                    <input v-model="customer.yearsAtAddress" :class="$style.textInput" type="number" placeholder="e.g. 3" />
                  </div>
                </div>
              </div>
            </div>

            <!-- ── Step 4: Employment & Income ── -->
            <div v-else-if="currentStep === 4">
              <div :class="$style.stepIndicator">Step 4 of 8</div>
              <h1 :class="$style.formTitle">Employment &amp; income details</h1>
              <p :class="$style.formSub">Confirm the customer's occupation, employer and monthly net earnings.</p>

              <div :class="$style.formCardInner">
                <div :class="$style.formGrid2">
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Employer name</label>
                    <input v-model="customer.employer" :class="$style.textInput" type="text" placeholder="e.g. Kgalagadi Logistics (Pty) Ltd" />
                  </div>
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Job title / Occupation</label>
                    <input v-model="customer.jobTitle" :class="$style.textInput" type="text" placeholder="e.g. Operations Supervisor" />
                  </div>
                </div>

                <div :class="$style.formGrid2">
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Employment type</label>
                    <select v-model="customer.employmentType" :class="$style.selectInput">
                      <option value="Permanent">Permanent</option>
                      <option value="Contract">Contract</option>
                      <option value="Government">Government / Parastatal</option>
                      <option value="Self-employed">Self-employed</option>
                    </select>
                  </div>
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Salary pay day</label>
                    <select v-model="customer.payDay" :class="$style.selectInput">
                      <option value="20th">20th of the month</option>
                      <option value="25th">25th of the month</option>
                      <option value="Month-end">Last day of month</option>
                    </select>
                  </div>
                </div>

                <div :class="$style.formGrid2">
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Net monthly salary (P)</label>
                    <input v-model="customer.netSalary" :class="$style.textInput" type="text" placeholder="e.g. 14,500.00" />
                  </div>
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Work telephone</label>
                    <input v-model="customer.workPhone" :class="$style.textInput" type="tel" placeholder="e.g. +267 391 2200" />
                  </div>
                </div>
              </div>
            </div>

            <!-- ── Step 5: Next of Kin ── -->
            <div v-else-if="currentStep === 5">
              <div :class="$style.stepIndicator">Step 5 of 8</div>
              <h1 :class="$style.formTitle">Next of kin &amp; contact</h1>
              <p :class="$style.formSub">Emergency contact and next of kin information for this loan.</p>

              <div :class="$style.formCardInner">
                <div :class="$style.formGrid2">
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Full name</label>
                    <input v-model="customer.kinName" :class="$style.textInput" type="text" placeholder="e.g. Boitumelo Molefe" />
                  </div>
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Relationship</label>
                    <select v-model="customer.kinRelationship" :class="$style.selectInput">
                      <option value="Spouse">Spouse</option>
                      <option value="Parent">Parent</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Child">Adult Child</option>
                      <option value="Relative">Other Relative</option>
                    </select>
                  </div>
                </div>

                <div :class="$style.formGrid2">
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Mobile phone</label>
                    <input v-model="customer.kinPhone" :class="$style.textInput" type="tel" placeholder="e.g. +267 72 987 654" />
                  </div>
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Physical location / Town</label>
                    <input v-model="customer.kinAddress" :class="$style.textInput" type="text" placeholder="e.g. Extension 4, Gaborone" />
                  </div>
                </div>
              </div>
            </div>

            <!-- ── Step 6: Bank Account ── -->
            <div v-else-if="currentStep === 6">
              <div :class="$style.stepIndicator">Step 6 of 8</div>
              <h1 :class="$style.formTitle">Disbursement bank account</h1>
              <p :class="$style.formSub">Where will the loan be disbursed and monthly repayments collected from?</p>

              <div :class="$style.formCardInner">
                <div :class="$style.formGrid2">
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Bank name</label>
                    <select v-model="customer.bankName" :class="$style.selectInput">
                      <option value="First National Bank (FNB)">First National Bank (FNB)</option>
                      <option value="Absa Bank Botswana">Absa Bank Botswana</option>
                      <option value="Stanbic Bank Botswana">Stanbic Bank Botswana</option>
                      <option value="Standard Chartered">Standard Chartered</option>
                      <option value="Bank Gaborone">Bank Gaborone</option>
                    </select>
                  </div>
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Account type</label>
                    <select v-model="customer.accountType" :class="$style.selectInput">
                      <option value="Savings">Savings Account</option>
                      <option value="Cheque / Current">Cheque / Current Account</option>
                    </select>
                  </div>
                </div>

                <div :class="$style.formGrid2">
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Account number</label>
                    <input v-model="customer.accountNumber" :class="$style.textInput" type="text" placeholder="e.g. 62849102847" />
                  </div>
                  <div :class="$style.fieldGroup">
                    <label :class="$style.fieldLabel">Branch name / Code</label>
                    <input v-model="customer.branchCode" :class="$style.textInput" type="text" placeholder="e.g. Main Mall · 281467" />
                  </div>
                </div>
              </div>
            </div>

            <!-- ── Step 7: Documents ── -->
            <div v-else-if="currentStep === 7">
              <div :class="$style.stepIndicator">Step 7 of 8</div>
              <h1 :class="$style.formTitle">KYC documents verification</h1>
              <p :class="$style.formSub">Verify that required customer documents are attached and authenticated.</p>

              <div :class="$style.formCardInner">
                <div :class="$style.docItem">
                  <div :class="$style.docInfo">
                    <div :class="$style.docIconBox">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f2e24" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <div>
                      <b :class="$style.docName">Certified Omang Copy</b>
                      <span :class="$style.docMeta">National identity document (both sides) · PDF, JPG</span>
                    </div>
                  </div>
                  <span :class="$style.docBadgeVerified">Verified</span>
                </div>

                <div :class="$style.docItem">
                  <div :class="$style.docInfo">
                    <div :class="$style.docIconBox">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f2e24" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <div>
                      <b :class="$style.docName">Latest 3 Months Payslips</b>
                      <span :class="$style.docMeta">Stamped official employer payslips · PDF</span>
                    </div>
                  </div>
                  <span :class="$style.docBadgeVerified">Verified</span>
                </div>

                <div :class="$style.docItem">
                  <div :class="$style.docInfo">
                    <div :class="$style.docIconBox">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f2e24" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <div>
                      <b :class="$style.docName">3 Months Bank Statements</b>
                      <span :class="$style.docMeta">Bank stamped statements showing salary credits · PDF</span>
                    </div>
                  </div>
                  <span :class="$style.docBadgeVerified">Verified</span>
                </div>
              </div>
            </div>

            <!-- ── Step 8: Debit Order Authorization ── -->
            <div v-else-if="currentStep === 8">
              <div :class="$style.stepIndicator">Step 8 of 8</div>
              <h1 :class="$style.formTitle">Debit order authorization &amp; submit</h1>
              <p :class="$style.formSub">Confirm collection authorization and submit this loan application into the review queue.</p>

              <div :class="$style.formCardInner">
                <!-- Mandate Details Box -->
                <div :class="$style.mandateBox">
                  <div :class="$style.mandateHeader">
                    <span :class="$style.mandateTag">DEBIT ORDER MANDATE</span>
                    <span :class="$style.mandateRef">SRK-MANDATE-749102</span>
                  </div>
                  <div :class="$style.mandateGrid">
                    <div :class="$style.mandateCol">
                      <span :class="$style.mandateLabel">Customer name</span>
                      <b :class="$style.mandateValue">{{ customer.firstName }} {{ customer.lastName }}</b>
                    </div>
                    <div :class="$style.mandateCol">
                      <span :class="$style.mandateLabel">Monthly deduction</span>
                      <b :class="$style.mandateHighlight">P {{ monthlyPayment }}</b>
                    </div>
                    <div :class="$style.mandateCol">
                      <span :class="$style.mandateLabel">Deduction day</span>
                      <b :class="$style.mandateValue">{{ customer.payDay }} of every month</b>
                    </div>
                    <div :class="$style.mandateCol">
                      <span :class="$style.mandateLabel">Debited account</span>
                      <b :class="$style.mandateValue">{{ customer.bankName.split(' ')[0] }} · ••••{{ customer.accountNumber.slice(-4) }}</b>
                    </div>
                  </div>
                </div>

                <!-- Authorization Checkbox -->
                <label :class="$style.checkboxRow">
                  <input v-model="debitMandateSigned" type="checkbox" :class="$style.checkboxInput" />
                  <span :class="$style.checkboxLabel">
                    <b>Signed debit order mandate received:</b> Customer has authorized CEDA to debit the specified account monthly for {{ months }} months.
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
                <button
                  v-if="currentStep > 1"
                  :class="$style.prevBtn"
                  type="button"
                  @click="prevStep"
                >
                  Back
                </button>
                <router-link to="/dashboard-sample" :class="$style.cancelLink">
                  Cancel
                </router-link>
              </div>

              <!-- Next Button for Steps 1 through 7 -->
              <button
                v-if="currentStep < 8"
                :class="$style.submitBtn"
                type="button"
                @click="nextStep"
              >
                Next
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>

              <!-- Final Submission Button only on Step 8 -->
              <button
                v-else
                :class="[$style.submitBtn, $style.recordBtn]"
                type="button"
                :disabled="!debitMandateSigned"
                @click="submitLoanRecord"
              >
                Record loan application
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </button>
            </div>
          </div>
        </section>

        <!-- Right: Loan Summary Sidebar -->
        <aside :class="$style.summaryAside">
          <!-- Loan Summary Card with Ethnic Pattern Watermark -->
          <div :class="$style.summaryCard">
            <img
              src="/pattern-2.webp"
              :class="$style.patternWatermark"
              alt=""
            />
            <div :class="$style.summaryCardInner">
              <span :class="$style.summaryLabel">Customer loan</span>
              <div :class="$style.summaryAmount">P {{ (Number(amount) || 0).toLocaleString() }}</div>
              <div :class="$style.summaryPurpose">{{ selectedPurpose }}, over {{ months }} months</div>
              <div :class="$style.summaryDivider"></div>
              <div :class="$style.summaryRows">
                <div :class="$style.summaryRow">
                  <span>Estimated monthly</span>
                  <b :class="$style.summaryHighlight">P {{ monthlyPayment }}</b>
                </div>
                <div :class="$style.summaryRow">
                  <span>Interest rate</span>
                  <b>25% a year</b>
                </div>
                <div :class="$style.summaryRow">
                  <span>Total to repay</span>
                  <b>P {{ totalRepay }}</b>
                </div>
                <div :class="$style.summaryRow">
                  <span>Collected from</span>
                  <b>{{ currentStep >= 6 ? (customer.bankName ? customer.bankName.split(' ')[0] : 'Bank') : 'Added in step 6' }}</b>
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
              <b :class="$style.infoTitle">Customer data is protected</b>
              <span :class="$style.infoText">Customer records are encrypted and handled in strict compliance with NBFIRA and lending regulations.</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import Main from "../components/Main.vue";

const steps = ["Amount", "Personal", "Address", "Work", "Next of kin", "Bank", "Documents", "Debit order"];
const currentStep = ref(1);

const amount = ref(8000);
const months = ref(12);
const selectedPurpose = ref("School fees");
const quickAmounts = [1000, 5000, 10000, 20000];
const purposes = ["School fees", "Medical", "Home improvement", "Business", "Pay off debt"];

const displayAmount = ref("8,000");

watch(amount, (val) => {
  displayAmount.value = Number(val || 0).toLocaleString();
});

function onAmountInput(e: Event) {
  const target = e.target as HTMLInputElement;
  const digits = target.value.replace(/[^0-9]/g, "");
  if (!digits) {
    displayAmount.value = "";
    return;
  }
  const parsed = parseInt(digits, 10);
  if (!isNaN(parsed)) {
    amount.value = Math.min(50000, parsed);
  }
}

function onAmountBlur() {
  if (!amount.value || amount.value < 500) {
    amount.value = 500;
  } else if (amount.value > 50000) {
    amount.value = 50000;
  }
  displayAmount.value = amount.value.toLocaleString();
}

function setQuickAmount(q: number) {
  amount.value = q;
  displayAmount.value = q.toLocaleString();
}

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
  employer: "Kgalagadi Logistics (Pty) Ltd",
  jobTitle: "Operations Supervisor",
  employmentType: "Permanent",
  payDay: "25th",
  netSalary: "14,500.00",
  workPhone: "+267 391 2200",
  kinName: "Boitumelo Molefe",
  kinRelationship: "Sibling",
  kinPhone: "+267 72 987 654",
  kinAddress: "Extension 4, Gaborone",
  bankName: "First National Bank (FNB)",
  accountType: "Cheque / Current",
  accountNumber: "62849102847",
  branchCode: "Main Mall · 281467",
});

const debitMandateSigned = ref(true);
const loanSubmitted = ref(false);

const monthlyPayment = computed(() => {
  const r = 0.25 / 12; // 25% annual reducing balance rate
  const n = Number(months.value) || 1;
  const p = Number(amount.value) || 0;
  if (n <= 0 || p <= 0) return "0.00";
  const m = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return m.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
});

const totalRepay = computed(() => {
  const r = 0.25 / 12;
  const n = Number(months.value) || 1;
  const p = Number(amount.value) || 0;
  if (n <= 0 || p <= 0) return "0.00";
  const m = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return (m * n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
});

function nextStep() {
  if (currentStep.value < 8) {
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

function submitLoanRecord() {
  loanSubmitted.value = true;
}

function resetForm() {
  currentStep.value = 1;
  loanSubmitted.value = false;
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

/* ── Top Bar ── */
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

/* ── Form Inputs for Steps 2-8 ── */
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

/* ── Documents List (Step 7) ── */
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

/* ── Mandate Box (Step 8) ── */
.mandateBox {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 20px 22px;
  margin-bottom: 20px;
}

.mandateHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f3f4f6;
}

.mandateTag {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.6px;
  color: #0f2e24;
  background-color: #fef3c7;
  padding: 4px 10px;
  border-radius: 6px;
}

.mandateRef {
  font-size: 12px;
  font-weight: 600;
  color: #9ca3af;
}

.mandateGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.mandateCol {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.mandateLabel {
  font-size: 11.5px;
  color: #9ca3af;
  font-weight: 500;
}

.mandateValue {
  font-size: 14px;
  color: #111827;
  font-weight: 700;
}

.mandateHighlight {
  font-size: 16px;
  color: #d97706;
  font-weight: 800;
}

.checkboxRow {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 18px;
  cursor: pointer;
}

.checkboxInput {
  margin-top: 3px;
  width: 18px;
  height: 18px;
  accent-color: #0f2e24;
  cursor: pointer;
}

.checkboxLabel {
  font-size: 13.5px;
  color: #374151;
  line-height: 1.45;
}

.checkboxLabel b {
  color: #0f2e24;
}

.adminAuditNote {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #f3f4f6;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 12px;
  color: #4b5563;
}

/* ── Repay Section ── */
.repaySection {
  margin-bottom: 26px;
}

.repayTitle {
  margin: 0 0 12px;
  font-size: 15px;
  font-weight: 500;
  color: #1f2937;
}

.repayTitle b {
  font-weight: 800;
  color: #0f2e24;
}

.repaySliderRow {
  display: flex;
  align-items: center;
  gap: 16px;
}

.repayEdge {
  font-size: 12.5px;
  color: #9ca3af;
  white-space: nowrap;
}

.rangeSlider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}

.rangeSlider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #2e7d5b;
  border: 3px solid #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.rangeSlider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #2e7d5b;
  border: 3px solid #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

/* ── Purpose Section ── */
.purposeSection {
  margin-bottom: 36px;
}

.purposeTitle {
  margin: 0 0 12px;
  font-size: 15px;
  font-weight: 700;
  color: #1f2937;
}

.purposePills {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.purposeBtn {
  padding: 9px 20px;
  border-radius: 9999px;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  font-family: var(--font-inter);
  transition: all 0.15s ease;
}

.purposeBtn:hover {
  border-color: #0f2e24;
}

.purposeBtnActive {
  background-color: #0f2e24;
  border-color: #0f2e24;
  color: #ffffff;
  font-weight: 600;
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

/* ── Success Screen ── */
.successScreen {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 30px 20px;
}

.successIconBox {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: #ecfdf5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.successTitle {
  margin: 0 0 10px;
  font-size: 28px;
  font-weight: 900;
  color: #0f2e24;
}

.successSub {
  margin: 0 0 28px;
  font-size: 15px;
  color: #6b7280;
  max-width: 460px;
  line-height: 1.5;
}

.successCard {
  width: 100%;
  max-width: 440px;
  background-color: #faf6f0;
  border-radius: 16px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
}

.successRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #6b7280;
}

.successRow b {
  color: #111827;
  font-weight: 700;
}

.successGold {
  color: #d97706 !important;
  font-size: 15px;
}

.successActions {
  display: flex;
  gap: 14px;
}

.successBtn {
  padding: 13px 28px;
  border-radius: 9999px;
  background-color: #0f2e24;
  color: #ffffff;
  font-size: 14.5px;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 0.15s ease;
}

.successBtn:hover {
  background-color: #081d16;
}

.newAppBtn {
  padding: 13px 28px;
  border-radius: 9999px;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  color: #374151;
  font-size: 14.5px;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-inter);
}

/* ── Summary Aside ── */
.summaryAside {
  width: 290px;
  min-width: 270px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 24px;
}

.summaryCard {
  background-color: #0b2f24;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  color: #ffffff;
}

.patternWatermark {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: auto;
  opacity: 0.22;
  pointer-events: none;
  object-fit: cover;
}

.summaryCardInner {
  position: relative;
  z-index: 1;
  padding: 24px 22px;
}

.summaryLabel {
  font-size: 11.5px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.summaryAmount {
  font-size: 36px;
  font-weight: 900;
  color: #ffffff;
  margin: 4px 0 4px;
  line-height: 1.1;
}

.summaryPurpose {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 16px;
}

.summaryDivider {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.12);
  margin-bottom: 16px;
}

.summaryRows {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.summaryRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

.summaryRow b {
  color: #ffffff;
  font-weight: 700;
}

.summaryHighlight {
  color: #f59e0b !important;
  font-size: 14.5px;
  font-weight: 800 !important;
}

/* ── Info Card ── */
.infoCard {
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  padding: 18px 20px;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.infoIcon {
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 10px;
  background-color: #fef3c7;
  display: flex;
  align-items: center;
  justify-content: center;
}

.infoContent {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.infoTitle {
  font-size: 13.5px;
  font-weight: 700;
  color: #111827;
}

.infoText {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.4;
}
</style>
