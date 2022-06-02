// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IMok {
    function balanceOf(address who) external view returns (uint256);

    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function approve(address spender, uint256 amount) external returns (bool);
}
