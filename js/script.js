"use strict";
/* -------------------------- Set Default Language -------------------------- */
const setDefaultLanguage = () => {
  const currentLanguage = localStorage.getItem("currentLanguage");
  if (currentLanguage) return;
  localStorage.setItem("currentLanguage", "EN");
};
setDefaultLanguage();
/* ------------------------------ Set Link Path ----------------------------- */
const links = [...document.querySelectorAll(".link")];
let prevUrl;
const setLinkPath = () => {
  prevUrl = document.referrer;
  if (prevUrl.includes("al-malga")) {
    links[0]?.setAttribute("href", "./al-malga.html");
    links[1]?.setAttribute("href", "./al-malga-units.html");
  }
  if (prevUrl.includes("al-arrid")) {
    links[0]?.setAttribute("href", "./al-arrid.html");
    links[1]?.setAttribute("href", "./al-arrid-units.html");
  }
};
setLinkPath();
/* ------------------------ Add Active Class For Link ----------------------- */
const projectInfoLinks = document.querySelector(".project__infoLinks");
window.addEventListener("load", () => {
  if (!projectInfoLinks) return;
  const activePage = window.location.pathname;
  const links = [...projectInfoLinks.querySelectorAll(".link")];
  links.forEach((link) => {
    if (link.href.includes(`${activePage}`)) link.classList.add("active");
  });
});
/* ------------------------------ Active Units ------------------------------ */
const unitsOptions = document.querySelector(".header__unitsOptions");
unitsOptions?.addEventListener("click", (e) => {
  const unitOption = e.target.closest(".unit__option");
  if (!unitOption) return;
  removeUnitActiveClass(unitsOptions);
  unitOption.classList.add("active");
});
const removeUnitActiveClass = (unitsOptions) => {
  const options = [...unitsOptions.querySelectorAll(".unit__option")];
  options.forEach((option) => {
    option.classList.remove("active");
  });
};
/* ---------------------------- Handle Units Data --------------------------- */
const unitsInfoListWrapper = document.querySelector(".units__infoListWrapper");
const currentPageNumber = document.querySelector(".current__page");
const allPagesNumber = document.querySelector(".all__pages");
const nextPageButton = document.querySelector(".next__pageButton");
const prevPage = document.querySelector(".prev__page");
const nextPage = document.querySelector(".next__page");
const unitsPerPage = 14;
let currentPage = 1;
let translatedElements,
  wordsData,
  unitsData,
  maxPage,
  indexOfLastunit,
  indexOfFirstunit,
  currentunits;
