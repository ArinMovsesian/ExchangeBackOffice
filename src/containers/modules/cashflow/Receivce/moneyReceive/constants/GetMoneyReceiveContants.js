import React from 'react';
import {CheckColumn} from 'shared/components/kendoGrid/kendoGrid';
import DeletePartyBankAccountService from "../../../../personsAndCustomers/customers/bankAccounts/services/deletePartyBankAccountService";
import Delete from 'shared/components/kendoGrid/deleteButton/deleteButtonWithoutTD';
import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';
import DeleteChequeBookServices from "../../../chequeManagement/chequeBook/services/DeleteChequeBookServices";
const Columns = function (prop, state, classes) {
    return [
        {
            selectable: true, width: "50px"
        },
        {
            title: "نام مشتری",
            field: "toPartyFullName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            footerTemplate: "<div style='text-align: right !important;'>جمع صفحه</div><div style='text-align: right !important;margin-top: 10px'>جمع کل</div>",
        },
        {
            title: "بانک پرداختی",
            field: "fromBankDepositTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "نام بانک پرداختی",
            field: "fromBankTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "کد شعبه بانک پرداختی",
            field: "fromBranchCode",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "نام شعبه بانک پرداختی",
            field: "fromBranchName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "وضعیت",
            field: "stateTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "شرح",
            field: "description",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },

        {
            title: "شماره سند بانکی",
            field: "trakingNumber",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },
        
        {
            title: "مبلغ",
            field: "amount",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            format: "{0:n0}",
            width: '200px',
            attributes: { class: "text-left" },
            // class: "text-left",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: left !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: left !important;margin-top: 10px' class='total-amount-sum'></div>"
        },
        // {
        //     title: "مبلغ باقیمانده سند",
        //     field: "remainValue",
        //     show: true,
        //     isFixed: false,
        //     dynamicColumn: false,
        //     format: "{0:n0}",
        //     width: '200px',
        //     // attributes: { class: "text-left" },
        //     // class: "text-left",
        //     aggregates: ["sum"],
        //     footerTemplate:
        //         "<div style='text-align: left !important;'>#=kendo.toString(sum, 'n0')#</div>" +
        //         "<div style='text-align: left !important;margin-top: 10px' class='total-remainValue-sum'></div>"
        //
        // },
        {
            title: "مبلغ درخواستی",
            field: "requestedAmount",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            format: "{0:n0}",
            width: '200px',
            attributes: { class: "text-left" },
            // class: "text-left",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: left !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: left !important;margin-top: 10px' class='total-requestedAmount-sum'></div>"

        },
        {
            title: "تاریخ درخواست",
            field: "requestedDateJalali",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left changeDirection" }

        },

        {
            title: "تاریخ انجام",
            field: "dueDateJalali",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left changeDirection" }
        },
        {
            title: "تلفن ضروری",
            field: "necessaryPhone",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "شعبه ایجاد کننده",
            field: "branchName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "مبدا ثبت",
            field: "orderRegisterFromTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "کد حسابداری مشتری",
            field: "toDetailLedgerCode",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "شناسه ملی",
            field: "toNationalId",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "بازار",
            field: "mainMarketTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "شماره حساب بانکی مشتری",
            field: "toPartyAccountNumber",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "شماره شبای مشتری",
            field: "toPartyIBAN",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },
        // {
        //     title: "برگه چک",
        //     field: "chequeTitle",
        //     show: true,
        //     isFixed: false,
        //     dynamicColumn: false,
        //     width: '200px'
        // },
        // {
        //     title: "شماره سریال برگه چک",
        //     field: "chequeNumber",
        //     show: true,
        //     isFixed: false,
        //     dynamicColumn: false,
        //     width: '200px',
        //     attributes: { class: "text-left" }
        // },
        {
            title: "نوع تراکنش",
            field: "transactionTypeTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "نحوه انتقال وجه",
            field: "cashFlowCategoryTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        // {
        //     title: "دلیل",
        //     field: "reasonTitle",
        //     show: true,
        //     isFixed: false,
        //     dynamicColumn: false,
        //     width: '200px'
        // },
        {
            title: "تاریخ ایجاد",
            field: "createdJalali",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left changeDirection" }
        },
        {
            title: "ایجاد کننده",
            field: "createdByName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "تاریخ آخرین ویرایش",
            field: "modifiedJalali",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left changeDirection" }
        },
        {
            title: "آخرین ویرایشگر",
            field: "modifiedByName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },

        {
            title: "عملیات",
            width: "150px",
            template:
                '<div style="text-align: center;">'
                +
                // '<span class="fas fa-edit edit" style="color: rgb(33, 150, 243); cursor: pointer; font-size: 15px; margin: 5px;"></span>' +
                '<span class="fas fa-trash delete" style="color: red; cursor: pointer; font-size: 15px; margin: 5px;"></span>'
                +
                '</div>',
            // cell: (event) => {
            //
            //     return (
            //         <td>
            //             <Delete deleteService={DeleteChequeBookServices.deleteCashFlowChequeMasterByIdMethod}  info={event.dataItem} entity={event.dataItem.id}  {...prop} sateParams={{ accountNumber: event.dataItem.accountNumber, fullName: event.dataItem.fullName, }} />
            //             <Edit {...prop} sateParams={{partyId: event.dataItem.partyId, id:event.dataItem.id, fullName: event.dataItem.fullName, nationalId: event.dataItem.nationalId}}/>
            //         </td>
            //     )
            // }
        }
        // {
        //     title: "عملیات",
        //     isFixed: true,
        //     width: "150px",
        //     dynamicColumn: true,
        //     template: '<div style="text-align: center;">'
        //         +
        //         '<span class="fas fa-trash delete" style="color: red; cursor: pointer; font-size: 15px; margin: 5px"></span>'
        //         +
        //         '</div>',
            // cell: (event) => {
            //
            //     return (
            //         <td>
            //             <Delete deleteService={DeleteChequeBookServices.deleteCashFlowChequeMasterByIdMethod}  info={event.dataItem} entity={event.dataItem.id}  {...prop} sateParams={{ accountNumber: event.dataItem.accountNumber, fullName: event.dataItem.fullName, }} />
            //             <Edit {...prop} sateParams={{partyId: event.dataItem.partyId, id:event.dataItem.id, fullName: event.dataItem.fullName, nationalId: event.dataItem.nationalId}}/>
            //         </td>
            //     )
            // }
        // }

    ];
};


export default Columns;