<template>
    <div class="hover-scroll-overlay-y" id="kt_aside_menu_wrapper">
        <div
            class="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500">
            <MenuItem v-for="(item, index) in menuItems" :key="index" :item="item" />
        </div>
    </div>
</template>

<script>
import MenuItem from './MenuItem.vue';

export default {
    name: 'MainMenu',
    components: {
        MenuItem
    },
    data() {
        return {
            menuItems: [
                {
                    title: 'Dashboards',
                    icon: 'ki-duotone ki-element-11',
                    active: true,
                    children: [
                        { title: 'Default', route: '/' },
                        { title: 'eCommerce', route: '/dashboards/ecommerce' },
                        { title: 'Projects', route: '/dashboards/projects' }
                    ]
                },
                // باقي عناصر القائمة...
            ]
        };
    }
};
</script>