<template>
    <Modal :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)">
        <form @submit.prevent="handleSubmit">
            <div class="mb-13 text-center">
                <h1 class="mb-3">{{ isEdit ? 'Edit Student' : 'Add Student' }}</h1>
                <div class="text-muted fw-semibold fs-5">Fill all required fields</div>
            </div>
            <!-- Name -->
            <div class="row g-9 mb-8">
                <div class="d-flex col-md-4 flex-column mb-8">
                    <label class="required fs-6 fw-semibold mb-2">{{ t('student.first_name') }}</label>
                    <input v-model="form.first_name" type="text" class="form-control form-control-solid"
                        :class="{ 'is-invalid': errors.first_name }" placeholder="Enter First Name" required>
                    <Error v-if="errors.first_name" :message="getErrorMessage(errors.first_name)" />
                </div>
                <div class=" d-flex col-md-4 flex-column mb-8">
                    <label class="required fs-6 fw-semibold mb-2">{{ t('student.middle_name') }}</label>
                    <input v-model="form.middle_name" type="text" class="form-control form-control-solid"
                        :class="{ 'is-invalid': errors.middle_name }" placeholder="Enter Middle Name" required>
                    <Error v-if="errors.middle_name" :message="getErrorMessage(errors.middle_name)" />
                </div>
                <div class="d-flex col-md-4 flex-column mb-8">
                    <label class="required fs-6 fw-semibold mb-2">{{ t('student.last_name') }}</label>
                    <input v-model="form.last_name" type="text" class="form-control form-control-solid"
                        :class="{ 'is-invalid': errors.last_name }" placeholder="Enter Last Name" required>
                    <Error v-if="errors.last_name" :message="getErrorMessage(errors.last_name)" />
                </div>
            </div>
            <!-- Connect -->
            <div class="row g-9 mb-8">
                <!-- Email -->
                <div class="d-flex col-md-6 flex-column mb-8">
                    <label class="fs-6 fw-semibold mb-2">{{ t('student.email') }}</label>
                    <input v-model="form.email" type="email" class="form-control form-control-solid "
                        :class="{ 'is-invalid': errors.email }" placeholder="Enter Email">
                    <Error v-if="errors.email" :message="getErrorMessage(errors.email)" />
                </div>
                <!-- Phone -->
                <div class="d-flex col-md-6 flex-column mb-8">
                    <label class="fs-6 fw-semibold mb-2">{{ t('student.phone') }}</label>
                    <input v-model="form.phone" type="number" class="form-control form-control-solid"
                        :class="{ 'is-invalid': errors.phone }" placeholder="Enter Phone">
                    <Error v-if="errors.phone" :message="getErrorMessage(errors.phone)" />
                </div>
            </div>
            <!-- national_number -->
            <div class="d-flex flex-column mb-8">
                <label class="required fs-6 fw-semibold mb-2">{{ t('student.national_number') }}</label>
                <input v-model="form.national_number" type="number" class="form-control form-control-solid"
                    :class="{ 'is-invalid': errors.national_number }" placeholder="Enter National Number" required>
                <Error v-if="errors.national_number" :message="getErrorMessage(errors.national_number)" />
            </div>
            <!-- address -->
            <div class="row g-9 mb-8">
                <div class="d-flex col-md-4 flex-column mb-8">
                    <label class="required fs-6 fw-semibold mb-2">{{ t('student.country') }}</label>
                    <input v-model="form.address.country" type="text" class="form-control form-control-solid"
                        :class="{ 'is-invalid': errors['address.country'] }" placeholder="Enter country" required>
                    <Error v-if="errors['address.country']" :message="getErrorMessage(errors['address.country'])" />
                </div>
                <div class="d-flex col-md-4 flex-column mb-8">
                    <label class="required fs-6 fw-semibold mb-2">{{ t('student.city') }}</label>
                    <input v-model="form.address.city" type="text" class="form-control form-control-solid"
                        :class="{ 'is-invalid': errors['address.city'] }" placeholder="Enter city" required>
                    <Error v-if="errors['address.city']" :message="getErrorMessage(errors['address.city'])" />
                </div>
                <div class="d-flex col-md-4 flex-column mb-8">
                    <label class="required fs-6 fw-semibold mb-2">{{ t('student.street') }}</label>
                    <input v-model="form.address.street" type="text" class="form-control form-control-solid"
                        :class="{ 'is-invalid': errors['address.street'] }" placeholder="Enter street" required>
                    <Error v-if="errors['address.street']" :message="getErrorMessage(errors['address.street'])" />
                </div>
            </div>
            <!-- Date of Birth -->
            <div class="d-flex flex-column mb-8">
                <label class="required fs-6 fw-semibold mb-2">{{ t('student.date_of_birth') }}</label>
                <!--begin::Input-->
                <div class="position-relative d-flex align-items-center">
                    <!--begin::Icon-->
                    <i class="ki-duotone ki-calendar-8 fs-2 position-absolute mx-4">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        <span class="path3"></span>
                        <span class="path4"></span>
                        <span class="path5"></span>
                        <span class="path6"></span>
                    </i>
                    <input v-model="form.date_of_birth" class="form-control form-control-solid ps-12 flatpickr-input"
                        :class="{ 'is-invalid': errors.date_of_birth }" placeholder="Select a date" name="date_of_birth"
                        type="date" required>
                    <Error v-if="errors.date_of_birth" :message="getErrorMessage(errors.date_of_birth)" />
                </div>
            </div>
            <!-- Role -->
            <div class="row g-9 mb-8">
                <!-- Is Active -->
                <div class="d-flex col-md-4 flex-column mb-8">
                    <label class="required fs-6 fw-semibold mb-2">{{ t('student.is_active') }}</label>
                    <select class="form-select form-select-solid" v-model="form.is_active"
                        :class="{ 'is-invalid': errors.is_active }" data-control="select2" data-hide-search="true"
                        name="is_active" required>
                        <option disabled value="">Select Is Active...</option>
                        <option v-for="status in isActiveOptions" :key="status.value" :value="status.value">{{
                            status.label }}</option>
                    </select>
                    <Error v-if="errors.is_active" :message="getErrorMessage(errors.is_active)" />
                </div>
                <!-- Is Gender -->
                <div class="d-flex col-md-4 flex-column mb-8">
                    <label class="required fs-6 fw-semibold mb-2">{{ t('student.gender') }}</label>
                    <select class="form-select form-select-solid" v-model="form.gender"
                        :class="{ 'is-invalid': errors.gender }" data-control="select2" data-hide-search="true"
                        name="gender" required>
                        <option disabled value="">Select Is Gender...</option>
                        <option v-for="gender in genderOptions" :key="gender.value" :value="gender.value">{{
                            gender.label }}</option>
                    </select>
                    <Error v-if="errors.gender" :message="getErrorMessage(errors.gender)" />
                </div>
                <!-- Is Enrollment Status -->
                <div class="d-flex col-md-4 flex-column mb-8">
                    <label class="required fs-6 fw-semibold mb-2">{{ t('student.enrollment_status') }}</label>
                    <select class="form-select form-select-solid" v-model="form.enrollment_status"
                        :class="{ 'is-invalid': errors.enrollment_status }" data-control="select2"
                        data-hide-search="true" name="enrollment_status" required>
                        <option disabled value="">Select Is Enrollment Status...</option>
                        <option v-for="status in enrollmentStatusOptions" :key="status.value" :value="status.value">{{
                            status.label }}</option>
                    </select>
                    <Error v-if="errors.enrollment_status" :message="getErrorMessage(errors.enrollment_status)" />
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
import Modal from '@/components/modal/Modal'
import Error from '@/components/common/Error'
import api from '@/services/api'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
    modelValue: Boolean,
    isEdit: Boolean,
    studentData: Object,
    errors: {
        type: Object,
        default: () => ({})
    }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const form = reactive({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    phone: '',
    national_number: '',
    role: 'student',
    is_active: '',
    gender: '',
    enrollment_status: '',
    date_of_birth: '',
    address: {
        country: '',
        city: '',
        street: '',
    },
})

