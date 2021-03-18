import Invoice from '../src/index'

const express = require('express')
const app = express()
const port = 6778



const invoice = new Invoice()


// Create 2 orders
invoice
.addOrder({
  Mc: 1,
  Nr: 1,
  Rok: 2021,
  items: [
    {
      Nazw: 'Zmiana konfiguracji serwera',
      il: '30',
      JM: 'godz',
      Cena: 1499.99
    },
    {
      Nazw: 'UPS ONLINE 10kW',
      il: '1',
      JM: 'szt',
      Cena: 4200
    },
    {
      Nazw: 'Kabel krosowy (patchcord)',
      il: '10',
      JM: 'szt',
      Cena: 100
    }
  ]
})
.addOrder({
  ID: 'CUSTOM_ID',
  Mc: 1,
  Nr: 2,
  Rok: 2021,
  items: [
    {
      ID: 'CUSTOM_ITEM_ID_1',
      Nazw: 'Rekonfiguracja serwera',
      il: '1',
      JM: 'godz',
      Cena: 50
    }
  ]
})

// Get order as XML
const XMLStr = invoice.getXml()

app.get('/', (req, res) => {
  res.header("Content-type", "text/xml")
  res.send(XMLStr)
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})