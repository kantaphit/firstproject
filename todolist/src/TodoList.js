import React from "react";
import "./TodoList.css";

const UPDATE = 0;
const DELETE = 1;
const CHECK = 2;

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.todoList = JSON.parse(localStorage.getItem("todoList"))
      ? JSON.parse(localStorage.getItem("todoList"))
      : [];
    this.state = {
      value: "",
      list: this.todoList,
    };
  }

  onControlTodoList = (value, list, type) => {
    let index = this.getIndexBySerial(list.serial);
    if (index !== -1) {
      switch (type) {
        case UPDATE:
          list.value = value;
          break;
        case DELETE:
          this.todoList.splice(index, 1);
          break;
        case CHECK:
          list.checked = !list.checked;
          break;
        default:
          break;
      }
      localStorage.setItem("todoList", JSON.stringify(this.todoList));
      this.setState({ list: this.todoList });
    }
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    const data = this.state.value;
    if (data) {
      const datasets = {
        value: data,
        serial: this.getSerial(),
        checked: false,
      };
      this.todoList.push(datasets);
      localStorage.setItem("todoList", JSON.stringify(this.todoList));
    } else {
      window.alert("cannot add blank list please fill list");
    }
  };

  getIndexBySerial = (serial) => {
    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].serial === serial) {
        return i;
      }
    }
    return -1;
  };

  //generate index for each list for indicate update / delete / check list
  getSerial = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  render() {
    const todoLists = this.state.list;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h1>TODO LIST</h1>
          </div>
          <div className="formContainer">
            <div className="col-md-8">
              <form onSubmit={this.handleSubmit}>
                <label>
                  WHAT TO DO :{" "}
                  <input
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </label>
                <input type="submit" value="Add" />
              </form>
            </div>
          </div>
          <div>
            <ul>
              {todoLists
                .slice(0)
                .reverse()
                .map((list) => (
                  <li className="listContainer" key={list.serial}>
                    <label>
                      <input
                        type="checkbox"
                        checked={list.checked}
                        onChange={(e) =>
                          this.onControlTodoList(e.target.value, list, CHECK)
                        }
                      />
                    </label>
                    <input
                      type="text"
                      value={list.value}
                      onChange={(e) =>
                        this.onControlTodoList(e.target.value, list, UPDATE)
                      }
                    />
                    <button
                      type="button"
                      className="button"
                      onClick={(e) =>
                        this.onControlTodoList(e.target.value, list, DELETE)
                      }
                    >
                      Delete
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoList;
