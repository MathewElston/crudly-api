function stripProperty(obj, property) {
  if (Array.isArray(obj))
    return obj.map((item) => stripProperty(item, property));
  if (obj && typeof obj === "object") {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      if (key === property) continue;
      result[key] = stripProperty(value, property);
    }
    return result;
  }
  return obj;
}

export default stripProperty;
