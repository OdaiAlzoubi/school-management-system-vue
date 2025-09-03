<!-- components/Modal.vue -->
<template>
    <div class="modal fade" tabindex="-1" :class="{ show: modelValue }" style="display: block;" v-if="modelValue">
        <div class="modal-dialog modal-dialog-centered mw-950px">
            <div class="modal-content rounded">
                <!-- Modal Header -->
                <div class="modal-header pb-0 border-0 justify-content-end">
                    <button type="button" class="btn btn-sm btn-icon btn-active-color-primary" @click="close">
                        <i class="ki-duotone ki-cross fs-1">
                            <span class="path1"></span>
                            <span class="path2"></span>
                        </i>
                    </button>
                </div>
                <!-- Modal Body -->
                <div class="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: Boolean,
    isEdit: Boolean,
    studentData: Object,
})

const emit = defineEmits(['update:modelValue', 'submit'])
const close = () => emit('update:modelValue', false)
</script>
<style scoped>
.modal.show {
    display: block;
    background: rgba(0, 0, 0, 0.5);
}
</style>