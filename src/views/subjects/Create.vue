<template>
    <Modal :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)">
        <form @submit.prevent="handleSubmit">
            <div class="mb-13 text-center">
                <h1 class="mb-3">{{ isEdit ? t('subject.edit') : t('subject.add') }}</h1>
                <div class="text-muted fw-semibold fs-5">Fill all required fields</div>
            </div>
            <div class="d-flex flex-column mb-8">
                <label class="required fs-6 fw-semibold mb-2">{{ t('subject.name') }}</label>
                <input v-model="form.name" type="text" class="form-control form-control-solid"
                    :class="{ 'is-invalid': errors.name }" placeholder="Enter Name">
                <Error v-if="errors.name" :message="getErrorMessage(errors.name)" />
            </div>
            <div class="d-flex flex-column mb-8">
                <label class="required fs-6 fw-semibold mb-2">{{ t('subject.grade') }}</label>
                <select v-model="form.grade_id" name="grade_id"
                    class="form-select form-select-solid form-select-lg fw-semibold"
                    :class="{ 'is-invalid': errors.grade_id }">
                    <option disabled value="">Select Is Grade...</option>
                    <option v-for="grade in gradeOptions" :key="grade.id" :value="grade.id">{{ grade.name }}
                    </option>
                </select>
                <Error v-if="errors.grade_id" :message="getErrorMessage(errors.grade_id)" />
            </div>
            <div class="d-flex flex-column mb-8">
                <label class="required fs-6 fw-semibold mb-2">{{ t('subject.code') }}</label>
                <input v-model="form.code" type="text" class="form-control form-control-solid"
                    :class="{ 'is-invalid': errors.code }" placeholder="Enter Code">
                <Error v-if="errors.code" :message="getErrorMessage(errors.code)" />
            </div>
            <div class="d-flex flex-column mb-8">
                <label class="required fs-6 fw-semibold mb-2">{{ t('subject.min_passing_score') }}</label>
                <input v-model="form.min_passing_score" type="number" class="form-control form-control-solid" min="0"
                    max="100" :class="{ 'is-invalid': errors.min_passing_score }" placeholder="Enter Min Passing Score">
                <Error v-if="errors.min_passing_score" :message="getErrorMessage(errors.min_passing_score)" />
            </div>
            <div class="d-flex flex-column mb-8">
                <label class="required fs-6 fw-semibold mb-2">{{ t('subject.description') }}</label>
                <input v-model="form.description" type="text" class="form-control form-control-solid"
                    :class="{ 'is-invalid': errors.description }" placeholder="Enter Description">
                <Error v-if="errors.description" :message="getErrorMessage(errors.description)" />
            </div>
            <div class="d-flex flex-column mb-8">
                <label class="required fs-6 fw-semibold mb-2">{{ t('subject.type') }}</label>
                <select v-model="form.type" name="type" class="form-select form-select-solid form-select-lg fw-semibold"
                    :class="{ 'is-invalid': errors.type }">
                    <option disabled value="">Select Is Type...</option>
                    <option value="core">Core</option>
                </select>
                <Error v-if="errors.type" :message="getErrorMessage(errors.type)" />
            </div>
            <div class="d-flex flex-column mb-8">
                <label class="required fs-6 fw-semibold mb-2">{{ t('subject.is_active') }}</label>
                <select v-model="form.is_active" name="is_active"
                    class="form-select form-select-solid form-select-lg fw-semibold" data-control="select2"
                    :class="{ 'is-invalid': errors.is_active }">
                    <option disabled value="">Select Is Active...</option>
                    <option value="1">Active</option>
                    <option value="0">InActive</option>
                </select>
                <Error v-if="errors.is_active" :message="getErrorMessage(errors.is_active)" />
            </div>
            <div class="d-flex flex-column mb-8">
                <label class="required fs-6 fw-semibold mb-2">{{ t('subject.is_offered') }}</label>
                <select v-model="form.is_offered" name="is_offered"
                    class="form-select form-select-solid form-select-lg fw-semibold" data-control="select2"
                    :class="{ 'is-invalid': errors.is_offered }">
                    <option disabled value="">Select Is Offered...</option>
                    <option value="1">Offered</option>
                    <option value="0">Not Offered</option>
                </select>
                <Error v-if="errors.is_offered" :message="getErrorMessage(errors.is_offered)" />
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
import api from '@/services/api'
import { useI18n } from 'vue-i18n'

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
    grade_id: '',
    description: '',
    code: '',
    min_passing_score: '',
    type: '',
    is_active: '',
    is_offered: '',
})

watch(() => props.formData, (val) => {
    if (val) {
        form.name = val.name ?? ''
        form.grade_id = val.grade_id ?? ''
        form.description = val.description ?? ''
        form.code = val.code ?? ''
        form.min_passing_score = val.min_passing_score ?? ''
        form.type = val.type ?? ''
        form.is_active = val.is_active ?? ''
        form.is_offered = val.is_offered ?? ''
    } else {
        form.name = ''
        form.grade_id = ''
        form.description = ''
        form.code = ''
        form.min_passing_score = ''
        form.type = ''
        form.is_active = ''
        form.is_offered = ''
    }
}, { immediate: true })

const restForm = () => {
    form.name = ''
    form.grade_id = ''
    form.description = ''
    form.code = ''
    form.min_passing_score = ''
    form.type = ''
    form.is_active = ''
    form.is_offered = ''
}

const handleSubmit = async () => {
    const dataFilter = Object.fromEntries(Object.entries(form).filter(([key, value]) => {
        if (value === '') return false
        if (Array.isArray(value) && value.length === 0) return false
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

// Load Grade
const gradeOptions = ref([])
const gradesLoaded = ref(false)
const loadGrades = async () => {
    try {
        if (!gradesLoaded.value) {
            const { data } = await api.get('/grade')
            gradeOptions.value = data.data
            gradesLoaded.value = true
        }
    } catch (error) {
        console.error(error)
    }
}
watch(() => props.modelValue, (val) => {
    if (val) {
        loadGrades()
    }
})
</script>

<style scoped>
.modal.show {
    display: block;
    background: rgba(0, 0, 0, 0.5);
}
</style>
