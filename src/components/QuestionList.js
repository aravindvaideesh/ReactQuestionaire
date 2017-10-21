import React from 'react';

const QuestionList = ({ questionList, addQuestion, isDeleteModeOn, deleteMode, deleteQuestion, onQuestionSelect }) => {
  const listItems = questionList.map((questionItem) =>
    <div key={questionItem.question}>
      <li style={styles.itemStyle} onClick={() => onQuestionSelect(questionItem)}>{questionItem.question}</li>
      {isDeleteModeOn ? <img src='https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_delete-128.png' style={styles.imgStyle} alt="" onClick={() => deleteQuestion(questionItem.question)} />
        : null}
    </div>
  );

  return (
    <div>
      <h3> Select your Questions </h3>
      <div>
        {listItems}
      </div>
      <div>
        {!isDeleteModeOn ?
          <button onClick={addQuestion} style={styles.buttonStyle}>
            ADD
    </button>
          : null}
      </div>
      <div style={styles.checkStyle}>
        <input type="checkbox"
          checked={isDeleteModeOn}
          onChange={deleteMode} />
        <label style={styles.labelStyle}>DELETE</label>
      </div>
    </div>
  )
}

const styles = {
  itemStyle: {
    display: 'inline-block',
    overflow: 'hidden'
  },
  imgStyle: {
    width: '18px',
    paddingLeft: '10px'
  },
  buttonStyle: {
    marginTop: '30px',
    width: '80px',
    height: '30px',
    background: 'border-box',
    color: 'darkorchid',
    fontSize: 'initial'

  },
  checkStyle: {
    marginTop: '10px'
  },
  labelStyle: {
    color: 'darkorchid'
  }
}

export default QuestionList;
