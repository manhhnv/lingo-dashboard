import axios, { AxiosResponse } from "axios";
import { BaseUrl } from "../baseUrl";
import { SearchWord } from "../../types/Words";

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

export { searchMultipleWords };
