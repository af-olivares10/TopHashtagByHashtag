import React, { Component } from 'react';
class TagHistorial extends Component {
  constructor(props) {
    super(props);
  }
  handleClick = ()=>{
    this.props.click({hashtag:this.props.tag})
  }
  render() {
    return (
      <div className = "tagHistorial"  onClick = {this.handleClick} style= {{textAlign:"center"}}>
        {this.props.tag}
        <hr/>
      </div>
    );
  }
}
export default TagHistorial;
