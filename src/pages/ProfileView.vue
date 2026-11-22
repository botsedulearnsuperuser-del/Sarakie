<template>
  <div :class="[$style.page, isGaborone ? $style.isGaborone : '']" :style="pageBackground">
    <!-- Reusable Stationary Sidebar -->
    <Main :active-page="'profile'" :role="role" />

    <!-- Main Scrollable Content -->
    <main :class="$style.mainContent">
      <!-- Top Bar Header -->
      <header :class="$style.topBar">
        <div :class="$style.topBarLeft">
          <h2 :class="$style.pageTitle">{{ profileTitle }}</h2>
          <p :class="$style.pageSub">{{ profileSubtitle }}</p>
        </div>
        <div :class="$style.topBarRight">
          <img :class="$style.iconBtn" alt="" src="/Notifications-2-new.svg" />
          <img :class="$style.iconBtn" alt="" src="/Help.svg" />
          <div :class="$style.userA">
            <img :class="$style.userAvatarImg" :src="avatarUrl" :alt="profileName" />
            <div :class="$style.userName">{{ profileName }}</div>
          </div>
        </div>
      </header>

      <!-- Profile Hero Banner -->
      <section :class="$style.profileBanner">
        <img
          :class="$style.bannerPattern"
          src="/pattern-2.webp"
          alt=""
        />
        <div :class="$style.bannerLeft">
          <label :class="$style.avatarPicker" title="Change photo">
            <img :class="$style.avatarImg" :src="avatarUrl" :alt="profileName" />
            <input type="file" accept="image/png,image/jpeg,image/webp" @change="uploadAvatar" />
          </label>
          <div :class="$style.bannerInfo">
            <h2 :class="$style.profileName">{{ profileName }}</h2>
            <p :class="$style.profileSub">{{ roleLine }}</p>
            <div :class="$style.badgeRow">
              <span :class="$style.roleBadge">{{ roleBadge }}</span>
              <span :class="$style.statusBadge">
                <span :class="$style.statusDot"></span>
                Active
              </span>
            </div>
          </div>
        </div>
        <div :class="$style.statWidget">
          <div :class="$style.statItem">
            <span :class="$style.statValue">{{ applicationCount }}</span>
            <span :class="$style.statLabel">Applications</span>
          </div>
          <div :class="$style.statDivider"></div>
          <div :class="$style.statItem">
            <span :class="$style.statValue">{{ reviewCount }}</span>
            <span :class="$style.statLabel">In review</span>
          </div>
        </div>
      </section>

      <!-- Detail Cards Grid -->
      <div :class="$style.cardsGrid">
        <!-- 1. Personal Details -->
        <div :class="$style.card">
          <div :class="$style.cardHeader">
            <div :class="$style.cardTitleRow">
              <span :class="$style.cardNum">1</span>
              <h3 :class="$style.cardTitle">Personal details</h3>
            </div>
            <button :class="$style.editBtn">Edit</button>
          </div>
          <div :class="$style.cardBody">
            <div :class="$style.fieldRow">
              <div :class="$style.field">
                <span :class="$style.fieldLabel">Full name</span>
                <span :class="$style.fieldValue">{{ profileName }}</span>
              </div>
              <div :class="$style.field">
                <span :class="$style.fieldLabel">Employee ID</span>
                <span :class="$style.fieldValue">{{ profileRef }}</span>
              </div>
            </div>
            <div :class="$style.fieldRow">
              <div :class="$style.field">
                <span :class="$style.fieldLabel">Role</span>
                <span :class="$style.fieldValue">{{ roleTitle }}</span>
              </div>
              <div :class="$style.field">
                <span :class="$style.fieldLabel">Branch</span>
                <span :class="$style.fieldValue">{{ profileCity }}</span>
              </div>
            </div>
            <div :class="$style.fieldRow">
              <div :class="$style.field">
                <span :class="$style.fieldLabel">Date joined</span>
                <span :class="$style.fieldValue">{{ joinedDate }}</span>
              </div>
              <div :class="$style.field">
                <span :class="$style.fieldLabel">Reporting to</span>
                <span :class="$style.fieldValue">CEDA review team</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Contact -->
        <div :class="$style.card">
          <div :class="$style.cardHeader">
            <div :class="$style.cardTitleRow">
              <span :class="$style.cardNum">2</span>
              <h3 :class="$style.cardTitle">Contact</h3>
            </div>
            <button :class="$style.editBtn">Edit</button>
          </div>
          <div :class="$style.cardBody">
            <div :class="$style.fieldRow">
              <div :class="$style.field">
                <span :class="$style.fieldLabel">Work email</span>
                <span :class="$style.fieldValue">{{ profileEmail }}</span>
              </div>
              <div :class="$style.field">
                <span :class="$style.fieldLabel">Work phone</span>
                <span :class="$style.fieldValue">{{ profilePhone }}</span>
              </div>
            </div>
            <div :class="$style.fieldRow">
              <div :class="$style.field">
                <span :class="$style.fieldLabel">Mobile</span>
                <span :class="$style.fieldValue">{{ profileCity }}</span>
              </div>
              <div :class="$style.field">
                <span :class="$style.fieldLabel">Extension</span>
                <span :class="$style.fieldValue">{{ profileOrganization }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Security & Permissions (Combined Container) -->
        <div :class="[$style.card, $style.cardFullWidth]">
          <div :class="$style.cardHeader">
            <div :class="$style.cardTitleRow">
              <span :class="$style.cardNum">3</span>
              <h3 :class="$style.cardTitle">Security &amp; Permissions</h3>
            </div>
          </div>
          <div :class="$style.secPermBody">
            <!-- Security Column -->
            <div :class="$style.secSide">
              <h4 :class="$style.subSectionTitle">Security</h4>
              <div :class="$style.fieldRow">
                <div :class="$style.field">
                  <span :class="$style.fieldLabel">Password</span>
                  <span :class="$style.fieldValue">••••••••••••</span>
                </div>
                <div :class="$style.field">
                  <span :class="$style.fieldLabel">Last changed</span>
                  <span :class="$style.fieldValue">{{ lastChangedDate }}</span>
                </div>
              </div>
              <div :class="$style.fieldRow">
                <div :class="$style.field">
                  <span :class="$style.fieldLabel">Two-factor auth</span>
                  <span v-if="twoFactorEnabled" :class="$style.fieldValueGreen">Enabled</span>
                  <button
                    v-else
                    :class="$style.enableTwoFactorBtn"
                    type="button"
                    @click="openTwoFactorSetup"
                  >
                    Enable 2FA
                  </button>
                </div>
                <div :class="$style.field">
                  <span :class="$style.fieldLabel">Last login</span>
                  <span :class="$style.fieldValue">Today, 08:42 AM</span>
                </div>
              </div>
              <div :class="$style.securityActions">
                <button :class="$style.changePassBtn" type="button" @click="openPasswordModal">
                  Change password
                </button>
                <button :class="$style.deleteAccountBtn" type="button" @click="openDeleteModal">
                  Delete account
                </button>
              </div>
            </div>

            <!-- Vertical Divider -->
            <div :class="$style.secPermDivider"></div>

            <!-- Permissions Column -->
            <div :class="$style.permSide">
              <h4 :class="$style.subSectionTitle">Permissions</h4>
              <div :class="$style.permList">
                <div :class="$style.permRow">
                  <span :class="[$style.permDot, $style.permDotGreen]"></span>
                  <span :class="$style.fieldValue">Create &amp; edit innovation submissions</span>
                </div>
                <div :class="$style.permRow">
                  <span :class="[$style.permDot, $style.permDotGreen]"></span>
                  <span :class="$style.fieldValue">Track every application stage</span>
                </div>
                <div :class="$style.permRow">
                  <span :class="[$style.permDot, $style.permDotGreen]"></span>
                  <span :class="$style.fieldValue">Respond to evaluator feedback</span>
                </div>
                <div :class="$style.permRow">
                  <span :class="[$style.permDot, $style.permDotGreen]"></span>
                  <span :class="$style.fieldValue">Download decision letters</span>
                </div>
                <div :class="$style.permRow">
                  <span :class="[$style.permDot, $style.permDotRed]"></span>
                  <span :class="$style.fieldValueMuted">Delete audit logs (restricted)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity / Audit Log -->
      <section :class="$style.auditSection">
        <div :class="$style.auditHeader">
          <div :class="$style.auditTitleRow">
            <svg :class="$style.auditIcon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <h2 :class="$style.auditTitle">Activity Log</h2>
            <span :class="$style.auditBadge">Read-only · Cannot be deleted</span>
          </div>
          <div :class="$style.auditActions">
            <div :class="$style.auditFilterWrap">
              <select v-model="auditFilter" :class="$style.auditSelect">
                <option value="all">All activity</option>
                <option value="login">Logins</option>
                <option value="loan">Application actions</option>
                <option value="customer">Feedback activity</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>
        </div>

        <div :class="$style.auditTable">
          <div :class="$style.auditTableHead">
            <span :class="$style.auditColDate">Date &amp; Time</span>
            <span :class="$style.auditColUser">User</span>
            <span :class="$style.auditColAction">Action</span>
            <span :class="$style.auditColDetails">Details</span>
            <span :class="$style.auditColIP">IP Address</span>
          </div>
          <div v-if="!filteredLogs.length" :class="$style.auditRow">
            <span :class="$style.auditColDate">—</span>
            <span :class="$style.auditColUser">No account activity recorded yet</span>
            <span :class="$style.auditColAction"></span>
            <span :class="$style.auditColDetails"></span>
            <span :class="$style.auditColIP">—</span>
          </div>
          <div
            v-for="(log, idx) in filteredLogs"
            :key="idx"
            :class="$style.auditRow"
          >
            <span :class="$style.auditColDate">{{ log.date }}</span>
            <span :class="$style.auditColUser">
              <span :class="$style.auditUserDot">{{ log.userInitials }}</span>
              {{ log.user }}
            </span>
            <span :class="$style.auditColAction">
              <span :class="getActionClass(log.type)">{{ log.action }}</span>
            </span>
            <span :class="$style.auditColDetails">{{ log.details }}</span>
            <span :class="$style.auditColIP">{{ log.ip }}</span>
          </div>
        </div>

        <div :class="$style.auditFooter">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          <span>This log is immutable and protected. Records cannot be edited or deleted by any user.</span>
        </div>
      </section>

      <!-- Change Password Modal -->
      <div
        v-if="showPasswordModal"
        :class="$style.modalOverlay"
        @click.self="closePasswordModal"
      >
        <div :class="$style.modalCard">
          <!-- Modal Header -->
          <div :class="$style.modalHeader">
            <div :class="$style.modalTitleRow">
              <div :class="$style.modalIconBox">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f2e24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </div>
              <div>
                <h3 :class="$style.modalTitle">Change Password</h3>
                <p :class="$style.modalSub">Ensure your {{ roleNoun }} account stays protected with a strong password.</p>
              </div>
            </div>
            <button
              :class="$style.closeModalBtn"
              type="button"
              @click="closePasswordModal"
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <!-- Success State -->
          <div v-if="passwordSuccess" :class="$style.successBox">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2b9c6e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <div :class="$style.successText">
              <b>Password changed successfully!</b>
              <span>A protected record has been added to your Activity Log.</span>
            </div>
          </div>

          <!-- Password Form -->
          <form v-else :class="$style.modalForm" @submit.prevent="submitPasswordChange">
            <p v-if="passwordError" :class="$style.fieldLabel" style="color: #b42318; margin: 0">
              {{ passwordError }}
            </p>
            <!-- Current Password -->
            <div :class="$style.inputGroup">
              <label :class="$style.inputLabel">Current password</label>
              <div :class="$style.inputWrapper">
                <input
                  v-model="currentPassword"
                  :type="showCurrentPassword ? 'text' : 'password'"
                  :class="$style.inputField"
                  placeholder="Enter your current password"
                  required
                />
                <button
                  type="button"
                  :class="$style.toggleEyeBtn"
                  @click="showCurrentPassword = !showCurrentPassword"
                >
                  <svg v-if="!showCurrentPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- New Password -->
            <div :class="$style.inputGroup">
              <label :class="$style.inputLabel">New password</label>
              <div :class="$style.inputWrapper">
                <input
                  v-model="newPassword"
                  :type="showNewPassword ? 'text' : 'password'"
                  :class="$style.inputField"
                  placeholder="Create new password"
                  required
                />
                <button
                  type="button"
                  :class="$style.toggleEyeBtn"
                  @click="showNewPassword = !showNewPassword"
                >
                  <svg v-if="!showNewPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>

              <!-- Password Strength Bar -->
              <div v-if="newPassword" :class="$style.strengthWrap">
                <div :class="$style.strengthBarBg">
                  <div
                    :class="[
                      $style.strengthBarFill,
                      strengthScore === 1 ? $style.barWeak : '',
                      strengthScore === 2 || strengthScore === 3 ? $style.barMedium : '',
                      strengthScore >= 4 ? $style.barStrong : ''
                    ]"
                    :style="{ width: (strengthScore / 4) * 100 + '%' }"
                  ></div>
                </div>
                <span
                  :class="[
                    $style.strengthLabel,
                    strengthScore <= 1 ? $style.textWeak : '',
                    strengthScore === 2 || strengthScore === 3 ? $style.textMedium : '',
                    strengthScore >= 4 ? $style.textStrong : ''
                  ]"
                >
                  {{ strengthText }}
                </span>
              </div>

              <!-- Password Criteria Checklist -->
              <div :class="$style.criteriaList">
                <div :class="[$style.criteriaItem, hasMinLength ? $style.criteriaMet : '']">
                  <span :class="$style.checkDot">
                    <svg v-if="hasMinLength" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 56 56">
                      <path d="M0 0h56v56H0z" fill="none" />
                      <path fill="currentColor" d="m45.646 14.646l.708.708a2 2 0 0 1 0 2.828l-22.94 22.94a2 2 0 0 1-2.828 0l-9.94-9.94a2 2 0 0 1 0-2.828l.708-.708a2 2 0 0 1 2.828 0l6.404 6.404a2 2 0 0 0 2.828 0l19.404-19.404a2 2 0 0 1 2.828 0" />
                    </svg>
                    <span v-else>•</span>
                  </span>
                  At least 8 characters
                </div>
                <div :class="[$style.criteriaItem, hasUpper ? $style.criteriaMet : '']">
                  <span :class="$style.checkDot">
                    <svg v-if="hasUpper" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 56 56">
                      <path d="M0 0h56v56H0z" fill="none" />
                      <path fill="currentColor" d="m45.646 14.646l.708.708a2 2 0 0 1 0 2.828l-22.94 22.94a2 2 0 0 1-2.828 0l-9.94-9.94a2 2 0 0 1 0-2.828l.708-.708a2 2 0 0 1 2.828 0l6.404 6.404a2 2 0 0 0 2.828 0l19.404-19.404a2 2 0 0 1 2.828 0" />
                    </svg>
                    <span v-else>•</span>
                  </span>
                  At least one uppercase letter (A-Z)
                </div>
                <div :class="[$style.criteriaItem, hasNumber ? $style.criteriaMet : '']">
                  <span :class="$style.checkDot">
                    <svg v-if="hasNumber" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 56 56">
                      <path d="M0 0h56v56H0z" fill="none" />
                      <path fill="currentColor" d="m45.646 14.646l.708.708a2 2 0 0 1 0 2.828l-22.94 22.94a2 2 0 0 1-2.828 0l-9.94-9.94a2 2 0 0 1 0-2.828l.708-.708a2 2 0 0 1 2.828 0l6.404 6.404a2 2 0 0 0 2.828 0l19.404-19.404a2 2 0 0 1 2.828 0" />
                    </svg>
                    <span v-else>•</span>
                  </span>
                  At least one number (0-9)
                </div>
                <div :class="[$style.criteriaItem, hasSpecial ? $style.criteriaMet : '']">
                  <span :class="$style.checkDot">
                    <svg v-if="hasSpecial" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 56 56">
                      <path d="M0 0h56v56H0z" fill="none" />
                      <path fill="currentColor" d="m45.646 14.646l.708.708a2 2 0 0 1 0 2.828l-22.94 22.94a2 2 0 0 1-2.828 0l-9.94-9.94a2 2 0 0 1 0-2.828l.708-.708a2 2 0 0 1 2.828 0l6.404 6.404a2 2 0 0 0 2.828 0l19.404-19.404a2 2 0 0 1 2.828 0" />
                    </svg>
                    <span v-else>•</span>
                  </span>
                  At least one special character (!@#$%^&amp;*)
                </div>
              </div>
            </div>

            <!-- Confirm New Password -->
            <div :class="$style.inputGroup">
              <label :class="$style.inputLabel">Confirm new password</label>
              <div :class="$style.inputWrapper">
                <input
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  :class="$style.inputField"
                  placeholder="Repeat new password"
                  required
                />
                <button
                  type="button"
                  :class="$style.toggleEyeBtn"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  <svg v-if="!showConfirmPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
              <div v-if="confirmPassword && !passwordsMatch" :class="$style.errorText">
                Passwords do not match
              </div>
              <div v-if="confirmPassword && passwordsMatch" :class="$style.matchText">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 56 56" style="vertical-align: middle; margin-right: 4px;">
                  <path d="M0 0h56v56H0z" fill="none" />
                  <path fill="currentColor" d="m45.646 14.646l.708.708a2 2 0 0 1 0 2.828l-22.94 22.94a2 2 0 0 1-2.828 0l-9.94-9.94a2 2 0 0 1 0-2.828l.708-.708a2 2 0 0 1 2.828 0l6.404 6.404a2 2 0 0 0 2.828 0l19.404-19.404a2 2 0 0 1 2.828 0" />
                </svg>
                Passwords match
              </div>
            </div>

            <!-- Modal Action Buttons -->
            <div :class="$style.modalActions">
              <button
                type="button"
                :class="$style.modalCancelBtn"
                @click="closePasswordModal"
              >
                Cancel
              </button>
              <button
                type="submit"
                :class="$style.modalSubmitBtn"
                :disabled="!isFormValid"
              >
                Update password
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Delete Account Modal -->
      <div
        v-if="showDeleteModal"
        :class="$style.modalOverlay"
        @click.self="closeDeleteModal"
      >
        <div :class="[$style.modalCard, $style.deleteModalCard]">
          <div :class="$style.modalHeader">
            <div>
              <h3 :class="$style.modalTitle">Delete account</h3>
              <p :class="$style.modalSub">
                This permanently removes your {{ roleNoun }} account and your access to the CEDA
                Innovation Portal.
              </p>
            </div>
          </div>

          <form :class="$style.modalForm" @submit.prevent="confirmDeleteAccount">
            <div :class="$style.inputGroup">
              <label :class="$style.inputLabel" for="delete-email">
                Type your email address to confirm
              </label>
              <input
                id="delete-email"
                v-model="deleteEmail"
                :class="$style.deleteInput"
                type="email"
                autocomplete="off"
                :placeholder="accountEmail"
              />
              <div v-if="deleteEmail && !emailMatches" :class="$style.errorText">
                That email does not match {{ accountEmail }}
              </div>
            </div>

            <p :class="$style.deleteBackupNote">
              Once your account is deleted, a backup of your data will be generated and downloaded for
              you, including your personal data and the records you created on the portal.
            </p>

            <p :class="$style.deleteWarning">Warning: this action cannot be undone.</p>

            <div :class="$style.modalActions">
              <button type="button" :class="$style.modalCancelBtn" @click="closeDeleteModal">
                Cancel
              </button>
              <button type="submit" :class="$style.deleteConfirmBtn" :disabled="!emailMatches">
                Delete account
              </button>
            </div>
          </form>
        </div>
      </div>
          </main>
    <ChatWithAgent />
   </div>
 </template>

<script setup lang="ts">
  import { usePageTheme } from "../composables/usePageTheme";

  const pageBackground = usePageTheme();
  const isGaborone = ref(isGaboroneTheme());
  onMounted(() => {
    window.addEventListener(THEME_EVENT, () => (isGaborone.value = isGaboroneTheme()));
    window.addEventListener("sarka-2fa-changed", syncTwoFactorState);
  });

  onUnmounted(() => {
    window.removeEventListener("sarka-2fa-changed", syncTwoFactorState);
  });

import { onMounted, onUnmounted, ref, computed, watch, useCssModule } from "vue";
import { mfaEnabled, refreshMfa } from "../lib/mfa";
import { THEME_EVENT, isGaboroneTheme } from "../components/themes";
import { useRoute, useRouter } from "vue-router";
import { supabase } from "../lib/supabase";
import { authReady, profile, session, signOutNow } from "../lib/auth";
import { IN_REVIEW_STATUSES, loadInnovatorApplications } from "../lib/portal-data";
import Main from "../components/Main.vue";
import ChatWithAgent from "../components/ChatWithAgent.vue";
import { resolveDashboardRole } from "../components/dashboardRole";

/* Shared by all three dashboards, so the profile copy follows the role the sidebar put on
   the URL; with no role this is the innovator's own profile. */
const route = useRoute();
const role = computed(() => resolveDashboardRole(route.query.role));
const profileTitle = computed(() =>
  role.value === "admin" ? "Admin Profile" : role.value === "evaluator" ? "Evaluator Profile" : "My Profile",
);
const profileSubtitle = computed(() =>
  role.value === "admin"
    ? "Manage your administrator account and view system activity."
    : role.value === "evaluator"
      ? "Manage your evaluator account and review activity."
      : "Manage your innovator account and follow your applications.",
);
const roleLine = computed(() =>
  role.value === "admin"
    ? "Branch Administrator · Gaborone Main Branch"
    : role.value === "evaluator"
      ? `Innovator Evaluator · ${profileCity.value}`
      : `Innovator · ${profileCity.value}`,
);
const roleBadge = computed(() =>
  role.value === "admin" ? "Administrator" : role.value === "evaluator" ? "Evaluator" : "Innovator",
);
const roleTitle = computed(() =>
  role.value === "admin" ? "Branch Administrator" : role.value === "evaluator" ? "Evaluator" : "Innovator",
);
const roleNoun = computed(() => (role.value === "admin" ? "administrator" : role.value));

const router = useRouter();
const auditFilter = ref("all");
const lastChangedDate = ref("—");

/* ── Live profile ── */
const profileName = computed(
  () => profile.value?.full_name || session.value?.user.email?.split("@")[0] || "Innovator",
);
const profileEmail = computed(() => profile.value?.email ?? session.value?.user.email ?? "");
const profilePhone = computed(() => profile.value?.phone || "—");
const profileCity = computed(() => profile.value?.city || "—");
const profileOrganization = computed(() => profile.value?.organization || "—");
const profileRef = computed(() => {
  const id = session.value?.user.id;
  if (!id) return "—";
  const prefix = (profile.value?.role ?? "innovator").slice(0, 3).toUpperCase();
  return `SRK-${prefix}-${id.slice(0, 6).toUpperCase()}`;
});
const accountEmail = computed(() => profileEmail.value);

/* Applications summary shown in the banner */
const applicationCount = ref(0);
const reviewCount = ref(0);

async function loadProfileStats() {
  if (!session.value) {
    applicationCount.value = 0;
    reviewCount.value = 0;
    return;
  }
  const apps = await loadInnovatorApplications();
  applicationCount.value = apps.length;
  reviewCount.value = apps.filter((app) => IN_REVIEW_STATUSES.includes(app.status)).length;
}

/* Avatar lives in the private `avatars` bucket; the browser only sees a signed URL. */
const avatarUrl = ref("/innovator-man.webp");
const avatarPath = ref("");
const avatarError = ref("");

async function loadAvatar() {
  if (!supabase || !session.value) return;
  const { data } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", session.value.user.id)
    .maybeSingle();
  const path = (data as { avatar_url?: string | null } | null)?.avatar_url;
  if (!path) return;
  avatarPath.value = path;
  const { data: signed } = await supabase.storage.from("avatars").createSignedUrl(path, 3600);
  if (signed?.signedUrl) avatarUrl.value = signed.signedUrl;
}

async function uploadAvatar(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = "";
  if (!file || !supabase || !session.value) return;
  avatarError.value = "";
  if (file.size > 5 * 1024 * 1024) {
    avatarError.value = "Choose an image smaller than 5 MB.";
    return;
  }
  const extension = (file.name.split(".").pop() || "png").toLowerCase();
  const path = `${session.value.user.id}/avatar-${Date.now()}.${extension}`;
  const { error } = await supabase.storage
    .from("avatars")
    .upload(path, file, { upsert: true, contentType: file.type });
  if (error) {
    avatarError.value = error.message;
    return;
  }
  const { error: profileError } = await supabase
    .from("profiles")
    .update({ avatar_url: path })
    .eq("id", session.value.user.id);
  if (profileError) avatarError.value = profileError.message;
  if (avatarPath.value) await supabase.storage.from("avatars").remove([avatarPath.value]);
  avatarPath.value = path;
  const { data: signed } = await supabase.storage.from("avatars").createSignedUrl(path, 3600);
  if (signed?.signedUrl) avatarUrl.value = signed.signedUrl;
}

onMounted(() => {
  void loadProfileStats();
  void loadAvatar();
});
watch([session, authReady], () => {
  void loadProfileStats();
  void loadAvatar();
});

/* ── Modal & Password State ── */
const showPasswordModal = ref(false);
const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
const passwordSuccess = ref(false);
const passwordError = ref("");

/* ── Strong Password Rules Enforcement ── */
const hasMinLength = computed(() => newPassword.value.length >= 8);
const hasUpper = computed(() => /[A-Z]/.test(newPassword.value));
const hasNumber = computed(() => /[0-9]/.test(newPassword.value));
const hasSpecial = computed(() => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword.value));

