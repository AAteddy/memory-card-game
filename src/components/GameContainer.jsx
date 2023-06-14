import React, { useEffect, useState } from 'react';
import { GameDisplay } from './GameDisplay';
import arrayShuffle from 'array-shuffle';


const types = [
    ' :alarm_clock: ',
    ' :airplane: ',
    ' :ambulance: ',
    ' :anchor: ',
    ' :baby_bottle: ',
    ' :basketball: ',
    ' :carrot: ',
    ' :banana: ',   
]

const getGameData = () => {
    // get types
    // load the types in a new array x2 (as an object)
    // shuffle the objects
    // return the array with 16 cards

    const gameData = [];
    const typesForGameData = [...types, ...types];
    let shuffledTypes = arrayShuffle(typesForGameData);
    shuffledTypes.forEach((type, index) => {
        gameData.push({
            type,
            id: index,
            open: false,
            remove: false
        })
    }) 
    
    return gameData;

}


export const GameContainer = () => {

    const [cards, setCards] = useState(getGameData());
    // inPlay - array of 2 cards
    const [inPlay, setInPlay] = useState([]);
    const [matching, setMatching] = useState(false);
    const [score, setScore] = useState(0);
    const [moves, setMoves] = useState(0);

    const handleOnClick = (id) => () => {
        if(!matching) {
            
            const updatedCards = [...cards];
            const updatedInPlay = [...inPlay];

            // find the card
            // set the open to true/false
        updatedCards.forEach(card => {
            if (card.id === id) {
                card.open = true
                // add to inplay array
                updatedInPlay.push(card.type)
                setInPlay(updatedInPlay);
            }
        })
        
        setCards(updatedCards);
        // update inplay state - 1, 2
    }
}
    
    useEffect(() => {
        if (inPlay.length ===2 && !matching) {
            setMoves(moves + 1);
            setMatching(true);
            const updatedCards = [...cards];
            if (inPlay[0] === inPlay[1]) {
                // match
                console.log('match');
                updatedCards.forEach(card => {
                    if (card.type === inPlay[0]) {
                        card.remove = true;
                    }
                })
                setCards(updatedCards);
                setMatching(false);
                setScore(score + 1);
                setInPlay([]);
            } else {
                // no-match
                setTimeout(() => {
                    updatedCards.forEach(card => {
                        if (card.type === inPlay[0] || card.type === inPlay[1]) {
                            card.open = false;
                        }
                    })
                    setCards(updatedCards);
                    setMatching(false);
                    setInPlay([]);
                }, 1000);
                console.log('no-match')                
            }           
        }
        //  inplay === length is 2?
        // type of card 1 === type of card 2
         // match
          // remove these cards (keep them open)
          // incrementing
        // no-match
         // close the cards
         // no-op
    })

    return (
        <GameDisplay 
            cards={cards} 
            onClick={handleOnClick} 
            score={score}
            moves={moves}
        />
    )
}