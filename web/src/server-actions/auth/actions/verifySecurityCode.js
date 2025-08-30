"use server";
export default async function verifySecurityCode(formData) {
  console.log(formData);
  const securityCode = formData.get("code");
  const errors = {};
  console.log(securityCode);
}
