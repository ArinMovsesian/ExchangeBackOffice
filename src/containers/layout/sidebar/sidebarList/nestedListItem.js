
// import sideItems from 'constants/sidebarLink'
const sideBarMenuList={
    searchItems: function (sideItems,sidebarSearchItem) {
        console.log(sideItems);
        console.log(sidebarSearchItem);

        let returnedItem = [];
        if (sidebarSearchItem == '' || !sidebarSearchItem)
            return sideItems;

            sideItems.map(item => {
            if (item.menu.menuTitle.includes(sidebarSearchItem)){
                returnedItem.push(item);
                console.log("itemmmmm" ,item);
            }
                
            else {
                item.childs.map(subIitemOne => {
                    if (!item.menu.menuTitle.includes(sidebarSearchItem) && subIitemOne.menu.menuTitle.includes(sidebarSearchItem)){
                        returnedItem.push(subIitemOne)
                        console.log("subIitem1111" , subIitemOne);
                    }
                        
                    else {
                        subIitemOne.childs.map(subIitemTwo => {
                            if (!item.menu.menuTitle.includes(sidebarSearchItem) && !subIitemOne.menu.menuTitle.includes(sidebarSearchItem) && subIitemTwo.menu.menuTitle.includes(sidebarSearchItem)){
                                returnedItem.push(subIitemTwo)
                                console.log("subIitem222" , subIitemTwo);
                            }
                               
                        });
                    }
                });
            }
        });

        console.log(returnedItem);

        return returnedItem;

    }
}

export default sideBarMenuList;
