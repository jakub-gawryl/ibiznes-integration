import parseXml from 'xml'
import { v4 as uuidv4 } from 'uuid';

// API Doc: https://www.firmatec.pl/help/tresc/zawartosc/praca/ustawienia/export_zamowien_xml.htm (polish)

const CONSTANT_ORDER_PARAMS = [
  {Ro: 'z'},      // 4.
  {Stan: '1'},    // 5.
  {Przel: null},  // 21.
  {IDk: null},    // 22.
  {Fak: null},    // 37.
  {DFak: null},   // 38.
  {FakZ: null},   // 39.
  {DFakZ: null},  // 40.
  {Zam: null},    // 41.
  {DZam: null},   // 42.
  {Prz: null},    // 43.
  {LOK: '0'},     // 54.
  {isV: 'TTT'},   // 58.
  {DataL: null},  // 61.
  {StatID: null}, // 62.
  {StatNaz: null},// 63.
  {Op1: null},    // 64.
  {Op2: null},    // 65.
  {Wa1: null},    // 66.
  {Wa2: null},    // 67.
  {Anul: 'N'},    // 69.
]

const CONSTANT_ORDER_ITEM_PARAMS = [
  {Ro: 'o'},      // 73.
  {Rodz: null},   // 74.
  {LOK: null},    // 95.
  {DataL: null},  // 97.
  {Anul: 'N'},    // 98.
]

export default class iBizExport {

  private root: any

  constructor() {

    // Init root
    this.root = [
      {
        _attr: {
          wersja: '2.00',
          firma: 'Firmatec',
          produkt: 'www.firmatec.pl Faktura iBiznes'
        }
      }
    ]
  }

  addOrder(orderParams: IiBizOrderParams): iBizExport {

    const {Rej, Nr, Rok} = orderParams

    const orderID = orderParams.ID || uuidv4()
    const NrR = orderParams.NrR || `${Rej || 'ZAS'}/${Nr}/${Rok}`
    const orderItems = orderParams.items

    delete orderParams.ID
    delete orderParams.NrR
    delete orderParams.items

    // ********** ADD ORDER **********
    const orderDoc = {
      ZAPIS: [
        {
          _attr: {
            co: 'zamowienia',
            ID: orderID,
            NrR
          }
        }
      ]
    }

    // Make sure proper ID and NrR are added
    orderDoc.ZAPIS.push(...[
      {ID: orderID},
      {NrR: NrR}
    ] as any)

    // Add item parameters
    for (const key in orderParams) {
      orderDoc.ZAPIS.push({[key]: orderParams[key]} as any)
    }

    // Add constans parameters
    orderDoc.ZAPIS.push(...CONSTANT_ORDER_PARAMS as any)

    // Add to root document
    this.root.push(orderDoc)

    // ********** ADD ORDER ITEMS **********
    orderItems.forEach(item => {
      const itemID = item.ID || uuidv4()
      delete item.ID

      const itemDoc = {
        ZAPIS: [
          {
            _attr: {
              co: 'zamsy',
              ID: itemID,
              NrR
            }
          }
        ]
      }

      // Make sure proper item ID, NrR and order ID are added
      itemDoc.ZAPIS.push(...[
        {ID: itemID},
        {NrR: NrR},
        {IDf: orderID}
      ] as any)

      // Add item parameters
      for (const key in item) {
        const value = (key === 'il')
          ? `${item[key]}`.replace('.', ',')
          : item[key];

        itemDoc.ZAPIS.push({[key]: value} as any)
      }

      // Add constans parameters
      itemDoc.ZAPIS.push(...CONSTANT_ORDER_ITEM_PARAMS as any)

      // Add to root document
      this.root.push(itemDoc)
    })

    return this
  }

  public getXml(): string {
    return parseXml({DOKUMENT: this.root});
  }

}


export interface IiBizOrderParams {

  /** Elementy na fakturze */
  items: IiBizOrderItemParams[];

  /** 3. Unikalne ID zam??wienia - w przypadku pustego, zostanie wygenerowany automatycznie uuid v4*/
  ID?: string;

  /** 6. Numer kolejny zam??wienia */
  Nr: number;

  /** 7. Nazwa rejestru (przewa??nie "ZAS") */
  Rej?: string;

  /** 8. Rok sporz??dzenia dokumentu */
  Rok: number;

  /** 9. Miesi??c sporz??dzenia dokumentu */
  Mc: number;

  /** 
   * 10. Nr. w rejestrze
   * Domy??lny: `${Rej}/${Nr}/${Rok}` np "ZAS/1/2021"
   */
  NrR?: string;

  /** 11. Data wystawienia (RRRRMMDD) */
  DWy: string;

  /** 12. Data wykonania zam??wienia */
  Data?: string;

  /** 13. Kwota (netto) wykonania */
  N0?: number;

  /** 14. Kwota (netto) po rabacie */
  N0r?: number;

  /** 15. Kwota (brutto) wykonania */
  Wart?: number;

