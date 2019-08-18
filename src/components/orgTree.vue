<template>
  <table class="treetable">
    <tr>
      <td align="top" v-for="(obj, index) in propdata" :key="index" :width="obj.width">
        <div class="box" :style="{ width: propboxw }">
          {{ obj.label }}
        </div>
        <template v-if="obj.children&&obj.children.length>0">
          <org-tree :propdata="obj.children" :propboxw="propboxw"></org-tree>
        </template>
      </td>
    </tr>
  </table>
</template>

<script>
import { countLeaf } from "@/assets/treedata.js";
export default {
  name: "orgTree",
  props: ["propdata", "propboxw"],
  data() {
    return {
      leaf: 0
    };
  },
  watch: {},
  mounted: function() {
    /* 遍历获得比例 */
    let sum=0
    for (let i in this.propdata) {
      let res =this.propdata[i]
      res.leaf = 0;
      countLeaf(this.propdata[i],res);
      sum+=res.leaf
    }
    let unit = Math.floor(100/sum)
    for (let i in this.propdata){
      let res =this.propdata[i]
      res.width = res.leaf*unit+'%'
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.treetable {
  width: 100%;
  td{
    vertical-align: top;
  }
}
/* box的样式，内和外部居中 */
.box {
  border: 1px solid black;
  text-align: center;
  position: relative;
  margin: 0 auto;
}

/*div,*/
/*input,*/
/*select {*/
/*width: 100px;*/
/*text-align: center;*/
/*}*/

/*.cate {*/
/*background-color: white;*/
/*padding: 10px 0;*/
/*border: 1px solid #ddd;*/
/*}*/

/*.add {*/
/*height: 50px;*/
/*display: flex;*/
/*justify-content: center;*/
/*align-items: center;*/
/*}*/

/*.add span {*/
/*display: block;*/
/*width: 40px;*/
/*height: 40px;*/
/*background-color: red;*/
/*}*/
</style>
<!--<div>-->
  <!--<el-input type="text" />-->
<!--</div>-->
<!--<div>-->
  <!--<el-select>-->
    <!--<el-option value="peking" label="peking"></el-option>-->
    <!--<el-option value="else" label="else"></el-option>-->
  <!--</el-select>-->
<!--</div>-->
<!--<div class="add"><span></span></div>-->
