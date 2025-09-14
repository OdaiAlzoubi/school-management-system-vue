<template>
    <Modal :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)">
        <form @submit.prevent="handleSubmit">
            <div class="mb-13 text-center">
                <h1 class="mb-3">{{ isEdit ? t('grade.edit') : t('grade.add') }}</h1>
                <div class="text-muted fw-semibold fs-5">Fill all required fields</div>
            </div>
            <div class="d-flex flex-column mb-8">
                <label class="required fs-6 fw-semibold mb-2">{{ t('grade.name') }}</label>
                <input v-model="form.name" type="text" class="form-control form-control-solid"
                    :class="{ 'is-invalid': errors.name }" placeholder="Enter Name">
                <Error v-if="errors.name" :message="getErrorMessage(errors.name)" />
            </div>
            <div class="d-flex flex-column mb-8">
                <label class="required fs-6 fw-semibold mb-2">{{ t('grade.code') }}</label>
                <input v-model="form.code" type="text" class="form-control form-control-solid"
                    :class="{ 'is-invalid': errors.code }" placeholder="Enter Code">
                <Error v-if="errors.code" :message="getErrorMessage(errors.code)" />
            </div>
            <div class="d-flex flex-column mb-8">
                <label class="required fs-6 fw-semibold mb-2">{{ t('grade.order') }}</label>
                <input v-model="form.order" type="text" class="form-control form-control-solid"
                    :class="{ 'is-invalid': errors.order }" placeholder="Enter Order">
                <Error v-if="errors.order" :message="getErrorMessage(errors.order)" />
            </div>
            <div class="d-flex flex-column mb-8">
                <label class="required fs-6 fw-semibold mb-2">{{ t('grade.description') }}</label>
                <input v-model="form.description" type="text" class="form-control form-control-solid"
                    :class="{ 'is-invalid': errors.description }" placeholder="Enter Description">
                <Error v-if="errors.description" :message="getErrorMessage(errors.description)" />
            </div>
            <!-- formSection -->
            <div class="card">
                <div class="row g-9 mb-8 card-body" v-for="(section, index) in form.sections" :key="index">
                    <div class="d-flex col-md-4 flex-column mb-8">
                        <label class="required fs-6 fw-semibold mb-2">{{ t('section.name') }}</label>
                        <input v-model="section.name" type="text" class="form-control form-control-solid"
                            :class="{ 'is-invalid': errors[`sections.${index}.name`] }" placeholder="Enter Name">
                        <Error v-if="errors[`sections.${index}.name`]"
                            :message="getErrorMessage(errors[`sections.${index}.name`])" />
                    </div>
                    <div class="d-flex col-md-4 flex-column mb-8">
                        <label class="required fs-6 fw-semibold mb-2">{{ t('section.capacity') }}</label>
                        <input v-model="section.capacity" type="text" class="form-control form-control-solid"
                            :class="{ 'is-invalid': errors[`sections.${index}.capacity`] }" placeholder="Enter Name">
                        <Error v-if="errors[`sections.${index}.capacity`]"
                            :message="getErrorMessage(errors[`sections.${index}.capacity`])" />
                    </div>
                    <div class="d-flex col-md-4 flex-column mb-8">
                        <label class="required fs-6 fw-semibold mb-2">{{ t('section.room') }}</label>
                        <input v-model="section.room" type="text" class="form-control form-control-solid"
                            :class="{ 'is-invalid': errors[`sections.${index}.room`] }" placeholder="Enter Name">
                        <Error v-if="errors[`sections.${index}.room`]"
                            :message="getErrorMessage(errors[`sections.${index}.room`])" />
                    </div>
                    <div class="d-flex col-md-4 flex-column mb-8">
                        <label class="required fs-6 fw-semibold mb-2">{{ t('section.shift') }}</label>
                        <select class="form-select form-select-solid" v-model="section.shift"
                            :class="{ 'is-invalid': errors[`sections.${index}.shift`] }" data-control="select2"
                            data-hide-search="true" name="shift" required>
                            <option disabled value="">Select Shift...</option>
                            <option v-for="shift in shiftOptions" :key="shift.value" :value="shift.value">
                                {{ shift.label }}</option>
                        </select>
                        <Error v-if="errors[`sections.${index}.shift`]"
                            :message="getErrorMessage(errors[`sections.${index}.shift`])" />
                    </div>
                    <div class="d-flex col-md-4 flex-column mb-8">
                        <label class="required fs-6 fw-semibold mb-2">{{ t('section.is_active') }}</label>
                        <select class="form-select form-select-solid" v-model="section.is_active"
                            :class="{ 'is-invalid': errors[`sections.${index}.is_active`] }" data-control="select2"
                            data-hide-search="true" name="is_active" required>
                            <option disabled value="">Select Is Active...</option>
                            <option value="1">Active</option>
                            <option value="0">InActive</option>
                        </select>
                        <Error v-if="errors[`sections.${index}.is_active`]"
                            :message="getErrorMessage(errors[`sections.${index}.is_active`])" />
                    </div>
                    <!-- Delete -->
                    <button type="button" class="btn btn-sm btn-icon btn-light-danger" @click="removeSection(index)">
                        <i class="ki-duotone ki-cross fs-1">
                            <span class="path1"></span>
                            <span class="path2"></span>
                        </i>
                    </button>
                </div>
            </div>
            <!-- Add Section -->
            <div class="form-group mt-5">
                <button type="button" class="btn btn-sm btn-light-primary" @click="addSection">
                    <i class="ki-duotone ki-plus fs-2"></i>{{ t('section.add') }}
                </button>
            </div>
            <!-- test -->
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
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
const props = defineProps({
    modelValue: Boolean,
    isEdit: Boolean,
    fromData: Object,
    errors: {
        type: Object,
        default: () => ({})
    }
})
const emit = defineEmits(['update:modelValue', 'submit'])

