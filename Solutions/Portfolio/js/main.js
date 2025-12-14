var navbar = document.querySelector(".navbar");
window.onscroll = () =>{
  this.scrollY > 20 ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
}
const navMenu = document.querySelector(".menu");
navToggle = document.querySelector(".menu-btn");
if(navToggle)
{
    navToggle.addEventListener("click", () =>
    {
        navMenu.classList.toggle("active");
    })
}
const navLink = document.querySelectorAll(".nav-link");
function linkAction()
{
    const navMenu = document.querySelector(".menu");
    navMenu.classList.remove("active")
}
navLink.forEach(n => n.addEventListener("click", linkAction))
const Section=document.querySelectorAll('section[id]')
function scrollActive()
{
    const scrollY = window.pageYOffset
    Section.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight)
        {
            document.querySelector('.links a[href*=' + sectionId + ']').classList.add('active')
        }
        else
        {
          document.querySelector('.links a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)
const skills_wrap = document.querySelector(".about-skills"),
skills_bar = document.querySelectorAll(".progress-line");
window.addEventListener("scroll", () => {
    skillsEffect();
})
function checkScroll(el)
{
    let rect = el.getBoundingClientRect();
    if(window.innerHeight >= rect.top + el.offsetHeight) return true;
    return false;
}
function skillsEffect()
{
    if(!checkScroll(skills_wrap)) return;
    skills_bar.forEach((skill) => (skill.style.width = skill.dataset.progress));
}

const PortfolioItems = document.querySelectorAll(".portfolio-item"),
      totalportfolioItem = PortfolioItems.length;

const lightbox = document.querySelector(".lightbox"),
      lightboxImg = lightbox.querySelector(".lightbox-img"),
      lightboxClose = lightbox.querySelector(".lightbox-close"),
      lightboxText = lightbox.querySelector(".caption-text"),
      lightboxCounter = lightbox.querySelector(".caption-counter");
let itemIndex = 0;
for(let i=0; i<totalportfolioItem; i++)
{
   PortfolioItems[i].addEventListener("click", function(e)
   {
       if (e.target.closest('.github-btn')) return;
       itemIndex=i;
       changeItem();
       toggleLightbox();
   })
}
function nextItem()
{
    if(itemIndex == totalportfolioItem-1)
    {
        itemIndex=0;
    }
    else
    {
        itemIndex++
    }
    changeItem();
}
function prevItem()
{
    if(itemIndex == 0)
    {
        itemIndex=totalportfolioItem-1;
    }
    else
    {
        itemIndex--
    }
    changeItem();
}
function toggleLightbox()
{
    lightbox.classList.toggle("open");
}
function changeItem()
{
    imgSrc = PortfolioItems[itemIndex].querySelector(".portfolio-img img").getAttribute("src");
    lightboxImg.src=imgSrc;
    lightboxText.innerHTML=PortfolioItems[itemIndex].querySelector("h4").innerHTML;
    lightboxCounter.innerHTML=(itemIndex+1) + " of " + totalportfolioItem;
}
lightbox.addEventListener("click",function(event)
{
   if(event.target === lightboxClose || event.target === lightbox)
   {
      toggleLightbox()
   }
})

document.querySelectorAll('.github-btn').forEach(btn=>{
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const pItem = btn.closest('.portfolio-item');
        const repo = pItem ? pItem.getAttribute('data-github') : null;
        const url = repo && repo.trim() !== '' ? repo : 'https://github.com/Manan-2007';
        window.open(url, '_blank');
    })
});
