define( ["backbone"], function(Backbone) {

    var TodoModel =  require("models").TodoModel;

    var TodoView = Backbone.View.extend({
        tagName: 'tr',
        className: 'warning',
        template: _.template('' +
            '<td><input id="<%= _id %>" type=checkbox <%= status == "true" ? "checked" : "" %>/></td>' +
            '<td><%= name %></td>' +
            '<td style="text-align: right">' +
                '<a id="<%= _id %>" class="btn btn-info edit"><span class="glyphicon glyphicon-pencil"></span></a>' +
                '<a id="<%= _id %>" class="btn btn-danger delete"><span class="glyphicon glyphicon-remove"></span></a>' +
            '</td>'),
        events: {
            'change input[type="checkbox"]': 'toggleStatus',
            'click .delete': 'DeleteModel',
            'click a.edit': 'EditModel',
            'click a.update': 'UpdateModel',
            'click a.cancel': 'Cancel',
            'keypress #edit-todo': 'UpdateModel'
        },
        initialize: function(){
            this.model.on('change', this.render, this);
            this.model.on('destroy hide', this.remove, this);
        },
        render: function(){
            //var html =
            if(this.model.get('status') == "true")
                this.$el.removeClass().addClass('success');
            this.$el.html(this.template(this.model.toJSON()));
            //$('.container').html(html);

            return this;
        },
        remove: function(){
            this.$el.remove();
        },
        toggleTodoColor: function(){
            if(this.model.get('status') == "true"){
                this.$el.removeClass().addClass('success');
            }else{
                this.$el.removeClass().addClass('warning');
            }
        },
        correctElement: function(ele){
            var $element;
            if($(ele.target).hasClass('glyphicon')){
                $element = $(ele.target).parent();
            }else{
                $element = $(ele.target);
            }
            return $element;
        },
        toggleStatus: function(evt){
            this.model.id = evt.target.id;
            this.model.toggleStatus();
            this.toggleTodoColor();
        },
        DeleteModel: function(evt){
            var $element = this.correctElement(evt);
            this.model.id = $element.attr('id');
            this.model.DeleteModel();
        },
        EditModel: function(e){
            var $element = this.correctElement(e),
                id = $element.attr('id'),
                $parentBox = $element.parents('tr'),
                $todoTd = $parentBox.find('td:nth-child(2)');
            this.model.id = id;
            //change button
            $element.removeClass('btn-info edit').addClass('btn-success update');
            $element.find('span').removeClass('glyphicon-pencil').addClass('glyphicon-ok');
            $element.before('<a id="'+id+'" class="btn btn-warning cancel"><span class="glyphicon glyphicon-minus"></span></a>');
            //change name with input element
            $todoTd.html('<input type="text" data-id="'+this.model.get('_id')+'" id="edit-todo" class="form-control" value="'+this.model.get('name')+'" placeholder="What needs to be done?">');
        },
        UpdateModel: function(e){
            if (event.keyCode == 13 || event.keyCode == 0){
                var $element = this.correctElement(e),
                    $parentBox = $element.parents('tr'),
                    input = $parentBox.find('input#edit-todo'),
                    id = input.attr('data-id');
                this.model.id = id;
                this.model.set('name', input.val());
                this.model.save();
                input.focus();
            }
        },
        Cancel: function(){
            this.render();
        }
    });

    //var todoView = new TodoView({model: new TodoModel({ id:'509cf96665c9a43410000001'})});

    var TodosView = Backbone.View.extend({
        initialize: function(){
            this.collection.on('add', this.addOne, this);
            this.collection.on('reset', this.addAll, this);
            this.collection.on('all', this.count, this);
        },
        tagName: 'table',
        className: 'table table-hover',
        template: _.template('<input type="text" id="new-todo" class="form-control" placeholder="What needs to be done?"><p></p><pre><%= done %> of <%= total-done %> remaining <span style="float: right;">Total Items : <%= total %></span></pre>'),

        events: {
            'keypress #new-todo': 'addNew'
        },
        count: function(){
            var total = this.collection.length,
                counter = 0;
            this.collection.forEach(function(todo){
                counter += todo.get('status') == 'true' ? 1 : 0;
            });
            this.$el.find('thead td').html(this.template({total: total, done: counter}));
        },
        render: function(){
            this.$el.append('<tbody></tbody>');
            this.addAll();
            this.$el.prepend('<thead><tr class="active"><td colspan="3"></td></tr></thead>');
            return this;
        },

        addAll: function(){
            this.collection.forEach(this.addOne, this);
        },

        addOne: function(todo){
            var todoView = new TodoView({model: todo});
            this.$el.find('tbody').append(todoView.render().el);
        },
        addNew: function(event){

            if (event.keyCode != 13) return;
            if (!event.target.value) return;

            //alert(event.target.value);
            this.collection.create({name:event.target.value, status:false})
            event.target.value = '';
            $(event.target).focus();
        }
    });


    return {
        TodoView: TodoView,
        TodosView: TodosView
    };
});
