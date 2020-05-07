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

  const day = weekdays[dayIndex];

  return day ? day.toLowerCase() : day;
};