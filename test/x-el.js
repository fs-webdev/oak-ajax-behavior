import '@polymer/polymer/polymer-legacy.js';
import '../oak-ajax-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
Polymer({
  is: 'x-el',
  behaviors: [
    OakAJAXBehavior
  ]
});
