import { useState } from "preact/hooks";
import "./app.css";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import logo from "./assets/logo_unio.png";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function App() {
  const [categories, setCategories] = useState([
    {
      id: 'bussiness',
      name: "Firma",
      value: false,
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
      ],
    },
    {
        id: 'farm',
        name: "Rolne",
        value: false,
        subcategories: [
          { id: 'ocrolnika', name: "OC Rolnika", value: false },
          { id: 'mienie', name: "Mienie", value: false },
          { id: 'maszyny', name: "Maszyny", value: false },
          { id: 'budynki', name: "Budynki", value: false },
          { id: 'uprawy', name: "Uprawy", value: false },
          { id: 'zwierzeta', name: "Zwierzęta", value: false },
          { id: 'other', name: "Inne", value: false, text: '' },
        ],
    },
    {
        id: 'other',
        name: "Inne",
        value: false,
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

  const [nameData, setNameData] = useState([
    { name: "Imię", value: '' },
    { name: "Nazwisko", value: '' },
    { name: "Email", value: '' },
    { name: "Data", value: '' },
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

  async function generatePDF(event) {
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
        { text: `Ankieta przygotowana w oparciu o rozmowę z klientem w dniu: ${nameData[3].value}` },
        { text: 'Numer Agenta: 123456789', fontSize: 10, margin: [0, 0, 0, 20] },
        { text: `Wyrażam zgodę na przeprowadzenie analizy: ${perm ? 'Tak' : 'Nie'}`, margin: [0, 0, 0, 10] },
        { text: `Imię: ${nameData[0].value}`, margin: [0, 0, 0, 10] },
        { text: `Nazwisko: ${nameData[1].value}`, margin: [0, 0, 0, 10] },
        { text: `Email: ${nameData[2].value}`, margin: [0, 0, 0, 10] },
        { },
        {
          text: `Oświadczam, że zostałam/em poinformowana/y, że wypełnienie niniejszej Ankiety jest dobrowolne, oraz że w przypadku odmowy jej wypełnienia. Agent ma ograniczoną możliwość dokonania oceny, czy zawierana przeze mnie umowa ubezpieczenia jest dla mnie odpowiednia.`,
          fontSize: 10,
          margin: [0, 0, 0, 10],
        },
        ...categories.map(item => {
          if (item.value === true && item.subcategories) {
            return [
              { text: `${item.name}:`, bold: true, margin: [0, 0, 0, 10] },
              {
                ol: item.subcategories.map(sub => {
                  if (sub.id === 'other' && sub.value && sub.text) {
                    return `${sub.name} (${sub.text})`;  // Dodano obsługę pola tekstowego
                  }
                  if (sub.value) {
                    return sub.name;
                  }
                }).filter(Boolean),
                margin: [0, 0, 0, 10]
              }
            ];
          }
          if (item.value === 'future' && item.subcategories) {
            return [
              { text: `${item.name} (W przyszłości):`, bold: true, margin: [0, 0, 0, 10] },
              {
                ol: item.subcategories.map(sub => {
                  if (sub.value) {
                    return sub.name;
                  }
                }).filter(Boolean),
                margin: [0, 0, 0, 10]
              }
            ];
          }
          if (item.id === 'other' && item.value) {
            return [
              { text: `${item.name} (${item.value === 'future' ? 'W przyszłości' : 'Tak'}): ${item.text}`, margin: [0, 0, 0, 10] }
            ];
          }
          return [];
        }).flat(),
        { text: 'Wyrażam zgodę na przetwarzanie moich danych osobowych w celu przeprowadzenia analizy potrzeb ubezpieczeniowych.', margin: [0, 0, 0, 20] },
        { text: 'Data i podpis klienta' },
      ],
    };

    pdfMake.createPdf(docDefinition).download(`Formularz APK-${nameData[3].value}.pdf`);
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
                type={item.name === 'Email' ? 'email' : item.name === 'Data' ? 'date' : 'text'}
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
