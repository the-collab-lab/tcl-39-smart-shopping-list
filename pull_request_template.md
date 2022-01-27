## Description

An error message is displayed if the user tries to add a repeated item, disregarding special or uppercase characters.

## Related Issue

Closes [#6](https://github.com/the-collab-lab/tcl-39-smart-shopping-list/issues/6)._ 

## Acceptance Criteria

* Mostrar un mensaje de error si el usuario intenta enviar un nuevo elemento que tiene exactamente el mismo nombre que un elemento existente.
* Mostrar un mensaje de error si el usuario intenta enviar un nuevo elemento que tiene el mismo nombre que un elemento existente, en el que se han normalizado las mayúsculas y se han eliminado los signos de puntuación.
* La entrada original del usuario debe ser la que se guarde en la base de datos

## Type of Changes

|     | Type                       |
| --- | -------------------------- |
|    | :bug: Bug fix              |
|  ✓ | :sparkles: New feature     |
|  ✓ | :hammer: Refactoring       |
|    | :100: Add tests            |
|    | :link: Update dependencies |
|    | :scroll: Docs              |

## Updates

### Before

![Screenshot_7](https://user-images.githubusercontent.com/75139726/151448523-da5aa6bb-16c4-4c84-8deb-3d90cea4b8b0.png)
![Screenshot_6](https://user-images.githubusercontent.com/75139726/151448577-25c69490-c991-4cff-bb51-bb56930c23a0.png)

### After

![Screenshot_6](https://user-images.githubusercontent.com/75139726/151448632-c0dcb428-a1b7-4fc4-bda2-3eb88bc2a10f.png)
![Screenshot_8](https://user-images.githubusercontent.com/75139726/151448722-29bdfd3d-d231-415a-ab61-196134402fc1.png)

## Testing Steps / QA Criteria

* git pull feature6/di-er-avoid-duplicated-products
* npm run start
* got to url /add-items
* type a word with special characters by example: Pimentón
* When typing the word, the application normalizes the special characters and punctuation marks since this word exists in the database, the modal is activated with the message that the product is duplicated.

