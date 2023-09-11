let addressAccount = document.querySelector('#addressAccount');
let btn_okNotification = document.querySelector('#ok_notification');

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
                    "name": "nationality",
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
                    "internalType": "address",
                    "name": "",
                    "type": "address"
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
            "name": "createContract",
            "outputs": [],
            "stateMutability": "nonpayable",
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
            "name": "getAddress",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
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
            "name": "getDateOfBirth",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
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
            "name": "getLicensePlate",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
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
            "name": "getName",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
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
            "name": "getNationality",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
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
            "name": "getRigester",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "_licensePlatee",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_name",
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
                    "name": "_Address",
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
                    "name": "_nationality",
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
                }
            ],
            "name": "setVehicleInfo",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
    const Address = "0xcD289b334Abe3020B6C4E9b1fC33B202C7E552B1";
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
}
connectContract();

// 3. read data from smart contract
const readContract = async () => {
    const data = await window.contract.methods.myCity().call();
    document.querySelector('#dataArea').innerHTML = "Your city is " + data;
}

btn_okNotification.addEventListener('click', function() {
    document.querySelector('.Notification').style.display = "none";
    
})
