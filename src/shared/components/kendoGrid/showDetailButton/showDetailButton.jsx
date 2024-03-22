import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import FaIcon from 'shared/components/Icon/Icon';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import styles from 'containers/layout/panel/theme';
import { th } from 'date-fns/esm/locale';

class ShowDetailComponents extends React.Component {
    constructor(props) {
        super(props);

        this.show = this.show.bind(this);
    }

    show() {
        
        if(this.props.index)
       {
        this.props.history.push(
            {   
                pathname: this.props.detail[this.props.index].path,
                state: this.props.sateParams

            })
       } 
       else{
        this.props.history.push(
            {   
                pathname: this.props.detail.path,
                state: this.props.sateParams

            })
       }
    
}
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <td>
                    <Button size="small"  color="primary" className={classNames(classes.margin, classes.btnEdit)} onClick={this.show}>
                        <FaIcon name="fas fa-eye" size={15} />
                    </Button>
                </td>
            </React.Fragment>
        )
    }
}
const Show = withStyles(styles)(ShowDetailComponents)

export default Show;