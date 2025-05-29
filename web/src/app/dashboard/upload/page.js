"use client";
import FileUpload from "@/components/FileUpload";
export default function Upload() {
  const handleUpload = () => console.log(handled);
  return (
    <div>
      <FileUpload filetype={["yaml", "yml"]} onUpload={handleUpload} />
    </div>
  );
}
