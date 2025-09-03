<template>
    <div class="content d-flex flex-column flex-column-fluid" id="kt_content">
        <div class="post d-flex flex-column-fluid" id="kt_post">
            <div id="kt_content_container" class="container-xxl">
                <div class="card-header align-items-center py-5 gap-2 gap-md-5">
                    <!--begin::Card title-->
                    <div class="card-title">
                    </div>
                    <!--begin::Card toolbar-->
                    <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
                        <!--begin::Add product-->
                        <!-- <a href="" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addItemModal" >Add Product</a> -->
                        <button class="btn btn-primary" @click="showModal = true">Open Modal</button>
                        <Modal :modelValue="showModal">
                            <!-- <NewTargetForm @submit="handleSubmit" @cancel="showModal = false" /> -->
                        </Modal>
                    </div>
                    <!--end::Card toolbar-->
                </div>
                <!-- Table -->
                <div class="card-body pt-0">
                    <table class="table align-middle table-row-dashed fs-6 gy-5" id="kt_ecommerce_products_table">
                        <Thead :thead="thead" />
                        <Tbody :tbody="tbody" />
                    </table>
                </div>
                <!-- End Table -->
            </div>
        </div>
    </div>
</template>

<script setup>
import Thead from './Thead.vue'
import Tbody from './Tbody.vue'

const props = defineProps({ thead: Array, tbody: Array });

import { ref } from 'vue';
import Modal from '@/components/modal/Modal.vue';
import NewTargetForm from '@/views/categories/Create.vue';

const showModal = ref(false);

const handleSubmit = (data) => {
    console.log('Submitted Target:', data);
    showModal.value = false;
};
</script>
