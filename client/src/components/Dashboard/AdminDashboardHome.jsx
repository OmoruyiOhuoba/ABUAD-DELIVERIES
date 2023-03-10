import React, {useState, useEffect} from  "react";
import AdminDashboardNavBar from "./AdminDashboardNavBar";
import StructureAdmin from "./StructureAdmin";
import axios from "axios";
import Pagination from "react-js-pagination";
import StructureAdminHome from "./StructureAdminHome";



const AdminDashboardHome = () => {
    const [order, setOrder] = useState([""]);

      /*pagination stuff*/
      const dataPerPage = 20;
      const [ activePage, setCurrentPage ] = useState( 1 );
  
      const indexOfLastData = activePage * dataPerPage; 
      const indexOfFirstData = indexOfLastData - dataPerPage;
      const currentData = order.slice( indexOfFirstData, indexOfLastData );
  
      const handlePageChange = ( pageNumber ) => {
          console.log( `active page is ${ pageNumber }` );
          setCurrentPage( pageNumber )
       };
    
    useEffect(() => {

        let isActive = true;

        if (isActive){
            axios.get(`/api/abuaddeliveries/adminreceived`)
            .then((res) => {
            setOrder(res.data);

        }).catch(error =>{
            console.log(error);
        })

        }
        return () => {
            isActive = false;
          };
        
   
    },[]); 




    return(
        <div>
            <AdminDashboardNavBar />
            <div>
            <p className="ontop-form ontop-form2 ontop-dash ontop-dash1"><b>Admin</b> Unnaccepted Orders/ Deliveries</p>

            </div>
            <div className="table">
                <table>
                    <thead>
                    <tr>
                        <td>
                            Order ID
                            </td>
                            <td>
                            User ID
                            </td>
                            <td>
                            Item
                            </td>
                            <td>
                            Pick-up Address
                            </td>
                            <td>
                            Sender Name
                            </td>
                            <td>
                            Sender Phone Number
                            </td>
                            <td>
                            Sender E-mail
                            </td>
                            <td>
                            Pick-up Date
                            </td>
                            <td>
                            Order Charge
                            </td>
                            <td>
                            Item Weight
                            </td>
                            <td>
                            Item Quantity
                            </td>
                            <td>
                            Recipient Address
                            </td>
                            <td>
                            Recipient Name
                            </td>
                            <td>
                            Recipient Phone Number
                            </td>
                            <td>
                            Recipient E-mail
                            </td>
                            <td>
                            Payment Method
                            </td>
                            <td>
                            Order Status
                            </td>
                            <td>
                            Delivered by Rider/ Admin ID
                            </td>
                            <td>
                            Assign to Rider 1
                            </td>
                            <td>
                            Assign to Rider 2
                            </td>
                            <td>
                            Assign to Rider 3
                            </td>
                            <td>
                            Assign to Rider 4
                            </td>
                            <td>
                            Assign to Rider 5
                            </td>
                            <td>
                            Assign to Rider 6
                            </td>
                            <td>
                            Assign to Rider 7
                            </td>
                            <td>
                            Assign to Rider 8
                            </td>
                            <td>
                            Assign to Rider 9
                            </td>
                            <td>
                            Assign to Rider 10
                            </td>
                            
                          
                            
                        </tr>
                    </thead>
                    <tbody>
                    {currentData.map((data, index) => {
             return(
                 <StructureAdminHome 
                 key = {index}
                 id= {data._id}
                 user = {data.user}
                 pickupitem = {data.pickupitem}
                 pickupaddress = {data.pickupaddress}
                 name= {data.name}
                 phone = {data.phone} 
                 email = {data.email}
                 pickupdate = {data.pickupdate}
                 amountInNaira= {data.amountInNaira}
                 weightinkg = {data.weightinkg}
                 pickupquantity = {data.pickupquantity}
                 deliveryaddress = {data.deliveryaddress}
                 deliveryname= {data.deliveryname}
                 deliveryphonenumber = {data.deliveryphonenumber}
                 deliveryemail ={data.deliveryemail}
                 paymentMethod = {data.paymentMethod}
                 status = {data.status}
                 rider = {data.rider} 
                 info = {data} /*Passsing this over is very importnat*/
                 
                 />);
         })}
                    </tbody>
                </table>

                </div>

<div className= "pagination" >
<Pagination
   activePage={ activePage }
   itemsCountPerPage={ 20 }
   totalItemsCount={ order.length }
   pageRangeDisplayed={ 5 }
   onChange={ handlePageChange }
/>
</div>
<br/>
<br/>
<br/>

</div>
)
}

export default AdminDashboardHome;
