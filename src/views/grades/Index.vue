<template>
    <Index>
        <template #content>
            <div class="card-header align-items-center py-5 gap-2 gap-md-5">
                <div class="card-title">
                    <h1>{{ t('menu.grades') }}</h1>
                </div>
                <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
                    <button @click="openAddModal" class="btn btn-primary">{{ t('grade.add') }}</button>
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
                                <span class="fw-bold">{{ item.name }}</span>
                            </td>
                            <td class="text-center">
                                <router-link :to="{ name: 'grades.show', params: { id: item.id } }" class="fw-bold">{{
                                    item.sections_count
                                    }}</router-link>
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
            <Create v-model="showModal" :isEdit="isEdit" :fromData="selectedItem" @submit="handleSave"
                :errors="validationErrors" />
            <!-- <Show v-model="showShowModal" :itemShow="itemShow"/> -->
        </template>
    </Index>
</template>

<script setup>
import Index from '@/components/pages/Index'
import Table from '@/components/table/Table'
import Create from '@/views/grades/Create';
// import Show from '@/views/grades/Show';
import api from '@/services/api'
import { useI18n } from 'vue-i18n'
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router'

const { t } = useI18n()
const route = useRoute()

// Show
const showShowModal = ref(false)
const itemShow = ref(null)
const openShowModal = (item) => {
    itemShow.value = item;
    showShowModal.value = true;
}
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

const thead = ref([
    t('grade.name'), t('grade.sections_count')
]);
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