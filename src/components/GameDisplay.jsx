import { Grid } from '@mui/material';
import React from 'react';
import { GameCard } from './GameCard';

export const GameDisplay = ( { cards, onClick }) => {

    const handleOnClick = () => {

    }

    return (
        <Grid container spacing={1}>         
                {
                    cards.map(card => {
                        return (
                            <Grid item xs={3}>
                                <GameCard card={card} onClick={onClick} />
                            </Grid>
                        )
                    })
                }             
            <Grid item></Grid> 
        </Grid>
    )
}