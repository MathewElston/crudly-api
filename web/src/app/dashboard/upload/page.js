"use client";
import FileUpload from "@/components/FileUpload";
import { useState } from "react";
import { uploadYAML } from "@/server/uploadYAML";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileContent, setFileContent] = useState(null);

  const handleUpload = async (content) => {
    try {
      setError(null);
      setUploading(true);
      await uploadYAML(content);
    } catch (error) {
      setError("Failed to upload YAML file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <FileUpload
        fileTypes={["yaml", "yml"]}
        onUpload={handleUpload}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        error={error}
        setError={setError}
        uploading={uploading}
        setUploading={setUploading}
        fileContent={fileContent}
        setFileContent={setFileContent}
      />
    </div>
  );
}
