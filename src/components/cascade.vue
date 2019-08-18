<template>
    <ul>
        <li v-for="node in data" v-bind:key="node.name"
            style="position:relative;background-color:white;line-height:36px;width:80px;height:36px;">
            <span style="display:inline-block;width:100%;height:100%;text-align:center" v-on:click="trigger(node)">{{node.name}}</span>
            <transition name="castrans">
                <div v-if="node.show" style="overflow:visible;position:absolute;left:80px;top:0">
                    <cascade v-bind:data="node.children"></cascade>
                </div>
            </transition>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "cascade",
        props: ["data"],
        methods: {
            traversefalse: function (obj) {
                obj.show = false;
                if (!!obj.children && obj.children.length > 0) {
                    for (let i in obj.children) {
                        this.traversefalse(obj.children[i]);
                    }
                }
            },
            trigger: function (obj) {
                console.log(obj);
                for (let i in this.data) {
                    if (this.data[i] != obj) {
                        this.data[i].show = false;
                    } else {
                        obj.show = !obj.show;
                        if (obj.show == false) {
                            this.traversefalse(obj);
                        }
                    }
                }
            }
        },
        watch: {
            data: function (newval) {
                console.log("watch data:", newval);
            }
        }
    }
</script>

<style scoped>
    .castrans-enter, .castrans-leave-to {
        opacity: 0;
    }

    .castrans-enter-active, .castrans-leave-active {
        transition: opacity 0.3s ease-out;
    }
    ul, li {
        list-style: none;
        user-select: none;
    }
</style>