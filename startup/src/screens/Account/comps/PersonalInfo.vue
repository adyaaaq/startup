<template>
    <div class="personal-info gap-2">
        <label>Таны нэр</label>
        <input class="form-control" type="text" v-model="user.firstName" />

        <label>Таны овог</label>
        <input class="form-control" type="text" v-model="user.lastName" />

        <label>Төрсөн өдөр</label>
        <div class="birthdate">
            <select class="form-select" v-model="user.birthYear">
                <option disabled value="">Он</option>
                <option v-for="year in years" :key="year">{{ year }}</option>
            </select>

            <input class="form-control" type="date" v-model="user.birthDate" />
        </div>

        <button class="save-btn btn-primary">Өөрчлөлт хадгалах</button>
    </div>
</template>

<script>
export default {
    name: 'PersonalInfo',
    data() {
        return {
            user: {
                firstName: 'Adiyabazar',
                lastName: 'Davaadavga',
                birthYear: '2002',
                birthDate: '2002-10-06',
            },
            years: Array.from({ length: 100 }, (_, i) => 2024 - i),
        };
    },
};
</script>

<style scoped>
.personal-info {
    display: flex;
    flex-direction: column;
    max-width: 500px;
}

label {
    font-weight: 500;
    font-size: 14px;
}

input,
select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
}

.birthdate {
    display: flex;
    gap: 12px;
}

.birthdate select,
.birthdate input[type='date'] {
    flex: 1;
}

.save-btn {
    width: fit-content;
    padding: 12px 24px;
    /* background-color: #000; */
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    margin-top: 10px;
}
</style>
