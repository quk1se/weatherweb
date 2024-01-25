window.onscroll = function() 
{
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) 
    {
        navbar.classList.add('scrolled-nav-bar');
    } 
    else 
    {
        navbar.classList.remove('scrolled-nav-bar');
    }
}

        