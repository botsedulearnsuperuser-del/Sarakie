<template>
  <div :class="$style.page">
    <!-- Reusable Stationary Sidebar -->
    <Main :active-page="activePage" />

    <!-- Main Scrollable Content -->
    <main :class="$style.mainContent">
      <!-- Top Bar Header matching DashboardSample & LoansSheet -->
      <header :class="$style.div">
        <div :class="$style.div2">
          <div :class="$style.h2actH">
            <div :class="$style.titleRow">
              <h2 :class="$style.dumelaMarion">Team</h2>
            </div>
          </div>
          <div :class="$style.pWrap">
            <div :class="$style.sunday4October">
              Manage your team members and invite colleagues to collaborate
            </div>
          </div>
        </div>
        <div :class="$style.div3">
          <img :class="$style.notifications2New" alt="" src="/Notifications-2-new.svg" />
          <img :class="$style.notifications2New" alt="" src="/Help.svg" />
          <router-link to="/admin-profile" :class="$style.userA" style="text-decoration: none;">
            <img :class="$style.userAvatarImg" src="/innovator-man.webp" alt="Marion Lucas" />
            <div :class="$style.span3">
              <div :class="$style.marionLucas">Marion Lucas</div>
            </div>
          </router-link>
        </div>
      </header>

      <!-- Team Section -->
      <section :class="$style.cardContainer">
        <div v-if="showInvitePopup" :class="$style.popupOverlay" @click.self="closeInvitePopup">
          <div :class="$style.popupCard">
            <div :class="$style.popupHeader">
              <h3 :class="$style.popupTitle">Invite Team Member</h3>
              <button :class="$style.popupClose" type="button" @click="closeInvitePopup">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div :class="$style.popupBody">
              <label :class="$style.fieldLabel">Email address</label>
              <input
                v-model="inviteEmail"
                :class="$style.emailInput"
                type="email"
                placeholder="colleague@example.com"
                @keyup.enter="sendInvite"
              />
              <button :class="$style.inviteSendBtn" type="button" @click="sendInvite">
                Send Invite
              </button>
            </div>
          </div>
        </div>

        <div v-if="showConfirmationPopup" :class="$style.popupOverlay" @click.self="closeConfirmationPopup">
          <div :class="$style.popupCard">
            <div :class="$style.popupHeader">
              <h3 :class="$style.popupTitle">Invite Sent</h3>
            </div>
            <div :class="$style.popupBody">
              <div :class="$style.confirmIcon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <p :class="$style.confirmText">
                An invite has been sent to <strong>{{ sentEmail }}</strong>.
                They will be able to join your team once they accept the invitation.
              </p>
              <button :class="$style.confirmDoneBtn" type="button" @click="closeConfirmationPopup">
                Done
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="teamMembers.length === 0" :class="$style.emptyState">
          <div :class="$style.emptyIconWrap">
            <svg
              :class="$style.emptyIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M17.5 2.25q-3.25 0-3.25 3.25t3.25 3.25t3.25-3.25t-3.25-3.25m-8 2.25q-4 0-4 4t4 4q1.657 0 2.828-1.172Q13.5 10.157 13.5 8.5t-1.172-2.828Q11.157 4.5 9.5 4.5m8 5.5q-1.595 0-2.817.57q-.067.032-.127.075q-.059.044-.109.098t-.088.118q-.039.063-.064.133q-.025.069-.036.142q-.012.073-.008.147q.003.074.021.145q.017.072.048.139q.032.067.075.127q.044.059.098.109t.118.088q.063.039.133.064q.069.025.142.036q.073.012.147.008q.074-.003.145-.021q.072-.017.139-.048q.921-.43 2.183-.43q3.25 0 3.25 3q0 .074.014.146q.015.073.043.141t.069.13t.094.113q.052.053.113.094t.13.069t.141.043t.146.014t.146-.014q.073-.015.141-.043t.13-.069q.061-.041.113-.094q.053-.052.094-.113t.069-.13t.043-.141t.014-.146q0-4.5-4.75-4.5m-8 3.75q4.143 0 6.041 2.25H15q-.338 0-.657.111q-.318.111-.583.32q-1.515-1.181-4.26-1.181q-6.25 0-6.25 5.75q0 .074-.014.146q-.015.073-.043.141t-.069.13q-.041.061-.094.113q-.052.053-.113.094t-.13.069t-.141.043t-.146.014t-.146-.014q-.073-.015-.141-.043t-.13-.069t-.113-.094q-.053-.052-.094-.113t-.069-.13t-.043-.141T1.75 21q0-3.284 2.248-5.307Q6.157 13.75 9.5 13.75M18.75 21v-2.25H21q.074 0 .146-.014q.073-.015.141-.043t.13-.069q.061-.041.113-.094q.053-.052.094-.113t.069-.13t.043-.141t.014-.146t-.014-.146q-.015-.073-.043-.141t-.069-.13q-.041-.061-.094-.113q-.052-.053-.113-.094t-.13-.069t-.141-.043T21 17.25h-2.25V15q0-.074-.014-.146q-.015-.073-.043-.141t-.069-.13t-.094-.113q-.052-.053-.113-.094t-.13-.069t-.141-.043T18 14.25t-.146.014q-.073.015-.141.043t-.13.069q-.061.041-.113.094q-.053.052-.094.113t-.069.13t-.043.141t-.014.146v2.25H15q-.074 0-.146.014q-.073.015-.141.043t-.13.069t-.113.094q-.053.052-.094.113t-.069.13t-.043.141t-.014.146t.014.146q.015.073.043.141t.069.13q.041.061.094.113q.052.053.113.094t.13.069t.141.043t.146.014h2.25V21q0 .074.014.146q.015.073.043.141t.069.13q.041.061.094.113q.052.053.113.094t.13.069t.141.043t.146.014q.074 0 .146-.014q.073-.015.141-.043t.13-.069q.061-.041.113-.094q.053-.052.094-.113t.069-.13t.043-.141t.014-.146M16 20v.207q-.181-.064-.309-.207z"
              />
            </svg>
          </div>
          <h3 :class="$style.emptyTitle">No team members yet</h3>
          <p :class="$style.emptyDesc">
            Invite your colleagues to collaborate on applications and ideas.
          </p>
          <button :class="$style.inviteTeamBtn" type="button" @click="openInvitePopup">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 1024 1024"
            >
              <path d="M0 0h1024v1024H0z" fill="none" />
              <path fill="currentColor" d="M824.2 699.9a301.6 301.6 0 0 0-86.4-60.4C783.1 602.8 812 546.8 812 484c0-110.8-92.4-201.7-203.2-200c-109.1 1.7-197 90.6-197 200c0 62.8 29 118.8 74.2 155.5a301 301 0 0 0-86.4 60.4C345 754.6 314 826.8 312 903.8a8 8 0 0 0 8 8.2h56c4.3 0 7.9-3.4 8-7.7c1.9-58 25.4-112.3 66.7-153.5A226.62 226.62 0 0 1 612 684c60.9 0 118.2 23.7 161.3 66.8C814.5 792 838 846.3 840 904.3c.1 4.3 3.7 7.7 8 7.7h56a8 8 0 0 0 8-8.2c-2-77-33-149.2-87.8-203.9M612 612c-34.2 0-66.4-13.3-90.5-37.5a126.86 126.86 0 0 1-37.5-91.8c.3-32.8 13.4-64.5 36.3-88c24-24.6 56.1-38.3 90.4-38.7c33.9-.3 66.8 12.9 91 36.6c24.8 24.3 38.4 56.8 38.4 91.4c0 34.2-13.3 66.3-37.5 90.5A127.3 127.3 0 0 1 612 612M361.5 510.4c-.9-8.7-1.4-17.5-1.4-26.4c0-15.9 1.5-31.4 4.3-46.5c.7-3.6-1.2-7.3-4.5-8.8c-13.6-6.1-26.1-14.5-36.9-25.1a127.54 127.54 0 0 1-38.7-95.4c.9-32.1 13.8-62.6 36.3-85.6c24.7-25.3 57.9-39.1 93.2-38.7c31.9.3 62.7 12.6 86 34.4c7.9 7.4 14.7 15.6 20.4 24.4c2 3.1 5.9 4.4 9.3 3.2c17.6-6.1 36.2-10.4 55.3-12.4c5.6-.6 8.8-6.6 6.3-11.6c-32.5-64.3-98.9-108.7-175.7-109.9c-110.9-1.7-203.3 89.2-203.3 199.9c0 62.8 28.9 118.8 74.2 155.5c-31.8 14.7-61.1 35-86.5 60.4c-54.8 54.7-85.8 126.9-87.8 204a8 8 0 0 0 8 8.2h56.1c4.3 0 7.9-3.4 8-7.7c1.9-58 25.4-112.3 66.7-153.5c29.4-29.4 65.4-49.8 104.7-59.7c3.9-1 6.5-4.7 6-8.7" />
            </svg>
            Invite team
          </button>
        </div>

        <!-- Team Members List -->
        <div v-else :class="$style.teamList">
          <h3 :class="$style.sectionTitle">Team Members</h3>
          <div v-for="member in teamMembers" :key="member.id" :class="$style.memberCard">
            <img :class="$style.memberAvatar" src="/innovator-man.webp" alt="" />
            <div :class="$style.memberInfo">
              <div :class="$style.memberName">{{ member.name }}</div>
              <div :class="$style.memberEmail">{{ member.email }}</div>
            </div>
            <span :class="$style.memberRole">{{ member.role }}</span>
            <button :class="$style.memberRemoveBtn" type="button" @click="removeMember(member.id)">
              Remove
            </button>
          </div>
        </div>
      </section>
    </main>
    <ChatWithAgent />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Main from "../components/Main.vue";
