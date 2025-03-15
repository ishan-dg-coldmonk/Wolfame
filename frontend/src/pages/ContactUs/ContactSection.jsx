import { Button, Grid, Paper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'

import contactList from '../../data/contact'
import UserCard from '../../components/Cards/UserCard';

function ContactSection() {
    // Find the "Coordinator" contact item from the contactList
    const coordinatorContact = contactList.find(contactItem => contactItem.title === "Coordinator");

    // Set the initial state to the "Coordinator" contact item
    const [selectedContactMenu, setSelectedContactMenu] = useState(coordinatorContact || contactList[0]);

    const contactMenuChangeHandler = (contactItem) => {
        setSelectedContactMenu(contactItem)
    }

    return (
        <Stack>
            <Paper>
                <Grid container sx={{ justifyContent: 'center', width: 1, p: 5 , mt:3.5, mb:-3}} >
                    {
                        contactList.map((contactItem) => {
                            const { title } = contactItem
                            return (
                                <Grid key={title} item>
                                    <Button
                                        size='large'
                                        variant={selectedContactMenu.title === title ? 'contained' : 'text'}
                                        onClick={() => contactMenuChangeHandler(contactItem)}
                                    >
                                        <Typography variant='body1' fontWeight={700} sx={{ opacity: 0.8, color: selectedContactMenu.title === title ? 'white' : 'red' }} >
                                            {title}
                                        </Typography>
                                    </Button>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Paper>
            <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center', p: {xs: 2, md: 4} }}>
                {selectedContactMenu?.contact.map((user) => <UserCard key={user.name} user={user} />)}
            </Grid>
        </Stack >
    )
}

export default ContactSection