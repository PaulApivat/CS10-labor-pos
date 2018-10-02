import React, { Component } from "react";
import { AUTH_TOKEN } from "../../constants";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router";
import { SIGNIN_MUTATION } from "../../mutations";
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  FormControlLabel,
  Card,
  Typography,
  Paper
} from "@material-ui/core";

//The login component, to be rendered in a modal at the landing page
class Login extends Component {
  //The component stores the contents of its input fields on state.
  state = {
    password: "",
    username: ""
  };

  //TODO: make this component out of materialui stuff
  render() {
    const { username, password } = this.state;
    return (
      <Paper>
        <Typography variant="display1" align="center">
          Log In
        </Typography>

        <form>
          <Grid container>
            <Grid item xs={1} />
            <Grid item xs={10}>
              <TextField
                value={username}
                onChange={e => this.setState({ username: e.target.value })}
                type="text"
                placeholder="Username"
                id="username"
                name="username"
                label="Username"
                fullWidth
              />
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={1} />
            <Grid item xs={10}>
              <TextField
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                label="password"
                fullWidth
              />
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={9} />
            <Grid item xs={2}>
              <Mutation
                mutation={SIGNIN_MUTATION}
                variables={{ username, password }}
                onCompleted={data => this._confirm(data)}
              >
                {mutation => (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={event => {
                      event.preventDefault();
                      mutation();
                    }}
                    type="submit"
                  >
                    Login
                  </Button>
                )}
              </Mutation>
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </form>

        <div>
          {/*The mutation component will send our mutation to the backend using Apollo*/}
        </div>
      </Paper>
    );
  }

  //This method runs after the mutation has received an answer
  _confirm = async data => {
    const { token } = data.tokenAuth;
    this._saveUserData(token);
    // Go to the root route
    this.props.history.push("/");
    // Now that we're done with it, close the modal containing this component.
    // this.props.modalDone();
  };

  //Keep our login token on local storage for later use
  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
}

export default withRouter(Login);
