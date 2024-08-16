import { useState } from 'preact/hooks'
import './app.css'
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


export function App() {

    const initialCategories = {
        bussiness: false,
        farm: false,
        wealth: false,
        travel: false,
        corp: false,
        med: false,
        other: false,
    }


    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
    };



    async function generatePDF() {

        const name = document.getElementById('name').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        
        // General Insurance
        const bussiness = document.getElementById('bussiness')
        const farm = document.getElementById('farm')
        const wealth = document.getElementById('wealth')
        const travel = document.getElementById('travel')
        const corp = document.getElementById('corp')
        const med = document.getElementById('med')
        const other = document.getElementById('other')
        const car = document.getElementById('car')
        const carLater = document.getElementById('carLater')
        //Bussiness Insurance
      
        // Car Insurance
        const oc = document.getElementById('oc')
        const ac = document.getElementById('ac')
        const szyby = document.getElementById('szyby')
        const gap = document.getElementById('gap')
        const nnw = document.getElementById('nnw')
        const assistance = document.getElementById('assistance')
        const opony = document.getElementById('opony')
      
      
        
      
        
      
      
        const insuranceArr = [bussiness, farm, wealth, travel, nnw, corp, med, other, car]
        const insuranceCarArr = [oc, ac, szyby, gap, nnw, assistance, opony]
        const insuranceLaterArr = [carLater]
      
        const date = new Date().toLocaleDateString();
      
        const pdfContent = `
        <div style="width: 700px">
            <div style="display: flex; justify-content: space-between; width: 100%;">
                <img src="./logo_unio.png" style="width: 100px; height: 100%;">
                <h1 style="font-size: 20px; color: #3f51b5; text-align: center;">Analiza Potrzeb Klienta</h1>
            </div>
            <div style="font-size: 16px; color: #333;">
                <p >Ankieta przygotowana w oparciu o rozmowę z klientem w dniu: ${date}</p>
                <p style="font-size: 10px; margin-bottom: 20px;">Numer Agenta: 123456789</p>
                <p style="margin-bottom: 10px;"><strong>Imię:</strong> ${name}</p>
                <p style="margin-bottom: 10px;"><strong>Nazwisko:</strong> ${lastName}</p>
                <p style="margin-bottom: 10px;"><strong>Email:</strong> ${email}</p>
                <p style="font-size: 10px; margin-bottom: 10px;">Oświadczam, że zostałam/em poinformowana/y, że wypełnienie niniejszej Ankiety jest dobrowolne, oraz że w przypadku odmowy jej wypełnienia. Agent ma ograniczoną możliwość dokonania oceny, czy zawierana przeze mnie umowa ubezpieczenia jest dla mnie odpowiednia.</p>
                <p style="margin-bottom: 10px;"><strong>Ubezpieczenie:</strong> ${
                    [...insuranceArr]
                        .map((item) => item.checked ? item.previousElementSibling.innerHTML : '')
                        .filter((item) => item)
                        .join(', ')
                    }</p>
                <p style="margin-bottom: 10px;"><strong>Ubezpieczenie szczegółowe:</strong> ${
                    [...insuranceCarArr]
                        .map((item) => item.checked ? item.previousElementSibling.innerHTML : '')
                        .filter((item) => item)
                        .join(', ')
                    }</p>
                  <p style="margin-bottom: 20px;">Wyrażam zgodę na przetwarzanie moich danych osobowych w celu przeprowadzenia analizy potrzeb ubezpieczeniowych.</p>
                  <p>Data i podpis klienta</p>
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
                    <input type="checkbox" id="car" name="car" value="car"/>
                    <input type="checkbox" id="car" name="car" value="carLater" 
                    checked={isChecked} 
                    onChange={handleCheckboxChange}/>
                </div>
                { isChecked && 
                    <div className='enrolled'> 
                        <label htmlFor="oc">OC</label>
                        <input type='checkbox' id='oc'/>
                        <label htmlFor="ac">AC</label>
                        <input type='checkbox' id='ac'/>
                        <label htmlFor="szyby">Szyby</label>
                        <input type='checkbox' id='szyby'/>
                        <label htmlFor="gap">GAP</label>
                        <input type='checkbox' id='gap'/>
                        <label htmlFor="nnw">NNW</label>
                        <input type='checkbox' id='nnw'/>
                        <label htmlFor="assistance">Assistance</label>
                        <input type='checkbox' id='assistance'/>
                        <label htmlFor="opony">Opony</label>
                        <input type='checkbox' id='opony'/>
                    </div>}
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



export default App;
