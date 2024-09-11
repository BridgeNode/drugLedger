import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  IssueClosed,
  IssueOpened,
  Log,
  ManufacturerRevoked,
  RegisteredManufacturer
} from "../generated/DrugLedger/DrugLedger"

export function createIssueClosedEvent(
  drugId: BigInt,
  issueId: BigInt,
  reason: string
): IssueClosed {
  let issueClosedEvent = changetype<IssueClosed>(newMockEvent())

  issueClosedEvent.parameters = new Array()

  issueClosedEvent.parameters.push(
    new ethereum.EventParam("drugId", ethereum.Value.fromUnsignedBigInt(drugId))
  )
  issueClosedEvent.parameters.push(
    new ethereum.EventParam(
      "issueId",
      ethereum.Value.fromUnsignedBigInt(issueId)
    )
  )
  issueClosedEvent.parameters.push(
    new ethereum.EventParam("reason", ethereum.Value.fromString(reason))
  )

  return issueClosedEvent
}

export function createIssueOpenedEvent(
  drugId: BigInt,
  issueId: BigInt,
  name: string,
  description: string
): IssueOpened {
  let issueOpenedEvent = changetype<IssueOpened>(newMockEvent())

  issueOpenedEvent.parameters = new Array()

  issueOpenedEvent.parameters.push(
    new ethereum.EventParam("drugId", ethereum.Value.fromUnsignedBigInt(drugId))
  )
  issueOpenedEvent.parameters.push(
    new ethereum.EventParam(
      "issueId",
      ethereum.Value.fromUnsignedBigInt(issueId)
    )
  )
  issueOpenedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  issueOpenedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )

  return issueOpenedEvent
}

export function createLogEvent(
  drugId: BigInt,
  entity: string,
  action: string,
  from: Address
): Log {
  let logEvent = changetype<Log>(newMockEvent())

  logEvent.parameters = new Array()

  logEvent.parameters.push(
    new ethereum.EventParam("drugId", ethereum.Value.fromUnsignedBigInt(drugId))
  )
  logEvent.parameters.push(
    new ethereum.EventParam("entity", ethereum.Value.fromString(entity))
  )
  logEvent.parameters.push(
    new ethereum.EventParam("action", ethereum.Value.fromString(action))
  )
  logEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )

  return logEvent
}

export function createManufacturerRevokedEvent(
  name: string,
  license: string
): ManufacturerRevoked {
  let manufacturerRevokedEvent = changetype<ManufacturerRevoked>(newMockEvent())

  manufacturerRevokedEvent.parameters = new Array()

  manufacturerRevokedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  manufacturerRevokedEvent.parameters.push(
    new ethereum.EventParam("license", ethereum.Value.fromString(license))
  )

  return manufacturerRevokedEvent
}

export function createRegisteredManufacturerEvent(
  name: string
): RegisteredManufacturer {
  let registeredManufacturerEvent = changetype<RegisteredManufacturer>(
    newMockEvent()
  )

  registeredManufacturerEvent.parameters = new Array()

  registeredManufacturerEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )

  return registeredManufacturerEvent
}
