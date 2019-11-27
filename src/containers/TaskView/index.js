import React from 'react';
import TaskInput from '../../components/TaskInput';


class TaskView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {

    return (
      <div style={{'overflowY': 'auto'}}>
        {this.props.taskList.map((myTask, idx) => <TaskInput key={idx} taskRef={myTask} taskIdx={idx} deleteTask={this.props.deleteTask}/>)}
        <div className="addTaskDiv" onClick={this.props.createNewTask}>
          Add Task
        </div>
      </div>
    );
  }
}

export default TaskView;
