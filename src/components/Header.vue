<template>
  <div>
    <div>
    <div class='heading'>
        <span>
          <img class='logo' :src='logoImg' />
        </span>
        <span class='pageInfo'>{{ pageInfo }}</span>
      </div>
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
  background-color: black;
  opacity: 0.8;
  padding-left: 10px;
}

.pageInfo {
  color: white;
  font-family: 'Nunito Sans', sans-serif;
  font-size: '4 rem';
}

.logo {
  margin-right: 10px;
  width: 80px;
  vertical-align: middle;
}
</style>
