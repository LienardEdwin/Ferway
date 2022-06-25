import React, {useEffect, useState} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import './App.css';
import DropDown from "./components/DropDown";
import Grid from '@mui/material/Grid';
import Schedule from "./components/Schedule";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    mainContainer: {
      padding: '3%'
    },
    padding: {
        padding: 16,
    },
});

function App() {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [line, setLine] = useState<string | null>(null)
    const [display, setDisplay] = useState(false)
    const classes = useStyles();

    useEffect(() => {
        if(searchParams.get('line')){
            setLine(searchParams.get('line'))
        }
        if(searchParams.get('line') && searchParams.get('station')){
            setDisplay(true)
        }
    }, [location, searchParams]);

  return (
    <Grid container justifyContent="center" alignItems="center" className={classes.mainContainer}>
        <Grid container item xs={6} spacing={3}>
            <Grid item xs={12} className={classes.padding}>
                <DropDown
                    label={'Sélectionner une ligne'}
                    url={'https://api-ratp.pierre-grimaud.fr/v4/lines/metros'}
                    type={'line'}
                    param={searchParams.get('line')}
                />
            </Grid>
            {
                line &&
                <Grid item xs={12} className={classes.padding}>
                    <DropDown
                        label={'Sélectionner une station'}
                        url={`https://api-ratp.pierre-grimaud.fr/v4/stations/metros/${line}`}
                        type={'station'}
                        param={searchParams.get('station')}
                    />
                </Grid>
            }
            {
                display &&
                <Grid container item xs={12} className={classes.padding}>
                    <Grid container item xs={12} rowSpacing={3}>
                        <Schedule url={`https://api-ratp.pierre-grimaud.fr/v4/schedules/metros/${searchParams.get('line')}/${searchParams.get('station')}/A+R`}/>
                    </Grid>
                </Grid>
            }
        </Grid>


    </Grid>
  );
}

export default App;
