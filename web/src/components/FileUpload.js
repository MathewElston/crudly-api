/*
To do:
- Move state out of upload component -D
- Move state into UploadPage  - D
- Create ServerAction
*/
"use client";
import { Button, Typography, Stack, colors } from "@mui/material";
import FileEnforcer from "../lib/enforcer/FileEnforcer";

export default function FileUpload({
  fileTypes = [],
  onUpload,
  selectedFile,
  setSelectedFile,
  error,
  setError,
  uploading,
  setUploading,
  fileContent,
  setFileContent,
}) {
  const fileEnforcer = new FileEnforcer({
    allowedContentTypes: ["application/yaml"],
    allowedExtensionTypes: fileTypes,
    maxFileSize: 255 * 1024 * 1024,
  });

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
    } catch (err) {
      setError(err.message);
      setSelectedFile(null);
      setUploading(false);
    }
  };
  return (
    <Stack spacing={2} sx={{ width: "fit-content", padding: 2 }}>
      <Stack spacing={2} direction={"row"}>
        <Button variant="contained" component="label">
          Select File
          <input
            type="file"
            accept={combinedArray}
            hidden
            onChange={handleFileChange}
          />
        </Button>
        {selectedFile?.name && (
          <Typography> File Name: {selectedFile.name}</Typography>
        )}
      </Stack>
      <Button
        disabled={!selectedFile || uploading}
        onClick={() => fileContent && onUpload(fileContent)}
        variant="contained"
        color="primary"
      >
        {uploading ? "Uploading..." : "Upload"}
      </Button>
      {error && <Typography color={"error"}>{error}</Typography>}
    </Stack>
  );
}
