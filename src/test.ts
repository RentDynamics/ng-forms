// This file is required by karma.conf.js and loads recursively all the .spec and framework files
import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/weak-map';
import 'core-js/es6/set';

import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import 'script-loader!../node_modules/moment/moment.js';
import 'script-loader!../node_modules/moment-range/dist/moment-range.js';
import 'script-loader!../node_modules/moment-timezone/builds/moment-timezone-with-data-2010-2020.min.js';
import 'script-loader!../node_modules/jquery/dist/jquery.min.js';
import 'script-loader!../node_modules/bootstrap/dist/js/bootstrap.min.js';
import 'script-loader!../node_modules/pickmeup/js/jquery.pickmeup.min.js';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
