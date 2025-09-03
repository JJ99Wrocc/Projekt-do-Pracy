$(document).ready(function() {
    var menuStack = [];
    var mainMenu, submenus, offcanvasTitle, backIcon;

    function hideAll() {
        if (submenus) submenus.hide();
        if (mainMenu) mainMenu.hide();
    }

    function updateTitle(title) {
        if (offcanvasTitle) offcanvasTitle.text(title);
    }

    function updateBackIcon() {
        if (backIcon) backIcon.css("display", menuStack.length > 0 ? "inline-block" : "none");
    }

    function attachSubmenuEvents() {
        $(".submenu-toggle").on("click", function(e) {
            e.preventDefault();
            var targetId = $(this).data("target");
            hideAll();
            $("#" + targetId).show();

            menuStack.push({
                id: targetId,
                title: $(this).text().trim()
            });

            updateTitle($(this).text().trim());
            updateBackIcon();
        });
    }

    function attachBackIconEvent() {
        $("#offcanvasMainTitle").on("click", function() {
            if (menuStack.length === 0) return;

            var current = menuStack.pop();
            $("#" + current.id).hide();

            if (menuStack.length === 0) {
                if (mainMenu) mainMenu.show();
                updateTitle("Menu");
            } else {
                var prev = menuStack[menuStack.length - 1];
                $("#" + prev.id).show();
                updateTitle(prev.title);
            }

            updateBackIcon();
        });
    }

  
    $.get('./components/nav.html', function(data) {
        $('#nav-placeholder').html(data);
        mainMenu = $(".mainmenu");
        submenus = $(".submenu");
        offcanvasTitle = $("#offcanvasMainTitle .title-text");
        backIcon = $("#backIcon");

        attachSubmenuEvents();
        attachBackIconEvent();
    });

    $.get('./components/header.html', function(data) {
        $('#header-placeholder').html(data);
    });

    $.get('./components/main.html',function(data){
        $('#main-placeholder').html(data)
    })
    $.get('./components/footer.html', function(data) {
        $('#footer-placeholder').html(data);

      
        $('.about-us-title').click(function() {
            $(this).siblings('.about-us-p').slideToggle(); 
            $(this).find('.arrow').toggleClass('active');  
        });
        $('.info-title').click(function() {
            $(this).siblings('.info-p').slideToggle(); 
            $(this).find('.arrow').toggleClass('active');  
        });
        $('.ur-account-title').click(function() {
            $(this).siblings('.ur-account-p  ').slideToggle(); 
            $(this).find('.arrow').toggleClass('active');  
        });
        $('.customer-service-title').click(function() {
            $(this).siblings('.customer-service-p').slideToggle(); 
            $(this).find('.arrow').toggleClass('active');  
        });
        
    });
});
$(document).ready(function(){
    $('.multiple-items').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3
    });
  });