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
    Modal,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

const SERVER_URL='http://10.0.2.2:8010/backend/?';
//const SERVER_URL='http://192.168.2.100:8010/backend/?';
//const SERVER_URL='http://192.168.0.1/restojs/backend/?';

export default class Daftarpilih extends React.Component{
    constructor(){
	super();

	this.state={
	    modalVisible: false,	    
	}
    }

    cekBungkus=(value)=>{
	if(value===true){
	    return '#bgks';
	}
    }

    onPress=(id,nama,harga,jumlah,bungkus)=>{
	let bgks='TIDAK';
	if(bungkus===true) {bgks='YA';}
	
	console.log(`id: ${id}, nama: ${nama}, jumlah: ${jumlah}, bungkus: ${bgks}`);
    }
    
    render(){
	return(
	    <View>
	      <View style={styles.meja}>
		<Text style={styles.mejatx}>Meja {this.props.meja}</Text>
	      </View>

	      {
		  this.props.data_menu.map(
		      dm=>{
			  return(
			      

			      <TouchableOpacity
				key={'to'+dm.id+dm.bungkus}
				style={styles.itemmenu}
				onPress={()=>this.onPress(dm.id,dm.nama,dm.harga,dm.jumlah,dm.bungkus)}
				>
				<Text key={'key'+dm.id+dm.bungkus}>{dm.nama} ({dm.jumlah})  {this.cekBungkus(dm.bungkus)}</Text>
			      </TouchableOpacity>
			      
			  );
		      }
		  )
	      }

		<Modal
	    animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => this.setModalVisible(false)}
		>
		<View>
		<Text>Ini adalah modal</Text>
		</View>
		</Modal>
		
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
    meja:{
	justifyContent:'center',
	alignItems:'center',
    },
    mejatx:{
	fontWeight:'bold',
	fontSize:20,
	color:'blue',
    },
});
