"use strict";
/* -------------------------- Fetch Translate Data -------------------------- */
let wordsData;
const getTranslateData = async () => {
  await fetch("js/translate.json")
    .then((response) => response.json())
    .then((data) => (wordsData = data));
};
getTranslateData();
/* ----------------------------- Change Language ---------------------------- */
const langButton = document.querySelector(".lang__button");
const translatedElements = document.querySelectorAll("[data-lang]");
const changeLanguage = () => {
  let inputsPlaceholder = [...document.querySelectorAll(".input__placeholder")];
  let buttonText = langButton.innerHTML;
  if (buttonText === "EN") {
    langButton.innerHTML = "AR";
    handleArabicChange();
    addBootstrapRtl();
    if (inputsPlaceholder.length) {
      inputsPlaceholder[0].placeholder = "الاسم";
      inputsPlaceholder[1].placeholder = "البريد الالكتروني";
      inputsPlaceholder[2].placeholder = "اكتب رسالة";
    }
  } else {
    langButton.innerHTML = "EN";
    handleEnglishChange();
    addBootstrapLtr();
    if (inputsPlaceholder.length) {
      inputsPlaceholder[0].placeholder = "Name";
      inputsPlaceholder[1].placeholder = "Email";
      inputsPlaceholder[2].placeholder = "Write Message";
    }
  }
};
langButton.addEventListener("click", changeLanguage);

const handleArabicChange = () => {
  const currentLang = langButton.innerHTML;
  translatedElements.forEach((ele) => {
    ele.innerText = wordsData[currentLang][ele.getAttribute("data-lang")];
  });
};

const handleEnglishChange = () => {
  const currentLang = langButton.innerHTML;
  translatedElements.forEach((ele) => {
    ele.innerHTML = wordsData[currentLang][ele.getAttribute("data-lang")];
  });
};

const addBootstrapRtl = () => {
  //   bootstrapFile.href = "../css/bootstrap.rtl.min.css";
  document.querySelector("html").dir = "rtl";
};
const addBootstrapLtr = () => {
  //   bootstrapFile.href = "../css/bootstrap.min.css";
  document.querySelector("html").dir = "ltr";
};