const getUnitsData = async () => {
  const currentPagePath = window.location.pathname;
  if (
    currentPagePath !== "/al-malga-units.html" &&
    currentPagePath !== "/al-arrid-units.html"
  )
    return;
  await fetch("js/units-data.json")
    .then((response) => response.json())
    .then((data) => {
      const untisDataProject = prevUrl.includes("al-malga")
        ? "al-malga"
        : "al-arrid";
      unitsData = data[untisDataProject];
      maxPage = Math.ceil(unitsData.length / unitsPerPage);
      allPagesNumber.innerHTML = maxPage;
      setPageNumbers();
    });
  getTranslateData();
};
window.addEventListener("load", getUnitsData);
const setPageNumbers = () => {
  indexOfLastunit = currentPage * unitsPerPage;
  indexOfFirstunit = indexOfLastunit - unitsPerPage;
  currentunits = unitsData
    .filter((unitData) => unitData)
    .slice(indexOfFirstunit, indexOfLastunit);
  showUnitsData(currentunits);
  addBackgroundClass();
};
const showUnitsData = (currentunits) => {
  const currentunitsList = document.querySelector(".units__infoList");
  if (currentunitsList) currentunitsList.remove();
  const unitsList = `
    <ul class='units__infoList list-unstyled'>
        ${currentunits
          ?.map((currentunit) => {
            return `<li  class='unit__info'>
              <div class='info__header d-flex justify-content-between align-items-center'>
                <div class='apartments d-flex align-items-center'>
                  <span>
                    <i class='fa-solid fa-building'></i>
                  </span>
                  <div class='apartments__numbers d-flex flex-column'>
                    <span data-lang="number" class='text-capitalize'>1 number</span>
                    <span data-lang="apartments" class='text-capitalize'>apartments</span>
                  </div>
                </div>
                <div class='block__number d-flex align-items-center'>
                  <span>
                    <i class='fa-solid fa-house'></i>
                  </span>
                  <span data-lang="a" class="text-capitalize">a 1</span>
                </div>
              </div>
              <div class='info__body'>
                <table class='table table-bordered text-center'>
                  <thead>
                    <tr>
                      <th class='text-uppercase'>
                        <span data-lang="status"> status </span>
                      </th>
                      <th class='text-uppercase'>
                        <span data-lang="rooms">rooms</span>
                      </th>
                      <th class='text-uppercase'>
                        <span data-lang="total area">total area</span>
                      </th>
                      <th class='text-uppercase'>
                        <span data-lang="floors">floors</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class='unit__status text-uppercase'>
                        <span  data-lang="${currentunit}" >${currentunit}</span>
                      </td>
                      <td class='text-capitalize'>
                        <span>2</span>
                      </td>
                      <td class='text-capitalize'>
                        <span data-lang="162.14 m">162.14 m</span>
                      </td>
                      <td class='text-capitalize'>
                        <span data-lang="ground floor">ground floor</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class='info__footer'>
                <div class='unit__description d-flex flex-wrap'>
                  <div class="d-flex align-items-center">
                    <span data-lang="room" class='text-uppercase'>2 room</span>
                    <span></span>
                  </div>
                  <div class="d-flex align-items-center">
                    <span data-lang="wide reception" class='text-uppercase'>wide reception</span>
                    <span></span>
                  </div>
                  <div class="d-flex align-items-center">
                    <span data-lang="bathroom" class='text-uppercase'>2 bathroom</span>
                    <span></span>
                  </div>
                    <div class="d-flex align-items-center">
                      <span data-lang="kitchen" class='text-uppercase'>kitchen</span>
                      <span></span>
                  </div>
                  <div class="d-flex align-items-center">
                    <span data-lang="wide reception" class='text-uppercase'>wide reception</span>
                  </div>
                </div>
              </div>
            </li>`;
          })
          .join(" ")}
        </ul>
    `;
  unitsInfoListWrapper.insertAdjacentHTML("afterbegin", unitsList);
};
/* -------------------------- Fetch Translated Data ------------------------- */
const getTranslateData = async () => {
  translatedElements = document.querySelectorAll("[data-lang]");
  const currentLanguage = localStorage.getItem("currentLanguage");
  if (currentLanguage)
    langButton.nextElementSibling.innerHTML = currentLanguage;
  await fetch("js/translate.json")
    .then((response) => response.json())
    .then((data) => (wordsData = data));
  changeLanguage();
};
window.addEventListener("load", getTranslateData);
const nextPagePreview = () => {
  if (currentPage === maxPage) return;
  let currentLang = localStorage.getItem("currentLanguage");
  if (currentLang === "EN") changePageDirection(currentLang);
  currentPage++;
  currentPageNumber.innerHTML = currentPage;
  changeLanguage();
  setPageNumbers();
};
const prevPagePreview = () => {
  if (currentPage === 1) return;
  let currentLang = localStorage.getItem("currentLanguage");
  if (currentLang === "EN") changePageDirection(currentLang);
  currentPage--;
  currentPageNumber.innerHTML = currentPage;
  changeLanguage();
  setPageNumbers();
};
nextPageButton?.addEventListener("click", nextPagePreview);
nextPage?.addEventListener("click", nextPagePreview);
prevPage?.addEventListener("click", prevPagePreview);
/* ----------------------------- Change Language ---------------------------- */
const langButton = document.querySelector(".lang__button");
const changeLocalStorageLang = () => {
  const currentLang = localStorage.getItem("currentLanguage");
  if (currentLang === "EN") {
    langButton.nextElementSibling.innerHTML = "AR";
    localStorage.setItem("currentLanguage", "AR");
  } else {
    langButton.nextElementSibling.innerHTML = "EN";
    localStorage.setItem("currentLanguage", "EN");
  }
  changeLanguage();
};
langButton.addEventListener("click", changeLocalStorageLang);

