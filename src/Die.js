import React from "react";
import "./styles.css"
export default function Die(props) {
    const styles ={
        backgroundColor: props.held ? "#59E391" : "#FFFFFF"
    }
    return(
    
          <div className="dice" style={styles} onClick={(event) => props.hold(event,props.id)}>{props.value}</div>
        
    )
}