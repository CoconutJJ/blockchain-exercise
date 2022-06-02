pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PresaleService is Ownable {
    struct Presale {
        uint256 startTime;
        uint256 endTime;
        uint256 price;
        uint256 tokens;
        address tokenAddress;
    }

    using Counters for Counters.Counter;

    uint256 usageFeeBP;
    mapping(uint256 => Presale) presales;
    Counters.Counter private presaleId;

    constructor(uint256 _usageFeeBPs) {
        usageFeeBP = _usageFeeBPs;
    }

    function startPresale(
        uint256[] calldata startTimes,
        uint256[] calldata endTimes,
        uint256[] calldata prices,
        uint256[] calldata tokenAmounts,
        address tokenAddress
    ) public {
        require(
            startTimes.length == endTimes.length,
            "Input lists must have same length"
        );
        require(
            endTimes.length == prices.length,
            "Input lists must have same length"
        );
        require(
            prices.length == tokenAmounts.length,
            "Input lists must have same length"
        );

        for (uint256 i = 0; i < startTimes.length; i++) {

            uint256 id = presaleId.current();

            presaleId.increment();

            presales[id] = Presale(startTimes[i], endTimes[i], prices[i], tokenAmounts[i], tokenAddress);
        }

    }

    function buy(uint256 presaleId, uint256 tokenDecimals) public payable {

        Presale memory sale = presales[presaleId];

        sale.tokenAddress
        


    }

}
