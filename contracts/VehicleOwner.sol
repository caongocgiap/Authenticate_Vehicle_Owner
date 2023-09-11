// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

interface ICertificate {
    function setOwnerInfo(
        string memory _cccd,
        string memory _name,
        string memory _sex,
        string memory _birthday,
        string memory _address
    ) external;

    function setVehicleInfo(
        string memory _licensePlate,
        string memory _model,
        string memory _brand,
        uint256 _year,
        string memory _color,
        uint256 _capacity,
        string memory _status
    ) external;

    function registerVehicle(
        string memory _licensePlate,
        string memory _fullName,
        string memory _dateOfBirth,
        string memory _nationality,
        string memory _address
    ) external;

    function getOwnerInfo(address _idOwner) external view returns (string memory cccd, string memory name, string memory sex, string memory birthday, string memory Address);
    function getVehicleInfo(string memory _licensePlate) external view returns (address owner, string memory licensePlate, string memory model, string memory brand, uint256 year, string memory color, uint256 capacity, string memory status);
}

contract Certificate is ICertificate {
    struct OwnerInfo { // Xác thực thông tin cá nhân
        address id;
        string cccd;
        string name;
        string sex;
        string birthday;
        string Address;
    }
    struct VehicleInfo { // Xác thực thông tin phương tiện
        address owner;
        string licensePlate;
        string model;
        string brand;
        uint256 year;
        string color;
        uint256 capacity;
        string status;
    }
    struct Registration { // Thông tin hiển thị trên hợp đồng
        address idOwner;
        string licensePlate;
        string fullName;
        string dateOfBirth;
        string nationality;
        string Address;
    }

    mapping(address => OwnerInfo) public Owner_Information;
    mapping(string => VehicleInfo) public Vehicle_Information;
    mapping(address => Registration) public Register_Vehicle;

    event OwnerInfoUpdated(address indexed owner, string cccd, string name, string sex, string birthday, string Address);
    event VehicleInfoUpdated(string indexed licensePlate, string model, string brand, uint256 year, string color, uint256 capacity, string status);
    event VehicleRegistered(string indexed licensePlate, address indexed owner, string fullName, string dateOfBirth, string nationality, string Address);

    modifier onlyOwner {
    require(Owner_Information[msg.sender].id == msg.sender, "You do not have permission to perform this action");
    _;
    }

    bool private firstRegister = false;

    modifier onlyFirstRegistration {
        require(!firstRegister, "First registration has already been done");
        _;
    }

    function setVehicleInfo(
        string memory _licensePlate,
        string memory _model,
        string memory _brand,
        uint256 _year,
        string memory _color,
        uint256 _capacity,
        string memory _status
    ) public override onlyOwner{
        Vehicle_Information[_licensePlate] = VehicleInfo({
            owner: msg.sender,
            licensePlate: _licensePlate,
            model: _model,
            brand: _brand,
            year: _year,
            color: _color,
            capacity: _capacity,
            status: _status
        });
    }

    function setOwnerInfo(
        string memory _cccd,
        string memory _name,
        string memory _sex,
        string memory _birthday,
        string memory _address
    ) public override onlyFirstRegistration{
        Owner_Information[msg.sender] = OwnerInfo({
            id: msg.sender,
            cccd: _cccd,
            name: _name,
            sex: _sex,
            birthday: _birthday,
            Address: _address
        });

        firstRegister = true;
    }

    function registerVehicle(
        string memory _licensePlate,
        string memory _fullName,
        string memory _dateOfBirth,
        string memory _nationality,
        string memory _address
    ) public override onlyOwner{
        Register_Vehicle[msg.sender] = Registration({
            idOwner: msg.sender,
            licensePlate: _licensePlate,
            fullName: _fullName,
            dateOfBirth: _dateOfBirth,
            nationality: _nationality,
            Address: _address
        });
    }

    function getOwnerInfo(address _idOwner)
        public
        view
        override
        returns (
            string memory cccd,
            string memory name,
            string memory sex,
            string memory birthday,
            string memory Address
        )
    {
        require(msg.sender == _idOwner || msg.sender == Register_Vehicle[_idOwner].idOwner, "You do not have permission to access this information");
        OwnerInfo memory info = Owner_Information[_idOwner];
        return (info.cccd, info.name, info.sex, info.birthday, info.Address);
    }

    function getVehicleInfo(string memory _licensePlate)
        public
        view
        override
        returns (
            address owner,
            string memory licensePlate,
            string memory model,
            string memory brand,
            uint256 year,
            string memory color,
            uint256 capacity,
            string memory status
        )
    {
        require(msg.sender == Vehicle_Information[_licensePlate].owner || msg.sender == Register_Vehicle[Vehicle_Information[_licensePlate].owner].idOwner, "You do not have permission to access this information");
        VehicleInfo memory info = Vehicle_Information[_licensePlate];
        return (
            info.owner,
            info.licensePlate,
            info.model,
            info.brand,
            info.year,
            info.color,
            info.capacity,
            info.status
        );
    }
}
