function openNav() {
  document.getElementById("mySidenav").style.right = "0";
}

function closeNav() {
  document.getElementById("mySidenav").style.right = "-100%";
}

$(".main-slider").owlCarousel({
  loop: true,
  margin: 10,
  nav: false,
  dots: false,
  items: 1,
  autoplay: true,
});
$(".team-owl").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  dots: false,
  items: 1,
});
$(".impact-owl").owlCarousel({
  loop: true,
  margin: 30,
  nav: false,
  dots: false,
  autoplay: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 3,
    },
  },
});

$(".blog-owl").owlCarousel({
  loop: true,
  margin: 40,
  nav: true,
  dots: false,
  autoplay: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 3,
    },
  },
});

$(".interview-owl").owlCarousel({
  loop: true,
  margin: 40,
  nav: false,
  dots: false,
  autoplay: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 3,
    },
  },
});

$(".report-owl").owlCarousel({
  loop: true,
  margin: 40,
  nav: true,
  dots: true,
  autoplay: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 4,
    },
  },
});

// header search
$('#search').on('input', async function () {
  var value = $('#search').val();
  if (value.length < 3) return
  try {
    const body = { value }
    // get
    const res = await axios.post(`/search/title`, body);
    const result = res.data

    // reset and set search dropdown
    $(".dropdown-item").remove();
    result.news.map(item => $('#search-menu').append('<a href=/news/' + item.slug + ' class="dropdown-item" >' + item.title + '</a>'))
    result.update.map(item => $('#search-menu').append('<a href=/update/' + item.slug + ' class="dropdown-item" >' + item.title + '</a>'))

  } catch (e) {
    console.error(e);
  }
});
