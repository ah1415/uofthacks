import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('experiences');
    this.state = {
      title: '',
      description: '',
      date: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, date } = this.state;

    this.ref.add({
      title,
      description,
      date
    }).then((docRef) => {
      this.setState({
        title: '',
        description: '',
        date: ''
      });
      this.props.history.push("/about")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { title, description, date } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD EXPERIENCE
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/about" class="btn btn-primary">Experience List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
              </div>
              <div class="form-group">
                <label for="date">Date:</label>
                <input type="text" class="form-control" name="date" value={date} onChange={this.onChange} placeholder="Date" />
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