const form = reactive({
    name: '',
    code: '',
    description: '',
    order: '',
    sections: [],
})

const addSection = () => {
    form.sections.push({
        name: '',
        capacity: '',
        room: '',
        shift: '',
        is_active: '',
    })
}

const removeSection = (index) => {
    if (props.isEdit) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    Swal.fire({
                        title: "Deleting...",
                        text: "Please wait while we delete the section.",
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        didOpen: () => {
                            Swal.showLoading()
                        }
                    })
                    const sectionId = form.sections[index].id
                    const response = await api.delete(`section/delete/${sectionId}`)
                    form.sections.splice(index, 1)
                    Swal.fire({
                        title: "Deleted",
                        text: response.data.message,
                        icon: "success"
                    });
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: error,
                        text: "Failed to delete section.",
                    });
                }
            }
        });
    }
    else {
        form.sections.splice(index, 1)
    }
}

watch(() => props.fromData, (val) => {
    if (val) {
        form.name = val.name || ''
        form.code = val.code || ''
        form.description = val.description || ''
        form.order = val.order || ''
        form.sections = val.sections || []
    } else {
        form.name = ''
        form.code = ''
        form.description = ''
        form.order = ''
        form.sections = []
    }
}, { immediate: true })

const restForm = () => {
    form.name = ''
    form.code = ''
    form.description = ''
    form.order = ''
}

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
    // restForm()
}

// Load Shift
const shiftOptions = ref([])
const shiftsLoaded = ref(false)
const loadShift = async () => {
    try {
        if (!shiftsLoaded.value) {
            const { data } = await api.get('/enums/shifts')
            shiftOptions.value = data.data
            shiftsLoaded.value = true
        }
    } catch (error) {
        console.error(error)
    }
}
watch(() => props.modelValue, (val) => {
    if (val) {
        loadShift()
    }
})
</script>

<style scoped>
.modal.show {
    display: block;
    background: rgba(0, 0, 0, 0.5);
}
</style>
