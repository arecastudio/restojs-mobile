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

export default class Pilihmenu extends React.Component{
    constructor(){
	super();
	this.state={
	    mejas:[],
	    jenis_menu:'semua',
	    menus:[],
	    menus_ori:[],
	    //dipilih:[],
	    cari:'',
	    modalVisible: false,
	    modal_nomor:'',
	    modal_nama:'',
	    modal_harga:'',
	    modal_jumlah:1,
	}
    }

    componentDidMount(){

	if(this.state.menus_ori.length<1){
	    //this check method not working because menus_ori always reseted
	    //I will find another best solution later on
	    
	    fetch(SERVER_URL+'data=data-menu', {
		method: 'GET'
	    })
		.then((response) => response.json())
		.then((menus) => this.setState({menus:menus,menus_ori:menus,jenis_menu:'semua'}))
		.catch((error) => {
		    //console.error(error);
		    Alert.alert('Terjadi kesalahan. Periksa koneksi anda !');
		});
	}else{
	    console.log('data menu masih ada, tidak perlu dipanggil kembali');
	}
	
	

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


    setModalVisible(visible) {
	this.setState({modalVisible: visible});
    }

    submitData(){
	const nomor=this.state.modal_nomor;
	const nama=this.state.modal_nama;
	const harga=this.state.modal_harga;
	const jumlah=this.state.modal_jumlah;
	
	this.props._pilihMenu(nomor,nama,harga,jumlah);
	this.setModalVisible(false);
    }
    
    _onPress(nomor,nama,harga){
	//console.log('Pilihmenu.js. \nMenu id: '+nomor+',nama:'+nama+',harga:'+harga);
	//console.log('Jenis menu: '+this.state.jenis_menu);
	
	//this.props._pilihMenu(nomor,nama,harga);

	//tambahkan MODAL

	this.setState({modal_nomor:nomor,modal_nama:nama,modal_harga:harga,modal_jumlah:1});
	
	this.setModalVisible(true);
    }

    _gantiJenis=(jns)=>{
	//ganti jenis menu
	
	let xmenux=[];
	switch(jns){
	case 'makan':
	    console.log('anda memilih makanan');
	    xmenux=this.state.menus_ori.filter(x=>x.jenis==='MAKAN');
	    break;
	case 'minum':
	    console.log('anda memilih minuman');
	    xmenux=this.state.menus_ori.filter(x=>x.jenis==='MINUM');
	    break;
	default:
	    console.log('anda memilih semua');
	    xmenux=this.state.menus_ori;
	}
	
	this.setState({jenis_menu:jns,menus:xmenux});
	
	console.log('jenis: '+jns);
    }

    onSearch=(event)=>{
	let keys=event.nativeEvent.text.toLowerCase();
	let xmenux=[];
	
	if(keys.length>=1){
	    xmenux=this.state.menus_ori.filter(item=>item.nama.toLowerCase().includes(keys));
	    //this.setState({menus:xmenux});
	    
	    
	    //console.log(xmenux);
	}else{
	    xmenux=this.state.menus_ori;
	}

	this.setState({cari:keys,menus:xmenux});
	
    } 
    
    render(){
	return(
	    <View style={styles.container}>
	      
	      <View>
		<Picker
		  selectedValue={this.state.jenis_menu}
		  style={{height: 50, width: 300,fontWeight:'bold'}}
		  onValueChange={this._gantiJenis}
		  value={this.state.jenis_menu}
		  >
		  <Picker.Item label="Semua" value="semua" />
		  <Picker.Item label="Minum" value="minum" />
		  <Picker.Item label="Makan" value="makan" />
		</Picker>

		<TextInput
		  placeholder="Cari berdasarkan nama..."
		  onChange={this.onSearch}
		  value={this.state.cari}
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


	        <Modal
	    animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => this.setModalVisible(false)}
		>
		<View style={styles.modalbox}>
		<View>
		<Text>Pilih jumlah yang akan di-order selanjutnya tekan OK untuk konfirmasi orderan agar dapat masuk ke dalam menu 3. Daftar Pesanan</Text>
		<Text style={styles.tlabel}>Nama:</Text>
		<Text>{this.state.modal_nama}</Text>
		<Text style={styles.tlabel}>Harga:</Text>
		<Text>Rp.  {this.state.modal_harga}</Text>
		<Text style={styles.tlabel}>Jumlah:</Text>
		<TextInput
	    keyboardType='numeric'
	    value={this.state.modal_jumlah+''}
	    onChangeText={tx=>this.setState({modal_jumlah:tx})}
	    style={styles.inputx}
	    />
		</View>

		<View style={styles.buttonContainer}>
		<View style={{flex:1,margin:5,}}>
		<Button title="OK" onPress={()=>this.submitData()} />
		</View>
		<View style={{flex:1,margin:5,}}>
		<Button title="Batal" onPress={()=>this.setModalVisible(false)} />
		</View>
		</View>
		
	    </View>
		</Modal>
		
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
    buttonContainer:{
	flexDirection: 'row',
	marginTop:20,
    },
    tlabel:{
	marginTop:10,
	color:'blue',
	/*textAlign:'center',*/
	fontWeight:'bold',
	fontSize:15,
    },
    modalbox:{
	backgroundColor:'lightgray',
	margin:3,
	padding:3,
    },
    inputx:{
	padding:2,
	margin:3,
	backgroundColor:'white',
	textAlign:'center',
	width:100,
    },
});
