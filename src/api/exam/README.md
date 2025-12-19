# Exam API

Provides functions to manage exams (Gosi, Mock Test).

## Files
- `gosi.js`: Functions related to Sample Gosi exams.
- `moui.js`: Functions related to Mock Tests (Moui).

## Functions

### Gosi (`gosi.js`)
#### `getSampleUserList(params)`
Fetches a list of sample users/exams.
- **Params**:
  - `pageIndex`: Current page number.
  - `searchCondition`: Search condition.
  - `searchKeyword`: Search keyword.

### Moui (`moui.js`)
#### `getMouiExamList(params)`
Fetches a list of mock exams.
- **Params**:
  - `pageIndex`: Current page number.
  - `searchCondition`: Search condition.
  - `searchKeyword`: Search keyword.
