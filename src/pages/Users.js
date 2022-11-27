import React, { useState } from "react";
import axios from 'axios';
import {
Button,
TextField,
Grid,
Paper,
AppBar,
Typography,
Toolbar,
Link,
CircularProgress
} from "@material-ui/core";
import Swal from 'sweetalert2'

// component to Logout user
export function Logout() {
  sessionStorage.removeItem('token');
}

// Generate a login form
export function LoginForm({history}) {
  // state hook functions
  const [email, setEmail] = useState("erdinanangkajaya@gmail.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);

  if (sessionStorage.getItem("isAuthenticated") === "true"){
    history.push('./')
  }
  
  // submit form
  function onSubmit() {
    setLoading(true);
    // using API function to submit data to Personal CRM API
    axios({
      method: "POST",
      data: {
        email: email,
        password: password
      },
      withCredentials: true,
      url: "http://localhost:5000/login"
    }).then((response) => {
      console.log(response)
      if (response.data){
        sessionStorage.setItem("isAuthenticated", "true")
        Swal.fire({
          title: "Successfully Logged In!",
          icon: "success",
          showClass: {
            icon: ''
          },
          timer: 1000,
          showConfirmButton: false
        }).then(()=>{history.push('/')})
      }
      else {
        Swal.fire({
          title: "Wrong Email or Password",
          text: "Please try again.",
          icon: "warning",
          showClass: {
            icon: ''
          }
        })
      }
      setLoading(false);
    }).catch(error => {
      console.log('server error');
      console.log(error);
      setLoading(false);
    })
  }

  return (
    <div>
      <AppBar position="static" alignitems="center" color="primary">
        <Toolbar>
          <Grid container justifyContent="center" wrap="wrap">
            <Grid item>
              <Typography variant="h6">PERSONAL CRM</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container spacing={5} justifyContent="center" direction="row">
        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="center"
            spacing={2}
            className="login-form"
          >
          <Paper
            variant="elevation"
            elevation={2}
            className="login-background"
          >
          <Grid item>
            <Typography component="h1" variant="h3">
              Login
            </Typography>
            <br /> 
          </Grid>
          <Grid item style={{marginTop: "10%"}}>
            <form method= "post" action="/login">
              <Grid container direction="column" spacing={4}>
                <Grid item>
                  <TextField
                    value={email}
                    type="text"
                    placeholder="Email"
                    fullWidth
                    name="email"
                    id = "email"
                    variant="outlined"
                    onChange={event => {
                      setEmail(event.target.value);
                    }}   
                    required
                    autoFocus
                  />
                </Grid>
                <Grid item>
                  <TextField
                    value={password}
                    type="password"
                    id = "password"
                    placeholder="Password"
                    fullWidth
                    name="password"
                    variant="outlined"
                    onChange={event => {
                      setPassword(event.target.value);
                    }} 
                    required
                  />
                </Grid>
                <Grid item>
                  {!loading ? (
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="button-block"
                        onClick={onSubmit}
                        disabled={(email == "" || password == "")}
                        style={{textTransform: "none"}}
                      >
                        Submit
                      </Button>
                     ) : (
                      <CircularProgress />
                     )
                  }
                  <br />
                  <br />
                </Grid>
              </Grid>
            </form>
          </Grid>

          <Grid item>
            <Link href="/register" variant="h6">
            Do not have an account? Register here.
            </Link>
          </Grid>
          </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}




      