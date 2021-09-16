import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Button,
  Form,
  Segment,
  Label,
  Input,
  Divider,
} from "semantic-ui-react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import BookService from "../../services/bookService";

const UpdateBookWithPopup = (props) => {
  let { id } = useParams();

  const [book, setBook] = useState({});

  useEffect(() => {
    let bookService = new BookService();
    bookService.getByBookId(id).then((result) => setBook(result.data.data));
  }, []);

  const schema = Yup.object({
    bookName: Yup.string().required("Ürün adı zorunludur"),
    author: Yup.string().required("Yazar zorunludur"),
    releaseDate: Yup.number().required("Yayım tarihi zorunludur"),
  });

  const initialValues = {
    id,
    bookName: "",
    author: "",
    releaseDate: "",
  };

  const onSubmit = (values) => {
    window.location.reload(false);
    console.log(values);

    let bookService = new BookService();

    bookService.updateBook(values).then((result) => {
      toast.success("Kitap Güncellendi.");
      console.log(result);
      console.log(result.data);
      console.log("başarılı");
    }, []);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit,
  });
  return (
    <Container className="main">
      <div className="popup-box">
        <div className="box">
          <Button
            floated="right"
            onClick={props.handleClose}
            icon="close"
          ></Button>
          <Container className="main">
            <Form onSubmit={formik.handleSubmit}>
              <Container className="main">
                <Segment raised>
                  <p
                    style={{
                      color: "#0090B8",
                      fontSize: "30px",
                      fontFamily: "Fantasy",
                      textAlign: "center",
                    }}
                  >
                    Kitap Ekle
                  </p>
                </Segment>

                <Segment raised>
                  <Label style={{ marginBottom: "1em" }} color="blue" ribbon>
                    Kitap Adı
                  </Label>
                  <Form.Field
                    error={formik.errors.bookName && formik.touched.bookName}
                  >
                    <Input
                      style={{ width: "100%" }}
                      type="text"
                      placeholder="Kitap Adı"
                      defaultValue ={book.bookName}
                      name="bookName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></Input>
                    {formik.errors.bookName && formik.touched.bookName && (
                      <div className={"ui pointing red right ribbon label"}>
                        {formik.errors.bookName}
                      </div>
                    )}
                  </Form.Field>
                  <Divider />
                  <Form.Field
                    error={formik.errors.author && formik.touched.author}
                  >
                    <Label style={{ marginBottom: "1em" }} color="teal" ribbon>
                      Yazar
                    </Label>
                    <Input
                      style={{ width: "100%" }}
                      type="text"
                      placeholder="Yazar Adı"
                      defaultValue ={book.author}
                      name="author"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></Input>
                    {formik.errors.author && formik.touched.author && (
                      <div className={"ui pointing red right ribbon label"}>
                        {formik.errors.author}
                      </div>
                    )}
                  </Form.Field>
                  <Divider />
                  <Form.Field
                    error={
                      formik.errors.releaseDate && formik.touched.releaseDate
                    }
                  >
                    <Label style={{ marginBottom: "1em" }} color="blue" ribbon>
                      Yayım Tarihi
                    </Label>
                    <Input
                      style={{ width: "100%" }}
                      type="text"
                      placeholder="Yayım Tarihi"
                      defaultValue ={book.releaseDate}
                      name="releaseDate"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></Input>
                    {formik.errors.releaseDate &&
                      formik.touched.releaseDate && (
                        <div className={"ui pointing red right ribbon label"}>
                          {formik.errors.releaseDate}
                        </div>
                      )}
                  </Form.Field>
                  <Divider />
                  <Container style={{ textAlign: "right" }}>
                    <Button
                      size="big"
                      className="ui blue basic button"
                      type="submit" 
                    >
                      Ekle
                    </Button>
                  </Container>
                </Segment>
              </Container>
            </Form>
          </Container>
        </div>
      </div>
    </Container>
  );
};
export default UpdateBookWithPopup;
