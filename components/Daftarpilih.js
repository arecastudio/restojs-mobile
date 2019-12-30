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

export default class Daftarpilih extends React.Component{
    constructor(){
	super();
    }

    cekBungkus=(value)=>{
	if(value===true){
	    return '#bungkus';
	}
    }
    
    render(){
	return(
		<View>

	    {
		this.props.data_menu.map(
		    dm=>{
			return(
				

				<TouchableOpacity
			    key={'to'+dm.id+dm.bungkus}
			    style={styles.itemmenu}
				>
				<Text key={'key'+dm.id+dm.bungkus}>{dm.nama} ({dm.jumlah})  {this.cekBungkus(dm.bungkus)}</Text>
				</TouchableOpacity>
				
			);
		    }
		)
	    }
	    
		</View>
	);
    }
}

const styles=StyleSheet.create({
    itemmenu:{	
	margin:3,
	
	height:50,
	backgroundColor:'lightgreen',	
	alignItems:'center',
	justifyContent:'center',
	borderRadius:10,
	borderWidth: 1,
	borderColor: '#fff',
	padding:1,
    },
});
