const preview=document.getElementById("preview");
const hasil=document.getElementById("hasil");
const status=document.getElementById("status");

document.addEventListener("paste",pasteImage);

async function pasteImage(e){

const items=e.clipboardData.items;

for(const item of items){

if(item.type.indexOf("image")!==-1){

const file=item.getAsFile();

preview.src=URL.createObjectURL(file);

preview.style.display="block";

status.innerHTML="Membaca gambar...";

scan(file);

}

}

}

async function scan(file){

const result=await Tesseract.recognize(

file,

"eng"

);

status.innerHTML="Memformat...";

format(result.data.text);

}

function format(text){

    // Bersihkan hasil OCR
    text = text
        .replace(/\r/g, "")
        .replace(/%/g, "*")
        .replace(/@®/g, "")
        .replace(/8\s*ANGKA MAIN/i, "ANGKA MAIN");

    // Judul
    let m = text.match(/PREDIKSI\s+(.+?)\s+TOGEL HARI INI BOBATOTO\s+(\d{2})\s+JUL\s+(\d{4})/i);

    let pasaran = m ? m[1] : "";
    let tanggal = m ? `${m[2]} JULI ${m[3]}` : "";

    // Ambil data
    let angka  = text.match(/\(\s*(\d+)\s*\)/)?.[1] || "";
    let top4   = text.match(/TOP 4D.*?\n([0-9*]+)/i)?.[1] || "";
    let top3   = text.match(/TOP 3D.*?\n([0-9*%]+)/i)?.[1].replace(/%/g,"*") || "";
    let top2   = text.match(/TOP 2D.*?\n([0-9*%]+)/i)?.[1].replace(/%/g,"*") || "";
    let bebas  = text.match(/COLOK BEBAS[\s\S]*?([0-9]+\s*\/\s*[0-9]+)/i)?.[1] || "";
    let colok2 = text.match(/COLOK 2D[\s\S]*?([0-9]+\s*\/\s*[0-9]+)/i)?.[1] || "";
    let shio   = text.match(/SHIO JITU[\s\S]*?([A-Za-z]+)/i)?.[1] || "";

    hasil.value =
`★Prediksi Togel ${pasaran} ${tanggal} ★

ANGKA MAIN:
( ${angka} )

TOP 4D (BB) :
${top4}

TOP 3D (BB) :
${top3}

TOP 2D (BB) :
${top2}

COLOK BEBAS :
${bebas.replace("/", " / ")}

COLOK 2D :
${colok2.replace("/", " / ")}

SHIO JITU :
${shio}

★`;

    status.innerHTML = "Selesai";

}

document.getElementById("copyBtn").onclick=()=>{

navigator.clipboard.writeText(hasil.value);

alert("Berhasil Dicopy");

};

document.addEventListener("paste", (e) => {

    console.log(e.clipboardData.items);

    for (const item of e.clipboardData.items) {
        console.log(item.type);
    }

});
