<template>
  <div :class="[$style.page, isGaborone ? $style.isGaborone : '']" :style="pageBackground">
    <!-- Reusable Stationary Sidebar -->
    <Main :active-page="'team'" />

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

      <!-- Quick links sitting under the signed-in user chip -->
      <div :class="$style.quickNav">
        <router-link
          to="/team"
          :class="$style.quickNavItem"
          :active-class="$style.quickNavItemActive"
          >Team</router-link
        >
        <router-link
          to="/ideas"
          :class="$style.quickNavItem"
          :active-class="$style.quickNavItemActive"
          >Ideas</router-link
        >
        <router-link
          to="/deadlines"
          :class="$style.quickNavItem"
          :active-class="$style.quickNavItemActive"
          >Deadline</router-link
        >
      </div>

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
              <svg
                :class="$style.confirmIcon"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 32 32"
              >
                <path d="M0 0h32v32H0z" fill="none" />
                <g fill="currentColor">
                  <path d="M15.371 13.041q.167.055.342.081q.278.07.563.1a1.978 1.978 0 0 0 3.846.114c.218-.786.33-1.598.333-2.414a9.4 9.4 0 0 0 1.168-2.1l.013-.03l.107-.26l.137-.346a29 29 0 0 0 .415-1.146l.027-.08l.01-.032c.068-.2.136-.422.2-.646q.057-.194.109-.392a9.5 9.5 0 0 0 .322-1.791v-.03a2 2 0 0 0-1.732-2.052a1.96 1.96 0 0 0-1.134.195a2 2 0 0 0-1.091 1.636v.01a8.5 8.5 0 0 1-.43 1.793c-.1.3-.2.585-.3.84q-.302-.155-.624-.26l-.019-.009a3.592 3.592 0 0 0-2.262 6.818zm3.786.031a.978.978 0 0 1-1.849.117q.285-.051.559-.144a4.4 4.4 0 0 0 1.489-.89q-.075.464-.199.917m-5.11-4.26a2.586 2.586 0 0 1 3.27-1.64l.03.01q.293.094.561.244l-.021.049v.012a5.4 5.4 0 0 1-.9 1.429l-.016.016l-.025.029a2 2 0 0 1-.1.109l-.1-.038l-.03-.01a.634.634 0 0 0-.8.4a.57.57 0 0 0 .03.48c.06.128.162.231.289.292q.05.012.1.028q.136.049.279.061a.8.8 0 0 0 .437-.1q.105-.054.2-.124q.253-.198.458-.445l.01-.01a6.3 6.3 0 0 0 1.077-1.693a5 5 0 0 0 .088-.215v-.015l.01-.024a17 17 0 0 0 .162-.393l.034-.087l.034-.088c.424-1.015.72-2.079.883-3.167q.014-.182.09-.349a1 1 0 0 1 .243-.325a.98.98 0 0 1 .707-.246c.215.012.42.096.58.24a1 1 0 0 1 .34.79q-.016.24-.055.5q-.12.74-.336 1.457l-.042.14a24 24 0 0 1-.615 1.764l-.033.084a24 24 0 0 1-.174.429l-.015.036l-.086.208a8.5 8.5 0 0 1-1.414 2.24a3.74 3.74 0 0 1-1.831 1.26a2.7 2.7 0 0 1-1.043.072a3 3 0 0 1-.422-.084a1 1 0 0 1-.214-.045a2.593 2.593 0 0 1-1.64-3.281M12.06 3.98a.96.96 0 1 1-1.066-1.596a.96.96 0 0 1 1.066 1.596m11.908 18.846a.97.97 0 1 1 1.078 1.612a.97.97 0 0 1-1.078-1.612m.999-13.914a1.16 1.16 0 1 0 0-2.32a1.16 1.16 0 0 0 0 2.32M6.651 8.716a1.16 1.16 0 1 1-1.288-1.929a1.16 1.16 0 0 1 1.288 1.93" />
                  <path d="M29.396 14.89a1.04 1.04 0 0 1-.799.032a6.65 6.65 0 0 0-6.397.969c2.327.06 4.602.694 6.623 1.849a2.15 2.15 0 0 1-2.086 3.76a9.74 9.74 0 0 0-7.981-.813c.335.643.586 1.327.745 2.035c.057.211.085.43.084.648a1.96 1.96 0 0 1-.48 1.542q-.12.12-.265.209a2.4 2.4 0 0 1-1.055.591l-12.738 3.41a2.42 2.42 0 0 1-2.96-2.97l3.41-12.74a2.4 2.4 0 0 1 .6-1.065q.086-.139.2-.255a1.94 1.94 0 0 1 1.495-.482c.243-.006.486.025.72.092a8 8 0 0 1 1.794.636c.28-1.62.01-3.288-.769-4.736a1.174 1.174 0 0 1 2.07-1.11a9.72 9.72 0 0 1 .824 7.11a21 21 0 0 1 2.209 1.805a1.15 1.15 0 0 1 1.677 1.573q.214-.085.434-.163a16 16 0 0 1 4.088-.888a1.05 1.05 0 0 1 .004-1.641a8.74 8.74 0 0 1 8.486-1.33a1.048 1.048 0 0 1 .067 1.932m-17.888 7.357l-.181-.155l.166.142zm0 0l.132.112zm-7.454 5.908c.24.065.494.065.735.001l.578-.151a11.3 11.3 0 0 1-2.183-2.08l-.131.49a1.42 1.42 0 0 0 1.001 1.74m1.596-2.507a10.3 10.3 0 0 0 2.379 1.641l2.798-.749a17.5 17.5 0 0 1-3.03-2.265a19.2 19.2 0 0 1-3.142-3.853l-.794 2.969a10.2 10.2 0 0 0 1.789 2.257m3.517-2.835a16.3 16.3 0 0 0 4.53 2.96l2.491-.668a16.7 16.7 0 0 1-6.011-4.073a22 22 0 0 1-1.664-1.85q-.345-.428-.644-.853a13 13 0 0 1-1.772-3.307l-.703 2.661a18.7 18.7 0 0 0 3.773 5.13m19.534-3.91a1.2 1.2 0 0 0-.356-.288h-.005a13.15 13.15 0 0 0-11.255-.857l-.192.07l.009.01a13.1 13.1 0 0 0-4.94 3.476c.259.227.51.435.759.635c.349.28.7.539 1.1.8a10.15 10.15 0 0 1 4.028-2.82a10.86 10.86 0 0 1 9.375.693a1.15 1.15 0 0 0 1.477-1.72" />
                </g>
              </svg>
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

        <!-- Edit Member Popup -->
        <div v-if="showEditPopup" :class="$style.popupOverlay" @click.self="closeEditPopup">
          <div :class="$style.popupCard">
            <div :class="$style.popupHeader">
              <h3 :class="$style.popupTitle">Edit Team Member</h3>
              <button :class="$style.popupClose" type="button" @click="closeEditPopup">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div :class="$style.popupBody">
              <div :class="$style.editAvatarSection">
                <label :class="$style.editAvatarUploadBtn">
                  <div :class="$style.editAvatarWrap">
                    <img
                      v-if="editMember.avatar"
                      :src="editMember.avatar"
                      :class="$style.editAvatarImg"
                      alt=""
                    />
                    <div :class="$style.editAvatarPlaceholder" v-else>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0 14.2c-1.323 0-2.415-1.106-2.415-2.5V16c0-.616.185-1.207.515-1.715a6.5 6.5 0 1 1 2.35 4.63c-.093.047-.193.08-.298.103a2.61 2.61 0 0 1-.842.038c-.622-.06-1.13-.407-1.37-1.042A2.4 2.4 0 0 1 10 15.5V12c0-.758.295-1.458.784-1.962A2.5 2.5 0 0 1 12 9.5c.758 0 1.458.295 1.962.784.203.192.347.431.436.692.37.093.737.167 1.105.214a6.5 6.5 0 0 1 .004 1.38c-.384.11-.762.264-1.128.46a6.5 6.5 0 0 1-1.271 1.135c-.081.055-.164.114-.249.166a2.58 2.58 0 0 1-1.522.145c-.538-.056-1.004-.39-1.243-1.005A2.5 2.5 0 0 1 5 11.5v-1c0-.796.367-1.512.97-1.958A2.48 2.48 0 0 1 7 8a2.48 2.48 0 0 1 2.03.542c.532.446 1.014.996 1.209 1.606a6.5 6.5 0 0 1 .818 2.858 6.5 6.5 0 0 1-.234 1.455 6.5 6.5 0 0 1-.962 1.056 6.5 6.5 0 0 1-2.043 1.156c-.42.16-.858.244-1.303.244z" />
                      </svg>
                    </div>
                    <div :class="$style.editAvatarOverlayIcon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path fill="currentColor" d="M12 15.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM9.776 19.72a6.56 6.56 0 0 1 4.448 0A11.5 11.5 0 0 1 12 22.7a11.5 11.5 0 0 1-2.224-3a6.56 6.56 0 0 1 0-2.98zM3.5 10a5.5 5.5 0 0 1 5.5-5.5A5.5 5.5 0 0 1 14 7.5a5.5 5.5 0 0 1-5.5 5.5 5.5 5.5 0 0 1-5.5-5.5zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
                      </svg>
                    </div>
                  </div>
                  <input
                    type="file"
                    :class="$style.avatarFileInput"
                    accept="image/*"
                    @change="handleAvatarUpload"
                  />
                </label>
                <button :class="$style.removeAvatarBtn" type="button" @click="removeAvatar">
                  Remove image
                </button>
              </div>
              <label :class="$style.fieldLabel" style="margin-top: 16px;">Display name</label>
              <input
                v-model="editMember.name"
                :class="$style.emailInput"
                type="text"
                placeholder="Display name"
              />
              <label :class="$style.fieldLabel" style="margin-top: 12px;">Role</label>
              <div :class="$style.roleBadgeEdit">{{ editMember.role }}</div>
              <button :class="$style.inviteSendBtn" type="button" @click="saveEdit" style="margin-top: 16px;">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        <!-- Remove Confirmation Popup -->
        <div v-if="showRemoveConfirmation" :class="$style.popupOverlay" @click.self="cancelRemoveMember">
          <div :class="$style.popupCard">
            <div :class="$style.popupHeader">
              <h3 :class="$style.popupTitle">Remove Team Member</h3>
              <button :class="$style.popupClose" type="button" @click="cancelRemoveMember">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div :class="$style.popupBody">
              <svg
                :class="$style.confirmIcon"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 32 32"
              >
                <path d="M0 0h32v32H0z" fill="none" />
                <g fill="currentColor">
                  <path d="M15.371 13.041q.167.055.342.081q.278.07.563.1a1.978 1.978 0 0 0 3.846.114c.218-.786.33-1.598.333-2.414a9.4 9.4 0 0 0 1.168-2.1l.013-.03l.107-.26l.137-.346a29 29 0 0 0 .415-1.146l.027-.08l.01-.032c.068-.2.136-.422.2-.646q.057-.194.109-.392a9.5 9.5 0 0 0 .322-1.791v-.03a2 2 0 0 0-1.732-2.052a1.96 1.96 0 0 0-1.134.195a2 2 0 0 0-1.938-.185 1.96 1.96 0 0 0-1.091 1.636v.01a8.5 8.5 0 0 1-.43 1.793c-.1.3-.2.585-.3.84q-.302-.155-.624-.26l-.019-.009a3.592 3.592 0 0 0-2.262 6.818zm3.786.031a.978.978 0 0 1-1.849.117q.285-.051.559-.144a4.4 4.4 0 0 0 1.489-.89q-.075.464-.199.917m-5.11-4.26a2.586 2.586 0 0 1 3.27-1.64l.03.01q.293.094.561.244l-.021.049v.012a5.4 5.4 0 0 1-.9 1.429l-.016.016l-.025.029a2 2 0 0 1-.1.109l-.1-.038l-.03-.01a.634.634 0 0 0-.8.4a.57.57 0 0 0 .03.48c.06.128.162.231.289.292q.05.012.1.028q.136.049.279.061a.8.8 0 0 0 .437-.1q.105-.054.2-.124q.253-.198.458-.445l.01-.01a6.3 6.3 0 0 0 1.077-1.693a5 5 0 0 0 .088-.215v-.015l.01-.024a17 17 0 0 0 .162-.393l.034-.087l.034-.088c.424-1.015.72-2.079.883-3.167q.014-.182.09-.349a1 1 0 0 1 .243-.325a.98.98 0 0 1 .707-.246c.215.012.42.096.58.24a1 1 0 0 1 .34.79q-.016.24-.055.5q-.12.74-.336 1.457l-.042.14a24 24 0 0 1-.615 1.764l-.033.084a24 24 0 0 1-.174.429l-.015.036l-.086.208a8.5 8.5 0 0 1-1.414 2.24a3.74 3.74 0 0 1-1.831 1.26a2.7 2.7 0 0 1-1.043.072a3 3 0 0 1-.422-.084a1 1 0 0 1-.214-.045a2.593 2.593 0 0 1-1.64-3.281M12.06 3.98a.96.96 0 1 1-1.066-1.596a.96.96 0 0 1 1.066 1.596m11.908 18.846a.97.97 0 1 1 1.078 1.612a.97.97 0 0 1-1.078-1.612m.999-13.914a1.16 1.16 0 1 0 0-2.32a1.16 1.16 0 0 0 0 2.32M6.651 8.716a1.16 1.16 0 1 1-1.288-1.929a1.16 1.16 0 0 1 1.288 1.93" />
                  <path d="M29.396 14.89a1.04 1.04 0 0 1-.799.032a6.65 6.65 0 0 0-6.397.969c2.327.06 4.602.694 6.623 1.849a2.15 2.15 0 0 1-2.086 3.76a9.74 9.74 0 0 0-7.981-.813c.335.643.586 1.327.745 2.035c.057.211.085.43.084.648a1.96 1.96 0 0 1-.48 1.542q-.12.12-.265.209a2.4 2.4 0 0 1-1.055.591l-12.738 3.41a2.42 2.42 0 0 1-2.96-2.97l3.41-12.74a2.4 2.4 0 0 1 .6-1.065q.086-.139.2-.255a1.94 1.94 0 0 1 1.495-.482c.243-.006.486.025.72.092a8 8 0 0 1 1.794.636c.28-1.62.01-3.288-.769-4.736a1.174 1.174 0 0 1 2.07-1.11a9.72 9.72 0 0 1 .824 7.11a21 21 0 0 1 2.209 1.805a1.15 1.15 0 0 1 1.677 1.573q.214-.085.434-.163a16 16 0 0 1 4.088-.888a1.05 1.05 0 0 1 .004-1.641a8.74 8.74 0 0 1 8.486-1.33a1.048 1.048 0 0 1 .067 1.932m-17.888 7.357l-.181-.155l.166.142zm0 0l.132.112zm-7.454 5.908c.24.065.494.065.735.001l.578-.151a11.3 11.3 0 0 1-2.183-2.08l-.131.49a1.42 1.42 0 0 0 1.001 1.74m1.596-2.507a10.3 10.3 0 0 0 2.379 1.641l2.798-.749a17.5 17.5 0 0 1-3.03-2.265a19.2 19.2 0 0 1-3.142-3.853l-.794 2.969a10.2 10.2 0 0 0 1.789 2.257m3.517-2.835a16.3 16.3 0 0 0 4.53 2.96l2.491-.668a16.7 16.7 0 0 1-6.011-4.073a22 22 0 0 1-1.664-1.85q-.345-.428-.644-.853a13 13 0 0 1-1.772-3.307l-.703 2.661a18.7 18.7 0 0 0 3.773 5.13m19.534-3.91a1.2 1.2 0 0 0-.356-.288h-.005a13.15 13.15 0 0 0-11.255-.857l-.192.07l.009.01a13.1 13.1 0 0 0-4.94 3.476c.259.227.51.435.759.635c.349.28.7.539 1.1.8a10.15 10.15 0 0 1 4.028-2.82a10.86 10.86 0 0 1 9.375.693a1.15 1.15 0 0 0 1.477-1.72" />
                </g>
              </svg>
              <p :class="$style.confirmText">
                Are you sure you want to remove <strong>{{ pendingRemoveMember?.name }}</strong>?
                This action cannot be undone.
              </p>
              <div style="display: flex; gap: 12px; margin-top: 8px;">
                <button :class="$style.removeConfirmBtn" type="button" @click="removeMember(pendingRemoveMember!.id)">
                  Remove
                </button>
                <button :class="$style.confirmDoneBtn" type="button" @click="cancelRemoveMember">
                  Cancel
                </button>
              </div>
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
              <path fill="currentColor" fill-rule="evenodd" d="M17.5 2.25q-3.25 0-3.25 3.25t3.25 3.25t3.25-3.25t-3.25-3.25m-8 2.25q-4 0-4 4t4 4q1.657 0 2.828-1.172Q13.5 10.157 13.5 8.5t-1.172-2.828Q11.157 4.5 9.5 4.5m8 5.5q-1.595 0-2.817.57q-.067.032-.127.075q-.059.044-.109.098t-.088.118q-.039.063-.064.133q-.025.069-.036.142q-.012.073-.008.147q.003.074.021.145q.017.072.048.139q.032.067.075.127q.044.059.098.109t.118.088q.063.039.133.064q.069.025.142.036q.073.012.147.008q.074-.003.145-.021q.072-.017.139-.048q.921-.43 2.183-.43q3.25 0 3.25 3q0 .074.014.146q.015.073.043.141t.069.13t.094.113q.052.053.113.094t.13.069t.141.043t.146.014t.146-.014q.073-.015.141-.043t.13-.069q.061-.041.113-.094q.053-.052.094-.113t.069-.13t.043-.141t.014-.146q0-4.5-4.75-4.5m-8 3.75q4.143 0 6.041 2.25H15q-.338 0-.657.111q-.318.111-.583.32q-1.515-1.181-4.26-1.181q-6.25 0-6.25 5.75q0 .074-.014.146q-.015.073-.043.141t-.069.13q-.041.061-.094.113q-.052.053-.113.094t-.13.069t-.141.043t-.146.014t-.146-.014q-.073-.015-.141-.043t-.13-.069t-.113-.094q-.053-.052-.094-.113t-.069-.13t-.043-.141T1.75 21q0-3.284 2.248-5.307Q6.157 13.75 9.5 13.75M18.75 21v-2.25H21q.074 0 .146-.014q.073-.015.141-.043t.13-.069q.061-.041.113-.094q.053-.052.094-.113t.069-.13t.043-.141t.014-.146t-.014-.146q-.015-.073-.043-.141t-.069-.13q-.041-.061-.094-.113q-.052-.053-.113-.094t-.13-.069t-.141-.043T21 17.25h-2.25V15q0-.074-.014-.146q-.015-.073-.043-.141t-.069-.13t-.094-.113q-.052-.053-.113-.094t-.13-.069t-.141-.043T18 14.25t-.146.014q-.073.015-.141.043t-.13.069q-.061.041-.113.094q-.053.052-.094.113t-.069.13t-.043.141t-.014.146v2.25H15q-.074 0-.146.014q-.073.015-.141.043t-.13.069t-.113.094q-.053.052-.094.113t-.069.13t-.043.141t-.014.146t.014.146q.015.073.043.141t.069.13q.041.061.094.113q.052.053.113.094t.13.069t.141.043t.146.014h2.25V21q0 .074.014.146q.015.073.043.141t.069.13q.041.061.094.113q.052.053.113.094t.13.069t.141.043t.146.014q.074 0 .146-.014q.073-.015.141-.043t.13-.069q.061-.041.113-.094q.053-.052.094-.113t.069-.13t.043-.141t.014-.146M16 20v.207q-.181-.064-.309-.207z" />
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
          <div :class="$style.teamListHeader">
            <h3 :class="$style.sectionTitle">Team Members</h3>
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
          <div v-for="member in teamMembers" :key="member.id" :class="$style.memberCard">
            <img
              :src="member.avatar || '/innovator-man.webp'"
              :alt="member.name"
              :class="$style.memberAvatar"
            />
            <div :class="$style.memberInfo">
              <div :class="$style.memberName">{{ member.name }} <span :class="$style.memberRoleBadge">{{ member.role }}</span></div>
              <div :class="$style.memberEmail">{{ member.email }}</div>
            </div>
            <button :class="$style.memberEditBtn" type="button" @click="openEditPopup(member)">
              Edit
            </button>
            <button :class="$style.memberRemoveBtn" type="button" @click="confirmRemoveMember(member)">
              Remove
            </button>
          </div>
        </div>
      </section>
    </main>
    <div :class="$style.taskWidgetDock">
      <TaskWidget :data="teamTask" />
      <VoiceChatDisclosure />
    </div>
    <ChatWithAgent />
  </div>
