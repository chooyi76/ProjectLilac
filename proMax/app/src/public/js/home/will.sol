// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract WillStorage {
    
    struct will {
        uint32 id;
        //string name;
        //bytes32 message;
        //uint32 birth;
        uint32 amt;
        address to_addr;
    }
    
    mapping(address => will) will_map;
    

    function store(uint32 _id, uint32 _amt, address _to_addr) public payable {
        require(_amt <= msg.value);
        
        // _amt or msg.value?
        will_map[msg.sender] = will(_id,_amt, _to_addr);
        
    }
    /**function execute(address _writer){
         will memory _X = will_map[_writer];
         _X
    }

    /**
     * @dev Return value 
     * @return value of 'number'
     * string memory contents = getWill[msg.sender].message;
        bytes32 toSend;
        for (uint i=0;i<contents.length;i++){
            toSend.push(contents[i]);
        }
        return (toSend);
     */
    function retrieve(address _writer) public view returns (uint32, uint32, address) {
        will memory _X = will_map[_writer];
        return (_X.id,_X.amt, _X.to_addr);
    } 
}