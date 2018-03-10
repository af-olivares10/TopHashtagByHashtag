import React, { Component } from 'react';
import { Form,  Input, Button } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import Result from './Result.js'
import ModalHistorial from "./ModalHistorial"
import { Rate } from 'antd';
const { TextArea } = Input;
const FormItem = Form.Item;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      error: false,
      tag:"",
      loading:false,
      tagsHistorial:[]
    };
  }
  componentDidMount ()
  {
    this.actualizarHistorial();
  }
  actualizarHistorial = ()=>
  {
    fetch('/api/tags')
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.success){
        this.setState({tagsHistorial:responseJson.tags});
      }
      else{
        console.log(responseJson);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.hashtagQuery(values);

      }
    });
  }
  hashtagQuery = (values)=>{
    this.setState({loading:true})
    values.hashtag = values.hashtag.startsWith("#")?values.hashtag.split("#")[1]:values.hashtag;
    return fetch("https://www.instagram.com/explore/tags/"+values.hashtag+"/?__a=1").then((response) => response.json())
    .then((responseJson) => {
      let TTags = [];
      let dCount = {};
      for(let edge of responseJson.graphql.hashtag.edge_hashtag_to_top_posts.edges){
        if(edge.node.edge_media_to_caption.edges[0]){
          let text = edge.node.edge_media_to_caption.edges[0].node.text;
          for(let x of text.split(" ")){
            let w = x.toLowerCase();
            if(w.startsWith("#") && w!==("#"+values.hashtag.toLowerCase())){
              if(!dCount[w]){
                dCount[w] = 0;
              }
              dCount[w] += 1;
            }
          }

        }
      }
      for(let tag in dCount){
        TTags.push({
          tag: tag,
          count: dCount[tag]
        });
      }
      TTags.sort(function(a, b) {
        return parseFloat(b.count) - parseFloat(a.count);
      });
      if(TTags.length>10)
      TTags.splice(10,TTags.length-10)
      this.setState({tag:values.hashtag,tags:TTags,error:false, loading:false});
      let data = {};
      data.tag = "#"+values.hashtag;
      fetch('/api/tag', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then((response) => response.json())
      .then((responseJson) => {
        if(!responseJson.success)
        console.log(responseJson);
        this.actualizarHistorial();
      })
      .catch((error) => {
        console.error(error);
      });
    })
    .catch((error) => {
      this.setState({tag:values.hashtag,error:true, loading:false});
    });
  }

  showResults = () =>{
    if(!this.state.loading){
      if(!this.state.error){
        if(this.state.tags.length !==0)
        return(
          <div className = "results">
            <h2 style={{ textAlign:"center"}}>Results for {this.state.tag}</h2>
            {this.state.tags.map(this.showResult)}
          </div>
        )
      }
      else return this.showError();
    }
    else
    return (<div className="loader" ></div>);
  }
  showResult = (ref, i) =>{
    return (
      <Result  click = {this.hashtagQuery} tag= {ref.tag} key=  {i} count ={ref.count}/>
    )
  }
  showError = ()=>{
    return (
      <h2 className="error">
        No results for {this.state.tag}
      </h2>
    );
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (

      <div>
        <h1 className = "titulo">Top Hashtags by hashtag</h1>
        <h2 style={{textAlign:"center"}}>Enter a Hashtag you want to find the top Hashtags for</h2>

        <Form onSubmit={this.handleSubmit} className=" in-form form">
          <FormItem>
            {getFieldDecorator('hashtag', {
              rules: [{ required: true }],
            })(
              <Input  className = "input" placeholder="#meow"/>
            )}
          </FormItem>
        </Form>
        <div className="button">
          <button type="button" className="btn btn-success" data-toggle="modal"  data-target="#history">History</button>
        </div>
        <ModalHistorial click  = {this.hashtagQuery} tags = {this.state.tagsHistorial}/>
        {this.showResults()}

      </div>

    );
  }
}
const WrappedApp = Form.create()(App);

export default WrappedApp;
