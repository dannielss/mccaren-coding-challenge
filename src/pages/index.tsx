import { FileUploader } from "@/components";
import { FilesData } from "@/lib/types";
import { useState, useMemo, useEffect } from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import debounce from "lodash.debounce";
import { getHighlightedText } from "@/lib/utils";
import { Switch } from "@/components/switch";

interface FileWithLines extends FilesData {
  lines: string[];
  matches?: number;
}

export default function Home() {
  const [filesData, setFilesData] = useState<FileWithLines[]>([]);
  const [keyword, setKeyword] = useState("");
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    setTheme(storedTheme || "light");
  }, []);

  useEffect(() => {
    console.log("theme", theme);
    if (theme) {
      const htmlElement = document.querySelector("html");
      if (theme === "dark") {
        htmlElement?.classList.add("dark");
      } else {
        htmlElement?.classList.remove("dark");
      }
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleDarkMode = () => {
    console.log("clicked");
    if (theme) {
      setTheme((theme) => (theme === "light" ? "dark" : "light"));
      localStorage.setItem("theme", theme === "light" ? "light" : "dark");
    }
  };

  const handleUpload = (uploadedFiles: FilesData[]) => {
    const filesWithLines = uploadedFiles.map((file) => ({
      ...file,
      lines: file.text.split("\n").filter((line) => line.trim()),
    }));
    setFilesData((prev) => [...prev, ...filesWithLines]);
  };

  // Updated filtering to only filter at file level
  const filteredFiles = useMemo(() => {
    if (!keyword.trim()) return filesData;

    return filesData
      .map((file) => ({
        ...file,
        matches: file.lines.reduce(
          (count, line) =>
            count + (line.match(new RegExp(keyword, "gi")) || []).length,
          0
        ),
      }))
      .filter((file) => file.matches > 0)
      .sort((a, b) => b.matches - a.matches);
  }, [filesData, keyword]);

  const debouncedSetKeyword = useMemo(() => debounce(setKeyword, 300), []);

  const getFileCardSize = useMemo(
    () => (index: number) => {
      const file = filteredFiles[index];
      if (!file) return 400;

      const baseHeight = 80;
      const contentHeight = Math.min(
        400,
        file.lines.reduce((total, line) => {
          const lineLength = line.length;
          const lineHeight = Math.ceil(lineLength / 80) * 24;
          return total + lineHeight;
        }, 0)
      );

      return baseHeight + contentHeight + 20;
    },
    [filteredFiles]
  );

  const getLineSize = useMemo(
    () => (line: string) => {
      const lineLength = line.length;
      return Math.ceil(lineLength / 80) * 24;
    },
    []
  );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Mccaren coding challenge
        </h1>
        <div className="flex gap-2 items-center mb-2">
          <Switch checked={theme === "dark"} onCheckedChange={toggleDarkMode} />
          <label className="font-md font-medium dark:text-white">
            Dark mode
          </label>
        </div>
      </div>

      <FileUploader onUpload={handleUpload} />

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Search in documents"
          defaultValue={keyword}
          onChange={(e) => debouncedSetKeyword(e.target.value)}
          className="w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#2f2f2f] dark:text-white dark:placeholder:text-white"
        />
        {keyword.trim() && (
          <div className="text-sm text-gray-600 dark:text-white">
            Showing {filteredFiles.length} of {filesData.length} documents with
            matches
          </div>
        )}
      </div>

      {keyword.trim() && filteredFiles.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-white">
          No documents match your search
        </div>
      )}

      <div className="h-[600px] w-full flex">
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={filteredFiles.length}
              itemSize={getFileCardSize}
              width={width}
              className="scrollbar"
            >
              {({ index, style }) => {
                const file = filteredFiles[index];
                return (
                  <div
                    key={index}
                    style={{
                      ...style,
                    }}
                    className="p-4 rounded-lg bg-white flex flex-col dark:bg-[#2f2f2f] shadow-lg "
                  >
                    <h3 className="font-medium text-gray-900 mb-4 dark:text-white">
                      {file.name}
                    </h3>
                    <div className="flex-grow overflow-auto scrollbar p-2">
                      <AutoSizer>
                        {({ height, width }) => (
                          <List
                            height={height}
                            itemCount={file.lines.length}
                            itemSize={(index) => getLineSize(file.lines[index])}
                            width={width}
                            className="scrollbar"
                          >
                            {({ index: lineIndex, style }) => (
                              <div
                                style={style}
                                className="text-sm text-gray-800 whitespace-pre-wrap break-words dark:text-white"
                              >
                                {getHighlightedText(
                                  file.lines[lineIndex],
                                  keyword
                                )}
                              </div>
                            )}
                          </List>
                        )}
                      </AutoSizer>
                    </div>
                  </div>
                );
              }}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
}
