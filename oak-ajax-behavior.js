import '@polymer/polymer/polymer-legacy.js';
var readCookie = function(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
};
var _sessionId;
var _ajaxBase;
var _instances = [];
var _headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

var getAjaxBase = function(){
  if(~location.origin.indexOf('localhost')){
    return location.origin;
  } else {
    return FS.baseUrl;
  }
}
/**
 * @polymerBehavior OakAJAXBehavior
 */
window.OakAJAXBehavior = {
  properties: {
    /**
     * An object containing an object with the
     * properly formatted auth header
     * @type {Object}
     */
    authHeaders: {
      type: Object,
      readOnly: true,
      notify: true
    },
    /**
     * The base url for ajax requests
     * @type {String}
     */
    ajaxBase: {
      type: String,
      readOnly: true,
      notify: true,
      value: getAjaxBase
    },

  },

  /**
   * A getter for the sessionId that will be used for
   * FamilySearch.org requests
   * @return {String} The actual session ID
   */
  get sessionId() {
    return _sessionId;
  },

  /**
   * A setter for the sessionId that will automatically
   * update all consuming elements' `authHeaders` object
   * @param  {String} val The new sessionId
   */
  set sessionId(val) {
    _sessionId = val;
    if(this.sessionId) {
      _headers.Authorization = 'Bearer ' + this.sessionId;
    }
    _instances.forEach(function(instance) {
      if (instance && instance._setAuthHeaders) {
        instance._setAuthHeaders(_headers)
      }
    });
  },

  /**
   * a getter for URL base that will properly route localhost,
   * FamilySearch.org domains, and others
   * @type {String}
   */
  get ajaxBase() {
    return getAjaxBase();
  },

  /**
   * a setter for URL base that will properly route localhost,
   * FamilySearch.org domains, and others
   * @type {String}
   */
  set ajaxBase(val) {
    _ajaxBase = val;
    _instances.forEach(function(instance) {
      if (instance && instance._setAjaxBase) {
        instance._setAjaxBase(_ajaxBase)
      }
    });
  },

  ready: function() {
    // Save off a ref to the consuming object so we can update
    // all of the components when needed
    _instances.push(this);

    // If a user is on FamilySearch.org or localhost:5000-5009 or 3000 or 8080 check the `fssessionid` cookie
    if (~location.origin.indexOf('familysearch.org') ||
        ~location.origin.search(/:(3|5|8)0(8|0)[0-9]/)) {

      this.sessionId = readCookie('fssessionid') || this.sessionId || _sessionId;
    }
  },

  /**
   * Clean up _instances.
   */
  detached: function() {
    _instances = _instances.filter(function(_instance) {
      return this !== _instance;
    }.bind(this));
  }
};
