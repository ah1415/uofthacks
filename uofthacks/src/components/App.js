import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('experiences');
    this.ref2 = firebase.firestore().collection('skills');
    this.ref3 = firebase.firestore().collection('contacts');
    this.unsubscribe = null;
    this.unsubscribe2 = null;
    this.unsubscribe3 = null;
    this.state = {
      experiences: [],
      skills: [],
      contacts: [],
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const experiences = [];
    querySnapshot.forEach((doc) => {
      const { title, description, date } = doc.data();
      experiences.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        date,
      });
    });
    this.setState({
      experiences
   });
  }
  onCollectionUpdate2 = (querySnapshot) => {
    const skills = [];
    querySnapshot.forEach((doc) => {
      const { name } = doc.data();
      skills.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
      });
    });
    this.setState({
      skills
   });
  }
  onCollectionUpdate3 = (querySnapshot) => {
    const contacts = [];
    querySnapshot.forEach((doc) => {
      const { name, phone, email, github, linkedin } = doc.data();
      contacts.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name, phone, email, github, linkedin,
      });
    });
    this.setState({
      contacts
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    this.unsubscribe2 = this.ref2.onSnapshot(this.onCollectionUpdate2);
    this.unsubscribe3 = this.ref3.onSnapshot(this.onCollectionUpdate3);
  }

  render() {
    return (


      <div class="container">
      <h1>ABOUT</h1>

      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">
            CONTACT INFORMATION
          </h3>
        </div>
        <div class="panel-body">
          <table class="table table-stripe">
            <thead>
              <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>GitHub</th>
              <th>LinkedIn</th>
              </tr>
            </thead>
            <tbody>
              {this.state.contacts.map(contact =>
                <tr>
                  <td><Link to={`/showcnt/${contact.key}`}>{contact.name}</Link></td>
                  <td>{contact.phone}</td>
                  <td>{contact.email}</td>
                  <td>{contact.github}</td>
                  <td>{contact.linkedin}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              SKILL LIST
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/createskl">Add Skill</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.skills.map(skill =>
                  <tr>
                    <td><Link to={`/showskl/${skill.key}`}>{skill.name}</Link></td>

                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EXPERIENCE LIST
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/createexp">Add Experience</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {this.state.experiences.map(experience =>
                  <tr>
                    <td><Link to={`/showexp/${experience.key}`}>{experience.title}</Link></td>
                    <td>{experience.description}</td>
                    <td>{experience.date}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        </div>
    );
  }
}

export default App;
