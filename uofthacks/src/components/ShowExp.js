import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      experience: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('experiences').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          experience: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('experiences').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/about")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h3>Experience List</h3>
            <h4 class="panel-title">
              {this.state.experience.title}
            </h4>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Description:</dt>
              <dd>{this.state.experience.description}</dd>
              <dt>Date:</dt>
              <dd>{this.state.experience.date}</dd>
            </dl>
            <Link to={`/editexp/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
            <span> </span><Link to="/about" class="btn btn-primary">Return</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
