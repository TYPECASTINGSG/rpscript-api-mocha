/**
 * @module Mocha
 */

import {Suite,Test, Runner} from 'mocha';
import {TestUtils, TestCaseOpts} from './utils';
import {RpsContext,RpsModule,rpsAction,rpsActionSkipErrHandling} from 'rpscript-interface';
import { MochaContext } from './context';

@RpsModule("mocha")
export default class RpsMocha {

  static util = new TestUtils;

  public constructor (ctx?:RpsContext) {
    if(ctx) ctx['mocha'] = new MochaContext;
  }

  @rpsAction({defaultName:'testSuite'})
  async testSuite (ctx:RpsContext,opts:{}, suitename:string) : Promise<Suite> {

    return RpsMocha.util.createSuite(ctx['mocha'], {}, suitename);
  }

  @rpsAction({defaultName:'testCase'})
  async testCase (ctx:RpsContext, opts:TestCaseOpts,
    testname:string, fn:()=>void) : Promise<Test> {

    return RpsMocha.util.createTestCase(ctx['mocha'],opts,testname,fn);
  }

  @rpsActionSkipErrHandling({defaultName:'expect'})
  async expect (ctx:RpsContext, opts:TestCaseOpts,
    expect:any, actual:any, ...chains:string[]) : Promise<void> {
  
    RpsMocha.util.parseChaiExpect(expect,actual,chains); 
    
    return Promise.resolve();
  }

  @rpsAction({defaultName:'testReport'})
  async testReport (ctx:RpsContext, opts:any) : Promise<Runner> {
    
    return RpsMocha.util.runTest(ctx['mocha'],opts);
  }

}


