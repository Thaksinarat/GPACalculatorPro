<template>
  <q-page padding class="flex flex-center">
    <q-card class="card items-center justify-center">
      <q-card-section>
        <!-- logo -->
        <div class="flex flex-center ">
          <q-icon name="school" size="72px" />
        </div>

        <!-- head -->
        <div class="text-center">
          <p class="text-h5 text-bold">GPA Pro</p>
          <p class="text-grey-7">Student GPA Calculator</p>
        </div>

        <!-- from -->
        <q-form class="full-width q-gutter-xs" @submit="handleLogin">
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
          <div class="q-mt-lg q-pa-md bg-blue-2 text-blue-7 rounded-borders">
            <p>Demo Account</p>
            <p>Username: <span class="text-bold">student</span></p>
            <p>Password: <span class="text-bold">123456</span></p>
          </div>

          <!-- ปุ่ม login -->
          <div class="flex flex-center q-mt-md">
            <q-btn color="primary" icon="login" label="LOGIN" type="submit"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style>
.card {
  max-width: 500px;
  width: 100%;
}
</style>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const $q = useQuasar()

// เช็คการเปิด/ปิดตา pwd
const isPwd = ref(true)

// input ของ user
const username = ref('')
const password = ref('')

// function toggle เปิด/ปิดตา password
const togglePwd = () => {
  isPwd.value = !isPwd.value
}

// function Login
const handleLogin = () => {
  const login = authStore.login(username.value, password.value)

  if (login) {
    router.push('/')
  }else{
    $q.dialog({title: '⚠️Login Failed!', message: 'Username หรือ Password ไม่ถูกต้อง'})
  }

}
</script>
