<template>
  <div>
    <div>
      <div class="product">
        <div
          v-for="product in productList"
          :key="product.id"
          class="product-text" v-show="productID == product.id"
        >
          <strong class="product-header">
           {{ product.name }}
          </strong>
        <div class='create-text'>These are product details of {{ productID }}</div>
        </div>
        <button @click="toggleShowForm" class="create-product-button">
          + Edit Product
        </button>
      </div>
      <ul class="all-product-container">
        <li v-for="product in productList" :key="product.id">
          <div v-if="product.id == productID">
            <h1 class="basic-info">Basic Information</h1>
            <br />
            <span class="product-attribute">Product Name : </span>
            <span class="product-info">{{ product.name }}</span>
            <br />
            <br />
            <span class="product-attribute">Product ID : </span>
            <span class="product-info">{{ product.id }}</span>
            <br />
            <br />
            <span class="product-attribute">Product Description : </span>
            <span class="product-info">{{ product.description }}</span>
            <br />
            <br />
            <span class="product-attribute">BIN Number : </span>
            <span class="product-info">{{ product.bin }}</span>
            <br />
            <br />
            <span class="product-attribute">Connector URL : </span>
            <span class="product-info"
              ><a :href="product.config.connectorURL">{{
                product.config.connectorURL
              }}</a></span
            >
            <br />
            <br />
            <span class="product-attribute">Card Network : </span>
            <img :src="getImage(product)" :style="{ backgroundColor: getBackground(product)}" class="image-backgrnd"/>
            <span class="product-info">{{ product.cardNetwork }}</span>
            <br />
            <br />
            <span class="product-attribute">Protocol Version : </span>
            <span class="product-info">{{
              versionDisplay(product.version)
            }}</span>
          </div>
        </li>
      </ul>
      <div>
        <button @click='returnToHome' class='back-button'>Back To Home</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import { Product, cardNetworkLogos, jsonData } from '@/ProductTemplates/ProductType'
import { aavAlgorithms } from '@/Constants/Constants'

@Component
export default class ProductDetails extends Vue {
  @Prop() productInfo!: jsonData
  @Prop() productList!: Array<Product>
  @Prop() imageMap!: cardNetworkLogos
  @Prop() cards!: Array<string>
  errors=Array<string>()
  productID=this.$route.params.Pid
  prodCount=0
  aavAlgos=aavAlgorithms
  productFromJson: jsonData=require('@/assets/product.json')
  newProduct: Product={
    id: '',
    name: '',
    bin: '',
    cardNetwork: '',
    config: {
      connectorURL:
        'https://ciphertest.amex-cipher.gw.zetapay.in//amexcipher/vereq'
    },
    description: '',
    version: '',
    authPlans: ['swipe_to_pay', 'super_pin']
  }

  versionDisplay (version: string): string {
    const versionArray = version.split('_')
    return versionArray.join('.')
  }

  returnToHome (): void{
    this.$router.push({ name: 'home' })
    location.reload()
  }

  getImage (product: Product) {
    return this.imageMap[product.cardNetwork].logoURL
  }

  getBackground (product: Product) {
    return this.imageMap[product.cardNetwork].logoBgColor
  }

  toggleShowForm () {
    this.$router.push({ name: 'edit', params: { Pid: this.productID } })
  }

  mounted () {
    this.prodCount = this.productList.length
    for (let iter = 0; iter < this.productList.length; iter++) {
      if (this.productList[iter].id === this.productID) {
        this.newProduct = this.productList[iter]
      }
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box; /*include paddding and border in height and width calculation to make sizing easier*/
  text-align: left;
}

.product-header{
  font-weight: 500;
}

.product {
  background-color: #4d4ddc;
  margin: 10px 5px 0px;
  display: flex;
  justify-content: space-between;
  color: white;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  padding: 20px;
}

.product-form {
  background-color: #4d4ddc;
  margin: 10px 5px 0px;
  color: white;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  padding: 20px;
}

.create-text{
  font-size: 1.2rem;
}

.product-text {
  color: white;
  font-family: 'Fira Sans', sans-serif;
  font-size: 40px;
}

.create-product-button {
  color: white;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #fff;
  padding-right: 20px;
  margin-right: 20px;
  margin-left: 10px;
  margin-bottom: 10px;
  align-self: flex-end;
  background: transparent;
}

.all-product-container {
  list-style: none;
  border: 2px solid purple;
  box-shadow: 2px 2px 2px 2px grey;
  padding: 10px;
  margin-top:auto;
  margin-bottom: auto;
  margin-left: 5px;
  margin-right: 5px;
  opacity: 0.8;
  border-radius: 10px;
}

.basic-info {
  color: purple;
  margin: 0px;
}

.product-attribute {
  width: 50%;
  font-size: 20px;
}

.product-info {
  font-size: 2em;
  padding-left: 10px;
}

.new-product-form {
  padding: 10px;
  margin-left: 5px;
  margin-right: 5px;
  border: 2px solid #d8d8d8;
  border-radius: 10px;
}

textarea {
  width: 450px;
  height: 200px;
}
input, select {
  width: 450px;
}

.form-buttons {
  width: 70px;
  background-color: lightblue;
  margin: 10px;
  padding: 10px;
}

.back-button {
  width: 120px;
  background: transparent;
  margin: 10px;
  padding: 10px;
  height:50px;
  border-radius: 12px;
}

.style-image{
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.image-backgrnd{
  width: 60px;
  height: 60px;
  border-radius: 2px;
  object-fit: contain;
}

</style>
