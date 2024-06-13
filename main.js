
let title = document.getElementById("title") 
let price = document.getElementById("price") 
let taxes = document.getElementById("taxes") 
let ads = document.getElementById("ads") 
let discount = document.getElementById("discount") 
let totle = document.getElementById("totle") 
let count = document.getElementById("count") 
let category = document.getElementById("category") 
let submit = document.getElementById("submit") 

let mode ='Create'
let numUpdate;


function getTotle(){
    if( price.value !== ""){
        let reselt =  (+price.value + +taxes.value + +ads.value) - discount.value
        totle.innerHTML = reselt
        totle.style.background = "#040";
    }else{
        totle.innerHTML = ""
        totle.style.background = " #a00d02";
    }
}

// price.oninput = getTotle;
// taxes.oninput = getTotle;
// ads.oninput = getTotle;
// discount.oninput = getTotle;


let dataPro;
if (localStorage.getItem("product") !== null) {
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = []
}


submit.onclick = function(){
    if (title.value !==''&& price.value !== '' && count.value <= 100  ) {
        
        let newPro ={
            title: title.value.toLowerCase(),
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            totle:totle.innerHTML,
            count:count.value,
            category:category.value.toLowerCase()
        }
        if ( mode === 'Create' ) {
            
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro)
                }
            }else{
                dataPro.push(newPro)
            }
        }else{
            dataPro[numUpdate] = newPro
            mode ='Create'
            submit.innerHTML ='Create'
            count.style.display = 'block'
        }
        clear()
        localStorage.setItem('product', JSON.stringify(dataPro))
        console.log(dataPro)
    }else if (title.value === 'Create') {
        console.log("no")
    }
    
    showData()
}


function clear(){
    title.value  = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    totle.innerHTML = ''
    count.value = ''
    category.value = ''
}


function showData(){
    getTotle()
    let table =''
    for (let i = 0; i < dataPro.length; i++) {
        table += `<tr>
        <td>${i + 1 }</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price} </td>
        <td>${dataPro[i].taxes} </td>
        <td>${dataPro[i].ads}</td>  
        <td>${dataPro[i].discount }</td>
        <td>${dataPro[i].totle} </td>
        <td>${dataPro[i].category} </td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick ="deleteProduct(${i})" id="delete">delete</button></td>
        </tr>`
        // console.log(table) 
    }
    
    document.getElementById('tobody').innerHTML = table
    let btnDelete = document.getElementById("deleteAll")
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick ="deleteAll()">delete All(${dataPro.length})</button>
        `
    }else{
        btnDelete.innerHTML =''
    }
}
showData()


function deleteProduct(i){
    dataPro.splice(i,1);
    localStorage.setItem('product', JSON.stringify(dataPro));
        showData()
    }


function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

function updateData(i){
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].price
    ads.value = dataPro[i].taxes
    discount.value = dataPro[i].ads
    totle.innerHTML = dataPro[i].discount
    getTotle()
    count.style.display='none'
    category.value = dataPro[i].category
    submit.innerHTML = 'Update'
    mode = 'Update'
    numUpdate = i
    scroll({
        top:0,
        behavior:'smooth'
    })
}



let searchMood = 'title'

function getSearchMood(id){
    let search = document.getElementById('search')
    if ( id =='searhTitle') {
        searchMood = 'Title'
    }else{
        searchMood = 'Category'
    }
    search.placeholder ='searh By '+ searchMood
    search.focus()
    search.value =''
    showData()
}
function searchData(value){
    let table = ''
    if (searchMood =='title') {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `<tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price} </td>
                <td>${dataPro[i].taxes} </td>
                <td>${dataPro[i].ads}</td>  
                <td>${dataPro[i].discount }</td>
                <td>${dataPro[i].totle} </td>
                <td>${dataPro[i].category} </td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick ="deleteProduct(${i})" id="delete">delete</button></td>
                </tr>`
            }
        }
    }else{
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `<tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price} </td>
                <td>${dataPro[i].taxes} </td>
                <td>${dataPro[i].ads}</td>  
                <td>${dataPro[i].discount }</td>
                <td>${dataPro[i].totle} </td>
                <td>${dataPro[i].category} </td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick ="deleteProduct(${i})" id="delete">delete</button></td>
                </tr>`
            }
        }
    }
    document.getElementById('tobody').innerHTML = table;
}






















