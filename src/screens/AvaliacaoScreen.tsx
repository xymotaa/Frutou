import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  CheckCircleIcon,
  ChevronLeftIcon,
  HandHeartIcon,
} from '@/components/icons';
import { StarRating } from '@/components/StarRating';
import type { RootStackScreenProps } from '@/navigation/types';
import { color } from '@/theme/tokens';

export function AvaliacaoScreen({
  route,
  navigation,
}: RootStackScreenProps<'Avaliacao'>) {
  const { nomeParceiro } = route.params;
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState('');

  function handleConfirmar() {
    // TODO: enviar para reviewsService.create quando o backend existir.
    navigation.goBack();
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
        </ScrollView>

        {/* CTA */}
        <View className="border-t border-line bg-surface px-5 pb-2 pt-3">
          <Pressable
            onPress={handleConfirmar}
            disabled={nota === 0}
            accessibilityRole="button"
            accessibilityLabel="Confirmar avaliação"
            accessibilityState={{ disabled: nota === 0 }}
            className={`h-14 flex-row items-center justify-center gap-2 rounded-field active:opacity-80 ${
              nota === 0 ? 'bg-primary opacity-50' : 'bg-primary'
            }`}
          >
            <CheckCircleIcon size={18} color="#FFFFFF" />
            <Text className="text-[15px] font-semibold text-white">
              Confirmar avaliação
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
