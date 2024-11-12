#!/bin/bash
# analyze-deps.sh

echo "🔍 Rozpoczynam analizę zależności..."

# Wyłączenie ostrzeżeń
export NODE_NO_WARNINGS=1

# Analiza nieużywanych zależności
echo "📦 Sprawdzam nieużywane pakiety..."
depcheck > depcheck-results.txt

# Sprawdzenie aktualizacji
echo "🔄 Sprawdzam dostępne aktualizacje..."
ncu > updates-available.txt

# Analiza problemów npm
echo "⚠️ Sprawdzam problemy npm..."
npm audit > npm-audit.txt

echo "✅ Zakończono analizę. Sprawdź pliki *-results.txt"