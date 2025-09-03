<template>
    <thead>
        <tr class="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
            <th class="w-10px pe-2">
                <div class="form-check form-check-sm form-check-custom form-check-solid me-3">
                    <input class="form-check-input" type="checkbox" data-kt-check="true"
                        data-kt-check-target="#kt_ecommerce_products_table .form-check-input" value="1" />
                </div>
            </th>
            <th class="min-w-200px">id</th>
            <th v-for="n in thead" class=" min-w-100px">{{ n }}</th>
            <th class="text-end min-w-100px">Actions</th>
        </tr>
    </thead>
</template>

<script setup>
const props = defineProps({ thead: Array });

</script>