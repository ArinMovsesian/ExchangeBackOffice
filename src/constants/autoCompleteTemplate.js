



export const customerTemplate = "<div class=\"ulAutoTemplate\">" +
    "<span class=\"liAutoTemplate\">#: data.fullName #</span>" +
    "<span class=\"liAutoTemplate\">#: data.nationalId #</span>" +
    "<span class=\"liAutoTemplate\">#: data.fatherName #</span>" +
    "<span class=\"liAutoTemplate\">#: data.accountNumber #</span>" +
    "<span class=\"liAutoTemplate\">#: data.detailLedgerCode #</span>" +
    "</div>";

export const customerHeaderTemplate = "<ul class=\"ulAutoHeaderTemplate\">" +
    "<li class=\"liAutoHeaderTemplate\">عنوان</li>" +
    "<li class=\"liAutoHeaderTemplate\">کد ملی</li>" +
    "<li class=\"liAutoHeaderTemplate\">نام پدر</li>" +
    "<li class=\"liAutoHeaderTemplate\">شماره حساب بانکی</li>" +
    "<li class=\"liAutoHeaderTemplate\">کد تفضیل</li>" +
    "</ul>";


export const detailLedgerTemplate = "<div  class=\"dropdown-header\">" +
    "<span style=\"width:290px;\" class=\"k-state-default\">#: data.title #</span>" +
    "<span class=\"k-state-default\">#: data.code #</span>" +
    "</div>";

export const detailLedgerHeaderTemplate = "<div style=\"width:630px !important;\" class=\"dropdown-header\">" +
    "<span style=\"width:290px;\" class=\"k-widget k-header\" >عنوان</span>" +
    "<span class=\"k-widget k-header\" >کد حساب</span>" +
    "</div>";

export const getNormalDetailedgerAndSubsidiaryLedgerBalanceSheetTemplate = "<div  class=\"dropdown-header\">" +
    "<span style=\"width:140px;\" class=\"k-state-default\">#: data.detailLedgerCode #</span>" +
    "<span style=\"width:590px;\" class=\"k-state-default\">#: data.detailLedgerTitle #</span>" +
    "<span style=\"width:490px;\" class=\"k-state-default\">#: data.subsidiaryLedgerTitle #</span>" +

    "</div>";

export const getNormalDetailedgerAndSubsidiaryLedgerBalanceSheetHeaderTemplate = "<div style=\"width:1230px !important;\" class=\"dropdown-header\">" +

    "<span  style=\"width:140px;\" class=\"k-widget k-header\" >کد حساب</span>" +
    "<span style=\"width:590px;\" class=\"k-widget k-header\" >عنوان تفصیل</span>" +
    "<span style=\"width:490px;\" class=\"k-widget k-header\" >عنوان معین</span>" +
    "</div>";



export const productTemplate = "<div  class=\"dropdown-header\">" +
    "<span style=\"width:290px;\" class=\"k-state-default\">#: data.fullProductName #</span>" +
    "<span style=\"width:290px;\" class=\"k-state-default\">#: data.symbol #</span>" +
    "</div>";

export const productHeaderTemplate = "<div style=\"width:630px !important;\" class=\"dropdown-header\">" +
    "<span style=\"width:290px;\" class=\"k-widget k-header\" >نام محصول</span>" +
    "<span style=\"width:290px;\" class=\"k-widget k-header\" >نماد</span>" +
    "</div>";


















export const customerTemplateForRepresentativeAutoComplete = "<div  class=\"dropdown-header\">" +
    "<span style=\"width:290px;\" class=\"k-state-default\">#: data.fullName #</span>" +
    "<span class=\"k-state-default\">#: data.nationalId #</span>" +
    "<span class=\"k-state-default\">#: data.fatherName #</span>" +
    "<span class=\"k-state-default\">#: data.detailLedgerCode #</span>" +
    "</div>";

