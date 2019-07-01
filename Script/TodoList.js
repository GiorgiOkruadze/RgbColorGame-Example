var RandomColorBtn = document.querySelector("#RandomColorBtn");
var Answer = document.querySelector("#Answer");
var RandomColor = document.querySelector("#RandomColor");
var BoxesCollection = document.querySelectorAll(".box");
var WrongCouner = 2;
var IsWinner = false;
var IsHardGameSelected = true;
var EasyModeBtn = document.querySelector(".EasyMode");
var HardModeBtn = document.querySelector(".HardMode");
// ------------------Functions--------------------
EasyModeBtn.addEventListener("click",function(){
    IsHardGameSelected = false;
    HideBoxes(BoxesCollection);
    this.style.opacity = "1";
    HardModeBtn.style.opacity = '0.4';
    RandomColorBtn.click();
});
HardModeBtn.addEventListener("click",function(){
    IsHardGameSelected = true;
    ReturnAllBoxes();
    this.style.opacity = "1";
    EasyModeBtn.style.opacity = '0.4';
    RandomColorBtn.click();
})

function HideBoxes(boxes)
{
    for(var i = Math.floor((boxes.length)/2); i < boxes.length; i++)
    {
        boxes[i].style.display = "none";
    }
}

function SetHeightToBox(boxes) {
    if(IsHardGameSelected)
    {
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].style.height = boxes[i].clientWidth + "px";
        }
    }
    else
    {
        for (var i = 0; i < boxes.length/2; i++) {
            boxes[i].style.height = boxes[i].clientWidth + "px";
        }
    }
}

function BreakHeart(index) {
    var harts = document.querySelectorAll(".harts");
    harts[index].style.display = "none";
}

SetHeightToBox(BoxesCollection);

window.addEventListener("resize", function () {
    SetHeightToBox(BoxesCollection);
});


function GenerateRandomRgbColor() {
    var Red = Math.floor(Math.random() * 256);
    var Green = Math.floor(Math.random() * 256);
    var Blue = Math.floor(Math.random() * 256);
    return `rgb(${Red},${Green},${Blue}`;
}

function ReturnAllBoxes() {
    if(IsHardGameSelected)
    {
        for (var i = 0; i < BoxesCollection.length; i++) {
            BoxesCollection[i].style.display = "block";
        }
    }
    else
    {
        for (var i = 0; i < Math.round(BoxesCollection.length/2); i++) {
            BoxesCollection[i].style.display = "block";
        }
    }
}

function ReturnAllHearts() {
    var hearts = document.querySelectorAll(".harts");
    for (var i = 0; i < hearts.length; i++) {
        hearts[i].style.display = "inline-block";
    }
}

RandomColorBtn.addEventListener("click", function () {
    for (var i = 0; i < BoxesCollection.length; i++) {
        BoxesCollection[i].style.background = GenerateRandomRgbColor();
    }
    ReturnAllBoxes();
    ReturnAllHearts();

    Answer.textContent = "Play Game : )) ";
    var RandIndex = Math.floor(Math.random() * BoxesCollection.length);
    if(!IsHardGameSelected)
        RandIndex = Math.floor(Math.random() * Math.round(BoxesCollection.length/2));
    
    
    RandomColor.textContent = BoxesCollection[RandIndex].style.background;
    WrongCouner = 2;
    IsWinner = false;
});

for (var i = 0; i < BoxesCollection.length; i++) {
    BoxesCollection[i].addEventListener("click", function () {
        if (RandomColor.textContent == "..." || WrongCouner == 0 || IsWinner) {
            return;
        }

        if (this.style.background == RandomColor.textContent) {
            Answer.textContent = "You winnn!!!! ";
            IsWinner = true;
        } else {
            this.style.display = "none";
            Answer.textContent = "Try Again noob :))) ";
            WrongCouner--;
            BreakHeart(WrongCouner);
        }
    })
}