import React from 'react';
// import { Delete} from 'shared/components/kendoGrid/kendoGrid';
// import { Edit } from 'shared/components/kendoGrid/kendoGrid';
import Delete from 'shared/components/kendoGrid/deleteButton/deleteButtonWithoutTD';
import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';
import {CheckColumn} from 'shared/components/kendoGrid/kendoGrid';
// import DeleteManagedCustomerContactServices from "../services/deleteManagedCustomerContactService";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import classNames from 'classnames';
import DeleteManageCustomerServices from "../services/DeleteManageCustomerServices";
const Columns = function (props, state) {
    // const { classes } = props;
    console.log('props', props);
    return [
        {
            title: "نام/ نام خانوادگی",
            field: "fullName",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "کد ملی",
            field: "nationalId",
            show: true,
            class: "text-left",
            isFixed: false,
            dynamicColumn: false,
        },

        {
            title: "نوع مدرک",
            field: "captionFa",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },

        {
            title: "لینک دانلود",
            // field: "link",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <td>
                        <Button variant="outlined" size="small" href={`${props.downloadURL}${event.dataItem.link}`} target="_blank">
                            <SaveIcon style={{fontSize: '15px'}}/>
                        </Button>
                    </td>
                )
            }
        },

        {
            title: "عملیات",
            isFixed: true,
            width: "150px",
            dynamicColumn: true,
            cell: (event) => {
                console.log('عملیات',event.dataItem);
                return (
                    <td>
                        <Delete deleteService={DeleteManageCustomerServices.deleteAttachmentMethod}  info={event.dataItem} entity={event.dataItem.id}  {...props} fullName={event.dataItem.fullName} title={event.dataItem.title}/>
                        {/*<Edit {...props} sateParams={{partyId: event.dataItem.partyId, id:event.dataItem.id, fullName: event.dataItem.fullName, nationalId: event.dataItem.nationalId}}/>*/}
                    </td>
                )
            }
        }

    ];

};
// Columns.propTypes = {
//     classes: PropTypes.object.isRequired,
//
// };

export default Columns;