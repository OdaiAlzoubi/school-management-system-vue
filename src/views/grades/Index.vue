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
                                    <h1>Grades</h1>
                                </div>
                                <!--begin::Card toolbar-->
                                <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
                                    <button @click="openAddModal" class="btn btn-primary">Add Grade</button>
                                    <!-- <Filter @submit="fetchTable" /> -->
                                </div>
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
                                                        value="1" />
                                                </div>
                                            </th>
                                            <th class="min-w-100px">id</th>
                                            <th class="min-w-100px">name</th>
                                            <th class="text-center min-w-100px">Sections Count</th>
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
                                                <span class="fw-bold">{{ item.uuid }}</span>
                                            </td>
                                            <td class="">
                                                <span class="fw-bold">{{ item.name }}</span>
                                            </td>
                                            <td class="text-center">
                                                <span class="fw-bold">{{ item.sections_count }}</span>
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
                                                        <div v-if="route.name == 'grade'" class="menu-item px-3">
                                                            <a href="#" @click="deletegrade(item.id)"
                                                                class="menu-link px-3">Delete</a>
                                                        </div>
                                                        <div v-if="route.name == 'grade.onlyTrashed'"
                                                            class="menu-item px-3">
                                                            <a href="#" @click="restoregrade(item.id)"
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
            <Create v-model="showModal" :isEdit="isEdit" :fromData="selectedItem" @submit="handleSave"
                :errors="validationErrors" />
        </template>
    </Master>
</template>

<script setup>
import Master from '@/components/MainContent.vue'
import Alert from '@/components/common/Alert.vue';
import api from '@/services/api'
import Create from '@/views/grades/Create';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()

// Modal
const showModal = ref(false)
const isEdit = ref(false)
const selectedItem = ref(null)
// Alerts
const validationErrors = ref([])
const successMessage = ref(null)
const errorMessage = ref(null)

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

const handleSave = async (fromData) => {
    try {
        validationErrors.value = []
        if (isEdit.value) {
            const response = await api.put(`grade/update/${selectedItem.value.id}`, fromData)
            Swal.fire({
                icon: "success",
                title: response.data.message,
                showConfirmButton: false,
                timer: 2500
            });
        } else {
            const response = await api.post('grade/create', fromData)
            Swal.fire({
                icon: "success",
                title: response.data.message,
                showConfirmButton: false,
                timer: 2500
            });
        }
        showModal.value = false
        fetchTable()
    } catch (error) {
        validationErrors.value = error.response.data.errors || {}
    }
}

const tbody = ref([])
const fetchTable = async (e) => {
    try {
        const response = await api.get('/grade', { params: e });
        const { data } = response.data;
        tbody.value = data;
    }
    catch (error) {
        console.error(error);
    }
}

watch(() => route.name, (newName, oldName) => {
    if (newName !== oldName) {
        fetchTable();
    }
});

fetchTable();
</script>