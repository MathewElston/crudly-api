"use client";
import FileUpload from "@/components/FileUpload";
import HoverCard from "@/components/HoverCard";
import ScrollText from "@/components/ScrollText";
import theme from "@/lib/styles/theme";
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

  // Prebuilt State and Date
  const [dbSelect, setDbSelect] = useState(null);
  const handleSelect = (id) => {
    setDbSelect((prev) => (prev === id ? null : id));
  };

  const prebuildTest = [
    {
      id: 1,
      title: "Jurassic Database",
      description:
        "A detailed database about dinosaurs, fossils, and prehistoric life.",
    },
    {
      id: 2,
      title: "Space Exploration",
      description:
        "Information on spacecrafts, missions, astronauts, and planets.",
    },
    {
      id: 3,
      title: "Classic Literature Library",
      description:
        "A collection of classic novels, authors, and literary analysis.",
    },
  ];

  // Custom Upload State and Data
  const schemaTextTest = `schemas:
  # List All Table Schemas
  TableRecord:
    type: object
    properties:
      id:
        type: integer
        example: 4
      prop2:
        type: string
        example: Hello world
      prop3:
        type: number
        example: 3.14
x-ProjectName: name
x-ForeignKeys:
  - fromTable: Orders
    fromField: userId
    toTable: Users
    toField: id`;

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
    <Stack sx={{ backgroundColor: "", minHeight: "100vh", p: 4 }}>
      <Typography variant="h2">Create API </Typography>
      <Typography sx={{ p: 4 }}>Select a Database type</Typography>
      <Stack sx={{ width: "50%" }} spacing={4} direction={"row"}>
        <HoverCard
          name="Premade Card"
          onClick={() => setApiSelect(1)}
          sx={{
            ...cardConfig,
            border:
              apiSelect === 1
                ? `2px solid ${theme.palette.tertiary.dark}`
                : "none",
            cursor: "pointer",
          }}
        >
          <Typography sx={{}}>Premade</Typography>
        </HoverCard>
        <HoverCard
          name="Custom Card"
          sx={{
            ...cardConfig,
            border:
              apiSelect === 2
                ? `2px solid ${theme.palette.tertiary.dark}`
                : "none",
            cursor: "pointer",
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
        {apiSelect === 1 && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th
                  style={{
                    borderBottom: "1px solid gray",
                    textAlign: "left",
                    padding: "8px",
                  }}
                >
                  Database Theme
                </th>
                <th
                  style={{
                    borderBottom: "1px solid gray",
                    textAlign: "left",
                    padding: "8px",
                  }}
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {prebuildTest.map((db) => (
                <tr key={db.id}>
                  <td style={{ padding: "8px" }}>{db.title}</td>
                  <td style={{ padding: "8px" }}>{db.description}</td>
                  <td>
                    {" "}
                    <Button
                      onClick={() => handleSelect(db.id)}
                      sx={{ p: "5px" }}
                      variant="contained"
                      disabled={dbSelect !== null && dbSelect !== db.id}
                    >
                      {dbSelect === db.id ? "Deselect" : "Select"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {apiSelect === 2 && (
          <Stack spacing={3} sx={{ p: 4, width: "100%" }}>
            <Typography variant="h4" component="h2" sx={{ textAlign: "left" }}>
              Upload Custom Schema
            </Typography>

            <Stack spacing={10} direction={"row"}>
              <Typography
                variant="body2"
                sx={{ maxWidth: "100%", textAlign: "left" }}
              >
                1. Copy the contents of the YAML file and replace with your
                specific schema and tables.
                <br />
                <br />
                2. Place the modified contents into your own YAML file, select
                the file, and click Create API.
              </Typography>

              <Box spacing={2} sx={{ width: "100%", maxWidth: "100%" }}>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ textAlign: "left" }}
                >
                  Schema Template
                </Typography>
                <ScrollText text={schemaTextTest} />
              </Box>
            </Stack>
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
