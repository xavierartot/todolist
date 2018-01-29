import React from 'react';
import './App.css';

const todos = [
  {
    todoTitle: 'first1',
    todoResponsible: 'Xavier',
    todoDescription: 'My first step',
    todoPriority: 'low',
    done : false
  },
  {
    todoTitle: 'first2',
    todoResponsible: 'Maximilien',
    todoDescription: 'My secon step',
    todoPriority: 'medium',
    done : false
  },
  {
    todoTitle: 'first3',
    todoResponsible: 'Joann',
    todoDescription: 'My third step',
    todoPriority: 'high',
    done : false
  }
];
class AddTodoList extends React.Component {
  constructor() {
    super();
    this.state = {
      todoTitle: '',
      todoResponsible: '',
      todoDescription: '',
      todoPriority: 'low',
      done : false
    }
  }
  handleTodoSumit = (event) => {
    event.preventDefault()
    //send the object to parent component with the props  onAddTodo
    this.props.onAddTodo(this.state) 
    //reinitialize the state
    this.setState({
      todoTitle: '',
      todoResponsible: '',
      todoDescription: '',
      todoPriority: 'low',
      done : false
    });
  }
  handleInputChange = (e) => {
   let nameProperty = e.target.name 
   let val =  e.target.value
    console.log(nameProperty, val);
    this.setState({
      [nameProperty]: val
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleTodoSumit}>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Title</label>
            <div className="col-sm-10">
              <input 
                name='todoTitle' 
                value={ this.state.todoTitle}
                onChange={this.handleInputChange}
                type="text" 
                className="form-control" 
                id="todoTitle" 
                placeholder="todoTitle" />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Responsible</label>
            <div className="col-sm-10">
              <input 
                name='todoResponsible' 
                value={ this.state.todoResponsible}
                onChange={this.handleInputChange}
                type="text" 
                className="form-control" 
                id="todoResponsible" 
                placeholder="Responsible" />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Description</label>
            <div className="col-sm-10">
              <textarea 
                name='todoDescription' 
                value={ this.state.todoDescription}
                onChange={this.handleInputChange}
                type="text" 
                className="form-control" 
                id="todoDescription" 
                placeholder="Description">
              </textarea>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">priority</label>
            <div className="col-sm-10">
              <select 
                name="todoPriority" 
                value={ this.state.todoPriority}
                onChange={this.handleInputChange}>
                className="form-control ">
              <option>low</option>
              <option>medium</option>
              <option>high</option>
            </select>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-10 offset-sm-2">
              <button type="text" className="btn btn-primary">Add</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos
    }
  }
  handleRemoveTodo (index) {
    let todos = this.state.todos.filter( (element, i) => {
      return index !== i
    })
    this.setState({
      todos
    });
  }
  handleDoneTodo = (index) => {
    let todos = this.state.todos.map( (element,i) => {
      if (i === index) {
        element.done = !element.done
      } 
      return element
    });
    this.setState({
      todos
    }); 
  }
  
  handleAddTodo = (todo) => {
   //console.log(todo);
   this.setState({
     todos:  [...this.state.todos, todo]
   }); 
  }
  
  render() {
    let todoLoop = this.state.todos.map( (todo,index) => {
      return <li className="list-group-item" key={index}>
        <h4 className="list-group-item-heading">
          {todo.todoTitle} <small><span className="badge badge-info">{todo.todoPriority}</span></small>
        </h4>
        <p className="list-group-item-heading">
          <i className="fa fa-user"></i>
          {todo.todoResponsible}
        </p>
        <p className="list-group-item-heading">
          {todo.todoDescription}
        </p>
        <button className="btn btn-danger" onClick={() => this.handleRemoveTodo(index)}>
          <i className="fa fa-trash"></i>
          delete
        </button>

        <button 
          className={todo.done === true ? 'btn btn-info' : 'btn btn-danger' } 
          onClick={() => this.handleDoneTodo(index)}>
          { 
          //is better to a library React Bootstrap 4 to avoid the syntax problem
            todo.done === true ? [<i className="fa fa-times"></i>, 'undone'] : [<i className="fa fa-thumbs-up"></i>, 'done']
          }
        </button>
      </li>
    }) //end loop

    return (
      <div className='container container-tda'>
        <AddTodoList onAddTodo={this.handleAddTodo}/>
        <hr />
        <div className="row">
          <h4>
            total count: 
              <span className="badge badge-info badge-total">{ this.state.todos.length }</span>
          </h4>
        </div>
        <div className="row tda">
          <ul className="list-group">
            { todoLoop }
          </ul>

        </div>
      </div>
    );
  }
}


