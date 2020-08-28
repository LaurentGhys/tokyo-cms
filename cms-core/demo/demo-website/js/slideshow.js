var kamersSlideshow = document.getElementById("kamersSlideshow");
var kamersSlideshowIndex = 0;
var kamersImages = LoadSlideshowImages("../images/slideshowKamers/", kamersSlideshow, kamersSlideshowIndex);
// setTimeout(DisplayImageForIndex.bind(null, kamersSlideshow, kamersImages, kamersSlideshowIndex), Math.random() * (2000 - 1000) + 1000);

// setTimeout(SlideshowCycle.bind(null, kamersSlideshow, kamersSlideshowIndex, kamersImages, "right"), Math.random() * (2000 - 1000) + 1000);

var tuinSlideshow = document.getElementById("tuinSlideshow");
var tuinSlideshowIndex = 0;
var tuinImages = LoadSlideshowImages("../images/slideshowTuin/", tuinSlideshow, tuinSlideshowIndex);

// DisplayImageForIndex(tuinSlideshow, tuinImages, tuinSlideshowIndex);
// setTimeout(SlideshowCycle.bind(null, tuinSlideshow, tuinSlideshowIndex, tuinImages, "left"), Math.random() * (2000 - 1000) + 1000);

var omgevingSlideshow = document.getElementById("omgevingSlideshow");
var omgevingSlideshowIndex = 0;
var omgevingImages = LoadSlideshowImages("../images/slideshowOmgeving/", omgevingSlideshow, omgevingSlideshowIndex);

// DisplayImageForIndex(omgevingSlideshow, omgevingImages, omgevingSlideshowIndex);

// setTimeout(SlideshowCycle.bind(null, omgevingSlideshow, omgevingSlideshowIndex, omgevingImages, "right"), Math.random() * (2000 - 1000) + 1000);

// function SlideshowCycle(element, index, images, direction){
//     // element.style.opacity = 0;
//     // if (direction == "right") element.style.transform = "translate(50%, 0)";
//     // else if (direction == "left") element.style.transform = "translate(-50%, 0)";
//     // element.style.transform += "scale(0.5)";
//     setTimeout(function() {
//         if (images[index] != null) element.setAttribute("src", images[index])
//         else (alert("Image slideshow can't get images"));
//         index=(index<images.length-1)? index+1 : 0
//     //   element.style.opacity = 1;   
//     //   element.style.transform = "scale(1)";
//         setTimeout(SlideshowCycle.bind(null, element, index, images, direction), Math.random() * (6000 - 3000) + 3000);
//     }, 1000);
// }

function DisplayImageForIndex(element, index, images) {
    GenerateSlideshowDots(element, index, images.length);
    if (images[index] != null) element.setAttribute("src", images[index])
    else (alert("Image slideshow can't get images"));
    // index=(index<images.length-1)? index+1 : 0
}

function SlideshowAddIndex(slideshow) {
    var slideshowName = slideshow.id;
    if (slideshowName == "kamersSlideshow") {
        kamersSlideshowIndex=(kamersSlideshowIndex<kamersImages.length-1)? kamersSlideshowIndex+1 : 0
        DisplayImageForIndex(kamersSlideshow, kamersSlideshowIndex, kamersImages);
    } else if (slideshowName == "tuinSlideshow") {
        tuinSlideshowIndex=(tuinSlideshowIndex<tuinImages.length-1)? tuinSlideshowIndex+1 : 0
        DisplayImageForIndex(tuinSlideshow, tuinSlideshowIndex, tuinImages);
    } else if (slideshowName == "omgevingSlideshow") {
        omgevingSlideshowIndex=(omgevingSlideshowIndex<omgevingImages.length-1)? omgevingSlideshowIndex+1 : 0
        DisplayImageForIndex(omgevingSlideshow, omgevingSlideshowIndex, omgevingImages);
    }
}

function SlideshowSubstractIndex(slideshow) {
    var slideshowName = slideshow.id;
    if (slideshowName == "kamersSlideshow") {
        kamersSlideshowIndex=(kamersSlideshowIndex>0)? kamersSlideshowIndex-1 : kamersImages.length-1
        DisplayImageForIndex(kamersSlideshow, kamersSlideshowIndex, kamersImages);
    } else if (slideshowName == "tuinSlideshow") {
        tuinSlideshowIndex=(tuinSlideshowIndex<tuinImages.length-1)? tuinSlideshowIndex+1 : 0
        DisplayImageForIndex(tuinSlideshow, tuinSlideshowIndex, tuinImages);
    } else if (slideshowName == "omgevingSlideshow") {
        omgevingSlideshowIndex=(omgevingSlideshowIndex<omgevingImages.length-1)? omgevingSlideshowIndex+1 : 0
        DisplayImageForIndex(omgevingSlideshow, omgevingSlideshowIndex, omgevingImages);
    }
}

function SlideshowSetIndex(slideshow, index) {
    var slideshowName = slideshow.id;
    if (slideshowName == "kamersSlideshow") {
        kamersSlideshowIndex = index;
        DisplayImageForIndex(kamersSlideshow, kamersSlideshowIndex, kamersImages);
    } else if (slideshowName == "tuinSlideshow") {
        tuinSlideshowIndex = index;
        DisplayImageForIndex(tuinSlideshow, tuinSlideshowIndex, tuinImages);
    } else if (slideshowName == "omgevingSlideshow") {
        omgevingSlideshowIndex = index;
        DisplayImageForIndex(omgevingSlideshow, omgevingSlideshowIndex, omgevingImages);
    }
}

function GenerateSlideshowDots(element, currentIndex, maxIndex) {
    var dotContainer = (element.parentElement.getElementsByClassName("slideshow-dot-container")[0]);
    var htmlOutput = [];
    dotContainer.innerHTML = '';
    for (let i = 0; i < maxIndex; i++) {
        if (currentIndex == i) htmlOutput.push('<span class="dot active" onclick="SlideshowSetIndex(', element.id, ',' , i, ')"></span>');
        else htmlOutput.push('<span class="dot" onclick="SlideshowSetIndex(', element.id, ',' , i, ')"></span>');
    }
    dotContainer.innerHTML = htmlOutput.join('');
}

function LoadSlideshowImages(path, element, index) {
    var imagesToReturn = [];
    $.ajax({
        url: path,
        success: function (data) {
            $(data).find("a").attr("href", function (i, val) {
                if (val.match(/\.(jpe?g|png|gif)$/)) {
                    // Use either one depending on the hosting (online or live server testing)
                    var str = path.replace("..", "");
                    // var str = "";
                    str += val;
                    imagesToReturn.push(str);
                }
            });
            GenerateSlideshowDots(element, 0, imagesToReturn.length);
            DisplayImageForIndex(element, index, imagesToReturn);
        }
    });
    return imagesToReturn;
}