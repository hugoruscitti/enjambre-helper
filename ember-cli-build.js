"use strict";

const EmberApp = require("ember-cli/lib/broccoli/ember-app");

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {});

  app.import("vendor/dagre-d3.js");
  app.import("vendor/d3.v4.min.js");
  app.import("vendor/dragscroll.js");

  return app.toTree();
};
