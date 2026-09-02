module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'nativewind/babel'],
    // Necessário para o react-native-reanimated 4.x (usado por react-navigation
    // e react-native-maps). Deve ser o ÚLTIMO plugin da lista.
    plugins: ['react-native-worklets/plugin'],
  };
};
