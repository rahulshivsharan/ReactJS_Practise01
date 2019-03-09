import React from 'react';

export default class App extends React.Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			"items" : this.props.items,
			"disabled" : true
		}
	}

	componentDidMount(){
		this.setState({
			"disabled" : false
		});
	}

	handleClick(){
		this.setState({
			"items" : this.state.items.concat("Item " + this.state.items.length)
		});
	}

	render(){
		return( 
			<div>
				<button onClick={this.handleClick} disabled={this.state.disabled}>Add Item</button>
				<ul>
					{
						this.state.items.map(function(item,index){
							return <li key={index}>{item}</li>
						})
					}
				</ul>
			</div>
		);		
	}
}