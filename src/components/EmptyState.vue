<template>
  <div v-if="productFromJson.products.length===0">
      <img src='@/assets/preview.png' class='error-image'/>
      <h1><strong>We are facing some issues</strong></h1>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import { jsonData } from '@/ProductTemplates/ProductType'

@Component
export default class EmptyState extends Vue {
  @Prop() productFromJson!: jsonData
}
</script>

<style scoped>
* {
  box-sizing: border-box; /*include paddding and border in height and width calculation to make sizing easier*/
}

.error-image{
    float: center;
}

</style>
