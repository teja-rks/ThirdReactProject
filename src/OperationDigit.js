import { Actions } from "./App"



export default function OperationDigit({dispatch,operation}){
    return( <button onClick={()=> dispatch({type:Actions.Choose, payload: {operation}})
}>
    {operation}
    </button>)
}