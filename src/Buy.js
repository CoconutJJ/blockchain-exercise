import { useContext, useState } from "react";
import { LotteryContext } from "./components/LotteryContext"

function Buy() {

    let { jackpot, setJackpot } = useContext(LotteryContext)


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
                <input type="number" min="1" placeholder="Amount" />
                <input type="button" value="Buy" />
                <p>
                    Current Jackpot: {jackpot}
                </p>
            </form>
        </>
    )

}

export default Buy;