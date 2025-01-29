let button =document.createElement("button");
button.innerHTML=` <img src="./assets/images/icon-add-to-cart.svg" alt="Purchase icon" >
                  <span>Add to Cart</span>`

let loc=document.getElementById("location");
let fetchedjson;
    fetch("./data.json").then((res)=>{
        return res.json();
        
    }).then((res)=>{
        let counter =0;
        fetchedjson=res;
        for(let i of res)
        {
            counter++;
            let li=document.createElement("li");
            const prod=document.createComment(`Product ${counter}`)
            li.innerHTML=`<article itemscope itemtype="https://schema.org/Product">

              <!--Image and cart-->

              <div class="relative">
                <img class="modif" src="${i.image.desktop}" alt="Waffle dessert" itemprop="image">
                <button id="${counter}">



                  <img src="./assets/images/icon-add-to-cart.svg" alt="Purchase icon" >
                  <span>Add to Cart</span>
                
                
          
                </button>
              </div>
              


                <!--Dessert and price-->

              <div>
                <span itemprop="category">${i.category}</span>
                <h2 itemprop="name">${i.name}</h2>
                <p itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                  <span itemprop="priceCurrency" content="USD">$</span>
                  <span itemprop="price">${i.price}</span>
                </p>
              </div>
      
            </article>`

            loc.appendChild(prod)
            loc.appendChild(li);
        }

        

    }).then(()=>{
        //clicking btns event
        document.querySelectorAll("button").forEach((btn) => {
            btn.addEventListener("click",btnclick)});

            //media querries changing event
            const smallScreen = window.matchMedia('(max-width: 640px)');
            const largeScreen = window.matchMedia('(min-width: 1024px)');
            smallScreen.addEventListener('change', handleMediaQueryChanges);
            largeScreen.addEventListener('change', handleMediaQueryChanges);



            //confirm btn click
            document.getElementById("confirm").addEventListener("click",function(){
                
                
                document.getElementById("inset").classList.replace("hidden","fixed");
                document.body.classList.add("overflow-hidden");

                let adding=document.getElementById("adding");

                
                

                    document.querySelectorAll("#Buying li").forEach((ele)=>{
                    let namer=fetchedjson[parseInt(ele.querySelector("strong").innerText)-1].name;
                    let imager=fetchedjson[parseInt(ele.querySelector("strong").innerText)-1].image.thumbnail;
                    let pricer=fetchedjson[parseInt(ele.querySelector("strong").innerText)-1].price;
                    let timer=ele.querySelector(".times").innerHTML;
                    let fullpricer=ele.querySelector(".fullprice").innerText;

                    console.log(namer,imager,pricer,timer,fullpricer);
                    let li=document.createElement("li");
                    li.className="flex items-center justify-between border-b pb-4";
                    li.innerHTML=`
                            <div class="flex items-center gap-5">
                <img src="${imager}" alt="an image">
                    <div>
                 <h4 itemprop="name" class="w-fit  sm:text-base font-semibold text-xl">${namer}</h4>
        
                    <p itemprop="offers" class="w-fit flex gap-2" itemscope="" itemtype="https://schema.org/Offer">
                <span class="times">${timer}</span>

          
                <span class=" text-grey-500">@ $${pricer}</span>

         
  
                    </p>
                </div>
                    </div>
        
                <span itemprop="price" class="fullprice text-grey-900">${fullpricer}</span>`
                    
                    adding.prepend(li);
                })

                document.getElementById("Sum").innerHTML=`${document.getElementById("total").innerHTML}`




                document.getElementById("newOrder").addEventListener("click",function(){
                    document.getElementById("inset").classList.replace("fixed","hidden");
                    document.body.classList.remove("overflow-hidden");
                    window.location.reload(true);                    
                })
                
            })

    }).catch(()=>{
        console.log("error");
    });






// Function to handle changes for multiple breakpoints
function handleMediaQueryChanges(res) {
    const smallScreen = window.matchMedia('(max-width: 640px)');
    const largeScreen = window.matchMedia('(min-width: 1024px)');
    if (smallScreen.matches) {
      document.querySelectorAll(".modif").forEach((img,i)=>{
        img.src=fetchedjson[i].image.mobile;
      })
    } else if (largeScreen.matches) {
        document.querySelectorAll(".modif").forEach((img,i)=>{
            img.src=fetchedjson[i].image.desktop;
          })
    } else {
        document.querySelectorAll(".modif").forEach((img,i)=>{
            img.src=fetchedjson[i].image.tablet;
          })
    }
  }






   function btnclick() {
        if (this.className === "") {
            // Initial button setup
            this.classList.add("bg-orange-700", "border-0", "justify-between", "py-1");
            this.querySelector("img").classList.add("hidden");
            this.querySelector("span").classList.add("hidden");
            
            // Create counter elements
            let minusIcon = document.createElement("i");
            let counter = document.createElement("p");
            let plusIcon = document.createElement("i");
            
            // Setup counter
            counter.classList.add("text-white");
            counter.innerHTML = "1";
            
            // Setup icons
            minusIcon.className = "bx bx-minus-circle text-xl text-white";
            plusIcon.className = "bx bx-plus-circle text-xl text-white";
            
            // Add elements to button
            this.prepend(minusIcon);
            this.appendChild(counter);
            this.appendChild(plusIcon);
            



            //Add to cart
            let CardCounter=document.getElementById("counter");
            CardCounter.innerHTML=parseInt(CardCounter.innerHTML)+1;
            let Card=document.getElementById("Buying")
            const info=this.parentElement.nextElementSibling;
            const itemprice=info.querySelector("p").lastElementChild.innerHTML;
            const pic=this.previousElementSibling;
            pic.className="border-4 border-orange-700"
            const li= addTocart(Card,info.querySelector("h2").innerHTML,itemprice,CardCounter,counter,this,this);
            
    

            
            // Add event listeners for minus icon
            minusIcon.addEventListener("mouseenter", (evt) => iconHovering(evt, 1));
            minusIcon.addEventListener("mouseleave", (evt) => iconHovering(evt, 0));
            minusIcon.addEventListener("click", (evt) => iconClickingMinus(counter,CardCounter,li,itemprice));
            
            // Add event listeners for plus icon
            plusIcon.addEventListener("mouseenter", (evt) => iconHovering(evt, 1));
            plusIcon.addEventListener("mouseleave", (evt) => iconHovering(evt, 0));
            plusIcon.addEventListener("click", (evt) => iconClickingAdd(counter,CardCounter,li,itemprice
            ));
            






            
        }
    };



