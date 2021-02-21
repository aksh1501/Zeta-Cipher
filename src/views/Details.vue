<template>
  <div class="home">
    <Header />
    <ProductDetails :showProdForm="showProdForm" :toggleShowForm="toggleShowForm"/>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import ProductDetails from '@/components/ProductDetails.vue' // @ is an alias to /src
import Header from '@/components/Header.vue'

@Component({
  components: {
    ProductDetails,
    Header
  }
})
export default class Details extends Vue {
  showProdForm=false
  toggleShowForm () {
    this.showProdForm = !this.showProdForm
  }
}
</script>
