import axios from "axios";

export default class BookService {
  getBooks() {
    return axios.get(
        "http://localhost:8080/api/books/getAll");
  }

  getByBookId(bookId) {
    return axios.get(
        "http://localhost:8080/api/books/findById?id=" + bookId);
  }

  addBook(book) {
    return axios.post(
        "http://localhost:8080/api/books/add", book);
  }

  deleteAllBook() {
    return axios.delete(
        "http://localhost:8080/api/books/deleteAll");
  }

  deleteBook(bookId) {
    return axios.delete(
      "http://localhost:8080/api/books/deleteById?id=" + bookId
    );
  }

  updateBook(book) {
    return axios.post(
        "http://localhost:8080/api/books/updateBook", book);
  }

  getPagebleBook(pageNo ,pageSize ){
    return axios.post(`http://localhost:8080/api/books/pageAll?pageNo=${pageNo}&pageSize=${pageSize}`)
  }
}