const strengthScore = computed(() => {
  if (!newPassword.value) return 0;
  return (
    (hasMinLength.value ? 1 : 0) +
    (hasUpper.value ? 1 : 0) +
    (hasNumber.value ? 1 : 0) +
    (hasSpecial.value ? 1 : 0)
  );
});

const strengthText = computed(() => {
  if (!newPassword.value) return "";
  if (strengthScore.value <= 1) return "Weak password";
  if (strengthScore.value === 2) return "Moderate password";
  if (strengthScore.value === 3) return "Good password";
  return "Strong password";
});

const passwordsMatch = computed(() => {
  return Boolean(
    newPassword.value &&
    confirmPassword.value &&
    newPassword.value === confirmPassword.value
  );
});

const isFormValid = computed(() => {
  return Boolean(
    currentPassword.value &&
    strengthScore.value === 4 &&
    passwordsMatch.value
  );
});

function openPasswordModal() {
  currentPassword.value = "";
  newPassword.value = "";
  confirmPassword.value = "";
  showCurrentPassword.value = false;
  showNewPassword.value = false;
  showConfirmPassword.value = false;
  passwordSuccess.value = false;
  showPasswordModal.value = true;
}

function closePasswordModal() {
  showPasswordModal.value = false;
  passwordSuccess.value = false;
}

