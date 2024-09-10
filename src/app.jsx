import { useState } from 'preact/hooks';
import './app.css';

import * as pdfFonts from "./vfs_fontes";
import pdfMake from "pdfmake/build/pdfmake.min";
pdfMake.vfs = pdfFonts.default; 


import health from './assets/health.svg';
import home from './assets/home.svg';
import car from './assets/car.svg';
import corp from './assets/corp.svg';
import travel from './assets/travel.svg';
import person from './assets/person.svg';
import bussiness from './assets/bussiness.svg';
import other from './assets/other.svg';

pdfMake.fonts = {

    OpenSansEmoji: {
      normal: 'OpenSansEmoji.ttf',
    },
    Roboto: {
      normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
      bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
      italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
      bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
    }
 } 


export function App() {
  const [categories, setCategories] = useState([
    {
      id: 'bussiness',
      name: "Firma",
      value: false ,
      img: bussiness,
      subcategories: [
        { id: 'elektronika', name: "Elektronika", value: false },
        { id: 'nnwpracownikow', name: "NNW pracowników", value: false },
        { id: 'ogien', name: "Ogień i inne zdarzenia losowe", value: false },
        { id: 'kradziez', name: "Kradzież", value: false },
        { id: 'ocprzewoznika', name: "OC zawodowe przewoźnika, OC operatora transportowego", value: false },
        { id: 'budynki', name: "Budynki / Lokale", value: false },
        { id: 'towar', name: "Towar / Środki obrotowe", value: false },
        { id: 'ocdzialanosci', name: "OC działalności", value: false },
        { id: 'cargo', name: "Cargo", value: false },
        { id: 'allrisk', name: "Formuła Allrisk", value: false },
        { id: 'oczawodowe', name: "OC zawodowe", value: false },
        { id: 'maszyny', name: "Maszyny i urządzenia budowlane", value: false },
        { id: 'sprzet', name: "Sprzęt / Wyposażenie", value: false },
        { id: 'finansowe', name: "Finansowe / Gwarancja", value: false },
        { id: 'other', name: "Inne", value: false, text: '' },
      ],
    },
    {
      id: 'car',
      name: "Komunikacja",
      value: false,
      img: car,
      subcategories: [
        { id: 'oc', name: "OC", value: false },
        { id: 'ac', name: "AC", value: false },
        { id: 'szyby', name: "Szyby", value: false },
        { id: 'gap', name: "GAP", value: false },
        { id: 'NNW', name: "NNW", value: false },
        { id: 'assistance', name: "Assistance", value: false },
        { id: 'opony', name: "Opony", value: false },
        { id: 'other', name: "Inne", value: false, text: '' },
      ],
    },
    {
      id: 'wealth',
      name: "Majątek",
      value: false,
      img: home,
      subcategories: [
        { id: 'lokal', name: "Lokal mieszkalny", value: false },
        { id: 'domwbudowie', name: "Dom w budowie", value: false },
        { id: 'budynkiwbudowie', name: "Inne budynki i budowle", value: false },
        { id: 'ogien', name: "Ogień + inne zdarzenia losowe", value: false },
        { id: 'allrisk', name: "Formuła Allrisk", value: false },
        { id: 'szyby', name: "Szyby i inne przedmioty szklane", value: false },
        { id: 'smartfon', name: "Smartfon / tablet / smartwatch - uszkodzenie, kradzież, rabunek", value: false },
        { id: 'assistance', name: "Assistance", value: false },
        { id: 'dom', name: "Dom", value: false },
        { id: 'domletniskowy', name: "Dom letniskowy", value: false },
        { id: 'ocwzyciu', name: "OC w życiu prywatnym", value: false },
        { id: 'kradziez', name: "Kradzeż z włamaniem", value: false },
        { id: 'cesja', name: "Cesja", value: false },
        { id: 'mienie', name: "Mienie ruchome / wyposażenie", value: false },
        { id: 'nnw', name: "NNW-następstwa nieszczęśliwych wypadków", value: false },
        { id: 'other', name: "Inne", value: false, text: '' },
      ],
    },
    {
      id: 'travel',
      name: "Podróż",
      value: false,
      img: travel,
      subcategories: [
        { id: 'europa', name: "Europa / Świat", value: false },
        { id: 'kosztyleczeniea', name: "Koszty leczenia i assistance", value: false },
        { id: 'sport', name: "Uprawianie sportu", value: false },
        { id: 'choroby', name: "Choroby przewlekłe", value: false },
        { id: 'oc', name: "Odpowiedzialność cywilna", value: false },
        { id: 'sprzet', name: "Sprzęt sportowy", value: false },
        { id: 'polska', name: "Polska", value: false },
        { id: 'odwolanie', name: "Odwołanie imprezy / hotelu / lotu", value: false },
        { id: 'praca', name: "Praca", value: false },
        { id: 'nnw', name: "NNW-następstwa nieszczęśliwych wypadków", value: false },
        { id: 'bagaz', name: "Bagaż", value: false },
        { id: 'other', name: "Inne", value: false, text: '' },
      ],
    },
    {
      id: 'health',
      name: "Życie i zdrowie",
      value: false,
      img: health,
      subcategories: [
        { id: 'indywidualne', name: "Indywidualne", value: false },
        { id: 'grupowe', name: "Grupowe praownicze", value: false },
        { id: 'zdrowie', name: "Zdrowie", value: false },
        { id: 'zachorowanie', name: "Poważne zachorowanie", value: false },
        { id: 'am', name: "Abonament medyczny", value: false },
        { id: 'rodzina', name: "Rodzinne", value: false },
        { id: 'zycie', name: "Życie", value: false },
        { id: 'nnw', name: "NNW-następstwa nieszczęśliwych wypadków", value: false },
        { id: 'szpital', name: "Pobyt w szpitalu", value: false },
        { id: 'ike', name: "Oszczędzanie IKE / IKZE", value: false },
        { id: 'other', name: "Inne", value: false, text: '' },
      ],
    },
    {
      id: 'personal',
      name: "Osobowe / NNW",
      value: false,
      img: person,
      subcategories: [
        { id: 'indywidualne', name: "Indywidualne", value: false },
        { id: 'sport', name: "Sport (jaki?)", value: false },
        { id: 'dziecko', name: "Dziecko + szkolne", value: false },
        { id: 'rehabilitacja', name: "Rehabilitacja", value: false },
        { id: 'zasilek', name: "Zasiłek szpitalny", value: false },
        { id: 'rodzina', name: "Rodzinne", value: false },
        { id: 'praca', name: "Praca (jaka?)", value: false },
        { id: 'zawal', name: "Zawał / udar", value: false },
        { id: 'leczenie', name: "Koszty leczenia", value: false },
        { id: 'other', name: "Inne", value: false, text: '' },
      ],
    },
    {
      id: 'corp',
      name: "Korporacja",
      value: false,
      img: corp,
      subcategories: [
        { id: 'mienie', name: "Mienie - Majątek", value: false },
        { id: 'oczawodowa', name: "Odpowiedzialność Cywilna Zawodowa", value: false },
        { id: 'transport', name: "Transportowe", value: false },
        { id: 'budowy', name: "Budowy i montażu", value: false },
        { id: 'cyber', name: "Cyber + RODO", value: false },
        { id: 'prawne', name: "Prawne i skarbowe", value: false },
        { id: 'nnw', name: "NNW grupowe", value: false },
        { id: 'oc', name: "Odpowiedzialność cywilna", value: false },
        { id: 'zysk', name: "Utrata zysku", value: false },
        { id: 'floty', name: "Floty", value: false },
        { id: 'finanse', name: "Finansowe i Gwarancje", value: false },
        { id: 'energia', name: "Energia OZE", value: false },
        { id: 'agro', name: "Agrobiznes", value: false },
        { id: 'do', name: "Członków Władz (D&O)", value: false },
        { id: 'other', name: "Inne", value: false, text: '' },
      ],
    },

    {
        id: 'other',
        name: "Inne",
        value: false,
        img: other,
        text: '',
    }
  ]);

  const handleCategories = (event) => {
    const newCategories = categories.map((item) => {
      if (item.id === event.target.id) {
        return { ...item, value: event.target.value === 'true' ? true : event.target.value === 'future' ? 'future' : false };
      }
      return item;
    });
    setCategories(newCategories);
  };

  const handleSubcategoryChange = (categoryId, subcategoryId, value, isText = false) => {
    const newCategories = categories.map((category) => {
      if (category.id === categoryId) {
        const newSubcategories = category.subcategories.map((subcategory) => {
          if (subcategory.id === subcategoryId) {
            if (isText) {
              return { ...subcategory, text: value };
            }
            return { ...subcategory, value };
          }
          return subcategory;
        });
        return { ...category, subcategories: newSubcategories };
      }
      return category;
    });
    setCategories(newCategories);
  };

  const handleOtherTextChange = (event) => {
    const newCategories = categories.map((item) => {
      if (item.id === 'other') {
        return { ...item, text: event.target.value };
      }
      return item;
    });
    setCategories(newCategories);
  };

  const [perm, setPerm] = useState(false);
  const handlePerm = (event) => {
    setPerm(event.target.value === 'true' ? true : false);
  };
  // Refaktoryzacja
  const [nameData, setNameData] = useState([
    { name: "Imię", value: '' },
    { name: "Nazwisko", value: '' },
    { name: "Data urodzenia klienta", value: '' },
    { name: "Email", value: '' },
    { name: "Data", value: '' },
    { name: "Ankieta APK nr", value: '' },
    { name: "Agencja", value: '' },
    { name: "Agent przygotowujący ofertę", value: '' },
    { name: "Agent przygotowujący analizę", value: '' },

  ]);

  const handleNameChange = (event) => {
    const newNameData = nameData.map((item) => {
      if (item.name === event.target.name) {
        return { ...item, value: event.target.value };
      }
      return item;
    });
    setNameData(newNameData);
  };

function generatePDF(event) {
  document.querySelector('.modal').style.display = 'flex';
    event.preventDefault();
    const docDefinition = {

      

      content: [
        {
              text: 'Analiza Potrzeb Klienta',
              fontSize: 18,
              bold: true,
              color: '#fcd424',
              alignment: 'center',
              margin: [0, 0, 0, 20],
        },
        { text: `Ankieta przygotowana w oparciu o rozmowę z klientem w dniu: ${nameData[4].value}` },
        { text: `Wyrażam zgodę na przeprowadzenie analizy: ${perm ? 'Tak' : 'Nie'}`, margin: [0, 0, 0, 10] },
        {
          text: `Oświadczam, że zostałam/em poinformowana/y, że wypełnienie niniejszej Ankiety jest dobrowolne, oraz że w przypadku odmowy jej wypełnienia. Agent ma ograniczoną możliwość dokonania oceny, czy zawierana przeze mnie umowa ubezpieczenia jest dla mnie odpowiednia.`,
          fontSize: 10,
          margin: [0, 0, 0, 10],
        },
        { text: `Imię: ${nameData[0].value}`, margin: [0, 0, 0, 10] },
        { text: `Nazwisko: ${nameData[1].value}`, margin: [0, 0, 0, 10] },
        { text: `Data urodzenia klienta: ${nameData[2].value}`, margin: [0, 0, 0, 10] },
        { text: `Email: ${nameData[3].value}`, margin: [0, 0, 0, 10] },
        { text: `Ankieta APK nr: ${nameData[5].value}`, margin: [0, 0, 0, 10] },
        { text: `Agencja: ${nameData[6].value}`, margin: [0, 0, 0, 10] },
        { text: `Agent przygotowujący ofetę: ${nameData[7].value}`, margin: [0, 0, 0, 10] },
        { text: `Agent przygotowujący analizę: ${nameData[8].value}`, margin: [0, 0, 0, 10] },
        { },

        ...categories.map(item => {
          if (item.value === true && item.subcategories) {
            return [
              { text: `${item.name}:`, bold: true, margin: [0, 0, 0, 10] },
              {
                ol: item.subcategories.map(sub => {
                  if (sub.id === 'other' && sub.text) {
                    return `${sub.name} (${sub.text})`;
                  }
                 
                  return { text: [sub.name, {text: sub.value ? ' ☑' : ' ☐' , font: 'OpenSansEmoji'} ], margin: [0, 0, 0, 10] };
                  
                }).filter(Boolean),
                margin: [0, 0, 0, 10]
              }
            ];
          }
          if (item.value === 'future' && item.subcategories) {
            return [
              { text: `${item.name} (W przyszłości):`,bold: true, margin: [0, 0, 0, 10] },
              {
                ol: item.subcategories.map(sub => {
                 
                  return { text: [sub.name, {text: sub.value ? ' ☑' : ' ☐' , font: 'OpenSansEmoji'} ], margin: [0, 0, 0, 10] };
                 // return `${sub.name} ${ sub.value ? '[X]' : '' }`;
                  
                }).filter(Boolean),
                margin: [0, 0, 0, 10]
              }
            ];
          }
          if (item.id === 'other' && item.value) {
            return [
              { text: `${item.name} (${item.value === 'future' ? 'W przyszłości' : 'Tak'}):`,bold: true, margin: [0, 0, 0, 10] },
              { text: ` ${item.text ? item.text : ''}`, margin: [0, 0, 0, 10] }
            ];
          }
          return [];
        }).flat(),
        { text: 'Wyrażam zgodę na przetwarzanie moich danych osobowych w celu przeprowadzenia analizy potrzeb ubezpieczeniowych.', margin: [0, 0, 0, 20] },
        { text: 'Data i podpis klienta' },
      ],  
    };

    pdfMake.createPdf(docDefinition).download(`Formularz APK-${nameData[1].value} ${nameData[0].value}.pdf`);
    document.querySelector('.modal').style.display = 'none';
  }

  return (
    <div class="wrapper">
      <div className="modal"><p>Proszę czekać...</p></div>
      <h1>Formularz APK</h1>
      <form id="pdf-form" onSubmit={generatePDF}>
        <div className="perm">
          <label htmlFor="perm">
            Wyrażam zgodę na przeprowadzenie analizy:
          </label>
          <select required id="perm" name="perm" onInput={handlePerm}>
            <option value={''}>Wybierz</option>
            <option value={true}>Tak</option>
            <option value={false}>Nie</option>
          </select>
        </div>
        <div className="names">
          {nameData.map((item) => (
            <div key={item.name}>
              <label htmlFor={item.name}>{item.name}:</label>
              <input
                type={item.name === 'Email' ? 'email' : item.name === 'Data' || item.name === 'Data urodzenia klienta' ? 'date' : 'text'}
                id={item.name}
                name={item.name}
                value={item.value}
                onInput={handleNameChange}
                required
              />
            </div>
          ))}
        </div>
        <fieldset class="insurance-form">
          <legend>Rodzaj ubezpieczenia:</legend>
          {categories.map((item) => (
            <div key={item.id}>
              <img src={item.img}/>
              <label htmlFor={item.id}>{item.name}:</label>
              <select onInput={handleCategories} id={item.id}>
                <option value={''}>Nie</option>
                <option value={'true'}>Tak</option>
                <option value={'future'}>W przyszłości</option>
              </select>
              {(item.value === true || item.value === 'future') && item.subcategories && (
                <div className="enrolled">
                  {item.subcategories.map((sub) => (
                    <div key={sub.id}>
                      <input
                        type={ sub.id === 'other' ? 'text' : 'checkbox'}
                        id={sub.id}
                        name={sub.name}
                        checked={sub.value}
                        onInput={(e) =>
                          sub.id === 'other'
                          ? handleSubcategoryChange(item.id, sub.id, e.target.value, true)
                          : handleSubcategoryChange(item.id, sub.id, e.target.checked)
                        }
                      />
                        <label htmlFor={sub.id}>{sub.name}</label>
                    </div>
                  ))}
                </div>
              )}
              {item.id === 'other' && (item.value === true || item.value === 'future') && (
                <div className="enrolled">
                  <label htmlFor="otherText">Wpisz szczegóły:</label>
                  <textarea
                    id="otherText"
                    name="otherText"
                    value={item.text}
                    onInput={handleOtherTextChange}
                  />
                </div>
              )}
            </div>
          ))}
        </fieldset>
        
        <button type="submit">
          Generuj PDF
        </button>
      </form>
    </div>
  );
}

export default App;
