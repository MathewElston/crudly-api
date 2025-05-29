"use client";
import { Button, Typography, Stack, colors } from "@mui/material";
import { useState } from "react";
import FileEnforcer from "../lib/enforcer/FileEnforcer";
export default function FileUpload({ fileTypes, onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);

  const fileEnforcer = new FileEnforcer({
    allowedContentTypes: ["application/yaml"],
    allowedExtensionTypes: fileTypes,
    maxFileSize: 255 * 1024 * 1024,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setError(null);
    try {
      fileEnforcer.enforce(file);
      setSelectedFile(file);
      setUploadResult(null);
    } catch (err) {
      setError(err.message);
      setSelectedFile(null);
    }
    if (!error) {
      setSelectedFile(file);
      setUploadResult(null);
    }
  };
  return (
    <Stack spacing={2} sx={{ width: "fit-content", padding: 2 }}>
      <Stack spacing={2} direction={"row"}>
        <Button variant="contained" component="label">
          Select File
          <input
            type="file"
            accept={fileTypes}
            hidden
            onChange={handleFileChange}
          />
        </Button>
        {selectedFile && (
          <Typography> File Name: {selectedFile.name}</Typography>
        )}
      </Stack>
      <Button
        disabled={!selectedFile}
        onClick={() => onUpload(selectedFile)}
        variant="contained"
        color="primary"
      >
        Upload
      </Button>
      {error && <Typography color={"error"}>{error}</Typography>}
    </Stack>
  );
}
