'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Display from '@/components/Display';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

export default function Home() {
  const [isRun, setIsRun] = useState(false);


  const [stimulation_list, setStimulation_list] = useState<string[]>([]);
  const [ability_list, setAbility_list] = useState<string[]>([]);
  const [background_list, setBackground_list] = useState<string[]>([]);
  const [genre_list, setGenre_list] = useState<string[]>([]);

  const [stimulation, setStimulation] = useState("X");
  const [ability, setAbility] = useState("X");
  const [background, setBackground] = useState("X");
  const [genre, setGenre] = useState("X");

  // title, stimulation1/stimulation2, ability, background, genre
  const textRef = useRef<HTMLTextAreaElement>(null);
  type GameType = {
    name: string,
    stimulation: string[],
    ability: string[],
    background: string[],
    genre: string[]
  }
  const [games, setGames] = useState<GameType[]>([]);
  let data_list: GameType[] = [];
  const click = () => {
    if (isRun) {
      setIsRun(false);
    }
    if (!isRun) {
      data_list = [];
      if (textRef.current) {
        const game_list = textRef.current.value.split('\n');
        for (let i = 0; i < game_list.length; i++) {
          const data = game_list[i].split(",");
          const game = new Object() as GameType;
          game.name = data[0];
          game.stimulation = data[1].split("/");
          game.ability = data[2].split("/");
          game.background = data[3].split("/");
          game.genre = data[4].split("/");
          data_list.push(game);
        }
        console.log(data_list);


        setGames(data_list);


        let stimulation_temp = ["X"];
        let ability_temp = ["X"];
        let background_temp = ["X"];
        let genre_temp = ["X"];



        for (let i = 0; i < data_list.length; i++) {
          const temp = data_list[i];
          for(let j=0; j<temp.stimulation.length; j++){
            if(!stimulation_temp.includes(temp.stimulation[j])) stimulation_temp.push(temp.stimulation[j]);
          }
          for(let j=0; j<temp.ability.length; j++){
            if(!ability_temp.includes(temp.ability[j])) ability_temp.push(temp.ability[j]);
          }
          for(let j=0; j<temp.background.length; j++){
            if(!background_temp.includes(temp.background[j])) background_temp.push(temp.background[j]);
          }
          for(let j=0; j<temp.genre.length; j++){
            if(!genre_temp.includes(temp.genre[j])) genre_temp.push(temp.genre[j]);
          }
          // if (!stimulation_temp.includes(temp.stimulation[0])) stimulation_temp.push(temp.stimulation[0]);
          // if (!ability_temp.includes(temp.ability)) ability_temp.push(temp.ability);
          // if (!background_temp.includes(temp.background)) background_temp.push(temp.background);
          // if (!genre_temp.includes(temp.genre)) genre_temp.push(temp.genre);
        }

        setStimulation_list(stimulation_temp);
        setAbility_list(ability_temp);
        setBackground_list(background_temp);
        setGenre_list(genre_temp);

        setStimulation("X");
        setAbility("X");
        setBackground("X");
        setGenre("X");

        setIsRun(true);
      }
    }
  }





  const handlerStimulationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStimulation(e.target.value);
  }
  const handlerAbilityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAbility(e.target.value);
  }
  const handlerBackgroundChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setBackground(e.target.value);
  }
  const handlerGenreChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value);
  }

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <div className={`${styles.textwrap} ${isRun ? null : styles.active}`}>
          <textarea ref={textRef} className={styles.text} placeholder='title,stimulation1/stimulation2,ability,background,genre'></textarea>
        </div>
        <button className={styles.button} onClick={click}>{isRun ? "Edit List" : "Run"}</button>
        <div className={`${styles.run} ${isRun ? styles.active : null}`}>
          <div className={styles.runwrap}>
            <div className={styles.control}>
              <div className={styles.unit}>
                <h3>자극</h3>
                <select onChange={handlerStimulationChange} value={stimulation}>
                  {
                    stimulation_list.map((item, index) => {
                      return <option key={index}>{item}</option>
                    })
                  }
                </select>
              </div>
              <div className={styles.unit}>
                <h3>능력</h3>
                <select onChange={handlerAbilityChange} value={ability}>
                  {
                    ability_list.map((item, index) => {
                      return <option key={index}>{item}</option>
                    })
                  }
                </select>
              </div>
              <div className={styles.unit}>
                <h3>배경</h3>
                <select onChange={handlerBackgroundChange} value={background}>
                  {
                    background_list.map((item, index) => {
                      return <option key={index}>{item}</option>
                    })
                  }
                </select>
              </div>
              <div className={styles.unit}>
                <h3>장르</h3>
                <select onChange={handlerGenreChange} value={genre}>
                  {
                    genre_list.map((item, index) => {
                      return <option key={index}>{item}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className={styles.divider}/>
            <div className={styles.display}>
              <Display data={games} stimulation={stimulation} ability={ability} background={background} genre={genre} />
            </div>
          </div>
        </div>
      </div>
    </main >
  )
}
