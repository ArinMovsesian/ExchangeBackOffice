const sideItems =
    [
        {
            menu: {
                name: "Dashboard", menuTitle: "پیشخوان", id: 100, type: 1, menuIcon: "fas fa-tachometer-alt", componentName: "Dashboard", menuPage: { pageLink: "/main/dashboard" }
            },
            childs: []
        },
        {
            menu: { name: "Header-BaseInformation", menuTitle: "اطلاعات پایه", id: 200, type: 3 },
            childs:
                [
                    {
                        menu: { name: "BaseInformation", menuIcon: "fas fa-info", menuTitle: "اطلاعات پایه", id: 201, type: 2 },
                        childs: [
                            {
                                menu: {
                                    name: "BankAccounts", menuTitle: "حسابهای بانکی", id: 202, menuIcon: "fas fa-money-check", type: 1, componentName: "GetBankAccounts", menuPage: { pageLink: "/main/basicInformation/getBankAccounts" }
                                },
                                childs: []
                            },
                            {
                                menu: {
                                    name: "GetBranch", menuTitle: "شعب کارگزاری", id: 203, menuIcon: "fas fa-code-branch", type: 1, componentName: "GetBranch", menuPage: { pageLink: "/main/basicInformation/getBranch" }
                                },
                                childs: []
                            },

                            {
                                menu: {
                                    name: "GetBroker", menuTitle: "فهرست کارگزاری ها", id: 203, menuIcon: "fas fa-code-branch", type: 1, componentName: "GetBranch", menuPage: { pageLink: "/main/basicInformation/getBrokers" }
                                },
                                childs: []
                            },


                        ]
                    },

                ]
        },
        {
            menu: { name: "accounting", id: 300, menuTitle: "حسابداری", type: 3 }, childs: [
                {
                    menu: { name: "accountingReport", menuTitle: "اطلاعات پایه", id: 301, menuIcon: 'fas fa-tag', open: false, type: 2 }, childs: [
                        { menu: { name: "GetGeneralLedger", menuTitle: "حساب کل", id: 302, menuIcon: 'fas fa-calculator', type: 1, componentName: "GetGeneralLedger", menuPage: { pageLink: "/main/accounting/base/getGeneralLedger" } } },
                        { menu: { name: "GetSubsidiaryLedger", menuTitle: "حساب معین", id: 303, menuIcon: 'fas fa-calculator', type: 1, componentName: "GetSubsidiaryLedger", menuPage: { pageLink: "/main/accounting/base/getSubsidiaryLedger" } } },
                        { menu: { name: "GetDetailLedger", menuTitle: "حساب تفصیل", id: 304, menuIcon: 'fas fa-calculator', type: 1, componentName: "GetDetailLedger", menuPage: { pageLink: "/main/accounting/base/getDetailLedger" } } },
                        // { name: "GetManageAccountCodesRelation", menuTitle: "مدیریت ارتباط حسابها", id: 305, menuIcon: 'fas fa-calculator', type: 3, componentName: "GetDetailLedger", menuPage: {pageLink: "/main/accounting/base/getmanageAccountCodeRelation" },
                        { menu: { name: "GeCostCenters", menuTitle: "مرکز هزینه", id: 306, menuIcon: 'far fa-money-bill-alt', type: 1, componentName: "GeCostCenters", menuPage: { pageLink: "/main/accounting/base/getCostCenters" } } },
                        { menu: { name: "GetFiscalGroups", menuTitle: "گروه مالی", id: 307, menuIcon: 'fas fa-tag', type: 1, componentName: "GetFiscalGroups", menuPage: { pageLink: "/main/accounting/base/getFiscalGroups" } } },
                        { menu: { name: "GetFiscalYears", menuTitle: "سال مالی", id: 308, menuIcon: 'fa fa-calendar', type: 1, componentName: "GetFiscalYears", menuPage: { pageLink: "/main/accounting/base/getFiscalYears" } } },
                        { menu: { name: "", menuTitle: "مدیریت نوع سند", id: 309, menuIcon: 'fa fa-calendar', type: 1, componentName: "", menuPage: { pageLink: "/main/accounting/base/voucherTypeManagement" } } },
                        { menu: { name: "AccountingSettings", menuTitle: "تنظیمات", id: 310, menuIcon: 'fa fa-calendar', type: 1, componentName: "", menuPage: { pageLink: "/main/accounting/base/setting" } } },
                    ]
                },
                {
                    menu: { name: "accountingReport", menuTitle: "گزارش های حسابداری", id: 311, menuIcon: 'fas fa-file', open: false, type: 2 }, childs: [
                        { menu: { name: "GetGeneralLedgerBalance", menuTitle: "تراز آزمایشی کل", id: 312, menuIcon: 'fas fa-calculator', type: 3, componentName: "GetGeneralLedgerBalance", menuPage: { pageLink: "/main/accounting/report/getGeneralLedgerBalance" } } },
                        { menu: { name: "GetSubsidaryLedgerBalance", menuTitle: "تراز آزمایشی معین", id: 313, menuIcon: 'fas fa-calculator', type: 3, componentName: "GetSubsidaryLedgerBalance", menuPage: { pageLink: "/main/accounting/report/getSubsidiaryLedgerBalance" } } },
                        { menu: { name: "GetSubsidaryLedgerBalance", menuTitle: "تراز آزمایشی تفضیل", id: 314, menuIcon: 'fas fa-calculator', type: 3, componentName: "GetSubsidaryLedgerBalance", menuPage: { pageLink: "/main/accounting/report/getDetailLedgerBalance" } } },
                        { menu: { name: "GetGeneralAccountBook", menuTitle: "دفتر حساب کل", id: 315, menuIcon: 'fa fa-book', type: 3, componentName: "GetGeneralAccountBook", menuPage: { pageLink: "/main/accounting/report/getGeneralAccountBook" } } },
                        { menu: { name: "GetAccountBook", menuTitle: "دفتر حساب معین", id: 316, menuIcon: 'fa fa-book', type: 3, componentName: "GetAccountBook", menuPage: { pageLink: "/main/accounting/report/getSubsidiaryAccountBook" } } },
                        { menu: { name: "GetAccountBook", menuTitle: "دفتر حساب تفصیل", id: 317, menuIcon: 'fa fa-book', type: 3, componentName: "GetAccountBook", menuPage: { pageLink: "/main/accounting/report/getDetailAccountBook" } } },
                        { menu: { name: "GetLiquidityReport", menuTitle: "گزارش نقدینگی", id: 318, menuIcon: 'fa fa-money-bill-alt', type: 3, componentName: "GetLiquidityReport", menuPage: { pageLink: "/main/accounting/report/getliquidityreport" } } },
                        { menu: { name: "GetSoknaReport", menuTitle: "گزارش سکنی", id: 319, menuIcon: 'fa fa-money-bill-alt', type: 3, componentName: "GetSoknaReport", menuPage: { pageLink: "/main/accounting/report/soknareport" } } },
                        { menu: { name: "GetSoknaReport", menuTitle: "صورت سود و زیان", id: 320, menuIcon: 'fa fa-money-bill-alt', type: 3, componentName: "GetSoknaReport", menuPage: { pageLink: "/main/accounting/report/incomestatement" } } },
                        { menu: { name: "GetSoknaReport", menuTitle: "ترازنامه", id: 321, menuIcon: 'fa fa-money-bill-alt', type: 3, componentName: "GetSoknaReport", menuPage: { pageLink: "/main/accounting/report/balancesheet" } } },
                        { menu: { name: "", menuTitle: "دفتر روزنامه", id: 322, menuIcon: 'fa fa-money-bill-alt', type: 3, componentName: "", menuPage: { pageLink: "/main/accounting/report/newspaperreportmonthlyvouchertype" } } }



                    ]
                },
                {
                    menu: { name: "accountingReport", menuTitle: "عملیات حسابداری", id: 323, menuIcon: 'fas fa-tasks', open: false, type: 2 }, childs: [
                        { menu: { name: "GetVouchers", menuTitle: "فهرست اسناد", id: 324, menuIcon: 'fas fa-file', type: 3, componentName: "GetVouchers", menuPage: { pageLink: "/main/accounting/report/getVouchersMaster" } } },
                        { menu: { name: "GetVouchers", menuTitle: "اضافه کردن سند دستی", id: 325, menuIcon: 'fas fa-file', type: 3, componentName: "GetVouchers", menuPage: { pageLink: "/main/accounting/report/addVouchers" } } },
                    ]
                },




            ]
        },
        {
            name: "persons", menuTitle: "مشتریان و اشخاص", id: 400, type: 1, childs: [
                {
                    name: "customers", menuTitle: "مشتریان", id: 401, menuIcon: "fas fa-users", open: false, type: 2, childs: [
                        { name: "GetCustomers", menuTitle: "فهرست مشتریان", id: 402, menuIcon: "fas fa-users", type: 3, componentName: "GetCustomers", menuPage: { pageLink: "/main/persons/customers/getParties" } },
                        { name: "GetCustomersRelation", menuTitle: "ارتباط بین مشتریان", id: 403, menuIcon: "fa fa-link", type: 3, componentName: "GetCustomersRelation", menuPage: { pageLink: "/main/persons/customers/getCustomersRelation" } },
                        { name: "AddRealCustomers", menuTitle: " ثبت مشتریان حقیقی", id: 404, menuIcon: "fas fa-plus", type: 3, componentName: "AddRealCustomer", menuPage: { pageLink: "/main/persons/customers/addRealCustomer" } },
                        { name: "AddLegalCustomers", menuTitle: " ثبت مشتریان حقوقی ", id: 405, menuIcon: "fas fa-plus", type: 3, componentName: "AddLegalCustomer", menuPage: { pageLink: "/main/persons/customers/addLegalCustomer" } },
                        { name: "GetPartyBankAccounts", menuTitle: "مدیریت حسابهای بانکی", id: 406, menuIcon: "fas fa-money-check", type: 3, componentName: "GetPartyBankAccounts", menuPage: { pageLink: "/main/persons/customers/getPartyBankAccounts" } },
                        { name: "managedCustomerContact", menuTitle: "مدیریت تماس با مشتری ", id: 407, menuIcon: "fas fa-money-check", type: 3, componentName: "", menuPage: { pageLink: "/main/persons/customers/managedCustomerContact" } },
                        { name: "getCustomerTradingCodes", menuTitle: "کد های معاملاتی مشتریان", id: 408, menuIcon: "fas fa-money-check", type: 3, componentName: "", menuPage: { pageLink: "/main/persons/customers/getCustomerTradingCodes" } },
                        { name: "manageCustomerRecords", menuTitle: "مدیریت مدارک مشتری", id: 409, menuIcon: "fas fa-money-check", type: 3, componentName: "", menuPage: { pageLink: "/main/persons/customers/manageCustomerRecords" } },
                        { name: "partyRoles", menuTitle: "مدیریت اشخاص", id: 410, menuIcon: "fas fa-user", type: 3, componentName: "", menuPage: { pageLink: "/main/persons/customers/partyRoles" } },
                        // { name: "personManagement", menuTitle: "ظ…ط¯غŒط±غŒطھ ط§ط´ط®ط§طµ", id: 409, menuIcon: "fas fa-user", type: 3, componentName: "", menuPage: {pageLink: "/main/persons/customers/personManagement" },
                        { name: "partyAccountBook", menuTitle: "دفتر حساب مشتری", id: 411, menuIcon: "fas fa-money-check", type: 3, componentName: "", menuPage: { pageLink: "/main/persons/customers/getAccountBook" } },
                    ]
                },
                {
                    name: "partyGroup", menuTitle: "گروه مشتریان", id: 412, menuIcon: "fa fa-users", open: false, type: 2, childs: [
                        { name: "TypeGroups", menuTitle: "فهرست انواع گروه", id: 413, menuIcon: "fas fa-object-group", type: 3, componentName: "", menuPage: { pageLink: "/main/persons/partyGroup/typeGroups" } },
                        { name: "Groups", menuTitle: "فهرست گروه ها", id: 414, menuIcon: "fas fa-list-alt", type: 3, componentName: "", menuPage: { pageLink: "/main/persons/partyGroup/groups" } },
                        { name: "PartiesGroup", menuTitle: "فهرست مشتریان گروه", id: 415, menuIcon: "fas fa-user-friends", type: 3, componentName: "", menuPage: { pageLink: "/main/persons/partyGroup/partiesGroup" } }
                    ]
                },
                {
                    name: "partyService", menuTitle: "خدمات مشتریان", id: 416, menuIcon: "fa fa-users", open: false, type: 2, childs: [
                        { name: "serviceList", menuTitle: "فهرست خدمات", id: 417, menuIcon: "fas fa-object-group", type: 3, componentName: "", menuPage: { pageLink: "/main/persons/partyService/serviceList" } },
                        { name: "customerServiceList", menuTitle: "فهرست خدمات مشتریان", id: 418, menuIcon: "fas fa-list-alt", type: 3, componentName: "", menuPage: { pageLink: "/main/persons/partyService/customerServiceList" } },
                    ]
                },
                {
                    name: "partyReports", menuTitle: "گزارش های مشتریان", id: 419, menuIcon: "fa fa-users", open: false, type: 2, childs: [
                        { name: "incompletePartyList", menuTitle: "فهرست مشتریان ناقص", id: 420, menuIcon: "fas fa-object-group", type: 3, componentName: "", menuPage: { pageLink: "/main/persons/partyReports/incompletePartyList" } },
                        { name: "activedeActivePartiesReportList", menuTitle: "فهرست مشتریان فعال و غیر فعال", id: 421, menuIcon: "fas fa-object-group", type: 3, componentName: "", menuPage: { pageLink: "/main/persons/partyReports/activedeActivePartiesReportList" } },
                        { name: "customersInternetactivity", menuTitle: "فهرست فعالیت اینترنتی مشتریان", id: 422, menuIcon: "fas fa-object-group", type: 3, componentName: "", menuPage: { pageLink: "/main/persons/partyReports/customersInternetactivity" } },
                    ]
                }
            ]
        },
        {
            name: "trades", menuTitle: "معاملات", id: 500, type: 1, childs: [
                {
                    name: "trades", menuTitle: "معاملات", id: 501, menuIcon: "fas fa-chart-line", open: false, type: 2, childs: [
                        { name: "tradeList", menuTitle: "فهرست معاملات", id: 502, menuIcon: "fas fa-chart-area", type: 3, componentName: "GetTrades", menuPage: { pageLink: "/main/trade/trades/getTrades" } },
                        { name: "tradeList", menuTitle: "اعلامیه خرید و فروش ", id: 503, menuIcon: "fas fa-shopping-cart", type: 3, componentName: "GetTradeNumber", menuPage: { pageLink: "/main/trade/trades/getTradeNumber" } },
                        // { name: "wareHouseUpload", menuTitle: "بارگذاری فایل هزینه انبار", id: 503, menuIcon: "fas fa-shopping-cart", type: 3, componentName: "", menuPage: {pageLink: "/main/trade/trades/wareHouseUpload" },
                        { name: "", menuTitle: "گزارش فعالترین مشتریان", id: 504, menuIcon: "fas fa-shopping-cart", type: 3, componentName: "", menuPage: { pageLink: "/main/trade/trades/mostActiveCustomer" } },
                        { name: "getonlinetradereport", menuTitle: "گزارش معاملات اینترنتی", id: 505, menuIcon: "fas fa-shopping-cart", type: 3, componentName: "", menuPage: { pageLink: "/main/trade/trades/getonlinetradereport" } },
                        { name: "getbranchoperationaltotalreport", menuTitle: "گزارش عملکرد شعب", id: 506, menuIcon: "fas fa-shopping-cart", type: 3, componentName: "", menuPage: { pageLink: "/main/trade/trades/getbranchoperationaltotalreport" } },
                        { name: "BranchOperationaltTypeUserReport", menuTitle: "گزارش عملکرد شعب به تفکیک شعبه و نوع کاربر", id: 507, menuIcon: "fas fa-shopping-cart", type: 3, componentName: "", menuPage: { pageLink: "/main/trade/trades/getBranchOperationaltTypeUserReport" } }
                    ]
                },
                {
                    name: "trades", menuTitle: "نقدی کالا", id: 507, menuIcon: "fas fa-chart-line", open: false, type: 2, childs: [
                        { name: "tradeListCommodity", menuTitle: "فهرست معاملات کالا", id: 508, menuIcon: "fas fa-shopping-cart", type: 3, componentName: "", menuPage: { pageLink: "/main/trade/trades/tradeListCommodity" } },
                        // { name: "tradeListCommodity", menuTitle: "اعلامیه خرید و فروش کالا", id: 509, menuIcon: "fas fa-shopping-cart", type: 3, componentName: "", menuPage: {pageLink: "" },
                        // { name: "tradeListUpload", menuTitle: "بارگذاری معاملات کالا", id: 510, menuIcon: "fas fa-shopping-cart", type: 3, componentName: "", menuPage: {pageLink: "/main/trade/trades/tradeListUpload" },
                        { name: "", menuTitle: "بارگذاری فایل تسویه کالا", id: 511, menuIcon: "fas fa-shopping-cart", type: 3, componentName: "", menuPage: { pageLink: "/main/trade/trades/settlementCommodityTradeUpload" } },
                        { name: "", menuTitle: "بارگذاری فایل پیش پرداخت کالا", id: 512, menuIcon: "fas fa-shopping-cart", type: 3, componentName: "", menuPage: { pageLink: "/main/trade/trades/prepaymentCommodityTradeUpload" } },
                    ]
                }
            ]
        },
        {
            name: "orders", menuTitle: "سفارش ها", id: 600, type: 1, childs: [
                {
                    name: "orders", menuTitle: "سفارش ها", id: 601, menuIcon: "fas fa-chart-line", open: false, type: 2, childs: [
                        { name: "addOrder", menuTitle: "افزودن سفارش ", id: 602, menuIcon: "fas fa-plus", type: 3, componentName: "AddOrderComponent", menuPage: { pageLink: "/main/order/orders/addOrder" } },
                        { name: "orderList", menuTitle: "فهرست سفارش ها ", id: 603, menuIcon: "fas fa-chart-area", type: 3, componentName: "GetOrders", menuPage: { pageLink: "/main/order/orders/getOrders" } },
                        { name: "orderList", menuTitle: "فهرست سفارش های فعال ", id: 604, menuIcon: "fas fa-chart-area", type: 3, componentName: "GetOrders", menuPage: { pageLink: "/main/order/orders/getِDailyOrders" } },
                        { name: "RemovedOrderList", menuTitle: "فهرست سفارش های ابطال شده ", id: 605, menuIcon: "fas fa-chart-area", type: 3, componentName: "GetOrders", menuPage: { pageLink: "/main/order/orders/getRemovedOrders" } },
                        { name: "ordersStatusList", menuTitle: "فهرست تب های معاملاتی ", id: 606, menuIcon: "fas fa-chart-area", type: 3, componentName: "GetOrdersStatus", menuPage: { pageLink: "/main/order/orders/GetTseOfflineOrderBranch" } },
                        { name: "ordersStatusList", menuTitle: "مدیریت اقدام ", id: 607, menuIcon: "fas fa-chart-area", type: 3, componentName: "GetOrdersStatus", menuPage: { pageLink: "/main/order/orders/getOrderDispatch" } },
                        { name: "ordersStatusList", menuTitle: "سفارش های انجام شده فاقد درخواست", id: 608, menuIcon: "fas fa-chart-area", type: 3, componentName: "GetOrdersStatus", menuPage: { pageLink: "/main/order/orders/tradesWithoutOrder" } },
                        { name: "ordersStatusList", menuTitle: "سفارش های انجام شده ", id: 609, menuIcon: "fas fa-chart-area", type: 3, componentName: "GetOrdersStatus", menuPage: { pageLink: "/main/order/orders/getDoneOrders" } },


                        // { name: "ordersStatusList", menuTitle: "تنظیمات سفارش ها", id: 610, menuIcon: "fas fa-chart-area", type: 3, componentName: "GetOrdersStatus", menuPage: {pageLink: "/main/order/orders/setting" },
                        // { name: "orderSetting", menuTitle: "تنظیمات سفارش ها", id: 605, menuIcon: "fas fa-chart-area", type: 3, componentName: "GetOrdersStatus", menuPage: {pageLink: "/main/order/orders/setting" },
                    ]
                },
                // {
                //     name: "trades", menuTitle: "نقدی کالا", id: 611, menuIcon: "fas fa-chart-line", open: false, type: 2, childs: [

                //         { name: "", menuTitle: "مدیریت درخواست کالا", id: 612, menuIcon: "fas fa-shopping-cart", type: 3, componentName: "", menuPage: {pageLink: "" },

                //     ]
                // }
            ]
        },
        {
            name: "cashFlow", menuTitle: "دریافت و پرداخت", id: 700, type: 1, childs: [
                {
                    name: "chequeManagement", menuTitle: "مدیریت چک", id: 701, menuIcon: "fas fa-money-bill", open: false, type: 2, childs: [
                        { name: "chequebook", menuTitle: "دسته چک", id: 702, menuIcon: "fa fa-money-bill-alt", type: 3, componentName: "", menuPage: { pageLink: "/main/cashFlow/chequeManagement/chequebook" } },
                        { name: "chequepaper", menuTitle: "برگه چک", id: 703, menuIcon: "fa fa-money-bill-alt", type: 3, componentName: "", menuPage: { pageLink: "/main/cashFlow/chequeManagement/chequepaper" } },
                    ]
                },
                {
                    name: "receive", menuTitle: "دریافت", id: 704, menuIcon: "fas fa-money-bill", open: false, type: 2, childs: [
                        { name: "receiveList", menuTitle: "فهرست دریافت", id: 705, menuIcon: "fa fa-money-bill-alt", type: 3, componentName: "", menuPage: { pageLink: "/main/cashFlow/receive/receiveList" } },

                    ]
                },
                {
                    name: "payment", menuTitle: "پرداخت", id: 706, menuIcon: "fas fa-money-bill", open: false, type: 2, childs: [
                        { name: "moneyRequest", menuTitle: "تقاضای وجه", id: 707, menuIcon: "fa fa-money-bill-alt", type: 3, componentName: "", menuPage: { pageLink: "/main/cashFlow/receive/moneyRequest" } },
                        { name: "paymentList", menuTitle: "فهرست پرداخت", id: 708, menuIcon: "fa fa-money-bill-alt", type: 3, componentName: "", menuPage: { pageLink: "/main/cashFlow/payment/paymentList" } },
                        // { name: "moneyTransfer", menuTitle: "انتقال وجه", id: 708, menuIcon: "fa fa-money-bill-alt", type: 3, componentName: "", menuPage: {pageLink: "/main/cashFlow/payment/moneyTransfer"},
                    ]
                },
                {
                    name: "moneyTransfer", menuTitle: "انتقال وجه", id: 709, menuIcon: "fas fa-money-bill", open: false, type: 2, childs: [
                        { name: "moneyTransferList", menuTitle: "فهرست انتقال وجه", id: 710, menuIcon: "fa fa-money-bill-alt", type: 3, componentName: "", menuPage: { pageLink: "/main/cashFlow/payment/moneyTransfer" } },
                    ]
                },
                {
                    name: "paymentAndReceiveList", menuTitle: "گزارش دریافت و پرداخت", id: 711, childs: [], type: 3, menuIcon: "fas fa-tachometer-alt", componentName: "", menuPage: { pageLink: "/main/cashFlow/paymentAndReceive/paymentAndReceiveList" }
                },
                {
                    name: "cashFlowSetting", menuTitle: "تنظیمات دریافت پرداخت", id: 712, childs: [], type: 3, menuIcon: "fas fa-tachometer-alt", componentName: "", menuPage: { pageLink: "/main/cashFlow/cashFlowSetting/setting" }
                }



            ]
        },
        {
            name: "users", menuTitle: "کاربران", id: 800, type: 1, childs: [
                {
                    name: "basicInformationDropDown", menuIcon: "fas fa-user", menuTitle: "مدیریت کاربران", id: 801, type: 2, childs: [
                        {
                            name: "GetBankAccounts", menuTitle: "فهرست کاربران", id: 802, childs: [], menuIcon: "fas fa-users", type: 3, componentName: "GetBankAccounts", menuPage: { pageLink: "/main/resource/users/getUsers" }
                        },
                        {
                            name: "GetBranch", menuTitle: "افزودن کاربر جدید", id: 803, childs: [], menuIcon: "fas fa-user-plus", type: 3, componentName: "GetBranch", menuPage: { pageLink: "/main/resource/users/addUser" }
                        },
                        {
                            name: "GetRoles", menuTitle: "فهرست نقش ها", id: 804, childs: [], menuIcon: "fas fa-users", type: 3, componentName: "GetBankAccounts", menuPage: { pageLink: "/main/resource/users/getRoles" }
                        },
                        {
                            name: "SaveRole", menuTitle: "افزودن نقش جدید", id: 805, childs: [], menuIcon: "fas fa-user-plus", type: 3, componentName: "GetBranch", menuPage: { pageLink: "/main/resource/users/addRole" }
                        }
                    ]
                }

            ]
        }


    ];
export default sideItems

