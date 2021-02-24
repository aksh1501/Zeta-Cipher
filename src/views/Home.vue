<template>
  <div>
    <Header />
    <EmptyState v-if="productFromJson.products.length==0" :productFromJson="productFromJson" />
    <Dashboard v-if="productFromJson.products.length!==0" :productInfo="productInfo" :productList="productList" :imageMap="imageMap" :cards="cards"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Dashboard from '@/components/Dashboard.vue' // @ is an alias to /src
import Header from '@/components/Header.vue'
import EmptyState from '@/components/EmptyState.vue'
import { jsonData, Product, cardNetworkLogos } from '@/ProductTemplates/ProductType'

@Component({
  components: {
    Dashboard,
    Header,
    EmptyState
  }
})
export default class Home extends Vue {
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
