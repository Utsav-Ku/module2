import { useSelector, useDispatch } from 'react-redux'
import { addAmount, withdrawlAmount } from '../redux/reducer'
import { useState } from 'react'

function Bank(){
    let [balance, setBalance] = useState()
    const dispatch = useDispatch();

    const currentBalance = useSelector((state) => state.balance);

    function AddBalance(){
        const actionObj = addAmount(Number(balance));
        dispatch(actionObj);
        setBalance("");
    }

    function WithdrawlBalance(){
        dispatch(withdrawlAmount(Number(balance)));
        setBalance("");
    }

    return(
        <>
            <h3>Bank Management</h3>
            <p>Current Balance: {currentBalance}</p>
            <input type="number" value={balance} onChange={(e) => setBalance(e.target.value)} />
            <button onClick={AddBalance}>Add Amount</button>
            <button onClick={WithdrawlBalance}>Withdrawl Amount</button>
        </>
    )
}

export default Bank;