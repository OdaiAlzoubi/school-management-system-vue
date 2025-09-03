<template>
    <div class="d-flex flex-column flex-root">
        <div class="page d-flex flex-row flex-column-fluid">
            <!--begin::Sidebar-->
            <Sidebar />
            <!--end::Sidebar-->
            <div class="wrapper d-flex flex-column flex-row-fluid">
                <!--begin::Header-->
                <Header />
                <!--begin::Content-->
                <slot name="content"></slot>
                <!--begin::Footer-->
                <Footer />
            </div>
        </div>
    </div>
    <!--begin::Scrolltop-->
    <div id="kt_scrolltop" class="scrolltop" data-kt-scrolltop="true">
        <i class="ki-duotone ki-arrow-up">
            <span class="path1"></span>
            <span class="path2"></span>
        </i>
    </div>
</template>

<script setup>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import Sidebar from '@/components/layout/Sidebar.vue';
</script>