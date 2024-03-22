import React from 'react';

import { Show,Edit, CheckColumn } from 'shared/components/kendoGrid/kendoGrid';
import { isCheck } from '../../../../../../constants/kendoUiGrid';

const Columns = function (prop, state, classes) {
 
    return [
        {
            selectable: true,
            width: "50px"
        },
        {
            title: "جزییات",
            field: "id",
            isFixed: true,
            width: "100px",
            dynamicColumn: true,
            footerTemplate: "<div>جمع صفحه</div><div>جمع کل</div>",

            template: '<div class="id text-center"><span class="k-icon k-i-eye"></span></div>'


        },
        {
            title: "شماره سند",
            field: "voucherNumber",
            show: true,
            isFixed: false,
            width: "150px",
            dynamicColumn: false,
        },
        {
            title: "تاریخ سند",
            field: "voucherDateJalali",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "شرح",
            field: "description",
            show: true,
            width: "180px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "نوع سند",
            field: "voucherCategoryTitle",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,

        },
        {
            title: "وضعیت سند",
            field: "voucherStateEnumTitle",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        }, 
        {
            title: "شماره سریال",
            field: "serialNumber",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },  
        {
            title: "شماره سند روزانه",
            field: "dailyNumber",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },  
        {
            title: "نوع قفل",
            field: "lockedBy",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },  
        {
            title: "قفل گذار",
            field: "lockedByName",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },  
        {
            title: "تاریخ ایجاد",
            field: "createdJalali",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },  
        {
            title: "ایجاد کننده",
            field: "createdByName",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },  
        {
            title: "تاریخ آخرین ویرایش",
            field: "modifiedJalali",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },     
        {
            title: "آخرین ویراستار",
            field: "modifiedByName",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },  
        {
            title: "پیوست",
            field: "hasAttachment",
            show: true,
            width: "110px",
            isFixed: false,
            dynamicColumn: true,
            template:isCheck("hasAttachment")
        },  
        {
            title: "مبلغ سند",
            field: "amount",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: "<div class='text-left'>#=kendo.toString(sum, 'n0')#</div>" +
                '<div class="total-amount-sum text-left"></div>'
        
        },  
        {
            title: "عملیات",
            isFixed: true,
            width: "150px",
            dynamicColumn: true,
            template: '<div style="text-align: center;">'
                
            +'#if(isEditable){#'+
                '<span class="fas fa-edit edit" style="color: rgb(33, 150, 243); cursor: pointer; font-size: 15px; margin: 5px;"></span>#}'
                
                // +'else {#'+
                // '<span class="fas fa-edit disabled" style="color: rgb(33, 150, 243); cursor: pointer; font-size: 15px; margin: 5px;"></span>#}'
                +
                'if(isDeletable){#'+
                '<span class="fas fa-trash delete" style="color: red; cursor: pointer; font-size: 15px; margin: 5px;"></span>#}#'
                
                // +'else {#'+
                // '<span class="fas fa-trash disabled" style="color: red; cursor: pointer; font-size: 15px; margin: 5px;"></span>#}#'
                // +
                // // '#else {#'+
                // // '<span class="fas fa-edit edit" style="color: rgb(33, 150, 243); cursor: pointer; font-size: 15px; margin: 5px;"></span>#}#'+
                
                // +'<span class="fas fa-trash delete" style="color: red; cursor: pointer; font-size: 15px; margin: 5px;"></span>'
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
       

    ];

}


export default Columns;