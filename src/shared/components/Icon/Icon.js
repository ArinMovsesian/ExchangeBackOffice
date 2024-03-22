import React from 'react';
import '../../../utils/fonts/fontawesome/web-fonts-with-css/css/fontawesome-all.min.css';
import './Icon.css'

class FaIcon extends React.Component{
  constructor(props){
      super(props);
      this.state={};

  }
  componentDidMount(){

  }
  componentDidUpdate(prevProp,prevState){

  }
  render(){
   
    return (
       
        <React.Fragment>
        <i className={this.props.name} style={{fontSize:this.props.size,color:this.props.color}} ></i>
         </React.Fragment>
     
      
       
    )
  }

};
FaIcon.defaultProps={
    size:25,
 
}
export default FaIcon