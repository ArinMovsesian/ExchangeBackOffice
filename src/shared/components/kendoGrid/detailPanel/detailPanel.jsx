import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import FaIcon from 'shared/components/Icon/Icon';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const styles = theme => ({

    container: {
        display: 'flex',
    },
    paper: {
        margin: theme.spacing.unit,
    },
    svg: {
        width: 100,
        height: 100,
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
    },
    heightClosePanel: {
        height: 'calc(100% - 34px)',
        transition: 'height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    heightOpenPanel: {
        height: 'calc(100% - 129px)'
    },
    iconExpandPanel: {
        position: 'absolute',
        right: '15px !important',
        top: '10px !important',
    },
    openPanelSearch: {
        height: '95px'
    },
    contentSearch: {
        margin: '0 0 5px 0 !important'
    },
    heading:{
        fontSize:"25px"
    },
    ExpansionPanelSummary:{
       content:{
        margin:"0 0 !important"
       }
        
    },
    ExpansionPanel:{
        backgroundColor: "#F5F5F5"
    }

});

class DetailPanelComponent extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                      <ExpansionPanel className="panel-filter-search" expanded={this.props.openDetail} onChange={this.props.handleExpandDetailPanel}>
        <ExpansionPanelSummary className={classes.ExpansionPanelSummary} expandIcon={<ExpandMoreIcon />}>
        <FaIcon name="fas fa-info icon-search" size={14} />
                        <Typography variant="h6" gutterBottom className={classNames("font-page title-seatch")} >
                            {this.props.detailHeader}
                                   </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <Grid container md={24} className={classNames(classes.paper, classes.contentSearch, "content-panel-search")} style={{ padding: '10px 10px 0 10px' }}>
                            <div className="page-width">
                                {this.props.children}
                            </div>
                        </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
 
                {/* <Paper onClick={this.props.handleExpandDetailPanel} className="cursor-pointer">
                    <Grid container md={24} className="panel-filter-search">
                        <FaIcon name="fas fa-search icon-search" size={14} />
                        <Typography variant="h6" gutterBottom className={classNames("font-page title-seatch")} >
                            جزییات
                                   </Typography>
                        {this.props.openDetail ? <ExpandLess className={classes.iconExpandPanel} /> : <ExpandMore className={classes.iconExpandPanel} />}
                    </Grid>
                </Paper>


                <Collapse className={this.props.openDetail ? this.props.children.props.classPage : ''}>
                    <Paper elevation={4} >
                        <Grid container md={24} style={{ padding: '10px 10px 0 10px' }}>
                            <div className="page-width">
                                {this.props.children}
                            </div>
                        </Grid>

                    </Paper>
                </Collapse> */}
            </React.Fragment>
        )
    }
}
DetailPanelComponent.defaultProps={
    detailHeader:"جزییات"
}
const Detail = withStyles(styles)(DetailPanelComponent)

export default Detail;