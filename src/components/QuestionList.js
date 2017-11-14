import React from 'react';
import { Grid, Row, Col, code, Button, Checkbox } from 'react-bootstrap';

const QuestionList = ({ questionList, addQuestion, isDeleteModeOn, deleteMode, deleteQuestion, onQuestionSelect }) => {
  const listItems = questionList.map((questionItem) =>
    <Row className="show-grid" key={questionItem.question}>
      <Col xs={3} md={2}><li style={styles.itemStyle} onClick={() => onQuestionSelect(questionItem)}>{questionItem.question}</li></Col>
      {isDeleteModeOn ? <Col xs={2} md={2}><img src='https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_delete-128.png' style={styles.imgStyle} alt="" onClick={() => deleteQuestion(questionItem.question)} /></Col>
        : null}
    </Row>
  );

  return (
    <Grid>
      <Row className="show-grid" style={styles.headingStyle}> Select your Questions </Row>
      <div>
        {listItems}
      </div>
      <div>
        {!isDeleteModeOn ?
          <Button bsStyle="primary" onClick={addQuestion}>
            ADD
    </Button>
          : null}
      </div>
      <div style={styles.checkStyle}>
        <Checkbox
          checked={isDeleteModeOn}
          onChange={deleteMode}>
         DELETE
        </Checkbox>
      </div>
      <br />
      <div>
        {!isDeleteModeOn ? <span>Click on question to edit and add choices</span>
          : null}
      </div>
      <div>
      {isDeleteModeOn ? <span>Click on dustbin icon to delete</span> 
      : null}
      </div>
    </Grid>
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
  },
  headingStyle: {
    marginBottom: '20px'
  }
}

export default QuestionList;
