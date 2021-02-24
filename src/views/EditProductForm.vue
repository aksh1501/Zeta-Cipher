<template>
  <div class="home">
    <Header />
    <EditProduct :productInfo="productInfo" :productList="productList" :imageMap="imageMap" :cards="cards"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EditProduct from '@/components/EditProduct.vue'
import Header from '@/components/Header.vue'
import { Product, cardNetworkLogos, jsonData } from '@/ProductTemplates/ProductType'

@Component({
  components: {
    EditProduct,
    Header
  }
})
export default class EditProductForm extends Vue {
  productFromJson: jsonData=require('@/assets/product.json')

  get productInfo (): jsonData {
    if (localStorage.getItem('storedProducts')) {
      return JSON.parse(localStorage.getItem('storedProducts')!)
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
