# Board API

Provides functions to manage bulletins and boards.

## Files
- `index.js`

## Functions

### `getBoardList(params)`
Fetches a list of board posts.
- **Params**:
  - `pageIndex`: Current page number.
  - `searchCondition`: Search condition.
  - `searchKeyword`: Search keyword.
  - `searchUseYn`: Usage status filter.

### `getBoardDetail(params)`
Fetches details of a board post.

### `insertBoard(data)`
Registers a new board post.

### `updateBoard(data)`
Updates an existing board post.

### `deleteBoard(data)`
Deletes a board post.
