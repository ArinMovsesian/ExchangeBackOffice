import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import FaIcon from 'shared/components/Icon/Icon';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import styles from 'containers/layout/panel/theme';
import './accessButton.css';

class AccessButtonComponents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAccess: this.props.dataItem.access,
            resourceId: this.props.dataItem.resourceId
        }
        this.addAccess = this.addAccess.bind(this);
        this.deleteAccess = this.deleteAccess.bind(this);
    }

    deleteAccess() {
        this.props.assignAccess({id: this.state.resourceId , isAccess : false});
    }

    addAccess() {

        this.props.assignAccess({id: this.state.resourceId , isAccess : true});
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                {
                    this.state.isAccess ?
                        <td>
                            <Button size="small" className={classNames(classes.margin, "btn-delete-access")} onClick={this.deleteAccess}>
                                حذف دسترسی
                            </Button>
                        </td> :
                        <td>
                            <Button size="small" color="primary" className={classNames(classes.margin, "btn-access")} onClick={this.addAccess}>
                                افزودن دسترسی
                            </Button>
                        </td>
                }


            </React.Fragment>

        )
    }
}
const Edit = withStyles(styles)(AccessButtonComponents);

export default Edit;