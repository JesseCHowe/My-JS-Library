import React, { Component } from "react";
import styles from "./MiniMap.module.css";
import { connect } from "react-redux";
import BookCount from "./BookCount/BookCount";

class miniMap extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.renderMap();
    }
  }

  renderMap() {
    const doc = document,
      myMap = document.querySelector(".myMap"),
      body = doc.body,
      win = window,
      myHeader = document.getElementsByClassName("showHead");

    if (myMap) {
      myMap.innerHTML = "";
    }

    let slider = doc.createElement("div"),
      sliderSize = doc.createElement("div"),
      controller = doc.createElement("div"),
      sliderContent = doc.createElement("iframe"),
      scale = 0.1,
      realScale = scale;

    slider.className = styles.slider;
    sliderSize.className = styles.slider__size;
    controller.className = styles.slider__controller;

    sliderContent.className += styles.slider__content;

    let html = doc.documentElement.outerHTML.replace(
      /<script([\s\S]*?)>([\s\S]*?)<\/script>/gim,
      ""
    );

    const script =
      '<script>var slider=document.querySelector(".slider"); slider.parentNode.removeChild(slider);<' +
      "/script>";

    html = html.replace("</body>", script + "</body>");
    html = html.replace("visible", "hidden");
    // html = html.replace("showHead", "hidden");

    html = html.replace("showMyMap", "hidden");
    html = html.replace("myIntersect", "hidden");
    html = html.replace("hideAuth", "hidden");
    html = html.replace("theMiniMap", "hidden");
    html = html.replace("bookCount", "hidden");

    slider.appendChild(sliderSize);
    slider.appendChild(controller);
    slider.appendChild(sliderContent);
    myMap.appendChild(slider);

    var iframeDoc = sliderContent.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(html);
    iframeDoc.querySelector(".showHead").remove();
    iframeDoc.querySelector(".testMini").remove();

    //testMini
    iframeDoc.close();

    function getDimensions() {
      var bodyWidth = body.clientWidth,
        bodyRatio = body.clientHeight / bodyWidth,
        winRatio = win.innerHeight / win.innerWidth;

      slider.style.width = "250px";

      realScale = slider.clientWidth / bodyWidth;

      sliderSize.style.paddingTop = bodyRatio * 100 + "%";
      controller.style.paddingTop = winRatio * 100 + "%";

      sliderContent.style.transform = "scale(" + realScale + ")";
      sliderContent.style.width = 100 / realScale + "%";
      sliderContent.style.height = 100 / realScale + "%";
    }

    getDimensions();
    win.addEventListener("resize", getDimensions);
    win.addEventListener("load", getDimensions);

    const set = win.pageXOffset;

    function trackScroll() {
      controller.style.transform =
        "translate(" +
        set * realScale +
        "px, " +
        (win.pageYOffset - myHeader[0].clientHeight) * realScale +
        "px)";
    }

    win.addEventListener("scroll", trackScroll);
    body.addEventListener("scroll", trackScroll);

    var mouseY = 0,
      mouseX = 0,
      mouseDown = false;

    function pointerDown(e) {
      e.preventDefault();
      mouseDown = true;
      mouseX = e.touches ? e.touches[0].clientX : e.clientX;
      mouseY = e.touches ? e.touches[0].clientY : e.clientY;

      var offsetX =
        (mouseX - slider.offsetLeft - controller.clientWidth / 2) / realScale;
      var offsetY =
        (mouseY - slider.offsetTop - controller.clientHeight / 2) / realScale;

      win.scrollTo(offsetX, offsetY);
    }
    slider.addEventListener("mousedown", pointerDown);
    slider.addEventListener("touchdown", pointerDown);

    function pointerMove(e) {
      if (mouseDown) {
        e.preventDefault();

        var x = e.touches ? e.touches[0].clientX : e.clientX,
          y = e.touches ? e.touches[0].clientY : e.clientY;

        win.scrollBy((x - mouseX) / realScale, (y - mouseY) / realScale);
        mouseX = set;
        mouseY = y;
      }
    }
    win.addEventListener("mousemove", pointerMove);
    win.addEventListener("touchmove", pointerMove);

    function pointerReset(e) {
      mouseDown = false;
    }
    win.addEventListener("mouseup", pointerReset);
    win.addEventListener("touchend", pointerReset);

    function pointerLeave(e) {
      if (e.target === body) {
        mouseDown = false;
      }
    }
    body.addEventListener("mouseleave", pointerLeave);
    body.addEventListener("touchleave", pointerLeave);
  }

  render() {
    let bookCount = 0;
    if (this.props.library) {
      bookCount = Object.keys(this.props.library).reduce((sum, key) => {
        return (sum += 1);
      }, 0);
    }
    return (
      <div id="theMiniMap" className={[styles.myMap, "testMini"].join(" ")}>
        <BookCount count={bookCount} />
        <div className={[styles.miniMap, "myMap"].join(" ")}></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    library: state.library.books,
    method: state.filters.sortMethod,
    searchField: state.filters.search
  };
};

export default connect(mapStateToProps, null)(miniMap);
