<template>
    <div class="d-flex justify-content-end">
        <div class="dropdown">
            <button class="btn btn-light-primary me-3 dropdown-toggle" type="button" id="dropdownMenuButton"
                data-bs-toggle="dropdown" aria-expanded="false">
                <i class="ki-duotone ki-filter fs-2">
                    <span class="path1"></span>
                    <span class="path2"></span>
                </i>
                {{ t('table.filter') }}
            </button>
            <form @submit="handleSubmit" class="form-inline">
                <ul class="dropdown-menu dropdown-menu-end w-300px w-md-325px overflow-auto" style="max-height: 60vh;"
                    aria-labelledby="dropdownMenuButton">
                    <!-- Header -->
                    <li class="px-7 py-5">
                        <div class="fs-5 text-gray-900 fw-bold">{{ t('table.filter') }}</div>
                    </li>
                    <li>
                        <hr class="dropdown-divider border-gray-200">
                    </li>
                    <li class="px-7 py-5">
                        <!-- ID -->
                        <div class="mb-10">
                            <label class="form-label fs-6 fw-semibold">ID</label>
                            <input v-model="filter.id" type="number" name="id" class="form-control mb-2"
                                placeholder="Batch ID" />
                        </div>
                        <div class="mb-10">
                            <label class="form-label fs-6 fw-semibold">Is Active</label>
                            <select v-model="filter.is_active" name="is_active" aria-label="Select a Country"
                                data-control="" data-placeholder="Select a is_active..."
                                class="form-select form-select-solid form-select-lg fw-semibold">
                                <option value=""></option>
                                <option value="1">Active</option>
                                <option value="0">InActive</option>
                            </select>
                        </div>
                        <div class="mb-10">
                            <label class="form-label fs-6 fw-semibold">Country</label>
                            <select v-model="filter.country" name="country" aria-label="Select a Country"
                                data-control="" data-placeholder="Select a country..."
                                class="form-select form-select-solid form-select-lg fw-semibold">
                                <option value=""></option>
                                <option value="Syria">Syria</option>
                                <option value="india">India</option>
                            </select>
                        </div>
                        <div class="mb-10">
                            <label class="form-label fs-6 fw-semibold">Gender</label>
                            <select v-model="filter.gender" name="gender" aria-label="Select a Country" data-control=""
                                data-placeholder="Select a gender..."
                                class="form-select form-select-solid form-select-lg fw-semibold">
                                <option value=""></option>
                                <option value="male">male</option>
                                <option value="female">female</option>
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
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const filter = reactive({
    id: '',
    is_active: '',
    country: '',
    gender: '',
    start_date: '',
    end_date: '',
});

const resetFilter = (e) => {
    e.preventDefault();
    filter.id = '';
    filter.is_active = '';
    filter.country = '';
    filter.gender = '';
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
</script>