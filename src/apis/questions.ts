import axios from "axios";
import { SentenceQuestion, WordQuestion } from "../types/Question";
import { SentenceInLesson } from "../types/Sentence";
import { WordInLesson } from "../types/Word";
import { BaseUrl } from "./baseUrl";
import { QuestionTypeCode } from "../enum";

export type QuestionsLevelInput = {
  token: string;
  bookId: string;
  unitId: string;
  levelIndex: number;
};

export type QuestionLevelOutput = {
  listQuestions: (WordQuestion | SentenceQuestion)[];
  sentencesInLesson: SentenceInLesson[];
  wordsInLesson: WordInLesson[];
};

export const getQuestionsInLevel = async (input: QuestionsLevelInput) => {
  try {
    const { bookId, unitId, levelIndex, token } = input;
    const res = await axios.get(
      `${BaseUrl}/api/admin/question/${bookId}/${unitId}/${levelIndex}/questions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res && res.data && res.status === 200) {
      const data: QuestionLevelOutput = res.data;
      return data;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export type ChangeQuestionChoice = {
  bookId: string;
  unitId: string;
  levelIndex: number;
  questionId: string;
  choiceId: string;
};

export type AddQuestionChoice = {
  bookId: string;
  unitId: string;
  levelIndex: number;
  questionId: string;
  content: string;
  focusId: string;
  code: QuestionTypeCode;
};

export type AddChoiceDto = {
  bookId: string;
  unitId: string;
  levelIndex: number;
  questionId: string;
  content?: string;
  focusId: string;
  code: QuestionTypeCode;
  meaning?: string;
  choiceId: string;
};

export const toggleChoice = async (
  token: string,
  input: ChangeQuestionChoice
) => {
  try {
    const { bookId, unitId, levelIndex, questionId, choiceId } = input;
    const res = await axios.put(
      `${BaseUrl}/api/admin/question/${bookId}/${unitId}/${levelIndex}/toggleChoice`,
      {
        questionId: questionId,
        choiceId: choiceId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addChoiceToQuestion = async (
  token: string,
  input: AddChoiceDto
) => {
  try {
    const {
      bookId,
      choiceId,
      code,
      focusId,
      levelIndex,
      questionId,
      unitId,
      content,
      meaning,
    } = input;

    const response = await axios.put(
      `${BaseUrl}/api/admin/question/${bookId}/${unitId}/${levelIndex}/addChoice`,
      {
        questionId: questionId,
        focusId: focusId,
        code: code,
        choiceId: choiceId,
        content: content,
        meaning: meaning,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return {
        success: true,
        status: 200,
      };
    } else {
      return {
        success: false,
        status: 400,
      };
    }
  } catch (error) {
    throw error;
  }
};
