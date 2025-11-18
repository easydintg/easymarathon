#!/bin/bash

echo "🔍 Проверка файлов для деплоя на Vercel..."
echo ""

# Проверка package.json
if [ -f "package.json" ]; then
    echo "✅ package.json существует"
    
    # Проверка на JSR зависимость
    if grep -q "@jsr/supabase" package.json; then
        echo "❌ ОШИБКА: package.json содержит @jsr/supabase"
        echo "   Нужно заменить на @supabase/supabase-js"
        exit 1
    else
        echo "✅ package.json НЕ содержит @jsr/ (отлично!)"
    fi
    
    # Проверка что есть правильная зависимость
    if grep -q "@supabase/supabase-js" package.json; then
        echo "✅ package.json содержит @supabase/supabase-js (правильно!)"
    else
        echo "⚠️  package.json НЕ содержит @supabase/supabase-js"
    fi
else
    echo "❌ ОШИБКА: package.json не найден!"
    exit 1
fi

echo ""

# Проверка других файлов
files=(
    "vite.config.ts"
    "tsconfig.json"
    "index.html"
    "main.tsx"
    "App.tsx"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file существует"
    else
        echo "❌ $file НЕ НАЙДЕН!"
    fi
done

echo ""

# Проверка .gitignore
if [ -f ".gitignore" ]; then
    if grep -q "package.json" .gitignore; then
        echo "⚠️  ВНИМАНИЕ: .gitignore игнорирует package.json!"
        echo "   Удали эту строку из .gitignore"
    else
        echo "✅ .gitignore НЕ игнорирует package.json (отлично!)"
    fi
else
    echo "⚠️  .gitignore не найден"
fi

echo ""
echo "🎯 Проверка завершена!"
echo ""
echo "Если всё ✅ - можно делать git push:"
echo "  git add ."
echo "  git commit -m 'Fix: package.json для Vercel'"
echo "  git push origin main"
