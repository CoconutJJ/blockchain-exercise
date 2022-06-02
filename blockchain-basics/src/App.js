import { useCallback, useContext, useEffect, useState } from "react";
import Buy from "./Buy"
function App() {

    return (
        <>
            <h1>The Luktery</h1>
            <p>Tickets are 20 Lukt each!</p>
            <Buy />
        </>
    );
}

export default App;