"use client";
import { useState } from "react";
import styles from "./page.module.css";
import FileEnforcer from "../lib/enforcer/FileEnforcer.js";

const fileEnforcer = new FileEnforcer({
  allowedContentTypes: ["application/yaml"],
  allowedExtensionTypes: ["yaml", "yml"],
  maxFileSize: 255 * 1024 * 1024,
});

export default function Home() {
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    setError(null);
    const file = e.target.files[0];
    console.log(file.type);
    if (!file) return;

    try {
      fileEnforcer.enforce(file);
      alert("File is valid!");
    } catch (error) {
      setError(error.message || "File Validaton Failed");
    }
  };
  return (
    <div className={styles.page}>
      <div>
        <input
          type="file"
          id="my file"
          accept=".yml,.yaml"
          onChange={handleFileChange}
        />
        <button>Upload</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