</template>

<script setup lang="ts">
  import { usePageTheme } from "../composables/usePageTheme";

  const pageBackground = usePageTheme();
  const isGaborone = ref(isGaboroneTheme());
  onMounted(() => {
    window.addEventListener(THEME_EVENT, () => (isGaborone.value = isGaboroneTheme()));
  });

import { onMounted, ref } from "vue";
import { THEME_EVENT, isGaboroneTheme } from "../components/themes";
import Main from "../components/Main.vue";
import ChatWithAgent from "../components/ChatWithAgent.vue";
import TaskWidget from "../components/ui/task-widget.vue";
import VoiceChatDisclosure from "../components/ui/voice-chat-disclosure.vue";

// activePage not passed to Main since Team is no longer in the sidebar nav
// Main defaults to "dashboard" when no matching page is found

const teamTask = {
  title: "Design System",
  progress: 75,
  completedCount: 3,
  totalCount: 4,
  priority: "Urgent",
  status: "In Progress",
  subtasks: [
    { id: "1", title: "Design Tokens", completed: true },
    { id: "2", title: "Color System", completed: true },
    { id: "3", title: "Type System", completed: true },
    { id: "4", title: "Documentation", completed: false },
  ],
  assignees: [
    { name: "Chloe", avatar: "/hero-woman.webp", color: "bg-white" },
    { name: "Anna", avatar: "/hero-client.webp", color: "bg-white" },
    { name: "Ramesh", avatar: "/innovator-man.webp", color: "bg-white" },
  ],
};

