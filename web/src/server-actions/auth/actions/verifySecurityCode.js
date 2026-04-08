"use server";
export default async function verifySecurityCode(formData) {
  console.log(formData);
  const securityCode = formData.code;
  const errors = {};
  console.log(securityCode);

  return false;
}
