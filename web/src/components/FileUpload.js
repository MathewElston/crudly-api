"use client";
import { Button, Typography, Stack } from "@mui/material";
import FileEnforcer from "../lib/enforcer/FileEnforcer";
import { useState } from "react";
import { parseYAML } from "@/lib/project/parseYAML";

export default function FileUpload({ projectId }) {
  const fileTypes = ["yaml", "yml"];

  const fileEnforcer = new FileEnforcer({
    allowedContentTypes: ["application/yaml"],
    allowedExtensionTypes: fileTypes,
    maxFileSize: 255 * 1024 * 1024,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [success, setSuccess] = useState(null);

  const combinedArray = fileTypes.join(",");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setError(null);
    try {
      setUploading(true);
      fileEnforcer.enforce(file);
      setSelectedFile(file);
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        const content = e.target.result;
        setFileContent(content);
        setUploading(false);
      };
      setError(null);
    } catch (err) {
      setError(err.message);
      setSelectedFile(null);
      setUploading(false);
    }
  };

  const handleUpload = async () => {
    try {
      setError(null);
      setUploading(true);
      await parseYAML(fileContent, projectId);
      setSuccess("Upload Succesful!");
    } catch (error) {
      setError(`Failed to upload YAML file: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Stack spacing={2} sx={{ width: "fit-content", padding: 2 }}>
      <Stack spacing={2} direction={"row"} align="center">
        <Button variant="contained" component="label">
          Select File
          <input
            type="file"
            accept={combinedArray}
            hidden
            onChange={handleFileChange}
            onClick={() => setError(null)}
          />
        </Button>
        {!!selectedFile?.name && (
          <Typography> File Name: {selectedFile.name}</Typography>
        )}

        <Button
          disabled={!selectedFile || uploading}
          onClick={() => fileContent && handleUpload()}
          variant="contained"
          color="primary"
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button>
        {success && <Typography color="success">{success}</Typography>}
      </Stack>
      {error && <Typography color={"error"}>{error}</Typography>}
    </Stack>
  );
}
