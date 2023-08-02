import React from "react";
import "./styles.css"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti";


export default function App() {
  
  const [diceNumbers, setDiceNumbers] = React.useState(allNewDice())

  const [tenzies , setTenzies] = React.useState(false)

  React.useEffect(()=> {
    const heldNumber = diceNumbers[0].value
    const allHeldNumber = diceNumbers.every(die => die.value === heldNumber)
    const allheld = diceNumbers.every(die => die.isHeld)

    if(allHeldNumber && allheld){
      setTenzies(true)
    }
  },[diceNumbers])

  const dieNumber = diceNumbers.map((dice) => 
    <Die 
      key ={dice.id} 
      value={dice.value} 
      held={dice.isHeld}
      id={dice.id}
      hold={holdDice}
    />)
  function generateDice(){
      return{
        value:Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }
    
  }
  function allNewDice() {
    const randomNumbers = []
    for(let i =0; i<10;i++){
      randomNumbers.push(generateDice())
    }
    
    return(
      randomNumbers
    )
  }
  function holdDice(event,id){
    setDiceNumbers(prevDiceNumber => prevDiceNumber.map(die => {
     return die.id === id ? {...die, isHeld:! die.isHeld} : die
    }))

  }

  function handleRollClick() {
    if (tenzies === true ){
      setDiceNumbers(allNewDice)
      setTenzies(!setTenzies)
    }
    else{
    
      setDiceNumbers(prevDice => prevDice.map(die => {
        return die.isHeld ? die: generateDice()
      }))
    }
  }

  return (
    <main>
      {tenzies && <Confetti />  }
      <h1>Tenzies</h1> 
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="game--container">
        {dieNumber}
      </div>
        <button className = "roll--button" onClick={handleRollClick}>{tenzies ? "New Game" : "Roll"}</button> 
    </main>
  )
}