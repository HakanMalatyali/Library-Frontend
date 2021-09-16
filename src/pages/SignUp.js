import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Segment,
  Input,
  Label,
  Divider,
  Button,
} from "semantic-ui-react";
import { useFormik } from "formik";
import UserService from "../services/userService";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function SignUp() {
  const [user, setUser] = useState({});

  const userService = new UserService();

  const initialValues = {
    username: "",
    password: "",
  };

  const schema = Yup.object({
    username: Yup.string().required("Kullanıcı adı zorunludur"),
    password: Yup.string().required("Parola zorunludur").min(8,"Minimum 8 karakterli olmalıdır.")
  });

  const onSubmit = (values) => {
    console.log(values);

    let addUser = {
        username: values.username,
        password: values.password,
    };

    userService.addUser(addUser).then((result) => {
      toast(addUser.username + " sisteme eklenmiştir.", {
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
      validationSchema : schema,
      onSubmit
  })

 

  return (
    <Container className="form">
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
              Kullanıcı Ekle
            </p>
          </Segment>

          <Segment raised>
            <Label style={{ marginBottom: "1em" }} color="blue" ribbon>
              Kullanıcı Adı
            </Label>
            <Form.Field
              error={formik.errors.username && formik.touched.username}
            >
              <Input
                style={{ width: "100%" }}
                type="text"
                placeholder="Kullanıcı Adı"
                value={formik.values.username}
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></Input>
              {formik.errors.username && formik.touched.username && (
                <div className={"ui pointing red right ribbon label"}>
                  {formik.errors.username}
                </div>
              )}
            </Form.Field>
            <Divider />
            <Form.Field error={formik.errors.author && formik.touched.author}>
              <Label style={{ marginBottom: "1em" }} color="teal" ribbon>
                Parola
              </Label>
              <Input
                style={{ width: "100%" }}
                type="password"
                placeholder="Parola"
                value={formik.values.password}
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></Input>
              {formik.errors.password && formik.touched.password && (
                <div className={"ui pointing red right ribbon label"}>
                  {formik.errors.password}
                </div>
              )}
            </Form.Field>
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
