import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {


  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4>Job Description</h4>
            <h3 class="panel-title">
              Job Description:
            </h3>
          </div>
          <div class="panel-body">
            <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3"></textArea>
            <Link to={`/about/`} class="btn btn-success">Submit</Link>&nbsp;
            <span> </span><Link to="/about" class="btn btn-primary">Return</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
