import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Orders from './Orders.js'
import Pilihmeja from './Pilihmeja.js'
import Pilihmenu from './Pilihmenu.js'
import Daftarpilih from './Daftarpilih.js';

const Frontrouter = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "orders" component = {Orders} title = "Menu Order" initial = {true} />
        <Scene key = "pilihmeja" component = {Pilihmeja} title = "Pilih Meja" />
	<Scene key = "pilihmenu" component = {Pilihmenu} title = "Pilih Menu" />
	<Scene key = "daftarpilih" component = {Daftarpilih} title = "Daftar Menu" />
      </Scene>
   </Router>
)
export default Frontrouter
