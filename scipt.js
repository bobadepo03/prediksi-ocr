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

hasil.value=text;

status.innerHTML="Selesai";

}

document.getElementById("copyBtn").onclick=()=>{

navigator.clipboard.writeText(hasil.value);

alert("Berhasil Dicopy");

};