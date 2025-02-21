import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import WordExtractor from "word-extractor";
import { NextApiRequest, NextApiResponse } from "next";
import { ProcessFileResponse } from "@/lib/types";
import {
  FILE_TYPES,
  processExcelWorkbook,
  processTextIntoLines,
} from "@/lib/utils";
import * as XLSX from "xlsx";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProcessFileResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Read the file as a buffer
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const fileBuffer = Buffer.concat(chunks);
    const contentType = req.headers["content-type"];

    let extractedText = "";

    switch (contentType) {
      case FILE_TYPES.PDF:
        const pdfData = await pdfParse(fileBuffer);
        extractedText = processTextIntoLines(pdfData.text);
        break;

      case FILE_TYPES.DOCX:
        const docxData = await mammoth.extractRawText({ buffer: fileBuffer });
        extractedText = processTextIntoLines(docxData.value);
        break;

      case FILE_TYPES.DOC:
        const extractor = new WordExtractor();
        const doc = await extractor.extract(fileBuffer);
        extractedText = processTextIntoLines(doc.getBody());
        break;

      case FILE_TYPES.XLSX:
      case FILE_TYPES.XLS:
        const workbook = XLSX.read(fileBuffer, { type: "buffer" });
        extractedText = processTextIntoLines(processExcelWorkbook(workbook));
        break;

      default:
        return res.status(400).json({ message: "Unsupported file type" });
    }

    // Add metadata about the processed text
    const lineCount = extractedText.split("\n").length;

    return res.status(200).json({
      text: extractedText,
      metadata: {
        lineCount,
        hasContent: extractedText.length > 0,
      },
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
