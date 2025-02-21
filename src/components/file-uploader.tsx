import { FilesData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";

interface FileUploaderProps {
  onUpload: (filesData: FilesData[]) => void;
}

export default function FileUploader({ onUpload }: FileUploaderProps) {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFiles = async (selectedFiles: FileList) => {
    if (!selectedFiles.length) return;
    setError("");

    setLoading(true);
    try {
      const uploadedFiles = await Promise.all(
        Array.from(selectedFiles).map(async (file) => {
          const response = await fetch("/api/process-file", {
            method: "POST",
            body: file,
            headers: { "Content-Type": file.type },
          });

          const data = await response.json();

          if (data.message) {
            setError(data.message);
          }

          return {
            name: file.name,
            text: data.text || "No text extracted.",
            type: file.type,
          };
        })
      );

      onUpload(uploadedFiles);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    handleFiles(event.target.files);
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg text-center ">
      <div
        className={cn(
          `p-10 h-full transition dark:bg-[#2f2f2f] bg-gray-50 flex flex-col justify-center items-center`,
          {
            "bg-blue-100 dark:bg-blue-500": dragging,
          }
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {loading ? (
          <div className="space-y-2">
            <p className="text-gray-500 mt-2">
              <Loader2Icon className="animate-spin" />
            </p>
          </div>
        ) : (
          <>
            <p className="text-gray-500 dark:text-white p-0 m-0">
              Drag & drop files here or click to upload
            </p>
            <input
              type="file"
              accept=".pdf,.doc,.docx.xlsx"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="fileUpload"
            />
            <label
              htmlFor="fileUpload"
              className="cursor-pointer mt-3 inline-block px-4 py-2 text-white bg-blue-500 rounded-md hover:opacity-90 dark:bg-[rgba(50,50,50,.85)] "
            >
              Browse Files
            </label>
          </>
        )}

        {error && (
          <div className="text-red-500 mt-2">
            Failed to process file: {error}
          </div>
        )}
      </div>
    </div>
  );
}