/* ── Two-factor auth state, read from the account's Supabase factors ── */
const twoFactorEnabled = computed(() => mfaEnabled.value);

function syncTwoFactorState() {
  void refreshMfa();
}

function openTwoFactorSetup() {
  window.dispatchEvent(new CustomEvent("open-two-factor-setup"));
}

/* ── Delete account ── */
const showDeleteModal = ref(false);
const deleteEmail = ref("");

const emailMatches = computed(
  () => deleteEmail.value.trim().toLowerCase() === accountEmail.value.toLowerCase(),
);

function openDeleteModal() {
  deleteEmail.value = "";
  showDeleteModal.value = true;
}

function closeDeleteModal() {
  showDeleteModal.value = false;
  deleteEmail.value = "";
}

async function confirmDeleteAccount() {
  if (!emailMatches.value) return;
  if (supabase && session.value) {
    await supabase.from("account_deletion_requests").insert({
      user_id: session.value.user.id,
      email: profileEmail.value,
      reason: "Requested from profile settings",
    });
    await signOutNow();
    closeDeleteModal();
    router.push({ name: "AdminLogin" });
    return;
  }
  closeDeleteModal();
}

async function submitPasswordChange() {
  if (!isFormValid.value || !supabase) return;
  passwordError.value = "";

  // Re-authenticate first so a hijacked session cannot silently change the password.
  const check = await supabase.auth.signInWithPassword({
    email: profileEmail.value,
    password: currentPassword.value,
  });
  if (check.error) {
    passwordError.value = "Your current password is not correct.";
    return;
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword.value });
  if (error) {
    passwordError.value = error.message;
    return;
  }

  const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  lastChangedDate.value = `Today, ${timeStr}`;
  passwordSuccess.value = true;
  setTimeout(() => {
    closePasswordModal();
  }, 1600);
}

