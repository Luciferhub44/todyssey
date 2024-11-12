# Dokumentacja Projektu Tribe Odyssey

Projekt **Tribe Odyssey** jest rozbudowaną aplikacją webową opartą na Node.js, wykorzystującą nowoczesne technologie frontendowe i backendowe. Celem projektu jest dostarczenie interaktywnej aplikacji integrującej się z różnymi API oraz oferującej zaawansowane funkcje backendowe.

## Spis Treści
- [Dokumentacja Projektu Tribe Odyssey](#dokumentacja-projektu-tribe-odyssey)
  - [Spis Treści](#spis-treści)
  - [Wprowadzenie](#wprowadzenie)
  - [Technologie](#technologie)
  - [Instalacja](#instalacja)
  - [Konfiguracja](#konfiguracja)
    - [ESLint](#eslint)
  - [Uruchomienie](#uruchomienie)
  - [Struktura Projektu](#struktura-projektu)
  - [Użycie](#użycie)
  - [Testowanie](#testowanie)
  - [Deployment](#deployment)
  - [Aktualizacje](#aktualizacje)
  - [Wkład](#wkład)

## Wprowadzenie
Projekt Tribe Odyssey ma na celu stworzenie kompleksowej aplikacji webowej, która integruje się z różnorodnymi technologiami i środowiskami. Aplikacja oferuje interaktywne elementy, integracje z zewnętrznymi API oraz zaawansowane rozwiązania backendowe, zapewniając skalowalność i wydajność.

## Technologie
Projekt wykorzystuje następujące technologie:
- **Node.js** – środowisko uruchomieniowe JavaScript.
- **TypeScript** – nadzbiór JavaScript z typowaniem statycznym.
- **React** – biblioteka JavaScript do budowania interfejsów użytkownika.
- **Vite** – narzędzie do budowania aplikacji frontendowych, zapewniające szybki development.
- **ESLint** – narzędzie do analizy statycznej kodu w celu identyfikacji problemów.
- **Axios** – biblioteka HTTP do komunikacji z API.
- **React Query** – zarządzanie stanem danych w aplikacji.

## Instalacja
Aby zainstalować zależności projektu, wykonaj następujące polecenie w katalogu głównym projektu:

```bash
npm install
```

To polecenie zainstaluje wszystkie niezbędne pakiety wymienione w pliku `package.json`.

## Konfiguracja
Konfiguracja projektu obejmuje ustawienia specyficzne dla środowiska, przechowywane w plikach konfiguracyjnych, takich jak `.env`. Upewnij się, że zmienne środowiskowe, takie jak `VITE_API_URL`, są poprawnie ustawione.

### ESLint
Projekt wykorzystuje ESLint z konfiguracją TypeScript i React. Plik `eslint.config.js` zawiera specyficzne reguły i pluginy, zapewniające spójność i jakość kodu.

## Uruchomienie
Aby uruchomić projekt w trybie deweloperskim, użyj:

```bash
npm start
```

Polecenie to uruchamia główny plik serwera skonfigurowany w sekcji `scripts` pliku `package.json`.

## Struktura Projektu
Projekt posiada następującą strukturę katalogów:

- `/node_modules` – zależności projektu.
- `/src` – kod źródłowy aplikacji, w tym komponenty frontendowe i logika backendowa.
- `/tests` – testy jednostkowe sprawdzające poprawność logiki biznesowej.
- `.api` – konfiguracje API oraz definicje OpenAPI.

## Użycie
Aplikacja oferuje szereg endpointów API, które obsługują różne funkcje biznesowe. Dokumentacja API zawiera szczegółowe informacje na temat dostępnych zapytań i odpowiedzi. Przykładowe użycie Axios do komunikacji z API znajduje się w `src/hooks/useAxios.ts`.

## Testowanie
Testy jednostkowe są wykonywane za pomocą narzędzi takich jak Jest. Aby uruchomić testy, użyj:

```bash
npm test
```

Testy te automatycznie weryfikują funkcjonalność poszczególnych modułów, zapewniając stabilność aplikacji.

## Deployment
```markdown
## Deployment

### Plan DevOps

Aby wdrożyć aplikację **Tribe Odyssey** na środowisku produkcyjnym, wykonaj poniższe kroki:

1. **Konfiguracja Render.com**
    - Załóż konto na [Render.com](https://render.com) i utwórz nowy projekt.
    - Wybierz typ usługi odpowiedni dla aplikacji Node.js (np. Web Service).
    - Skonfiguruj zmienne środowiskowe w panelu Render, takie jak `VITE_API_URL` oraz inne wymagane przez aplikację.

2. **Ustawienie GitHub Actions**
    - Utwórz plik workflow w `.github/workflows/deploy.yml` z następującą zawartością:

      ```yaml
      name: Deploy to Render

      on:
         push:
            branches:
              - master

      jobs:
         deploy:
            runs-on: ubuntu-latest
            steps:
              - uses: actions/checkout@v2
              - name: Set up Node.js
                 uses: actions/setup-node@v2
                 with:
                    node-version: '18'
              - name: Install dependencies
                 run: npm install
              - name: Build
                 run: npm run build
              - name: Deploy to Render
                 env:
                    RENDER_API_KEY: ${{ secrets.RENDER_API_KEY }}
                 run: |
                    curl -X POST \
                      -H "Authorization: Bearer $RENDER_API_KEY" \
                      -H "Content-Type: application/json" \
                      https://api.render.com/v1/services/YOUR_SERVICE_ID/deploys
      ```

    - Zastąp `YOUR_SERVICE_ID` identyfikatorem usługi Render, który znajdziesz w panelu Render.
    - Dodaj sekrety `RENDER_API_KEY` do ustawień repozytorium na GitHub z kluczem API Render.

3. **Automatyczne Testowanie**
    - Upewnij się, że przed wdrożeniem aplikacja przechodzi wszystkie testy jednostkowe. Możesz dodać kroki uruchamiania testów w pliku workflow przed krokiem `Deploy to Render`:

      ```yaml
      - name: Run Tests
         run: npm test
      ```

4. **Monitoring i Logowanie**
    - Skonfiguruj monitoring aplikacji za pomocą narzędzi takich jak [LogRocket](https://logrocket.com/) lub [Sentry](https://sentry.io/) dla śledzenia błędów i wydajności.

5. **Skalowanie**
    - W zależności od obciążenia aplikacji, skonfiguruj automatyczne skalowanie w Render.com, aby zapewnić płynne działanie usługi.

6. **Bezpieczeństwo**
    - Upewnij się, że wszystkie zmienne środowiskowe są bezpiecznie przechowywane i dostępne tylko dla uprawnionych usług.
    - Regularnie aktualizuj zależności projektu, aby zapobiegać lukom bezpieczeństwa.

### Instrukcje Dodatkowe

- **Przeglądanie Logów**: Możesz przeglądać logi aplikacji bezpośrednio w panelu Render.com, co ułatwia debugowanie i monitorowanie aplikacji.
- **Rollback**: W przypadku problemów z nową wersją, Render.com umożliwia łatwe przywrócenie poprzedniej wersji aplikacji.
```


## Aktualizacje
Regularne aktualizacje zależności oraz konfigurowanie ESLint zapewniają zgodność z najnowszymi standardami i zwiększają bezpieczeństwo aplikacji. Szczegółowe informacje na temat aktualizacji znajdują się w plikach `npm-check-results.txt` oraz `depcheck-results.txt`.

## Wkład
Wkład w projekt jest mile widziany. Prosimy o zgłaszanie problemów oraz propozycji ulepszeń poprzez system pull requestów na platformie GitHub.
