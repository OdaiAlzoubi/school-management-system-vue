<template>
    <Modal :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)">
        <form @submit.prevent="handleSubmit">
            <div class="mb-13 text-center">
                <h1 class="mb-3">{{ isEdit ? t('section.edit') : t('section.add') }}</h1>
                <div class="text-muted fw-semibold fs-5"></div>
            </div>
            <div class="d-flex flex-column mb-8">
                <label class="required fs-6 fw-semibold mb-2">{{ t('section.name') }}</label>
                <input v-model="form.name" type="text" class="form-control form-control-solid"
                    :class="{ 'is-invalid': errors.name }" placeholder="" required>
                <Error v-if="errors.name" :message="getErrorMessage(errors.name)" />
            </div>
            <div class="d-flex flex-column mb-8">
                <label class="required fs-6 fw-semibold mb-2">{{ t('section.capacity') }}</label>
                <input v-model="form.capacity" type="text" class="form-control form-control-solid"
                    :class="{ 'is-invalid': errors.capacity }" placeholder="">
                <Error v-if="errors.capacity" :message="getErrorMessage(errors.capacity)" />
            </div>
            <div class="d-flex flex-column mb-8">
                <label class="required fs-6 fw-semibold mb-2">{{ t('section.room') }}</label>
                <input v-model="form.room" type="text" class="form-control form-control-solid"
                    :class="{ 'is-invalid': errors.room }" placeholder="">
                <Error v-if="errors.room" :message="getErrorMessage(errors.room)" />
            </div>
            <div class="row g-9 mb-8">
                <div class="d-flex col-md-6 flex-column mb-8">
                    <label class="required fs-6 fw-semibold mb-2">{{ t('section.shift') }}</label>
                    <select class="form-select form-select-solid" v-model="form.shift"
                        :class="{ 'is-invalid': errors.shift }" data-control="select2" data-hide-search="true"
                        name="shift" required>
                        <option disabled value="">Select Shift...</option>
                        <option v-for="shift in shiftOptions" :key="shift.value" :value="shift.value">
                            {{ shift.label }}</option>
                    </select>
                    <Error v-if="errors.shift" :message="getErrorMessage(errors.shift)" />
                </div>
                <div class="d-flex col-md-6 flex-column mb-8">
                    <label class="required fs-6 fw-semibold mb-2">{{ t('section.is_active') }}</label>
                    <select class="form-select form-select-solid" v-model="form.is_active"
                        :class="{ 'is-invalid': errors.is_active }" data-control="select2" data-hide-search="true"
                        name="is_active" required>
                        <option disabled value="">Select Is Active...</option>
                        <option value="1">Active</option>
                        <option value="0">InActive</option>
                    </select>
                    <Error v-if="errors.is_active" :message="getErrorMessage(errors.is_active)" />
                </div>
            </div>
            <!-- Actions -->
            <div class="text-center">
                <button type="button" class="btn btn-light me-3" @click="close">{{ t('form.cancel') }}</button>
                <button type="submit" class="btn btn-primary">{{ isEdit ? t('form.update') : t('form.submit')
                }}</button>
            </div>
        </form>
    </Modal>
</template>
<script setup>
import { reactive, watch, ref } from 'vue'
import api from '@/services/api'
import Modal from '@/components/modal/Modal'
import Error from '@/components/common/Error'
import { useI18n } from 'vue-i18n';
const { t } = useI18n()

const props = defineProps({
    modelValue: Boolean,
    isEdit: Boolean,
    formData: Object,
    errors: {
        type: Object,
        default: () => ({})
    }
})
const emit = defineEmits(['update:modelValue', 'submit'])

const form = reactive({
    name: '',
    capacity: '',
    room: '',
    shift: '',
    is_active: '',
    grade_id: ''
})
watch(() => props.formData, (val) => {
    if (val) {
        form.name = val.name || ''
        form.capacity = val.capacity || ''
        form.room = val.room || ''
        form.shift = val.shift || ''
        form.is_active = val.is_active || ''
        form.grade_id = val.grade_id || ''
    } else {
        form.name = ''
        form.capacity = ''
        form.room = ''
        form.shift_type = ''
        form.is_active = ''
        form.grade_id = ''
    }
}, { immediate: true })

const handleSubmit = async () => {
    const dataFilter = Object.fromEntries(Object.entries(form).filter(([key, value]) => {
        if (value === '') return false
        if (Array.isArray(value) && value.length === 0) return false;
        return true
    }))
    await emit('submit', dataFilter)
}

const getErrorMessage = (error) => {
    if (Array.isArray(error)) {
        return error[0]
    }
    return String(error)
}

const close = () => {
    emit('update:modelValue', false)
}
// Load Enums
const createEnumLoader = (optionsRef, loadedRef, url) => {
    return async () => {
        try {
            if (!loadedRef.value) {
                const { data } = await api.get(url)
                optionsRef.value = data.data
                loadedRef.value = true
            }
        } catch (error) {
            console.error(error)
        }
    }
}
// Load Shift Options
const shiftOptions = ref([])
const shiftLoaded = ref(false)
const loadShift = createEnumLoader(shiftOptions, shiftLoaded, '/enums/shifts')
watch(() => props.modelValue, (val) => {
    if (val) {
        loadShift()
    }
})
</script>