define( ["backbone"], function(Backbone) {


    var TodoModel = Backbone.Model.extend({
        defaults:{
            _id: null,
            name: '',
            status: ''
        },

        urlRoot:'/api/todos/',

        toggleStatus: function(){

            if(this.get('status') == 'false'){
                this.set({ 'status': 'true'});
            }else{
                this.set({'status': 'false'});
            }

            this.save();
        },

        DeletModel: function(){

            this.destroy();
        }
    });

    var TodoCollection = Backbone.Collection.extend({
        model: TodoModel,
        url:'/api/todos/',

        initialize: function(){
            this.on('remove', this.hideModel, this);
        },

        hideModel: function(model){
            model.trigger('hide');
        },

        focusOnTodoItem: function(id) {
            var modelsToRemove = this.filter(function(todoItem){
                return todoItem.id != id;
            });

            this.remove(modelsToRemove);
        }

    });


    /*var todoCollection = new TodoCollection();
    todoCollection.fetch()
    console.log(todoCollection.reset());
    console.log(todoCollection.models)*/

    /*      var todoModel = new TodoModel({id:'509cf96665c9a43410000001'});
     todoModel.fetch();

     var TodoView = Backbone.View.extend({

     template: _.template('<h3><%= name %></h3>'),
     initialize: function(){
     this.model.on('change', this.render, this);
     this.model.on('destroy hide', this.remove, this);
     },
     render:function(){
     this.$el.html(this.template(this.model.toJSON()));
     return this;
     }

     });

     var todoView = new TodoView({model:todoModel});
     console.log(todoView.el); */

    /*var todoModel = new TodoModel({id:'509cf96665c9a43410000001'});
    todoModel.fetch();
    todoModel.set({name:'Arsalan',status:'false'});
    todoModel.save();*/

    /*var todoModel = new TodoModel({id:'509d4b9eb3fc231c1c000002'});
    todoModel.fetch();
    todoModel.destroy();*/


    /*var TodoCollection = Backbone.Collection.extend({
        model:TodoModel,
        url:'/api/todos'
    });

    var todoCollection = new TodoCollection();
    todoCollection.fetch();
    console.log(todoCollection.filter(function(todoModel){
        return todoModel.get('status') === 'true';
    }));*/

    //console.log(todoCollection.length);


    return {
        TodoModel: TodoModel,
        TodoCollection: TodoCollection

    };
});
