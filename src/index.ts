// Header:
// <DOKUMENT wersja="2.00" firma="Firmatec" produkt="www.firmatec.pl Faktura iBiznes" data="07 lipiec 2010">

/*
EXAMPLE: 
const id = 'lksjhalkf987sdf09872oj9p87' // Unique ID
invoiceNo = 'ZAS/1/2021/03';

const invoice = new iBizInvoice({
  id,
  no,
  registerName, // default 'ZAS'
  invoiceNo, // invoiceNo = `${}`
  dateOfCreate, // separate to three fields in XML
  dateOfIssue,  // 'RRRRMMDD'
  dateOfOrderExecution
})
invoice.addItem({
  name: 'Some name',
  qty: 2,
  price: 199.99,
  ...
})
const xmlContent = invoice.getXml()
*/
const x = 1;
console.log(x)