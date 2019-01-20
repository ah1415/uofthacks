import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      title: '',
      description: '',
      date: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('experiences').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const experience = doc.data();
        this.setState({
          key: doc.id,
          title: experience.title,
          description: experience.description,
          date: experience.date
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({experience:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, date } = this.state;

    const updateRef = firebase.firestore().collection('experiences').doc(this.state.key);
    updateRef.set({
      title,
      description,
      date
    }).then((docRef) => {
      this.setState({
        key: '',
        title: '',
        description: '',
        date: ''
      });
      this.props.history.push("/showexp/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT EXPERIENCE
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/showexp/${this.state.key}`} class="btn btn-primary">Experience List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <input type="text" class="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder="Description" />
              </div>
              <div class="form-group">
                <label for="date">Date:</label>
                <input type="text" class="form-control" name="date" value={this.state.date} onChange={this.onChange} placeholder="Date" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
