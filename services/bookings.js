exports.filterTables = (tables, time) => {
  const filtered = tables
    .filter((table) => {
      const timeSlotArray = Object.keys(table.timeslots);
      const availabilityArray = Object.values(table.timeslots);
      const timeSlotIndex = timeSlotArray.indexOf(time.toString());
      const checkArray = [];
      for (let i = 0; i <= 3; i++) {
        checkArray.push(
          availabilityArray[(timeSlotIndex + i) % availabilityArray.length]
        );
      }
      return !checkArray.includes(false);
    })
    .sort((a, b) => {
      return a.tablecapacity - b.tablecapacity;
    });

  return filtered;
};

exports.updateTables = (tables, time) => {
  const timeSlotArray = Object.keys(tables[0].timeslots);
  const availabilityArray = Object.values(tables[0].timeslots);
  const timeSlotIndex = timeSlotArray.indexOf(time.toString());
  return availabilityArray
    .map((timeSlot, index) => {
      if (
        index !== timeSlotIndex &&
        index !== (timeSlotIndex + 1) % availabilityArray.length &&
        index !== (timeSlotIndex + 2) % availabilityArray.length &&
        index !== (timeSlotIndex + 3) % availabilityArray.length
      ) {
        return timeSlot;
      } else {
        return false;
      }
    })
    .reduce((acc, val, i) => {
      acc[timeSlotArray[i]] = val;
      return acc;
    }, {});
};
