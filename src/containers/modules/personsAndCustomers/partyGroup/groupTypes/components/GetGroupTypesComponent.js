import React from 'react';

import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import Columns from '../constants/GetGroupTypeColumn';
import GetGroupTypesService from '../services/GetGroupTypesService';
import FaIcon from 'shared/components/Icon/Icon';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import toastr from 'toastr';
import './GetGroupType.css';

const $ = require("jquery");

class GetGroupTypes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: Columns(),
            open: false,
            deleteModal: false,
            selectedGroupType: {}
        };

        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.deleteGroupType = this.deleteGroupType.bind(this);
    }

    componentDidMount() {
        this.getGroupTypes();
    }

    openDeleteModal(dataItem) {
        this.setState({ selectedGroupType: dataItem, deleteModal: true });
    }
    clodeModal(){
        this.setState({
            deleteModal : false
        });
    }

    deleteGroupType(){
        let command = {
           entity : {
               id: this.state.selectedGroupType.id
           }
        };
        GetGroupTypesService.deleteGroupType(command , (response) => {
            if(response.success){
                this.setState({
                    deleteModal : false
                })
                this.getGroupTypes();
                toastr.success("نوع گروه با موفقیت حذف شد")
            }
        })
    }

    getGroupTypes() {
        let self = this;

        $("#type-group-list").kendoGrid({
            dataSource: {
                transport: {
                    read: function (option) {

                        GetGroupTypesService.getGroupTypes(null, function (response) {
                            if (!response.result) {
                                response = {
                                    Result: [],
                                    totalRecords: 0
                                }
                            }
                            option.success(response)
                        });
                    }
                },
                pageSize: 50,
                serverPaging: false,
                serverSorting: false,
                schema: {
                    data: "result",
                    total: "totalRecords"
                },
            },
            sortable: true,
            columnMenu: true,
            autoBind: true,
            sortable: {
                allowUnsort: false
            },
            resizable: true,
            reorderable: true,
            navigatable: false,
            columnMenu: {
                messages: {
                    sortAscending: "صعودی",
                    sortDescending: "نزولی",
                    columns: "ستون ها"
                }
            },
            pageable: {
                pageSizes: [50, 150, 200],
                buttonCount: 5,
                messages: {
                    itemsPerPage: "تعداد سطر در هر صفحه",
                    display: "{0} - {1} از {2} مورد",
                    empty: ""
                }
            },
            allowCopy: true,
            noRecords: {
                template: ' <p class="orange-page font-size-2 no-data">رکوردی جهت نمایش وجود ندارد.</p>'
            },
            dataBound: function (e) {
              
                $("#type-group-list tbody tr td div span.edit").on("click", function (item) {
                    var grid = $("#type-group-list").data("kendoGrid");
                    var row = $(item.target).closest("tr");
                    var dataItem = grid.dataItem(row);

                    self.props.history.push(
                        {
                            pathname: self.props.edit.path,
                            state: {
                                id: dataItem.id,
                                title: dataItem.title,
                                canDuplicate: dataItem.canDuplicate
                            }
                        })

                });

                $("#type-group-list tbody tr td div span.delete").on("click", function (item) {
                    var grid = $("#group-list").data("kendoGrid");
                    var row = $(item.target).closest("tr");
                    var dataItem = grid.dataItem(row);
                    self.openDeleteModal(dataItem);
                });
            },
            columns: self.state.columns
        });

    };

    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container group-type"}>
                    <div className="k-rtl height-page">
                        <div id="type-group-list" className="height-page"></div>
                    </div>
                    {deleteModal(this)}
                </Paper>

            </React.Fragment>
        )
    }
};

function deleteModal(that) {
    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={that.state.deleteModal}
        >
            <Paper className="paper-modal">
                <h3 >
                    <FaIcon color="orange" name="fas fa-exclamation-triangle" size={20} />
                    <span className="margin-right-5">حذف گروه</span>
                </h3>
                <hr />
                <h3>آیا از حذف نوع گروه با عنوان  <b>{that.state.selectedGroupType.title}</b> مطمئن می باشید؟</h3>
                <br />
                <Button variant="contained" className="btn-delete-modal" onClick={that.deleteGroupType}>
                    حذف
                        </Button>
                <Button variant="contained" className="btn-cancel-modal" onClick={that.clodeModal.bind(that)}>
                    انصراف
                        </Button>
            </Paper>
        </Modal>
    )

}

export default GetGroupTypes

