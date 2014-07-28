'use strict';

var path = require('path');
var fs   = require('fs');

function EmberCLIEmberComponentsAjax(project) {
  this.project = project;
  this.name    = 'Ember CLI ember-components';
}

function unwatchedTree(dir) {
  return {
    read:    function() { return dir; },
    cleanup: function() { }
  };
}

EmberCLIEmberComponentsAjax.prototype.treeFor = function treeFor(name) {
  if (name !== 'vendor') { return; }

  var treePath =  path.join('node_modules', 'ember-cli-components', 'node_modules');

  return unwatchedTree(treePath);
};

EmberCLIEmberComponentsAjax.prototype.included = function included(app) {
  this.app = app;
  var options = this.app.options.emberComponentsOptions || {enabled: true};

  if (options.enabled) {
    this.app.import('vendor/ember-components/vendor/ic-styled/main.js');
    this.app.import('vendor/ember-components/vendor/ember-utils/dist/globals/main.js');
    this.app.import('vendor/ember-components/dist/globals/main.js');
  }
};

module.exports = EmberCLIEmberComponentsAjax;
