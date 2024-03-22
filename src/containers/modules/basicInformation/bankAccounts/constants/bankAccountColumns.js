import React from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import FaIcon from '../../../../../shared/components/Icon/Icon';

import { Edit, CheckColumn } from 'shared/components/kendoGrid/kendoGrid';
import NumberFormat from 'react-number-format';
const Columns = function (prop, state, classes) {
    return [
        {
            title: "نام بانک",
            field: "bankTitle",
            show: true,
            width: "250px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "کد تفضیل",
            field: "detailLedgerId",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "نام شعبه",
            field: "branchName",
            show: true,
            width: "180px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "شهر",
            field: "regionTitle",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,

        },
        {
            title: "کد شعبه",
            field: "branchCode",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "نوع حساب",
            field: "accountTypeTitle",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,
            showCheckColumn: true,
            dynamicColumn: false,


        },
        {
            title: "شماره حساب",
            field: "accountNumber",
            show: true,
            isFixed: false,
            width: "150px",

            dynamicColumn: false,
        },
        {
            title: "بازار",
            field: "mainMarketsTitle",
            show: true,
            width: "250px",
            class: "text-right",


            isFixed: false,

        },
        {
            title: "شماره شبا",
            field: "iban",
            show: true,
            width: "210px",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "توضیحات",
            field: "comment",
            show: true,
            width: "150px",
            class: "text-right",
            dynamicColumn: false,

            isFixed: false,

        },
        {
            title: "جهت واریز مشتری",
            field: "forCustomerDeposit",
            show: true,
            width: "80px",
            dynamicColumn: true,
            cell: (event) => {

                return (

                    <CheckColumn status={event.dataItem.forCustomerDeposit} />
                )
            },

            isFixed: false,

        },
        {
            title: "جهت تسهیلات کارگزاری",
            field: "forLoanUse",
            show: true,
            width: "80px",
            dynamicColumn: true,

            isFixed: false,
            cell: (event) => {

                return (

                    <CheckColumn status={event.dataItem.forLoanUse} />
                )
            },
        },
        {
            title: "حداکثر مبلغ قابل ثبت برای واریز وجه از پنل مشتری",
            field: "maxDepositValue",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
            filter: "numeric",
            format: "{0:n0}"
        },
        {
            title: "ویرایش",
            field: "accountNumber",
            isFixed: true,
            width: "100px",
            dynamicColumn: true,

            cell: (event) => {

                return (

                    <Edit   {...prop} sateParams={{ accountNumber: event.dataItem.accountNumber }} />
                )
            },

        },

    ];

}


export default Columns;