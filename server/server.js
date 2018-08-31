const express       = require('express');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const fs            = require('fs');

const app           = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('', express.static(__dirname + '/dist'));

var path1 = __dirname + '/1.json';
var path2 = __dirname + '/2.json';

if(!fs.existsSync(path1))
    fs.writeFileSync(path1, '[]');
if(!fs.existsSync(path2))
    fs.writeFileSync(path2, '[]');

app.get('/questionnaire/1', (req, res) => {
    res.json([
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
    ]);
});

app.get('/questionnaire/2', (req, res) => {
    res.json([
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
    ]);
});

app.post('/questionnaire/1', (req, res) => {
    res.end();
    var file = fs.readFileSync(path1);
    var data = JSON.parse(file);
    data.push(req.body);
    fs.writeFileSync(path1, JSON.stringify(data));
});

app.post('/questionnaire/2', (req, res) => {
    res.end();
    var file = fs.readFileSync(path2);
    var data = JSON.parse(file);
    data.push(req.body);
    fs.writeFileSync(path2, JSON.stringify(data));
});

app.get('/result/1', (req, res) => {
    res.json(JSON.parse(fs.readFileSync(path1)));
});

app.get('/result/2', (req, res) => {
    res.json(JSON.parse(fs.readFileSync(path2)));
});

var port = 9996;
app.listen(port, () => console.log('Server running at localhost:' + port));
