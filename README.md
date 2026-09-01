# Frutou

App mobile (React Native / Expo) que conecta quem tem frutas sobrando com quem
quer recebê-las — por doação ou venda.

## Stack

- Expo SDK 54, React Native 0.81, React 19
- React Navigation 7 (native-stack + bottom-tabs)
- NativeWind 4 (Tailwind)
- Auth JWT + `expo-secure-store`
- Backend REST próprio (repositório `frutou-api`)

## Rodando

### 1. Backend (`frutou-api`)

O app precisa da API no ar. No repositório do backend:

```bash
cp .env.example .env
docker compose up -d          # Postgres
npx prisma migrate dev
npm run seed                  # 3 usuários de teste, senha 123456
npm run dev                   # http://localhost:3333  (GET /health → {ok:true})
```

Usuários do seed: `marina@frutou.dev`, `maria@frutou.dev`, `ze@frutou.dev`.

### 2. App

```bash
npm install
cp .env.example .env
```

Edite `.env` e aponte para o **IP da máquina na rede local** (não `localhost` —
o celular não alcança `localhost` da sua máquina):

```
EXPO_PUBLIC_API_URL=http://192.168.0.8:3333
```

Descubra o IP com `ip addr | grep 'inet '` (Linux) ou `ipconfig getifaddr en0`
(macOS).

```bash
npx expo start --lan
```

Abra pelo **scanner de dentro do app Expo Go** (não pela câmera do sistema).

### Rede — se o celular não conecta

- Celular e computador precisam estar na **mesma Wi-Fi**.
- Libere as portas no firewall do computador:
  `sudo ufw allow 8081/tcp && sudo ufw allow 3333/tcp` (Linux com ufw).
- Teste no navegador do celular: `http://<IP>:8081/status` deve responder
  `packager-status:running`.

## Estrutura

```
src/
├─ api/        cliente HTTP + funções por recurso (auth, users, listings, chat, reviews)
├─ state/      stores reativos (session, perfil, feed, chat, prefs) + helpers
├─ screens/    telas
├─ components/ componentes de UI
├─ navigation/ navegadores e tipos de rota
└─ theme/      tokens de cor/estilo
```

## Notas

- O backend devolve textos já formatados para exibição (`distanciaTexto`,
  `publicadoHa`, `precoTexto`, `hora`, `data`) — o app não faz `new Date`.
- Criar anúncio exige pelo menos 1 foto.
- Chat sem WebSocket: polling a cada ~5s enquanto a tela está em foco.
- Mapa real (Apple Maps no iOS / tiles OpenStreetMap no Android) é a próxima
  fase e exige um _dev build_ (sai do Expo Go).
