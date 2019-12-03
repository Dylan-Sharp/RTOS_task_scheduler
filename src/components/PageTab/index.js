import React from 'react'
import PropTypes from 'prop-types';


function PageTab(props) {
  return (
    <React.Fragment>
      <div className="pagetab">
        <div className={props.taskPageSelected ? 'pagetab-selected' : 'pagetab-unselected'} onClick={props.taskPageSelected ? null : props.togglePage}>Tasks</div>
        <div className={props.taskPageSelected ? 'pagetab-unselected' : 'pagetab-selected'} onClick={props.taskPageSelected ? props.togglePage : null}>Schedule</div>
      </div>
    </React.Fragment>
  );
}

PageTab.propTypes = {
  taskPageSelected: PropTypes.bool.isRequired,
  togglePage: PropTypes.func.isRequired,
}

export default PageTab;
