'use client'
import Image from 'next/image'
import styles from './page.module.css'
import data from '../../../db/data.json'
import Display from '@/components/Display';
import { ChangeEvent, useEffect, useState } from 'react';

export default function Home() {
  // const all_stimulation = data.map(item=>{
  //   return item.stimulation;
  // });
  // const stimulation = all_stimulation.filter((item, index)=>{
  //   return all_stimulation.indexOf(item) === index;
  // });
  // const all_ability = data.map(item=>{
  //   item.ability;
  // });
  // const ability = all_ability.filter((item, index)=>{
  //   return all_ability.indexOf(item) === index;
  // });
  // const all_background = data.map(item=>{
  //   item.background;
  // });
  // const background = all_background.filter((item, index)=>{
  //   return all_background.indexOf(item) === index;
  // });
  // const all_genre = data.map(item=>{
  //   item.genre;
  // });
  // const genre = all_genre.filter((item, index)=>{
  //   return all_genre.indexOf(item) === index;
  // });
  let stimulation_list: string[] = ["none"];
  let ability_list: string[] = ["none"];
  let background_list: string[] = ["none"];
  let genre_list: string[] = ["none"];
  for (let i = 0; i < data.length; i++) {
    const temp = data[i];
    if (!stimulation_list.includes(temp.stimulation[0])) stimulation_list.push(temp.stimulation[0]);
    if (!stimulation_list.includes(temp.stimulation[1])) stimulation_list.push(temp.stimulation[1]);
    if (!ability_list.includes(temp.ability)) ability_list.push(temp.ability);
    if (!background_list.includes(temp.background)) background_list.push(temp.background);
    if (!genre_list.includes(temp.genre)) genre_list.push(temp.genre);
  }
  // stimulation.sort();
  // ability.sort();
  // background.sort();
  // genre.sort();
  //console.log("list", stimulation_list, ability_list, background_list, genre_list);
  const [stimulation, setStimulation] = useState("none");
  const [ability, setAbility] = useState("none");
  const [background, setBackground] = useState("none");
  const [genre, setGenre] = useState("none");
  const handlerStimulationChange = (e:ChangeEvent<HTMLSelectElement>) => {
    setStimulation(e.target.value);
  }
  const handlerAbilityChange = (e:ChangeEvent<HTMLSelectElement>) => {
    setAbility(e.target.value);
  }
  const handlerBackgroundChange = (e:ChangeEvent<HTMLSelectElement>) => {
    setBackground(e.target.value);
  }
  const handlerGenreChange = (e:ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value);
  }
  useEffect(()=>{
    console.log("Stimulation: ", stimulation);
    console.log("Ability: ", ability);
    console.log("Background: ", background);
    console.log("Genre: ", genre);
    console.log("-----------------------------");
  }, [stimulation, ability, background, genre]);
  return (
    <div className={styles.main}>
      <div className={styles.control}>
        <h3>자극</h3>
        <select onChange={handlerStimulationChange} value={stimulation}>
          {
            stimulation_list.map((item, index) => {
              return <option key={index}>{item}</option>
            })
          }
        </select>
        <h3>능력</h3>
        <select onChange={handlerAbilityChange} value={ability}>
          {
            ability_list.map((item, index) => {
              return <option key={index}>{item}</option>
            })
          }
        </select>
        <h3>배경</h3>
        <select onChange={handlerBackgroundChange} value={background}>
          {
            background_list.map((item, index) => {
              return <option key={index}>{item}</option>
            })
          }
        </select>
        <h3>장르</h3>
        <select onChange={handlerGenreChange} value={genre}>
          {
            genre_list.map((item, index) => {
              return <option key={index}>{item}</option>
            })
          }
        </select>
      </div>
      <div className={styles.display}>
        <Display stimulation={stimulation} ability={ability} background={background} genre={genre}/>
      </div>
    </div>
  )
}
