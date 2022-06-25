import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

export default function ErrorMessage() {
    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() =>{
        setSearchParams('')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">Oups une erreur est survenu !</Alert>
        </Stack>
    );
}