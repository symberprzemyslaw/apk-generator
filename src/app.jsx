import { useState } from "preact/hooks";
import "./app.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export function App() {
  const date = new Date().toLocaleDateString();
  // flow
  // Uzupełnianie danych klienta
  // Wybór kategorii
  // Select
  // Wybranie szczegółowego ubezpieczenia
  // Checkbox
  // Generowanie pdf

  // Jak zrobić, żeby po zaznaczeniu opcji "Tak" oraz "W przyszłości "wyświetlały się dodatkowe opcje do zaznaczenia?

  //Big categories as objects

  const [categories, setCategories] = useState([
    {
      id: 'bussiness',
      name: "Firma",
      value: true,
      subcategories: [
        { id: 'oc', name: "OC", value: false },
        { id: 'ac', name: "AC", value: false },
        { id: 'nnw', name: "NNW", value: false },
        { id: 'assistance', name: "Assistance", value: false },
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
        ],
    }
  ]);

  const handleCategories = (event) => {
    setBigCategories({ ...categories, [event.target.id]: event.target.value });
    };


  const [nameData, setNameData] = useState([
    { name: "Imię", value: "John" },
    { name: "Nazwisko", value: "Doe" },
    { name: "Email", value: "example@example.com" },
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




  async function generatePDF() {
    const pdfContent = `
        <div style="width: 700px">
            <div style="display: flex; justify-content: space-between; width: 100%;">
                <img src="./logo_unio.png" style="width: 100px; height: 100%;">
                <h1 style="font-size: 20px; color: ##0d2143; text-align: center;">Analiza Potrzeb Klienta</h1>
            </div>
            <div style="font-size: 16px; color: #333;">
                <p >Ankieta przygotowana w oparciu o rozmowę z klientem w dniu: ${date}</p>
                <p style="font-size: 10px; margin-bottom: 20px;">Numer Agenta: 123456789</p>
                <p style="margin-bottom: 10px;"><strong>Imię:</strong> ${
                  nameData[0].value
                }</p>
                <p style="margin-bottom: 10px;"><strong>Nazwisko:</strong> ${
                  nameData[1].value
                }</p>
                <p style="margin-bottom: 10px;"><strong>Email:</strong> ${
                  nameData[2].value
                }</p>
                <p style="font-size: 10px; margin-bottom: 10px;">Oświadczam, że zostałam/em poinformowana/y, że wypełnienie niniejszej Ankiety jest dobrowolne, oraz że w przypadku odmowy jej wypełnienia. Agent ma ograniczoną możliwość dokonania oceny, czy zawierana przeze mnie umowa ubezpieczenia jest dla mnie odpowiednia.</p>
                <p style="margin-bottom: 10px;"><strong>Ubezpieczenie:</strong> ${Object.keys(
                  categories
                ).map((item) => {
                  if (categories[item] === true) {
                    return item;
                  } else {
                    return "";
                  }
                })}
                </p>
                <p style="margin-bottom: 10px;"><strong>Ubezpieczenie szczegółowe:</strong> ${carArray.map(
                  (item) => {
                    if (item[2] === true) {
                      return item[1];
                    } else {
                      return "";
                    }
                  }
                )}</p>
                  <p style="margin-bottom: 20px;">Wyrażam zgodę na przetwarzanie moich danych osobowych w celu przeprowadzenia analizy potrzeb ubezpieczeniowych.</p>
                  <p>Data i podpis klienta</p>
            </div>
        </div>
        `;

    const element = document.createElement("div");
    element.innerHTML = pdfContent;
    document.body.appendChild(element);

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10);
    pdf.save(`Formularz APK-${date}.pdf`);

    document.body.removeChild(element);
  }

  return (
    <div class="wrapper">
      <h1>Formularz APK</h1>

        
      <form id="pdf-form">
        <div>
          <label for="perm">
            Czy wyrażam zgodę na przeprowadzenie analizy:
          </label>
          <input type="checkbox" id="perm" name="perm" value="perm" />
        </div>
        {nameData.map((item) => {
          return (
            <div>
              <label htmlFor={item.name}>{item.name}</label>
              <input
                type="text"
                id={item.name}
                name={item.name}
                onInput={handleNameChange}
              />
            </div>
          );
        })}
        <div>

        </div>
        <fieldset class="insurance-form">
          <legend>Rodzaj ubezpieczenia:</legend>
          {categories.map(item =>
        <div>
            <div>
                <label htmlFor={item.id}>{item.name}</label>
                <select  id={item.id}>
                    <option value={false}>Nie</option>
                    <option value={true}>Tak</option>
                </select>
                
            </div>

        </div>
        )}
        <div>
            <div>
                <label for="future">Czy planujesz w przyszłości:</label>
                <select id="future">
                    <option value={false}>Nie</option>
                    <option value={true}>Tak</option>
                </select>
            </div>

        </div>
        </fieldset>
        <button type="button" onClick={generatePDF}>
          Generuj PDF
        </button>
      </form>
    </div>
  );
}

export default App;

/* 
            {item.value &&
            <div className="enrolled">
                 {item.subcategories.map( x => 
                    <div>
                    <label for>{x.name}</label>
                    <input type="checkbox" id={x.id} name={x.name} value={x.value} />
                    </div>
                    )}
            </div>
            }

*/