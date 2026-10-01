<!-- หน้าหลัก -->
<template>
  <q-page padding>
    <!-- ปุ่ม logout -->
    <div>
      <q-btn color="negative" icon="logout" label="Log out" @click="handleLogout()" />
    </div>
    <!-- ชื่อเว็บและไอคอน -->
    <div class="column q-mt-md items-center">
      <q-icon name="calculate" color="blue-7" size="96px" class="q-mb-md" />

      <p class="text-h4 text-bold">GPA Calculator Pro</p>

      <p class="text-body-2">ระบบคำนวณและบันทึกเกรดเฉลี่ยรายภาคเรียน</p>
    </div>

    <!-- ฟอร์ม -->
    <GpaForm @add-subject="subjectStore.addNewSubject"></GpaForm>

    <!-- รายการรายวิชา -->
    <subjectList
      @delete-subject="subjectStore.deleteSubject"
      @delete-all-subject="subjectStore.deleteAllSubject"
      :items="subjectStore.allSubjects"
      :isLoading="isLoading"
    ></subjectList>

    <!-- การ์ดแสดงผลการเรียนเฉลี่ย -->
    <summaryCard :items="subjects" :is-loading="isLoading"></summaryCard>
  </q-page>
</template>

<script setup>
import GpaForm from '@/components/GpaForm.vue'
import subjectList from '@/components/subjectList.vue'
import summaryCard from '@/components/summaryCard.vue'
import { useSubjectStore } from '@/stores/subjectStore'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const subjectStore = useSubjectStore()
const router = useRouter()

// function Logout
const handleLogout = () => {
  authStore.logout()
  router.push('/login')
  
}
</script>
