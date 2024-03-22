import React from 'react'
import FaIcon from '../Icon/Icon';
import Step from './step'
import './step.css'


class Steps extends React.Component{
  constructor(props){
   super(props)
  }

  render(){
      console.log(this.props.items)
    return (
      this.props.items.map((item)=>
     
      <div className="steps">
       <Step  title={item.title} />
      </div>

      )
    )

  }
}

export default Steps;