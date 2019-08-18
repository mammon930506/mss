<template>
  <!--<d2-container>-->
  <div id="taskDetail">

    <el-row class="detailRow">

    </el-row>
    <el-row class="blankDivider"></el-row>

    <el-row class="titleRow">
      <el-col :span="10" class="title">
        <span class="blueStarter"></span>
        <span>新建任务</span>
      </el-col>
    </el-row>
    <el-row class="detailRow">


      <el-form label-width="100px">

        <el-row>
          <el-col :span="8">
            <el-form-item label="任务主题">
              <el-input placeholder="请输入任务主题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="1">
            <el-form-item label="任务截止时间">
              <el-date-picker
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item class="multiSelect" label="发布对象">
            <el-cascader
              :options="assigneeData"
              :props="{ multiple: true }"
              placeholder="添加对象"
              clearable>
            </el-cascader>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item class="multiSelect" label="审核对象">
            <el-cascader
              :options="approverData"
              :props="{ multiple: true }"
              placeholder="添加对象"
              clearable>
            </el-cascader>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item>
            <tinymceEditor></tinymceEditor>
          </el-form-item>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item>
              <el-upload
                action=""
                multiple
                :limit="3"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-row type="flex" justify="end">
              <el-button type="primary" plain>返回</el-button>
              <el-button type="primary">提交</el-button>
            </el-row>
          </el-col>
        </el-row>

      </el-form>

    </el-row>
    <el-row class="blankDivider"></el-row>

    <el-row class="titleRow">
      <el-col :span="10" class="title">
        <span class="blueStarter"></span>
        <span>当前审批节点</span>
      </el-col>
    </el-row>
    <el-row class="detailRow">
      <el-form label-width="100px">

        <el-row>
          <el-form-item label="审批结果">
            <el-select>
              <el-option v-for="(res,index) in outcomes" value="res" :key="index">{{res}}</el-option>
            </el-select>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </el-form-item>
        </el-row>

        <el-row>
          <el-col :span="16" :offset="8">
            <el-form-item>
              <el-row type="flex" justify="end">
                <el-button type="primary" plain>返回</el-button>
                <el-button type="primary">提交</el-button>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </el-row>

    <el-row class="blankDivider"></el-row>
    <el-row class="titleRow">
      <el-col :span="10" class="title">
        <span class="blueStarter"></span>
        <span>任务标题</span>
      </el-col>
    </el-row>
    <el-row class="detailRow">
      <el-form label-width="100px">
        <el-row>
          <el-form-item label="发布者">
            <el-tag type="info">党工部--丁鹏</el-tag>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="截止时间">
            <el-tag type="warning">2019-9-12</el-tag>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="发布对象">
            <el-tag style="margin-right:10px" v-for="i in 8" :key="i">航天信息临时党会{{i}}</el-tag>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="审核对象">
            <el-tag style="margin-right:10px" v-for="i in 6" :key="i">航天信息临时党会{{i}}</el-tag>
          </el-form-item>
        </el-row>
      </el-form>
      <el-row class="blankDividerS"></el-row>
      <el-row>
        党章规定：“企业、农村、机关、学校、科研院所、街道、人民解放军连队和其他基层单位，凡是有正式党员三人以上的，都应当成立党的基层组织。党的基层组织，根据工作需要和党员人数，经上级党组织批准，分别设立党的基层委员会、总支部委员会、支部委员会。

        建立党支部的一般程序

        1、向上级党委写出建立党支部的请示。请示的内容包括：建制单位的工作性质、人员数量等简要情况;现有正式党员、预备党员的数量，建立党支部的依据和理由;所建党支部的性质;党支部委员会组成人数和委员设置方案等。

        2、上级党组织批准建立党支部以后，应召开支部党员大会，以无记名投票方式差额选举产生支部委员会。

        3、召开党支部委员会，等额提名或直接选举产生党支部书记、副书记，并对委员进行分工。

        4、向上级党委写出党支部委员会组成的请示。请示的主要内容包括：选举支部委员会的依据;支部党员大会进行选举的简要情况，包括时间、出席大会的党员情况、候选人名额与应选人名额差额情况、选举结果等;党支部委员会选举书记;副书记的情况以及党支部委员的分工情况。

        5、上级批复。党支部委员会开始工作，履行自己职责。
      </el-row>
    </el-row>

    <el-row class="blankDivider"></el-row>
    <el-row class="titleRow">
      <el-col :span="10" class="title">
        <span class="blueStarter"></span>
        <span>审批记录</span>
      </el-col>
    </el-row>
    <el-row class="detailRow">

    </el-row>

    <el-row class="blankDivider"></el-row>

    <el-row type="flex" justify="end">
      <router-link :to="{name:'任务管理'}">
        <el-button type="primary">返回</el-button>
      </router-link>
    </el-row>
  </div>

  <!--</d2-container>-->
</template>

<script>
  import TinymceEditor from '../../tinymceeditor.vue'

  export default {
    name: 'taskDetail',
    components: {
      tinymceEditor: TinymceEditor
    },
    data: function () {
      return {
        taskObj: {
          title: '任务标题',
          assignDate: '2019-5-6',
          assigner: '党委',
          assignee: '党支部',
          content: '什么计划',
          file: []
        },
        steps: [{title: '新建', pass: true}, {title: '已提交', pass: true}, {title: '审批中', pass: false}],
        assigneeData: [{
          label: '0', value: '0',
          children: [{label: '00', value: '00'}, {
            label: '01',
            value: '01',
            children: [{label: '010', value: '010'}, {label: '011', value: '011'}]
          }, {label: '10', value: '10'}, {
            label: '11',
            value: '11',
            children: [{label: '110', value: '110'}, {label: '111', value: '111'}]
          }]
        }],
        approverData: [],
        fileList: [],
        outcomes: ['通过', '驳回'],
      }
    },
    created: function () {

    },
    methods: {}
  }
</script>

<style scoped>
  #taskDetail {
    /*margin: -20px;*/
    background-color: white;
  }

  .titleRow {
    border-bottom: 2px solid #F3F6FD;
    line-height: 40px;
    font-weight: bold;
    font-size: 14px;
    color: #606266;
  }

  .blueStarter {
    display: inline-block;
    width: 12px;
    height: 30px;
    background-color: rgba(0, 77, 255, 1);
    border-radius: 5px;
    vertical-align: middle;
    margin: 0 15px;
  }

  .detailRow {
    padding: 25px 45px;
    font-size: 13px;
    line-height: 24px;
    color: #606266
  }

  .blankDivider {
    height: 15px;
    background-color: #F3F6FD;
  }
  .blankDividerS{
    height:2px;
    background-color:#F3F6FD;
  }

  .detailRow >>> .el-form-item__label {
    text-align: justify !important;
  }

  .multiSelect >>> .el-form-item__content {
    height: 40px !important;
  }

  .multiSelect >>> .el-cascader {
    height: 40px !important;
  }

  .multiSelect >>> .el-cascader__tags .el-tag {
    background-color: #E7EFFF !important;
    color: rgba(0, 77, 255, 1) !important;
  }

  .multiSelect >>> .el-cascader__tags {
    position: relative !important;
    transform: translateY(-195%) !important;
  }

  .multiSelect >>> .el-input {
    width: 110%;
  }

  .multiSelect >>> .el-input__inner {
    border: 1px solid #DCDFE6 !important;
    background-color: white !important;
  }

  .el-upload > .el-button--primary {
    background-color: white;
    color: #BEC7D8;
    border-color: #ccc !important;
  }

</style>
