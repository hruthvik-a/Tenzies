import React, { useEffect, useState } from "react"
import "./content.css"
import Die from "./Die"
import {nanoid} from "nanoid"
import Swal from 'sweetalert2'


export default function Content(){
    const [dicearr, setDiceArr] = useState(allNewDice)
    const [tenzies, setTenzies] = useState(false)
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({value : Math.ceil(Math.random() * 6), isHeld: false, id: nanoid()})
        }
        return newDice
    }
    const rollNewDice= ()=>{
        if (dicearr.length > 0 ){
        setDiceArr(oldDice=> oldDice.map(die=>{
            return die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6), id: nanoid() } 
        }))
    }
    else{
        setDiceArr(allNewDice()) 
    }
    }
    function holdDice(id){
        setDiceArr(oldDice=> oldDice.map(die=>{
            return die.id === id ? {...die, isHeld:!die.isHeld }: die
        }))
        
    }
    useEffect(()=>{
        const allHeld = dicearr.every(die => die.isHeld)
        const firstValue = dicearr[0].value
        const allSameValue = dicearr.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            console.log("You won!")
        }
        else{
            setTenzies(false)
        }
        tenzies ?  Swal.fire('You Won') :
        console.log("Dice state changed")
        console.log(tenzies)
    },[dicearr])

    //console.log(dicearr)
    return(
            <div className="outer-box">
                <div className="inner-box">
                    <div className="die-container">
                        <h1 className="tenzie-head">Tenzies</h1>
                        <div className="tenzie-disc">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</div>
                        <div className="die">
                            {dicearr.map(item=><Die key={item.id} value={item.value} isHeld={item.isHeld} holdDice={()=>holdDice(item.id)} />)}
                        </div>
                        <button onClick={rollNewDice} className="button">Roll</button>          
                    </div>
                    
                </div>
            </div>
    )
}