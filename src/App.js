import "./App.css";
import Dashboard from "./layouts/Dashboard";
import Navi from "./layouts/Navi";

import "semantic-ui-css/semantic.min.css";
import { Route, Switch } from "react-router-dom";
import BookAdd from "./pages/BookAdd";
import NoMatch from "./pages/NoMatch";
import { Container } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import BookDetail from "./pages/BookDetail";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navi />

      <Switch>
        <Route exact path="/" component={Dashboard}></Route>
        <Route path="/signup" component={SignUp} />
        <Route exact path="/books/:id" component={Dashboard}></Route>
        <Route path="/book/add" component={BookAdd} />
        <Route path="/book/:id" component={BookDetail}/>
        <Route path="/homepage" component={HomePage} />
        <Container style={{ marginTop: "30em" }}>
          <Route component={NoMatch} />{" "}
        </Container>
      </Switch>
    </div>
  );
}

export default App;
