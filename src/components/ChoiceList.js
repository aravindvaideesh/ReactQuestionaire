import React from 'react';
import { Button, Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

const ChoiceList = ({ questionList, selectedQuestion, handleQuestionChange, addChoice, deleteChoice, handleChoiceChange }) => {
  //console.log('Question ' + JSON.stringify(selectedQuestion, null, 3));
  const listItems = selectedQuestion.choices.map((choiceItem, index) =>
    <div key={index}>
      <li>
        <label>Option {index + 1} </label>
        <input type="text" name={index} value={choiceItem} onChange={handleChoiceChange} />
      </li>
    </div>
  );
  return (
    <div>
      <h5>Design your Questions </h5>
          <Form inline>
            <FormGroup controlId="formInlineName">
              <ControlLabel>Question</ControlLabel>
              {' '}
              <FormControl type="text" disabled={questionList.length === 0} value={selectedQuestion.question} onChange={handleQuestionChange} />
            </FormGroup>
            </Form>
      <div>
        {listItems}
      </div>
      <div>
          <Button bsStyle="primary" onClick={addChoice} disabled={selectedQuestion.question === "" || selectedQuestion.choices.length === 6}>
          ADD
          </Button>
          <Button bsStyle="primary" onClick={deleteChoice} disabled={selectedQuestion.question === "" || selectedQuestion.choices.length === 0}>
          DELETE
          </Button>
      </div>
    </div>
  )
}

export default ChoiceList;


