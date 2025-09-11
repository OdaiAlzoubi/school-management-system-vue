<template>
    <!-- Table -->
    <div class="card-body pt-0 table-responsive">
        <table class="table align-middle table-row-dashed fs-6 gy-5">
            <slot name="thead" />
            <slot name="tbody" />
        </table>
    </div>
</template>
<script setup>
</script>
