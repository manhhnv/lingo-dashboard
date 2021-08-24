import axios, { AxiosResponse } from "axios";
import { BaseUrl } from "../baseUrl";
import { SearchWord, AddNewWordInput } from "../../types/Words";

const searchMultipleWords = async (
  token: string,
  content: string
): Promise<SearchWord[]> => {
  try {
    const response: AxiosResponse<SearchWord[]> = await axios.get(
      `${BaseUrl}/api/words/search`,
      {
        params: {
          content: content,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data) {
      return response.data;
    }
    return [];
  } catch (error) {
    throw error;
  }
};

const addNewWord = async(token: string, input: AddNewWordInput) => {
  try {
    const response = await axios.put(
      `${BaseUrl}/api/admin/question/${input.bookId}/${input.unitId}/${input.levelIndex}/addNewWord`,
      {
        questionId: input.questionId,
        focusId: input.focusId,
        code: input.code,
        content: input.content,
        meaning: input.meaning,
        pronunciation: input.pronunciation,
      },
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    )
    if (response?.status === 200 && response?.data) {
      return {
        success: true,
        data: response.data,
      }
    }
    else {
      return {
        success: false,
        data: null,
      }
    }
  } catch (error) {
    throw error;
  }
}

export { searchMultipleWords, addNewWord };
