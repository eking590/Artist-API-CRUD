const mongoose =  require('mongoose'); 

const ArtistSchema = mongoose.Schema(
    {
        name: {
            type: String, 
            required: true 
        }, 
        trackTitle: {
            type: String, 
            required: true
        }, 
        Genre: {
            type:String,
            required: false
        }, 
        Album: {
            type:String,
            required:true 
        }, 
        Image: {
            type:String, 
            required:false 
        } 
    }, 
    {
        timestamps: true 
    }
)


const artist = mongoose.model('artist', ArtistSchema) 

module.exports = artist; 