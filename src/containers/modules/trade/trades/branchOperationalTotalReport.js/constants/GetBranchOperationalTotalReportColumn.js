const Columns = function (prop, state, classes) {
    return [
       
        {
            title: 'خرید',
            columns: [
                {
                    title: "کد شعبه",
                    field: "buyDetails.branchCode",
                    width: "200px"
                },
                {
                    title: "نام شعبه",
                    field: "buyDetails.branchTitle",
                    width: "200px"
                },
                {
                    title: "نوع تراکنش",
                    field: "buyDetails.transactionTypeTitle",
                    width: "200px"
                },
                {
                    title: "مبلغ",
                    field: "buyDetails.volume",
                    width: "200px",
                    filter: "numeric",
                    attributes: { class: "text-left" },
                    format: "{0:n0}",
                },
                {
                    title: "کارمزد کارگزاری",
                    field: "buyDetails.brokerFee",
                    width: "200px",
                    filter: "numeric",
                    attributes: { class: "text-left" },
                    format: "{0:n0}",
                },
                {
                    title: "کارمزد سپرده گزاری",
                    field: "buyDetails.csdFee",
                    width: "200px",
                    filter: "numeric",
                    attributes: { class: "text-left" },
                    format: "{0:n0}",
                },
                {
                    title: "کارمزد مدیریت فناوری",
                    field: "buyDetails.tseTmcFee",
                    width: "200px",
                    filter: "numeric",
                    attributes: { class: "text-left" },
                    format: "{0:n0}",
                },
                {
                    title: "کارمزد بورس مربوطه",
                    field: "buyDetails.tseFee",
                    width: "200px",
                    filter: "numeric",
                    attributes: { class: "text-left" },
                    format: "{0:n0}",
                },
                {
                    title: "کارمزد حق نظارت سازمان",
                    field: "buyDetails.seoFee",
                    width: "200px",
                    filter: "numeric",
                    attributes: { class: "text-left" },
                    format: "{0:n0}",
                },
    
                {
                    title: "مالیات",
                    field: "buyDetails.tax",
                    width: "200px",
                    filter: "numeric",
                    attributes: { class: "text-left" },
                    format: "{0:n0}",
                },
                {
                    title: "کارمزد رایان بورس",
                    field: "buyDetails.rayanBourseFee",
                    width: "200px",
                    filter: "numeric",
                    attributes: { class: "text-left" },
                    format: "{0:n0}",
                },
                {
                    title: "کارمزد حق دسترسی",
                    field: "buyDetails.rightToAccessFee",
                    width: "200px",
                    filter: "numeric",
                    attributes: { class: "text-left" },
                    format: "{0:n0}",
                },
                {
                    title: "مبلغ کل",
                    field: "buyDetails.totalPrice",
                    width: "200px",
                    filter: "numeric",
                    attributes: { class: "text-left" },
                    format: "{0:n0}",
                },
                {
                    title: "سود اوراق مشارکت",
                    field: "buyDetails.couponAmount",
                    width: "200px",
                    filter: "numeric",
                    attributes: { class: "text-left" },
                    format: "{0:n0}",
                },
                {
                    title: "تخفیف",
                    field: "buyDetails.discount",
                    width: "200px",
                    filter: "numeric",
                    attributes: { class: "text-left" },
                    format: "{0:n0}",
                },
                {
                    title: "مبلغ خالص",
                    field: "buyDetails.netAmount",
                    width: "200px",
                    filter: "numeric",
                    attributes: { class: "text-left" },
                    format: "{0:n0}",
                },
                {
                    title: "نوع مشتری",
                    field: "buyDetails.partyTypeTitle",
                    width: "200px"
                },
            ]
          },
          {
            title: 'فروش',
            columns: [
                {
                    title: "کد شعبه",
                    field: "sellDetails.branchCode",
                    width: "200px"
                },
                {
                    title: "نام شعبه",
                    field: "sellDetails.branchTitle",
                    width: "200px"
                },
                {
                    title: "نوع تراکنش",
                    field: "sellDetails.transactionTypeTitle",
                    width: "200px"
                },
                {
                    title: "مبلغ",
                    field: "sellDetails.volume",
                    width: "200px",
                    filter: "numeric",
                    attributes: { class: "text-left" },
                    format: "{0:n0}",
                },
                {
                    title: "کارمزد کارگزاری",
                    field: "sellDetails.brokerFee",
                    width: "200px",
                    filter: "numeric",
                    attributes: { class: "text-left" },
                    format: "{0:n0}",
                },
                {
                    title: "کارمزد سپرده گزاری",
                    field: "sellDetails.csdFee",
                    width: "200px",
                    filter: "numeric",
                    attributes: { class: "text-left" },
                    format: "{0:n0}",
                },
                {
                    title: "کارمزد مدیریت فناوری",
                    field: "sellDetails.tseTmcFee",
                    width: "200px",
                    filter: "numeric",
                    attributes: { class: "text-left" },
                    format: "{0:n0}",
                },
                {
                    title: "کارمزد بورس مربوطه",
                    field: "sellDetails.tseFee",
                    width: "200px",
                    filter: "numeric",
                    attributes: { class: "text-left" },
                    format: "{0:n0}",
                },
                {
                    title: "کارمزد حق نظارت سازمان",
                    field: "sellDetails.seoFee",
                    width: "200px",
                    filter: "numeric",
                    attributes: { class: "text-left" },
                    format: "{0:n0}",
                },
                {
                    title: "مالیات",
                    field: "sellDetails.tax",
                    width: "200px",
                    filter: "numeric",
                    attributes: { class: "text-left" },
                    format: "{0:n0}",
                },
                {
                    title: "کارمزد رایان بورس",
                    field: "sellDetails.rayanBourseFee",
                    width: "200px",
                    filter: "numeric",
                    attributes: { class: "text-left" },
                    format: "{0:n0}",
                },
                {
                    title: "کارمزد حق دسترسی",
                    field: "sellDetails.rightToAccessFee",
                    width: "200px",
                    filter: "numeric",
                    attributes: { class: "text-left" },
                    format: "{0:n0}",
                },
                {
                    title: "مبلغ کل",
                    field: "sellDetails.totalPrice",
                    width: "200px",
                    filter: "numeric",
                    attributes: { class: "text-left" },
                    format: "{0:n0}",
                },
                {
                    title: "سود اوراق مشارکت",
                    field: "sellDetails.couponAmount",
                    width: "200px",
                    filter: "numeric",
                    attributes: { class: "text-left" },
                    format: "{0:n0}",
                },
                {
                    title: "تخفیف",
                    field: "sellDetails.discount",
                    width: "200px",
                    filter: "numeric",
                    attributes: { class: "text-left" },
                    format: "{0:n0}",
                },
                {
                    title: "مبلغ خالص",
                    field: "sellDetails.netAmount",
                    width: "200px",
                    filter: "numeric",
                    attributes: { class: "text-left" },
                    format: "{0:n0}",
                },
                {
                    title: "نوع مشتری",
                    field: "sellDetails.partyTypeTitle",
                    width: "200px"
                },
            ]
          },
       
    ];

}


export default Columns;