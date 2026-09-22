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
import { computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

// รวมหน่วยกิตสะสม
const sumCredit = computed(() => {
  return props.items.reduce((sum, item) => sum + Number(item.credit), 0)
})

// ค่า GPA
const gpa = computed(() => {
  const sumGradePoint = props.items.reduce((sum, item) => sum + Number(item.grade_point), 0)
  return (sumGradePoint / sumCredit.value).toFixed(2)
})
</script>
