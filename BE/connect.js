let addressAccount = document.querySelector('#addressAccount');

// 2. connect to sport contract
const connectContract = async () => {
    const ABI = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "cccd",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "sex",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "birthday",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "Address",
                    "type": "string"
                }
            ],
            "name": "OwnerInfoUpdated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "string",
                    "name": "licensePlate",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "model",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "brand",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "year",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "color",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "capacity",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "status",
                    "type": "string"
                }
            ],
            "name": "VehicleInfoUpdated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "string",
                    "name": "licensePlate",
                    "type": "string"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "fullName",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "dateOfBirth",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "nationality",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "Address",
                    "type": "string"
                }
            ],
            "name": "VehicleRegistered",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "Owner_Information",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "id",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "cccd",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "sex",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "birthday",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "Address",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "Register_Vehicle",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "idOwner",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "licensePlate",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "fullName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "dateOfBirth",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "nationality",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "Address",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "name": "Vehicle_Information",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "licensePlate",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "model",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "brand",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "year",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "color",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "capacity",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "status",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_idOwner",
                    "type": "address"
                }
            ],
            "name": "getOwnerInfo",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "cccd",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "sex",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "birthday",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "Address",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_licensePlate",
                    "type": "string"
                }
            ],
            "name": "getVehicleInfo",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "licensePlate",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "model",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "brand",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "year",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "color",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "capacity",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "status",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_licensePlate",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_fullName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_dateOfBirth",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_nationality",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_address",
                    "type": "string"
                }
            ],
            "name": "registerVehicle",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_cccd",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_sex",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_birthday",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_address",
                    "type": "string"
                }
            ],
            "name": "setOwnerInfo",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_licensePlate",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_model",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_brand",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_year",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_color",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_capacity",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_status",
                    "type": "string"
                }
            ],
            "name": "setVehicleInfo",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
    const Address = "0xd9145CCE52D386f254917e481eB44e9943F39138";
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
}
connectContract();

// 3. read data from smart contract
const readContract = async () => {
    const data = await window.contract.methods.myCity().call();
    document.querySelector('#dataArea').innerHTML = "Your city is " + data;
}


