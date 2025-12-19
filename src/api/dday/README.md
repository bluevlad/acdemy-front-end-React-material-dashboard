# D-Day API

Provides functions to manage D-Day items.

## Files
- `index.js`

## Functions

### `fetchDdayList(params)`
Fetches a list of D-Day items.
- **Params**:
  - `pageIndex`: Current page number.
  - `pageUnit`: Items per page.
  - `searchCondition`: Search condition.
  - `searchKeyword`: Search keyword.
  - `searchDdayName`: D-Day name filter.
  - `searchCategory`: Category filter.

### `fetchDdayView(params)`
Fetches D-Day details.

### `insertDday(data)`
Registers a new D-Day item.

### `updateDday(data)`
Updates an existing D-Day item.

### `deleteDday(data)`
Deletes a D-Day item.

### `fetchDdayCategoryList()`
Fetches the D-Day category list.
