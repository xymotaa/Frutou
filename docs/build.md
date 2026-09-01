# Build do Frutou (APK Android) — de graça

A partir da Fase 6 o app usa `react-native-maps` (módulo nativo), que **não roda
no Expo Go**. É preciso gerar um build próprio. Duas opções, ambas sem custo.

O que já está pronto no repo:

- `eas.json` com os perfis `development`, `preview` e `production`.
- `app.json` com `android.package` = `dev.frutou.app` e `ios.bundleIdentifier`.
- `react-native-maps` instalado; mapa iOS = Apple Maps (sem chave), mapa
  Android = tiles do OpenStreetMap (sem chave, sem Google).

Antes de tudo, confirme o `.env`:

```
EXPO_PUBLIC_API_URL=http://192.168.0.8:3333    # IP da LAN — o APK vai falar com esse endereço
```

> O APK "congela" esse valor no build. Se for demonstrar em outra rede, ou o
> backend precisa estar acessível nesse IP, ou rebuilde com o IP novo. Para
> apresentação, deixe a máquina do backend e o celular na mesma Wi-Fi.

---

## Opção A — EAS Build (nuvem da Expo) — recomendado

Nada para instalar além do CLI. Fila do plano grátis é mais lenta
(~10–40 min), mas não cobra.

```bash
# 1. login (cria conta grátis em expo.dev se não tiver)
npx eas login

# 2. vincula o projeto (gera expo.extra.eas.projectId no app.json — commite isso)
npx eas init

# 3. build do APK de preview
npx eas build --profile preview --platform android
```

Ao final o terminal mostra um link `expo.dev/...` com o `.apk` para baixar.
Baixe no celular (ou baixe no PC e transfira) e instale — o Android vai pedir
para permitir "instalar de fontes desconhecidas".

Para instalar via cabo:

```bash
# precisa do adb; se não tiver, use o link do site
npx eas build:run -p android --latest
```

### Dev build (para desenvolver com o mapa, com hot reload)

```bash
npx eas build --profile development --platform android
# instala o APK de dev, depois:
npx expo start --dev-client --lan
```

---

## Opção B — Build local (sua máquina) — sem nuvem

100% offline, mas exige instalar o toolchain Android (~5–8 GB):

1. **JDK 17** — `sudo pacman -S jdk17-openjdk` (CachyOS/Arch)
2. **Android SDK** — instale o Android Studio, ou só as command-line tools:
   ```bash
   # via AUR, por exemplo: yay -S android-sdk android-sdk-platform-tools android-sdk-build-tools
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin
   sdkmanager "platform-tools" "platforms;android-35" "build-tools;35.0.0"
   ```
3. Gerar o APK:
   ```bash
   npx expo prebuild --platform android      # cria a pasta android/
   npx expo run:android --variant release     # compila e instala no device conectado
   # o .apk fica em android/app/build/outputs/apk/release/
   ```

Depois de `prebuild`, a pasta `android/` passa a existir no repo. Pode
`git add` ou manter no `.gitignore` (o `prebuild` recria quando precisar).

---

## Resumo para a apresentação

1. Suba o backend (`frutou-api`) na sua máquina, na mesma Wi-Fi do celular.
2. `.env` do app com o IP da LAN.
3. `npx eas build --profile preview --platform android` → baixa o `.apk`.
4. Instala no celular, abre, testa (login, feed, mapa, chat, avaliação).
5. Não precisa de conta Apple nem Google Play. O APK basta.
