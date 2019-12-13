import { RMS_compare, EDF_compare } from './priorityComparators.js'

/**
 * Computes the greatest common denominator of a and b
 */
function gcd(a, b) {
  while(b) {
    let new_a = b;
    b = a % b;
    a = new_a;
  }
  return a;
}

/**
 * Computes the least common multiple of a and b
 */
function lcm(a, b) {
  return Math.floor((a * b) / gcd(a, b)) //TODO: Is flooring this correct??
}

/**
 * Computes the least common multiple from a given list of numbers
 */
function lcmm(num_list) {
  return num_list.reduce(lcm)
}

function exact_analysis(sorted_tasks) {

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
      if (tnew == tprev && tnew <= parseInt(sorted_tasks[i].di)) {
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


function RMS_check(sorted_tasks) {
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
  return exact_analysis(sorted_tasks)
}

/**
 * Schedulability check for EDF scheduling.
 */
function EDF_check(sorted_tasks) {
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

/**
 * Constructs RMS Schedule if it is feasible
 */
export function RMS(tasks) {
  var sorted_tasks = tasks.slice(0).sort(RMS_compare);
  console.log(sorted_tasks);
  var validSchedule = RMS_check(sorted_tasks);
  console.log("RMS Schedulable: " + validSchedule);
  return validSchedule;
}

/**
 * Constructs EDF Schedule if it is feasible
 */
export function EDF(tasks) {
  var sorted_tasks = tasks.slice(0).sort(RMS_compare);
  var validSchedule = EDF_check(sorted_tasks);
  console.log("EDF Schedulable: " + validSchedule);
  return validSchedule;
}
