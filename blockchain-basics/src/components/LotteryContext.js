import React, { useState } from "react";

const LotteryContext = React.createContext(
    {
        jackpot: 0
    }
)


function LotteryContextProvider({ children, value }) {

    let [jackpot, setJackpot] = useState(0);
    let [drawTime, setDrawTime] = useState("You need to connect to Meta Mask first!");
    let [ticketAmount, setTicketAmount] = useState(0);
    let [ticketPrice, setTicketPrice] = useState(0);
    let [usageFeeRate, setUsageFeeRate] = useState(0);
    
    return (
        <LotteryContext.Provider value={{jackpot, setJackpot, drawTime, setDrawTime, ticketAmount, setTicketAmount, ticketPrice, setTicketPrice, usageFeeRate, setUsageFeeRate}}>
            {children}
        </LotteryContext.Provider>
    )
}

export { LotteryContext, LotteryContextProvider };
