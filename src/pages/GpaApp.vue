<!-- หน้าหลัก -->
<template>
  <q-page padding>
    <!-- ชื่อเว็บและไอคอน -->
    <div class="column items-center">
      <q-icon name="calculate" color="blue-7" size="96px" class="q-mb-md" />

      <p class="text-h4 text-bold">GPA Calculator Pro</p>

      <p class="text-body-2">ระบบคำนวณและบันทึกเกรดเฉลี่ยรายภาคเรียน</p>
    </div>

    <!-- ฟอร์ม -->
    <GpaForm @add-subject="addNewSubject"></GpaForm>

    <!-- รายการรายวิชา -->
    <subjectList
      @delete-subject="deleteSubject"
      @delete-all-subject="deleteAllSubject"
      :items="subjects"
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
import { onMounted, ref } from 'vue'

// ข้อมูลรายวิชา
const subjects = ref([])
const isLoading = ref(true)

// หน่วงการโหลด
onMounted(() =>{
  setTimeout(()=>{
    isLoading.value = false
  }, 2000)
})

// ฟังก์ชันเพิ่ม
const addNewSubject = (newSubject) => {
  subjects.value.push(newSubject)
  console.log('💚 Add!')
}

// ฟังก์ชันลบรายวิชา
const deleteSubject = (subject) => {
  const index = subjects.value.findIndex((item) => item.name == subject.name)
  subjects.value.splice(index, 1)

  console.log('⛔ Remove!')
}

// ฟังก์ชันลบทั้งหมด
const deleteAllSubject = () => {
  subjects.value = []

  console.log('⛔⛔ Remove all!')
}
</script>