import ChatWithAgent from "../components/ChatWithAgent.vue";

const activePage = "team" as const;

const teamMembers = ref<Array<{ id: number; name: string; email: string; role: string }>>([]);

const showInvitePopup = ref(false);
const showConfirmationPopup = ref(false);
const inviteEmail = ref("");
const sentEmail = ref("");

function openInvitePopup() {
  inviteEmail.value = "";
  sentEmail.value = "";
  showInvitePopup.value = true;
}

function closeInvitePopup() {
  showInvitePopup.value = false;
  inviteEmail.value = "";
}

function sendInvite() {
  const email = inviteEmail.value.trim();
  if (!email || !email.includes("@")) return;
  sentEmail.value = email;
  // Simulate sending invite
  teamMembers.value.push({
    id: Date.now(),
    name: email.split("@")[0].replace(/[^a-zA-Z]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    email: email,
    role: "Member",
  });
  showConfirmationPopup.value = true;
  closeInvitePopup();
}

function closeConfirmationPopup() {
  showConfirmationPopup.value = false;
  sentEmail.value = "";
}

function removeMember(id: number) {
  teamMembers.value = teamMembers.value.filter((m) => m.id !== id);
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

/* Header matching DashboardSample & LoansSheet */
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
  margin-bottom: 22px;
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
  justify-content: center;
}

.marionLucas {
  font-size: var(--fs-13);
  font-weight: 600;
  color: var(--color-darkslategray-500);
}

.cardContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

/* Empty State */
.emptyState {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  text-align: center;
  gap: 16px;
}

.emptyIconWrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: var(--color-blanchedalmond);
  color: var(--color-saddlebrown);
  margin-bottom: 8px;
}

