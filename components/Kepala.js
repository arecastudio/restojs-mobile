import React from 'react';
import{
    View,
    Text,
    StyleSheet,
} from 'react-native';


const Kepala = () =>{
    return(
	    <View style={styles.latar}>
	    <Text style={styles.judul}>
	    Cristho Resto
	    </Text>
	    </View>
    );
}

const styles=StyleSheet.create({
    judul:{
	color:'white',
	fontWeight:'bold',
	textAlign:'center',
	fontSize:20,
    },
    latar:{
	height:50,
	alignItems:'center',
	justifyContent:'center',
	backgroundColor:'steelblue'
    },
});

export default Kepala;
