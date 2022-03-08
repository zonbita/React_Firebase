import React, {Component} from "react";
import TodoItems from "./TodoItems";

class TodoList extends Component {
	constructor(props){
		super(props);
		this.state = {items: []};
		this.addItem = this.addItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}
	addItem(e){
		if(this.Input.value !== ""){
			var newItem = {
				text: this.Input.value, 
				key: Date.now()
			};
	
			this.setState((e) => {
				return {
					items: e.items.concat(newItem)
				};
			});
		
			this.Input.value = "";
		}
		console.log(this.state.items);
		e.preventDefault();
	}
	deleteItem(key){
		var filteredItems = this.state.items.filter(function(item) {
			return (item.key !== key);
		});
		
		this.setState({
			items: filteredItems
		});
	}
	render(){
		return(
			<div className="todoListMain">
			  <div className="header">
			    <form onSubmit={this.addItem}>
			      <input ref={(a) => this.Input = a} placeholder="Nhập thông tin">
			      </input>
			      <button type="submit">Thêm</button>
			    </form>
			    <TodoItems entries={this.state.items} delete={this.deleteItem} />
			  </div>
		        </div>
		);
	}
}

export default TodoList; 