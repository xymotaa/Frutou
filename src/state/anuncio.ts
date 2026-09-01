import type { UploadFile } from '@/api';
import type { AnuncioInput } from '@/api';
import type { AnuncioValores } from '@/components/AnuncioForm';

/** Uma URI é "nova" (para upload) se for do sistema de arquivos do device. */
export function ehFotoNova(uri: string): boolean {
  return /^(file:|content:|ph:|assets-library:)/i.test(uri);
}

export function fotosParaUpload(fotos: string[]): UploadFile[] {
  return fotos.filter(ehFotoNova).map((uri, i) => ({
    uri,
    name: `foto-${Date.now()}-${i}.jpg`,
    type: 'image/jpeg',
  }));
}

/** Converte os campos do formulário no corpo do POST/PATCH /listings. */
export function valoresParaInput(v: AnuncioValores): AnuncioInput {
  const doar = v.modo === 'doar';
  return {
    titulo: v.fruta.trim(),
    descricao: v.detalhes.trim(),
    modalidade: doar ? 'doacao' : 'venda',
    precoTexto: doar ? undefined : v.preco.trim() || undefined,
    disponibilidade: v.quantidade.trim(),
    bairro: v.bairro.trim() || undefined,
    janelaRetirada: v.horarios.trim() || undefined,
    lat: typeof v.lat === 'number' ? v.lat : undefined,
    lng: typeof v.lng === 'number' ? v.lng : undefined,
  };
}
