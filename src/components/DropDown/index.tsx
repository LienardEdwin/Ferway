import React, {useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useFetch} from "../../utils/hooks";
import CircularProgress from '@mui/material/CircularProgress';
import { useSearchParams } from 'react-router-dom';
import ErrorMessage from "../Alert";

type Props ={
    label: string
    url: string
    type: string
    param: string | null
}

type Subway = {
    name?:string
    code?:string
}

export default function DropDown({label, url, type, param}: Props) {
    const [value, setValue] = useState(param || '');
    const [searchParams, setSearchParams] = useSearchParams();
    const { data, isLoading, error }:any = useFetch(url)

    const response = type === 'station' ? data?.result?.stations : data?.result?.metros

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
        if(type === 'station'){
            setSearchParams({line: searchParams.get('line') || '', [type]: event.target.value})
        }else {
            setSearchParams({[type]: event.target.value})
        }
    }

    if (isLoading) {
        return <CircularProgress/>
    }

    if(error){
        return <ErrorMessage/>
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={label}
                    onChange={handleChange}
                >
                    {
                        response && response.map((el:Subway) => {
                            const element = type === 'station' ? el?.name : el?.code
                            return(
                                <MenuItem key={element} value={element}>{element}</MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
        </Box>
    );
}