watch(() => props.studentData, (val) => {
    if (val) {
        const name = val.user.name.split(' ')
        form.first_name = name[0] || ''
        form.middle_name = name[1] || ''
        form.last_name = name[2] || ''
        form.email = val.user.email || ''
        form.phone = val.user.phone || ''
        form.national_number = val.user.national_number || ''
        form.role = val.user.role || 'student'
        form.is_active = val.user.is_active || ''
        form.gender = val.user.gender || ''
        form.enrollment_status = val.enrollment_status || ''
        form.date_of_birth = val.user.date_of_birth || ''
        form.address.country = val.user.address?.country || ''
        form.address.city = val.user.address?.city || ''
        form.address.street = val.user.address?.street || ''
    } else {
        form.first_name = ''
        form.middle_name = ''
        form.last_name = ''
        form.email = ''
        form.phone = ''
        form.national_number = ''
        form.role = 'student'
        form.is_active = ''
        form.gender = ''
        form.enrollment_status = ''
        form.date_of_birth = ''
        form.address = { country: '', city: '', street: '' }
    }
}, { immediate: true })

const restForm = () => {
    form.first_name = ''
    form.middle_name = ''
    form.last_name = ''
    form.email = ''
    form.phone = ''
    form.national_number = ''
    form.role = ''
    form.is_active = ''
    form.gender = ''
    form.enrollment_status = ''
    form.date_of_birth = ''
    form.address = { country: '', city: '', street: '' }
}

const handleSubmit = async () => {
    const dataFilter = Object.fromEntries(Object.entries(form).filter(([key, value]) => value !== ''))
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
    restForm()
    // errors.value = {}
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
// Load enrollment_status
const enrollmentStatusOptions = ref([])
const enrollmentStatusLoaded = ref(false)
const loadEnrollmentStatus = createEnumLoader(enrollmentStatusOptions, enrollmentStatusLoaded, '/enums/enrollment-status')
// Load Gender
const genderOptions = ref([])
const genderLoaded = ref(false)
const loadGender = createEnumLoader(genderOptions, genderLoaded, '/enums/gender')
// Load Is Active
const isActiveOptions = ref([])
const isActiveLoaded = ref(false)
const loadIsActive = createEnumLoader(isActiveOptions, isActiveLoaded, '/enums/is-active')

watch(() => props.modelValue, (val) => {
    if (val) {
        loadEnrollmentStatus()
        loadGender()
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
