import React from 'react';
import FaIcon from 'shared/components/Icon/Icon';



const CheckColumn=(props)=>{

    if (props.status) {
        return (

            <td>
                <FaIcon name="fas fa-check green-page-color" size={13} />
            </td>
        )
    } else {
        return (

            <td>
                <FaIcon name="fas fa-times red-page-color" size={13} />
            </td>
        )
    }
}
   
export default CheckColumn;
        
   
        


    


