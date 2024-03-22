import React from 'react';

import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import Columns from '../constants/GetGroupsColumn';
import GetGroupsService from '../services/GetGroupsService';
import FaIcon from 'shared/components/Icon/Icon';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import toastr from 'toastr';
import './GetGrops.css';
const $ = require("jquery");

class GetGroups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: Columns(),
            open: false,
            deleteModal: false,
            selectedGroup: {}
        };

        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);
    }

    componentDidMount() {
        this.getGroupByFilter();
    }

    openDeleteModal(dataItem) {
        this.setState({ selectedGroup: dataItem, deleteModal: true });
    }
    clodeModal(){
        this.setState({
            deleteModal : false
        });
    }

    deleteGroup(){
        let command = {
           entity : {
               id: this.state.selectedGroup.id
           }
        };
        GetGroupsService.deleteGroup(command , (response) => {
            if(response.success){
                this.setState({
                    deleteModal : false
                })
                this.getGroupByFilter();
                toastr.success("گروه با موفقیت حذف شد")
            }
        })
    }

    getGroupByFilter() {
        let self = this;

        $("#group-list").kendoGrid({
            dataSource: {
                transport: {
                    read: function (option) {

                        GetGroupsService.getAllGroupByFilter(null, function (response) {
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
                $("#group-list tbody tr td span.list").on("click", function (item) {
                    var grid = $("#group-list").data("kendoGrid");
                    var row = $(item.target).closest("tr");
                    var dataItem = grid.dataItem(row);
                    self.props.history.push(
                        {
                            pathname: self.props.list.path,
                            state: {
                                id: dataItem.id,
                                title: dataItem.title
                            }
                        })
                });
                $("#group-list tbody tr td div span.edit").on("click", function (item) {
                    var grid = $("#group-list").data("kendoGrid");
                    var row = $(item.target).closest("tr");
                    var dataItem = grid.dataItem(row);

                    self.props.history.push(
                        {
                            pathname: self.props.edit.path,
                            state: {
                                id: dataItem.id,
                                title: dataItem.title,
                                status: dataItem.status,
                                groupTypeId: dataItem.groupType.id
                            }
                        })

                });

                $("#group-list tbody tr td div span.delete").on("click", function (item) {
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
                <Paper className={"main-paper-container groups"}>
                    <div className="k-rtl height-page">
                        <div id="group-list" className="height-page"></div>
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
            onClose={(e) => that.handleCloseDeleteModal(e)}
        >
            <Paper className="paper-modal">
                <h3 >
                    <FaIcon color="orange" name="fas fa-exclamation-triangle" size={20} />
                    <span className="margin-right-5">حذف گروه</span>
                </h3>
                <hr />
                <h3>آیا از حذف گروه با عنوان  <b>{that.state.selectedGroup.title}</b> مطمئن می باشید؟</h3>
                <br />
                <Button variant="contained" className="btn-delete-modal" onClick={that.deleteGroup}>
                    حذف
                        </Button>
                <Button variant="contained" className="btn-cancel-modal" onClick={that.clodeModal.bind(that)}>
                    انصراف
                        </Button>
            </Paper>
        </Modal>
    )

}

export default GetGroups

