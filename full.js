
document.querySelectorAll("button").forEach((btn) => {
    btn.onclick=function(){
        if(this.className=="")
        {
        this.classList.add("bg-orange-700","border-0","justify-between","py-1");
        this.querySelector("img").classList.add("opacity-0");
        this.querySelector("span").classList.add("opacity-0");
        

        let newi=document.createElement("i");
        newi.className="bx bx-minus-circle text-xl text-white hover:text-orange-700 hover:bg-white ";
        let secondi=newi.cloneNode();
        secondi.classList.replace("bx-minus-circle","bx-plus-circle");
        this.prepend(newi);
        this.appendChild(secondi);


        }
        
    }
});

