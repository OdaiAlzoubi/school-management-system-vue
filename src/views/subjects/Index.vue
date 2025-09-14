<template>
    <Index>
        <template #content>
            <div class="card-header align-items-center py-5 gap-2 gap-md-5">
                <!--begin::Card title-->
                <div class="card-title">
                    <h1>{{ t('menu.subjects') }}</h1>
                </div>
                <!--begin::Card toolbar-->
                <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
                    <button @click="openAddModal" class="btn btn-primary">{{ t('subject.add')
                    }}</button>
                </div>
                <Filter @submit="fetchTable" />
            </div>
            <!-- Loading -->
            <div v-if="loading" class="text-center py-10">
                <span class="spinner-border text-primary" role="status"></span>
                <span class="ms-2">Loading data...</span>
            </div>
            <Table>
                <template #thead>
                    <thead>
                        <tr class="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                            <th class="min-w-100px text-center">id</th>
                            <th v-for="n in thead" class="min-w-100px text-center">{{ n }}</th>
                            <th class="text-end min-w-100px">{{ t('table.actions') }}</th>
                        </tr>
                    </thead>
                </template>
                <template #tbody>
                    <tbody class="fw-semibold text-gray-600">
                        <tr v-for="(item, index) in tbody" :key="index">
                            <td class="text-center">
                                <span class="fw-bold">{{ item.id }}</span>
                            </td>
                            <td class="text-center">
                                <span class="fw-bold text-truncate">{{ item.name }}</span>
                            </td>
                            <td class="text-center">
                                <span class="fw-bold">{{ item.code ?? '-' }}</span>
                            </td>
                            <td class="text-center">
                                <span class="fw-bold">{{ item.description ?? '-' }}</span>
                            </td>
                            <td class="text-center">
                                <span class="fw-bold">{{ item.grade.name ?? '-' }}</span>
                            </td>
                            <td class="text-center">
                                <span class="fw-bold">{{ item.type }}</span>
                            </td>
                            <td class="text-center">
                                <span class="fw-bold">{{ item.min_passing_score }}</span>
                            </td>
                            <td class="text-center">
                                <span class="fw-bold">{{ item.credit_hours }}</span>
                            </td>
                            <td class="text-center">
                                <span class="fw-bold">{{ item.theory_hours }}</span>
                            </td>
                            <td class="text-center">
                                <span class="fw-bold">{{ item.practice_hours }}</span>
                            </td>
                            <td class="text-center">
                                <span class="fw-bold">{{ item.assessment_weights ?? '-' }}</span>
                            </td>
                            <td class="text-center">
                                <span class="fw-bold">{{ item.prerequisite_required }}</span>
                            </td>
                            <td class="text-center">
                                <div :class="`badge badge-light-${item.is_active ? 'success' : 'danger'}`">
                                    <span class="fw-bold">{{ item.is_active ? 'Active' :
                                        'Inactive' }}</span>
                                </div>
                            </td>
                            <td class="text-center">
                                <div :class="`badge badge-light-${item.is_offered ? 'success' : 'danger'}`">
                                    <span class="fw-bold">{{ item.is_offered ? 'True' :
                                        'False' }}</span>
                                </div>
                            </td>
                            <td class="text-end">
                                <div class="dropdown">
                                    <a href="#"
                                        class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary"
                                        data-bs-toggle="dropdown" aria-expanded="false"><i
                                            class="ki-solid ki-dots-horizontal fs-2x"></i>
                                    </a>
                                    <!--begin::Menu-->
                                    <div class=" dropdown-menu menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4"
                                        data-kt-menu="true">
                                        <div class="menu-item px-3">
                                            <a href="#" @click="openEditModal(item)" class="menu-link px-3">{{
                                                t('table.edit') }}</a>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="tbody.length === 0">
                            <td colspan="14" class="text-center text-muted py-5">No data available</td>
                        </tr>
                    </tbody>
                </template>
            </Table>
        </template>
        <template #modal>
            <Create v-model="showModal" :isEdit="isEdit" :formData="selectedItem" @submit="handleSave"
                :errors="validationErrors" />
        </template>
    </Index>
</template>

<script setup>
import Index from '@/components/pages/Index'
import Table from '@/components/table/Table'
import Filter from '@/views/subjects/Filter.vue'
import Create from '@/views/subjects/Create.vue'
import api from '@/services/api'
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

// Modal
const showModal = ref(false)
const isEdit = ref(false)
const selectedItem = ref(null)
const validationErrors = ref([])
const openAddModal = () => {
    isEdit.value = false
    selectedItem.value = null
    showModal.value = true
}
const openEditModal = (item) => {
    isEdit.value = true
    selectedItem.value = item
    showModal.value = true
}
const handleSave = async (formData) => {
    try {
        validationErrors.value = []
        let response
        if (isEdit.value) {
            response = await api.put(`subject/update/${selectedItem.value.id}`, formData)
        } else {
            response = await api.post('subject/create', formData)
        }
        Swal.fire({
            icon: "success",
            title: response.data.message,
            showConfirmButton: false,
            timer: 2500
        });
        showModal.value = false
        fetchTable()
    } catch (error) {
        validationErrors.value = error.response.data.errors || []
    }
}
// Table
const thead = ref([
    t('subject.name'), t('subject.code'), t('subject.description'), t('subject.grade'), t('subject.type'), t('subject.min_passing_score'), t('subject.credit_hours'), t('subject.theory_hours'), t('subject.practice_hours'), t('subject.assessment_weights'), t('subject.prerequisite_required'), t('subject.is_active'), t('subject.is_offered')

])
const tbody = ref([])
const loading = ref(false)
const fetchTable = async (e) => {
    try {
        loading.value = true;
        const response = await api.get('/subject', { params: e });
        const { data } = response.data;
        tbody.value = data;
    }
    catch (error) {
        console.error(error);
    }
    finally {
        loading.value = false
    }
}
fetchTable();
</script>