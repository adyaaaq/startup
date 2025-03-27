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
                    >Products</router-link
                >
                <router-link to="/admin/settings" exact-active-class="active"
                    >Settings</router-link
                >
            </nav>
        </aside>

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
</style>
