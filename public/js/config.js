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
    //https://github.com/powmedia/backbone-deep-model
    deep: "libs/deep-model",
    //https://github.com/theironcook/Backbone.ModelBinder
    //https://github.com/theironcook/Backbone.ModelBinder/blob/master/sandbox/Example_NestedAttributes.html
    binder: "libs/Backbone.ModelBinder",
    //https://github.com/PaulUithol/Backbone-relational#backbonerelationalmodel
    relational: "libs/backbone-relational",
    //https://github.com/tbranyen/backbone.layoutmanager
    layoutManager: "libs/backbone.layoutmanager",
    alpha: "modules/jquery.alpha",
    beta: "modules/jquery.beta",
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
        deps: ["jquery","underscore", "backbone", "deep","binder","relational", "models", "alpha", "beta", "routes",  "views"],
        exports: "Main"
    },

   routes: {
       deps: ["views"]
   },

  views: {
      deps: ["jquery","underscore", "backbone", "deep"]
  },

  models: {
      deps: ["jquery","underscore", "backbone", "deep" ]
  }





    // Backbone.LayoutManager depends on Backbone.
    //"plugins/backbone.layoutmanager": ["backbone"]
  }

});
