import { useContext, useState } from "react";
import BlockChain from "./apis/blockchain";
import { LotteryContext } from "./components/LotteryContext"

function Buy() {

    let { jackpot, setJackpot } = useContext(LotteryContext)

    let [amount, setAmount] = useState(0);

    let onBuy = async () => {

        await BlockChain.buyTicket(amount);

    }

    let onChooseWinner = async () => {
        await BlockChain.chooseWinner();
    }

    return (
        <>
            <h3>Buy LUKT Tokens</h3>
            <form>
                <input type="button" value="Gimme LUKT" />
            </form>
            <h3>Buy Luktery Tickets</h3>
            <p>
                Tickets are 20 Lukt Each.
            </p>
            <form>
                <label for="ticket-amount">Buy Tickets: </label>
                <input type="number" min="1" placeholder="Amount" onChange={(e) => {
                    setAmount(parseInt(e.target.value))
                }} />
                <input type="button" value="Buy" onClick={onBuy} />
                <p>
                    Current Jackpot: {jackpot}
                </p>
                <input type="button" value="Choose a Winner" onClick={onChooseWinner}/>
            </form>
        </>
    )

}

export default Buy;