.emptyIcon {
  width: 64px;
  height: 64px;
}

.emptyTitle {
  margin: 0;
  font-size: var(--fs-20);
  font-weight: 700;
  color: var(--color-darkslategray-500);
}

.emptyDesc {
  margin: 0;
  font-size: var(--fs-15);
  color: var(--color-darkslategray-300);
  max-width: 320px;
  line-height: 1.5;
}

.inviteTeamBtn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
  height: 48px;
  padding: 0 28px;
  border-radius: 12px;
  background-color: var(--color-darkslategray-500);
  color: var(--color-white);
  border: none;
  font-size: var(--fs-15);
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.15s;
}

.inviteTeamBtn:hover {
  background-color: var(--color-darkslategray-600);
}

.inviteTeamBtn:active {
  transform: translateY(1px);
}

/* Team List */
.teamList {
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sectionTitle {
  margin: 0;
  font-size: var(--fs-18);
  font-weight: 700;
  color: var(--color-darkslategray-500);
}

.memberCard {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background-color: var(--color-white);
  border: 1px solid var(--color-lightgray-100);
  border-radius: 12px;
  box-sizing: border-box;
}

.memberAvatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.memberInfo {
  flex: 1;
  min-width: 0;
}

.memberName {
  font-size: var(--fs-15);
  font-weight: 600;
  color: var(--color-darkslategray-500);
}

.memberEmail {
  font-size: var(--fs-13);
  color: var(--color-darkslategray-300);
  margin-top: 2px;
}

.memberRole {
  font-size: var(--fs-13);
  color: var(--color-darkslategray-300);
  padding: 4px 12px;
  background-color: var(--color-blanchedalmond);
  border-radius: 20px;
  white-space: nowrap;
}

.memberRemoveBtn {
  height: 36px;
  padding: 0 16px;
  border-radius: 8px;
  background-color: transparent;
  color: var(--color-saddlebrown);
  border: 1px solid var(--color-goldenrod-200);
  font-size: var(--fs-13);
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.2s;
}

.memberRemoveBtn:hover {
  background-color: var(--color-blanchedalmond);
}

/* Popup Overlay */
.popupOverlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  font-family: var(--font-inter);
}

