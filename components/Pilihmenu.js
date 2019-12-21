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

export default class Pilihmenu extends React.Component{
    constructor(){
	super();
	this.state={
	    mejas:[],
	    jenis_menu:'semua',
	    menus:[],
	    //dipilih:[],
	}
    }

    componentDidMount(){
	fetch(SERVER_URL+'data=data-menu', {
            method: 'GET'
	})
	    .then((response) => response.json())
	    .then((menus) => this.setState({menus}))
	    .catch((error) => {
		//console.error(error);
		Alert.alert('Terjadi kesalahan. Periksa koneksi anda !');
		});

	/*let fdata=new FormData();
	fdata.append('mod','data-menu');
	fdata.append('act','show');
	fdata.append('produk_id',id);
	fdata.append('pesanan_id',pid);
	fdata.append('meja',meja);
	fdata.append('bungkus',bungkus);
	fdata.append('batal','TIDAK');
	fdata.append('siap','SDH');

	//BOF API
	//'http://192.168.2.100:8010/backend/?'
	fetch(this.state.SERVER_URL, {
	    method: 'POST',
	    headers: {
		//Accept: 'application/json',
		//'Content-Type': 'application/json',
		//'Content-Type': false,
	    },
	    body: fdata,
	})
	    .then((response) => response.json())
	    .then(this.setState({menus:[]}))	    
	    .catch((error) => {
		//console.error(error);
		console.log(error);
		Alert.alert('Terjadi kesalahan!');
	    })
	    .done();*/
	
    }

    _onPress(nomor,nama,harga){
	//console.log('Pilihmenu.js. \nMenu id: '+nomor+',nama:'+nama+',harga:'+harga);

	//meja dummy
	//let meja="07";
	this.props._pilihMenu(nomor,nama,harga);
	/*
	const pils=this.state.dipilih.slice(0);
	pils.push({
	    meja:'02',
	    id:nomor,
	    nama:nama,
	    harga:harga,
	});

	this.setState({dipilih:pils});*/
	
    }

    render(){
	return(
		<View style={styles.container}>
		<View>

		<Picker
	    selectedValue={this.state.jenis_menu}
	    style={{height: 50, width: 300,fontWeight:'bold'}}
	    onValueChange={(itemValue, itemIndex) =>
			   this.setState({jenis_menu: itemValue})
			  }
	    value={this.state.jenis_menu}
		>
		<Picker.Item label="Semua" value="semua" />
		<Picker.Item label="Minum" value="minum" />
		<Picker.Item label="Makan" value="makan" />
		</Picker>


		<TextInput
	    placeholder="Cari berdasarkan nama..."
		>
		</TextInput>
	    </View>
		
		<ScrollView>
		
		<View style={styles.baris}>

		{
		    this.state.menus.map(
			menus =>{
			    return (
			    	    <TouchableOpacity
				key={menus.id}
				style={styles.mejabox}
				onPress={()=>this._onPress(menus.id,menus.nama,menus.fharga)}
				    >
				    <Text key={menus.id} style={styles.mejano}>{menus.nama}</Text>
				    <Text key={'harga-'+menus.id}>{menus.fharga}</Text>
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
	backgroundColor:'lightgreen',	
	alignItems:'center',
	justifyContent:'center',
	borderRadius:10,
	borderWidth: 1,
	borderColor: '#fff',
	padding:1,
    },
    mejano:{
	color:'black',
	textAlign:'center',
	fontWeight:'bold',
	fontSize:13,
    },    
});
