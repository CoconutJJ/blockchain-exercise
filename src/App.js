import { useCallback, useContext, useEffect, useState } from "react";
import Buy from "./Buy"
import BlockChain from "./apis/blockchain";
function App() {

    let [drawTime, setDrawTime] = useState("");

    useEffect(() => (async () => {

        await BlockChain.connectToMetaMask();
        await BlockChain.attachMokContract();
        let time = await BlockChain.getNextDrawTime();
        
        setDrawTime(new Date(time * 1000).toISOString());

        await BlockChain.buyTicket();

    })(), [])

    return (
        <>
            <h1>The Luktery</h1>
            <p>Tickets are 20 Lukt each!</p>
            <p>Next Draw Unlocks: {drawTime}</p>
            <Buy />
        </>
    );
}

export default App;