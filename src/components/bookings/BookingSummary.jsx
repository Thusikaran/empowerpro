import React, { useEffect, useState } from 'react'
import moment from "moment"
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const BookingSummary = ({booking,payment,isFormValid,onConfirm}) => {
    const checkInDate = moment(booking.checkInDate)
    const checkOutDate = moment(booking.checkOutDate)
    const numOfDays = checkOutDate.diff(checkInDate,"days")
    const [isBookingConfirmed,setIsBookingConfirmed] = useState(false)
    const [isProcessingPayment,setIsProcessingPayment] = useState(false)

    const navigate = useNavigate()

    const handleConfirmBooking = ()=>{
        setIsProcessingPayment(true)
        setTimeout(()=>{
            setIsProcessingPayment(false)
            setIsBookingConfirmed(true)
            onConfirm()
        },3000)
    }

    useEffect(()=>{
        if(isBookingConfirmed){
            navigate("/booking-success")
        }
    },[isBookingConfirmed,navigate])

  return (
    <div className='card card-body mt-5'>
        <h4>Reservation Summary</h4>
        <p>FullName : <storng>{booking.guestFullName}</storng></p>
        <p>Email : <storng>{booking.guestEmail}</storng></p>
        <p>Check-In Date : <storng>{moment(booking.checkInDate).format("MMM Do YYYY")}</storng></p>
        <p>Check-Out Date : <storng>{moment(booking.checkOutDate).format("MMM Do YYYY")}</storng></p>
        <p>Number of Days : <storng>{numOfDays}</storng></p>
        <div>
            <h5>Number of Guests</h5>
            <strong>
                Adult{booking.numberOfAdults > 1 ? "s" : ""} : {booking.numberOfAdults}
            </strong>
            <br />
            <strong>
                Children: {booking.numberOfChildren}
            </strong>
        </div>
        {payment > 0 ? (
            <>
             <p> Total Payment : <strong>${payment}</strong></p>
            
            {isFormValid && !isBookingConfirmed ?(
                <Button
                  variant='success' 
                   onClick={handleConfirmBooking}>
                  {isProcessingPayment ? (
                    <>
                      <span
                        className='spinner-border spinner-border-sm mr-2'
                        role='status'
                        aria-hidden="true">
                      </span>
                      Booking Confirment, redirecting to payment ....
                    </>
                  ):(
                    "Confirm Booking and proceed to payment"
                  )}
                </Button>
            ): isBookingConfirmed ? (
                <div className='d-flex justify-content-center align-items-center'>
                  <div className='spinner-border text-primary' role='status'>
                    <span className='sr-only'>Loading</span>
                  </div>
                </div>
            ): null}
            </>
        ) :(
            <p className='text-danger'>Check-out date must be after check-in date</p>
        )}
    </div>
  )
}

export default BookingSummary