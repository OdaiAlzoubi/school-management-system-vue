<template>
    <AuthMaster>
        <template v-slot:content>
            <div class="d-flex flex-center flex-column align-items-stretch h-lg-100 w-md-400px">
                <div class="d-flex flex-center flex-column flex-column-fluid pb-15 pb-lg-20">
                    <form @submit.prevent="submitForm" class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework">
                        <div class="text-center mb-11">
                            <h1 class="text-gray-900 fw-bolder mb-3">Sign In</h1>
                            <div class="text-gray-500 fw-semibold fs-6">Your Social Campaigns</div>
                        </div>
                        <!--begin::Separator-->
                        <div class="separator separator-content my-14">
                            <span class="w-125px text-gray-500 fw-semibold fs-7">Or with email</span>
                        </div>
                        <!--begin::Input group=-->
                        <div class="fv-row mb-8 fv-plugins-icon-container">
                            <input v-model="formData.email" type="text" placeholder="Email" name="email"
                                autocomplete="off" class="form-control bg-transparent" value=""
                                :class="{ 'is-invalid': errors.email }">
                            <Error v-if="errors.email" :message="errors.email" />
                        </div>
                        <div class="fv-row mb-3 fv-plugins-icon-container">
                            <input v-model="formData.password" type="password" placeholder="Password" name="password"
                                autocomplete="off" class="form-control bg-transparent"
                                :class="{ 'is-invalid': errors.password }">
                            <Error v-if="errors.password" :message="errors.password" />
                        </div>
                        <div class="d-grid mb-10">
                            <button type="submit" id="kt_sign_in_submit" class="btn btn-primary">
                                <span class="indicator-label">Sign In</span>
                                <span class="indicator-progress">Please wait...
                                    <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                            </button>
                        </div>
                        <div class="text-gray-500 text-center fw-semibold fs-6">Not a Member yet?
                            <!-- <RouterLink to="/register">To Register</RouterLink> -->
                            <!-- <a href="authentication/layouts/overlay/sign-up.html" class="link-primary">Sign up</a> -->
                        </div>
                    </form>
                </div>
            </div>
        </template>
    </AuthMaster>
</template>

<script setup>
import AuthMaster from './Master'
import Error from '@/components/common/Error'
import { ref } from 'vue';
import axios from 'axios';
import { RouterLink, useRouter } from 'vue-router';
import api from '@/services/api'

const router = useRouter();

const formData = ref(
    { email: '', password: '' },
);
const errors = ref(
    { email: '', password: '', }
);

const submitForm = async (e) => {
    // e.preventDefault();
    // Perform form validation and submission logic here
    errors.value = {
        email: '',
        password: '',
    };
    try {
        const response = await api.post('login', formData.value);
        const { token, role } = response.data.data;
        const { success } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        if (success) {
            router.push({ name: 'dashboard' });
        } else {
            router.push({ name: 'Login' });
        }

    }
    catch (error) {
        // console.log(error);
        // console.error('Login error:', error.response?.data || error.message)
        if (error.response) {
            const backendErrors = error.response.data.errors;
            errors.value.email = backendErrors.email ? backendErrors.email[0] : '';
            errors.value.password = backendErrors.password ? backendErrors.password[0] : '';
        } else {
            console.error('Error:', error.message);
        }
    }
};
</script>