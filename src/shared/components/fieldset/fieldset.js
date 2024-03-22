import React from 'react'
import './fieldset.css'

class Fieldset extends React.Component{
    render(){
        return(
            <div className={this.props.marginRight ? "fieldset-margin-right" :this.props.className} style={{border:this.props.border,...this.props.style}}>
            <h3 className="legend">{this.props.legend}</h3>
             {this.props.children}
            </div>
        )
    }
}
Fieldset.defaultProps = {
    border: '1px #80808042 solid',
    className:'fieldset'
    // style:{
    //     border: '1px #80808042 solid'
    // }
}
export default Fieldset;