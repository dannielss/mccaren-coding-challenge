export interface FilesData {
  name: string;
  text: string;
  type: string;
}

export type ProcessFileResponse =
  | {
      text: string;
      metadata: {
        lineCount: number;
        hasContent: boolean;
      };
    }
  | {
      message: string;
    };
