import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {


  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4>Resume</h4>
            <h3 class="panel-title">
              Resume:
            </h3>
          </div>
          <div class="panel-body">
            <span> </span><Link to="/about" class="btn btn-primary">Return</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
