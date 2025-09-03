<template>
    <tbody class="fw-semibold text-gray-600">
        <tr v-for="(item, index) in tbody" :key="index">
            <td>
                <div class="form-check form-check-sm form-check-custom form-check-solid">
                    <input class="form-check-input" type="checkbox" value="1" />
                </div>
            </td>
            <td class="">
                <span class="fw-bold">{{ item.id }}</span>
            </td>
            <td class="">
                <span class="fw-bold">{{ item.name }}</span>
            </td>
            <td>
                <div class="d-flex align-items-center">
                    <a href="#" class="symbol symbol-50px">
                        <span class="symbol-label" :style="{ backgroundImage: `url(${item.image})` }"></span>
                    </a>
                </div>
            </td>
            <td class="text-end">
                <div class="dropdown">
                    <a href="#" class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary"
                        data-bs-toggle="dropdown" aria-expanded="false"><i
                            class="ki-solid ki-dots-horizontal fs-2x"></i>
                    </a>
                    <!--begin::Menu-->
                    <div class=" dropdown-menu menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4"
                        data-kt-menu="true">
                        <!--begin::Menu item-->
                        <div class="menu-item px-3">
                            <a href="#" class="menu-link px-3">Edit</a>
                        </div>
                        <!--begin::Menu item-->
                        <div class="menu-item px-3">
                            <a href="#" class="menu-link px-3" data-kt-ecommerce-product-filter="delete_row">Delete</a>
                        </div>
                    </div>
                    <!--end::Menu-->
                </div>
            </td>
        </tr>
    </tbody>
</template>

<script setup>

const props = defineProps({ tbody: Array, thead: Array });
</script>