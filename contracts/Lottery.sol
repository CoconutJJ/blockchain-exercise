// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Mok {
    function balanceOf(address who) external view returns (uint256);

    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function approve(address spender, uint256 amount) external returns (bool);
}

contract Lottery {
    uint256 _jackpot;
    uint256 _usage_fees;
    uint256 _last_draw_time;
    address _owner;
    address[2] _managers;
    address _mok_address;
    address[] _players;

    constructor(
        address owner,
        address manager1,
        address manager2,
        address mokAddress
    ) {
        _jackpot = 0;
        _owner = owner;
        _managers[0] = manager1;
        _managers[1] = manager2;
        _mok_address = mokAddress;
        _last_draw_time = block.timestamp;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner);
        _;
    }

    modifier onlyAdmin() {
        require(
            msg.sender == _owner ||
                msg.sender == _managers[0] ||
                msg.sender == _managers[1]
        );
        _;
    }

    function buyTicket(uint256 amount) public {
        Mok m = Mok(_mok_address);

        require(m.balanceOf(msg.sender) >= 20 * amount);

        if (!m.transferFrom(msg.sender, address(this), amount * 20)) {
            revert("Failed to transfer Mok payment to Lottery contract");
        }

        _jackpot += amount * 19; // 19 = 95% of 20

        _usage_fees += amount;

        for (uint256 i = 0; i < amount; i++) {
            _players.push(msg.sender);
        }
    }

    function prng(uint256 max) private pure returns (uint256) {
        return 244737 % max;
    }

    function getJackpot() public view returns (uint256) {
        return _jackpot;
    }

    function getNextDrawTime() public view returns (uint256) {
        return _last_draw_time + 5 * 60;
    }

    function chooseWinner() public onlyAdmin returns (address) {
        // 5 minutes must have passed before new draw
        require(block.timestamp - _last_draw_time >= 5 * 60, "Not enough time has passed!");

        _last_draw_time = block.timestamp;

        Mok m = Mok(_mok_address);

        // this better be true...
        require(m.balanceOf(address(this)) >= _jackpot, "Not enough money to give!");

        address winner = _players[prng(_players.length)];
        if (!m.transfer(winner, _jackpot)) {
            revert("Failed to award lottery winner.");
        }

        _jackpot = 0;
        delete _players;

        return winner;
    }

    function collectUsageFees() public onlyOwner returns (bool) {
        Mok m = Mok(_mok_address);

        require(m.balanceOf(address(this)) >= _usage_fees);

        if (!m.transferFrom(address(this), msg.sender, _usage_fees)) {
            revert("Failed to collect usage fees");
        }

        _usage_fees = 0;

        return true;
    }
}
