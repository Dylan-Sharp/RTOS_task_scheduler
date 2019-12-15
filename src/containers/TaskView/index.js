import React from 'react';
import PropTypes from 'prop-types';
import TaskInput from '../../components/TaskInput';


class TaskView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {

    return (
      <div>
        <div style={{'textDecoration': 'underline', 'color': 'blue', 'userSelect': 'none', 'position': 'relative','left': 'calc(50% / 2)', 'bottom': '-10px' }} >
          <button onClick={this.props.resetTasks}>Clear all tasks</button>
        </div>
        <div style={{'overflowY': 'auto', 'height': '800px'}}>
          {this.props.taskList.map((myTask, idx) => <TaskInput key={idx} taskRef={myTask} taskIdx={idx} disableDi={this.props.scheduler.name === "RMS"} deleteTask={this.props.deleteTask}/>)}
          <div className="addTaskDiv" onClick={this.props.createNewTask}>
            Add Task
          </div>
        </div>
      </div>
    );
  }
}

TaskView.propTypes = {
  taskList: PropTypes.arrayOf(PropTypes.shape({
      idx: PropTypes.number.isRequired,
      ci: PropTypes.string.isRequired,
      pi: PropTypes.string.isRequired,
      di: PropTypes.string.isRequired,
    })).isRequired,
    scheduler: PropTypes.shape({
      name: PropTypes.string.isRequired,
      isSchedulable: PropTypes.func,
      generateSchedule: PropTypes.func,
    }).isRequired,
  createNewTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  resetTasks: PropTypes.func.isRequired,
}

export default TaskView;
