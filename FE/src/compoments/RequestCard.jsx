import React from 'react'

export const RequestCard = ({user}) => {
    const handleReq=()=>{
        
    }
  return (
    <div className="card card-border w-96 ">
            <div className="card-body ">
                <h2 className="card-title">{user.fromUserId.firstName} {user.fromUserId.lastName}</h2>
                <p>{user.fromUserId.about}</p>
                <div>
                    <button className="btn btn-primary" 
                    onClick={handleReq}>Accept</button>
                </div>
            </div>
        </div>
  )
}
