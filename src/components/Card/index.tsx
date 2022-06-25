import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

type Props = {
    message?: string
    destination?: string
}

export default function Schedule({message, destination}:Props) {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Direction: {destination}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Informations: {message}
                </Typography>
            </CardContent>
        </Card>
    );
}