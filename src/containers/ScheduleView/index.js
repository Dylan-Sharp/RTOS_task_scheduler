import React from 'react';
import PropTypes from 'prop-types';
import { RMS } from '../../utils/scheduling_aglorithms.js';

class ScheduleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    var validSchedule = RMS(this.props.taskList);

    return (
      <React.Fragment>
        {validSchedule ? "Valid Schedule :)" : "Invalid Schedule"}
      </React.Fragment>
    );
  }
}

ScheduleView.propTypes = {
  taskList: PropTypes.arrayOf(PropTypes.shape({
      ci: PropTypes.string.isRequired,
      pi: PropTypes.string.isRequired,
      di: PropTypes.string.isRequired,
    })).isRequired,
}

export default ScheduleView;
