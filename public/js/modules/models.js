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
        DeleteModel: function(){
            this.destroy();
        }
    });

    var TodoCollection = Backbone.Collection.extend({
        model: TodoModel,
        url:'/api/todos/',
        initialize: function(){
            this.on('remove', this.hideModel, this);
            this.fetch();
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

    return {
        TodoModel: TodoModel,
        TodoCollection: TodoCollection

    };
});
