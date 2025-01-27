document.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", function() {
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
            const info=btn.parentElement.nextElementSibling;
            const itemprice=info.querySelector("p").lastElementChild.innerHTML;
            const li= addTocart(Card,info.querySelector("h2").innerHTML,itemprice,CardCounter,counter);
            
    

            
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
    });
});

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
    }
}






function addTocart(cart,itemName,itemPrice,CardCounter)
{
 cart.nextElementSibling.nextElementSibling.className="hidden";
 cart.nextElementSibling.className="hidden";
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
          

        </article>`

    cart.appendChild(li);
    const cancel =li.querySelector("i");
    cancel.addEventListener("click",function(){
        const val=li.querySelector(".times");
        li.remove();
        CardCounter.innerHTML=parseInt(CardCounter.innerHTML)-parseInt(val.innerHTML);
    
          
    })

    return li;

}