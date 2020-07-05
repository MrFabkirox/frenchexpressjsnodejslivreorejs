require('dotenv').config()

let ATLAS_URI=''

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
//     dbname: 'tigernodesandreact',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndexes: true
  }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB atlas connected");
})