interface AuditLog {
  date: string;
  user: string;
  userInitials: string;
  action: string;
  type: "login" | "loan" | "customer" | "system";
  details: string;
  ip: string;
}

const joinedDate = computed(() => {
  const created = session.value?.user.created_at;
  if (!created) return "—";
  return new Date(created).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
});

/** Live activity only — nothing is seeded. */
const auditLogs = ref<AuditLog[]>([]);

const filteredLogs = computed(() => {
  if (auditFilter.value === "all") return auditLogs.value;
  return auditLogs.value.filter((l) => l.type === auditFilter.value);
});

const style = useCssModule();

function getActionClass(type: string) {
  switch (type) {
    case "login": return style.actionLogin;
    case "loan": return style.actionLoan;
    case "customer": return style.actionCustomer;
    case "system": return style.actionSystem;
    default: return style.actionLogin;
  }
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
  font-size: 36px;
  letter-spacing: -0.84px;
  font-weight: 800;
  color: var(--color-darkslategray-500);
}

.pageSub {
  margin: 0;
  font-size: 15px;
  color: var(--color-darkslategray-200);
}

.topBarRight {
  display: flex;
  align-items: center;
  gap: 10px;
}

.iconBtn {
  height: 46px;
  width: 46px;
  border-radius: 23px;
  cursor: pointer;
}

