/**
 * Created with JetBrains WebStorm.
 * User: zia2
 * Date: 11/2/12
 * Time: 4:40 PM
 * To change this template use File | Settings | File Templates.
 */

define( ["backbone"], function(Backbone) {

    var TodoView = require("views").TodoView;
    var TodosView = require("views").TodosView;

    var TodoModel =  require("models").TodoModel;
    var TodoCollection =  require("models").TodoCollection;

    var TodoApp = new (Backbone.Router.extend({
        routes: {
            "": "index",
            "todos/:id": "show"
        },

        initialize: function(){
            this.todoItems = new TodoCollection();
            this.todosView = new TodosView({collection: this.todoItems});
            this.todosView.render();
        },

        index: function(){
            $('.container_1').html(this.todosView.el);
        },

        start: function(){
            Backbone.history.start();
        },

        show: function(id){
            this.todoItems.focusOnTodoItem(id);
        }
    }));

    TodoApp.start()

    return {TodoApp: TodoApp};
});
