define( ["backbone"], function(Backbone) {

    var TodoModel =  require("models").TodoModel;

    var TodoView = Backbone.View.extend({
        template: _.template('<h3 class="<%= status %>"><div id="<%= _id %>" class="btn btn-mini btn-danger delet">Delet</div> <input id="<%= _id %>" type=checkbox <%= status == "true" ? "checked=checked" : "" %>/> <%= name %> </h3>'),

        events: {
            'change input': 'toggleStatus',
            'click .delet': 'DeletModel'
        },

        initialize: function(){
            this.model.on('change', this.render, this);
            this.model.on('destroy hide', this.remove, this);
            //this.model.fetch();
        },

        render: function(){
            //var html =
            this.$el.html(this.template(this.model.toJSON()));
            //$('.container').html(html);

            return this;
        },

        remove: function(){
            this.$el.remove();
        },

        toggleStatus: function(evt){
            this.model.id = evt.target.id;
            this.model.toggleStatus();
        },
        DeletModel: function(evt){
            this.model.id = evt.target.id;
            this.model.DeletModel();
        }
    });

    //var todoView = new TodoView({model: new TodoModel({ id:'509cf96665c9a43410000001'})});

    var TodosView = Backbone.View.extend({
        initialize: function(){
            this.collection.on('add', this.addOne, this);
            this.collection.on('reset', this.addAll, this);
            this.collection.on('all', this.addAll, this);
        },

        template: _.template('<input id="new-todo" type="text" placeholder="What needs to be done? "> <div> Total Items : <%= total %></div>'),

        events: {
            'keypress #new-todo': 'addNew'
        },

        render: function(){
            this.addAll();
            return this;
        },

        addAll: function(){

            var total = this.collection.length;
            this.$el.html(this.template({total: total}));
            this.collection.forEach(this.addOne, this);
        },

        addOne: function(todo){
            var todoView = new TodoView({model: todo});
            this.$el.append(todoView.render().el);
        },
        addNew: function(event){

            if (event.keyCode != 13) return;
            if (!event.target.value) return;


            //alert(event.target.value);
            var todoModel = new TodoModel({name:event.target.value, status:false});
            todoModel.save();
            var todoView = new TodoView({model: todoModel});
            this.$el.append(todoView.render().el);
        }
    });


    return {
        TodoView: TodoView,
        TodosView: TodosView
    };
});
