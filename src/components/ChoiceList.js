import React from 'react';

const ChoiceList = ({ selectedQuestion, handleQuestionChange, addChoice, handleChoiceChange }) => {
  const listItems = selectedQuestion.choices.map((choiceItem, index) =>
    <div key={choiceItem}>
      <li>
        <label>Option {index + 1} </label>
        <input type="text" value={choiceItem} onChange={(e) => handleChoiceChange(index, e)} />
      </li>
    </div>
  );
  return (
    <div>
      <h3>Design your Questions </h3>
      <div className="row">
        <label className="col-md-6">Question</label><input className="col-md-6" type="text" value={selectedQuestion.question} onChange={handleQuestionChange} />
      </div>
      <div>
        {listItems}
      </div>
      <div>
        <button onClick={addChoice} disabled={selectedQuestion.question === ""}>
          ADD
    </button>
      </div>
    </div>
  )
}

export default ChoiceList;


