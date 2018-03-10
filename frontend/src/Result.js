import React, {Component} from 'react';

class Result extends Component{
  constructor(props) {
    super(props);

  }
  handleClick = () =>{

    let values = {};
    values.hashtag = this.props.tag;
    this.props.click(values)
  }
  render() {
    return (
      <div onClick = {this.handleClick}  className = "result">
        <a>{this.props.tag}</a>
        <h2>{this.props.count}</h2>
        <hr/>
      </div>
    )
  }
}
export default Result ;
