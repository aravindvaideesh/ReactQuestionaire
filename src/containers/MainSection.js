import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap';
import _ from 'lodash'

import QuestionList from '../components/QuestionList';
import ChoiceList from '../components/ChoiceList';

export default class MainSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questionList: [
      ],
      isDeleteModeOn: false,
      questionIterator: 0,
      selectedQuestion: { question: "", choices: [], choiceIterator: 0 }
    }
  }

  componentDidMount() {
    if (localStorage.getItem('state')) {
      this.setState(JSON.parse(localStorage.getItem('state')));
    }
  }

  componentDidUpdate() {
    localStorage.state = JSON.stringify(this.state);
  }


  addQuestion = () => {
    let questionIterator = this.state.questionIterator + 1;
    let newQuestion = {
      question: 'New Question ' + questionIterator,
      choices: [],
      choiceIterator: 0
    }
    let newQuestionList = this.state.questionList;
    newQuestionList.push(newQuestion);
    this.setState({ questionList: newQuestionList, questionIterator: questionIterator });
  }

  deleteMode = () => {
    let currentState = this.state.isDeleteModeOn;
    this.setState({ isDeleteModeOn: !currentState });
  }

  deleteQuestion = (questionText) => {
    let updatedQuestionList = this.state.questionList;
    updatedQuestionList = updatedQuestionList.filter((questionItem) => {
      return !(questionItem.question === questionText);
    });
    this.setState({ questionList: updatedQuestionList , selectedQuestion: {question: '', choices : [], choiceIterator: 0}});
  }

  onQuestionSelect = (questionObj) => {
    this.setState({ selectedQuestion: { question: questionObj.question, choices: questionObj.choices, choiceIterator: questionObj.choiceIterator } });
  }

  addChoice = () => {
    let { selectedQuestion, questionList } = this.state;
    let quesIndex = _.findIndex(questionList, selectedQuestion);
    let newQuestion = {};
    if (quesIndex > -1) {
      questionList = _.map(questionList, (questionItem, index) => {
        if (index === quesIndex) {
          newQuestion = {
            question: selectedQuestion.question,
            choices: _.concat(selectedQuestion.choices, ["New Choice " + (selectedQuestion.choiceIterator + 1)]),
            choiceIterator: selectedQuestion.choiceIterator + 1
          }
          return newQuestion;
        } else {
          return questionItem;
        }
      })
    }
    this.setState({ questionList: questionList, selectedQuestion: newQuestion })
  }

  deleteChoice = () => {
    let { selectedQuestion, questionList } = this.state;
    let quesIndex = _.findIndex(questionList, selectedQuestion);
    let newQuestion = {};
    if (quesIndex > -1) {
      questionList = _.map(questionList, (questionItem, index) => {
        if (index === quesIndex) {
          newQuestion = {
            question: selectedQuestion.question,
            choices: _.filter(selectedQuestion.choices, (choice, index) => { return index !== selectedQuestion.choices.length - 1}),
            choiceIterator: selectedQuestion.choiceIterator
          }
          return newQuestion;
        } else {
          return questionItem;
        }
      })
    }
    this.setState({ questionList: questionList, selectedQuestion: newQuestion })
  }

  handleQuestionChange = (event) => {
    let { selectedQuestion, questionList } = this.state;
    let quesIndex = _.findIndex(questionList, selectedQuestion);
    let newQuestion = {};
    if (quesIndex > -1) {
      questionList = _.map(questionList, (questionItem, index) => {
        if (index === quesIndex) {
          newQuestion = {
            question: event.target.value,
            choices: selectedQuestion.choices,
            choiceIterator: selectedQuestion.choiceIterator
          }
          return newQuestion;
        } else {
          return questionItem;
        }
      })
    }
    this.setState({ questionList: questionList, selectedQuestion: newQuestion });
  }

  handleChoiceChange = ({ target }) => {
    let { selectedQuestion, questionList } = this.state;
    let newChoices = selectedQuestion.choices;
    newChoices[target.name] = target.value;
    let quesIndex = _.findIndex(questionList, selectedQuestion);
    let newQuestion = {};
    if (quesIndex > -1) {
      questionList = _.map(questionList, (questionItem, index) => {
        if (index === quesIndex) {
          newQuestion = {
            question: selectedQuestion.question,
            choices: newChoices,
            choiceIterator: selectedQuestion.choiceIterator
          }
          return newQuestion;
        } else {
          return questionItem;
        }
      })
    }
    this.setState({ questionList: questionList, selectedQuestion: newQuestion })
  }


  render() {

    const styles = {
      height: '800px',
      backgroundColor: '#42A2F1'
    };

    const stylesTwo = {
      height: '800px',
      backgroundColor: '#9DD3FF'
    }

    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={5} md={4} style={styles}>
            <QuestionList questionList={this.state.questionList}
              addQuestion={this.addQuestion}
              isDeleteModeOn={this.state.isDeleteModeOn}
              deleteMode={this.deleteMode}
              deleteQuestion={this.deleteQuestion}
              onQuestionSelect={this.onQuestionSelect} />
          </Col>
          <Col xs={7} md={8} style={stylesTwo}>
            <ChoiceList questionList={this.state.questionList}
              selectedQuestion={this.state.selectedQuestion}
              handleQuestionChange={this.handleQuestionChange}
              addChoice={this.addChoice}
              deleteChoice={this.deleteChoice}
              handleChoiceChange={this.handleChoiceChange} />
          </Col>
        </Row>
      </Grid>
    )
  }
}