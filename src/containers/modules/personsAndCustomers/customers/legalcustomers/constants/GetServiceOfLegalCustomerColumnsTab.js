import React from 'react';
import {CheckColumn} from 'shared/components/kendoGrid/kendoGrid';
// import DeletePartyBankAccountService from "../../../../personsAndCustomers/customers/bankAccounts/services/deletePartyBankAccountService";
// import Delete from 'shared/components/kendoGrid/deleteButton/deleteButtonWithoutTD';
// import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';
import {isCheck} from "constants/kendoUiGrid";
// import DeleteChequeBookServices from "../../../chequeManagement/chequeBook/services/DeleteChequeBookServices";
const Columns = function (prop, state, classes) {
    return [
        {
         selectable: true, width: "50px"
        },
        {
            title: "نام کامل مشتری",
            field: "partyFullName",
            width: '200px',
            attributes: { class: "text-right" },
        },
        {
            title: "عنوان خدمت",
            field: "services.title",
            width: '200px',
            attributes: { class: "text-right" },
        },
        {
            title: "مبلغ",
            field: "amount",
            // footerTemplate: "<div style='text-align: right !important;'>جمع صفحه</div><div style='text-align: right !important;margin-top: 10px'>جمع کل</div>",
            width: '200px',
            attributes: { class: "text-left" },
            filter: "numeric",
            format: "{0:n0}",
        },
        {
            title: "مبلغ قرارداد",
            field: "contractAmount",
            // width: '200px',
            attributes: { class: "text-left" },
            filter: "numeric",
            format: "{0:n0}",
            // aggregates: ["sum"],
            // footerTemplate:
            //     "<div style='text-align: left !important;'>#=kendo.toString(sum, 'n0')#</div>" +
            //     "<div style='text-align: left !important;margin-top: 10px' class='total-amount-sum'></div>"
        },
        {
            title: "شماره بایگانی",
            field: "archiveNumber",
            width: '200px',
            attributes: { class: "text-left" },
        },
        {
            title: "حرف شماره بایگانی",
            field: "archiveLetterNumber",
            width: '200px',
            attributes: { class: "text-left" },
        },
        {
            title: "فعال",
            field: "isActive",
            width: '200px',
            show: true,
            isFixed: false,
            dynamicColumn: true,
            attributes: { class: "text-left" },
            template:isCheck("isActive")
        },
        {
            title: "توضیحات",
            field: "description",
            width: '200px',
            attributes: { class: "text-right" },
        },
        {
            title: "ایجاد کننده",
            field: "createdByName",
            width: '200px',
            attributes: { class: "text-left" },
        },
        {
            title: "آخرین ویرایش کننده",
            field: "modifiedByName",
            width: '200px',
            attributes: { class: "text-left" },
        },

        {
            title: "تاریخ شروع خدمت",
            field: "validFromJalali",
            width: '200px',
            attributes: { class: "text-left" },
        },
        {
            title: "تاریخ پایان خدمت",
            field: "validUntilJalali",
            width: '200px',
            attributes: { class: "text-left" },
        },
        {
            title: "تاریخ ثبت",
            field: "createdJalali",
            width: '200px',
            attributes: { class: "text-left" },
        },
        {
            title: "تاریخ آخرین ویرایش",
            field: "modifiedJalali",
            width: '200px',
            attributes: { class: "text-left" },
        },
        
        // {
        //     title: "توضیحات خدمات",
        //     field: "services.description",
        //     width: '200px',
        //     attributes: { class: "text-right" },
        // },
        
      
       
        // {
        //     title: "عملیات",
        //     width: "150px",
        //     template:
        //         '<div style="text-align: center;">'
        //         +
        //         '<span class="fas fa-edit edit" style="color: rgb(33, 150, 243); cursor: pointer; font-size: 15px; margin: 5px;"></span>' +
        //         '<span class="fas fa-trash delete" style="color: red; cursor: pointer; font-size: 15px; margin: 5px;"></span>'
        //         +
        //         '</div>',
            // cell: (event) => {
            
            //     return (
            //         <td>
            //             {/* <Delete deleteService={DeleteChequeBookServices.deleteCashFlowChequeMasterByIdMethod}  info={event.dataItem} entity={event.dataItem.id}  {...prop} sateParams={{ accountNumber: event.dataItem.accountNumber, fullName: event.dataItem.fullName, }} /> */}
            //             {/* <Edit {...prop} sateParams={{partyId: event.dataItem.partyId, id:event.dataItem.id, fullName: event.dataItem.fullName, nationalId: event.dataItem.nationalId}}/> */}
            //             <span class="fas fa-edit edit" style={{color: 'rgb(33, 150, 243)', cursor: 'pointer', fontSize: '15px', margin:' 5px',}} onClick={() => this.props.EditTab()}></span>
            //         </td>
            //     )
            // }
        // }

    ];
};


export default Columns;