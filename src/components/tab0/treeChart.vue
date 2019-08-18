<template>
  <div ref="treeContainer">
    <org-tree :propdata="[treedata]" :propboxw="boxwidth"></org-tree>
    <packaged-cascader :propsource="[treedata]" v-model="casarr" propvaluealias="value"></packaged-cascader>
  </div>
</template>

<script>
import { treedata, countLeaf } from "@/assets/treedata.js";
import OrgTree from "@/components/orgTree.vue";
import PackagedCascader from "@/components/packagedCascader.vue";
export default {
  name: "treeChart",
  components: {
    OrgTree,
    PackagedCascader
  },
  data: function() {
    return {
      treedata: treedata,
      boxwidth: 0,
      casarr:['00','0100']
    };
  },
  watch:{
    casarr(newval){
      console.log(newval)
    }
  },
  mounted() {
    /* 计算出所有叶子节点的个数，以此计算单个box的宽度百分比 */
    let res = this.treedata;
    res.leaf = 0;
    countLeaf(this.treedata, res);
    let unitratio = Math.floor(100 / res.leaf) / 100;
    this.boxwidth =
      Math.floor(unitratio * this.$refs.treeContainer.clientWidth) + "px";
  }
};
</script>

<style scoped></style>
