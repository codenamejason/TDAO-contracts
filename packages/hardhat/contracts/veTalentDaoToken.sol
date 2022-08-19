pragma solidity ^0.8.4;
pragma experimental ABIEncoderV2;
//SPDX-License-Identifier: GPL

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract veTalentToken is ERC20, Ownable, AccessControl, ERC20Burnable {
    using SafeERC20 for IERC20;

    // Roles
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant DAO_ROLE = keccak256("DAO_ROLE");
    bytes32 public constant DISTRIBUTOR_ROLE = keccak256("DISTRIBUTOR_ROLE");

    // Mappings
    mapping(address => uint96) internal _balances;
    mapping(address => address) internal _delegates;
    mapping(address => mapping(address => uint256)) public allowances;
    mapping(address => mapping(uint32 => Checkpoint)) public checkpoints;

    /// @notice The number of checkpoints for each account
    mapping (address => uint32) public numCheckpoints;

    /// @notice A record of states for signing / validating signatures
    mapping (address => uint) private _nonces;

    /// @notice The EIP-712 typehash for the contract's domain
    bytes32 public constant DOMAIN_TYPEHASH = keccak256("EIP712Domain(string name, uint256 chainId, address verifyingContract)");

    /// @notice The EIP-712 typehash for the delegation struct used by the contract
    bytes32 public constant DELEGATION_TYPEHASH = keccak256("Delegation(address delegatee, uint256 nonce, uint256 expiry)");

    /// @notice The EIP-712 typehash for the permit struct used by the contract
    bytes32 public constant PERMIT_TYPEHASH = keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");

    // Events
    /// @notice An event thats emitted when an account changes its delegate
    event DelegateChanged(address indexed delegator, address indexed fromDelegate, address indexed toDelegate);

    /// @notice An event thats emitted when a delegate account's vote balance changes
    event DelegateVotesChanged(address indexed delegate, uint256 previousBalance, uint256 newBalance);

    /// @notice An event thats emitted when a snapshot has been done
    event SnapshotDone(address owner, uint128 oldValue, uint128 newValue);

    // Struct
    struct Checkpoint {
        uint32 fromBlock;
        uint256 votes;
    }

    // Errors
    error WrongRole();
    error LowBalance();
    error PastDeadline();
    error ZeroAddress();
    error OnlyOwner();
    error InvalidNonce();
    error SignatureExpired();

    // Modifiers
    modifier isPermittedMinter() {
        if(!hasRole(MINTER_ROLE, msg.sender) || owner() == msg.sender) revert WrongRole();
        _;
    }

    modifier isPermittedDao() {
        if(!hasRole(DAO_ROLE, msg.sender) || owner() == msg.sender) revert WrongRole();
        _;
    }

    modifier isPermittedOperator() {
        if(!hasRole(OPERATOR_ROLE, msg.sender) || owner() == msg.sender) revert WrongRole();
        _;
    }

    modifier isPermittedDistributor() {
        if(!hasRole(DISTRIBUTOR_ROLE, msg.sender) || owner() == msg.sender) revert WrongRole();
        _;
    }

    modifier isAdminOrOwner() {
        if(!hasRole(DEFAULT_ADMIN_ROLE, msg.sender) || owner() == msg.sender) revert WrongRole();
        _;
    }

    modifier hasEnoughBalance(uint256 balance, uint256 amount) {
        if(balance >= amount) revert LowBalance();
        _;
    }

    constructor
    (
        address _owner
    )
        ERC20("veTalent Reputation Token", "veTALENT")
        ERC20Burnable()
    {
        _setupRole(OPERATOR_ROLE, msg.sender);
        _setupRole(DISTRIBUTOR_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(DAO_ROLE, msg.sender);
        _mint(msg.sender, 10000000 ether);
        transferOwnership(_owner);
    }

    function setupNewAdminRole(address _newAdmin, address _oldAdmin)
        public
        onlyOwner
    {
        _revokeRole(DEFAULT_ADMIN_ROLE, _oldAdmin);
        _setupRole(DEFAULT_ADMIN_ROLE, _newAdmin);
    }

    function setupMinterRole(address newMinter)
        public
    {
        if(!hasRole(DEFAULT_ADMIN_ROLE, _msgSender()) || owner() != _msgSender()) revert WrongRole();
        _setupRole(MINTER_ROLE, newMinter);
    }

    function setupOperatorRole(address _newOperator)
        public
    {
        if(!hasRole(DEFAULT_ADMIN_ROLE, _msgSender()) || owner() != _msgSender()) revert WrongRole();
        _setupRole(OPERATOR_ROLE, _newOperator);
    }

    function setupDistributorRole(address _newDistributor)
        public
    {
        if(hasRole(OPERATOR_ROLE, _msgSender()) || hasRole(DEFAULT_ADMIN_ROLE, _msgSender())) revert WrongRole();
        _setupRole(DISTRIBUTOR_ROLE, _newDistributor);
    }

    function setupDaoRole(address _newDao)
        public
        onlyOwner
    {
        _setupRole(DAO_ROLE, _newDao);
    }

    /// @dev See {ERC20-_beforeTokenTransfer}
    /// @param _from the from address
    /// @param _to the to address
    /// @param _amount the amount
    function _beforeTokenTransfer(address _from, address _to, uint256 _amount)
        internal
        virtual
        override
    {
        super._beforeTokenTransfer(_from, _to, _amount);

        
    }

    /// @notice Mint token function
    /// @dev Mints to the sender
    /// @param _amount The amount to mint
    // function mintTokens
    // (
    //     uint256 _amount
    // )
    //     external

    // {
    //     if (msg.sender == address(0)) revert ZeroAddress();
    //     _balances[msg.sender] += uint96(_amount);

    //     _mint(msg.sender, _amount);
    //     _moveDelegates(address(0), _delegates[msg.sender], _amount);
    // }

    /// @notice Mint token function to address
    /// @dev This mints to a specified address
    /// @param _to The to address to mint to
    /// @param _amount The amount to mint
    function mintTokensTo
    (
        address _to,
        uint256 _amount
    )
        external
        isPermittedMinter
    {
        if (_to == address(0)) revert ZeroAddress();
        _balances[_to] += uint96(_amount);

        _mint(_to, _amount);
        _moveDelegates(address(0), _delegates[_to], _amount);
    }

    /// @notice Burn token from sender function
    /// @param _amount The amount to burn from sender
    function burn
    (
        uint256 _amount
    )
        public
        virtual
        override
    {
        if (msg.sender == address(0)) revert ZeroAddress();
        _balances[msg.sender] -= uint96(_amount);

        _burn(msg.sender, _amount);
    }

    /// @notice Burns from a specified address
    /// @param _amount The amount to burn
    /// @param _from The from address to burn from
    function burnFrom
    (
        address _from,
        uint256 _amount
    )
        public
        virtual
        override
    {
        if (_from == address(0)) revert ZeroAddress();
        _balances[_from] -= uint96(_amount);

        _burn(_from, _amount);
    }

        /**
     * @notice Triggers an approval from owner to spends
     * @param owner The address to approve from
     * @param spender The address to be approved
     * @param rawAmount The number of tokens that are approved (2^256-1 means infinite)
     * @param deadline The time at which to expire the signature
     * @param v The recovery byte of the signature
     * @param r Half of the ECDSA signature pair
     * @param s Half of the ECDSA signature pair
     */
    function permit(address owner, address spender, uint rawAmount, uint deadline, uint8 v, bytes32 r, bytes32 s)
        public
        virtual
    {
        if(block.timestamp >= deadline) revert PastDeadline();
        uint256 nonce = _nonces[owner];
        bytes32 domainSeparator = keccak256(abi.encode(DOMAIN_TYPEHASH, keccak256(bytes(name())), getChainId(), address(this)));
        bytes32 structHash = keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, rawAmount, nonce, deadline));
        bytes32 digest = keccak256(abi.encodePacked(uint16(0x1901), domainSeparator, structHash));
        address signatory = ecrecover(digest, v, r, s);
        if(signatory == address(0)) revert ZeroAddress();
        if(signatory != owner) revert OnlyOwner();
        // increase nonce for the owner
        _nonces[owner]++;
        // call the approve function or allowances function
        allowances[owner][spender] = rawAmount;
        _approve(owner, spender, rawAmount);
        emit Approval(owner, spender, rawAmount);
    }

    /**
    * @notice Returns the `delegatee`
    * @param delegator The address to get delegatee for
    */
    function delegatesView(address delegator)
        external
        view
        returns (address)
    {
        return _delegates[delegator];
    }

    /**
    * @notice Delegate votes from `msg.sender` to `delegatee`
    * @param delegatee The address to delegate votes to
    */
    function delegate(address delegatee) external {
        return _delegate(_msgSender(), delegatee);
    }

    /**
     * @notice Delegates votes from signatory to `delegatee`
     * @param delegatee The address to delegate votes to
     * @param nonce The contract state required to match the signature
     * @param expiry The time at which to expire the signature
     * @param v The recovery byte of the signature
     * @param r Half of the ECDSA signature pair
     * @param s Half of the ECDSA signature pair
     */
    function delegateBySig (
        address delegatee,
        uint nonce,
        uint expiry,
        uint8 v,
        bytes32 r,
        bytes32 s
    )
        external
    {
        bytes32 domainSeparator = keccak256(
            abi.encode(
                DOMAIN_TYPEHASH,
                keccak256(bytes(name())),
                getChainId(),
                address(this)
            )
        );

        bytes32 structHash = keccak256(
            abi.encode(
                DELEGATION_TYPEHASH,
                delegatee,
                nonce,
                expiry
            )
        );

        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                domainSeparator,
                structHash
            )
        );

        address signatory = ecrecover(digest, v, r, s);
        if(signatory == address(0)) revert ZeroAddress();
        if(nonce != _nonces[signatory]++) revert InvalidNonce();
        if(block.timestamp >= expiry) revert SignatureExpired();
        return _delegate(signatory, delegatee);
    }

    /**
     * @notice Gets the current votes balance for `account`
     * @param account The address to get votes balance
     * @return The number of current votes for `account`
     */
    function getCurrentVotes(address account)
        external
        view
        returns (uint256)
    {
        uint32 nCheckpoints = numCheckpoints[account];
        return nCheckpoints > 0 ? checkpoints[account][nCheckpoints - 1].votes : 0;
    }

    /**
     * @notice Determine the prior number of votes for an account as of a block number
     * @dev Block number must be a finalized block or else this function will revert to prevent misinformation.
     * @param account The address of the account to check
     * @param blockNumber The block number to get the vote balance at
     * @return The number of votes the account had as of the given block
     */
    function getPriorVotes(address account, uint blockNumber)
        external
        view
        returns (uint256)
    {
        require(blockNumber < block.number, "TALENT::getPriorVotes: not yet determined");

        uint32 nCheckpoints = numCheckpoints[account];
        if (nCheckpoints == 0) {
            return 0;
        }

        // First check most recent balance
        if (checkpoints[account][nCheckpoints - 1].fromBlock <= blockNumber) {
            return checkpoints[account][nCheckpoints - 1].votes;
        }

        // Next check implicit zero balance
        if (checkpoints[account][0].fromBlock > blockNumber) {
            return 0;
        }

        uint32 lower = 0;
        uint32 upper = nCheckpoints - 1;
        while (upper > lower) {
            uint32 center = upper - (upper - lower) / 2; // ceil, avoiding overflow
            Checkpoint memory cp = checkpoints[account][center];
            if (cp.fromBlock == blockNumber) {
                return cp.votes;
            } else if (cp.fromBlock < blockNumber) {
                lower = center;
            } else {
                upper = center - 1;
            }
        }
        return checkpoints[account][lower].votes;
    }

    function _delegate(address delegator, address delegatee)
        internal
    {
        address currentDelegate = _delegates[delegator];
        uint256 delegatorBalance = balanceOf(delegator); // balance of underlying PHRO (not scaled);
        _delegates[delegator] = delegatee;

        emit DelegateChanged(delegator, currentDelegate, delegatee);

        _moveDelegates(currentDelegate, delegatee, delegatorBalance);
    }

    function _transferTokens(address src, address dst, uint96 amount) internal {
        require(src != address(0), "TALENT::_transferTokens: cannot transfer from the zero address");
        require(dst != address(0), "TALENT::_transferTokens: cannot transfer to the zero address");

        _balances[src] = sub96(_balances[src], amount, "TALENT::_transferTokens: transfer amount exceeds balance");
        _balances[dst] = add96(_balances[dst], amount, "TALENT::_transferTokens: transfer amount overflows");
        emit Transfer(src, dst, amount);

        _moveDelegates(_delegates[src], _delegates[dst], amount);
    }

    function _moveDelegates(address srcRep, address dstRep, uint256 amount) internal {
        if (srcRep != dstRep && amount > 0) {
            if (srcRep != address(0)) {
                // decrease old representative
                uint32 srcRepNum = numCheckpoints[srcRep];
                uint256 srcRepOld = srcRepNum > 0 ? checkpoints[srcRep][srcRepNum - 1].votes : 0;
                uint256 srcRepNew = srcRepOld - amount;
                _writeCheckpoint(srcRep, srcRepNum, srcRepOld, srcRepNew);
            }

            if (dstRep != address(0)) {
                // increase new representative
                uint32 dstRepNum = numCheckpoints[dstRep];
                uint256 dstRepOld = dstRepNum > 0 ? checkpoints[dstRep][dstRepNum - 1].votes : 0;
                uint256 dstRepNew = dstRepOld + amount;
                _writeCheckpoint(dstRep, dstRepNum, dstRepOld, dstRepNew);
            }
        }
    }

    function _writeCheckpoint(
        address delegatee,
        uint32 nCheckpoints,
        uint256 oldVotes,
        uint256 newVotes
    )
        internal
    {
        uint32 blockNumber = safe32(block.number, "TALENT::_writeCheckpoint: block number exceeds 32 bits");

        if (nCheckpoints > 0 && checkpoints[delegatee][nCheckpoints - 1].fromBlock == blockNumber) {
            checkpoints[delegatee][nCheckpoints - 1].votes = newVotes;
        } else {
            checkpoints[delegatee][nCheckpoints] = Checkpoint(blockNumber, newVotes);
            numCheckpoints[delegatee] = nCheckpoints + 1;
        }

        emit DelegateVotesChanged(delegatee, oldVotes, newVotes);
    }

    function safe32(uint n, string memory errorMessage) internal pure returns (uint32) {
        require(n < 2**32, errorMessage);
        return uint32(n);
    }

    function safe96(uint n, string memory errorMessage) internal pure returns (uint96) {
        require(n < 2**96, errorMessage);
        return uint96(n);
    }

    function add96(uint96 a, uint96 b, string memory errorMessage) internal pure returns (uint96) {
        uint96 c = a + b;
        require(c >= a, errorMessage);
        return c;
    }

    function sub96(uint96 a, uint96 b, string memory errorMessage) internal pure returns (uint96) {
        require(b <= a, errorMessage);
        return a - b;
    }

    function getChainId() internal view returns (uint) {
        uint256 chainId;
        assembly { 
            chainId := chainid() 
        }

        return chainId;
    }
}