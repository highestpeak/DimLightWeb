<template>
  <div class="home">
    <h2 style="margin: 10px 0px;text-align:center;">Welcome to DimLight!</h2>
    <hr />
    <!-- 提示 -->
    <blockquote style="border-left: 5px solid #e84545; padding: 10px 20px;background-color:#e2bcb7">
      这是一个尚在完善中的信息聚合系统，欢迎使用
    </blockquote>
    <b-alert show variant="success">
      <h4 class="alert-heading">Well done!</h4>
      <p>
        ⭐⭐⭐如果您阅读到此信息，说明本系统已经部署成功!⭐⭐⭐
      </p>
    </b-alert>
    <!-- 系统说明 -->
    <b-alert show variant="success">
      <h4 class="alert-heading">System Info</h4>
      <p>
        💡💡💡DimLight 直译为黯淡的光，意译为<b>灯火阑珊</b>。本词来源于一句诗句“众里寻他千百度，蓦然回首，那人却在灯火阑珊处”。
        原来的谷歌/百度给我们寻觅互联网的便捷，而如今互联网却日益封闭，广告横行，算法当权，本项目旨在能通过复兴RSS做一点小小的尝试。
      </p>
    </b-alert>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  data() {
    return {
    };
  },
  computed:{
  },
  methods: {
  },
};
</script>
