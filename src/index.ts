import "./style/normalize.css";
import "./style/style.scss";
import Image1 from "./assets/img/1.jpg";
import Image2 from "./assets/img/2.jpg";
import Image3 from "./assets/img/3.jpg";
import Image4 from "./assets/img/4.jpg";
import Image5 from "./assets/img/5.jpg";
import Image6 from "./assets/img/6.jpg";
import Image7 from "./assets/img/7.jpg";
import Image8 from "./assets/img/8.jpg";
import Image9 from "./assets/img/9.jpg";

interface IImageData {
  url: string;
  title: string;
}

const imagesData = [
  {
    url: Image1,
    title: "title1",
  },
  {
    url: Image2,
    title: "title2",
  },
  {
    url: Image3,
    title: "title3",
  },
  {
    url: Image4,
    title: "title4",
  },
  {
    url: Image5,
    title: "title5",
  },
  {
    url: Image6,
    title: "title6",
  },
  {
    url: Image7,
    title: "title7",
  },
  {
    url: Image8,
    title: "title8",
  },
  {
    url: Image9,
    title: "title9",
  },
];

function createOneElement(tag: string, classNames: string[], content?: string) {
  if (!Array.isArray(classNames)) {
    throw new Error(
      `createOneElement: classNames is not array - ${classNames}`
    );
  }
  const el = document.createElement(tag);
  classNames.forEach((itemClass) => {
    el.classList.add(itemClass.trim());
  });
  if (content !== undefined) {
    el.innerHTML = content;
  }
  return el;
}

class Slider {
  slider: HTMLDivElement;
  isEnabled: boolean;
  currentItem: number;
  slidersCount: number;
  controls: HTMLDivElement | null;
  prevBtn: HTMLButtonElement | null;
  nextBtn: HTMLButtonElement | null;
  sliderItems: HTMLDivElement[] | null;
  sliderItemsWrapper: HTMLDivElement | null;

  constructor(sliderId: string, imagesData: IImageData[]) {
    this.slider = document.getElementById(sliderId) as HTMLDivElement;
    this.isEnabled = true;
    this.currentItem = 0;
    this.slidersCount = imagesData.length;
    this.controls = null;
    this.prevBtn = null;
    this.nextBtn = null;
    this.sliderItemsWrapper = null;
    this.sliderItems = null;
    this.initialization(imagesData);
  }

  changeCurrentItem = (n: number) => {
    this.currentItem = (n + this.slidersCount) % this.slidersCount;
  };

  hideItem = (direction: string) => {
    this.isEnabled = false;
    if (!this.sliderItems) return;
    this.sliderItems[this.currentItem].classList.add(direction);
    this.sliderItems[this.currentItem].addEventListener(
      "animationend",
      function () {
        this.classList.remove("slider__item-active", direction);
      },
      { once: true }
    );
  };

  showItem = (direction: string) => {
    if (!this.sliderItems) return;
    this.sliderItems[this.currentItem].classList.add(
      "slider__item-next",
      direction
    );
    this.sliderItems[this.currentItem].addEventListener(
      "animationend",
      () => {
        if (!this.sliderItems) return;
        const currentSlider = this.sliderItems[this.currentItem];
        currentSlider.classList.remove("slider__item-next", direction);
        currentSlider.classList.add("slider__item-active");
        this.isEnabled = true;
      },
      { once: true }
    );
  };

  leafToPrev = () => {
    if (!this.isEnabled) return;
    this.hideItem("to-right");
    this.changeCurrentItem(this.currentItem - 1);
    this.showItem("from-left");
  };

  leafToNext = () => {
    if (!this.isEnabled) return;
    this.hideItem("to-left");
    this.changeCurrentItem(this.currentItem + 1);
    this.showItem("from-right");
  };

  handleClick = (event: MouseEvent) => {
    if (!event.target) return;
    const target = event.target as HTMLDivElement;
    if (target.classList.contains("slider__icon-prev")) {
      this.leafToPrev();
      return;
    }

    if (target.classList.contains("slider__icon-next")) {
      this.leafToNext();
      return;
    }
  };

