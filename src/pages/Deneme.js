import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Icon, Label, Pagination, Table } from "semantic-ui-react";
import BookService from "../services/bookService";

export default function BookList() {

  let bookService = new BookService();

  const [books, setBooks] = useState([]);

  const [activePage, setActivePage] = useState(0);
  const [pageSize] = useState(0);
  const [totalPageSize, setTotalPageSize] = useState(0);

  useEffect(() => {
    bookService
      .getPagebleBook(activePage, pageSize)
      .then((result) => {
        setBooks(result.data.data);
        setTotalPageSize(parseInt(result.data.message));
      });

  }, []);
  
  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);
  };

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

  const handleDeleteOne = (id) => {
    bookService.getByBookId(id).then((result) => console.log(result))
  }

  return (
    <Container className="main">
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
                <Label id={book.id}  onClick={() => handleDeleteOne(books.id)}  color="red" ribbon>Sil</Label>
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
                floated="left"
                icon
                labelPosition="left"
                primary
                size="small"
                as={NavLink}
                to="/book/add"
              >
                <Icon name="book" /> Kitap Ekle
              </Button>
              <Button onClick={() => handleDeleteAll()} size="small">
                <Icon name="delete"/> Hepsini Sil
              </Button>
              <Dropdown
              placeholder="Seçiniz"
              selection
              options={[
                { key: 1, text: "10", value: 10 },
                { key: 2, text: "20", value: 20 },
                { key: 3, text: "50", value: 50 },
              ]}
              onChange={handlePaginationChange}
              value={pageSize}
            />
              <Pagination
               firstItem={null}
                    lastItem={null}
                    activePage={activePage}
                    onPageChange={handlePaginationChange}
                    totalPages={Math.ceil(totalPageSize / pageSize)}
                floated="right"
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Container>
  );
}
