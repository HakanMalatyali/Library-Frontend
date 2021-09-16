import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Container,
  Button,
  Divider,
  Form,
  Grid,
  Segment,
} from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import UserService from "../services/userService";
import { toast } from "react-toastify";


export default function HomePage() {

  let userService = new UserService(); 

  const initialValues = {
    username: "",
    password: "",
  };

  const schema = Yup.object({
    bookName: Yup.string().required("Ürün adı zorunludur"),
    author: Yup.string().required("Yazar zorunludur"),
    releaseDate: Yup.number().required("Yayım tarihi zorunludur"),
    categoryId: Yup.string().required("Kategori alanı zorunludur"),
  });


  const onSubmit = (values) => {
    console.log(values);

    let login = {
      username: values.username,
      password: values.password,
    };

    console.log(values)
    console.log(login)
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit,
  });



  return (
    <Container className="login">
      <Segment style={{borderRadius: "30px"}} raised placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Input
                icon="user"
                iconPosition="left"
                label="username"
                placeholder="username"
                value={formik.values.username}
                name="username"
                onChange={formik.handleChange}
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                label="password"
                type="password"
                value={formik.values.password}
                name="password"
                onChange={formik.handleChange}
              />

              <Button type="submit" content="Giriş Yap" primary />
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            <Button as={NavLink} to="/signup" content="Kayıt Ol" icon="signup" size="big" />
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
    </Container>
  );
}
