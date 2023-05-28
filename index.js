const express = require('express'); 
const mongoose = require('mongoose'); 
const Artist = require('./models/artistModel')

const app = express(); 


const PORT = 4000; 


//middleware 
app.use(express.json()); 
app.use(express.urlencoded({extended: false})); 


//routes 
app.get('/', (req, res) => {
    res.send('Hello to my artist album app ').status(200)
})

//get new artist 
app.get('/artists', async(req, res) => {
    try {
        const Artists = await Artist.find(); 
        res.status(200).json(Artists); 
        
    } catch (error) {
        res.status(500).send({message: `Opps ${error} found`})
    }
    
}) 

//store new artist in the database 
app.post('/artist',async(req, res) => {
    try {
        const newArtist = await Artist.create(req.body); 
        res.status(200).json(newArtist); 
    } catch (error) {
        res.status(500).send({message: `Opps ${error} found`})
    }
})

//get artists by id 

app.get('/artist/:id', async(req, res) => {
    try {
        const {id} = req.params; 
        const artistId = await Artist.findById(id); 
        if (!artistId) { 

            res.status(404).send({message: `Opps!!! ${artistId} not found` })
            
        } 
        return res.json(artistId); 
        
    } catch (error) {
        res.status(500).send({message: `Opps ${error} found`})
    }
})


app.put('/artist/:id', async(req, res) => {
    try {
        const {id} = req.params; 
        const artistId = await Artist.findByIdAndUpdate(id, req.body); 
        if (!artistId) { 

            return res.status(404).json({message: `Opps!!! ${id} not found` })
            
        } 
        const updatedArtist = await Artist.findById(id)
        res.status(200).json(updatedArtist); 
        
    } catch (error) {
        res.status(500).json({message: `Opps ${error} found`})
    }
})

//delete artist from the database 
app.delete('/artist/:id', async(req, res) => {

    try {   
        const {id} = req.params; 
        const deleteArtist = await Artist.findByIdAndDelete(id); 
        if (!deleteArtist) {
            return res.status(404).json({message: `Opps!!! ${id} not found` })
        }
        res.status(200).json({deleteArtist}); 
    } catch (error) {
        console.log(error.message); 
        res.status(500).json({message: `Opps ${error} found`})
    }


})


//mongodb database 
mongoose.connect("mongodb://localhost:27017/ArtistApp")
.then (() => {
    console.log('mongoose database has been connected!!')
    app.listen(PORT, () => {
        console.log(`server is live at http://localhost:${PORT} `)
    })
}) .catch ((error) => {
    console.log(error); 
})
//live server 
