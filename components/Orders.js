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
    ToastAndroid,
}from 'react-native';

import { Actions } from 'react-native-router-flux';

//import Pilihmeja from './components/Pilihmeja';

const  mdipilih=[];

export default class Orders extends React.Component{
    constructor(){
	super();
	this.state={
	    point:'0',
	    meja:'',
	    menu_dipilih:{},
	    dummy:[
		/*{
		    meja:'12',
		    id:9431,
		    nama:'mujair bakar',
		    harga:80000,
		    jumlah:2,
		},
		{
		    meja:'12',
		    id:9432,
		    nama:'nasi putih',
		    harga:5000,
		    jumlah:2,
		},
		{
		    meja:'12',
		    id:9434,
		    nama:'jus jeruk',
		    harga:10000,
		    jumlah:3,
		},
		{
		    meja:'12',
		    id:9436,
		    nama:'jus mangga',
		    harga:12000,
		    jumlah:1,
		},	*/	
	    ],
	}
    }
    
    componentDidMount(){
    }

    
    changeView(p){
	//let p=this.state.point;
	let mejax=this.state.meja;	
	switch(p){
	case 1:
	    if(mejax!=''){
		Alert.alert(
		    "Info",
		    "Meja sudah sudah dipilih: "+mejax+"\nTap RESET untuk pilih meja lain!"
		);
	    }else{
		Actions.pilihmeja({gantiMeja:this.changeMeja});
	    }
	    break;
	case 2:
	    if(mejax!=''){
		Actions.pilihmenu({_pilihMenu:this.pilihMenus});
	    }else{
		Alert.alert("Pilih MEJA terlebih dahulu!");
	    }
	    break;
	case 3:
	    if(mejax!=''){
		Actions.daftarpilih({data_menu:this.state.dummy,meja:this.state.meja});
	    }else{
		Alert.alert("Pilih MEJA terlebih dahulu!");
	    }
	    break;	    
	case 4:
	    this.setState({meja:'',menu_dipilih:[],dummy:[]});
	    Alert.alert("Reset OK");
	    break;
	case 5:
	    console.log('Logout clicked !');
	    break;
	}
	
    }

    //BOF global function
    changeMeja=(nomor)=>{
	this.setState({meja:nomor});
	//console.log('Order.js state meja:'+this.state.meja);
	console.log('Order.js meja: '+nomor);
	ToastAndroid.show('Meja dipilih: '+nomor,ToastAndroid.SHORT);
	Actions.pop();
    }

    pilihMenus=(id,nama,harga,jumlah,bungkus)=>{
	let mejax=this.state.meja;
	console.log('Orders.js. \nMeja:'+mejax+',Menu id: '+id+',nama:'+nama+',harga:'+harga+',jumlah:'+jumlah+', bungkus:'+bungkus);
	//let new_menu_dipilih=this.state.menu_dipilih.slice();
	//let new_menu_dipilih={};

	let ada=false;
	if(this.state.dummy.some((item)=>item.id===id && item.bungkus===bungkus )){
	    ada=true;
	}

	/*mdipilih.map(()=>{
	    mdipilih.push({
		meja:mejax,
		id:id,
		nama:nama,
		harga:harga
	    });
	});*/
	
	//this.setState({menu_dipilih:new_menu_dipilih});

	let xdummy=this.state.dummy;

	if(ada===false){
	    xdummy.push({
		meja:mejax,
		id:id,
		nama:nama,
		harga:harga,
		jumlah:jumlah,
		bungkus:bungkus,
	    });	    
	}
	
	this.setState({dummy:xdummy});
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

		<TouchableOpacity style={styles.btnMenu} onPress={()=>this.changeView(3)}>
		<Text style={styles.txMenu}>3. Daftar Pesanan</Text>
		</TouchableOpacity>

		<TouchableOpacity style={styles.btnMenu} onPress={()=>this.changeView(4)}>
		<Text style={styles.txMenu}>4. Reset</Text>
		</TouchableOpacity>

		<TouchableOpacity style={styles.btnMenu} onPress={()=>this.changeView(5)}>
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