function iconHovering(event, state) {
    const targeted = event.target;
    if (state === 1) {
        if (targeted.classList.contains("bx-minus-circle")) {
            targeted.classList.replace("bx-minus-circle", "bxs-minus-circle");
        } else {
            targeted.classList.replace("bx-plus-circle", "bxs-plus-circle");
        }
    } else {
        if (targeted.classList.contains("bxs-minus-circle")) {
            targeted.classList.replace("bxs-minus-circle", "bx-minus-circle");
        } else {
            targeted.classList.replace("bxs-plus-circle", "bx-plus-circle");
        }
    }
}

function iconClickingAdd(p,CardCounter,item,itemprice) {
    const val = Number(p.innerHTML);
    if (val < 99) {
        p.innerHTML = val + 1;
        CardCounter.innerHTML=parseInt(CardCounter.innerHTML)+1;
       
        let times=item.querySelector(".times");
        times.innerHTML=`${parseInt(times.innerHTML)+1}x`
        let fullprice=item.querySelector(".fullprice");
        fullprice.innerText='$'+itemprice*parseInt(times.innerHTML);
        let confirmTotal=document.getElementById("confirm").querySelector("span");
        confirmTotal.innerHTML='$'+( +confirmTotal.innerHTML.slice(1)+ +itemprice);

    }
}

function iconClickingMinus(p,CardCounter,item,itemprice) {
    const val = parseInt(p.innerHTML);
    if (val > 1) {
        p.innerHTML = val - 1;
        CardCounter.innerHTML=parseInt(CardCounter.innerHTML)-1;
        let times=item.querySelector(".times");
        times.innerHTML=`${parseInt(times.innerHTML)-1}x`
        let fullprice=item.querySelector(".fullprice");
        fullprice.innerText='$'+itemprice*parseInt(times.innerHTML);
        let confirmTotal=document.getElementById("confirm").querySelector("span");
        confirmTotal.innerHTML='$'+( +confirmTotal.innerHTML.slice(1)- +itemprice);
    }
}






function addTocart(cart,itemName,itemPrice,CardCounter,btn,number)
{



 cart.nextElementSibling.nextElementSibling.className="hidden";
 cart.nextElementSibling.className="hidden";

 //add the total 
 let confirm=document.getElementById("confirm");
 if(confirm.classList.contains("hidden"))
 confirm.classList.replace("hidden","flex");

 let confirmTotal=confirm.querySelector("span");
 confirmTotal.innerHTML='$'+(+confirmTotal.innerHTML.slice(1)+ +itemPrice)


 let li =document.createElement("li");
 li.innerHTML=`
 <article class="flex items-center justify-between border-b pb-3 border-gray-200" itemscope itemtype="https://schema.org/Product">
            <div>
          <h4 itemprop="name" class="w-fit  sm:text-base font-semibold text-xl">${itemName}</h4>
          
          <p itemprop="offers" class="w-fit flex gap-2" itemscope itemtype="https://schema.org/Offer">
            <span class="times">1x</span>

            
            <span class=" text-grey-500">@ $${itemPrice}</span>

           
            <span itemprop="price" class="fullprice text-grey-900" ><span itemprop="priceCurrency" content="USD">$</span>${itemPrice}</span>
    
          </p>
        </div>
        <i id="cancel" class='bx bx-x-circle  sm:text-xl text-2xl text-gray-400 hover:cursor-pointer hover:text-black '></i>
          
        <strong class="hidden">${number.id}</strong>

        </article>`

    cart.appendChild(li);
    const cancel =li.querySelector("i");
    cancel.addEventListener("click",function(){
        const val=li.querySelector(".times");
        confirmTotal.innerHTML='$'+(+confirmTotal.innerHTML.slice(1) - +li.querySelector(".fullprice").innerText.slice(1));

        //reset the button
        const newbtn=button.cloneNode(true);
        btn.parentNode.parentNode.replaceChild(newbtn,btn.parentNode);
        newbtn.addEventListener("click",btnclick);

        //reset image
        const pic=newbtn.previousElementSibling;
        pic.className="";

        //remove the current card
        li.remove();
        CardCounter.innerHTML=parseInt(CardCounter.innerHTML)-parseInt(val.innerHTML);

        //check if card is empty
        if(!document.querySelector("aside li"))
        {
            cart.nextElementSibling.nextElementSibling.className="";
            cart.nextElementSibling.className="";
            confirm.classList.replace("flex","hidden");
       

            
            
        }
       
    
          
    })



    


    return li;

}