  createButtons = () => {
    this.controls = createOneElement("div", [
      "slider__controls",
    ]) as HTMLDivElement;
    this.prevBtn = createOneElement("button", [
      "slider__arrow",
      "slider__arrow-prev",
    ]) as HTMLButtonElement;
    this.nextBtn = createOneElement("button", [
      "slider__arrow",
      "slider__arrow-next",
    ]) as HTMLButtonElement;
    this.prevBtn.type = "button";
    this.nextBtn.type = "button";
    this.prevBtn.append(
      createOneElement("span", ["slider__arrow_icon", "slider__icon-prev"])
    );
    this.nextBtn.append(
      createOneElement("span", ["slider__arrow_icon", "slider__icon-next"])
    );
    this.controls.append(this.prevBtn, this.nextBtn);
    this.controls.addEventListener("click", this.handleClick);
  };

  createImages = (imagesData: IImageData[]) => {
    this.sliderItemsWrapper = createOneElement("div", [
      "slider__wrapper",
    ]) as HTMLDivElement;
    this.sliderItems = imagesData.map(({ url, title }, index) => {
      const el = createOneElement("div", ["slider__item"]) as HTMLDivElement;
      if (index === 0) el.classList.add("slider__item-active");
      const titleEl = createOneElement(
        "div",
        ["slider__item_text"],
        title
      ) as HTMLDivElement;
      const image = createOneElement("img", [
        "slider__item_img",
      ]) as HTMLImageElement;
      image.src = url;
      image.alt = title;
      el.append(titleEl, image);
      return el;
    });
    this.sliderItemsWrapper.append(...this.sliderItems);
  };

  swipedetect = (el: HTMLDivElement) => {
    let surface = el;
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;
    let startTime = 0;
    let elapsedTime = 0;

    let threshold = 50;
    let restraint = 200;
    let allowedTime = 500;

    const checkDirection = () => {
      if (elapsedTime <= allowedTime) {
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
          if (distX > 0) {
            this.leafToPrev();
          } else {
            this.leafToNext();
          }
        }
      }
    };

    surface.addEventListener(
      "mousedown",
      (e: MouseEvent) => {
        startX = e.pageX;
        startY = e.pageY;
        startTime = new Date().getTime();
        e.preventDefault();
      },
      false
    );

    surface.addEventListener(
      "mouseup",
      (e: MouseEvent) => {
        if (!this.isEnabled) return;
        distX = e.pageX - startX;
        distY = e.pageY - startY;
        checkDirection();
        e.preventDefault();
      },
      false
    );

    surface.addEventListener(
      "touchstart",
      (e: TouchEvent) => {
        if (!this.isEnabled) return;
        if (!e.target) return;
        const target = e.target as HTMLElement;
        if (target.classList.contains("slider__icon-prev")) {
          this.leafToPrev();
          return;
        }

        if (target.classList.contains("slider__icon-next")) {
          this.leafToNext();
          return;
        }

        let touchobj = e.changedTouches[0];
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime();
        e.preventDefault();
      },
      false
    );

    surface.addEventListener(
      "touchmove",
      (e: TouchEvent) => {
        e.preventDefault();
      },
      false
    );

    surface.addEventListener(
      "touchend",
      (e: TouchEvent) => {
        if (!this.isEnabled) return;
        let touchobj = e.changedTouches[0];
        distX = touchobj.pageX - startX;
        distY = touchobj.pageY - startY;
        checkDirection();
        e.preventDefault();
      },
      false
    );
  };

  initialization = (imagesData: IImageData[]) => {
    this.createImages(imagesData);
    this.createButtons();
    if (!this.controls || !this.sliderItemsWrapper) return;
    this.slider.append(this.sliderItemsWrapper, this.controls);
    this.swipedetect(this.controls);
  };
}

const slider = new Slider("slider", imagesData);
