import Mocha from 'mocha';
import {Suite, Runner} from 'mocha';

export class MochaContext {
  suite?:Suite;
  mocha?:Mocha;
  runner?:Runner;
}
