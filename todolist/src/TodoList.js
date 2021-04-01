import React from 'react'
import './TodoList.css';

const UPDATE = 0
const DELETE = 1
const CHECK = 2

class TodoList extends React.Component {
  constructor(props){
    super(props);
    this.todoList = JSON.parse(localStorage.getItem("todoList")) ? JSON.parse(localStorage.getItem("todoList")) : []
    this.state = {
      value:"",
      list:this.todoList,
    };
  }

  onControlTodoList = (value,list,type) => {
    let index = this.getIndexBySerial(list.serial)
    if (index !== -1) {
      switch (type) {
        case UPDATE:
          if(value){
            list.value = value;
          }
          else {
            window.alert('cannot blank list please fill list');
          }
          break;
        case DELETE:
          this.todoList.splice(index, 1);
          break;
        case CHECK:
          list.checked = !list.checked
          break;
        default:
          break;
      }
      localStorage.setItem('todoList', JSON.stringify(this.todoList))
      this.setState({list: this.todoList})
    }
  }

    
  handleChange = (event) => {
    this.setState({value: event.target.value});
  }


  handleSubmit = (event) => {
    const data = this.state.value
    if(data){
      const datasets = {
        value: data,
        serial: this.getSerial(),
        checked: false
      }
      this.todoList.push(datasets);
      localStorage.setItem('todoList', JSON.stringify(this.todoList));
    }
    else {
      window.alert('please fill list')
    }
  }

  getIndexBySerial = (serial) => {
    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].serial === serial) {
        return i;
      }
    }
    return -1;
  }

  getSerial = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

    render(){
      const todoLists = this.state.list
        return(
            <div className="container">
            <h1>
                TODO LIST 
            </h1>
            <form onSubmit={this.handleSubmit}>
        <label>
          WHAT TO DO : {' '}
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Add" />
      </form>
      <div>
          {todoLists.slice(0).reverse().map(list => (
         <li className="todoList" key={list.serial} >
           <label>
             <input  type="checkbox" checked={list.checked} onChange={e => this.onControlTodoList(e.target.value,list,CHECK)} />
           </label>
           <input className = "todoListField" type="text" value={list.value} onChange={e => this.onControlTodoList(e.target.value,list,UPDATE)} />
           <button type="button" onClick={e => this.onControlTodoList(e.target.value,list,DELETE)}>
             Delete
           </button>
         </li>
          )
          )}
      </div>
            </div>
        )
    }
}

export default TodoList