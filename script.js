// ==UserScript==
// @name         Skribbl.io Rainbow Brush
// @match        *://skribbl.io/*
// @grant        none
// ==/UserScript==

const allColors = document.querySelectorAll("[data-color]");

// Presets for colors to cycle through
const effectPalette = {
    "Numpad1": [allColors[2], allColors[13]],       // Red
    "Numpad2": [allColors[3], allColors[14]],       // Orange
    "Numpad3": [allColors[4], allColors[15]],       // Yellow
    "Numpad4": [allColors[5], allColors[16]],       // Green
    "Numpad5": [allColors[6], allColors[17]],       // Blue
    "Numpad6": [allColors[7], allColors[18]],       // Indigo
    "Numpad7": [allColors[8], allColors[19]],       // Violet
    "Numpad8": [allColors[9], allColors[20]],       // Pink
    "Numpad9": [allColors[10], allColors[21]],      // Brown
    "Numpad0": [allColors[0], allColors[1],         // Grey
                allColors[12], allColors[11]],
    "NumpadDivide": [allColors[13], allColors[14],  // Rainbow (dark colors only)
                     allColors[15], allColors[16],
                     allColors[17], allColors[18],
                     allColors[19]],
    "NumpadMultiply": [allColors[2], allColors[3],  // Rainbow (bright colors only)
                       allColors[4], allColors[5],
                       allColors[6], allColors[7],
                       allColors[8]],
    "NumpadSubtract": [allColors[2], allColors[13], // Rainbow (all colors)
                       allColors[3], allColors[14],
                       allColors[4], allColors[15],
                       allColors[5], allColors[16],
                       allColors[6], allColors[17],
                       allColors[7], allColors[18],
                       allColors[8], allColors[19]],
};

// Settings
const toggleKey = "KeyQ";
const defaultEffect = "NumpadMultiply";
const delay = 50;  // Milliseconds between switching colors

let colors = effectPalette[defaultEffect];
let flag = false;
let index = 0;

// Reacting to a keypress
function manageInput(event) {
    if (document.activeElement.id !== "inputChat") {
        if (event.code === toggleKey) {
            flag = !flag;
            changeColor();
        }
        else if (effectPalette.hasOwnProperty(event.code)) {
            colors = effectPalette[event.code];
        }
    }
}

// Switch to the next color after delay
function changeColor() {
    if (flag) {
        index = (index + 1) % colors.length;
        colors[index].click();
        setTimeout(changeColor, delay);
    }
}

document.addEventListener("keydown", manageInput);
