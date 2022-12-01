// preloder
var loader = document.getElementById("preloader");
    window.addEventListener("load",function(){
    loader.style.display = "none";
});

// scrollreveal
ScrollReveal().reveal('.intervals1', { delay: 200, interval: 300 });
ScrollReveal().reveal('.intervals2', { easing: 'ease-in', delay: 500, interval: 300 });
ScrollReveal().reveal('.intervals3', { easing: 'ease-in', delay: 500, interval: 100 });
ScrollReveal().reveal('.intervals4', { easing: 'ease-in', delay: 500, interval: 200 });
ScrollReveal().reveal('.intervals5', { easing: 'ease-in', delay: 1000, interval: 200 });
ScrollReveal().reveal('.intervals6', { easing: 'ease-in', delay: 500, interval: 200 });
ScrollReveal().reveal('.intervals7', { easing: 'ease-in', delay: 500, interval: 200 });

//selecting all required elements
const filterItem = document.querySelector(".wrapper2");
const filterImg = document.querySelectorAll(".gallery .image");

// typing effect
  var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
  };
  TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
    var that = this;
    var delta = 200 - Math.random() * 100;
    if (this.isDeleting) { delta /= 2; }
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
    setTimeout(function () {
      that.tick();
    }, delta);
  };
window.onload = function () {
  filterItem.onclick = (selectedItem)=>{ 
    document.querySelector(".gallery").style.display = "flex";
    if(selectedItem.target.classList.contains("item")){ 
    filterItem.querySelector(".active").classList.remove("active"); 
    selectedItem.target.classList.add("active"); 
    let filterName = selectedItem.target.getAttribute("data-name");
    filterImg.forEach((image) => {
      let filterImges = image.getAttribute("data-name"); 
      if((filterImges == filterName) || (filterName == "all")){
        image.classList.remove("hide"); 
        image.classList.add("show"); 
        }else{
        image.classList.add("hide"); 
        image.classList.remove("show"); 
        }
    });
  }
}
for (let i = 0; i < filterImg.length-4; i++) {
  filterImg[i].setAttribute("onclick", "preview(this)"); 
}
// Typing effect
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

//fullscreen image preview function
const previewBox = document.querySelector(".preview-box"),
categoryName = previewBox.querySelector(".title p"),
previewImg = previewBox.querySelector("img"),
closeIcon = previewBox.querySelector(".icon"),
shadow = document.querySelector(".shadow");
function preview(element){
          
document.querySelector("body").style.overflow = "hidden";

let selectedPrevImg = element.querySelector("img").src; 
let selectedImgCategory = element.getAttribute("data-name"); 
previewImg.src = selectedPrevImg; 
categoryName.textContent = selectedImgCategory;
 
document.querySelector(".modal").style.display= "none";
document.querySelector(".modal-backdrop").style.display= "none";

  previewBox.classList.add("show"); 
  shadow.classList.add("show");

      closeIcon.onclick = ()=>{ 
          previewBox.classList.remove("show");
          shadow.classList.remove("show");
          // document.querySelector("body").style.overflow = "auto";
          document.querySelector(".modal ").style.display= "block";
          document.querySelector(".modal-backdrop").style.display= "block";
      }
  }
   // close modal
   function closee() {
    modal = document.querySelector(".modal");
    modalbackdrop = document.querySelector(".modal-backdrop");
    modalbackdrop2 = document.querySelector(".modal-backdrop.fade.in");
    modal.classList.remove("show");    
    modal.style.display = "none"; 
    modalbackdrop.classList.remove("show");   
    modalbackdrop.style.display = "none";
       
    modalbackdrop2.style.display = "none";
    document.querySelector("body").style.paddingRight= "0px";
    document.querySelector("body").style.overflowY = "scroll";   
}

// swiper
var swiper = new Swiper(".mySwiper", {
  cssMode: true,
  slidesPerView: "auto",
  spaceBetween: 30,
  centeredSlides: true,
  freeMode: true,
  grabcursor: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// swiper
var swiper = new Swiper(".mySwiper2", {
  cssMode: true,
  slidesPerView: "auto",
  spaceBetween: 30,
  freeMode: true,
  grabcursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// contactmodal
function modalclosing() {
  x = document.getElementById("wrapmodal");
  if (x.style.display == "block") {
    x.style.display = "none";
    document.querySelector("body").style.overflow="auto";  
    x.style.position = "relative"; 
  } else {
      x.style.display = "block";
      x.style.overflow = "scroll";
      document.querySelector("body").style.overflow="hidden";  
      x.style.position = "fixed"; 
  }
}

// contact form
var form = document.getElementById("form");
async function handleSubmit(event) {
  event.preventDefault();
  var successPage = document.getElementById("successPage");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      successPage.style.display = "flex";
      form.reset()
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          alert(data["errors"].map(error => error["message"]).join(", "));
        } else {
          alert("Oops! There was a problem submitting your form");
        }
      })
    }
  }).catch(error => {
    alert("Oops! There was a problem submitting your form");
  });
}
form.addEventListener("submit", handleSubmit)
function closeSuccessPage(){
  document.getElementById("successPage").style.display="none";
  modalclosing();
}

