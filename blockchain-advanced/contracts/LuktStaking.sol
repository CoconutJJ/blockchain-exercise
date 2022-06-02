pragma solidity ^0.8.0;


interface IERC20 {
    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint);

    function transfer(address recipient, uint amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}


contract LuktStaking {
    struct StakeHolder {
        uint256 amount;
        uint256 rewardDebt;
    }

    IERC20 _token;

    uint256 REWARD_PER_BLOCK = 1;
    uint256 DECIMALS = 1e18;
    
    uint256 _lastBlock = 0;
    uint256 _totalSupply = 0;
    uint256 _accumulatedRewardsPerShare = 0;
    
    mapping(address => StakeHolder) _stakers;


    constructor(address _stakingTokenAddress, uint256 _rewards_per_block) {
        _token = IERC20(_stakingTokenAddress);
        REWARD_PER_BLOCK = _rewards_per_block;
    }


    function updateRewards() private {

        if (_totalSupply == 0) {
            _lastBlock = block.number;
        }

        _accumulatedRewardsPerShare = (block.number - _lastBlock) * REWARD_PER_BLOCK * DECIMALS / _totalSupply;
        _lastBlock = block.number;
    }

    function harvest() public {

        updateRewards();

        StakeHolder storage s = _stakers[msg.sender];

        uint256 rewards = s.amount * _accumulatedRewardsPerShare / DECIMALS - s.rewardDebt;

        s.rewardDebt = s.amount * _accumulatedRewardsPerShare / DECIMALS;

        _token.transferFrom(address(this), msg.sender, rewards);
        
    }

    function stake(uint256 amount) public {

        harvest();
        
        StakeHolder storage s = _stakers[msg.sender];

        s.amount += amount;
        
        _totalSupply += amount;

    }

    function withdraw() public {

        harvest();

        StakeHolder storage s = _stakers[msg.sender];

        _token.transferFrom(address(this), msg.sender, s.amount);

        s.rewardDebt = s.amount * _accumulatedRewardsPerShare / DECIMALS;
        s.amount = 0;

        _totalSupply -= s.amount;
    }

}
