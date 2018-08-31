<template>
<div class="page-container">
<md-app md-waterfall md-mode="overlap">
  <md-app-toolbar class="md-primary md-large" style="position:fixed">
    <div class="md-toolbar-row">
      <span class="md-title">气滞（血瘀）型体质判别</span>
      <div class="md-toolbar-section-end">
        <md-button class="md-icon-button" to='2'>
          <md-icon>exit_to_app</md-icon>
        </md-button>
      </div>
    </div>
  </md-app-toolbar>

  <md-app-content>
    <div class="md-headline" style="text-align:center;margin:10px;">气滞（血瘀）型体质判别</div>
    <div class="question">
      <div class="ask ">您的性别<span class="required-area">必填</span></div>
      <md-radio v-model="data.sex" :value="'M'">男</md-radio>
      <md-radio v-model="data.sex" :value="'F'">女</md-radio>
    </div>
    <div class="question">
      <div class="ask">出生日期<span class="required-area">必填</span></div>
      <md-datepicker v-model="data.birthday" md-immediately required>
        <label>选择日期</label>
      </md-datepicker>
    </div>
    <div class="question" style="width:40%">
      <div class="ask">尊姓大名</div>
      <md-field>
        <label>姓名</label>
        <md-input v-model="data.name"></md-input>
      </md-field>
    </div>
    <div class="question">
      <div class="ask">联系方式</div>
      <div style="display:block;width:100%;height:80px">
      <div style="display:inline-block;width:40%;float:left;">
        <md-field>
          <label>电话号码</label>
          <md-input type="text" name="email" v-model="data.phone"></md-input>
        </md-field>
      </div>
      <div style="display:inline-block;width:55%;float:right;">
        <md-field :class="{ 'md-invalid': errors.first('email') !== undefined }">
          <label>邮箱地址</label>
          <md-input type="text" name="email" v-model="data.email" v-validate="'required|email'"></md-input>
          <span class="md-error" v-show="errors.has('email')">请输入合法的邮箱地址。</span>
        </md-field>
      </div>
      </div>
    </div>

    <div class="question" v-for="question in data.sex === 'F'? questions : questions.slice(0, 14)" :key="question.index" style="min-width:100px;">
      <div class="ask">{{question.index}}. {{question.ask}}<span class="required-area">必填</span></div>
      <md-radio v-model="data.result[question.index-1]" :value="true">{{question.trueStr}}</md-radio>
      <md-radio v-model="data.result[question.index-1]" :value="false">{{question.falseStr}}</md-radio>
    </div>

    <div style="text-align:center;height:100px">
      <md-button class="md-raised md-primary" @click="submit">提交</md-button>
    </div>
    <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showSnackbar" md-persistent>
      <span>{{snackbarContent}}</span>
      <md-button class="md-primary" @click="showSnackbar=false">好</md-button>
    </md-snackbar>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>感谢您的测试</md-dialog-title>
      <md-dialog-content v-if="showResult">您有80%的机率是气滞型体质</md-dialog-content>
      <md-dialog-content v-else>有80%的可能性您不是气滞型体质</md-dialog-content>
    </md-dialog>
  </md-app-content>
</md-app>
</div>
</template>

<script>
import Axios from 'axios';

