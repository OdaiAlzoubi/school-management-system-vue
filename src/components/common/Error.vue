<template>
    <span v-if="error.message" class="invalid-feedback" role="alert">
        <strong>{{ error.message }}</strong>
    </span>
</template>

<script setup>
import { defineProps  } from 'vue';
const error = defineProps ({
    message: {
        type: String,
        default: null
    }
})
</script>