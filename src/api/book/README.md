# Book API

Provides functions to manage books/textbooks.

## Files
- `index.js`

## Functions

### `fetchBookList(params)`
Fetches a list of books.
- **Params**:
  - `pageIndex`: Current page number.
  - `searchCondition`: Search condition.
  - `searchKeyword`: Search keyword.
  - `searchUseYn`: Usage status filter.

### `fetchBookView(params)`
Fetches book details.

### `fetchBookWriteData()`
Fetches basic data required for registering a book.

### `saveBook(bookData)`
Registers a new book.

### `updateBook(bookData)`
Updates an existing book.

### `deleteBook(params)`
Deletes a book.

### `deleteBookAll(params)`
Deletes all related books.

### `fetchBookSellList(params)`
Fetches the book sales list.

### `fetchBookSellListExcel(params)`
Fetches the book sales list for Excel download.
