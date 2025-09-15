<template>
    <Index>
        <!-- Index Page -->
        <template #content>
            <div class="card-header align-items-center py-5 gap-2 gap-md-5">
                <div class="card-title">
                    <div class="d-flex align-items-center position-relative my-1">
                        <h1>{{ t('menu.students') }}</h1>
                    </div>
                </div>
                <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
                    <!--begin::Add product-->
                    <button @click="openAddModal" class="btn btn-primary">{{ t('student.add') }}</button>
                    <router-link v-if="route.name == 'student'" :to="{ name: 'student.onlyTrashed' }"
                        class="btn btn-primary">{{ t('student.onlyTrashed') }}</router-link>
                    <router-link v-if="route.name == 'student.onlyTrashed'" :to="{ name: 'student' }"
                        class="btn btn-primary">{{ t('student.students_active') }}</router-link>
                    <Filter @submit="fetchStudents" />
                </div>
            </div>
            <!-- Table -->
            <Table>
                <template #thead>
                    <thead>
                        <tr class="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                            <th class="min-w-100px">ID</th>
                            <th v-for="n in thead" class=" min-w-100px">{{ n }}</th>
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
                            <td class="">
                                <span class="fw-bold text-capitalize">{{ item.user.name }}</span>
                            </td>
                            <td class="">
                                <span class="fw-bold">{{ item.user.email ?? '-' }}</span>
                            </td>
                            <td class="">
                                <span class="fw-bold">{{ item.user.phone ?? '-' }}</span>
                            </td>
                            <td class="">
                                <span class="fw-bold text-capitalize">{{ item.nationality ?? '-' }}</span>
                            </td>
                            <td class="">
                                <span class="fw-bold text-capitalize">{{ item.user.gender }}</span>
                            </td>
                            <td class="">
                                <div
                                    :class="`badge badge-light-${item.enrollment_status === 'active' ? 'success' : 'danger'}`">
                                    <span class="fw-bold text-capitalize">{{ item.enrollment_status }}</span>
                                </div>
                            </td>
                            <td class="">
                                <span class="fw-bold">{{ item.user.date_of_birth }}</span>
                            </td>
                            <td class="">
                                <div :class="`badge badge-light-${item.user.is_active ? 'success' : 'danger'}`">
                                    <span class="fw-bold text-capitalize">{{ item.user.is_active ? 'Active' :
                                        'Inactive' }}</span>
                                </div>
                            </td>
                            <td class="">
                                <span class="fw-bold text-capitalize">{{ item.user.address.country }}</span>
                            </td>
                            <td class="">
                                <span class="fw-bold text-capitalize">{{ item.user.address.city }}</span>
                            </td>
                            <td class="">
                                <span class="fw-bold text-capitalize">{{ item.user.address.street }}</span>
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
                                        <div v-if="route.name == 'student'" class="menu-item px-3">
                                            <a href="#" @click="deleteStudent(item.id)"
                                                class="menu-link px-3">{{ t('table.deleted') }}</a>
                                        </div>
                                        <div v-if="route.name == 'student.onlyTrashed'" class="menu-item px-3">
                                            <a href="#" @click="restoreStudent(item.id)"
                                                class="menu-link px-3">{{ t('table.restore') }}</a>
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
            <Create v-model="showModal" :isEdit="isEdit" :studentData="selectedStudent" @submit="handleSave"
                :errors="validationErrors" />
        </template>
    </Index>
</template>

<script setup>
import Index from '@/components/pages/Index'
import Table from '@/components/table/Table'
import Create from './Create.vue';
import Filter from './Filter.vue';
import api from '@/services/api'
import { RouterLink, useRouter, useRoute } from 'vue-router';
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const router = useRouter();
const route = useRoute()
// Table
const tbody = ref([]);
const thead = ref([
    t('student.name'), t('student.email'), t('student.phone'), t('student.nationality'), t('student.gender'), t('student.enrollment_status'), t('student.date_of_birth'), t('student.is_active'), t('student.country'), t('student.city'), t('student.street')
]);
// Modal
const showModal = ref(false)
const isEdit = ref(false)
const selectedStudent = ref(null)
const validationErrors = ref([])
const openAddModal = () => {
    isEdit.value = false
    selectedStudent.value = null
    showModal.value = true
}
const openEditModal = (student) => {
    isEdit.value = true
    selectedStudent.value = student
    showModal.value = true
}
const handleSave = async (studentData) => {
    try {
        validationErrors.value = []
        if (isEdit.value) {
            const response = await api.put(`student/update/${selectedStudent.value.id}`, studentData)
            showAlert(response.data.message, 'success')
        } else {
            const response = await api.post('student/create', studentData)
            showAlert(response.data.message, 'success')
        }
        showModal.value = false
        fetchStudents()
    } catch (error) {
        validationErrors.value = error.response.data.errors || {}
    }
}
// Alerts
const successMessage = ref(null)
const errorMessage = ref(null)

const deleteStudent = async (studentId) => {
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
                const response = await api.delete(`student/delete/${studentId}`)
                Swal.fire({
                    title: t('swal.deleted'),
                    text: response.data.message,
                    icon: "success"
                });
                await fetchStudents()
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

const restoreStudent = async (studentID) => {
    try {
        Swal.fire({
            title: t('swal.are_you_sure'),
            text: t('swal.you_wont_be_able_to_revert_this'),
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: t('swal.cancel'),
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: t('swal.yes_restore_it')
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: t('swal.restoring'),
                    text: t('swal.please_wait_while_we_restore'),
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: () => {
                        Swal.showLoading()
                    }
                })
                const response = await api.put(`student/restore/${studentID}`)
                Swal.fire({
                    title: t('swal.restored'),
                    text: response.data.message,
                    icon: "success"
                });
                await fetchStudents()
            }
        })
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: error,
            text: t('swal.failed_to_restore'),
        });
    }
}

const showAlert = (message, type = 'success') => {
    if (type === 'success') {
        successMessage.value = message
        errorMessage.value = ''
    } else {
        errorMessage.value = message
        successMessage.value = ''
    }

    setTimeout(() => {
        successMessage.value = ''
        errorMessage.value = ''
    }, 5000)
}


watch(() => route.name, (newName, oldName) => {
    if (newName !== oldName) {
        fetchStudents();
    }
});

const fetchStudents = async (e) => {
    try {
        if (route.name === 'student.onlyTrashed') {
            const response = await api.get('student/onlyTrashed', { params: e });
            const { data } = response.data;
            tbody.value = data;
        } else {
            const response = await api.get('student', { params: e });
            const { data } = response.data;
            tbody.value = data;
        }
    }
    catch (error) {
        console.error(error);
    }
}
fetchStudents()
</script>