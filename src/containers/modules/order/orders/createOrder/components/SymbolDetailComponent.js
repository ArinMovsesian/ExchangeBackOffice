import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import classNames from 'classnames';
import Input from 'shared/components/formInput/inputForm'
import Email from 'shared/components/email/email'
import Header from 'shared/components/stateHeader/stateHeader'
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes, { func } from 'prop-types';
import styles from '../../../../../layout/panel/theme'
import DropDownComponent from 'shared/components/dropDown/dropDown';
import Form from 'shared/components/form/pureForm';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './SymbolDetailComponent.css'
class SymbolDetailComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{
        BestBuyPrice: 5012,
        BestBuyQuantity: 121156,
        BestSellPrice: 5730,
        BestSellQuantity: 10000,
        NoBestBuy: 21,
        NoBestSell: 1
      },
      {
        BestBuyPrice: 5012,
        BestBuyQuantity: 121156,
        BestSellPrice: 5730,
        BestSellQuantity: 10000,
        NoBestBuy: 21,
        NoBestSell: 1
      },
      {
        BestBuyPrice: 5012,
        BestBuyQuantity: 121156,
        BestSellPrice: 5730,
        BestSellQuantity: 10000,
        NoBestBuy: 21,
        NoBestSell: 1
      },
      {
        BestBuyPrice: 5012,
        BestBuyQuantity: 121156,
        BestSellPrice: 5730,
        BestSellQuantity: 10000,
        NoBestBuy: 21,
        NoBestSell: 1
      },
      {
        BestBuyPrice: 5012,
        BestBuyQuantity: 121156,
        BestSellPrice: 5730,
        BestSellQuantity: 10000,
        NoBestBuy: 21,
        NoBestSell: 1
      }]
    }




  }
  render() {
    return (
      <React.Fragment>
        <Grid container spacing={8} className="no-margin price-table">
          <Grid item md={2} >
            <h6>آخرین قیمت</h6>
          </Grid>
          <Grid item md={4}>
            <h5>123</h5>
          </Grid>
          <Grid item md={2}>
            <h6>حجم معملات</h6>
          </Grid>
          <Grid item md={4}>
            <h5>2</h5>
          </Grid>
          <Grid item md={2} >
            <h6>قیمت پایانی</h6>
          </Grid>
          <Grid item md={4}>
            <h5>123</h5>
          </Grid>
          <Grid item md={2}>
            <h6>ارزش معملات</h6>
          </Grid>
          <Grid item md={4}>
            <h5>2</h5>
          </Grid>
          <Grid item md={2} >
            <h6>قیمت دیروز</h6>
          </Grid>
          <Grid item md={4}>
            <h5>123</h5>
          </Grid>
          <Grid item md={2}>
            <h6>تعداد معملات</h6>
          </Grid>
          <Grid item md={4}>
            <h5>2</h5>
          </Grid>
          <Grid item md={3} >
            <h6>بیشترین-کمترین</h6>
          </Grid>
          <Grid item md={3}>
            <h5>123</h5>
          </Grid>
          <Grid item md={2}>
            <h6>آستانه سفارش</h6>
          </Grid>
          <Grid item md={4}>
            <h5>2</h5>
          </Grid>
          <Grid item md={2} >
            <h6>آستانه مجاز</h6>
          </Grid>
          <Grid item md={4}>
            <h5>123</h5>
          </Grid>
          <Grid item md={2}>
            <h6>حجم مبنا</h6>
          </Grid>
          <Grid item md={4}>
            <h5>2</h5>
          </Grid>
          <Grid item md={2} >
            <h6>نوع بازار</h6>
          </Grid>
          <Grid item md={4}>
            <h5>123</h5>
          </Grid>
          <Grid item md={2}>
            <h6>آخرین معامله</h6>
          </Grid>
          <Grid item md={4}>
            <h5>2</h5>
          </Grid>
          
         
        </Grid>
    
         
      </React.Fragment>
    )
  }
}
export default withStyles(styles)(SymbolDetailComponent);
