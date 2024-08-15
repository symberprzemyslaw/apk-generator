import { useState } from 'preact/hooks'
import './app.css'
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


export function App() {

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
    };

  return (
    <div class="wrapper">
        <h1>Formularz APK</h1>
        <form id="pdf-form">
            <div>
                <label for="perm">Czy wyrażam zgodę na przeprowadzenie analizy:</label>
                <input type="checkbox" id="perm" name="perm" value="perm" />
            </div>
            <div>
                <label for="name">Imię:</label>
                <input type="text" id="name" name="name" />
            </div>
            <div>
                <label for="name">Nazwisko:</label>
                <input type="text" id="lastName" name="lastName" />
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" />
            </div>
                <fieldset class="insurance-form">
                <legend>Rodzaj ubezpieczenia:</legend>
                <div>
                    <label for="bussiness">Firma</label>
                    <input type="checkbox" id="bussiness" name="bussiness" value="bussiness">Tak</input>
                </div>
                <div>
                    <label for="farm">Rolne</label>
                    <input type="checkbox" id="farm" name="farm" value="farm" />
                </div>
                <div>
                    <label for="car">Komunikacja</label>
                    <input type="checkbox" id="car" name="car" value="car" 
                    checked={isChecked} 
                    onChange={handleCheckboxChange}/>
                </div>
                { isChecked && <div className='carEnrolled'> <input type='checkbox' id='yes'>Tak</input></div>}
                <div>
                    <label for="wealth">Majątek</label>
                    <input type="checkbox" id="wealth" name="wealth" value="wealth" />
                </div>
                <div>
                    <label for="travel">Podróż</label>
                    <input type="checkbox" id="travel" name="travel" value="travel" />
                </div>
                <div>
                    <label for="med">Życie i zdrowie</label>
                    <input type="checkbox" id="med" name="med" value="med" />
                </div>
                <div>
                    <label for="nnw">Osobowe/NNW</label>
                    <input type="checkbox" id="nnw" name="nnw" value="nnw" />
                </div>
                <div>
                    <label for="corp">Korporacja</label>
                    <input type="checkbox" id="corp" name="corp" value="corp" />
                </div>
                <div>
                    <label for="other">Inne</label>
                    <input type="checkbox" id="other" name="other" value="other" />
                </div>
            </fieldset>
            <button type="button" onClick={generatePDF}>Generuj PDF</button>
        </form>
    </div>
  )
}

async function generatePDF() {

  const name = document.getElementById('name').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;

//Array
  //const OC = document.getElementById('OC')
  //const AC = document.getElementById('AC')
  const bussiness = document.getElementById('bussiness')
  const farm = document.getElementById('farm')
  const wealth = document.getElementById('wealth')
  const travel = document.getElementById('travel')
  const nnw = document.getElementById('nnw')
  const corp = document.getElementById('corp')
  const med = document.getElementById('med')
  const other = document.getElementById('other')
  const car = document.getElementById('car')

  

  


  const insuranceArr = [bussiness, farm, wealth, travel, nnw, corp, med, other, car]

  const date = new Date().toLocaleDateString();

  if(bussiness.checked){
      bussiness.style.backgroundColor = "red"
  }

  const pdfContent = `
  <div style="width: 1000px">
      <div style="display: flex; justify-content: space-between; width: 100%;">
          <img src="./logo_unio.png" style="width: 100px; height: 100%;">
          <h1 style="font-size: 20px; color: #3f51b5; text-align: center;">Analiza Potrzeb Klienta</h1>
      </div>
      <div style="font-size: 16px; color: #333;">
          <p >Ankieta przygotowana w oparciu o rozmowę z klientem w dniu: ${date}</p>
          <h2 style="font-size: 24px; color: #3f51b5; text-align: center;">Wypełniony Formularz APK</h2>
          <p style="font-size: 10px;">Numer Agenta: 123456789</p>
          <p style="margin-bottom: 10px;"><strong>Imię:</strong> ${name}</p>
          <p style="margin-bottom: 10px;"><strong>Nazwisko:</strong> ${lastName}</p>
          <p style="margin-bottom: 10px;"><strong>Email:</strong> ${email}</p>
          <p style="margin-bottom: 10px;"><strong>Ubezpieczenie:</strong> ${
              [...insuranceArr]
                  .map((item) => item.checked ? item.previousElementSibling.innerHTML : '')
                  .filter((item) => item)
                  .join(', ')
              }</p>
      </div>
  </div>
  `;

  const element = document.createElement('div');
  element.innerHTML = pdfContent;
  document.body.appendChild(element);

  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF();
  pdf.addImage(imgData, 'PNG', 10, 10);
  pdf.save(`Formularz APK-${date}.pdf`);

  document.body.removeChild(element);
}

export default App;
