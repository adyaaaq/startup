<template>
    <div class="account-layout">
        <aside class="sidebar">
            <router-link to="/account/info" class="link" active-class="active"
                >Хувийн мэдээлэл</router-link
            >
            <router-link to="/account/orders" class="link" active-class="active"
                >Захиалгууд</router-link
            >
            <a class="link" @click="logout">Гарах</a>
        </aside>

        <main class="content">
            <router-view />
        </main>
    </div>
</template>

<script>
export default {
    name: 'AccountLayout',
    methods: {
        logout() {
            // replace with actual logout logic
            alert('Гарав');
            this.$router.push('/login');
        },
    },
};
</script>

<style scoped>
.account-layout {
    display: flex;
    min-height: 100vh;
}
.sidebar {
    width: 220px;
    background-color: #f1f1f1;
    padding: 20px;
}
.link {
    display: block;
    padding: 10px;
    margin-bottom: 10px;
    text-decoration: none;
    color: black;
    border-radius: 4px;

    font-family: var(--text-font);
}
.link:hover,
.active {
    background-color: #ddd;
    font-weight: bold;
}
.content {
    flex: 1;
    padding: 30px;
}
</style>
