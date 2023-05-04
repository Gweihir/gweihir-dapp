/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../common";
import type { Consumer, ConsumerInterface } from "../Consumer";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_link",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "ChainlinkCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "ChainlinkFulfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "ChainlinkRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "freePlank",
        type: "uint256",
      },
    ],
    name: "RequestKusamaAccountBalanceFulfilled",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "currentAccountBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_oracle",
        type: "address",
      },
      {
        internalType: "string",
        name: "_jobId",
        type: "string",
      },
      {
        internalType: "string",
        name: "kusamaAddress",
        type: "string",
      },
      {
        internalType: "string",
        name: "kusamaBlockHash",
        type: "string",
      },
    ],
    name: "requestKusamaAccountBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "freePlank",
        type: "uint256",
      },
    ],
    name: "fulfillKusamaAccountBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getChainlinkToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "withdrawLink",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_requestId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_payment",
        type: "uint256",
      },
      {
        internalType: "bytes4",
        name: "_callbackFunctionId",
        type: "bytes4",
      },
      {
        internalType: "uint256",
        name: "_expiration",
        type: "uint256",
      },
    ],
    name: "cancelRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405260016004553480156200001657600080fd5b506040516200261d3803806200261d83398181016040528101906200003c919062000417565b338060008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603620000b1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620000a890620004aa565b60405180910390fd5b81600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161462000139576200013881620001a060201b60201c565b5b505050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603620001875762000181620002d160201b60201c565b62000199565b62000198816200036960201b60201c565b5b506200053e565b3373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160362000211576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040162000208906200051c565b60405180910390fd5b80600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff16600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae127860405160405180910390a350565b6200036773c89bd4e1632d3a43cb03aaad5262cbe4038bc57173ffffffffffffffffffffffffffffffffffffffff166338cc48316040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000335573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200035b919062000417565b6200036960201b60201c565b565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620003df82620003b2565b9050919050565b620003f181620003d2565b8114620003fd57600080fd5b50565b6000815190506200041181620003e6565b92915050565b60006020828403121562000430576200042f620003ad565b5b6000620004408482850162000400565b91505092915050565b600082825260208201905092915050565b7f43616e6e6f7420736574206f776e657220746f207a65726f0000000000000000600082015250565b60006200049260188362000449565b91506200049f826200045a565b602082019050919050565b60006020820190508181036000830152620004c58162000483565b9050919050565b7f43616e6e6f74207472616e7366657220746f2073656c66000000000000000000600082015250565b60006200050460178362000449565b91506200051182620004cc565b602082019050919050565b600060208201905081810360008301526200053781620004f5565b9050919050565b6120cf806200054e6000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c806379ba50971161006657806379ba50971461010c5780638da5cb5b146101165780638dc654a214610134578063ec65d0f81461013e578063f2fde38b1461015a57610093565b806301e9741d14610098578063165d35e1146100b4578063358b4009146100d25780636b5489e8146100f0575b600080fd5b6100b260048036038101906100ad91906114cb565b610176565b005b6100bc6102d6565b6040516100c99190611595565b60405180910390f35b6100da6102e5565b6040516100e791906115c9565b60405180910390f35b61010a60048036038101906101059190611646565b6102eb565b005b61011461042a565b005b61011e6105c1565b60405161012b9190611595565b60405180910390f35b61013c6105eb565b005b610158600480360381019061015391906116de565b610738565b005b610174600480360381019061016f9190611745565b610752565b005b61017e610766565b600061019a61018c856107f8565b30636b5489e860e01b610821565b90506101e66040518060400160405280600781526020017f616464726573730000000000000000000000000000000000000000000000000081525084836108529092919063ffffffff16565b6102306040518060400160405280600981526020017f626c6f636b48617368000000000000000000000000000000000000000000000081525083836108529092919063ffffffff16565b6102af6040518060400160405280600481526020017f70617468000000000000000000000000000000000000000000000000000000008152506040518060400160405280600981526020017f646174612c667265650000000000000000000000000000000000000000000000815250836108529092919063ffffffff16565b6102ce85826064670de0b6b3a76400006102c991906117d0565b610885565b505050505050565b60006102e0610951565b905090565b60085481565b816005600082815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461038d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161038490611884565b60405180910390fd5b6005600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055807f7cc135e0cebb02c3480ae5d74d377283180a2601f8f644edf7987b009316c63a60405160405180910390a281837fb3090e53eb64d399f3b5f74d4ab772c2f1ea7cc67240f59955594c4653cc284c60405160405180910390a381600881905550505050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146104ba576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104b1906118f0565b60405180910390fd5b6000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905033600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a350565b6000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6105f3610766565b60006105fd610951565b90508073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb338373ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016106559190611595565b602060405180830381865afa158015610672573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106969190611925565b6040518363ffffffff1660e01b81526004016106b3929190611952565b6020604051808303816000875af11580156106d2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106f691906119b3565b610735576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161072c90611a2c565b60405180910390fd5b50565b610740610766565b61074c8484848461097b565b50505050565b61075a610766565b61076381610a8e565b50565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146107f6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107ed90611a98565b60405180910390fd5b565b6000808290506000815103610813576000801b91505061081c565b60208301519150505b919050565b61082961128c565b61083161128c565b61084885858584610bbc909392919063ffffffff16565b9150509392505050565b610869828460800151610c6c90919063ffffffff16565b610880818460800151610c6c90919063ffffffff16565b505050565b600080600454905060018161089a9190611ab8565b6004819055506000634042994660e01b60008087600001513089604001518760018c60800151600001516040516024016108db989796959493929190611b89565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050905061094686838684610c91565b925050509392505050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60006005600086815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506005600086815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055847fe1fe3afa0f7f761ff0a8b89086790efd5140d2907ebd5b7ff6bfcb5e075fd4c560405160405180910390a28073ffffffffffffffffffffffffffffffffffffffff16636ee4d553868686866040518563ffffffff1660e01b8152600401610a559493929190611c0e565b600060405180830381600087803b158015610a6f57600080fd5b505af1158015610a83573d6000803e3d6000fd5b505050505050505050565b3373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610afc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610af390611c9f565b60405180910390fd5b80600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff16600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae127860405160405180910390a350565b610bc461128c565b610bd48560800151610100610e26565b508385600001818152505082856020019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250508185604001907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191690817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681525050849050949350505050565b610c798260038351610e90565b610c8c818361101590919063ffffffff16565b505050565b60003084604051602001610ca6929190611d78565b604051602081830303815290604052805190602001209050846005600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550807fb5e6e01e79f91267dc17b4e6314d5d4d03593d2ceee0fbb452b750bd70ea5af960405160405180910390a2600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634000aea08685856040518463ffffffff1660e01b8152600401610d9c93929190611da4565b6020604051808303816000875af1158015610dbb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ddf91906119b3565b610e1e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e1590611e54565b60405180910390fd5b949350505050565b610e2e6112f9565b6000602083610e3d9190611e74565b14610e6957602082610e4f9190611e74565b6020610e5b9190611ea5565b82610e669190611ab8565b91505b81836020018181525050604051808452600081528281016020016040525082905092915050565b60178167ffffffffffffffff1611610ec757610ec18160058460ff16901b60ff16178461103790919063ffffffff16565b50611010565b60ff8167ffffffffffffffff1611610f1d57610ef6601860058460ff16901b178461103790919063ffffffff16565b50610f178167ffffffffffffffff166001856110579092919063ffffffff16565b5061100f565b61ffff8167ffffffffffffffff1611610f7457610f4d601960058460ff16901b178461103790919063ffffffff16565b50610f6e8167ffffffffffffffff166002856110579092919063ffffffff16565b5061100e565b63ffffffff8167ffffffffffffffff1611610fcd57610fa6601a60058460ff16901b178461103790919063ffffffff16565b50610fc78167ffffffffffffffff166004856110579092919063ffffffff16565b5061100d565b610fea601b60058460ff16901b178461103790919063ffffffff16565b5061100b8167ffffffffffffffff166008856110579092919063ffffffff16565b505b5b5b5b505050565b61101d6112f9565b61102f83846000015151848551611079565b905092915050565b61103f6112f9565b61104f8384600001515184611168565b905092915050565b61105f6112f9565b6110708485600001515185856111be565b90509392505050565b6110816112f9565b825182111561108f57600080fd5b846020015182856110a09190611ab8565b11156110d5576110d48560026110c5886020015188876110c09190611ab8565b61124c565b6110cf9190611ed9565b611268565b5b6000808651805187602083010193508088870111156110f45787860182525b60208701925050505b6020841061113b57805182526020826111169190611ab8565b91506020816111259190611ab8565b90506020846111349190611ea5565b93506110fd565b60006001856020036101000a03905080198251168184511681811785525050508692505050949350505050565b6111706112f9565b836020015183106111965761119584600286602001516111909190611ed9565b611268565b5b835180516020858301018481538186036111b1576001820183525b5050508390509392505050565b6111c66112f9565b846020015184836111d79190611ab8565b11156111ff576111fe85600286856111ef9190611ab8565b6111f99190611ed9565b611268565b5b6000600183610100611211919061204e565b61121b9190611ea5565b9050855183868201018583198251161781528151858801111561123e5784870182525b505085915050949350505050565b60008183111561125e57829050611262565b8190505b92915050565b60008260000151905061127b8383610e26565b506112868382611015565b50505050565b6040518060a0016040528060008019168152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168152602001600081526020016112f36112f9565b81525090565b604051806040016040528060608152602001600081525090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061135282611327565b9050919050565b61136281611347565b811461136d57600080fd5b50565b60008135905061137f81611359565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6113d88261138f565b810181811067ffffffffffffffff821117156113f7576113f66113a0565b5b80604052505050565b600061140a611313565b905061141682826113cf565b919050565b600067ffffffffffffffff821115611436576114356113a0565b5b61143f8261138f565b9050602081019050919050565b82818337600083830152505050565b600061146e6114698461141b565b611400565b90508281526020810184848401111561148a5761148961138a565b5b61149584828561144c565b509392505050565b600082601f8301126114b2576114b1611385565b5b81356114c284826020860161145b565b91505092915050565b600080600080608085870312156114e5576114e461131d565b5b60006114f387828801611370565b945050602085013567ffffffffffffffff81111561151457611513611322565b5b6115208782880161149d565b935050604085013567ffffffffffffffff81111561154157611540611322565b5b61154d8782880161149d565b925050606085013567ffffffffffffffff81111561156e5761156d611322565b5b61157a8782880161149d565b91505092959194509250565b61158f81611347565b82525050565b60006020820190506115aa6000830184611586565b92915050565b6000819050919050565b6115c3816115b0565b82525050565b60006020820190506115de60008301846115ba565b92915050565b6000819050919050565b6115f7816115e4565b811461160257600080fd5b50565b600081359050611614816115ee565b92915050565b611623816115b0565b811461162e57600080fd5b50565b6000813590506116408161161a565b92915050565b6000806040838503121561165d5761165c61131d565b5b600061166b85828601611605565b925050602061167c85828601611631565b9150509250929050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6116bb81611686565b81146116c657600080fd5b50565b6000813590506116d8816116b2565b92915050565b600080600080608085870312156116f8576116f761131d565b5b600061170687828801611605565b945050602061171787828801611631565b9350506040611728878288016116c9565b925050606061173987828801611631565b91505092959194509250565b60006020828403121561175b5761175a61131d565b5b600061176984828501611370565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006117db826115b0565b91506117e6836115b0565b9250826117f6576117f5611772565b5b828204905092915050565b600082825260208201905092915050565b7f536f75726365206d75737420626520746865206f7261636c65206f662074686560008201527f2072657175657374000000000000000000000000000000000000000000000000602082015250565b600061186e602883611801565b915061187982611812565b604082019050919050565b6000602082019050818103600083015261189d81611861565b9050919050565b7f4d7573742062652070726f706f736564206f776e657200000000000000000000600082015250565b60006118da601683611801565b91506118e5826118a4565b602082019050919050565b60006020820190508181036000830152611909816118cd565b9050919050565b60008151905061191f8161161a565b92915050565b60006020828403121561193b5761193a61131d565b5b600061194984828501611910565b91505092915050565b60006040820190506119676000830185611586565b61197460208301846115ba565b9392505050565b60008115159050919050565b6119908161197b565b811461199b57600080fd5b50565b6000815190506119ad81611987565b92915050565b6000602082840312156119c9576119c861131d565b5b60006119d78482850161199e565b91505092915050565b7f556e61626c6520746f207472616e736665720000000000000000000000000000600082015250565b6000611a16601283611801565b9150611a21826119e0565b602082019050919050565b60006020820190508181036000830152611a4581611a09565b9050919050565b7f4f6e6c792063616c6c61626c65206279206f776e657200000000000000000000600082015250565b6000611a82601683611801565b9150611a8d82611a4c565b602082019050919050565b60006020820190508181036000830152611ab181611a75565b9050919050565b6000611ac3826115b0565b9150611ace836115b0565b9250828201905080821115611ae657611ae56117a1565b5b92915050565b611af5816115e4565b82525050565b611b0481611686565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611b44578082015181840152602081019050611b29565b60008484015250505050565b6000611b5b82611b0a565b611b658185611b15565b9350611b75818560208601611b26565b611b7e8161138f565b840191505092915050565b600061010082019050611b9f600083018b611586565b611bac602083018a6115ba565b611bb96040830189611aec565b611bc66060830188611586565b611bd36080830187611afb565b611be060a08301866115ba565b611bed60c08301856115ba565b81810360e0830152611bff8184611b50565b90509998505050505050505050565b6000608082019050611c236000830187611aec565b611c3060208301866115ba565b611c3d6040830185611afb565b611c4a60608301846115ba565b95945050505050565b7f43616e6e6f74207472616e7366657220746f2073656c66000000000000000000600082015250565b6000611c89601783611801565b9150611c9482611c53565b602082019050919050565b60006020820190508181036000830152611cb881611c7c565b9050919050565b6000819050919050565b6000611ce4611cdf611cda84611327565b611cbf565b611327565b9050919050565b6000611cf682611cc9565b9050919050565b6000611d0882611ceb565b9050919050565b60008160601b9050919050565b6000611d2782611d0f565b9050919050565b6000611d3982611d1c565b9050919050565b611d51611d4c82611cfd565b611d2e565b82525050565b6000819050919050565b611d72611d6d826115b0565b611d57565b82525050565b6000611d848285611d40565b601482019150611d948284611d61565b6020820191508190509392505050565b6000606082019050611db96000830186611586565b611dc660208301856115ba565b8181036040830152611dd88184611b50565b9050949350505050565b7f756e61626c6520746f207472616e73666572416e6443616c6c20746f206f726160008201527f636c650000000000000000000000000000000000000000000000000000000000602082015250565b6000611e3e602383611801565b9150611e4982611de2565b604082019050919050565b60006020820190508181036000830152611e6d81611e31565b9050919050565b6000611e7f826115b0565b9150611e8a836115b0565b925082611e9a57611e99611772565b5b828206905092915050565b6000611eb0826115b0565b9150611ebb836115b0565b9250828203905081811115611ed357611ed26117a1565b5b92915050565b6000611ee4826115b0565b9150611eef836115b0565b9250828202611efd816115b0565b91508282048414831517611f1457611f136117a1565b5b5092915050565b60008160011c9050919050565b6000808291508390505b6001851115611f7257808604811115611f4e57611f4d6117a1565b5b6001851615611f5d5780820291505b8081029050611f6b85611f1b565b9450611f32565b94509492505050565b600082611f8b5760019050612047565b81611f995760009050612047565b8160018114611faf5760028114611fb957611fe8565b6001915050612047565b60ff841115611fcb57611fca6117a1565b5b8360020a915084821115611fe257611fe16117a1565b5b50612047565b5060208310610133831016604e8410600b841016171561201d5782820a905083811115612018576120176117a1565b5b612047565b61202a8484846001611f28565b92509050818404811115612041576120406117a1565b5b81810290505b9392505050565b6000612059826115b0565b9150612064836115b0565b92506120917fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8484611f7b565b90509291505056fea264697066735822122069058e853a6f495923e2b38ae073d1d17cb3031484867ec48ab4ab2ab442325964736f6c63430008130033";

type ConsumerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ConsumerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Consumer__factory extends ContractFactory {
  constructor(...args: ConsumerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _link: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(_link, overrides || {});
  }
  override deploy(
    _link: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_link, overrides || {}) as Promise<
      Consumer & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Consumer__factory {
    return super.connect(runner) as Consumer__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ConsumerInterface {
    return new Interface(_abi) as ConsumerInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Consumer {
    return new Contract(address, _abi, runner) as unknown as Consumer;
  }
}
