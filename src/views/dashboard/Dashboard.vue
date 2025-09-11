<template>
    <Master>
        <template #content>
            <h1>{{ t('dashboard.dashboard') }}</h1>
        </template>
    </Master>
</template>

<script setup>
import Master from '@/components/MainContent.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>