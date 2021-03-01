<template>
  <div>
    <div>
      <div v-for="product in productList" :key="product.id">
        <div v-if="product.id == productID">
          <div class="product-form">
            <div class="product-text"><strong class="product-header">Edit Product</strong></div>
            <div class='create-text'>Edit the ProductName: {{ product.name }}</div>
          </div>

          <form class="new-product-form" @submit.prevent="onSubmit(product)" autocomplete="off">
            <div class="error" v-if="errors.length">
              <strong>Please correct the following error(s):</strong>
              <ul>
                <li v-for="(error, idx) in errors" :key="idx">{{ error }}</li>
              </ul>
            </div>

            <p>
              <label for="name">Product Name:</label><br />
              <input id="name" v-model="newProduct.name" />
            </p>

            <p>
              <label for="description">Description:</label><br />
              <textarea
                id="description"
                v-model="newProduct.description"
              ></textarea>
            </p>

            <p>
              <label for="cardNetwork">Card Network</label><br />
              <select id="cardNetwork" v-model="newProduct.cardNetwork">
                <option v-for="(card, idx) in cards" :key="idx" :value="card">
                  {{ card }}
                </option>
              </select>
            </p>

            <p>
              <label for="protocol">Protocol Version</label><br />
              <select id="protocol" v-model="newProduct.version">
                <option value="threeDSecure_1_0">3D Secure 1.0</option>
                <option value="threeDSecure_2_0">3D Secure 2.0</option>
                <option value="threeDSecure_3_0">2D Secure 3.0</option>
              </select>
            </p>

            <p>
              <label for="avvAlgorithm">AVV Algorithm</label><br />
              <select id="avvAlgorithm" placeholder="Select AVV algorithm">
                <option v-for="(algos,idx) in aavAlgos" :key="idx" :value="algos">{{algos}}</option>
              </select>
            </p>

            <p>
              <label for="binNo">Bin No.</label> <br />
              <input
                id="binNo"
                v-model="newProduct.bin"
                :placeholder="product.bin"
              />
            </p>

            <p>
              <input class="form-buttons" type="submit" value="Submit" />
              <button class="form-buttons" @click="onCancel">Cancel</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import { Product, cardNetworkLogos, jsonData } from '@/ProductTemplates/ProductType'
import { aavAlgorithms } from '@/Constants/Constants'

@Component
export default class EditProduct extends Vue {
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

  onSubmit () {
    if (
      this.newProduct.name &&
      this.newProduct.bin &&
      this.newProduct.id &&
      this.newProduct.cardNetwork &&
      this.newProduct.description &&
      this.newProduct.version
    ) {
      this.prodCount++
      this.updateProductList(this.newProduct)
      this.newProduct = {
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

      this.$router.push({ name: 'details', params: { Pid: this.productID } })
      location.reload()
    } else {
      if (!this.newProduct.name) {
        this.errors.push('Product Name required.')
      }
      if (!this.newProduct.bin) {
        this.errors.push('Product Bin required.')
      }
      if (!this.newProduct.id) {
        this.errors.push('Product Id required.')
      }
      if (!this.newProduct.cardNetwork) {
        this.errors.push('Product CardNetwork required.')
      }
      if (!this.newProduct.description) {
        this.errors.push('Product Description required.')
      }
      if (!this.newProduct.version) {
        this.errors.push('Product version required.')
      }
    }
  }

  updateProductList (product: Product): void{
    if (localStorage.getItem('storedProducts')) {
      const productData = JSON.parse(localStorage.getItem('storedProducts')!)
      console.log(productData.products)
      for (let iter = 0; iter < productData.products.length; iter++) {
        if (productData.products[iter].id === product.id) {
          productData.products[iter] = product
        }
      }

      localStorage.setItem('storedProducts', JSON.stringify(productData))
    } else {
      console.log('no object in local storage')
    }
    location.reload()
  }

  onCancel () {
    this.$router.push({ name: 'details', params: { Pid: this.productID } })
    location.reload()
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

</style>
