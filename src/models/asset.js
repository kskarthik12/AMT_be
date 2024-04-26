import mongoose from './index.js'


let assetSchema = new mongoose.Schema({
    a_name: {
        type: String,
        required: [true, 'Name is required']
    },
    a_stock: {
        type: Number,
        required: [true, 'Stocks quantity is required']
    },
    a_sales: {
        type: Number,
        required: [true, 'Sales quantity is required']
    },
    a_id: {
        type: Number,
        required: [true, 'Asset ID is required']
    },
    status:{
        type:Boolean,
        default:true
    },
    stock_last_update: {
        type: Date,
        default:Date.now()
    }
}, {
    collection: 'assets',
    versionKey: false
});

  const  assetsModel=mongoose.model("assets",assetSchema);

  export default assetsModel