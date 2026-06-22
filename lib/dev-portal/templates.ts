export const CONTRACT_TEMPLATES = {
  erc20: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor() ERC20("My Token", "MTK") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}`,

  erc721: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    uint256 private _tokenIdCounter;

    constructor() ERC721("My NFT", "MNFT") {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter++;
        _safeMint(to, tokenId);
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }
}`,

  staking: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Staking is Ownable {
    IERC20 public stakingToken;
    uint256 public rewardRate = 45; // 45% APY

    mapping(address => uint256) public stakedAmount;
    mapping(address => uint256) public stakeTime;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 reward);

    constructor(address _stakingToken) {
        stakingToken = IERC20(_stakingToken);
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be > 0");
        stakingToken.transferFrom(msg.sender, address(this), amount);
        stakedAmount[msg.sender] += amount;
        stakeTime[msg.sender] = block.timestamp;
        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external {
        require(stakedAmount[msg.sender] >= amount, "Insufficient staked");
        stakedAmount[msg.sender] -= amount;
        stakingToken.transfer(msg.sender, amount);
        emit Unstaked(msg.sender, amount);
    }

    function claimRewards() external {
        uint256 reward = calculateReward(msg.sender);
        require(reward > 0, "No rewards");
        stakeTime[msg.sender] = block.timestamp;
        stakingToken.transfer(msg.sender, reward);
        emit RewardClaimed(msg.sender, reward);
    }

    function calculateReward(address user) public view returns (uint256) {
        if (stakedAmount[user] == 0) return 0;
        uint256 timeStaked = block.timestamp - stakeTime[user];
        return (stakedAmount[user] * rewardRate * timeStaked) / (365 days * 100);
    }
}`,

  swap: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SimpleSwap {
    IERC20 public tokenA;
    IERC20 public tokenB;
    uint256 public reserveA;
    uint256 public reserveB;

    event Swapped(address indexed user, uint256 amountIn, uint256 amountOut);

    constructor(address _tokenA, address _tokenB) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
    }

    function addLiquidity(uint256 amountA, uint256 amountB) external {
        tokenA.transferFrom(msg.sender, address(this), amountA);
        tokenB.transferFrom(msg.sender, address(this), amountB);
        reserveA += amountA;
        reserveB += amountB;
    }

    function swap(uint256 amountIn, bool isTokenA) external {
        require(amountIn > 0, "Amount must be > 0");
        
        if (isTokenA) {
            uint256 amountOut = (amountIn * reserveB) / (reserveA + amountIn);
            tokenA.transferFrom(msg.sender, address(this), amountIn);
            tokenB.transfer(msg.sender, amountOut);
            reserveA += amountIn;
            reserveB -= amountOut;
            emit Swapped(msg.sender, amountIn, amountOut);
        } else {
            uint256 amountOut = (amountIn * reserveA) / (reserveB + amountIn);
            tokenB.transferFrom(msg.sender, address(this), amountIn);
            tokenA.transfer(msg.sender, amountOut);
            reserveB += amountIn;
            reserveA -= amountOut;
            emit Swapped(msg.sender, amountIn, amountOut);
        }
    }
}`,

  battle: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ArenaBattle {
    enum BattleStatus { Pending, Active, Completed, Cancelled }

    struct Battle {
        address player1;
        address player2;
        uint256 player1Score;
        uint256 player2Score;
        BattleStatus status;
        uint256 createdAt;
    }

    mapping(uint256 => Battle) public battles;
    uint256 public battleCounter;

    event BattleCreated(uint256 indexed battleId, address player1, address player2);
    event BattleUpdated(uint256 indexed battleId, uint256 p1Score, uint256 p2Score);
    event BattleCompleted(uint256 indexed battleId, address winner);

    function createBattle(address player1, address player2) external returns (uint256) {
        battles[battleCounter] = Battle({
            player1: player1,
            player2: player2,
            player1Score: 0,
            player2Score: 0,
            status: BattleStatus.Pending,
            createdAt: block.timestamp
        });
        emit BattleCreated(battleCounter, player1, player2);
        return battleCounter++;
    }

    function updateScore(uint256 battleId, uint256 p1Score, uint256 p2Score) external {
        Battle storage battle = battles[battleId];
        require(battle.status == BattleStatus.Active, "Invalid battle status");
        battle.player1Score = p1Score;
        battle.player2Score = p2Score;
        emit BattleUpdated(battleId, p1Score, p2Score);
    }

    function completeBattle(uint256 battleId) external {
        Battle storage battle = battles[battleId];
        require(battle.status == BattleStatus.Active, "Invalid battle status");
        battle.status = BattleStatus.Completed;
        address winner = battle.player1Score > battle.player2Score ? battle.player1 : battle.player2;
        emit BattleCompleted(battleId, winner);
    }
}`,
};
