/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface ConsumerInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "acceptOwnership"
      | "currentAccountBalance"
      | "owner"
      | "transferOwnership"
      | "requestKusamaAccountBalance"
      | "fulfillKusamaAccountBalance"
      | "getChainlinkToken"
      | "withdrawLink"
      | "cancelRequest"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "ChainlinkCancelled"
      | "ChainlinkFulfilled"
      | "ChainlinkRequested"
      | "OwnershipTransferRequested"
      | "OwnershipTransferred"
      | "RequestKusamaAccountBalanceFulfilled"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "acceptOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "currentAccountBalance",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "requestKusamaAccountBalance",
    values: [AddressLike, string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "fulfillKusamaAccountBalance",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getChainlinkToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawLink",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "cancelRequest",
    values: [BytesLike, BigNumberish, BytesLike, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "acceptOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currentAccountBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requestKusamaAccountBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "fulfillKusamaAccountBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getChainlinkToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawLink",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "cancelRequest",
    data: BytesLike
  ): Result;
}

export namespace ChainlinkCancelledEvent {
  export type InputTuple = [id: BytesLike];
  export type OutputTuple = [id: string];
  export interface OutputObject {
    id: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ChainlinkFulfilledEvent {
  export type InputTuple = [id: BytesLike];
  export type OutputTuple = [id: string];
  export interface OutputObject {
    id: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ChainlinkRequestedEvent {
  export type InputTuple = [id: BytesLike];
  export type OutputTuple = [id: string];
  export interface OutputObject {
    id: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferRequestedEvent {
  export type InputTuple = [from: AddressLike, to: AddressLike];
  export type OutputTuple = [from: string, to: string];
  export interface OutputObject {
    from: string;
    to: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [from: AddressLike, to: AddressLike];
  export type OutputTuple = [from: string, to: string];
  export interface OutputObject {
    from: string;
    to: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RequestKusamaAccountBalanceFulfilledEvent {
  export type InputTuple = [requestId: BytesLike, freePlank: BigNumberish];
  export type OutputTuple = [requestId: string, freePlank: bigint];
  export interface OutputObject {
    requestId: string;
    freePlank: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Consumer extends BaseContract {
  connect(runner?: ContractRunner | null): BaseContract;
  attach(addressOrName: AddressLike): this;
  deployed(): Promise<this>;

  interface: ConsumerInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  /**
   * Allows an ownership transfer to be completed by the recipient.
   */
  acceptOwnership: TypedContractMethod<[], [void], "nonpayable">;

  currentAccountBalance: TypedContractMethod<[], [bigint], "view">;

  /**
   * Get the current owner
   */
  owner: TypedContractMethod<[], [string], "view">;

  /**
   * Allows an owner to begin transferring ownership to a new address, pending.
   */
  transferOwnership: TypedContractMethod<
    [to: AddressLike],
    [void],
    "nonpayable"
  >;

  requestKusamaAccountBalance: TypedContractMethod<
    [
      _oracle: AddressLike,
      _jobId: string,
      kusamaAddress: string,
      kusamaBlockHash: string
    ],
    [void],
    "nonpayable"
  >;

  fulfillKusamaAccountBalance: TypedContractMethod<
    [requestId: BytesLike, freePlank: BigNumberish],
    [void],
    "nonpayable"
  >;

  getChainlinkToken: TypedContractMethod<[], [string], "view">;

  withdrawLink: TypedContractMethod<[], [void], "nonpayable">;

  cancelRequest: TypedContractMethod<
    [
      _requestId: BytesLike,
      _payment: BigNumberish,
      _callbackFunctionId: BytesLike,
      _expiration: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "acceptOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "currentAccountBalance"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[to: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "requestKusamaAccountBalance"
  ): TypedContractMethod<
    [
      _oracle: AddressLike,
      _jobId: string,
      kusamaAddress: string,
      kusamaBlockHash: string
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "fulfillKusamaAccountBalance"
  ): TypedContractMethod<
    [requestId: BytesLike, freePlank: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getChainlinkToken"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "withdrawLink"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "cancelRequest"
  ): TypedContractMethod<
    [
      _requestId: BytesLike,
      _payment: BigNumberish,
      _callbackFunctionId: BytesLike,
      _expiration: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "ChainlinkCancelled"
  ): TypedContractEvent<
    ChainlinkCancelledEvent.InputTuple,
    ChainlinkCancelledEvent.OutputTuple,
    ChainlinkCancelledEvent.OutputObject
  >;
  getEvent(
    key: "ChainlinkFulfilled"
  ): TypedContractEvent<
    ChainlinkFulfilledEvent.InputTuple,
    ChainlinkFulfilledEvent.OutputTuple,
    ChainlinkFulfilledEvent.OutputObject
  >;
  getEvent(
    key: "ChainlinkRequested"
  ): TypedContractEvent<
    ChainlinkRequestedEvent.InputTuple,
    ChainlinkRequestedEvent.OutputTuple,
    ChainlinkRequestedEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferRequested"
  ): TypedContractEvent<
    OwnershipTransferRequestedEvent.InputTuple,
    OwnershipTransferRequestedEvent.OutputTuple,
    OwnershipTransferRequestedEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "RequestKusamaAccountBalanceFulfilled"
  ): TypedContractEvent<
    RequestKusamaAccountBalanceFulfilledEvent.InputTuple,
    RequestKusamaAccountBalanceFulfilledEvent.OutputTuple,
    RequestKusamaAccountBalanceFulfilledEvent.OutputObject
  >;

  filters: {
    "ChainlinkCancelled(bytes32)": TypedContractEvent<
      ChainlinkCancelledEvent.InputTuple,
      ChainlinkCancelledEvent.OutputTuple,
      ChainlinkCancelledEvent.OutputObject
    >;
    ChainlinkCancelled: TypedContractEvent<
      ChainlinkCancelledEvent.InputTuple,
      ChainlinkCancelledEvent.OutputTuple,
      ChainlinkCancelledEvent.OutputObject
    >;

    "ChainlinkFulfilled(bytes32)": TypedContractEvent<
      ChainlinkFulfilledEvent.InputTuple,
      ChainlinkFulfilledEvent.OutputTuple,
      ChainlinkFulfilledEvent.OutputObject
    >;
    ChainlinkFulfilled: TypedContractEvent<
      ChainlinkFulfilledEvent.InputTuple,
      ChainlinkFulfilledEvent.OutputTuple,
      ChainlinkFulfilledEvent.OutputObject
    >;

    "ChainlinkRequested(bytes32)": TypedContractEvent<
      ChainlinkRequestedEvent.InputTuple,
      ChainlinkRequestedEvent.OutputTuple,
      ChainlinkRequestedEvent.OutputObject
    >;
    ChainlinkRequested: TypedContractEvent<
      ChainlinkRequestedEvent.InputTuple,
      ChainlinkRequestedEvent.OutputTuple,
      ChainlinkRequestedEvent.OutputObject
    >;

    "OwnershipTransferRequested(address,address)": TypedContractEvent<
      OwnershipTransferRequestedEvent.InputTuple,
      OwnershipTransferRequestedEvent.OutputTuple,
      OwnershipTransferRequestedEvent.OutputObject
    >;
    OwnershipTransferRequested: TypedContractEvent<
      OwnershipTransferRequestedEvent.InputTuple,
      OwnershipTransferRequestedEvent.OutputTuple,
      OwnershipTransferRequestedEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "RequestKusamaAccountBalanceFulfilled(bytes32,uint256)": TypedContractEvent<
      RequestKusamaAccountBalanceFulfilledEvent.InputTuple,
      RequestKusamaAccountBalanceFulfilledEvent.OutputTuple,
      RequestKusamaAccountBalanceFulfilledEvent.OutputObject
    >;
    RequestKusamaAccountBalanceFulfilled: TypedContractEvent<
      RequestKusamaAccountBalanceFulfilledEvent.InputTuple,
      RequestKusamaAccountBalanceFulfilledEvent.OutputTuple,
      RequestKusamaAccountBalanceFulfilledEvent.OutputObject
    >;
  };
}
