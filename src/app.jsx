import { useState } from "preact/hooks";
import "./app.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import logo from "./assets/logo_unio.png";

// Czy logo to powinno być studiopolis?


export function App() {

  const [date, setDate] = useState('');
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

  const handleSubcategoryChange = (categoryId, subcategoryId, value) => {
    const newCategories = categories.map((category) => {
      if (category.id === categoryId) {
        const newSubcategories = category.subcategories.map((subcategory) => {
          if (subcategory.id === subcategoryId) {
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


  const [perm , setPerm] = useState(false);
  const handlePerm = (event) => {
    setPerm(event.target.value === 'true' ? true : false);
  };

  const [nameData, setNameData] = useState([
    { name: "Imię", value: '' },
    { name: "Nazwisko", value: '' },
    { name: "Email", value: '' },
    { name: "Data", value: date },
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

    const pdfContent = `
      <div width: 700px>
        <div style="display: flex; justify-content: space-between;">
          <img src="${logo}" style="width: 100px; height: 100%;">
          <h1 style="font-size: 1.4em; color: #0d2143; text-align: center;">Analiza Potrzeb Klienta</h1>
        </div>
        <div style="font-size: 1em; color: #333;">
          <p>Ankieta przygotowana w oparciu o rozmowę z klientem w dniu: ${date}</p>
          <p style="font-size: 10px; margin-bottom: 20px;">Numer Agenta: 123456789</p>
          <p style="margin-bottom: 10px;"><strong>Wyrażam zgodę na przeprowadzenie analizy:</strong> ${perm ? 'Tak' : 'Nie'}</p>
          <p style="margin-bottom: 10px;"><strong>Imię:</strong> ${nameData[0].value}</p>
          <p style="margin-bottom: 10px;"><strong>Nazwisko:</strong> ${nameData[1].value}</p>
          <p style="margin-bottom: 10px;"><strong>Email:</strong> ${nameData[2].value}</p>
          <p style="font-size: 10px; margin-bottom: 10px;">Oświadczam, że zostałam/em poinformowana/y, że wypełnienie niniejszej Ankiety jest dobrowolne, oraz że w przypadku odmowy jej wypełnienia. Agent ma ograniczoną możliwość dokonania oceny, czy zawierana przeze mnie umowa ubezpieczenia jest dla mnie odpowiednia.</p>
          ${categories.map(item => {
            if (item.value === true && item.subcategories) {
              return `
                <p style="margin-bottom: 10px; margin-left: 10px; font-weight:600;"><i>${item.name}:</i></p>
                <ol style="margin-bottom: 10px; margin-left: 20px;">
                  ${item.subcategories.map(sub => {
                    // TUTAJ DODAĆ WYŚWIETLANIE TEKSTU Z POLA INPUT
                    sub.id === 'other' && sub.value && (sub.name = `<li>${sub.name} (${sub.text})</li>`);
                    if (sub.value) {
                      return `<li style="font-size: 14px;">${sub.name}</li>`;
                    }
                  }).filter(Boolean).join("")}
                </ol>
              `;
            }
            if (item.value === 'future' && item.subcategories) {
              return `
                <p style="margin-bottom: 10px; margin-left: 10px; font-weight:600;"><i>${item.name} (W przyszłości):</i></p>
                <ol style="margin-bottom: 10px; margin-left: 20px;">
                  ${item.subcategories.map(sub => {
                    if (sub.value) {
                      return `<li style="font-size: 14px;">${sub.name}</li>`;
                    }
                  }).filter(Boolean).join("")}
                </ol>
              `;
            }
            if (item.id === 'other' && item.value) {
              return `
                <p style="margin-bottom: 10px; margin-left: 10px; font-weight:600;"><i>${item.name} (${item.value === 'future' ? 'W przyszłości' : 'Tak'}):</i> ${item.text}</p>
              `;
            }
          }).filter(Boolean).join("")}
          <p style="margin-bottom: 20px;">Wyrażam zgodę na przetwarzanie moich danych osobowych w celu przeprowadzenia analizy potrzeb ubezpieczeniowych.</p>
          <p>Data i podpis klienta </p>
        </div>
      </div>
      `;

    const element = document.createElement("div");
    element.innerHTML = pdfContent;
    document.body.style = "width: 750px";
    document.querySelector(".modal").style.display = "flex";
    document.body.appendChild(element);
    // TU JEST PROBLEM Z WYŚWIETLANIEM NA STRONIE
    //const canvas = await html2canvas(element);
    const isMobile = window.innerWidth <= 600;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10);
    pdf.save(`Formularz APK-${date}.pdf`);

    document.body.removeChild(element);
    document.body.style = "width: 100%";
    document.querySelector(".modal").style.display = "none";
    console.log(categories);
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
                          handleSubcategoryChange(item.id, sub.id, e.target.checked)
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
