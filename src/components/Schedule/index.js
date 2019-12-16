import React from 'react';
import PropTypes from 'prop-types';


var colorArr = ['#F1948A', '#BB8FCE', '#85C1E9', '#76D7C4', '#F7DC6F', '#E59866', '#D7DBDD', '#58D68D']


function Schedule(props) {
  return (
    <div style={{'width': '75%', 'display': 'flex', 'justifyContent': 'center'}}>
      <div style={{'overflowX': 'scroll'}}>
      <table>
        <tbody>
          <tr>
            {props.schedule.map((task, idx) => (
              <th key={idx + "h"} style={task ? {'backgroundColor': colorArr[task.idx % colorArr.length]} : {}}>
                {task ? ("T" + task.idx) : ""}
              </th>
            ))}
          </tr>
          <tr>
            {props.schedule.map((task, idx) => (
              <td key={idx + "d"}>
              <div style={{'position': 'relative', 'right': '-10px'}} >
                {idx + 1}
              </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  );
}

Schedule.propTypes = {
  schedule: PropTypes.arrayOf(PropTypes.shape({
      idx: PropTypes.number.isRequired,
      ci: PropTypes.string.isRequired,
      pi: PropTypes.string.isRequired,
      di: PropTypes.string.isRequired,
    })).isRequired,
}

export default Schedule;
