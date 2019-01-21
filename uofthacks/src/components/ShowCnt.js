import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contact: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('contacts').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          contact: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('contacts').doc(id).delete().then(() => {
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
          <h3>Contact Information</h3>
            <h4 class="panel-title">
              {this.state.contact.name}
            </h4>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Phone:</dt>
              <dd>{this.state.contact.phone}</dd>
              <dt>Email:</dt>
              <dd>{this.state.contact.email}</dd>
              <dt>GitHub:</dt>
              <dd>{this.state.contact.github}</dd>
              <dt>LinkedIn:</dt>
              <dd>{this.state.contact.linkedin}</dd>
            </dl>
            <Link to={`/editcnt/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <span> </span><Link to="/about" class="btn btn-primary">Return</Link>

          </div>
        </div>
      </div>
    );
  }
}

export default Show;
