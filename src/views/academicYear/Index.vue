<template>
    <Index>
        <template #content>
            <!--  -->
            <div class="card-header align-items-center py-5 gap-2 gap-md-5">
                <div class="card-title">
                    <div class="d-flex align-items-center position-relative my-1">
                        <h1>{{ t('menu.academic_year') }}</h1>
                    </div>
                </div>
                <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
                    <!--begin::Add product-->
                    <button @click="openAddModal" class="btn btn-primary">{{ t('academicYear.add') }}</button>
                </div>
            </div>
            <!--  -->
            <Table>
                <template #thead>
                    <thead>
                        <tr class="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                            <th class="min-w-100px">ID</th>
                            <th v-for="n in thead" class=" min-w-100px text-center">{{ n }}</th>
                            <th class="text-end min-w-100px">{{ t('table.actions') }}</th>
                        </tr>
                    </thead>
                </template>
                <template #tbody>
                    <tbody class="fw-semibold text-gray-600">
                        <tr v-for="(item, index) in tbody" :key="index">
                            <td class="">
                                <span class="fw-bold">{{ item.id }}</span>
                            </td>
                            <td class="text-center">
                                <span class="fw-bold">{{ item.name }}</span>
                            </td>
                            <td class="text-center">
                                <div :class="`badge badge-light-${item.is_active ? 'success' : 'danger'}`">
                                    <span class="fw-bold text-capitalize">{{ item.is_active ? 'Active' :
                                        'Inactive' }}</span>
                                </div>
                            </td>
                            <td class="text-center">
                                <span class="fw-bold">{{ item.start_date }}</span>
                            </td>
                            <td class="text-center">
                                <span class="fw-bold">{{ item.end_date }}</span>
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
                                        <div class="menu-item px-3">
                                            <a href="#" @click="deleteItem(item.id)" class="menu-link px-3">{{
                                                t('table.deleted') }}</a>
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
            <Create v-model="showModal" :isEdit="isEdit" :formData="selectedItem" @submit="handleSave"
                :errors="validationErrors" />

        </template>
    </Index>
</template>
<script setup>
import Index from '@/components/pages/Index'
import Table from '@/components/table/Table'
import Create from '@/views/academicYear/Create.vue'
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
        let response;
        if (isEdit.value) {
            response = await api.put(`academic-year/update/${selectedItem.value.id}`, formData)
        } else {
            response = await api.post('academic-year/create', formData)
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
// Delete
const deleteItem = async (id) => {
    try {
        Swal.fire({
            title: t('swal.are_you_sure'),
            text: t('swal.you_wont_be_able_to_revert_this'),
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: t('swal.cancel'),
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: t('swal.yes_delete_it')
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: t('swal.deleting'),
                    text: t('swal.please_wait_while_we_delete'),
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: () => {
                        Swal.showLoading()
                    }
                })
                const response = await api.delete(`academic-year/delete/${id}`)
                Swal.fire({
                    title: t('swal.deleted'),
                    text: response.data.message,
                    icon: "success"
                });
                await fetchTable()
            }
        })
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: error,
            text: t('swal.failed_to_delete'),
        });
    }
}

// Table
const thead = ref([
    t('academicYear.name'), t('academicYear.is_active'), t('academicYear.start_date'), t('academicYear.end_date')
]);
const tbody = ref([])
const fetchTable = async (e) => {
    try {
        const response = await api.get('/academic-year')
        const { data } = response.data
        tbody.value = data
    } catch (errors) {
        console.error(errors)
    }
}
fetchTable()
</script>