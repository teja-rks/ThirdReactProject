import { useReducer } from "react";
import Digit from "./Digit";
import OperationDigit from "./OperationDigit";
import"./Styles/Styles.css"

 export const Actions={
  ADD:'add-digit',
  Choose:'choose-operation',
  Clear:'clear',
  DEL:'delete-digit',
  Evaluate:'evaluate'
}

function reducer(state,{type,payload}){
  switch(type){
    case Actions.ADD:
      if(state.overwrite){
        return{
          ...state,
          currop:payload.digit,
          overwrite:false
        }
      }
      if(payload.digit==="0"&& state.currop==="0"){ return state}
      if(payload.digit==="."&& state.currop.includes(".")) 
      {return state}
      return{
        ...state,
        currop:`${state.currop ||""}${payload.digit}`
      }

    case Actions.Choose:
      if(state.currop=== null && state.prevop===null){
        return state
      }
      if(state.currop===null){
        return{
          ...state,
          operation:payload.operation,
        }
      }
      if(state.prevop==null){
        return{
          ...state,
          operation:payload.operation,
          prevop:state.currop,
          currop:null,
        }
      }
      return {
        ...state,
        prevop: evaluate(state),
        operation: payload.operation,
        currop: null,
      }

     

    case Actions.Clear:
      return{}

    case Actions.Evaluate:
      if(state.operation===null || state.currop===null || state.prevop===null){
        return state
      }
      return{
        ...state,
        overwrite:true,
        prevop:null,
        operation:null,
        currop:evaluate(state)
      }

      case Actions.DEL:
        if(state.overwrite){
          return{
            ...state,
            overwrite:false,
            currop:null,
          }
        }
        if(state.currop==null){
          return state
        }
        if(state.currop.length===1){
          return{
            ...state,
            currop:null
          }
        }
        return{
          ...state,
          currop:state.currop.slice(0,-1)
        }
  }

}



function evaluate({ currop, prevop, operation }) {
  const prev = parseFloat(prevop)
  const current = parseFloat(currop)
  if (isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "÷":
      computation = prev / current
      break
  }

  return computation.toString()
}
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [{currop,prevop,operation},dispatch]= useReducer(reducer,{})

 
  return (
    <div className="caluculator-grid">
      <div className="output">
        <div className="prev-operan">{formatOperand(prevop)} {operation}</div>
        <div className="curr-operan">{formatOperand(currop)}</div>
      </div>
      <button className="span-two" onClick={()=> dispatch({type:Actions.Clear})}>AC</button>
      <button  onClick={()=> dispatch({type:Actions.DEL})}>Del</button>
      <OperationDigit operation="÷" dispatch={dispatch}/>
      <Digit digit="1" dispatch={dispatch}/>
      <Digit digit="2" dispatch={dispatch}/>
      <Digit digit="3" dispatch={dispatch}/>
      <OperationDigit operation="*" dispatch={dispatch}/>
    
     <Digit digit="4" dispatch={dispatch}/>
      <Digit digit="5" dispatch={dispatch}/>
      <Digit digit="6" dispatch={dispatch}/>
      <OperationDigit operation="+" dispatch={dispatch}/>
      
      <Digit digit="7" dispatch={dispatch}/>
      <Digit digit="8" dispatch={dispatch}/>
      <Digit digit="9" dispatch={dispatch}/>
      <OperationDigit operation="-" dispatch={dispatch}/>
      
      <Digit digit="." dispatch={dispatch}/>
      <Digit digit="0" dispatch={dispatch}/>
      <button className="span-two" onClick={()=> dispatch({type:Actions.Evaluate})}>=</button>
    </div>
  )
}

export default App;
