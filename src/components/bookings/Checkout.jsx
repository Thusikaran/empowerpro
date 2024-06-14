import React, { useEffect, useState } from 'react'
import BookingForm from './BookingForm'
import { getRoomById } from '../utils/ApiFunctions'
import { useParams } from 'react-router-dom'
import { FaCar,  FaParking,  FaTshirt, FaTv, FaUtensils, FaWifi, FaWineGlassAlt } from 'react-icons/fa'
import RoomCarousel from '../common/RoomCarousel'

const Checkout = () => {
  const [error,setError] = useState('')
  const [isLoading,setIsLoaging]=useState(true)
  const [roomInfo,setRoomInfo]=useState({
    photo:'',
    roomType:'',
    roomPrice:''
  })

  const {roomId} =useParams()

  useEffect(()=>{
    setTimeout(()=>{
      getRoomById(roomId).then((response)=>{
        setRoomInfo(response)
        setIsLoaging(false)
      }).catch((error)=>{
        setError(error)
        setIsLoaging(false)
      })
    },2000)
  },[roomId])
  return (
    <div>
        <section className='container'>
           <div className='row flex-coloum flex-md-row align-items-center'>
             <div className='col-md-4 mt-5 mb-5'>
               {isLoading ? (
                <p>Loading Room information</p>
               ):error ?(
                 <p>{error}</p>
               ):(
                 <div className='room-info'>
                   <img 
                      src={`data:image/png;base64,${roomInfo.photo}`}
                      alt="RoomPhoto"
                      style={{width:'100%',height:'200px'}} 
                   />
                   <table style={{textAlign:'left', width:'100%'}} >
                     <tbody>
                        <tr className='border'>
                          <th>Room Type</th>
                          <td>{roomInfo.roomType}</td>
                        </tr>
                        <tr className='border'>
                          <th>Room Price</th>
                          <td>${roomInfo.roomPrice}</td>
                        </tr>
                        <tr className='border'>
                          <th>Room Service</th>
                          <td>
                             <ul>
                               <li> <FaWifi /> WiFi </li>
                               <li> <FaTv/> Netfilx Premium </li>
                               <li> <FaUtensils/> Breakfast </li>
                               <li> <FaWineGlassAlt/> Mini bar refreshment </li>
                               <li> <FaCar/> Car Service </li>
                               <li> <FaParking /> Parking Space </li>
                               <li> <FaTshirt/> Laundry </li>
                             </ul>
                          </td>
                        </tr> 
                     </tbody>
                   </table>
                 </div>
               )}
             </div>

             <div className='col-md-8'>
              <BookingForm/>
              </div>
           </div>
        </section>
        <div className="container">
           <RoomCarousel/>
        </div>
    </div>
  )
}

export default Checkout