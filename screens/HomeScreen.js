import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageComponent } from 'react-native';
import axios from 'axios';
import {RFValue} from 'react-native-responsive-fontsize';

export default class HomeScreen extends React.Component{
    constructor(){
     super();
     this.state = {
         movieDetails = {}
     }
    }

    getMovies=()=>{
     const url = 'http://localhost5000/get-movie'
     axios.get(url)
     .then((response)=>{
         let details = response.data.data
         details['duration'] = this.timeConvert(details.duration)
         this.setState({movieDetails: details})
     })
     .catch((error)=>{
         console.log(error.message)
     })
    }

    timeConvert(num){
        var hours = Math.floor(num/60)
        var minutes = num%60
        return `${hours} hrs ${minutes} mins`
    }
    
    componentDidMount(){
        this.getMovies()
    }

    likedMovies=()=>{
        const url = 'http://localhost5000/liked-movie'
        axios.post(url)
        .then((response)=>{
            this.getMovies()
        })
        .catch((error)=>{
            console.log(error.message)
        })
    }
    dislikedMovies=()=>{
        const url = 'http://localhost5000/disliked-movie'
        axios.post(url)
        .then((response)=>{
            this.getMovies()
        })
        .catch((error)=>{
            console.log(error.message)
        })
    }
    notWatchedMovies=()=>{
        const url = 'http://localhost5000/notWatched-movie'
        axios.post(url)
        .then((response)=>{
            this.getMovies()
        })
        .catch((error)=>{
            console.log(error.message)
        })
    }

    render(){
        const {movieDetails} = this.state
        if(movieDetails.poster_link){
            const {
                poster_link, title, release_date, duration, overview, rating
            }=movieDetails
            return(
                <View style={styles.container}>
                    <View style={styles.subTopContainer}>
                        <Image style={styles.posterImage} source={{uri : poster_link}}/>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex : 1,
    },
    headerContainer:{
        flex : 0.1,
    },
    subContainer:{
        flex : 0.9,
    },
    headerTitle:{
        color : 'white',
        fontWeight : 'bold',
        fontSize : RFValue(18),
    },
    subTopContainer:{
        flex : 0.4,
        justifyContent : 'center',
        alignItems : 'center',
    },
    posterImage:{
        width : '60%',
        height : '90%',
        resizeMode : 'stretch',
        borderRadius : RFValue(30),
        marginHorizontal : RFValue(10),
    },
    subBottomContainer:{
        flex : 0.6,
    },
    upperBottomContainer:{
        flex : 0.2,
        alignItems : 'center',
    },
    title:{
        fontSize : RFValue(20),
        fontWeight : 'bold',
        textAlign : 'center',
    },
    subTitle:{
        fontSize : RFValue(14),
        fontWeight : '300',
    },
    middleBottomContainer:{
        flex : 0.35,
    },
    overview:{
        fontSize : RFValue(13),
        fontWeight : '300',
        textAlign : 'center',
        color : 'gray',
    },
    lowerBottomContainer:{
        flex : 0.45,
    },
    iconButtonContainer:{
        flexDirection : 'row',
        justifyContent : 'space-evenly',
        alignItems : 'center',
    },
    buttonContainer:{
        justifyContent : 'center',
        alignItems : 'center',
    },
    button:{
        width : RFValue(160),
        height : RFValue(50),
        borderRadius : RFValue(20),
        justifyContent : 'center',
        alignItems : 'center',
        borderWidth : 1,
        marginTop : RFValue(15),
    },
    buttonText:{
        fontSize : RFValue(15),
        fontWeight : 'bold',
    },
})