import crypto from "crypto";

export function createSecurityCode() {
  const min = 100000;
  const max = 999999;
  return crypto.randomInt(min, max);
}
