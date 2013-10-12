// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file.
  deps: ["main"],

  paths: {
    // JavaScript folders.
    libs: "js/libs",
    modules: "js/modules",

    // Libraries.
    jquery: "require-jquery",
    underscore: "libs/underscore",
    backbone: "libs/backbone",
    routes: "modules/routes",
    models: "modules/models",
    views: "modules/views"
  },

  shim: {
    // Backbone library depends on underscore and jQuery.
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },

    deep: {
          deps: ["underscore","backbone"]
    },

    binder: {
          deps: ["underscore", "backbone"]
    },

    relational: {
      deps: ["underscore","backbone"]
    },

    main: {
        deps: ["jquery","underscore", "backbone", "models", "routes",  "views"],
        exports: "Main"
    },

   routes: {
       deps: ["views"]
   },

  views: {
      deps: ["jquery","underscore", "backbone"]
  },

  models: {
      deps: ["jquery","underscore", "backbone" ]
  }





    // Backbone.LayoutManager depends on Backbone.
    //"plugins/backbone.layoutmanager": ["backbone"]
  }

});
