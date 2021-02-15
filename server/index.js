const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
require('./model/M002')
require('dotenv').config()

app.use(cors({
  origin: 'http://localhost:8080'
}))

app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/abc', function(req,res){
  res.json({msg: 'This is CORS-enabled for only http://localhost:8080.'})
})
app.get('/getMenu', function(req,res){
  const M002 = mongoose.model('M002')
  M002.find({$or: [{key: {$in: ['100', '100_nha']}}, {hot:"1"}]}, function (err, docs) {
    docs.forEach((item)=>{
      item.icoSrc = process.env.CDN_URL + '/' + process.env.CDN_IMAGE_PATH + '/' + item.icoSrc
    })
    res.json({menu: docs})
  });
})
app.get('/getMenuD', function(req,res){
  const M002 = mongoose.model('M002')
  M002.find({$and: [{level: 1}, {visible:1}]}, function (err, docs) {
    docs.forEach((item)=>{
      item.icoSrc = process.env.CDN_URL + '/' + process.env.CDN_IMAGE_PATH + '/' + item.icoSrc
    })
    res.json({menu: docs})
  });
})
app.get("/getHotNew",function(req,res){

  var tin = {
    href: "/xa-hoi/tin1",
    title:
      "Hà Nội ghi nhận ca mắc Covid-19 thứ 21: Công chứng viên trên phố Duy Tân",
    imgSrc: process.env.CDN_URL + process.env.CDN_NEW_PATH+ "photo1612.jpg",
    imgAlt: "",
    display:
      "Ngày 27/1, nam công chứng viên có tiếp xúc với BN1814 tại văn phòng công chứng số 3 địa chỉ ...",
    categoryLink: "/xa-hoi",
    category: "Xã hội",
  };
  var tin1 = {
    href: "/star/tin1",
    title:
      "Rộ loạt bằng chứng Anh Đức có bạn gái và còn đưa ra mắt hội bạn Trấn Thành, nhưng người đó không phải Hiền Hồ?",
    imgSrc: process.env.CDN_URL + process.env.CDN_NEW_PATH+ "photo1613.jpg",
    imgAlt: "",
    display:
      "Dù chỉ mới là tin đồn song nhiều người đã liên tục gửi lời chúc mừng diễn viên Anh Đức vì đã \"thoát ế\".",
    categoryLink: "/star",
    category: "Star",
  }
  console.log(req.query)
  switch (req.query.cate){
    case "/":
      case "xa-hoi":
        res.json(tin)
      break;
      case "/star":
        res.json(tin1)
  }
  res.json(tin)
})
app.get("/getDaiLy",function(req,res){
  console.log(req.query)
  var a = {
    href: "/xa-hoi/tin1",
    title:
      "Hà Nội ghi nhận ca mắc Covid-19 thứ 21: Công chứng viên trên phố Duy Tân",
    imgSrc: process.env.CDN_URL + process.env.CDN_NEW_PATH+ "photo1612.jpg",
    imgAlt: "",
    display:
      "Ngày 27/1, nam công chứng viên có tiếp xúc với BN1814 tại văn phòng công chứng số 3 địa chỉ ...",
    categoryLink: "/xa-hoi",
    category: "Xã hội",
  };
  var b = {
    href: "/star/tin1",
    title:
      "Knet không thể ngờ đây lại là thành viên từng bị chê xấu nhất đội hình SNSD: Nhan sắc lột xác quá ngoạn mục!",
    imgSrc: process.env.CDN_URL + process.env.CDN_NEW_PATH+ "photo1217.jpg",
    imgAlt: "",
    display:
      "Bộ ảnh tạp chí mới của Sunny (SNSD) hiện đang khiến các fan phát sốt.",
    categoryLink: "/star",
    category: "Star",
  };
  var c = {
    href: "/xa-hoi/tin3",
    title:
      "Hà Nội ghi nhận ca mắc Covid-19 thứ 21: Công chứng viên trên phố Duy Tân",
    imgSrc: process.env.CDN_URL + process.env.CDN_NEW_PATH+ "photo1612.jpg",
    imgAlt: "",
    display:
      "Ngày 27/1, nam công chứng viên có tiếp xúc với BN1814 tại văn phòng công chứng số 3 địa chỉ ...",
    categoryLink: "/xa-hoi",
    category: "Xã hội",
  };
  var d = {
    href: "/xa-hoi/tin4",
    title:
      "Hà Nội ghi nhận ca mắc Covid-19 thứ 21: Công chứng viên trên phố Duy Tân",
    imgSrc: process.env.CDN_URL + process.env.CDN_NEW_PATH+ "photo1612.jpg",
    imgAlt: "",
    display:
      "Ngày 27/1, nam công chứng viên có tiếp xúc với BN1814 tại văn phòng công chứng số 3 địa chỉ ...",
    categoryLink: "/xa-hoi",
    category: "Xã hội",
  };
  var ne = [];
  ne.push(a);
  ne.push(b);
  ne.push(c);
  ne.push(d);
  res.json(ne);
})
app.get("/getPost",function(req,res){
res.json(req.query)
})
async function start() {
  await mongoose.connect('mongodb://localhost:27017/newton', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
  });
  await app.listen(process.env.PORT,process.env.HOST, () => {
    console.log(`Example app listening at http://${process.env.HOST}:${process.env.PORT}`)
  })
}

start()