import React from "react";
import { ToastContainer } from "react-toastify";
import { Container, Grid } from "semantic-ui-react";
import Categories from "./Categories";
import BookList from "../pages/BookLists";


export default function Dashboard() {
  return (
    <div>
      <Container className="main">
      <ToastContainer position="bottom-right" />
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Categories />
            </Grid.Column>
            <Grid.Column width={12}>
             <BookList/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}
