import React, { Component } from 'react';
import firebase from '../Firebase';


class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      des: ''
    };
  }

  componentDidMount() {
    const ref2 = firebase.firestore().collection('jobs').doc(this.props.match.params.id);
    ref2.get().then((doc) => {
      if (doc.exists) {
        const job = doc.data();
        this.setState({
          key: "ySVm3mtwFR4nRKtGPRJ3",
          des: job.des,
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({job:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { des } = this.state;

    const updateRef = firebase.firestore().collection('jobs').doc(this.state.key);
    updateRef.set({
      des
    }).then((docRef) => {
      this.setState({
        key: '',
        des: ''
      });
      this.props.history.push("/JobDes/"+this.props.match.params.id)
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
              EDIT JOB DESCRIPTION
            </h3>
          </div>
          <div class="panel-body">

            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name">Job Description:</label>
                <textArea class="form-control" name="des" value = {this.state.des} onChange={this.onChange} placeholder="Job Description" cols="80" rows="3">{this.state.des}</textArea>
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
