/**
* @dev
* Interface to access the SkyRocketNFTFactory
**/
contract ISkyRocketNFTFactory  {

    /**
     * @dev Grants or revokes permission to `operator` to transfer the caller's tokens, according to `approved`,
     *
     * Emits an {ApprovalForAll} event.
     *
     * Requirements:
     *
     * - `operator` cannot be the caller.
     */
    function setApprovalForAll(address operator, bool approved) external;

    /**
    * @dev
    * Returns the balance of the number of NFTs based on the NFTId
    **/
    function balanceOf(address _owner, uint256 _nftId) external view returns (uint256);

    /**
    * @dev
    * Returns the balance of a list of addresses
    **/
    function balanceOfBatch(address[] calldata _owners, uint256[] calldata _ids) external view returns (uint256[] memory);

    /**
    * @dev
    * Mint the NFT
    **/
    function mint(address _to, uint256 _nftId, uint256 _quantity, bytes calldata _data) external;

    /**
    * @dev
    * Check if the NFT is mintable
    **/
    function isMintable(uint256 _nftId) external view returns (bool);

    /**
    * @dev
    * Transfer the NFT _from _to
    **/
    function safeTransferFrom(address _from, address _to, uint256 _id, uint256 _amount, bytes calldata _data) external;

    /**
    * @dev
    * Safe transfer a batch of NFTs _from _to
    **/
    function safeBatchTransferFrom(address _from, address _to, uint256[] calldata _ids, uint256[] calldata _amounts, bytes calldata _data) external;

    /**
    * @dev
    * Get max supply for token NFT id
    **/
    function maxSupply(uint256 _nftId) external view returns (uint256);

    /**
    * @dev Total amount of tokens in with a given NFT id.
     */
    function totalSupply(uint256 _nftId) external view returns (uint256);

    /**
    * @dev
    * Get the Tier based on the NFT Id
    **/
    function getTierByNFTId(uint256 _nftId) external view returns (uint256);

    /**
    * @dev
    * Burn the NFT
    **/
    function burn(address account, uint256 id, uint256 value) external;

    /**
    * @dev Get the total owned NFTs by the address
    **/
    function getTotalOwnedNFTs(address _address) external view returns (uint256);

    /**
    * @dev Get array of all owned NFTs by the address
    **/
    function getOwnedNFTs(address _address) external view returns (uint256[] memory);

    /**
    * @dev Get DNA by NFT Id
    **/
    function getDNAByNFTId(uint256 _nftId) external view returns (uint256);

    /**
    * @dev
    * Get the Tier Name based on the NFT Id
    **/
    function getTierNameByNFTId(uint256 _nftId) public view returns (string memory);

    /**
    * @dev Mint the token to the _receiver address, although you can specify a quantity it is suggested to mint only 1
    * Only Admins are allowed to mint tokens
    **/
    function mint(address _receiver, bytes calldata _data) external;

}
