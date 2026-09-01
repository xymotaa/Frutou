import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ApiError, reviewsApi } from '@/api';
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  HandHeartIcon,
} from '@/components/icons';
import { BottomCTA } from '@/components/BottomCTA';
import { StarRating } from '@/components/StarRating';
import type { RootStackScreenProps } from '@/navigation/types';
import { color } from '@/theme/tokens';

export function AvaliacaoScreen({
  route,
  navigation,
}: RootStackScreenProps<'Avaliacao'>) {
  const { conversationId, nomeParceiro } = route.params;
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function handleConfirmar() {
    if (nota === 0 || enviando) return;
    setEnviando(true);
    setErro(null);
    try {
      await reviewsApi.create({
        conversationId,
        nota,
        comentario: comentario.trim() || undefined,
      });
      navigation.goBack();
    } catch (e) {
      if (e instanceof ApiError && e.status === 409) {
        setErro('Você já avaliou esta troca.');
      } else {
        setErro(
          e instanceof ApiError
            ? e.message
            : 'Não foi possível enviar a avaliação. Tente de novo.',
        );
      }
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center gap-3 border-b border-line bg-input px-4 py-3">
        <Pressable
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          hitSlop={8}
          className="h-9 w-9 items-center justify-center rounded-full active:opacity-70"
        >
          <ChevronLeftIcon size={22} color={color.ink} />
        </Pressable>
        <Text
          className="text-[17px] font-bold text-ink"
          accessibilityRole="header"
        >
          Avaliação
        </Text>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ padding: 20, paddingBottom: 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Confirmação */}
          <View className="items-center gap-3 pt-6">
            <View className="h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <HandHeartIcon size={30} color="#FFFFFF" />
            </View>
            <Text className="text-[22px] font-bold text-ink">
              Troca realizada!
            </Text>
            <Text className="text-center text-[15px] leading-6 text-muted">
              Como foi sua experiência trocando com{' '}
              <Text className="font-semibold text-ink">{nomeParceiro}</Text>?
            </Text>
          </View>

          {/* Estrelas */}
          <View className="mt-6 items-center rounded-2xl bg-input py-8">
            <StarRating value={nota} size={40} onChange={setNota} />
          </View>

          {/* Comentário */}
          <View className="mt-6 gap-1.5">
            <Text className="text-[13px] font-semibold text-ink">
              Deixe um comentário (opcional)
            </Text>
            <View className="rounded-field border border-line bg-input px-3 py-3">
              <TextInput
                className="text-[14px] text-ink"
                placeholderTextColor={color.muted}
                selectionColor={color.primary}
                accessibilityLabel="Comentário sobre a troca"
                multiline
                value={comentario}
                onChangeText={setComentario}
                placeholder="Ex: Frutas excelentes, pessoa muito simpática!"
                style={{ minHeight: 96, textAlignVertical: 'top' }}
              />
            </View>
          </View>
          {erro ? (
            <Text className="mt-4 text-center text-[13px] text-danger">
              {erro}
            </Text>
          ) : null}
        </ScrollView>

        {/* CTA */}
        <BottomCTA
          label={enviando ? 'Enviando…' : 'Confirmar avaliação'}
          onPress={handleConfirmar}
          disabled={nota === 0 || enviando}
          icon={
            enviando ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <CheckCircleIcon size={18} color="#FFFFFF" />
            )
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
