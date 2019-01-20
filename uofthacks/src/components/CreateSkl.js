import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref2 = firebase.firestore().collection('skills');
    this.state = {
      name: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name } = this.state;

    this.ref2.add({
      name
    }).then((docRef) => {
      this.setState({
        name: ''
      });
      this.props.history.push("/about")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { name } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD SKILL
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/about" class="btn btn-primary">Skill List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name" />
              </div>
              <button type="submit" class="btn btn-success" href="/about">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
