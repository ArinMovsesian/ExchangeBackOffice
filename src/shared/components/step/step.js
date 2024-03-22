import React from 'react'
import FaIcon from '../Icon/Icon';
import './step.css'
import classNames from 'imrc-datetime-picker';
import { formatRelative } from 'date-fns';
import Avatar from '@material-ui/core/Avatar';

class Step extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="step ">
        {this.isPresentState ?<FaIcon name="fa fa-check" size={35} color="#03c503" style={{color:"green"}} />:
          <h2 className="number">
          
          <Avatar className="themeAvatar">
            {this.props.number}
          </Avatar>
        </h2>
      }
       
      
        <h4 className="content">{this.props.title}</h4>

      </div>
    )

  }
}

export default Step;