"use client";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { parseAppSegmentConfig } from "next/dist/build/segment-config/app/app-segment-config";
import { useRouter, useSearchParams } from "next/navigation";
export default function ProjectDropdown({ projects }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentName = searchParams.get("projectName") || "";
  return (
    <FormControl fullWidth>
      <InputLabel>{"Select a Project"}</InputLabel>
      <Select
        value={currentName}
        onChange={(e) => {
          const params = new URLSearchParams(searchParams);
          params.set("projectName", e.target.value);
          router.push(`?${params.toString()}`);
        }}
      >
        {projects.map((project) => (
          <MenuItem key={project.id} value={project.project_name}>
            {project.project_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
