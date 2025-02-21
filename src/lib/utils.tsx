import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";

type ExcelRow = (string | number | boolean | null)[];

export const processTextIntoLines = (text: string): string => {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n");
};

export const processExcelWorkbook = (workbook: XLSX.WorkBook): string => {
  const sheets = workbook.SheetNames.map((name) => {
    const sheet = workbook.Sheets[name];
    const data = XLSX.utils.sheet_to_json<ExcelRow>(sheet, { header: 1 });

    return data
      .filter((row: ExcelRow) =>
        row.some((cell) => cell !== null && cell !== undefined && cell !== "")
      )
      .map((row: ExcelRow) =>
        row
          .filter((cell) => cell !== null && cell !== undefined && cell !== "")
          .join("\t")
      )
      .join("\n");
  });

  return sheets.join("\n\n");
};

export const getHighlightedText = (text: string, keyword: string) => {
  if (!keyword.trim()) return text;
  const regex = new RegExp(`(${keyword})`, "gi");
  return text.split(regex).map((part, i) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <mark key={i} className="bg-yellow-300">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

export const FILE_TYPES = {
  PDF: "application/pdf",
  DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  DOC: "application/msword",
  XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  XLS: "application/vnd.ms-excel",
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