.userA {
  height: 48px;
  border-radius: 9999px;
  background-color: #fff;
  border: 1px solid var(--color-lightgray-100);
  display: flex;
  align-items: center;
  padding: 5px 14px 5px 5px;
  gap: 9px;
}

.userAvatar {
  height: 36px;
  width: 36px;
  border-radius: 18px;
  background-color: var(--color-darkslategray-500);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.userAvatarImg {
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.userInitials {
  color: var(--color-goldenrod-200);
  font-size: 13px;
}

.userName {
  font-weight: 600;
  font-size: 15px;
  color: var(--color-darkslategray-500);
}

/* ── Profile Hero Banner ── */
.profileBanner {
  position: relative;
  background-color: var(--color-darkslategray-600);
  border-radius: 20px;
  padding: 28px 32px;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
}

.bannerPattern {
  position: absolute;
  top: 0;
  right: -10px;
  height: 100%;
  width: 140px;
  object-fit: cover;
  object-position: center top;
  opacity: 0.9;
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 0;
}

.bannerLeft {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 20px;
}

.avatarImg {
  width: 80px;
  height: 80px;
  min-width: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--color-goldenrod-200);
  background-color: #ffffff;
}

.avatar {
  width: 80px;
  height: 80px;
  min-width: 80px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.15);
  border: 3px solid var(--color-goldenrod-200);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatarText {
  font-size: 28px;
  font-weight: 800;
  color: var(--color-goldenrod-200);
}

.bannerInfo {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.profileName {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.3px;
}

.profileSub {
  margin: 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
}

.badgeRow {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
}

.roleBadge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background-color: var(--color-goldenrod-200);
  color: #1a202c;
  font-size: 11.5px;
  font-weight: 700;
  padding: 4px 14px;
  border-radius: 9999px;
}

.statusBadge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 14px;
  border-radius: 9999px;
}