.popupCard {
  width: 100%;
  max-width: 420px;
  background-color: var(--color-white);
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.popupHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-lightgray-100);
}

.popupTitle {
  margin: 0;
  font-size: var(--fs-17);
  font-weight: 700;
  color: var(--color-darkslategray-500);
}

.popupClose {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-darkslategray-300);
  transition: background-color 0.2s;
}

.popupClose:hover {
  background-color: var(--color-blanchedalmond);
}

.popupBody {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.fieldLabel {
  font-size: var(--fs-14);
  font-weight: 600;
  color: var(--color-darkslategray-500);
  margin: 0;
}

.emailInput {
  height: 48px;
  padding: 0 16px;
  border: 1px solid var(--color-lightgray-200);
  border-radius: 10px;
  font-size: var(--fs-15);
  font-family: inherit;
  color: var(--color-darkslategray-500);
  background-color: var(--color-white);
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.2s;
}

.emailInput:focus {
  border-color: var(--color-darkslategray-500);
}

.emailInput::placeholder {
  color: var(--color-darkslategray-300);
}

.inviteSendBtn {
  height: 48px;
  border-radius: 10px;
  background-color: var(--color-darkslategray-500);
  color: var(--color-white);
  border: none;
  padding: 0 24px;
  font-size: var(--fs-15);
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.15s;
  margin-top: 4px;
}

.inviteSendBtn:hover {
  background-color: var(--color-darkslategray-600);
}

.inviteSendBtn:active {
  transform: translateY(1px);
}

/* Confirmation Popup */
.confirmIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: var(--color-blanchedalmond);
  margin: 0 auto 16px;
}

.confirmText {
  margin: 0;
  font-size: var(--fs-15);
  color: var(--color-darkslategray-500);
  text-align: center;
  line-height: 1.5;
}

.confirmText strong {
  color: var(--color-darkslategray-500);
}

.confirmDoneBtn {
  height: 44px;
  border-radius: 10px;
  background-color: var(--color-darkslategray-500);
  color: var(--color-white);
  border: none;
  padding: 0 32px;
  font-size: var(--fs-15);
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 8px;
}

.confirmDoneBtn:hover {
  background-color: var(--color-darkslategray-600);
}
</style>
