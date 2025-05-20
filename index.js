document.addEventListener("DOMContentLoaded",()=>{
    const expenceForm=document.getElementById("expence-form");
    const expenceName=document.getElementById("expence-name")
    const expenceAmount=document.getElementById("expence-amount")
    const expencList=document.getElementById("expence-list")
    const totalAmountDisplay=document.getElementById("total-amount")

    let expences=JSON.parse(localStorage.getItem("expences"))||[]
    let totalAmount=calculateTOtal()
    rederExpences()

    expenceForm.addEventListener("submit",(e)=>{
        e.preventDefault()
        const name=expenceName.value.trim()
        const amount=parseFloat(expenceAmount.value.trim())

        if(name!=""|| !isNaN(amount)||amount>0){
            const newExpence={
                id:Date.now(),
                name:name,
                amount:amount,
            }
            expences.push(newExpence)
            saveExpenceLocal()
            rederExpences()
            updateTotal()
            expenceName.value=""
            expenceAmount.value=""
        }
            
        
    })

    function calculateTOtal(){
        return expences.reduce((sum,expence)=>(sum+expence.amount),0)
    }

    function saveExpenceLocal(){
        localStorage.setItem("expences",JSON.stringify(expences))
        
    }

    function updateTotal(){
        totalAmount=calculateTOtal()
        totalAmountDisplay.textContent=`$ ${totalAmount.toFixed(2)} `
        console.log(totalAmountDisplay);
        
    }
    function rederExpences(){
        expencList.innerHTML=""
        expences.forEach(expence => {
            let li=document.createElement('li')
            li.innerHTML=`
            ${expence.name} - $ ${expence.amount}
            <button data-id=${expence.id}>Delete</button
            `
            expencList.appendChild(li)
        })
        updateTotal()
    }
    expencList.addEventListener("click", (e)=>{
        if(e.target.tagName==="BUTTON"){
            const expeseId=parseInt(e.target.getAttribute("data-id"))
            expences=expences.filter((expence)=>expence.id!==expeseId)
            saveExpenceLocal()
            rederExpences()
            updateTotal()
        }
        
        
    })
})