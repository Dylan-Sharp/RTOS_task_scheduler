import React from 'react';
import logo from './logo.svg';
import TaskView from './containers/TaskView';
import Task from './datastructure/Task';
import PageTab from './components/PageTab';
import './App.css';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [new Task(), new Task()], // Initialize task list with two empty tasks
      taskPageSelected: true,
    }
  }

  createNewTask = () => {
    console.log("Creating task");
    let newTask = new Task("T" + (this.state.taskList.length + 1).toString());  //TODO: Remove designator argument.
    this.setState({
      taskList: [...this.state.taskList, newTask]
    });
    return newTask;
  }

  deleteTask = (idx) => {
    if (this.state.taskList.length <= 2) {
      return;
    }
    console.log("Deleting");
    console.log(this.state.taskList);
    const newList = [...this.state.taskList]; // Create a copy of the list.  Should be a shallow copy.
    newList.splice(idx, 1);
    this.setState({
      taskList: newList,
    })
    console.log(this.state.taskList);
  }

  resetTasks = () => {
    this.setState({
      taskList: [new Task(), new Task()]
    })
  }

  togglePage = () => {
    this.setState({
      taskPageSelected: !this.state.taskPageSelected,
    })
  }

  render() {
    return (
      <div className="App">
        <div style={{'display': 'flex', 'justifyContent': 'center'}}><PageTab taskPageSelected={this.state.taskPageSelected} togglePage={this.togglePage}/></div>
        <div style={{'display': 'flex', 'justifyContent': 'center'}}><TaskView taskList={this.state.taskList} createNewTask={this.createNewTask} deleteTask={this.deleteTask} resetTasks={this.resetTasks}/></div>
      </div>
    );
  }
}

export default App;
