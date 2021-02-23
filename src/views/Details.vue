<template>
  <div class="home">
    <Header />
    <ProductDetails :showProdForm="showProdForm" :toggleShowForm="toggleShowForm" :productInfo="productInfo" :productList="productList" :imageMap="imageMap" :cards="cards"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ProductDetails from '@/components/ProductDetails.vue' // @ is an alias to /src
import Header from '@/components/Header.vue'
import { Product, cardNetworkLogos, jsonData } from '@/ProductTemplates/ProductType'

@Component({
  components: {
    ProductDetails,
    Header
  }
})
export default class Details extends Vue {
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

  get productList (): Array<Product> {
    return this.productInfo.products
  }

  get imageMap (): cardNetworkLogos {
    return this.productInfo.cardNetworkLogos
  }

  get cards (): Array<string> {
    return Object.keys(this.imageMap)
  }
}
</script>
