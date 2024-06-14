import React, { useEffect, useState } from 'react'
import { getRoomById, updateRoom } from '../utils/ApiFunctions'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const EditRoom = () => {
  const [room,setRoom] = useState({
    photo: null ,
    roomType: "" ,
    roomPrice : ""
})

  const [imagePreview,setImagePreview]= useState("")
  const [successMessage,setSuccessMessage]=useState("")
  const [errorMessage,setErrorMessage]=useState("")

  const {roomId} = useParams()

  const handleImageChange = (e) =>{
    const selectedImage =e.target.files[0]
    setRoom({...room, photo : selectedImage})
    setImagePreview(URL.createObjectURL(selectedImage))
  }

  const handleInputChange = (event) =>{
    const {name ,value } = event.target
    setRoom({...room, [name]: value})
    
  }

  useEffect(()=>{
    const fetchRoom = async () =>{
      try {
        const roomData= await getRoomById(roomId)
        setRoom(roomData)
        setImagePreview(roomData.photo)
      } catch (error) {
        console.error(error)
      }
    }
    fetchRoom()
  },[roomId])

  const handleSubmit = async(event) => {
    console.log(room)
    event.preventDefault()
    try{
      
      const response = await updateRoom(roomId,room)
      if(response.status===200){
        setSuccessMessage("Room update successfully!")
        const updatedRoomData = await getRoomById(roomId)
        setRoom(updatedRoomData)
        setImagePreview(updatedRoomData.photo)
        setErrorMessage("")
      }else{
        setErrorMessage("Error updatting room")
      }
    }catch(error){
      console.error(error)
        setErrorMessage(error.message)
    }
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
                      <label htmlFor="roomType" className='form-label hotel-color' style={{display:"flex",alignItems:"flex-end"}}>
                          Room Type
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='roomType'
                        name='roomType'
                        onChange={handleInputChange}
                        value={room.roomType}
                        />
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
                         value={room.roomPrice}
                         onChange={handleInputChange}
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
                          <img src={`data:image/jpeg;base64,${imagePreview }`}
                           alt="Preview Room Photo"
                           style={{maxWidth:"400px",maxHeight:"400px",  display:"flex",alignItems:"flex-end"}}
                           className='mt-3'
                            />
                        )}
                  </div>

                  <div d-grid gap-2 d-md-flex mt-2>
                      <Link to={"/existing-rooms"} className="btn btn-outline-info ml-5" style={{margin:'10px'}}>
                          back
                      </Link>
                      <button  className='btn btn-outline-warning' >
                          Edit Room
                      </button>
                  </div>
                  

              </form>
          </div>
      </div>
    </section>
  </>
  )
}

export default EditRoom