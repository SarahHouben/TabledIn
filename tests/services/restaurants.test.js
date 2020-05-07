const { timeSlots } = require('../../services/restaurants');

const openingTimes = {
  monday: { opentime: 1300, closetime: 2100 },
  tuesday: { opentime: 1600, closetime: 2100 },
  wednesday: {},
  thursday: {},
  friday: {},
  saturday: {},
  sunday: {},
};

describe('Restaurant working hours and timeslots testing', () => {
  const cases = [
    [0, 1600, true], // Monday 16:00 - true
    [0, 1915, true], // Monday 19:16 - true
    [0, 1245, false], // Monday 12:45 - false
    [0, 2115, false], // Monday 21:15 - false
    [1, 1600, false], // Tuesday 16:00 - false
    [1, 1845, true], // Tuesday 18:45 - true
    [1, 1500, false], // Tuesday 15:00 - false
    [1, 2230, false], // Tuesday 22:30 - false
    [2, 1330, false], // Wednesday 13:30 - false
    [3, 1745, false], // Thursday 17:45 - false
    [4, 1800, false], // Friday 18:00 - false
    [5, 2100, false], // Saturday 21:00 - false
    [6, 2300, false], // Sunday 23:00 - false
  ];

  it.each(cases)(
    'It should check if timeslots corespond with opening times for diferent days',
     (day, time, expected) => {
      const slots =  timeSlots(openingTimes);
      const test = slots[day]['timeslots'][time];

      expect(test).toBe(expected);
      expect(slots).toHaveLength(7);
    }
  );
});