const teamMembers = ref<Array<{ id: number; name: string; email: string; role: string; avatar?: string }>>([]);

const showInvitePopup = ref(false);
const showConfirmationPopup = ref(false);
const showEditPopup = ref(false);
const showRemoveConfirmation = ref(false);
const inviteEmail = ref("");
const sentEmail = ref("");
const editMember = ref<{ id: number; name: string; email: string; role: string; avatar?: string }>({
  id: 0,
  name: "",
  email: "",
  role: "Member",
});
const pendingRemoveMember = ref<{ id: number; name: string; email: string; role: string } | null>(null);

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
  // Simulate sending invite — inviter is Owner, invitee is Member
  teamMembers.value.push({
    id: Date.now(),
    name: email.split("@")[0].replace(/[^a-zA-Z]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    email: email,
    role: "Member",
    avatar: undefined,
  });
  showConfirmationPopup.value = true;
  closeInvitePopup();
}

function closeConfirmationPopup() {
  showConfirmationPopup.value = false;
  sentEmail.value = "";
}

function openEditPopup(member: { id: number; name: string; email: string; role: string; avatar?: string }) {
  editMember.value = { ...member };
  showEditPopup.value = true;
}

function closeEditPopup() {
  showEditPopup.value = false;
  editMember.value = { id: 0, name: "", email: "", role: "Member" };
}

