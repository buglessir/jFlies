/*
    jFlies v1.0 - Simple & Fun javascript game
    Created by Mohammad Esmaeilzadeh
    http://www.bugless.ir/
    https://github.com/buglessir/jFlies
*/

"use strict";

var fly_speed;
var attack_deadline;
var score = 0;
var flies_area = document.querySelector('.flies-area');
var fly_image = document.createElement('img');
var insect_sound_player = document.querySelector('#insect-player');
var attack_sound_player = document.querySelector('#attack-player');
var score_couter = document.querySelector('#score');

function play(degree) {
    switch (degree) {
        case 'hard':
            fly_speed = 700;
            break;
        case 'normal':
            fly_speed = 1000;
            break;
        case 'easy':
            fly_speed = 2000;
            break;
    }
    console.log('>>>> Game Played !');
    document.querySelector('.welcome').style.display = 'none';
    setTimeout(add_fly, fly_speed);
}

function attack_sound() {
    attack_sound_player.play();
}

function insect_sound(action) {
    if (action == 'play') {
        insect_sound_player.play();
    }
    else if (action == 'pause') {
        insect_sound_player.pause();
    }
}

function fly_attack() {
    clearTimeout(attack_deadline);
    score++;
    score_couter.innerText = score;
    insect_sound('pause');
    fly_image.src = 'assets/images/killed.png';
    attack_sound_player.play();
    setTimeout(function(){
        flies_area.removeChild(flies_area.childNodes[0]);
    }, fly_speed / 2);
    setTimeout(add_fly, fly_speed);
}

function random_position() {
    let random_top = Math.floor(Math.random() * (90 - 0)) + 0;
    let random_right = Math.floor(Math.random() * (90 - 0)) + 0;
    let random_rotate = Math.floor(Math.random() * (-180 - 180)) + 0;
    fly_image.style.top = random_top + '%';
    fly_image.style.right = random_right + '%';
    fly_image.style.transform = 'rotate('+ random_rotate +'deg)';
}

function add_fly() {
    attack_deadline = setTimeout(function(){
        score--;
        score_couter.innerText = score;
        insect_sound('pause');
        flies_area.removeChild(flies_area.childNodes[0]);
        add_fly();
    }, fly_speed);

    fly_image.src = 'assets/images/fly.png';
    fly_image.onclick = function(){
        fly_attack()
    }
    random_position();
    flies_area.appendChild(fly_image);
    insect_sound('play')
}

window.onload = function() {
    console.log('>>>> Welcome to jFlies v1.0');
    score_couter.innerText = score;
    document.querySelector('.loading').style.display = 'none';
}
