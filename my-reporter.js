// my-reporter.js
var mocha = require('mocha');
module.exports = MyReporter;

function MyReporter(runner) {
  mocha.reporters.Base.call(this, runner);
  var passes = 0;
  var failures = 0;

  runner.on('pass', function(test){
    passes++;
    console.log('pass: %s', test.fullTitle());
  });

  runner.on('fail', function(test, err){
    failures++;
    console.log('fail: %s -- error: %s', test.fullTitle(), err.message);
  });

  runner.on('end', function(){
    console.log('end: %d/%d', passes, passes + failures);
  });
}

//   ctx.test.runner.on('start',(...param)=>{console.log('*** start:');console.log(param);});
//   ctx.test.runner.on('end',(...param)=>{console.log('*** end:');console.log(param);});
//   ctx.test.runner.on('pass',(...param)=>{console.log('*** pass:');console.log(param);});
//   ctx.test.runner.on('fail',(...param)=>{console.log('*** fail:');console.log(param);});
//   ctx.test.runner.on('test',(...param)=>{console.log('*** test:');console.log(param);});
//   ctx.test.runner.on('test end',(...param)=>{console.log('*** test end:');console.log(param);});
//   ctx.test.runner.on('suite',(...param)=>{console.log('*** suite:');console.log(param);});
//   ctx.test.runner.on('suite end',(...param)=>{console.log('*** suite end:');console.log(param);});