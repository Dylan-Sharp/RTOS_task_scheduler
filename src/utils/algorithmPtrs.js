import { RMS_compare, EDF_compare } from './priorityComparators.js'
import { lcm_from_list } from './lcm.js'

class SchedulingAlgorithm {
  constructor(name) {
    this.name = name;
  }


  isSchedulable(sorted_tasks) {
    throw new Error('Method isSchedulable must be implemented');
  }

  generateSchedule(sorted_tasks) {
    throw new Error('Method generateSchedule must be implemented');
  }

  getSortedPriority(tasks) {
    throw new Error('Method sortPriority must be implemented');
  }

}

export class RMS extends SchedulingAlgorithm {
  constructor() {
    super("RMS");
  }

  getSortedPriority(tasks) {
    return tasks.slice(0).sort(RMS_compare);
  }

  exactAnalysis(sorted_tasks) {
    // Loop over all tasks backwards and run exact analysis for each
    for(let i = sorted_tasks.length - 1; i >= 0; i--) {
      let test_pass = false;
      let tprev = 0;
      // Calculate t0 (initialized to tprev)
      for(let j = i; j >= 0; j--) {
        tprev += parseInt(sorted_tasks[j].ci);
      }

      //Run until ti (or tprev) is > di of task.  This fails test.
      while (tprev <= parseInt(sorted_tasks[i].di)) {
        let tnew = 0;

        // Calculate tnew = Wi(tprev)
        for(let j = 0; j <= i; j++) {
          tnew += parseInt(sorted_tasks[j].ci) * Math.ceil(tprev / parseInt(sorted_tasks[j].pi))
        }

        // Check if Wi(tprev) = tprev (and veriy tnew <= di, don't really need to check this since its checked in while loop and tnew == tprev but just for safety)
        if (tnew === tprev && tnew <= parseInt(sorted_tasks[i].di)) {
          // This task (sorted_tasks[i] is schedulable!!)
          test_pass = true;
          break;
        }
        tprev = tnew;
      }

      // If any test fails, we exit here
      if(!test_pass) {
        console.log("Exact Analysis: Failed")
        return false;
      }
    }
    // All tasks completed exact analysis and all are schedulable
    console.log("Exact Analysis: Passed")
    return true;
  }

  isSchedulable(sorted_tasks) {
    var total = 0.0;
    for (var i = 0; i < sorted_tasks.length; i++) {
      if (!sorted_tasks[i].isValid()) {
        return false;
      }

      total += parseInt(sorted_tasks[i].ci) / parseInt(sorted_tasks[i].pi);
    }

    // Utilization Test
    console.log(total + " : " + sorted_tasks.length * (Math.pow(2.0, 1.0 / sorted_tasks.length) - 1.0));
    if (total < sorted_tasks.length * (Math.pow(2.0, 1.0 / sorted_tasks.length) - 1.0)) {
      console.log("RMS CPU Utilization: Passed");
      return true
    }
    console.log("RMS CPU Utilizaiton: Failed")
    return this.exactAnalysis(sorted_tasks)
  }

  generateSchedule(sorted_tasks) {
    var periods = []
    for(let i = 0; i < sorted_tasks.length; i++) periods.push(sorted_tasks[i].pi);
    var lcm = lcm_from_list(periods)  //Computes least common multipule needed for schedule
    var sorted_ready_tasks = []
    for(let i = 0; i < sorted_tasks.length; i++) {
      sorted_ready_tasks.push({
        'taskRef': sorted_tasks[i],
        'timeLeftInPeriod': 0
      });
    }

    var schedule = []
    for(let i = 0; i < lcm; i++) {

      var selectedTask = null;

      //Loop through and set ready time for any task that are ready and choose which one to continue with.
      for(let j = 0; j < sorted_ready_tasks.length; j++) {

        // Restore Ci for current period if ready.
        if (i % parseInt(sorted_ready_tasks[j].taskRef.pi) === 0) {
          sorted_ready_tasks[j].timeLeftInPeriod = parseInt(sorted_ready_tasks[j].taskRef.ci)
        }

        if (selectedTask === null && sorted_ready_tasks[j].timeLeftInPeriod > 0){
          selectedTask = sorted_ready_tasks[j]
        }
      }

      if(selectedTask) {
        selectedTask.timeLeftInPeriod -= 1
        schedule.push(selectedTask.taskRef)
      } else {
        schedule.push(null)
      }


    }
    console.log(schedule)
    return schedule
  }
}


