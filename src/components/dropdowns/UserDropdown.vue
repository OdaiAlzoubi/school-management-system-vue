<template>
    <div class="me-n2">
        <a href="#" class="btn btn-icon btn-sm btn-active-color-primary mt-n2" data-bs-toggle="dropdown">
            <i class="ki-duotone ki-setting-2 text-muted fs-1">
                <span class="path1"></span>
                <span class="path2"></span>
            </i>
        </a>

        <div class="dropdown-menu dropdown-menu-end py-4">
            <div class="menu-item px-3">
                <div class="menu-content d-flex align-items-center px-3">
                    <div class="symbol symbol-50px me-5">
                        <img :src="user.avatar" alt="User" />
                    </div>
                    <div class="d-flex flex-column">
                        <div class="fw-bold d-flex align-items-center fs-5">
                            {{ user.name }}
                            <span class="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2">Pro</span>
                        </div>
                        <a href="#" class="fw-semibold text-muted text-hover-primary fs-7">{{ user.email }}</a>
                    </div>
                </div>
            </div>

            <div class="separator my-2"></div>

            <div class="menu-item px-5">
                <router-link to="/account/overview" class="menu-link px-5">My Profile</router-link>
            </div>

            <div class="menu-item px-5">
                <router-link to="/account/settings" class="menu-link px-5">Account Settings</router-link>
            </div>

            <div class="menu-item px-5">
                <a href="#" class="menu-link px-5" @click="logout">Sign Out</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserDropdown',
    data() {
        return {
            user: {
                name: 'Max Smith',
                email: 'max@kt.com',
                avatar: require('@/assets/media/avatars/300-1.jpg')
            }
        };
    },
    methods: {
        logout() {
            // Handle logout logic
            this.$router.push('/login');
        }
    }
};
</script>