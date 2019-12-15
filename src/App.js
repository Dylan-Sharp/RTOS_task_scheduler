import React from 'react';
//import logo from './logo.svg';
import TaskView from './containers/TaskView';
import ScheduleView from './containers/ScheduleView';
import Task from './utils/Task';
import PageTab from './components/PageTab';
import { RMS, EDF } from './utils/algorithmPtrs';
import './App.css';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.schedulers = [new RMS(), new EDF()]

    this.state = {
      taskList: [new Task(1), new Task(2)], // Initialize task list with two empty tasks
      taskPageSelected: true,
      scheduler: this.schedulers[0],  //By deffault set scheduler to RMS
    }
  }

  createNewTask = () => {
    console.log("Creating task");
    let newTask = new Task(this.state.taskList.length + 1);
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
    const newList = [...this.state.taskList]; // Create a copy of the list.  Should be a shallow copy.
    newList.splice(idx, 1);
    for(let i = 0; i < newList.length; i++) newList[i].idx = (i + 1);
    this.setState({
      taskList: newList,
    })
    console.log(newList);
  }

  resetTasks = () => {
    this.setState({
      taskList: [new Task(1), new Task(2)]
    })
  }

  togglePage = () => {
    for(let i = 0; i < this.state.taskList.length; i++) {
      if(!this.state.taskList[i].isValid()){
        alert('Error: Invalid or Missing Task Parameters')
        return
      }
    }
    this.setState({
      taskPageSelected: !this.state.taskPageSelected,
    })
  }

  /**
   * Handles the change of scheduling algorithm
   */
  algorithmChange = (event) => {
    const newList = [...this.state.taskList];
    if(this.schedulers[event.target.value].name === "RMS") {
      for(let i = 0; i < newList.length; i++) {
        newList[i].di = newList[i].pi;
      }
    }
    this.setState({
      scheduler: this.schedulers[event.target.value],
      taskList: newList,
    })
  }

  render() {
    return (
      <div className="App">
        <div style={{'display': 'flex', 'justifyContent': 'center'}}>
          <PageTab taskPageSelected={this.state.taskPageSelected} togglePage={this.togglePage}/>
        </div>
        <br/>
        <div style={{'display': 'flex', 'justifyContent': 'center'}}>
          <select onChange={this.algorithmChange}>
            {this.schedulers.map((algorithm, idx) => <option key={idx} value={idx}>{algorithm.name}</option>)}
          </select>
        </div>

        {this.state.taskPageSelected ?
          <div style={{'display': 'flex', 'justifyContent': 'center'}}>
            <TaskView taskList={this.state.taskList} scheduler={this.state.scheduler} createNewTask={this.createNewTask} deleteTask={this.deleteTask} resetTasks={this.resetTasks}/>
          </div>
        :
          <ScheduleView taskList={this.state.taskList} scheduler={this.state.scheduler}/>
        }
      </div>
    );
  }
}

export default App;
