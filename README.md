# Online RTOS Task Scheduling Simulator
## Introduction
This project was built for Iowa State University's Cpr E 458 RTOS Final Project.

The purpose of this project was to create an online RTOS Task Scheduling Simulator that can take in a task set and output the feasibility of the task set for a given RTOS Scheduling Algorithm, presenting a schedule if feasible.

Currently the project supports RMS and EDF scheduling algorithms with the ability to add additional schedulers in the future.  

## File Heirarchy
Key files are described below.
|Location|Description  |
|--|--|
| src/App.js | Root Component, also where main data store is for application |
| src/utils/ | Directory with key utilities and data-structures used through out project |
| **---> src/utils/algorithmPtrs.js** | **Contains RTOS Scheduling Algorithm data-structure** |
| ---> src/utils/lcm.js | Contains functions to compute least common multiples |
| ---> src/utils/priorityComparators.js | Contains compare functions for sorting objects of type Task by priority |
| ---> src/utils/Task.js | Class that represents a singular Task |
