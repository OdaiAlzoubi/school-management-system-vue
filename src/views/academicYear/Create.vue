<template>
    <Modal :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)">
        <form @submit.prevent="handleSubmit">
            <div class="mb-13 text-center">
                <h1 class="mb-3">{{ isEdit ? t('academicYear.edit') : t('academicYear.add') }}</h1>
                <div class="text-muted fw-semibold fs-5">Fill all required fields</div>
            </div>
            <div class="d-flex flex-column mb-8">
                <label class="required fs-6 fw-semibold mb-2">{{ t('academicYear.name') }}</label>
                <input v-model="form.name" type="text" class="form-control form-control-solid"
                    :class="{ 'is-invalid': errors.name }" placeholder="Enter Name">
                <Error v-if="errors.name" :message="getErrorMessage(errors.name)" />
            </div>
            <div class="d-flex flex-column mb-8">
                <label class="required fs-6 fw-semibold mb-2">{{ t('academicYear.is_active') }}</label>
                <select class="form-select form-select-solid" v-model="form.is_active"
                    :class="{ 'is-invalid': errors.is_active }" data-control="select2" data-hide-search="true"
                    name="is_active">
                    <option disabled value="">Select Is Active...</option>
                    <option v-for="status in isActiveOptions" :key="status.value" :value="status.value">{{ status.label
                    }}</option>
                </select>
                <Error v-if="errors.is_active" :message="getErrorMessage(errors.is_active)" />
            </div>
            <div class="d-flex flex-column mb-8">
                <label class="required fs-6 fw-semibold mb-2">{{ t('academicYear.start_date') }}</label>
                <input v-model="form.start_date" type="date" class="form-control form-control-solid"
                    :class="{ 'is-invalid': errors.start_date }" placeholder="Enter Start Date">
                <Error v-if="errors.start_date" :message="getErrorMessage(errors.start_date)" />
            </div>
            <div class="d-flex flex-column mb-8">
                <label class="required fs-6 fw-semibold mb-2">{{ t('academicYear.end_date') }}</label>
                <input v-model="form.end_date" type="date" class="form-control form-control-solid"
                    :class="{ 'is-invalid': errors.end_date }" placeholder="Enter End Date">
                <Error v-if="errors.end_date" :message="getErrorMessage(errors.end_date)" />
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
import Modal from '@/components/modal/Modal'
import Error from '@/components/common/Error'
import { useI18n } from 'vue-i18n'
import api from '@/services/api'

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
    is_active: '',
    start_date: '',
    end_date: '',
})

watch(() => props.formData, (val) => {
    if (val) {
        form.name = val.name || ''
        form.is_active = val.is_active || ''
        form.start_date = val.start_date || ''
        form.end_date = val.end_date || ''
    } else {
        form.name = ''
        form.is_active = '1'
        form.start_date = ''
        form.end_date = ''
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
    return error
}

const close = () => {
    emit('update:modelValue', false)
}
// Load Enum
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
// Load Is Active
const isActiveOptions = ref([])
const isActiveLoaded = ref(false)
const loadIsActive = createEnumLoader(isActiveOptions, isActiveLoaded, '/enums/is-active')

watch(() => props.modelValue, (val) => {
    if (val) {
        loadIsActive()
    }
})
</script>

<style scoped>
.modal.show {
    display: block;
    background: rgba(0, 0, 0, 0.5);
}
</style>
