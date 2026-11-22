/**
 * Password policy for the portal.
 *
 * Mirrors the rules enforced on the profile page (ProfileView.vue):
 * at least 8 characters, one uppercase letter, one number and one special
 * character. Kept in one place so account creation and password reset cannot
 * drift apart and let a weaker password through.
 */
export const PASSWORD_MIN_LENGTH = 8;

const UPPERCASE = /[A-Z]/;
const NUMBER = /[0-9]/;
const SPECIAL = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

export interface PasswordChecks {
  minLength: boolean;
  upper: boolean;
  number: boolean;
  special: boolean;
  /** True only when every rule passes. */
  valid: boolean;
}

export function passwordChecks(value: string): PasswordChecks {
  const minLength = value.length >= PASSWORD_MIN_LENGTH;
  const upper = UPPERCASE.test(value);
  const number = NUMBER.test(value);
  const special = SPECIAL.test(value);

  return {
    minLength,
    upper,
    number,
    special,
    valid: minLength && upper && number && special,
  };
}

/** Message shown when the password does not satisfy the policy. */
export const PASSWORD_REQUIREMENT_MESSAGE =
  "Use at least 8 characters with an uppercase letter, a number and a special character.";
