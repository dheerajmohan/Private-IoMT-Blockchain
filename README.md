# Private IoMT Blockchain

Security of Internet of Medical Things (IoMT), especially data security, is a major challenge in the present world, owing to the increasing number of cyber attacks. Blockchain technology is by far one of the most advances solutions for data storage, due to the enormous amount of cryptography being put into its infrastructure. However, implementing blockchain in IoT devices is extremely difficult due to the resource constraints in miniature devices. Scalability issues in public blockchain systems pose a major challenge to incorporating it into smaller devices. Inorder to mitigate these issues, a solution in which different stakeholders in a medical system, such as patients, doctors etc act as nodes in a private blockchain is proposed. 

This project implements a private Ethereum Blockchain network consisting of Raspberry Pi devices which are considered as an analogue for IoMT devices such as sensors, implants etc. The. Most of the scalability issues in a public blockchain has been addressed in this solution by using Proof of Authority consensus mechanism. The private network is created using geth CLI.

### Features

  - Implemented in Ethereum using Geth
  - Proof of Authority consensus mechanism
  - Double encryption mechanism
  - Works without a gateway device or cloud storage
 
### Tech

This project is implemented using the following technologies:

* [Python] - For implementing encryption mechanism in the server
* [Flask] - For implementing the server module
* [Javascript] - Front-end application to implement data storage algorithm
* [Bootstrap] - Better UI
* [Truffle Suite] - Easier development of DApps in Ethereum
* [web3.js] - For interaction between the DApp and the ethereum node
* [Geth] - To create the private network
* [Metamask] - Browser extension for Ethereum wallets

### Installation

The first step is to set up a private Ethereum network in the device using geth. Once it is done, the host and port number should be configured in the truffle-config.json file in the frontend folder. 

Install Truffle Suite for easier development. Next, the smart contracts are compiled and deployed to the geth network.

```sh
$ cd frontend
$ truffle compile
$ truffle migrate --reset
```

The project requires [Node.js](https://nodejs.org/) to run.
Install the dependencies and devDependencies and start the server.

```sh
$ cd frontend
$ npm install 
$ npm run dev
```

You need to have Metamask configured in your browser to perform transactions. 

### Running the backend

The backend is developed in Python. The backend features a double encryption mechanism using AES and ECC, and a server module developed in Flask. To start the server, install the required libraries and then run the code
```sh
$ cd backend
$ python server.py
```

License
----

BSD 3-Clause Licence