// See Details  
let products = [
  {
    id: 1,
    d_title: "Web Development",
    
    d_details: "Types of Websites :",
    d_desc1: "Educational or Business Websites",
    d_desc2: "Portfolio Websites",
    d_desc3: "1 Page Advertisemnet Websites ( For Events Registrations, Shop Advertising  )",
    d_desc4: "Website to display your Art and reviews",
    
    d_perks: "Perks",
    d_perks1: "Fully customizable",
    d_perks2: "Pocket friendly pricing",
    d_perks3: "Responsive Website (Both Mobile and Laptops)",
  },
  {
    id: 2,
    d_title: "LOGO DESIGNING",
    
    d_details: "Logo Description :",
    d_desc1: ".svg File",
    d_desc2: ".png and .jpg also available",
    d_desc3: "Background transparent",
    d_desc4: "High Qaulity Designs",

    d_perks: "Perks",
    d_perks1: "Fully customizable",
    d_perks2: "Brand Colors used",
    d_perks3: "Updates available",
  },
  {
    id: 3,
    d_title: "DIGITAL MARKETING",
    
    d_details: "Types of Designs :",
    d_desc1: "Designs for all Social Media Platforms",
    d_desc2: "Posts, Brochures, Banners, Flyers,etc",
    d_desc3: "Upcoming Events Announcement Designs",
    d_desc4: "Sales Announcement Designs",

    d_perks: "Perks",
    d_perks1: "Social Media posts designs",
    d_perks2: "Budget Friendly",
    d_perks3: "Contact for more details",
  },
  {
    id: 4,
    d_title: "ALL CARDS, INVITATIONS & CERTIFICATES",
    
    d_details: "Type of Designs :",
    d_desc1: "Business Cards",
    d_desc2: "Party and Wedding Invitations",
    d_desc3: "Certificate Designs",
    d_desc4: "Thanks Giving Cards and more",

    d_perks: "Perks",
    d_perks1: "Updates Available",
    d_perks2: "Low Pricing",
    d_perks3: "Contact for more details",
  },
  {
    id: 5,
    d_title: "BRAND KIT",
    
    d_details: "Combo Offer Includes :",
    d_desc1: "Website",
    d_desc2: "Logo Design",
    d_desc3: "Business Card",
    d_desc4: "Social Media Templates Grid",

    d_perks: "Perks",
    d_perks1: "All in one Combo Offer",
    d_perks2: "Cost effective",
    d_perks3: "Time Saving",
  },
];
  // See Details
  var modalBtns = document.querySelectorAll(".seeDetails");
  modalBtns.forEach(function (btn) {
      btn.onclick = function () {
      if (btn.classList.contains("popDetails")) {
          document.getElementById("d_title").innerHTML = "";
          document.getElementById("d_details").innerText = "";
          document.getElementById("d_desc1").innerText = "";
          document.getElementById("d_desc2").innerText = "";
          document.getElementById("d_desc3").innerText = "";
          document.getElementById("d_desc4").innerText = "";
          
          document.getElementById("d_perks").innerText = "";
          document.getElementById("d_perks1").innerText = "";
          document.getElementById("d_perks2").innerText = "";
          document.getElementById("d_perks3").innerText = "";
      }
      var itemId = btn.getAttribute("data-name");
      for (let i = 0; i < 5; i++) {
          if (itemId == products[i].id) {
              document.getElementById("detailsWrap").style.display="block";
              btn.classList.add("popDetails");
              document.getElementById("d_title").innerHTML = products[i].d_title;
              document.getElementById("d_details").innerText = products[i].d_details;
              document.getElementById("d_desc1").innerText = products[i].d_desc1;
              document.getElementById("d_desc2").innerText = products[i].d_desc2;
              document.getElementById("d_desc3").innerText = products[i].d_desc3;
              document.getElementById("d_desc4").innerText = products[i].d_desc4;
            
              document.getElementById("d_perks").innerText = products[i].d_perks;
              document.getElementById("d_perks1").innerText = products[i].d_perks1;
              document.getElementById("d_perks2").innerText = products[i].d_perks2;
              document.getElementById("d_perks3").innerText = products[i].d_perks3;
            } else {
              continue;
          }
      }
  }
});

  // closeDetails
  var closeDetails = document.getElementById("closeDetails");
  closeDetails.onclick = function(){
    document.getElementById("detailsWrap").style.display="none";
  }


// MenuColor Change
var menu = document.querySelectorAll(".menuItem");
function removeColor(){
  for (var i = 0; i<menu.length; i++) {
    if(menu[i].classList.contains("addColor")){
      menu[i].classList.remove("addColor");
    }
  }
}
    menu.forEach(function (btn) { 
    btn.onclick = function () {
    removeColor();
    btn.classList.add("addColor");
  }
});