import React, { useState } from "react";

const LotteryContext = React.createContext(
    {
        jackpot: 0
    }
)


function LotteryContextProvider({ children, value }) {

    let [jackpot, setJackpot] = useState(0);

    return (
        <LotteryContext.Provider value={{jackpot, setJackpot}}>
            {children}
        </LotteryContext.Provider>
    )
}

export { LotteryContext, LotteryContextProvider };
