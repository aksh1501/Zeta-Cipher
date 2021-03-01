<template>
  <div>
    <div>
      <div class='product-form'>
        <div class='product-text'>
          <strong class="product-header">Create Product</strong></div>
        <div class='create-text'>Create a new Product:</div>
      </div>

      <form class='new-product-form' @submit.prevent='onSubmit' autocomplete="off">
        <div>
          <h2>Basic Information</h2>
          <h3>Enter the Basic Details about your product</h3>
        </div>
        <div class='error' v-if='errors.length'>
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for='(error, idx) in errors' :key='idx'>{{ error }}</li>
          </ul>
        </div>

        <p>
          <label for='name'>Product Name:</label><br />
          <input
            id='name'
            placeholder='Enter Product Name'
            v-model='newProduct.name'
          />
        </p>

        <p>
          <label for='description'>Description:</label><br />
          <textarea
            id='description'
            placeholder='Enter Product Description'
            v-model='newProduct.description'
          ></textarea>
        </p>

        <p>
          <label for='cardNetwork'>Card Network</label><br />
          <select id='cardNetwork' v-model='newProduct.cardNetwork'>
            <option v-for='(card, idx) in cards' :key='idx' :value='card'>
              {{ card }}
            </option>
          </select>
        </p>

        <p>
          <label for='protocol'>Protocol Version</label><br />
          <select id='protocol' v-model='newProduct.version'>
            <option value="threeDSecure_1_0">3D Secure 1.0</option>
            <option value="threeDSecure_2_0">3D Secure 2.0</option>
            <option value="threeDSecure_3_0">2D Secure 3.0</option>
          </select>
        </p>

        <p>
          <label for='avvAlgorithm'>AVV Algorithm</label><br />
          <select id='avvAlgorithm' placeholder='Select AVV algorithm'>
            <option v-for="(algos,idx) in aavAlgos" :key="idx" :value="algos">{{algos}}</option>
          </select>
        </p>

        <p>
          <label for='binNo'>Bin No.</label> <br />
          <input id='binNo' placeholder='Enter Bin Number' v-model='newProduct.bin' />
        </p>

        <p>
          <label for='prodId'>Product ID.</label><br />
          <input
            id='prodId'
            :placeholder='getId'
            v-model='newProduct.id'
          />
        </p>

        <p>
          <input class='form-buttons' type='submit' value='Submit' />
          <button class='form-buttons' @click='onCancel'>Cancel</button>
        </p>
      </form>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import { Product, cardNetworkLogos, jsonData } from '@/ProductTemplates/ProductType'
import { aavAlgorithms } from '@/Constants/Constants'

@Component
export default class CreateProduct extends Vue {
  @Prop() productInfo!: jsonData
  @Prop() productList!: Array<Product>
  @Prop() imageMap!: cardNetworkLogos
  @Prop() cards!: Array<string>
  @Prop() getId!: string
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

  onSubmit () {
    let uniqueIdFlag = 1
    for (let iter = 0; iter < this.productList.length; iter++) {
      if (this.productList[iter].id === this.newProduct.id) {
        uniqueIdFlag = 0
      }
    }
    if (
      this.newProduct.name &&
      this.newProduct.bin &&
      this.newProduct.id &&
      this.newProduct.cardNetwork &&
      this.newProduct.description &&
      this.newProduct.version && uniqueIdFlag
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

      this.$router.push({ name: 'home' })
      location.reload()
    } else {
      this.errors = Array<string>()
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
      if (!uniqueIdFlag) {
        this.errors.push('Product ID should be unique for each product.')
      }
    }
  }

  updateProductList (product: Product) {
    if (localStorage.getItem('storedProducts')) {
      const productData = JSON.parse(localStorage.getItem('storedProducts')!)
      console.log(productData.products)
      productData.products.push(product)
      localStorage.setItem('storedProducts', JSON.stringify(productData))
    } else {
      console.log('no object in local storage')
    }
    location.reload()
  }

  onCancel () {
    this.$router.push({ name: 'home' })
    location.reload()
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

.product-form {
  background-color: #4d4ddc;
  margin: 10px 5px 0px;
  color: white;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  padding: 20px;
}

.product-header{
  font-weight: 500;
}

.product-text {
  color: white;
  font-family: 'Fira Sans', sans-serif;
  font-size: 40px;
}

.create-text{
  font-size: 1.2rem;
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

</style>
