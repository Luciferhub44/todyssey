#!/bin/bash

# Kolory dla lepszej czytelności
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}1. Tworzenie kopii zapasowej${NC}"
cp package.json package.json.backup
cp package-lock.json package-lock.json.backup

echo -e "${YELLOW}2. Aktualizacja zależności według kategorii${NC}"

# Aktualizacja UI komponentów
npm install @mui/material@6 @mui/icons-material@6 @emotion/react@11 @emotion/styled@11

# Aktualizacja React i powiązanych
npm install react@18.3 react-dom@18.3 react-router-dom@6.28

# Aktualizacja Web3
npm install @rainbow-me/rainbowkit@2.2 viem@2.21 wagmi@2.12

# Aktualizacja TypeScript i narzędzi
npm install -D typescript@5.6 @types/node@22 @types/react@18.3 @types/react-dom@18.3

# Aktualizacja ESLint
npm install -D eslint@9 @typescript-eslint/eslint-plugin@8 @typescript-eslint/parser@8

# Aktualizacja build tools
npm install -D vite@5.4 @vitejs/plugin-react@4.3 postcss@8.4.48

echo -e "${GREEN}3. Sprawdzanie poprawności${NC}"
npm run build

echo -e "${YELLOW}4. Tworzenie raportu${NC}"
npm ls --depth=0 > deps-report.txt