import { QuestionTypeCode } from "../../enum";

export type SearchWord = {
  _id: string;
  content: string;
  meaning: string;
  imageRoot: string;
};

export type AddNewWordInput = {
  bookId: string;
  unitId: string;
  levelIndex: number;
  questionId: string;
  focusId: string;
  code: QuestionTypeCode;
  content: string;
  meaning?: string;
  pronunciation?: string;
}
