import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      name: ''
    };
  }

  componentDidMount() {
    const ref2 = firebase.firestore().collection('skills').doc(this.props.match.params.id);
    ref2.get().then((doc) => {
      if (doc.exists) {
        const skill = doc.data();
        this.setState({
          key: doc.id,
          name: skill.name,
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({skill:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name } = this.state;

    const updateRef = firebase.firestore().collection('skills').doc(this.state.key);
    updateRef.set({
      name
    }).then((docRef) => {
      this.setState({
        key: '',
        name: ''
      });
      this.props.history.push("/showskl/"+this.props.match.params.id)
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
              EDIT SKILL
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/showskl/${this.state.key}`} class="btn btn-primary">Skill List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.onChange} placeholder="Name" />
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
