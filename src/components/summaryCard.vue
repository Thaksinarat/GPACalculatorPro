<template>
  <div v-if="isLoading"></div>
  <div v-else>
    <div v-if="items.length > 0" class="full-width q-mt-lg text-white">
      <!-- หน่วยกิตรวม -->
      <q-card bordered class="full-width">
        <q-card-section horizontal>
          <!-- หน่วยกิตรวม -->
          <q-card-section class="col-6 bg-blue column items-center">
            <p>หน่วยกิตรวม</p>
            <p class="text-h3">{{ sumCredit }}</p>
          </q-card-section>

          <q-separator vertical color="blue" />

          <q-card-section class="col-6 bg-blue-4 column items-center">
            <p>เกรดเฉลี่ย (GPA)</p>
            <p class="text-h3">{{ gpa }}</p>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { useSubjectStore } from '@/stores/subjectStore';
import { computed } from 'vue';

const subjectStore = useSubjectStore()

// รายวิชา
const items = computed(() => subjectStore.allSubjects)
// จำนวนหน่วยกิตสะสม
const sumCredit = computed(() => subjectStore.sumCredit)
// ค่า GPA
const gpa = computed(() => subjectStore.gpa)
</script>
