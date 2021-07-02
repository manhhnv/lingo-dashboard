import { getBooksByGrade } from "../apis/book";

const useBooks = (grade: number, token?: string,) => {
    if (token) {
        const data = getBooksByGrade(token, grade);
        return {
            books: data
        }
    }
    return {
        books: []
    }
}

export default useBooks;