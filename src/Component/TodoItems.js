import React from "react";

class TodoItems extends React.Component {
	constructor(props){
		super(props);
		this.Create = this.Create.bind(this);
	}
	Create(item){
		return <li onClick={() => this.delete(item.key)} key={item.key}>{item.text}</li>
	}
	delete(key){
		this.props.delete(key);
	}
	render(){
		var todo = this.props.entries;
		var listItems = todo.map(this.Create);

		return(
			<ul className="theList">
				{listItems}
			</ul>
		);
	}
};

export default TodoItems;