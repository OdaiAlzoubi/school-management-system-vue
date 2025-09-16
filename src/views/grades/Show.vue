<template>
    <Index>
        <template #content>
            <div class="container-xxl">
                <!-- Loading -->
                <div v-if="!profile" class="text-center py-10">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-3">جاري التحميل...</p>
                </div>
                <!-- Header -->
                <div v-else class="card mb-6 mb-xl-9">
                    <div class="card-body pt-9 pb-0">
                        <div class="d-flex flex-wrap flex-sm-nowrap mb-6">
                            <div
                                class="d-flex flex-center flex-shrink-0 bg-light rounded w-100px h-100px w-lg-150px h-lg-150px me-7 mb-4">
                                <img class="mw-50px mw-lg-75px" src="#" alt="image" />
                            </div>
                            <div class="flex-grow-1">
                                <div class="d-flex justify-content-between align-items-start flex-wrap mb-2">
                                    <div class="d-flex flex-column">
                                        <div class="d-flex align-items-center mb-1">
                                            <span class="text-gray-800 text-hover-primary fs-2 fw-bold me-3">{{
                                                profile.name }}</span>
                                            <span class="badge badge-light-success me-auto">{{ profile.code }}</span>
                                        </div>
                                        <div class="d-flex flex-wrap fw-semibold mb-4 fs-5 text-gray-500">{{
                                            profile.description }}</div>
                                    </div>
                                    <div class="d-flex mb-4">
                                        <a href="#" class="btn btn-sm btn-primary me-3" data-bs-toggle="modal">Add
                                            Section</a>
                                        <a href="#" class="btn btn-sm" @click.prevent="goBack">
                                            <i class="fa-solid fa-backward"></i>
                                        </a>
                                    </div>
                                </div>
                                <div class="d-flex flex-wrap justify-content-start">
                                    <div class="d-flex flex-wrap">
                                        <!--  -->
                                        <div
                                            class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                            <div class="d-flex align-items-center">
                                                <div class="fs-4 fw-bold">{{ profile.sections_count }}</div>
                                            </div>
                                            <div class="fw-semibold fs-6 text-gray-500">Sections</div>
                                        </div>
                                        <div
                                            class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                            <div class="d-flex align-items-center">
                                                <div class="fs-4 fw-bold">{{ profile.sections_count }}</div>
                                            </div>
                                            <div class="fw-semibold fs-6 text-gray-500">Sections</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="separator"></div>
                        <ul class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold">
                            <li class="nav-item">
                                <a class="nav-link text-active-primary py-5 me-6 active"
                                    href="apps/projects/project.html">Overview</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- Body -->
                <div class="row gx-6 gx-xl-9">
                    <!-- Section -->
                    <div v-for="section in sections" class="col-lg-6">
                        <div class="card card-flush h-lg-100">
                            <!--begin::Card header-->
                            <div class="card-header mt-6">
                                <div class="card-title flex-column">
                                    <h3 class="fw-bold mb-1">{{ section.name }}</h3>
                                    <div class="fs-6 fw-semibold text-gray-500">Count Students</div>
                                </div>
                                <div class="card-toolbar">
                                    <a href="#" class="btn btn-light btn-sm">Edit</a>
                                </div>
                            </div>
                            <!--begin::Card body-->
                            <div class="card-body p-9 pt-5">
                                <div class="d-flex flex-wrap">
                                    <!--begin::Labels-->
                                    <div class="d-flex flex-column justify-content-center flex-row-fluid pe-11 mb-5">
                                        <div class="d-flex fs-6 fw-semibold align-items-center mb-3">
                                            <div class="bullet bg-primary me-3"></div>
                                            <div class="text-gray-500">{{ t('section.name') }}</div>
                                            <div class="ms-auto fw-bold text-gray-700">{{ section.name }}</div>
                                        </div>
                                        <div class="d-flex fs-6 fw-semibold align-items-center mb-3">
                                            <div class="bullet bg-success me-3"></div>
                                            <div class="text-gray-500">{{ t('section.capacity') }}</div>
                                            <div class="ms-auto fw-bold text-gray-700">{{ section.capacity }}</div>
                                        </div>
                                        <div class="d-flex fs-6 fw-semibold align-items-center mb-3">
                                            <div class="bullet bg-danger me-3"></div>
                                            <div class="text-gray-500">{{ t('section.room') }}</div>
                                            <div class="ms-auto fw-bold text-gray-700">{{ section.room }}</div>
                                        </div>
                                        <div class="d-flex fs-6 fw-semibold align-items-center">
                                            <div class="bullet bg-gray-300 me-3"></div>
                                            <div class="text-gray-500">{{ t('section.shift') }}</div>
                                            <div class="ms-auto fw-bold text-gray-700">{{ section.shift }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </Index>
</template>
<script setup>
import Index from '@/components/pages/Index'
import api from '@/services/api'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const router = useRouter()
const route = useRoute()
// Back
const goBack = () => {
    router.go(-1);
}
// Get Api
const sections = ref([])
const profile = ref()
const getGrade = async () => {
    try {
        const response = await api.get(`grade/show/${route.params.id}`)
        const { data } = response.data;
        profile.value = data;
        sections.value = data.sections;
    } catch (error) {
        console.error(error);
    }
}
getGrade()
</script>