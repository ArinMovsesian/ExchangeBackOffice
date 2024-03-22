import React from 'react';
import { Edit } from 'shared/components/kendoGrid/kendoGrid';

const Columns = function (props, state, classes) {
    return [
        {
            title: "نام",
            field: "party.firstName",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "نام خانوادگی",
            field: "party.lastName",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "نام معرف",
            field: "party.representativeName",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "عنوان",
            field: "party.name",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
       
        {
            title: "بازار",
            field: "party.mainMarketTitles",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "شناسه ملی",
            field: "party.nationalId",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "نام پدر",
            field: "party.fatherName",
            show: true,
            width: "180px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "شماره شناسنامه",
            field: "party.identityCard",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,
        },
        {
            title: "محل صدور شناسنامه",
            field: "party.issuePlace",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "کد بورسی",
            field: "party.tsebourseCode",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "نوع مشتری",
            field: "party.partyTypeTitle",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "تاریخ ثبت",
            field: "party.createdJalali",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "تاریخ آخرین ویرایش",
            field: "party.modifiedJalali",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "شعبه کارگزاری",
            field: "party.relatedBranchName",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "نام کاربری",
            field: "party.userName",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "ثبت کننده",
            field: "party.createdByName",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "آخرین ویرایشگر",
            field: "party.modifiedByName",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        // {
        //     title: "ویرایش مشتریان ناقص",
        //     field: "",
        //     width: "170px",
        //     isFixed: true,
        //     dynamicColumn: true,
        //     cell: (event) => {
               
        //         let edit = event.dataItem.party.partyType === 1 ? props.editUncompleted[0] : props.editUncompleted[1];
        //         console.log('props.edit[0]',props);
        //         console.log('props.edit[1]', props);

        //         return (
        //             <Edit   {...props} routeEdit={edit} sateParams={{ partyId: event.dataItem.party.id }} />
        //         )
        //     }
        // },
        {
            title: "ویرایش",
            isFixed: true,
            width: "80px",
            dynamicColumn: true,
            cell: (event) => {
               
                let edit = event.dataItem.party.partyType === 1 ? props.edit[0] : props.edit[1];
                // console.log('props.edit[0]',props.edit[0]);
                // console.log('props.edit[1]', props.edit[1]);

                return (
                    <Edit   {...props} routeEdit={edit} sateParams={{ partyId: event.dataItem.party.id }} />
                )
            }
        }
    ];

}


export default Columns;