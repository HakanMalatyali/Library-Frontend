import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, NavLink } from "react-router-dom";
import { Button, Checkbox, Icon, Label, Table } from "semantic-ui-react";
import BookService from "../services/bookService";

export default function BookList() {
  let bookService = new BookService();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    bookService.getBooks().then((result) => setBooks(result.data.data));
  }, []);

  const handleDeleteAll = () => {
    bookService.deleteAllBook().then((result) => console.log("Hepsi Silindi"));
    toast("Tüm kitaplar silindi.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    window.location.reload(true);
  };

  // const handleDeleteOne = (id) => {
  //   bookService.getByBookId(id).then((result) => console.log(result));
  // };

  return (
    <div>
      <h1  style={{textAlign : "left", fontStyle: "oblique", fontFamily: "Cursive", color:"teal"}}> Kitap Listesi</h1>
      <Table celled compact definition>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Kitap Adı</Table.HeaderCell>
            <Table.HeaderCell>Yazar</Table.HeaderCell>
            <Table.HeaderCell>Yayım Tarihi</Table.HeaderCell>
            <Table.HeaderCell>Tür</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {books.map((book) => (
            <Table.Row key={book.id}>
              <Table.Cell collapsing>
              <Checkbox  toggle />
                {/* <Label
                  id={book.id}
                  onClick={() => handleDeleteOne(books.id)}
                  color="red"
                  ribbon
                >
                  Sil
                </Label> */}
              </Table.Cell>
              <Table.Cell>
                <Link to={`/book/${book.id}`}>{book.bookName}</Link>
              </Table.Cell>
              <Table.Cell>{book.author}</Table.Cell>
              <Table.Cell>{book.releaseDate}</Table.Cell>
              <Table.Cell>{book.category.categoryName}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan="4">
              <Button
                floated="right"
                icon
                labelPosition="left"
                primary
                size="small"
                as={NavLink}
                to="/book/add"
              >
                <Icon name="book" /> Kitap Ekle
              </Button>
              <Button negative onClick={() => handleDeleteAll()} size="small">
                <Icon name="delete" /> Hepsini Sil
              </Button>
              <Button disabled negative onClick={() => handleDeleteAll()} size="small">
                <Icon name="delete" />Sil
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
}
