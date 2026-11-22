import { ref, watch } from "vue";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

const STORAGE_KEY = "ceda.team-members";

function loadTeamMembers(): TeamMember[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (m): m is TeamMember =>
        m && typeof m.id === "string" && typeof m.name === "string",
    );
  } catch {
    return [];
  }
}

/* One list for the whole app: a member invited on Team & roles is the same
   member that can be assigned to an application. */
const teamMembers = ref<TeamMember[]>(loadTeamMembers());
let persisted = false;

if (!persisted) {
  persisted = true;
  watch(
    teamMembers,
    (value) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      } catch {
        /* storage full or unavailable — keep the in-memory list */
      }
    },
    { deep: true },
  );
}

export function useTeamMembers() {
  return {
    teamMembers,
    addMember(member: Omit<TeamMember, "id">) {
      const created: TeamMember = { ...member, id: `tm-${Date.now()}` };
      teamMembers.value.push(created);
      return created;
    },
    updateMember(id: string, changes: Partial<Omit<TeamMember, "id">>) {
      const index = teamMembers.value.findIndex((m) => m.id === id);
      if (index === -1) return;
      teamMembers.value[index] = { ...teamMembers.value[index], ...changes };
    },
    removeMember(id: string) {
      teamMembers.value = teamMembers.value.filter((m) => m.id !== id);
    },
  };
}
