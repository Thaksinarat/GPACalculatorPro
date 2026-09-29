<template>
  <q-page padding>
    <q-card class="items-center justify-center">
      <q-card-section>
        <!-- logo -->
        <div class="">
          <q-icon name="school" size="72px" />
        </div>

        <!-- head -->
        <div>
          <p class="text-h5 text-bold">GPA Pro</p>
          <p class="text-grey-7">Student GPA Calculator</p>
        </div>

        <!-- from -->
        <q-form class="q-gutter-xs" @submit="handleLogin">
          <!-- input username -->
          <q-input v-model="username" type="text" label="Username" filled />
          <!-- input password -->
          <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" label="Password">
            <template #append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="togglePwd"
              />
            </template>
          </q-input>

          <!-- hint -->
          <div class="q-mt-lg q-pa-md bg-blue-2 text-blue-7">
            <p>Demo Account</p>
            <p>Username: <span class="text-bold">student</span></p>
            <p>Password: <span class="text-bold">123456</span></p>
          </div>

          <!-- ปุ่ม login -->
          <q-btn color="primary" icon="login" label="LOGIN" type="submit"/>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'

const authStore = useAuthStore()
// เช็คการเปิด/ปิดตา pwd
const isPwd = ref(true)

// input ของ user
const username = ref('')
const password = ref('')

// function toggle เปิด/ปิดตา password
const togglePwd = () => {
  isPwd.value = !isPwd.value
}

const handleLogin = () => {
  console.log( authStore.isLogin ,username.value, password.value)
  authStore.login(username, password)

}
</script>
