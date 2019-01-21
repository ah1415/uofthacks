import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      skill: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref2 = firebase.firestore().collection('skills').doc(this.props.match.params.id);
    ref2.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          skill: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('skills').doc(id).delete().then(() => {
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
          <h3>Skill List</h3>
            <h4 class="panel-title">
              {this.state.skill.name}
            </h4>
          </div>
          <div class="panel-body">
            <Link to={`/editskl/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
            <span> </span><Link to="/about" class="btn btn-primary">Return</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
