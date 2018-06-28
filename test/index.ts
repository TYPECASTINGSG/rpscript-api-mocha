import {RpsContext} from 'rpscript-interface';
import RpsMocha from '../src/index';
import * as m from 'mocha';
import {expect} from 'chai';
import { TestUtils } from '../src/utils';

let $CONTEXT;

m.beforeEach(() => {
  $CONTEXT = new RpsContext();
})


m.describe('Mocha', () => {

  m.it('parse BDD chain', async function() {
    let rps = new RpsMocha($CONTEXT);
    
    // expect(11).to.be.equals(12);

    // let util = new TestUtils();
    // util.parseChaiExpect(11,12,'to','be','equals');
    
    await rps.expect($CONTEXT,{},11,11,"to","be","equals");
    
  });

  m.it('should run util test', async function () {
    let rps = new RpsMocha($CONTEXT);

    let s = await rps.testSuite($CONTEXT,{},"suite 1");
    
    await rps.testCase($CONTEXT,{},"tc 1",async function() {

      await rps.expect($CONTEXT,{},22,22,"to","be","equals");
    
    });
    
    let result = await rps.testReport($CONTEXT,{});
  });

})
