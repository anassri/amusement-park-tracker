'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Parks', [
      { parkName: 'Six Flags', city: 'Atlanta', provinceState: 'Georgia', country: 'USA', opened: '1978-10-10', size: 'large', description: 'Really fun amusement park for the whole family. Rollercoasters', createdAt: new Date(), updatedAt: new Date() },
      { parkName: 'Six Flags2', city: 'Atlanta', provinceState: 'Georgia', country: 'USA', opened: '1978-10-10', size: 'large', description: 'Really fun amusement park for the whole family. Rollercoasters', createdAt: new Date(), updatedAt: new Date() },
      { parkName: 'Six Flags3', city: 'Atlanta', provinceState: 'Georgia', country: 'USA', opened: '1978-10-10', size: 'large', description: 'Really fun amusement park for the whole family. Rollercoasters', createdAt: new Date(), updatedAt: new Date() },
      { parkName: 'Six Flags4', city: 'Atlanta', provinceState: 'Georgia', country: 'USA', opened: '1978-10-10', size: 'large', description: 'Really fun amusement park for the whole family. Rollercoasters', createdAt: new Date(), updatedAt: new Date() }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Parks', null, {});

  }
};
