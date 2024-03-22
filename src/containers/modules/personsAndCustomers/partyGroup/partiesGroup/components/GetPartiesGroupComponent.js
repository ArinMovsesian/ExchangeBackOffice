import React from 'react';

import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import Columns from '../constants/GetPartiesGroupColumn';
import GetPartiesGroupService from '../services/GetPartiesGroupService';
import FaIcon from 'shared/components/Icon/Icon';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import toastr from 'toastr';
import GetPartiesService from '../../../customers/customersList/services/GetPartiesService';
import GetGroupsService from '../../groups/services/GetGroupsService';
import './GetPartyGroup.css';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import { excelToolbar } from '../../../../../../constants/excelPdfToolbar';

const $ = require("jquery");
let selectedIds = [];

class GetPartiesGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: Columns(),
            deleteModal: false,
            selectedParty: { id: 0 },
            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جتسجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
            },
            selectedGroup: { id: 0 },
            group: {
                name: "selectedGroup",
                feild: "title",
                label: "گروه",
                list: []
            },
            open: false,
            addPartyModal: false,
            validUntilDate: null,
            selectedPartyForDelete: { group: {} },
            editPartyModal: false,
            selectedPartyForEdit: {}
        };

        this.getGroups = this.getGroups.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.deletePartyGroup = this.deletePartyGroup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleExpandSearchPanel = this.handleExpandSearchPanel.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.saveParty = this.saveParty.bind(this);
        this.editParty = this.editParty.bind(this);
        this.afterSavePartyGroup = this.afterSavePartyGroup.bind(this);
        this.afterEditPartyGroup = this.afterEditPartyGroup.bind(this);
    }

    componentDidMount() {
        console.log()
        if (this.props.location.state && this.props.location.state.id) {
            this.setState({
                selectedGroup: {
                    id: this.props.location.state.id,
                    title: this.props.location.state.title
                }
            }, () => {
                this.getPartiesGroup();
                this.getGroups();
            });

        } else {
            this.getPartiesGroup();
            this.getGroups();
        }

    }

    getGroups() {
        GetGroupsService.getAllGroupByFilter(null, (response) => {
            if (response.result) {
                this.setState({
                    group: {
                        name: "selectedGroup",
                        feild: "title",
                        label: "گروه",
                        list: response.result
                    }
                })
            }
        })
    }

    openDeleteModal(dataItem) {
        this.setState({ selectedPartyForDelete: dataItem, deleteModal: true });
    }
    clodeModal() {
        this.setState({
            deleteModal: false
        });
    }
    clodeAddModal() {
        this.setState({
            addPartyModal: false
        })
    }
    closeEditModal() {
        this.setState({
            editPartyModal: false
        })
    }
    handleChange(event, name) {
        let value = event.value
        this.setState({
            [name]: value
        })
    }
    deletePartyGroup() {

        if (this.state.selectedPartyForDelete.id) {
            let command = {
                entity: {
                    id: this.state.selectedPartyForDelete.id
                }
            };
            GetPartiesGroupService.deletePartyGroup(command, (response) => {
                if (response.success) {
                    this.setState({
                        deleteModal: false
                    })
                    this.getPartiesGroup();
                    toastr.success("مشتری  با موفقیت از گروه مورد نظر حذف شد")
                }
            })
        } else {
            let command = {
                entity: {
                    ids: selectedIds
                }
            };
            GetPartiesGroupService.deletePartyGroups(command, (response) => {
                if (response.success) {
                    this.setState({
                        deleteModal: false
                    })
                    this.getPartiesGroup();
                    toastr.success("مشتریان  با موفقیت از گروه مورد نظر حذف شد")
                }
            });
        }

    }

    saveParty() {
        this.setState({
            addPartyModal: false
        });
        let command = {
            entity: {
                partyId: this.state.selectedParty.id,
                groupId: this.state.selectedGroup.id,
                validUntil: this.state.validUntilDate
            }

        }
        GetPartiesGroupService.savePartyGroup(command, this.afterSavePartyGroup);
    };

    afterSavePartyGroup(response) {
        if (response.result != null) {

            toastr.success("مشتری با موفقیت به گروه مورد نظر اضافه شد");
            this.setState({
                selectedGroup: {},
                selectedParty: {},
                validUntilDate: null
            });
            this.getPartiesGroup();
        }
    };
    editParty() {
        this.setState({
            editPartyModal: false
        });
        let ids = [];
        if (this.state.selectedPartyForEdit.id) {
            ids.push(this.state.selectedPartyForEdit.id);
        } else {
            ids = selectedIds;
        }

        var command = {
            entity: {
                ids: ids,
                validUntil: this.state.validUntilDate
            }

        }
        GetPartiesGroupService.updatePartyGroups(command, this.afterEditPartyGroup);
    };

    afterEditPartyGroup(response) {
        if (response.result) {
            this.setState({
                validUntilDate: null,

            });
            selectedIds = [];
            toastr.success("تاریخ اعتبار مشتری با موفقیت ویرایش شد");
            this.getPartiesGroup();
        }
    }

    handleChangeDate(value) {
        this.setState({
            validUntilDate: value
        })
    }
    getPartiesGroup() {
        let self = this;

        $("#party-group-list").kendoGrid({
            dataSource: {
                transport: {
                    read: function (option) {
                        if (option.data.state) {
                            self = option.data
                        }
                        var command = {
                            reportFilter: {
                                partyId: self.state.selectedParty.id,
                                groupId: self.state.selectedGroup.id,
                            },
                            OptionalFilter: {
                                page: option.data.page ? option.data.page : 1,
                                take: option.data.take ? option.data.take : 50,
                                sort: option.data.sort ? option.data.sort :
                                    [{
                                        field: "partyFullName",
                                        dir: "asc"
                                    }]
                            }
                        }
                        GetPartiesGroupService.getFlatPartyGroup(command, function (response) {
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
                sort: {
                    field: "partyFullName",
                    dir: "asc"
                },
                pageSize: 50,
                serverPaging: true,
                serverSorting: true,
                schema: {
                    model: {
                        id: 'id',
                    },
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
                template: '<p class="orange-page font-size-2 no-data">رکوردی جهت نمایش وجود ندارد.</p>'
            },
            toolbar:
                `<button id="add">افزودن</button>
            <button id="delete"  disabled="true">حذف</button>
                    <button id="edit" disabled="true"> ویرایش</button> 
                    ${excelToolbar}`,
            dataBound: function (e) {
                let grid = e.sender;
                let rows = grid.tbody.find("[role='row']");

                rows.unbind("click");
                rows.on("click", function (e) {
                    if ($(e.target).hasClass("k-checkbox-label")) {
                        return;
                    }
                    let row = $(e.target).closest("tr");
                    let checkbox = $(row).find(".k-checkbox");
                    checkbox.click();
                });


                $("#party-group-list tbody tr td div span.edit").on("click", function (item) {
                    var grid = $("#party-group-list").data("kendoGrid");
                    var row = $(item.target).closest("tr");
                    var dataItem = grid.dataItem(row);
                    self.setState({
                        editPartyModal: true,
                        selectedPartyForEdit: dataItem,
                        validUntilDate: dataItem.validUntil
                    })
                });

                $("#party-group-list tbody tr td div span.delete").on("click", function (item) {
                    var grid = $("#party-group-list").data("kendoGrid");
                    var row = $(item.target).closest("tr");
                    var dataItem = grid.dataItem(row);
                    self.openDeleteModal(dataItem);
                });

                $("#add").on("click", function () {
                    self.setState({
                        addPartyModal: true,
                    })
                });

                $("#delete").on("click", function () {
                    self.setState({
                        deleteModal: true,
                        selectedPartyForDelete: { group: {} }
                    })
                });

                $("#edit").on("click", function () {
                    self.setState({
                        editPartyModal: true,
                        selectedPartyForEdit: {},
                        validUntilDate: null
                    });
                });

            },
            columns: self.state.columns,
            change: self.checkBoxSelectHandles
        });

    };

    checkBoxSelectHandles = (arg) => {

        let temp = Object.keys(arg.sender._selectedIds);
        console.log(temp);

        let convertedTemp = temp.map((value) => {
            return parseInt(value);
        });
        if (convertedTemp.length === 0) {
            $('#delete').attr('disabled', 'disabled');
            $('#edit').attr('disabled', 'disabled');
        } else {
            $('#delete').removeAttr('disabled');
            $('#edit').removeAttr('disabled');
        }
        selectedIds = convertedTemp;
    };

    handleExpandSearchPanel() {
        this.setState({
            open: !this.state.open
        })
    }

    search() {
        if ($("#party-group-list").data("kendoGrid") !== undefined)
            $("#party-group-list").data("kendoGrid").dataSource.read(this);
    }
    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container party-group"}>
                    <Filter search={this.search}
                        handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>

                        <div classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={9}>
                                    <AutoCompleteComponent {...this.state.party}
                                        handleChange={(value) => this.handleChange(value, 'selectedParty')}
                                        value={this.state.selectedParty.fullName}
                                        service={GetPartiesService.getAllPartyForAutocomplete} />
                                </Grid>
                                <Grid item md={3}>
                                    <DropDownComponent {...this.state.group}
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                                        value={this.state.selectedGroup} />
                                </Grid>
                            </Grid>

                        </div>

                    </Filter>
                    <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
                        <div id="party-group-list" className="height-page"></div>
                    </div>
                    {deleteModal(this)}
                    {addModal(this)}
                    {editModal(this)}
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
                    {
                        that.state.selectedPartyForDelete.id ?
                            <span className="margin-right-5">حذف مشتری از گروه <b>{that.state.selectedPartyForDelete.group.title}</b> </span>
                            :
                            <span className="margin-right-5">حذف مشتریان انتخاب شده از گروه</span>
                    }

                </h3>
                <hr />
                {
                    that.state.selectedPartyForDelete.id ?
                        <h3>آیا از حذف مشتری   <b>{that.state.selectedPartyForDelete.partyFullName} </b>از گروه مورد نظر مطمئن می باشید؟ </h3>
                        :
                        <h3>آیا از حذف مشتریان از گروه مورد نظر مطمئن می باشید؟ </h3>
                }

                <br />
                <Button variant="contained" className="btn-delete-modal" onClick={that.deletePartyGroup}>
                    حذف
                        </Button>
                <Button variant="contained" className="btn-cancel-modal" onClick={that.clodeModal.bind(that)}>
                    انصراف
                        </Button>
            </Paper>
        </Modal>
    )

}
function addModal(that) {
    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={that.state.addPartyModal}
            className="modal-full-width"
        >
            <Paper className="paper-modal">
                <h3 >
                    <FaIcon color="orange" name="fas fa-user-plus" size={20} />
                    <span className="margin-right-5">افزودن مشتری</span>
                </h3>
                <hr />
                <Grid container spacing={8} className="no-margin">
                    <Grid item md={12}>
                        <AutoCompleteComponent {...that.state.party}
                            handleChange={(value) => that.handleChange(value, 'selectedParty')}
                            value={that.state.selectedParty.fullName}
                            service={GetPartiesService.getAllPartyForAutocomplete} />
                    </Grid>
                </Grid>
                <Grid container spacing={8} className="no-margin">
                    <Grid item md={4}>
                        <DropDownComponent {...that.state.group}
                            handleChange={(value, name) => that.handleChange(value, name)} isFilterable={true}
                            value={that.state.selectedGroup} />
                    </Grid>
                    <Grid item md={4}>
                        <PersianDatePicker selectedDate={that.state.validUntilDate} label="معتبر تا تاریخ" handleOnChange={that.handleChangeDate} />
                    </Grid>
                </Grid>
                <br />
                <Button variant="contained" className="btn-save-modal" onClick={that.saveParty}>
                    افزودن
                        </Button>
                <Button variant="contained" className="btn-cancel-modal" onClick={that.clodeAddModal.bind(that)}>
                    انصراف
                        </Button>
            </Paper>
        </Modal>
    )
}

function editModal(that) {
    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={that.state.editPartyModal}
        >
            <Paper className="paper-modal">
                <h3 >
                    <FaIcon color="orange" name="fas fa-user-plus" size={20} />
                    {
                        that.state.selectedPartyForEdit.id ?
                            <span className="margin-right-5">ویرایش تاریخ اعتبار مشتری <b>{that.state.selectedPartyForEdit.partyFullName}</b></span>
                            :
                            <span className="margin-right-5">ویرایش تاریخ اعتبار مشتریان انتخاب شده</span>
                    }

                </h3>
                <hr />
                <Grid container spacing={8} className="no-margin">
                    <Grid item md={5}>
                        <PersianDatePicker selectedDate={that.state.validUntilDate} label="معتبر تا تاریخ" handleOnChange={that.handleChangeDate} />
                    </Grid>
                </Grid>
                <br />
                <Button variant="contained" className="btn-save-modal" onClick={that.editParty}>
                    ذخیره
                        </Button>
                <Button variant="contained" className="btn-cancel-modal" onClick={that.closeEditModal.bind(that)}>
                    انصراف
                        </Button>
            </Paper>
        </Modal>
    )
}
export default GetPartiesGroup

