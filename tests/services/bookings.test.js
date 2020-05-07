const { filterTables, updateTables } = require('../../services/bookings');
const jsonData = require('./bookings.test.json');

describe('Filtering and sorting tables by capacity', () => {
  const cases = [
    [3, 1900],
    [2, 1800],
    [0, 2100],
  ];
  it.each(cases)(
    `Should return %s tables available for %s hours `,
    (expected, time) => {
      const tables = filterTables(jsonData, time);
      expect(tables).toHaveLength(expected);
    }
  );
  it('Should sort tables by capacity', () => {
    const time = 1900;
    const tables = filterTables(jsonData, time);

    expect(tables[0].tablecapacity).toBeLessThanOrEqual(
      tables[1].tablecapacity
    );
    expect(tables[0].tablecapacity).toBeLessThanOrEqual(
      tables[2].tablecapacity
    );
  });
});

describe('Updating table timeslots', () => {
  it('Should have timeslots set to false for given hour', () => {
    const arival = 1400;

    const availableTables = filterTables(jsonData, arival);
    const updatedTimeslots = updateTables(availableTables, arival);

    const testBeforeUpdate = availableTables[0]['timeslots'][arival + '']; // Arival time - true
    const test = updatedTimeslots[arival + '']; // Arival time - false
    const test1 = updatedTimeslots[arival + 15 + '']; // Arival time + 15 minutes - false
    const test2 = updatedTimeslots[arival + 30 + '']; // Arival time + 30 minutes - false
    const test3 = updatedTimeslots[arival + 45 + '']; // Arival time + 45 minutes - false
    const test4 = updatedTimeslots[arival + 100 + '']; // Arival time + 60 minutes - true
    const test5 = updatedTimeslots[arival - 55 + '']; // Arival time - 15 minutes - true
    expect(testBeforeUpdate).toBeTruthy();
    expect(test).toBeFalsy();
    expect(test1).toBeFalsy();
    expect(test2).toBeFalsy();
    expect(test3).toBeFalsy();
    expect(test4).toBeTruthy();
    expect(test5).toBeTruthy();
  });
});
