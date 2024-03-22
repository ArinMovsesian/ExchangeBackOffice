import React from 'react';
// import { Delete} from 'shared/components/kendoGrid/kendoGrid';
import { Edit } from 'shared/components/kendoGrid/kendoGrid';
// import Delete from 'shared/components/kendoGrid/deleteButton/deleteButtonWithoutTD';
// import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';
import {CheckColumn} from 'shared/components/kendoGrid/kendoGrid';
// import DeleteManagedCustomerContactServices from "../services/deleteManagedCustomerContactService";

const Columns = function (props, state, classes) {
   
    return [
        {
            title: "نام / نام خانوادگی",
            field: "fullName",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
            width: "150px"
        },
        {
            title: "کد حساب",
            field: "detailLedgerCode",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
            width: "150px"
        },
        {
            title: "تاریخ ثبت",
            field: "createdJalai",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "تاریخ آخرین ویرایش",
            field: "modifiedJalai",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "کد معاملاتی",
            field: "pamTseCode",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "کد بورسی",
            field: "tseBourseCode",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "تصویر جلوی کارت ملی",
            field: "nationalCard",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.nationalCard} />
                )
            },
        },
        {
            title: "تصویر پشت کارت ملی",
            field: "behindOfNationalCard",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.behindOfNationalCard} />
                )
            },
        },
        {
            title: "صفحه اول کارت ملی",
            field: "firstPageOfIdentificationCard",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.firstPageOfIdentificationCard} />
                )
            },
        },
        {
            title: "صفحه دوم کارت ملی",
            field: "secondPageOfIdentificationCard",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.secondPageOfIdentificationCard} />
                )
            },
        },
        {
            title: "پاسپورت",
            field: "passport",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.passport} />
                )
            },
        },
        {
            title: "امضا عکس",
            field: "signImage",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.signImage} />
                )
            },
        },
        {
            title: "تعهد",
            field: "commitmentForm",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.commitmentForm} />
                )
            },
        },
        {
            title: "تاییده ی حساب بانکی",
            field: "bankAccountConfirmation",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.bankAccountConfirmation} />
                )
            },
        },
        {
            title: "تصویر قرارداد آنلاین",
            field: "onlineContractImage",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.onlineContractImage} />
                )
            },
        },
        {
            title: "تصویر قرارداد آفلاین",
            field: "offlineContractImage",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.offlineContractImage} />
                )
            },
        },
        {
            title: "دیگران",
            field: "other",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.other} />
                )
            },
        },
        {
            title: "کد پستی",
            field: "postalCode",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.postalCode} />
                )
            },
        },
        {
            title: "روزنامه رسمی",
            field: "officialNewspaper",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.officialNewspaper} />
                )
            },
        },
        {
            title: "عملیات",
            isFixed: true,
            width: "150px",
            dynamicColumn: true,
            cell: (event) => {
                console.log('event',event.dataItem);
                let edit = event.dataItem.partyType === 1 ? props.edit[0] : props.edit[1];
              
                return (
                    <Edit  {...props} edit={edit} routeEdit={edit} sateParams={{ partyId: event.dataItem.id}} />
                )
            }
        }
       
    ];
}


export default Columns;