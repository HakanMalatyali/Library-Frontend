import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Container, Divider } from "semantic-ui-react";
import { Card } from "semantic-ui-react";
import UpdateBookWithPopup from "./popups/UpdateBookWithPopup";
import BookService from "../services/bookService";
import { toast } from "react-toastify";

export default function BookDetail() {

  let { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const [book, setBook] = useState({});

  let bookService = new BookService();

  const history = useHistory()

  useEffect(() => {
    bookService.getByBookId(id).then((result) => setBook(result.data.data));
  }, []);

  const handleDeleteBook = () => {
    bookService.deleteBook(id).then((result) => console.log(result));
    toast(book.bookName + " sistemden çıkarılmıştır.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log("Başarılı");
    history.push("/");
    window.location.reload(false);
    
  }





  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    
      <Container className="main">
        <Card.Group>
          <Card fluid raised>
            <Card.Content>
              <Card.Header
                style={{
                  fontSize: "3em",
                  fontStyle: "oblique",
                  fontFamily: "Cursive",
                  color: "teal",
                }}
              >
                {book.bookName}
              </Card.Header>
              
              <Card.Description style={{ fontSize: "1.3em" }}>
                {book.author}
              </Card.Description>
              <Divider />
              <Card.Description style={{ fontSize: "1em" }}>
                {book.category?.categoryName}
              </Card.Description>
              <Card.Meta style={{ fontSize: "1em", fontFamily: "Cursive" }}>
                {book.releaseDate}
              </Card.Meta>
            </Card.Content>
            <Card.Content>
                <input 
                  className="buttonAdd"
                  defaultValue="Güncelle"
                  onClick={togglePopup}
                />
                {isOpen && <UpdateBookWithPopup handleClose={togglePopup} />}
                <input 
                  className="buttonDelete"
                  defaultValue="Sil"
                  onClick={handleDeleteBook}
                />
              
            </Card.Content>
          </Card>
        </Card.Group>
      </Container>
    
  );
}
