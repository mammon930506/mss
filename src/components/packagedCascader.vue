<template>
  <div>
    <el-cascader
      class="packagedcascader"
      v-model="familyarr"
      :options="propsource"
      :show-all-levels="false"
      :props="{ multiple: true, checkStrictly: true }"
      @change="handleChange"
    ></el-cascader>
  </div>
</template>

<script>
export default {
  name: "cascader",
  props:{
    propsource:{},
    propvaluealias:{},
    proplabelalias:{},
    value:{
      default:[]
    }
  },
  data() {
    return {
      familyarr: []
    };
  },
  watch: {
    propsource: {
      handler([obj]) {
        /* 在source传进来时就给每个节点都配上父节点的指针 */
        this.traverseAddParent(obj);
      },
      immediate: true
    },
    value: {
      handler(valuearr) {
        /* 数组处理为family数组 */
        let temp = [];
        for (let i in valuearr) {
          temp.push(this.value2family(valuearr[i]));
        }
        this.familyarr = temp;
      },
      immediate: true
    }
  },
  methods: {
    handleChange(val) {
      /* 选择变更时familyarr变了 */
      let arr=[]
      this.$nextTick(()=>{
        for(let i in val){
          arr[i]=val[i][val[i].length-1]
        }
        this.$emit('input',arr)
      })
    },
    traverseAddParent(obj) {
      if (obj.children && obj.children.length > 0) {
        let p = obj.children;
        for (let i in p) {
          p[i].parent = obj;
          this.traverseAddParent(p[i]);
        }
      }
    },
    traverseFind(value, obj) {
      /* 根据value遍历得到对应节点并且返回 */
      if (!obj) {
        obj = this.propsource[0];
      }
      if (obj[`${this.propvaluealias}`] === value) {
        return obj;
      } else {
        if (obj.children && obj.children.length > 0) {
          let p = obj.children;
          for (let i in p) {
            let ret;
            if ((ret = this.traverseFind(value, p[i]))) {
              return ret;
            }
          }
        }
      }
    },
    value2family(value) {
      /* 得到el-cascader所需要的familyarr[i]并返回 */
      let res = [];
      let node = this.traverseFind(value);
      let current = node;
      while (current) {
        res.push(current[`${this.propvaluealias}`]);
        current = current.parent;
      }
      res.reverse();
      return res;
    }
  }
};
</script>

<style lang="scss">
.el-cascader.packagedcascader {
  width: 100%;
  input {
    background-color: transparent !important;
  }

  .el-input__inner {
    background-color: transparent !important;
    border: none;
  }
}
</style>
