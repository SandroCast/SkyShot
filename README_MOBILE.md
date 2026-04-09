# SkyShot - Drone Services Marketplace

Este projeto foi desenvolvido com **React Native** e **Expo**. 

## Como rodar localmente

Para testar no seu celular ou emulador, siga estes passos:

1. **Clone o repositório** do GitHub para o seu computador.
2. **Instale as dependências**:
   ```bash
   npm install --legacy-peer-deps
   ```
   *(O flag `--legacy-peer-deps` ajuda a resolver conflitos de versão entre o React 18 e algumas bibliotecas do Expo).*
3. **Instale o Expo CLI** (se não tiver):
   ```bash
   npm install -g expo-cli
   ```

   **DICA DE OURO (Se der erro de módulo 'App' não encontrado):**
   Eu criei um arquivo `App.tsx` na raiz que serve como ponte para o `src/App.tsx`. Isso resolve o erro de "Unable to resolve module ../../App" que o Expo Go às vezes apresenta.

   **Se o erro persistir, rode:**
   ```bash
   npx expo install --fix
   ```

4. **Inicie o projeto**:
   ```bash
   npx expo start
   ```
5. **Abra o app**:
   - Use o app **Expo Go** (Android/iOS) para escanear o QR Code.
   - Ou pressione `a` para Android ou `i` para iOS se tiver os emuladores instalados.

## Tecnologias Utilizadas
- **React Native**: Framework para apps nativos.
- **Expo**: Conjunto de ferramentas para facilitar o desenvolvimento.
- **Lucide React Native**: Ãcones modernos e leves.
- **React Native Reanimated**: AnimaÃ§Ãµes fluidas.
- **NativeWind**: EstilizaÃ§Ã£o com Tailwind CSS (opcional, configurado).

## Funcionalidades Implementadas
- **Feed de VÃdeos**: Interface estilo Reels/TikTok para vÃdeos de drones.
- **Explorar Pilotos**: Lista de profissionais com avaliaÃ§Ãµes e botÃ£o de contrataÃ§Ã£o.
- **NavegaÃ§Ã£o Tab Bar**: Acesso rÃ¡pido Ã s principais seÃ§Ãµes.
- **Design Dark Premium**: Focado em destacar o conteÃºdo visual (vÃdeos).