export const customerHeaderTemplateForRepresentativeAutoComplete = "<div style=\"width:630px !important;\" class=\"dropdown-header\">" +
    "<span style=\"width:290px;\" class=\"k-widget k-header\" >عنوان</span>" +
    "<span class=\"k-widget k-header\" >کد ملی</span>" +
    "<span class=\"k-widget k-header\" >نام پدر</span>" +
    "<span class=\"k-widget k-header\" >کد تفضیل</span>" +
    "</div>";



export const costCenterTemplate = "<div  class=\"dropdown-header\">" +
    "<span style=\"width:390px;\" class=\"k-state-default\">#: data.code #</span>" +
    "<span class=\"k-state-default\">#: data.title #</span>" +
    "<span class=\"k-state-default\">#: data.parentTitle #</span>" +
    "</div>";

export const costCenterHeaderTemplate = "<div style=\"width:730px !important;\" class=\"dropdown-header\">" +
    "<span style=\"width:390px;\" class=\"k-widget k-header\" >کد</span>" +
    "<span class=\"k-widget k-header\" >عنوان</span>" +
    "<span class=\"k-widget k-header\" >مرکز سرگروه</span>" +
    "</div>";





export const getFlatSearchForAccountingCodeTemplate = "<div  class=\"dropdown-header\">" +
    "<span style=\"width:390px;\" class=\"k-state-default\">#: data.title #</span>" +
    "<span class=\"k-state-default\">#: data.code #</span>" +
    "<span class=\"k-state-default\">#: data.levelTitle #</span>" +
    "</div>";

export const getFlatSearchForAccountingCodeHeaderTemplate = "<div style=\"width:730px !important;\" class=\"dropdown-header\">" +
    "<span style=\"width:390px;\" class=\"k-widget k-header\" >عنوان</span>" +
    "<span class=\"k-widget k-header\" >کد حساب</span>" +
    "<span class=\"k-widget k-header\" >سطح</span>" +
    "</div>";




export const  getAllRepresentativeTemplate = "<div  class=\"dropdown-header\">" +
    "<span style=\"width:390px;\" class=\"k-state-default\">#: data.fullName #</span>" +
    "<span class=\"k-state-default\">#: data.nationalId #</span>" +
    "<span class=\"k-state-default\">#: data.fatherName #</span>" +
    "</div>";

export const  getAllRepresentativeHeaderTemplate = "<div style=\"width:730px !important;\" class=\"dropdown-header\">" +
    "<span style=\"width:390px;\" class=\"k-widget k-header\" >عنوان</span>" +
    "<span class=\"k-widget k-header\" >شناسه ملی</span>" +
    "<span class=\"k-widget k-header\" >نام پدر</span>" +
    "</div>";



export const  getServicesTemplate = "<div  class=\"dropdown-header\">" +
    "<span style=\"width:390px;\" class=\"k-state-default\">#: data.title #</span>" +
    "<span class=\"k-state-default\">#: data.description #</span>" +
    "</div>";

export const getServicesHeaderTemplate = "<div style=\"width:730px !important;\" class=\"dropdown-header\">" +
    "<span style=\"width:390px;\" class=\"k-widget k-header\" >عنوان</span>" +
    "<span class=\"k-widget k-header\" >توضیحات</span>" +
    "</div>";    





export const  searchCommodityProductsTemplate = "<div  class=\"dropdown-header\">" +
    "<span style=\"width:390px;\" class=\"k-state-default\">#: data.symbol #</span>" +
    "<span class=\"k-state-default\">#: data.title #</span>" +
    "</div>";

export const searchCommodityProductsHeaderTemplate = "<div style=\"width:730px !important;\" class=\"dropdown-header\">" +
    "<span style=\"width:390px;\" class=\"k-widget k-header\" >نماد</span>" +
    "<span class=\"k-widget k-header\" >عنوان</span>" +
    "</div>";    