export class EDF extends SchedulingAlgorithm {
  constructor() {
    super("EDF");
  }

  getSortedPriority(tasks) {
    return tasks.slice(0).sort(EDF_compare);
  }

  isSchedulable(sorted_tasks) {
    var total = 0.0;
    // calculate sumation
    for(let i = 0; i < sorted_tasks.length; i++) {
      if (!sorted_tasks[i].isValid()) {
        return false;
      }
      total += parseInt(sorted_tasks[i].ci) / parseInt(sorted_tasks[i].pi);
    }

    if(total <= 1) {
      return true;
    }
    return false;
  }

  static _isScheduleDone(sorted_ready_tasks) {
    for(let i = 0; i < sorted_ready_tasks.length; i++) {
      if(sorted_ready_tasks[i].deadlines.length > 0) {
        return true;
      }
    }
    return false;
  }

  generateSchedule(sorted_tasks) {
    var periods = []
    for(let i = 0; i < sorted_tasks.length; i++) periods.push(sorted_tasks[i].pi);
    var lcm = lcm_from_list(periods)  //Computes least common multipule needed for schedule
    var sorted_ready_tasks = []
    for(let i = 0; i < sorted_tasks.length; i++) {
      sorted_ready_tasks.push({
        'taskRef': sorted_tasks[i],
        'deadlines': []
      });
    }

    var schedule = []
    var scheduleIdx = 0;  // Used to keep track of where we are at in our schedule (we could just use schedule array)

    // Loop through unit all task periods are past lcm of schedule and submit deadlines.
    do {

      var selectedTask = null;
      for(let j = 0; j < sorted_ready_tasks.length; j++) {

        // Add dead line if needed and its not past lcm in scheduler.
        if(scheduleIdx % parseInt(sorted_ready_tasks[j].taskRef.pi) === 0 && scheduleIdx / lcm < 1) {
          sorted_ready_tasks[j].deadlines.push({
            'ciRemaining': sorted_ready_tasks[j].taskRef.ci,
            'di': Math.floor(scheduleIdx / sorted_ready_tasks[j].taskRef.pi) * sorted_ready_tasks[j].taskRef.di,
          });
          console.log("Pushing deadline to task: " + sorted_ready_tasks[j].taskRef.idx)
        }

        console.log(sorted_ready_tasks)
        if(sorted_ready_tasks[j].deadlines.length > 0 && (selectedTask == null || selectedTask.deadlines[0].di > sorted_ready_tasks[j].deadlines[0].di)) {
          selectedTask = sorted_ready_tasks[j]
          console.log("selecting task: " + selectedTask.taskRef.idx)
        }

      }

      if (selectedTask) {
        selectedTask.deadlines[0].ciRemaining -= 1;
        schedule.push(selectedTask.taskRef);
        console.log("Adding task " + selectedTask.taskRef.idx + " to schedule.")

        // Check if we have finished ci for deadline period.
        //    if so remove it from head of deadline queue for this task
        if(selectedTask.deadlines[0].ciRemaining <= 0) {
          console.log("Poping off deadline")
          selectedTask.deadlines.pop();
        }
      } else {
        console.log("Add null to schedule")
        schedule.push(null);
      }

      scheduleIdx += 1;
    } while(EDF._isScheduleDone(sorted_ready_tasks) || scheduleIdx < lcm)
    console.log(schedule)
    return schedule
  }
}
