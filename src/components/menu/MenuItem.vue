<template>
    <div :class="['menu-item', { 'here show': item.active }]" data-kt-menu-trigger="click">
        <span class="menu-link">
            <span class="menu-icon" v-if="item.icon">
                <i :class="item.icon">
                    <span v-for="n in item.pathCount" :key="n" :class="`path${n}`"></span>
                </i>
            </span>
            <span class="menu-title">{{ item.title }}</span>
            <span class="menu-arrow" v-if="item.children"></span>
        </span>

        <div class="menu-sub menu-sub-accordion" v-if="item.children">
            <div class="menu-item" v-for="(child, idx) in item.children" :key="idx">
                <router-link :to="child.route" class="menu-link" :class="{ 'active': child.active }">
                    <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                    </span>
                    <span class="menu-title">{{ child.title }}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MenuItem',
    props: {
        item: {
            type: Object,
            required: true
        }
    }
};
</script>