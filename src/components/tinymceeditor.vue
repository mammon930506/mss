<template>
  <div>
    <editor class="tiny" :init="init" v-model="tinyvalue"></editor>
  </div>
</template>

<script>
  import tinymce from 'tinymce/tinymce'
  import Editor from '@tinymce/tinymce-vue'
  import 'tinymce/themes/silver';

  export default {
    name: "tinymceeditor",
    data:function(){
      return {
        tinyvalue:"",
        init:{
          menubar:false,
          statusbar:false,
          skin_url:'http://localhost:8080/mss/src/assets/tinymce/skins/ui/oxide',
          toolbar:'fontselect | undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat'
        }
      }
    },
    components:{
      editor:Editor
    },
    watch:{
      tinyvalue:function(newval,oldval){
        console.log(newval)
      }
    },
    mounted:function(){
      tinymce.init({

      });
    }
  }
</script>

<style>
 div.tox-tinymce{
    border:1px solid #eee!important;
  }
  div.tox-toolbar{
    justify-content: flex-end;
  }
  div.tox-edit-area{
    border:1px solid #eee!important;
  }
  /*.tox-toolbar__group:not(:last-of-type){*/
   /*border:1px solid #eee!important;*/
 /*}*/
</style>
