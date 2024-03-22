import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from 'containers/layout/panel/theme';
import Paper from '@material-ui/core/Paper';

import './tab.css'
import { iif } from 'rxjs';


class TabList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.list[0].component
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event, newValue, val) {

    this.setState({ value: newValue });
  }

  componentDidMount(){

    this.setState({ value: this.props.selectedTab?this.props.selectedTab : this.props.list[0].component })

  }

  componentDidUpdate(prevProps, prevState) {
  
    if (prevState.value === undefined ){
      this.setState({ value:this.props.selectedTab?this.props.selectedTab : this.props.list[0].component })

    }
    if(this.props !==prevProps && this.props.updatePerChange){
      if(this.props.list[0].component.props.displayName==this.state.value.props.displayName)
      this.setState({ value: this.props.list[0].component })
     else if(this.props.list[1].component.props.displayName==this.state.value.props.displayName)
      this.setState({ value: this.props.list[1].component })
    }

      
  }
  render() {
    const { classes } = this.props;
    return (
      <Paper style={this.props.style} className={"main-paper-container"}>

        <div >
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            classes={{
               root:this.props.redIndicator ?(this.props.list.length>1 ? this.props.list[1].component===this.state.value ? classes.tabsRed : classes.tabsBlue : this.props.red ? classes.tabsRed :classes.tabsBlue) :classes.tabsRoot,
               indicator:this.props.redIndicator   ? classes.tabsIndicatorCustom:classes.tabsIndicator }
         
              }
               
          >
            {this.props.list.map(tab =>
              <Tab
                label={tab.label}
                id={tab.id}
                value={tab.component}
                // disabled
              />
            )}
          </Tabs>
          <div className="auto-height">
            {this.state.value}

          </div>

          <div style={{ position: 'relative' }}>

          </div>

        </div>

      </Paper>
    );
  }
}
TabList.defaultProps={
  style:{},
  red:false
}
export default withStyles(styles)(TabList);
