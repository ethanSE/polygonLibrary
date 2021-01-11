// Test runner

// Application logic for the test runner
let _app: any = {};

// Holder of all tests
_app.tests = require('./unit.js');

// Run all the tests, collecting the errors and successes
_app.runTests = () => {
  var successes = 0;
  var errors: TestNameError[] = [];
  let testNames = Object.keys(_app.tests);

  //switch console color to green for printing test sucess names
  console.log('\x1b[32m')

  // run tests
  testNames.forEach((testName) => {
    try {
      // run each test
      // tests are functions and are passed a done function to execute on the end if sucess
      _app.tests[testName](() => console.log(testName))
      //if sucessful increment successes
      successes++;
    } catch (e) {
      // if test is unsuccessful it throws an error
      // accumulate errors for display later
      errors.push(
        {
          'name': testName,
          'error': e
        }
      )
    }
  })

  // switch console color back to white
  console.log('\x1b[0m')

  // produce report
  _app.produceTestReport(testNames.length, successes, errors)
};

// Product a test outcome report
_app.produceTestReport = function (limit: number, successes: number, errors: TestNameError[]) {
  console.log("\n--------BEGIN TEST REPORT---------\n");
  console.log("Total Tests: ", limit);
  console.log("Pass: ", successes);
  console.log("Fail: ", errors.length);

  // If there are errors, print them in detail
  if (errors.length > 0) {
    console.log("\n--------BEGIN ERROR DETAILS-------\n");
    errors.forEach((testError: TestNameError) => {
      console.log(`\x1b[31m${testError.name}\x1b[0m`);
      console.log(testError.error, '\n');
    });
    console.log("\n--------END ERROR DETAILS---------");
  }
  console.log("\n--------END TEST REPORT-----------\n");
  process.exit(0);
};

// Run the tests
_app.runTests();

module.exports = _app;
