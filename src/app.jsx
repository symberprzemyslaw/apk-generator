import { useState } from "preact/hooks";
import "./app.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export function App() {
    const date = new Date().toLocaleDateString();
  const initialCategories = {
    bussiness: false,
    farm: false,
    wealth: false,
    travel: false,
    corp: false,
    med: false,
    other: false,
  };
  // flow
  // Uzupełnianie danych klienta
  // Wybór kategorii
  // Select
  // Wybranie szczegółowego ubezpieczenia
  // Checkbox
  // Generowanie pdf

  // Jak zrobić, żeby po zaznaczeniu opcji "Tak" oraz "W przyszłości "wyświetlały się dodatkowe opcje do zaznaczenia?

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


  const [carDecision, setCarDecision] = useState(false);
  const handleCarDecision = () => {
        setCarDecision(!carDecision);
    }
  const carExampleArray = [
    ["oc", "OC", false],
    ["ac", "AC", false],
    ["szyby", "Szyby", false],
    ["gap", "GAP", false],
    ["nnw", "NNW", false],
    ["assistance", "Assistance", false],
    ["opony", "Opony", false],
  ];

  const [farmDecision, setFarmDecision] = useState(false);
  const handleFarmDecision = () => {
        setFarmDecision(!carDecision);
    }

  const farmExampleArray = [
    ["ocrolnika", "OC Rolnika", false],
    ["mienie", "Mienie", false],
    ["maszyny", "Maszyny", false],
    ["budynki", "Budynki", false],
    ["uprawy", "Uprawy", false],
    ["zwierzeta", "Zwierzęta", false],
  ];

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
                <p style="margin-bottom: 10px;"><strong>Imię:</strong> ${nameData[0].value}</p>
                <p style="margin-bottom: 10px;"><strong>Nazwisko:</strong> ${nameData[1].value}</p>
                <p style="margin-bottom: 10px;"><strong>Email:</strong> ${nameData[2].value}</p>
                <p style="font-size: 10px; margin-bottom: 10px;">Oświadczam, że zostałam/em poinformowana/y, że wypełnienie niniejszej Ankiety jest dobrowolne, oraz że w przypadku odmowy jej wypełnienia. Agent ma ograniczoną możliwość dokonania oceny, czy zawierana przeze mnie umowa ubezpieczenia jest dla mnie odpowiednia.</p>
                <p style="margin-bottom: 10px;"><strong>Ubezpieczenie:</strong> ${[]}</p>
                <p style="margin-bottom: 10px;"><strong>Ubezpieczenie szczegółowe:</strong> ${[]}</p>
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
          <div>
            <label for="bussiness">Firma</label>
            <select onInput={console.log('x')}>
              <option value={false}>Nie</option>
              <option value={true}>Tak</option>
            </select>
          </div>
          <div>
            <label for="farm">Rolne</label>
            <select onInput={handleFarmDecision}>
              <option value={false}>Nie</option>
              <option value={true}>Tak</option>
            </select>
          </div>
          {farmDecision === true && (
            <div className="enrolled">
              {farmExampleArray.map((item) => {
                return (
                  <div className="enrolled" key={item[0]}>
                    <label htmlFor={item[0]}>{item[1]}</label>
                    <input type="checkbox" id={item[0]} />
                  </div>
                );
              })}
            </div>
          )}


          <div>
            <label for="car">Komunikacja</label>
            <select onInput={handleCarDecision}>
              <option value={false}>Nie</option>
              <option value={true}>Tak</option>
            </select>
          </div>
          {carDecision === true && (
            <div className="enrolled">
              {carExampleArray.map((item) => {
                return (
                  <div className="enrolled" key={item[0]}>
                    <label htmlFor={item[0]}>{item[1]}</label>
                    <input type="checkbox" id={item[0]} />
                  </div>
                );
              })}
            </div>
          )}

          <div>
            <label for="wealth">Majątek</label>
            <select onChange={console.log('x')}>
              <option value="none">Nie</option>
              <option value="wealth ">Tak</option>
            </select>
          </div>
          <div>
            <label for="travel">Podróż</label>
            <select onChange={console.log('y')}>
              <option value="none">Nie</option>
              <option value="travel">Tak</option>
            </select>
          </div>
          <div>
            <label for="med">Życie i zdrowie</label>
            <select onInput={console.log('x')}>
              <option value="none">Nie</option>
              <option value="life">Tak</option>
            </select>
          </div>
          <div>
            <label for="nnw">Osobowe/NNW</label>
            <select onInput={console.log('x')}>
              <option value="none">Nie</option>
              <option value="nnw">Tak</option>
            </select>
          </div>
          <div>
            <label for="corp">Korporacja</label>
            <select onInput={console.log('x')}>
              <option value="none">Nie</option>
              <option value="corp">Tak</option>
            </select>
          </div>
          <div>
            <label for="other">Inne</label>
            <select onInput={console.log('x')}>
              <option value="none">Nie</option>
              <option value="other">Tak</option>
            </select>
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
