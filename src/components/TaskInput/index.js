import React from 'react'
import Task from '../../datastructure/Task';
import DeleteIcon from '../../delete.svg';

class TaskInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskRef: this.props.taskRef,
    }
  }


  render() {
    return (
      <div className="TaskInput">
        <h1>Task {this.state.taskRef.designator}</h1>
        <img src={ DeleteIcon }  className="deleteIcon" alt="Delete" onClick={() => console.log("Delete")} />
        <div className="TaskInputGrid">
          <div>
            Ci
            <input className="TaskInputBox" type="number" id="ci" name="ci" />
          </div>
          <div>
            Pi
            <input className="TaskInputBox" type="number" id="ci" name="ci" />
          </div>
          <div>
            Di
            <input className="TaskInputBox" type="number" id="ci" name="ci" />
          </div>
        </div>
      </div>
    )
  }


}

export default TaskInput;
