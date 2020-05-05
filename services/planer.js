const { timeSlots } = require('./restaurants');

exports.openingTimes = async (openingtime) => {
  
  const openDays = {
    monday: {},
    tuesday: {},
    wednesday: {},
    thursday: {},
    friday: {},
    saturday: {},
    sunday: {},
  };
  const openingTimes = Object.assign(openDays, openingtime);
  const slots = await timeSlots(openingTimes);
 
  let combined = await slots.map((timeSlotObj) => {
    let businessTime = openingTimes[timeSlotObj.day];

    if (businessTime.opentime) {
      for (let key in timeSlotObj.timeslots) {
        let timeNum = Number(key);
        let openingTime = businessTime.opentime;
        let closingTime = businessTime.closetime;
        if (timeNum < closingTime && timeNum > openingTime)
          timeSlotObj.timeslots[key] = true;
      }
      return timeSlotObj;
    } else return timeSlotObj;
  });

  return combined
};

exports.getWeekDay = (selectedDay) => {
  //Create an array containing each day, starting with Sunday.
  const dayIndex = new Date(selectedDay).getDay();
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  //Return the element that corresponds to that index.
  
  return  weekdays[dayIndex].toLowerCase();
};
