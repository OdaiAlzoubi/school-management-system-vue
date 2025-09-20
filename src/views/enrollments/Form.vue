<template>
    <Modal :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)">
        <form @submit.prevent="handleSubmit">
            <div class="mb-13 text-center">
                <h1 class="mb-3">{{ isEdit ? t('enrollment.edit') : t('enrollment.add') }}</h1>
                <div class="text-muted fw-semibold fs-5"></div>
            </div>
            <div class="row g-9 mb-8">
                <div class="d-flex col-md-6 flex-column mb-8">
                    <label class="required fs-6 fw-semibold mb-2">{{ t('enrollment.student') }}</label>
                    <select class="form-select form-select-solid" v-model="form.student_id"
                        :class="{ 'is-invalid': errors.student_id }" data-control="select2" data-hide-search="true"
                        name="student_id" required>
                        <option disabled value="">Select Student...</option>
                        <option v-for="student in studentOptions" :key="student.id" :value="student.id">
                            {{ student.user.name }}</option>
                    </select>
                    <Error v-if="errors.student_id" :message="getErrorMessage(errors.student_id)" />
                </div>
                <div class="d-flex col-md-6 flex-column mb-8">
                    <label class="required fs-6 fw-semibold mb-2">{{ t('enrollment.section') }}</label>
                    <select class="form-select form-select-solid" v-model="form.section_id"
                        :class="{ 'is-invalid': errors.section_id }" data-control="select2" data-hide-search="true"
                        name="section_id" required>
                        <option disabled value="">Select Section...</option>
                        <option v-for="section in sectionOptions" :key="section.id" :value="section.id">
                            {{ section.name }}</option>
                    </select>
                    <Error v-if="errors.section_id" :message="getErrorMessage(errors.section_id)" />
                </div>
            </div>
            <div class="row g-9 mb-8">
                <div class="d-flex col-md-6 flex-column mb-8">
                    <label class="required fs-6 fw-semibold mb-2">{{ t('enrollment.academic_year') }}</label>
                    <select class="form-select form-select-solid" v-model="form.academic_year_id"
                        :class="{ 'is-invalid': errors.academic_year_id }" data-control="select2"
                        data-hide-search="true" name="academic_year_id" required>
                        <option disabled value="">Select Academic Year...</option>
                        <option v-for="academic_year in academicYearOptions" :key="academic_year.id"
                            :value="academic_year.id">
                            {{ academic_year.name }}</option>
                    </select>
                    <Error v-if="errors.academic_year_id" :message="getErrorMessage(errors.academic_year_id)" />
                </div>
                <div class="d-flex col-md-6 flex-column mb-8">
                    <label class="required fs-6 fw-semibold mb-2">{{ t('enrollment.grade') }}</label>
                    <select class="form-select form-select-solid" v-model="form.grade_id"
                        :class="{ 'is-invalid': errors.grade_id }" data-control="select2" data-hide-search="true"
                        name="grade_id" required>
                        <option disabled value="">Select Grade...</option>
                        <option v-for="grade in gradeOptions" :key="grade.id" :value="grade.id">
                            {{ grade.name }}</option>
                    </select>
                    <Error v-if="errors.grade_id" :message="getErrorMessage(errors.grade_id)" />
                </div>
            </div>
            <div class="row g-9 mb-8">
                <div class="d-flex col-md-6 flex-column mb-8">
                    <label class="required fs-6 fw-semibold mb-2">{{ t('enrollment.status') }}</label>
                    <select class="form-select form-select-solid" v-model="form.status"
                        :class="{ 'is-invalid': errors.status }" data-control="select2" data-hide-search="true"
                        name="status" required>
                        <option disabled value="">Select Status...</option>
                        <option v-for="status in StatusOptions" :key="status.value" :value="status.value">
                            {{ status.label }}</option>
                    </select>
                    <Error v-if="errors.status" :message="getErrorMessage(errors.status)" />
                </div>
                <div class="d-flex col-md-6 flex-column mb-8">
                    <label class="required fs-6 fw-semibold mb-2">{{ t('enrollment.graduation_date') }}</label>
                    <input v-model="form.graduation_date" type="date" class="form-control form-control-solid"
                        :class="{ 'is-invalid': errors.graduation_date }" placeholder="">
                    <Error v-if="errors.graduation_date" :message="getErrorMessage(errors.graduation_date)" />
                </div>
            </div>
            <div class="d-flex flex-column mb-8">
                <label class="required fs-6 fw-semibold mb-2">{{ t('enrollment.reason') }}</label>
                <input v-model="form.reason" type="text" class="form-control form-control-solid"
                    :class="{ 'is-invalid': errors.reason }" placeholder="">
                <Error v-if="errors.reason" :message="getErrorMessage(errors.reason)" />
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
    student_id: '',
    section_id: '',
    academic_year_id: '',
    grade_id: '',
    admission_date: '',
    status: '',
    graduation_date: '',
    reason: '',
})
watch(() => props.formData, (val) => {
    if (val) {
        form.student_id = val.student_id || ''
        form.section_id = val.section_id || ''
        form.academic_year_id = val.academic_year_id || ''
        form.grade_id = val.grade_id || ''
        form.admission_date = val.admission_date || ''
        form.status = val.status || ''
        form.graduation_date = val.graduation_date || ''
        form.reason = val.reason || ''
    } else {
        form.student_id = ''
        form.section_id = ''
        form.academic_year_id = ''
        form.grade_id = ''
        form.admission_date = ''
        form.status = ''
        form.graduation_date = ''
        form.reason = ''
    }
}, { immediate: true });
const getErrorMessage = (error) => {
    if (Array.isArray(error)) {
        return error[0]
    }
    return String(error)
}
const handleSubmit = async () => {
    const dataFilter = Object.fromEntries(Object.entries(form).filter(([key, value]) => {
        if (value === '') return false
        if (Array.isArray(value) && value.length === 0) return false;
        return true
    }))
    await emit('submit', dataFilter)
}
const close = () => {
    emit('update:modelValue', false)
}
// Load Loader
const createDataLoader = (optionsRef, loadedRef, url) => {
    return async () => {
        try {
            if (!loadedRef.value) {
                const { data } = await api.get(url);
                optionsRef.value = data.data
                loadedRef.value = true
            }
        } catch (error) {
            console.error(error)
        }
    }
};
// Load
const studentOptions = ref([])
const studentLoaded = ref(false)
const loadStudent = createDataLoader(studentOptions, studentLoaded, 'student')
const sectionOptions = ref([])
const sectionLoaded = ref(false)
const loadSection = createDataLoader(sectionOptions, sectionLoaded, 'section')
const academicYearOptions = ref([])
const academicYearLoaded = ref(false)
const loadAcademicYear = createDataLoader(academicYearOptions, academicYearLoaded, 'academic-year')
const gradeOptions = ref([])
const gradeLoaded = ref(false)
const loadGrade = createDataLoader(gradeOptions, gradeLoaded, 'grade')
const StatusOptions = ref([])
const StatusLoaded = ref(false)
const loadStatus = createDataLoader(StatusOptions, StatusLoaded, 'enums/enrollment-status')
watch(() => props.modelValue, (val) => {
    loadStudent()
    loadSection()
    loadAcademicYear()
    loadGrade()
    loadStatus()
})
</script>