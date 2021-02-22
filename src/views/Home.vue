<template>
  <div class="home">
    <Header/>
    <Dashboard :showProdForm="showProdForm" :toggleShowForm="toggleShowForm" :productInfo="productInfo"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Dashboard from '@/components/Dashboard.vue' // @ is an alias to /src
import Header from '@/components/Header.vue'
import { Product, cardNetworkInfo, cardNetworkLogos, jsonData } from '@/ProductTemplates/ProductType'

@Component({
  components: {
    Dashboard,
    Header
  }
})
export default class Home extends Vue {
  showProdForm=false

  productFromJson: jsonData=require('@/assets/product.json')

  toggleShowForm () {
    this.showProdForm = !this.showProdForm
  }

  get productInfo (): jsonData {
    if (localStorage.getItem('storedProducts')) {
      return JSON.parse(localStorage.getItem('storedProducts'))
    } else {
      localStorage.setItem(
        'storedProducts',
        JSON.stringify(this.productFromJson)
      )
      return this.productFromJson
    }
  }
}

</script>
