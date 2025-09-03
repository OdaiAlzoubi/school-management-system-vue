<template>
    <Master>
        <template #content>
            <Alert :successMessage="successMessage" :errorMessage="errorMessage" />
            <div class="content d-flex flex-column flex-column-fluid">
                <div class="post d-flex flex-column-fluid">
                    <div class="container-xxl" style="max-width: none;">
                        <div class="card card-flush">
                            <div class="card-header align-items-center py-5 gap-2 gap-md-5">
                                <!--begin::Card title-->
                                <div class="card-title">
                                </div>
                                <!--begin::Card toolbar-->
                                <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
                                    <!--begin::Add product-->
                                    <button @click="openAddModal" class="btn btn-primary">Add Student</button>
                                    <router-link v-if="route.name == 'student'" :to="{ name: 'student.onlyTrashed' }"
                                        class="btn btn-primary">Student Trashed</router-link>
                                    <router-link v-if="route.name == 'student.onlyTrashed'" :to="{ name: 'student' }"
                                        class="btn btn-primary">Student Active</router-link>
                                    <Filter @submit="fetchStudents" />
                                </div>
                                <!--end::Card toolbar-->
                            </div>
                            <!-- Table -->
                            <div class="card-body pt-0 table-responsive">
                                <table class="table align-middle table-row-dashed fs-6 gy-5">
                                    <thead>
                                        <tr class="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                                            <th class="w-10px pe-2">
                                                <div
                                                    class="form-check form-check-sm form-check-custom form-check-solid me-3">
                                                    <input class="form-check-input" type="checkbox" data-kt-check="true"
                                                        data-kt-check-target="#kt_ecommerce_products_table .form-check-input"
                                                        value="1" />
                                                </div>
                                            </th>
                                            <th class="min-w-100px">id</th>
                                            <!-- <th v-for="n in thead" class=" min-w-100px">{{ n }}</th> -->
                                            <th class=" min-w-100px">name</th>
                                            <th class=" min-w-100px">email</th>
                                            <th class=" min-w-100px">phone</th>
                                            <th class=" min-w-100px">nationality</th>
                                            <th class=" min-w-100px">gender</th>
                                            <th class=" min-w-100px">Enrollment Status</th>
                                            <th class=" min-w-100px">date_of_birth</th>
                                            <th class=" min-w-100px">is_active</th>
                                            <th class=" min-w-100px">country</th>
                                            <th class=" min-w-100px">city</th>
                                            <th class=" min-w-100px">street</th>
                                            <th class="text-end min-w-100px">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody class="fw-semibold text-gray-600">
                                        <tr v-for="(item, index) in tbody" :key="index">
                                            <td>
                                                <div
                                                    class="form-check form-check-sm form-check-custom form-check-solid">
                                                    <input class="form-check-input" type="checkbox" value="1" />
                                                </div>
                                            </td>
                                            <td class="">
                                                <span class="fw-bold">{{ item.id }}</span>
                                            </td>
                                            <td class="">
                                                <span class="fw-bold">{{ item.user.name }}</span>
                                            </td>
                                            <td class="">
                                                <span class="fw-bold">{{ item.user.email ?? '-' }}</span>
                                            </td>
                                            <td class="">
                                                <span class="fw-bold">{{ item.user.phone ?? '-' }}</span>
                                            </td>
                                            <td class="">
                                                <span class="fw-bold">{{ item.nationality ?? '-' }}</span>
                                            </td>
                                            <td class="">
                                                <span class="fw-bold">{{ item.user.gender }}</span>
                                            </td>
                                            <td class="">
                                                <div
                                                    :class="`badge badge-light-${item.enrollment_status === 'active' ? 'success' : 'danger'}`">
                                                    <span class="fw-bold">{{ item.enrollment_status }}</span>
                                                </div>
                                            </td>
                                            <td class="">
                                                <span class="fw-bold">{{ item.user.date_of_birth }}</span>
                                            </td>
                                            <td class="">
                                                <div
                                                    :class="`badge badge-light-${item.user.is_active ? 'success' : 'danger'}`">
                                                    <span class="fw-bold">{{ item.user.is_active ? 'Active' :
                                                        'Inactive' }}</span>
                                                </div>
                                            </td>
                                            <td class="">
                                                <span class="fw-bold">{{ item.user.address.country }}</span>
                                            </td>
                                            <td class="">
                                                <span class="fw-bold">{{ item.user.address.city }}</span>
                                            </td>
                                            <td class="">
                                                <span class="fw-bold">{{ item.user.address.street }}</span>
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
                                                            <a href="#" @click="openEditModal(item)"
                                                                class="menu-link px-3">Edit</a>
                                                        </div>
                                                        <div v-if="route.name == 'student'" class="menu-item px-3">
                                                            <a href="#" @click="deleteStudent(item.id)"
                                                                class="menu-link px-3">Delete</a>
                                                        </div>
                                                        <div v-if="route.name == 'student.onlyTrashed'"
                                                            class="menu-item px-3">
                                                            <a href="#" @click="restoreStudent(item.id)"
                                                                class="menu-link px-3">Restore</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal v-model="showModal" :isEdit="isEdit" :studentData="selectedStudent" @submit="handleSave"
                :errors="validationErrors" />
        </template>
    </Master>
</template>

<script setup>
import Master from '@/components/MainContent.vue'
import Modal from './Create.vue';
import Filter from './Filter.vue';
import api from '@/services/api'
import { RouterLink, useRouter, useRoute } from 'vue-router';
import { ref, watch } from 'vue'
import Alert from '@/components/common/Alert.vue';

const router = useRouter();
const route = useRoute()
// Table
const tbody = ref([]);
const thead = ref(['id', 'name']);
// Modal
const showModal = ref(false)
const isEdit = ref(false)
const selectedStudent = ref(null)
// Alerts
const validationErrors = ref([])
const successMessage = ref(null)
const errorMessage = ref(null)

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

const deleteStudent = async (studentId) => {
    if (confirm('Are you sure you want to delete this student?')) {
        try {
            const response = await api.delete(`student/delete/${studentId}`)
            showAlert(response.data.message, 'success')
            await fetchStudents()
        } catch (error) {
            console.error('Error deleting student:', error)
            if (error.response && error.response.data && error.response.data.message) {
                showAlert(error.response.data.message, 'error')
            } else {
                showAlert('An error occurred while deleting the student', 'error')
            }
        }
    }
}

const restoreStudent = async (studentID) => {
    if (confirm('Are you sure you want to restore this student?')) {
        try {
            const response = await api.put(`student/restore/${studentID}`)
            showAlert(response.data.message, 'success')
            await fetchStudents()
        } catch (error) {
            console.error('Error restoring student:', error)
            if (error.response && error.response.data && error.response.data.message) {
                showAlert(error.response.data.message, 'error')
            } else {
                showAlert('An error occurred while restoring the student', 'error')
            }
        }
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