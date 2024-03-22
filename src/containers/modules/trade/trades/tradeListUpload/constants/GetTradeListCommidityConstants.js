import React from 'react';
// import { Edit, Delete } from 'shared/components/kendoGrid/kendoGrid';
import {CheckColumn} from 'shared/components/kendoGrid/kendoGrid';
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
// import DeleteCustomersTradingCode from "../../customerTradingCodes/services/DeleteCustomersTradingCodeServices";
const customersCommodityTradeCountColumn = function (prop, state, classes) {
    return [
        {
            title: "تعداد رکوردهای موجود در فایل",
            field: "allCustomers",
            show: true,
            class: "text-left",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "تعداد رکوردهای ثبت شده",
            field: "registeredCustomers",
            show: true,
            class: "text-left",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "تعداد رکوردهای ثبت نشده",
            field: "unknownCustomers",
            show: true,
            class: "text-left",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "مشاهده فایل آپلود شده",
            // field: "fileLike",
            show: true,
            class: "text-left",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <td>
                        <Button variant="outlined" size="small" href={`${prop.downloadURL}${event.dataItem.fileLike}`}  target="_blank">
                            <SaveIcon style={{fontSize: '15px'}}/>
                        </Button>
                    </td>
                )
            }
        },
    ];

};
export default customersCommodityTradeCountColumn;

export const resultCommodityTrade = function (prop, state, classes) {
    return [
        {
            title: "شماره قرار داد",
            field: "contrctNumber",
            show: true,
            class: "text-left",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "کد مشتری",
            field: "customerCode",
            show: true,
            class: "text-left",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "نام مشتری",
            field: "customerName",
            show: true,
            class: "text-left",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "نماد",
            field: "productTitle",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,

        },
        {
            title: "علت عدم ثبت",
            field: "errorResult",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,

        },
    ];

};

