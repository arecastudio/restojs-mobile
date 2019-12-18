import React from 'react';
import{
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    Button,
    Alert,
    Picker,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

const SERVER_URL='http://10.0.2.2:8010/backend/?';
//const SERVER_URL='http://192.168.2.100:8010/backend/?';
//const SERVER_URL='http://192.168.0.1/restojs/backend/?';

export default class Pilihmeja extends React.Component{
    constructor(){
	super();
	this.state={
	    mejas:[],
	}
    }

    componentDidMount(){
	fetch(SERVER_URL+'data=data-order', {
            method: 'GET'
	})
	    .then((response) => response.json())
	    .then((mejas) => this.setState({mejas}))
	    .catch((error) => {
		//console.error(error);
		Alert.alert('Terjadi kesalahan. Periksa koneksi anda !');
	    });	
    }

    _onPress(nomor){
	//console.log('Meja: '+nomor);

	this.props.gantiMeja(nomor);
	//Actions.pilihmenu();
    }

    render(){
	return(
		<View style={styles.container}>
		<ScrollView>
		
		<View style={styles.baris}>
		{
		    this.state.mejas.map(
			mejas =>{
			    return (
			    	    <TouchableOpacity
				key={mejas.nomor}
				style={styles.mejabox}
				onPress={()=>this._onPress(mejas.nomor)}
				    >
				    <Text key={mejas.nomor} style={styles.mejano}>{mejas.nomor}</Text>
				    </TouchableOpacity>
			    )
			}   
		    )		    
		}
		</View>
		
		</ScrollView>
		</View>
	);
    }
}

const styles=StyleSheet.create({
    container:{	
	alignItems:'center',
	justifyContent:'center',
    },
    baris:{
	flex:1,	
	flexDirection:'row',
	flexWrap:'wrap',	
	alignItems:'center',
	justifyContent:'center',
    },
    mejabox:{	
	margin:3,
	width:150,
	height:100,
	backgroundColor:'#005500',	
	alignItems:'center',
	justifyContent:'center',
	borderRadius:20,
	borderWidth: 1,
	borderColor: '#fff',
    },
    mejano:{
	color:'white',
	textAlign:'center',
	fontWeight:'bold',
	fontSize:20,
    },    
});
