import { useState } from "preact/hooks";
import "./app.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export function App() {
  const date = new Date().toLocaleDateString();

  // Big categories as objects
  const [bigCategories, setBigCategories] = useState([
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
      value: true,
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

  const handleBigCategories = (event) => {
    const { id, value } = event.target;
    const updatedCategories = bigCategories.map(category => {
      if (category.id === id) {
        return { ...category, value: value === 'true' };
      }
      return category;
    });
    setBigCategories(updatedCategories);
  };

  const handleSubcategories = (categoryId, subcategoryId) => {
    const updatedCategories = bigCategories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          subcategories: category.subcategories.map(subcategory => {
            if (subcategory.id === subcategoryId) {
              return { ...subcategory, value: !subcategory.value };
            }
            return subcategory;
          })
        };
      }
      return category;
    });
    setBigCategories(updatedCategories);
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
                <p style="margin-bottom: 10px;"><strong>Ubezpieczenie:</strong> ${bigCategories.map(category => {
                  if (category.value) {
                    return `${category.name}`;
                  } else {
                    return "";
                  }
                })}
                </p>
                <p style="margin-bottom: 10px;"><strong>Ubezpieczenie szczegółowe:</strong> ${bigCategories.map(category => {
                  if (category.value) {
                    return category.subcategories.map(subcategory => {
                      if (subcategory.value) {
                        return `${subcategory.name}`;
                      } else {
                        return "";
                      }
                    }).join(", ");
                  } else {
                    return "";
                  }
                }).join(", ")}
                </p>
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
        {bigCategories.map(category =>
        <div key={category.id}>
            <label htmlFor={category.id}>{category.name}</label>
            <select id={category.id} value={category.value} onChange={handleBigCategories}>
                <option value={false}>Nie</option>
                <option value={true}>Tak</option>
            </select>
            {category.value && (
              <div className="enrolled">
                {category.subcategories.map(subcategory => (
                  <div className="enrolled" key={subcategory.id}>
                    <label htmlFor={subcategory.id}>{subcategory.name}</label>
                    <input
                      type="checkbox"
                      id={subcategory.id}
                      checked={subcategory.value}
                      onChange={() => handleSubcategories(category.id, subcategory.id)}
                    />
                  </div>
                ))}
              </div>
            )}
        </div>
        )}
        
      <form id="pdf-form">
        <div>
          <label for="perm">
            Czy wyrażam zgodę na przeprowadzenie analizy:
          </label>
          <input type="checkbox" id="perm" name="perm" value="perm" />
        </div>
        {nameData.map((item) => {
          return (
            <div key={item.name}>
              <label htmlFor={item.name}>{item.name}</label>
              <input
                type="text"
                id={item.name}
                name={item.name}
                value={item.value}
                onChange={handleNameChange}
              />
            </div>
          );
        })}
        
        <fieldset class="insurance-form">
          <legend>Rodzaj ubezpieczenia:</legend>
          <div>
            <label for="bussiness">Firma</label>
            <select id="bussiness" onChange={handleCategories}>
              <option value={false}>Nie</option>
              <option value={true}>Tak</option>
            </select>
          </div>
          <div>
            <label for="farm">Rolne</label>
            <select id="farm" onChange={handleFarmDecision}>
              <option value={false}>Nie</option>
              <option value={true}>Tak</option>
            </select>
          </div>
          {farmDecision && (
            <div className="enrolled">
              {farmArray.map((item) => {
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
            <select id="car" onChange={handleCarDecision}>
              <option value={false}>Nie</option>
              <option value={true}>Tak</option>
            </select>
          </div>
          {carDecision && (
            <div className="enrolled">
              {carArray.map((item) => {
                return (
                  <div className="enrolled" key={item[0]}>
                    <label htmlFor={item[0]}>{item[1]}</label>
                    <input
                      type="checkbox"
                      id={item[0]}
                      checked={item[2]}
                      onChange={handleCarArray}
                    />
                  </div>
                );
              })}
            </div>
          )}

          <div>
            <label for="wealth">Majątek</label>
            <select id="wealth" onChange={console.log("x")}>
              <option value={false}>Nie</option>
              <option value={true}>Tak</option>
            </select>
          </div>
          <div>
            <label for="travel">Podróż</label>
            <select id="travel" onChange={console.log("y")}>
              <option value={false}>Nie</option>
              <option value={true}>Tak</option>
            </select>
          </div>
          <div>
            <label for="med">Życie i zdrowie</label>
            <select id="med" onChange={console.log("x")}>
              <option value={false}>Nie</option>
              <option value={true}>Tak</option>
            </select>
          </div>
          <div>
            <label for="nnw">Osobowe/NNW</label>
            <select id="nnw" onChange={console.log("x")}>
              <option value={false}>Nie</option>
              <option value={true}>Tak</option>
            </select>
          </div>
          <div>
            <label for="corp">Korporacja</label>
            <select id="corp" onChange={console.log("x")}>
              <option value={false}>Nie</option>
              <option value={true}>Tak</option>
            </select>
          </div>
          <div>
            <label for="other">Inne</label>
            <select id="other" onChange={console.log("x")}>
              <option value={false}>Nie</option>
              <option value={true}>Tak</option>
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
