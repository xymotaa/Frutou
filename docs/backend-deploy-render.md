# frutou-api — deploy grátis no Render (para o APK funcionar em qualquer rede)

Objetivo: `https://frutou-api.onrender.com` acessível de qualquer celular, sem
depender do notebook. Tudo no free tier.

> Free tier do Render: o web service **dorme após ~15 min** sem tráfego; a
> primeira request depois leva ~30–50 s para acordar. Para a apresentação,
> abra o app 1–2 min antes para "aquecer". O Postgres free expira em 90 dias
> (ok para o prazo do trabalho).

---

## 1. Pré-requisitos no repo `frutou-api`

### a) Scripts em `package.json`

```jsonc
{
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "start": "node dist/server.js",
    "postinstall": "prisma generate",
    "deploy:db": "prisma migrate deploy && tsx prisma/seed.ts"
  }
}
```

- `postinstall` garante o Prisma Client no build do Render.
- `start` roda o JS compilado (não `tsx watch`).

### b) O servidor precisa escutar na porta do ambiente

Em `src/server.ts` / `src/env.ts`: `const PORT = Number(process.env.PORT) || 3333;`
e `app.listen(PORT, '0.0.0.0', ...)`. O Render injeta `PORT`.

### c) Uploads — atenção

O disco do Render free é **efêmero** (some a cada deploy/restart). As fotos
enviadas via `multer` para `./uploads` serão perdidas em cada redeploy.

Para a demo, duas saídas:
1. **Aceitável**: as fotos do seed vão junto no repo (`prisma/seed-assets/` são
   copiadas para `uploads/` pelo seed, que roda a cada deploy) — então os
   anúncios do seed sempre têm foto. Fotos enviadas durante a demo somem no
   próximo deploy, mas durante a apresentação funcionam.
2. **Robusto (opcional)**: trocar o storage por um bucket S3-compatível grátis
   (ex.: Cloudflare R2 free tier) — mais trabalho, provavelmente desnecessário
   para o trabalho.

Fique com a opção 1.

### d) CORS

`CORS_ORIGIN="*"` no ambiente (o app nativo não manda Origin, mas não custa).

---

## 2. Criar os serviços no Render

1. Conta grátis em render.com, conectar o GitHub.
2. **New → PostgreSQL**
   - Nome: `frutou-db`, plano **Free**.
   - Ao criar, copie a **Internal Database URL** (algo como
     `postgresql://frutou:...@dpg-xxx/frutou`).
3. **New → Web Service**, aponte para o repo `frutou-api`.
   - Runtime: **Node**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start`
   - Plano: **Free**
   - **Environment Variables**:
     ```
     DATABASE_URL       = <Internal Database URL do passo 2>
     JWT_SECRET         = <string aleatória longa>
     JWT_EXPIRES_IN     = 30d
     UPLOAD_DIR         = ./uploads
     PUBLIC_URL         = https://<nome-do-servico>.onrender.com
     NOMINATIM_URL      = https://nominatim.openstreetmap.org
     NOMINATIM_USER_AGENT = frutou-tcc/1.0 (contato: lucas.barros@unifesspa.edu.br)
     CORS_ORIGIN        = *
     NODE_VERSION       = 20
     ```
   - `PUBLIC_URL` precisa ser exatamente a URL pública do serviço (o backend usa
     isso para montar as URLs de foto). Se ainda não souber o subdomínio, crie o
     serviço, veja a URL, e edite `PUBLIC_URL` depois (dispara redeploy).

4. **Rodar migrations + seed** (uma vez, e a cada mudança de schema):
   - Render → serviço → aba **Shell** →
     ```
     npx prisma migrate deploy
     npx tsx prisma/seed.ts
     ```
   - ou adicione um **Job**/deploy hook rodando `npm run deploy:db`.

---

## 3. Verificar

```bash
curl -s https://<seu-servico>.onrender.com/health           # {"ok":true}
curl -s https://<seu-servico>.onrender.com/listings | jq '.[0] | {titulo, fotos}'
# a URL em .fotos deve começar com https://<seu-servico>.onrender.com/uploads/...
```

Abra uma URL de `.fotos` no navegador — a imagem tem que carregar.

---

## 4. No app Frutou (repo separado)

`.env`:

```
EXPO_PUBLIC_API_URL=https://<seu-servico>.onrender.com
```

Sem barra no final. O `src/lib/media.ts` já reescreve o host das URLs
`/uploads/` para esse valor, então mesmo que `PUBLIC_URL` no backend fique
diferente, as fotos carregam.

Depois: `npx eas build --profile preview --platform android` (ver `docs/build.md`).

---

## Checklist rápido

- [ ] `package.json`: `build`, `start`, `postinstall: prisma generate`
- [ ] server escuta em `process.env.PORT` e `0.0.0.0`
- [ ] Postgres Free criado no Render, URL interna copiada
- [ ] Web Service Free criado, build `npm install && npm run build`, start `npm run start`
- [ ] Env vars setadas (com `PUBLIC_URL` = URL pública real)
- [ ] `prisma migrate deploy` + `seed` rodados no Shell
- [ ] `/health` e `/listings` respondem via HTTPS; fotos abrem
- [ ] `.env` do app com a URL pública → `eas build`
