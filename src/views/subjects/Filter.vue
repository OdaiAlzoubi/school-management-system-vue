<template>
    <div class="d-flex justify-content-end">
        <div class="dropdown">
            <button class="btn btn-light-primary me-3 dropdown-toggle" type="button" id="dropdownMenuButton"
                @click="applyFilter" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="ki-duotone ki-filter fs-2">
                    <span class="path1"></span>
                    <span class="path2"></span>
                </i>
                Filter
            </button>
            <form @submit="handleSubmit" class="form-inline">
                <ul class="dropdown-menu dropdown-menu-end w-300px w-md-325px overflow-auto" style="max-height: 60vh;"
                    aria-labelledby="dropdownMenuButton">
                    <!-- Header -->
                    <li class="px-7 py-5">
                        <div class="fs-5 text-gray-900 fw-bold">Filter Options</div>
                    </li>
                    <li>
                        <hr class="dropdown-divider border-gray-200">
                    </li>
                    <li class="px-7 py-5">
                        <!-- ID -->
                        <div class="mb-10">
                            <label class="form-label fs-6 fw-semibold">ID</label>
                            <input v-model="filter.id" type="number" name="id" class="form-control mb-2"
                                placeholder="ID" />
                        </div>
                        <div class="mb-10">
                            <label class="form-label fs-6 fw-semibold">Is Active</label>
                            <select v-model="filter.is_active" name="is_active"
                                class="form-select form-select-solid form-select-lg fw-semibold">
                                <option disabled value="">Select Is Active...</option>
                                <option value="1">Active</option>
                                <option value="0">InActive</option>
                            </select>
                        </div>
                        <div class="mb-10">
                            <label class="form-label fs-6 fw-semibold">Grade</label>
                            <select v-model="filter.grade_id" name="grade_id"
                                class="form-select form-select-solid form-select-lg fw-semibold">
                                <option disabled value="">Select Is Grade...</option>
                                <option v-for="grade in gradeOptions" :key="grade.id" :value="grade.id">{{ grade.name }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-10">
                            <label class="form-label fs-6 fw-semibold">Is Offered</label>
                            <select v-model="filter.is_offered" name="is_offered"
                                class="form-select form-select-solid form-select-lg fw-semibold">
                                <option disabled value="">Select Is Offered...</option>
                                <option value="1">True</option>
                                <option value="0">False</option>
                            </select>
                        </div>
                        <div class="mb-10">
                            <label class="form-label fs-6 fw-semibold">created at from</label>
                            <input v-model="filter.start_date" type="date" name="start_date" id="created_at_from"
                                class="form-control mb-2" placeholder="Organization created at">
                        </div>
                        <div class="mb-10">
                            <label class="form-label fs-6 fw-semibold">created at to</label>
                            <input v-model="filter.end_date" type="date" name="end_date" id="created_at_to"
                                class="form-control mb-2" placeholder="Organization created at">
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-light btn-active-light-primary fw-semibold me-2 px-6"
                                data-bs-dismiss="dropdown" @click="resetFilter">Reset</button>
                            <button type="submit" class="btn btn-primary fw-semibold px-6">Apply</button>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref, watch } from 'vue';
import api from '@/services/api'

const filter = reactive({
    id: '',
    is_active: '',
    grade_id: '',
    is_offered: '',
    start_date: '',
    end_date: '',
});

const resetFilter = (e) => {
    e.preventDefault();
    filter.id = '';
    filter.is_active = '';
    filter.grade_id = '';
    filter.is_offered = '';
    filter.start_date = '';
    filter.end_date = '';
}

const handleSubmit = (e) => {
    e.preventDefault();
    const dataFilter = Object.fromEntries(Object.entries(filter).filter(([key, value]) => value !== ''));
    console.log(dataFilter)
    emit('submit', dataFilter)
}
const emit = defineEmits(['submit'])

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
const applyFilter = () => {
        loadGrades()
}
</script>