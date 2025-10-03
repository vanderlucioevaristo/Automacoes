# Script para corrigir o PATH do Node.js temporariamente
$env:PATH = "C:\Program Files\nodejs\;" + $env:PATH
Write-Host "PATH atualizado para incluir Node.js"
Write-Host "Agora você pode usar 'npm test' normalmente"