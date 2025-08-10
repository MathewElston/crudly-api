"use client";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
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
          const params = new URLSearchParams(searchParams.toString());
          params.set("projectName", e.target.value);
          console.log(params);
          router.push(`?${params}`);
        }}
      >
        {projects.map((project) => (
          <MenuItem key={project.id} value={project.projectName}>
            {project.projectName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
