import React from 'react'

export const ConnectionCard = ({user}) => {
    return (
        <div className="card card-border  w-96 ">
            <div className="card-body ">
                <h2 className="card-title">{user.firstName} {user.lastName}</h2>
                <p>{user.about}</p>
            </div>
        </div>
    )
}