function saveEdit() {
  const idx = teamMembers.value.findIndex((m) => m.id === editMember.value.id);
  if (idx !== -1) {
    // Preserve the original role — invitee always stays Member, inviter is Owner
    const original = teamMembers.value[idx];
    teamMembers.value[idx] = {
      ...editMember.value,
      role: original.role,
      avatar: editMember.value.avatar ?? original.avatar,
    };
  }
  closeEditPopup();
}

function handleAvatarUpload(event: Event) {
  const target = event.target as HTMLInputElement | null;
  if (!target || !target.files || !target.files[0]) return;
  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result === "string") {
      editMember.value.avatar = reader.result;
    }
  };
  reader.readAsDataURL(target.files[0]);
}

function removeAvatar() {
  editMember.value.avatar = undefined;
  const input = document.querySelector(".avatarFileInput") as HTMLInputElement | null;
  if (input) input.value = "";
}

function confirmRemoveMember(member: { id: number; name: string; email: string; role: string }) {
  pendingRemoveMember.value = member;
  showRemoveConfirmation.value = true;
}

function cancelRemoveMember() {
  showRemoveConfirmation.value = false;
  pendingRemoveMember.value = null;
}

function removeMember(id: number) {
  teamMembers.value = teamMembers.value.filter((m) => m.id !== id);
  showRemoveConfirmation.value = false;
  pendingRemoveMember.value = null;
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

/* Quick links under the user chip */
.quickNav {
  display: flex;
  align-items: center;
  gap: 4px;
  width: max-content;
  max-width: 100%;
  margin: 0 0 18px auto;
  padding: 6px;
  border: 1px solid var(--color-lightgray-100);
  border-radius: 14px;
  background-color: var(--color-white);
  box-shadow: 0 2px 8px rgba(15, 46, 36, 0.06);
  box-sizing: border-box;
}

.quickNavItem {
  padding: 6px 14px;
  border-radius: 9px;
  font-size: var(--fs-13);
  font-weight: 600;
  color: var(--color-darkslategray-500);
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.18s ease;
}

.quickNavItem:hover {
  background-color: #f4efe6;
}

.quickNavItemActive {
  background-color: #f4efe6;
  color: #013525;
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

.teamListHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 4px;
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

.memberRoleBadge {
  font-size: var(--fs-12);
  font-weight: 700;
  color: var(--color-darkslategray-300);
  padding: 2px 10px;
  border-radius: 20px;
  background-color: var(--color-blanchedalmond);
  text-transform: capitalize;
  margin-left: 6px;
  white-space: nowrap;
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

.memberEditBtn {
  height: 36px;
  padding: 0 14px;
  border-radius: 8px;
  background-color: transparent;
  color: var(--color-darkslategray-500);
  border: 1px solid var(--color-lightgray-200);
  font-size: var(--fs-13);
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.2s;
}

.memberEditBtn:hover {
  background-color: var(--color-blanchedalmond);
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

.removeConfirmBtn {
  height: 44px;
  flex: 1;
  border-radius: 10px;
  background-color: var(--color-saddlebrown);
  color: var(--color-white);
  border: none;
  padding: 0 20px;
  font-size: var(--fs-15);
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.2s;
}

.removeConfirmBtn:hover {
  background-color: #a14f1c;
}

/* Edit Avatar Upload */
.editAvatarSection {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
}

.editAvatarUploadBtn {
  cursor: pointer;
  display: block;
}

.editAvatarUploadBtn:hover .editAvatarWrap {
  border-color: var(--color-darkslategray-500);
  box-shadow: 0 0 0 3px var(--color-blanchedalmond);
}

.editAvatarWrap {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--color-blanchedalmond);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-lightgray-200);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.editAvatarImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.editAvatarPlaceholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-darkslategray-300);
  gap: 4px;
}

.editAvatarPlaceholder svg {
  width: 32px;
  height: 32px;
}

.editAvatarOverlayIcon {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--color-white);
  border: 2px solid var(--color-darkslategray-500);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  color: var(--color-darkslategray-500);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
}

