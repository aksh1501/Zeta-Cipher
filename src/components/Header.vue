<template>
  <div>
    <div>
    <ul class='heading'>
        <li>
          <img class='logo' :src='logoImg' />
        </li>
        <li class='page'>{{ pageInfo }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Header extends Vue {
   zeta ='zeta'
   pageInfo ='Cipher - Authentication Centre '
   logoImg =require('../assets/zeta.jpeg')
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box; /*include paddding and border in height and width calculation to make sizing easier*/
  text-align: left;
}

.heading {
  color: white;
  background-color: red;
  opacity: 0.7;
  list-style-type: none;
  margin: 0px 0px 10px 0px;
  height:100px;
}

.page {
  color: black;
  font-family: 'Nunito Sans', sans-serif;
  font-size: '4 rem';
}

.logo {
  margin-right: 10px;
  width: 80px;
  vertical-align: middle;
}
</style>
