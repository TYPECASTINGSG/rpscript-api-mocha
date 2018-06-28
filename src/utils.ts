import Mocha from 'mocha';
import {expect} from 'chai';
import {Suite,Test, Runner} from 'mocha';
import R from 'ramda';
import {MochaContext} from './context';

export interface TestCaseOpts {
    type?:string;
}
export interface ReportOptions {
    reporter:string;
    overwrite?:boolean;
    showPassed?:boolean;
    title?:string;
    reportFilename?:string;
    reportDir?:string;
    saveJson?:boolean;
    autoOpen?:boolean;
  }

export class TestUtils {

  createSuite(ctx:MochaContext,opts:{}, suitename:string) :Promise<Suite>{
      // @ts-ignore
      ctx.mocha = new Mocha();
      // @ts-ignore
      ctx.suite = Suite.create(ctx.mocha.suite, suitename);

      ctx.suite['enableTimeouts'](false);

      return Promise.resolve(ctx.suite);
  }

  TC_DEFAULT = {type:''};


  async createTestCase (ctx:MochaContext, opts:TestCaseOpts, testname:string, 
    fn:()=>void) : Promise<Test> {

    let options = R.merge(this.TC_DEFAULT, opts);

    if(!ctx.mocha) await this.createSuite(ctx,{},'');
  
    let t = new Test(testname,fn);
    // @ts-ignore
    ctx.suite.addTest(t);
  
    return Promise.resolve(t);
  }

   parseChaiExpect (expected:any, actual?:any, ...chains:any[]) {
    chains = R.flatten(chains);

    let res = expect(expected);
    let lastChain = chains.pop();
    
    chains.forEach(chain => res = res[chain]);

    if(actual) return res[lastChain](actual);
    else return res[lastChain];
  }

  
  DEFAULT_REPORTER = {reporter:'my-reporter.js'};
  // DEFAULT_REPORTER = {reporter:'mochawesome'};

  runTest (ctx:MochaContext, opts:any) : Promise<Runner> {
  
    return new Promise((resolve,reject) => {
  
      let options = R.merge(this.DEFAULT_REPORTER, opts);
  
      ctx.mocha.reporter(options.reporter,{
        reportTitle:options.reportTitle,
        reportFilename:options.reportFilename,
        showPassed:options.showPassed,
        overwrite:options.overwrite,
        autoOpen:options.autoOpen,
        quiet:true
      });
    
      ctx.runner = ctx.mocha.run( () => resolve(ctx.runner));
      
    });
  }
}