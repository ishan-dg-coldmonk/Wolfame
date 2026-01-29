import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { AuthContext } from '../context/AuthProvider'
import axios from '../services/axiosinstance'
import { useQuery } from '@tanstack/react-query';

export default function useUserProfile() {

    const { user: userId } = useParams()

    const { user: userData } = useContext(AuthContext)
    const isMe = userId == userData?._id

    const { data: userProfile, ...other } = useQuery({
        queryKey: ['users', userId],
        queryFn: () => axios.get(`/user/${userId}`).then(response => response.data)
    })


    return { userProfile, isMe, ...other }
}
