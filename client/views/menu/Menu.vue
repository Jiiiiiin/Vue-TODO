<template lang="pug">
 .menu
  <ul>
    <li>
      // :to="{name:'app'}"
      router-link(
      :to="{path:'/app/' + userid}"
    ) app
      // <ul>
      //   <li>
      //     router-link(
      //     :to="{path:'/app/test'}"
      //   ) app-child
      //   </li>
      // </ul>
    </li>
    <li>
       router-link(
      :to="{path:'/login'}"
    ) login
    </li>
  </ul>
</template>

<script>
const cacheId = localStorage.getItem('userid')
const userid = cacheId || 'youke'
export default {
  data () {
    return {
      userid
    }
  }
}
</script>
