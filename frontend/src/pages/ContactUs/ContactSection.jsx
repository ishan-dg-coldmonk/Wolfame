import { Button, Grid, Paper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'

import contactList from '../../data/contact'
import UserCard from '../../UI/UserCard';


function ContactSection() {
    const [selectedContactMenu, setSelectedContactMenu] = useState(contactList[contactList.length - 1])

    const contactMenuChangeHandler = (contactItem) => {
        setSelectedContactMenu(contactItem)
    }

    return (
        <Stack>
            <Paper>
                <Grid container sx={{ justifyContent: 'center', width: 1, p: 1 }} >
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