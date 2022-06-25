import React from 'react'
import Card from '../Card';
import {useFetch} from "../../utils/hooks";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ErrorMessage from "../Alert";

type Props ={
    url: string
}

type ScheduleProps = {
    message: string
    destination: string
}

export default function Schedule({url}: Props){
    const { data, isLoading, error }:any = useFetch(url)

    const schedule = data?.result

    if(isLoading){
        return <CircularProgress/>
    }

    if(error){
        return <ErrorMessage/>
    }

    return(
        <>
            <Grid item>
                <Typography variant="h5">Résultat:</Typography>
            </Grid>
            {
                schedule?.schedules && schedule?.schedules.map((el: ScheduleProps, index: number)  => (
                    <Grid item key={index} xs={12}>
                        <Card message={el.message} destination={el.destination}/>
                    </Grid>
                ))
            }
        </>
    )
}