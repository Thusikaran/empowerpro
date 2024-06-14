import React, { useState } from 'react'
import {addRoom} from "../utils/ApiFunctions"
import RoomTypeSelector from '../common/RoomTypeSelector'
import { Link } from 'react-router-dom'

const AddRoom = () => {
    const [newRoom,setNewRoom] = useState({
        photo: null ,
        roomType: "" ,
        roomPrice : ""
    })

    const [imagePreview,setImagePreview]= useState("")
    const [successMessage,setSuccessMessage]=useState("")
    const [errorMessage,setErrorMessage]=useState("")

    const handleRoomInputchange =(e) =>{
    //  console.log(e.target.value);
        const name= e.target.name
        let value = e.target.value
        if(name === "roomPrice"){
            if(!isNaN(value)){
                value=parseInt(value)
            }
            else{
                value=""
            }
        }

        setNewRoom({...newRoom,[name] : value})
    }

    const handleImageChange = (e) =>{
        const selectedImage =e.target.files[0]
        setNewRoom({...newRoom, photo : selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
             
        
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const success = await addRoom(newRoom.photo,newRoom.roomType,newRoom.roomPrice)
            if(success !==undefined){
                setSuccessMessage("A new room was added to the database")
                setNewRoom({photo:null,roomType:"",roomPrice:""})
                setImagePreview("")
                setErrorMessage("")
                document.getElementById("photo").value=null;
             
            }else{
                setErrorMessage("Error adding room")
            }
        }catch(error){
            setErrorMessage(error.message)
        }

        setTimeout(()=>{
            setErrorMessage("")
            setSuccessMessage("")
        },3000)

    }

  return (
    <>
      <section className='container,  mb-5 mt-5'>
        <div className='row justify-content-center'>
            <div className='col-md-8 col-lg-6 '>
                <h2 className='mt-5 mb-2'>Add a New Room</h2>
                {successMessage && (
                    <div className='alert alert-success fade show'>
                        {successMessage}
                    </div>
                )}
                 {errorMessage && (
                    <div className='alert alert-danger fade show'>
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} >

                    <div className="mb-3">
                        <label htmlFor="roomType" className='form-label' style={{display:"flex",alignItems:"flex-end"}}>
                            Room Type
                        </label>
                        <div>
                            <RoomTypeSelector handleRoomInputChange={handleRoomInputchange} newRoom={newRoom} />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="roomPrice" className='form-label' style={{display:"flex",alignItems:"flex-end"}}>
                            Room Price
                        </label>
                        <input 
                           type="number"
                           className='form-control'
                           required
                           id='roomPrice'
                           name='roomPrice'
                           value={newRoom.roomPrice}
                           onChange={handleRoomInputchange}
                            />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="photo" className='form-label' style={{display:"flex",alignItems:"flex-end"}}>
                            Room Photo
                        </label>
                        <input  
                          type="file" 
                          id='photo'
                          name='photo'
                          className='form-control'
                          onChange={handleImageChange}
                          />
                          {imagePreview && (
                            <img src={imagePreview }
                             alt="Preview Room Photo"
                             style={{maxWidth:"400px",maxHeight:"400px",  display:"flex",alignItems:"flex-end"}}
                             className='mb-3'
                              />
                          )}
                    </div>

                    <div d-grid d-md-flex mt-2>
                        <Link to={"/existing-rooms"} className='btn btn-outline-info' style={{margin:'10px'}}>
                            Back
                        </Link>
                        <button className='btn btn-outline-primary ml-5' >
                            Save Room
                        </button>
                    </div>
                    

                </form>
            </div>
        </div>
      </section>
    </>
  )
}

export default AddRoom