<template>
    <div id="kt_aside" class="aside" data-kt-drawer="true" data-kt-drawer-name="aside"
        data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true"
        data-kt-drawer-width="{default:'200px', '300px': '250px'}" data-kt-drawer-direction="start"
        data-kt-drawer-toggle="#kt_aside_mobile_toggle">
        <!--begin::Aside Toolbarl-->
        <div class="aside-toolbar flex-column-auto" id="kt_aside_toolbar">
            <!--begin::Aside user-->
            <!--begin::User-->
            <div class="aside-user d-flex align-items-sm-center justify-content-center py-5">
                <!--begin::Symbol-->
                <div class="symbol symbol-50px">
                    <img src="#" alt="" />
                </div>
                <!--begin::Wrapper-->
                <div class="aside-user-info flex-row-fluid flex-wrap ms-5">
                    <!--begin::Section-->
                    <div class="d-flex">
                        <!--begin::Info-->
                        <div class="flex-grow-1 me-2">
                            <!--begin::Username-->
                            <!-- <a href="#" class="text-white text-hover-primary fs-6 fw-bold">{{ Auth:: user() -> name
                                }}</a> -->
                            <!--begin::Description-->
                            <!-- <span class="text-gray-600 fw-semibold d-block fs-8 mb-1">{{ Auth:: user() -> phone
                                }}</span> -->
                            <!--begin::Label-->
                            <!-- {{-- <div class="d-flex align-items-center text-success fs-9">
                            <span class="bullet bullet-dot bg-success me-1"></span>online
                        </div> --}} -->
                        </div>
                        \ <!--begin::User menu-->
                        <div class="me-n2">
                            <!--begin::Action-->
                            <a href="#" class="btn btn-icon btn-sm btn-active-color-primary mt-n2"
                                data-kt-menu-trigger="click" data-kt-menu-placement="bottom-start"
                                data-kt-menu-overflow="true">
                                <i class="ki-duotone ki-setting-2 text-muted fs-1">
                                    <span class="path1"></span>
                                    <span class="path2"></span>
                                </i>
                            </a>
                            <!--begin::User account menu-->
                            <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px"
                                data-kt-menu="true">
                                <!--begin::Menu item-->
                                <div class="menu-item px-3">
                                    <div class="menu-content d-flex align-items-center px-3">
                                        <!--begin::Avatar-->
                                        <div class="symbol symbol-50px me-5">
                                            <img alt="Logo" src="#" />
                                        </div>
                                        <!--begin::Username-->
                                        <div class="d-flex flex-column">
                                            <div class="fw-bold d-flex align-items-center fs-5">
                                                <!-- {{ Str::words(Auth::user()->name,1,'') }}
                                            {{-- <span
                                                class="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2">Pro</span> --}}
                                        </div>
                                        {{-- <a href="#"
                                            class="fw-semibold text-muted text-hover-primary fs-7">{{ Auth::user()->email }}</a> --}} -->
                                            </div>
                                        </div>
                                    </div>
                                    <!--begin::Menu separator-->
                                    <div class="separator my-2"></div>
                                    <!--begin::Menu item-->
                                    <div class="menu-item px-5">
                                        <a href="account/overview.html" class="menu-link px-5">My Profile</a>
                                    </div>
                                    <!--begin::Menu item-->
                                    <div class="menu-item px-5">
                                        <a href="apps/projects/list.html" class="menu-link px-5">
                                            <span class="menu-text">My Projects</span>
                                            <span class="menu-badge">
                                                <span
                                                    class="badge badge-light-danger badge-circle fw-bold fs-7">3</span>
                                            </span>
                                        </a>
                                    </div>
                                    <!--begin::Menu separator-->
                                    <div class="separator my-2"></div>
                                    <!--begin::Menu item-->
                                    <!-- {{-- <div class="menu-item px-5 my-1">
                                <a href="account/settings.html" class="menu-link px-5">Account Settings</a>
                            </div> --}} -->
                                    <!--begin::Menu item-->
                                    <div class="menu-item px-5">
                                        <router-link :to="{ name: 'logout' }" class="menu-link px-5">Sign
                                            Out</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--begin::Aside menu-->
            <div class="aside-menu flex-column-fluid">
                <!--begin::Aside Menu-->
                <div class="hover-scroll-overlay-y mx-3 my-5 my-lg-5" id="kt_aside_menu_wrapper" data-kt-scroll="true"
                    data-kt-scroll-height="auto"
                    data-kt-scroll-dependencies="{default: '#kt_aside_toolbar, #kt_aside_footer', lg: '#kt_header, #kt_aside_toolbar, #kt_aside_footer'}"
                    data-kt-scroll-wrappers="#kt_aside_menu" data-kt-scroll-offset="5px">
                    <!--begin::Menu-->
                    <div class="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500"
                        id="#kt_aside_menu" data-kt-menu="true">
                        <!-- {{-- DashBoards --}} -->
                        <div class="menu-item menu-accordion" :class="isActiveRoute('dashboard') ? 'show' : ''">
                            <router-link :to="{ name: 'dashboard' }" class="menu-link">
                                <span class="menu-icon">
                                    <i class="fa-solid fa-users">
                                        <span class="path1"></span>
                                        <span class="path2"></span>
                                    </i>
                                </span>
                                <span class="menu-title">Dashboard</span>
                            </router-link>
                        </div>
                        <!-- {{-- Product Management --}} -->
                        <div class="menu-item pt-5">
                            <div class="menu-content">
                                <span class="menu-heading fw-bold text-uppercase fs-7">School Management</span>
                            </div>
                        </div>
                        <div class="menu-item menu-accordion" :class="isActiveRoute('student') ? 'show' : ''">
                            <router-link :to="{ name: 'student' }" class="menu-link">
                                <span class="menu-icon">
                                    <i class="ki-duotone ki-chart fs-2">
                                        <span class="path1"></span>
                                        <span class="path2"></span>
                                    </i>
                                </span>
                                <span class="menu-title">Students</span>
                            </router-link>
                        </div>
                        <div class="menu-item menu-accordion" :class="isActiveRoute('grades') ? 'show' : ''">
                            <router-link :to="{ name: 'grades' }" class="menu-link">
                                <span class="menu-icon">
                                    <i class="ki-duotone ki-chart fs-2">
                                        <span class="path1"></span>
                                        <span class="path2"></span>
                                    </i>
                                </span>
                                <span class="menu-title">Grades</span>
                            </router-link>
                        </div>
                        <div class="menu-item menu-accordion" :class="isActiveRoute('guardian') ? 'show' : ''">
                            <router-link :to="{ name: 'guardian' }" class="menu-link">
                                <span class="menu-icon">
                                    <i class="ki-duotone ki-chart fs-2">
                                        <span class="path1"></span>
                                        <span class="path2"></span>
                                    </i>
                                </span>
                                <span class="menu-title">Guardian</span>
                            </router-link>
                        </div>
                        <div class="menu-item menu-accordion" :class="isActiveRoute('subjects') ? 'show' : ''">
                            <router-link :to="{ name: 'subjects' }" class="menu-link">
                                <span class="menu-icon">
                                    <i class="ki-duotone ki-chart fs-2">
                                        <span class="path1"></span>
                                        <span class="path2"></span>
                                    </i>
                                </span>
                                <span class="menu-title">Subjects</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const isActiveRoute = (prefix) => {
    return route.name?.toString().startsWith(prefix)
}
</script>