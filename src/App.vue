<template>
  <div id="app">
    <div style="height:60px;background-color:#ffffff;position:relative">
      <span class="barorigincls" :style="[commonstyle1]">
        <i class="fa fa-bars fa-3x" @click="fullabbr"></i>
      </span><span class="taborigincls" :style="[commonstyle1]">
      <tab v-for="(tabdata,index) in tabtree" :tabdata="tabdata" :key="index" @click.native="tabchange(index)"
           ></tab>
      </span>
    </div>
    <div :style="[{　height: 'calc(100vh - 60px)' , position:'relative'}]">
      <div class="asideorigincls" :class="asidecls"
           :style="[commonstyle,{backgroundColor:'#ffffff',animationFillMode:'both',zIndex:1}]">
        <div style="width:200px;">
          <foldertree v-on:cas="(casindex == $event&&casindex!=undefined)?casindex=undefined:casindex=$event"
                      v-if="tabtree.length&&asideshow" :tree="tabtree[indexx].children" :iscascade="!full"
                      v-on:routechange="goroute({path:tabtree[indexx].path+$event.path,name:tabtree[indexx].name+'+'+$event.name})"></foldertree>
        </div>
      </div>

      <div class="mainorigincls" :class="maincls"
           :style="[commonstyle,{backgroundColor:'#f2f2f2',animationFillMode:'both'}]">
        <div style="height:40px;background-color:#e1d9c5;padding-left:30px;">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item style="line-height:40px;" v-for="(name,index) in namearr"
                                v-bind:key="index">{{name}}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div style="height:calc( 100vh - 100px );overflow:auto;padding:20px;background-color: #F3F6FD;"><router-view></router-view></div>
      </div>
      <div class="cascade" :style="[{top:casindex*36+'px'}]">
        <transition name="castrans">
          <cascade v-if="casindex!=undefined&&casshow"
                   :data="tabtree.length?(tabtree[indexx].children[casindex].children):''"></cascade>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  const Vue = require("vue/dist/vue");
  export default {
    name: 'App',
    props: ["wwidth", "tabtree"],
    data: function () {
      return {
        commonstyle: {
          position: 'absolute',
          height: "100%",
          overflowY: "auto",
        },
        commonstyle1: {
          display: "inline-flex",
          height: "100%",
          alignItems: "center",
        },
        asidecls: "",
        maincls: "",
        indexx: 0,
        asideshow: true,
        namearr: [],
        full: true,
        toggle: false,
        casindex: undefined,
        casshow: true,
      }
    },
    methods: {
      traversefalse: function (obj) {
        obj.show = false;
        if (!!obj.children && obj.children.length > 0) {
          for (let i in obj.children) {
            this.traversefalse(obj.children[i]);
          }
        }
      },
      fullabbr: function () {
        if (this.wwidth > 992) {
          this.full = !this.full;
          if (this.full) {
            this.casindex = undefined;
            this.asidecls = "asidefull";
            this.maincls = "mainabbr";
          } else {
            this.asidecls = "asideabbr";
            this.maincls = "mainfull";
          }
        } else {
          this.toggle = !this.toggle;
          if (this.toggle) {
            this.asidecls = "asideshow";
            this.maincls = "mainhide";
          } else {
            this.asidecls = "asidehide";
            this.maincls = "mainshow";
          }
        }
      },
      goroute: function (obj) {
        this.$router.push(obj.path);
        this.namearr = obj.name.split("+");
      },
      tabchange: function (index) {
        this.casindex = undefined;
        this.asideshow = false;
        this.indexx = index;
        Vue.nextTick(() => {
          this.asideshow = true;
        });

        let node = this.tabtree[this.indexx];
        let ev = {name: node.name, path: node.path};
        while (!!node.children && node.children.length != 0) {
          node = node.children[0];
          ev = {name: ev.name + "+" + node.name, path: ev.path + node.path};
        }
        this.goroute(ev);
      }

    },
    watch: {
      casindex: function (newval, oldval) {
        console.log(newval, oldval);
        this.casshow = false;
        this.$nextTick(() => {
          this.casshow = true;
          if (this.casindex == undefined || (oldval != undefined && newval != oldval)) {
            this.traversefalse(this.tabtree[this.indexx].children[oldval]);
          }
        })
      },
      wwidth: function (newval, oldval) {
        if ((newval - 992) * (oldval - 992) > 0) {
          return;
        } else {
          this.full = true;
          if (newval < 992) {
            // this.casindex = undefined;
            this.asidecls = "asidehide";
            this.maincls = "mainshow";
          } else {
            this.asidecls = "asideshow";
            this.maincls = "mainhide";
          }
        }
      },
      tabtree: function (newval, oldval) {
        console.log(newval, oldval);
        this.tabchange(0);
      },
    }
  }
</script>

<style lang="less">
  @import "css/index.css";

  .cascade {
    position: absolute;
    left: @abbr_side_width;
  }

  @full_side_width: 200px;
  @abbr_side_width: 70px;
  @duration: 0.5s;
  @media screen and (min-width: 992px) {
    .asideorigincls {
      width: @full_side_width;
    }

    .mainorigincls {
      left: @full_side_width;
      width: calc(100vw - @full_side_width);
    }

    .barorigincls {
      width: @full_side_width;
      justify-content: flex-end;
      vertical-align: middle;
    }

    .taborigincls {
      width: 50%;
      margin-left: 5%;
      justify-content: space-around;
    }
  }

  @media screen and (max-width: 992px) {
    .asideorigincls {
      width: 0px;
    }

    .mainorigincls {
      left: 0px;
      width: calc(100vw);
    }

    .barorigincls {
      width: 20%;
      justify-content: space-around;
      vertical-align: middle;
    }

    .taborigincls {
      width: 80%;
      justify-content: space-around;
    }
  }

  .asidehide {
    animation: asidehide @duration;
  }

  .mainshow {
    animation: mainshow @duration;
  }

  .asideshow {
    animation: asideshow @duration;
  }

  .mainhide {
    animation: mainhide @duration;
  }

  @keyframes asideshow {
    0% {
      width: 0;
    }
    100% {
      width: @full_side_width;
    }
  }

  @keyframes mainhide {
    0% {
      left: 0px;
      width: 100vw;
    }
    100% {
      left: @full_side_width;
      width: calc(100vw - @full_side_width);
    }
  }

  @keyframes asidehide {
    0% {
      width: @full_side_width;
    }
    100% {
      width: 0;
    }
  }

  @keyframes mainshow {
    0% {
      left: @full_side_width;
      width: calc(100vw - @full_side_width);
    }
    100% {
      left: 0px;
      width: 100vw;
    }
  }

  .asideabbr {
    animation: asideabbr 0.3s;
  }

  .mainfull {
    animation: mainfull 0.3s;
  }

  .asidefull {
    animation: asidefull @duration;
  }

  .mainabbr {
    animation: mainabbr @duration;
  }

  @keyframes asidefull {
    0% {
      width: @abbr_side_width;
    }
    100% {
      width: @full_side_width;
    }
  }

  @keyframes mainabbr {
    0% {
      left: @abbr_side_width;
      width: calc(100vw - @abbr_side_width);
    }
    100% {
      left: @full_side_width;
      width: calc(100vw - @full_side_width);
    }
  }

  @keyframes asideabbr {
    0% {
      width: @full_side_width;
    }
    100% {
      width: @abbr_side_width;
    }
  }

  @keyframes mainfull {
    0% {
      left: @full_side_width;
      width: calc(100vw - @full_side_width);
    }
    100% {
      left: @abbr_side_width;
      width: calc(100vw - @abbr_side_width);
    }
  }

</style>
