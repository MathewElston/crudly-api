"use client";
import FileUpload from "@/components/FileUpload";
import HoverCard from "@/components/HoverCard";
import { Box, Stack, Typography, Button } from "@mui/material";
import { useState } from "react";

export default function CreateApiPage() {
  const cardConfig = {
    width: "50%",
    height: 250,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const [apiSelect, setApiSelect] = useState(null);

  // Custom Upload State
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
    <Stack sx={{ backgroundColor: "#121212", minHeight: "100vh", p: 4 }}>
      <Typography sx={{ p: 4 }}>Select a Database type</Typography>
      <Stack sx={{ width: "50%" }} spacing={4} direction={"row"}>
        <HoverCard
          name="Premade Card"
          onClick={() => setApiSelect(1)}
          sx={{
            ...cardConfig,
          }}
        >
          <Typography sx={{}}>Premade</Typography>
        </HoverCard>
        <HoverCard
          name="Custom Card"
          sx={{
            ...cardConfig,
          }}
          onClick={() => setApiSelect(2)}
        >
          <Typography sx={{}}>Custom</Typography>
        </HoverCard>
      </Stack>
      <Stack
        spacing={4}
        sx={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {apiSelect === 1 && <p>Generate Premade section</p>}
        {apiSelect === 2 && (
          <Stack spacing={2} sx={{ p: 2 }} align="center">
            <Typography variant="h4" component={"h1"}>
              {" "}
              Upload Custom Schema{" "}
            </Typography>
            <Typography variant="body2" align="left">
              {" "}
              1. Copy the contents of the YAML file and replace with your
              specific schmea and tables.
              <br />
              2. Place the modified contents into your own YAML file, select the
              file, and click Create API.
            </Typography>
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
          </Stack>
        )}
        {apiSelect && <Button variant="contained">Create API </Button>}
      </Stack>
    </Stack>
  );
}
