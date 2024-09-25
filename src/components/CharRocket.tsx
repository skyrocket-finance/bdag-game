import React from "react";


interface CharRocketProps {
  dna?: any
}

const HEAD_PARTS = 10;
const EYES_PARTS = 12;
const FLAMES_PARTS = 9;
const BAN_PARTS = 10;
const BODY_PARTS = 9;
const CARD_PARTS = 3;

export const CharRocket = ({dna}: CharRocketProps) => {

  function dnaArray(dna: any | undefined): number[] {
    if (dna === undefined) {
      return [];
    }

    let dnaStr = dna.dna.toString();      // Convert number to string
    return dnaStr.split('').map(Number);  // Convert each character back to a number

  }

  function calcPart(dna: any | undefined, slice_start: number, slice_end: number, parts: number): number {
    const dna_head = parseInt(dnaArray(dna).slice(slice_start, slice_end).join(''));
    return dna_head % parts + 1;
  }

  const image_rocket_char_base = require('../assets/images/rocket-char/BODY-BASE.png')

  const image_rocket_char_head = require('../assets/images/rocket-char/HEAD-' + calcPart(dna, 0, 2, HEAD_PARTS) + '.png')
  const image_rocket_char_eyes = require('../assets/images/rocket-char/EYES-' + calcPart(dna, 2, 4, EYES_PARTS) + '.png')
  const image_rocket_char_flames = require('../assets/images/rocket-char/FLAMES-' + calcPart(dna, 4, 6, FLAMES_PARTS) + '.png')
  const image_rocket_char_belt_arms_neck = require('../assets/images/rocket-char/BELT-ARMS-NECK-' + calcPart(dna, 6, 8, BAN_PARTS) + '.png')
  const image_rocket_char_body = require('../assets/images/rocket-char/BODY-' + calcPart(dna, 8, 10, BODY_PARTS) + '.png')
  const image_rocket_char_card = require('../assets/images/rocket-char/CARD' + calcPart(dna, 10, 12, CARD_PARTS) + '.png')

  return (
    <>

      <div id="char" className={"char-container"}>

        <span className={"char_part top-char-part"}>{dna.nft_id}</span>
        <img src={image_rocket_char_card} alt={'alt-img'} className={"char_part"}/>

        <img src={image_rocket_char_base} alt={'alt-img'} className={"char_part"}/>
        <img src={image_rocket_char_head} alt={'alt-img'} className={"char_part"}/>
        <img src={image_rocket_char_flames} alt={'alt-img'} className={"char_part"}/>
        <img src={image_rocket_char_eyes} alt={'alt-img'} className={"char_part"}/>
        <img src={image_rocket_char_belt_arms_neck} alt={'alt-img'} className={"char_part"}/>
        <img src={image_rocket_char_body} alt={'alt-img'} className={"char_part"}/>

      </div>
    </>

  );
}