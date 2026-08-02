# AGENTS.md — Jardín Encantado de Luna

## Objetivo
Este repositorio contiene una experiencia web romántica de cumpleaños para Luna. Debe funcionar como sitio estático en GitHub Pages, sin proceso de build.

## Reglas obligatorias
- Mantener todo el contenido visible en español.
- No eliminar la música `assets/music/up.mp3` ni cambiar su ruta.
- No introducir frameworks, Node.js, bundlers o dependencias obligatorias.
- Mantener compatibilidad con Chrome, Edge, Firefox y Safari móvil.
- Mantener navegación accesible por teclado y controles con `aria-label`.
- Respetar `prefers-reduced-motion` y el control manual de animaciones.
- No usar autoplay antes de una interacción explícita del usuario.
- Evitar múltiples loops de `requestAnimationFrame`; usar la engine existente.
- Preservar el flujo: introducción → 10 rosas → alerta → carta → final.
- Testar siempre abriendo `index.html` mediante un servidor local.

## Arquivos principais
- `index.html`: estrutura semântica e telas.
- `style.css`: visual cinematográfico e responsividade.
- `script.js`: estado, áudio, rosas, carta e partículas.
- `assets/music/up.mp3`: trilha usada após o clique inicial.

## Critérios de aceitação
1. O botão inicial abre o jardim e inicia a música.
2. Apenas a rosa atual pode ser aberta.
3. As dez rosas atualizam o progresso corretamente.
4. A nona rosa abre a alerta mágica.
5. A décima abre a tela da carta.
6. O envelope abre e digita a carta.
7. O botão final mostra a tela LUNA.
8. Reiniciar retorna ao jardim sem recarregar a página.
9. O layout funciona em 360×640 e em desktop.
10. Não há erros no console.

## Orientação para o Codex
Antes de modificar, leia `index.html`, `style.css` e `script.js`. Faça alterações pequenas e verificáveis. Não reescreva o projeto inteiro sem necessidade. Sempre preserve o funcionamento no GitHub Pages.