.editAvatarOverlayIcon svg {
  width: 14px;
  height: 14px;
}

.avatarFileInput {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.removeAvatarBtn {
  height: 36px;
  padding: 0 14px;
  border-radius: 8px;
  background-color: transparent;
  color: var(--color-saddlebrown);
  border: 1px solid var(--color-goldenrod-200);
  font-size: var(--fs-13);
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.removeAvatarBtn:hover {
  background-color: var(--color-blanchedalmond);
}

.roleBadgeEdit {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  background-color: var(--color-blanchedalmond);
  color: var(--color-darkslategray-500);
  font-size: var(--fs-13);
  font-weight: 600;
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
  display: block;
  margin: 0 auto 16px;
  width: 64px;
  height: 64px;
  color: var(--color-darkslategray-500);
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


  .cardContainer {
    border-radius: 16px;
  }
}

/* Gaborone theme: white header text only on this preset. */
.isGaborone .dumelaMarion {
  color: #ffffff;
}
.isGaborone .pWrap {
  color: rgba(255, 255, 255, 0.9);
}
.isGaborone .sunday4October {
  color: #ffffff;
}
.isGaborone .marionLucas {
  color: var(--color-darkslategray-500);
}

/* Task widget sits above the floating Chat with agent button. */
  .taskWidgetDock {
    position: fixed;
    right: 28px;
    bottom: 92px;
    z-index: 59;
    width: 440px;
    max-width: calc(100vw - 56px);
    /* Never let the stack climb out of the viewport. */
    max-height: calc(100dvh - 112px);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    gap: 20px;
    /* Height budget the voice panel may use; its user grid scrolls beyond it. */
    --voice-panel-max: calc(100dvh - 132px);
    font-family: var(--font-inter, Inter, Arial, sans-serif);
  }

  /* Both panels share the dock's height and scroll internally, so the stack
     always fits and neither panel becomes unreachable on short windows. */
  .taskWidgetDock > :first-child {
    flex: 0 1000 auto;
    min-height: 0;
  }

  /* Keep the opened task panel tall enough to read before the voice panel gives way. */
  .taskWidgetDock > :first-child[aria-expanded="true"] {
    min-height: 180px;
  }

  .taskWidgetDock > :last-child {
    flex: 0 0 auto;
  }

  @media screen and (min-width: 751px) {
    /* Leave the opened task panel room to stay readable above the voice panel. */
    .taskWidgetDock:has(> :first-child[aria-expanded="true"]) {
      --voice-panel-max: calc(100dvh - 312px);
    }
  }

@media screen and (max-width: 750px) {
  .taskWidgetDock {
    left: 14px;
    right: 14px;
    bottom: 76px;
    width: auto;
    max-width: 440px;
    margin-left: auto;
    gap: 18px;
    max-height: calc(100dvh - 96px);
    --voice-panel-max: calc(100dvh - 96px);
  }

  /* Keep the expanded voice panel clear of the mobile header. */
  .taskWidgetDock:has([aria-label="Close voice chat"]) > :first-child {
    display: none;
  }
}
</style>
