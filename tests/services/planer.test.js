const { openingTimes } = require('../../services/planer');
const { getWeekDay } = require('../../utils/getWeekDay');

describe('Get day of the week from a date', () => {
  const cases = [
    ['monday', '2020-05-11T10:00:00.000Z'],
    ['thursday', '2020-05-14T10:00:00.000Z'],
    ['friday', '2020-05-15T10:00:00.000Z'],
  ];

  it.each(cases)(`It should return %p for %p`, (expected, selectedDay) => {
    expect(getWeekDay(selectedDay)).toBe(expected);
  });

  it('Should return undefined for undefined arg', () => {
    expect(getWeekDay(undefined)).toBeUndefined();
  });
});

describe('Creating time slots and opening times for specific day', () => {
  const cases = [
    [4, '1815', true], //Friday 18:15
    [4, '1900', true], //Friday 19:00
    [4, '1330', true], //Friday 13:30
    [4, '1745', true], //Friday 17:45
    [4, '1245', false], //Friday 12:45
    [4, '2115', false], //Friday 21:15
    [0, '1900', false], //Sunday 19:00
    [1, '1900', false], //Monday 19:00
    [2, '1900', false], //Tuesday 19:00
    [3, '1900', false], //Wednesday 19:00
    [5, '1900', false], //Thursday 19:00
    [6, '1900', false], //Saturday 19:00
  ];
  it.each(cases)(
    'Should set time slots values coresponding to given day and times',
    async (index, time, expected) => {
      const opentime = 1300;
      const closetime = 2100;
      const day = 'friday';
      const openingtime = {
        [day]: { opentime, closetime },
      };
      const result = await openingTimes(openingtime);
      const test = result[index].timeslots[time]; //Accesing timeslot values

      expect(test).toBe(expected);
      expect(result).toHaveLength(7);
    }
  );
});
