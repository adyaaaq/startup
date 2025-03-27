<template>
    <div class="admin-users">
        <div class="users-header">
            <h2>Users</h2>
            <div>
                <input
                    type="text"
                    v-model="search"
                    class="search-input"
                    placeholder="Search users..." />
                <b-button
                    variant="primary"
                    class="ml-2"
                    @click="openCreateModal">
                    + Add User
                </b-button>
            </div>
        </div>

        <table class="user-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(user, index) in filteredUsers"
                    :key="user.id"
                    class="clickable-row">
                    <td>{{ index + 1 }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <td>
                        <b-button
                            size="sm"
                            variant="warning"
                            @click="editUser(user)"
                            >Edit</b-button
                        >
                        <b-button
                            size="sm"
                            variant="danger"
                            class="ml-2"
                            @click="deleteUser(user)"
                            >Delete</b-button
                        >
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Create/Edit Modal -->
        <b-modal
            v-model="showModal"
            :title="isEditing ? 'Edit User' : 'Add User'"
            hide-footer
            centered>
            <b-form @submit.prevent="saveUser">
                <b-form-group label="Name">
                    <b-form-input v-model="form.name" required />
                </b-form-group>
                <b-form-group label="Email">
                    <b-form-input v-model="form.email" type="email" required />
                </b-form-group>
                <b-form-group label="Role">
                    <b-form-select
                        v-model="form.role"
                        :options="roles"
                        required />
                </b-form-group>
                <div class="d-flex justify-content-end mt-3">
                    <b-button variant="secondary" @click="closeModal"
                        >Cancel</b-button
                    >
                    <b-button variant="primary" type="submit" class="ml-2">{{
                        isEditing ? 'Update' : 'Create'
                    }}</b-button>
                </div>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'Users',
    data() {
        return {
            search: '',
            showModal: false,
            isEditing: false,
            selectedUser: null,
            form: {
                id: null,
                name: '',
                email: '',
                role: '',
            },
            users: [
                {
                    id: 1,
                    name: 'Ankhbileg',
                    email: 'ankh@example.com',
                    role: 'Admin',
                },
                {
                    id: 2,
                    name: 'John Doe',
                    email: 'john@example.com',
                    role: 'Editor',
                },
                {
                    id: 3,
                    name: 'Jane Smith',
                    email: 'jane@example.com',
                    role: 'Viewer',
                },
            ],
            roles: ['Admin', 'Editor', 'Viewer'],
        };
    },
    computed: {
        filteredUsers() {
            return this.users.filter((user) =>
                user.name.toLowerCase().includes(this.search.toLowerCase())
            );
        },
    },
    methods: {
        openCreateModal() {
            this.isEditing = false;
            this.form = { id: null, name: '', email: '', role: 'Viewer' };
            this.showModal = true;
        },
        editUser(user) {
            this.isEditing = true;
            this.form = { ...user };
            this.showModal = true;
        },
        deleteUser(user) {
            if (confirm(`Are you sure you want to delete ${user.name}?`)) {
                this.users = this.users.filter((u) => u.id !== user.id);
            }
        },
        saveUser() {
            if (this.isEditing) {
                const index = this.users.findIndex(
                    (u) => u.id === this.form.id
                );
                if (index !== -1) {
                    this.users.splice(index, 1, { ...this.form });
                }
            } else {
                const newUser = { ...this.form, id: Date.now() };
                this.users.push(newUser);
            }
            this.closeModal();
        },
        closeModal() {
            this.showModal = false;
        },
    },
};
</script>

<style scoped>
.admin-users {
    padding: 20px;
}
.users-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.search-input {
    padding: 6px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
.user-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
}
.user-table th,
.user-table td {
    border: 1px solid #ddd;
    padding: 10px;
}
.user-table th {
    background-color: #f4f4f4;
}
.clickable-row {
    transition: background 0.2s;
}
.clickable-row:hover {
    background-color: #f0f0f0;
}
</style>
