 //selecting all required elements
  const filterItem = document.querySelector(".wrapper2");
  const filterImg = document.querySelectorAll(".gallery .image");
  // window.onload = ()=>{ 
              
 
  // }



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
      for (let i = 3; i < filterImg.length; i++) {
          filterImg[i].setAttribute("onclick", "preview(this)"); 
      }
// ...

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
          document.querySelector("body").style.overflow = "auto";
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
    // autoplay: {
    //   delay: 3000,
    // },
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
    // autoplay: {
    //   delay: 3000,
    // },
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