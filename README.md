# Projektin rakenteen kuvaus

Kyseessä on Express.js-sovellus, joka on rakennettu MVC-arkkitehtuurilla. Tietokantana toimii MySQL, mallipohjat (templates) on toteutettu EJS:llä, ja validaatiosta huolehtii express-validator.

## Tiedostorakenne

- src/index.js-tiedostossa muun muassa yhdistetään appiin kaikki reitittimet ja otetaan käyttöön sovellustason väliohjelmistot ja asetetaan sovelluksen asetukset
- src/routers-tiedostoissa määritetään sovelluksen reitit sovelluksen eri moduuleille (esim. ruokalistat, tilaukset, käyttäjät)
- src/controllers-tiedostoissa sijaitsevat päätepisteiden logiikat omissa funktioissaan
- src/models-tiedostoissa sijaitsevat kantakyselyt
- src/views-kansiossa löytyvät mallipohjat, ja partials-alikansiosta löytyvät osittaiset mallipohjat, kuten navigaatiovalikko ja footer
- src/middlewares-tiedostoissa sijaitsevat sovelluksessa käytetyt väliohjelmistot
- src/utils-tiedostoissa sijaitsevat funktiot monimutkaisille tai yleisesti käytetyille logiikoille
- public-kansiosta löytyvät frontendissa käytetyt kuva-, css-, fontti- ja JavaScript-tiedostot

# Tietokannan kuvaus

## Taulujen väliset suhteet:

- restaurant_order \* - 1 user
- restaurant_order \* - \* product
- shopping_cart \* - 1 user
- shopping_cart \* - \* product
- product \* - \* user
- allergen \* - \* product

![database diagram](screenshots/database-diagram.png)

# Toiminnallisuuksien kuvaus

Shinkai on japanilaisen ravintolan tilaus/nouto sovellus. Tilaamista varten käyttäjän tarvitsee rekisteröityä käyttäjäksi.

## Kirjautumaton käyttäjä voi:

- Katsoa ruokalistaa

## Kirjautunut käyttäjä voi:

- Tehdä kaiken mitä kirjautumaton käyttäjäkin
- Kirjautua sisään sovellukseen
- Lisätä tuotteita ostoskoriin ruokalistalta
- Poistaa tuotteita ostoskorista
- Tilata haluamansa tuotteet/luoda tilaus
- Nähdä tilauksensa tilan omassa profiilissaan
- Nähdä käyttäjätietonsa omassa profiilissaan
- Kirjautua ulos sovelluksesta

## Admin käyttäjä voi:

- Muokata käyttäjien tilausten tilaa kannassa
