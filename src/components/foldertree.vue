<template>
    <ul>
        <li v-for="(node,index) in tree" v-bind:key="node.name" style="position:relative;box-sizing: border-box" :class="{liborder:!iscascade,liclean:iscascade}">
            <span style="line-height:36px;display:block;height:100%;" v-on:click="iscascade&&($emit('cas',index)),trigger($event,node),(node.children&&node.children.length>0)?'':($emit('routechange',{path:node.path,name:node.name}))">
                <i :class="node.icon+' fa fa-2x'" style="vertical-align: middle;margin-left:20px;margin-right:10px"></i><span v-show="!iscascade">{{ node.name }}</span>
            </span>
            <div v-show="!iscascade" :style="[origin,{overflow:'hidden'}]">
                <foldertree v-bind:tree="node.children" v-on:routechange="$emit('routechange',{path:node.path+$event.path,name:node.name+'+'+$event.name})"></foldertree>
            </div>
        </li>
    </ul>
</template>

<script>
    const Vue = require("vue/dist/vue");
    export default {
        name: "foldertree",
        props: ["tree", "iscascade"],
        data: function () {
            return {
                origin: {
                    height: "0px",
                    transition: "all 0.1s linear",
                },
                sum: 0,
                timestamp:0,
            }
        },
        mounted: function () {

        },
        watch: {},
        methods: {
            traversetree: function (node) {
                if(node.show == true&&(!!node.children)) {
                    this.sum+=node.children.length;
                    for (let i = 0, len = node.children.length; i < len; i++) {
                        this.traversetree(node.children[i]);
                    }
                }
            },
            trigger: function (e, obj) {
                if(this.iscascade){
                    return;
                }
                if(new Date().getTime() - this.timestamp<100){
                    this.timestamp = new Date().getTime();
                    return;
                }
                obj.show = !obj.show;
                if (!!obj.children && obj.children.length > 0) {
                    let sibling = e.currentTarget.nextElementSibling;
                    if (obj.show) {
                        this.sum=0;
                        this.traversetree(obj)
                        sibling.style.height = this.sum * 36 + "px";
                        setTimeout(() => {
                            sibling.style.height = "auto";
                        }, 100)
                    } else {
                        sibling.style.height = sibling.clientHeight + "px";
                        setTimeout(() => {
                            sibling.style.height = 0;
                        }, 100)
                    }
                }
            }
        },
    }
</script>

<style scoped>

    .cascadecls {
        position: absolute;
        top: 0;
        z-index: 10;
        width: 400px;
        left: 50px;
    }

    ul, li, div {
        list-style: none;
        user-select: none;
    }
    .liborder{
        border-bottom:1px solid #aaaaaa;
    }
    li.liborder:nth-child(1){
        border-top:1px solid #aaaaaa;
    }
    .liclean{
        border-bottom:none;
    }


    .opencascls {
        height: 100px;
        transition: height 0.5s linear;
    }

    .closecascls {
        height: 0px;
        transition: height 0.3s linear;
    }
</style>