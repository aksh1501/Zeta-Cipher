<template>
  <div>
    <div>
      <div class='product'>
        <div class='product-text'>
          <strong class="product-header">Products</strong>
          <div class='create-text'>
            An overview of all your products available in Authentication Centre
          </div>
        </div>
        <button @click='toggleShowForm' class='create-product-button'>
            + Create Product
        </button>
      </div>
      <ul class='all-product-container'>
        <li
          v-for='product in productList'
          :key='product.name'
          :id='product.name'
          class='product-container' @click="handleClick(product.id)">
          <div>
              <div :style="{backgroundColor: getBackground(product)}" class="card-bgcolor">
                <img :src="getImage(product)" class="image-style"/>
              </div>
              <div class="card-content">
              <h2 class="product-information">Name: {{product.name}}</h2>
              <h4 class="product-id-style">ID: {{product.id}}</h4>
              <h4 class="product-information">bin-{{product.bin}}</h4>
              </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import { Product, cardNetworkLogos, jsonData } from '@/ProductTemplates/ProductType'
import { aavAlgorithms } from '@/Constants/Constants'

@Component
export default class Dashboard extends Vue {
  @Prop() productInfo!: jsonData
  @Prop() productList!: Array<Product>
  @Prop() imageMap!: cardNetworkLogos
  @Prop() cards!: Array<string>
  errors=Array<string>()
  prodCount=0
  aavAlgos=aavAlgorithms
  productFromJson: jsonData=require('@/assets/product.json')
  newProduct: Product={
    id: '',
    name: '',
    bin: 0,
    cardNetwork: '',
    config: {
      connectorURL:
        'https://ciphertest.amex-cipher.gw.zetapay.in//amexcipher/vereq'
    },
    description: '',
    version: '',
    authPlans: ['swipe_to_pay', 'super_pin']
  }

  getBackground (product: Product) {
    return this.imageMap[product.cardNetwork].logoBgColor
  }

  getImage (product: Product) {
    return this.imageMap[product.cardNetwork].logoURL
  }

  handleClick (prodID: string) {
    this.$router.push({ name: 'details', params: { Pid: prodID } })
  }

  toggleShowForm () {
    this.$router.push({ name: 'create' })
  }

  mounted () {
    this.prodCount = this.productList.length
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

.product-information{
  padding: 6px 6px 6px 0px;
  margin: 0;
}

.product-id-style{
  background-color: lightgrey;
  width: 120px;
  padding: 6px;
  margin: 0;
}

.product-text {
  color: white;
  font-family: 'Fira Sans', sans-serif;
  font-size: 40px;
}

.create-text{
  font-size: 1.2rem;
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

.product-container {
  height: 240px;
  margin: 30px;
  margin-top: 5px;
  cursor: pointer;
  width: 380px;
  z-index: 4;
  background-color: white;
  border-radius: 10px;
  border: 2px solid black;
}

.product-container:hover {
  background-color: rgb(215, 245, 250);
}

.card-bgcolor{
  height: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
}

.all-product-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  list-style: none;
  margin-top:0px;
  padding: 20px;
  align-content: space-around;
  border-radius: 10px;
  margin-top: auto;
  margin-bottom: auto;
  opacity: 0.8;
  margin-left: 5px;
  margin-right: 5px;
  box-shadow: 2px 2px 2px 2px grey;
}

.image-style{
    width: 120px;
    height: 110px;
    padding: 10px 10px 10px 2px;
    object-fit: contain;
}

.new-product-form {
  padding: 10px;
  margin-left: 5px;
  margin-right: 5px;
  border: 2px solid #d8d8d8;
  border-radius: 10px;
}

textarea {
  width: 100%;
  height: 200px;
}
input {
  width: 20%;
}

.form-buttons {
  width: 90px;
  background-color: lightblue;
  margin: 10px;
  padding: 10px;
}

input, select, textarea{
  width: 450px;
}

.card-content{
  padding: 10px;
}

</style>
