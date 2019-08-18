<template>
  <div>

    <div class="row">
      <div class="red col-sm-7 col-md-6">
        <div class="row">
          <div class="red child col-sm-7 col-md-6"></div>
          <div class="yellow child col-sm-5 col-md-4"></div>
          <div class="green child col-sm-3 col-md-2"></div>
        </div>
      </div>
      <div class="yellow col-sm-5 col-md-4"></div>
      <div class="green col-sm-3 col-md-2"></div>
    </div>
    <div class="row">
    <div class="col-md-9 col-md-push-3 salmon">.col-md-9 .col-md-push-3</div>
    <div class="col-md-3 col-md-pull-9 pink">.col-md-3 .col-md-pull-9</div>
    </div>

    <div class="row">
      <div class="col-md-5">
        <el-form label-width="100px" >
          <el-form-item label="cate">
            <el-input v-model="formData.cate"></el-input>
          </el-form-item>
          <el-form-item label="color">
            <el-select v-model="formData.color">
              <el-option label="red" value="red"></el-option>
              <el-option label="babyblue" value="babyblue"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="submitForm">submit form</el-button>
      </div>
      <div class="col-md-3">
        <el-upload action="/express/postfile" name="filee">
          <el-button type="primary">Add</el-button>
        </el-upload>
      </div>
      <div class="col-md-4">
        <form action="/express/postfile" method="post" enctype="multipart/form-data">
          <input type="text" name="txt"/>
          <input type="file" name="filee"/>
          <button type="submit">sub</button>
        </form>
      </div>
    </div>

    <el-row>
      <el-col :span="18" :offset="3">
        <el-button @click="add">add</el-button><el-button @click="revise">revise</el-button><el-button @click="deletee">delete</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" :offset="3">
        <el-table :data="listData" highlight-current-row stripe @current-change="changeAction">
          <el-table-column prop="id" label="id" align="center"></el-table-column>
          <el-table-column prop="name" label="name" align="center"></el-table-column>
          <el-table-column prop="profession" label="profession" align="center"></el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogVisible" width="30%" :title="dialogType==0?'revise':'add'">
      <el-form label-width="90px" :rules="currentRules" :model="currentForm" ref="formm">
        <el-form-item label="name" prop="name">
          <el-input v-model="currentForm.name"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="password" v-if="dialogType==1">
          <el-input v-model="currentForm.password"></el-input>
        </el-form-item>
        <el-form-item label="profession" prop="profession">
          <el-input v-model="currentForm.profession"></el-input>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button @click="reviseaddAction">confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from '../../plugin/index'

  export default {
    name: "boottest",
    data: function () {
      return {
        formData: {
          cate: "butterfly",
          color: "babyblue"
        },

        listData:[],
        dialogVisible:false,
        dialogType:1,
        currentForm:{
          id:"",
          name:"",
          password:"",
          profession:"",
        },
        currentRow:{
          id:"",
          name:"",
          password:"",
          profession:"",
        },
        currentRules:{
          name:[{required:true,message:'name quired',trigger:'blur'}],
          password:[{required:true,message:'password quired',trigger:'blur'}],
          profession:[{ required: true, message: 'profession required', trigger: 'blur' } ],
        },
        indexx:undefined,
      }
    },
    created: function () {
      // axios.get("/express/getfile?name=lijing")
      // axios.post("/express/postfile", {name: "lijing", gender: "female"});
      // axios.get("/express/getlist").then((res)=>{
      //   this.listData = res.data;
      //   this.indexx = this.listData.length
      // });
    },
    methods: {
      submitForm:function(){
        axios.post("/express/postfile", this.formData);
      },
      emptyObj(obj){
        for(let i in obj){
          obj[i]="";
        }
      },
      add:function(){
        this.dialogType=1;
        this.emptyObj(this.currentForm);
        this.dialogVisible=true;
      },
      revise:function(){
        if(!!this.currentRow){
          this.dialogType=0;
          this.currentForm=this.currentRow;
          this.dialogVisible=true;
        }else{
          this.$message({message:"请选择一人",type:"warning",duration:2000});
        }
      },
      deletee:function(){
        if(!!this.currentRow){
          axios.get(`/express/delete/${this.currentRow.id}`).then(res=>{
            this.listData = res.data;
          })
        }else{
          this.$message({message:"请选择一人",type:"warning",duration:2000});
        }
      },
      reviseaddAction:function(){
        this.$refs.formm.validate((res)=>{
          if(res){
            this.dialogVisible=false;
            if(this.dialogType==1){
              this.currentForm.id= ++this.indexx;
            }
            axios.post("/express/reviseadd",this.currentForm).then(res=>{
              this.listData = res.data;
            }).catch(err=>{

            })
          }
        })
      },
      changeAction:function(row){
        this.currentRow = row;
      }
    }
  }
</script>
<style>
  .el-input__inner{
    background-color:#eee;
    border:none;
  }
  .el-select .el-input .el-select__caret{
    color:blue;
  }
</style>

<style scoped>
    .el-form-item{
      margin-bottom:0;
      height:50px
    }
    .el-form-item{
      width:80%;
    }
    .el-input,.el-select{
      width:80%;
    }
    .el-form-item{
      margin-bottom:30px;
    }



  div {
    min-height: 20px;
  }

  .child {
    height: 10px;
  }

  .red {
    background-color: red;
  }

  .yellow {
    background-color: yellow;
  }

  .green {
    background-color: green;
  }

  .pink {
    background-color: pink;
  }

  .salmon {
    background-color: salmon;
  }
</style>