const changeLanguage = () => {
  let inputsPlaceholder = [...document.querySelectorAll(".input__placeholder")];
  let currentLang = localStorage.getItem("currentLanguage");
  if (currentLang === "EN") {
    if (inputsPlaceholder.length) {
      inputsPlaceholder[0].placeholder = "Name";
      inputsPlaceholder[1].placeholder = "Email";
      inputsPlaceholder[2].placeholder = "Write Message";
    }
    handleEnglishChange();
  } else {
    if (inputsPlaceholder.length) {
      inputsPlaceholder[0].placeholder = "الاسم";
      inputsPlaceholder[1].placeholder = "البريد الالكتروني";
      inputsPlaceholder[2].placeholder = "اكتب رسالة";
    }
    handleArabicChange();
  }
  changePageDirection(currentLang);
};
const handleArabicChange = () => {
  const currentLang = langButton.nextElementSibling.innerHTML;
  translatedElements.forEach((ele) => {
    ele.innerText = wordsData[currentLang][ele.getAttribute("data-lang")];
  });
};
const handleEnglishChange = () => {
  const currentLang = langButton.nextElementSibling.innerHTML;
  translatedElements.forEach((ele) => {
    ele.innerText = wordsData[currentLang][ele.getAttribute("data-lang")];
  });
};
const changePageDirection = (currentLang) => {
  currentLang === "EN"
    ? (document.querySelector("html").dir = "ltr")
    : (document.querySelector("html").dir = "rtl");
};
/* -------------------------- Add Unit Status Class ------------------------- */
const addBackgroundClass = () => {
  const unitsStatus = [...document.querySelectorAll(".unit__status")];
  unitsStatus.forEach((unitStatus) => {
    if (unitStatus.getElementsByTagName("span")[0].innerHTML === "for sale") {
      unitStatus.classList.add("for__sale");
    } else {
      unitStatus.classList.add("sold");
    }
  });
};
addBackgroundClass();
/* ----------------------------- Expand Options ----------------------------- */
const optionsHeader = document.querySelectorAll(".option__header");
const addExpandClass = (optionsHeader) => {
  optionsHeader.forEach((option) => {
    option.addEventListener("click", (e) => {
      option.classList.toggle("expanded");
    });
  });
};
addExpandClass([...optionsHeader]);
/* --------------------- Handle Submit Units Filter Form -------------------- */
const unitsFilterForm = document.querySelector("#units__filterForm");
unitsFilterForm?.addEventListener("submit", (e) => {
  e.preventDefault();
});
/* --------------------------- Form Option Select --------------------------- */
const selectOptionWrapper = document.querySelector(
  ".form__selectCountryWrapper",
);
const countrySelect = document.querySelector(".country__select");
countrySelect?.addEventListener("click", () => {
  countryList.classList.toggle("active");
});
let formSelectOptions;
const addCountryList = () => {
  if (!document.querySelector(".form__select")) return;
  formSelectOptions = [...document.querySelector(".form__select").children];
  const countryList = `<ul class="country__list list-unstyled mb-3">
  ${formSelectOptions
    .map((option) => {
      return `  <li
    class="country__Iteminfo d-flex align-items-center justify-content-between"
  >
    <figure class="mb-0">
      <img src="${option.dataset.flag}" alt="" />
    </figure>
    <span data-lang="${option.dataset.country}" class="text-capitalize">${option.innerHTML}</span>
  </li>`;
    })
    .join(" ")}
</ul>`;
  selectOptionWrapper.insertAdjacentHTML("beforeend", countryList);
};
addCountryList();
const setSelectedOption = (currentOption) => {
  formSelectOptions.forEach((option) => {
    option.removeAttribute("selected");
  });
  const selectedOption = formSelectOptions.filter(
    (option) => option.innerHTML === currentOption,
  )[0];
  selectedOption.setAttribute("selected", "selected");
  return selectedOption;
};
const countryList = document.querySelector(".country__list");
countryList &&
  countryList.addEventListener("click", (e) => {
    const clickedCountry = e.target.closest(".country__Iteminfo");
    const itemImage = clickedCountry.querySelector("img");
    const itemName = clickedCountry.querySelector("span");
    const countrySelectedFlag = document.querySelector(".country__select img");
    let countrySelectedName = document.querySelector(
      ".country__select span:last-child",
    );
    countrySelectedFlag.src = itemImage.src;
    countrySelectedName.innerHTML = itemName.innerHTML;
    countrySelectedName.dataset.lang = itemName.dataset.lang;
    setSelectedOption(itemName.innerHTML);
    changeCountryNumberKey(itemName.innerHTML);
    countryList.classList.remove("active");
  });

const changeCountryNumberKey = (countryName) => {
  const countryNumberCode = document.querySelector("#basic-addon1");
  const selected = formSelectOptions.filter((option) =>
    option.hasAttribute("selected"),
  )[0];
  countryNumberCode.innerHTML = selected.dataset.number;
};
