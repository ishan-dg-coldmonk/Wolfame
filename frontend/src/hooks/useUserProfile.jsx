import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { AuthContext } from '../context/AuthProvider'
import axios from '../services/axiosinstance'

export default function useUserProfile() {

    const { user } = useParams()
    const name = decodeURIComponent(user)

    const { user: userData } = useContext(AuthContext)
    const isMe = name === userData?.name

    const [userProfile, setUserProfile] = useState({ name: '', email: '' })

    const fetchUser = async () => {
        try {
            const userArray = await axios.get('/user/getuser', { params: { name } })
            return userArray.data
        }
        catch (e) {
            console.log(e)
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
    }, [name])

    return { ...userProfile, isMe }
}
