import React, { Component } from 'react';
import TagHistorial from "./TagHistorial";
class ModalHistorial extends Component {
  constructor(props) {
    super(props);

  }

  mostrarHistorial = () =>{
      return this.props.tags.map(this.mostrarTags)
  }
  mostrarTags = (ref, i) =>{
    return (
      <TagHistorial tag = {ref.tag} key = {i} click = {this.props.click}  data-dismiss="modal"/>
    )
  }
  handleClick = (value)=>{
    this.props.click()
  }
  render() {
    if( this.props.tags.length !==0)
    return (
      <div className="container">
        <div className="modal fade" id="history" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">×</button>
                <h4 className="modal-title">History</h4>
              </div>
              <div className="modal-body">

                {this.mostrarHistorial()}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>


            </div>
          </div>
        </div>
      </div>
    );
    else
    return (
      <div className="container">
        <div className="modal fade" id="historial" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">×</button>
                <h4 className="modal-title">Historial</h4>
              </div>
              <div className="modal-body">

                <div className="container" style = {{width: "100%"}}>
                  No hay historial
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalHistorial;
