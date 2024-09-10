import {
  IssueClosed as IssueClosedEvent,
  IssueOpened as IssueOpenedEvent,
  Log as LogEvent,
  ManufacturerRevoked as ManufacturerRevokedEvent,
  RegisteredManufacturer as RegisteredManufacturerEvent
} from "../generated/DrugLedger/DrugLedger"
import {
  IssueClosed,
  IssueOpened,
  Log,
  ManufacturerRevoked,
  RegisteredManufacturer
} from "../generated/schema"

export function handleIssueClosed(event: IssueClosedEvent): void {
  let entity = new IssueClosed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.drugId = event.params.drugId
  entity.issueId = event.params.issueId
  entity.reason = event.params.reason

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleIssueOpened(event: IssueOpenedEvent): void {
  let entity = new IssueOpened(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.drugId = event.params.drugId
  entity.issueId = event.params.issueId
  entity.name = event.params.name
  entity.description = event.params.description

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLog(event: LogEvent): void {
  let entity = new Log(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.drugId = event.params.drugId
  entity.entity = event.params.entity
  entity.action = event.params.action
  entity.from = event.params.from

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleManufacturerRevoked(
  event: ManufacturerRevokedEvent
): void {
  let entity = new ManufacturerRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.name = event.params.name.toString()
  entity.license = event.params.license.toString()

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRegisteredManufacturer(
  event: RegisteredManufacturerEvent
): void {
  let entity = new RegisteredManufacturer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.name = event.params.name.toString()

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
