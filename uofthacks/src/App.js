import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {


  render() {
    return (


      <div class="container">

      <div class="panel panel-default">
        <div class="panel-heading">
          <center><h3 class="panel-title">
            TIRED OF TAILORING YOUR RESUME? HERE IS THE SOLUTION
          </h3></center>
        </div>
        <div class="panel-body">

        </div>
        <form onSubmit={this.onSubmit}>
        <center>
          <div class="form-group">
            <label for="title">Email Address:</label>
            <textArea class="form-control" name="title" onChange={this.onChange} placeholder="Email" cols="1"rows="1"></textArea>
          </div>

          <div class="form-group">
            <label for="description">Password:</label>
            <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Password" cols="1" rows="1"></textArea>
          </div>
          <label for="rememberme">
              <input type="checkbox" id="rememberme" name="rememberme"></input>
               Remember Me
          </label>
          <div>
          <br></br>
          </div>
          <Link to={`/about/`} class="btn btn-success">Login</Link>&nbsp;
          </center>
        </form>

        </div>
        </div>

    );
  }
}

export default App;
