<!-- components/Modal.vue -->
<template>
    <!-- <Transition name="fade"> -->
        <div v-if="modelValue" class="modal show fade" @click.self="close" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered mw-650px">
                <div class="modal-content rounded">
                    <div class="modal-header pb-0 border-0 justify-end">
                        <button class="btn btn-sm btn-icon btn-active-color-primary" @click="close">
                            <i class="ki-duotone ki-cross fs-1">
                                <span class="path1"></span>
                                <span class="path2"></span>
                            </i>
                        </button>
                    </div>
                    <div class="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
                        <slot />
                    </div>
                </div>
            </div>
        </div>
    <!-- </Transition> -->
</template>

<script setup>
defineProps({
    modelValue: { type: Boolean, required: true }
});
const emit = defineEmits(['update:modelValue']);
const close = () => emit('update:modelValue', false);
</script>

<!-- <style scoped>
.modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(159, 91, 91, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
}

.modal-dialog {
    width: 100%;
    max-width: 650px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style> -->
