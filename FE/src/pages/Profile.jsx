import React from 'react'
import { EditProfile } from '../compoments/EditProfile'
import { useSelector } from 'react-redux'
import { UserCard } from '../compoments/UserCard'

export const Profile = () => {
    const user=useSelector((store)=>store.user)
    
    return user && (
        <div className='flex justify-center'>
            <div>
            <EditProfile user={user}/>
            </div>
        </div>

    )
}
