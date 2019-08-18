<template>
    <span style="text-align: center"><i :class="tabdata.icon+' fa fa-2x'"></i><div>{{tabdata.name}}</div></span>
</template>

<script>
    export default {
        name: "tab",
        props:["tabdata"],
        data:function(){
            return{

            }
        }
    }
</script>

<style scoped>
    span{
        display: inline-block;
    }
</style>
