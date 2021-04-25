<template>
  <div>
    <b-card no-body class="overflow-hidden" style="width: 100%">
      <b-row no-gutters>
        <b-col md="2">
          <b-card-img
            :src="imgSrc"
            alt="Image"
            class="rounded-0"
          ></b-card-img>
        </b-col>
        <b-col md="10">
          <b-card-body :title="itemTitle">
            <b-card-text class="card-text">
              {{itemDesc}}
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "FeedItemCard",
  props: {
    imgSrc:  {
      type: String,
      default: 'https://picsum.photos/400/400/?image=20'
    },
    itemTitle: {
      type: String,
      default: '这里是Item的标题'
    },
    itemDesc: {
      type: String,
      default: '这里是Item的描述'
    }
  }
};
</script>

<style>
.card-title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
}
.card-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>