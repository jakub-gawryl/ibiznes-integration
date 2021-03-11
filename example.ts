import Invoice from './src/index'

const invoice = new Invoice()

invoice.addOrder({
  Mc: 1,
  Nr: 1,
  Rok: 2021,
  NrR: `ZENEK_12345/9999`,
  items: [
    {
      Nazw: 'Obsługa serwera (#428)',
      il: '1',
      Cena: 100.99
    },
    {
      Nazw: 'Patchcord',
      il: '10',
      Cena: 60.99
    }
  ]
})
.addOrder({
  ID: 'TESTOWE_ZAMOWIENIE_ID',
  Mc: 2,
  Nr: 1,
  Rok: 2021,
  items: [
    {
      ID: 'ITEM_0000000000001',
      Nazw: 'Pomoc w rozwiązaniu problemu',
      il: '100',
      JM: 'godz.',
      Cena: 100.99
    },
    {
      Nazw: 'Serwer Dell 2000',
      il: '10',
      Cena: 60.99
    }
  ]
})

const XMLStr = invoice.getXml()

console.log(XMLStr)