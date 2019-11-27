import React from 'react'
import Task from '../../datastructure/Task';
import DeleteIcon from '../../delete.svg';

class TaskInput extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ci: this.props.taskRef.ci,
      pi: this.props.taskRef.pi,
      di: this.props.taskRef.di
    }
  }

  onInputChange = (event) => {
    this.props.taskRef[event.target.name] = event.target.value;
    this.setState({ci: this.props.taskRef.ci, pi: this.props.taskRef.pi, di: this.props.taskRef.di});
    this.forceUpdate();
  }


  render() {
    return (
      <div className="TaskInput">
        <h1>Task {"T" + (this.props.taskIdx + 1).toString()}</h1>
        <img src={ DeleteIcon }  className="deleteIcon" alt="Delete" onClick={() => this.props.deleteTask(this.props.taskIdx)} />
        <div className="TaskInputGrid">
          <div>
            Ci
            <input className="TaskInputBox" type="number" id="ci" name="ci" value={this.props.taskRef.ci} onChange={this.onInputChange}/>
          </div>
          <div>
            Pi
            <input className="TaskInputBox" type="number" id="pi" name="pi" value={this.props.taskRef.pi} onChange={this.onInputChange}/>
          </div>
          <div>
            Di
            <input className="TaskInputBox" type="number" id="di" name="di" value={this.props.taskRef.di} onChange={this.onInputChange}/>
          </div>
        </div>
      </div>
    )
  }


}

function TaskInput2(props) {
  function onInputChange(event) {
    props.taskRef[event.target.name] = event.target.value;
    //this.forceUpdate();
  }

  return (
    <div className="TaskInput">
      <h1>Task {"T" + (props.taskIdx + 1).toString()}</h1>
      <img src={ DeleteIcon }  className="deleteIcon" alt="Delete" onClick={() => props.deleteTask(props.taskIdx)} />
      <div className="TaskInputGrid">
        <div>
          Ci
          <input className="TaskInputBox" type="number" id="ci" name="ci" value={props.taskRef.ci} onChange={onInputChange}/>
        </div>
        <div>
          Pi
          <input className="TaskInputBox" type="number" id="pi" name="pi" value={props.taskRef.pi} onChange={onInputChange}/>
        </div>
        <div>
          Di
          <input className="TaskInputBox" type="number" id="di" name="di" value={props.taskRef.di} onChange={onInputChange}/>
        </div>
      </div>
    </div>
  )
}

export default TaskInput;
