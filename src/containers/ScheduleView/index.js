import React from 'react';
import PropTypes from 'prop-types';
import Schedule from '../../components/Schedule';

class ScheduleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  feasibleText = (text) => {
    return (
      <div style={{'display': 'flex', 'justifyContent': 'center'}}>
        <div style={{'fontSize': '32px', 'userSelect': 'none'}}>
          {text}
        </div>
      </div>
    )
  }

  render() {
    let sortedTasks = this.props.scheduler.getSortedPriority(this.props.taskList);
    var validSchedule = this.props.scheduler.isSchedulable(sortedTasks);
    if (validSchedule) {
      var schedule = this.props.scheduler.generateSchedule(sortedTasks);
    }

    return (
      <React.Fragment>
        {validSchedule ? this.feasibleText("Valid Schedule!!") : this.feasibleText("Invalid Schedule")}
        <br/>
        <div style={{'display': 'flex', 'justifyContent': 'center'}}>
          {validSchedule ? <Schedule schedule={schedule}/> : ""}
        </div>
      </React.Fragment>
    );
  }
}

ScheduleView.propTypes = {
  taskList: PropTypes.arrayOf(PropTypes.shape({
      idx: PropTypes.number.isRequired,
      ci: PropTypes.string.isRequired,
      pi: PropTypes.string.isRequired,
      di: PropTypes.string.isRequired,
    })).isRequired,
  scheduler: PropTypes.shape({
    name: PropTypes.string,
    isSchedulable: PropTypes.func.isRequired,
    generateSchedule: PropTypes.func.isRequired,
  }).isRequired,
}

export default ScheduleView;
