import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import FaIcon from 'shared/components/Icon/Icon';
import classNames from 'classnames';
import styles from 'containers/layout/panel/theme';
import { th } from 'date-fns/esm/locale';
import css from './deleteButton.css';
import { connect } from "react-redux";
import { setDelete } from 'store/actions';
import toastr from 'toastr';

class DeleteButtonComponents extends React.Component {
    state = {
        open: false,
    };
    constructor(props) {
        super(props);
        // console.log('dele', this.props.sateParams.fullName);
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.successDelete = this.successDelete.bind(this);
    }

    openDeleteModal() {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    };
    delete = () => {

        let command = {
            entity: this.props.entity
        };
        this.props.deleteService(command, this.successDelete);
        this.setState({ open: false });
    };

    successDelete(response) {
        if (response.success) {


            this.props.setDelete(this.props.entity);
            toastr.success(response.message);

        }
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                    <Button size="small" variant="contained" color="primary" style={{ backgroundColor: 'red' }} className={classNames(classes.margin, classes.btnEdit)} onClick={this.openDeleteModal}>
                        <FaIcon name="fas fa-trash" size={12} />
                    </Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <Paper style={{
                        width: '600px',
                        padding: '1rem .5rem ',
                        height: 'auto',
                        outline: 'none',
                        position: 'absolute',
                        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
                        backgroundColor: '#fff',
                        top: '50%',
                        left: '45%',
                        marginLeft: '-300px',
                        marginTop: '-150px',
                    }}>
                        <h3 >
                            <FaIcon color="gray" name="fa fa-trash" size={20}/>
                            <span style={{marginRight: '5px'}}>حذف</span>
                            {/*<b>*/}
                            {/*حذف {this.props.deleteHeader}*/}
                            {/*</b>*/}
                        </h3>
                        <hr />
                        {/*<h6> آیا از حذف <b> {!this.props.sateParams.fullName ?'dsdsdsd': this.props.sateParams.fullName}</b> اطمینان دارید؟ </h6>*/}
                        <h3>آیا از حذف خود مطمئن می باشید.</h3>
                        <br />
                        <Button variant="contained" color="secondary" className={classes.button} style={{ backgroundColor: 'red', color: '#FFF' }} onClick={this.delete}>
                            حذف
                        </Button>
                        <Button variant="contained" color="secondary" className={classes.button} style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={this.handleClose}>
                            انصراف
                        </Button>
                    </Paper>
                </Modal>

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
}
/*<-------------------connect------------->*/
const mapDispatchToProps = dispatch => {
    return {
        setDelete: data => dispatch(setDelete(data)),

    };

};
const Delete = connect(mapStateToProps, mapDispatchToProps)(DeleteButtonComponents);

export default withStyles(styles)(Delete);

