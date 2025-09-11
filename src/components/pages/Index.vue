<template>
    <Master>
        <template #content>
            <!-- <Alert :successMessage="successMessage" :errorMessage="errorMessage" /> -->
            <div class="content d-flex flex-column flex-column-fluid">
                <div class="post d-flex flex-column-fluid">
                    <div class="container-xxl" style="max-width: none;">
                        <div class="card card-flush">
                            <slot name="content" />
                        </div>
                    </div>
                </div>
            </div>
            <slot name="modal" />
        </template>
    </Master>
</template>

<script setup>
import Master from '@/components/MainContent'
</script>