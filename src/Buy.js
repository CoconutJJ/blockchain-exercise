import { useContext, useState } from "react";
import BlockChain from "./apis/blockchain";
import { LotteryContext } from "./components/LotteryContext"

function Buy() {

    let { jackpot, setJackpot, drawTime, setDrawTime, ticketAmount, setTicketAmount } = useContext(LotteryContext)


    let metamaskConnect = async () => {
        await BlockChain.connectToMetaMask();
        let time = await BlockChain.getNextDrawTime();
        setDrawTime(new Date(time * 1000).toISOString());
        setJackpot(await BlockChain.getJackpot())
    }

    let onBuy = async () => {

        await BlockChain.buyTicket(ticketAmount);

    }

    let onChooseWinner = async () => {
        await BlockChain.chooseWinner();
    }

    return (
        <>
            <h3>Buy Luktery Tickets</h3>
            <form>
                <input type="button" value="Connect to MetaMask" onClick={metamaskConnect} />
                <br />
                <label for="ticket-amount">Buy Tickets: </label>
                <input type="number" min="1" placeholder="Amount" onChange={(e) => {
                    setTicketAmount(parseInt(e.target.value))
                }} />
                <input type="button" value="Buy" onClick={onBuy} />
                <p>
                    Current Jackpot: {jackpot}
                </p>
                <p>Next Draw Unlukts: {drawTime}</p>
                <input type="button" value="Choose a Winner" onClick={onChooseWinner} />
            </form>
        </>
    )

}

export default Buy;