import "./App.css";
import { Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { loadUser } from "./actions/userActions";
import store from "./store";
import Header from "./component/layout/Header";
import Footer from "./component/layout/Footer";
import Home from "./component/home/Home";
import About from "./component/home/About";
import Signup from "./component/user/Signup";
import Login from "./component/user/Login";
import Summary from "./component/summary/Summary";
import Summaries from "./component/summary/Summaries";
import SingleSummary from "./component/summary/SingleSummary";
import Subscription from "./component/subscription/Subscription";
import Transactions from "./component/subscription/Transactions";

function App() {
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);

  return (
    <Fragment>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
        <Routes>
          <Route path="/summary" element={<Summary />} />
        </Routes>
        <Routes>
          <Route path="/summaries" element={<Summaries />} />
        </Routes>
        <Routes>
          <Route path="/summary/:id" element={<SingleSummary />} />
        </Routes>
        <Routes>
          <Route path="/subscription" element={<Subscription />} />
        </Routes>
        <Routes>
          <Route path="/account" element={<Transactions />} />
        </Routes>
        <Footer />
      </Router>
    </Fragment>
  );
}

export default App;
