import React from 'react';
import PropTypes from 'prop-types';
import TaskInput from '../../components/TaskInput';


class TaskView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {

    return (
      <div>
        <div style={{'textDecoration': 'underline', 'color': 'blue', 'userSelect': 'none', 'position': 'relative','left': 'calc(50% / 2)', 'bottom': '-10px' }} onClick={this.props.resetTasks}>
          Clear all tasks
        </div>
        <div style={{'overflowY': 'auto', 'height': '800px'}}>
          {this.props.taskList.map((myTask, idx) => <TaskInput key={idx} taskRef={myTask} taskIdx={idx} deleteTask={this.props.deleteTask}/>)}
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
      ci: PropTypes.string.isRequired,
      pi: PropTypes.string.isRequired,
      di: PropTypes.string.isRequired,
    })).isRequired,
  createNewTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  resetTasks: PropTypes.func.isRequired,
}

export default TaskView;
