// utils/testdata.js
const testData = {
  validUsers: {
    standard: {
      username: 'standard_user',
      password: 'secret_sauce'
    },
    problem: {
      username: 'problem_user',
      password: 'secret_sauce'
    }
  },
  
  invalidUsers: {
    locked: {
      username: 'locked_out_user',
      password: 'secret_sauce',
      expectedError: 'Epic sadface: Sorry, this user has been locked out.'
    },
    wrongPassword: {
      username: 'standard_user',
      password: 'wrong_password',
      expectedError: 'Epic sadface: Username and password do not match'
    }
  },

  products: {
    backpack: 'sauce-labs-backpack',
    bikeLight: 'sauce-labs-bike-light',
    boltTshirt: 'sauce-labs-bolt-t-shirt'
  }
};

module.exports = testData;