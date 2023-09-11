// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Certificate {
    struct OwnerInfo {
        // Xác thực thông tin cá nhân
        address id;
        string cccd;
        string name;
        string nationality;
        string birthday;
        string Address;
    }
    struct VehicleInfo {
        // Xác thực thông tin phương tiện
        address owner;
        string licensePlate;
        string brand;
        uint256 year;
        string color;
        uint256 capacity;
    }
    struct Registration {
        // Thông tin hiển thị trên hợp đồng
        string licensePlate;
        string fullName;
        string dateOfBirth;
        string nationality;
        string Address;
    }

    mapping(address => OwnerInfo) public Owner_Information;
    mapping(address => VehicleInfo) public Vehicle_Information;
    mapping(address => Registration) public Register_Vehicle;

    event OwnerInfoUpdated(
        address indexed owner,
        string cccd,
        string name,
        string sex,
        string birthday,
        string Address
    );
    event VehicleInfoUpdated(
        string indexed licensePlate,
        string model,
        string brand,
        uint256 year,
        string color,
        uint256 capacity,
        string status
    );
    event VehicleRegistered(
        string indexed licensePlate,
        address indexed owner,
        string fullName,
        string dateOfBirth,
        string nationality,
        string Address
    );

    modifier onlyOwner() {
        require(
            Owner_Information[msg.sender].id == msg.sender,
            "You do not have permission to perform this action"
        );
        _;
    }

    bool private firstRegister = false;

    modifier onlyFirstRegistration() {
        require(!firstRegister, "First registration has already been done");
        _;
    }

    function setVehicleInfo(
        string memory _licensePlate,
        string memory _brand,
        uint256 _year,
        string memory _color,
        uint256 _capacity
    ) public onlyOwner {
        Vehicle_Information[msg.sender] = VehicleInfo({
            owner: msg.sender,
            licensePlate: _licensePlate,
            brand: _brand,
            year: _year,
            color: _color,
            capacity: _capacity
        });
    }

    function setOwnerInfo(
        string memory _cccd,
        string memory _name,
        string memory _nationality,
        string memory _birthday,
        string memory _address
    ) public onlyFirstRegistration {
        Owner_Information[msg.sender] = OwnerInfo({
            id: msg.sender,
            cccd: _cccd,
            name: _name,
            nationality: _nationality,
            birthday: _birthday,
            Address: _address
        });

        firstRegister = true;
    }

    function registerVehicle(
        string memory _licensePlate,
        string memory _brand,
        uint256 _year,
        string memory _color,
        uint256 _capacity
    ) public onlyOwner {
        Vehicle_Information[msg.sender] = VehicleInfo({
            owner: msg.sender,
            licensePlate: _licensePlate,
            brand: _brand,
            year: _year,
            color: _color,
            capacity: _capacity
        });
    }

    function getRigester(address _idOwner)
        public
        view
        returns (
            string memory _licensePlatee,
            string memory _name,
            string memory _dateOfBirth,
            string memory _nationality,
            string memory _Address
        )
    {
        VehicleInfo memory info = Vehicle_Information[_idOwner];
        Registration memory regis = Register_Vehicle[_idOwner];
        return (
            info.licensePlate,
            regis.fullName,
            regis.dateOfBirth,
            regis.nationality,
            regis.Address
        );
    }

    function getLicensePlate(address _idOwner) public view returns (string memory) {
    Registration memory regis = Register_Vehicle[_idOwner];
    return regis.licensePlate;
    }

    function getName(address _idOwner) public view returns (string memory) {
        Registration memory regis = Register_Vehicle[_idOwner];
        return regis.fullName;
    }

    function getDateOfBirth(address _idOwner) public view returns (string memory) {
        Registration memory regis = Register_Vehicle[_idOwner];
        return regis.dateOfBirth;
    }

    function getNationality(address _idOwner) public view returns (string memory) {
        Registration memory regis = Register_Vehicle[_idOwner];
        return regis.nationality;
    }

    function getAddress(address _idOwner) public view returns (string memory) {
        Registration memory regis = Register_Vehicle[_idOwner];
        return regis.Address;
    }


    function createContract(address _idOwner) public {
        VehicleInfo memory info = Vehicle_Information[_idOwner];
        OwnerInfo memory regis = Owner_Information[_idOwner];
        Register_Vehicle[_idOwner] = Registration({
            licensePlate: info.licensePlate,
            fullName: regis.name,
            dateOfBirth: regis.birthday,
            nationality: regis.nationality,
            Address: regis.Address
        });
    }
}
