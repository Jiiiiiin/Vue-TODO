<template lang="pug">
  <!-- header(class='main-header') -->
  header(:class='$style.mainHeader')
    h1 JTODO
</template>

<docs>通用头文件</docs>

<!-- <style lang="stylus" scoped>-->
<!-- 使用cssmodules的方式来编译下面这块样式，vue-loader在编译完成之后会给当前组件添加一个$style的属性-->
<!-- 这个 module 特性指引 Vue Loader 作为名为 $style 的计算属性，向组件注入 CSS Modules 局部对象。 -->
<style lang="stylus" module>
.main-header {
  text-align: center;

  h1 {
    font-size: 100px;
    color: rgba(174, 150, 124, 0.4);
    font-weight: 100;
    margin: 20px;
  }
}
</style>
