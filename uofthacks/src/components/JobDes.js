


import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      job: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref2 = firebase.firestore().collection('jobs').doc(this.props.match.params.id);
    ref2.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          job: doc.data(),
          key: "ySVm3mtwFR4nRKtGPRJ3",
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }



  render() {
    return (
      <div class="container">

          <h3>Job Description</h3>
            <h4 class="panel-title">
              
            </h4>
            <dl>
              <dt>Description:</dt>
              <dd>{this.state.job.des}</dd>
              </dl>
              <Link to="/resume" class="btn btn-primary">Next</Link>
            <span> </span><Link to={`/editjobdes/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;

            <span> </span><Link to="/about" class="btn btn-primary">Return</Link>
          </div>

    );
  }
}

export default Show;
