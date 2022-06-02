// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./IMok.sol";

contract Lottery is AccessControl {
    uint256 public _jackpot;
    uint256 public _usage_fees;
    uint256 public _last_draw_time;
    uint256 public _ticket_price;
    uint256 public _usage_fee_rate;

    address public _owner;
    address public _mok_address;

    address[2] public _managers;
    address[] public _players;

    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");

    constructor(
        address manager1,
        address manager2,
        address mokAddress
    ) {
        _jackpot = 0;
        _owner = msg.sender;
        _managers[0] = manager1;
        _managers[1] = manager2;
        _mok_address = mokAddress;
        _last_draw_time = block.timestamp;
        _ticket_price = 20 ether;
        _usage_fee_rate = 0.05 ether;
        _setupRole(DEFAULT_ADMIN_ROLE, _owner);
        _setupRole(OWNER_ROLE, _owner);
        _setupRole(MANAGER_ROLE, manager1);
        _setupRole(MANAGER_ROLE, manager2);
    }

    modifier onlyOwner() {
        require(hasRole(OWNER_ROLE, msg.sender), "requires owner permissions");
        _;
    }

    modifier onlyAdmin() {
        require(
            hasRole(OWNER_ROLE, msg.sender) ||
                hasRole(MANAGER_ROLE, msg.sender),
            "requires either owner or manager permissions"
        );
        _;
    }

    function changeManager(address oldManager, address newManager)
        public
        onlyRole(OWNER_ROLE)
    {
        require(
            _managers[0] == oldManager || _managers[1] == oldManager,
            "oldManager was not a manager!"
        );

        if (_managers[0] == oldManager) {
            revokeRole(MANAGER_ROLE, _managers[0]);
            _managers[0] = newManager;
        } else if (_managers[1] == oldManager) {
            revokeRole(MANAGER_ROLE, _managers[1]);
            _managers[1] = newManager;
        }

        grantRole(MANAGER_ROLE, newManager);
    }

    function setPrice(uint256 p) public onlyRole(OWNER_ROLE) {
        _ticket_price = p;
    }

    function setUsageFee(uint256 p) public onlyRole(MANAGER_ROLE) {
        _usage_fee_rate = p;
    }

    function buyTicket(uint256 amount) public {
        IMok m = IMok(_mok_address);

        uint256 total_price = amount * _ticket_price;

        require(
            m.balanceOf(msg.sender) >= total_price,
            "insufficient token balance"
        );

        m.transferFrom(msg.sender, address(this), total_price);

        _jackpot +=
            _ticket_price *
            amount -
            (_ticket_price * amount * _usage_fee_rate) /
            (1 ether); // 19 = 95% of 20

        _usage_fees += (total_price * _usage_fee_rate) / (1 ether);

        for (uint256 i = 0; i < amount; i++) {
            _players.push(msg.sender);
        }
    }

    function prng(uint256 max) private pure returns (uint256) {
        return 244737 % max;
    }

    function chooseWinner() public onlyAdmin returns (address) {
        // 5 minutes must have passed before new draw
        require(
            block.timestamp - _last_draw_time >= 5 * 60,
            "Not enough time has passed!"
        );

        _last_draw_time = block.timestamp;

        IMok m = IMok(_mok_address);

        // this better be true...
        require(
            m.balanceOf(address(this)) >= _jackpot,
            "Not enough money to give!"
        );

        address winner = _players[prng(_players.length)];
        if (!m.transfer(winner, _jackpot)) {
            revert("Failed to award lottery winner.");
        }

        _jackpot = 0;
        delete _players;

        return winner;
    }

    function collectUsageFees() public onlyOwner returns (bool) {
        IMok m = IMok(_mok_address);

        require(
            m.balanceOf(address(this)) >= _usage_fees,
            "usage fees balance lower than expected."
        );

        m.transferFrom(address(this), msg.sender, _usage_fees);

        _usage_fees = 0;

        return true;
    }
}