  /** 16. Warto???? (brutto) */
  Wartr?: number;

  /** 17. Warto???? (brutto) po rabacie */
  WWart?: number;

  /** 18. Zam??wienie wystawione w cenach (N - netto, B - brutto) */
  NB?: 'N' | 'B';

  /** 19. Waluta */
  Wal?: string;

  /** 20. Kurs waluty w/g NBP */
  Kurs?: number;

  /** 23. Nazwa firmy */
  Alias?: string;

  /** 24. Prefix NIP (np. PL DE) */
  NIPx?: string;

  /** 25. Nr. NIP firmy */
  NIP?: string;

  /** 26. Regon czy Pesel ('R', 'P') */
  REGPES?: 'R' | 'P';

  /** 27. Nr Regon lub Nr Pesel */
  REG?: string;

  /** 28. Kraj */
  Kraj?: string;

  /** 29. Nazwa pe??na firmy */
  Nazw?: string;

  /** 30. Druga nazwa - je??eli istnieje */
  Nazw2?: string;

  /** 31. Kod pocztowy */
  Kodp?: string;

  /** 32. Miasto */
  Mias?: string;

  /** 33. Adres (ul + nr bud/lok) */
  Ulic?: string;

  /** 34.Telefon kontaktowy */
  T1?: string;

  /** 35. E-mail */
  Mail?: string;

  /** 36. Imi?? i nazwisko klienta */
  Os?: string;

  /** 44. Opis zam??wienia (np. wykonanie strony internetowej) */
  Opis?: string;

  /** 45. Termin wykonania (s??ownie np. "jeden miesi??c") */
  Term?: string;

  /** 46. Forma p??atno??ci (s??ownie np. "P??atne przy odbiorze") */
  Plat?: string;

  /** 47. Uzgodnienia (np. "Zleceniodawca przeka??e materia??y w terminie 2 tygodni") */
  Tekst?: string;

  /** 48. Notatka wewn??trzna */
  Notk?: string;

  /** 49. Uwagi na zam??wieniu (np. "Wszelkie zmiany po wykonaniu zlecenia b??d?? odp??atne.") */
  UW?: string;

  /** 50. Obszar */
  Ceg?: string;

  /** 51. Osoba do podpisu na fakturze */
  OsWy?: string;

  /** 52. Akwizytor */
  OW?: string;

  /** 53. Nazwa operatora (np. "admin") */
  UZ?: string;

  /** 55. Kwata zap??aty je??eli zaliczka */
  Zap?: number;

  /** 56. Warunki dostawy */
  WarDo?: string;

  /** 57. Adres Dostawy */
  AdrDo?: string;

  /** 59. ID zam??wienia internetowego */
  zID?: string;

  /** 60. ID klienta internetowego */
  zIDk?: string;

  /** 68. Nr j??zyka 0-polski */
  Defni?: number;
}

export interface IiBizOrderItemParams {

  /**
   * 72. ID pozycji (jednoznaczny identyfikator - inny ni?? ID zam??wienia)
   * w przypadku pustego, zostanie wygenerowany automatycznie uuid v4
   */
  ID?: string;

  /** Pozycja zam??wienia */
  Poz?: number;

  /** 76. [NIE UZUPE??NIA??!] Nr. w rejestrze (automatycznie uzupe??niane z zam??wienia) */
  // NrR?: never;

  /** 77. [NIE UZUPE??NIA??!] Nr ID zam??wienia (automatycznie uzupe??niane z zam??wienia) */
  // IDf?: never;

  /** 78. Nazwa magazynu */
  Mag?: string;

  /** 79. Kod towaru / us??ugi */
  Kod?: string;

  /** 80. Nazwa towaru / us??ugi */
  Nazw: string;
  
  /** 81. Opis towaru / us??ugi */
  Opis?: string;

  /** 82. Jednostka miary */
  JM?: string;

  /** 83. Stawka podatku VAT (np. 23 dla 23% VATu) */
  VAT?: number;

  /** 84. Procent podatku VAT (np. "23%") */
  NVAT?: string;

  /** 85. Ilo???? - dozwolone warto??ci u??akowe (UWAGA - przecinek jako decimal point np. 1,000) */
  il?: number;

  /** 86. Cena (netto) us??ugi */
  CN?: number;
  
  /** 87. Cena (brutto) us??ugi */
  CB?: number;
  
  /** 88. Cena us??ugi */
  Cena?: number;
  
  /** 89. Cena zakupu (koszt) */
  Cz?: number;
  
  /** 90. Czy wystawione w Netto czy Brutto ('N', 'B') */
  NB?: 'N' | 'B';

  /** 91. Procent rabatu na pozycj?? */
  PrRab?: number;

  /** 92. ID towaru w sklepie internetowym */
  zID?: string;

  /** 93. Kurs waluty */
  kurs?: number;

  /** 94. Nazwa waluty (np. "PLN") */
  Wal?: string;

  /** 96. U??ytkownik programu */
  UZ?: string;
}