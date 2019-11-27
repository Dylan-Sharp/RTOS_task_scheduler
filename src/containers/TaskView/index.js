import React from 'react';
import TaskInput from '../../components/TaskInput';


class TaskView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <React.Fragment>
        <TaskInput taskRef={this.props.createNewTask()}/>
        <p>TESTING THE TaskView</p>
      </React.Fragment>
    );
  }
}

export default TaskView;
