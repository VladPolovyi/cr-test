import "./styles/App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./layout/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import Logout from "./pages/Logout";

function App({ loggedIn }) {
  console.log({ loggedIn });

  let routes;
  if (loggedIn) {
    routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/add" component={Add} />
        <Route exact path="/edit/:id" component={Edit} />
        <Route exact path="/logout" component={Logout} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return <Layout>{routes}</Layout>;
}
const mapStateToProps = ({ firebase }) => ({
  loggedIn: firebase.auth.uid,
});

export default connect(mapStateToProps)(App);
