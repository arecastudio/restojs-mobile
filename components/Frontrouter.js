import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Orders from './Orders.js'
import Pilihmeja from './Pilihmeja.js'

const Frontrouter = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "orders" component = {Orders} title = "Menu Order" initial = {true} />
         <Scene key = "pilihmeja" component = {Pilihmeja} title = "Pilih Meja" />
      </Scene>
   </Router>
)
export default Frontrouter
