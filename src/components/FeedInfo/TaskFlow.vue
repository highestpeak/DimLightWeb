<template>
  <div>
    <p>
      <b>jsonOptionalExtraFields:</b>
      <code class="json-code-show">{{jsonOptionalExtraFields}}</code>
    </p>
    <div class="networkWrapper">
      <network ref="network"
        :nodes="processNode"
        :edges="processEdge"
        :options="options">
      </network>
    </div>
    <!-- <img src="@/assets/sample.svg" alt="" style="margin-top:100px"> -->
  </div>
</template>

<script>
// https://visjs.github.io/vis-network/docs/network/
import { Network, DataSet, DataView } from 'vue-vis-network';
export default {
  name: "TaskFlow",
  components: {
    Network
  },
  props: {
    rss: {
      type: Object,
    },
  },
  data() {
    return {
      nodes: new DataSet([
        {id: 1,  label: 'circle',  shape: 'circle' },
        {id: 2,  label: 'ellipse', shape: 'ellipse'},
        {id: 3,  label: 'database',shape: 'database'}
      ]),
      edges: new DataSet([
        {from: 1, to: 2},
        {from: 1, to: 3}
      ]),
      options: {
        nodes: {
          borderWidth: 2,
        },
        edges: {
          length: 300,
          arrows: {
            to: {
              enabled: true,
              scaleFactor: 1,
              type: "arrow"
            }
          },
        },
        physics: {
            enabled: true,
            // hierarchicalRepulsion: {
            //     centralGravity: 0.0,
            //     springLength: 500,
            //     springConstant: 0.01,
            //     nodeDistance: 400,
            //     damping: 0.09
            // },
            // solver: 'hierarchicalRepulsion'
        }
      }
    }
  },
  computed:{
    jsonOptionalExtraFields: function () {
      return this.rss["jsonOptionalExtraFields"];
    },
    processNode: function() {
      var jsonStr =  JSON.parse(this.rss["jsonOptionalExtraFields"]);
      console.log(jsonStr);
      var processArray = jsonStr["process"]
      var nodesSet = []
      for (let index = 0; index < processArray.length; index++) {
        const processName = processArray[index];
        nodesSet.push({
          id: index,  label: processName,  shape: 'circle' 
        })
      }
      return nodesSet
    },
    processEdge: function () {
      var jsonStr = JSON.parse(this.rss["jsonOptionalExtraFields"]);
      var processArray = jsonStr["process"]
      var edgesArray = []
      for (let index = 0; index < processArray.length-1; index++) {
        edgesArray.push({
          from: index,
          to: index+1
        })
      }
      return edgesArray
    }
  }
};
</script>

<style>
.networkWrapper * {
  width:100%;
  height:500px !important;
}
</style>