import React from 'react';
import{
    View,
    Text,
    TextInput,
    Picker,
    ScrollView,
    Button,
    Alert,
    StyleSheet,
    TouchableOpacity,
}from 'react-native';

import { Actions } from 'react-native-router-flux';

//import Pilihmeja from './components/Pilihmeja';

export default class Orders extends React.Component{
    constructor(){
	super();
	this.state={
	    point:'0',
	    meja:'',
	    menu_dipilih:[],
	}
    }
    
    componentDidMount(){
    }

    changeView(p){
	//let p=this.state.point;
	switch(p){
	case 1:
	    Actions.pilihmeja({gantiMeja:this.changeMeja});
	    break;
	case 2:
	    Actions.pilihmenu({_pilihMenu:this.pilihMenus});
	}
    }

    //BOF global function
    changeMeja=(nomor)=>{
	this.setState({meja:nomor});
	//console.log('Order.js state meja:'+this.state.meja);
	console.log('Order.js meja: '+nomor);
	Actions.pop();
    }

    pilihMenus(meja,id,nama,harga){
	console.log('Orders.js. \nMeja:'+meja+',Menu id: '+id+',nama:'+nama+',harga:'+harga);
    }
    //EOF global function

    pilihMenu(){
	//fungsi ini hanya untuk testing/ bisa dihapus
	console.log('Order.js state meja:'+this.state.meja);
	//console.log('pilih menu');	
    }

    render(){
	return(
		<View style={styles.container}>
		<ScrollView>
		
		<TouchableOpacity style={styles.btnMenu} onPress={()=>this.changeView(1)}>
		<Text style={styles.txMenu}>1. Pilih Meja</Text>
		</TouchableOpacity>

		<TouchableOpacity style={styles.btnMenu} onPress={()=>this.changeView(2)}>
		<Text style={styles.txMenu}>2. Pilih Menu</Text>
		</TouchableOpacity>

		<TouchableOpacity style={styles.btnMenu}>
		<Text style={styles.txMenu}>3. Daftar Menu</Text>
		</TouchableOpacity>

		<TouchableOpacity style={styles.btnMenu}>
		<Text style={styles.txMenu}>4. Reset</Text>
		</TouchableOpacity>

		<TouchableOpacity style={styles.btnMenu}>
		<Text style={styles.txMenu}>5. Logout</Text>
		</TouchableOpacity>
		
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
    btnMenu:{
	margin:3,
	width:250,
	height:90,
	backgroundColor:'#000099',	
	alignItems:'center',
	justifyContent:'center',
	borderRadius:20,
	borderWidth: 1,
	borderColor: '#fff',
    },
    txMenu:{
	color:'white',
	textAlign:'center',
	fontWeight:'bold',
	fontSize:20,
    },
});
