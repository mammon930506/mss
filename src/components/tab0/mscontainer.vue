<template>
  <el-container class="total">
    <el-header>

      <el-tabs v-model="tabname" @tab-click="handleclick" class="ttab">
        <el-tab-pane label="tab0" name="tab0"></el-tab-pane>
        <el-tab-pane label="tab1" name="tab1"></el-tab-pane>
        <el-tab-pane label="tab2" name="tab2"></el-tab-pane>
      </el-tabs>

    </el-header>
    <el-container class="ccontainer">
      <el-aside width="200px" class="aside">
        <el-row>
          <el-col>
            <el-menu default-active="1-2" @select="sselect">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>下拉一</span>
                </template>
                <el-menu-item-group title="分组一">
                  <el-menu-item index="1-1">选项一</el-menu-item>
                  <el-menu-item index="1-2">选项二</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组一">
                  <el-menu-item index="1-3">选项三</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>子下拉</span>
                  </template>
                  <el-menu-item index="1-4-1">选项四</el-menu-item>
                </el-submenu>

              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>

      </el-aside>
      <el-main class="main">

        <el-breadcrumb>
          <el-breadcrumb-item v-for="path in breadpath" :key="path">{{path}}</el-breadcrumb-item>
        </el-breadcrumb>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import axios from '../../plugin/index'
  export default {
    name: "mscontainer",
    data:function(){
      return {
        tabname:"",
        breadpath:[],
      }
    },
    methods:{
      handleclick:function(){
        console.log(this.tabname);
      },
      sselect:function(index,indexPath){
        this.breadpath = indexPath;
      }
    }
  }
</script>

<style scoped>
  .ttab{
    margin-left:200px;
  }
  .total {
    height: calc(100% - 40px)
  }

  .ccontainer {
    height: calc(100% - 60px);
  }

  .aside, .main {
    height: 100%;
  }

  .main {
    width: calc(100% - 200px);
  }
</style>
