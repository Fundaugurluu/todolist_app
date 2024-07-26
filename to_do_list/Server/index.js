const express= require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const TodoModel=require('./Models/ToDo')  

const app = express()
app.use(cors())
app.use(express.json())

const dbURL = 'mongodb+srv://fundauggurlu:funda@cluster0.ohggs1n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB bağlantısı sağlandı');
        const PORT = 3006;
        app.listen(PORT, () => {
            console.log(`Server ${PORT} portunda çalışıyor`);
        });
    })
    .catch(err => console.log('MongoDB bağlantı hatası:', err));



app.get('/get',(req,res) => {
TodoModel.find()
.then(result=> res.json(result))
.catch(err=> res.json(err))

}
)
app.put('/update/:id',(req,res)=>{
const {id}=req.params;
TodoModel.findByIdAndUpdate({_id: id},{done: true})
.then(result=> res.json(result))
.catch(err=>res.json(err))
}
)

app.delete('/delete/:id',(req,res)=>{
const {id}=req.params;
TodoModel.findByIdAndDelete({_id: id})
.then(result=> res.json(result))
.catch(err=>res.json(err))

}
)


app.post('/add',(req,res) =>{
const task=req.body.task;
TodoModel.create({
    task: task
})

.then(result=> res.json(result))
.catch(err=>res.json(err))
}
)


