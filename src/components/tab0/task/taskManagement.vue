<template>

  <div :id="themeEng">

    <div class="filter-container">
      <el-form ref="queryForm" class="queryForm" label-width="80px" :model="queryForm">
        <el-row>
          <el-col :span="22">
            <el-row type="flex" justify-content="space-between">
              <el-form-item label="内容" prop="content">
                <el-input placeholder="请输入任务名称" v-model="queryForm.name"></el-input>
              </el-form-item>

              <el-form-item label="时间" prop="fromtoDates">
                <el-date-picker style="width:42%" type="date"
                                v-model="queryForm.fromtoDates"
                                placeholder="请选择日期" end-placeholder="mm/dd/yyyy">
                </el-date-picker>
                至
                <el-date-picker style="width:42%" type="date"
                                v-model="queryForm.fromtoDates"
                                placeholder="请选择日期" end-placeholder="mm/dd/yyyy">
                </el-date-picker>
              </el-form-item>

              <el-form-item label="审批状态" prop="taskStatus">
                <el-select v-model="queryForm.taskStatus">
                  <el-option v-for="sta in taskStatus" :key="sta" :value="sta">{{ sta }}
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="进行状态" prop="processStatus">
                <el-select v-model="queryForm.processStatus">
                  <el-option v-for="sta in processStatus" :key="sta" :value="sta">{{ sta }}
                  </el-option>
                </el-select>
              </el-form-item>

              <!--<el-form-item label="是否逾期" prop="isOutofDate">-->
              <!--<el-select v-model="queryForm.isOutofDate">-->
              <!--<el-option v-for="sta in isOutofDate" :key="sta" :value="sta">{{ sta }}-->
              <!--</el-option>-->
              <!--</el-select>-->
              <!--</el-form-item>-->

            </el-row>
          </el-col>
          <el-col :span="2">
            <el-row type="flex" justify="space-around">
              <el-button type="primary" @click="querySearch">搜索</el-button>
            </el-row>
          </el-col>

        </el-row>
      </el-form>

      <el-row class="blankDivider"></el-row>
      <el-row style="padding:8px 20px">
        <el-col :span="2">
          <el-button type="primary" size="small" @click="openDialog">新增</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" size="small" @click="openConfirm">删除</el-button>
        </el-col>
      </el-row>

      <el-table @selection-change="selectionChange" :data="tableData" :stripe="true" align="center"
                :height="tableHeight">
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column align="center" label="序号" type="index"></el-table-column>
        <el-table-column align="center" label="内容" prop="title"></el-table-column>
        <el-table-column align="center" label="查看内容">
          <template slot-scope="scope">
            <router-link :to="{name:'任务详情'}">
              {{ scope.row.title }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column align="center" label="发布者" prop="assigner"></el-table-column>
        <el-table-column align="center" label="发布时间" prop="assignDate"></el-table-column>
        <el-table-column align="center" label="提交时间" prop="submitData"></el-table-column>
        <el-table-column align="center" label="截止时间" prop="deadline"></el-table-column>
        <el-table-column align="center" label="进行状态" prop="processStatus"></el-table-column>
        <el-table-column align="center" label="完成状态" prop="taskStatus"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <router-link :to="{name:'任务详情'}">
              <el-button type="primary">查看详情</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="blankDivider"></el-row>
      <el-row style="padding:8px">
        <el-pagination
          background
          layout="prev, pager, next,sizes,jumper"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          @size-change="pageSizeChange"
          @current-change="pageCurrentChange"
          :total="tableData.length">
        </el-pagination>
      </el-row>
      <el-dialog title="新建任务" width="50%" :visible.sync="dialogVisible">
        <el-form ref="dialogForm" :model="dialogForm" label-width="120px" :rules="dialogFormRules">
          <el-form-item label="任务主题" prop="title">
            <el-input class="modified" v-model="dialogForm.title"></el-input>
          </el-form-item>
          <el-form-item label="任务截止时间" prop="deadline">
            <el-date-picker class="modified" style="width:100%" v-model="dialogForm.deadline"
                            type="date"
                            placeholder="mm/dd/yyyy"></el-date-picker>
          </el-form-item>
          <el-form-item label="任务发布对象" prop="assignee">
            <el-cascader class="modified" :show-all-levels="false"
                         :options="assigneeData"
                         v-model="dialogForm.assignee"
                         change-on-select>
            </el-cascader>
          </el-form-item>
          <el-form-item label="任务审批对象" prop="approver">
            <el-cascader class="modified" :show-all-levels="false"
                         :options="approverData"
                         v-model="dialogForm.approver">
            </el-cascader>
          </el-form-item>
          <el-form-item label="任务内容" prop="content">
            <!--<tinymce v-model="dialogForm.content"></tinymce>-->
            <!--<el-input type="textarea" autosize v-model="dialogForm.content"></el-input>-->
          </el-form-item>
          <el-form-item label="任务附件">
            <input type="file"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">返回</el-button>
          <el-button type="primary" @click="submitTask">提交</el-button>
        </div>
      </el-dialog>

    </div>
  </div>

</template>

<script>
  export default {
    name: 'taskManagement',
    // components: {
    //   tinymce: Tinymce
    // },
    data: function () {
      return {
        tableHeight: window.innerHeight - 350,
        theme: '任务',
        themeEng: 'taskManagement',
        selected: [],
        queryForm: {
          content: '',
          fromtoDates: '',
          taskStatus: '全部',
          processStatus: '全部',
          isOutofDate: ''
        },
        dialogVisible: false,

        tableData: [{
          title: '11',
          assigner: '',
          assignDate: '',
          submitData: '',
          deadline: '',
          processStatus: '',
          taskStatus: ''
        }, {
          title: '22',
          assigner: '',
          assignDate: '',
          submitData: '',
          deadline: '',
          processStatus: '',
          taskStatus: ''
        }],

        dialogForm: {
          title: '',
          deadline: '',
          assignee: [],
          approver: [],
          content: '',
          file: ''
        },
        dialogFormRules: {
          title: [{required: true, message: '必填', trigger: 'blur'}],
          deadline: [{required: true, message: '必填', trigger: 'blur'}],
          assignee: [{type: 'array', required: true, message: '必填', trigger: 'blur'}],
          approver: [{type: 'array', required: true, message: '必填', trigger: 'blur'}]
          // content: [{ requird: true, message: '必填', trigger: 'blur' }],
          // file: ''
        },
        assigneeData: [{value: '1', label: '1', children: [{value: '2', label: '2'}]}],
        approverData: [{value: '3', label: '3', children: [{value: '4', label: '4'}]}],
        taskStatus: ['全部', '已提交', '审批通过', '审批驳回'],
        processStatus: ['全部', '进行中', '已关闭'],
        isOutofDate: ['是', '否']
      }
    },
    mounted: function () {
      let instance = this
      window.onresize = function () {
        instance.tableHeight = window.innerHeight - 350
      }
    },
    watch: {
      dialogVisible: function (newval, oldval) {
        if (newval === false) {
          this.$refs.dialogForm.resetFields()
        }
      }
    },
    methods: {
      querySearch: function () {

      },
      queryReset: function () {
        for (let i in this.queryForm) {
          this.queryForm[i] = ''
        }
        this.queryForm.processStatus = '全部'
        this.queryForm.taskStatus = '全部'
      },
      openDialog: function () {
        this.dialogVisible = true
      },
      openConfirm: function () {
        console.log(this.selectedRole)
        if (this.selected.length) {
          this.$confirm(`本次操作将删除该${this.theme}！是否继续？`, {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

          })
        } else {
          return this.$message.warning(`请先选择一个${this.theme}`)
        }
      },
      submitTask: function () {
        this.$refs.dialogForm.validate((valid) => {
          if (valid) {
            this.dialogVisible = false
          }
        })
      },
      selectionChange: function (val) {
        this.selected = val
      },
      pageSizeChange: function () {

      },
      pageCurrentChange: function () {

      }
    }

  }
</script>

<style lang="scss">
  .d2-container-full {
    border: none !important;
  }

  .el-table th {
    background-color: #E4EEFC !important;
  }

  .theme-dark .d2-layout-header-aside-group {
    background-color: #F3F6FD !important;
  }

  .el-select .el-input .el-select__caret {
    color: #4C82FD !important;
  }

  .el-input__inner {
    border: none !important;
    background-color: #F7F7FA !important;
  }

  .el-range-input {
    background-color: #F7F7FA;
  }

  .el-table {
    .el-button, .el-button--primary, .el-button--small {
      color: #4C77FF;
      background-color: #E7EFFF !important;
      border: 1px solid #E7EFFF;
      font-weight: bold;
    }
  }

  .el-input__prefix {
    color: #4C77FF;
  }

  .el-checkbox__inner {
    border: none;
    background-color: #E7EFFF;
  }
  .el-date-editor>.el-input__inner{
    border:1px solid #eee!important;
    background-color:white!important;
  }

  .el-form-item__label {
    margin: 0px!important;
  }



</style>
<style lang="scss" scoped>

  #taskManagement {
    /*margin: -20px;*/
    background-color: white;
  }

  .blankDivider {
    height: 15px;
    background-color: #F3F6FD;
  }

  .queryForm {
    .el-form-item.el-form-item--small {
      margin-bottom: 0;
    }
  }

  .el-form .el-col {
    padding: 18px 0;
  }
  .el-form-item {
    margin: 0px;
  }

</style>
