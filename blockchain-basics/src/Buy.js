import { useContext, useState } from "react";
import BlockChain from "./apis/blockchain";
import { LotteryContext } from "./components/LotteryContext"

function Buy() {

    let { jackpot, setJackpot, drawTime, setDrawTime, ticketAmount, setTicketAmount, ticketPrice, setTicketPrice, usageFeeRate, setUsageFeeRate } = useContext(LotteryContext)


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

    let onSetTicketPrice = async () => {
        await BlockChain.setTicketPrice(ticketPrice);
    }

    let onSetUsageFeeRate = async () => {
        await BlockChain.setUsageFee(usageFeeRate);
    }

    return (
        <>
            <h3>Buy Luktery Tickets</h3>
            <form>
                <input type="button" value="Connect to MetaMask" onClick={metamaskConnect} />
                <hr />
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
                <h3>Administration</h3>
                <p>Change Contract Managers</p>
                <input type="text" placeholder="Old Manager Address" />
                <input type="text" placeholder="New Manager Address" />
                <input type="button" value="Change" />
                <p>Change Ticket Price</p>
                <input type="text" placeholder="New Ticket Price (LUKT)" onChange={(e) => { setTicketPrice(e.target.value) }} />
                <input type="button" value="Change" onClick={onSetTicketPrice} />
                <p>Change Usage Fee Rate</p>
                <input type="text" placeholder="New %" onChange={(e) => { setUsageFeeRate(e.target.value) }} />
                <input type="button" value="Change" onClick={onSetUsageFeeRate} />
            </form>
        </>
    )

}

export default Buy;