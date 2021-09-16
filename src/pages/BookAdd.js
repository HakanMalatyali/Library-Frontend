import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Divider,
  Label,
  Segment,
  Dropdown,
  Form,
  Input,
} from "semantic-ui-react";
import * as Yup from "yup";
import BookService from "../services/bookService";
import CategoryService from "../services/categoryService";
import { toast } from "react-toastify";

export default function BookAdd() {
  let bookService = new BookService();

  const initialValues = {
    bookName: "",
    author: "",
    releaseDate: "",
    categoryId: "",
  };

  const schema = Yup.object({
    bookName: Yup.string().required("Ürün adı zorunludur"),
    author: Yup.string().required("Yazar zorunludur"),
    releaseDate: Yup.number().required("Yayım tarihi zorunludur"),
    categoryId: Yup.string().required("Kategori alanı zorunludur"),
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    let categoryService = new CategoryService();
    categoryService
      .getCategories()
      .then((result) => setCategories(result.data.data));
  }, []);

  const onSubmit = (values) => {
    console.log(values);

    let addBook = {
      bookName: values.bookName,
      author: values.author,
      releaseDate: values.releaseDate,
      category: { categoryId: values.categoryId },
    };

    bookService.addBook(addBook).then((result) => {
      toast(addBook.bookName + " sisteme eklenmiştir.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(result);
      console.log("Başarılı");
      
    }, []);
    formik.resetForm()
  };

  

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit,
  });

  const categoriesOption = categories.map((category, index) => ({
    key: index,
    text: category.categoryName,
    value: category.categoryId,
  }));

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  };

  return (
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
                value={formik.values.bookName}
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
            <Form.Field error={formik.errors.author && formik.touched.author}>
              <Label style={{ marginBottom: "1em" }} color="teal" ribbon>
                Yazar
              </Label>
              <Input
                style={{ width: "100%" }}
                type="text"
                placeholder="Yazar Adı"
                value={formik.values.author}
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
              error={formik.errors.releaseDate && formik.touched.releaseDate}
            >
              <Label style={{ marginBottom: "1em" }} color="blue" ribbon>
                Yayım Tarihi
              </Label>
              <Input
                style={{ width: "100%" }}
                type="text"
                placeholder="Yayım Tarihi"
                value={formik.values.releaseDate}
                name="releaseDate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></Input>
              {formik.errors.releaseDate && formik.touched.releaseDate && (
                <div className={"ui pointing red right ribbon label"}>
                  {formik.errors.releaseDate}
                </div>
              )}
            </Form.Field>
            <Divider />
            <Label style={{ marginBottom: "1em" }} color="teal" ribbon>
              Kateori
            </Label>
            <Container>
              <Form.Field>
                <Dropdown
                  clearable
                  item
                  placeholder="Kategori"
                  search
                  selection
                  onChange={(event, data) =>
                    handleChangeSemantic(data.value, "categoryId")
                  }
                  onBlur={formik.onBlur}
                  id="categoryId"
                  value={formik.values.categoryId}
                  options={categoriesOption}
                />
                {formik.errors.categoryId && formik.touched.categoryId && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.categoryId}
                  </div>
                )}
              </Form.Field>
            </Container>
            <Divider />
            <Container style={{ textAlign: "right" }}>
              <Button size="big" className="ui blue basic button" type="submit">
                Ekle
              </Button>
            </Container>
          </Segment>
        </Container>
      </Form>
    </Container>
  );
}
