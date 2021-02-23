<template>
  <div class='dashboard'>
    <div v-if='!showProdForm'>
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
          :id='product.name' :data-product-id="product.id"
          class='product-container'
        ></li>
      </ul>
    </div>

    <div v-if='showProdForm'>
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
          <label for='keyBundleId'>Key Bundle ID</label><br />
          <select id='keyBundleId'>
            <option value='Select Key Bundle ID'>Select Key Bundle ID</option>
          </select>
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
          <input id='binNo' v-model='newProduct.bin' />
        </p>

        <p>
          <label for='prodId'>Product ID.</label><br />
          <input
            id='prodId'
            placeholder='Enter Product ID'
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
export default class Dashboard extends Vue {
  @Prop() showProdForm!: boolean
  @Prop() toggleShowForm!: Function
  @Prop() productInfo!: jsonData
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

  get productList (): Array<Product> {
    return this.productInfo.products
  }

  get imageMap (): cardNetworkLogos {
    return this.productInfo.cardNetworkLogos
  }

  get cards (): Array<string> {
    return Object.keys(this.imageMap)
  }

  createImage (product: Product): void {
    const card = product.cardNetwork
    let url = ''
    let backgrndUrl = ''
    if (card === 'amex') {
      url = this.imageMap.amex.logoURL
      backgrndUrl = this.imageMap.amex.logoBgColor
    } else if (card === 'visa') {
      url = this.imageMap.visa.logoURL
      backgrndUrl = this.imageMap.visa.logoBgColor
    } else if (card === 'mastercard') {
      url = this.imageMap.mastercard.logoURL
      backgrndUrl = this.imageMap.mastercard.logoBgColor
    } else if (card === 'rupay') {
      url = this.imageMap.rupay.logoURL
      backgrndUrl = this.imageMap.rupay.logoBgColor
    } else if (card === 'maestro') {
      url = this.imageMap.maestro.logoURL
      backgrndUrl = this.imageMap.maestro.logoBgColor
    }

    fetch(url).then(response => {
      response.blob().then(data => {
        const li = document.getElementById(product.name)
        const div = document.createElement('div')
        const enclosingDiv = document.createElement('div')
        const h1 = document.createElement('h2')
        const h2 = document.createElement('h3')
        const h3 = document.createElement('h3')
        h2.setAttribute('style', 'background-color:lightgrey; width:120px;padding:5px;')
        h1.setAttribute('style', 'padding:5px;')
        h3.setAttribute('style', 'padding:5px;')
        h1.innerText = 'Name: ' + product.name
        h2.innerText = 'ID:' + product.id
        h3.innerText = 'Bin-' + product.bin
        div.setAttribute('class', 'product-container-div')
        enclosingDiv.setAttribute(
          'style',
          'background-color:' +
          backgrndUrl +
            '; height : 100px;display:flex;justify-content:flex-start;align-items: center;border-top-right-radius:8px;border-top-left-radius:8px;'
        )
        li.append(div)
        div.append(enclosingDiv)
        const img = document.createElement('img')
        img.style = 'width:auto;height:80px;padding:10px;'
        img.src = URL.createObjectURL(data)
        enclosingDiv.append(img)
        div.append(h1)
        div.append(h2)
        div.append(h3)
      })
    })
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

  updateProductList (product: Product) {
    if (localStorage.getItem('storedProducts')) {
      const productData = JSON.parse(localStorage.getItem('storedProducts'))
      console.log(productData.products)
      productData.products.push(product)
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

  handleClick (e: Event) {
    console.log(e)
    const li = e.target.closest('.product-container')
    const prodID = li.getAttribute('data-product-id')
    this.$router.push({ name: 'details', params: { Pid: prodID } })
  }

  mounted () {
    this.prodCount = this.productList.length
    for (let iter = 0; iter < this.productList.length; iter++) {
      this.createImage(this.productList[iter])
    }
    const allProductContainer = document.getElementsByClassName('all-product-container')[0]
    allProductContainer.addEventListener('click', this.handleClick)
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
  height: 320px;
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
  background-color: rgb(199, 240, 104);
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

.product-container-div {
  position: relative;
  display: inline-block;
  height: 400px;
  margin-bottom: 20px;
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

</style>
