# Faktura iBiznes integration

[Faktura iBiznes API](https://www.firmatec.pl/help/tresc/zawartosc/praca/ustawienia/export_zamowien_xml.htm)

# How to use

First download package using npm:

```
npm install ibiznes-integration
```

next - import, create instance and create order and it's items:

```javascript

import Ibiznes from 'ibiznes-integration';
const ibiz = new Ibiznes();

// Create order with 4 positions
ibiz.addOrder({
  Mc: 1,                // Required
  Nr: 1,                // Required
  Rok: 2020,            // Required
  DWy: '20210101',      // Required (format YYYYMMDD)
  items: [              // Required
    {
      Nazw: 'Patchcord',// Required
      il: 10,           // opt
      JM: 'szt',        // opt
      CN: 100,          //...
    },
    {
      Nazw: 'Listwa zasilająca',
      il: 2,
      JM: 'szt',
      CN: 299.99
    },
    {
      Nazw: 'Router',
      il: 1,
      JM: 'szt',
      CN: 1499.99
    },
    {
      Nazw: 'Prace naprawcze serwera',
      il: 10,
      JM: 'godz',
      CN: 500
    },
  ]
});

// Create XML structure
const resultXml = ibiz.getXml();

// resultXml can be sent via express or saved as file and serverd
// via standard http server (eg. Apache) or FTP...

```

# Potential problems

 Seems like iBiznes software might have problems with importing from localhost and/or different port (seems like ports 80 and 8080 works just fine).