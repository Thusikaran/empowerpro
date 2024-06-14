import React, { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunctions'

const RoomTypeSelector = ({handleRoomInputChange,newRoom}) => {
    const [roomTypes,setRoomTypes]=useState([""])
    const [showNewRoomTypeInput,setShowNewRoomTypesInput]=useState(false)
    const [newRoomType,setNewRoomType]=useState("")

    useEffect(()=>{
        getRoomTypes().then((data)=>{
            setRoomTypes(data)
            console.log(data)
        })
    },[])

    const handleNewRoomTypeInputChange = (e) =>{
        setNewRoomType(e.target.value);
    }

    const handleAddNewRoomType =()=>{
        if(newRoomType!==""){
            setRoomTypes([...roomTypes,newRoomType])
            setNewRoomType("")
            setShowNewRoomTypesInput(false)
        }
    }

  return (
    <>
      {roomTypes.length >0 && (
         <div className='input-group'>
            <select
              name="roomType" 
              id="roomType"
              required
              className='form-control'
              value={newRoom.roomType}
              onChange={(e)=>{
                if(e.target.value == "ADD NEW"){
                    setShowNewRoomTypesInput(true)
                }else{
                    handleRoomInputChange(e)
                }
              }}
             >   
                <option value={""}>select a room type</option>   
                <option value={"ADD NEW"}>ADD NEW</option>  
                {roomTypes.map((type,index) => (
                   <option key={index} value={type}>
                      {type}
                   </option>
                ))}
             </select>

             {showNewRoomTypeInput && (
                <div className='input-group'>
                    <input 
                       type="text" 
                       className='form-control mt-2'
                       placeholder='Enter a new room type'
                       onChange={handleNewRoomTypeInputChange}
                    />
                    <button className='btn btn-hotel mt-2' type='button' onClick={handleAddNewRoomType}>
                         Add
                    </button>
                </div>
             )}
         </div>
      )}
    </>
  )
}

export default RoomTypeSelector