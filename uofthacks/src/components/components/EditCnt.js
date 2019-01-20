import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      name: '',
      phone: '',
      email: '',
      github: '',
      linkedin: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('contacts').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const contact = doc.data();
        this.setState({
          key: doc.id,
          name: contact.name,
          phone: contact.phone,
          email: contact.email,
          github: contact.github,
          linkedin: contact.linkedin,
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({contact:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, phone, email, github, linkedin } = this.state;

    const updateRef = firebase.firestore().collection('contacts').doc(this.state.key);
    updateRef.set({
      name, phone, email, github, linkedin
    }).then((docRef) => {
      this.setState({
        key: '',
        name: '',
        phone: '',
        email: '',
        github: '',
        linkedin: ''
      });
      this.props.history.push("/showcnt/"+this.props.match.params.id)
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
              EDIT CONTACT INFORMATION
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/showcnt/${this.state.key}`} class="btn btn-primary">Contact List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Name:</label>
                <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div class="form-group">
                <label for="description">Phone:</label>
                <input type="text" class="form-control" name="phone" value={this.state.phone} onChange={this.onChange} placeholder="Phone" />
              </div>
              <div class="form-group">
                <label for="date">Email:</label>
                <input type="text" class="form-control" name="email" value={this.state.email} onChange={this.onChange} placeholder="Email" />
              </div>
              <div class="form-group">
                <label for="date">GitHub:</label>
                <input type="text" class="form-control" name="github" value={this.state.github} onChange={this.onChange} placeholder="GitHub" />
              </div>
              <div class="form-group">
                <label for="date">LinkedIn:</label>
                <input type="text" class="form-control" name="linkedin" value={this.state.linkedin} onChange={this.onChange} placeholder="LinkedIn" />
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
