<template>
<div class="page-container">
<md-app md-waterfall md-mode="overlap">
  <md-app-toolbar class="md-primary md-large" style="position:fixed">
    <div class="md-toolbar-row">
      <span class="md-title">脾虚湿重型体质判别</span>
      <div class="md-toolbar-section-end">
        <md-button class="md-icon-button" to='/'>
          <md-icon>exit_to_app</md-icon>
        </md-button>
      </div>
    </div>
  </md-app-toolbar>

  <md-app-content>
    <div class="md-headline" style="text-align:center;margin:10px;">脾虚湿重型体质判别</div>
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

    <div class="question" v-for="question in data.sex === 'F'? questions : [].concat(questions.slice(0, 12), questions.slice(13, 31))" :key="question.index" style="min-width:100px;">
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
      <md-dialog-content v-if="showResult">您有80%的机率是脾虚湿重型体质</md-dialog-content>
      <md-dialog-content v-else>有80%的可能性您不是脾虚湿重型体质</md-dialog-content>
    </md-dialog>
  </md-app-content>
</md-app>
</div>
</template>

<script>
import Axios from 'axios';

export default {
  name: 'Questionnaire2',
  data() {
    return {
      data: {
        sex: 'M',
        birthday: '',
        name: '',
        phone: '',
        email: '',
        result: new Array(31).fill(null),
      },
      questions: [
        {"index": "1", "ask": "胃口好不好？", "trueStr": "好", "falseStr": "不好", "default": false},
        {"index": "2", "ask": "饮食偏好情况？", "trueStr": "口味轻", "falseStr": "口味重", "default": false},
        {"index": "3", "ask": "消化能力如何？", "trueStr": "好", "falseStr": "不好", "default": false},
        {"index": "4", "ask": "吃油腻的食物会不会不好消化？", "trueStr": "会", "falseStr": "不会", "default": true},
        {"index": "5", "ask": "是否有口臭？", "trueStr": "是", "falseStr": "不是", "default": true},
        {"index": "6", "ask": "有没有觉得口苦？", "trueStr": "有", "falseStr": "没有", "default": true},
        {"index": "7", "ask": "嘴巴里有没有黏黏的感觉？", "trueStr": "有", "falseStr": "没有", "default": true},
        {"index": "8", "ask": "喝凉水或者吃寒凉的食物会不舒服吗？", "trueStr": "会", "falseStr": "不会", "default": true},
        {"index": "9", "ask": "是不是有拉肚子现象？", "trueStr": "是", "falseStr": "不是", "default": true},
        {"index": "10", "ask": "舌苔是不是比较厚腻（白色、黄色），有一层豆腐渣一样的苔？", "trueStr": "是", "falseStr": "不是", "default": true},
        {"index": "11", "ask": "大便臭吗，会不会黏马桶，导致厕所很难冲？", "trueStr": "会", "falseStr": "不会", "default": true},
        {"index": "12", "ask": "有没有想拉却拉不尽的感觉？", "trueStr": "会", "falseStr": "不会", "default": true},
        {"index": "13", "ask": "女性例假前期大便会不会拉稀？", "trueStr": "会", "falseStr": "不会", "default": true},
        {"index": "14", "ask": "脸色好不好，有没有发黄？", "trueStr": "有", "falseStr": "没有", "default": true},
        {"index": "15", "ask": "有没有黑眼圈？", "trueStr": "有", "falseStr": "没有", "default": true},
        {"index": "16", "ask": "口唇颜色怎样，是否偏淡？", "trueStr": "是", "falseStr": "不是", "default": true},
        {"index": "17", "ask": "早上起来脸有没有肿的迹象？", "trueStr": "有", "falseStr": "没有", "default": true},
        {"index": "18", "ask": "睡觉有没有流口水、打呼噜？", "trueStr": "有", "falseStr": "没有", "default": true},
        {"index": "19", "ask": "身体是否有异味？", "trueStr": "是", "falseStr": "不是", "default": true},
        {"index": "20", "ask": "有没有觉得自己睡了之后还是很累，感觉头重？", "trueStr": "有", "falseStr": "没有", "default": true},
        {"index": "21", "ask": "是不是经常想吐唾沫或者看到一点点痰？", "trueStr": "是", "falseStr": "不是", "default": true},
        {"index": "22", "ask": "皮肤光洁吗？还是会经常长东西？", "trueStr": "会", "falseStr": "不会", "default": true},
        {"index": "23", "ask": "会不会有较多的头皮屑？", "trueStr": "会", "falseStr": "不会", "default": true},
        {"index": "24", "ask": "头发是不是爱出油？", "trueStr": "是", "falseStr": "不是", "default": true},
        {"index": "25", "ask": "脸上皮肤是否很油，容易长痘痘？后背痘痘也多？", "trueStr": "是", "falseStr": "不是", "default": true},
        {"index": "26", "ask": "皮肤是否很容易过敏，", "trueStr": "是", "falseStr": "不是", "default": true},
        {"index": "27", "ask": "皮肤经常痒吗？", "trueStr": "是", "falseStr": "不是", "default": true},
        {"index": "28", "ask": "有没有荨麻疹？", "trueStr": "有", "falseStr": "没有", "default": true},
        {"index": "29", "ask": "有没有湿疹？", "trueStr": "有", "falseStr": "没有", "default": true},
        {"index": "30", "ask": "有没有下肢水肿，淋浊、带下等？", "trueStr": "有", "falseStr": "没有", "default": true},
        {"index": "31", "ask": "有没有感觉自己浑身无力，四肢酸懒沉重，常感到疲倦，精力不集中，关节酸痛、沉重、活动不利，痛处不移，头重如裹，脚重不想动？", "trueStr": "有", "falseStr": "没有", "default": true}
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
    document.title = '脾虚湿重型体质判别';
    this.$material.locale = this.locale;
  },
  methods: {
    submit() {
      if(this.data.birthday === '') {
        this.snackbarContent = '请填入您的生日';
        this.showSnackbar = true;
        return;
      }

      for(let i = 0; i < 31; i++) {
        if(this.data.result[i] === null) {
          if(this.data.sex === 'M' && i === 12) continue;
          this.snackbarContent = '请填写问题' + (i + 1);
          this.showSnackbar = true;
          return;
        }
      }
      this.data.timestamp = new Date().toTimeString();
      Axios.post('http://tizhiceshi.top/questionnaire/2', this.data);

      var count = 0;
      var total = this.data.sex === 'M' ? 30 : 31;
      for(let i = 0; i < 31; i++) {
        if(this.data.sex === 'M' && i === 12) continue;
        if(this.data.result[i] === this.questions[i].default) count++;
      }
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
