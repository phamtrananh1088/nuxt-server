var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new Schema({
    title: String,
    subtitle: String,
    // other fields...
    category: String,
    key: String,
    href: String,
    title: String,
    icoSrc: String,
    icoAlt: String,
    text: String,
    hot: Number,
    visible: Number
});

var M002 = mongoose.model('M002', newsSchema);
module.export = M002