$(document).ready(function () {
  $(".home-hero-slider").slick({
    slidesToShow: 1,
    prevArrow:
      '<button class="slide-arrow prev-arrow"><i class="fa-solid fa-angle-left"></i></button>',
    nextArrow:
      '<button class="slide-arrow next-arrow"><i class="fa-solid fa-angle-right"></i></button>',
    dots: true,
  });

  $(".home-hero-slider.home-hero-slider-two").slick({
    slidesToShow: 1,
    prevArrow:
      '<button class="slide-arrow prev-arrow"><i class="fa-solid fa-angle-left"></i></button>',
    nextArrow:
      '<button class="slide-arrow next-arrow"><i class="fa-solid fa-angle-right"></i></button>',
    dots: false,
  });
  // let selectedSeries, child_no, spouse_no, driver_no;

  // $("#series").change(function () {
  //   let selectedSeries = $(this).children("option:selected").text();
  //   console.log(selectedSeries);
  // });

  // $("#child_no").change(function () {
  //   child_no = $(this).children("option selected").val();
  // });

  // $("#spouse_no").change(function () {
  //   spouse_no = $(this).children("option selected").val();
  // });

  // $("#driver_no").change(function () {
  //   driver_no = $(this).children("option selected").val();
  // });

  // selectedSeries = $("#series option").filter(":selected").val();

  // console.log(selectedSeries, child_no, spouse_no, driver_no);
});

function change(a) {
  console.log(a);
}

function previewFile(event) {


  var file = event.target.files[0];
 // event.target.value = '';
  if (file) {
    var reader = new FileReader();

    reader.onload = function () {
      $("#previewImg").attr("src", reader.result);
    };

    reader.readAsDataURL(file);
  }
}

function validateImageFileType(event){
  var file = $("#profile-image-upload").get(0).files[0];
  if (file) {
    var fileName  = file.name;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
      //TO DO
    }else{
      alert("Only jpg/jpeg and png files are allowed!");
    }
  }
}
