<template>
    <div class="admin-layout d-flex">
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="logo">Admin Panel</div>
            <nav class="nav-links">
                <router-link to="/admin/dashboard" exact-active-class="active"
                    >Dashboard</router-link
                >
                <router-link to="/admin/users" exact-active-class="active"
                    >Users</router-link
                >
                <router-link to="/admin/products" exact-active-class="active"
                    >Liqours</router-link
                >
                <router-link to="/admin/flowers" exact-active-class="active"
                    >Flowers</router-link
                >
                <router-link to="/admin/sets" exact-active-class="active"
                    >Sets</router-link
                >
                <router-link to="/admin/categories" exact-active-class="active"
                    >Categories</router-link
                >
            </nav>
            <div class="logout" @click="$bvModal.show('logout-modal')">
                Гарах
            </div>
        </aside>

        <!-- Confirmation Modal -->
        <b-modal
            id="logout-modal"
            title="Баталгаажуулалт"
            @ok="logout"
            ok-title="Тийм"
            cancel-title="Үгүй"
            centered>
            Та системээс гарахдаа итгэлтэй байна уу?
        </b-modal>
        <!-- Main Content -->
        <div class="main-content">
            <header class="topbar">
                <p>Welcome, Admin</p>
            </header>

            <main class="content-body">
                <router-view />
            </main>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdminLayout',
    data() {
        return {
            showLogoutModal: false,
        };
    },
    methods: {
        logout() {
            console.log('🚪 Logging out...');
            // Clear session or token if needed
            this.$router.push('/login'); // Or any route to redirect after logout
        },
    },
};
</script>

<style scoped>
.admin-layout {
    height: 100vh;
    display: flex;
    font-family: 'Open Sans', sans-serif;
}

/* Sidebar */
.sidebar {
    width: 220px;
    background-color: #2d2f36;
    color: white;
    display: flex;
    flex-direction: column;
    padding: 20px;
}

.logo {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 30px;
}

.nav-links {
    display: flex;
    flex-direction: column;
}

.nav-links a {
    color: #cfcfcf;
    text-decoration: none;
    margin: 8px 0;
    padding: 10px;
    border-radius: 6px;
    transition: background 0.3s;
}

.nav-links a.active,
.nav-links a:hover {
    background-color: #444751;
    color: white;
}

/* Main Content */
.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #f4f5f7;
}

.topbar {
    background-color: white;
    padding: 16px 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    font-weight: 600;
}

.content-body {
    padding: 24px;
    overflow-y: auto;
    height: 100%;
}
.logout {
    margin-top: auto;
    padding-top: 20px;
    color: #ffdddd;
    cursor: pointer;
    font-weight: 500;
    transition: color 0.3s;
}

.logout:hover {
    color: #ffffff;
}

/deep/ .modal-header {
    justify-content: space-between !important;
}
</style>
