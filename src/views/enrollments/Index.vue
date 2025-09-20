<template>
    <Index>
        <template #content>
            <div class="card-header align-items-center py-5 gap-2 gap-md-5">
                <div class="card-title">
                    <h1>{{ t('menu.enrollments') }}</h1>
                </div>
                <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
                    <button @click="openAddModal" class="btn btn-primary">{{ t('enrollment.add') }}</button>
                </div>
            </div>
            <Table>
                <template #thead>
                    <thead>
                        <tr class="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                            <th class=" min-w-100px">id</th>
                            <th v-for="n in thead" class=" min-w-100px text-center">{{ n }}</th>
                            <th class="text-end min-w-100px">{{ t('table.actions') }}</th>
                        </tr>
                    </thead>
                </template>
                <template #tbody>
                    <tbody class="fw-semibold text-gray-600 text-capitalize">
                        <tr v-for="(item, index) in tbody" :key="index">
                            <td class="">
                                <span class="fw-bold">{{ item.id }}</span>
                            </td>
                            <td class="text-center">
                                <span class="fw-bold">{{ item.student.user.name }}</span>
                            </td>
                            <td class="text-center">
                                <span class="fw-bold">{{ item.section.name }}</span>
                            </td>
                            <td class="text-center">
                                <span class="fw-bold">{{ item.academic_year.name }}</span>
                            </td>
                            <td class="text-center">
                                <span class="fw-bold">{{ item.grade.name }}</span>
                            </td>
                            <td class="text-center">
                                <span class="fw-bold">{{ item.admission_date ?? '-' }}</span>
                            </td>
                            <td class="text-center">
                                <span class="fw-bold">{{ item.status }}</span>
                            </td>
                            <td class="text-center">
                                <span class="fw-bold">{{ item.graduation_date ?? '-' }}</span>
                            </td>
                            <td class="text-center">
                                <span class="fw-bold">{{ item.reason ?? '-' }}</span>
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
                    </tbody>
                </template>
            </Table>
        </template>
        <template #modal>
            <Form v-model="showModal" :isEdit="isEdit" :formData="selectedItem" @submit="handleSave"
                :errors="validationErrors" />
        </template>
    </Index>

</template>
<script setup>
import Index from '@/components/pages/Index'
import Table from '@/components/table/Table'
import Form from '@/views/enrollments/Form'
import api from '@/services/api'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

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
const openEditModal = (grade) => {
    isEdit.value = true
    selectedItem.value = grade
    showModal.value = true
}
const handleSave = async (formData) => {
    try {
        validationErrors.value = [];
        let response;
        if (isEdit.value) {
            console.log('is Edit')
            response = await api.put(`enrollment/update/${selectedItem.value.id}`, formData)
        } else {
            console.log('is Create')
            response = await api.post('enrollment/create', formData)
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
        validationErrors.value = error.response.data.errors || {}
    }
}
// Table
const thead = ref([t('enrollment.student'), t('enrollment.section'), t('enrollment.academic_year'), t('enrollment.grade'), t('enrollment.admission_date'), t('enrollment.status'), t('enrollment.graduation_date'), t('enrollment.reason')])
const tbody = ref(null)
const fetchTable = async (e) => {
    try {
        const response = await api.get('/enrollment', { params: e });
        const { data } = response.data;
        tbody.value = data;
    }
    catch (error) {
        console.error(error);
    }
};
fetchTable()
</script>