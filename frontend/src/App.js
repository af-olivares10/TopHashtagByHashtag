import React, { Component } from 'react';
import { Form,  Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { Rate } from 'antd';
const { TextArea } = Input;
const FormItem = Form.Item;
class App extends Component {
constructor(props) {
  super(props);
  this.state = {
    tags: []
  };
}

handleSubmit = (e) => {
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
    if (!err) {

      return fetch(' https://www.instagram.com/explore/tags/'+values.hashtag+'/?__a=1').then((response) => response.json())
      .then((responseJson) => {

        let dCount = {};
        let TTags = [];
        for(let edge of responseJson.graphql.hashtag.edge_hashtag_to_top_posts.edges){
          let text = edge.node.edge_media_to_caption.edges[0].node.text;
          for(let w of text.split(" ")){
            if(w.startsWith("#") && w!==("#"+values.hashtag)){
              if(!(w in dCount)){
                dCount[w] = 0;
              }
              dCount[w] += 1;
            }
          }

          for(let tag in dCount){
            TTags.push({
              tag: tag,
              count: dCount[tag]
            });
          }

        }
        TTags.sort(function(a, b) {
        return parseFloat(b.count) - parseFloat(a.count);
      });
        this.setState({tags:TTags});
      })
      .catch((error) => {
        console.error(error);
      });

    }
  });
}
mostrarReferencias = () =>{
  if(this.state.tags.length!==0){

    return this.state.tags.map(this.mostrarReferencia)
  }
}
mostrarReferencia = (ref, i) =>{
  return (
    <div>
      <h1>ref.tag</h1>
      <h1>ref.count</h1>

      <hr/>

    </div>

  )
}
render() {
  const { getFieldDecorator } = this.props.form;
  return (
    <div>
<h1 style={{ height:"50px", width: "80%",  margin: "0 auto", textAlign:"center"}}>Top Hashtags by hashtag</h1>
<h2 style={{ height:"100px", width: "80%",  margin: "0 auto", textAlign:"center"}}>Enter a Hashtag you wish to find the top Hashtags for</h2>

    <Form onSubmit={this.handleSubmit} className=" in-form" style={{height: "200px", width: "80%",  margin: "0 auto"}}>
      <FormItem style={{  marginBottom: "5px" }}>
        {getFieldDecorator('hashtag', {
          rules: [{ required: true, message: 'Ingrese su comentario' }],
        })(
          <Input onPressEnter = {this.comentario} style={{width :"20%", resize: "none"}} />
        )}
      </FormItem>
      <FormItem  >
        <Button type="primary" htmlType="submit" className="login-form-button" >
          Ingresar
        </Button>
        <div style ={{  color: "green" }}>{this.state.m}</div>
      </FormItem>
    </Form>
    <h2 style={{ height:"100px", width: "80%",  margin: "0 auto", textAlign:"center"}}>Resultados</h2>

    {this.mostrarReferencias()}

</div>
  );
}
}
const WrappedNuevaReferencia = Form.create()(App);

export default WrappedNuevaReferencia;
