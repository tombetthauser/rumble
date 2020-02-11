import React from "react";
import { withRouter } from "react-router-dom";


class EditForm extends React.Component{
  constructor(props){
    super(props);
  }



  render(){
    return(
      <h1>{this.props.user.username}</h1>
    )
  }
}


export default EditForm;