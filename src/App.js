import React from 'react';
import './App.css';
import todos from './model';
//MVC

//Model
//const todos = [
  //{
    //todoTitle         : `first step 🤟`,
    //todoResponsible   : `Xavier And Joann`,
    //todoDescription   : `My first step with React in very cool environment`,
    //todoPriority      : `High`,
    //done              : true
  //},
  //{
    //todoTitle         : `Mastering ES6 💫 `,
    //todoResponsible   : `Xavier and Maxim`,
    //todoDescription   : `Promises, Destructure, Rest and Spread, Scoping, Template strings with function,
    //for of and not for in, ES6 Tooling, Generator for Ajax flow Control looping Generator`,
    //todoPriority      : `medium`,
    //done              : false
  //},
  //{
    //todoTitle         : `Learn Redux 🔥`,
    //todoResponsible   : `Xavier`,
    //todoDescription   : `Manage the State, accurate?`,
    //todoPriority      : `medium`,
    //done              : false
  //},
  //{
    //todoTitle         : `Learn... never stop to run ⚽️`,
    //todoResponsible   : `Xavier`,
    //todoDescription   : `Animation (React Motion), React Native, Firebase`,
    //todoPriority      : `high`,
    //done              : true
  //},
  //{
    //todoTitle         : `Vim with React ♽`,
    //todoResponsible   : `Xavier`,
    //todoDescription   : `Code Quality with ESLint, configure the dot .eslint and setup Airbnb linting`,
    //todoPriority      : `high`,
    //done              : true
  //}
//];
class AddTodoList extends React.Component {
  //Controller
  constructor() {
    super();
    this.state = {
      todoTitle       : '',
      todoResponsible : '',
      todoDescription : '',
      todoPriority    : 'low',
      done            : false
    }
  }
  handleTodoSumit = event => {
    event.preventDefault()
    //send the object to parent component with the props: onAddTodo
    this.props.onAddTodo(this.state) 
    //re-initialize the state
    this.setState({
      todoTitle       : '',
      todoResponsible : '',
      todoDescription : '',
      todoPriority    : 'low',
      done            : false
    });
  }
  handleInputChange = e => {
    let {name, value} = e.target //object
    this.setState({
      [name]: value
    });
  }
  //Vue
  render() {
    return (
      <div>
        <h3 className="title text-primary bg-light text-center mb-3 mt-3">Frontend Developer - To Do List </h3>
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
                onChange={this.handleInputChange}
                className="form-control ">
              <option>lowest</option>
              <option>low</option>
              <option>medium</option>
              <option>high</option>
              <option>highest</option>
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
    this.state = {todos}
  }
  handleRemoveTodo (index) {
    let todos = this.state.todos.filter( (e, i) => index !== i)
    this.setState({todos});
  }
  handleDoneTodo = index => {
    let todos = this.state.todos.map( (element,i) => {
      if (i === index) {
        element.done = !element.done
      }
      return element
    });
    this.setState({todos});
  }

  handleAddTodo = todo => {
   this.setState({todos: [...this.state.todos, todo]})
  }

  render() {
    console.log(this.state.todos);
    let sortMe = this.state.todos.sort( (a,b) => a.done - b.done)
    let todoLoop = sortMe.map( (todo,index) => {
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
          //is better to use library like React Bootstrap 4 ish and component
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
            total count: <span className="badge badge-info badge-total">{ this.state.todos.length }</span>
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
