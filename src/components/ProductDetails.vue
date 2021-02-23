<template>
  <div>
    <div v-if="!showProdForm">
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
            <img :src="getImage(product)" :style="getBackground(product)"/>
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

    <div v-if="showProdForm">
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
              <label for="keyBundleId">Key Bundle ID</label><br />
              <select id="keyBundleId">
                <option value="Select Key Bundle ID">
                  Select Key Bundle ID
                </option>
              </select>
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
export default class ProductDetails extends Vue {
  @Prop() showProdForm!: boolean
  @Prop() toggleShowForm!: Function
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
      // console.log('hi if')
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

      this.toggleShowForm()
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
      const productData = JSON.parse(localStorage.getItem('storedProducts'))
      console.log(productData.products)
      // productData.products.push(product);
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
    this.toggleShowForm()
    location.reload()
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
    const card = product.cardNetwork
    let url = ''
    if (card === 'amex') {
      url = this.imageMap.amex.logoURL
    } else if (card === 'visa') {
      url = this.imageMap.visa.logoURL
    } else if (card === 'mastercard') {
      url = this.imageMap.mastercard.logoURL
    } else if (card === 'rupay') {
      url = this.imageMap.rupay.logoURL
    } else if (card === 'maestro') {
      url = this.imageMap.maestro.logoURL
    }

    return url
  }

  getBackground (product: Product) {
    const card = product.cardNetwork
    let backgrnd = ''
    if (card === 'amex') {
      backgrnd = this.imageMap.amex.logoBgColor
    } else if (card === 'visa') {
      backgrnd = this.imageMap.visa.logoBgColor
    } else if (card === 'mastercard') {
      backgrnd = this.imageMap.mastercard.logoBgColor
    } else if (card === 'rupay') {
      backgrnd = this.imageMap.rupay.logoBgColor
    } else if (card === 'maestro') {
      backgrnd = this.imageMap.maestro.logoBgColor
    }

    return { backgroundColor: backgrnd, width: '60px', height: '60px', borderRadius: '2px', objectFit: 'contain' }
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

</style>
