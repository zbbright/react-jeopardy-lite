import React, { Component } from 'react';
import JeopardyService from "../../jeopardyService";
class Jeopardy extends Component {
  constructor(props){
    super(props);
    this.client = new JeopardyService();
    this.state = {
      data: {},
      score: 0,
      userAnswer: ''
    }
  }
  
  getNewQuestion() {
    return this.client.getQuestion().then(result => {
      this.setState({
        data: result.data[0],
      })
    }).then(result => {this.resetForm();})
  }
  
  componentDidMount() {
    this.getNewQuestion();
  }

    handleChange = (event) => {
        let userAnswer = this.state.userAnswer;
        userAnswer = event.target.value;
        this.setState({userAnswer});
    }

    resetForm = (event) => {
        this.setState({
            userAnswer: '',
        })
    }

    handleSubmit = (event) => {
    event.preventDefault();
    let useranswer = this.state.userAnswer.trim().toLowerCase();
    let rightanswer = this.state.data.answer.trim().toLowerCase();
    if(useranswer===rightanswer){
        this.setState((state, props) => ({
            score: state.score + this.state.data.value
          }));
    } else {
        this.setState((state, props) => ({
            score: state.score - this.state.data.value
          }));
        }
        this.getNewQuestion();
        
    }

  render() {
      let category = '';
      if(this.state.data.category){
        category = this.state.data.category.title;
      }
    return (
      <div>
        <h1>Score: {this.state.score}</h1>
        <h2>Question: {this.state.data.question}</h2>
        <form onSubmit={this.handleSubmit}>
            <label> Answer: 
            <input type='text' onChange={this.handleChange} value={this.state.userAnswer}></input>
            <button>Submit</button>
            </label>
        </form>
        <h2>Points: {this.state.data.value}</h2>
        <h2>Category: {category}</h2>
      </div>
    );
  }
}
export default Jeopardy;


// class Contact extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { 
//             submitted: false, 
//             formData: {
//                 firstName: "",
//                 lastName: "",
//                 email: ""
//             }
//         }
//     }
//     handleChange = (event) => {
//         let formData = this.state.formData;
//         formData[event.target.name] = event.target.value;
//         this.setState({formData});
//     }
//     handleSubmit = (event) => {
//         event.preventDefault();
//         this.setState({
//             submitted: true
//         })
//     }
//     resetForm = (event) => {
//         this.setState({
//             submitted: false,
//             formData: {
//                 firstName: "",
//                 lastName: "",
//                 email: ""
//             }
//         })
//     }
//     render() {
//         //show the thank you message if the form has been submitted
//         if(this.state.submitted){
//             return (
//                 <div>
//                     Thank you, {this.state.formData.firstName}, for submitting the form <br/>
//                     <button onClick={this.resetForm}>Reset Form</button>
//                 </div>
//             )
//         }
//         return (
//             <div>
//                 <form onSubmit={this.handleSubmit}>
//                     <div>
//                         <label>First Name:</label>
//                         <input onChange={this.handleChange} type="text" name="firstName" value={this.state.formData.firstName} />
//                     </div>
//                     <div>
//                         <label>Last Name:</label>
//                         <input onChange={this.handleChange} type="text" name="lastName" value={this.state.formData.lastName} />
//                     </div>
//                     <button>Submit Form</button> <br/>
//                     {this.state.formData.firstName}
//                     <br/>
//                     {this.state.formData.lastName}
//                 </form>
//             </div>
//         );
//     }
// }
