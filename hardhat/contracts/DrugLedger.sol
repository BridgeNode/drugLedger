// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

struct Manufacturer {
   string name;
   string license;
}
struct Issue {
   string name;
   string description;
   uint256 date;
   address owner;
   bool resolved;
   string reason;
}

struct Drug {
   string cid;
   address manufacturer;
   Issue[] issues;
}
contract DrugLedger {
   address immutable owner; 
   uint256 public id;
   constructor() {
      owner = msg.sender;
   }

   mapping(address => Manufacturer) private manufacturers;
   mapping(uint256 => Drug) private drugs;

   event IssueOpened(uint256 indexed drugId, uint256 indexed issueId, string name, string description);
   event IssueClosed(uint256 indexed drugId, uint256 indexed issueId, string reason);
   event RegisteredManufacturer(string indexed name);
   event RegisteredDrug(uint256 indexed drugId, string indexed manufacturer);
   event ManufacturerRevoked(string indexed name, string indexed license);
   event Log(uint256 indexed drugId, string entity, string action,address from);
   
   modifier OnlyManufacturer() {
      require(bytes(manufacturers[msg.sender].name).length > 0, "Manufacturer not registered");
      _;
   }
   modifier onlyOwner() {
      require(msg.sender == owner, "Only Contract Owner allowed");
      _;
   }
   // TODO: OnlyOwner should call this function
   // TODO: requires to register once
   function register(address _addr, string memory _name, string memory _license) onlyOwner external {
      require(bytes(manufacturers[_addr].name).length == 0,"Manufacturer already registered");
      manufacturers[_addr] = Manufacturer({
         name: _name,
         license: _license
      });
      emit RegisteredManufacturer(_name);
   }
   function revoke(address _addr) onlyOwner external {
      string memory _name = manufacturers[_addr].name;
      string memory _license = manufacturers[_addr].license;
      delete manufacturers[_addr];
      emit ManufacturerRevoked(_name, _license);
   }

   function getManufacturer(address addr) view external returns(Manufacturer memory) {
      return manufacturers[addr];
   }

   function registerDrug(string memory cid) external OnlyManufacturer() returns(uint256) {
      drugs[id].cid = cid;
      drugs[id].manufacturer = msg.sender;
      id++; 
      string memory name = manufacturers[msg.sender].name;      
      emit RegisteredDrug(id - 1, name);
      return id-1;
   }


   function retrieve(uint256 _id) view external returns(Drug memory) {
      return drugs[_id];
   }

   function openIssue(uint256 _drugId, string memory _name, string memory _description) external {
      drugs[_drugId].issues.push(Issue({
         name: _name,
         description: _description,
         date: block.timestamp,
         owner: msg.sender,
         resolved: false,
         reason: ""
      }));
      emit IssueOpened(_drugId, drugs[_drugId].issues.length - 1, _name, _description);
   }

   function closeIssue(uint256 _drugId,uint256 _issueId, string memory _reason) external {
      require(drugs[_drugId].issues[_issueId].owner == msg.sender, "Must be owner");
      drugs[_drugId].issues[_issueId].reason = _reason;
      drugs[_drugId].issues[_issueId].resolved = true;
      emit IssueClosed(_drugId, _issueId, _reason);
   }

   function addLog(uint256 _drugId, string memory _entity, string memory _action) external {
      emit Log(_drugId, _entity, _action,msg.sender);
   }

   function verify(uint256 _drugId) view external returns(bool) {
      for (uint256 i = 0; i < drugs[_drugId].issues.length; i++) {
         if (drugs[_drugId].issues[i].resolved == false) {
            return false;
         }
      }
      return true;
   }
}