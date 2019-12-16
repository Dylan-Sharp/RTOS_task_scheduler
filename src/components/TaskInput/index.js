import React from 'react'
import PropTypes from 'prop-types';
import DeleteIcon from '../../delete.svg';

class TaskInput extends React.Component {
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
    if (this.props.disableDi && event.target.name === "pi") {
      this.props.taskRef['di'] = event.target.value;
    }
    this.setState({ci: this.props.taskRef.ci, pi: this.props.taskRef.pi, di: this.props.taskRef.di});
    this.forceUpdate();  // Force this component to update.  This is brute force approach but it works for now.
  }


  render() {
    return (
      <div className="TaskInput">
        <h1 style={{'margin': 'auto'}}>Task {"T" + (this.props.taskIdx + 1).toString()}</h1>
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
            <input className="TaskInputBox" type="number" disabled={this.props.disableDi} id="di" name="di" value={this.props.taskRef.di} onChange={this.onInputChange}/>
          </div>
        </div>
      </div>
    )
  }


}

TaskInput.defalutProps = {
  disableDi: false,
}

TaskInput.propTypes = {
  taskRef: PropTypes.shape({
      ci: PropTypes.string.isRequired,
      pi: PropTypes.string.isRequired,
      di: PropTypes.string.isRequired,
    }).isRequired,
  disableDi: PropTypes.bool.isRequired,
  taskIdx: PropTypes.number.isRequired,
  deleteTask: PropTypes.func.isRequired,
}

export default TaskInput;
