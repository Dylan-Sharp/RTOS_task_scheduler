import React from 'react';
import logo from './logo.svg';
import TaskView from './containers/TaskView';
import Task from './datastructure/Task';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
    }
  }

  createNewTask = () => {
    let newTask = new Task("T" + (this.state.taskList.length + 1).toString());
    this.state.taskList.push(newTask);
    return newTask;
  }

  getTaskList = () => {
    return this.state.taskList;
  }

  render() {
    return (
      <div className="App">
        <TaskView getTaskList={this.getTaskList} createNewTask={this.createNewTask}/>
      </div>
    );
  }
}

export default App;
