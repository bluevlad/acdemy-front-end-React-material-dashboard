# Event API

Provides functions to manage events.

## Files
- `index.js`

## Functions

### `getEventList(params)`
Fetches a list of events.
- **Params**:
  - `pageIndex`: Current page number (standardized).
  - `searchCondition`: Search condition (standardized).
  - `searchKeyword`: Search keyword (standardized).
  - `searchUseYn`: Usage status filter (standardized).
  - `searchEventTitle`: Event title filter.

### `getEventDetail(params)`
Fetches event details.

### `insertEvent(data)`
Creates a new event.

### `updateEvent(data)`
Updates an existing event.

### `deleteEvent(data)`
Deletes an event.
