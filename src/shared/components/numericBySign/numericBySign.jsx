import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import FaIcon from 'shared/components/Icon/Icon';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import styles from 'containers/layout/panel/theme';
import { th } from 'date-fns/esm/locale';

class NumericBySignComponent extends React.Component {
    constructor(props) {
        super(props);
       
    }

  
    render() {
    
        return (
            <React.Fragment>
        
                    { 
                        this.props.field!==undefined && this.props.field!==null && !isNaN(this.props.field) ?
                        this.props.field===0  ?
                        <span>
                      0
                
                    </span>:
                        this.props.field>0 ? 
                        <span>
                            {this.props.field.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                    
                        </span>:
                        <span className="red-color">
                        (
                            {Math.abs(this.props.field).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}

                     
                        )
                        </span>:
                        ''
                    }
                
          
            </React.Fragment>
        )
    }
}
NumericBySignComponent.defaultProps={
    fieldClass:"text-left"

}
const NumericBySign = withStyles(styles)(NumericBySignComponent);

export default NumericBySign;