import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { AuthContext } from '../context/AuthProvider'
import axios from '../services/axiosinstance'

export default function useUserProfile() {

    const { user: userId } = useParams()

    const { user: userData } = useContext(AuthContext)
    const isMe = userId == userData?._id

    const [userProfile, setUserProfile] = useState({ _id: '', name: '', email: '' })

    const fetchUser = async () => {
        try {
            const userArray = await axios.get(`/user/${userId}`)
            return userArray.data
        }
        catch (e) {
            return []
        }
    }

    useEffect(() => {
        if (isMe) {
            setUserProfile(userData)
        }
        else {
            fetchUser().then((data) => setUserProfile(data))
        }
    }, [userId])

    return { ...userProfile, isMe }
}