.statusDot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #2b9c6e;
  display: inline-block;
}

/* ── Stats Widget ── */
.statWidget {
  position: relative;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 14px;
  padding: 18px 28px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.statItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.statValue {
  font-size: 26px;
  font-weight: 900;
  color: #ffffff;
}

.statLabel {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.55);
  white-space: nowrap;
}

.statDivider {
  width: 1px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.15);
}

/* ── Cards Grid ── */
.cardsGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 28px;
}

.card {
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #ede9e1;
  padding: 22px 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

.cardHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.cardTitleRow {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cardNum {
  width: 28px;
  height: 28px;
  min-width: 28px;
  border-radius: 50%;
  border: 2px solid var(--color-goldenrod-200);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 800;
  color: var(--color-goldenrod-200);
}

.cardTitle {
  margin: 0;
  font-size: 16px;
  font-weight: 800;
  color: #1a202c;
}

.editBtn {
  padding: 6px 20px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  color: #374151;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: var(--font-inter);
}

.editBtn:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

.cardBody {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.fieldRow {
  display: flex;
  gap: 24px;
}

.field {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.fieldLabel {
  font-size: 11.5px;
  color: #9ca3af;
  font-weight: 500;
}

.fieldValue {
  font-size: 14px;
  font-weight: 700;
  color: #1a202c;
}

.fieldValueGreen {
  font-size: 14px;
  font-weight: 700;
  color: #2b9c6e;
}

.enableTwoFactorBtn {
  align-self: flex-start;
  margin-top: 2px;
  padding: 5px 14px;
  border: 1px solid #dc2626;
  border-radius: 8px;
  background-color: #dc2626;
  color: #ffffff;
  font-family: var(--font-inter);
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
}

.enableTwoFactorBtn:hover {
  background-color: #b91c1c;
  border-color: #b91c1c;
}

.fieldValueMuted {
  font-size: 14px;
  font-weight: 600;
  color: #9ca3af;
}

.changePassBtn {
  margin-top: 4px;
  padding: 8px 20px;
  border-radius: 10px;
  border: 1px solid var(--color-darkslategray-600);
  background-color: transparent;
  color: var(--color-darkslategray-600);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-inter);
  transition: all 0.15s ease;
  align-self: flex-start;
}

.changePassBtn:hover {
  background-color: var(--color-darkslategray-600);
  color: #ffffff;
}

.securityActions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.securityActions .changePassBtn {
  margin-top: 0;
  align-self: center;
}

.deleteAccountBtn {
  padding: 8px 20px;
  border: 1px solid #dc2626;
  border-radius: 10px;
  background-color: #dc2626;
  color: #ffffff;
  font-family: var(--font-inter);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
}

.deleteAccountBtn:hover {
  background-color: #b91c1c;
  border-color: #b91c1c;
}

.deleteModalCard {
  max-width: 460px;
}

.deleteInput {
  width: 100%;
  padding: 11px 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  background-color: #ffffff;
  color: #111827;
  font-family: var(--font-inter);
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.deleteInput:focus {
  outline: none;
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.14);
}

.deleteBackupNote {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: #4b5563;
}

.deleteWarning {
  margin: 0;
  font-size: 13px;
  font-weight: 800;
  color: #dc2626;
}

.deleteConfirmBtn {
  padding: 10px 24px;
  border: none;
  border-radius: 10px;
  background-color: #dc2626;
  color: #ffffff;
  font-family: var(--font-inter);
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.deleteConfirmBtn:hover:not(:disabled) {
  background-color: #b91c1c;
}

.deleteConfirmBtn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

/* ── Combined Security & Permissions Card ── */
.cardFullWidth {
  grid-column: 1 / -1;
}

.secPermBody {
  display: flex;
  gap: 36px;
  align-items: stretch;
}

.secSide {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.secPermDivider {
  width: 1px;
  background-color: #ede9e1;
}

.permSide {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.subSectionTitle {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.permList {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* ── Permission Rows ── */
.permRow {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 0;
}

.permDot {
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50%;
  display: inline-block;
}

.permDotGreen {
  background-color: #2b9c6e;
}

.permDotRed {
  background-color: #dc2626;
}

@media (max-width: 860px) {
  .secPermBody {
    flex-direction: column;
    gap: 20px;
  }
  .secPermDivider {
    width: 100%;
    height: 1px;
  }
}

/* ── Audit / Activity Log ── */
.auditSection {
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #ede9e1;
  padding: 24px 28px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

.auditHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}

.auditTitleRow {
  display: flex;
  align-items: center;
  gap: 10px;
}

.auditIcon {
  color: var(--color-darkslategray-600);
}

.auditTitle {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: #1a202c;
}

.auditBadge {
  background-color: #e8f0ea;
  color: var(--color-darkslategray-500);
  font-size: 11px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 9999px;
}

.auditActions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.auditFilterWrap {
  position: relative;
}

.auditSelect {
  padding: 8px 32px 8px 14px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  color: #374151;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-inter);
  outline: none;
  appearance: auto;
}

/* ── Audit Table ── */
.auditTable {
  width: 100%;
  overflow-x: auto;
}

.auditTableHead {
  display: flex;
  align-items: center;
  padding: 10px 0 14px;
  border-bottom: 1px solid #edf2f7;
  font-size: 11.5px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.auditRow {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f7f5f2;
  font-size: 13px;
  transition: background-color 0.1s ease;
}

.auditRow:hover {
  background-color: #faf8f5;
}

.auditColDate {
  width: 180px;
  min-width: 160px;
  color: #6b7280;
  font-weight: 500;
}

.auditColUser {
  width: 170px;
  min-width: 140px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #1a202c;
}

.auditUserDot {
  width: 26px;
  height: 26px;
  min-width: 26px;
  border-radius: 50%;
  background-color: var(--color-darkslategray-500);
  color: var(--color-goldenrod-200);
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auditColAction {
  width: 160px;
  min-width: 130px;
}

.auditColDetails {
  flex: 1;
  min-width: 200px;
  color: #6b7280;
  font-weight: 500;
}

.auditColIP {
  width: 140px;
  min-width: 120px;
  color: #9ca3af;
  font-size: 12px;
  font-family: var(--font-inter);
  text-align: right;
}

/* Action Type Badges */
.actionLogin {
  display: inline-block;
  background-color: #e8f5e9;
  color: #2e7d32;
  font-size: 11.5px;
  font-weight: 700;
  padding: 3px 12px;
  border-radius: 6px;
}

.actionLoan {
  display: inline-block;
  background-color: #fff8e1;
  color: #f57f17;
  font-size: 11.5px;
  font-weight: 700;
  padding: 3px 12px;
  border-radius: 6px;
}

.actionCustomer {
  display: inline-block;
  background-color: #e3f2fd;
  color: #1565c0;
  font-size: 11.5px;
  font-weight: 700;
  padding: 3px 12px;
  border-radius: 6px;
}

.actionSystem {
  display: inline-block;
  background-color: #f3e5f5;
  color: #7b1fa2;
  font-size: 11.5px;
  font-weight: 700;
  padding: 3px 12px;
  border-radius: 6px;
}

/* ── Audit Footer ── */
.auditFooter {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid #edf2f7;
  font-size: 12px;
  color: #9ca3af;
}

/* ── Change Password Modal ── */
.modalOverlay {
  position: fixed;
  inset: 0;
  background-color: rgba(15, 46, 36, 0.45);
  backdrop-filter: blur(4px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modalCard {
  background-color: #ffffff;
  border-radius: 20px;
  max-width: 480px;
  width: 100%;
  padding: 30px 32px 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.05);
  animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
  from {
    transform: translateY(16px) scale(0.98);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

.modalHeader {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 22px;
  gap: 16px;
}

.modalTitleRow {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.modalIconBox {
  width: 42px;
  height: 42px;
  min-width: 42px;
  border-radius: 12px;
  background-color: #fef3c7;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modalTitle {
  margin: 0 0 4px;
  font-size: 19px;
  font-weight: 800;
  color: #0f2e24;
}

.modalSub {
  margin: 0;
  font-size: 13px;
  color: #6b7280;
  line-height: 1.4;
}

.closeModalBtn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  padding: 4px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.closeModalBtn:hover {
  background-color: #f3f4f6;
  color: #111827;
}

.modalForm {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.inputGroup {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.inputLabel {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.inputWrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.inputField {
  width: 100%;
  padding: 11px 44px 11px 14px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  font-family: var(--font-inter);
  outline: none;
  box-sizing: border-box;
  color: #111827;
  transition: all 0.15s ease;
}

.inputField:focus {
  border-color: #0f2e24;
  box-shadow: 0 0 0 3px rgba(15, 46, 36, 0.1);
}

.toggleEyeBtn {
  position: absolute;
  right: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
}

.toggleEyeBtn:hover {
  color: #374151;
}

/* ── Strength Bar & Criteria ── */
.strengthWrap {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
}

.strengthBarBg {
  flex: 1;
  height: 6px;
  background-color: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.strengthBarFill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease, background-color 0.3s ease;
}

.barWeak {
  background-color: #ef4444;
}

.barMedium {
  background-color: #f59e0b;
}

.barStrong {
  background-color: #10b981;
}

.strengthLabel {
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}

.textWeak {
  color: #ef4444;
}

.textMedium {
  color: #f59e0b;
}

.textStrong {
  color: #10b981;
}

.criteriaList {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 12px;
  background-color: #f9fafb;
  border-radius: 10px;
  padding: 10px 14px;
  margin-top: 4px;
}

.criteriaItem {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  color: #9ca3af;
  font-weight: 500;
  transition: color 0.15s ease;
}

.checkDot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  min-width: 14px;
}

.criteriaMet {
  color: #059669;
  font-weight: 600;
}

.errorText {
  font-size: 12px;
  color: #dc2626;
  font-weight: 600;
  margin-top: 2px;
}

.matchText {
  font-size: 12px;
  color: #059669;
  font-weight: 600;
  margin-top: 2px;
}

/* ── Modal Actions ── */
.modalActions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
  padding-top: 14px;
  border-top: 1px solid #edf2f7;
}

.modalCancelBtn {
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  color: #374151;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-inter);
  transition: all 0.15s ease;
}

.modalCancelBtn:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

.modalSubmitBtn {
  padding: 10px 24px;
  border-radius: 10px;
  border: none;
  background-color: #0f2e24;
  color: #ffffff;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-inter);
  transition: all 0.2s ease;
}

.modalSubmitBtn:hover:not(:disabled) {
  background-color: #061913;
}

.modalSubmitBtn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

/* ── Success Box ── */
.successBox {
  display: flex;
  align-items: center;
  gap: 14px;
  background-color: #ecfdf5;
  border: 1px solid #a7f3d0;
  border-radius: 14px;
  padding: 20px;
  color: #065f46;
}

.successText {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 13.5px;
}

.successText b {
  font-size: 15px;
  color: #064e3b;
}

@media screen and (max-width: 1050px) {
  .mainContent {
    padding-top: 64px;
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

  .topBar {
    flex-direction: column-reverse;
    align-items: stretch;
    gap: 12px;
  }

  .topBarLeft {
    width: 100%;
  }

  .topBarRight {
    width: 100%;
    justify-content: flex-end;
  }

  .pageTitle {
    font-size: 26px;
    line-height: 1.15;
  }

  .pageSub {
    font-size: 14px;
    line-height: 1.45;
  }

  .profileBanner {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 16px;
    gap: 16px;
  }

  .bannerLeft {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .statWidget {
    width: 100%;
    box-sizing: border-box;
    padding: 14px 16px;
    gap: 14px;
    flex-wrap: wrap;
    justify-content: space-between;
  }

}

@media screen and (max-width: 760px) {
  .cardsGrid {
    grid-template-columns: minmax(0, 1fr);
    gap: 14px;
  }

  .card {
    width: 100%;
    min-width: 0;
    padding: 18px 16px;
  }

  .auditTable {
    overflow-x: auto;
    scrollbar-width: thin;
  }

  .auditColIP {
    display: none;
  }

  .auditColAction {
    width: 112px;
    min-width: 112px;
  }

  .auditColDetails {
    min-width: 130px;
  }

  .cardHeader {
    flex-wrap: wrap;
    gap: 10px;
  }

  .cardBody {
    padding: 0;
  }

  .fieldGrid,
  .formGrid2 {
    grid-template-columns: 1fr;
  }

  .profileName {
    font-size: 22px;
  }

  .auditSection {
    padding: 18px 16px;
  }

  .auditTableWrap {
    overflow-x: auto;
  }
}

/* Gaborone theme: white header text only on this preset. */
.isGaborone .pageTitle {
  color: #ffffff;
}
.isGaborone .pageSub {
  color: #ffffff;
}
.isGaborone .profileName {
  color: #ffffff;
}
.isGaborone .profileSub {
  color: rgba(255, 255, 255, 0.9);
}
  .avatarPicker {
    display: inline-flex;
    cursor: pointer;
  }
  .avatarPicker input {
    display: none;
  }
</style>