export default {
  name: 'Questionnaire1',
  data() {
    return {
      data: {
        sex: 'M',
        birthday: '',
        name: '',
        phone: '',
        email: '',
        result: new Array(20).fill(null),
      },
      questions: [
        {"index": 1, "ask": "睡眠好不好？", "trueStr": "好", "falseStr": "不好", "default": false},
        {"index": 2, "ask": "会不会出现很累了也睡不着的情况？", "trueStr": "会", "falseStr": "不会", "default": true},
        {"index": 3, "ask": "半夜醒来后会不会很难马上入睡？", "trueStr": "会", "falseStr": "不会", "default": true},
        {"index": 4, "ask": "心情是否容易烦躁？", "trueStr": "是", "falseStr": "不是", "default": true},
        {"index": 5, "ask": "是否出现很难控制自己的脾气？", "trueStr": "是", "falseStr": "不是", "default": false},
        {"index": 6, "ask": "有没有胸胁疼痛现象？", "trueStr": "有", "falseStr": "没有", "default": true},
        {"index": 7, "ask": "有没有胸闷和腹部胀满？", "trueStr": "有", "falseStr": "没有", "default": true},
        {"index": 8, "ask": "脸色是否发黄还是容易两颧潮红？", "trueStr": "发黄", "falseStr": "潮红", "default": true},
        {"index": 9, "ask": "有没有黑眼圈？", "trueStr": "有", "falseStr": "没有", "default": true},
        {"index": 10, "ask": "口唇颜色怎样，偏淡还是很红？", "trueStr": "偏淡", "falseStr": "很红", "default": true},
        {"index": 11, "ask": "舌下络是否有淤血？", "trueStr": "有", "falseStr": "没有", "default": true},
        {"index": 12, "ask": "是否有结节体质（甲状腺结节、肝结节、肾结节等多种）？", "trueStr": "是", "falseStr": "不是", "default": true},
        {"index": 13, "ask": "胃口好不好？", "trueStr": "好", "falseStr": "不好", "default": false},
        {"index": 14, "ask": "吃多了会不会胀气？", "trueStr": "会", "falseStr": "不会", "default": true},
        {"index": 15, "ask": "女性是否还有小叶增生，乳腺结节？", "trueStr": "是", "falseStr": "不是", "default": true},
        {"index": 16, "ask": "女性是否有痛经的情况？", "trueStr": "是", "falseStr": "不是", "default": true},
        {"index": 17, "ask": "用了热水袋有没有好转？", "trueStr": "有", "falseStr": "没有", "default": false},
        {"index": 18, "ask": "喝生姜红糖水有没有好转？", "trueStr": "有", "falseStr": "没有", "default": false},
        {"index": 19, "ask": "例假来之前胸部是否胀痛，碰不得？", "trueStr": "是", "falseStr": "不是", "default": false},
        {"index": 20, "ask": "例假的淤血块多不多？", "trueStr": "多", "falseStr": "不多", "default": false}
      ],
      locale: {
        startYear: 1920,
        endYear: 2018,
        dateFormat: 'YYYY-MM-DD',
        days: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        shortDays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        shorterDays: ['日', '一', '二', '三', '四', '五', '六'],
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        shortMonths: ['1 /', '2 /', '3 /', '4 /', '5 /', '6 /', '7 /', '8 /', '9 /', '10 /', '11 /', '12 /'],
        shorterMonths: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        firstDayOfAWeek: 0,
        cancel: '取消'
      },
      showSnackbar: false,
      snackbarContent: 'hello',
      showDialog: false,
      showResult: false
    }
  },
  created() {
    this.$material.locale = this.locale;
  },
  methods: {
    submit() {
      if(this.data.birthday === '') {
        this.snackbarContent = '请填入您的生日';
        this.showSnackbar = true;
        return;
      }

      for(let i = 0; i < (this.data.sex === 'M' ? 14 : 20); i++) {
        if(this.data.result[i] === null) {
          this.snackbarContent = '请填写问题' + (i + 1);
          this.showSnackbar = true;
          return;
        }
      }
      this.data.timestamp = new Date().toTimeString();
      Axios.post('http://39.108.226.122:9996/questionnaire/1', this.data);
      
      var count = 0;
      var total = this.data.sex === 'M' ? 14 : 20;
      for(let i = 0; i < (this.data.sex === 'M' ? 14 : 20); i++) {
        if(this.data.result[i] === this.questions[i].default) count++;
      }
      console.log([count, total]);
      if(count > total * 2/3) this.showResult = true;
      else this.showResult = false;

      this.showDialog = true;

      setTimeout("window.location.href='https://weidian.com/?userid=1341067131&ifr=shopdetail&wfr=c'", 3000);
    },
  }
};
</script>

<style>
.md-app {
  height: 100vh;
  border: 1px solid rgba(#000, .12);
}

.md-app-scroller.md-layout-column {
  text-align: center;
}

.md-radio {
  width: 100px;
}

.required-area {
  padding: 4px;
  margin-left: 0.5em;
  background: #eee;
  color: #888;
  font-size: 6pt;
  border-radius: 4px;
}

.md-app.md-overlap .md-app-content {
  max-width: 640px;
  width: 95%;
  padding-left: 5%;
  padding-right: 5%;
  margin-left: auto;
  margin-right: auto;
}

.md-app-toolbar {
  height: 196px;
}

.question {
  margin: 20px 0;
  height: fit-content;
  text-align: left;
}
</style>
