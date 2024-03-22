import React from 'react';
import { Edit } from 'shared/components/kendoGrid/kendoGrid';

const Columns = function (props, state, classes) {
    return [
        {
            title: "نام کاربری",
            field: "userName",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "نام نام خانوادگی",
            field: "partyName",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "ایمیل",
            field: "email",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "وضعیت",
            field: "state",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "تاریخ ثبت",
            field: "created",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "شعبه",
            field: "branchName",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "کد شعبه",
            field: "branchCode",
            show: true,
            width: "180px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "نقش",
            field: "role",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,
        },
     
        {
            title: "ویرایش",
            isFixed: true,
            width: "100px",
            dynamicColumn: true,
            cell: (event) => {
               
                let edit = event.dataItem.party.partyType === 1 ? props.edit[0] : props.edit[1];
                return (
                    <Edit   {...props} routeEdit={edit} sateParams={{ partyId: event.dataItem.party.id }} />
                )
            }
        }
    ];

}


export default Columns;