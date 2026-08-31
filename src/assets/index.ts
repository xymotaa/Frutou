/**
 * Referências centrais de assets. Importe daqui (não use require() solto nas
 * telas) para que o preload no boot e as telas usem exatamente o mesmo módulo.
 */
export const logo = require('./frutou-logo.png');

/** Lista de imagens carregadas antecipadamente em App.tsx. */
export const preloadImages = [logo];
